import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('🔒 Middleware called for:', request.nextUrl.pathname);
  
  // Check if this is an admin API route
  if (request.nextUrl.pathname.startsWith('/api/admin/')) {
    console.log('🛡️ Admin route detected, checking authentication...');
    
    // Skip authentication for the auth and logout routes
    if (request.nextUrl.pathname === '/api/admin/auth' || 
        request.nextUrl.pathname === '/api/admin/logout' ||
        request.nextUrl.pathname === '/api/admin/test-password') {
      console.log('✅ Auth/logout/test route, skipping authentication');
      return NextResponse.next();
    }

    // Check for admin session cookie
    const adminSession = request.cookies.get('admin-session');
    console.log('🍪 Admin session cookie:', adminSession ? adminSession.value : 'not found');
    
    // If no valid session, return 401 Unauthorized
    if (!adminSession || adminSession.value !== 'authenticated') {
      console.log('❌ Authentication failed, returning 401');
      return NextResponse.json(
        { success: false, message: 'Unauthorized access' },
        { status: 401 }
      );
    }
    
    console.log('✅ Authentication successful, proceeding...');
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/admin/:path*',
};
