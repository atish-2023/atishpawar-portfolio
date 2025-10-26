const { initializeFirebase } = require('./firebaseInit');

// Skills data from skills.component.ts
const skillsData = [
  {
    name: 'Frontend',
    category: 'Building responsive and interactive user interfaces',
    technologies: [
      { name: 'Angular', level: 85 },
      { name: 'React', level: 90 },
      { name: 'Vue.js', level: 75 },
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 95 },
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 90 }
    ]
  },
  {
    name: 'Backend',
    category: 'Developing robust server-side applications',
    technologies: [
      { name: 'Node.js', level: 88 },
      { name: 'Express', level: 85 },
      { name: 'Java', level: 80 },
      { name: 'Spring', level: 75 },
      { name: 'Python', level: 82 },
      { name: 'RESTful APIs', level: 90 }
    ]
  },
  {
    name: 'Database',
    category: 'Managing and optimizing data storage solutions',
    technologies: [
      { name: 'MongoDB', level: 80 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'MySQL', level: 82 },
      { name: 'Firebase', level: 88 },
      { name: 'Redis', level: 75 }
    ]
  },
  {
    name: 'Tools',
    category: 'Essential tools for development and deployment',
    technologies: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 80 },
      { name: 'AWS', level: 78 },
      { name: 'Firebase', level: 85 },
      { name: 'Jest', level: 82 },
      { name: 'Cypress', level: 75 }
    ]
  }
];

async function setupSkillsData() {
  try {
    console.log('Setting up Skills data...');
    
    // Initialize Firebase
    const db = initializeFirebase();
    
    // Delete existing skills
    const skillsSnapshot = await db.collection('skillsinfo').get();
    const batch = db.batch();
    
    skillsSnapshot.docs.forEach(doc => {
      batch.delete(db.collection('skillsinfo').doc(doc.id));
    });
    
    await batch.commit();
    console.log('✓ Existing skills data cleared');
    
    // Add new skills data
    for (let i = 0; i < skillsData.length; i++) {
      const skillId = `skill${i + 1}`;
      await db.collection('skillsinfo').doc(skillId).set(skillsData[i]);
      console.log(`✓ Added skill category: ${skillsData[i].name}`);
    }
    
    console.log('✓ Skills data added successfully');
    
  } catch (error) {
    console.error('Error setting up Skills data:', error);
  }
}

// Run the setup if this script is executed directly
if (require.main === module) {
  setupSkillsData().then(() => {
    console.log('Skills data setup completed!');
    process.exit(0);
  }).catch(error => {
    console.error('Error in setup:', error);
    process.exit(1);
  });
}

module.exports = { setupSkillsData };