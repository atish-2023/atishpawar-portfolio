import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface StatCard {
  title: string;
  value: number;
  icon: string;
  color: string;
  change: number;
}

interface ActivityItem {
  id: number;
  title: string;
  description: string;
  time: string;
  type: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  isDashboardOpen = true;
  currentTime: string = '';
  currentDate: string = '';
  isDarkMode: boolean = true;

  // Stats data
  statCards: StatCard[] = [
    { title: 'Total Projects', value: 12, icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', color: 'blue', change: 12 },
    { title: 'Skills', value: 24, icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'purple', change: 8 },
    { title: 'Experience Entries', value: 5, icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'cyan', change: 20 },
    { title: 'Certifications', value: 8, icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', color: 'green', change: 15 }
  ];

  // Activity feed data
  activityFeed: ActivityItem[] = [
    { id: 1, title: 'Project Updated', description: 'Portfolio website redesign completed', time: '2 hours ago', type: 'update' },
    { id: 2, title: 'New Skill Added', description: 'Added Angular 14 proficiency', time: '5 hours ago', type: 'skill' },
    { id: 3, title: 'Experience Entry', description: 'Added new work experience at Tech Corp', time: '1 day ago', type: 'work' },
    { id: 4, title: 'Certification', description: 'Earned AWS Cloud Practitioner certification', time: '2 days ago', type: 'cert' },
    { id: 5, title: 'Project Published', description: 'Launched e-commerce platform', time: '3 days ago', type: 'project' }
  ];

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.updateDateTime();
    // Update time every minute
    setInterval(() => this.updateDateTime(), 60000);
    
    // Apply initial theme
    this.applyTheme();
  }

  updateDateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.currentDate = now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  toggleDashboard() {
    this.isDashboardOpen = !this.isDashboardOpen;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
  }

  applyTheme() {
    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'light-theme');
    } else {
      this.renderer.addClass(document.body, 'light-theme');
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }
}