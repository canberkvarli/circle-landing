import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html } = await request.json();

    console.log('Email API called with:', { to, subject, html: html.substring(0, 100) + '...' });

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { success: false, message: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'FullCircle <onboarding@resend.dev>', // Using your onboarding domain for now
      to: [to],
      subject: subject,
      html: html,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to send email via Resend' },
        { status: 500 }
      );
    }

    if (data) {
      console.log('Email sent successfully:', data);
      return NextResponse.json({ 
        success: true, 
        message: 'Email sent successfully via Resend',
        id: data.id 
      });
    }

    return NextResponse.json(
      { success: false, message: 'No response from Resend' },
      { status: 500 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
