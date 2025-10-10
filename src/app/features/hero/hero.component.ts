import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements AfterViewInit {
  private roles = [
    'Software Developer At Scalar Techhub',
    'Full Stack Developer',
    'Web Developer', 
    
    'Problem Solver'
  ];
  private currentRoleIndex = 0;
  private currentText = '';
  private isDeleting = false;
  private typingSpeed = 100;
  private deletingSpeed = 75;
  private pauseTime = 1500;
  private charIndex = 0;

  ngAfterViewInit() {
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      this.typeText();
    }, 1000);
  }

  private typeText() {
    const typingElement = document.querySelector('.typing-text') as HTMLElement;
    const cursorElement = document.querySelector('.cursor') as HTMLElement;
    if (!typingElement || !cursorElement) return;

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

    setTimeout(() => this.typeText(), typeSpeed);
  }
}