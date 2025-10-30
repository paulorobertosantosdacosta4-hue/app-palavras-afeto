"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Mail, 
  MapPin, 
  Shield, 
  Heart, 
  MessageCircle, 
  UserPlus,
  Search,
  Filter
} from 'lucide-react';
import { User } from '@/lib/types';
import { mockUsers } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface CorrespondenceExchangeProps {
  onSendPrivateLetter: (userId: string) => void;
}

export function CorrespondenceExchange({ onSendPrivateLetter }: CorrespondenceExchangeProps) {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedInterest, setSelectedInterest] = useState<string>('all');
  const [connectionRequests, setConnectionRequests] = useState<string[]>([]);

  // Dados mock para demonstração
  const [users] = useState<User[]>(mockUsers);
  const [connections, setConnections] = useState<string[]>(['2']); // IDs dos usuários conectados

  const locations = [
    { value: 'all', label: 'Todas as localidades' },
    { value: 'sp', label: 'São Paulo' },
    { value: 'rj', label: 'Rio de Janeiro' },
    { value: 'mg', label: 'Minas Gerais' },
    { value: 'rs', label: 'Rio Grande do Sul' },
    { value: 'pr', label: 'Paraná' }
  ];

  const interests = [
    { value: 'all', label: 'Todos os interesses' },
    { value: 'poetry', label: 'Poesia' },
    { value: 'literature', label: 'Literatura' },
    { value: 'philosophy', label: 'Filosofia' },
    { value: 'art', label: 'Arte' },
    { value: 'music', label: 'Música' }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (user.bio && user.bio.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const handleConnectionRequest = (userId: string) => {
    setConnectionRequests(prev => [...prev, userId]);
  };

  const handleAcceptConnection = (userId: string) => {
    setConnections(prev => [...prev, userId]);
    setConnectionRequests(prev => prev.filter(id => id !== userId));
  };

  const isConnected = (userId: string) => connections.includes(userId);
  const hasRequestPending = (userId: string) => connectionRequests.includes(userId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="font-serif text-3xl text-[#8B4513]">
          Grupo de Troca de Correspondência
        </h2>
        <p className="text-[#8B4513]/70 italic max-w-2xl mx-auto">
          \"Conecte-se com outros amantes das palavras e troque cartas físicas com segurança e mediação\"
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-white/50 border border-[#D4AF37]/30">
          <TabsTrigger 
            value="discover"
            className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white"
          >
            <Users className="h-4 w-4 mr-2" />
            Descobrir Pessoas
          </TabsTrigger>
          <TabsTrigger 
            value="connections"
            className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white"
          >
            <Heart className="h-4 w-4 mr-2" />
            Minhas Conexões ({connections.length})
          </TabsTrigger>
          <TabsTrigger 
            value="requests"
            className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-white"
          >
            <Mail className="h-4 w-4 mr-2" />
            Solicitações ({connectionRequests.length})
          </TabsTrigger>
        </TabsList>

        {/* Descobrir Pessoas */}
        <TabsContent value="discover" className="space-y-6">
          {/* Filtros */}
          <Card className="bg-gradient-to-br from-[#F5F1E8] to-[#F0E6D2] border-[#D4AF37]/30">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8B4513]/40 h-4 w-4" />
                  <Input
                    placeholder="Buscar por nome ou interesses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/50 border-[#D4AF37]/30 focus:border-[#D4AF37]"
                  />
                </div>

                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="bg-white/50 border-[#D4AF37]/30 focus:border-[#D4AF37]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location.value} value={location.value}>
                        {location.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedInterest} onValueChange={setSelectedInterest}>
                  <SelectTrigger className="bg-white/50 border-[#D4AF37]/30 focus:border-[#D4AF37]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {interests.map((interest) => (
                      <SelectItem key={interest.value} value={interest.value}>
                        {interest.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Lista de usuários */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="bg-gradient-to-br from-[#F5F1E8] to-[#F0E6D2] border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 hover:shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Avatar className="h-16 w-16 mx-auto border-2 border-[#D4AF37]/30">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-[#D4AF37]/10 text-[#8B4513]">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h3 className="font-serif text-lg text-[#8B4513] mb-1">{user.name}</h3>
                      {user.bio && (
                        <p className="text-sm text-[#8B4513]/70 italic leading-relaxed">
                          {user.bio}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-center gap-4 text-xs text-[#8B4513]/60">
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {user.lettersCount} cartas
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {user.followersCount} seguidores
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {isConnected(user.id) ? (
                        <Button
                          onClick={() => onSendPrivateLetter(user.id)}
                          className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white text-sm"
                        >
                          <Mail className="h-4 w-4 mr-1" />
                          Enviar Carta
                        </Button>
                      ) : hasRequestPending(user.id) ? (
                        <Button
                          disabled
                          variant="outline"
                          className="flex-1 border-[#D4AF37]/30 text-[#8B4513]/60"
                        >
                          Solicitação Enviada
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleConnectionRequest(user.id)}
                          variant="outline"
                          className="flex-1 border-[#D4AF37]/30 text-[#8B4513] hover:bg-[#D4AF37]/10"
                        >
                          <UserPlus className="h-4 w-4 mr-1" />
                          Conectar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Minhas Conexões */}
        <TabsContent value="connections" className="space-y-6">
          {connections.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {connections.map((connectionId) => {
                const user = users.find(u => u.id === connectionId);
                if (!user) return null;

                return (
                  <Card key={user.id} className="bg-gradient-to-br from-[#F5F1E8] to-[#F0E6D2] border-[#D4AF37]/20">
                    <CardContent className="pt-6">
                      <div className="text-center space-y-4">
                        <Avatar className="h-16 w-16 mx-auto border-2 border-[#D4AF37]/30">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-[#D4AF37]/10 text-[#8B4513]">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h3 className="font-serif text-lg text-[#8B4513] mb-1">{user.name}</h3>
                          <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs">
                            Conectado
                          </Badge>
                        </div>

                        <Button
                          onClick={() => onSendPrivateLetter(user.id)}
                          className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white"
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Enviar Carta
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💌</div>
              <h3 className="font-serif text-xl text-[#8B4513] mb-2">
                Nenhuma conexão ainda
              </h3>
              <p className="text-[#8B4513]/60">
                Explore a aba "Descobrir Pessoas" para encontrar outros amantes das palavras
              </p>
            </div>
          )}
        </TabsContent>

        {/* Solicitações */}
        <TabsContent value="requests" className="space-y-6">
          {connectionRequests.length > 0 ? (
            <div className="space-y-4">
              {connectionRequests.map((requestId) => {
                const user = users.find(u => u.id === requestId);
                if (!user) return null;

                return (
                  <Card key={user.id} className="bg-gradient-to-br from-[#F5F1E8] to-[#F0E6D2] border-[#D4AF37]/20">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border-2 border-[#D4AF37]/30">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback className="bg-[#D4AF37]/10 text-[#8B4513]">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <h3 className="font-serif text-lg text-[#8B4513]">{user.name}</h3>
                          <p className="text-sm text-[#8B4513]/70">
                            Quer se conectar para trocar correspondências
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleAcceptConnection(user.id)}
                            size="sm"
                            className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white"
                          >
                            Aceitar
                          </Button>
                          <Button
                            onClick={() => setConnectionRequests(prev => prev.filter(id => id !== user.id))}
                            variant="outline"
                            size="sm"
                            className="border-[#D4AF37]/30 text-[#8B4513] hover:bg-[#D4AF37]/10"
                          >
                            Recusar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📬</div>
              <h3 className="font-serif text-xl text-[#8B4513] mb-2">
                Nenhuma solicitação pendente
              </h3>
              <p className="text-[#8B4513]/60">
                Quando alguém quiser se conectar com você, aparecerá aqui
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Informações de segurança */}
      <Card className="bg-gradient-to-br from-[#F5F1E8] to-[#F0E6D2] border-[#D4AF37]/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-[#D4AF37] mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-serif text-lg text-[#8B4513] mb-2">Segurança e Privacidade</h3>
              <div className="text-sm text-[#8B4513]/70 space-y-2">
                <p>• Todas as conexões são mediadas pela plataforma</p>
                <p>• Endereços são compartilhados apenas após confirmação mútua</p>
                <p>• Sistema de avaliação e feedback para maior segurança</p>
                <p>• Possibilidade de bloquear usuários inadequados</p>
                <p>• Suporte 24h para questões de segurança</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}