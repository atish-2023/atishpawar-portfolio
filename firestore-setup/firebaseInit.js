const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

let db;

function initializeFirebase() {
  if (!db) {
    // Always initialize a new app with a unique name
    const appName = 'portfolio-setup-' + Date.now();
    
    // Initialize Firebase Admin SDK
    const app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: 'personalportfolio-aaade'
    }, appName);
    
    db = admin.firestore(app);
  }
  
  return db;
}

module.exports = { initializeFirebase };