import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService, About } from '../../core/api.service';

@Component({
  selector: 'app-edit-about',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.scss']
})
export class EditAboutComponent implements OnInit {
  aboutForm: FormGroup;
  isSubmitted = false;
  submitError = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.aboutForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      photoUrl: ['']
    });
  }

  ngOnInit(): void {
    this.apiService.getAbout().subscribe(about => {
      this.aboutForm.patchValue(about);
    });
  }

  onSubmit(): void {
    if (this.aboutForm.valid) {
      this.submitError = false;
      
      const about: About = {
        ...this.aboutForm.value,
        updatedAt: Date.now()
      };
      
      this.apiService.updateAbout(about).subscribe({
        next: (updatedAbout) => {
          console.log('About updated successfully', updatedAbout);
          this.isSubmitted = true;
          this.aboutForm.markAsPristine();
          
          // Reset submitted status after 3 seconds
          setTimeout(() => {
            this.isSubmitted = false;
          }, 3000);
        },
        error: (error) => {
          console.error('Error updating about', error);
          this.submitError = true;
        }
      });
    }
  }
}