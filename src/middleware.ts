import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('🔒 Middleware called for:', request.nextUrl.pathname);
  
  // Create the response object first so we can modify headers
  const response = NextResponse.next();
  
  // Add cache control headers to ALL routes to prevent browser caching
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  response.headers.set('Surrogate-Control', 'no-store');
  
  // Check if this is an admin API route
  if (request.nextUrl.pathname.startsWith('/api/admin/')) {
    console.log('🛡️ Admin route detected, checking authentication...');
    
    // Skip authentication for the auth and logout routes
    if (request.nextUrl.pathname === '/api/admin/auth' || 
        request.nextUrl.pathname === '/api/admin/logout') {
      console.log('✅ Auth/logout route, skipping authentication');
      return response;
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

  return response;
}

// Update the matcher to include ALL routes except static assets
export const config = {
  matcher: [
    '/api/admin/:path*',
    '/((?!_next/static|_next/image|favicon.ico|assets).*)'
  ],
};