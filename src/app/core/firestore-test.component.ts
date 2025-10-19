import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreDataService } from './firestore-data.service';

@Component({
  selector: 'app-firestore-test',
  template: `
    <div class="p-6 bg-gray-800 rounded-lg text-white max-w-4xl mx-auto my-8">
      <h2 class="text-2xl font-bold mb-6 text-center">Firestore Data Test</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Hero Data -->
        <div class="bg-gray-700 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">Hero Data</h3>
          <pre class="text-xs bg-gray-900 p-2 rounded overflow-auto max-h-32">{{ heroData | json }}</pre>
        </div>
        
        <!-- About Data -->
        <div class="bg-gray-700 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">About Data</h3>
          <pre class="text-xs bg-gray-900 p-2 rounded overflow-auto max-h-32">{{ aboutData | json }}</pre>
        </div>
        
        <!-- Projects Count -->
        <div class="bg-gray-700 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">Projects</h3>
          <p class="text-2xl font-bold text-center">{{ projectsData.length }} projects</p>
        </div>
        
        <!-- Skills Count -->
        <div class="bg-gray-700 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">Skills</h3>
          <p class="text-2xl font-bold text-center">{{ skillsData.length }} skills</p>
        </div>
      </div>
      
      <div class="mt-6 text-center">
        <button 
          (click)="refreshData()" 
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
          Refresh Data
        </button>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class FirestoreTestComponent implements OnInit {
  heroData: any = null;
  aboutData: any = null;
  projectsData: any[] = [];
  skillsData: any[] = [];

  constructor(private firestoreService: FirestoreDataService) {}

  ngOnInit(): void {
    this.fetchAllData();
  }

  fetchAllData(): void {
    // Test hero data
    this.firestoreService.getHeroData().subscribe(data => {
      this.heroData = data;
    });

    // Test about data
    this.firestoreService.getAboutData().subscribe(data => {
      this.aboutData = data;
    });

    // Test projects data
    this.firestoreService.getProjectsData().subscribe(data => {
      this.projectsData = data;
    });

    // Test skills data
    this.firestoreService.getSkillsData().subscribe(data => {
      this.skillsData = data;
    });
  }

  refreshData(): void {
    this.fetchAllData();
  }
}