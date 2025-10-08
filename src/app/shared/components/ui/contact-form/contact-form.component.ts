import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  @Input() formData: ContactFormData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  
  @Output() formSubmit = new EventEmitter<ContactFormData>();
  
  contactForm: FormGroup;
  showScrollTop = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    // Show scroll to top button when scrolled down 300px
    this.showScrollTop = window.scrollY > 300;
  }

  scrollToTop() {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.formSubmit.emit(this.contactForm.value);
      this.contactForm.reset();
    }
  }
}