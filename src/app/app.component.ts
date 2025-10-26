import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from './shared/components/layout/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'personalPortfolio';

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('[AppComponent] Application started');
    console.log('[AppComponent] Firestore data tracing is enabled in all components');
    console.log('[AppComponent] Check browser console for detailed data flow information');
  }

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }
}