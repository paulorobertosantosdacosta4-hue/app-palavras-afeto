"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Eye, User, Calendar } from 'lucide-react';
import { Letter } from '@/lib/types';
import { formatRelativeTime, getCategoryColor, categoryLabels } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface LetterCardProps {
  letter: Letter;
  onReadMore: (letter: Letter) => void;
  onLike: (letterId: string) => void;
  onComment: (letterId: string) => void;
}

export function LetterCard({ letter, onReadMore, onLike, onComment }: LetterCardProps) {
  const [isLiked, setIsLiked] = useState(letter.isLiked || false);
  const [likesCount, setLikesCount] = useState(letter.likesCount);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike(letter.id);
  };

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-[#F5F1E8] to-[#F0E6D2] border-[#D4AF37]/20 hover:border-[#D4AF37]/40 relative overflow-hidden">
      {/* Textura de papel vintage */}
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23D4AF37\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      
      {letter.isFeatured && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
          ✨ Carta da Semana
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {!letter.isAnonymous ? (
              <>
                <Avatar className="h-10 w-10 border-2 border-[#D4AF37]/30">
                  <AvatarImage src={letter.author.avatar} alt={letter.author.name} />
                  <AvatarFallback className="bg-[#D4AF37]/10 text-[#8B4513]">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-[#8B4513] text-sm">{letter.author.name}</p>
                  <p className="text-xs text-[#8B4513]/60 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatRelativeTime(letter.createdAt)}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/20 flex items-center justify-center">
                  <span className="text-[#8B4513] text-lg">✒️</span>
                </div>
                <div>
                  <p className="font-medium text-[#8B4513] text-sm italic">Carta Anônima</p>
                  <p className="text-xs text-[#8B4513]/60 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatRelativeTime(letter.createdAt)}
                  </p>
                </div>
              </div>
            )}
          </div>
          
          <Badge 
            className={cn(
              "text-white border-0 text-xs px-2 py-1 bg-gradient-to-r",
              getCategoryColor(letter.category)
            )}
          >
            {categoryLabels[letter.category]}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#8B4513] mb-2 group-hover:text-[#D4AF37] transition-colors">
            {letter.title}
          </h3>
          <p className="text-[#8B4513]/80 text-sm leading-relaxed font-serif italic">
            "{letter.excerpt}"
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#D4AF37]/20">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "text-xs hover:bg-[#D4AF37]/10 transition-colors",
                isLiked ? "text-rose-500" : "text-[#8B4513]/60"
              )}
            >
              <Heart className={cn("h-4 w-4 mr-1", isLiked && "fill-current")} />
              {likesCount}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onComment(letter.id)}
              className="text-xs text-[#8B4513]/60 hover:bg-[#D4AF37]/10 hover:text-[#8B4513] transition-colors"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              {letter.commentsCount}
            </Button>
            
            <div className="flex items-center text-xs text-[#8B4513]/60">
              <Eye className="h-4 w-4 mr-1" />
              {letter.readsCount}
            </div>
          </div>

          <Button
            onClick={() => onReadMore(letter)}
            className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white text-xs px-4 py-2 rounded-full transition-all duration-300 hover:shadow-lg"
          >
            Ler carta completa
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}