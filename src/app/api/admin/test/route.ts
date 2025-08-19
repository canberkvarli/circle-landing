import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('🧪 Test route called - basic functionality test');
    
    // Test basic response
    return NextResponse.json({ 
      success: true, 
      message: 'Test route working',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Test route error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Test route failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
