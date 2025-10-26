const { initializeFirebase } = require('./firebaseInit');

// Sample reviews data
const reviewsData = [
  {
    id: 'review1',
    name: 'Ganesh Hargude',
    role: 'Project Manager',
    message: 'Atish was instrumental in developing backend solutions, optimizing database performance, and ensuring seamless integration with front-end applications. His technical skills and dedication significantly contributed to the success of our projects.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    company: 'Winners It Solutions',
    date: '2023-10-15'
  },
  {
    id: 'review2',
    name: 'Mahesh Kudale',
    role: 'Scrum Master',
    message: 'Atish demonstrated excellent teamwork and communication skills while adhering to Agile methodologies. He was proactive in addressing challenges and contributed to a collaborative work environment.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/54.jpg',
    company: 'Winners It Solutions',
    date: '2024-02-22'
  },
  {
    id: 'review3',
    name: 'Rujuta Lahane',
    role: 'HR Manager',
    message: 'Atish was a valuable team member, displaying professionalism and a strong work ethic. His ability to adapt to new environments made him a great asset during our projects.',
    rating: 4,
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    company: 'Scalar Techhub Pvt.Ltd',
    date: '2025-10-30'
  },
  {
    id: 'review4',
    name: 'Ajaysingh Pawar',
    role: 'Company Owner',
    message: 'Atish showed remarkable dedication and skill in his role. His contributions helped streamline processes and enhance overall productivity within the team.',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    company: 'Scalar Techhub Pvt.Ltd',
    date: '2025-09-18'
  },
  {
    id: 'review5',
    name: 'Anil Melinmeni',
    role: 'Project Flow Manager',
    message: 'Atish commitment to excellence and teamwork were evident during his time with us. He consistently delivered high-quality work and played a key role in our success.',
    rating: 4,
    image: 'https://randomuser.me/api/portraits/women/45.jpg',
    company: 'Scalar Techhub Pvt.Ltd',
    date: '2025-08-10'
  },
 
];

async function setupReviewsData() {
  try {
    console.log('Setting up Reviews data...');
    
    // Initialize Firebase
    const db = initializeFirebase();
    
    // Delete existing reviews
    const reviewsSnapshot = await db.collection('reviewsinfo').get();
    const batch = db.batch();
    
    reviewsSnapshot.docs.forEach(doc => {
      batch.delete(db.collection('reviewsinfo').doc(doc.id));
    });
    
    await batch.commit();
    console.log('✓ Existing reviews data cleared');
    
    // Add new reviews data
    for (const review of reviewsData) {
      await db.collection('reviewsinfo').doc(review.id).set(review);
      console.log(`✓ Added review: ${review.name}`);
    }
    
    console.log('✓ Reviews data added successfully');
    
  } catch (error) {
    console.error('Error setting up Reviews data:', error);
  }
}

// Run the setup if this script is executed directly
if (require.main === module) {
  setupReviewsData().then(() => {
    console.log('Reviews data setup completed!');
    process.exit(0);
  }).catch(error => {
    console.error('Error in setup:', error);
    process.exit(1);
  });
}

module.exports = { setupReviewsData };