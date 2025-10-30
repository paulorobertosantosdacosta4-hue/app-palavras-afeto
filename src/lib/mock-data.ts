import { Letter, User, LetterCategory } from './types';

// Dados mock para demonstração
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Paulo - Amante das Palavras',
    email: 'paulo@palavrasdeafeto.com',
    bio: 'Amante das palavras desde sempre. Acredito que cada carta é um gesto de amor atemporal.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    joinedAt: new Date('2020-01-01'),
    followersCount: 1247,
    followingCount: 89,
    lettersCount: 156
  },
  {
    id: '2',
    name: 'Helena Coração',
    email: 'helena@email.com',
    bio: 'Poetisa das manhãs silenciosas e tardes melancólicas.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    joinedAt: new Date('2023-03-15'),
    followersCount: 342,
    followingCount: 127,
    lettersCount: 23
  },
  {
    id: '3',
    name: 'Ricardo Saudade',
    email: 'ricardo@email.com',
    bio: 'Escrevo sobre o que o tempo levou e o que o coração guardou.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    joinedAt: new Date('2023-06-20'),
    followersCount: 189,
    followingCount: 67,
    lettersCount: 41
  }
];

export const mockLetters: Letter[] = [
  {
    id: '1',
    title: 'Carta para um Amor Distante',
    content: `Meu querido amor,

Escrevo-te nestas linhas que carregam todo o peso da saudade que habita em meu peito. Cada palavra que traço no papel é um suspiro, cada vírgula uma lágrima que insiste em rolar pela face quando penso em ti.

A distância entre nós não é medida em quilômetros, mas em batimentos do coração que ecoam seu nome. Quando o sol se põe e a lua surge tímida no horizonte, imagino que olhas para o mesmo céu, e por um momento, não estamos tão longe assim.

Guardo em minha alma cada momento que vivemos, cada riso compartilhado, cada olhar que dizia mais que mil palavras. O tempo pode passar, as estações podem mudar, mas o que sinto por ti permanece imutável como as estrelas que nos observam.

Até que possamos nos encontrar novamente, carrego-te comigo em cada respiração, em cada sonho, em cada palavra que escrevo.

Com todo o amor que cabe em mim,
Helena`,
    excerpt: 'Escrevo-te nestas linhas que carregam todo o peso da saudade que habita em meu peito. Cada palavra que traço no papel é um suspiro...',
    author: mockUsers[1],
    category: 'saudade',
    isAnonymous: false,
    isPrivate: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    likesCount: 127,
    commentsCount: 23,
    readsCount: 456,
    isLiked: false,
    isFeatured: true
  },
  {
    id: '2',
    title: 'Bilhete de Gratidão',
    content: `Para você que chegou como primavera em meu inverno,

Não sei se as palavras conseguem expressar a gratidão que sinto por ter você em minha vida. Você chegou silenciosamente, como a chuva que chega para regar a terra seca, e transformou tudo ao seu redor.

Obrigada por cada sorriso que me ofereceu nos dias difíceis, por cada abraço que curou feridas que eu nem sabia que existiam. Sua presença é um presente que recebo todos os dias, e não me canso de agradecer ao universo por ter colocado você no meu caminho.

Que nossa amizade seja eterna como as palavras que ficam gravadas no coração.

Com carinho infinito,
Uma alma grata`,
    excerpt: 'Para você que chegou como primavera em meu inverno, não sei se as palavras conseguem expressar a gratidão que sinto...',
    author: mockUsers[0],
    category: 'gratidao',
    isAnonymous: true,
    isPrivate: false,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    likesCount: 89,
    commentsCount: 15,
    readsCount: 234,
    isLiked: true,
    isFeatured: false
  },
  {
    id: '3',
    title: 'Poesia do Recomeço',
    content: `Hoje acordei diferente,
Como se o mundo tivesse mudado de cor.
As mesmas ruas, as mesmas pessoas,
Mas algo em mim renasceu.

Talvez seja a coragem que encontrei
No fundo do poço onde me escondi,
Ou talvez seja simplesmente o tempo
Fazendo seu trabalho silencioso.

Não importa o que foi,
O que importa é o que será.
E eu escolho ser feliz,
Escolho recomeçar.

Cada dia é uma página em branco,
Cada manhã uma nova chance.
E eu, com minha pena na mão,
Vou escrever minha própria dança.`,
    excerpt: 'Hoje acordei diferente, como se o mundo tivesse mudado de cor. As mesmas ruas, as mesmas pessoas, mas algo em mim renasceu...',
    author: mockUsers[2],
    category: 'superacao',
    isAnonymous: false,
    isPrivate: false,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
    likesCount: 156,
    commentsCount: 31,
    readsCount: 378,
    isLiked: false,
    isFeatured: false
  }
];

export const categoryLabels: Record<LetterCategory, string> = {
  amor: 'Amor',
  saudade: 'Saudade',
  desejo: 'Desejo',
  superacao: 'Superação',
  gratidao: 'Gratidão',
  anonima: 'Anônima'
};

export const categoryDescriptions: Record<LetterCategory, string> = {
  amor: 'Cartas que celebram o amor em todas as suas formas',
  saudade: 'Palavras que abraçam a nostalgia e a lembrança',
  desejo: 'Textos que expressam anseios e paixões',
  superacao: 'Histórias de força, coragem e recomeço',
  gratidao: 'Mensagens de reconhecimento e apreço',
  anonima: 'Cartas sem rosto, mas com alma'
};