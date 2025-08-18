'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Edit, Save, X, Flower, Zap, User, MapPin, Star
} from 'lucide-react';
import { UserDataType } from '@/types';

export default function UserDetailPage() {
  const params = useParams();
  const userId = params.userId as string;
  
  const [user, setUser] = useState<UserDataType | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserDataType | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (userId) {
      loadUserData();
    }
  }, [userId]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call to get user data
      const response = await fetch(`/api/admin/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setEditedUser(data.user);
      } else {
        console.error('Failed to load user data');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editedUser) return;
    
    try {
      setSaving(true);
      // TODO: Replace with actual API call to update user data
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedUser),
      });
      
      if (response.ok) {
        setUser(editedUser);
        setEditing(false);
        alert('User data updated successfully!');
      } else {
        alert('Failed to update user data');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Error updating user data');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setEditing(false);
  };

  const updateField = <K extends keyof UserDataType>(field: K, value: UserDataType[K]) => {
    if (!editedUser) return;
    setEditedUser({ ...editedUser, [field]: value });
  };

  const updateNestedField = <P extends keyof UserDataType, F extends keyof NonNullable<UserDataType[P]>>(
    parent: P,
    field: F,
    value: NonNullable<UserDataType[P]>[F]
  ) => {
    if (!editedUser) return;
    setEditedUser({
      ...editedUser,
      [parent]: {
        ...(typeof editedUser[parent] === 'object' && editedUser[parent] !== null ? editedUser[parent] as object : {}),
        [field]: value
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <a href="/admin" className="mr-4 p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </a>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {user.fullName || `${user.firstName || ''} ${user.familyName || ''}`.trim() || 'User Profile'}
              </h1>
              <p className="text-gray-600">User ID: {userId}</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit User
              </button>
            )}
          </div>
        </div>

        {/* User Data Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Basic Information
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                {editing ? (
                  <input
                    type="text"
                    value={editedUser?.firstName || ''}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900">{user.firstName || 'Not set'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Family Name</label>
                {editing ? (
                  <input
                    type="text"
                    value={editedUser?.familyName || ''}
                    onChange={(e) => updateField('familyName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900">{user.familyName || 'Not set'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                {editing ? (
                  <input
                    type="email"
                    value={editedUser?.email || ''}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900">{user.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                {editing ? (
                  <input
                    type="tel"
                    value={editedUser?.phoneNumber || ''}
                    onChange={(e) => updateField('phoneNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900">{user.phoneNumber || 'Not set'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                {editing ? (
                  <input
                    type="number"
                    value={editedUser?.age || ''}
                    onChange={(e) => updateField('age', parseInt(e.target.value) || undefined)}
                    className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900">{user.age || 'Not set'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                {editing ? (
                  <input
                    type="number"
                    value={editedUser?.height || ''}
                    onChange={(e) => updateField('height', parseInt(e.target.value) || undefined)}
                    className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900">{user.height || 'Not set'}</p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Lotus & Radiance Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Flower className="w-5 h-5 mr-2 text-purple-600" />
              Lotus & Radiance
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lotus Count</label>
                {editing ? (
                  <input
                    type="number"
                    value={editedUser?.numOfLotus || 0}
                    onChange={(e) => updateField('numOfLotus', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900 flex items-center">
                    <Flower className="w-4 h-4 mr-2 text-purple-600" />
                    {user.numOfLotus || 0} lotus flowers
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Active Radiance Boosts</label>
                {editing ? (
                  <input
                    type="number"
                    value={editedUser?.activeBoosts || 0}
                    onChange={(e) => updateField('activeBoosts', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-white text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900 flex items-center">
                    <Zap className="w-4 h-4 mr-2 text-yellow-600" />
                    {user.activeBoosts || 0} boosts
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Onboarding Status</label>
                <p className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.onboardingCompleted 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user.onboardingCompleted ? 'Completed' : 'In Progress'}
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Onboarding Screen</label>
                <p className="text-gray-900">{user.currentOnboardingScreen || 'Not set'}</p>
              </div>
            </div>
          </motion.div>

          {/* Spiritual Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2 text-indigo-600" />
              Spiritual Profile
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Spiritual Draws</label>
                {editing ? (
                  <input
                    type="text"
                    value={editedUser?.spiritualProfile?.draws?.join(', ') || ''}
                    onChange={(e) => updateNestedField('spiritualProfile', 'draws', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                    placeholder="Comma-separated values"
                    className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900">
                    {user.spiritualProfile?.draws?.join(', ') || 'Not set'}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Practices</label>
                {editing ? (
                  <input
                    type="text"
                    value={editedUser?.spiritualProfile?.practices?.join(', ') || ''}
                    onChange={(e) => updateNestedField('spiritualProfile', 'practices', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                    placeholder="Comma-separated values"
                    className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900">
                    {user.spiritualProfile?.practices?.join(', ') || 'Not set'}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Healing Modalities</label>
                {editing ? (
                  <input
                    type="text"
                    value={editedUser?.spiritualProfile?.healingModalities?.join(', ') || ''}
                    onChange={(e) => updateNestedField('spiritualProfile', 'healingModalities', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                    placeholder="Comma-separated values"
                    className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900">
                    {user.spiritualProfile?.healingModalities?.join(', ') || 'Not set'}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Location & Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-green-600" />
              Location & Preferences
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                {editing ? (
                  <input
                    type="text"
                    value={editedUser?.regionName || ''}
                    onChange={(e) => updateField('regionName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900">{user.regionName || 'Not set'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Connection Intent</label>
                {editing ? (
                  <select
                    value={editedUser?.matchPreferences?.connectionIntent ?? ''}
                    onChange={(e) => {
                      const val = e.target.value as "romantic" | "friendship" | "both" | "";
                      updateNestedField(
                        'matchPreferences',
                        'connectionIntent',
                        val === "" ? undefined : val
                      );
                    }}
                    className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                  >
                    <option value="">Select intent</option>
                    <option value="romantic">Romantic</option>
                    <option value="friendship">Friendship</option>
                    <option value="both">Both</option>
                  </select>
                ) : (
                  <p className="text-gray-900">{user.matchPreferences?.connectionIntent || 'Not set'}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Distance (km)</label>
                {editing ? (
                  <input
                    type="number"
                    value={editedUser?.matchPreferences?.preferredDistance || ''}
                    onChange={(e) => updateNestedField('matchPreferences', 'preferredDistance', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-400 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900"
                  />
                ) : (
                  <p className="text-gray-900">{user.matchPreferences?.preferredDistance || 'Not set'} km</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Transaction History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Transaction History</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lotus Purchases */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                <Flower className="w-4 h-4 mr-2 text-purple-600" />
                Lotus Purchases
              </h3>
              {user.lotusPurchases && user.lotusPurchases.length > 0 ? (
                <div className="space-y-2">
                  {user.lotusPurchases.map((purchase, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{purchase.lotusCount} lotus</span>
                        <span className="text-green-600">${purchase.totalPrice}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(purchase.purchaseDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No lotus purchases</p>
              )}
            </div>
            
            {/* Radiance Boost Purchases */}
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center">
                <Zap className="w-4 h-4 mr-2 text-yellow-600" />
                Radiance Boosts
              </h3>
              {user.boostPurchases && user.boostPurchases.length > 0 ? (
                <div className="space-y-2">
                  {user.boostPurchases.map((boost, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{boost.boostCount} boosts</span>
                        <span className="text-green-600">${boost.totalPrice}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(boost.purchaseDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No boost purchases</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
