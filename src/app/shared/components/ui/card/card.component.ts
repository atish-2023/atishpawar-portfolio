import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardConfig } from '../../../../core/models/profile.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() config?: CardConfig;
}