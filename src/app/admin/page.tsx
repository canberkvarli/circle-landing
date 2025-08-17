'use client';

import React, { useState, useEffect } from 'react';
import { getAllWaitlistUsers, updateUserStatus, WaitlistUser } from '../../services/firebase/functions';
import { motion } from 'framer-motion';
import { Users, Mail, Phone, Calendar, CheckCircle, Clock, Crown } from 'lucide-react';

export default function AdminDashboard() {
  const [users, setUsers] = useState<WaitlistUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'waitlist' | 'invited' | 'active'>('all');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const allUsers: WaitlistUser[] = await getAllWaitlistUsers();
      setUsers(allUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      // Show user-friendly error message
      alert('Failed to load users. Please check your Firebase configuration.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (userId: string, newStatus: WaitlistUser['status']) => {
    try {
      const result = await updateUserStatus(userId, newStatus, newStatus === 'invited');
      if (result.success) {
        await loadUsers(); // Reload the list
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const filteredUsers = users.filter(user => 
    filter === 'all' ? true : user.status === filter
  );

  const stats = {
    total: users.length,
    waitlist: users.filter(u => u.status === 'waitlist').length,
    invited: users.filter(u => u.status === 'invited').length,
    active: users.filter(u => u.status === 'active').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-spiritual-background to-spiritual-secondary flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-spiritual-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-spiritual-background to-spiritual-secondary p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-spirituality font-bold text-spiritual-accent mb-4">
            FullCircle Admin Dashboard
          </h1>
          <p className="text-spiritual-text-muted text-lg">
            Manage your waitlist and prepare for launch
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Users', value: stats.total, icon: Users, color: 'from-blue-500 to-blue-600' },
            { label: 'Waitlist', value: stats.waitlist, icon: Clock, color: 'from-yellow-500 to-yellow-600' },
            { label: 'Invited', value: stats.invited, icon: Mail, color: 'from-purple-500 to-purple-600' },
            { label: 'Active', value: stats.active, icon: Crown, color: 'from-green-500 to-green-600' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-xl dark:bg-spiritual-dark-card"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-spiritual-text-muted text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-spirituality font-bold text-spiritual-accent">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-xl mb-8 dark:bg-spiritual-dark-card">
          <div className="flex flex-wrap gap-3">
            {[
              { key: 'all', label: 'All Users', count: stats.total },
              { key: 'waitlist', label: 'Waitlist', count: stats.waitlist },
              { key: 'invited', label: 'Invited', count: stats.invited },
              { key: 'active', label: 'Active', count: stats.active },
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key as typeof filter)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  filter === filterOption.key
                    ? 'bg-spiritual-accent text-white shadow-lg'
                    : 'bg-spiritual-background text-spiritual-text-muted hover:bg-spiritual-accent/10'
                }`}
              >
                {filterOption.label} ({filterOption.count})
              </button>
            ))}
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden dark:bg-spiritual-dark-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-spiritual-background dark:bg-spiritual-dark-background">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-spiritual-text-dark dark:text-spiritual-dark-text-light">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-spiritual-text-dark dark:text-spiritual-dark-text-light">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-spiritual-text-dark dark:text-spiritual-dark-text-light">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-spiritual-text-dark dark:text-spiritual-dark-text-light">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-spiritual-text-dark dark:text-spiritual-dark-text-light">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-spiritual-border dark:divide-spiritual-dark-border">
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-spiritual-background/50 dark:hover:bg-spiritual-dark-background/50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-spiritual-text-dark dark:text-spiritual-dark-text-light">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-sm text-spiritual-text-muted dark:text-spiritual-dark-text-muted">
                          ID: {user.id}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-spiritual-accent" />
                          <span className="text-spiritual-text-dark dark:text-spiritual-dark-text-light">
                            {user.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-spiritual-accent" />
                          <span className="text-spiritual-text-muted dark:text-spiritual-dark-text-muted">
                            {user.phone}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-spiritual-text-muted dark:text-spiritual-dark-text-muted">
                        <Calendar className="w-4 h-4" />
                        {user.timestamp?.toDate ? 
                          user.timestamp.toDate().toLocaleDateString() : 
                          'N/A'
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === 'waitlist' 
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                          : user.status === 'invited'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                          : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      }`}>
                        {user.status === 'waitlist' && <Clock className="w-3 h-3 mr-1" />}
                        {user.status === 'invited' && <Mail className="w-3 h-3 mr-1" />}
                        {user.status === 'active' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {user.status === 'waitlist' && (
                          <button
                            onClick={() => handleStatusUpdate(user.id!, 'invited')}
                            className="px-3 py-1 bg-purple-500 text-white text-xs rounded-lg hover:bg-purple-600 transition-colors"
                          >
                            Send Invite
                          </button>
                        )}
                        {user.status === 'invited' && (
                          <button
                            onClick={() => handleStatusUpdate(user.id!, 'active')}
                            className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors"
                          >
                            Activate
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-spiritual-text-muted mx-auto mb-4" />
              <p className="text-spiritual-text-muted">No users found with the selected filter.</p>
            </div>
          )}
        </div>

        {/* Export Section */}
        <div className="bg-white rounded-2xl p-6 shadow-xl mt-8 dark:bg-spiritual-dark-card">
          <h3 className="text-xl font-spirituality font-bold text-spiritual-accent mb-4">
            Export & Launch Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => {
                const csv = [
                  ['Name', 'Email', 'Phone', 'Status', 'Joined Date'],
                  ...filteredUsers.map(user => [
                    `${user.firstName} ${user.lastName}`,
                    user.email,
                    user.phone || '',
                    user.status,
                    user.timestamp?.toDate ? user.timestamp.toDate().toISOString() : 'N/A'
                  ])
                ].map(row => row.join(',')).join('\n');
                
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `fullcircle-waitlist-${new Date().toISOString().split('T')[0]}.csv`;
                a.click();
              }}
              className="px-4 py-2 bg-spiritual-accent text-white rounded-lg hover:bg-spiritual-accent/90 transition-colors"
            >
              Export to CSV
            </button>
            
            <button
              onClick={() => {
                const emails = filteredUsers.map(user => user.email).join('\n');
                navigator.clipboard.writeText(emails);
                alert('Emails copied to clipboard!');
              }}
              className="px-4 py-2 bg-spiritual-primary text-white rounded-lg hover:bg-spiritual-primary/90 transition-colors"
            >
              Copy All Emails
            </button>
            
            <button
              onClick={() => {
                const inviteUsers = users.filter(u => u.status === 'waitlist');
                alert(`Ready to send ${inviteUsers.length} invites! Use the Send Invite buttons above.`);
              }}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Prepare Launch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
