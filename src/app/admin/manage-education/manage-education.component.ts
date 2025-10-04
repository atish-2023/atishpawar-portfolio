import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService, Education } from '../../core/api.service';

@Component({
  selector: 'app-manage-education',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-education.component.html',
  styleUrls: ['./manage-education.component.scss']
})
export class ManageEducationComponent implements OnInit {
  educationForm: FormGroup;
  education: Education[] = [];
  isEditing = false;
  editingEducationId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.educationForm = this.fb.group({
      institution: ['', Validators.required],
      degree: ['', Validators.required],
      period: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEducation();
  }

  loadEducation(): void {
    this.apiService.getEducation().subscribe({
      next: (education) => {
        this.education = education;
      },
      error: (error) => {
        console.error('Error loading education', error);
      }
    });
  }

  onSubmit(): void {
    if (this.educationForm.valid) {
      const educationData: Education = this.educationForm.value;
      
      if (this.isEditing && this.editingEducationId) {
        // Update existing education
        this.apiService.updateEducation(this.editingEducationId, educationData).subscribe({
          next: (updatedEducation) => {
            console.log('Education updated successfully', updatedEducation);
            this.loadEducation(); // Refresh the list
            this.resetForm();
          },
          error: (error) => {
            console.error('Error updating education', error);
          }
        });
      } else {
        // Create new education
        this.apiService.createEducation(educationData).subscribe({
          next: (newEducation) => {
            console.log('Education created successfully', newEducation);
            this.loadEducation(); // Refresh the list
            this.resetForm();
          },
          error: (error) => {
            console.error('Error creating education', error);
          }
        });
      }
    }
  }

  editEducation(education: Education): void {
    this.isEditing = true;
    this.editingEducationId = education.id || null;
    this.educationForm.patchValue(education);
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingEducationId = null;
    this.resetForm();
  }

  deleteEducation(educationId: string): void {
    if (confirm('Are you sure you want to delete this education entry?')) {
      this.apiService.deleteEducation(educationId).subscribe({
        next: () => {
          console.log('Education deleted successfully');
          this.loadEducation(); // Refresh the list
        },
        error: (error) => {
          console.error('Error deleting education', error);
        }
      });
    }
  }

  private resetForm(): void {
    this.educationForm.reset();
    this.isEditing = false;
    this.editingEducationId = null;
  }
}