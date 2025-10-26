const { initializeFirebase } = require('./firebaseInit');

// Certification data from certification.component.ts
const certificationsData = [
  {
    title: 'AWS Certified Solutions Architect',
    organization: 'Amazon Web Services',
    date: 'March 2023',
    description: 'Validates ability to design and deploy scalable, highly available, and fault-tolerant systems on AWS.',
    logo: 'assets/aws.png'
  },
  {
    title: 'Google Professional Cloud Developer',
    organization: 'Google Cloud',
    date: 'November 2022',
    description: 'Demonstrates proficiency in designing, building, and managing cloud applications using Google Cloud Platform.',
    logo: 'assets/gcp.png'
  },
  {
    title: 'Certified Kubernetes Administrator',
    organization: 'Cloud Native Computing Foundation',
    date: 'July 2022',
    description: 'Proves expertise in Kubernetes administration, installation, configuration, and management.',
    logo: 'assets/kubernetes.png'
  },
  {
    title: 'Microsoft Certified: Azure Developer',
    organization: 'Microsoft',
    date: 'April 2022',
    description: 'Validates skills in designing, building, testing, and maintaining cloud applications on Azure.',
    logo: 'assets/azure.png'
  },
  {
    title: 'Full Stack Web Development',
    organization: 'University of Technology',
    date: 'January 2021',
    description: 'Comprehensive program covering modern web technologies, frameworks, and best practices.',
    logo: 'assets/university.png'
  },
  {
    title: 'Agile Project Management',
    organization: 'Scrum Alliance',
    date: 'September 2020',
    description: 'Certification in agile methodologies, Scrum framework, and iterative project delivery.',
    logo: 'assets/scrum.png'
  }
];

async function setupCertificationsData() {
  try {
    console.log('Setting up Certifications data...');
    
    // Initialize Firebase
    const db = initializeFirebase();
    
    // Delete existing certifications
    const certificationsSnapshot = await db.collection('certificationinfo').get();
    const batch = db.batch();
    
    certificationsSnapshot.docs.forEach(doc => {
      batch.delete(db.collection('certificationinfo').doc(doc.id));
    });
    
    await batch.commit();
    console.log('✓ Existing certifications data cleared');
    
    // Add new certifications data
    for (let i = 0; i < certificationsData.length; i++) {
      const certId = `cert${i + 1}`;
      await db.collection('certificationinfo').doc(certId).set(certificationsData[i]);
      console.log(`✓ Added certification: ${certificationsData[i].title}`);
    }
    
    console.log('✓ Certifications data added successfully');
    
  } catch (error) {
    console.error('Error setting up Certifications data:', error);
  }
}

// Run the setup if this script is executed directly
if (require.main === module) {
  setupCertificationsData().then(() => {
    console.log('Certifications data setup completed!');
    process.exit(0);
  }).catch(error => {
    console.error('Error in setup:', error);
    process.exit(1);
  });
}

module.exports = { setupCertificationsData };