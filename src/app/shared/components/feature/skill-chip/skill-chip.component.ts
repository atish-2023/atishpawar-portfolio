import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Technology {
  name: string;
  level: number;
}

interface Skill {
  name: string;
  category: string;
  technologies: Technology[];
}

@Component({
  selector: 'app-skill-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-chip.component.html',
  styleUrls: ['./skill-chip.component.scss']
})
export class SkillChipComponent {
  @Input() skill!: Skill;
  
  // Track which tech is currently being hovered
  hoveredTech: { tech: Technology | null, index: number | null, element: HTMLElement | null } = { tech: null, index: null, element: null };
  
  // Timer to prevent flickering
  private hoverTimer: any = null;

  getIconClass(): string {
    const category = this.skill.name.toLowerCase();
    const iconMap: { [key: string]: string } = {
      'frontend': 'fas fa-window-maximize',
      'backend': 'fas fa-server',
      'database': 'fas fa-database',
      'tools': 'fas fa-tools'
    };
    return iconMap[category] || 'fas fa-laptop-code';
  }

  getIconBackgroundClass(): string {
    const category = this.skill.name.toLowerCase();
    const backgroundMap: { [key: string]: string } = {
      'frontend': 'bg-gradient-to-r from-blue-400 to-cyan-400',
      'backend': 'bg-gradient-to-r from-green-400 to-emerald-400',
      'database': 'bg-gradient-to-r from-amber-400 to-yellow-400',
      'tools': 'bg-gradient-to-r from-rose-400 to-red-400'
    };
    return backgroundMap[category] || 'bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400';
  }

  getTechTagClass(tech: Technology, index: number): string {
    // Define a set of bright, balanced colors from the Tailwind palette
    const colorClasses = [
      'bg-blue-500 hover:bg-blue-600',
      'bg-emerald-500 hover:bg-emerald-600',
      'bg-pink-500 hover:bg-pink-600',
      'bg-yellow-500 hover:bg-yellow-600',
      'bg-purple-500 hover:bg-purple-600',
      'bg-indigo-500 hover:bg-indigo-600',
      'bg-orange-500 hover:bg-orange-600',
      'bg-cyan-500 hover:bg-cyan-600',
      'bg-red-500 hover:bg-red-600',
      'bg-green-500 hover:bg-green-600',
      'bg-teal-500 hover:bg-teal-600',
      'bg-rose-500 hover:bg-rose-600'
    ];
    
    // Use the index to cycle through colors, ensuring each tech gets a unique color
    const colorIndex = index % colorClasses.length;
    return colorClasses[colorIndex];
  }

  // Method to get the circular progress style based on proficiency level
  getCircularProgressStyle(level: number): any {
    const radius = 25;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (level / 100) * circumference;
    
    return {
      'stroke-dasharray': `${circumference} ${circumference}`,
      'stroke-dashoffset': strokeDashoffset
    };
  }
  
  // Get the color class for the progress fill based on the tech index
  getProgressColorClass(index: number | null): string {
    if (index === null) return '';
    
    const colorClasses = [
      'stroke-blue-500',
      'stroke-emerald-500',
      'stroke-pink-500',
      'stroke-yellow-500',
      'stroke-purple-500',
      'stroke-indigo-500',
      'stroke-orange-500',
      'stroke-cyan-500',
      'stroke-red-500',
      'stroke-green-500',
      'stroke-teal-500',
      'stroke-rose-500'
    ];
    
    const colorIndex = index % colorClasses.length;
    return colorClasses[colorIndex];
  }
  
  // Get element position for overlay placement
  getElementPosition(): { x: number, y: number } {
    if (this.hoveredTech.element) {
      const rect = this.hoveredTech.element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
      
      // Position the overlay above and centered on the element
      return {
        x: rect.left + rect.width / 2 + scrollLeft,
        y: rect.top + scrollTop - 10 // 10px above the element
      };
    }
    return { x: 0, y: 0 };
  }
  
  // Handle mouse enter event on tech badge
  onTechHover(tech: Technology, index: number, event: any): void {
    // Clear any existing timer
    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
    }
    
    // Set a small delay to prevent flickering
    this.hoverTimer = setTimeout(() => {
      this.hoveredTech = { tech, index, element: event.target };
    }, 150); // Increased delay to 150ms for better stability
  }

  // Handle mouse leave event on tech badge
  onTechLeave(): void {
    // Clear any existing timer
    if (this.hoverTimer) {
      clearTimeout(this.hoverTimer);
    }
    
    // Set a small delay before hiding to prevent flickering
    this.hoverTimer = setTimeout(() => {
      this.hoveredTech = { tech: null, index: null, element: null };
    }, 150); // Increased delay to 150ms for better stability
  }
}