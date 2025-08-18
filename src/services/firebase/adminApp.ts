import { getApps, initializeApp, cert, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

let adminApp: App | undefined;

function getPrivateKey(): string | undefined {
  const key = process.env.FIREBASE_PRIVATE_KEY;
  console.log('Debug - FIREBASE_PRIVATE_KEY length:', key?.length);
  console.log('Debug - FIREBASE_PRIVATE_KEY starts with:', key?.substring(0, 50));
  if (!key) return undefined;
  // Handle escaped newlines in env
  return key.replace(/\\n/g, '\n');
}

export function getAdminApp(): App {
  if (adminApp) return adminApp;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = getPrivateKey();

  console.log('Debug - Environment variables:');
  console.log('  FIREBASE_PROJECT_ID:', projectId);
  console.log('  FIREBASE_CLIENT_EMAIL:', clientEmail);
  console.log('  FIREBASE_PRIVATE_KEY length:', privateKey?.length);

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase Admin credentials. Ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY are set.');
  }

  const apps = getApps();
  if (!apps.length) {
    adminApp = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      projectId,
    });
  } else {
    adminApp = apps[0];
  }
  return adminApp!;
}

export function getAdminDb() {
  const app = getAdminApp();
  return getFirestore(app);
}


