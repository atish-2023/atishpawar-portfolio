/**
 * Script to initialize Firestore collections with the correct structure
 * This script creates all the necessary collections for the portfolio website
 */

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// You'll need to provide your own service account key
try {
  // Check if Firebase Admin is already initialized
  admin.initializeApp();
} catch (error) {
  console.log('Firebase Admin already initialized');
}

const db = admin.firestore();

// Collection definitions with proper structure based on website analysis
const collections = {
  aboutmeinfo: [
    {
      id: 'about1',
      profilePhotoUrl: '',
      title: 'About Me',
      content: 'I\'m a passionate developer with expertise in creating modern web applications. With years of experience in both frontend and backend technologies, I specialize in building scalable, efficient solutions that deliver exceptional user experiences.',
      skills: [
        {
          name: 'Frontend Development',
          description: 'Creating responsive and interactive user interfaces'
        },
        {
          name: 'Backend Development',
          description: 'Building robust server-side applications and APIs'
        },
        {
          name: 'Cloud Architecture',
          description: 'Designing scalable cloud solutions'
        },
        {
          name: 'UI/UX Design',
          description: 'Creating intuitive and engaging user experiences'
        }
      ],
      stats: {
        experience: '5+ Years',
        projects: '50+ Projects',
        satisfaction: '98% Client Satisfaction'
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  ],

  projectsinfo: [
    {
      id: 'sample1',
      title: 'Sample Project',
      description: 'A sample project to demonstrate the structure',
      longDescription: 'This is a detailed description of the sample project that showcases the kind of work I do.',
      images: [''],
      tags: ['Angular', 'Firebase', 'TypeScript'],
      repoUrl: '',
      liveUrl: '',
      category: 'Web Application',
      date: new Date().toISOString(),
      featured: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  ],

  certificationinfo: [
    {
      id: 'cert1',
      title: 'Sample Certification',
      organization: 'Certification Body',
      date: new Date().toISOString(),
      description: 'This is a sample certification to demonstrate the structure',
      logo: '',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  ],

  educationinfo: [
    {
      id: 'edu1',
      title: 'Sample Degree',
      subtitle: 'University Name',
      period: '2020 - 2022',
      description: 'This is a sample education entry to demonstrate the structure',
      location: 'City, Country',
      icon: '🎓',
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      coursework: ['Course 1', 'Course 2'],
      achievements: ['Achievement 1', 'Achievement 2'],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  ],

  experienceinfo: [
    {
      id: 'exp1',
      title: 'Sample Position',
      subtitle: 'Company Name',
      period: '2020 - Present',
      description: 'This is a sample work experience entry to demonstrate the structure',
      location: 'City, Country',
      icon: '💼',
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      technologies: ['Technology 1', 'Technology 2'],
      keyProjects: ['Project 1', 'Project 2'],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  ],

  skillsinfo: [
    {
      id: 'skill1',
      name: 'Sample Skill',
      category: 'Frontend',
      level: 80,
      icon: '🔹',
      description: 'This is a sample skill to demonstrate the structure',
      order: 1,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  ],

  contactinfo: [
    {
      id: 'contact1',
      title: 'Get In Touch',
      description: 'Have a project in mind or want to discuss opportunities? Feel free to reach out!',
      phone: '+1 (123) 456-7890',
      email: 'contact@example.com',
      location: 'City, Country',
      socialLinks: {
        github: 'https://github.com/username',
        linkedin: 'https://linkedin.com/in/username',
        twitter: 'https://twitter.com/username',
        instagram: 'https://instagram.com/username'
      },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  ],

  heroinfo: [
    {
      id: 'hero1',
      name: 'Your Name',
      tagline: 'Professional Title',
      description: 'A brief introduction that captures who you are and what you do',
      profileImageUrl: '',
      resumeUrl: '',
      ctaButtons: [
        {
          text: 'View My Work',
          link: '#projects',
          primary: true
        },
        {
          text: 'Get In Touch',
          link: '#contact',
          primary: false
        }
      ],
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  ],

  workflowinfo: [
    {
      id: 'workflow1',
      title: 'My Workflow',
      description: 'From idea to deployment — here\'s how I bring projects to life',
      steps: [
        {
          id: 'step1',
          title: 'Plan',
          description: 'Brainstorming & requirements gathering',
          emoji: '📝'
        },
        {
          id: 'step2',
          title: 'Design',
          description: 'Wireframes & UI/UX creation',
          emoji: '🎨'
        },
        {
          id: 'step3',
          title: 'Develop',
          description: 'Coding using modern tech stacks',
          emoji: '💻'
        },
        {
          id: 'step4',
          title: 'Deploy',
          description: 'Deployment and hosting',
          emoji: '🚀'
        },
        {
          id: 'step5',
          title: 'Maintain',
          description: 'Monitoring and continuous improvement',
          emoji: '🔧'
        }
      ],
      additionalInfo: 'My workflow is iterative and adaptive, ensuring that each project benefits from lessons learned and incorporates the latest best practices in software development and design.',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
  ]
};

/**
 * Function to initialize all Firestore collections
 */
async function initializeCollections() {
  try {
    console.log('Starting Firestore collection initialization...');
    
    // Iterate through each collection
    for (const [collectionName, documents] of Object.entries(collections)) {
      console.log(`Processing collection: ${collectionName}`);
      
      // Create each document in the collection
      for (const doc of documents) {
        await db.collection(collectionName).doc(doc.id).set(doc);
        console.log(`  - Created document: ${doc.id} in ${collectionName}`);
      }
      
      console.log(`Completed collection: ${collectionName}\n`);
    }
    
    console.log('All collections initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing Firestore collections:', error);
    process.exit(1);
  }
}

// Run the initialization if this script is executed directly
if (require.main === module) {
  initializeCollections();
}

module.exports = { collections, initializeCollections };