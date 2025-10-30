import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { LetterCategory } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utilitários para formatação de datas
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'agora mesmo';
  if (diffInSeconds < 3600) return `há ${Math.floor(diffInSeconds / 60)} minutos`;
  if (diffInSeconds < 86400) return `há ${Math.floor(diffInSeconds / 3600)} horas`;
  if (diffInSeconds < 2592000) return `há ${Math.floor(diffInSeconds / 86400)} dias`;
  
  return formatDate(date);
}

// Utilitário para truncar texto
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

// Utilitário para gerar excerpt de cartas
export function generateExcerpt(content: string, maxLength: number = 150): string {
  const cleanContent = content.replace(/\n/g, ' ').trim();
  return truncateText(cleanContent, maxLength);
}

// Utilitário para validar email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Utilitário para gerar cores de categoria
export function getCategoryColor(category: string): string {
  const colors = {
    amor: 'from-rose-400 to-pink-500',
    saudade: 'from-purple-400 to-indigo-500',
    desejo: 'from-red-400 to-rose-500',
    superacao: 'from-emerald-400 to-teal-500',
    gratidao: 'from-amber-400 to-orange-500',
    anonima: 'from-gray-400 to-slate-500'
  };
  return colors[category as keyof typeof colors] || 'from-gray-400 to-slate-500';
}

// Labels das categorias
export const categoryLabels: Record<LetterCategory, string> = {
  amor: 'Amor',
  saudade: 'Saudade',
  desejo: 'Desejo',
  superacao: 'Superação',
  gratidao: 'Gratidão',
  anonima: 'Anônima'
};

// Utilitário para gerar mensagens poéticas
export function getPoeticalMessage(type: string): string {
  const messages = {
    welcome: [
      "Onde cada palavra é um abraço ao coração",
      "O romantismo vive em cada linha escrita",
      "Aqui, as palavras dançam com a alma"
    ],
    newLetter: [
      "Sua pena está pronta para criar magia",
      "Deixe seu coração guiar suas palavras",
      "Cada carta é um pedaço da sua alma"
    ],
    liked: [
      "Alguém se encantou com suas palavras",
      "Seu coração tocou outro coração",
      "Suas palavras encontraram um lar"
    ],
    followed: [
      "Você ganhou um novo leitor",
      "Alguém escolheu seguir sua jornada poética",
      "Mais um coração se conectou ao seu"
    ]
  };
  
  const messageArray = messages[type as keyof typeof messages] || messages.welcome;
  return messageArray[Math.floor(Math.random() * messageArray.length)];
}