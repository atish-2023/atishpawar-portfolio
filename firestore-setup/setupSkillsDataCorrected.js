const { initializeFirebase } = require('./firebaseInit');

// Individual skills data matching the Skill model
const skillsData = [
  // Frontend skills
  { name: 'Angular', category: 'Frontend', level: 85, icon: '', description: 'Frontend framework' },
  { name: 'React', category: 'Frontend', level: 90, icon: '', description: 'JavaScript library for UI' },
  { name: 'Vue.js', category: 'Frontend', level: 75, icon: '', description: 'Progressive JavaScript framework' },
  { name: 'HTML5', category: 'Frontend', level: 95, icon: '', description: 'Markup language' },
  { name: 'CSS3', category: 'Frontend', level: 95, icon: '', description: 'Styling language' },
  { name: 'JavaScript', category: 'Frontend', level: 95, icon: '', description: 'Programming language' },
  { name: 'TypeScript', category: 'Frontend', level: 90, icon: '', description: 'Typed JavaScript' },
  
  // Backend skills
  { name: 'Node.js', category: 'Backend', level: 88, icon: '', description: 'JavaScript runtime' },
  { name: 'Express', category: 'Backend', level: 85, icon: '', description: 'Web application framework' },
  { name: 'Java', category: 'Backend', level: 80, icon: '', description: 'Programming language' },
  { name: 'Spring', category: 'Backend', level: 75, icon: '', description: 'Java framework' },
  { name: 'Python', category: 'Backend', level: 82, icon: '', description: 'Programming language' },
  { name: 'RESTful APIs', category: 'Backend', level: 90, icon: '', description: 'API design' },
  
  // Database skills
  { name: 'MongoDB', category: 'Database', level: 80, icon: '', description: 'NoSQL database' },
  { name: 'PostgreSQL', category: 'Database', level: 85, icon: '', description: 'Relational database' },
  { name: 'MySQL', category: 'Database', level: 82, icon: '', description: 'Relational database' },
  { name: 'Firebase', category: 'Database', level: 88, icon: '', description: 'Cloud database' },
  { name: 'Redis', category: 'Database', level: 75, icon: '', description: 'In-memory database' },
  
  // Tools skills
  { name: 'Git', category: 'Tools', level: 90, icon: '', description: 'Version control' },
  { name: 'Docker', category: 'Tools', level: 80, icon: '', description: 'Containerization' },
  { name: 'AWS', category: 'Tools', level: 78, icon: '', description: 'Cloud platform' },
  { name: 'Jest', category: 'Tools', level: 82, icon: '', description: 'Testing framework' },
  { name: 'Cypress', category: 'Tools', level: 75, icon: '', description: 'End-to-end testing' }
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
    
    // Add new skills data as individual documents
    for (let i = 0; i < skillsData.length; i++) {
      const skillId = `skill${i + 1}`;
      await db.collection('skillsinfo').doc(skillId).set(skillsData[i]);
      console.log(`✓ Added skill: ${skillsData[i].name}`);
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