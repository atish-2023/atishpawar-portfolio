import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Import standalone components
import { AdminLayoutComponent } from './admin-layout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EditHeroComponent } from './edit-hero/edit-hero.component';
import { EditAboutComponent } from './edit-about/edit-about.component';
import { ManageSkillsComponent } from './manage-skills/manage-skills.component';
import { ManageProjectsComponent } from './manage-projects/manage-projects.component';
import { ManageExperienceComponent } from './manage-experience/manage-experience.component';
import { ManageEducationComponent } from './manage-education/manage-education.component';
import { ManageCertificationComponent } from './manage-certification/manage-certification.component';
import { ManageContactusComponent } from './manage-contactus/manage-contactus.component';

import { ADMIN_ROUTES } from './admin.routes';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ADMIN_ROUTES),
    // Standalone components
    AdminLayoutComponent,
    AdminDashboardComponent,
    EditHeroComponent,
    EditAboutComponent,
    ManageSkillsComponent,
    ManageProjectsComponent,
    ManageExperienceComponent,
    ManageEducationComponent,
    ManageCertificationComponent,
    ManageContactusComponent
  ]
})
export class AdminModule { }