#!/bin/bash

echo "🚀 Starting deployment for joinfullcircle.app..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run linting
echo "🔍 Running linting..."
npm run lint

# Build the project
echo "🏗️ Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Check if Vercel CLI is installed
    if command -v vercel &> /dev/null; then
        echo "🚀 Deploying to Vercel..."
        vercel --prod
    else
        echo "📋 Vercel CLI not found. Here are your deployment options:"
        echo ""
        echo "1. Install Vercel CLI: npm i -g vercel"
        echo "2. Deploy: vercel --prod"
        echo "3. Add domain: vercel domains add joinfullcircle.app"
        echo ""
        echo "Or deploy manually:"
        echo "npm run start"
    fi
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
