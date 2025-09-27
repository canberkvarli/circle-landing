import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/services/firebase/adminApp';
import { getTestFlightInvitationEmail } from '@/utils/emailTemplates';

export async function POST(request: NextRequest) {
  try {
    const { userIds, sendToAll = false } = await request.json();

    if (!userIds && !sendToAll) {
      return NextResponse.json(
        { success: false, message: 'Either userIds or sendToAll must be provided' },
        { status: 400 }
      );
    }

    const db = getAdminDb();
    let usersToInvite = [];

    if (sendToAll) {
      // Get all waitlist users who haven't been invited yet
      const waitlistSnapshot = await db.collection('waitlist')
        .where('testflightInviteSent', '==', false)
        .get();
      
      usersToInvite = waitlistSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } else {
      // Get specific users
      const userPromises = userIds.map(async (userId: string) => {
        const userDoc = await db.collection('waitlist').doc(userId).get();
        if (userDoc.exists) {
          return {
            id: userDoc.id,
            ...userDoc.data()
          };
        }
        return null;
      });
      
      const userResults = await Promise.all(userPromises);
      usersToInvite = userResults.filter(user => user !== null);
    }

    if (usersToInvite.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No users found to invite' },
        { status: 404 }
      );
    }

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    // Process each user
    for (let i = 0; i < usersToInvite.length; i++) {
      const user = usersToInvite[i];
      const testerNumber = i + 1;
      const testerName = `Tester ${testerNumber}`;

      try {
        // Generate the email content
        const emailHtml = getTestFlightInvitationEmail();

        // Send the email
        const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: user.email,
            subject: '🎉 You\'re Invited to Test fullcircle! - Beta Testing Program',
            html: emailHtml,
          }),
        });

        if (emailResponse.ok) {
          // Update user record to mark invitation as sent
          await db.collection('waitlist').doc(user.id).update({
            testflightInviteSent: true,
            testflightInviteSentAt: new Date(),
            testerName: testerName
          });
          
          successCount++;
        } else {
          const errorText = await emailResponse.text();
          console.error(`Failed to send TestFlight invitation to ${user.email}:`, errorText);
          errors.push(`${user.email}: ${errorText}`);
          errorCount++;
        }
      } catch (error) {
        console.error(`Error sending TestFlight invitation to ${user.email}:`, error);
        errors.push(`${user.email}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        errorCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `TestFlight invitations sent successfully`,
      stats: {
        total: usersToInvite.length,
        successful: successCount,
        failed: errorCount,
        errors: errors
      }
    });

  } catch (error) {
    console.error('Error in TestFlight invitation API:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send TestFlight invitations',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
