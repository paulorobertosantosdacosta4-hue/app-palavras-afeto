"use client"

import { useState } from 'react'
import { User, Heart, MessageCircle, UserPlus, UserMinus, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User as UserType } from '@/lib/types'

interface CommunityProps {
  users: UserType[]
  currentUser: UserType
  onFollow: (userId: string) => void
  onSendMessage: (receiverId: string, content: string) => void
}

export function Community({ users, currentUser, onFollow, onSendMessage }: CommunityProps) {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [messageContent, setMessageContent] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.bio && user.bio.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleSendMessage = () => {
    if (selectedUser && messageContent.trim()) {
      onSendMessage(selectedUser.id, messageContent)
      setMessageContent('')
      setSelectedUser(null)
    }
  }

  const isFollowing = (userId: string) => {
    return currentUser.following.includes(userId)
  }

  return (
    <div className="space-y-8">
      {/* Header da Comunidade */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-amber-400 to-yellow-500 p-3 rounded-full">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-serif text-amber-800">Comunidade Poética</h2>
            <p className="text-amber-600/70">Conecte-se com outros amantes da palavra escrita</p>
          </div>
        </div>

        {/* Busca */}
        <div className="max-w-md mx-auto">
          <Input
            placeholder="Buscar por nome, usuário ou biografia..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-amber-200 focus:border-amber-400"
          />
        </div>
      </div>

      {/* Estatísticas do usuário atual */}
      <Card className="max-w-2xl mx-auto bg-white/70 backdrop-blur-sm border-amber-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-amber-100 text-amber-700 text-xl">
                {currentUser.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-serif text-amber-800">{currentUser.name}</h3>
              <p className="text-amber-600/70">@{currentUser.username}</p>
              {currentUser.bio && (
                <p className="text-sm text-amber-700/80 mt-1">{currentUser.bio}</p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-amber-50 rounded-lg">
              <div className="text-2xl font-bold text-amber-700">{currentUser.following.length}</div>
              <div className="text-sm text-amber-600/70">Seguindo</div>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <div className="text-2xl font-bold text-amber-700">{currentUser.followers.length}</div>
              <div className="text-sm text-amber-600/70">Seguidores</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de usuários */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="bg-white/70 backdrop-blur-sm border-amber-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <Avatar className="w-16 h-16 mx-auto mb-3">
                  <AvatarFallback className="bg-amber-100 text-amber-700 text-xl">
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-serif text-amber-800">{user.name}</h3>
                <p className="text-amber-600/70 text-sm">@{user.username}</p>
                {user.bio && (
                  <p className="text-sm text-amber-700/80 mt-2 line-clamp-2">{user.bio}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-center mb-4 text-sm">
                <div>
                  <div className="font-semibold text-amber-700">{user.followers.length}</div>
                  <div className="text-amber-600/70">Seguidores</div>
                </div>
                <div>
                  <div className="font-semibold text-amber-700">{user.following.length}</div>
                  <div className="text-amber-600/70">Seguindo</div>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={() => onFollow(user.id)}
                  variant={isFollowing(user.id) ? "outline" : "default"}
                  className={`w-full ${
                    isFollowing(user.id)
                      ? "border-amber-300 text-amber-700 hover:bg-amber-50"
                      : "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
                  }`}
                >
                  {isFollowing(user.id) ? (
                    <>
                      <UserMinus className="w-4 h-4 mr-2" />
                      Deixar de seguir
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Seguir
                    </>
                  )}
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                      onClick={() => setSelectedUser(user)}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Enviar carta
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="font-serif text-amber-800">
                        Enviar carta para {user.name}
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                        <Avatar>
                          <AvatarFallback className="bg-amber-100 text-amber-700">
                            {user.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-amber-800">{user.name}</div>
                          <div className="text-sm text-amber-600/70">@{user.username}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Sua mensagem</Label>
                        <Textarea
                          id="message"
                          placeholder="Escreva uma carta carinhosa..."
                          value={messageContent}
                          onChange={(e) => setMessageContent(e.target.value)}
                          className="min-h-[150px] border-amber-200 focus:border-amber-400 font-serif"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={handleSendMessage}
                          disabled={!messageContent.trim()}
                          className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Enviar carta
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <User className="w-16 h-16 mx-auto text-amber-400 mb-4" />
          <h3 className="text-xl font-serif text-amber-800 mb-2">Nenhum usuário encontrado</h3>
          <p className="text-amber-600/70">
            {searchQuery ? 'Tente buscar com outros termos' : 'A comunidade está crescendo!'}
          </p>
        </div>
      )}
    </div>
  )
}