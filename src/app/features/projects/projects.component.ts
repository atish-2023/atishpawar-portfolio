import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../shared/components/feature/project-card/project-card.component';
import { FirestoreDataService } from '../../core/firestore-data.service';
import { Project } from '../../core/models/project.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements AfterViewInit, OnInit, OnDestroy {
  public projects: Project[] = [];
  
  public loading: boolean = true;
  public error: string | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private firestoreService: FirestoreDataService) {
    console.log('[ProjectsComponent] Initializing component and attempting to fetch data from Firestore');
  }
  
  ngOnInit(): void {
    console.log('[ProjectsComponent] ngOnInit called');
    this.loadData();
  }
  
  public loadData(): void {
    console.log('[ProjectsComponent] loadData called');
    this.loading = true;
    this.error = null;
    
    // Try to get data from Firestore
    const sub = this.firestoreService.getProjectsData().subscribe({
      next: (data) => {
        console.log('[ProjectsComponent] Received data from Firestore:', data);
        if (data && data.length > 0) {
          console.log(`[ProjectsComponent] ${data.length} projects successfully loaded from Firestore`);
          console.log('[ProjectsComponent] Sample project data:', data[0]);
          this.projects = data;
        } else {
          console.log('[ProjectsComponent] No projects found in Firestore');
        }
        this.loading = false;
        console.log('[ProjectsComponent] Final projects array:', this.projects);
      },
      error: (error) => {
        console.error('[ProjectsComponent] Error fetching projects from Firestore:', error);
        this.error = 'Failed to load projects data';
        this.loading = false;
      }
    });
    
    this.subscription.add(sub);
  }

  ngAfterViewInit() {
    console.log('[ProjectsComponent] ngAfterViewInit called - Projects rendered');
    console.log('[ProjectsComponent] Number of projects to display:', this.projects.length);
  }
  
  ngOnDestroy(): void {
    console.log('[ProjectsComponent] ngOnDestroy called');
    this.subscription.unsubscribe();
  }
}