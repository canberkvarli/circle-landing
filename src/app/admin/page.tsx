'use client';

import React, { useState, useEffect } from 'react';
import { assignFullCircleSubscription, searchUsersByField, UserData, getWaitlistUsers, getAppUsers } from '../../services/firebase/adminFunctions';
import { motion } from 'framer-motion';
import { Mail, Phone, Search, Gift, UserCheck, Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchField, setSearchField] = useState<'email' | 'phone' | 'name'>('email');
  const [searchResults, setSearchResults] = useState<UserData[]>([]);
  const [searching, setSearching] = useState(false);
  const [assigningSubscription, setAssigningSubscription] = useState<string | null>(null);
  
  // New state for managing users
  const [waitlistUsers, setWaitlistUsers] = useState<any[]>([]);
  const [appUsers, setAppUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'waitlist' | 'app-users' | 'search'>('waitlist');

  useEffect(() => {
    loadAllUsers();
  }, []);

  const loadAllUsers = async () => {
    setLoading(true);
    try {
      // Load waitlist users
      const waitlist = await getWaitlistUsers();
      setWaitlistUsers(waitlist);
      
      // Load app users
      const appUsers = await getAppUsers();
      setAppUsers(appUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      alert('Failed to load users. Please check your connection.');
    } finally {
      setLoading(false);
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
        // Refresh the user list
        await loadAllUsers();
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
    // Only grant subscription if user has completed onboarding
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">FullCircle Admin Panel</h1>
          <p className="text-lg text-gray-600">Manage waitlist users and grant FullCircle subscriptions</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-white rounded-lg p-1 mb-6 shadow-sm">
          <button
            onClick={() => setActiveTab('waitlist')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'waitlist'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Waitlist Users ({waitlistUsers.length})
          </button>
          <button
            onClick={() => setActiveTab('app-users')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'app-users'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <UserCheck className="w-4 h-4 inline mr-2" />
            App Users ({appUsers.length})
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
              activeTab === 'search'
                ? 'bg-purple-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Search className="w-4 h-4 inline mr-2" />
            Search Users
          </button>
        </div>

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
                          {user.createdAt ? new Date(user.createdAt.toDate()).toLocaleDateString() : 'N/A'}
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
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Onboarding</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {appUsers.map((user) => {
                      const onboardingStatus = getOnboardingStatus(user);
                      const hasSubscription = user.subscription?.isActive;
                      
                      return (
                        <tr key={user.userId} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.fullName || `${user.firstName || ''} ${user.familyName || ''}`.trim() || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
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
                <li>2. <strong>Check their onboarding status</strong> - must be "Onboarding Complete"</li>
                <li>3. <strong>Click "Grant FullCircle"</strong> to give them a 1-month subscription</li>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value as 'email' | 'phone' | 'name')}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Onboarding</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {searchResults.map((user) => {
                      const onboardingStatus = getOnboardingStatus(user);
                      const hasSubscription = user.subscription?.isActive;
                      
                      return (
                        <tr key={user.userId} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.fullName || `${user.firstName || ''} ${user.familyName || ''}`.trim() || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
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
      </div>
    </div>
  );
}
