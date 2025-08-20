import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/services/firebase/adminApp';
import { CollectionReference, Query, DocumentData } from 'firebase-admin/firestore';
import { Resend } from 'resend';
import { getAdminNotificationEmail } from "@/utils/emailTemplates";

// Expo push notification service
const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

interface NotificationPayload {
  title: string;
  body: string;
  data?: Record<string, unknown>;
  type?: 'announcement' | 'promotion' | 'system' | 'custom';
  userIds?: string[];
  broadcast?: boolean;
  sendEmail?: boolean; // New flag to control email sending
  emailOnly?: boolean; // New flag to send only emails (no push notifications)
}

async function sendExpoPushNotification(pushToken: string, payload: NotificationPayload) {
  const message = {
    to: pushToken,
    sound: 'default',
    title: payload.title,
    body: payload.body,
          data: {
        ...payload.data,
        type: payload.type || 'custom',
        timestamp: Date.now(),
        source: 'admin-dashboard'
      } as Record<string, unknown>,
  };

  try {
    const response = await fetch(EXPO_PUSH_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Expo push failed: ${response.status} - ${errorText}`);
    }

    return { success: true, response: await response.json() };
  } catch (error) {
    console.error('Error sending Expo push notification:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}



async function sendEmailNotification(email: string, payload: NotificationPayload) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Circle <noreply@joinfullcircle.app>',
      to: [email],
      subject: payload.title,
      html: getAdminNotificationEmail({
        title: payload.title,
        body: payload.body,
        actionUrl: typeof payload.data?.actionUrl === 'string' ? payload.data.actionUrl : undefined,
        actionText: typeof payload.data?.actionText === 'string' ? payload.data.actionText : undefined
      }),
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    console.error('Error sending email notification:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

async function getUsersWithEmails(userIds?: string[]): Promise<{ userId: string; email: string }[]> {
  try {
    let query: CollectionReference<DocumentData> | Query<DocumentData> = getAdminDb().collection('users');
    
    if (userIds && userIds.length > 0) {
      query = query.where('__name__', 'in', userIds);
    }

    const snapshot = await query.get();
    const users: { userId: string; email: string }[] = [];
    
    console.log(`Found ${snapshot.docs.length} total users for email query`);

    snapshot.forEach(doc => {
      const userData = doc.data();
      const email = userData?.email;
      
      if (email) {
        users.push({ userId: doc.id, email });
      }
    });

    console.log(`Filtered to ${users.length} users with email addresses`);
    return users;
  } catch (error) {
    console.error('Error getting users with emails:', error);
    return [];
  }
}

async function getUsersWithPushTokens(userIds?: string[]): Promise<{ userId: string; pushToken: string; email: string | null }[]> {
  try {
    let query: CollectionReference<DocumentData> | Query<DocumentData> = getAdminDb().collection('users');
    
    if (userIds && userIds.length > 0) {
      query = query.where('__name__', 'in', userIds);
    }

    const snapshot = await query.get();
    const users: { userId: string; pushToken: string; email: string | null }[] = [];
    
    console.log(`Found ${snapshot.docs.length} total users in query`);

    snapshot.forEach(doc => {
      const userData = doc.data();
      const pushToken = userData?.settings?.pushToken;
      const pushSettings = userData?.settings?.pushNotifications;
      
      console.log(`User ${doc.id}:`, {
        hasPushToken: !!pushToken,
        pushTokenLength: pushToken?.length || 0,
        pushSettings: pushSettings,
        muteAll: pushSettings?.muteAll,
        enableAll: pushSettings?.enableAll,
        announcements: pushSettings?.announcements,
        email: userData?.email || 'No email'
      });

      // Only include users with push tokens and notifications enabled
      if (pushToken && pushSettings && !pushSettings.muteAll && pushSettings.enableAll) {
        // Check if announcements are enabled
        if (pushSettings.announcements !== false) {
          users.push({ userId: doc.id, pushToken, email: userData?.email || null });
        }
      }
    });

    console.log(`Filtered to ${users.length} users with valid push notifications`);
    return users;
  } catch (error) {
    console.error('Error getting users with push tokens:', error);
    return [];
  }
}

export const runtime = 'nodejs';

// Test endpoint to verify route is working
export async function GET() {
  console.log('🔔 GET /api/admin/notifications called');
  return NextResponse.json({ 
    success: true, 
    message: 'Notifications API route is working',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  console.log('🔔 POST /api/admin/notifications called');
  
  try {
    // Check authentication
    // The authentication middleware now handles this, so we can proceed directly

    const { title, body, data, type, userIds, broadcast, sendEmail = false, emailOnly = false }: NotificationPayload = await request.json();

    if (!title || !body) {
      return NextResponse.json({
        success: false,
        message: 'Title and body are required'
      }, { status: 400 });
    }

    let targetUsers: { userId: string; pushToken: string; email: string | null }[] = [];
    let emailOnlyUsers: { userId: string; email: string }[] = [];

    if (emailOnly) {
      // Email-only mode - get users with emails
      if (broadcast) {
        emailOnlyUsers = await getUsersWithEmails();
      } else if (userIds && userIds.length > 0) {
        emailOnlyUsers = await getUsersWithEmails(userIds);
      } else {
        return NextResponse.json({
          success: false,
          message: 'Either userIds or broadcast must be specified'
        }, { status: 400 });
      }
      
      if (emailOnlyUsers.length === 0) {
        return NextResponse.json({
          success: false,
          message: 'No users found with email addresses',
          debug: {
            suggestion: 'Users need to have email addresses in their profile to receive email notifications.'
          }
        }, { status: 404 });
      }
    } else {
      // Regular mode - get users with push tokens
      if (broadcast) {
        targetUsers = await getUsersWithPushTokens();
      } else if (userIds && userIds.length > 0) {
        targetUsers = await getUsersWithPushTokens(userIds);
      } else {
        return NextResponse.json({
          success: false,
          message: 'Either userIds or broadcast must be specified'
        }, { status: 400 });
      }
    }

    if (!emailOnly && targetUsers.length === 0) {
      // If no users with push tokens found, provide helpful error message
      const totalUsers = await getAdminDb().collection('users').count().get();
      const usersWithTokens = await getAdminDb().collection('users').where('settings.pushToken', '!=', null).count().get();
      
      return NextResponse.json({
        success: false,
        message: 'No users found with push notifications enabled',
        debug: {
          totalUsers: totalUsers.data().count,
          usersWithTokens: usersWithTokens.data().count,
          suggestion: 'Users need to have push tokens and notification settings enabled. Check if mobile app has requested notification permissions.'
        }
      }, { status: 404 });
    }

    // Process notification without storing in database
    const totalRecipients = emailOnly ? emailOnlyUsers.length : targetUsers.length;
    
    // Create a mock reference for tracking (no database storage)
    const mockNotificationRef = {
      id: 'notification-' + Date.now(),
      update: async (data: Record<string, unknown>) => console.log('Mock notification update:', data)
    };

    // Send push notifications (only if not email-only mode)
    let pushResults: PromiseSettledResult<{ success: boolean; response?: unknown; error?: string }>[] = [];
    if (!emailOnly) {
      pushResults = await Promise.allSettled(
        targetUsers.map(user => 
          sendExpoPushNotification(user.pushToken, { title, body, data, type })
        )
      );
    }

    // Send emails
    let emailResults: PromiseSettledResult<{ success: boolean; id?: string; error?: string }>[] = [];
    if (emailOnly) {
      // Email-only mode
      console.log(`📧 Sending emails to ${emailOnlyUsers.length} users (email-only mode)`);
      emailResults = await Promise.allSettled(
        emailOnlyUsers.map(user => 
          sendEmailNotification(user.email, { title, body, data, type })
        )
      );
    } else if (sendEmail) {
      // Regular mode with email enabled
      const usersWithEmails = targetUsers.filter(user => user.email);
      if (usersWithEmails.length > 0) {
        console.log(`📧 Sending emails to ${usersWithEmails.length} users`);
        emailResults = await Promise.allSettled(
          usersWithEmails.map(user => 
            sendEmailNotification(user.email!, { title, body, data, type })
          )
        );
      } else {
        console.log('📧 No users with email addresses found for email notifications');
      }
    }

    // Count results
    const successfulPush = pushResults.filter(r => r.status === 'fulfilled' && r.value.success).length;
    const failedPush = pushResults.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value.success)).length;
    
    const successfulEmail = emailResults.filter(r => r.status === 'fulfilled' && r.value.success).length;
    const failedEmail = emailResults.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value.success)).length;

    const totalSuccessful = successfulPush + successfulEmail;
    const totalFailed = failedPush + failedEmail;

    // Update notification status (mock update)
    await mockNotificationRef.update({
      status: 'sent',
      successfulDeliveries: totalSuccessful,
      failedDeliveries: totalFailed,
      completedAt: new Date(),
      emailSent: emailOnly || sendEmail,
      emailRecipients: emailOnly ? emailOnlyUsers.length : (sendEmail ? targetUsers.filter(u => u.email).length : 0)
    });

    return NextResponse.json({
      success: true,
      notificationId: mockNotificationRef.id,
      totalRecipients,
      successfulDeliveries: totalSuccessful,
      failedDeliveries: totalFailed,
      pushNotifications: emailOnly ? null : {
        successful: successfulPush,
        failed: failedPush
      },
      emails: {
        successful: successfulEmail,
        failed: failedEmail,
        recipients: emailOnly ? emailOnlyUsers.length : (targetUsers.filter(u => u.email).length),
        mode: emailOnly ? 'email-only' : (sendEmail ? 'push+email' : 'push-only')
      },
      message: emailOnly 
        ? `Email notification sent successfully to ${successfulEmail} users`
        : `Notification sent successfully - Push: ${successfulPush}, Email: ${successfulEmail}`
    });

  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    }, { status: 500 });
  }
}
