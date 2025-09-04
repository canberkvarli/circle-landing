import { NextRequest, NextResponse } from 'next/server';
import { getAdminDb } from '@/services/firebase/adminApp';
import { getWaitlistConfirmationEmail } from '@/utils/emailTemplates';
import { getAdminWaitlistNotificationEmail } from "@/utils/emailTemplates";
import { FieldValue } from 'firebase-admin/firestore';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName, phone, heardFrom, additionalComments } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    const db = getAdminDb();
    
    // Check if email already exists in waitlist
    const existingUser = await db.collection('waitlist')
      .where('email', '==', email)
      .limit(1)
      .get();

    if (!existingUser.empty) {
      return NextResponse.json(
        { success: false, message: 'Email already registered for waitlist' },
        { status: 409 }
      );
    }

    // Add user to waitlist
    const docRef = await db.collection('waitlist').add({
      email: email.toLowerCase().trim(),
      firstName: firstName || 'Waitlist', // Use provided name or default
      lastName: lastName || 'User', // Use provided name or default
      phone: phone?.trim() || '', // Use provided phone or empty
      heardFrom: heardFrom?.trim() || 'fullcircle-modal',
      additionalComments: additionalComments?.trim() || '',
      timestamp: FieldValue.serverTimestamp(),
      status: 'waitlist',
      inviteSent: false,
      source: firstName ? 'early-access-modal' : 'fullcircle-modal' // Track where they came from
    });

    console.log('Waitlist user added successfully:', docRef.id);

    // Send confirmation email
    try {
      console.log('Preparing to send confirmation email to:', email);
      
      const emailHtml = getWaitlistConfirmationEmail({
        firstName: firstName || 'there',
        email: email.toLowerCase().trim()
      });

      console.log('Email HTML generated, length:', emailHtml.length);

      const emailUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/send-email`;
      console.log('Sending email request to:', emailUrl);

      const emailResponse = await fetch(emailUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email.toLowerCase().trim(),
          subject: 'Welcome to fullcircle Waitlist!',
          html: emailHtml,
        }),
      });

      console.log('Email API response status:', emailResponse.status);
      console.log('Email API response headers:', Object.fromEntries(emailResponse.headers.entries()));

      if (emailResponse.ok) {
        const emailResult = await emailResponse.json();
        console.log('Confirmation email sent successfully:', emailResult);
      } else {
        const errorText = await emailResponse.text();
        console.error('Failed to send confirmation email:', emailResponse.status, errorText);
        console.error('Full email request details:', {
          url: emailUrl,
          to: email.toLowerCase().trim(),
          subject: 'fullcircle Waitlist!',
          htmlLength: emailHtml.length
        });
      }
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError);
      // Don't fail the waitlist signup if email fails
    }

    // Send admin notification email
    try {
      console.log('Preparing to send admin notification email');
      
      const adminEmailHtml = getAdminWaitlistNotificationEmail({
        firstName: firstName || 'Waitlist',
        lastName: lastName || 'User',
        email: email.toLowerCase().trim(),
        phone: phone?.trim() || 'Not provided',
        heardFrom: heardFrom?.trim() || 'fullcircle-modal',
        additionalComments: additionalComments?.trim() || 'None',
        source: firstName ? 'early-access-modal' : 'fullcircle-modal',
        timestamp: new Date().toLocaleString('en-US', {
          timeZone: 'America/Los_Angeles',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short'
        })
      });

      const adminEmailUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/send-email`;
      
      // Send admin notification to both email addresses
      const adminEmails = (process.env.ADMIN_EMAIL || 'canberkvarli@gmail.com').split(',').map(email => email.trim());
      
      for (const adminEmail of adminEmails) {
        const adminEmailResponse = await fetch(adminEmailUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: adminEmail,
            subject: '🎉 New Waitlist Signup!',
            html: adminEmailHtml,
          }),
        });

        if (adminEmailResponse.ok) {
          const adminEmailResult = await adminEmailResponse.json();
          console.log(`Admin notification email sent successfully to ${adminEmail}:`, adminEmailResult);
        } else {
          const errorText = await adminEmailResponse.text();
          console.error(`Failed to send admin notification email to ${adminEmail}:`, adminEmailResponse.status, errorText);
        }
      }
    } catch (adminEmailError) {
      console.error('Error sending admin notification email:', adminEmailError);
      // Don't fail the waitlist signup if admin email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully joined waitlist',
      id: docRef.id
    });

  } catch (error) {
    console.error('Error adding waitlist user:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to join waitlist. Please try again.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = getAdminDb();
    const snapshot = await db.collection('waitlist').get();
    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return NextResponse.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    console.error('Error fetching waitlist:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch waitlist' },
      { status: 500 }
    );
  }
}
