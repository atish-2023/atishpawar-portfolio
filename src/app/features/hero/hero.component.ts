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
  private text = 'Full Stack Developer';
  private index = 0;
  private isDeleting = false;
  private typingSpeed = 100;
  private deletingSpeed = 50;
  private pauseTime = 1500;

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

    // Calculate current text to display
    const currentText = this.text.substring(0, this.index);
    typingElement.textContent = currentText;

    // Position cursor right after the text
    cursorElement.style.left = `${typingElement.offsetWidth}px`;

    // Determine next action
    if (!this.isDeleting) {
      // Typing forward
      if (this.index < this.text.length) {
        this.index++;
        setTimeout(() => this.typeText(), this.typingSpeed);
      } else {
        // Finished typing, pause before deleting
        setTimeout(() => {
          this.isDeleting = true;
          this.typeText();
        }, this.pauseTime);
      }
    } else {
      // Deleting
      if (this.index > 0) {
        this.index--;
        setTimeout(() => this.typeText(), this.deletingSpeed);
      } else {
        // Finished deleting, pause before typing again
        this.isDeleting = false;
        setTimeout(() => this.typeText(), this.pauseTime / 2);
      }
    }
  }
}