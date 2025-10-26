import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Review } from '../../../core/models/review.model';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent implements OnInit {
  @Input() review!: Review;
  
  ngOnInit() {
    console.log('[ReviewCardComponent] ngOnInit called');
    console.log('[ReviewCardComponent] Review data received:', this.review);
    console.log('[ReviewCardComponent] Review ID:', this.review?.id);
    console.log('[ReviewCardComponent] Review name:', this.review?.name);
  }
  
  getStars(rating: number): boolean[] {
    console.log('[ReviewCardComponent] getStars called with rating:', rating);
    const stars = Array(5).fill(false).map((_, i) => i < rating);
    console.log('[ReviewCardComponent] Stars array generated:', stars);
    return stars;
  }
}