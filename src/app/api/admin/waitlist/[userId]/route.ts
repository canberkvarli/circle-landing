import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/services/firebase/adminApp';

export const runtime = 'nodejs';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

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
