import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/services/firebase/adminApp';

export const runtime = 'nodejs';

// ✅ Support both DELETE and POST methods
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  return handleWaitlistDeletion(request, { params });
}

// ✅ Add POST method as fallback (some environments prefer POST)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  return handleWaitlistDeletion(request, { params });
}

// ✅ Helper function to handle the deletion logic
async function handleWaitlistDeletion(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    const db = getAdminDb();
    
    // Delete the user from the waitlist collection
    await db.collection('waitlist').doc(userId).delete();

    console.log('Waitlist user deleted successfully:', userId);

    return NextResponse.json({
      success: true,
      message: 'Waitlist user deleted successfully',
      deletedCount: 1
    });

  } catch (error) {
    console.error('Error deleting waitlist user:', error);
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
