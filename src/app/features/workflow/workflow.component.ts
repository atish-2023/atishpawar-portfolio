import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workflow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss']
})
export class WorkflowComponent {
  workflowSteps = [
    {
      id: 1,
      icon: '📝',
      title: 'Plan',
      description: 'Brainstorming & requirements gathering'
    },
    {
      id: 2,
      icon: '🎨',
      title: 'Design',
      description: 'Wireframes & UI/UX creation'
    },
    {
      id: 3,
      icon: '💻',
      title: 'Develop',
      description: 'Coding using modern tech stacks'
    },
    {
      id: 4,
      icon: '🚀',
      title: 'Deploy',
      description: 'Deployment and hosting'
    },
    {
      id: 5,
      icon: '🔧',
      title: 'Maintain',
      description: 'Monitoring and continuous improvement'
    }
  ];
}