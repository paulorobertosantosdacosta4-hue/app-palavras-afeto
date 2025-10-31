"use client"

import { useState } from 'react'
import { Heart, MessageCircle, Share2, User, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Post, Comment } from '@/lib/types'
import { cn } from '@/lib/utils'

interface PostCardProps {
  post: Post
  currentUserId: string
  onLike: (postId: string, userId: string) => void
  onComment: (postId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => void
}

export function PostCard({ post, currentUserId, onLike, onComment }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [showFullContent, setShowFullContent] = useState(false)

  const hasLiked = post.likes.includes(currentUserId)
  const isLongContent = post.content.length > 200

  const handleLike = () => {
    onLike(post.id, currentUserId)
  }

  const handleComment = () => {
    if (newComment.trim()) {
      onComment(post.id, {
        postId: post.id,
        authorId: currentUserId,
        authorName: 'Você',
        content: newComment,
        isAnonymous: false
      })
      setNewComment('')
    }
  }

  const formatDate = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Agora há pouco'
    if (diffInHours < 24) return `${diffInHours}h atrás`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays} dia${diffInDays > 1 ? 's' : ''} atrás`
    
    return date.toLocaleDateString('pt-BR')
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'carta': return 'bg-amber-100 text-amber-700 border-amber-300'
      case 'poesia': return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 'bilhete': return 'bg-orange-100 text-orange-700 border-orange-300'
      default: return 'bg-amber-100 text-amber-700 border-amber-300'
    }
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-amber-200 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge className={cn("border", getTypeColor(post.type))}>
            {post.type}
          </Badge>
          <div className="flex items-center gap-2 text-sm text-amber-600/70">
            <Calendar className="w-3 h-3" />
            {formatDate(post.createdAt)}
          </div>
        </div>
        <CardTitle className="text-amber-800 font-serif text-lg leading-relaxed">
          {post.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Conteúdo */}
        <div className="space-y-2">
          <div className="text-amber-700/80 font-serif italic leading-relaxed whitespace-pre-line">
            {isLongContent && !showFullContent 
              ? `"${post.content.substring(0, 200)}..."` 
              : `"${post.content}"`
            }
          </div>
          {isLongContent && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-amber-600 hover:text-amber-700 p-0 h-auto font-normal"
            >
              {showFullContent ? 'Ver menos' : 'Ver mais'}
            </Button>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs border-amber-200 text-amber-600">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Autor */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-xs bg-amber-100 text-amber-700">
                {post.isAnonymous ? "?" : post.authorName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="text-sm font-medium text-amber-700">
                {post.isAnonymous ? "Anônimo" : post.authorName}
              </span>
              {!post.isAnonymous && (
                <div className="text-xs text-amber-600/70">@{post.authorName.toLowerCase().replace(' ', '')}</div>
              )}
            </div>
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center justify-between pt-2 border-t border-amber-100">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "text-amber-600 hover:text-amber-700 hover:bg-amber-50",
                hasLiked && "text-amber-700 bg-amber-50"
              )}
            >
              <Heart className={cn("w-4 h-4 mr-1", hasLiked && "fill-current")} />
              {post.likes.length}
            </Button>

            <Dialog open={showComments} onOpenChange={setShowComments}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {post.comments.length}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-serif text-amber-800">
                    Comentários - {post.title}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                  {/* Comentários existentes */}
                  {post.comments.length > 0 ? (
                    <div className="space-y-3">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3 p-3 bg-amber-50/50 rounded-lg">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-amber-100">
                              {comment.isAnonymous ? "?" : comment.authorName[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-amber-700">
                                {comment.isAnonymous ? "Anônimo" : comment.authorName}
                              </span>
                              <span className="text-xs text-amber-600/70">
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                            <p className="text-sm text-amber-700/80">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-amber-600/70 py-4">
                      Seja o primeiro a comentar nesta publicação
                    </p>
                  )}

                  {/* Novo comentário */}
                  <div className="space-y-3 border-t border-amber-200 pt-4">
                    <Textarea
                      placeholder="Deixe um comentário carinhoso..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="border-amber-200 focus:border-amber-400 font-serif"
                    />
                    <Button
                      onClick={handleComment}
                      disabled={!newComment.trim()}
                      className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
                    >
                      Comentar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="ghost" size="sm" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50">
              <Share2 className="w-4 h-4 mr-1" />
              Compartilhar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}