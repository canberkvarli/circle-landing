import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/services/firebase/adminApp';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;
    
    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        message: 'Missing userId' 
      }, { status: 400 });
    }

    const db = getAdminDb();
    
    // Get lotus transactions for this user
    const transactionsSnap = await db.collection('lotusTransactions')
      .where('userId', '==', userId)
      .orderBy('timestamp', 'desc')
      .limit(100)
      .get();
    
    const transactions = transactionsSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, transactions });
  } catch (error) {
    console.error('Lotus history error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to get lotus history' 
    }, { status: 500 });
  }
}
