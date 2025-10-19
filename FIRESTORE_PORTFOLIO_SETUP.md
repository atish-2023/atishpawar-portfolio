# Firestore Portfolio Setup Guide

This guide will help you set up Firestore collections for your existing Firebase project `personalportfolio-aaade`.

## 📋 Prerequisites

1. You already have a Firebase project: `personalportfolio-aaade`
2. You have the Firebase configuration in your Angular app
3. You need to generate a service account key to run the setup scripts

## 🔑 Step 1: Generate Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `personalportfolio-aaade`
3. Click the gear icon and select "Project settings"
4. Go to the "Service accounts" tab
5. Click "Generate new private key"
6. Save the downloaded JSON file as `serviceAccountKey.json` in your project directory

## 🚀 Step 2: Test Firebase Connection

Run the test script to verify your setup:

```bash
npm run test-firebase-connection
```

If successful, you'll see:
```
✅ Firebase Admin SDK initialized successfully
✅ Firestore connection successful
```

## 🏗️ Step 3: Set Up Firestore Collections

Run the setup script to create all the required collections:

```bash
npm run setup-portfolio-firestore
```

This will create the following collections with sample data:

### Collections Created

1. **heroinfo** - Hero section data (1 document)
2. **aboutmeinfo** - About section data (1 document)
3. **projectsinfo** - Projects data (multiple documents)
4. **skillsinfo** - Skills data (multiple documents)
5. **experienceinfo** - Work experience data (multiple documents)
6. **educationinfo** - Education background data (multiple documents)
7. **certificationinfo** - Certifications data (multiple documents)
8. **contactinfo** - Contact information (1 document)

## 📁 Collection Structure

### 1. heroinfo
Document ID: `hero1`
Fields:
- `name` (String)
- `tagline` (String)
- `description` (String)
- `profileImageUrl` (String)
- `resumeUrl` (String)
- `ctaButtons` (Array of Objects)

### 2. aboutmeinfo
Document ID: `about1`
Fields:
- `title` (String)
- `content` (String)
- `profilePhotoUrl` (String)
- `skills` (Array of Objects)
- `stats` (Object)

### 3. projectsinfo
Document IDs: `project1`, `project2`, etc.
Fields:
- `title` (String)
- `description` (String)
- `longDescription` (String)
- `images` (Array of Strings)
- `tags` (Array of Strings)
- `repoUrl` (String)
- `liveUrl` (String)
- `category` (String)
- `date` (String)

### 4. skillsinfo
Document IDs: `skill1`, `skill2`, etc.
Fields:
- `name` (String)
- `category` (String)
- `level` (Number)
- `icon` (String)
- `description` (String)

### 5. experienceinfo
Document IDs: `exp1`, `exp2`, etc.
Fields:
- `title` (String)
- `subtitle` (String)
- `period` (String)
- `description` (String)
- `location` (String)
- `icon` (String)
- `iconColor` (String)
- `bgColor` (String)
- `technologies` (Array of Strings)
- `keyProjects` (Array of Strings)

### 6. educationinfo
Document IDs: `edu1`, `edu2`, etc.
Fields:
- `title` (String)
- `subtitle` (String)
- `period` (String)
- `description` (String)
- `location` (String)
- `icon` (String)
- `iconColor` (String)
- `bgColor` (String)
- `coursework` (Array of Strings)
- `achievements` (Array of Strings)

### 7. certificationinfo
Document IDs: `cert1`, `cert2`, etc.
Fields:
- `title` (String)
- `organization` (String)
- `date` (String)
- `description` (String)
- `logo` (String)

### 8. contactinfo
Document ID: `contact1`
Fields:
- `title` (String)
- `description` (String)
- `phone` (String)
- `email` (String)
- `location` (String)
- `socialLinks` (Object)

## 🖼️ Step 4: Upload Media Files

After setting up the collections:

1. Upload your actual images and files to Firebase Storage
2. Update the URLs in Firestore documents with your actual Firebase Storage URLs

## 🔧 Step 5: Connect to Your Angular App

Update your Angular services to fetch data from Firestore instead of the mock API.

Example service method for fetching hero info:

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

## 🛡️ Security Rules

For development, you can use these basic security rules in `firestore.rules`:

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

After completing the setup, you can verify the collections in the Firebase Console:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `personalportfolio-aaade`
3. Click "Firestore Database"
4. You should see all 8 collections with their respective documents

## 📝 Next Steps

1. Customize the sample data with your actual portfolio information
2. Upload your media files to Firebase Storage
3. Update the URLs in Firestore with your actual file paths
4. Connect your Angular components to fetch data from Firestore
5. Deploy your updated portfolio

Your Firestore database is now ready to support your dynamic portfolio website!