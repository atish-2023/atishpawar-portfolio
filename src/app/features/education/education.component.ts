import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionWrapperComponent } from '../../shared/components/layout/section-wrapper/section-wrapper.component';
import { TimelineItemComponent } from '../../shared/components/feature/timeline-item/timeline-item.component';
import { TimelineItem } from '../../core/models/timeline.model';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, SectionWrapperComponent, TimelineItemComponent],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
  educationItems: TimelineItem[] = [
    {
      title: 'Master of Computer Science',
      subtitle: 'University of Technology',
      period: '2014 - 2016',
      description: 'Specialized in Software Engineering and Distributed Systems. Graduated with honors.',
      location: 'San Francisco, California',
      icon: 'fas fa-graduation-cap',
      iconColor: 'text-blue-400',
      bgColor: 'bg-gradient-to-br from-blue-500/20 to-blue-600/20',
      isLeftAligned: true
    },
    {
      title: 'Bachelor of Computer Science',
      subtitle: 'State University',
      period: '2010 - 2014',
      description: 'Focused on Web Development and Database Systems. Active in Computer Science Club.',
      location: 'Los Angeles, California',
      icon: 'fas fa-university',
      iconColor: 'text-purple-400',
      bgColor: 'bg-gradient-to-br from-purple-500/20 to-purple-600/20',
      isLeftAligned: false
    }
  ];
}