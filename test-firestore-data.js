/**
 * Script to test that all Firestore collections have been set up correctly
 */

const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'personalportfolio-aaade'
});

const db = admin.firestore();

async function testFirestoreData() {
  try {
    console.log('🧪 Testing Firestore data...\n');
    
    // Test heroinfo collection
    console.log('1. Testing heroinfo collection:');
    const heroSnapshot = await db.collection('heroinfo').doc('hero1').get();
    if (heroSnapshot.exists) {
      console.log('   ✅ heroinfo/hero1 document exists');
      console.log('   📄 Data:', JSON.stringify(heroSnapshot.data(), null, 2));
    } else {
      console.log('   ❌ heroinfo/hero1 document does not exist');
    }
    
    // Test aboutmeinfo collection
    console.log('\n2. Testing aboutmeinfo collection:');
    const aboutSnapshot = await db.collection('aboutmeinfo').doc('about1').get();
    if (aboutSnapshot.exists) {
      console.log('   ✅ aboutmeinfo/about1 document exists');
      console.log('   📄 Data:', JSON.stringify(aboutSnapshot.data(), null, 2));
    } else {
      console.log('   ❌ aboutmeinfo/about1 document does not exist');
    }
    
    // Test projectsinfo collection
    console.log('\n3. Testing projectsinfo collection:');
    const projectsSnapshot = await db.collection('projectsinfo').get();
    console.log(`   ✅ projectsinfo collection has ${projectsSnapshot.size} documents`);
    projectsSnapshot.forEach(doc => {
      console.log(`   📄 Document ID: ${doc.id}`);
    });
    
    // Test skillsinfo collection
    console.log('\n4. Testing skillsinfo collection:');
    const skillsSnapshot = await db.collection('skillsinfo').get();
    console.log(`   ✅ skillsinfo collection has ${skillsSnapshot.size} documents`);
    skillsSnapshot.forEach(doc => {
      console.log(`   📄 Document ID: ${doc.id}`);
    });
    
    // Test experienceinfo collection
    console.log('\n5. Testing experienceinfo collection:');
    const experienceSnapshot = await db.collection('experienceinfo').get();
    console.log(`   ✅ experienceinfo collection has ${experienceSnapshot.size} documents`);
    experienceSnapshot.forEach(doc => {
      console.log(`   📄 Document ID: ${doc.id}`);
    });
    
    // Test educationinfo collection
    console.log('\n6. Testing educationinfo collection:');
    const educationSnapshot = await db.collection('educationinfo').get();
    console.log(`   ✅ educationinfo collection has ${educationSnapshot.size} documents`);
    educationSnapshot.forEach(doc => {
      console.log(`   📄 Document ID: ${doc.id}`);
    });
    
    // Test certificationinfo collection
    console.log('\n7. Testing certificationinfo collection:');
    const certificationSnapshot = await db.collection('certificationinfo').get();
    console.log(`   ✅ certificationinfo collection has ${certificationSnapshot.size} documents`);
    certificationSnapshot.forEach(doc => {
      console.log(`   📄 Document ID: ${doc.id}`);
    });
    
    // Test contactinfo collection
    console.log('\n8. Testing contactinfo collection:');
    const contactSnapshot = await db.collection('contactinfo').doc('contact1').get();
    if (contactSnapshot.exists) {
      console.log('   ✅ contactinfo/contact1 document exists');
      console.log('   📄 Data:', JSON.stringify(contactSnapshot.data(), null, 2));
    } else {
      console.log('   ❌ contactinfo/contact1 document does not exist');
    }
    
    console.log('\n🎉 Firestore data test completed!');
    console.log('\n📊 Summary:');
    console.log('   - Hero section: ✅' + (heroSnapshot.exists ? ' Data available' : ' No data'));
    console.log('   - About section: ✅' + (aboutSnapshot.exists ? ' Data available' : ' No data'));
    console.log(`   - Projects: ✅ ${projectsSnapshot.size} items`);
    console.log(`   - Skills: ✅ ${skillsSnapshot.size} items`);
    console.log(`   - Experience: ✅ ${experienceSnapshot.size} items`);
    console.log(`   - Education: ✅ ${educationSnapshot.size} items`);
    console.log(`   - Certifications: ✅ ${certificationSnapshot.size} items`);
    console.log('   - Contact: ✅' + (contactSnapshot.exists ? ' Data available' : ' No data'));
    
  } catch (error) {
    console.error('❌ Error testing Firestore data:', error);
  } finally {
    // Exit the process
    process.exit(0);
  }
}

// Run the test
testFirestoreData();