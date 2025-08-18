import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/services/firebase/adminApp';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const value = searchParams.get('q')?.trim();
    const field = searchParams.get('field') as 'email' | 'phone' | 'name' | null;
    if (!value || !field) {
      return NextResponse.json({ success: false, message: 'Missing q or field' }, { status: 400 });
    }

    const db = getAdminDb();
    const usersRef = db.collection('users');
    let snapshot;

    if (field === 'email') {
      snapshot = await usersRef.where('email', '==', value.toLowerCase()).get();
    } else if (field === 'phone') {
      snapshot = await usersRef.where('phoneNumber', '==', value).get();
    } else {
      // name search: fetch a reasonable subset and filter in memory
      snapshot = await usersRef.limit(500).get();
    }

    const users = snapshot.docs
      .map((doc) => ({ id: doc.id, ...(doc.data() as Record<string, unknown>) }))
      .filter((u: Record<string, unknown>) => {
        if (field !== 'name') return true;
        const firstName = (u.firstName as string | undefined) || '';
        const familyName = (u.familyName as string | undefined) || '';
        const fullNameField = (u.fullName as string | undefined) || '';
        const full = `${firstName} ${familyName}`.toLowerCase();
        const full2 = fullNameField.toLowerCase();
        const q = value.toLowerCase();
        return full.includes(q) || full2.includes(q);
      });

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('Admin search error:', error);
    return NextResponse.json({ success: false, message: 'Search failed' }, { status: 500 });
  }
}


