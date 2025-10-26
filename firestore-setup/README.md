# Firestore Portfolio Setup

This directory contains scripts to populate your Firebase Firestore database with your portfolio data.

## Folder Structure

```
firestore-setup/
├── setupAboutData.js          # Setup about section data
├── setupSkillsData.js         # Setup skills data
├── setupProjectsData.js       # Setup projects data
├── setupExperienceData.js     # Setup experience data
├── setupEducationData.js      # Setup education data
├── setupCertificationsData.js # Setup certifications data
├── setupHeroData.js           # Setup hero section data
├── setupContactData.js        # Setup contact data
├── setupReviewsData.js        # Setup reviews data
├── setupPortfolioData.js      # Main script to run all setups
├── verifyFirestoreData.js     # Script to verify data in Firestore
├── firebaseInit.js            # Shared Firebase initialization
└── package.json              # Package file with npm scripts
```

## Usage

### Run All Setup Scripts

To populate Firestore with all your portfolio data, you can use either of these methods:

**From the project root directory:**
```bash
npm run firestore:setup
```

**From within the firestore-setup directory:**
```bash
npm run setup
```

**Direct node command from project root:**
```bash
node firestore-setup/setupPortfolioData.js
```

### Run Individual Setup Scripts

You can also run individual setup scripts:

**From the project root directory:**
```bash
npm run firestore:setup:hero
npm run firestore:setup:about
npm run firestore:setup:skills
npm run firestore:setup:projects
npm run firestore:setup:experience
npm run firestore:setup:education
npm run firestore:setup:certifications
npm run firestore:setup:contact
npm run firestore:setup:reviews
```

**From within the firestore-setup directory:**
```bash
npm run setup:hero
npm run setup:about
npm run setup:skills
npm run setup:projects
npm run setup:experience
npm run setup:education
npm run setup:certifications
npm run setup:contact
npm run setup:reviews
```

### Verify Data

To verify that data was correctly added to Firestore:

**From the project root directory:**
```bash
npm run firestore:verify
```

**From within the firestore-setup directory:**
```bash
npm run verify
```

**Direct node command from project root:**
```bash
node firestore-setup/verifyFirestoreData.js
```

## Data Structure

Each script populates Firestore collections with data extracted from your Angular component files:

- **heroinfo/hero1** - Hero section data
- **aboutmeinfo/about1** - About section data
- **skillsinfo/skill1, skill2, etc.** - Skills data
- **projectsinfo/project1, project2, etc.** - Projects data
- **experienceinfo/exp1, exp2, etc.** - Experience data
- **educationinfo/edu1, edu2, etc.** - Education data
- **certificationinfo/cert1, cert2, etc.** - Certifications data
- **contactinfo/contact1** - Contact section data
- **reviewsinfo/review1, review2, etc.** - Reviews data

## Prerequisites

- Firebase service account key file at `../serviceAccountKey.json`
- Firebase Admin SDK installed
- Valid Firebase project configuration

## Troubleshooting

If you encounter authentication errors:
1. Ensure your `serviceAccountKey.json` file is in the project root
2. Verify the file has valid credentials
3. Check that your Firebase project exists and is correctly configured