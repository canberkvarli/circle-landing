import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import { EMAIL_LOGO_CONFIG } from '@/utils/emailTemplates';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html } = await request.json();

    console.log('Email API called with:', { to, subject, html: html.substring(0, 100) + '...' });
    console.log('Environment check - RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY);
    console.log('Environment check - RESEND_API_KEY length:', process.env.RESEND_API_KEY?.length || 0);

    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { success: false, message: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send email using Resend
    console.log('Attempting to send email via Resend to:', to);
    console.log('Using from address: FullCircle <onboarding@resend.dev>');
    
    // Read the email logo for inline attachment
    const logoPath = path.join(process.cwd(), 'public', 'lightOuroboros.png');
    let logoAttachment = null;
    
    try {
      if (fs.existsSync(logoPath)) {
        const logoBuffer = fs.readFileSync(logoPath);
        logoAttachment = {
          content: logoBuffer.toString('base64'),
          filename: EMAIL_LOGO_CONFIG.filename,
          contentId: EMAIL_LOGO_CONFIG.contentId,
          contentType: 'image/png'
        };
        console.log('PNG logo attachment prepared successfully');
      } else {
        console.warn('Logo file not found at:', logoPath);
      }
    } catch (logoError) {
      console.warn('Failed to read logo file:', logoError);
    }
    
    const { data, error } = await resend.emails.send({
      from: 'FullCircle <onboarding@resend.dev>', // Using your onboarding domain for now
      to: [to],
      subject: subject,
      html: html,
      replyTo: 'support@joinfullcircle.app', // Add reply-to address
      attachments: logoAttachment ? [logoAttachment] : undefined,
    });

    console.log('Resend API response:', { data, error });

    if (error) {
      console.error('Resend error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { success: false, message: 'Failed to send email via Resend', error: error },
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
