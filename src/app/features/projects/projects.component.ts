import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../shared/components/feature/project-card/project-card.component';

interface Project {
  title: string;
  description: string;
  tags: string[];
  repoUrl: string;
  liveUrl: string;
  images?: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements AfterViewInit {
  projects: Project[] = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured online shopping platform with payment integration and inventory management.',
      tags: ['Angular', 'Node.js', 'MongoDB'],
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
      title: 'Health & Fitness Tracker',
      description: 'A comprehensive health tracking application with workout plans and nutrition guidance.',
      tags: ['Vue.js', 'Python', 'PostgreSQL'],
      repoUrl: '#',
      liveUrl: '#'
    }
    ,
    {
      title: 'Health & Fitness Tracker',
      description: 'A comprehensive health tracking application with workout plans and nutrition guidance.',
      tags: ['Vue.js', 'Python', 'PostgreSQL'],
      repoUrl: '#',
      liveUrl: '#'
    }
  ];

  ngAfterViewInit() {
    // Animation for project cards on scroll
    const projectCards = document.querySelectorAll('.animate-on-scroll');
    
    // Immediately show the first few cards without waiting for intersection
    projectCards.forEach((card, index) => {
      if (index < 3) { // Show first row immediately
        setTimeout(() => {
          card.classList.remove('opacity-0');
          card.classList.remove('translate-y-5');
          card.classList.add('opacity-100');
          card.classList.add('translate-y-0');
        }, index * 100);
      }
    });
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0');
          entry.target.classList.remove('translate-y-5');
          entry.target.classList.add('opacity-100');
          entry.target.classList.add('translate-y-0');
        }
      });
    }, { threshold: 0.1 });
    
    projectCards.forEach(card => {
      observer.observe(card);
    });
  }
}