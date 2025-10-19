# Portfolio Firestore Setup Instructions

Follow these steps to set up Firestore collections for your portfolio website.

## 🔧 Prerequisites

You already have:
- Firebase project: `personalportfolio-aaade`
- Firebase configuration in your Angular app

## 📝 Step-by-Step Setup

### Step 1: Generate Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `personalportfolio-aaade`
3. Click the gear icon ⚙️ and select "Project settings"
4. Go to the "Service accounts" tab
5. Click "Generate new private key"
6. Save the downloaded JSON file as `serviceAccountKey.json` in your project directory

### Step 2: Install Firebase Admin SDK

If not already installed:

```bash
npm install firebase-admin
```

### Step 3: Test Firebase Connection

Verify your setup:

```bash
npm run test-firebase-connection
```

You should see:
```
✅ Firebase Admin SDK initialized successfully
✅ Firestore connection successful
```

### Step 4: Set Up Firestore Collections

Create all the required collections with sample data:

```bash
npm run setup-portfolio-firestore
```

This will create:
- 8 collections
- 13 documents
- Properly structured data matching your portfolio

### Step 5: Verify Collections

Check that all collections were created in Firebase Console:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `personalportfolio-aaade`
3. Click "Firestore Database"
4. You should see all 8 collections

### Step 6: Upload Media Files

1. Go to "Storage" in Firebase Console
2. Upload your images and files
3. Note the URLs for each uploaded file

### Step 7: Update URLs

Update the placeholder URLs in Firestore with your actual Firebase Storage URLs:
- Profile images
- Project screenshots
- Certification logos
- Resume PDF

### Step 8: Connect to Angular App

Update your Angular services to fetch data from Firestore instead of the mock API.

Example:
```typescript
import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  constructor(private firestore: Firestore) {}

  getHeroInfo(): Observable<any> {
    const heroDoc = doc(this.firestore, 'heroinfo', 'hero1');
    return from(getDoc(heroDoc));
  }
}
```

## 📁 Collections Structure

The setup creates the following collections:

1. **heroinfo** - Hero section (1 document: hero1)
2. **aboutmeinfo** - About section (1 document: about1)
3. **projectsinfo** - Projects (2 documents: project1, project2)
4. **skillsinfo** - Skills (3 documents: skill1, skill2, skill3)
5. **experienceinfo** - Work experience (2 documents: exp1, exp2)
6. **educationinfo** - Education (2 documents: edu1, edu2)
7. **certificationinfo** - Certifications (2 documents: cert1, cert2)
8. **contactinfo** - Contact info (1 document: contact1)

## 🛡️ Security Rules

For development, use these security rules in `firestore.rules`:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all collections (for public portfolio data)
    match /{document=**} {
      allow read: if true;
      // Allow write access only when authenticated
      allow write: if request.auth != null;
    }
  }
}
```

## ✅ Verification

After setup, verify everything works:
1. All 8 collections exist in Firestore
2. Each collection has the correct documents
3. All fields have the correct data types
4. Your Angular app can fetch data from Firestore

## 📞 Support

If you encounter issues:

1. Check that `serviceAccountKey.json` is in your project directory
2. Verify your Firebase project ID is correct
3. Ensure you have internet connectivity
4. Check Firebase Console for any error messages

For further assistance, refer to:
- [FIRESTORE_PORTFOLIO_SETUP.md](file:///C:/Users/atish/OneDrive/Desktop/personalPortfolio/FIRESTORE_PORTFOLIO_SETUP.md)
- [FIRESTORE_INTEGRATION_GUIDE.md](file:///C:/Users/atish/OneDrive/Desktop/personalPortfolio/FIRESTORE_INTEGRATION_GUIDE.md)
- Firebase Documentation

Your portfolio Firestore database is now ready for your dynamic website!