import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { to } = await request.json();

    console.log('Test email API called with:', { to });
    console.log('Environment check - RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('Environment check - RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length || 0);

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { success: false, message: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send a simple test email
    const { data, error } = await resend.emails.send({
      from: 'Circle <noreply@joinfullcircle.app>',
      to: [to],
      subject: '🧪 Test Email from Circle',
      html: `
        <h1>Test Email</h1>
        <p>This is a test email to verify that the email service is working correctly.</p>
        <p>If you receive this, the email configuration is working!</p>
        <p>Sent at: ${new Date().toLocaleString('en-US', { 
          timeZone: 'America/Los_Angeles',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short'
        })}</p>
      `,
    });

    console.log('Resend API response:', { data, error });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to send test email via Resend', error: error },
        { status: 500 }
      );
    }

    if (data) {
      console.log('Test email sent successfully:', data);
      return NextResponse.json({ 
        success: true, 
        message: 'Test email sent successfully via Resend',
        id: data.id 
      });
    }

    return NextResponse.json(
      { success: false, message: 'No response from Resend' },
      { status: 500 }
    );

  } catch (error) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
