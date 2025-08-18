import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/services/firebase/adminApp';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { userIds, title, message, type } = await request.json();
    
    if (!title || !message || !type) {
      return NextResponse.json({ 
        success: false, 
        message: 'Missing title, message, or type' 
      }, { status: 400 });
    }

    const db = getAdminDb();
    const notificationRef = db.collection('notifications').doc();
    
    // Create notification record
    const notificationData = {
      id: notificationRef.id,
      userIds: userIds || null, // null for broadcast
      title,
      message,
      type,
      status: 'pending',
      createdAt: new Date(),
    };

    await notificationRef.set(notificationData);

    // If it's a broadcast notification, send to all users
    if (!userIds) {
      const usersSnap = await db.collection('users').get();
      const allUserIds = usersSnap.docs.map(doc => doc.id);
      
      // Update notification with all user IDs
      await notificationRef.update({
        userIds: allUserIds,
        status: 'processing'
      });

      // TODO: Implement actual email/push notification sending
      // For now, just mark as sent
      await notificationRef.update({
        status: 'sent',
        sentAt: new Date()
      });
    } else {
      // Send to specific users
      await notificationRef.update({ status: 'processing' });
      
      // TODO: Implement actual email/push notification sending
      // For now, just mark as sent
      await notificationRef.update({
        status: 'sent',
        sentAt: new Date()
      });
    }

    return NextResponse.json({ 
      success: true, 
      notificationId: notificationRef.id,
      message: 'Notification sent successfully'
    });

  } catch (error) {
    console.error('Admin notification error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to send notification' 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = getAdminDb();
    const notificationsSnap = await db.collection('notifications')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();
    
    const notifications = notificationsSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ success: true, notifications });
  } catch (error) {
    console.error('Admin notifications list error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to list notifications' 
    }, { status: 500 });
  }
}
