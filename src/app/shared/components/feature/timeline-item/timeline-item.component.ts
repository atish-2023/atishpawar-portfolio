import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineItem } from '../../../../core/models/timeline.model';

@Component({
  selector: 'app-timeline-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss']
})
export class TimelineItemComponent {
  @Input() item!: TimelineItem;
  
  // Computed properties to move logic from template to component class
  get showLeftCard(): boolean {
    return this.item.isLeftAligned !== false;
  }
  
  get showRightCard(): boolean {
    return this.item.isLeftAligned === false;
  }
  
  get hasLocation(): boolean {
    return !!this.item.location;
  }
  
  get hasTechnologies(): boolean {
    return !!(this.item.technologies && this.item.technologies.length > 0);
  }
  
  get hasImage(): boolean {
    return !!this.item.image;
  }
  
  get hasCoursework(): boolean {
    return !!(this.item.coursework && this.item.coursework.length > 0);
  }
  
  get hasAchievements(): boolean {
    return !!(this.item.achievements && this.item.achievements.length > 0);
  }
  
  get hasKeyProjects(): boolean {
    return !!(this.item.keyProjects && this.item.keyProjects.length > 0);
  }
}