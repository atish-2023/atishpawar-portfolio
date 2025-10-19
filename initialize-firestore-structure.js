/**
 * Script to initialize Firestore collections for Atish's portfolio website
 * Uses the existing Firebase project: personalportfolio-aaade
 */

// Import required modules
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json'); // You'll need to add this file

// Initialize Firebase Admin SDK with your existing project
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'personalportfolio-aaade'
});

// Get Firestore instance
const db = admin.firestore();

// Collection: heroinfo
const heroinfoData = {
  name: "Atish Pawar",
  tagline: "Full Stack Developer & UI/UX Enthusiast",
  description: "Turning ideas into reality through clean, efficient code.",
  profileImageUrl: "https://example.com/profile-image.jpg",
  resumeUrl: "https://example.com/Atish_Pawar_Resume.pdf",
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

// Collection: aboutmeinfo
const aboutmeinfoData = {
  title: "About Me",
  content: "I'm a passionate full-stack developer with expertise in creating modern web applications...",
  profilePhotoUrl: "https://example.com/profile-photo.jpg",
  skills: [
    { name: "Frontend Development", description: "Creating responsive and interactive user interfaces" },
    { name: "Backend Development", description: "Building robust server-side applications and APIs" }
  ],
  stats: {
    experience: "5+ Years",
    projects: "50+ Projects",
    satisfaction: "98% Client Satisfaction"
  }
};

// Collection: projectsinfo (multiple documents)
const projectsinfoData = [
  {
    title: "YouTube Management System",
    description: "A C++ OOP-based project for video and channel management",
    longDescription: "Detailed description of the project...",
    images: [
      "https://example.com/project1.jpg",
      "https://example.com/project2.jpg"
    ],
    tags: ["C++", "OOPs", "File Handling"],
    repoUrl: "https://github.com/AtishDatattrayPawar/project",
    liveUrl: "https://project-demo.com",
    category: "Web Application",
    date: "2024-05-15"
  },
  {
    title: "E-Commerce Platform",
    description: "A full-featured online shopping platform with payment integration",
    longDescription: "A comprehensive e-commerce solution built with modern web technologies. Features include user authentication, product catalog, shopping cart, payment processing, order management, and admin dashboard.",
    images: [
      "https://example.com/ecommerce1.jpg",
      "https://example.com/ecommerce2.jpg"
    ],
    tags: ["Angular", "Node.js", "MongoDB", "Stripe"],
    repoUrl: "https://github.com/AtishDatattrayPawar/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.com",
    category: "Web Application",
    date: "2023-11-20"
  },
  {
    title: "Task Management App",
    description: "A productivity application for team collaboration and task tracking",
    longDescription: "A collaborative task management solution designed for teams to organize projects, assign tasks, track progress, and communicate effectively. Features real-time updates, notifications, and detailed analytics.",
    images: [
      "https://example.com/taskmanager1.jpg"
    ],
    tags: ["React", "Firebase", "Material-UI", "Redux"],
    repoUrl: "https://github.com/AtishDatattrayPawar/task-manager",
    liveUrl: "https://taskmanager-demo.com",
    category: "Web Application",
    date: "2023-08-10"
  }
];

// Collection: skillsinfo (multiple documents)
const skillsinfoData = [
  {
    name: "JavaScript",
    category: "Frontend",
    level: 95,
    icon: "🔹",
    description: "Expert in modern JavaScript (ES6+) and frameworks like React and Angular"
  },
  {
    name: "TypeScript",
    category: "Frontend",
    level: 90,
    icon: "🔷",
    description: "Strong typing skills for scalable applications"
  },
  {
    name: "Angular",
    category: "Frontend",
    level: 92,
    icon: "🅰️",
    description: "Building complex UIs with components, services, and state management"
  },
  {
    name: "React",
    category: "Frontend",
    level: 88,
    icon: "⚛️",
    description: "Component-based architecture with hooks and context"
  },
  {
    name: "Node.js",
    category: "Backend",
    level: 85,
    icon: "🟢",
    description: "Server-side development with Express and NestJS"
  },
  {
    name: "Python",
    category: "Backend",
    level: 80,
    icon: "🐍",
    description: "Data processing, automation, and Django development"
  },
  {
    name: "Firebase",
    category: "Database",
    level: 90,
    icon: "🔥",
    description: "Realtime database, authentication, and cloud functions"
  },
  {
    name: "MongoDB",
    category: "Database",
    level: 82,
    icon: "🍃",
    description: "NoSQL database design and querying"
  }
];

// Collection: experienceinfo (multiple documents)
const experienceinfoData = [
  {
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
  {
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
  },
  {
    title: "Junior Web Developer",
    subtitle: "WebCraft Studios",
    period: "2018 - 2019",
    description: "Built and maintained client websites using modern web technologies. Optimized site performance and implemented responsive designs.",
    location: "New York, New York",
    icon: "🔧",
    iconColor: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    technologies: ["HTML/CSS", "JavaScript", "WordPress", "PHP", "MySQL"],
    keyProjects: ["Restaurant Website", "E-commerce Integration"]
  }
];

// Collection: educationinfo (multiple documents)
const educationinfoData = [
  {
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
  {
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
];

// Collection: certificationinfo (multiple documents)
const certificationinfoData = [
  {
    title: "Java Developer Certificate",
    organization: "Scalar TechHub",
    date: "2024-05-10",
    description: "Certified Java Developer with hands-on experience in full-stack applications.",
    logo: "https://example.com/java-cert-logo.png"
  },
  {
    title: "Google Cloud Professional Developer",
    organization: "Google Cloud",
    date: "2023-12-15",
    description: "Validated skills in designing, building, and managing cloud-based applications.",
    logo: "https://example.com/gcp-logo.png"
  },
  {
    title: "AWS Certified Developer",
    organization: "Amazon Web Services",
    date: "2023-08-22",
    description: "Proven expertise in developing and maintaining AWS-based applications.",
    logo: "https://example.com/aws-logo.png"
  }
];

// Collection: contactinfo
const contactinfoData = {
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
};

// Function to initialize all collections
async function initializeFirestoreStructure() {
  try {
    console.log('Starting Firestore initialization for portfolio...');
    
    // Initialize heroinfo collection
    console.log('Initializing heroinfo collection...');
    await db.collection('heroinfo').doc('hero1').set(heroinfoData);
    console.log('✓ heroinfo collection initialized');
    
    // Initialize aboutmeinfo collection
    console.log('Initializing aboutmeinfo collection...');
    await db.collection('aboutmeinfo').doc('about1').set(aboutmeinfoData);
    console.log('✓ aboutmeinfo collection initialized');
    
    // Initialize projectsinfo collection
    console.log('Initializing projectsinfo collection...');
    for (let i = 0; i < projectsinfoData.length; i++) {
      const projectId = `project${i + 1}`;
      await db.collection('projectsinfo').doc(projectId).set(projectsinfoData[i]);
    }
    console.log('✓ projectsinfo collection initialized with', projectsinfoData.length, 'documents');
    
    // Initialize skillsinfo collection
    console.log('Initializing skillsinfo collection...');
    for (let i = 0; i < skillsinfoData.length; i++) {
      const skillId = `skill${i + 1}`;
      await db.collection('skillsinfo').doc(skillId).set(skillsinfoData[i]);
    }
    console.log('✓ skillsinfo collection initialized with', skillsinfoData.length, 'documents');
    
    // Initialize experienceinfo collection
    console.log('Initializing experienceinfo collection...');
    for (let i = 0; i < experienceinfoData.length; i++) {
      const expId = `exp${i + 1}`;
      await db.collection('experienceinfo').doc(expId).set(experienceinfoData[i]);
    }
    console.log('✓ experienceinfo collection initialized with', experienceinfoData.length, 'documents');
    
    // Initialize educationinfo collection
    console.log('Initializing educationinfo collection...');
    for (let i = 0; i < educationinfoData.length; i++) {
      const eduId = `edu${i + 1}`;
      await db.collection('educationinfo').doc(eduId).set(educationinfoData[i]);
    }
    console.log('✓ educationinfo collection initialized with', educationinfoData.length, 'documents');
    
    // Initialize certificationinfo collection
    console.log('Initializing certificationinfo collection...');
    for (let i = 0; i < certificationinfoData.length; i++) {
      const certId = `cert${i + 1}`;
      await db.collection('certificationinfo').doc(certId).set(certificationinfoData[i]);
    }
    console.log('✓ certificationinfo collection initialized with', certificationinfoData.length, 'documents');
    
    // Initialize contactinfo collection
    console.log('Initializing contactinfo collection...');
    await db.collection('contactinfo').doc('contact1').set(contactinfoData);
    console.log('✓ contactinfo collection initialized');
    
    console.log('\n🎉 All Firestore collections initialized successfully!');
    console.log('\nNext steps:');
    console.log('1. Upload your actual images to Firebase Storage');
    console.log('2. Update the image URLs in the documents with actual Firebase Storage URLs');
    console.log('3. Update your Angular components to fetch data from Firestore');
    
    process.exit(0);
  } catch (error) {
    console.error('Error initializing Firestore:', error);
    process.exit(1);
  }
}

// Run the initialization if this script is executed directly
if (require.main === module) {
  initializeFirestoreStructure();
}

module.exports = { initializeFirestoreStructure };