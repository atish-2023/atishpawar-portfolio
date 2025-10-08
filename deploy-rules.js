const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function deployRules() {
  try {
    console.log('Deploying Firestore rules...');
    const { stdout, stderr } = await execAsync('firebase deploy --only firestore:rules');
    
    if (stderr) {
      console.error('Error:', stderr);
      return;
    }
    
    console.log('Success:', stdout);
    console.log('Firestore rules deployed successfully!');
  } catch (error) {
    console.error('Failed to deploy rules:', error.message);
    console.log('Make sure you have Firebase CLI installed and are logged in.');
    console.log('Install Firebase CLI with: npm install -g firebase-tools');
    console.log('Login with: firebase login');
  }
}

deployRules();