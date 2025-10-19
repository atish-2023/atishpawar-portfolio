/**
 * Script to test Firebase connection for Atish's portfolio website
 */

// Import required modules
const admin = require('firebase-admin');

// Import Firebase configuration from environment file
const firebaseConfig = {
  apiKey: "AIzaSyAXFw7MAP8tAJ7fCL21uZloM1O5Q9Wo_cU",
  authDomain: "personalportfolio-aaade.firebaseapp.com",
  projectId: "personalportfolio-aaade",
  storageBucket: "personalportfolio-aaade.firebasestorage.app",
  messagingSenderId: "366889804995",
  appId: "1:366889804995:web:6ee2384ba30e8489c86e76",
  measurementId: "G-69XJZ4XHMC"
};

// Try to initialize Firebase Admin SDK
try {
  // First check if service account key exists
  const serviceAccount = require('./serviceAccountKey.json');
  
  // Initialize Firebase Admin SDK
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: firebaseConfig.projectId
  });
  
  console.log('✅ Firebase Admin SDK initialized successfully');
  console.log('📦 Project ID:', firebaseConfig.projectId);
  
  // Test Firestore connection
  const db = admin.firestore();
  
  // Try to access a simple collection
  db.collection('test')
    .limit(1)
    .get()
    .then(() => {
      console.log('✅ Firestore connection successful');
      console.log('\n🎉 Your Firebase setup is ready!');
      console.log('\nTo set up your portfolio Firestore collections, run:');
      console.log('   npm run setup-portfolio-firestore');
      console.log('\nNote: You need to have a serviceAccountKey.json file in your project directory.');
      console.log('If you don\'t have it yet, generate it from Firebase Console:');
      console.log('1. Go to https://console.firebase.google.com/');
      console.log('2. Select your project: personalportfolio-aaade');
      console.log('3. Go to Project Settings > Service Accounts');
      console.log('4. Click "Generate new private key"');
      console.log('5. Save the downloaded JSON file as serviceAccountKey.json in your project directory');
    })
    .catch((error) => {
      console.log('❌ Firestore connection failed');
      console.log('Error:', error.message);
    });
  
} catch (error) {
  console.log('❌ Firebase Admin SDK initialization failed');
  console.log('Error:', error.message);
  console.log('\n🔧 To fix this issue:');
  console.log('1. Go to https://console.firebase.google.com/');
  console.log('2. Select your project: personalportfolio-aaade');
  console.log('3. Go to Project Settings > Service Accounts');
  console.log('4. Click "Generate new private key"');
  console.log('5. Save the downloaded JSON file as serviceAccountKey.json in your project directory');
}