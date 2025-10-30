"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Feather, Send, Eye, EyeOff, User } from 'lucide-react';
import { LetterCategory } from '@/lib/types';
import { categoryLabels } from '@/lib/mock-data';

interface LetterEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (letter: {
    title: string;
    content: string;
    category: LetterCategory;
    isAnonymous: boolean;
    isPrivate: boolean;
    recipientEmail?: string;
  }) => void;
}

export function LetterEditor({ isOpen, onClose, onSave }: LetterEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<LetterCategory>('amor');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    onSave({
      title: title.trim(),
      content: content.trim(),
      category,
      isAnonymous,
      isPrivate,
      recipientEmail: isPrivate ? recipientEmail : undefined
    });

    // Reset form
    setTitle('');
    setContent('');
    setCategory('amor');
    setIsAnonymous(false);
    setIsPrivate(false);
    setRecipientEmail('');
    onClose();
  };

  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#F5F1E8] to-[#F0E6D2] border-[#D4AF37]/30">
        <DialogHeader className="border-b border-[#D4AF37]/20 pb-4">
          <DialogTitle className="flex items-center gap-2 text-[#8B4513] font-serif text-xl">
            <Feather className="h-5 w-5 text-[#D4AF37]" />
            Escrever Minha Carta
          </DialogTitle>
          <p className="text-sm text-[#8B4513]/70 italic">
            "Deixe seu coração guiar suas palavras..."
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Configurações da carta */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category" className="text-[#8B4513] font-medium">
                Categoria
              </Label>
              <Select value={category} onValueChange={(value) => setCategory(value as LetterCategory)}>
                <SelectTrigger className="bg-white/50 border-[#D4AF37]/30 focus:border-[#D4AF37]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-[#8B4513] font-medium">Opções</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant={isAnonymous ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className={isAnonymous 
                    ? "bg-[#D4AF37] hover:bg-[#B8941F] text-white" 
                    : "border-[#D4AF37]/30 text-[#8B4513] hover:bg-[#D4AF37]/10"
                  }
                >
                  <User className="h-4 w-4 mr-1" />
                  Anônima
                </Button>
                
                <Button
                  type="button"
                  variant={isPrivate ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsPrivate(!isPrivate)}
                  className={isPrivate 
                    ? "bg-[#D4AF37] hover:bg-[#B8941F] text-white" 
                    : "border-[#D4AF37]/30 text-[#8B4513] hover:bg-[#D4AF37]/10"
                  }
                >
                  {isPrivate ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                  Privada
                </Button>
              </div>
            </div>
          </div>

          {/* Campo de destinatário para cartas privadas */}
          {isPrivate && (
            <div className="space-y-2">
              <Label htmlFor="recipient" className="text-[#8B4513] font-medium">
                Email do Destinatário
              </Label>
              <Input
                id="recipient"
                type="email"
                placeholder="Para quem você quer enviar esta carta?"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="bg-white/50 border-[#D4AF37]/30 focus:border-[#D4AF37] placeholder:text-[#8B4513]/50"
              />
            </div>
          )}

          <Separator className="bg-[#D4AF37]/20" />

          {/* Título da carta */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-[#8B4513] font-medium">
              Título da Carta
            </Label>
            <Input
              id="title"
              placeholder="Dê um título poético à sua carta..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white/50 border-[#D4AF37]/30 focus:border-[#D4AF37] placeholder:text-[#8B4513]/50 font-serif text-lg"
            />
          </div>

          {/* Conteúdo da carta */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="content" className="text-[#8B4513] font-medium">
                Conteúdo da Carta
              </Label>
              <Badge variant="outline" className="text-xs text-[#8B4513]/60 border-[#D4AF37]/30">
                {wordCount} palavras
              </Badge>
            </div>
            <div className="relative">
              <Textarea
                id="content"
                placeholder="Querido(a)...

Escreva aqui suas palavras do coração. Deixe a emoção fluir através de cada linha, cada vírgula, cada ponto final. 

Lembre-se: cada carta é um pedaço da sua alma compartilhado com o mundo.

Com carinho,
Seu nome"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[300px] bg-white/50 border-[#D4AF37]/30 focus:border-[#D4AF37] placeholder:text-[#8B4513]/50 font-serif text-base leading-relaxed resize-none"
                style={{
                  backgroundImage: `linear-gradient(transparent 24px, #D4AF37 25px)`,
                  backgroundSize: '100% 26px',
                  lineHeight: '26px',
                  paddingTop: '2px'
                }}
              />
              {/* Efeito de papel pautado */}
              <div className="absolute left-12 top-0 bottom-0 w-px bg-rose-300/30" />
            </div>
          </div>

          {/* Botões de ação */}
          <div className="flex justify-between items-center pt-4 border-t border-[#D4AF37]/20">
            <div className="text-sm text-[#8B4513]/60 italic">
              {isPrivate ? "Esta carta será enviada apenas para o destinatário" : 
               isAnonymous ? "Esta carta será publicada anonimamente" : 
               "Esta carta será publicada em seu nome"}
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="border-[#D4AF37]/30 text-[#8B4513] hover:bg-[#D4AF37]/10"
              >
                Cancelar
              </Button>
              
              <Button
                onClick={handleSave}
                disabled={!title.trim() || !content.trim() || (isPrivate && !recipientEmail.trim())}
                className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white px-6 transition-all duration-300 hover:shadow-lg"
              >
                <Send className="h-4 w-4 mr-2" />
                Selar e Enviar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}