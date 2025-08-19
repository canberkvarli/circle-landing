import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/services/firebase/adminApp';

// Define interfaces for the data we're working with
interface UserData {
  id: string;
  subscription?: {
    isActive?: boolean;
    createdAt?: Date | string;
  };
  createdAt?: Date | string;
  onboardingCompleted?: boolean;
  lotusCount?: number;
  numOfLotus?: number;
}

interface WaitlistUser {
  id: string;
}

interface LotusTransaction {
  id: string;
  type?: string;
  amount?: number;
}

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Admin stats route called - STEP 1');
    
    // Simple authentication check (temporarily bypassing middleware)
    const adminSession = request.cookies.get('admin-session');
    console.log('🍪 Admin session cookie:', adminSession ? adminSession.value : 'not found');
    
    if (!adminSession || adminSession.value !== 'authenticated') {
      console.log('❌ Authentication failed, returning 401');
      return NextResponse.json(
        { success: false, message: 'Unauthorized access' },
        { status: 401 }
      );
    }
    
    console.log('✅ Authentication successful, proceeding with database operations...');
    console.log('🔍 Admin stats route called - STEP 2: About to get database connection');
    
    // Check if we can get the database connection
    let db;
    try {
      db = getAdminDb();
      console.log('✅ Database connection successful');
    } catch (dbError) {
      console.error('❌ Database connection failed:', dbError);
      return NextResponse.json({ 
        success: false, 
        message: 'Database connection failed',
        error: dbError instanceof Error ? dbError.message : 'Unknown database error'
      }, { status: 500 });
    }
    
    console.log('🔍 Admin stats route called - STEP 3: About to fetch data');
    
    // Get all users
    console.log('📊 Fetching users...');
    const usersSnap = await db.collection('users').get();
    const users = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as UserData[];
    console.log(`✅ Found ${users.length} users`);
    
    // Get waitlist users
    console.log('📋 Fetching waitlist...');
    const waitlistSnap = await db.collection('waitlist').get();
    const waitlistUsers = waitlistSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as WaitlistUser[];
    console.log(`✅ Found ${waitlistUsers.length} waitlist users`);
    
    // Get lotus transactions
    console.log('🌸 Fetching lotus transactions...');
    const lotusSnap = await db.collection('lotusTransactions').get();
    const lotusTransactions = lotusSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as LotusTransaction[];
    console.log(`✅ Found ${lotusTransactions.length} lotus transactions`);
    
    // Calculate statistics
    const totalUsers = users.length;
    const activeSubscriptions = users.filter(user => user.subscription?.isActive).length;
    const waitlistCount = waitlistUsers.length;
    
    // Calculate lotus statistics
    const totalLotusGranted = lotusTransactions
      .filter(tx => tx.type === 'grant')
      .reduce((sum, tx) => sum + (tx.amount || 0), 0);
    
    const totalLotusSpent = lotusTransactions
      .filter(tx => tx.type === 'spent')
      .reduce((sum, tx) => sum + (tx.amount || 0), 0);
    
    // Recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentSignups = users.filter(user => 
      user.createdAt && new Date(user.createdAt) > sevenDaysAgo
    ).length;
    
    const recentSubscriptions = users.filter(user => 
      user.subscription?.createdAt && new Date(user.subscription.createdAt) > sevenDaysAgo
    ).length;
    
    const stats = {
      totalUsers,
      activeSubscriptions,
      waitlistUsers: waitlistCount,
      totalLotusGranted,
      totalLotusSpent,
      recentSignups,
      recentSubscriptions,
      totalLotusBalance: users.reduce((sum, user) => sum + (user.numOfLotus || 0), 0),
      averageLotusPerUser: totalUsers > 0 ? (users.reduce((sum, user) => sum + (user.numOfLotus || 0), 0) / totalUsers).toFixed(1) : 0,
      onboardingCompletionRate: totalUsers > 0 ? ((users.filter(user => user.onboardingCompleted).length / totalUsers) * 100).toFixed(1) : 0
    };

    console.log('✅ Stats calculated successfully:', stats);
    return NextResponse.json({ success: true, stats });
    
  } catch (error) {
    console.error('❌ Admin stats error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to get statistics',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
