# Waitlist Migration Guide

This guide explains how to migrate the waitlist collection from dev Firestore to production Firestore.

## Prerequisites

1. **Firebase Admin SDK credentials** for both dev and production projects
2. **Node.js** and npm installed
3. **tsx** installed (for running TypeScript scripts)

## Step 1: Install Dependencies

If you don't have `tsx` installed, add it as a dev dependency:

```bash
npm install --save-dev tsx
```

## Step 2: Set Up Environment Variables

Create a `.env.migration` file (or add to your existing `.env.local`) with the following variables:

```bash
# Dev Firebase Credentials (source)
DEV_FIREBASE_PROJECT_ID=fullcircle-dev-1aafd
DEV_FIREBASE_CLIENT_EMAIL=your-dev-service-account@fullcircle-dev-1aafd.iam.gserviceaccount.com
DEV_FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Production Firebase Credentials (destination)
PROD_FIREBASE_PROJECT_ID=your-production-project-id
PROD_FIREBASE_CLIENT_EMAIL=your-prod-service-account@your-production-project.iam.gserviceaccount.com
PROD_FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Getting Firebase Admin Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (dev or production)
3. Go to **Project Settings** → **Service Accounts**
4. Click **Generate New Private Key**
5. Download the JSON file
6. Extract the values:
   - `project_id` → `DEV_FIREBASE_PROJECT_ID` or `PROD_FIREBASE_PROJECT_ID`
   - `client_email` → `DEV_FIREBASE_CLIENT_EMAIL` or `PROD_FIREBASE_CLIENT_EMAIL`
   - `private_key` → `DEV_FIREBASE_PRIVATE_KEY` or `PROD_FIREBASE_PRIVATE_KEY`

**Important:** When copying the private key, keep the `\n` characters or use the format shown above.

## Step 3: Run the Migration Script

Load the environment variables and run the migration script:

```bash
# Load env vars and run migration
export $(cat .env.migration | xargs) && npx tsx scripts/migrate-waitlist-to-prod.ts
```

Or if you're using a tool like `dotenv-cli`:

```bash
npm install -g dotenv-cli
dotenv -e .env.migration -- npx tsx scripts/migrate-waitlist-to-prod.ts
```

## Step 4: Verify Migration

After running the script, verify the data in your production Firestore:

1. Go to Firebase Console → Production Project
2. Navigate to Firestore Database
3. Check the `waitlist` collection
4. Verify that all documents were copied correctly

## Step 5: Switch to Production Firebase

### Option A: Using Environment Variables (Recommended)

Add these to your `.env.local` file (or your deployment platform's environment variables):

```bash
# Production Firebase Client Config
NEXT_PUBLIC_FIREBASE_API_KEY=your-production-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-production-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-production-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-production-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Production Firebase Admin Config (for API routes)
FIREBASE_PROJECT_ID=your-production-project-id
FIREBASE_CLIENT_EMAIL=your-prod-service-account@your-production-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Option B: Update config.js Directly

If you prefer to hardcode production values, update `src/services/firebase/config.js` with your production Firebase config.

## What the Script Does

1. ✅ Connects to dev Firestore and reads all `waitlist` documents
2. ✅ Checks for existing documents in production Firestore (by email)
3. ✅ Copies only new documents (skips duplicates)
4. ✅ Preserves all document fields including timestamps
5. ✅ Uses Firestore batches for efficient writes
6. ✅ Provides detailed progress and summary output

## Troubleshooting

### Error: "Missing Firebase credentials"
- Make sure all environment variables are set correctly
- Check that the private key includes `\n` characters for newlines

### Error: "Permission denied"
- Ensure your service account has Firestore read/write permissions
- Check that the service account is enabled in Firebase Console

### Documents not copying
- Check the console output for skipped documents (duplicates)
- Verify that the production Firestore rules allow writes

## Notes

- The script will **skip** documents that already exist in production (based on email)
- All document IDs will be regenerated in production (Firestore auto-generates IDs)
- Timestamps and other fields are preserved as-is
- The script is idempotent - you can run it multiple times safely

