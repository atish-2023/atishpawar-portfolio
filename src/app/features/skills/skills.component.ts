import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillChipComponent } from '../../shared/components/feature/skill-chip/skill-chip.component';
import { FirestoreDataService } from '../../core/firestore-data.service';
import { Skill } from '../../core/models/skill.model';
import { Subscription } from 'rxjs';

interface Technology {
  name: string;
  level: number;
}

interface SkillGroup {
  name: string;
  category: string;
  technologies: Technology[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, SkillChipComponent],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements AfterViewInit, OnInit, OnDestroy {
  skills: SkillGroup[] = [];
  
  loading: boolean = true;
  error: string | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private firestoreService: FirestoreDataService) {
    console.log('[SkillsComponent] Initializing component and attempting to fetch data from Firestore');
  }
  
  ngOnInit(): void {
    this.loadData();
  }
  
  loadData(): void {
    this.loading = true;
    this.error = null;
    
    // Try to get data from Firestore
    const sub = this.firestoreService.getSkillsData().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          console.log(`[SkillsComponent] ${data.length} skills successfully loaded from Firestore`);
          // Convert Firestore skills to grouped format
          this.convertFirestoreSkills(data);
        } else {
          console.log('[SkillsComponent] No skills found in Firestore');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('[SkillsComponent] Error fetching skills from Firestore:', error);
        this.error = 'Failed to load skills data';
        this.loading = false;
      }
    });
    
    this.subscription.add(sub);
  }

  private convertFirestoreSkills(firestoreSkills: Skill[]): void {
    // Group skills by category
    const groupedSkills: { [key: string]: SkillGroup } = {};
    
    firestoreSkills.forEach(skill => {
      const category = skill.category || 'Other';
      const technology = { name: skill.name, level: skill.level };
      
      if (!groupedSkills[category]) {
        groupedSkills[category] = {
          name: category,
          category: category,
          technologies: []
        };
      }
      
      // Avoid duplicates
      const exists = groupedSkills[category].technologies.some(
        tech => tech.name === technology.name
      );
      
      if (!exists) {
        groupedSkills[category].technologies.push(technology);
      }
    });
    
    // Convert to array
    this.skills = Object.values(groupedSkills);
    console.log('[SkillsComponent] Converted Firestore skills to grouped format');
  }

  ngAfterViewInit() {
    // ... existing animation code ...
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}