// Email Templates for Circle
// Multiple beautiful email templates with consistent branding

// Email logo configuration for Resend inline images
export const EMAIL_LOGO_CONFIG = {
  contentId: 'email-logo',
  filename: 'lightOuroboros.png',
  path: '/lightOuroboros.png' // PNG file - will make transparent
};

export interface EmailTemplateData {
  firstName?: string;
  lastName?: string;
  email?: string;
  [key: string]: string | number | boolean | null | undefined;
}

// Base email template with common styling - dark theme with spiritual colors
const getBaseEmailTemplate = (content: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Circle</title>
    <style>
        @font-face {
            font-family: 'Spirituality', 'Georgia', serif;
            src: local('Georgia'), local('serif');
            font-weight: normal;
            font-style: normal;
        }
        
        body {
            margin: 0;
            padding: 0;
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            background: linear-gradient(135deg, #1A1815 0%, #252320 100%);
            color: #F5E6D3;
            line-height: 1.6;
        }
        
        .email-container {
            max-width: 650px;
            margin: 20px auto;
            background: linear-gradient(180deg, #252320 0%, #1A1815 100%);
            border-radius: 32px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(196, 169, 132, 0.2);
        }
        
        .header {
            background: linear-gradient(135deg, #3D3B37 0%, #2D2B27 50%, #1A1815 100%);
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
            background: radial-gradient(circle at 30% 20%, rgba(196, 169, 132, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, rgba(196, 169, 132, 0.08) 0%, transparent 50%);
            border-radius: 32px 32px 0 0;
        }
        
        .logo-container {
            position: relative;
            z-index: 2;
        }
        
        .logo {
            width: 100%;
            max-width: 200px;
            height: auto;
            margin: 0 auto 25px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .logo img {
            width: 100%;
            max-width: 200px;
            height: auto;
            display: block;
            border-radius: 16px;
            object-fit: contain;
        }
        
        .header-title {
            font-family: 'Spirituality', 'Georgia', serif;
            color: #F5E6D3;
            font-size: 42px;
            font-weight: 700;
            margin: 0;
            text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            letter-spacing: 1px;
        }
        
        .header-subtitle {
            color: rgba(245, 230, 211, 0.9);
            font-size: 18px;
            margin: 15px 0 0 0;
            font-weight: 500;
            letter-spacing: 0.5px;
        }
        
        .content {
            padding: 50px 40px;
            background: linear-gradient(180deg, #252320 0%, #1A1815 100%);
        }
        
        .section {
            background: rgba(37, 35, 32, 0.8);
            padding: 20px;
            border-radius: 24px;
            margin-bottom: 20px;
            border: 1px solid rgba(196, 169, 132, 0.2);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
        }
        
        .section-title {
            font-family: 'Spirituality', 'Georgia', serif;
            color: #C4A984;
            font-size: 32px;
            font-weight: 700;
            margin: 0 0 15px 0;
            text-align: center;
            letter-spacing: 0.5px;
        }
        
        .section-text {
            color: #F5E6D3;
            font-size: 17px;
            line-height: 1.7;
            margin: 0 0 15px 0;
            text-align: center;
        }
        
        .highlight-box {
            background: linear-gradient(135deg, #3D3B37 0%, #2D2B27 100%);
            color: #F5E6D3;
            padding: 20px;
            border-radius: 24px;
            text-align: center;
            margin: 20px 0;
            box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(196, 169, 132, 0.3);
        }
        
        .highlight-title {
            font-family: 'Spirituality', 'Georgia', serif;
            font-size: 26px;
            font-weight: 700;
            margin: 0 0 10px 0;
            letter-spacing: 0.5px;
        }
        
        .highlight-subtitle {
            font-size: 16px;
            opacity: 0.9;
            margin: 0;
            font-weight: 500;
        }
        
        .feature-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin: 20px 0;
        }
        
        .feature-item {
            background: rgba(37, 35, 32, 0.9);
            padding: 20px;
            border-radius: 20px;
            text-align: center;
            border: 1px solid rgba(196, 169, 132, 0.2);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        
        .feature-icon {
            font-size: 32px;
            margin-bottom: 10px;
            display: block;
        }
        
        .feature-title {
            font-family: 'Spirituality', 'Georgia', serif;
            color: #C4A984;
            font-size: 20px;
            font-weight: 700;
            margin: 0 0 8px 0;
        }
        
        .feature-text {
            color: #F5E6D3;
            font-size: 14px;
            line-height: 1.5;
            margin: 0;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #C4A984 0%, #7B6B5C 100%);
            color: #1A1815;
            padding: 18px 36px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 8px 25px rgba(196, 169, 132, 0.3);
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 35px rgba(196, 169, 132, 0.4);
        }
        
        .footer {
            background: linear-gradient(135deg, #1A1815 0%, #252320 100%);
            padding: 40px;
            text-align: center;
            border-top: 1px solid rgba(196, 169, 132, 0.2);
            border-radius: 0 0 32px 32px;
        }
        
        .footer-text {
            color: #C4A984;
            font-size: 15px;
            margin: 0 0 12px 0;
            font-weight: 500;
        }
        
        .footer-signature {
            color: #C4A984;
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
            background: rgba(37, 35, 32, 0.8);
            border-radius: 50%;
            color: #C4A984;
            font-size: 18px;
            border: 1px solid rgba(196, 169, 132, 0.2);
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
            .logo img {
                max-width: 150px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="logo-container">
                <div class="logo">
                    <img src="cid:${EMAIL_LOGO_CONFIG.contentId}" 
                         alt="Circle Logo" 
                         width="200" 
                         height="200" 
                         style="width: 100%; max-width: 200px; height: auto; display: block; border-radius: 16px;" />
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
                <span class="social-link">🌿</span>
                <span class="social-link">🧘</span>
                <span class="social-link">💫</span>
                <span class="social-link">✨</span>
            </div>
            <div class="spacer"></div>
            <p class="footer-text">With gratitude and light,<br><span class="footer-signature">The Circle Team</span></p>
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
            We're so excited to have you join our community of spiritual seekers and mindful souls. 
            You're about to embark on a beautiful journey of authentic connections and spiritual growth.
        </p>
        <p class="section-text">
            FullCircle is more than just an app – it's a sacred space where like-minded spirits 
            can find each other and create meaningful relationships that nourish the soul.
        </p>
    </div>
    
    <div class="highlight-box">
        <h3 class="highlight-title">✨ Your Spiritual Journey Begins ✨</h3>
        <p class="highlight-subtitle">Connect with souls who share your spiritual path</p>
    </div>
    
    <div class="feature-grid">
        <div class="feature-item">
            <span class="feature-icon">🧘‍♀️</span>
            <h4 class="feature-title">Mindful Matching</h4>
            <p class="feature-text">Find connections based on spiritual practices and beliefs</p>
        </div>
        <div class="feature-item">
            <span class="feature-icon">💫</span>
            <h4 class="feature-title">Sacred Spaces</h4>
            <p class="feature-text">Join spiritual circles and meditation groups</p>
        </div>
        <div class="feature-item">
            <span class="feature-icon">🌿</span>
            <h4 class="feature-title">Natural Growth</h4>
            <p class="feature-text">Nurture relationships that evolve organically</p>
        </div>
        <div class="feature-item">
            <span class="feature-icon">✨</span>
            <h4 class="feature-title">Authentic Souls</h4>
            <p class="feature-text">Connect with genuine spiritual seekers</p>
        </div>
    </div>
    
    <div style="text-align: center; margin: 20px 0;">
        <a href="https://joinfullcircle.app" class="cta-button">Begin Your Journey</a>
    </div>
  `;
  
  return getBaseEmailTemplate(content);
};

// 2. Waitlist Confirmation Email Template
export const getWaitlistConfirmationEmail = (data: EmailTemplateData): string => {
  const { firstName = 'there' } = data;
  
  const content = `
    <div class="section">
        <h2 class="section-title">🌿 You're on the Sacred List! 🌿</h2>
        <p class="section-text">
            Thank you for joining our exclusive waitlist, ${firstName}! You're now part of a 
            carefully curated community of spiritual seekers who are ready to experience 
            authentic soul-to-soul connections.
        </p>
        <p class="section-text">
            We'll notify you as soon as the FullCircle app launches with your exclusive early access.
            Get ready to step into a world of meaningful spiritual relationships!
        </p>
    </div>
    
    <div class="highlight-box">
        <h3 class="highlight-title">🎁 Exclusive Perks Await</h3>
        <p class="highlight-subtitle">First 5,000 members get 1 month completely free + special bonuses</p>
    </div>
    
    <div class="section">
        <h3 style="color: #C4A984; font-size: 22px; margin: 0 0 15px 0; text-align: center; font-family: 'Spirituality', 'Georgia', serif;">What to expect next:</h3>
        <div style="background: rgba(196, 169, 132, 0.1); padding: 20px; border-radius: 20px; border: 1px solid rgba(196, 169, 132, 0.3);">
            <ul style="color: #F5E6D3; font-size: 16px; line-height: 1.8; margin: 0; padding-left: 25px; text-align: left;">
                <li style="margin-bottom: 10px;">🌟 Early access notification when we launch</li>
                <li style="margin-bottom: 10px;">🧘 Exclusive community updates and spiritual insights</li>
                <li style="margin-bottom: 10px;">💫 Special offers and bonuses for waitlist members</li>
                <li style="margin-bottom: 10px;">✨ Behind-the-scenes content and spiritual wisdom</li>
                <li style="margin-bottom: 0;">🌿 Guided meditations and spiritual practices</li>
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
            ${firstName}, the moment you've been waiting for is here! FullCircle is now live 
            and ready to help you find your spiritual tribe.
        </p>
        <p class="section-text">
            Download the app now and start connecting with souls who share your spiritual journey. 
            Your first month is completely free as a special thank you for being on our waitlist!
        </p>
    </div>
    
    <div class="highlight-box">
        <h3 class="highlight-title">🎉 Download FullCircle Today</h3>
        <p class="highlight-subtitle">Join thousands of spiritual seekers already connecting</p>
    </div>
    
    <div style="text-align: center; margin: 35px 0;">
        <a href="https://joinfullcircle.app" class="cta-button">Download for iOS</a>
        <div style="margin: 15px;"></div>
        <a href="https://joinfullcircle.app" class="cta-button">Download for Android</a>
    </div>
    
    <div class="section">
        <h3 style="color: #7B6B5C; font-size: 22px; margin: 0 0 20px 0; text-align: center; font-family: 'Spirituality', 'Georgia', serif;">What happens next:</h3>
        <div class="feature-grid">
            <div class="feature-item">
                <span class="feature-icon">📱</span>
                <h4 class="feature-title">Create Profile</h4>
                <p class="feature-text">Share your spiritual journey and intentions</p>
            </div>
            <div class="feature-item">
                <span class="feature-icon">🔍</span>
                <h4 class="feature-title">Find Matches</h4>
                <p class="feature-text">Discover souls aligned with your path</p>
            </div>
            <div class="feature-item">
                <span class="feature-icon">💬</span>
                <h4 class="feature-title">Start Connecting</h4>
                <p class="feature-text">Begin meaningful conversations</p>
            </div>
            <div class="feature-item">
                <span class="feature-icon">🌱</span>
                <h4 class="feature-title">Grow Together</h4>
                <p class="feature-text">Nurture spiritual friendships</p>
            </div>
        </div>
    </div>
  `;
  
  return getBaseEmailTemplate(content);
};

// 4. Weekly Spiritual Inspiration Email Template
export const getWeeklyInspirationEmail = (data: EmailTemplateData): string => {
  const { firstName = 'there' } = data;
  
  const content = `
    <div class="section">
        <h2 class="section-title">🌿 Weekly Spiritual Wisdom 🌿</h2>
        <p class="section-text">
            ${firstName}, here's your weekly dose of spiritual inspiration to nourish your soul 
            and deepen your connection to the divine.
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
                <h4 style="color: #C17767; font-size: 18px; margin: 0 0 10px 0; font-family: 'Spirituality', 'Georgia', serif;">🌅 Morning: 5-Minute Breathwork</h4>
                <p style="color: #6B5B4F; font-size: 15px; margin: 0; line-height: 1.6;">Start your day with conscious breathing to center your energy</p>
            </div>
            <div style="margin-bottom: 20px; padding: 20px; background: rgba(232, 180, 160, 0.1); border-radius: 16px;">
                <h4 style="color: #C17767; font-size: 18px; margin: 0 0 10px 0; font-family: 'Spirituality', 'Georgia', serif;">🌿 Afternoon: Nature Connection</h4>
                <p style="color: #6B5B4F; font-size: 15px; margin: 0; line-height: 1.6;">Take a mindful walk and connect with the natural world</p>
            </div>
            <div style="padding: 20px; background: rgba(232, 180, 160, 0.1); border-radius: 16px;">
                <h4 style="color: #C17767; font-size: 18px; margin: 0 0 10px 0; font-family: 'Spirituality', 'Georgia', serif;">🌙 Evening: Gratitude Reflection</h4>
                <p style="color: #6B5B4F; font-size: 15px; margin: 0; line-height: 1.6;">End your day by reflecting on three things you're grateful for</p>
            </div>
        </div>
    </div>
    
    <div style="text-align: center; margin: 35px 0;">
        <a href="https://joinfullcircle.app" class="cta-button">Join Our Meditation Circle</a>
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
        <a href="https://joinfullcircle.app" class="cta-button">Send Message</a>
    </div>
    
    <div class="section">
        <h3 style="color: #7B6B5C; font-size: 22px; margin: 0 0 20px 0; text-align: center; font-family: 'Spirituality', 'Georgia', serif;">Conversation Starters:</h3>
        <div style="background: rgba(255, 255, 255, 0.7); padding: 30px; border-radius: 20px; border: 1px solid rgba(232, 224, 213, 0.5);">
            <ul style="color: #6B5B4F; font-size: 16px; line-height: 1.8; margin: 0; padding-left: 25px; text-align: left;">
                <li style="margin-bottom: 12px;">🌿 What spiritual practices bring you peace?</li>
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
        <h3 style="color: #C4A984; font-size: 22px; margin: 0 0 15px 0; text-align: center; font-family: 'Spirituality', 'Georgia', serif;">Contact Details:</h3>
        <div style="background: rgba(196, 169, 132, 0.1); padding: 20px; border-radius: 20px; border: 1px solid rgba(196, 169, 132, 0.3);">
            <div style="margin-bottom: 15px; padding: 15px; background: rgba(37, 35, 32, 0.8); border-radius: 16px;">
                <strong style="color: #C4A984; font-size: 16px;">Name:</strong> 
                <span style="color: #F5E6D3; font-size: 16px;">${name || 'Not provided'}</span>
        </div>
            <div style="margin-bottom: 15px; padding: 15px; background: rgba(37, 35, 32, 0.8); border-radius: 16px;">
                <strong style="color: #C4A984; font-size: 16px;">Email:</strong> 
                <span style="color: #F5E6D3; font-size: 16px;">${email || 'Not provided'}</span>
        </div>
            <div style="margin-bottom: 15px; padding: 15px; background: rgba(37, 35, 32, 0.8); border-radius: 16px;">
                <strong style="color: #C4A984; font-size: 16px;">Subject:</strong> 
                <span style="color: #F5E6D3; font-size: 16px;">${subject || 'Not provided'}</span>
        </div>
            <div style="margin-bottom: 15px; padding: 15px; background: rgba(37, 35, 32, 0.8); border-radius: 16px;">
                <strong style="color: #C4A984; font-size: 16px;">Message:</strong>
        </div>
            <div style="background: rgba(37, 35, 32, 0.9); padding: 20px; border-radius: 16px; border: 1px solid rgba(196, 169, 132, 0.3);">
                <p style="color: #F5E6D3; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message || 'No message provided'}</p>
        </div>
            <div style="margin-top: 15px; font-size: 14px; color: #C4A984; text-align: center;">
            <strong>Timestamp:</strong> ${timestamp || new Date().toLocaleString('en-US', { 
                timeZone: 'America/Los_Angeles',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
            })}
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
    <div style="text-align: center; margin: 20px 0;">
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
        <h3 style="color: #C4A984; font-size: 22px; margin: 0 0 15px 0; text-align: center; font-family: 'Spirituality', 'Georgia', serif;">What to expect:</h3>
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
        <a href="https://joinfullcircle.app" class="cta-button">RSVP Now</a>
    </div>
  `;
  
  return getBaseEmailTemplate(content);
};
