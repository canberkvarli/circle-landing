# Circle Landing Page

A modern, responsive landing page for the Full Circle app built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Deployment

### Domain: joinfullcircle.app

This app is configured for deployment with the domain `joinfullcircle.app`.

### Quick Deploy Options

#### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Add custom domain
vercel domains add joinfullcircle.app
```

#### 2. Netlify
```bash
# Build the project
npm run build

# Deploy to Netlify
# Connect your GitHub repo and set build command: npm run build
# Set publish directory: .next
```

#### 3. Manual Deployment
```bash
# Build for production
npm run build

# Start production server
npm run start
```

### DNS Configuration
Point your domain to your hosting provider:
- **A Record**: Point to your hosting IP
- **CNAME**: www → joinfullcircle.app
- **CNAME**: @ → joinfullcircle.app

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## 📱 Features

- Responsive design
- Smooth animations with Framer Motion
- Contact form integration with Resend
- SEO optimized
- Performance optimized

## 🌐 Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Email Service**: Resend
- **Deployment**: Vercel/Netlify ready
