# Firestore Data Verification Script

This script helps verify and fix the admin login document in your Firestore database.

## Prerequisites

1. Install Firebase Admin SDK:
   ```
   npm install firebase-admin
   ```

2. Get your service account key:
   - Go to Firebase Console (https://console.firebase.google.com)
   - Select your project
   - Click the gear icon (Project settings)
   - Go to "Service accounts" tab
   - Click "Generate new private key"
   - Save the JSON file as "serviceAccountKey.json" in this directory

## Usage

Run the script:
```
node verify-firestore-data.js
```

## What the script does

1. Checks if the admin login document exists
2. If it doesn't exist, creates it with the correct credentials
3. If it exists but has incorrect data, updates it
4. Lists all documents in the adminlogin collection for verification

## After running the script

1. Try logging in again through your application
2. If you still get permission errors, update your Firestore rules as described in MANUAL_RULES_UPDATE.md