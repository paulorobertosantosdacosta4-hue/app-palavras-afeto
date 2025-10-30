"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Feather, Heart, BookOpen, ShoppingBag, Users, Library, Sparkles, Bell, User, Mail } from 'lucide-react';
import { LetterFeed } from '@/components/LetterFeed';
import { LetterEditor } from '@/components/LetterEditor';
import { LetterViewer } from '@/components/LetterViewer';
import { AffectionStore } from '@/components/AffectionStore';
import { AffectionLibrary } from '@/components/AffectionLibrary';
import { UserProfile } from '@/components/UserProfile';
import { CorrespondenceExchange } from '@/components/CorrespondenceExchange';
import { NotificationCenter } from '@/components/NotificationCenter';
import { getPoeticalMessage } from '@/lib/utils';
import { Letter } from '@/lib/types';
import { mockUsers, mockLetters } from '@/lib/mock-data';

export default function Home() {
  const [showLetterEditor, setShowLetterEditor] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [letters, setLetters] = useState<Letter[]>(mockLetters);

  const currentUser = mockUsers[0]; // Usuário logado (Paulo)
  const userLetters = letters.filter(letter => letter.author.id === currentUser.id);

  const handleSaveLetter = (letterData: any) => {
    const newLetter: Letter = {
      id: Date.now().toString(),
      title: letterData.title,
      content: letterData.content,
      excerpt: letterData.content.substring(0, 150) + '...',
      author: currentUser,
      category: letterData.category,
      isAnonymous: letterData.isAnonymous,
      isPrivate: letterData.isPrivate,
      recipientId: letterData.recipientEmail ? 'recipient-id' : undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      likesCount: 0,
      commentsCount: 0,
      readsCount: 0,
      isLiked: false,
      isFeatured: false
    };

    setLetters(prev => [newLetter, ...prev]);
    
    if (!letterData.isPrivate) {
      setActiveTab('feed');
    }
  };

  const handleReadMore = (letter: Letter) => {
    setLetters(prev => prev.map(l => 
      l.id === letter.id 
        ? { ...l, readsCount: l.readsCount + 1 }
        : l
    ));
    setSelectedLetter(letter);
  };

  const handleLike = (letterId: string) => {
    setLetters(prev => prev.map(letter => 
      letter.id === letterId 
        ? { 
            ...letter, 
            isLiked: !letter.isLiked,
            likesCount: letter.isLiked ? letter.likesCount - 1 : letter.likesCount + 1
          }
        : letter
    ));
  };

  const handleComment = (letterId: string) => {
    console.log('Comentar na carta:', letterId);
  };

  const handleSendPrivateLetter = (userId: string) => {
    setSelectedUserId(userId);
    setShowLetterEditor(true);
  };

  const handleViewProfile = (userId: string) => {
    setSelectedUserId(userId);
    setActiveTab('profile');
  };

  const stats = [
    { label: 'Cartas Publicadas', value: letters.filter(l => !l.isPrivate).length.toString(), icon: Heart },
    { label: 'Escritores Ativos', value: '342', icon: Users },
    { label: 'Leituras Realizadas', value: letters.reduce((sum, l) => sum + l.readsCount, 0).toString(), icon: BookOpen },
    { label: 'Corações Tocados', value: '∞', icon: Sparkles }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] via-[#F0E6D2] to-[#EBD5B7]">
      {/* Textura de papel vintage */}
      <div className="fixed inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23D4AF37\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] pointer-events-none" />
      
      <div className="relative">
        {/* Header */}
        <header className="border-b border-[#D4AF37]/20 bg-white/30 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full flex items-center justify-center">
                  <Feather className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="font-serif text-xl font-bold text-[#8B4513]">
                    Amante das Palavras de Afeto
                  </h1>
                  <p className="text-xs text-[#8B4513]/60 italic">
                    Onde o amor é escrito à mão
                  </p>
                </div>
              </div>
              
              <nav className="hidden md:flex items-center space-x-1">
                <Button
                  variant={activeTab === 'home' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('home')}
                  className={activeTab === 'home' 
                    ? 'bg-[#D4AF37] text-white' 
                    : 'text-[#8B4513] hover:bg-[#D4AF37]/10'
                  }
                >
                  Início
                </Button>
                <Button
                  variant={activeTab === 'feed' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('feed')}
                  className={activeTab === 'feed' 
                    ? 'bg-[#D4AF37] text-white' 
                    : 'text-[#8B4513] hover:bg-[#D4AF37]/10'
                  }
                >
                  Mural de Cartas
                </Button>
                <Button
                  variant={activeTab === 'library' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('library')}
                  className={activeTab === 'library' 
                    ? 'bg-[#D4AF37] text-white' 
                    : 'text-[#8B4513] hover:bg-[#D4AF37]/10'
                  }
                >
                  <Library className="h-4 w-4 mr-1" />
                  Biblioteca
                </Button>
                <Button
                  variant={activeTab === 'exchange' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('exchange')}
                  className={activeTab === 'exchange' 
                    ? 'bg-[#D4AF37] text-white' 
                    : 'text-[#8B4513] hover:bg-[#D4AF37]/10'
                  }
                >
                  <Mail className="h-4 w-4 mr-1" />
                  Correspondência
                </Button>
                <Button
                  variant={activeTab === 'store' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('store')}
                  className={activeTab === 'store' 
                    ? 'bg-[#D4AF37] text-white' 
                    : 'text-[#8B4513] hover:bg-[#D4AF37]/10'
                  }
                >
                  Loja Afetiva
                </Button>
              </nav>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotifications(true)}
                  className="text-[#8B4513] hover:bg-[#D4AF37]/10 relative"
                >
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-xs w-5 h-5 rounded-full p-0 flex items-center justify-center">
                    3
                  </Badge>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewProfile(currentUser.id)}
                  className="text-[#8B4513] hover:bg-[#D4AF37]/10"
                >
                  <User className="h-4 w-4" />
                </Button>

                <Button
                  onClick={() => setShowLetterEditor(true)}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white transition-all duration-300 hover:shadow-lg"
                >
                  <Feather className="h-4 w-4 mr-2" />
                  Escrever
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Mobile Navigation */}
            <TabsList className="md:hidden w-full bg-white/50 border border-[#D4AF37]/30 mb-8 grid grid-cols-3">
              <TabsTrigger 
                value="home"
                className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white text-xs"
              >
                Início
              </TabsTrigger>
              <TabsTrigger 
                value="feed"
                className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white text-xs"
              >
                Cartas
              </TabsTrigger>
              <TabsTrigger 
                value="store"
                className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white text-xs"
              >
                Loja
              </TabsTrigger>
            </TabsList>

            {/* Home Tab */}
            <TabsContent value="home" className="space-y-12">
              {/* Hero Section */}
              <section className="text-center space-y-6 py-12">
                <div className="space-y-4">
                  <h2 className="font-serif text-4xl md:text-6xl text-[#8B4513] leading-tight">
                    Onde o amor é
                    <span className="block text-[#D4AF37]">escrito à mão</span>
                  </h2>
                  <p className="text-lg md:text-xl text-[#8B4513]/80 max-w-3xl mx-auto leading-relaxed">
                    {getPoeticalMessage('welcome')}. Junte-se a uma comunidade que acredita no poder transformador das palavras escritas com o coração.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    onClick={() => setActiveTab('feed')}
                    size="lg"
                    className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white px-8 py-3 text-lg transition-all duration-300 hover:shadow-lg"
                  >
                    <BookOpen className="h-5 w-5 mr-2" />
                    Explorar Cartas
                  </Button>
                  
                  <Button
                    onClick={() => setShowLetterEditor(true)}
                    size="lg"
                    variant="outline"
                    className="border-[#D4AF37] text-[#8B4513] hover:bg-[#D4AF37]/10 px-8 py-3 text-lg"
                  >
                    <Feather className="h-5 w-5 mr-2" />
                    Escrever Minha Carta
                  </Button>
                </div>
              </section>

              {/* Stats Section */}
              <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-white/40 border-[#D4AF37]/20 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <stat.icon className="h-8 w-8 text-[#D4AF37] mx-auto mb-3" />
                      <div className="text-2xl font-bold text-[#8B4513] mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-[#8B4513]/70">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </section>

              {/* Features Section */}
              <section className="grid md:grid-cols-3 gap-8">
                <Card className="bg-gradient-to-br from-white/50 to-white/30 border-[#D4AF37]/20 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="text-4xl mb-4">💌</div>
                    <h3 className="font-serif text-xl text-[#8B4513] mb-3">
                      Publique Suas Cartas
                    </h3>
                    <p className="text-[#8B4513]/70 leading-relaxed">
                      Compartilhe suas palavras do coração com uma comunidade que valoriza a escrita afetiva e a conexão humana.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-white/50 to-white/30 border-[#D4AF37]/20 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="text-4xl mb-4">✍️</div>
                    <h3 className="font-serif text-xl text-[#8B4513] mb-3">
                      Cartas Personalizadas
                    </h3>
                    <p className="text-[#8B4513]/70 leading-relaxed">
                      Encomende cartas únicas escritas por Paulo, cada uma criada especialmente para tocar o coração de quem você ama.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-white/50 to-white/30 border-[#D4AF37]/20 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="text-4xl mb-4">🤝</div>
                    <h3 className="font-serif text-xl text-[#8B4513] mb-3">
                      Conecte-se
                    </h3>
                    <p className="text-[#8B4513]/70 leading-relaxed">
                      Siga outros escritores, troque correspondências e faça parte de uma rede de pessoas que acreditam no poder das palavras.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Call to Action */}
              <section className="text-center bg-gradient-to-r from-[#D4AF37]/10 to-[#B8941F]/10 rounded-2xl p-8 border border-[#D4AF37]/20">
                <h3 className="font-serif text-2xl text-[#8B4513] mb-4">
                  Pronto para começar sua jornada poética?
                </h3>
                <p className="text-[#8B4513]/70 mb-6 max-w-2xl mx-auto">
                  Junte-se a centenas de pessoas que já descobriram o prazer de expressar seus sentimentos através de cartas escritas com amor.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => setShowLetterEditor(true)}
                    className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white px-6 py-3 transition-all duration-300 hover:shadow-lg"
                  >
                    Escrever Primeira Carta
                  </Button>
                  <Button
                    onClick={() => setActiveTab('store')}
                    variant="outline"
                    className="border-[#D4AF37] text-[#8B4513] hover:bg-[#D4AF37]/10 px-6 py-3"
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Encomendar Carta
                  </Button>
                </div>
              </section>
            </TabsContent>

            {/* Feed Tab */}
            <TabsContent value="feed">
              <LetterFeed 
                onWriteLetter={() => setShowLetterEditor(true)}
                onReadMore={handleReadMore}
                onLike={handleLike}
                onComment={handleComment}
              />
            </TabsContent>

            {/* Library Tab */}
            <TabsContent value="library">
              <AffectionLibrary
                onReadMore={handleReadMore}
                onLike={handleLike}
                onComment={handleComment}
              />
            </TabsContent>

            {/* Correspondence Exchange Tab */}
            <TabsContent value="exchange">
              <CorrespondenceExchange
                onSendPrivateLetter={handleSendPrivateLetter}
              />
            </TabsContent>

            {/* Store Tab */}
            <TabsContent value="store">
              <AffectionStore />
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              {selectedUserId && (
                <UserProfile
                  user={mockUsers.find(u => u.id === selectedUserId) || currentUser}
                  letters={letters.filter(l => l.author.id === selectedUserId && !l.isPrivate)}
                  isOwnProfile={selectedUserId === currentUser.id}
                  isFollowing={false}
                  onFollow={(userId) => console.log('Seguir:', userId)}
                  onUnfollow={(userId) => console.log('Deixar de seguir:', userId)}
                  onSendPrivateLetter={handleSendPrivateLetter}
                  onEditProfile={() => console.log('Editar perfil')}
                  onReadMore={handleReadMore}
                  onLike={handleLike}
                  onComment={handleComment}
                />
              )}
            </TabsContent>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#D4AF37]/20 bg-white/20 backdrop-blur-sm mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <Feather className="h-5 w-5 text-[#D4AF37]" />
                <span className="font-serif text-lg text-[#8B4513]">
                  Amante das Palavras de Afeto
                </span>
              </div>
              <p className="text-sm text-[#8B4513]/60 italic max-w-md mx-auto">
                "O romantismo vive em cada palavra escrita. Cada carta é um gesto de amor atemporal."
              </p>
              <div className="flex justify-center space-x-6 text-sm text-[#8B4513]/60">
                <span>© 2024 Paulo - Amante das Palavras</span>
                <span>•</span>
                <span>Feito com ❤️ para quem acredita no amor</span>
              </div>
            </div>
          </div>
        </footer>

        {/* Modals */}
        <LetterEditor
          isOpen={showLetterEditor}
          onClose={() => {
            setShowLetterEditor(false);
            setSelectedUserId(null);
          }}
          onSave={handleSaveLetter}
        />

        <LetterViewer
          letter={selectedLetter}
          isOpen={!!selectedLetter}
          onClose={() => setSelectedLetter(null)}
          onLike={handleLike}
          onComment={handleComment}
        />

        <NotificationCenter
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
        />
      </div>
    </div>
  );
}