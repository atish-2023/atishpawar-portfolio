import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionWrapperComponent } from '../../shared/components/layout/section-wrapper/section-wrapper.component';
import { TimelineItemComponent } from '../../shared/components/feature/timeline-item/timeline-item.component';
import { TimelineItem } from '../../core/models/timeline.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, SectionWrapperComponent, TimelineItemComponent],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  experienceItems: TimelineItem[] = [
    {
      title: 'Senior Full Stack Developer',
      subtitle: 'Tech Company Inc.',
      period: '2020 - Present',
      description: 'Led development of multiple web applications using Angular and Node.js. Mentored junior developers and implemented CI/CD pipelines. Optimized application performance, reducing load times by 40%',
      technologies: ['Angular', 'Node.js', 'MongoDB'],
      isLeftAligned: true
    },
    {
      title: 'Frontend Developer',
      subtitle: 'Digital Agency LLC',
      period: '2018 - 2020',
      description: 'Developed responsive web applications using React and Vue.js. Collaborated with designers to implement pixel-perfect UIs. Implemented state management solutions for complex applications',
      technologies: ['React', 'Vue.js', 'Redux'],
      isLeftAligned: false
    },
    {
      title: 'Junior Web Developer',
      subtitle: 'StartUp Co.',
      period: '2016 - 2018',
      description: 'Built and maintained company website using HTML, CSS, and JavaScript. Assisted in database design and API development. Implemented responsive design principles for mobile compatibility',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      isLeftAligned: true
    }
  ];
}