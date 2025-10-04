import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../shared/components/ui/card/card.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {}