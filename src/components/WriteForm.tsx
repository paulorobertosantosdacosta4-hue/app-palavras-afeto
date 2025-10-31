"use client"

import { useState } from 'react'
import { Send, Image, Smile } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'

interface WriteFormProps {
  onPublish: (post: {
    title: string
    content: string
    type: 'carta' | 'poesia' | 'bilhete'
    isAnonymous: boolean
    tags?: string[]
  }) => void
}

export function WriteForm({ onPublish }: WriteFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'carta' as 'carta' | 'poesia' | 'bilhete',
    isAnonymous: false,
    tags: ''
  })

  const [isPublishing, setIsPublishing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.content.trim()) return

    setIsPublishing(true)
    
    // Processar tags
    const tags = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)

    await new Promise(resolve => setTimeout(resolve, 1000)) // Simular delay

    onPublish({
      title: formData.title,
      content: formData.content,
      type: formData.type,
      isAnonymous: formData.isAnonymous,
      tags: tags.length > 0 ? tags : undefined
    })

    // Limpar formulário
    setFormData({
      title: '',
      content: '',
      type: 'carta',
      isAnonymous: false,
      tags: ''
    })
    
    setIsPublishing(false)
  }

  const getPlaceholder = () => {
    switch (formData.type) {
      case 'carta':
        return 'Querido(a)...\n\nEscreva aqui sua carta de amor, deixando seus sentimentos fluírem através das palavras. Conte sobre seus dias, seus sonhos, suas saudades...\n\nCom todo meu carinho,\n[Seu nome]'
      case 'poesia':
        return 'Em versos suaves, deixe sua alma falar...\n\nTeus olhos são estrelas\nQue iluminam meu caminho\nE em cada palavra tua\nEncontro meu destino...'
      case 'bilhete':
        return 'Uma mensagem rápida, mas cheia de carinho...\n\nPensando em você neste momento e querendo que saiba o quanto é especial para mim.'
      default:
        return 'Deixe seus sentimentos fluírem através das palavras...'
    }
  }

  const getTypeDescription = () => {
    switch (formData.type) {
      case 'carta':
        return 'Uma carta completa, com início, desenvolvimento e despedida'
      case 'poesia':
        return 'Versos e estrofes que expressam sentimentos profundos'
      case 'bilhete':
        return 'Uma mensagem curta e doce para momentos especiais'
      default:
        return ''
    }
  }

  return (
    <Card className="max-w-3xl mx-auto bg-white/70 backdrop-blur-sm border-amber-200">
      <CardHeader>
        <CardTitle className="text-amber-800 font-serif flex items-center gap-2 text-2xl">
          <Send className="w-6 h-6" />
          Criar Nova Publicação
        </CardTitle>
        <p className="text-amber-600/70">
          Compartilhe seus sentimentos com a comunidade
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tipo de publicação */}
          <div className="space-y-3">
            <Label className="text-amber-700 font-medium">Tipo de publicação</Label>
            <div className="grid grid-cols-3 gap-3">
              {(['carta', 'poesia', 'bilhete'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type }))}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    formData.type === type
                      ? 'border-amber-400 bg-amber-50 text-amber-700'
                      : 'border-amber-200 hover:border-amber-300 text-amber-600'
                  }`}
                >
                  <div className="font-serif font-medium capitalize mb-1">{type}</div>
                  <div className="text-xs opacity-70">{getTypeDescription()}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Título */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-amber-700 font-medium">
              Título da sua {formData.type}
            </Label>
            <Input
              id="title"
              placeholder={`Dê um título poético à sua ${formData.type}...`}
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="border-amber-200 focus:border-amber-400 font-serif text-lg"
              required
            />
          </div>

          {/* Conteúdo */}
          <div className="space-y-2">
            <Label htmlFor="content" className="text-amber-700 font-medium">
              Conteúdo
            </Label>
            <Textarea
              id="content"
              placeholder={getPlaceholder()}
              className="min-h-[300px] border-amber-200 focus:border-amber-400 font-serif text-base leading-relaxed resize-none"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              required
            />
            <div className="text-xs text-amber-600/70 text-right">
              {formData.content.length} caracteres
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-amber-700 font-medium">
              Tags (opcional)
            </Label>
            <Input
              id="tags"
              placeholder="amor, saudade, poesia (separadas por vírgula)"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="border-amber-200 focus:border-amber-400"
            />
            <div className="text-xs text-amber-600/70">
              Use tags para ajudar outros a encontrarem sua publicação
            </div>
          </div>

          {/* Opções */}
          <div className="space-y-4 p-4 bg-amber-50/50 rounded-lg border border-amber-200">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="anonymous" className="text-amber-700 font-medium">
                  Publicar anonimamente
                </Label>
                <p className="text-sm text-amber-600/70">
                  Sua identidade ficará oculta para outros usuários
                </p>
              </div>
              <Switch
                id="anonymous"
                checked={formData.isAnonymous}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isAnonymous: checked }))}
              />
            </div>
          </div>

          {/* Preview das tags */}
          {formData.tags && (
            <div className="space-y-2">
              <Label className="text-amber-700 font-medium text-sm">Preview das tags:</Label>
              <div className="flex flex-wrap gap-1">
                {formData.tags.split(',').map((tag, index) => {
                  const cleanTag = tag.trim()
                  return cleanTag ? (
                    <Badge key={index} variant="outline" className="border-amber-200 text-amber-600">
                      #{cleanTag}
                    </Badge>
                  ) : null
                })}
              </div>
            </div>
          )}

          {/* Botão de publicar */}
          <Button
            type="submit"
            disabled={!formData.title.trim() || !formData.content.trim() || isPublishing}
            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-medium py-3 text-lg"
          >
            {isPublishing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Publicando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Publicar {formData.type}
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}