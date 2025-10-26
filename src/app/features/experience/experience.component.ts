import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineItemComponent } from '../../shared/components/feature/timeline-item/timeline-item.component';
import { FirestoreDataService } from '../../core/firestore-data.service';
import { Observable } from 'rxjs';
import { TimelineItem } from '../../core/models/timeline.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, TimelineItemComponent],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  public experiences: TimelineItem[] = [];
  public loading: boolean = true;
  public error: string | null = null;

  constructor(private firestoreService: FirestoreDataService) {
    console.log('[ExperienceComponent] Initializing component and attempting to fetch data from Firestore');
  }

  ngOnInit(): void {
    this.loadData();
  }
  
  public loadData(): void {
    this.loading = true;
    this.error = null;
    
    // Try to get data from Firestore
    this.firestoreService.getExperienceData().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          console.log(`[ExperienceComponent] ${data.length} experience items successfully loaded from Firestore`);
          this.experiences = data;
        } else {
          console.log('[ExperienceComponent] No experience data found in Firestore');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('[ExperienceComponent] Error fetching experience data from Firestore:', error);
        this.error = 'Failed to load experience data';
        this.loading = false;
      }
    });
  }
}