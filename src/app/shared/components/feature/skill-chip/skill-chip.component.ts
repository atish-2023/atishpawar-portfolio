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
}