import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionWrapperComponent } from '../../shared/components/layout/section-wrapper/section-wrapper.component';
import { ProjectCardComponent } from '../../shared/components/feature/project-card/project-card.component';
import { Project } from '../../core/models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, SectionWrapperComponent, ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
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
    }
  ];
}