import { Component, OnInit } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService, Project } from '../../core/api.service';

@Component({
  selector: 'app-manage-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SlicePipe],
  templateUrl: './manage-projects.component.html',
  styleUrls: ['./manage-projects.component.scss']
})
export class ManageProjectsComponent implements OnInit {
  projectForm: FormGroup;
  projects: Project[] = [];
  isEditing = false;
  editingProjectId: string | null = null;
  selectedFiles: File[] = [];
  isUploading = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tags: [''],
      repoUrl: [''],
      liveUrl: [''],
      images: [''],
      featured: [false]
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.selectedFiles = [];
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
  }

  loadProjects(): void {
    this.apiService.getProjects().subscribe({
      next: (projects) => {
        this.projects = projects;
      },
      error: (error) => {
        console.error('Error loading projects', error);
      }
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      // First upload files if any are selected
      if (this.selectedFiles.length > 0) {
        this.isUploading = true;
        // In a real implementation, you would upload files to a server
        // For now, we'll simulate the upload and generate mock URLs
        this.simulateFileUpload().then((imageUrls: string[]) => {
          this.isUploading = false;
          this.createOrUpdateProject(imageUrls);
        });
      } else {
        // No files to upload, proceed with form data
        this.createOrUpdateProject([]);
      }
    }
  }

  private simulateFileUpload(): Promise<string[]> {
    // Simulate file upload delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate mock image URLs
        const imageUrls: string[] = [];
        for (let i = 0; i < this.selectedFiles.length; i++) {
          imageUrls.push(`https://picsum.photos/seed/${Date.now() + i}/800/600`);
        }
        resolve(imageUrls);
      }, 2000);
    });
  }

  private createOrUpdateProject(uploadedImageUrls: string[]): void {
    // Process tags and images
    const formValue = this.projectForm.value;
    
    // Combine existing image URLs with uploaded ones
    let allImageUrls: string[] = [];
    if (formValue.images) {
      allImageUrls = formValue.images.split(',').map((img: string) => img.trim()).filter((img: string) => img);
    }
    allImageUrls = [...allImageUrls, ...uploadedImageUrls];
    
    const projectData: Project = {
      ...formValue,
      tags: formValue.tags ? formValue.tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag) : [],
      images: allImageUrls,
      createdAt: Date.now()
    };
    
    if (this.isEditing && this.editingProjectId) {
      // Update existing project
      this.apiService.updateProject(this.editingProjectId, projectData).subscribe({
        next: (updatedProject) => {
          console.log('Project updated successfully', updatedProject);
          this.loadProjects(); // Refresh the list
          this.resetForm();
        },
        error: (error) => {
          console.error('Error updating project', error);
        }
      });
    } else {
      // Create new project
      this.apiService.createProject(projectData).subscribe({
        next: (newProject) => {
          console.log('Project created successfully', newProject);
          this.loadProjects(); // Refresh the list
          this.resetForm();
        },
        error: (error) => {
          console.error('Error creating project', error);
        }
      });
    }
  }

  editProject(project: Project): void {
    this.isEditing = true;
    this.editingProjectId = project.id || null;
    
    // Format tags and images for the form
    const formValue = {
      ...project,
      tags: project.tags ? project.tags.join(', ') : '',
      images: project.images ? project.images.join(', ') : ''
    };
    
    this.projectForm.patchValue(formValue);
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingProjectId = null;
    this.resetForm();
  }

  deleteProject(projectId: string): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.apiService.deleteProject(projectId).subscribe({
        next: () => {
          console.log('Project deleted successfully');
          this.loadProjects(); // Refresh the list
        },
        error: (error) => {
          console.error('Error deleting project', error);
        }
      });
    }
  }

  private resetForm(): void {
    this.projectForm.reset({
      featured: false
    });
    this.isEditing = false;
    this.editingProjectId = null;
    this.selectedFiles = [];
  }
}