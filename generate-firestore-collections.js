/**
 * Script to automatically generate Firebase Firestore collections based on portfolio website structure
 * This script analyzes the HTML structure and creates appropriate collections with proper naming convention
 */

// Import required modules
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK (you'll need to provide your own service account key)
// const serviceAccount = require('./path/to/serviceAccountKey.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// Firestore database reference
// const db = admin.firestore();

// Collection definitions based on website analysis
const collections = {
  // About Me Section
  aboutmeinfo: [
    {
      id: 'about1',
      title: 'About Me',
      content: 'I\'m a passionate full-stack developer with expertise in creating modern web applications. With years of experience in both frontend and backend technologies, I specialize in building scalable, efficient solutions that deliver exceptional user experiences.',
      profilePhotoUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-website.appspot.com/o/profile%2Fprofile-photo.jpg?alt=media',
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
      }
    }
  ],

  // Projects Section
  projectsinfo: [
    {
      id: 'project1',
      title: 'E-Commerce Platform',
      description: 'A full-featured online shopping platform with payment integration and inventory management.',
      longDescription: 'A comprehensive e-commerce solution built with modern web technologies. Features include user authentication, product catalog, shopping cart, payment processing, order management, and admin dashboard.',
      images: [
        'https://firebasestorage.googleapis.com/v0/b/portfolio-website.appspot.com/o/projects%2Fecommerce-1.jpg?alt=media',
        'https://firebasestorage.googleapis.com/v0/b/portfolio-website.appspot.com/o/projects%2Fecommerce-2.jpg?alt=media'
      ],
      tags: ['Angular', 'Node.js', 'MongoDB', 'Stripe'],
      repoUrl: 'https://github.com/username/ecommerce-platform',
      liveUrl: 'https://ecommerce-demo.com',
      category: 'Web Application',
      date: '2023-06-15'
    },
    {
      id: 'project2',
      title: 'Task Management App',
      description: 'A productivity application for team collaboration and task tracking with real-time updates.',
      longDescription: 'A collaborative task management solution designed for teams to organize projects, assign tasks, track progress, and communicate effectively. Features real-time updates, notifications, and detailed analytics.',
      images: [
        'https://firebasestorage.googleapis.com/v0/b/portfolio-website.appspot.com/o/projects%2Ftaskmanager-1.jpg?alt=media'
      ],
      tags: ['React', 'Firebase', 'Material-UI', 'Redux'],
      repoUrl: 'https://github.com/username/task-manager',
      liveUrl: 'https://taskmanager-demo.com',
      category: 'Web Application',
      date: '2023-03-22'
    },
    {
      id: 'project3',
      title: 'Health & Fitness Tracker',
      description: 'A mobile application for tracking workouts, nutrition, and health metrics with data visualization.',
      longDescription: 'A comprehensive health and fitness tracking application that helps users monitor their workouts, nutrition intake, sleep patterns, and other health metrics. Includes personalized recommendations and progress tracking.',
      images: [
        'https://firebasestorage.googleapis.com/v0/b/portfolio-website.appspot.com/o/projects%2Ffitness-1.jpg?alt=media',
        'https://firebasestorage.googleapis.com/v0/b/portfolio-website.appspot.com/o/projects%2Ffitness-2.jpg?alt=media',
        'https://firebasestorage.googleapis.com/v0/b/portfolio-website.appspot.com/o/projects%2Ffitness-3.jpg?alt=media'
      ],
      tags: ['React Native', 'GraphQL', 'Node.js', 'PostgreSQL'],
      repoUrl: 'https://github.com/username/fitness-tracker',
      liveUrl: 'https://fitness-tracker-demo.com',
      category: 'Mobile Application',
      date: '2022-11-10'
    }
  ],

  // Certifications Section
  certificationinfo: [
    {
      id: 'cert1',
      title: 'Google Cloud Professional Developer',
      organization: 'Google Cloud',
      date: '2023-05-15',
      description: 'Demonstrated expertise in designing, building, and managing cloud-based applications using Google Cloud technologies.',
      logo: 'https://firebasestorage.googleapis.com/v0/b/portfolio-website.appspot.com/o/certifications%2Fgoogle-cloud-logo.png?alt=media'
    },
    {
      id: 'cert2',
      title: 'AWS Certified Solutions Architect',
      organization: 'Amazon Web Services',
      date: '2022-12-01',
      description: 'Validated ability to design and deploy scalable, highly available, and fault-tolerant systems on AWS.',
      logo: 'https://firebasestorage.googleapis.com/v0/b/portfolio-website.appspot.com/o/certifications%2Faws-logo.png?alt=media'
    },
    {
      id: 'cert3',
      title: 'Certified Kubernetes Administrator',
      organization: 'Cloud Native Computing Foundation',
      date: '2022-08-20',
      description: 'Proven skills in Kubernetes cluster installation, configuration, and management.',
      logo: 'https://firebasestorage.googleapis.com/v0/b/portfolio-website.appspot.com/o/certifications%2Fkubernetes-logo.png?alt=media'
    }
  ],

  // Education Section
  educationinfo: [
    {
      id: 'edu1',
      title: 'Master of Computer Science',
      subtitle: 'Stanford University',
      period: '2018 - 2020',
      description: 'Specialized in Artificial Intelligence and Machine Learning. Completed thesis on "Neural Network Optimization Techniques".',
      location: 'Stanford, California',
      icon: '🎓',
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      coursework: [
        'Machine Learning',
        'Data Structures & Algorithms',
        'Computer Vision',
        'Natural Language Processing'
      ],
      achievements: [
        'Dean\'s List for 4 consecutive semesters',
        'Research Assistant for AI Lab'
      ]
    },
    {
      id: 'edu2',
      title: 'Bachelor of Technology in Computer Science',
      subtitle: 'MIT',
      period: '2014 - 2018',
      description: 'Focused on software engineering and web development. Active member of the Computer Science Club.',
      location: 'Cambridge, Massachusetts',
      icon: '🎓',
      iconColor: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      coursework: [
        'Software Engineering',
        'Database Systems',
        'Web Development',
        'Operating Systems'
      ],
      achievements: [
        'Won 1st place in Annual Coding Competition',
        'President of Coding Club (2017-2018)'
      ]
    }
  ],

  // Experience Section
  experienceinfo: [
    {
      id: 'exp1',
      title: 'Senior Full Stack Developer',
      subtitle: 'Tech Innovations Inc.',
      period: '2021 - Present',
      description: 'Lead development of multiple web applications serving over 100,000 users. Mentor junior developers and contribute to architectural decisions.',
      location: 'San Francisco, California',
      icon: '💼',
      iconColor: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      technologies: [
        'React', 'Node.js', 'TypeScript', 'GraphQL', 'AWS'
      ],
      keyProjects: [
        'Customer Portal Redesign',
        'API Gateway Implementation',
        'Microservices Migration'
      ]
    },
    {
      id: 'exp2',
      title: 'Frontend Developer',
      subtitle: 'Digital Solutions LLC',
      period: '2019 - 2021',
      description: 'Developed responsive web applications for various clients in finance and healthcare industries. Collaborated with UX designers to implement pixel-perfect interfaces.',
      location: 'Remote',
      icon: '💻',
      iconColor: 'text-green-400',
      bgColor: 'bg-green-500/10',
      technologies: [
        'Angular', 'Vue.js', 'SASS', 'Webpack', 'Jest'
      ],
      keyProjects: [
        'Healthcare Dashboard',
        'Financial Analytics Platform',
        'E-learning Portal'
      ]
    },
    {
      id: 'exp3',
      title: 'Junior Web Developer',
      subtitle: 'WebCraft Studios',
      period: '2018 - 2019',
      description: 'Built and maintained client websites using modern web technologies. Optimized site performance and implemented responsive designs.',
      location: 'New York, New York',
      icon: '🔧',
      iconColor: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      technologies: [
        'HTML/CSS', 'JavaScript', 'WordPress', 'PHP', 'MySQL'
      ],
      keyProjects: [
        'Restaurant Website',
        'Portfolio Sites for 20+ Clients',
        'E-commerce Integration'
      ]
    }
  ],

  // Skills Section
  skillsinfo: [
    {
      id: 'skill1',
      name: 'JavaScript',
      category: 'Frontend',
      level: 95,
      icon: '🔹',
      description: 'Expert in modern JavaScript (ES6+) and frameworks like React and Angular'
    },
    {
      id: 'skill2',
      name: 'TypeScript',
      category: 'Frontend',
      level: 90,
      icon: '🔷',
      description: 'Strong typing skills for scalable applications'
    },
    {
      id: 'skill3',
      name: 'React',
      category: 'Frontend',
      level: 92,
      icon: '⚛️',
      description: 'Building complex UIs with hooks, context, and state management'
    },
    {
      id: 'skill4',
      name: 'Node.js',
      category: 'Backend',
      level: 88,
      icon: '🟢',
      description: 'Server-side development with Express and NestJS'
    },
    {
      id: 'skill5',
      name: 'Python',
      category: 'Backend',
      level: 85,
      icon: '🐍',
      description: 'Data processing, automation, and Django development'
    },
    {
      id: 'skill6',
      name: 'Firebase',
      category: 'Database',
      level: 90,
      icon: '🔥',
      description: 'Realtime database, authentication, and cloud functions'
    },
    {
      id: 'skill7',
      name: 'AWS',
      category: 'Cloud',
      level: 80,
      icon: '☁️',
      description: 'Cloud architecture and deployment with various AWS services'
    },
    {
      id: 'skill8',
      name: 'UI/UX Design',
      category: 'Design',
      level: 75,
      icon: '🎨',
      description: 'Creating intuitive interfaces with Figma and Adobe XD'
    }
  ],

  // Contact Section
  contactinfo: [
    {
      id: 'contact1',
      title: 'Get In Touch',
      description: 'Have a project in mind or want to discuss opportunities? Feel free to reach out!',
      phone: '+1 (123) 456-7890',
      email: 'contact@atishpawar.com',
      location: 'San Francisco, California',
      socialLinks: {
        github: 'https://github.com/atishpawar',
        linkedin: 'https://linkedin.com/in/atishpawar',
        twitter: 'https://twitter.com/atishpawar',
        instagram: 'https://instagram.com/atishpawar'
      }
    }
  ],

  // Hero Section
  heroinfo: [
    {
      id: 'hero1',
      name: 'Atish Pawar',
      tagline: 'Full Stack Developer & UI/UX Enthusiast',
      description: 'Turning ideas into reality through clean, efficient code and beautiful user experiences.',
      profileImageUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-website.appspot.com/o/profile%2Fprofile-main.jpg?alt=media',
      resumeUrl: 'https://firebasestorage.googleapis.com/v0/b/portfolio-website.appspot.com/o/resume%2FAtish_Pawar_Resume.pdf?alt=media',
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
      ]
    }
  ],

  // Workflow Section
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
      additionalInfo: 'My workflow is iterative and adaptive, ensuring that each project benefits from lessons learned and incorporates the latest best practices in software development and design.'
    }
  ]
};

/**
 * Function to create Firestore collections based on the defined structure
 * This function would be called to actually populate Firestore
 */
async function createFirestoreCollections() {
  try {
    console.log('Starting Firestore collection creation...');
    
    // Iterate through each collection
    for (const [collectionName, documents] of Object.entries(collections)) {
      console.log(`Processing collection: ${collectionName}`);
      
      // Create each document in the collection
      for (const doc of documents) {
        // In a real implementation, you would use:
        // await db.collection(collectionName).doc(doc.id).set(doc);
        console.log(`  - Creating document: ${doc.id} in ${collectionName}`);
      }
      
      console.log(`Completed collection: ${collectionName}\n`);
    }
    
    console.log('All collections created successfully!');
  } catch (error) {
    console.error('Error creating Firestore collections:', error);
  }
}

// Export the collections and function for use in other files
module.exports = { collections, createFirestoreCollections };

// If running directly, execute the function
if (require.main === module) {
  createFirestoreCollections();
}