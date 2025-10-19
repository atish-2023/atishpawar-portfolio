const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3008; // Changed to 3008

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist/personal-portfolio')));

// Serve the dark theme portfolio as the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/landing-page.html'));
});

// Mock data
let heroData = {
  title: "Hi, I'm Atish",
  subtitle: "Full Stack Developer",
  intro: "I build exceptional digital experiences that are fast, accessible, visually appealing, and responsive.",
  photoUrl: "",
  ctaText: "View My Work",
  ctaTarget: "projects",
  updatedAt: Date.now()
};

let aboutData = {
  title: "About Me",
  content: "I'm a passionate Full Stack Developer with experience in building web applications using modern technologies. I enjoy creating efficient, scalable, and user-friendly solutions. My expertise includes Angular, React, Node.js, Express, MongoDB, and Firebase. I'm always eager to learn new technologies and improve my skills.",
  photoUrl: "",
  updatedAt: Date.now()
};

let aboutSectionData = {
  profilePhotoUrl: "https://example.com/myphoto.jpg",
  title: "I'm Atish Datattray Pawar",
  content: "I'm a passionate software engineer specialized in building full-stack web applications...",
  skills: [
    {
      name: "Frontend Development",
      description: "Building responsive and modern UI with Angular, React, and Tailwind CSS."
    },
    {
      name: "Backend Development",
      description: "Creating scalable REST APIs using Node.js, Express, and Firebase."
    },
    {
      name: "UI/UX Design",
      description: "Designing user-friendly interfaces with Figma and Adobe XD."
    },
    {
      name: "Cloud Deployment",
      description: "Deploying and managing applications on Firebase, AWS, and Vercel."
    }
  ],
  stats: {
    experience: "5+ Years Experience",
    projects: "20+ Projects Completed",
    satisfaction: "100% Client Satisfaction"
  }
};

let skillsData = [
  {
    id: "1",
    name: "Angular",
    level: 90,
    category: "Frontend",
    icon: "",
    order: 1
  },
  {
    id: "2",
    name: "React",
    level: 85,
    category: "Frontend",
    icon: "",
    order: 2
  },
  {
    id: "3",
    name: "Node.js",
    level: 80,
    category: "Backend",
    icon: "",
    order: 3
  },
  {
    id: "4",
    name: "MongoDB",
    level: 75,
    category: "Database",
    icon: "",
    order: 4
  }
];

let projectsData = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform built with Angular and Node.js",
    tags: ["Angular", "Node.js", "MongoDB"],
    repoUrl: "https://github.com/example/ecommerce",
    liveUrl: "https://example.com/ecommerce",
    images: [],
    featured: true,
    createdAt: Date.now()
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A productivity app for managing tasks and projects",
    tags: ["React", "Express", "PostgreSQL"],
    repoUrl: "https://github.com/example/taskmanager",
    liveUrl: "https://example.com/taskmanager",
    images: [],
    featured: true,
    createdAt: Date.now()
  }
];

let experienceData = [
  {
    id: "1",
    company: "Tech Company Inc.",
    role: "Senior Full Stack Developer",
    period: "2020 - Present",
    description: "Led development of multiple web applications using Angular and Node.js. Mentored junior developers and implemented CI/CD pipelines.",
    technologies: ["Angular", "Node.js", "MongoDB"]
  }
];

let educationData = [
  {
    id: "1",
    institution: "University of Technology",
    degree: "Master of Computer Science",
    period: "2014 - 2016",
    description: "Specialized in Software Engineering and Distributed Systems. Graduated with honors."
  }
];

// API Routes

// Public routes
app.get('/api/hero', (req, res) => {
  res.json(heroData);
});

app.get('/api/about', (req, res) => {
  res.json(aboutData);
});

app.get('/api/about-section', (req, res) => {
  res.json(aboutSectionData);
});

app.put('/api/about-section', (req, res) => {
  try {
    aboutSectionData = { ...req.body };
    res.json(aboutSectionData);
  } catch (error) {
    console.error('Error updating about section:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/skills', (req, res) => {
  res.json(skillsData);
});

app.get('/api/projects', (req, res) => {
  res.json(projectsData);
});

app.get('/api/experience', (req, res) => {
  res.json(experienceData);
});

app.get('/api/education', (req, res) => {
  res.json(educationData);
});

// Admin routes (protected in real implementation)
app.put('/api/hero', (req, res) => {
  try {
    heroData = { ...req.body, updatedAt: Date.now() };
    res.json(heroData);
  } catch (error) {
    console.error('Error updating hero:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/about', (req, res) => {
  try {
    aboutData = { ...req.body, updatedAt: Date.now() };
    res.json(aboutData);
  } catch (error) {
    console.error('Error updating about:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/skills', (req, res) => {
  const newSkill = { ...req.body, id: Date.now().toString() };
  skillsData.push(newSkill);
  res.status(201).json(newSkill);
});

app.patch('/api/skills/:id', (req, res) => {
  const index = skillsData.findIndex(skill => skill.id === req.params.id);
  if (index !== -1) {
    skillsData[index] = { ...skillsData[index], ...req.body };
    res.json(skillsData[index]);
  } else {
    res.status(404).json({ error: 'Skill not found' });
  }
});

app.delete('/api/skills/:id', (req, res) => {
  const index = skillsData.findIndex(skill => skill.id === req.params.id);
  if (index !== -1) {
    skillsData.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Skill not found' });
  }
});

app.post('/api/projects', (req, res) => {
  const newProject = { ...req.body, id: Date.now().toString(), createdAt: Date.now() };
  projectsData.push(newProject);
  res.status(201).json(newProject);
});

app.patch('/api/projects/:id', (req, res) => {
  const index = projectsData.findIndex(project => project.id === req.params.id);
  if (index !== -1) {
    projectsData[index] = { ...projectsData[index], ...req.body };
    res.json(projectsData[index]);
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

app.delete('/api/projects/:id', (req, res) => {
  const index = projectsData.findIndex(project => project.id === req.params.id);
  if (index !== -1) {
    projectsData.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

// Serve Angular app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/personal-portfolio/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});