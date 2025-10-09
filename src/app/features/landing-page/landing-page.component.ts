import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/layout/navbar/navbar.component';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ExperienceComponent } from '../experience/experience.component';
import { EducationComponent } from '../education/education.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../../shared/components/layout/footer/footer.component';
import { CertificationComponent } from "../certification/certification.component";
import { WorkflowComponent } from "../workflow/workflow.component";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    EducationComponent,
    ContactComponent,
    FooterComponent,
    CertificationComponent,
    WorkflowComponent
],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  // This component serves as the main layout for the portfolio
  // It composes all the feature components into a cohesive landing page
}