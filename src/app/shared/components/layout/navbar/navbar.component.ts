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

  // Removed scroll listener and related methods to keep navbar always visible

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