"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Heart, MessageCircle, UserPlus, BookOpen, Star, X, Check } from 'lucide-react';
import { Notification } from '@/lib/types';
import { formatRelativeTime } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      userId: 'current-user',
      type: 'like',
      message: 'Helena Coração curtiu sua carta "Palavras ao Vento"',
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
      relatedId: 'letter-1'
    },
    {
      id: '2',
      userId: 'current-user',
      type: 'follow',
      message: 'Ricardo Saudade começou a seguir você',
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
      relatedId: 'user-3'
    },
    {
      id: '3',
      userId: 'current-user',
      type: 'comment',
      message: 'Paulo comentou em sua carta "Memórias de Outono"',
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 dia atrás
      relatedId: 'letter-2'
    },
    {
      id: '4',
      userId: 'current-user',
      type: 'featured',
      message: 'Sua carta "Amor em Versos" foi selecionada como destaque da semana!',
      isRead: false,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 dias atrás
      relatedId: 'letter-3'
    },
    {
      id: '5',
      userId: 'current-user',
      type: 'letter_read',
      message: 'Sua carta foi lida 100 vezes! Parabéns!',
      isRead: true,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 dias atrás
      relatedId: 'letter-1'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <Heart className="h-4 w-4 text-rose-500" />;
      case 'comment':
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      case 'follow':
        return <UserPlus className="h-4 w-4 text-green-500" />;
      case 'letter_read':
        return <BookOpen className="h-4 w-4 text-purple-500" />;
      case 'featured':
        return <Star className="h-4 w-4 text-amber-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return 'from-rose-50 to-pink-50 border-rose-200';
      case 'comment':
        return 'from-blue-50 to-indigo-50 border-blue-200';
      case 'follow':
        return 'from-green-50 to-emerald-50 border-green-200';
      case 'letter_read':
        return 'from-purple-50 to-violet-50 border-purple-200';
      case 'featured':
        return 'from-amber-50 to-yellow-50 border-amber-200';
      default:
        return 'from-gray-50 to-slate-50 border-gray-200';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const removeNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <Card className="w-full max-w-md max-h-[80vh] overflow-hidden bg-gradient-to-br from-[#F5F1E8] to-[#F0E6D2] border-[#D4AF37]/30 mx-4">
        <CardHeader className="border-b border-[#D4AF37]/20">
          <div className="flex items-center justify-between">
            <CardTitle className="font-serif text-lg text-[#8B4513] flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#D4AF37]" />
              Notificações
              {unreadCount > 0 && (
                <Badge className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white text-xs">
                  {unreadCount}
                </Badge>
              )}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-[#8B4513]/60 hover:text-[#8B4513] hover:bg-[#D4AF37]/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs text-[#8B4513]/60 hover:text-[#8B4513] hover:bg-[#D4AF37]/10 self-start"
            >
              <Check className="h-3 w-3 mr-1" />
              Marcar todas como lidas
            </Button>
          )}
        </CardHeader>

        <CardContent className="p-0 overflow-y-auto max-h-[60vh]">
          {notifications.length > 0 ? (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 border-l-4 transition-all duration-200 hover:bg-white/30 cursor-pointer",
                    !notification.isRead 
                      ? "bg-gradient-to-r " + getNotificationColor(notification.type)
                      : "bg-white/10 border-l-gray-300"
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "text-sm leading-relaxed",
                        !notification.isRead 
                          ? "text-[#8B4513] font-medium" 
                          : "text-[#8B4513]/70"
                      )}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-[#8B4513]/50 mt-1">
                        {formatRelativeTime(notification.createdAt)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-[#D4AF37] rounded-full"></div>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                        className="text-[#8B4513]/40 hover:text-[#8B4513] hover:bg-[#D4AF37]/10 p-1 h-auto"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔔</div>
              <h3 className="font-serif text-lg text-[#8B4513] mb-2">
                Nenhuma notificação
              </h3>
              <p className="text-sm text-[#8B4513]/60">
                Quando alguém interagir com suas cartas, você será notificado aqui
              </p>
            </div>
          )}
        </CardContent>

        {notifications.length > 0 && (
          <div className="border-t border-[#D4AF37]/20 p-4">
            <p className="text-xs text-[#8B4513]/60 text-center italic">
              "Cada notificação é um coração que se conectou ao seu"
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}