"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { User, Heart, BookOpen, Users, Mail, Calendar, Edit3, UserPlus, UserMinus } from 'lucide-react';
import { User as UserType, Letter } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { LetterCard } from '@/components/LetterCard';

interface UserProfileProps {
  user: UserType;
  letters: Letter[];
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  onFollow?: (userId: string) => void;
  onUnfollow?: (userId: string) => void;
  onSendPrivateLetter?: (userId: string) => void;
  onEditProfile?: () => void;
  onReadMore: (letter: Letter) => void;
  onLike: (letterId: string) => void;
  onComment: (letterId: string) => void;
}

export function UserProfile({
  user,
  letters,
  isOwnProfile = false,
  isFollowing = false,
  onFollow,
  onUnfollow,
  onSendPrivateLetter,
  onEditProfile,
  onReadMore,
  onLike,
  onComment
}: UserProfileProps) {
  const [activeTab, setActiveTab] = useState('letters');

  const handleFollowToggle = () => {
    if (isFollowing) {
      onUnfollow?.(user.id);
    } else {
      onFollow?.(user.id);
    }
  };

  const stats = [
    { label: 'Cartas Publicadas', value: user.lettersCount, icon: BookOpen },
    { label: 'Seguidores', value: user.followersCount, icon: Users },
    { label: 'Seguindo', value: user.followingCount, icon: Heart }
  ];

  return (
    <div className="space-y-6">
      {/* Header do perfil */}
      <Card className="bg-gradient-to-br from-[#F5F1E8] to-[#F0E6D2] border-[#D4AF37]/30">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-[#D4AF37]/30">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-[#D4AF37]/10 text-[#8B4513] text-2xl">
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="font-serif text-2xl text-[#8B4513] mb-2">{user.name}</h1>
                {user.bio && (
                  <p className="text-[#8B4513]/70 italic leading-relaxed">{user.bio}</p>
                )}
                <p className="text-sm text-[#8B4513]/60 flex items-center gap-1 mt-2">
                  <Calendar className="h-4 w-4" />
                  Membro desde {formatDate(user.joinedAt)}
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center gap-1 text-[#8B4513]/60">
                      <stat.icon className="h-4 w-4" />
                      <span className="text-sm">{stat.label}</span>
                    </div>
                    <div className="text-xl font-bold text-[#8B4513]">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {isOwnProfile ? (
                <Button
                  onClick={onEditProfile}
                  variant="outline"
                  className="border-[#D4AF37]/30 text-[#8B4513] hover:bg-[#D4AF37]/10"
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Editar Perfil
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleFollowToggle}
                    className={
                      isFollowing
                        ? "bg-[#8B4513] hover:bg-[#8B4513]/80 text-white"
                        : "bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white"
                    }
                  >
                    {isFollowing ? (
                      <>
                        <UserMinus className="h-4 w-4 mr-2" />
                        Deixar de Seguir
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Seguir
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={() => onSendPrivateLetter?.(user.id)}
                    variant="outline"
                    className="border-[#D4AF37]/30 text-[#8B4513] hover:bg-[#D4AF37]/10"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar Carta
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conteúdo do perfil */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white/50 border border-[#D4AF37]/30">
          <TabsTrigger 
            value="letters"
            className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Cartas ({letters.length})
          </TabsTrigger>
          <TabsTrigger 
            value="favorites"
            className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white"
          >
            <Heart className="h-4 w-4 mr-2" />
            Favoritas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="letters" className="mt-6">
          {letters.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {letters.map((letter) => (
                <LetterCard
                  key={letter.id}
                  letter={letter}
                  onReadMore={onReadMore}
                  onLike={onLike}
                  onComment={onComment}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="font-serif text-xl text-[#8B4513] mb-2">
                {isOwnProfile ? "Você ainda não publicou nenhuma carta" : "Este usuário ainda não publicou cartas"}
              </h3>
              <p className="text-[#8B4513]/60">
                {isOwnProfile ? "Que tal começar escrevendo sua primeira carta?" : "Volte em breve para ver as criações deste escritor"}
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="mt-6">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💖</div>
            <h3 className="font-serif text-xl text-[#8B4513] mb-2">
              Cartas Favoritas
            </h3>
            <p className="text-[#8B4513]/60">
              Aqui aparecerão as cartas que tocaram o coração
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}