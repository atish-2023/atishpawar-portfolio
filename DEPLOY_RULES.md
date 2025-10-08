# Firestore Rules Deployment

To fix the "Access denied" error, you need to deploy the updated Firestore rules.

## Prerequisites

1. Make sure you have Firebase CLI installed:
   ```
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```
   firebase login
   ```

## Deploy Rules

Run the following command to deploy the updated Firestore rules:

```
firebase deploy --only firestore:rules
```

Alternatively, you can run the provided script:
```
node deploy-rules.js
```

## Verify Deployment

After deploying the rules, try logging in again through your application.