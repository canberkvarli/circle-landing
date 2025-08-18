// Email Templates for FullCircle
// This file contains all email templates with consistent branding

export interface EmailTemplateData {
  firstName?: string;
  lastName?: string;
  email?: string;
  [key: string]: string | number | boolean | null | undefined;
}

// Base email template with common styling
const getBaseEmailTemplate = (content: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FullCircle</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background-color: #FAF8F5;
            color: #3D3B37;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #FFFFFF;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #C17767 0%, #7B6B5C 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
        }
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/></svg>') repeat;
            opacity: 0.3;
        }
        .logo-container {
            position: relative;
            z-index: 2;
        }
        .logo {
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        .logo svg {
            width: 50px;
            height: 50px;
        }
        .header-title {
            color: #FFFFFF;
            font-size: 32px;
            font-weight: 700;
            margin: 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header-subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            margin: 10px 0 0 0;
            font-weight: 400;
        }
        .content {
            padding: 40px 30px;
            background-color: #FFFFFF;
        }
        .welcome-section {
            background: linear-gradient(135deg, #FAF8F5 0%, #E5D4B1 100%);
            padding: 30px;
            border-radius: 16px;
            margin-bottom: 30px;
            border: 1px solid #E8E0D5;
        }
        .welcome-title {
            color: #C17767;
            font-size: 28px;
            font-weight: 700;
            margin: 0 0 20px 0;
            text-align: center;
        }
        .welcome-text {
            color: #6B5B4F;
            font-size: 16px;
            line-height: 1.7;
            margin: 0 0 15px 0;
            text-align: center;
        }
        .highlight-box {
            background: linear-gradient(135deg, #C17767 0%, #7B6B5C 100%);
            color: #FFFFFF;
            padding: 25px;
            border-radius: 16px;
            text-align: center;
            margin: 30px 0;
            box-shadow: 0 8px 25px rgba(193, 119, 103, 0.3);
        }
        .highlight-title {
            font-size: 20px;
            font-weight: 700;
            margin: 0 0 10px 0;
        }
        .highlight-subtitle {
            font-size: 14px;
            opacity: 0.9;
            margin: 0;
        }
        .footer {
            background-color: #F5F5F5;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #E8E0D5;
        }
        .footer-text {
            color: #8B7B6B;
            font-size: 14px;
            margin: 0 0 10px 0;
        }
        .footer-signature {
            color: #C17767;
            font-weight: 600;
        }
        .spacer {
            height: 20px;
        }
        @media (max-width: 600px) {
            .email-container {
                margin: 0;
                border-radius: 0;
            }
            .header, .content, .footer {
                padding: 20px;
            }
            .header-title {
                font-size: 28px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo-container">
                <div class="logo">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="45" fill="#C17767"/>
                        <circle cx="50" cy="50" r="35" fill="none" stroke="#FFFFFF" stroke-width="3"/>
                        <circle cx="50" cy="50" r="25" fill="#7B6B5C"/>
                        <circle cx="50" cy="50" r="15" fill="none" stroke="#FFFFFF" stroke-width="2"/>
                    </svg>
                </div>
                <h1 class="header-title">FullCircle</h1>
                <p class="header-subtitle">Meaningful Connections</p>
            </div>
        </div>
        
        <div class="content">
            ${content}
        </div>
        
        <div class="footer">
            <p class="footer-text">This is an automated message from FullCircle</p>
            <p class="footer-text">You can manage your preferences in the app settings</p>
            <div class="spacer"></div>
            <p class="footer-text">With gratitude,<br><span class="footer-signature">The FullCircle Team</span></p>
        </div>
    </div>
</body>
</html>
`;

// Waitlist confirmation email template
export const getWaitlistConfirmationEmail = (data: EmailTemplateData): string => {
  const { firstName = 'there' } = data;
  
  const content = `
    <div class="welcome-section">
        <h2 class="welcome-title">🌟 Welcome to the Circle, ${firstName}! 🌟</h2>
        <p class="welcome-text">
            Thank you for joining our exclusive waitlist! You're now part of a community of mindful seekers 
            who are ready to experience authentic spiritual connections.
        </p>
        <p class="welcome-text">
            We'll notify you as soon as the FullCircle app launches with your exclusive early access.
        </p>
        <p class="welcome-text">
            Stay tuned for updates and be ready to start your spiritual connection journey!
        </p>
    </div>
    
    <div class="highlight-box">
        <h3 class="highlight-title">✨ You're on the list! ✨</h3>
        <p class="highlight-subtitle">First 5,000 members get 1 month completely free</p>
    </div>
    
    <div style="text-align: center; padding: 20px; background: #F8F6F3; border-radius: 16px; border: 2px solid #E5D4B1;">
        <h3 style="color: #7B6B5C; font-size: 18px; margin: 0 0 15px 0;">What to expect next:</h3>
        <ul style="color: #6B5B4F; font-size: 14px; line-height: 1.6; margin: 0; padding-left: 20px; text-align: left; display: inline-block;">
            <li>Early access notification when we launch</li>
            <li>Exclusive community updates and insights</li>
            <li>Special offers for waitlist members</li>
            <li>Behind-the-scenes content and sneak peeks</li>
        </ul>
    </div>
  `;
  
  return getBaseEmailTemplate(content);
};

// Contact form notification email template
export const getContactFormEmail = (data: EmailTemplateData): string => {
  const { name, email, subject, message, timestamp } = data;
  
  const content = `
    <div class="welcome-section">
        <h2 class="welcome-title">📧 New Contact Form Submission</h2>
        <p class="welcome-text">Someone has reached out through your website contact form.</p>
    </div>
    
    <div style="background: #F8F6F3; padding: 25px; border-radius: 16px; border: 1px solid #E8E0D5;">
        <h3 style="color: #7B6B5C; font-size: 18px; margin: 0 0 20px 0;">Contact Details:</h3>
        <div style="margin-bottom: 15px;">
            <strong style="color: #6B5B4F;">Name:</strong> 
            <span style="color: #8B7B6B;">${name || 'Not provided'}</span>
        </div>
        <div style="margin-bottom: 15px;">
            <strong style="color: #6B5B4F;">Email:</strong> 
            <span style="color: #8B7B6B;">${email || 'Not provided'}</span>
        </div>
        <div style="margin-bottom: 15px;">
            <strong style="color: #6B5B4F;">Subject:</strong> 
            <span style="color: #8B7B6B;">${subject || 'Not provided'}</span>
        </div>
        <div style="margin-bottom: 15px;">
            <strong style="color: #6B5B4F;">Message:</strong>
        </div>
        <div style="background: #FFFFFF; padding: 20px; border-radius: 12px; border: 1px solid #E8E0D5;">
            <p style="color: #6B5B4F; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message || 'No message provided'}</p>
        </div>
        <div style="margin-top: 15px; font-size: 12px; color: #8B7B6B;">
            <strong>Timestamp:</strong> ${timestamp || new Date().toLocaleString()}
        </div>
    </div>
  `;
  
  return getBaseEmailTemplate(content);
};

// Admin notification email template
export const getAdminNotificationEmail = (data: EmailTemplateData): string => {
  const { title, body, actionUrl, actionText } = data;
  
  const content = `
    <div class="welcome-section">
        <h2 class="welcome-title">🔔 ${title}</h2>
        <p class="welcome-text">${body}</p>
    </div>
    
    ${actionUrl ? `
    <div style="text-align: center; margin: 30px 0;">
        <a href="${actionUrl}" 
           style="background: linear-gradient(135deg, #C17767 0%, #7B6B5C 100%); 
                  color: white; 
                  padding: 15px 30px; 
                  text-decoration: none; 
                  border-radius: 25px; 
                  display: inline-block;
                  font-weight: 600;
                  box-shadow: 0 4px 15px rgba(193, 119, 103, 0.3);">
            ${actionText || 'Learn More'}
        </a>
    </div>
    ` : ''}
  `;
  
  return getBaseEmailTemplate(content);
};
