const { initializeFirebase } = require('./firebaseInit');

// Projects data from projects.component.ts
const projectsData = [
    {
        title: 'Blood Bank Management System',
        description: 'A comprehensive Blood Bank Management System developed using Python with SQLite for database management. The project features a responsive user interface built with Bootstrap, HTML, and CSS, along with various other technologies for a complete solution.',
        tags: ['Python', 'SQLite', 'Bootstrap', 'HTML', 'CSS'],
        repoUrl: '#',
        liveUrl: '#'
    },
    {
        title: 'Task Management App',
        description: 'A collaborative task management application with real-time updates and team features.',
        tags: ['React', 'Express', 'Firebase'],
        repoUrl: '#',
        liveUrl: '#'
    },
    {
        title: 'Personal Portfolio',
        description: 'A modern and responsive personal portfolio website showcasing my projects and skills.',
        tags: ['Vue.js', 'Node.js', 'Firebase'],
        repoUrl: '#',
        liveUrl: '#'
    },
    {
        title: 'Health & Fitness Tracker',
        description: 'A comprehensive health tracking application with workout plans and nutrition guidance.',
        tags: ['Vue.js', 'Python', 'PostgreSQL'],
        repoUrl: '#',
        liveUrl: '#'
    },
    {
        title: 'Blog Management Platform',
        description: 'A full-stack blogging site where users can create, edit, and comment on posts with secure authentication.',
        tags: ['Next.js', 'Firebase', 'Tailwind CSS'],
        repoUrl: '#',
        liveUrl: '#'
    },
    {
        title: 'Chat Application',
        description: 'A real-time chat application with private rooms and group messaging using WebSocket.',
        tags: ['React', 'Node.js', 'Socket.io'],
        repoUrl: '#',
        liveUrl: '#'
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

        // Add new projects data
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