import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  activeSection = 'hero';
  private lastScrollTop = 0;
  private isScrollingUp = false;
  private ticking = false;

  constructor(private router: Router) {
    console.log('Navbar component loaded');
    
    // Add navigation logging
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Navigation ended to:', event.url);
      }
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    console.log('Mobile menu toggled, is open:', this.isMobileMenuOpen);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Use requestAnimationFrame for better performance
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.updateNavbar();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  updateNavbar() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      const scrollTop = window.scrollY;
      
      // More responsive scroll detection
      if (scrollTop > this.lastScrollTop && scrollTop > 100) {
        // Scrolling down and past 100px - hide navbar
        navbar.classList.remove('translate-y-0', 'opacity-100');
        navbar.classList.add('translate-y-full', 'opacity-0');
      } else if (scrollTop < this.lastScrollTop || scrollTop <= 10) {
        // Scrolling up or near top - show navbar
        navbar.classList.remove('translate-y-full', 'opacity-0');
        navbar.classList.add('translate-y-0', 'opacity-100');
      }
      
      // Update last scroll position
      this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
      
      // Add blur background when scrolled (even slightly)
      if (scrollTop > 5) {
        navbar.classList.remove('nav-transparent');
        navbar.classList.add('nav-solid');
      } else {
        // At top of page - still maintain some transparency and blur
        navbar.classList.remove('nav-solid');
        navbar.classList.add('nav-transparent');
      }
    }
    
    // Update active section based on scroll position
    this.updateActiveSection();
  }

  @HostListener('window:load', ['$event'])
  onWindowLoad() {
    this.updateActiveSection();
  }

  updateActiveSection() {
    const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'education', 'certification', 'workflow', 'contact'];
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;
        
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          this.activeSection = section;
          this.updateActiveLink();
          break;
        }
      }
    }
  }

  updateActiveLink() {
    // Remove active class from all links
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.classList.remove('active');
    });
    
    // Add active class to current section link
    const activeLink = document.querySelector(`a[href="#${this.activeSection}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
}