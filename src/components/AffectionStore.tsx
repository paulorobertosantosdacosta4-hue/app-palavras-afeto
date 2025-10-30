"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Heart, Sparkles, Mail, CreditCard } from 'lucide-react';

interface CustomOrderForm {
  clientName: string;
  clientEmail: string;
  theme: string;
  emotionalTone: string;
  deliveryType: 'digital' | 'physical';
  specialRequests: string;
}

export function AffectionStore() {
  const [orderForm, setOrderForm] = useState<CustomOrderForm>({
    clientName: '',
    clientEmail: '',
    theme: '',
    emotionalTone: '',
    deliveryType: 'digital',
    specialRequests: ''
  });

  const [selectedPackage, setSelectedPackage] = useState<string>('');

  const packages = [
    {
      id: 'carta-simples',
      name: 'Carta Simples',
      description: 'Uma carta personalizada de 200-300 palavras',
      price: 'R$ 45,00',
      features: [
        'Carta personalizada',
        'Entrega em 3 dias úteis',
        'Revisão incluída',
        'Formato digital ou físico'
      ],
      icon: '💌'
    },
    {
      id: 'carta-premium',
      name: 'Carta Premium',
      description: 'Carta elaborada de 400-600 palavras com elementos poéticos',
      price: 'R$ 85,00',
      features: [
        'Carta elaborada e poética',
        'Entrega em 2 dias úteis',
        '2 revisões incluídas',
        'Caligrafia artística (físico)',
        'Envelope selado'
      ],
      icon: '✨',
      popular: true
    },
    {
      id: 'colecao-cartas',
      name: 'Coleção de Cartas',
      description: 'Conjunto de 3 cartas temáticas personalizadas',
      price: 'R$ 220,00',
      features: [
        '3 cartas temáticas',
        'Entrega em 5 dias úteis',
        'Revisões ilimitadas',
        'Embalagem especial',
        'Certificado de autenticidade'
      ],
      icon: '📚'
    }
  ];

  const emotionalTones = [
    { value: 'romantico', label: 'Romântico' },
    { value: 'nostalgico', label: 'Nostálgico' },
    { value: 'esperancoso', label: 'Esperançoso' },
    { value: 'apaixonado', label: 'Apaixonado' },
    { value: 'melancólico', label: 'Melancólico' },
    { value: 'gratidao', label: 'Gratidão' },
    { value: 'saudade', label: 'Saudade' },
    { value: 'celebracao', label: 'Celebração' }
  ];

  const handleInputChange = (field: keyof CustomOrderForm, value: string) => {
    setOrderForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitOrder = () => {
    if (!selectedPackage || !orderForm.clientName || !orderForm.clientEmail || !orderForm.theme) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Aqui seria integrado com sistema de pagamento
    alert('Pedido enviado com sucesso! Você receberá um email com as instruções de pagamento.');
    
    // Reset form
    setOrderForm({
      clientName: '',
      clientEmail: '',
      theme: '',
      emotionalTone: '',
      deliveryType: 'digital',
      specialRequests: ''
    });
    setSelectedPackage('');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="font-serif text-3xl text-[#8B4513]">
          Loja Afetiva
        </h2>
        <p className="text-[#8B4513]/70 italic max-w-2xl mx-auto">
          "Encomende cartas personalizadas escritas com o coração por Paulo, o Amante das Palavras de Afeto"
        </p>
      </div>

      {/* Pacotes disponíveis */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <Card 
            key={pkg.id}
            className={`relative cursor-pointer transition-all duration-300 hover:shadow-2xl bg-gradient-to-br from-[#F5F1E8] to-[#F0E6D2] border-2 ${
              selectedPackage === pkg.id 
                ? 'border-[#D4AF37] shadow-lg' 
                : 'border-[#D4AF37]/20 hover:border-[#D4AF37]/40'
            }`}
            onClick={() => setSelectedPackage(pkg.id)}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white px-4 py-1">
                  ⭐ Mais Popular
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div className="text-4xl mb-2">{pkg.icon}</div>
              <CardTitle className="font-serif text-xl text-[#8B4513]">
                {pkg.name}
              </CardTitle>
              <p className="text-sm text-[#8B4513]/70">
                {pkg.description}
              </p>
              <div className="text-2xl font-bold text-[#D4AF37] mt-2">
                {pkg.price}
              </div>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-[#8B4513]/80">
                    <Heart className="h-3 w-3 text-[#D4AF37] mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Formulário de pedido */}
      {selectedPackage && (
        <Card className="bg-gradient-to-br from-[#F5F1E8] to-[#F0E6D2] border-[#D4AF37]/30">
          <CardHeader>
            <CardTitle className="font-serif text-xl text-[#8B4513] flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#D4AF37]" />
              Personalize Seu Pedido
            </CardTitle>
            <p className="text-sm text-[#8B4513]/70">
              Conte-nos sobre o que você gostaria que fosse escrito
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName" className="text-[#8B4513] font-medium">
                  Seu Nome *
                </Label>
                <Input
                  id="clientName"
                  placeholder="Como devemos te chamar?"
                  value={orderForm.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  className="bg-white/50 border-[#D4AF37]/30 focus:border-[#D4AF37]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientEmail" className="text-[#8B4513] font-medium">
                  Seu Email *
                </Label>
                <Input
                  id="clientEmail"
                  type="email"
                  placeholder="seu@email.com"
                  value={orderForm.clientEmail}
                  onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                  className="bg-white/50 border-[#D4AF37]/30 focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme" className="text-[#8B4513] font-medium">
                Tema da Carta *
              </Label>
              <Input
                id="theme"
                placeholder="Ex: Carta de amor para minha esposa, Pedido de desculpas, Declaração de amor..."
                value={orderForm.theme}
                onChange={(e) => handleInputChange('theme', e.target.value)}
                className="bg-white/50 border-[#D4AF37]/30 focus:border-[#D4AF37]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emotionalTone" className="text-[#8B4513] font-medium">
                  Tom Emocional
                </Label>
                <Select value={orderForm.emotionalTone} onValueChange={(value) => handleInputChange('emotionalTone', value)}>
                  <SelectTrigger className="bg-white/50 border-[#D4AF37]/30 focus:border-[#D4AF37]">
                    <SelectValue placeholder="Escolha o tom desejado" />
                  </SelectTrigger>
                  <SelectContent>
                    {emotionalTones.map((tone) => (
                      <SelectItem key={tone.value} value={tone.value}>
                        {tone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryType" className="text-[#8B4513] font-medium">
                  Tipo de Entrega
                </Label>
                <Select value={orderForm.deliveryType} onValueChange={(value) => handleInputChange('deliveryType', value as 'digital' | 'physical')}>
                  <SelectTrigger className="bg-white/50 border-[#D4AF37]/30 focus:border-[#D4AF37]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="digital">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Digital (PDF)
                      </div>
                    </SelectItem>
                    <SelectItem value="physical">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Física (Correios)
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequests" className="text-[#8B4513] font-medium">
                Pedidos Especiais
              </Label>
              <Textarea
                id="specialRequests"
                placeholder="Conte-nos mais detalhes sobre o que você gostaria na carta, contexto da situação, sentimentos específicos que quer expressar..."
                value={orderForm.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                className="min-h-[100px] bg-white/50 border-[#D4AF37]/30 focus:border-[#D4AF37] resize-none"
              />
            </div>

            <Separator className="bg-[#D4AF37]/20" />

            <div className="flex justify-between items-center">
              <div className="text-sm text-[#8B4513]/70">
                <p>✨ Todas as cartas são escritas à mão (digitalmente) com muito carinho</p>
                <p>💌 Entrega garantida no prazo ou seu dinheiro de volta</p>
              </div>

              <Button
                onClick={handleSubmitOrder}
                className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white px-8 py-3 text-lg transition-all duration-300 hover:shadow-lg"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                Fazer Pedido
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Informações adicionais */}
      <Card className="bg-gradient-to-br from-[#F5F1E8] to-[#F0E6D2] border-[#D4AF37]/30">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">⏰</div>
              <h3 className="font-serif text-lg text-[#8B4513] mb-1">Entrega Rápida</h3>
              <p className="text-sm text-[#8B4513]/70">
                Cartas digitais em até 3 dias úteis
              </p>
            </div>
            
            <div>
              <div className="text-3xl mb-2">✍️</div>
              <h3 className="font-serif text-lg text-[#8B4513] mb-1">Feito com Amor</h3>
              <p className="text-sm text-[#8B4513]/70">
                Cada palavra é cuidadosamente escolhida
              </p>
            </div>
            
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <h3 className="font-serif text-lg text-[#8B4513] mb-1">100% Personalizado</h3>
              <p className="text-sm text-[#8B4513]/70">
                Único e exclusivo para você
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}