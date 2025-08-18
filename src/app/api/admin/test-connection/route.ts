import { NextResponse } from 'next/server';
import { getAdminDb } from '@/services/firebase/adminApp';

export async function GET() {
  try {
    console.log('🔌 Testing Firebase Admin SDK connection...');
    
    // Test 1: Initialize Admin SDK
    const adminDb = getAdminDb();
    console.log('✅ Firebase Admin SDK initialized');
    
    // Test 2: Get collection reference
    const usersCollection = adminDb.collection('users');
    console.log('✅ Users collection reference obtained');
    
    // Test 3: Simple count query
    const countSnapshot = await usersCollection.count().get();
    const userCount = countSnapshot.data().count;
    console.log(`✅ Basic query successful - found ${userCount} users`);
    
    return NextResponse.json({
      success: true,
      message: 'Firebase Admin SDK connection successful',
      userCount,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Firebase connection test failed:', error);
    
    // Check if it's an environment variable issue
    const missingVars = [];
    if (!process.env.FIREBASE_PROJECT_ID) missingVars.push('FIREBASE_PROJECT_ID');
    if (!process.env.FIREBASE_CLIENT_EMAIL) missingVars.push('FIREBASE_CLIENT_EMAIL');
    if (!process.env.FIREBASE_PRIVATE_KEY) missingVars.push('FIREBASE_PRIVATE_KEY');
    
    return NextResponse.json({
      success: false,
      message: 'Firebase Admin SDK connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      missingEnvironmentVariables: missingVars,
      suggestion: missingVars.length > 0 
        ? `Missing environment variables: ${missingVars.join(', ')}`
        : 'Check Firebase credentials and network connectivity'
    }, { status: 500 });
  }
}
