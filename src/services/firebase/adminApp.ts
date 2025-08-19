import { getApps, initializeApp, cert, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let adminApp: App | undefined;

function getPrivateKey(): string | undefined {
  const key = process.env.FIREBASE_PRIVATE_KEY;
  console.log('🔑 Firebase private key check:', key ? 'Present' : 'Missing');
  if (!key) return undefined;
  // Handle escaped newlines in env
  return key.replace(/\\n/g, '\n');
}

export function getAdminApp(): App {
  console.log('🚀 getAdminApp called');
  
  if (adminApp) {
    console.log('✅ Using existing admin app');
    return adminApp;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = getPrivateKey();

  console.log('🔍 Firebase credentials check:');
  console.log('  - Project ID:', projectId ? 'Present' : 'Missing');
  console.log('  - Client Email:', clientEmail ? 'Present' : 'Missing');
  console.log('  - Private Key:', privateKey ? 'Present' : 'Missing');

  if (!projectId || !clientEmail || !privateKey) {
    const error = 'Missing Firebase Admin credentials. Ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set.';
    console.error('❌', error);
    throw new Error(error);
  }

  try {
    const apps = getApps();
    console.log('📱 Existing apps:', apps.length);
    
    if (!apps.length) {
      console.log('🆕 Initializing new Firebase admin app...');
      adminApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        projectId,
      });
      console.log('✅ Firebase admin app initialized successfully');
    } else {
      console.log('🔄 Using existing app');
      adminApp = apps[0];
    }
    
    return adminApp!;
  } catch (error) {
    console.error('❌ Error initializing Firebase admin app:', error);
    throw error;
  }
}

export function getAdminDb() {
  console.log('🗄️ getAdminDb called');
  try {
    const app = getAdminApp();
    const db = getFirestore(app);
    console.log('✅ Firestore database connection successful');
    return db;
  } catch (error) {
    console.error('❌ Error getting Firestore database:', error);
    throw error;
  }
}


