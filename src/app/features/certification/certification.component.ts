import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreDataService } from '../../core/firestore-data.service';
import { CertificationData } from '../../core/firestore-data.service';

@Component({
  selector: 'app-certification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent implements OnInit {
  certifications: CertificationData[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private firestoreService: FirestoreDataService) {
    console.log('[CertificationComponent] Initializing component and attempting to fetch data from Firestore');
  }

  ngOnInit(): void {
    this.loadData();
  }
  
  loadData(): void {
    this.loading = true;
    this.error = null;
    
    // Try to get data from Firestore
    this.firestoreService.getCertificationsData().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          console.log(`[CertificationComponent] ${data.length} certifications successfully loaded from Firestore`);
          this.certifications = data;
        } else {
          console.log('[CertificationComponent] No certifications found in Firestore');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('[CertificationComponent] Error fetching certifications from Firestore:', error);
        this.error = 'Failed to load certifications data';
        this.loading = false;
      }
    });
  }
}