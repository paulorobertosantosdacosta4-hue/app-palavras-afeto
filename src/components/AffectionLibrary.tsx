"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, Heart, Star, Clock } from 'lucide-react';
import { Letter, LetterCategory, LibraryCollection } from '@/lib/types';
import { categoryLabels, mockLetters } from '@/lib/mock-data';
import { LetterCard } from '@/components/LetterCard';
import { cn } from '@/lib/utils';

interface AffectionLibraryProps {
  onReadMore: (letter: Letter) => void;
  onLike: (letterId: string) => void;
  onComment: (letterId: string) => void;
}

export function AffectionLibrary({ onReadMore, onLike, onComment }: AffectionLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LetterCategory | 'all'>('all');
  const [selectedCollection, setSelectedCollection] = useState<string>('featured');

  // Coleções da biblioteca
  const collections: LibraryCollection[] = [
    {
      id: 'featured',
      title: 'Cartas em Destaque',
      description: 'As cartas mais tocantes selecionadas pela curadoria',
      category: 'amor',
      letters: mockLetters.filter(letter => letter.isFeatured),
      isPublic: true
    },
    {
      id: 'classics',
      title: 'Clássicos do Amor',
      description: 'Cartas atemporais que definem o romantismo',
      category: 'amor',
      letters: mockLetters.filter(letter => letter.category === 'amor'),
      isPublic: true
    },
    {
      id: 'nostalgia',
      title: 'Memórias e Saudades',
      description: 'Textos que abraçam a nostalgia e a lembrança',
      category: 'saudade',
      letters: mockLetters.filter(letter => letter.category === 'saudade'),
      isPublic: true
    },
    {
      id: 'hope',
      title: 'Esperança e Superação',
      description: 'Histórias de força, coragem e recomeço',
      category: 'superacao',
      letters: mockLetters.filter(letter => letter.category === 'superacao'),
      isPublic: true
    },
    {
      id: 'gratitude',
      title: 'Gratidão e Reconhecimento',
      description: 'Mensagens de apreço e reconhecimento',
      category: 'gratidao',
      letters: mockLetters.filter(letter => letter.category === 'gratidao'),
      isPublic: true
    }
  ];

  const currentCollection = collections.find(c => c.id === selectedCollection);
  const filteredLetters = currentCollection?.letters.filter(letter => {
    const matchesSearch = letter.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         letter.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || letter.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  const categories: Array<{ key: LetterCategory | 'all', label: string }> = [
    { key: 'all', label: 'Todas' },
    ...Object.entries(categoryLabels).map(([key, label]) => ({
      key: key as LetterCategory,
      label
    }))
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="font-serif text-3xl text-[#8B4513]">
          Biblioteca Afetiva
        </h2>
        <p className="text-[#8B4513]/70 italic max-w-2xl mx-auto">
          \"Uma coletânea cuidadosamente selecionada das cartas mais tocantes e inspiradoras\"
        </p>
      </div>

      {/* Navegação das coleções */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((collection) => (
          <Card
            key={collection.id}
            className={cn(
              "cursor-pointer transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-[#F5F1E8] to-[#F0E6D2] border-2",
              selectedCollection === collection.id
                ? "border-[#D4AF37] shadow-lg"
                : "border-[#D4AF37]/20 hover:border-[#D4AF37]/40"
            )}
            onClick={() => setSelectedCollection(collection.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <BookOpen className="h-6 w-6 text-[#D4AF37]" />
                <Badge className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white text-xs">
                  {collection.letters.length} cartas
                </Badge>
              </div>
              <CardTitle className="font-serif text-lg text-[#8B4513]">
                {collection.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[#8B4513]/70 leading-relaxed">
                {collection.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Conteúdo da coleção selecionada */}
      {currentCollection && (
        <Card className="bg-gradient-to-br from-[#F5F1E8] to-[#F0E6D2] border-[#D4AF37]/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-serif text-xl text-[#8B4513] flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-[#D4AF37]" />
                  {currentCollection.title}
                </CardTitle>
                <p className="text-sm text-[#8B4513]/70 mt-1">
                  {currentCollection.description}
                </p>
              </div>
              <Badge className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white">
                {currentCollection.letters.length} cartas
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Barra de busca e filtros */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B4513]/40 h-4 w-4" />
                <Input
                  placeholder="Buscar na coleção..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/50 border-[#D4AF37]/30 focus:border-[#D4AF37] placeholder:text-[#8B4513]/50"
                />
              </div>

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

            {/* Lista de cartas */}
            {filteredLetters.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {filteredLetters.map((letter) => (
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
                <div className="text-6xl mb-4">📚</div>
                <h3 className="font-serif text-xl text-[#8B4513] mb-2">
                  Nenhuma carta encontrada
                </h3>
                <p className="text-[#8B4513]/60">
                  {searchQuery 
                    ? "Tente buscar por outras palavras ou explore diferentes categorias"
                    : "Esta coleção ainda não possui cartas nesta categoria"
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Estatísticas da biblioteca */}
      <Card className="bg-gradient-to-br from-[#F5F1E8] to-[#F0E6D2] border-[#D4AF37]/30">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">📚</div>
              <h3 className="font-serif text-lg text-[#8B4513] mb-1">Coleções</h3>
              <p className="text-2xl font-bold text-[#D4AF37]">{collections.length}</p>
            </div>
            
            <div>
              <div className="text-3xl mb-2">💌</div>
              <h3 className="font-serif text-lg text-[#8B4513] mb-1">Cartas Curadas</h3>
              <p className="text-2xl font-bold text-[#D4AF37]">
                {collections.reduce((total, collection) => total + collection.letters.length, 0)}
              </p>
            </div>
            
            <div>
              <div className="text-3xl mb-2">⭐</div>
              <h3 className="font-serif text-lg text-[#8B4513] mb-1">Em Destaque</h3>
              <p className="text-2xl font-bold text-[#D4AF37]">
                {mockLetters.filter(letter => letter.isFeatured).length}
              </p>
            </div>
            
            <div>
              <div className="text-3xl mb-2">❤️</div>
              <h3 className="font-serif text-lg text-[#8B4513] mb-1">Mais Amadas</h3>
              <p className="text-2xl font-bold text-[#D4AF37]">
                {mockLetters.filter(letter => letter.likesCount > 100).length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}