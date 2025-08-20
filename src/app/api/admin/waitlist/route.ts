import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getAdminDb } from '@/services/firebase/adminApp';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Admin waitlist route called - STEP 1');
    
    // Simple authentication check (temporarily bypassing middleware)
    const adminSession = request.cookies.get('admin-session');
    console.log('🍪 Admin session cookie:', adminSession ? adminSession.value : 'not found');
    
    if (!adminSession || adminSession.value !== 'authenticated') {
      console.log('❌ Authentication failed, returning 401');
      return NextResponse.json({ 
        success: false, 
        message: 'Unauthorized access',
        error: 'No valid admin session'
      }, { status: 401 });
    }
    
    console.log('✅ Authentication successful, proceeding with database operations...');
    console.log('🔍 Admin waitlist route called - STEP 2: About to get database connection');
    
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
    
    console.log('🔍 Admin waitlist route called - STEP 3: About to fetch data');
    
    console.log('📋 Fetching waitlist collection...');
    const snap = await db.collection('waitlist').get();
    const users = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(`✅ Found ${users.length} waitlist users`);
    
    return NextResponse.json({ success: true, users });
    
  } catch (error) {
    console.error('❌ Admin waitlist error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to list waitlist',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

// ✅ Add DELETE method to handle user deletion
export async function DELETE(request: NextRequest) {
  try {
    console.log('🗑️ Admin waitlist DELETE route called');
    
    // Get the userId from the URL search params
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    console.log('🗑️ Deleting waitlist user:', userId);

    const db = getAdminDb();
    
    // Delete the user from the waitlist collection
    await db.collection('waitlist').doc(userId).delete();

    console.log('✅ Waitlist user deleted successfully:', userId);

    return NextResponse.json({
      success: true,
      message: 'Waitlist user deleted successfully',
      deletedCount: 1
    });

  } catch (error) {
    console.error('❌ Error deleting waitlist user:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to delete waitlist user',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}


