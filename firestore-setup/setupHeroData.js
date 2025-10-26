const { initializeFirebase } = require('./firebaseInit');

// Hero data - extracted from component and setup-portfolio-firestore.js
const heroData = {
  name: "Atish Pawar",
  tagline: "Full Stack Developer & UI/UX Enthusiast",
  description: "Turning ideas into reality through clean, efficient code.",
  profileImageUrl: "https://firebasestorage.googleapis.com/v0/b/personalportfolio-aaade.appspot.com/o/profile%2Fprofile-image.jpg?alt=media",
  resumeUrl: "https://firebasestorage.googleapis.com/v0/b/personalportfolio-aaade.appspot.com/o/resume%2FAtish_Pawar_Resume.pdf?alt=media",
  ctaButtons: [
    {
      text: "View My Work",
      link: "#projects",
      primary: true
    },
    {
      text: "Get In Touch",
      link: "#contact",
      primary: false
    }
  ]
};

async function setupHeroData() {
  try {
    console.log('Setting up Hero section data...');
    
    // Initialize Firebase
    const db = initializeFirebase();
    
    // Add/update the hero document
    await db.collection('heroinfo').doc('hero1').set(heroData);
    console.log('✓ Hero section data added successfully');
    
  } catch (error) {
    console.error('Error setting up Hero section data:', error);
  }
}

// Run the setup if this script is executed directly
if (require.main === module) {
  setupHeroData().then(() => {
    console.log('Hero data setup completed!');
    process.exit(0);
  }).catch(error => {
    console.error('Error in setup:', error);
    process.exit(1);
  });
}

module.exports = { setupHeroData };