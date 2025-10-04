import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, LandingPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'personalPortfolio';

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}