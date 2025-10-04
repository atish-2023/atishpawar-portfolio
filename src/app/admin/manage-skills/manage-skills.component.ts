import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService, Skill } from '../../core/api.service';

@Component({
  selector: 'app-manage-skills',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-skills.component.html',
  styleUrls: ['./manage-skills.component.scss']
})
export class ManageSkillsComponent implements OnInit {
  skillForm: FormGroup;
  skills: Skill[] = [];
  isEditing = false;
  editingSkillId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.skillForm = this.fb.group({
      name: ['', Validators.required],
      level: [50, [Validators.required, Validators.min(0), Validators.max(100)]],
      category: ['Frontend', Validators.required],
      icon: [''],
      order: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSkills();
  }

  loadSkills(): void {
    this.apiService.getSkills().subscribe({
      next: (skills) => {
        this.skills = skills;
      },
      error: (error) => {
        console.error('Error loading skills', error);
      }
    });
  }

  onSubmit(): void {
    if (this.skillForm.valid) {
      const skill: Skill = this.skillForm.value;
      
      if (this.isEditing && this.editingSkillId) {
        // Update existing skill
        this.apiService.updateSkill(this.editingSkillId, skill).subscribe({
          next: (updatedSkill) => {
            console.log('Skill updated successfully', updatedSkill);
            this.loadSkills(); // Refresh the list
            this.resetForm();
          },
          error: (error) => {
            console.error('Error updating skill', error);
          }
        });
      } else {
        // Create new skill
        this.apiService.createSkill(skill).subscribe({
          next: (newSkill) => {
            console.log('Skill created successfully', newSkill);
            this.loadSkills(); // Refresh the list
            this.resetForm();
          },
          error: (error) => {
            console.error('Error creating skill', error);
          }
        });
      }
    }
  }

  editSkill(skill: Skill): void {
    this.isEditing = true;
    this.editingSkillId = skill.id || null;
    this.skillForm.patchValue(skill);
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingSkillId = null;
    this.resetForm();
  }

  deleteSkill(skillId: string): void {
    if (confirm('Are you sure you want to delete this skill?')) {
      this.apiService.deleteSkill(skillId).subscribe({
        next: () => {
          console.log('Skill deleted successfully');
          this.loadSkills(); // Refresh the list
        },
        error: (error) => {
          console.error('Error deleting skill', error);
        }
      });
    }
  }

  private resetForm(): void {
    this.skillForm.reset({
      level: 50,
      category: 'Frontend',
      order: 0
    });
    this.isEditing = false;
    this.editingSkillId = null;
  }
}