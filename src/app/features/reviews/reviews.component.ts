import { Component, AfterViewInit, OnInit, OnDestroy, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreDataService } from '../../core/firestore-data.service';
import { Review } from '../../core/models';
import { ReviewCardComponent } from './review-card/review-card.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, ReviewCardComponent],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnDestroy {
  public reviews: Review[] = [];
  public loading: boolean = true;
  public error: string | null = null;
  public currentIndex: number = 0;
  private subscription: Subscription = new Subscription();
  
  // Swipe/drag variables
  private startX: number = 0;
  private startY: number = 0;
  private currentX: number = 0;
  private isDragging: boolean = false;
  private dragThreshold: number = 50;
  private mouseMoveListener: (() => void) | null = null;
  private mouseUpListener: (() => void) | null = null;

  constructor(
    private firestoreService: FirestoreDataService,
    private renderer: Renderer2
  ) {
    console.log('[ReviewsComponent] Constructor called - Initializing component');
  }

  ngOnInit(): void {
    console.log('[ReviewsComponent] ngOnInit lifecycle hook called');
    this.loadData();
  }
  
  public loadData(): void {
    console.log('[ReviewsComponent] loadData method called - Starting data fetch process');
    this.loading = true;
    this.error = null;
    console.log('[ReviewsComponent] Loading state set to true, error cleared');
    
    // Try to get data from Firestore
    console.log('[ReviewsComponent] Calling firestoreService.getReviewsData()');
    const sub = this.firestoreService.getReviewsData().subscribe({
      next: (data) => {
        console.log('[ReviewsComponent] SUCCESS: Received data from Firestore service:', data);
        console.log('[ReviewsComponent] Data type:', typeof data);
        console.log('[ReviewsComponent] Data length:', data ? data.length : 'N/A');
        
        if (data && data.length > 0) {
          console.log(`[ReviewsComponent] ${data.length} review items successfully loaded from Firestore`);
          console.log('[ReviewsComponent] First review data:', data[0]);
          console.log('[ReviewsComponent] Assigning data to component reviews array');
          this.reviews = data;
          console.log('[ReviewsComponent] Reviews array updated, length:', this.reviews.length);
        } else {
          console.log('[ReviewsComponent] No review data found in Firestore response');
          console.log('[ReviewsComponent] Data is null or empty array:', data);
          // Even if data is empty, it's not an error - it just means no reviews yet
          this.reviews = [];
        }
        
        console.log('[ReviewsComponent] Setting loading state to false');
        this.loading = false;
        console.log('[ReviewsComponent] Final reviews array:', this.reviews);
        console.log('[ReviewsComponent] Final loading state:', this.loading);
        console.log('[ReviewsComponent] Final error state:', this.error);
      },
      error: (error) => {
        console.error('[ReviewsComponent] ERROR: Error fetching review data from Firestore:', error);
        console.error('[ReviewsComponent] Error type:', typeof error);
        console.error('[ReviewsComponent] Error name:', error.name);
        console.error('[ReviewsComponent] Error message:', error.message);
        console.error('[ReviewsComponent] Error stack:', error.stack);
        
        // Provide a more user-friendly error message
        if (error.message && error.message.includes('permissions')) {
          this.error = 'Unable to load reviews due to permissions issue. This is a configuration problem that needs to be fixed by the site administrator.';
        } else {
          this.error = 'Failed to load review data. Please try again later.';
        }
        this.loading = false;
        console.log('[ReviewsComponent] Error state updated, loading set to false');
      },
      complete: () => {
        console.log('[ReviewsComponent] Firestore data stream completed');
      }
    });
    
    this.subscription.add(sub);
    console.log('[ReviewsComponent] Subscription added to subscription manager');
  }

  ngOnDestroy(): void {
    console.log('[ReviewsComponent] ngOnDestroy called - Cleaning up subscriptions');
    this.subscription.unsubscribe();
    
    // Clean up event listeners
    if (this.mouseMoveListener) {
      this.mouseMoveListener();
    }
    if (this.mouseUpListener) {
      this.mouseUpListener();
    }
    
    console.log('[ReviewsComponent] Subscriptions unsubscribed');
  }
  
  // Navigation methods
  next(): void {
    if (this.currentIndex < this.reviews.length - 1) {
      this.currentIndex++;
    }
  }
  
  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
  
  goToIndex(index: number): void {
    this.currentIndex = index;
  }
  
  // Touch and mouse event handlers for swipe/drag functionality
  onTouchStart(event: TouchEvent): void {
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
    this.isDragging = true;
  }
  
  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    
    this.currentX = event.touches[0].clientX;
    const diffX = this.currentX - this.startX;
    const diffY = event.touches[0].clientY - this.startY;
    
    // Only consider horizontal swipes (ignore vertical scrolling)
    if (Math.abs(diffX) > Math.abs(diffY)) {
      event.preventDefault();
    }
  }
  
  onTouchEnd(event: TouchEvent): void {
    if (!this.isDragging) return;
    
    const diffX = this.currentX - this.startX;
    
    // Only swipe if horizontal movement exceeds threshold
    if (Math.abs(diffX) > this.dragThreshold) {
      if (diffX > 0 && this.currentIndex > 0) {
        // Swipe right - go to previous
        this.prev();
      } else if (diffX < 0 && this.currentIndex < this.reviews.length - 1) {
        // Swipe left - go to next
        this.next();
      }
    }
    
    this.isDragging = false;
  }
  
  onMouseDown(event: MouseEvent): void {
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.isDragging = true;
    
    // Add mouse move and up listeners
    this.mouseMoveListener = this.renderer.listen('document', 'mousemove', this.onMouseMove.bind(this));
    this.mouseUpListener = this.renderer.listen('document', 'mouseup', this.onMouseUp.bind(this));
  }
  
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    
    this.currentX = event.clientX;
    const diffX = this.currentX - this.startX;
    const diffY = event.clientY - this.startY;
    
    // Only consider horizontal drags (ignore vertical scrolling)
    if (Math.abs(diffX) > Math.abs(diffY)) {
      event.preventDefault();
    }
  }
  
  onMouseUp(event: MouseEvent): void {
    if (!this.isDragging) return;
    
    const diffX = this.currentX - this.startX;
    
    // Only swipe if horizontal movement exceeds threshold
    if (Math.abs(diffX) > this.dragThreshold) {
      if (diffX > 0 && this.currentIndex > 0) {
        // Drag right - go to previous
        this.prev();
      } else if (diffX < 0 && this.currentIndex < this.reviews.length - 1) {
        // Drag left - go to next
        this.next();
      }
    }
    
    this.isDragging = false;
  }
}