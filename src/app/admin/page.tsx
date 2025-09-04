'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Download, Save, X, Plus, Minus, Gift, Flower, Zap,
  Users, UserCheck, Eye, 
  ChevronDown, ChevronUp, BarChart3,
  Bell, CheckCircle, AlertCircle, Clock, Send, Lock
} from 'lucide-react';
import { 
  getAppUsers, 
  getWaitlistUsers, 
  deleteWaitlistUser,
  assignfullcircleSubscription,
  grantLotusFlowers,
  revokeLotusFlowers,
  sendNotification,
  getAdminStats,
  performBulkOperation
} from '@/services/firebase/adminFunctions';
import { WaitlistUser, AdminStats } from '@/types';
import { UserData } from '@/services/firebase/adminFunctions';
import AdminNotifications from '@/app/components/AdminNotifications';

// Define types for filter presets to avoid hydration issues
interface FilterPreset {
  id: string;
  name: string;
  filters: {
    dateRange: { start: string | null; end: string | null };
    lotusCount: { min: number | null; max: number | null };
    radianceBoosts: { min: number | null; max: number | null };
    subscriptionStatus: string;
    onboardingStatus: string;
    location: string;
    spiritualPractices: string[];
    connectionIntent: string;
    hasPhotos: boolean | null;
    isSeedUser: boolean | null;
    lastActive: { start: string | null; end: string | null };
  };
}

// Filter presets for common queries - using relative dates to avoid hydration issues
const FILTER_PRESETS: FilterPreset[] = [
  {
    id: 'new-users',
    name: 'New Users (Last 7 Days)',
    filters: {
      dateRange: { start: '7days', end: 'now' }, // Use relative dates
      onboardingStatus: 'incomplete',
      lotusCount: { min: null, max: null },
      radianceBoosts: { min: null, max: null },
      subscriptionStatus: '',
      location: '',
      spiritualPractices: [],
      connectionIntent: '',
      hasPhotos: null,
      isSeedUser: null,
      lastActive: { start: null, end: null }
    }
  },
  {
    id: 'active-subscribers',
    name: 'Active Subscribers',
    filters: {
      dateRange: { start: null, end: null },
      onboardingStatus: 'completed',
      lotusCount: { min: null, max: null },
      radianceBoosts: { min: null, max: null },
      subscriptionStatus: 'active',
      location: '',
      spiritualPractices: [],
      connectionIntent: '',
      hasPhotos: null,
      isSeedUser: null,
      lastActive: { start: null, end: null }
    }
  },
  {
    id: 'lotus-spenders',
    name: 'High Lotus Users',
    filters: {
      dateRange: { start: null, end: null },
      onboardingStatus: '',
      lotusCount: { min: 10, max: null },
      radianceBoosts: { min: null, max: null },
      subscriptionStatus: '',
      location: '',
      spiritualPractices: [],
      connectionIntent: '',
      hasPhotos: null,
      isSeedUser: null,
      lastActive: { start: null, end: null }
    }
  },
  {
    id: 'inactive-users',
    name: 'Inactive Users (30+ Days)',
    filters: {
      dateRange: { start: null, end: null },
      onboardingStatus: '',
      lotusCount: { min: null, max: null },
      radianceBoosts: { min: null, max: null },
      subscriptionStatus: '',
      location: '',
      spiritualPractices: [],
      connectionIntent: '',
      hasPhotos: null,
      isSeedUser: null,
      lastActive: { start: '30days', end: null } // Use relative dates
    }
  },
  {
    id: 'spiritual-practitioners',
    name: 'Spiritual Practitioners',
    filters: {
      dateRange: { start: null, end: null },
      onboardingStatus: '',
      lotusCount: { min: null, max: null },
      radianceBoosts: { min: null, max: null },
      subscriptionStatus: '',
      location: '',
      spiritualPractices: ['meditation', 'yoga', 'crystal-healing'],
      connectionIntent: '',
      hasPhotos: null,
      isSeedUser: null,
      lastActive: { start: null, end: null }
    }
  }
];

export default function AdminDashboard() {
  // Password protection state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Existing state
  const [assigningSubscription, setAssigningSubscription] = useState<string | null>(null);
  const [waitlistUsers, setWaitlistUsers] = useState<WaitlistUser[]>([]);
  const [appUsers, setAppUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'waitlist' | 'app-users' | 'search' | 'lotus' | 'notifications' | 'bulk-ops'>('dashboard');

  // New state for enhanced features
  const [adminStats, setAdminStats] = useState<AdminStats | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [lotusAmount, setLotusAmount] = useState(1);
  const [lotusReason, setLotusReason] = useState('');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'email' | 'push' | 'both'>('both');
  const [bulkOperationType, setBulkOperationType] = useState<'grantLotus' | 'revokeLotus' | 'sendNotification' | 'grantSubscription' | 'revokeSubscription'>('grantLotus');
  const [showLotusModal, setShowLotusModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<WaitlistUser | null>(null);
  const [processing, setProcessing] = useState(false);

  // New advanced filtering state
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, unknown>>({});
  const [savedFilterPresets, setSavedFilterPresets] = useState(FILTER_PRESETS);
  const [currentFilterPreset, setCurrentFilterPreset] = useState<string | ''>('');
  const [filterPresetName, setFilterPresetName] = useState('');
  const [showSavePresetModal, setShowSavePresetModal] = useState(false);

  // Advanced filter options
  const [filterOptions, setFilterOptions] = useState({
    dateRange: { start: null as string | null, end: null as string | null },
    lotusCount: { min: null as number | null, max: null as number | null },
    radianceBoosts: { min: null as number | null, max: null as number | null },
    subscriptionStatus: '' as string,
    onboardingStatus: '' as string,
    location: '' as string,
    spiritualPractices: [] as string[],
    connectionIntent: '' as string,
    hasPhotos: null as boolean | null,
    isSeedUser: null as boolean | null,
    lastActive: { start: null as string | null, end: null as string | null }
  });

  // User selection and search state
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userFilterType, setUserFilterType] = useState<'all' | 'withPush' | 'withoutPush'>('all');
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const [usersPerPage] = useState(10);
  
  // Notification state
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  
  // Email modal state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [emailRecipient, setEmailRecipient] = useState<WaitlistUser | null>(null);
  const [isBulkEmail, setIsBulkEmail] = useState(false);
  
  // Comment expansion state
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());

  // Waitlist sorting state
  const [waitlistSortField, setWaitlistSortField] = useState<'name' | 'email' | 'createdAt' | 'heardFrom' | 'phoneNumber' | 'commentsLength'>('createdAt');
  const [waitlistSortDirection, setWaitlistSortDirection] = useState<'asc' | 'desc'>('desc');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    console.log('🔍 useEffect triggered, isAuthenticated:', isAuthenticated);
    // Only load data if user is authenticated
    if (isAuthenticated) {
      console.log('✅ User is authenticated, loading data...');
      loadAllUsers();
      loadAdminStats();
      loadNotifications();
      
      // Set up periodic refresh for notifications
      const notificationInterval = setInterval(loadNotifications, 60000); // Refresh every minute
      
      return () => clearInterval(notificationInterval);
    } else {
      console.log('❌ User is not authenticated, skipping data load');
    }
  }, [isAuthenticated]);

  const loadAllUsers = async () => {
    setLoading(true);
    try {
      const waitlist = await getWaitlistUsers();
      setWaitlistUsers(waitlist ?? []);
      
      // Try to load app users if they exist (from mobile app onboarding)
      try {
        const appUsersList = await getAppUsers();
        setAppUsers(appUsersList ?? []);
      } catch {
        // No app users exist yet - this is expected until mobile app launches
        console.log('No app users found yet - this is expected until mobile app launches');
        setAppUsers([]);
      }
    } catch (error) {
      console.error('Error loading users:', error);
      alert(`Failed to load users: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const loadAdminStats = async () => {
    try {
      const result = await getAdminStats();
      if (result.success && result.stats) {
        setAdminStats(result.stats as unknown as AdminStats);
      }
    } catch (error) {
      console.error('Error loading admin stats:', error);
      // Set default stats for waitlist-only mode
      setAdminStats({
        totalUsers: waitlistUsers.length,
        activeSubscriptions: 0,
        waitlistUsers: waitlistUsers.length,
        totalLotusBalance: 0,
        totalLotusGranted: 0,
        totalLotusSpent: 0,
        totalRadianceBoosts: 0,
        averageLotusPerUser: 0,
        recentSignups: 0,
        recentSubscriptions: 0,
        onboardingCompletionRate: 0
      });
    }
  };

  const loadNotifications = async () => {
    try {
      const response = await fetch('/api/admin/waitlist-notifications');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const unreadCount = data.notifications.filter((n: { acknowledged: boolean }) => !n.acknowledged).length;
          console.log(`📊 Loaded notifications: ${data.notifications.length} total, ${unreadCount} unread`);
          setNotificationCount(unreadCount);
        }
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
      // Don't change the count on error
    }
  };



  const handleGrantSubscription = async (userId: string) => {
    setAssigningSubscription(userId);
    try {
      const result = await assignfullcircleSubscription(userId);
      if (result.success) {
        alert(`Successfully granted fullcircle subscription to user!`);
        await loadAllUsers();
        await loadAdminStats();
      } else {
        alert(`Failed to grant subscription: ${result.error}`);
      }
    } catch (error) {
      console.error('Error granting subscription:', error);
      alert('Failed to grant subscription. Please try again.');
    } finally {
      setAssigningSubscription(null);
    }
  };

  const canGrantSubscription = (user: UserData) => {
    return user.onboardingCompleted === true;
  };

  const getOnboardingStatus = (user: UserData) => {
    if (user.onboardingCompleted === true) {
      return { status: 'completed', icon: <CheckCircle className="w-4 h-4 text-green-500" />, text: 'Onboarding Complete' };
    } else if (user.onboardingCompleted === false) {
      return { status: 'incomplete', icon: <AlertCircle className="w-4 h-4 text-yellow-500" />, text: 'Onboarding Incomplete' };
    } else {
      return { status: 'unknown', icon: <Clock className="w-4 h-4 text-gray-400" />, text: 'Status Unknown' };
    }
  };

  const handleGrantLotus = async (userId: string) => {
    if (!lotusAmount || !lotusReason) {
      alert('Please enter amount and reason');
      return;
    }

    setProcessing(true);
    try {
      const result = await grantLotusFlowers(userId, lotusAmount, lotusReason);
      if (result.success) {
        alert(`Successfully granted ${lotusAmount} lotus flowers! New balance: ${result.newBalance}`);
        setShowLotusModal(false);
        setLotusAmount(1);
        setLotusReason('');
        await loadAllUsers();
        await loadAdminStats();
      } else {
        alert(`Failed to grant lotus: ${result.error}`);
      }
    } catch (error) {
      console.error('Error granting lotus:', error);
      alert('Failed to grant lotus flowers. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleRevokeLotus = async (userId: string) => {
    if (!lotusAmount || !lotusReason) {
      alert('Please enter amount and reason');
      return;
    }

    setProcessing(true);
    try {
      const result = await revokeLotusFlowers(userId, lotusAmount, lotusReason);
      if (result.success) {
        alert(`Successfully revoked ${lotusAmount} lotus flowers! New balance: ${result.newBalance}`);
        setShowLotusModal(false);
        setLotusAmount(1);
        setLotusReason('');
        await loadAllUsers();
        await loadAdminStats();
      } else {
        alert(`Failed to revoke lotus: ${result.error}`);
      }
    } catch (error) {
      console.error('Error revoking lotus:', error);
      alert('Failed to revoke lotus flowers. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleSendNotification = async () => {
    if (!notificationTitle || !notificationMessage) {
      alert('Please enter title and message');
      return;
    }

    setProcessing(true);
    try {
      const userIds = selectedUsers.length > 0 ? selectedUsers : null; // null for broadcast
      const result = await sendNotification(userIds, notificationTitle, notificationMessage, notificationType);
      if (result.success) {
        const message = `✅ Notification sent successfully!\n\n📊 Delivery Results:\n• Total Recipients: ${result.totalRecipients}\n• Successful: ${result.successfulDeliveries}\n• Failed: ${result.failedDeliveries || 0}\n\n🆔 Notification ID: ${result.notificationId}`;
        alert(message);
        setShowNotificationModal(false);
        setNotificationTitle('');
        setNotificationMessage('');
        setSelectedUsers([]);
      } else {
        alert(`❌ Failed to send notification: ${result.error}`);
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleBulkOperation = async () => {
    if (selectedUsers.length === 0) {
      alert('Please select users for bulk operation');
      return;
    }

    setProcessing(true);
    try {
      let data = {};
      if (bulkOperationType === 'grantLotus' || bulkOperationType === 'revokeLotus') {
        data = { amount: lotusAmount, reason: lotusReason };
      } else if (bulkOperationType === 'sendNotification') {
        data = { title: notificationTitle, message: notificationMessage, type: notificationType };
      }

      const result = await performBulkOperation(bulkOperationType, selectedUsers, data);
      if (result.success) {
        alert(`Bulk operation completed successfully! Operation ID: ${result.operationId}`);
        setShowBulkModal(false);
        setSelectedUsers([]);
        await loadAllUsers();
        await loadAdminStats();
      } else {
        alert(`Failed to perform bulk operation: ${result.error}`);
      }
    } catch (error) {
      console.error('Error performing bulk operation:', error);
      alert('Failed to perform bulk operation. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleDeleteWaitlistUser = async (user: WaitlistUser) => {
    if (!user.id) {
      alert('Cannot delete user: No user ID found');
      return;
    }

    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDeleteWaitlistUser = async () => {
    if (!userToDelete?.id) return;

    setProcessing(true);
    try {
      const result = await deleteWaitlistUser(userToDelete.id);
      if (result.success) {
        alert(`Successfully deleted waitlist user: ${userToDelete.email}`);
        setShowDeleteModal(false);
        setUserToDelete(null);
        await loadAllUsers();
        await loadAdminStats();
      } else {
        alert(`Failed to delete user: ${result.error}`);
      }
    } catch (error) {
      console.error('Error deleting waitlist user:', error);
      alert('Failed to delete waitlist user. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const confirmBulkDeleteWaitlistUsers = async () => {
    if (selectedUsers.length === 0) return;

    setProcessing(true);
    try {
      let successCount = 0;
      let errorCount = 0;

      for (const userId of selectedUsers) {
        const result = await deleteWaitlistUser(userId);
        if (result.success) {
          successCount++;
        } else {
          errorCount++;
        }
      }

      alert(`Bulk deletion completed!\n\n✅ Successfully deleted: ${successCount} users\n❌ Failed to delete: ${errorCount} users`);
      
      setShowDeleteModal(false);
      setSelectedUsers([]);
      await loadAllUsers();
      await loadAdminStats();
    } catch (error) {
      console.error('Error during bulk deletion:', error);
      alert('Failed to complete bulk deletion. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAllUsers = () => {
    // Select from both waitlist and app users
    const allUserIds = [
      ...waitlistUsers.map(user => user.id || ''),
      ...appUsers.map(user => user.userId)
    ].filter(id => id !== '');
    setSelectedUsers(allUserIds);
  };

  const clearSelection = () => {
    setSelectedUsers([]);
  };

  // Manual email composition for waitlist users
  const handleSendWaitlistEmail = async (user: WaitlistUser) => {
    setEmailRecipient(user);
    setIsBulkEmail(false);
    setEmailSubject('Message from fullcircle');
    setEmailMessage('Hello! We wanted to reach out...');
    setShowEmailModal(true);
  };

  const handleSendWaitlistUpdate = async (user: WaitlistUser) => {
    setEmailRecipient(user);
    setIsBulkEmail(false);
    setEmailSubject('fullcircle App Update');
    setEmailMessage('Great news! We have an update...');
    setShowEmailModal(true);
  };

  const handleBulkSendWaitlistEmails = async () => {
    if (selectedUsers.length === 0) return;
    
    setEmailRecipient(null);
    setIsBulkEmail(true);
    setEmailSubject('Message from fullcircle');
    setEmailMessage('Hello! We wanted to reach out...');
    setShowEmailModal(true);
  };

  const toggleCommentExpansion = (commentId: string) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  const sendEmail = async () => {
    if (!emailSubject.trim() || !emailMessage.trim()) {
      alert('Please enter both subject and message');
      return;
    }

    setProcessing(true);
    try {
      let successCount = 0;
      let errorCount = 0;

      if (isBulkEmail) {
        // Send to all selected users
        for (const userId of selectedUsers) {
          const user = waitlistUsers.find(u => u.id === userId);
          if (user) {
            try {
              const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  to: user.email,
                  subject: emailSubject,
                  html: `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>fullcircle</title>
                        <style>
                            body {
                                margin: 0;
                                padding: 0;
                                font-family: 'Georgia', 'Times New Roman', serif;
                                background: linear-gradient(135deg, #1A1815 0%, #252320 100%);
                                color: #F5E6D3;
                                line-height: 1.6;
                            }
                            .email-container {
                                max-width: 650px;
                                margin: 20px auto;
                                background: linear-gradient(180deg, #252320 0%, #1A1815 100%);
                                border-radius: 32px;
                                overflow: hidden;
                                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
                                border: 1px solid rgba(196, 169, 132, 0.2);
                            }
                            .header {
                                background: linear-gradient(135deg, #3D3B37 0%, #2D2B27 50%, #1A1815 100%);
                                padding: 50px 40px;
                                text-align: center;
                                position: relative;
                                border-radius: 32px 32px 0 0;
                            }
                            .header::before {
                                content: '';
                                position: absolute;
                                top: 0;
                                left: 0;
                                right: 0;
                                bottom: 0;
                                background: radial-gradient(circle at 30% 20%, rgba(196, 169, 132, 0.1) 0%, transparent 50%),
                                            radial-gradient(circle at 70% 80%, rgba(196, 169, 132, 0.08) 0%, transparent 50%);
                                border-radius: 32px 32px 0 0;
                            }
                            .logo-container {
                                position: relative;
                                z-index: 2;
                            }
                            .logo {
                                width: 100%;
                                max-width: 200px;
                                height: auto;
                                margin: 0 auto 25px;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                            .logo img {
                                width: 100%;
                                max-width: 200px;
                                height: auto;
                                display: block;
                                border-radius: 16px;
                                object-fit: contain;
                            }
                            .header-title {
                                font-family: 'Georgia', serif;
                                color: #F5E6D3;
                                font-size: 42px;
                                font-weight: 700;
                                margin: 0;
                                text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                                letter-spacing: 1px;
                            }
                            .header-subtitle {
                                font-family: 'Georgia', serif;
                                color: rgba(245, 230, 211, 0.9);
                                font-size: 18px;
                                margin: 15px 0 0 0;
                                font-weight: 500;
                                letter-spacing: 0.5px;
                            }
                            .content {
                                padding: 50px 40px;
                                background: linear-gradient(180deg, #252320 0%, #1A1815 100%);
                            }
                            .section {
                                background: rgba(37, 35, 32, 0.8);
                                padding: 20px;
                                border-radius: 24px;
                                margin-bottom: 20px;
                                border: 1px solid rgba(196, 169, 132, 0.2);
                                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
                            }
                            .section-text {
                                color: #F5E6D3;
                                font-size: 17px;
                                line-height: 1.8;
                                margin: 0;
                                text-align: center;
                                font-family: 'Georgia', 'Times New Roman', serif;
                                font-weight: 400;
                                letter-spacing: 0.3px;
                            }
                            .footer {
                                background: linear-gradient(135deg, #1A1815 0%, #252320 100%);
                                padding: 40px;
                                text-align: center;
                                border-top: 1px solid rgba(196, 169, 132, 0.2);
                                border-radius: 0 0 32px 32px;
                            }
                            .footer-text {
                                color: #C4A984;
                                font-size: 15px;
                                margin: 0 0 12px 0;
                                font-weight: 500;
                            }
                            .footer-signature {
                                color: #C4A984;
                                font-weight: 600;
                                font-family: 'Georgia', serif;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="email-container">
                            <div class="header">
                                <div class="logo-container">
                                    <div class="logo">
                                        <img src="cid:email-logo" 
                                             alt="fullcircle Logo" 
                                             width="200" 
                                             height="200" 
                                             style="width: 100%; max-width: 200px; height: auto; display: block; border-radius: 16px;" />
                                    </div>
                                    <h1 class="header-title">fullcircle</h1>
                                    <p class="header-subtitle">Meaningful Connections</p>
                                </div>
                            </div>
                            
                            <div class="content">
                                <div class="section">
                                    <p class="section-text">${emailMessage}</p>
                                </div>
                            </div>
                            
                            <div class="footer">
                                <p class="footer-text">This email was sent from the fullcircle admin dashboard</p>
                                <p class="footer-text">With gratitude and light,<br><span class="footer-signature">The fullcircle Team</span></p>
                            </div>
                        </div>
                    </body>
                    </html>
                  `
                }),
              });

              const result = await response.json();
              if (result.success) {
                successCount++;
              } else {
                errorCount++;
              }
            } catch {
              errorCount++;
            }
          }
        }

        alert(`Bulk email sending completed!\n\n✅ Successfully sent: ${successCount} emails\n❌ Failed to send: ${errorCount} emails`);
        setSelectedUsers([]);
      } else {
        // Send to single user
        if (emailRecipient) {
          const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              to: emailRecipient.email,
              subject: emailSubject,
              html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>fullcircle</title>
                    <style>
                        body {
                            margin: 0;
                            padding: 0;
                            font-family: 'Georgia', 'Times New Roman', serif;
                            background: linear-gradient(135deg, #1A1815 0%, #252320 100%);
                            color: #F5E6D3;
                            line-height: 1.6;
                        }
                        .email-container {
                            max-width: 650px;
                            margin: 20px auto;
                            background: linear-gradient(180deg, #252320 0%, #1A1815 100%);
                            border-radius: 32px;
                            overflow: hidden;
                            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
                            border: 1px solid rgba(196, 169, 132, 0.2);
                        }
                        .header {
                            background: linear-gradient(135deg, #3D3B37 0%, #2D2B27 50%, #1A1815 100%);
                            padding: 50px 40px;
                            text-align: center;
                            position: relative;
                            border-radius: 32px 32px 0 0;
                        }
                        .header::before {
                            content: '';
                            position: absolute;
                            top: 0;
                            left: 0;
                            right: 0;
                            bottom: 0;
                            background: radial-gradient(circle at 30% 20%, rgba(196, 169, 132, 0.1) 0%, transparent 50%),
                                        radial-gradient(circle at 70% 80%, rgba(196, 169, 132, 0.08) 0%, transparent 50%);
                            border-radius: 32px 32px 0 0;
                        }
                        .logo-container {
                            position: relative;
                            z-index: 2;
                        }
                        .logo {
                            width: 100%;
                            max-width: 200px;
                            height: auto;
                            margin: 0 auto 25px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .logo img {
                            width: 100%;
                            max-width: 200px;
                            height: auto;
                            display: block;
                            border-radius: 16px;
                            object-fit: contain;
                        }
                        .header-title {
                            font-family: 'Georgia', serif;
                            color: #F5E6D3;
                            font-size: 42px;
                            font-weight: 700;
                            margin: 0;
                            text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                            letter-spacing: 1px;
                        }
                        .header-subtitle {
                            font-family: 'Georgia', serif;
                            color: rgba(245, 230, 211, 0.9);
                            font-size: 18px;
                            margin: 15px 0 0 0;
                            font-weight: 500;
                            letter-spacing: 0.5px;
                        }
                        .content {
                            padding: 50px 40px;
                            background: linear-gradient(180deg, #252320 0%, #1A1815 100%);
                        }
                        .section {
                            background: rgba(37, 35, 32, 0.8);
                            padding: 20px;
                            border-radius: 24px;
                            margin-bottom: 20px;
                            border: 1px solid rgba(196, 169, 132, 0.2);
                            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
                        }
                        .section-text {
                            color: #F5E6D3;
                            font-size: 17px;
                            line-height: 1.8;
                            margin: 0;
                            text-align: center;
                            font-family: 'Georgia', 'Times New Roman', serif;
                            font-weight: 400;
                            letter-spacing: 0.3px;
                        }
                        .footer {
                            background: linear-gradient(135deg, #1A1815 0%, #252320 100%);
                            padding: 40px;
                            text-align: center;
                            border-top: 1px solid rgba(196, 169, 132, 0.2);
                            border-radius: 0 0 32px 32px;
                        }
                        .footer-text {
                            color: #C4A984;
                            font-size: 15px;
                            margin: 0 0 12px 0;
                            font-weight: 500;
                        }
                        .footer-signature {
                            color: #C4A984;
                            font-weight: 600;
                            font-family: 'Georgia', serif;
                        }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <div class="header">
                            <div class="logo-container">
                                <div class="logo">
                                    <img src="cid:email-logo" 
                                         alt="fullcircle Logo" 
                                         width="200" 
                                         height="200" 
                                         style="width: 100%; max-width: 200px; height: auto; display: block; border-radius: 16px;" />
                                </div>
                                <h1 class="header-title">fullcircle</h1>
                                <p class="header-subtitle">Meaningful Connections</p>
                            </div>
                        </div>
                        
                        <div class="content">
                            <div class="section">
                                <p class="section-text">${emailMessage}</p>
                            </div>
                        </div>
                        
                        <div class="footer">
                            <p class="footer-text">This email was sent from the fullcircle admin dashboard</p>
                            <p class="footer-text">With gratitude and light,<br><span class="footer-signature">The fullcircle Team</span></p>
                        </div>
                    </div>
                </body>
                </html>
              `
            }),
          });

          const result = await response.json();
          if (result.success) {
            alert(`✅ Email sent successfully to ${emailRecipient.email}!`);
          } else {
            alert(`❌ Failed to send email: ${result.error}`);
          }
        }
      }

      // Close modal and reset
      setShowEmailModal(false);
      setEmailSubject('');
      setEmailMessage('');
      setEmailRecipient(null);
      setIsBulkEmail(false);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  // Advanced filtering functions
  // Apply filters to users with stable date handling to prevent hydration mismatches
  const applyFilters = useCallback((users: (WaitlistUser | UserData)[]) => {
    return users.filter(user => {
      // Helper function to convert relative date strings to Date objects
      // Uses stable reference dates to ensure consistent server/client rendering
      const getRelativeDate = (relativeDate: string | null): Date | null => {
        if (!relativeDate) return null;
        
        // Use stable reference dates to avoid hydration mismatches
        const stableNow = new Date('2024-01-01T00:00:00Z');
        
        switch (relativeDate) {
          case 'now':
            return stableNow;
          case '7days':
            return new Date(stableNow.getTime() - 7 * 24 * 60 * 60 * 1000);
          case '30days':
            return new Date(stableNow.getTime() - 30 * 24 * 60 * 60 * 1000);
          default:
            // If it's a regular date string, try to parse it
            const parsedDate = new Date(relativeDate);
            return isNaN(parsedDate.getTime()) ? null : parsedDate;
        }
      };

      // Date range filter
      const startDate = getRelativeDate(filterOptions.dateRange.start);
      const endDate = getRelativeDate(filterOptions.dateRange.end);
      
      if (startDate && user.createdAt) {
        const userDate = new Date(user.createdAt);
        if (userDate < startDate) return false;
      }
      if (endDate && user.createdAt) {
        const userDate = new Date(user.createdAt);
        if (userDate > endDate) return false;
      }

      // For app users, apply additional filters
      if ('userId' in user) {
        const appUser = user as UserData;
        
        // Lotus count filter
        if (filterOptions.lotusCount.min !== null && (appUser.numOfLotus || 0) < filterOptions.lotusCount.min) return false;
        if (filterOptions.lotusCount.max !== null && (appUser.numOfLotus || 0) > filterOptions.lotusCount.max) return false;

        // Radiance boosts filter
        if (filterOptions.radianceBoosts.min !== null && (appUser.activeBoosts || 0) < filterOptions.radianceBoosts.min) return false;
        if (filterOptions.radianceBoosts.max !== null && (appUser.activeBoosts || 0) > filterOptions.radianceBoosts.max) return false;

        // Subscription status filter
        if (filterOptions.subscriptionStatus && appUser.subscription?.isActive !== (filterOptions.subscriptionStatus === 'active')) return false;

        // Onboarding status filter
        if (filterOptions.onboardingStatus === 'completed' && !appUser.onboardingCompleted) return false;
        if (filterOptions.onboardingStatus === 'incomplete' && appUser.onboardingCompleted) return false;

        // Location filter
        if (filterOptions.location && appUser.regionName && !appUser.regionName.toLowerCase().includes(filterOptions.location.toLowerCase())) return false;

        // Spiritual practices filter
        if (filterOptions.spiritualPractices.length > 0 && appUser.spiritualProfile?.practices) {
          const hasPractice = filterOptions.spiritualPractices.some(practice => 
            appUser.spiritualProfile?.practices?.includes(practice)
          );
          if (!hasPractice) return false;
        }

        // Connection intent filter
        if (filterOptions.connectionIntent && appUser.matchPreferences?.connectionIntent !== filterOptions.connectionIntent) return false;

        // Photos filter
        if (filterOptions.hasPhotos !== null) {
          const hasPhotos = appUser.photos && appUser.photos.length > 0;
          if (hasPhotos !== filterOptions.hasPhotos) return false;
        }

        // Seed user filter
        if (filterOptions.isSeedUser !== null && appUser.isSeedUser !== filterOptions.isSeedUser) return false;

        // Last active filter
        const lastActiveStart = getRelativeDate(filterOptions.lastActive.start);
        const lastActiveEnd = getRelativeDate(filterOptions.lastActive.end);
        
        if (lastActiveStart && appUser.lastActive) {
          const lastActiveDate = new Date(appUser.lastActive);
          if (lastActiveDate > lastActiveStart) return false;
        }
        if (lastActiveEnd && appUser.lastActive) {
          const lastActiveDate = new Date(appUser.lastActive);
          if (lastActiveDate < lastActiveEnd) return false;
        }
      }

      return true;
    });
  }, [filterOptions]);

  const filteredUsers = useMemo(() => {
    // Combine both user types for filtering
    const allUsers = [...waitlistUsers, ...appUsers];
    return applyFilters(allUsers);
  }, [waitlistUsers, appUsers, applyFilters]);

  // Sorted and filtered waitlist users for display
  const sortedWaitlistUsers = useMemo(() => {
    // First filter by search query
    let filtered = waitlistUsers;
    if (userSearchQuery.trim()) {
      const query = userSearchQuery.toLowerCase();
      filtered = waitlistUsers.filter(user => {
        const fullName = (user.fullName || `${user.firstName || ''} ${user.familyName || ''}`.trim() || '').toLowerCase();
        const email = (user.email || '').toLowerCase();
        const phone = ((user.phoneNumber || user.phone) || '').toLowerCase();
        const heardFrom = (user.heardFrom || '').toLowerCase();
        
        return fullName.includes(query) || 
               email.includes(query) || 
               phone.includes(query) || 
               heardFrom.includes(query);
      });
    }

    // Then sort the filtered results
    return filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (waitlistSortField) {
        case 'name':
          aValue = (a.fullName || `${a.firstName || ''} ${a.familyName || ''}`.trim() || '').toLowerCase();
          bValue = (b.fullName || `${b.firstName || ''} ${b.familyName || ''}`.trim() || '').toLowerCase();
          break;
        case 'email':
          aValue = (a.email || '').toLowerCase();
          bValue = (b.email || '').toLowerCase();
          break;
        case 'createdAt':
          aValue = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          bValue = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          break;
        case 'heardFrom':
          aValue = (a.heardFrom || '').toLowerCase();
          bValue = (b.heardFrom || '').toLowerCase();
          break;
        case 'phoneNumber':
          aValue = (a.phoneNumber || a.phone || '').toLowerCase();
          bValue = (b.phoneNumber || b.phone || '').toLowerCase();
          break;
        case 'commentsLength':
          aValue = (a.additionalComments || '').length;
          bValue = (b.additionalComments || '').length;
          break;
        default:
          aValue = 0;
          bValue = 0;
      }

      if (aValue < bValue) return waitlistSortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return waitlistSortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [waitlistUsers, waitlistSortField, waitlistSortDirection, userSearchQuery]);

  // Computed values for user selection
  // Note: Using stable date references to prevent hydration mismatches
  const filteredUsersForSelection = useMemo(() => {
    let filtered = [...waitlistUsers, ...appUsers];
    
    // Apply search filter
    if (userSearchQuery.trim()) {
      const query = userSearchQuery.toLowerCase();
      filtered = filtered.filter(user => {
        if ('userId' in user) {
          // App user
          return (
            (user.fullName && user.fullName.toLowerCase().includes(query)) ||
            (user.firstName && user.firstName.toLowerCase().includes(query)) ||
            (user.familyName && user.familyName.toLowerCase().includes(query)) ||
            (user.email && user.email.toLowerCase().includes(query))
          );
        } else {
          // Waitlist user
          return (
            (user.fullName && user.fullName.toLowerCase().includes(query)) ||
            (user.firstName && user.firstName.toLowerCase().includes(query)) ||
            (user.familyName && user.familyName.toLowerCase().includes(query)) ||
            (user.email && user.email.toLowerCase().includes(query))
          );
        }
      });
    }
    
    // Apply type filter (only for app users)
    if (userFilterType === 'withPush') {
      filtered = filtered.filter(user => 'userId' in user && user.settings?.pushToken);
    } else if (userFilterType === 'withoutPush') {
      filtered = filtered.filter(user => 'userId' in user && !user.settings?.pushToken);
    }
    
    return filtered;
  }, [waitlistUsers, appUsers, userSearchQuery, userFilterType]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentUserPage(1);
  }, [userSearchQuery, userFilterType]);

  const paginatedUsersForSelection = useMemo(() => {
    const startIndex = (currentUserPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    return filteredUsersForSelection.slice(startIndex, endIndex);
  }, [filteredUsersForSelection, currentUserPage, usersPerPage]);

  const loadFilterPreset = (presetId: string) => {
    const preset = savedFilterPresets.find(p => p.id === presetId);
    if (preset) {
      // Convert relative dates to actual Date objects
      const convertedFilters = { ...preset.filters };
      // Convert relative date strings to ISO strings to match filterOptions type
      // Use stable reference dates to avoid hydration mismatches
      const stableNow = new Date('2024-01-01T00:00:00Z');
      if (preset.filters.dateRange.start === '7days') {
        convertedFilters.dateRange.start = new Date(stableNow.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      }
      if (preset.filters.dateRange.end === 'now') {
        convertedFilters.dateRange.end = stableNow.toISOString();
      }
      if (preset.filters.lastActive.start === '30days') {
        convertedFilters.lastActive.start = new Date(stableNow.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
      }
      setFilterOptions(convertedFilters);
      setCurrentFilterPreset(presetId);
    }
  };

  const saveFilterPreset = () => {
    if (!filterPresetName.trim()) return;
    
    const newPreset: FilterPreset = {
      id: `custom_${Math.floor(Math.random() * 1000000)}`,
      name: filterPresetName,
      filters: { 
        dateRange: { 
          start: filterOptions.dateRange.start, 
          end: filterOptions.dateRange.end 
        },
        lotusCount: { 
          min: filterOptions.lotusCount.min, 
          max: filterOptions.lotusCount.max 
        },
        radianceBoosts: { 
          min: filterOptions.radianceBoosts.min, 
          max: filterOptions.radianceBoosts.max 
        },
        subscriptionStatus: filterOptions.subscriptionStatus,
        onboardingStatus: filterOptions.onboardingStatus,
        location: filterOptions.location,
        spiritualPractices: filterOptions.spiritualPractices,
        connectionIntent: filterOptions.connectionIntent,
        hasPhotos: filterOptions.hasPhotos,
        isSeedUser: filterOptions.isSeedUser,
        lastActive: { 
          start: filterOptions.lastActive.start, 
          end: filterOptions.lastActive.end 
        }
      }
    };
    
    setSavedFilterPresets(prev => [...prev, newPreset]);
    setFilterPresetName('');
    setShowSavePresetModal(false);
  };

  const clearFilters = () => {
    setFilterOptions({
      dateRange: { start: null, end: null },
      lotusCount: { min: null, max: null },
      radianceBoosts: { min: null, max: null },
      subscriptionStatus: '',
      onboardingStatus: '',
      location: '',
      spiritualPractices: [],
      connectionIntent: '',
      hasPhotos: null,
      isSeedUser: null,
      lastActive: { start: null, end: null }
    });
    setCurrentFilterPreset('');
  };

  const exportToCSV = () => {
    const headers = [
      'User ID', 'Name', 'Email', 'Phone', 'Lotus Count', 'Radiance Boosts',
      'Onboarding Status', 'Subscription Status', 'Created Date', 'Last Active',
      'Region', 'Connection Intent', 'Spiritual Practices'
    ];

    const csvData = filteredUsers.map(user => {
      if ('userId' in user) {
        // App user
        return [
          user.userId,
          user.fullName || `${user.firstName || ''} ${user.familyName || ''}`.trim() || 'N/A',
          user.email,
          user.phoneNumber || 'N/A',
          user.numOfLotus || 0,
          user.activeBoosts || 0,
          user.onboardingCompleted ? 'Completed' : 'Incomplete',
          user.subscription?.isActive ? 'Active' : 'Inactive',
          user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : 'N/A',
          user.lastActive ? new Date(user.lastActive).toISOString().split('T')[0] : 'N/A',
          user.regionName || 'N/A',
          user.matchPreferences?.connectionIntent || 'N/A',
          user.spiritualProfile?.practices?.join(', ') || 'N/A'
        ];
      } else {
        // Waitlist user
        return [
          user.id || 'N/A',
          user.fullName || `${user.firstName || ''} ${user.familyName || ''}`.trim() || 'N/A',
          user.email,
          user.phoneNumber || 'N/A',
          'N/A', // No lotus for waitlist users
          'N/A', // No radiance for waitlist users
          'N/A', // No onboarding for waitlist users
          'N/A', // No subscription for waitlist users
          user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : 'N/A',
          'N/A', // No last active for waitlist users
          'N/A', // No region for waitlist users
          'N/A', // No connection intent for waitlist users
          'N/A'  // No spiritual practices for waitlist users
        ];
      }
    });

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users_export.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Update active filters when filter options change
  useEffect(() => {
    const active: Record<string, boolean> = {};
    if (filterOptions.dateRange.start || filterOptions.dateRange.end) active.dateRange = true;
    if (filterOptions.lotusCount.min !== null || filterOptions.lotusCount.max !== null) active.lotusCount = true;
    if (filterOptions.radianceBoosts.min !== null || filterOptions.radianceBoosts.max !== null) active.radianceBoosts = true;
    if (filterOptions.subscriptionStatus) active.subscriptionStatus = true;
    if (filterOptions.onboardingStatus) active.onboardingStatus = true;
    if (filterOptions.location) active.location = true;
    if (filterOptions.spiritualPractices.length > 0) active.spiritualPractices = true;
    if (filterOptions.connectionIntent) active.connectionIntent = true;
    if (filterOptions.hasPhotos !== null) active.hasPhotos = true;
    if (filterOptions.isSeedUser !== null) active.isSeedUser = true;
    if (filterOptions.lastActive.start || filterOptions.lastActive.end) active.lastActive = true;
    
    setActiveFilters(active);
  }, [filterOptions]);

  // Password authentication
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔐 Password submission started');
    setPasswordError('');
    setIsAuthenticating(true);
    
    try {
      console.log('📡 Calling auth API...');
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
      
      console.log('📥 Auth response received:', response.status);
      const data = await response.json();
      console.log('📋 Auth response data:', data);
      
      if (data.success) {
        console.log('✅ Authentication successful, setting state...');
        setIsAuthenticated(true);
        setPassword('');
        console.log('✅ Authentication state updated');
      } else {
        console.log('❌ Authentication failed:', data.message);
        setPasswordError(data.message || 'Incorrect password');
        setPassword('');
      }
    } catch (error) {
      console.error('❌ Authentication error:', error);
      setPasswordError('Authentication failed. Please try again.');
      setPassword('');
    } finally {
      setIsAuthenticating(false);
      console.log('🔚 Authentication process completed');
    }
  };

  // Logout function
  const handleLogout = async () => {
    try {
      // Call logout API to clear server-side session
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear client-side state
      setIsAuthenticated(false);
      // Reset all state
      setWaitlistUsers([]);
      setAppUsers([]);
      setAdminStats(null);
      setActiveTab('dashboard');
    }
  };

  // Show password form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-purple-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access</h1>
              <p className="text-gray-600">Enter password to access the admin dashboard</p>
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 placeholder-gray-500"
                  placeholder="Enter admin password"
                  required
                  autoFocus
                />
                {passwordError && (
                  <p className="mt-2 text-sm text-red-600">{passwordError}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAuthenticating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline mr-2"></div>
                    Authenticating...
                  </>
                ) : (
                  'Access Dashboard'
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Contact the system administrator for access credentials
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">fullcircle Admin Panel</h1>
            <p className="text-lg text-gray-700">Comprehensive user management, lotus flowers, notifications, and analytics</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              title="View notifications"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                  {notificationCount > 99 ? '99+' : notificationCount}
                </span>
              )}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors font-medium"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 bg-white rounded-lg p-2 mb-6 shadow-sm">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('waitlist')}
            className={`flex items-center py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'waitlist'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            Waitlist ({waitlistUsers.length})
          </button>
          <button
            onClick={() => setActiveTab('app-users')}
            className={`flex items-center py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'app-users'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <UserCheck className="w-4 h-4 mr-2" />
            App Users ({appUsers.length})
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`flex items-center py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'search'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </button>
          <button
            onClick={() => setActiveTab('lotus')}
            className={`flex items-center py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'lotus'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Flower className="w-4 h-4 mr-2" />
            Lotus Management
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'notifications'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('bulk-ops')}
            className={`flex items-center py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'bulk-ops'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Zap className="w-4 h-4 mr-2" />
            Bulk Operations
          </button>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-700">Total Users</p>
                    <p className="text-2xl font-bold text-gray-800">{adminStats?.totalUsers || 0}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <UserCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-700">Active Subscriptions</p>
                    <p className="text-2xl font-bold text-gray-800">{adminStats?.activeSubscriptions || 0}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Users className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Waitlist Users</p>
                    <p className="text-2xl font-bold text-gray-800">{adminStats?.waitlistUsers || 0}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Flower className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Lotus Balance</p>
                    <p className="text-2xl font-bold text-gray-800">{adminStats?.totalLotusBalance || 0}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Lotus Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Total Granted:</span>
                    <span className="font-medium text-gray-900">{adminStats?.totalLotusGranted || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Total Spent:</span>
                    <span className="font-medium text-gray-900">{adminStats?.totalLotusSpent || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Average per User:</span>
                    <span className="font-medium text-gray-900">{adminStats?.averageLotusPerUser || 0}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">New Signups (7d):</span>
                    <span className="font-medium text-gray-900">{adminStats?.recentSignups || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">New Subscriptions (7d):</span>
                    <span className="font-medium text-gray-900">{adminStats?.recentSubscriptions || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Onboarding Rate:</span>
                    <span className="font-medium text-gray-900">{adminStats?.onboardingCompletionRate || 0}%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setActiveTab('lotus')}
                    className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    <Flower className="w-4 h-4 mr-2" />
                    Manage Lotus
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Send Notifications
                  </button>
                  <button
                    onClick={() => setActiveTab('bulk-ops')}
                    className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Bulk Operations
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Waitlist Users Tab */}
        {activeTab === 'waitlist' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-600" />
                Waitlist Users
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    if (selectedUsers.length === 0) {
                      alert('Please select users to send emails to');
                      return;
                    }
                    handleBulkSendWaitlistEmails();
                  }}
                  disabled={selectedUsers.length === 0}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Custom Emails ({selectedUsers.length})
                </button>
                <button
                  onClick={() => {
                    if (selectedUsers.length === 0) {
                      alert('Please select users to delete');
                      return;
                    }
                    setShowDeleteModal(true);
                  }}
                  disabled={selectedUsers.length === 0}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                >
                  <X className="w-4 h-4 mr-2" />
                  Delete Selected ({selectedUsers.length})
                </button>
                <button
                  onClick={selectAllUsers}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={clearSelection}
                  className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  Clear Selection
                </button>
              </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-blue-700 mb-2">Search Waitlist Users</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search by name, email, or phone..."
                      value={userSearchQuery}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
                      className="w-full px-4 py-2 pl-10 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-600"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setUserSearchQuery('')}
                    className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            </div>

            {/* Sorting Controls */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Sort by:</label>
                    <select
                      value={waitlistSortField}
                      onChange={(e) => setWaitlistSortField(e.target.value as 'name' | 'email' | 'createdAt' | 'heardFrom' | 'phoneNumber')}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 text-sm"
                    >
                      <option value="name">Name</option>
                      <option value="email">Email</option>
                      <option value="createdAt">Date Created</option>
                      <option value="heardFrom">Heard From</option>
                      <option value="phoneNumber">Phone Number</option>
                      <option value="commentsLength">Comments Length</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Order:</label>
                    <button
                      onClick={() => setWaitlistSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                      className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 text-sm transition-colors"
                    >
                      {waitlistSortDirection === 'asc' ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          Ascending
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          Descending
                        </>
                      )}
                    </button>
                  </div>
                  
                  <button
                    onClick={() => {
                      setWaitlistSortField('createdAt');
                      setWaitlistSortDirection('desc');
                      setUserSearchQuery('');
                    }}
                    className="px-3 py-2 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Reset to Default
                  </button>
                </div>
                
                <div className="text-sm text-gray-600">
                  Showing {sortedWaitlistUsers.length} of {waitlistUsers.length} waitlist users
                  {userSearchQuery.trim() && (
                    <span className="ml-2 text-blue-600">
                      (filtered by search)
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {waitlistUsers.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No waitlist users found.</p>
            ) : sortedWaitlistUsers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-2">No waitlist users match your search criteria.</p>
                <p className="text-sm text-gray-400">Try adjusting your search terms or clearing the search.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input
                          type="checkbox"
                          checked={selectedUsers.length === sortedWaitlistUsers.length && sortedWaitlistUsers.length > 0}
                          onChange={(e) => e.target.checked ? selectAllUsers() : clearSelection()}
                          className="rounded border-gray-400 text-purple-600 focus:ring-purple-500"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          onClick={() => {
                            if (waitlistSortField === 'name') {
                              setWaitlistSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                            } else {
                              setWaitlistSortField('name');
                              setWaitlistSortDirection('asc');
                            }
                          }}
                          className="flex items-center gap-1 hover:text-purple-600 transition-colors"
                        >
                          Name
                          {waitlistSortField === 'name' && (
                            waitlistSortDirection === 'asc' ? 
                              <ChevronUp className="w-3 h-3 text-purple-600" /> : 
                              <ChevronDown className="w-3 h-3 text-purple-600" />
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          onClick={() => {
                            if (waitlistSortField === 'email') {
                              setWaitlistSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                            } else {
                              setWaitlistSortField('email');
                              setWaitlistSortDirection('asc');
                            }
                          }}
                          className="flex items-center gap-1 hover:text-purple-600 transition-colors"
                        >
                          Email
                          {waitlistSortField === 'email' && (
                            waitlistSortDirection === 'asc' ? 
                              <ChevronUp className="w-3 h-3 text-purple-600" /> : 
                              <ChevronDown className="w-3 h-3 text-purple-600" />
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <button
                          onClick={() => {
                            if (waitlistSortField === 'createdAt') {
                              setWaitlistSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                            } else {
                              setWaitlistSortField('createdAt');
                              setWaitlistSortDirection('desc');
                            }
                          }}
                          className="flex items-center gap-1 hover:text-purple-600 transition-colors"
                        >
                          Date Created
                          {waitlistSortField === 'createdAt' && (
                            waitlistSortDirection === 'desc' ? 
                              <ChevronDown className="w-3 h-3 text-purple-600" /> : 
                              <ChevronUp className="w-3 h-3 text-purple-600" />
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Heard From</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email Actions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedWaitlistUsers.map((user, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id || '')}
                            onChange={() => toggleUserSelection(user.id || '')}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.fullName || `${user.firstName || ''} ${user.familyName || ''}`.trim() || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.createdAt ? (
                            <span className="text-gray-700">
                              {new Date(user.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          ) : (
                            <span className="text-gray-400 italic">Unknown</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {(user.phoneNumber || user.phone) ? (
                            <span className="text-green-600">{user.phoneNumber || user.phone}</span>
                          ) : (
                            <span className="text-gray-400 italic">No phone provided</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.heardFrom ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {user.heardFrom}
                            </span>
                          ) : (
                            <span className="text-gray-400 italic">Not specified</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {user.additionalComments ? (
                            <div className="max-w-xs">
                              {user.additionalComments.length > 50 ? (
                                <button
                                  onClick={() => toggleCommentExpansion(user.id || '')}
                                  className="text-left text-gray-700 hover:text-purple-600 transition-colors cursor-pointer block w-full"
                                  title="Click to expand/collapse comment"
                                >
                                  <div className="flex items-start gap-2">
                                    <span className={`block break-words transition-all duration-200 flex-1 ${
                                      expandedComments.has(user.id || '') 
                                        ? 'bg-purple-50 p-2 rounded border-l-2 border-purple-400' 
                                        : ''
                                    }`}>
                                      {expandedComments.has(user.id || '') 
                                        ? user.additionalComments
                                        : `${user.additionalComments.substring(0, 50)}...`
                                      }
                                    </span>
                                    <span className="text-purple-500 mt-1">
                                      {expandedComments.has(user.id || '') ? (
                                        <ChevronUp className="w-4 h-4" />
                                      ) : (
                                        <ChevronDown className="w-4 h-4" />
                                      )}
                                    </span>
                                  </div>
                                </button>
                              ) : (
                                <span className="text-gray-700 break-words">{user.additionalComments}</span>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400 italic">No comments</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleSendWaitlistEmail(user)}
                              className="inline-flex items-center px-3 py-1.5 border border-blue-300 text-xs font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              title="Send welcome email"
                            >
                              <Send className="w-3 h-3 mr-1" />
                              Welcome Email
                            </button>
                            <button
                              onClick={() => handleSendWaitlistUpdate(user)}
                              className="inline-flex items-center px-3 py-1.5 border border-green-300 text-xs font-medium rounded-md text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                              title="Send app update"
                            >
                              <Bell className="w-3 h-3 mr-1" />
                              App Update
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              Waitlist
                            </span>
                            <button
                              onClick={() => handleDeleteWaitlistUser(user)}
                              className="inline-flex items-center px-2 py-1 border border-red-300 text-xs font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              title="Delete from waitlist"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}

        {/* App Users Tab */}
        {activeTab === 'app-users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <UserCheck className="w-5 h-5 mr-2 text-green-600" />
              App Users
            </h2>

            {/* Users Summary */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold">{filteredUsers.length}</span> of <span className="font-semibold">{appUsers.length}</span> users
                  {Object.keys(activeFilters).length > 0 && (
                    <span className="ml-2 text-purple-600">
                      (filtered by {Object.keys(activeFilters).length} criteria)
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('search')}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <Filter className="w-4 h-4 mr-1" />
                    Advanced Filters
                  </button>
                  <button
                    onClick={exportToCSV}
                    className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export to CSV
                  </button>
                </div>
              </div>
            </div>
            
            {filteredUsers.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                {Object.keys(activeFilters).length > 0 
                  ? 'No users match your current filters. Try adjusting your criteria.'
                  : 'No app users found.'
                }
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        <input
                          type="checkbox"
                          checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                          onChange={(e) => e.target.checked ? selectAllUsers() : clearSelection()}
                          className="rounded border-gray-400 text-purple-600 focus:ring-purple-500"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Lotus</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Radiance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Onboarding</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Subscription</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Details</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => {
                      // Only show app users in this table
                      if (!('userId' in user)) return null;
                      
                      const onboardingStatus = getOnboardingStatus(user);
                      const hasSubscription = user.subscription?.isActive;
                      
                      return (
                        <tr key={user.userId} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user.userId)}
                              onChange={() => toggleUserSelection(user.userId)}
                              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <a 
                              href={`/admin/users/${user.userId}`}
                              className="text-purple-600 hover:text-purple-800 hover:underline font-medium"
                            >
                              {user.fullName || `${user.firstName || ''} ${user.familyName || ''}`.trim() || 'N/A'}
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {user.numOfLotus || 0} 🌸
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              {user.activeBoosts || 0} ⚡
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              {onboardingStatus.icon}
                              <span className="ml-2">{onboardingStatus.text}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {hasSubscription ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                None
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex gap-2">
                              {canGrantSubscription(user) && !hasSubscription ? (
                                <button
                                  onClick={() => handleGrantSubscription(user.userId)}
                                  disabled={assigningSubscription === user.userId}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {assigningSubscription === user.userId ? (
                                    <>
                                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                                      Granting...
                                    </>
                                  ) : (
                                    <>
                                      <Gift className="w-3 h-3 mr-1" />
                                      Grant fullcircle
                                    </>
                                  )}
                                </button>
                              ) : (
                                <span className="text-gray-400">
                                  {!canGrantSubscription(user) ? 'Complete onboarding first' : 'Already subscribed'}
                                </span>
                              )}
                              
                              <button
                                onClick={() => {
                                  setSelectedUsers([user.userId]);
                                  setActiveTab('lotus');
                                }}
                                className="inline-flex items-center px-2 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                              >
                                <Flower className="w-3 h-3 mr-1" />
                                Lotus
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedUsers([user.userId]);
                                  setActiveTab('lotus');
                                }}
                                className="inline-flex items-center px-2 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                              >
                                <Zap className="w-3 h-3 mr-1" />
                                Radiance
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <a 
                              href={`/admin/users/${user.userId}`}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View Details
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}

        {/* Lotus & Radiance Management Tab */}
        {activeTab === 'lotus' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Lotus & Radiance Management Header */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Flower className="w-6 h-6 mr-2 text-purple-600" />
                Lotus & Radiance Management
              </h2>
              <p className="text-gray-700 mb-6">
                Grant or revoke lotus flowers and radiance boosts for users. All transactions are logged for audit purposes.
              </p>
              
              {/* Lotus & Radiance Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lotus Management */}
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Plus className="w-5 h-5 mr-2 text-green-600" />
                      Grant Lotus Flowers
                    </h3>
                    <div className="space-y-3">
                      <input
                        type="number"
                        min="1"
                        value={lotusAmount}
                        onChange={(e) => setLotusAmount(parseInt(e.target.value) || 1)}
                        placeholder="Amount"
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 placeholder-gray-600"
                      />
                      <input
                        type="text"
                        value={lotusReason}
                        onChange={(e) => setLotusReason(e.target.value)}
                        placeholder="Reason (e.g., Welcome bonus, Achievement)"
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 placeholder-gray-600"
                      />
                      <button
                        onClick={() => setShowLotusModal(true)}
                        disabled={!lotusAmount || !lotusReason}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Grant Lotus Flowers
                      </button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Minus className="w-5 h-5 mr-2 text-red-600" />
                      Revoke Lotus Flowers
                    </h3>
                    <div className="space-y-3">
                      <input
                        type="number"
                        min="1"
                        value={lotusAmount}
                        onChange={(e) => setLotusAmount(parseInt(e.target.value) || 1)}
                        placeholder="Amount"
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 placeholder-gray-600"
                      />
                      <input
                        type="text"
                        value={lotusReason}
                        onChange={(e) => setLotusReason(e.target.value)}
                        placeholder="Reason (e.g., Policy violation, Refund)"
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 placeholder-gray-600"
                      />
                      <button
                        onClick={() => setShowLotusModal(true)}
                        disabled={!lotusAmount || !lotusReason}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Revoke Lotus Flowers
                      </button>
                    </div>
                  </div>
                </div>

                {/* Radiance Management */}
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-yellow-600" />
                      Grant Radiance Boosts
                    </h3>
                    <div className="space-y-3">
                      <input
                        type="number"
                        min="1"
                        value={lotusAmount}
                        onChange={(e) => setLotusAmount(parseInt(e.target.value) || 1)}
                        placeholder="Amount"
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white text-gray-900 placeholder-gray-600"
                      />
                      <input
                        type="text"
                        value={lotusReason}
                        onChange={(e) => setLotusReason(e.target.value)}
                        placeholder="Reason (e.g., Welcome bonus, Achievement)"
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white text-gray-900 placeholder-gray-600"
                      />
                      <button
                        onClick={() => setShowLotusModal(true)}
                        disabled={!lotusAmount || !lotusReason}
                        className="w-full px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Grant Radiance Boosts
                      </button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-red-600" />
                      Revoke Radiance Boosts
                    </h3>
                    <div className="space-y-3">
                      <input
                        type="number"
                        min="1"
                        value={lotusAmount}
                        onChange={(e) => setLotusAmount(parseInt(e.target.value) || 1)}
                        placeholder="Amount"
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900 placeholder-gray-600"
                      />
                      <input
                        type="text"
                        value={lotusReason}
                        onChange={(e) => setLotusReason(e.target.value)}
                        placeholder="Reason (e.g., Policy violation, Refund)"
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-gray-900 placeholder-gray-600"
                      />
                      <button
                        onClick={() => setShowLotusModal(true)}
                        disabled={!lotusAmount || !lotusReason}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Revoke Radiance Boosts
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Selection for Lotus & Radiance Operations */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Select Users for Lotus & Radiance Operations</h3>
                <div className="flex gap-2">
                  <button
                    onClick={selectAllUsers}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Select All
                  </button>
                  <button
                    onClick={clearSelection}
                    className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input
                          type="checkbox"
                          checked={selectedUsers.length === appUsers.length && appUsers.length > 0}
                          onChange={(e) => e.target.checked ? selectAllUsers() : clearSelection()}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Lotus</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Radiance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appUsers.map((user) => (
                      <tr key={user.userId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.userId)}
                            onChange={() => toggleUserSelection(user.userId)}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.fullName || `${user.firstName || ''} ${user.familyName || ''}`.trim() || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {user.numOfLotus || 0} 🌸
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {user.activeBoosts || 0} ⚡
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            {getOnboardingStatus(user).icon}
                            <span className="ml-2">{getOnboardingStatus(user).text}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Notification Management Header */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Bell className="w-6 h-6 mr-2 text-blue-600" />
              Notification Management
            </h2>
            <p className="text-gray-700 mb-6">
              Send notifications to specific users or broadcast to all users. Choose between email, push notifications, or both.
            </p>
              
              {/* Notification Form */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notification Title</label>
                    <input
                      type="text"
                      value={notificationTitle}
                      onChange={(e) => setNotificationTitle(e.target.value)}
                      placeholder="Enter notification title"
                      className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notification Message</label>
                    <textarea
                      value={notificationMessage}
                      onChange={(e) => setNotificationMessage(e.target.value)}
                      placeholder="Enter notification message"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-600"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notification Type</label>
                    <select
                      value={notificationType}
                      onChange={(e) => setNotificationType(e.target.value as 'email' | 'push' | 'both')}
                      className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                    >
                      <option value="email">Email Only</option>
                      <option value="push">Push Notification Only</option>
                      <option value="both">Both Email & Push</option>
                    </select>
                  </div>
                  
                  <button
                    onClick={() => setShowNotificationModal(true)}
                    disabled={!notificationTitle || !notificationMessage}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4 inline mr-2" />
                    Send Notification
                  </button>
                  

                  

                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">User Selection</h3>
                  <p className="text-gray-600 mb-4">
                    {selectedUsers.length > 0 
                      ? `Selected ${selectedUsers.length} users for targeted notification`
                      : 'No users selected - will send as broadcast to all users'
                    }
                  </p>
                  
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={selectAllUsers}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Select All Users
                    </button>
                    <button
                      onClick={clearSelection}
                      className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Clear Selection
                    </button>
                  </div>
                  
                  {/* User List for Selection */}
                  <div className="border border-gray-200 rounded-md">
                    {/* Search and Filter Header */}
                    <div className="p-3 bg-gray-50 border-b border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">Available Users</span>
                        <span className="text-xs text-gray-500">{appUsers.length} total</span>
                      </div>
                      
                      {/* Search Bar */}
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search users by name or email..."
                          value={userSearchQuery}
                          onChange={(e) => setUserSearchQuery(e.target.value)}
                          className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-600 text-sm"
                        />
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      </div>
                      
                      {/* Quick Filters */}
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => setUserFilterType('all')}
                          className={`px-2 py-1 text-xs rounded-md transition-colors ${
                            userFilterType === 'all' 
                              ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          All Users
                        </button>
                        <button
                          onClick={() => setUserFilterType('withPush')}
                          className={`px-2 py-1 text-xs rounded-md transition-colors ${
                            userFilterType === 'withPush' 
                              ? 'bg-green-100 text-green-700 border border-green-200' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          📱 With Push
                        </button>
                        <button
                          onClick={() => setUserFilterType('withoutPush')}
                          className={`px-2 py-1 text-xs rounded-md transition-colors ${
                            userFilterType === 'withoutPush' 
                              ? 'bg-red-100 text-red-700 border border-red-200' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          ❌ No Push
                        </button>
                      </div>
                    </div>
                    
                    {/* User List */}
                    <div className="max-h-64 overflow-y-auto">
                      {filteredUsersForSelection.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          {appUsers.length === 0 
                            ? 'No users loaded. Check the "App Users" tab first.'
                            : 'No users match your search criteria.'
                          }
                        </div>
                      ) : (
                        <div className="divide-y divide-gray-200">
                          {paginatedUsersForSelection.map((user) => {
                            // Only show app users in this selection
                            if (!('userId' in user)) return null;
                            
                            return (
                              <div key={user.userId} className="flex items-center p-3 hover:bg-gray-50">
                                <input
                                  type="checkbox"
                                  checked={selectedUsers.includes(user.userId)}
                                  onChange={() => toggleUserSelection(user.userId)}
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <div className="ml-3 flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <p className="text-sm font-medium text-gray-900 truncate">
                                        {user.fullName || `${user.firstName || ''} ${user.familyName || ''}`.trim() || 'N/A'}
                                      </p>
                                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <div className="text-xs text-gray-400">
                                        {user.settings?.pushToken ? '📱' : '❌'} Push
                                      </div>
                                      <div className="text-xs text-gray-400">
                                        {user.numOfLotus || 0} 🌸
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    
                    {/* Pagination */}
                    {filteredUsersForSelection.length > usersPerPage && (
                      <div className="p-3 bg-gray-50 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">
                            Showing {((currentUserPage - 1) * usersPerPage) + 1} to {Math.min(currentUserPage * usersPerPage, filteredUsersForSelection.length)} of {filteredUsersForSelection.length} users
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => setCurrentUserPage(prev => Math.max(1, prev - 1))}
                              disabled={currentUserPage === 1}
                              className="px-2 py-1 text-xs bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              ←
                            </button>
                            <span className="px-2 py-1 text-xs text-gray-600">
                              {currentUserPage} / {Math.ceil(filteredUsersForSelection.length / usersPerPage)}
                            </span>
                            <button
                              onClick={() => setCurrentUserPage(prev => Math.min(Math.ceil(filteredUsersForSelection.length / usersPerPage), prev + 1))}
                              disabled={currentUserPage >= Math.ceil(filteredUsersForSelection.length / usersPerPage)}
                              className="px-2 py-1 text-xs bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              →
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bulk Operations Tab */}
        {activeTab === 'bulk-ops' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Bulk Operations Header */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Zap className="w-6 h-6 mr-2 text-green-600" />
              Bulk Operations
            </h2>
            <p className="text-gray-700 mb-6">
              Perform operations on multiple users at once. Select users and choose the operation type.
            </p>
              
              {/* Bulk Operation Form */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                                        <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Operation Type</label>
                        <select
                          value={bulkOperationType}
                          onChange={(e) => setBulkOperationType(e.target.value as typeof bulkOperationType)}
                          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                        >
                      <option value="grantLotus">Grant Lotus Flowers</option>
                      <option value="revokeLotus">Revoke Lotus Flowers</option>
                      <option value="sendNotification">Send Notification</option>
                      <option value="grantSubscription">Grant fullcircle Subscription</option>
                      <option value="revokeSubscription">Revoke Subscription</option>
                    </select>
                  </div>
                  
                  {(bulkOperationType === 'grantLotus' || bulkOperationType === 'revokeLotus') && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Lotus Amount</label>
                        <input
                          type="number"
                          min="1"
                          value={lotusAmount}
                          onChange={(e) => setLotusAmount(parseInt(e.target.value) || 1)}
                          placeholder="Amount"
                          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900 placeholder-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                        <input
                          type="text"
                          value={lotusReason}
                          onChange={(e) => setLotusReason(e.target.value)}
                          placeholder="Reason for operation"
                          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900 placeholder-gray-600"
                        />
                      </div>
                    </>
                  )}
                  
                  {(bulkOperationType === 'sendNotification') && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Notification Title</label>
                        <input
                          type="text"
                          value={notificationTitle}
                          onChange={(e) => setNotificationTitle(e.target.value)}
                          placeholder="Enter notification title"
                          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900 placeholder-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Notification Message</label>
                        <textarea
                          value={notificationMessage}
                          onChange={(e) => setNotificationMessage(e.target.value)}
                          placeholder="Enter notification message"
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900 placeholder-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Notification Type</label>
                        <select
                          value={notificationType}
                          onChange={(e) => setNotificationType(e.target.value as 'email' | 'push' | 'both')}
                          className="w-full px-3 py-2 border border-gray-500 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                        >
                          <option value="email">Email Only</option>
                          <option value="push">Push Notification Only</option>
                          <option value="both">Both Email & Push</option>
                        </select>
                      </div>
                    </>
                  )}
                  
                  <button
                    onClick={() => setShowBulkModal(true)}
                    disabled={selectedUsers.length === 0}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Zap className="w-4 h-4 inline mr-2" />
                    Execute Bulk Operation
                  </button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Selected Users</h3>
                  <p className="text-gray-600 mb-4">
                    {selectedUsers.length > 0 
                      ? `${selectedUsers.length} users selected for bulk operation`
                      : 'No users selected'
                    }
                  </p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={selectAllUsers}
                      className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Select All Users
                    </button>
                    <button
                      onClick={clearSelection}
                      className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                    >
                      Clear Selection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Search Tab */}
        {activeTab === 'search' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Search className="w-5 h-5 mr-2 text-blue-600" />
              Advanced User Search & Filtering
            </h2>

            {/* Filter Presets */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Quick Filter Presets</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowSavePresetModal(true)}
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    Save Current Filters
                  </button>
                  <button
                    onClick={clearFilters}
                    className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors flex items-center"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear All Filters
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {savedFilterPresets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => loadFilterPreset(preset.id)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors flex items-center ${
                      currentFilterPreset === preset.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="mb-6">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center text-gray-700 hover:text-gray-900 mb-4"
              >
                <Filter className="w-4 h-4 mr-2" />
                Advanced Filters
                {showAdvancedFilters ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
              </button>

              <AnimatePresence>
                {showAdvancedFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    {/* Date Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Signup Date Range</label>
                      <div className="space-y-2">
                        <input
                          type="date"
                          value={filterOptions.dateRange.start && filterOptions.dateRange.start !== '7days' && filterOptions.dateRange.start !== '30days' ? filterOptions.dateRange.start : ''}
                          onChange={(e) => setFilterOptions(prev => ({
                            ...prev,
                            dateRange: { ...prev.dateRange, start: e.target.value || null }
                          }))}
                          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
                        />
                        <input
                          type="date"
                          value={filterOptions.dateRange.end && filterOptions.dateRange.end !== 'now' ? filterOptions.dateRange.end : ''}
                          onChange={(e) => setFilterOptions(prev => ({
                            ...prev,
                            dateRange: { ...prev.dateRange, end: e.target.value || null }
                          }))}
                          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
                        />
                      </div>
                      <div className="mt-2 flex gap-2">
                        <button
                          type="button"
                          onClick={() => setFilterOptions(prev => ({
                            ...prev,
                            dateRange: { start: '7days', end: 'now' }
                          }))}
                          className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                        >
                          Last 7 Days
                        </button>
                        <button
                          type="button"
                          onClick={() => setFilterOptions(prev => ({
                            ...prev,
                            dateRange: { start: '30days', end: 'now' }
                          }))}
                          className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                        >
                          Last 30 Days
                        </button>
                      </div>
                    </div>

                    {/* Lotus Count */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Lotus Count Range</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filterOptions.lotusCount.min || ''}
                          onChange={(e) => setFilterOptions(prev => ({
                            ...prev,
                            lotusCount: { ...prev.lotusCount, min: e.target.value ? parseInt(e.target.value) : null }
                          }))}
                          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={filterOptions.lotusCount.max || ''}
                          onChange={(e) => setFilterOptions(prev => ({
                            ...prev,
                            lotusCount: { ...prev.lotusCount, max: e.target.value ? parseInt(e.target.value) : null }
                          }))}
                          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
                        />
                      </div>
                    </div>

                    {/* Radiance Boosts */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Radiance Boosts Range</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={filterOptions.radianceBoosts.min || ''}
                          onChange={(e) => setFilterOptions(prev => ({
                            ...prev,
                            radianceBoosts: { ...prev.radianceBoosts, min: e.target.value ? parseInt(e.target.value) : null }
                          }))}
                          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={filterOptions.radianceBoosts.max || ''}
                          onChange={(e) => setFilterOptions(prev => ({
                            ...prev,
                            radianceBoosts: { ...prev.radianceBoosts, max: e.target.value ? parseInt(e.target.value) : null }
                          }))}
                          className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
                        />
                      </div>
                    </div>

                    {/* Subscription Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subscription Status</label>
                      <select
                        value={filterOptions.subscriptionStatus}
                        onChange={(e) => setFilterOptions(prev => ({ ...prev, subscriptionStatus: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
                      >
                        <option value="">Any Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>

                    {/* Onboarding Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Onboarding Status</label>
                      <select
                        value={filterOptions.onboardingStatus}
                        onChange={(e) => setFilterOptions(prev => ({ ...prev, onboardingStatus: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
                      >
                        <option value="">Any Status</option>
                        <option value="completed">Completed</option>
                        <option value="incomplete">Incomplete</option>
                      </select>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location/Region</label>
                      <input
                        type="text"
                        placeholder="Enter region or city"
                        value={filterOptions.location}
                        onChange={(e) => setFilterOptions(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
                      />
                    </div>

                    {/* Connection Intent */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Connection Intent</label>
                      <select
                        value={filterOptions.connectionIntent}
                        onChange={(e) => setFilterOptions(prev => ({ ...prev, connectionIntent: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
                      >
                        <option value="">Any Intent</option>
                        <option value="romantic">Romantic</option>
                        <option value="friendship">Friendship</option>
                        <option value="both">Both</option>
                      </select>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Results Summary & Export */}
            <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredUsers.length}</span> of <span className="font-semibold">{appUsers.length}</span> users
                {Object.keys(activeFilters).length > 0 && (
                  <span className="ml-2 text-purple-600">
                    (filtered by {Object.keys(activeFilters).length} criteria)
                  </span>
                )}
              </div>
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Export to CSV
              </button>
            </div>

            {/* Filtered Users Table */}
            {filteredUsers.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Lotus</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Radiance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Onboarding</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Subscription</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Details</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => {
                      // Only show app users in this table
                      if (!('userId' in user)) return null;
                      
                      const onboardingStatus = getOnboardingStatus(user);
                      const hasSubscription = user.subscription?.isActive;
                      
                      return (
                        <tr key={user.userId} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <a 
                              href={`/admin/users/${user.userId}`}
                              className="text-purple-600 hover:text-purple-800 hover:underline font-medium"
                            >
                              {user.fullName || `${user.firstName || ''} ${user.familyName || ''}`.trim() || 'N/A'}
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {user.numOfLotus || 0} 🌸
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              {user.activeBoosts || 0} ⚡
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex items-center">
                              {onboardingStatus.icon}
                              <span className="ml-2">{onboardingStatus.text}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {hasSubscription ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                None
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex gap-2">
                              {canGrantSubscription(user) && !hasSubscription ? (
                                <button
                                  onClick={() => handleGrantSubscription(user.userId)}
                                  disabled={assigningSubscription === user.userId}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {assigningSubscription === user.userId ? (
                                    <>
                                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2"></div>
                                      Granting...
                                    </>
                                  ) : (
                                    <>
                                      <Gift className="w-3 h-3 mr-1" />
                                      Grant fullcircle
                                    </>
                                  )}
                                </button>
                              ) : (
                                <span className="text-gray-400">
                                  {!canGrantSubscription(user) ? 'Complete onboarding first' : 'Already subscribed'}
                                </span>
                              )}
                              
                              <button
                                onClick={() => {
                                  setSelectedUsers([user.userId]);
                                  setActiveTab('lotus');
                                }}
                                className="inline-flex items-center px-2 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                              >
                                <Flower className="w-3 h-3 mr-1" />
                                Lotus
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedUsers([user.userId]);
                                  setActiveTab('lotus');
                                }}
                                className="inline-flex items-center px-2 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                              >
                                <Zap className="w-3 h-3 mr-1" />
                                Radiance
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <a 
                              href={`/admin/users/${user.userId}`}
                              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View Details
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {filteredUsers.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                {Object.keys(activeFilters).length > 0 
                  ? 'No users match your current filters. Try adjusting your criteria.'
                  : 'No users found. Use the filters above to find specific users.'
                }
              </p>
            )}


          </motion.div>
        )}

        {/* Modals */}
        {/* Lotus Operation Modal */}
        {showLotusModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Lotus Operation</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to {lotusAmount > 0 ? 'grant' : 'revoke'} {Math.abs(lotusAmount)} lotus flowers?
              </p>
              <p className="text-sm text-gray-500 mb-4">
                <strong>Reason:</strong> {lotusReason}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLotusModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (lotusAmount > 0) {
                      handleGrantLotus(selectedUsers[0] || '');
                    } else {
                      handleRevokeLotus(selectedUsers[0] || '');
                    }
                  }}
                  disabled={processing}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 transition-colors"
                >
                  {processing ? 'Processing...' : 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notification Modal */}
        {showNotificationModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Notification</h3>
              <p className="text-gray-600 mb-4">
                Send notification to {selectedUsers.length > 0 ? `${selectedUsers.length} selected users` : 'all users'}?
              </p>
              <p className="text-sm text-gray-500 mb-4">
                <strong>Title:</strong> {notificationTitle}<br/>
                <strong>Message:</strong> {notificationMessage}<br/>
                <strong>Type:</strong> {notificationType}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowNotificationModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendNotification}
                  disabled={processing}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {processing ? 'Sending...' : 'Send Notification'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Operation Modal */}
        {showBulkModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Bulk Operation</h3>
              <p className="text-gray-600 mb-4">
                Execute {bulkOperationType} on {selectedUsers.length} users?
              </p>
              <p className="text-sm text-gray-500 mb-4">
                This action cannot be undone and will affect multiple users simultaneously.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowBulkModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkOperation}
                  disabled={processing}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {processing ? 'Processing...' : 'Execute Operation'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Waitlist User Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Deletion</h3>
              {userToDelete ? (
                // Single user deletion
                <>
                  <p className="text-gray-600 mb-4">
                    Are you sure you want to delete <strong>{userToDelete.email}</strong> from the waitlist?
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    This action cannot be undone. The user will be permanently removed from the waitlist.
                  </p>
                </>
              ) : (
                // Bulk deletion
                <>
                  <p className="text-gray-600 mb-4">
                    Are you sure you want to delete <strong>{selectedUsers.length} users</strong> from the waitlist?
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    This action cannot be undone. All selected users will be permanently removed from the waitlist.
                  </p>
                </>
              )}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setUserToDelete(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={userToDelete ? confirmDeleteWaitlistUser : confirmBulkDeleteWaitlistUsers}
                  disabled={processing}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {processing ? 'Deleting...' : (userToDelete ? 'Delete User' : `Delete ${selectedUsers.length} Users`)}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Save Filter Preset Modal */}
        {showSavePresetModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Save Filter Preset</h3>
              <p className="text-gray-600 mb-4">
                Save your current filter settings as a reusable preset for quick access.
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Preset Name</label>
                <input
                  type="text"
                  value={filterPresetName}
                  onChange={(e) => setFilterPresetName(e.target.value)}
                  placeholder="e.g., High Value Users, New Signups"
                  className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowSavePresetModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveFilterPreset}
                  disabled={!filterPresetName.trim()}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  Save Preset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Email Composition Modal */}
        {showEmailModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {isBulkEmail ? `Send Email to ${selectedUsers.length} Users` : `Send Email to ${emailRecipient?.email}`}
              </h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Enter email subject..."
                  className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  placeholder="Enter your email message..."
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 resize-none"
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowEmailModal(false);
                    setEmailSubject('');
                    setEmailMessage('');
                    setEmailRecipient(null);
                    setIsBulkEmail(false);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={sendEmail}
                  disabled={!emailSubject.trim() || !emailMessage.trim() || processing}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 transition-colors flex items-center justify-center"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    `Send ${isBulkEmail ? 'Bulk ' : ''}Email`
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Admin Notifications */}
        <AdminNotifications 
          isVisible={showNotifications}
          onClose={() => setShowNotifications(false)}
          onNotificationAcknowledged={loadNotifications}
        />
      </div>
    </div>
  );
}

// Email handlers for waitlist users





