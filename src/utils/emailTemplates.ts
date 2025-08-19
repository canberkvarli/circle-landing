// Email Templates for FullCircle
// Multiple beautiful email templates with consistent branding

export interface EmailTemplateData {
  firstName?: string;
  lastName?: string;
  email?: string;
  [key: string]: string | number | boolean | null | undefined;
}

// Base email template with common styling - soft colors, rounded borders
const getBaseEmailTemplate = (content: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FullCircle</title>
    <style>
        @font-face {
            font-family: 'Spirituality';
            src: url('data:font/woff2;base64,${encodeURIComponent('path/to/spirituality-font.woff2')}') format('woff2');
            font-weight: normal;
            font-style: normal;
        }
        
        body {
            margin: 0;
            padding: 0;
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: linear-gradient(135deg, #F8F6F3 0%, #E8E0D5 100%);
            color: #4A4A4A;
            line-height: 1.6;
        }
        
        .email-container {
            max-width: 650px;
            margin: 20px auto;
            background: linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%);
            border-radius: 32px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(139, 123, 107, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.8);
        }
        
        .header {
            background: linear-gradient(135deg, #E8B4A0 0%, #D4A5A5 50%, #C17767 100%);
            padding: 50px 40px;
            text-align: center;
            position: relative;
            border-radius: 32px 32px 0 0;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, rgba(255,255,255,0.08) 0%, transparent 50%);
            border-radius: 32px 32px 0 0;
        }
        
        .logo-container {
            position: relative;
            z-index: 2;
        }
        
        .logo {
            width: 100px;
            height: 100px;
            margin: 0 auto 25px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 8px 32px rgba(139, 123, 107, 0.2);
            backdrop-filter: blur(10px);
        }
        
        .logo svg {
            width: 60px;
            height: 60px;
        }
        
        .header-title {
            font-family: 'Spirituality', 'Georgia', serif;
            color: #FFFFFF;
            font-size: 42px;
            font-weight: 700;
            margin: 0;
            text-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            letter-spacing: 1px;
        }
        
        .header-subtitle {
            color: rgba(255, 255, 255, 0.95);
            font-size: 18px;
            margin: 15px 0 0 0;
            font-weight: 500;
            letter-spacing: 0.5px;
        }
        
        .content {
            padding: 50px 40px;
            background: linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%);
        }
        
        .section {
            background: rgba(255, 255, 255, 0.8);
            padding: 35px;
            border-radius: 24px;
            margin-bottom: 30px;
            border: 1px solid rgba(232, 224, 213, 0.6);
            box-shadow: 0 8px 25px rgba(139, 123, 107, 0.08);
            backdrop-filter: blur(10px);
        }
        
        .section-title {
            font-family: 'Spirituality', 'Georgia', serif;
            color: #C17767;
            font-size: 32px;
            font-weight: 700;
            margin: 0 0 25px 0;
            text-align: center;
            letter-spacing: 0.5px;
        }
        
        .section-text {
            color: #6B5B4F;
            font-size: 17px;
            line-height: 1.7;
            margin: 0 0 20px 0;
            text-align: center;
        }
        
        .highlight-box {
            background: linear-gradient(135deg, #E8B4A0 0%, #D4A5A5 100%);
            color: #FFFFFF;
            padding: 35px;
            border-radius: 24px;
            text-align: center;
            margin: 35px 0;
            box-shadow: 0 12px 35px rgba(232, 180, 160, 0.25);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .highlight-title {
            font-family: 'Spirituality', 'Georgia', serif;
            font-size: 26px;
            font-weight: 700;
            margin: 0 0 15px 0;
            letter-spacing: 0.5px;
        }
        
        .highlight-subtitle {
            font-size: 16px;
            opacity: 0.95;
            margin: 0;
            font-weight: 500;
        }
        
        .feature-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 30px 0;
        }
        
        .feature-item {
            background: rgba(255, 255, 255, 0.9);
            padding: 25px;
            border-radius: 20px;
            text-align: center;
            border: 1px solid rgba(232, 224, 213, 0.5);
            box-shadow: 0 4px 15px rgba(139, 123, 107, 0.06);
        }
        
        .feature-icon {
            font-size: 32px;
            margin-bottom: 15px;
            display: block;
        }
        
        .feature-title {
            font-family: 'Spirituality', 'Georgia', serif;
            color: #7B6B5C;
            font-size: 20px;
            font-weight: 700;
            margin: 0 0 10px 0;
        }
        
        .feature-text {
            color: #8B7B6B;
            font-size: 14px;
            line-height: 1.5;
            margin: 0;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #C17767 0%, #7B6B5C 100%);
            color: white;
            padding: 18px 36px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 8px 25px rgba(193, 119, 103, 0.3);
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(193, 119, 103, 0.4);
        }
        
        .footer {
            background: linear-gradient(135deg, #F5F5F5 0%, #E8E0D5 100%);
            padding: 40px;
            text-align: center;
            border-top: 1px solid rgba(232, 224, 213, 0.6);
            border-radius: 0 0 32px 32px;
        }
        
        .footer-text {
            color: #8B7B6B;
            font-size: 15px;
            margin: 0 0 12px 0;
            font-weight: 500;
        }
        
        .footer-signature {
            color: #C17767;
            font-weight: 600;
            font-family: 'Spirituality', 'Georgia', serif;
        }
        
        .social-links {
            margin: 25px 0;
        }
        
        .social-link {
            display: inline-block;
            margin: 0 10px;
            padding: 12px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            text-decoration: none;
            color: #7B6B5C;
            font-size: 18px;
            transition: all 0.3s ease;
        }
        
        .social-link:hover {
            background: #C17767;
            color: white;
            transform: translateY(-2px);
        }
        
        .spacer {
            height: 25px;
        }
        
        @media (max-width: 650px) {
            .email-container {
                margin: 10px;
                border-radius: 24px;
            }
            .header, .content, .footer {
                padding: 30px 25px;
            }
            .header-title {
                font-size: 36px;
            }
            .feature-grid {
                grid-template-columns: 1fr;
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
                <h1 class="header-title">Circle</h1>
                <p class="header-subtitle">Meaningful Connections</p>
            </div>
        </div>
        
        <div class="content">
            ${content}
        </div>
        
        <div class="footer">
            <p class="footer-text">This is an automated message from Circle</p>
            <p class="footer-text">You can manage your preferences in the app settings</p>
            <div class="social-links">
                <a href="#" class="social-link">🌟</a>
                <a href="#" class="social-link">💫</a>
                <a href="#" class="social-link">✨</a>
                <a href="#" class="social-link">⭐</a>
            </div>
            <div class="spacer"></div>
            <p class="footer-text">With gratitude and light,<br><span class="footer-signature">The FullCircle Team</span></p>
        </div>
    </div>
</body>
</html>
`;

// 1. Welcome Email Template
export const getWelcomeEmail = (data: EmailTemplateData): string => {
  const { firstName = 'there' } = data;
  
  const content = `
    <div class="section">
        <h2 class="section-title">🌟 Welcome to the Circle, ${firstName}! 🌟</h2>
        <p class="section-text">
            We're so excited to have you join our community of mindful people. 
            You're about to embark on a beautiful journey of authentic connections and personal growth.
        </p>
        <p class="section-text">
            Circle is more than just an app – it's a space where like-minded people 
            can find each other and create meaningful relationships that enrich their lives.
        </p>
    </div>
    
    <div class="highlight-box">
        <h3 class="highlight-title">✨ Your Journey Begins ✨</h3>
        <p class="highlight-subtitle">Connect with people who share your interests and values</p>
    </div>
    
    <div class="feature-grid">
        <div class="feature-item">
            <span class="feature-icon">🌟</span>
            <h4 class="feature-title">Mindful Matching</h4>
            <p class="feature-text">Find connections based on shared interests and values</p>
        </div>
        <div class="feature-item">
            <span class="feature-icon">💫</span>
            <h4 class="feature-title">Community Spaces</h4>
            <p class="feature-text">Join circles and groups that matter to you</p>
        </div>
        <div class="feature-item">
            <span class="feature-icon">🌿</span>
            <h4 class="feature-title">Natural Growth</h4>
            <p class="feature-text">Nurture relationships that evolve organically</p>
        </div>
        <div class="feature-item">
            <span class="feature-icon">⭐</span>
            <h4 class="feature-title">Authentic Connections</h4>
            <p class="feature-text">Connect with genuine people</p>
        </div>
    </div>
    
    <div style="text-align: center; margin: 35px 0;">
        <a href="#" class="cta-button">Begin Your Journey</a>
    </div>
  `;
  
  return getBaseEmailTemplate(content);
};

// 2. Waitlist Confirmation Email Template
export const getWaitlistConfirmationEmail = (data: EmailTemplateData): string => {
  const { firstName = 'there' } = data;
  
  const content = `
    <div class="section">
        <h2 class="section-title">🌟 You're on the List! 🌟</h2>
        <p class="section-text">
            Thank you for joining our waitlist, ${firstName}! You're now part of a 
            community of people who are ready to experience 
            authentic connections.
        </p>
        <p class="section-text">
            We'll notify you as soon as the Circle app launches with your early access. 
            Get ready to step into a world of meaningful relationships!
        </p>
    </div>
    
    <div class="highlight-box">
        <h3 class="highlight-title">🎁 Special Perks Await</h3>
        <p class="highlight-subtitle">First 5,000 members get 1 month completely free + special bonuses</p>
    </div>
    
    <div class="section">
        <h3 style="color: #7B6B5C; font-size: 22px; margin: 0 0 20px 0; text-align: center; font-family: 'Spirituality', 'Georgia', serif;">What to expect next:</h3>
        <div style="background: rgba(255, 255, 255, 0.7); padding: 30px; border-radius: 20px; border: 1px solid rgba(232, 224, 213, 0.5);">
            <ul style="color: #6B5B4F; font-size: 16px; line-height: 1.8; margin: 0; padding-left: 25px; text-align: left;">
                <li style="margin-bottom: 12px;">🌟 Early access notification when we launch</li>
                <li style="margin-bottom: 12px;">💫 Community updates and insights</li>
                <li style="margin-bottom: 12px;">✨ Special offers and bonuses for waitlist members</li>
                <li style="margin-bottom: 12px;">⭐ Behind-the-scenes content and wisdom</li>
                <li style="margin-bottom: 0;">🌟 Guided practices and activities</li>
            </ul>
        </div>
    </div>
  `;
  
  return getBaseEmailTemplate(content);
};

// 3. App Launch Notification Email Template
export const getAppLaunchEmail = (data: EmailTemplateData): string => {
  const { firstName = 'there' } = data;
  
  const content = `
    <div class="section">
        <h2 class="section-title">🚀 The Circle is Now Open! 🚀</h2>
        <p class="section-text">
            ${firstName}, the moment you've been waiting for is here! Circle is now live 
            and ready to help you find your community.
        </p>
        <p class="section-text">
            Download the app now and start connecting with people who share your interests. 
            Your first month is completely free as a special thank you for being on our waitlist!
        </p>
    </div>
    
    <div class="highlight-box">
        <h3 class="highlight-title">🎉 Download Circle Today</h3>
        <p class="highlight-subtitle">Join thousands of people already connecting</p>
    </div>
    
    <div style="text-align: center; margin: 35px 0;">
        <a href="#" class="cta-button">Download for iOS</a>
        <div style="margin: 15px;"></div>
        <a href="#" class="cta-button">Download for Android</a>
    </div>
    
    <div class="section">
        <h3 style="color: #7B6B5C; font-size: 22px; margin: 0 0 20px 0; text-align: center; font-family: 'Spirituality', 'Georgia', serif;">What happens next:</h3>
        <div class="feature-grid">
            <div class="feature-item">
                <span class="feature-icon">📱</span>
                <h4 class="feature-title">Create Profile</h4>
                <p class="feature-text">Share your journey and interests</p>
            </div>
            <div class="feature-item">
                <span class="feature-icon">🔍</span>
                <h4 class="feature-title">Find Matches</h4>
                <p class="feature-text">Discover people aligned with your interests</p>
            </div>
            <div class="feature-item">
                <span class="feature-icon">💬</span>
                <h4 class="feature-title">Start Connecting</h4>
                <p class="feature-text">Begin meaningful conversations</p>
            </div>
            <div class="feature-item">
                <span class="feature-icon">🌱</span>
                <h4 class="feature-title">Grow Together</h4>
                <p class="feature-text">Nurture meaningful friendships</p>
            </div>
        </div>
    </div>
  `;
  
  return getBaseEmailTemplate(content);
};

// 4. Weekly Inspiration Email Template
export const getWeeklyInspirationEmail = (data: EmailTemplateData): string => {
  const { firstName = 'there' } = data;
  
  const content = `
    <div class="section">
        <h2 class="section-title">🌟 Weekly Inspiration 🌟</h2>
        <p class="section-text">
            ${firstName}, here's your weekly dose of inspiration to help you grow 
            and find balance in your life.
        </p>
    </div>
    
    <div class="highlight-box">
        <h3 class="highlight-title">💫 This Week's Theme: Inner Peace</h3>
        <p class="highlight-subtitle">Finding stillness in the midst of chaos</p>
    </div>
    
    <div class="section">
        <h3 style="color: #7B6B5C; font-size: 22px; margin: 0 0 20px 0; text-align: center; font-family: 'Spirituality', 'Georgia', serif;">Daily Practices for Inner Peace:</h3>
        <div style="background: rgba(255, 255, 255, 0.7); padding: 30px; border-radius: 20px; border: 1px solid rgba(232, 224, 213, 0.5);">
            <div style="margin-bottom: 20px; padding: 20px; background: rgba(232, 180, 160, 0.1); border-radius: 16px;">
                <h4 style="color: #C17767; font-size: 18px; margin: 0 0 10px 0; font-family: 'Spirituality', 'Georgia', serif;">🌅 Morning: 5-Minute Breathing</h4>
                <p style="color: #6B5B4F; font-size: 15px; margin: 0; line-height: 1.6;">Start your day with conscious breathing to center yourself</p>
            </div>
            <div style="margin-bottom: 20px; padding: 20px; background: rgba(232, 180, 160, 0.1); border-radius: 16px;">
                <h4 style="color: #C17767; font-size: 18px; margin: 0 0 10px 0; font-family: 'Spirituality', 'Georgia', serif;">✨ Afternoon: Nature Connection</h4>
                <p style="color: #6B5B4F; font-size: 15px; margin: 0; line-height: 1.6;">Take a mindful walk and connect with the natural world</p>
            </div>
            <div style="padding: 20px; background: rgba(232, 180, 160, 0.1); border-radius: 16px;">
                <h4 style="color: #C17767; font-size: 18px; margin: 0 0 10px 0; font-family: 'Spirituality', 'Georgia', serif;">⭐ Evening: Gratitude Reflection</h4>
                <p style="color: #6B5B4F; font-size: 15px; margin: 0; line-height: 1.6;">End your day by reflecting on three things you're grateful for</p>
            </div>
        </div>
    </div>
    
    <div style="text-align: center; margin: 35px 0;">
        <a href="#" class="cta-button">Join Our Community Circle</a>
    </div>
  `;
  
  return getBaseEmailTemplate(content);
};

// 5. New Match Notification Email Template
export const getNewMatchEmail = (data: EmailTemplateData): string => {
  const { firstName = 'there', matchName = 'someone special' } = data;
  
  const content = `
    <div class="section">
        <h2 class="section-title">💫 New Soul Connection! 💫</h2>
        <p class="section-text">
            ${firstName}, the universe has brought you together with ${matchName}! 
            This could be the beginning of a beautiful spiritual friendship.
        </p>
        <p class="section-text">
            Take a moment to reach out and start a conversation. Sometimes the most 
            meaningful connections begin with a simple "hello" from the heart.
        </p>
    </div>
    
    <div class="highlight-box">
        <h3 class="highlight-title">✨ ${matchName} is waiting to connect ✨</h3>
        <p class="highlight-subtitle">Send them a message and start your spiritual journey together</p>
    </div>
    
    <div style="text-align: center; margin: 35px 0;">
        <a href="#" class="cta-button">Send Message</a>
    </div>
    
    <div class="section">
        <h3 style="color: #7B6B5C; font-size: 22px; margin: 0 0 20px 0; text-align: center; font-family: 'Spirituality', 'Georgia', serif;">Conversation Starters:</h3>
        <div style="background: rgba(255, 255, 255, 0.7); padding: 30px; border-radius: 20px; border: 1px solid rgba(232, 224, 213, 0.5);">
            <ul style="color: #6B5B4F; font-size: 16px; line-height: 1.8; margin: 0; padding-left: 25px; text-align: left;">
                <li style="margin-bottom: 12px;">🌙 What spiritual practices bring you peace?</li>
                <li style="margin-bottom: 12px;">🧘 How do you like to start your mornings?</li>
                <li style="margin-bottom: 12px;">💫 What's your favorite way to connect with nature?</li>
                <li style="margin-bottom: 0;">✨ What spiritual books or teachings inspire you?</li>
            </ul>
        </div>
    </div>
  `;
  
  return getBaseEmailTemplate(content);
};

// 6. Contact Form Notification Email Template
export const getContactFormEmail = (data: EmailTemplateData): string => {
  const { name, email, subject, message, timestamp } = data;
  
  const content = `
    <div class="section">
        <h2 class="section-title">📧 New Contact Form Submission</h2>
        <p class="section-text">Someone has reached out through your website contact form.</p>
    </div>
    
    <div class="section">
        <h3 style="color: #7B6B5C; font-size: 22px; margin: 0 0 20px 0; text-align: center; font-family: 'Spirituality', 'Georgia', serif;">Contact Details:</h3>
        <div style="background: rgba(255, 255, 255, 0.7); padding: 30px; border-radius: 20px; border: 1px solid rgba(232, 224, 213, 0.5);">
            <div style="margin-bottom: 20px; padding: 20px; background: rgba(232, 180, 160, 0.1); border-radius: 16px;">
                <strong style="color: #6B5B4F; font-size: 16px;">Name:</strong> 
                <span style="color: #8B7B6B; font-size: 16px;">${name || 'Not provided'}</span>
            </div>
            <div style="margin-bottom: 20px; padding: 20px; background: rgba(232, 180, 160, 0.1); border-radius: 16px;">
                <strong style="color: #6B5B4F; font-size: 16px;">Email:</strong> 
                <span style="color: #8B7B6B; font-size: 16px;">${email || 'Not provided'}</span>
            </div>
            <div style="margin-bottom: 20px; padding: 20px; background: rgba(232, 180, 160, 0.1); border-radius: 16px;">
                <strong style="color: #6B5B4F; font-size: 16px;">Subject:</strong> 
                <span style="color: #8B7B6B; font-size: 16px;">${subject || 'Not provided'}</span>
            </div>
            <div style="margin-bottom: 20px; padding: 20px; background: rgba(232, 180, 160, 0.1); border-radius: 16px;">
                <strong style="color: #6B5B4F; font-size: 16px;">Message:</strong>
            </div>
            <div style="background: rgba(255, 255, 255, 0.9); padding: 25px; border-radius: 16px; border: 1px solid rgba(232, 224, 213, 0.5);">
                <p style="color: #6B5B4F; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message || 'No message provided'}</p>
            </div>
            <div style="margin-top: 20px; font-size: 14px; color: #8B7B6B; text-align: center;">
                <strong>Timestamp:</strong> ${timestamp || new Date().toLocaleString()}
            </div>
        </div>
    </div>
  `;
  
  return getBaseEmailTemplate(content);
};

// 7. Admin Notification Email Template
export const getAdminNotificationEmail = (data: EmailTemplateData): string => {
  const { title, body, actionUrl, actionText } = data;
  
  const content = `
    <div class="section">
        <h2 class="section-title">🔔 ${title}</h2>
        <p class="section-text">${body}</p>
    </div>
    
    ${actionUrl ? `
    <div style="text-align: center; margin: 35px 0;">
        <a href="${actionUrl}" class="cta-button">
            ${actionText || 'Learn More'}
        </a>
    </div>
    ` : ''}
  `;
  
  return getBaseEmailTemplate(content);
};

// 8. Community Event Invitation Email Template
export const getCommunityEventEmail = (data: EmailTemplateData): string => {
  const { firstName = 'there', eventName = 'our next gathering', eventDate = 'this weekend' } = data;
  
  const content = `
    <div class="section">
        <h2 class="section-title">🌿 Join Our Sacred Circle 🌿</h2>
        <p class="section-text">
            ${firstName}, you're invited to ${eventName}! This is a special opportunity 
            to connect with fellow spiritual seekers in our community.
        </p>
        <p class="section-text">
            Whether you're new to spiritual practices or have been on this path for years, 
            everyone is welcome to join us in creating meaningful connections.
        </p>
    </div>
    
    <div class="highlight-box">
        <h3 class="highlight-title">📅 ${eventName}</h3>
        <p class="highlight-subtitle">${eventDate} - A time for connection, growth, and spiritual exploration</p>
    </div>
    
    <div class="section">
        <h3 style="color: #7B6B5C; font-size: 22px; margin: 0 0 20px 0; text-align: center; font-family: 'Spirituality', 'Georgia', serif;">What to expect:</h3>
        <div class="feature-grid">
            <div class="feature-item">
                <span class="feature-icon">🧘‍♀️</span>
                <h4 class="feature-title">Guided Meditation</h4>
                <p class="feature-text">Begin with a calming group meditation</p>
            </div>
            <div class="feature-item">
                <span class="feature-icon">💬</span>
                <h4 class="feature-title">Open Sharing</h4>
                <p class="feature-text">Share your spiritual journey with others</p>
            </div>
            <div class="feature-item">
                <span class="feature-icon">🌱</span>
                <h4 class="feature-title">Growth Discussion</h4>
                <p class="feature-text">Learn from each other's experiences</p>
            </div>
            <div class="feature-item">
                <span class="feature-icon">✨</span>
                <h4 class="feature-title">Connection Time</h4>
                <p class="feature-text">Build meaningful relationships</p>
            </div>
        </div>
    </div>
    
    <div style="text-align: center; margin: 35px 0;">
        <a href="#" class="cta-button">RSVP Now</a>
    </div>
  `;
  
  return getBaseEmailTemplate(content);
};
