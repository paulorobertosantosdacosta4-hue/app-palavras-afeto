// Tipos para o aplicativo Amante das Palavras de Afeto

export interface User {
  id: string
  name: string
  username: string
  avatar?: string
  bio?: string
  followers: string[]
  following: string[]
  isAnonymous?: boolean
}

export interface Post {
  id: string
  title: string
  content: string
  type: 'carta' | 'poesia' | 'bilhete'
  authorId: string
  authorName: string
  isAnonymous: boolean
  likes: string[] // IDs dos usuários que curtiram
  comments: Comment[]
  createdAt: Date
  tags?: string[]
}

export interface Comment {
  id: string
  postId: string
  authorId: string
  authorName: string
  content: string
  createdAt: Date
  isAnonymous: boolean
}

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  type: 'digital' | 'physical'
  createdAt: Date
  isRead: boolean
}

export interface CustomOrder {
  id: string
  clientId: string
  type: 'carta' | 'poesia' | 'bilhete'
  description: string
  specialInstructions?: string
  price: number
  status: 'pending' | 'in_progress' | 'completed' | 'delivered'
  createdAt: Date
  deliveryDate?: Date
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'kit' | 'personalizado' | 'acessorio'
  inStock: boolean
}

export interface CartItem {
  productId: string
  quantity: number
  customization?: string
}

export interface Notification {
  id: string
  userId: string
  type: 'like' | 'comment' | 'follow' | 'message' | 'order'
  message: string
  isRead: boolean
  createdAt: Date
  relatedId?: string
}