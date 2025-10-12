import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  category: string;
  technologies: string[];
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

  getTechTagClass(tech: string, index: number): string {
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
}