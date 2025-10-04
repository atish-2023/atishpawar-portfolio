import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-wrapper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-wrapper.component.html',
  styleUrls: ['./section-wrapper.component.scss']
})
export class SectionWrapperComponent {
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() backgroundColor: 'slate-900' | 'slate-800' | 'none' = 'none';
  
  get backgroundColorClass(): string {
    switch (this.backgroundColor) {
      case 'slate-900':
        return 'bg-slate-900';
      case 'slate-800':
        return 'bg-slate-800';
      default:
        return '';
    }
  }
}