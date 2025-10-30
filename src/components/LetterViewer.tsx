"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Heart, MessageCircle, Eye, User, Calendar, Share2 } from 'lucide-react';
import { Letter } from '@/lib/types';
import { formatDate, getCategoryColor, categoryLabels } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface LetterViewerProps {
  letter: Letter | null;
  isOpen: boolean;
  onClose: () => void;
  onLike: (letterId: string) => void;
  onComment: (letterId: string) => void;
}

export function LetterViewer({ letter, isOpen, onClose, onLike, onComment }: LetterViewerProps) {
  if (!letter) return null;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: letter.title,
          text: letter.excerpt,
          url: window.location.href
        });
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      // Fallback para copiar para clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#F5F1E8] to-[#F0E6D2] border-[#D4AF37]/30">
        {/* Header da carta */}
        <DialogHeader className="space-y-4 border-b border-[#D4AF37]/20 pb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              {!letter.isAnonymous ? (
                <>
                  <Avatar className="h-12 w-12 border-2 border-[#D4AF37]/30">
                    <AvatarImage src={letter.author.avatar} alt={letter.author.name} />
                    <AvatarFallback className="bg-[#D4AF37]/10 text-[#8B4513]">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-[#8B4513]">{letter.author.name}</h3>
                    <p className="text-sm text-[#8B4513]/60 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(letter.createdAt)}
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#B8941F]/20 flex items-center justify-center">
                    <span className="text-[#8B4513] text-xl">✒️</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#8B4513] italic">Carta Anônima</h3>
                    <p className="text-sm text-[#8B4513]/60 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(letter.createdAt)}
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Badge 
                className={cn(
                  "text-white border-0 px-3 py-1 bg-gradient-to-r",
                  getCategoryColor(letter.category)
                )}
              >
                {categoryLabels[letter.category]}
              </Badge>
              
              {letter.isFeatured && (
                <Badge className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white">
                  ✨ Destaque
                </Badge>
              )}
            </div>
          </div>

          <DialogTitle className="font-serif text-2xl text-[#8B4513] text-left">
            {letter.title}
          </DialogTitle>
        </DialogHeader>

        {/* Conteúdo da carta */}
        <div className="py-6">
          <div className="relative">
            {/* Efeito de papel vintage */}
            <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23D4AF37\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
            
            <div className="relative bg-white/30 rounded-lg p-8 border border-[#D4AF37]/20">
              <div className="prose prose-lg max-w-none">
                <div 
                  className="font-serif text-[#8B4513] leading-relaxed whitespace-pre-wrap text-base"
                  style={{ lineHeight: '1.8' }}
                >
                  {letter.content}
                </div>
              </div>
              
              {/* Assinatura decorativa */}
              <div className="mt-8 pt-4 border-t border-[#D4AF37]/20 text-right">
                <div className="inline-flex items-center gap-2 text-[#8B4513]/60">
                  <span className="text-2xl">✒️</span>
                  <span className="font-serif italic text-sm">
                    {letter.isAnonymous ? "Com carinho, um coração anônimo" : `Com carinho, ${letter.author.name}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-[#D4AF37]/20" />

        {/* Estatísticas e ações */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              onClick={() => onLike(letter.id)}
              className={cn(
                "hover:bg-[#D4AF37]/10 transition-colors",
                letter.isLiked ? "text-rose-500" : "text-[#8B4513]/60"
              )}
            >
              <Heart className={cn("h-5 w-5 mr-2", letter.isLiked && "fill-current")} />
              {letter.likesCount} curtidas
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => onComment(letter.id)}
              className="text-[#8B4513]/60 hover:bg-[#D4AF37]/10 hover:text-[#8B4513] transition-colors"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              {letter.commentsCount} comentários
            </Button>
            
            <div className="flex items-center text-[#8B4513]/60">
              <Eye className="h-5 w-5 mr-2" />
              {letter.readsCount} leituras
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="border-[#D4AF37]/30 text-[#8B4513] hover:bg-[#D4AF37]/10"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
            
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white transition-all duration-300"
            >
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}