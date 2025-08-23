'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Users, Clock, Mail, Phone, Eye } from 'lucide-react';

interface WaitlistNotification {
  id: string;
  type: string;
  title: string;
  message: string;
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    source: string;
    timestamp: Date;
  };
  timestamp: Date;
  acknowledged: boolean;
}

interface AdminNotificationsProps {
  isVisible: boolean;
  onClose: () => void;
  onNotificationAcknowledged?: () => void;
}

const AdminNotifications: React.FC<AdminNotificationsProps> = ({ isVisible, onClose, onNotificationAcknowledged }) => {
  const [notifications, setNotifications] = useState<WaitlistNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch notifications
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/waitlist-notifications');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setNotifications(data.notifications);
          setUnreadCount(data.notifications.filter((n: WaitlistNotification) => !n.acknowledged).length);
        }
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Acknowledge notification
  const acknowledgeNotification = async (notificationId: string) => {
    try {
      const response = await fetch('/api/admin/waitlist-notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationId }),
      });

      if (response.ok) {
        // Update local state immediately
        setNotifications(prev => 
          prev.map(n => 
            n.id === notificationId ? { ...n, acknowledged: true } : n
          )
        );
        
        // Update unread count immediately
        setUnreadCount(prev => Math.max(0, prev - 1));
        
        // Call the callback to update parent component
        if (onNotificationAcknowledged) {
          onNotificationAcknowledged();
        }
      }
    } catch (error) {
      console.error('Failed to acknowledge notification:', error);
    }
  };

  // Auto-refresh notifications every 30 seconds
  useEffect(() => {
    if (isVisible) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // Format timestamp
  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-4 top-20 w-96 max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="w-6 h-6" />
            <div>
              <h3 className="font-semibold text-lg">Notifications</h3>
              <p className="text-blue-100 text-sm">
                {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-h-[calc(80vh-80px)] overflow-y-auto">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No new notifications</p>
            <p className="text-sm">You&apos;re all caught up!</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            <AnimatePresence>
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gray-50 rounded-xl p-4 border-l-4 ${
                    notification.acknowledged 
                      ? 'border-gray-300 opacity-60' 
                      : 'border-blue-500'
                  }`}
                >
                  {/* Notification Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {notification.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {notification.message}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                      {!notification.acknowledged && (
                        <button
                          onClick={() => acknowledgeNotification(notification.id)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                          title="Mark as read"
                        >
                          <Eye className="w-4 h-4 text-gray-500" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* User Details */}
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">
                          {notification.userData.firstName} {notification.userData.lastName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 truncate">
                          {notification.userData.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">
                          {notification.userData.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">
                          {notification.userData.source}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {!notification.acknowledged && (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => acknowledgeNotification(notification.id)}
                        className="flex-1 bg-blue-600 text-white text-xs py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Mark as Read
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-700 text-xs py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors">
                        View Details
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="border-t border-gray-200 p-3 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{notifications.length} total notifications</span>
            <button
              onClick={async () => {
                // Mark all unread notifications as read
                const unreadNotifications = notifications.filter(n => !n.acknowledged);
                console.log(`Marking ${unreadNotifications.length} notifications as read`);
                
                // Update local state immediately for better UX
                setNotifications(prev => 
                  prev.map(n => ({ ...n, acknowledged: true }))
                );
                setUnreadCount(0);
                
                // Send acknowledgment requests for all unread notifications
                for (const notification of unreadNotifications) {
                  try {
                    await fetch('/api/admin/waitlist-notifications', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ notificationId: notification.id }),
                    });
                  } catch (error) {
                    console.error(`Failed to acknowledge notification ${notification.id}:`, error);
                  }
                }
                
                // Call the callback to update parent component
                if (onNotificationAcknowledged) {
                  onNotificationAcknowledged();
                }
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Mark all as read
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminNotifications;
