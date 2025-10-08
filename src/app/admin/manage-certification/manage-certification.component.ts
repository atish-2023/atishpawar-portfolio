import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService, Certification } from '../../core/api.service';

@Component({
  selector: 'app-manage-certification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-certification.component.html',
  styleUrls: ['./manage-certification.component.scss']
})
export class ManageCertificationComponent implements OnInit {
  certificationForm: FormGroup;
  certifications: Certification[] = [];
  isEditing = false;
  editingCertificationId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.certificationForm = this.fb.group({
      name: ['', Validators.required],
      issuer: ['', Validators.required],
      date: ['', Validators.required],
      description: ['', Validators.required],
      link: ['']
    });
  }

  ngOnInit(): void {
    this.loadCertifications();
  }

  loadCertifications(): void {
    this.apiService.getCertifications().subscribe({
      next: (certifications: Certification[]) => {
        this.certifications = certifications;
      },
      error: (error: any) => {
        console.error('Error loading certifications', error);
      }
    });
  }

  onSubmit(): void {
    if (this.certificationForm.valid) {
      const certificationData: Certification = this.certificationForm.value;
      
      if (this.isEditing && this.editingCertificationId) {
        // Update existing certification
        this.apiService.updateCertification(this.editingCertificationId, certificationData).subscribe({
          next: (updatedCertification: Certification) => {
            console.log('Certification updated successfully', updatedCertification);
            this.loadCertifications(); // Refresh the list
            this.resetForm();
          },
          error: (error: any) => {
            console.error('Error updating certification', error);
          }
        });
      } else {
        // Create new certification
        this.apiService.createCertification(certificationData).subscribe({
          next: (newCertification: Certification) => {
            console.log('Certification created successfully', newCertification);
            this.loadCertifications(); // Refresh the list
            this.resetForm();
          },
          error: (error: any) => {
            console.error('Error creating certification', error);
          }
        });
      }
    }
  }

  editCertification(certification: Certification): void {
    this.isEditing = true;
    this.editingCertificationId = certification.id || null;
    this.certificationForm.patchValue(certification);
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingCertificationId = null;
    this.resetForm();
  }

  deleteCertification(certificationId: string): void {
    if (confirm('Are you sure you want to delete this certification?')) {
      this.apiService.deleteCertification(certificationId).subscribe({
        next: () => {
          console.log('Certification deleted successfully');
          this.loadCertifications(); // Refresh the list
        },
        error: (error: any) => {
          console.error('Error deleting certification', error);
        }
      });
    }
  }

  private resetForm(): void {
    this.certificationForm.reset();
    this.isEditing = false;
    this.editingCertificationId = null;
  }
}