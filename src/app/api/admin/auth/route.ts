import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory store to prevent multiple login attempts
const activeSessions = new Map<string, { timestamp: number; ip: string }>();

// Cleanup old sessions every 5 minutes
setInterval(() => {
  const now = Date.now();
  const fiveMinutesAgo = now - (5 * 60 * 1000);
  
  for (const [sessionId, data] of activeSessions.entries()) {
    if (data.timestamp < fiveMinutesAgo) {
      activeSessions.delete(sessionId);
    }
  }
}, 5 * 60 * 1000);

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    // Get admin password from environment variable
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD environment variable not set');
      return NextResponse.json(
        { success: false, message: 'Admin authentication not configured' },
        { status: 500 }
      );
    }
    
    // Check if password matches
    if (password === adminPassword) {
      // Check if this IP already has an active session
      const existingSession = Array.from(activeSessions.values()).find(session => session.ip === clientIP);
      
      if (existingSession) {
        const timeSinceLastLogin = Date.now() - existingSession.timestamp;
        const minutesAgo = Math.floor(timeSinceLastLogin / (60 * 1000));
        
        if (timeSinceLastLogin < 5 * 60 * 1000) { // Less than 5 minutes
          return NextResponse.json(
            { 
              success: false, 
              message: `You already have an active session. Please wait ${5 - minutesAgo} more minutes before logging in again.`,
              alreadyLoggedIn: true,
              waitTime: 5 - minutesAgo
            },
            { status: 429 }
          );
        }
      }
      
      // Create new session
      const sessionId = `admin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      activeSessions.set(sessionId, { timestamp: Date.now(), ip: clientIP });
      
      // Create response with success
      const response = NextResponse.json({ 
        success: true, 
        message: 'Authentication successful',
        loginTime: new Date().toISOString()
      });
      
      // Set admin session cookie (expires in 24 hours)
      response.cookies.set('admin-session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60, // 24 hours
        path: '/'
      });
      
      console.log(`✅ Admin login successful from IP: ${clientIP}`);
      return response;
    } else {
      console.log(`❌ Admin login failed from IP: ${clientIP}`);
      return NextResponse.json(
        { success: false, message: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Admin authentication error:', error);
    return NextResponse.json(
      { success: false, message: 'Authentication failed' },
      { status: 500 }
    );
  }
}
