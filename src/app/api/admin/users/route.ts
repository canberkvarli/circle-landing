import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/services/firebase/adminApp';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const db = getAdminDb();
    const usersSnap = await db.collection('users').get();
    const users = usersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Admin users list error:', error);
    return NextResponse.json({ success: false, message: 'Failed to list users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, userId, data } = await request.json();
    if (!action || !userId) {
      return NextResponse.json({ success: false, message: 'Missing action or userId' }, { status: 400 });
    }

    const db = getAdminDb();
    const userRef = db.collection('users').doc(userId);

    if (action === 'grantFullCircle') {
      const now = Date.now();
      await userRef.set(
        {
          subscription: {
            isActive: true,
            status: 'active',
            planType: 'FullCircle',
            currentPeriodStart: now,
            currentPeriodEnd: now + 30 * 24 * 60 * 60 * 1000,
            cancelAtPeriodEnd: false,
            updatedAt: new Date(),
            createdAt: new Date(),
          },
          lotusCount: 10,
          updatedAt: new Date(),
        },
        { merge: true }
      );
      return NextResponse.json({ success: true });
    }

    if (action === 'revokeSubscription') {
      await userRef.set(
        {
          subscription: {
            isActive: false,
            status: 'cancelled',
            updatedAt: new Date(),
          },
          updatedAt: new Date(),
        },
        { merge: true }
      );
      return NextResponse.json({ success: true });
    }

    if (action === 'update') {
      if (!data || typeof data !== 'object') {
        return NextResponse.json({ success: false, message: 'Missing or invalid data' }, { status: 400 });
      }
      await userRef.set(
        {
          ...data,
          updatedAt: new Date(),
        },
        { merge: true }
      );
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Admin user action error:', error);
    return NextResponse.json({ success: false, message: 'Failed to perform action' }, { status: 500 });
  }
}


