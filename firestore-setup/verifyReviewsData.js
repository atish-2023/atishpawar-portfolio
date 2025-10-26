const { initializeFirebase } = require('./firebaseInit');

async function verifyReviewsData() {
  try {
    console.log('Verifying Reviews data...');
    
    // Initialize Firebase
    const db = initializeFirebase();
    
    // Get reviews data
    const reviewsSnapshot = await db.collection('reviewsinfo').get();
    
    if (reviewsSnapshot.empty) {
      console.log('⚠️  No reviews data found in Firestore');
      return;
    }
    
    console.log(`✓ Found ${reviewsSnapshot.size} review(s) in Firestore:`);
    
    reviewsSnapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      console.log(`  ${index + 1}. ${data.name} - ${data.role} (${data.rating} stars)`);
      console.log(`     Message: ${data.message.substring(0, 50)}...`);
      console.log(`     Date: ${data.date}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('Error verifying Reviews data:', error);
  }
}

// Run the verification if this script is executed directly
if (require.main === module) {
  verifyReviewsData().then(() => {
    console.log('Reviews data verification completed!');
    process.exit(0);
  }).catch(error => {
    console.error('Error in verification:', error);
    process.exit(1);
  });
}

module.exports = { verifyReviewsData };