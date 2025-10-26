const { initializeFirebase } = require('./firebaseInit');

// Contact data - extracted from setup-portfolio-firestore.js since it's not in component files
const contactData = {
  title: "Get In Touch",
  description: "Have a project in mind or want to discuss opportunities? Let's connect!",
  phone: "+91 8010122542",
  email: "atishpawar1193@gmail.com",
  location: "Manjari Bk , Hadapsar Pune, Maharashtra 411028",
  socialLinks: {
    github: "https://github.com/AtishDatattrayPawar",
    linkedin: "https://linkedin.com/in/atishpawar",
    twitter: "https://twitter.com/atishpawar",
    instagram: "https://instagram.com/atishpawar"
  }
};

async function setupContactData() {
  try {
    console.log('Setting up Contact section data...');
    
    // Initialize Firebase
    const db = initializeFirebase();
    
    // Add/update the contact document
    await db.collection('contactinfo').doc('contact1').set(contactData);
    console.log('✓ Contact section data added successfully');
    
  } catch (error) {
    console.error('Error setting up Contact section data:', error);
  }
}

// Run the setup if this script is executed directly
if (require.main === module) {
  setupContactData().then(() => {
    console.log('Contact data setup completed!');
    process.exit(0);
  }).catch(error => {
    console.error('Error in setup:', error);
    process.exit(1);
  });
}

module.exports = { setupContactData };