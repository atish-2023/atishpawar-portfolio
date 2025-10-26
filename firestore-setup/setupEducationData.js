const { initializeFirebase } = require('./firebaseInit');

// Education data from education.component.ts
const educationData = [
  {
    title: 'Master of Computer Science',
    subtitle: 'Savitribai Phule Pune University',
    period: '2024 - present',
    description: 'Specialized in Software Engineering and Distributed Systems. Graduated with honors.',
    location: 'Annasaheb Magar College, Hadapsar  Pune ',
    icon: 'fas fa-graduation-cap',
    iconColor: 'text-blue-400',
    bgColor: 'bg-gradient-to-br from-blue-500/20 to-blue-600/20',
    isLeftAligned: true,
    image: '/assets/sppu.png',
    coursework: [
      'Advanced Algorithms and Data Structures',
      'Distributed Systems Design',
      'Machine Learning Fundamentals',
      'Cloud Computing Architecture'
    ]
  },
  {
    title: 'Bachelor of Computer Science',
    subtitle: 'Savitribai Phule Pune University',
    period: '2021 - 2024',
    description: 'Focused on Web Development and Database Systems. Active in Computer Science Club.',
    location: 'Annasaheb Magar College, Hadapsar  Pune',
    icon: 'fas fa-university',
    iconColor: 'text-purple-400',
    bgColor: 'bg-gradient-to-br from-purple-500/20 to-purple-600/20',
    isLeftAligned: false,
    image: '/assets/sppu.png',
    coursework: [
      'Web Application Development',
      'Database Management Systems',
      'Computer Networks',
      'Software Engineering Principles'
    ]
  },
  {
    title: 'Higher Secondary (12th Grade)',
    subtitle: 'Annasaheb Magar College, Pune',
    period: '2020 - 2021',
    description: 'Completed HSC in Science stream with a focus on Mathematics and Computer Science.',
    location: 'Annasaheb Magar College, Hadapsar  Pune',
    icon: 'fas fa-school',
    iconColor: 'text-cyan-400',
    bgColor: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20',
    isLeftAligned: true,
    image: '/assets/pdea.png'
  },
  {
    title: 'Secondary School (10th Grade)',
    subtitle: 'Nutan Madhayamik Vidyalay KeshavNagar , Pune',
    period: '2018 - 2019',
    description: 'Completed SSC with distinction and developed an early interest in technology.',
    location: 'Annasaheb Magar College, Hadapsar  Pune',
    icon: 'fas fa-book-open',
    iconColor: 'text-pink-400',
    bgColor: 'bg-gradient-to-br from-pink-500/20 to-purple-500/20',
    isLeftAligned: false,
    image: 'src/assets/winnersit.png'
  }
];

async function setupEducationData() {
  try {
    console.log('Setting up Education data...');
    
    // Initialize Firebase
    const db = initializeFirebase();
    
    // Delete existing education
    const educationSnapshot = await db.collection('educationinfo').get();
    const batch = db.batch();
    
    educationSnapshot.docs.forEach(doc => {
      batch.delete(db.collection('educationinfo').doc(doc.id));
    });
    
    await batch.commit();
    console.log('✓ Existing education data cleared');
    
    // Add new education data
    for (let i = 0; i < educationData.length; i++) {
      const eduId = `edu${i + 1}`;
      await db.collection('educationinfo').doc(eduId).set(educationData[i]);
      console.log(`✓ Added education: ${educationData[i].title}`);
    }
    
    console.log('✓ Education data added successfully');
    
  } catch (error) {
    console.error('Error setting up Education data:', error);
  }
}

// Run the setup if this script is executed directly
if (require.main === module) {
  setupEducationData().then(() => {
    console.log('Education data setup completed!');
    process.exit(0);
  }).catch(error => {
    console.error('Error in setup:', error);
    process.exit(1);
  });
}

module.exports = { setupEducationData };