import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillChipComponent } from '../../shared/components/feature/skill-chip/skill-chip.component';
import { SectionWrapperComponent } from '../../shared/components/layout/section-wrapper/section-wrapper.component';

interface Skill {
  name: string;
  category: string;
  technologies: string[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SkillChipComponent, SectionWrapperComponent],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
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
}