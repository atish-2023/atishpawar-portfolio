# Manual Firestore Rules Update Instructions

Since you're experiencing issues with the Firebase CLI, you can manually update your Firestore rules through the Firebase Console.

## Steps to manually update Firestore rules:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project: "personalportfolio-aaade"
3. In the left sidebar, click on "Firestore Database"
4. Click on the "Rules" tab
5. Replace the existing rules with the following:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to adminlogin collection only for login verification
    match /adminlogin/{document} {
      allow read: if request.auth != null || true;  // Allow read for login verification (public read for login)
      allow write: if false; // No write access from client
    }
    
    // Deny access to all other collections by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

6. Click "Publish" to save the rules

## After updating the rules:

1. Wait a few moments for the rules to propagate
2. Try logging in again through your application
3. If you still experience issues, check the browser console for any error messages

## Alternative solution:

If you continue to have issues, you can temporarily make the rules more permissive for testing (NOT recommended for production):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

Remember to revert to more restrictive rules before deploying to production.