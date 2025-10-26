const { initializeFirebase } = require('./firebaseInit');

// Projects data matching the Project model
const projectsData = [
    {
        title: 'E-Commerce Platform',
        description: 'A full-featured online shopping platform with payment integration and inventory management.',
        longDescription: 'A comprehensive e-commerce solution with features like user authentication, product catalog, shopping cart, payment processing, and order management.',
        images: [],
        tags: ['Angular', 'Node.js', 'MongoDB'],
        repoUrl: '#',
        liveUrl: '#',
        category: 'Web Application',
        date: new Date().toISOString()
    },
    {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates and team features.',
        longDescription: 'A real-time collaborative task management platform with features like task assignment, progress tracking, team collaboration, and notifications.',
        images: [],
        tags: ['React', 'Express', 'Firebase'],
        repoUrl: '#',
        liveUrl: '#',
        category: 'Productivity',
        date: new Date().toISOString()
    },
    {
        title: 'Personal Portfolio',
        description: 'A modern and responsive personal portfolio website showcasing my projects and skills.',
        longDescription: 'A responsive portfolio website built with modern web technologies to showcase projects, skills, and professional experience with smooth animations and dark mode support.',
        images: [],
        tags: ['Angular', 'Firebase', 'Tailwind CSS'],
        repoUrl: '#',
        liveUrl: '#',
        category: 'Web Application',
        date: new Date().toISOString()
    },
    {
        title: 'Health & Fitness Tracker',
        description: 'A comprehensive health tracking application with workout plans and nutrition guidance.',
        longDescription: 'A health and fitness tracking application that helps users monitor workouts, track nutrition, set goals, and visualize progress with detailed analytics.',
        images: [],
        tags: ['Vue.js', 'Python', 'PostgreSQL'],
        repoUrl: '#',
        liveUrl: '#',
        category: 'Health',
        date: new Date().toISOString()
    },
    {
        title: 'Blog Management Platform',
        description: 'A full-stack blogging site where users can create, edit, and comment on posts with secure authentication.',
        longDescription: 'A full-featured blogging platform with user authentication, rich text editing, comment system, tag management, and responsive design.',
        images: [],
        tags: ['Next.js', 'Firebase', 'Tailwind CSS'],
        repoUrl: '#',
        liveUrl: '#',
        category: 'Content Management',
        date: new Date().toISOString()
    },
    {
        title: 'Chat Application',
        description: 'A real-time chat application with private rooms and group messaging using WebSocket.',
        longDescription: 'A real-time chat application supporting private messaging, group chats, file sharing, and emoji reactions with a clean and intuitive interface.',
        images: [],
        tags: ['React', 'Node.js', 'Socket.io'],
        repoUrl: '#',
        liveUrl: '#',
        category: 'Communication',
        date: new Date().toISOString()
    }
];

async function setupProjectsData() {
    try {
        console.log('Setting up Projects data...');

        // Initialize Firebase
        const db = initializeFirebase();

        // Delete existing projects
        const projectsSnapshot = await db.collection('projectsinfo').get();
        const batch = db.batch();

        projectsSnapshot.docs.forEach(doc => {
            batch.delete(db.collection('projectsinfo').doc(doc.id));
        });

        await batch.commit();
        console.log('✓ Existing projects data cleared');

        // Add new projects data as individual documents
        for (let i = 0; i < projectsData.length; i++) {
            const projectId = `project${i + 1}`;
            await db.collection('projectsinfo').doc(projectId).set(projectsData[i]);
            console.log(`✓ Added project: ${projectsData[i].title}`);
        }

        console.log('✓ Projects data added successfully');

    } catch (error) {
        console.error('Error setting up Projects data:', error);
    }
}

// Run the setup if this script is executed directly
if (require.main === module) {
    setupProjectsData().then(() => {
        console.log('Projects data setup completed!');
        process.exit(0);
    }).catch(error => {
        console.error('Error in setup:', error);
        process.exit(1);
    });
}

module.exports = { setupProjectsData };