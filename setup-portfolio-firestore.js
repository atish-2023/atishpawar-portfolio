/**
 * Script to set up Firestore collections for Atish's portfolio website
 * Uses the existing Firebase project configuration
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

// Initialize Firebase Admin SDK with your existing project
// Note: You'll need to generate a service account key from Firebase Console
// and save it as serviceAccountKey.json in your project directory
try {
  const serviceAccount = require('./serviceAccountKey.json');
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: firebaseConfig.projectId
  });
  
  console.log('Firebase Admin SDK initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:');
  console.error('Please generate a service account key from Firebase Console and save it as serviceAccountKey.json');
  console.error('Steps:');
  console.error('1. Go to Firebase Console: https://console.firebase.google.com/');
  console.error('2. Select your project: personalportfolio-aaade');
  console.error('3. Go to Project Settings > Service Accounts');
  console.error('4. Click "Generate new private key"');
  console.error('5. Save the downloaded JSON file as serviceAccountKey.json in your project directory');
  process.exit(1);
}

// Get Firestore instance
const db = admin.firestore();

// Collection data as specified
const collectionsData = {
  // Collection: heroinfo
  heroinfo: {
    hero1: {
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
    }
  },
  
  // Collection: aboutmeinfo
  aboutmeinfo: {
    about1: {
      title: "About Me",
      content: "I'm a passionate full-stack developer with expertise in creating modern web applications...",
      profilePhotoUrl: "https://firebasestorage.googleapis.com/v0/b/personalportfolio-aaade.appspot.com/o/profile%2Fprofile-photo.jpg?alt=media",
      skills: [
        { name: "Frontend Development", description: "Creating responsive and interactive user interfaces" },
        { name: "Backend Development", description: "Building robust server-side applications and APIs" }
      ],
      stats: {
        experience: "5+ Years",
        projects: "50+ Projects",
        satisfaction: "98% Client Satisfaction"
      }
    }
  },
  
  // Collection: projectsinfo
  projectsinfo: {
    project1: {
      title: "YouTube Management System",
      description: "A C++ OOP-based project for video and channel management",
      longDescription: "Detailed description of the project...",
      images: [
        "https://firebasestorage.googleapis.com/v0/b/personalportfolio-aaade.appspot.com/o/projects%2Fproject1.jpg?alt=media",
        "https://firebasestorage.googleapis.com/v0/b/personalportfolio-aaade.appspot.com/o/projects%2Fproject2.jpg?alt=media"
      ],
      tags: ["C++", "OOPs", "File Handling"],
      repoUrl: "https://github.com/AtishDatattrayPawar/project",
      liveUrl: "https://project-demo.com",
      category: "Web Application",
      date: "2024-05-15"
    },
    project2: {
      title: "E-Commerce Platform",
      description: "A full-featured online shopping platform with payment integration",
      longDescription: "A comprehensive e-commerce solution built with modern web technologies. Features include user authentication, product catalog, shopping cart, payment processing, order management, and admin dashboard.",
      images: [
        "https://firebasestorage.googleapis.com/v0/b/personalportfolio-aaade.appspot.com/o/projects%2Fecommerce1.jpg?alt=media",
        "https://firebasestorage.googleapis.com/v0/b/personalportfolio-aaade.appspot.com/o/projects%2Fecommerce2.jpg?alt=media"
      ],
      tags: ["Angular", "Node.js", "MongoDB", "Stripe"],
      repoUrl: "https://github.com/AtishDatattrayPawar/ecommerce-platform",
      liveUrl: "https://ecommerce-demo.com",
      category: "Web Application",
      date: "2023-11-20"
    }
  },
  
  // Collection: skillsinfo
  skillsinfo: {
    skill1: {
      name: "JavaScript",
      category: "Frontend",
      level: 95,
      icon: "🔹",
      description: "Expert in modern JavaScript (ES6+) and frameworks like React and Angular"
    },
    skill2: {
      name: "TypeScript",
      category: "Frontend",
      level: 90,
      icon: "🔷",
      description: "Strong typing skills for scalable applications"
    },
    skill3: {
      name: "Angular",
      category: "Frontend",
      level: 92,
      icon: "🅰️",
      description: "Building complex UIs with components, services, and state management"
    }
  },
  
  // Collection: experienceinfo
  experienceinfo: {
    exp1: {
      title: "Senior Full Stack Developer",
      subtitle: "Tech Innovations Inc.",
      period: "2021 - Present",
      description: "Lead development of multiple web applications serving over 100,000 users...",
      location: "San Francisco, California",
      icon: "💼",
      iconColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
      technologies: ["React", "Node.js", "TypeScript", "GraphQL", "AWS"],
      keyProjects: ["Customer Portal Redesign", "API Gateway Implementation"]
    },
    exp2: {
      title: "Frontend Developer",
      subtitle: "Digital Solutions LLC",
      period: "2019 - 2021",
      description: "Developed responsive web applications for various clients in finance and healthcare industries. Collaborated with UX designers to implement pixel-perfect interfaces.",
      location: "Remote",
      icon: "💻",
      iconColor: "text-green-400",
      bgColor: "bg-green-500/10",
      technologies: ["Angular", "Vue.js", "SASS", "Webpack", "Jest"],
      keyProjects: ["Healthcare Dashboard", "Financial Analytics Platform"]
    }
  },
  
  // Collection: educationinfo
  educationinfo: {
    edu1: {
      title: "Bachelor of Computer Science (BCS)",
      subtitle: "Annasaheb Magar College, Pune",
      period: "2021 - 2024",
      description: "Focused on Software Development, Networking, and Programming.",
      location: "Pune, Maharashtra",
      icon: "🎓",
      iconColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
      coursework: ["Data Structures", "Operating Systems", "Computer Networks"],
      achievements: ["First Class with Distinction", "Top 5 in Class"]
    },
    edu2: {
      title: "Higher Secondary Certificate (HSC)",
      subtitle: "Shri Chhatrapati Shivaji Mahavidyalaya, Pune",
      period: "2019 - 2021",
      description: "Science stream with focus on Mathematics and Computer Science.",
      location: "Pune, Maharashtra",
      icon: "📚",
      iconColor: "text-purple-400",
      bgColor: "bg-purple-500/10",
      coursework: ["Mathematics", "Physics", "Chemistry", "Computer Science"],
      achievements: ["Secured 85% in final examinations"]
    }
  },
  
  // Collection: certificationinfo
  certificationinfo: {
    cert1: {
      title: "Java Developer Certificate",
      organization: "Scalar TechHub",
      date: "2024-05-10",
      description: "Certified Java Developer with hands-on experience in full-stack applications.",
      logo: "https://firebasestorage.googleapis.com/v0/b/personalportfolio-aaade.appspot.com/o/certifications%2Fjava-cert-logo.png?alt=media"
    },
    cert2: {
      title: "Google Cloud Professional Developer",
      organization: "Google Cloud",
      date: "2023-12-15",
      description: "Validated skills in designing, building, and managing cloud-based applications.",
      logo: "https://firebasestorage.googleapis.com/v0/b/personalportfolio-aaade.appspot.com/o/certifications%2Fgcp-logo.png?alt=media"
    }
  },
  
  // Collection: contactinfo
  contactinfo: {
    contact1: {
      title: "Get In Touch",
      description: "Have a project in mind or want to discuss opportunities? Let's connect!",
      phone: "+91 8459688125",
      email: "contact@atishpawar.com",
      location: "Pune, Maharashtra",
      socialLinks: {
        github: "https://github.com/AtishDatattrayPawar",
        linkedin: "https://linkedin.com/in/atishpawar",
        twitter: "https://twitter.com/atishpawar",
        instagram: "https://instagram.com/atishpawar"
      }
    }
  }
};

// Function to set up all collections
async function setupPortfolioFirestore() {
  try {
    console.log('Setting up Firestore collections for your portfolio...');
    console.log('Using Firebase project:', firebaseConfig.projectId);
    
    // Loop through each collection
    for (const [collectionName, documents] of Object.entries(collectionsData)) {
      console.log(`\nSetting up collection: ${collectionName}`);
      
      // Loop through each document in the collection
      for (const [documentId, data] of Object.entries(documents)) {
        console.log(`  Creating document: ${documentId}`);
        await db.collection(collectionName).doc(documentId).set(data);
      }
      
      console.log(`  ✓ Collection ${collectionName} set up successfully`);
    }
    
    console.log('\n🎉 All Firestore collections have been set up successfully!');
    console.log('\nNext steps:');
    console.log('1. Upload your actual images and files to Firebase Storage');
    console.log('2. Update the URLs in Firestore with your actual Firebase Storage URLs');
    console.log('3. Connect your Angular app to fetch data from Firestore');
    
  } catch (error) {
    console.error('Error setting up Firestore collections:', error);
    process.exit(1);
  }
}

// Run the setup function
setupPortfolioFirestore();