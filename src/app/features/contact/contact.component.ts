import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  private scrollListener: (() => void) | null = null;

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