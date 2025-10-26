const { setupHeroData } = require('./setupHeroData');
const { setupAboutData } = require('./setupAboutData');
const { setupProjectsData } = require('./setupProjectsData');
const { setupSkillsData } = require('./setupSkillsData');
const { setupExperienceData } = require('./setupExperienceData');
const { setupEducationData } = require('./setupEducationData');
const { setupCertificationsData } = require('./setupCertificationsData');
const { setupContactData } = require('./setupContactData');
const { setupReviewsData } = require('./setupReviewsData');

async function setupAllPortfolioData() {
  try {
    console.log('=== Starting Portfolio Firestore Data Setup ===\n');
    
    // Setup each section in order
    await setupHeroData();
    console.log('');
    
    await setupAboutData();
    console.log('');
    
    await setupSkillsData();
    console.log('');
    
    await setupProjectsData();
    console.log('');
    
    await setupExperienceData();
    console.log('');
    
    await setupEducationData();
    console.log('');
    
    await setupCertificationsData();
    console.log('');
    
    await setupContactData();
    console.log('');
    
    await setupReviewsData();
    console.log('');
    
    console.log('=== All Portfolio Data Setup Completed Successfully! ===');
    
  } catch (error) {
    console.error('Error setting up portfolio data:', error);
    process.exit(1);
  }
}

// Run the setup if this script is executed directly
if (require.main === module) {
  setupAllPortfolioData().then(() => {
    console.log('\n🎉 Firestore population completed!');
    process.exit(0);
  }).catch(error => {
    console.error('Error in setup:', error);
    process.exit(1);
  });
}

module.exports = { setupAllPortfolioData };