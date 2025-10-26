import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreDataService } from '../../core/firestore-data.service';
import { ContactData } from '../../core/firestore-data.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  private scrollListener: (() => void) | null = null;
  public contactData: ContactData | null = null;
  public loading: boolean = true;
  public error: string | null = null;

  constructor(private firestoreService: FirestoreDataService) {
    console.log('[ContactComponent] Initializing component and attempting to fetch data from Firestore');
    this.loadData();
  }
  
  public loadData(): void {
    this.loading = true;
    this.error = null;
    
    // Try to get data from Firestore
    this.firestoreService.getContactData().subscribe({
      next: (data) => {
        if (data) {
          console.log('[ContactComponent] Contact data successfully loaded from Firestore');
          this.contactData = data;
        } else {
          console.log('[ContactComponent] No contact data found in Firestore');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('[ContactComponent] Error fetching contact data from Firestore:', error);
        this.error = 'Failed to load contact data';
        this.loading = false;
      }
    });
  }

  ngOnInit() {
    // Add scroll event listener
    this.scrollListener = this.onWindowScroll.bind(this);
    window.addEventListener('scroll', this.scrollListener);
  }

  ngOnDestroy() {
    // Clean up event listener
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  onWindowScroll() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
      if (window.scrollY > 300) {
        // Show button with fade-in effect
        scrollTopBtn.classList.remove('opacity-0', 'translate-y-5');
        scrollTopBtn.classList.add('opacity-100', 'translate-y-0');
      } else {
        // Hide button with fade-out effect
        scrollTopBtn.classList.remove('opacity-100', 'translate-y-0');
        scrollTopBtn.classList.add('opacity-0', 'translate-y-5');
      }
    }
  }

  scrollToTop() {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}