const { initializeFirebase } = require('./firebaseInit');

// Experience data from experience.component.ts
const experienceData = [
  {
    title: 'Full Stack Developer',
    subtitle: 'Scalar Techhub Pvt. Ltd.',
    period: 'May 2025 - Present',
    description: 'Led development of multiple web applications using Angular and Node.js. Optimized application performance, reducing load times by 40%. I worked on frontend technologies like CMS, Angular, Firebase, Git & GitHub and more.',
    technologies: ['Angular', 'Node.js','Express js','Firebase','Typescript', 'MongoDB','Tailwind Css', 'CMS','Git & GitHub'],
    isLeftAligned: false,
    image: 'src/assets/scalartechhub.png'
  },
  {
    title: 'PHP Developer',
    subtitle: 'Winners It Solution',
    period: 'Aug 2025 - Apr 2024',
    description: 'Developed responsive web applications using Angular and PHP. Collaborated with designers to implement pixel-perfect UIs. Implemented state management solutions for complex applications.',
    technologies: ['Angular', 'PHP', 'Html', 'Css', 'Javascript', 'MySql' ,'PostgreSQL'],
    isLeftAligned: true,
    image: 'src/assets/winnersit.png'
  },

];

async function setupExperienceData() {
  try {
    console.log('Setting up Experience data...');

    // Initialize Firebase
    const db = initializeFirebase();

    // Delete existing experience
    const experienceSnapshot = await db.collection('experienceinfo').get();
    const batch = db.batch();

    experienceSnapshot.docs.forEach(doc => {
      batch.delete(db.collection('experienceinfo').doc(doc.id));
    });

    await batch.commit();
    console.log('✓ Existing experience data cleared');

    // Add new experience data
    for (let i = 0; i < experienceData.length; i++) {
      const expId = `exp${i + 1}`;
      await db.collection('experienceinfo').doc(expId).set(experienceData[i]);
      console.log(`✓ Added experience: ${experienceData[i].title}`);
    }

    console.log('✓ Experience data added successfully');

  } catch (error) {
    console.error('Error setting up Experience data:', error);
  }
}

// Run the setup if this script is executed directly
if (require.main === module) {
  setupExperienceData().then(() => {
    console.log('Experience data setup completed!');
    process.exit(0);
  }).catch(error => {
    console.error('Error in setup:', error);
    process.exit(1);
  });
}

module.exports = { setupExperienceData };