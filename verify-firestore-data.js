const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin SDK
// You'll need to download your service account key from Firebase Console
// and save it as 'serviceAccountKey.json' in this directory
try {
  const serviceAccount = require('./serviceAccountKey.json');
  initializeApp({
    credential: cert(serviceAccount)
  });
} catch (error) {
  console.log('Service account key not found. Please download it from Firebase Console.');
  console.log('Steps to get service account key:');
  console.log('1. Go to Firebase Console (https://console.firebase.google.com)');
  console.log('2. Select your project');
  console.log('3. Click the gear icon (Project settings)');
  console.log('4. Go to "Service accounts" tab');
  console.log('5. Click "Generate new private key"');
  console.log('6. Save the JSON file as "serviceAccountKey.json" in this directory');
  process.exit(1);
}

const db = getFirestore();

async function verifyAndFixAdminUser() {
  try {
    console.log('Checking admin login document...');
    
    // Check if the document exists
    const docRef = db.collection('adminlogin').doc('adminUser');
    const doc = await docRef.get();
    
    if (!doc.exists) {
      console.log('Admin user document does not exist. Creating it...');
      
      // Create the document
      await docRef.set({
        email: 'atishpawar1193@gmail.com',
        password: 'Shraddhaone@28'
      });
      
      console.log('Admin user document created successfully!');
    } else {
      console.log('Admin user document exists:', doc.data());
      
      // Verify the data
      const data = doc.data();
      if (data.email === 'atishpawar1193@gmail.com' && data.password === 'Shraddhaone@28') {
        console.log('Document data is correct.');
      } else {
        console.log('Document data is incorrect. Updating...');
        await docRef.update({
          email: 'atishpawar1193@gmail.com',
          password: 'Shraddhaone@28'
        });
        console.log('Document updated successfully!');
      }
    }
    
    // List all documents in the collection for verification
    console.log('\nAll documents in adminlogin collection:');
    const snapshot = await db.collection('adminlogin').get();
    snapshot.forEach((doc) => {
      console.log(`- ${doc.id}:`, doc.data());
    });
    
    console.log('\nVerification complete!');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run the verification
verifyAndFixAdminUser();