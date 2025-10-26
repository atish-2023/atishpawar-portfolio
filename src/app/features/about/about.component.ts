import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreDataService } from '../../core/firestore-data.service';
import { AboutSection } from '../../core/models/about-section.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public aboutSection: AboutSection | null = null;
  public loading: boolean = true;
  public error: string | null = null;
  
  constructor(private firestoreService: FirestoreDataService) {}
  
  ngOnInit(): void {
    console.log('[AboutComponent] Initializing component and attempting to fetch data from Firestore');
    this.loadData();
  }
  
  public loadData(): void {
    this.loading = true;
    this.error = null;
    
    // Get data from Firestore
    this.firestoreService.getAboutData().subscribe({
      next: (data) => {
        if (data) {
          console.log('[AboutComponent] Data successfully loaded from Firestore');
          this.aboutSection = data;
        } else {
          console.log('[AboutComponent] No data found in Firestore');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('[AboutComponent] Error fetching data from Firestore:', error);
        this.error = 'Failed to load data from database';
        this.loading = false;
      }
    });
  }
}