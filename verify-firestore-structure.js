/**
 * Script to verify the Firestore structure for Atish's portfolio website
 * This script shows what collections and documents will be created
 */

// Collection structure as specified
const collectionsStructure = {
  // Collection: heroinfo
  heroinfo: {
    description: "Stores hero section data",
    documents: {
      hero1: {
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
      }
    }
  },
  
  // Collection: aboutmeinfo
  aboutmeinfo: {
    description: "Stores about section data",
    documents: {
      about1: {
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
      }
    }
  },
  
  // Collection: projectsinfo
  projectsinfo: {
    description: "Stores data for projects (multiple documents)",
    documents: {
      project1: {
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
      project2: {
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
      }
    }
  },
  
  // Collection: skillsinfo
  skillsinfo: {
    description: "Stores skillset details",
    documents: {
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
    }
  },
  
  // Collection: experienceinfo
  experienceinfo: {
    description: "Work experience entries",
    documents: {
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
    }
  },
  
  // Collection: educationinfo
  educationinfo: {
    description: "Education background",
    documents: {
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
    }
  },
  
  // Collection: certificationinfo
  certificationinfo: {
    description: "Certifications and achievements",
    documents: {
      cert1: {
        title: "Java Developer Certificate",
        organization: "Scalar TechHub",
        date: "2024-05-10",
        description: "Certified Java Developer with hands-on experience in full-stack applications.",
        logo: "https://example.com/java-cert-logo.png"
      },
      cert2: {
        title: "Google Cloud Professional Developer",
        organization: "Google Cloud",
        date: "2023-12-15",
        description: "Validated skills in designing, building, and managing cloud-based applications.",
        logo: "https://example.com/gcp-logo.png"
      }
    }
  },
  
  // Collection: contactinfo
  contactinfo: {
    description: "Contact details",
    documents: {
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
  }
};

// Function to display the structure
function displayFirestoreStructure() {
  console.log("=== Firestore Structure for Atish's Portfolio ===\n");
  
  console.log("Project ID: personalportfolio-aaade\n");
  
  // Display each collection
  for (const [collectionName, collectionData] of Object.entries(collectionsStructure)) {
    console.log(`📁 Collection: ${collectionName}`);
    console.log(`   Description: ${collectionData.description}`);
    console.log(`   Documents:`);
    
    // Display each document in the collection
    for (const [documentId, documentData] of Object.entries(collectionData.documents)) {
      console.log(`     📄 ${documentId}`);
      
      // Display document fields
      for (const [fieldName, fieldValue] of Object.entries(documentData)) {
        if (Array.isArray(fieldValue)) {
          console.log(`       ${fieldName}: [${fieldValue.length} items]`);
        } else if (typeof fieldValue === 'object' && fieldValue !== null) {
          console.log(`       ${fieldName}: {${Object.keys(fieldValue).length} properties}`);
        } else {
          console.log(`       ${fieldName}: ${typeof fieldValue} = ${JSON.stringify(fieldValue)}`);
        }
      }
      console.log("");
    }
  }
  
  console.log("=== Summary ===");
  console.log("Total collections: 8");
  console.log("Total documents: 13");
  console.log("\nCollections with single document:");
  console.log("- heroinfo");
  console.log("- aboutmeinfo");
  console.log("- contactinfo");
  console.log("\nCollections with multiple documents:");
  console.log("- projectsinfo (2 documents)");
  console.log("- skillsinfo (3 documents)");
  console.log("- experienceinfo (2 documents)");
  console.log("- educationinfo (2 documents)");
  console.log("- certificationinfo (2 documents)");
  
  console.log("\n=== Next Steps ===");
  console.log("1. Generate a service account key from Firebase Console");
  console.log("2. Save it as serviceAccountKey.json in your project directory");
  console.log("3. Run: npm run setup-portfolio-firestore");
  console.log("4. Upload your actual images to Firebase Storage");
  console.log("5. Update URLs in Firestore with actual Firebase Storage URLs");
}

// Run the display function
displayFirestoreStructure();