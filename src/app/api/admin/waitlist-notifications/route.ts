import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/services/firebase/adminApp';

export const runtime = 'nodejs';

// GET: Retrieve recent waitlist notifications
export async function GET(request: NextRequest) {
  try {
    // Simple authentication check
    const adminSession = request.cookies.get('admin-session');
    
    if (!adminSession || adminSession.value !== 'authenticated') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized access' },
        { status: 401 }
      );
    }

    const db = getAdminDb();
    
    // Get recent waitlist users (last 24 hours)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const waitlistSnap = await db.collection('waitlist')
      .where('timestamp', '>=', yesterday)
      .orderBy('timestamp', 'desc')
      .limit(50)
      .get();

    const notifications = waitlistSnap.docs
      .filter(doc => {
        const data = doc.data();
        // Only show notifications that haven't been acknowledged
        return !data.notificationAcknowledged;
      })
      .map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          type: 'waitlist_signup',
          title: 'New Waitlist Signup',
          message: `${data.firstName || 'Someone'} joined the waitlist`,
          userData: {
            firstName: data.firstName || 'Waitlist',
            lastName: data.lastName || 'User',
            email: data.email,
            phone: data.phone || 'Not provided',
            heardFrom: data.heardFrom || 'Not specified',
            additionalComments: data.additionalComments || 'None',
            source: data.source || 'unknown',
            timestamp: data.timestamp?.toDate?.() || data.timestamp
          },
          timestamp: data.timestamp?.toDate?.() || data.timestamp,
          acknowledged: false
        };
      });

    console.log(`Found ${waitlistSnap.docs.length} total waitlist users, ${notifications.length} unacknowledged notifications`);

    return NextResponse.json({
      success: true,
      notifications
    });

  } catch (error) {
    console.error('Error fetching waitlist notifications:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

// POST: Mark notification as acknowledged
export async function POST(request: NextRequest) {
  try {
    // Simple authentication check
    const adminSession = request.cookies.get('admin-session');
    
    if (!adminSession || adminSession.value !== 'authenticated') {
      return NextResponse.json(
        { success: false, message: 'Unauthorized access' },
        { status: 401 }
      );
    }

    const { notificationId } = await request.json();

    if (!notificationId) {
      return NextResponse.json(
        { success: false, message: 'Notification ID is required' },
        { status: 400 }
      );
    }

    // Store the acknowledged state directly in the waitlist document
    const db = getAdminDb();
    
    await db.collection('waitlist').doc(notificationId).update({
      notificationAcknowledged: true,
      acknowledgedAt: new Date(),
      acknowledgedBy: 'admin-dashboard'
    });

    console.log(`Notification ${notificationId} acknowledged and stored in waitlist document`);

    return NextResponse.json({
      success: true,
      message: 'Notification acknowledged'
    });

  } catch (error) {
    console.error('Error acknowledging notification:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to acknowledge notification' },
      { status: 500 }
    );
  }
}
