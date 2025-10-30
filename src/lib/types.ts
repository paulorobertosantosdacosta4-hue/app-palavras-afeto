// Tipos para o aplicativo Amante das Palavras de Afeto

export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  seal?: string; // Selo personalizado
  joinedAt: Date;
  followersCount: number;
  followingCount: number;
  lettersCount: number;
}

export interface Letter {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: User;
  category: LetterCategory;
  isAnonymous: boolean;
  isPrivate: boolean;
  recipientId?: string;
  createdAt: Date;
  updatedAt: Date;
  likesCount: number;
  commentsCount: number;
  readsCount: number;
  isLiked?: boolean;
  isFeatured?: boolean;
}

export type LetterCategory = 
  | 'amor' 
  | 'saudade' 
  | 'desejo' 
  | 'superacao' 
  | 'gratidao' 
  | 'anonima';

export interface Comment {
  id: string;
  content: string;
  author: User;
  letterId: string;
  createdAt: Date;
  likesCount: number;
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: Date;
}

export interface CustomOrder {
  id: string;
  clientName: string;
  clientEmail: string;
  theme: string;
  emotionalTone: string;
  deliveryType: 'digital' | 'physical';
  price: number;
  status: 'pending' | 'in_progress' | 'completed' | 'delivered';
  createdAt: Date;
  completedAt?: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'letter_read' | 'featured';
  message: string;
  isRead: boolean;
  createdAt: Date;
  relatedId?: string;
}

export interface LibraryCollection {
  id: string;
  title: string;
  description: string;
  category: LetterCategory;
  letters: Letter[];
  isPublic: boolean;
}