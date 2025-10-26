const { initializeFirebase } = require('./firebaseInit');

// About section data from about.component.ts
const aboutData = {
  profilePhotoUrl: "./../../../../public/src/assets/scalartechhub.png",
  title: "About Me",
  content: "I'm a passionate software engineer specialized in building full-stack web applications...",
  skills: [
    {
      name: "Frontend Development",
      description: "Building responsive and modern UI with Angular, React, and Tailwind CSS."
    },
    {
      name: "Backend Development",
      description: "Creating scalable REST APIs using Node.js, Express, and Firebase."
    },
    {
      name: "Cloud Deployment",
      description: "Deploying and managing applications on Firebase, AWS, and Vercel."
    },
    {
      name: "Database Management",
      description: "Designing and managing databases using MongoDB, MySQL, and Firestore."
    }
  ],
  stats: {
    experience: "6+ Months Experience",
    projects: "15+ Projects Completed",
    satisfaction: "100% Client Satisfaction"
  }
};

async function setupAboutData() {
  try {
    console.log('Setting up About section data...');
    
    // Initialize Firebase
    const db = initializeFirebase();
    
    // Add/update the about document
    await db.collection('aboutmeinfo').doc('about1').set(aboutData);
    console.log('✓ About section data added successfully');
    
  } catch (error) {
    console.error('Error setting up About section data:', error);
  }
}

// Run the setup if this script is executed directly
if (require.main === module) {
  setupAboutData().then(() => {
    console.log('About data setup completed!');
    process.exit(0);
  }).catch(error => {
    console.error('Error in setup:', error);
    process.exit(1);
  });
}

module.exports = { setupAboutData };