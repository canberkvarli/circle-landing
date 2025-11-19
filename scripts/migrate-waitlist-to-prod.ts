/**
 * Migration script to copy waitlist collection from dev Firestore to production Firestore
 * 
 * Usage:
 * 1. Set environment variables for both dev and production Firebase projects
 * 2. Run: npx tsx scripts/migrate-waitlist-to-prod.ts
 * 
 * Environment variables needed:
 * - DEV_FIREBASE_PROJECT_ID
 * - DEV_FIREBASE_CLIENT_EMAIL
 * - DEV_FIREBASE_PRIVATE_KEY
 * - PROD_FIREBASE_PROJECT_ID
 * - PROD_FIREBASE_CLIENT_EMAIL
 * - PROD_FIREBASE_PRIVATE_KEY
 */

import { initializeApp, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

interface WaitlistDocument {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  heardFrom?: string;
  additionalComments?: string;
  timestamp?: any;
  status?: string;
  inviteSent?: boolean;
  source?: string;
  [key: string]: any;
}

function getPrivateKey(key: string | undefined): string | undefined {
  if (!key) return undefined;
  return key.replace(/\\n/g, '\n');
}

function initializeFirebaseApp(
  projectId: string,
  clientEmail: string,
  privateKey: string,
  label: string
): App {
  console.log(`\n🔧 Initializing ${label} Firebase app...`);
  console.log(`   Project ID: ${projectId}`);
  
  try {
    return initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey: getPrivateKey(privateKey),
      }),
      projectId,
    }, label); // Use label as app name to allow multiple apps
  } catch (error) {
    console.error(`❌ Error initializing ${label} Firebase app:`, error);
    throw error;
  }
}

async function migrateWaitlist() {
  console.log('🚀 Starting waitlist migration from dev to production...\n');

  // Get environment variables
  const devProjectId = process.env.DEV_FIREBASE_PROJECT_ID;
  const devClientEmail = process.env.DEV_FIREBASE_CLIENT_EMAIL;
  const devPrivateKey = process.env.DEV_FIREBASE_PRIVATE_KEY;

  const prodProjectId = process.env.PROD_FIREBASE_PROJECT_ID;
  const prodClientEmail = process.env.PROD_FIREBASE_CLIENT_EMAIL;
  const prodPrivateKey = process.env.PROD_FIREBASE_PRIVATE_KEY;

  // Validate environment variables
  if (!devProjectId || !devClientEmail || !devPrivateKey) {
    console.error('❌ Missing dev Firebase credentials:');
    console.error('   Required: DEV_FIREBASE_PROJECT_ID, DEV_FIREBASE_CLIENT_EMAIL, DEV_FIREBASE_PRIVATE_KEY');
    process.exit(1);
  }

  if (!prodProjectId || !prodClientEmail || !prodPrivateKey) {
    console.error('❌ Missing production Firebase credentials:');
    console.error('   Required: PROD_FIREBASE_PROJECT_ID, PROD_FIREBASE_CLIENT_EMAIL, PROD_FIREBASE_PRIVATE_KEY');
    process.exit(1);
  }

  // Initialize Firebase apps
  const devApp = initializeFirebaseApp(devProjectId, devClientEmail, devPrivateKey, 'dev');
  const prodApp = initializeFirebaseApp(prodProjectId, prodClientEmail, prodPrivateKey, 'prod');

  const devDb = getFirestore(devApp);
  const prodDb = getFirestore(prodApp);

  try {
    // Read all documents from dev waitlist collection
    console.log('\n📖 Reading waitlist documents from dev Firestore...');
    const devSnapshot = await devDb.collection('waitlist').get();
    
    if (devSnapshot.empty) {
      console.log('⚠️  No documents found in dev waitlist collection.');
      return;
    }

    console.log(`✅ Found ${devSnapshot.size} documents in dev waitlist collection`);

    // Check for existing documents in production
    console.log('\n🔍 Checking existing documents in production Firestore...');
    const prodSnapshot = await prodDb.collection('waitlist').get();
    const existingEmails = new Set(
      prodSnapshot.docs.map(doc => {
        const data = doc.data();
        return data.email?.toLowerCase().trim();
      }).filter(Boolean)
    );
    console.log(`   Found ${prodSnapshot.size} existing documents in production`);

    // Copy documents to production
    console.log('\n📝 Copying documents to production Firestore...');
    let copied = 0;
    let skipped = 0;
    let errors = 0;

    const batch = prodDb.batch();
    let batchCount = 0;
    const BATCH_SIZE = 500; // Firestore batch limit

    for (const doc of devSnapshot.docs) {
      const data = doc.data() as WaitlistDocument;
      const email = data.email?.toLowerCase().trim();

      if (!email) {
        console.warn(`⚠️  Skipping document ${doc.id}: missing email`);
        skipped++;
        continue;
      }

      // Skip if email already exists in production
      if (existingEmails.has(email)) {
        console.log(`⏭️  Skipping ${email}: already exists in production`);
        skipped++;
        continue;
      }

      // Add document to batch
      const newDocRef = prodDb.collection('waitlist').doc();
      batch.set(newDocRef, {
        ...data,
        email: email, // Ensure email is normalized
      });

      batchCount++;
      copied++;

      // Commit batch if it reaches the limit
      if (batchCount >= BATCH_SIZE) {
        await batch.commit();
        console.log(`   ✅ Committed batch of ${batchCount} documents (${copied} total copied)`);
        batchCount = 0;
      }
    }

    // Commit remaining documents
    if (batchCount > 0) {
      await batch.commit();
      console.log(`   ✅ Committed final batch of ${batchCount} documents`);
    }

    console.log('\n📊 Migration Summary:');
    console.log(`   ✅ Copied: ${copied} documents`);
    console.log(`   ⏭️  Skipped: ${skipped} documents (already exist)`);
    console.log(`   ❌ Errors: ${errors} documents`);
    console.log(`\n🎉 Migration completed successfully!`);

  } catch (error) {
    console.error('\n❌ Error during migration:', error);
    throw error;
  } finally {
    // Clean up Firebase apps
    await devApp.delete();
    await prodApp.delete();
  }
}

// Run migration
migrateWaitlist()
  .then(() => {
    console.log('\n✨ Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Script failed:', error);
    process.exit(1);
  });

