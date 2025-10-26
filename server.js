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

// Mock data - REMOVED duplicated data to keep only in component files
let heroData = {};
let aboutData = {};
let aboutSectionData = {};
let skillsData = [];
let projectsData = [];
let experienceData = [];
let educationData = [];

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