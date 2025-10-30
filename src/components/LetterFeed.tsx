"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, TrendingUp, Clock, Heart } from 'lucide-react';
import { LetterCard } from '@/components/LetterCard';
import { LetterViewer } from '@/components/LetterViewer';
import { Letter, LetterCategory } from '@/lib/types';
import { mockLetters, categoryLabels } from '@/lib/mock-data';
import { getCategoryColor } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface LetterFeedProps {
  onWriteLetter: () => void;
  onReadMore: (letter: Letter) => void;
  onLike: (letterId: string) => void;
  onComment: (letterId: string) => void;
}

export function LetterFeed({ onWriteLetter, onReadMore, onLike, onComment }: LetterFeedProps) {
  const [letters, setLetters] = useState<Letter[]>(mockLetters);
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LetterCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');

  const filteredLetters = letters.filter(letter => {
    const matchesSearch = letter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         letter.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         letter.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || letter.category === selectedCategory;
    
    return matchesSearch && matchesCategory && !letter.isPrivate;
  });

  const sortedLetters = [...filteredLetters].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.likesCount - a.likesCount;
      case 'trending':
        return (b.likesCount + b.commentsCount + b.readsCount) - (a.likesCount + a.commentsCount + a.readsCount);
      case 'recent':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

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
    // Implementar sistema de comentários
    console.log('Comentar na carta:', letterId);
  };

  const handleReadMore = (letter: Letter) => {
    // Incrementar contador de leituras
    setLetters(prev => prev.map(l => 
      l.id === letter.id 
        ? { ...l, readsCount: l.readsCount + 1 }
        : l
    ));
    setSelectedLetter(letter);
  };

  const categories: Array<{ key: LetterCategory | 'all', label: string }> = [
    { key: 'all', label: 'Todas' },
    ...Object.entries(categoryLabels).map(([key, label]) => ({
      key: key as LetterCategory,
      label
    }))
  ];

  return (
    <div className="space-y-6">
      {/* Header do Feed */}
      <div className="text-center space-y-4">
        <h2 className="font-serif text-3xl text-[#8B4513]">
          Mural de Cartas
        </h2>
        <p className="text-[#8B4513]/70 italic max-w-2xl mx-auto">
          "Onde cada palavra é um abraço ao coração e cada carta uma ponte entre almas"
        </p>
      </div>

      {/* Barra de busca e filtros */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B4513]/40 h-4 w-4" />
            <Input
              placeholder="Buscar cartas, autores ou palavras do coração..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/50 border-[#D4AF37]/30 focus:border-[#D4AF37] placeholder:text-[#8B4513]/50"
            />
          </div>
          
          <Button
            onClick={onWriteLetter}
            className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white px-6 transition-all duration-300 hover:shadow-lg whitespace-nowrap"
          >
            ✒️ Escrever Carta
          </Button>
        </div>

        {/* Filtros por categoria */}
        <div className="flex flex-wrap gap-2">
          {categories.map(({ key, label }) => (
            <Button
              key={key}
              variant={selectedCategory === key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(key)}
              className={cn(
                "transition-all duration-200",
                selectedCategory === key
                  ? "bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white border-0"
                  : "border-[#D4AF37]/30 text-[#8B4513] hover:bg-[#D4AF37]/10"
              )}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Tabs de ordenação */}
      <Tabs value={sortBy} onValueChange={(value) => setSortBy(value as typeof sortBy)}>
        <TabsList className="bg-white/50 border border-[#D4AF37]/30">
          <TabsTrigger 
            value="recent" 
            className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white"
          >
            <Clock className="h-4 w-4 mr-2" />
            Recentes
          </TabsTrigger>
          <TabsTrigger 
            value="popular"
            className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white"
          >
            <Heart className="h-4 w-4 mr-2" />
            Populares
          </TabsTrigger>
          <TabsTrigger 
            value="trending"
            className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Em Alta
          </TabsTrigger>
        </TabsList>

        <TabsContent value={sortBy} className="mt-6">
          {/* Lista de cartas */}
          {sortedLetters.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {sortedLetters.map((letter) => (
                <LetterCard
                  key={letter.id}
                  letter={letter}
                  onReadMore={handleReadMore}
                  onLike={handleLike}
                  onComment={handleComment}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="font-serif text-xl text-[#8B4513] mb-2">
                Nenhuma carta encontrada
              </h3>
              <p className="text-[#8B4513]/60 mb-4">
                {searchQuery 
                  ? "Tente buscar por outras palavras ou explore diferentes categorias"
                  : "Seja o primeiro a compartilhar suas palavras do coração"
                }
              </p>
              <Button
                onClick={onWriteLetter}
                className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white"
              >
                Escrever Primeira Carta
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Visualizador de carta */}
      <LetterViewer
        letter={selectedLetter}
        isOpen={!!selectedLetter}
        onClose={() => setSelectedLetter(null)}
        onLike={handleLike}
        onComment={handleComment}
      />
    </div>
  );
}