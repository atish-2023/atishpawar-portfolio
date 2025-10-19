const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhS314c7dN5KfFJn2x5J1p4Q4v7y8z9",
  authDomain: "personal-portfolio-3c2e7.firebaseapp.com",
  projectId: "personal-portfolio-3c2e7",
  storageBucket: "personal-portfolio-3c2e7.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// About section data
const aboutSectionData = {
  profilePhotoUrl: "https://example.com/myphoto.jpg",
  title: "I'm Atish Datattray Pawar",
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
      name: "UI/UX Design",
      description: "Designing user-friendly interfaces with Figma and Adobe XD."
    },
    {
      name: "Cloud Deployment",
      description: "Deploying and managing applications on Firebase, AWS, and Vercel."
    }
  ],
  stats: {
    experience: "5+ Years Experience",
    projects: "20+ Projects Completed",
    satisfaction: "100% Client Satisfaction"
  }
};

async function initializeAboutSection() {
  try {
    // Create or update the aboutSection document
    const aboutSectionDoc = doc(db, 'aboutSection', 'main');
    await setDoc(aboutSectionDoc, aboutSectionData);
    console.log('About section data initialized successfully!');
  } catch (error) {
    console.error('Error initializing about section data:', error);
  }
}

// Run the initialization
initializeAboutSection();