const { initializeFirebase } = require('./firebaseInit');

async function verifyFirestoreData() {
  try {
    console.log('=== Verifying Firestore Data ===\n');
    
    // Initialize Firebase
    const db = initializeFirebase();
    
    // Check hero data
    console.log('1. Checking Hero data...');
    const heroDoc = await db.collection('heroinfo').doc('hero1').get();
    if (heroDoc.exists) {
      console.log('   ✓ Hero document exists');
      const heroData = heroDoc.data();
      console.log(`   Name: ${heroData.name}`);
      console.log(`   Tagline: ${heroData.tagline}`);
    } else {
      console.log('   ✗ Hero document does not exist');
    }
    
    console.log('');
    
    // Check about data
    console.log('2. Checking About data...');
    const aboutDoc = await db.collection('aboutmeinfo').doc('about1').get();
    if (aboutDoc.exists) {
      console.log('   ✓ About document exists');
      const aboutData = aboutDoc.data();
      console.log(`   Title: ${aboutData.title}`);
      console.log(`   Skills count: ${aboutData.skills?.length || 0}`);
    } else {
      console.log('   ✗ About document does not exist');
    }
    
    console.log('');
    
    // Check skills data
    console.log('3. Checking Skills data...');
    const skillsSnapshot = await db.collection('skillsinfo').get();
    console.log(`   ✓ Skills collection has ${skillsSnapshot.size} documents`);
    
    console.log('');
    
    // Check projects data
    console.log('4. Checking Projects data...');
    const projectsSnapshot = await db.collection('projectsinfo').get();
    console.log(`   ✓ Projects collection has ${projectsSnapshot.size} documents`);
    
    console.log('');
    
    // Check experience data
    console.log('5. Checking Experience data...');
    const experienceSnapshot = await db.collection('experienceinfo').get();
    console.log(`   ✓ Experience collection has ${experienceSnapshot.size} documents`);
    
    console.log('');
    
    // Check education data
    console.log('6. Checking Education data...');
    const educationSnapshot = await db.collection('educationinfo').get();
    console.log(`   ✓ Education collection has ${educationSnapshot.size} documents`);
    
    console.log('');
    
    // Check certifications data
    console.log('7. Checking Certifications data...');
    const certificationsSnapshot = await db.collection('certificationinfo').get();
    console.log(`   ✓ Certifications collection has ${certificationsSnapshot.size} documents`);
    
    console.log('');
    
    // Check contact data
    console.log('8. Checking Contact data...');
    const contactDoc = await db.collection('contactinfo').doc('contact1').get();
    if (contactDoc.exists) {
      console.log('   ✓ Contact document exists');
      const contactData = contactDoc.data();
      console.log(`   Email: ${contactData.email}`);
      console.log(`   Phone: ${contactData.phone}`);
    } else {
      console.log('   ✗ Contact document does not exist');
    }
    
    console.log('');
    
    // Check reviews data
    console.log('9. Checking Reviews data...');
    const reviewsSnapshot = await db.collection('reviewsinfo').get();
    console.log(`   ✓ Reviews collection has ${reviewsSnapshot.size} documents`);
    
    console.log('\n=== Verification Complete ===');
    
  } catch (error) {
    console.error('Error verifying Firestore data:', error);
  }
}

// Run the verification if this script is executed directly
if (require.main === module) {
  verifyFirestoreData().then(() => {
    console.log('Verification completed!');
    process.exit(0);
  }).catch(error => {
    console.error('Error in verification:', error);
    process.exit(1);
  });
}

module.exports = { verifyFirestoreData };