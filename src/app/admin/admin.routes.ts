import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { EditHeroComponent } from './edit-hero/edit-hero.component';
import { EditAboutComponent } from './edit-about/edit-about.component';
import { ManageSkillsComponent } from './manage-skills/manage-skills.component';
import { ManageProjectsComponent } from './manage-projects/manage-projects.component';
import { ManageExperienceComponent } from './manage-experience/manage-experience.component';
import { ManageEducationComponent } from './manage-education/manage-education.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: AdminDashboardComponent
  },
  {
    path: 'login',
    component: AdminLoginComponent
  },
  {
    path: 'hero',
    component: EditHeroComponent
  },
  {
    path: 'about',
    component: EditAboutComponent
  },
  {
    path: 'skills',
    component: ManageSkillsComponent
  },
  {
    path: 'projects',
    component: ManageProjectsComponent
  },
  {
    path: 'experience',
    component: ManageExperienceComponent
  },
  {
    path: 'education',
    component: ManageEducationComponent
  }
];