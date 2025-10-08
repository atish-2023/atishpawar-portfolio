# Firestore Document Verification Script

This script will help you verify and fix the admin login document in Firestore.

## Prerequisites

1. Install the Firebase CLI (if not already installed):
   ```
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```
   firebase login
   ```

## Manual Verification Steps

If you can't use the CLI, follow these manual steps:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project: "personalportfolio-aaade"
3. Click on "Firestore Database" in the left sidebar
4. Look for the "adminlogin" collection
5. Check if there's a document with ID "adminUser"
6. Verify that the document contains these fields:
   - email: "atishpawar1193@gmail.com"
   - password: "Shraddhaone@28"

## If the document doesn't exist or is incorrect:

1. Click "Start collection" if the adminlogin collection doesn't exist
2. Enter "adminlogin" as the collection ID
3. Click "Next"
4. For the document ID, enter "adminUser"
5. Add the following fields:
   - Field name: "email", Type: "string", Value: "atishpawar1193@gmail.com"
   - Field name: "password", Type: "string", Value: "Shraddhaone@28"
6. Click "Save"

## After fixing the document:

1. Try logging in again through your application
2. If you still get permission errors, update your Firestore rules as described in MANUAL_RULES_UPDATE.md