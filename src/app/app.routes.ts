import { Routes } from '@angular/router';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { AboutComponent } from './features/about/about.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { ContactComponent } from './features/contact/contact.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { EducationComponent } from './features/education/education.component';
import { SkillsComponent } from './features/skills/skills.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'experience',
    component: ExperienceComponent
  },
  {
    path: 'education',
    component: EducationComponent
  },
  {
    path: 'skills',
    component: SkillsComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];