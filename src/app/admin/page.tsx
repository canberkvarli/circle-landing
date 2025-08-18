'use client';

import React, { useState, useEffect } from 'react';
import { 
  assignFullCircleSubscription, 
  searchUsersByField, 
  UserData, 
  getWaitlistUsers, 
  getAppUsers, 
  WaitlistUser,
  grantLotusFlowers,
  revokeLotusFlowers,
  sendNotification,
  getAdminStats,
  performBulkOperation
} from '../../services/firebase/adminFunctions';
import { motion } from 'framer-motion';
import { 
  Search, Gift, UserCheck, Users, Clock, CheckCircle, AlertCircle, 
  Flower, Bell, BarChart3, Zap,
  Plus, Minus, Send, Eye,
} from 'lucide-react';
import { AdminStats } from '@/types';

export default function AdminDashboard() {
  // Existing state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState<'email' | 'phone' | 'name'>('email');
  const [searchResults, setSearchResults] = useState<UserData[]>([]);
  const [searching, setSearching] = useState(false);
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
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadAllUsers();
    loadAdminStats();
  }, []);

  const loadAllUsers = async () => {
    setLoading(true);
    try {
      const waitlist = await getWaitlistUsers();
      setWaitlistUsers(waitlist ?? []);
      const appUsersList = await getAppUsers();
      setAppUsers(appUsersList ?? []);
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
        setAdminStats(result.stats);
      }
    } catch (error) {
      console.error('Error loading admin stats:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    try {
      const results = await searchUsersByField(searchQuery, searchField);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      alert('Search failed. Please try again.');
    } finally {
      setSearching(false);
    }
  };

  const handleGrantSubscription = async (userId: string) => {
    setAssigningSubscription(userId);
    try {
      const result = await assignFullCircleSubscription(userId);
      if (result.success) {
        alert(`Successfully granted FullCircle subscription to user!`);
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
        alert('Notification sent successfully!');
        setShowNotificationModal(false);
        setNotificationTitle('');
        setNotificationMessage('');
        setSelectedUsers([]);
      } else {
        alert(`Failed to send notification: ${result.error}`);
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
      if (bulkOperationType.includes('Lotus')) {
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

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const selectAllUsers = () => {
    setSelectedUsers(appUsers.map(user => user.userId));
  };

  const clearSelection = () => {
    setSelectedUsers([]);
  };

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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">FullCircle Admin Panel</h1>
          <p className="text-lg text-gray-700">Comprehensive user management, lotus flowers, notifications, and analytics</p>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2 text-purple-600" />
              Waitlist Users
            </h2>
            
            {waitlistUsers.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No waitlist users found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {waitlistUsers.map((user, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {user.fullName || `${user.firstName || ''} ${user.familyName || ''}`.trim() || 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phoneNumber || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.createdAt ? new Date(user.createdAt).toISOString().split('T')[0] : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Waitlist
                          </span>
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
            
            {appUsers.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No app users found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        <input
                          type="checkbox"
                          checked={selectedUsers.length === appUsers.length && appUsers.length > 0}
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
                    {appUsers.map((user) => {
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
                                      Grant FullCircle
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
                      <option value="grantSubscription">Grant FullCircle Subscription</option>
                      <option value="revokeSubscription">Revoke Subscription</option>
                    </select>
                  </div>
                  
                  {(bulkOperationType.includes('Lotus')) && (
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
              Search Users
            </h2>

            {/* Search Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">How to Grant Subscriptions:</h3>
              <ol className="text-blue-800 space-y-1">
                <li>1. <strong>Search for a user</strong> by email, phone, or name</li>
                <li>2. <strong>Check their onboarding status</strong> - must be &quot;Onboarding Complete&quot;</li>
                <li>3. <strong>Click &quot;Grant FullCircle&quot;</strong> to give them a 1-month subscription</li>
              </ol>
            </div>

            {/* Search Form */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter email, phone, or name..."
                  className="w-full px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900 placeholder-gray-600"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value as 'email' | 'phone' | 'name')}
                  className="px-4 py-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="name">Name</option>
                </select>
                <button
                  onClick={handleSearch}
                  disabled={searching || !searchQuery.trim()}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {searching ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lotus</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Radiance</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Onboarding</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {searchResults.map((user) => {
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
                                      Grant FullCircle
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

            {searchResults.length === 0 && searchQuery && !searching && (
              <p className="text-gray-500 text-center py-8">No users found matching your search.</p>
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
      </div>
    </div>
  );
}
