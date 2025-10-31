import { useState, useEffect } from 'react'
import { Post, User, Comment, Message, CustomOrder, Product, CartItem, Notification } from './types'

// Hook para gerenciar posts
export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Carregar posts do localStorage
    const savedPosts = localStorage.getItem('amante-posts')
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts))
    } else {
      // Posts iniciais para demonstração
      const initialPosts: Post[] = [
        {
          id: '1',
          title: 'Para Você, Meu Amor',
          content: 'Nas manhãs silenciosas, quando o sol desponta tímido no horizonte, penso em você. Suas palavras ecoam em meu coração como melodias suaves, e cada lembrança nossa é um tesouro que guardo com carinho. Escrevo estas linhas não apenas com tinta, mas com toda a ternura que sinto, esperando que chegue até você como um abraço caloroso em dias frios.',
          type: 'carta',
          authorId: 'user1',
          authorName: 'Ana Clara',
          isAnonymous: false,
          likes: ['user2', 'user3'],
          comments: [],
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          tags: ['amor', 'manhã', 'saudade']
        },
        {
          id: '2',
          title: 'Versos do Coração',
          content: `Teus olhos são estrelas que guiam meu caminho,
Tua voz é melodia que embala meus sonhos,
Tuas mãos são poesia que escreve em minha alma
Versos de amor que jamais se apagam.

Em cada batida do meu coração,
Eco teu nome como uma oração,
E mesmo na distância mais cruel,
Meu amor por ti permanece fiel.`,
          type: 'poesia',
          authorId: 'anonymous',
          authorName: 'Anônimo',
          isAnonymous: true,
          likes: ['user1', 'user4'],
          comments: [],
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          tags: ['poesia', 'estrelas', 'coração']
        },
        {
          id: '3',
          title: 'Bilhete de Saudade',
          content: 'Deixo estas palavras como quem deixa flores no caminho, esperando que chegues até elas e sintas o perfume do meu carinho. A saudade que sinto é doce e amarga ao mesmo tempo - doce porque me lembra de ti, amarga porque estás longe. Até breve, meu amor.',
          type: 'bilhete',
          authorId: 'user2',
          authorName: 'João Santos',
          isAnonymous: false,
          likes: ['user1', 'user3', 'user4'],
          comments: [],
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          tags: ['saudade', 'flores', 'carinho']
        }
      ]
      setPosts(initialPosts)
      localStorage.setItem('amante-posts', JSON.stringify(initialPosts))
    }
    setLoading(false)
  }, [])

  const addPost = (post: Omit<Post, 'id' | 'createdAt' | 'likes' | 'comments'>) => {
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date(),
      likes: [],
      comments: []
    }
    const updatedPosts = [newPost, ...posts]
    setPosts(updatedPosts)
    localStorage.setItem('amante-posts', JSON.stringify(updatedPosts))
  }

  const likePost = (postId: string, userId: string) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const hasLiked = post.likes.includes(userId)
        return {
          ...post,
          likes: hasLiked 
            ? post.likes.filter(id => id !== userId)
            : [...post.likes, userId]
        }
      }
      return post
    })
    setPosts(updatedPosts)
    localStorage.setItem('amante-posts', JSON.stringify(updatedPosts))
  }

  const addComment = (postId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      createdAt: new Date()
    }
    
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        }
      }
      return post
    })
    setPosts(updatedPosts)
    localStorage.setItem('amante-posts', JSON.stringify(updatedPosts))
  }

  return { posts, loading, addPost, likePost, addComment }
}

// Hook para gerenciar usuários
export function useUsers() {
  const [currentUser, setCurrentUser] = useState<User>({
    id: 'current-user',
    name: 'Você',
    username: 'voce',
    followers: [],
    following: [],
    bio: 'Amante das palavras e dos sentimentos'
  })

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    // Usuários de demonstração
    const demoUsers: User[] = [
      {
        id: 'user1',
        name: 'Ana Clara',
        username: 'anaclara',
        followers: ['current-user', 'user2'],
        following: ['user2', 'user3'],
        bio: 'Escritora de cartas de amor e poesias românticas'
      },
      {
        id: 'user2',
        name: 'João Santos',
        username: 'joaosantos',
        followers: ['user1'],
        following: ['current-user', 'user1'],
        bio: 'Poeta das pequenas coisas e grandes sentimentos'
      },
      {
        id: 'user3',
        name: 'Maria Fernanda',
        username: 'mariafernanda',
        followers: ['user1'],
        following: ['current-user'],
        bio: 'Colecionadora de palavras bonitas'
      }
    ]
    setUsers(demoUsers)
  }, [])

  const followUser = (userId: string) => {
    const updatedUser = {
      ...currentUser,
      following: currentUser.following.includes(userId)
        ? currentUser.following.filter(id => id !== userId)
        : [...currentUser.following, userId]
    }
    setCurrentUser(updatedUser)
  }

  return { currentUser, users, followUser }
}

// Hook para gerenciar mensagens
export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([])

  const sendMessage = (receiverId: string, content: string, type: 'digital' | 'physical' = 'digital') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'current-user',
      receiverId,
      content,
      type,
      createdAt: new Date(),
      isRead: false
    }
    setMessages(prev => [...prev, newMessage])
  }

  return { messages, sendMessage }
}

// Hook para gerenciar encomendas
export function useOrders() {
  const [orders, setOrders] = useState<CustomOrder[]>([])

  const createOrder = (order: Omit<CustomOrder, 'id' | 'createdAt' | 'status'>) => {
    const newOrder: CustomOrder = {
      ...order,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: 'pending'
    }
    setOrders(prev => [...prev, newOrder])
  }

  return { orders, createOrder }
}

// Hook para gerenciar carrinho de compras
export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (productId: string, quantity: number = 1, customization?: string) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.productId === productId)
      if (existingItem) {
        return prev.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { productId, quantity, customization }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  return { cart, addToCart, removeFromCart, clearCart }
}