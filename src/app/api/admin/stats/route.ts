import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/services/firebase/adminApp';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const db = getAdminDb();
    
    // Get all users
    const usersSnap = await db.collection('users').get();
    const users = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Get waitlist users
    const waitlistSnap = await db.collection('waitlist').get();
    const waitlistUsers = waitlistSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Get lotus transactions
    const lotusSnap = await db.collection('lotusTransactions').get();
    const lotusTransactions = lotusSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
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
      totalLotusBalance: users.reduce((sum, user) => sum + (user.lotusCount || 0), 0),
      averageLotusPerUser: totalUsers > 0 ? (users.reduce((sum, user) => sum + (user.lotusCount || 0), 0) / totalUsers).toFixed(1) : 0,
      onboardingCompletionRate: totalUsers > 0 ? ((users.filter(user => user.onboardingCompleted).length / totalUsers) * 100).toFixed(1) : 0
    };

    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to get statistics' 
    }, { status: 500 });
  }
}
