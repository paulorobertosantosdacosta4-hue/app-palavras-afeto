"use client"

import { useState } from 'react'
import { Heart, Feather, BookOpen, Users, ShoppingBag, Star, Send, User, Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

// Dados mockados para demonstração
const featuredLetters = [
  {
    id: 1,
    title: "Para Você, Meu Amor",
    preview: "Nas manhãs silenciosas, quando o sol desponta tímido no horizonte, penso em você...",
    author: "Ana Clara",
    isAnonymous: false,
    likes: 127,
    type: "carta",
    date: "2 dias atrás"
  },
  {
    id: 2,
    title: "Versos do Coração",
    preview: "Teus olhos são estrelas que guiam meu caminho, tua voz é melodia que embala meus sonhos...",
    author: "Anônimo",
    isAnonymous: true,
    likes: 89,
    type: "poesia",
    date: "1 semana atrás"
  },
  {
    id: 3,
    title: "Bilhete de Saudade",
    preview: "Deixo estas palavras como quem deixa flores no caminho, esperando que chegues até elas...",
    author: "João Santos",
    isAnonymous: false,
    likes: 203,
    type: "bilhete",
    date: "3 dias atrás"
  }
]

const products = [
  {
    id: 1,
    name: "Kit Cartas Vintage",
    price: "R$ 45,90",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=300&fit=crop",
    description: "Papel pergaminho, envelopes e selos temáticos"
  },
  {
    id: 2,
    name: "Carta Personalizada",
    price: "R$ 89,90",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&h=300&fit=crop",
    description: "Texto exclusivo criado especialmente para você"
  },
  {
    id: 3,
    name: "Poesia Sob Medida",
    price: "R$ 129,90",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop",
    description: "Versos únicos para momentos especiais"
  }
]

export default function Home() {
  const [activeTab, setActiveTab] = useState("feed")
  const [newPost, setNewPost] = useState({ title: "", content: "", type: "carta", isAnonymous: false })
  const [searchQuery, setSearchQuery] = useState("")

  const handlePublish = () => {
    // Aqui seria a lógica para publicar
    console.log("Publicando:", newPost)
    setNewPost({ title: "", content: "", type: "carta", isAnonymous: false })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-rose-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-rose-400 to-pink-500 p-2 rounded-full">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Cartas do Coração
                </h1>
                <p className="text-sm text-rose-600/70">Resgatando a poesia dos sentimentos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-rose-400" />
                <Input 
                  placeholder="Buscar cartas, poesias..." 
                  className="pl-10 w-64 border-rose-200 focus:border-rose-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Navigation */}
          <TabsList className="grid w-full grid-cols-5 bg-white/60 backdrop-blur-sm border border-rose-200">
            <TabsTrigger value="feed" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Feed
            </TabsTrigger>
            <TabsTrigger value="write" className="flex items-center gap-2">
              <Feather className="w-4 h-4" />
              Escrever
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Biblioteca
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Comunidade
            </TabsTrigger>
            <TabsTrigger value="shop" className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Loja
            </TabsTrigger>
          </TabsList>

          {/* Feed de Cartas */}
          <TabsContent value="feed" className="mt-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredLetters.map((letter) => (
                <Card key={letter.id} className="bg-white/70 backdrop-blur-sm border-rose-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="border-rose-300 text-rose-700">
                        {letter.type}
                      </Badge>
                      <span className="text-sm text-rose-600/70">{letter.date}</span>
                    </div>
                    <CardTitle className="text-rose-800 font-serif">{letter.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-rose-700/80 mb-4 font-serif italic leading-relaxed">
                      "{letter.preview}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs bg-rose-100">
                            {letter.isAnonymous ? "?" : letter.author[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-rose-600">
                          {letter.isAnonymous ? "Anônimo" : letter.author}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-700">
                        <Heart className="w-4 h-4 mr-1" />
                        {letter.likes}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Escrever */}
          <TabsContent value="write" className="mt-8">
            <Card className="max-w-2xl mx-auto bg-white/70 backdrop-blur-sm border-rose-200">
              <CardHeader>
                <CardTitle className="text-rose-800 font-serif flex items-center gap-2">
                  <Feather className="w-5 h-5" />
                  Criar Nova Publicação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    placeholder="Dê um título poético à sua criação..."
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className="border-rose-200 focus:border-rose-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <select 
                    className="w-full p-2 border border-rose-200 rounded-md focus:border-rose-400 focus:outline-none"
                    value={newPost.type}
                    onChange={(e) => setNewPost({...newPost, type: e.target.value})}
                  >
                    <option value="carta">Carta</option>
                    <option value="poesia">Poesia</option>
                    <option value="bilhete">Bilhete</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Conteúdo</Label>
                  <Textarea
                    id="content"
                    placeholder="Deixe seus sentimentos fluírem através das palavras..."
                    className="min-h-[200px] border-rose-200 focus:border-rose-400 font-serif"
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="anonymous"
                    checked={newPost.isAnonymous}
                    onCheckedChange={(checked) => setNewPost({...newPost, isAnonymous: checked})}
                  />
                  <Label htmlFor="anonymous">Publicar anonimamente</Label>
                </div>

                <Button 
                  onClick={handlePublish}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Publicar
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Biblioteca */}
          <TabsContent value="library" className="mt-8">
            <div className="text-center py-12">
              <Star className="w-16 h-16 mx-auto text-rose-400 mb-4" />
              <h2 className="text-2xl font-serif text-rose-800 mb-2">Biblioteca Poética</h2>
              <p className="text-rose-600/70 mb-6">Textos autorais e destaques da comunidade</p>
              <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
                Explorar Coleção
              </Button>
            </div>
          </TabsContent>

          {/* Comunidade */}
          <TabsContent value="community" className="mt-8">
            <div className="text-center py-12">
              <Users className="w-16 h-16 mx-auto text-rose-400 mb-4" />
              <h2 className="text-2xl font-serif text-rose-800 mb-2">Comunidade Poética</h2>
              <p className="text-rose-600/70 mb-6">Conecte-se com outros amantes da palavra escrita</p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
                <Card className="bg-white/70 backdrop-blur-sm border-rose-200">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-serif text-rose-800 mb-2">Seguir Autores</h3>
                    <p className="text-sm text-rose-600/70">Acompanhe seus escritores favoritos</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-sm border-rose-200">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-serif text-rose-800 mb-2">Correspondências</h3>
                    <p className="text-sm text-rose-600/70">Troque cartas com outros membros</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-sm border-rose-200">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-serif text-rose-800 mb-2">Conexões</h3>
                    <p className="text-sm text-rose-600/70">Crie laços através da poesia</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Loja */}
          <TabsContent value="shop" className="mt-8">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-serif text-rose-800 mb-2">Loja Afetiva</h2>
              <p className="text-rose-600/70">Produtos poéticos para momentos especiais</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Card key={product.id} className="bg-white/70 backdrop-blur-sm border-rose-200 hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square overflow-hidden rounded-t-lg">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-serif text-rose-800 text-lg mb-2">{product.name}</h3>
                    <p className="text-rose-600/70 text-sm mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-rose-700">{product.price}</span>
                      <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
                        Encomendar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-sm border-t border-rose-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-rose-500" />
              <span className="font-serif text-rose-800">Cartas do Coração</span>
            </div>
            <p className="text-rose-600/70 text-sm">
              Resgatando a magia das cartas de amor em tempos digitais
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}