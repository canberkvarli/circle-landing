import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // Get admin password from environment variable
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword) {
      return NextResponse.json(
        { success: false, message: 'ADMIN_PASSWORD not set in environment' },
        { status: 500 }
      );
    }
    
    // Simple password check
    const isCorrect = password === adminPassword;
    
    return NextResponse.json({
      success: true,
      passwordCheck: {
        isCorrect,
        attemptedLength: password?.length || 0,
        expectedLength: adminPassword.length,
        environmentLoaded: !!adminPassword,
        firstChar: adminPassword[0],
        lastChar: adminPassword[adminPassword.length - 1]
      }
    });
  } catch (error) {
    console.error('Password test error:', error);
    return NextResponse.json(
      { success: false, message: 'Password test failed' },
      { status: 500 }
    );
  }
}
