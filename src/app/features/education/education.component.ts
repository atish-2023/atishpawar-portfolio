import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineItemComponent } from '../../shared/components/feature/timeline-item/timeline-item.component';
import { FirestoreDataService } from '../../core/firestore-data.service';
import { TimelineItem } from '../../core/models/timeline.model';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, TimelineItemComponent],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  educations: TimelineItem[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private firestoreService: FirestoreDataService) {
    console.log('[EducationComponent] Initializing component and attempting to fetch data from Firestore');
  }

  ngOnInit(): void {
    this.loadData();
  }
  
  loadData(): void {
    this.loading = true;
    this.error = null;
    
    // Try to get data from Firestore
    this.firestoreService.getEducationData().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          console.log(`[EducationComponent] ${data.length} education items successfully loaded from Firestore`);
          this.educations = data;
        } else {
          console.log('[EducationComponent] No education data found in Firestore');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('[EducationComponent] Error fetching education data from Firestore:', error);
        this.error = 'Failed to load education data';
        this.loading = false;
      }
    });
  }
}