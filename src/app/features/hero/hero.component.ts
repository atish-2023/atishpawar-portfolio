import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreDataService } from '../../core/firestore-data.service';
import { Observable } from 'rxjs';
import { HeroData } from '../../core/firestore-data.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  private roles: string[] = ['Software Developer', 'Full Stack Developer', 'Web Developer', 'Problem Solver'];
  private currentRoleIndex = 0;
  private currentText = '';
  private isDeleting = false;
  private typingSpeed = 150;  // Slowed down from 100ms to 150ms
  private deletingSpeed = 100; // Slowed down from 75ms to 100ms
  private pauseTime = 2000;    // Increased pause from 1500ms to 2000ms
  private charIndex = 0;
  private typingInterval: any;
  public loading: boolean = true;
  public error: string | null = null;
  public heroData: HeroData | null = null;

  constructor(private firestoreService: FirestoreDataService) {
    console.log('[HeroComponent] Initializing component and attempting to fetch data from Firestore');
    this.loadData();
  }
  
  public loadData(): void {
    this.loading = true;
    this.error = null;
    
    // Try to get data from Firestore
    this.firestoreService.getHeroData().subscribe({
      next: (data) => {
        if (data) {
          console.log('[HeroComponent] Data successfully loaded from Firestore');
          this.heroData = data;
          // The roles are hardcoded, but we could update them based on Firestore data if needed
        } else {
          console.log('[HeroComponent] No data found in Firestore');
        }
        this.loading = false;
        // Restart typing effect when data loads
        this.resetTypingEffect();
      },
      error: (error) => {
        console.error('[HeroComponent] Error fetching data from Firestore:', error);
        this.error = 'Failed to load hero data';
        console.log('[HeroComponent] Using default roles due to Firestore error');
        this.loading = false;
        // Restart typing effect even on error
        this.resetTypingEffect();
      }
    });
  }

  ngAfterViewInit() {
    // Wait for the content to be rendered (not just loading/error states)
    this.waitForContent();
  }

  ngOnDestroy() {
    if (this.typingInterval) {
      clearTimeout(this.typingInterval);
    }
  }

  private resetTypingEffect(): void {
    // Clear any existing typing interval
    if (this.typingInterval) {
      clearTimeout(this.typingInterval);
    }
    
    // Reset typing effect variables
    this.currentRoleIndex = 0;
    this.charIndex = 0;
    this.currentText = '';
    this.isDeleting = false;
    
    // Restart typing effect
    this.waitForContent();
  }

  private waitForContent(): void {
    const checkExist = setInterval(() => {
      const typingElement = document.querySelector('.typing-text');
      const cursorElement = document.querySelector('.cursor');
      
      if (typingElement && cursorElement && !this.loading && !this.error) {
        clearInterval(checkExist);
        // Initialize the typing effect
        this.currentRoleIndex = 0;
        this.charIndex = 0;
        this.currentText = '';
        this.isDeleting = false;
        this.typeText();
      }
    }, 100);
  }

  private typeText() {
    const typingElement = document.querySelector('.typing-text') as HTMLElement;
    const cursorElement = document.querySelector('.cursor') as HTMLElement;
    
    if (!typingElement || !cursorElement) {
      // Retry after a short delay
      setTimeout(() => this.typeText(), 500);
      return;
    }

    const currentRole = this.roles[this.currentRoleIndex];

    if (this.isDeleting) {
      // Delete characters
      this.currentText = currentRole.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      // Add characters
      this.currentText = currentRole.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    // Update the text content
    typingElement.textContent = this.currentText;

    // Set the cursor position
    cursorElement.style.left = `${typingElement.offsetWidth}px`;

    let typeSpeed = this.typingSpeed;

    if (this.isDeleting) {
      typeSpeed = this.deletingSpeed;
    }

    // Determine next action
    if (!this.isDeleting && this.currentText === currentRole) {
      // Finished typing, pause before deleting
      typeSpeed = this.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentText === '') {
      // Finished deleting, move to next role
      this.isDeleting = false;
      this.currentRoleIndex++;
      if (this.currentRoleIndex >= this.roles.length) {
        this.currentRoleIndex = 0;
      }
    }

    this.typingInterval = setTimeout(() => this.typeText(), typeSpeed);
  }
}