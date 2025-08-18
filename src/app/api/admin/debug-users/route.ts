import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/services/firebase/adminApp';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Debug endpoint called - testing Firebase connection...');
    
    const adminDb = getAdminDb();
    console.log('✅ Firebase Admin SDK initialized successfully');
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '5');
    
    console.log(`📊 Attempting to query users collection with limit ${limit}...`);
    
    // First, just try to get the collection reference
    const usersCollection = adminDb.collection('users');
    console.log('✅ Users collection reference obtained');
    
    // Get a few users to examine their structure
    const snapshot = await usersCollection.limit(limit).get();
    console.log(`✅ Query successful - found ${snapshot.docs.length} users`);
    
    const users = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        userId: doc.id,
        email: data.email,
        hasSettings: !!data.settings,
        hasPushToken: !!data.settings?.pushToken,
        pushTokenLength: data.settings?.pushToken?.length || 0,
        pushNotifications: data.settings?.pushNotifications,
        notificationSettings: {
          muteAll: data.settings?.pushNotifications?.muteAll,
          enableAll: data.settings?.pushNotifications?.enableAll,
          announcements: data.settings?.pushNotifications?.announcements,
          newLikes: data.settings?.pushNotifications?.newLikes,
          newMatches: data.settings?.pushNotifications?.newMatches,
          newMessages: data.settings?.pushNotifications?.newMessages
        }
      };
    });

    console.log('📋 Processing user data...');
    
    // Get counts - use try-catch for each to isolate issues
    let totalUsers = 0;
    let usersWithTokens = 0;
    let usersWithNotificationSettings = 0;
    
    try {
      const totalSnapshot = await usersCollection.count().get();
      totalUsers = totalSnapshot.data().count;
      console.log(`✅ Total users count: ${totalUsers}`);
    } catch (error) {
      console.error('❌ Error getting total users count:', error);
    }
    
    try {
      const tokensSnapshot = await usersCollection.where('settings.pushToken', '!=', null).count().get();
      usersWithTokens = tokensSnapshot.data().count;
      console.log(`✅ Users with tokens count: ${usersWithTokens}`);
    } catch (error) {
      console.error('❌ Error getting users with tokens count:', error);
    }
    
    try {
      const settingsSnapshot = await usersCollection.where('settings.pushNotifications', '!=', null).count().get();
      usersWithNotificationSettings = settingsSnapshot.data().count;
      console.log(`✅ Users with notification settings count: ${usersWithNotificationSettings}`);
    } catch (error) {
      console.error('❌ Error getting users with notification settings count:', error);
    }

    console.log('✅ Debug endpoint completed successfully');
    
    return NextResponse.json({
      success: true,
      debug: {
        totalUsers,
        usersWithTokens,
        usersWithNotificationSettings,
        sampleUsers: users
      }
    });

  } catch (error) {
    console.error('❌ Error in debug endpoint:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      error: error instanceof Error ? error.stack : 'No stack trace available'
    }, { status: 500 });
  }
}
