import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../features/hero/hero.component';
import { AboutComponent } from '../../features/about/about.component';
import { SkillsComponent } from '../../features/skills/skills.component';
import { ProjectsComponent } from '../../features/projects/projects.component';
import { ExperienceComponent } from '../../features/experience/experience.component';
import { EducationComponent } from '../../features/education/education.component';
import { ContactComponent } from '../../features/contact/contact.component';
import { FooterComponent } from '../../shared/components/layout/footer/footer.component';
import { CertificationComponent } from '../../features/certification/certification.component';
import { WorkflowComponent } from '../../features/workflow/workflow.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
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
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  title = 'main';
}