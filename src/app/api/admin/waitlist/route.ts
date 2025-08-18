import { NextResponse } from 'next/server';
import { getAdminDb } from '@/services/firebase/adminApp';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const db = getAdminDb();
    const snap = await db.collection('waitlist').get();
    const users = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Admin waitlist error:', error);
    return NextResponse.json({ success: false, message: 'Failed to list waitlist' }, { status: 500 });
  }
}


