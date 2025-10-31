"use client"

import { useState } from 'react'
import { ShoppingBag, Heart, Star, Package, Truck, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Product, CustomOrder } from '@/lib/types'

interface ShopProps {
  onCreateOrder: (order: Omit<CustomOrder, 'id' | 'createdAt' | 'status'>) => void
  onAddToCart: (productId: string, quantity: number, customization?: string) => void
}

// Loja vazia - produtos serão adicionados pelo usuário
const products: Product[] = []

export function Shop({ onCreateOrder, onAddToCart }: ShopProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [customOrderData, setCustomOrderData] = useState({
    type: 'carta' as 'carta' | 'poesia' | 'bilhete',
    description: '',
    specialInstructions: ''
  })
  const [showCustomOrder, setShowCustomOrder] = useState(false)

  const handleCustomOrder = () => {
    if (customOrderData.description.trim()) {
      const price = customOrderData.type === 'carta' ? 89.90 : 
                   customOrderData.type === 'poesia' ? 129.90 : 39.90

      onCreateOrder({
        clientId: 'current-user',
        type: customOrderData.type,
        description: customOrderData.description,
        specialInstructions: customOrderData.specialInstructions || undefined,
        price
      })

      setCustomOrderData({
        type: 'carta',
        description: '',
        specialInstructions: ''
      })
      setShowCustomOrder(false)
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'kit':
        return <Badge className="bg-blue-100 text-blue-700 border-blue-300">Kit Completo</Badge>
      case 'personalizado':
        return <Badge className="bg-purple-100 text-purple-700 border-purple-300">Personalizado</Badge>
      case 'acessorio':
        return <Badge className="bg-green-100 text-green-700 border-green-300">Acessório</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-8">
      {/* Header da Loja */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-amber-400 to-yellow-500 p-3 rounded-full">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-serif text-amber-800">Loja Afetiva</h2>
            <p className="text-amber-600/70">Produtos poéticos para momentos especiais</p>
          </div>
        </div>

        {/* Botão de encomenda personalizada */}
        <Dialog open={showCustomOrder} onOpenChange={setShowCustomOrder}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium">
              <Heart className="w-4 h-4 mr-2" />
              Fazer Encomenda Personalizada
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-serif text-amber-800 text-xl">
                Encomenda Personalizada
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-3">
                {(['carta', 'poesia', 'bilhete'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setCustomOrderData(prev => ({ ...prev, type }))}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      customOrderData.type === type
                        ? 'border-amber-400 bg-amber-50 text-amber-700'
                        : 'border-amber-200 hover:border-amber-300 text-amber-600'
                    }`}
                  >
                    <div className="font-serif font-medium capitalize mb-1">{type}</div>
                    <div className="text-xs opacity-70">
                      R$ {type === 'carta' ? '89,90' : type === 'poesia' ? '129,90' : '39,90'}
                    </div>
                  </button>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição do que você deseja</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva detalhadamente o que você gostaria que fosse escrito. Inclua o contexto, o destinatário, o tom desejado..."
                  value={customOrderData.description}
                  onChange={(e) => setCustomOrderData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[120px] border-amber-200 focus:border-amber-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Instruções especiais (opcional)</Label>
                <Textarea
                  id="instructions"
                  placeholder="Alguma preferência específica de estilo, palavras que devem ser incluídas, referências..."
                  value={customOrderData.specialInstructions}
                  onChange={(e) => setCustomOrderData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                  className="border-amber-200 focus:border-amber-400"
                />
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-amber-800">Valor da encomenda:</span>
                  <span className="text-2xl font-bold text-amber-700">
                    R$ {customOrderData.type === 'carta' ? '89,90' : 
                         customOrderData.type === 'poesia' ? '129,90' : '39,90'}
                  </span>
                </div>
                <p className="text-sm text-amber-600/70 mt-1">
                  Prazo de entrega: 3-5 dias úteis
                </p>
              </div>

              <Button
                onClick={handleCustomOrder}
                disabled={!customOrderData.description.trim()}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Package className="w-4 h-4 mr-2" />
                Fazer Encomenda
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Área de Produtos - Vazia */}
      {products.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-amber-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-amber-400" />
          </div>
          <h3 className="text-2xl font-serif text-amber-800 mb-3">Loja em Preparação</h3>
          <p className="text-amber-600/70 max-w-md mx-auto leading-relaxed">
            Em breve, nossa loja estará repleta de produtos poéticos especiais. 
            Por enquanto, você pode fazer encomendas personalizadas usando o botão acima.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product.id} className="bg-white/70 backdrop-blur-sm border-amber-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-serif text-amber-800 text-lg font-medium">{product.name}</h3>
                  {getCategoryBadge(product.category)}
                </div>
                
                <p className="text-amber-600/80 text-sm mb-4 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-2xl font-bold text-amber-700">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                    {product.inStock ? (
                      <div className="flex items-center gap-1 text-green-600 text-xs">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Em estoque
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-red-600 text-xs">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        Indisponível
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-amber-300 text-amber-700 hover:bg-amber-50"
                          onClick={() => setSelectedProduct(product)}
                        >
                          Ver detalhes
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="font-serif text-amber-800">
                            {product.name}
                          </DialogTitle>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                          
                          <div className="space-y-2">
                            <p className="text-amber-700/80 leading-relaxed">
                              {product.description}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <span className="text-2xl font-bold text-amber-700">
                                R$ {product.price.toFixed(2).replace('.', ',')}
                              </span>
                              {getCategoryBadge(product.category)}
                            </div>
                          </div>

                          <Button
                            onClick={() => onAddToCart(product.id, 1)}
                            disabled={!product.inStock}
                            className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
                          >
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            {product.inStock ? 'Adicionar ao Carrinho' : 'Indisponível'}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      onClick={() => onAddToCart(product.id, 1)}
                      disabled={!product.inStock}
                      size="sm"
                      className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600"
                    >
                      <ShoppingBag className="w-3 h-3 mr-1" />
                      Comprar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Informações de entrega */}
      <div className="grid gap-4 md:grid-cols-3 mt-12">
        <Card className="bg-white/70 backdrop-blur-sm border-amber-200">
          <CardContent className="p-6 text-center">
            <Truck className="w-8 h-8 mx-auto text-amber-500 mb-3" />
            <h3 className="font-serif text-amber-800 mb-2">Entrega Rápida</h3>
            <p className="text-sm text-amber-600/70">
              Produtos físicos em até 7 dias úteis
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/70 backdrop-blur-sm border-amber-200">
          <CardContent className="p-6 text-center">
            <Heart className="w-8 h-8 mx-auto text-amber-500 mb-3" />
            <h3 className="font-serif text-amber-800 mb-2">Feito com Amor</h3>
            <p className="text-sm text-amber-600/70">
              Cada produto é cuidadosamente preparado
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white/70 backdrop-blur-sm border-amber-200">
          <CardContent className="p-6 text-center">
            <CreditCard className="w-8 h-8 mx-auto text-amber-500 mb-3" />
            <h3 className="font-serif text-amber-800 mb-2">Pagamento Seguro</h3>
            <p className="text-sm text-amber-600/70">
              Diversas formas de pagamento disponíveis
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}