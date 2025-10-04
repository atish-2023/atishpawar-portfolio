import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService, Experience } from '../../core/api.service';

@Component({
  selector: 'app-manage-experience',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-experience.component.html',
  styleUrls: ['./manage-experience.component.scss']
})
export class ManageExperienceComponent implements OnInit {
  experienceForm: FormGroup;
  experiences: Experience[] = [];
  isEditing = false;
  editingExperienceId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.experienceForm = this.fb.group({
      company: ['', Validators.required],
      role: ['', Validators.required],
      period: ['', Validators.required],
      description: ['', Validators.required],
      technologies: ['']
    });
  }

  ngOnInit(): void {
    this.loadExperiences();
  }

  loadExperiences(): void {
    this.apiService.getExperience().subscribe({
      next: (experiences) => {
        this.experiences = experiences;
      },
      error: (error) => {
        console.error('Error loading experiences', error);
      }
    });
  }

  onSubmit(): void {
    if (this.experienceForm.valid) {
      // Process technologies
      const formValue = this.experienceForm.value;
      const experienceData: Experience = {
        ...formValue,
        technologies: formValue.technologies ? formValue.technologies.split(',').map((tech: string) => tech.trim()).filter((tech: string) => tech) : []
      };
      
      if (this.isEditing && this.editingExperienceId) {
        // Update existing experience
        this.apiService.updateExperience(this.editingExperienceId, experienceData).subscribe({
          next: (updatedExperience) => {
            console.log('Experience updated successfully', updatedExperience);
            this.loadExperiences(); // Refresh the list
            this.resetForm();
          },
          error: (error) => {
            console.error('Error updating experience', error);
          }
        });
      } else {
        // Create new experience
        this.apiService.createExperience(experienceData).subscribe({
          next: (newExperience) => {
            console.log('Experience created successfully', newExperience);
            this.loadExperiences(); // Refresh the list
            this.resetForm();
          },
          error: (error) => {
            console.error('Error creating experience', error);
          }
        });
      }
    }
  }

  editExperience(experience: Experience): void {
    this.isEditing = true;
    this.editingExperienceId = experience.id || null;
    
    // Format technologies for the form
    const formValue = {
      ...experience,
      technologies: experience.technologies ? experience.technologies.join(', ') : ''
    };
    
    this.experienceForm.patchValue(formValue);
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingExperienceId = null;
    this.resetForm();
  }

  deleteExperience(experienceId: string): void {
    if (confirm('Are you sure you want to delete this experience entry?')) {
      this.apiService.deleteExperience(experienceId).subscribe({
        next: () => {
          console.log('Experience deleted successfully');
          this.loadExperiences(); // Refresh the list
        },
        error: (error) => {
          console.error('Error deleting experience', error);
        }
      });
    }
  }

  private resetForm(): void {
    this.experienceForm.reset();
    this.isEditing = false;
    this.editingExperienceId = null;
  }
}