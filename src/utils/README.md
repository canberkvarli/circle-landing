# Email Templates System

This directory contains the email template system for fullcircle.

## 📧 Available Templates

### 1. **Waitlist Confirmation Email** (`getWaitlistConfirmationEmail`)
- **Purpose**: Sent when users join the waitlist
- **Data**: `{ firstName }`
- **Subject**: "Welcome to fullcircle™ Waitlist! 🌟"

### 2. **Contact Form Email** (`getContactFormEmail`)
- **Purpose**: Sent when someone submits the contact form
- **Data**: `{ name, email, subject, message, timestamp }`
- **Subject**: "Contact Form: [subject]"

### 3. **Admin Notification Email** (`getAdminNotificationEmail`)
- **Purpose**: System notifications and announcements
- **Data**: `{ title, body, actionUrl?, actionText? }`
- **Subject**: Dynamic based on notification

## 🎨 Design Features

- **Brand Colors**: Uses fullcircle's spiritual color palette
- **fullcircle Logo**: Embedded SVG logo in header
- **Responsive**: Mobile-friendly design
- **Consistent**: All emails use the same base template
- **Professional**: Clean, modern design with proper spacing

## 🚀 Usage

```typescript
import { getWaitlistConfirmationEmail, getContactFormEmail } from '@/utils/emailTemplates';

// Waitlist email
const waitlistHtml = getWaitlistConfirmationEmail({ firstName: 'John' });

// Contact form email
const contactHtml = getContactFormEmail({
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'General Inquiry',
  message: 'Hello, I have a question...',
  timestamp: new Date().toISOString()
});
```

## 🎯 Customization

### Colors
The templates use these brand colors:
- Primary: `#C17767` (Dusty rose)
- Secondary: `#7B6B5C` (Warm brown)
- Background: `#FAF8F5` (Light beige)
- Text: `#3D3B37` (Dark brown)

### Adding New Templates
1. Create a new function in `emailTemplates.ts`
2. Use the `getBaseEmailTemplate()` helper
3. Import and use in your component/API route

## 📱 Email Client Compatibility

- ✅ Gmail
- ✅ Outlook
- ✅ Apple Mail
- ✅ Mobile email apps
- ✅ Dark mode support (where available)

## 🔧 Technical Details

- **Base Template**: `getBaseEmailTemplate()` provides consistent styling
- **Inline CSS**: All styles are inline for maximum compatibility
- **SVG Logo**: Embedded directly in HTML for reliability
- **Responsive Design**: Uses media queries for mobile optimization
