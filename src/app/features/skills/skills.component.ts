import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillChipComponent } from '../../shared/components/feature/skill-chip/skill-chip.component';

interface Skill {
  name: string;
  category: string;
  technologies: string[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SkillChipComponent],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements AfterViewInit {
  skills: Skill[] = [
    {
      name: 'Frontend',
      category: 'Building responsive and interactive user interfaces',
      technologies: ['Angular', 'React', 'Vue.js', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript']
    },
    {
      name: 'Backend',
      category: 'Developing robust server-side applications',
      technologies: ['Node.js', 'Express', 'Java', 'Spring', 'Python', 'RESTful APIs']
    },
    {
      name: 'Database',
      category: 'Managing and optimizing data storage solutions',
      technologies: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Redis']
    },
    {
      name: 'Tools',
      category: 'Essential tools for development and deployment',
      technologies: ['Git', 'Docker', 'AWS', 'Firebase', 'Jest', 'Cypress']
    }
  ];

  ngAfterViewInit() {
    // Animation for skill cards on scroll
    const skillCards = document.querySelectorAll('.animate-fade-in-up');
    
    // Immediately show the first few cards without waiting for intersection
    skillCards.forEach((card, index) => {
      if (index < 4) { // Show first row immediately
        setTimeout(() => {
          card.classList.remove('opacity-0');
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
    
    skillCards.forEach(card => {
      observer.observe(card);
    });
  }
}