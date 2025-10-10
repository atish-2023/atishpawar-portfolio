import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineItemComponent } from '../../shared/components/feature/timeline-item/timeline-item.component';
import { TimelineItem } from '../../core/models/timeline.model';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, TimelineItemComponent],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent {
  educations: TimelineItem[] = [
    {
      title: 'Master of Computer Science',
      subtitle: 'University of Technology',
      period: '2014 - 2016',
      description: 'Specialized in Software Engineering and Distributed Systems. Graduated with honors.',
      location: 'San Francisco, California',
      icon: 'fas fa-graduation-cap',
      iconColor: 'text-blue-400',
      bgColor: 'bg-gradient-to-br from-blue-500/20 to-blue-600/20',
      isLeftAligned: true,
      image: '/assets/sppu.png',
      coursework: [
        'Advanced Algorithms and Data Structures',
        'Distributed Systems Design',
        'Machine Learning Fundamentals',
        'Cloud Computing Architecture'
      ]
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
      isLeftAligned: false,
      image: '/assets/sppu.png',
      coursework: [
        'Web Application Development',
        'Database Management Systems',
        'Computer Networks',
        'Software Engineering Principles'
      ]
    },
    {
      title: 'Higher Secondary (12th Grade)',
      subtitle: 'Annasaheb Magar College, Pune',
      period: '2008 - 2010',
      description: 'Completed HSC in Science stream with a focus on Mathematics and Computer Science.',
      location: 'Pune, Maharashtra',
      icon: 'fas fa-school',
      iconColor: 'text-cyan-400',
      bgColor: 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20',
      isLeftAligned: true,
      image: '/assets/pdea.png'
    },
    {
      title: 'Secondary School (10th Grade)',
      subtitle: 'Modern High School, Pune',
      period: '2007 - 2008',
      description: 'Completed SSC with distinction and developed an early interest in technology.',
      location: 'Pune, Maharashtra',
      icon: 'fas fa-book-open',
      iconColor: 'text-pink-400',
      bgColor: 'bg-gradient-to-br from-pink-500/20 to-purple-500/20',
      isLeftAligned: false,
      image: 'src/assets/winnersit.png'
    }
  ];
}