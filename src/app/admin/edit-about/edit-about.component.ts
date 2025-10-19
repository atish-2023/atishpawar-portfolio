import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService, AboutSection } from '../../core/api.service';

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
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.aboutForm = this.fb.group({
      profilePhotoUrl: [''],
      title: ['', Validators.required],
      content: ['', Validators.required],
      skills: this.fb.array([]),
      stats: this.fb.group({
        experience: [''],
        projects: [''],
        satisfaction: ['']
      })
    });
  }

  ngOnInit(): void {
    this.loadAboutSection();
  }

  loadAboutSection(): void {
    this.apiService.getAboutSection().subscribe({
      next: (aboutSection) => {
        this.aboutForm.patchValue({
          profilePhotoUrl: aboutSection.profilePhotoUrl,
          title: aboutSection.title,
          content: aboutSection.content,
          stats: aboutSection.stats
        });
        
        // Clear existing skills
        this.skills.clear();
        
        // Add skills from API
        aboutSection.skills.forEach(skill => {
          this.skills.push(this.fb.group({
            name: [skill.name, Validators.required],
            description: [skill.description, Validators.required]
          }));
        });
      },
      error: (error) => {
        console.error('Error loading about section:', error);
        this.errorMessage = 'Failed to load about section data. Please make sure the server is running.';
      }
    });
  }

  get skills(): FormArray {
    return this.aboutForm.get('skills') as FormArray;
  }

  addSkill(): void {
    this.skills.push(this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    }));
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  onSubmit(): void {
    if (this.aboutForm.valid) {
      this.submitError = false;
      this.errorMessage = '';
      
      const aboutSection: AboutSection = {
        profilePhotoUrl: this.aboutForm.value.profilePhotoUrl,
        title: this.aboutForm.value.title,
        content: this.aboutForm.value.content,
        skills: this.aboutForm.value.skills,
        stats: this.aboutForm.value.stats
      };
      
      this.apiService.updateAboutSection(aboutSection).subscribe({
        next: (updatedAboutSection) => {
          console.log('About section updated successfully', updatedAboutSection);
          this.isSubmitted = true;
          this.aboutForm.markAsPristine();
          
          // Reset submitted status after 3 seconds
          setTimeout(() => {
            this.isSubmitted = false;
          }, 3000);
        },
        error: (error) => {
          console.error('Error updating about section', error);
          this.submitError = true;
          this.errorMessage = 'Failed to update about section. Please make sure the server is running and try again.';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}