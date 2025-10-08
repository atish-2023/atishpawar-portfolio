import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService, Hero } from '../../core/api.service';

@Component({
  selector: 'app-edit-hero',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.scss']
})
export class EditHeroComponent implements OnInit {
  heroForm: FormGroup;
  isSubmitted = false;
  submitError = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.heroForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      intro: ['', Validators.required],
      photoUrl: [''],
      ctaText: ['', Validators.required],
      ctaTarget: ['projects', Validators.required]
    });
  }

  ngOnInit(): void {
    this.apiService.getHero().subscribe(hero => {
      this.heroForm.patchValue(hero);
    });
  }

  onSubmit(): void {
    if (this.heroForm.valid) {
      this.isSubmitted = false;
      this.submitError = false;
      
      const hero: Hero = {
        ...this.heroForm.value,
        updatedAt: Date.now()
      };
      
      this.apiService.updateHero(hero).subscribe({
        next: (updatedHero) => {
          console.log('Hero updated successfully', updatedHero);
          this.isSubmitted = true;
          // Show success message to user
        },
        error: (error) => {
          console.error('Error updating hero', error);
          this.submitError = true;
          // Show error message to user
        }
      });
    }
  }
}