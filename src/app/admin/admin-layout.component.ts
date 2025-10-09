import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-slate-100">
      <!-- Top Navigation Bar -->
      <nav class="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700/50 px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Admin Dashboard
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <button class="p-2 rounded-full hover:bg-gray-700/50 transition-colors">
              <svg class="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </button>
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span class="text-xs font-bold">AP</span>
              </div>
              <span class="text-sm font-medium">Admin</span>
            </div>
          </div>
        </div>
      </nav>

      <div class="flex">
        <!-- Sidebar -->
        <aside class="w-64 bg-gray-800/30 backdrop-blur-lg border-r border-gray-700/50 min-h-screen hidden md:block">
          <div class="p-6">
            <h2 class="text-lg font-semibold text-slate-200 mb-6">Navigation</h2>
            <nav class="space-y-2">
              <a routerLink="/admin/dashboard" routerLinkActive="bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border border-blue-500/30" class="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-gray-700/50 hover:text-slate-200 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                <span>Dashboard</span>
              </a>
              <a routerLink="/admin/hero" routerLinkActive="bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border border-blue-500/30" class="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-gray-700/50 hover:text-slate-200 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span>Hero Section</span>
              </a>
              <a routerLink="/admin/about" routerLinkActive="bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border border-blue-500/30" class="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-gray-700/50 hover:text-slate-200 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>About Section</span>
              </a>
              <a routerLink="/admin/skills" routerLinkActive="bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border border-blue-500/30" class="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-gray-700/50 hover:text-slate-200 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
                <span>Skills</span>
              </a>
              <a routerLink="/admin/projects" routerLinkActive="bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border border-blue-500/30" class="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-gray-700/50 hover:text-slate-200 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <span>Projects</span>
              </a>
              <a routerLink="/admin/experience" routerLinkActive="bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border border-blue-500/30" class="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-gray-700/50 hover:text-slate-200 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span>Experience</span>
              </a>
              <a routerLink="/admin/education" routerLinkActive="bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border border-blue-500/30" class="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-gray-700/50 hover:text-slate-200 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"></path>
                </svg>
                <span>Education</span>
              </a>
            </nav>
          </div>
        </aside>

        <!-- Main Content with Router Outlet -->
        <main class="flex-1 p-6">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: []
})
export class AdminLayoutComponent {
  constructor() { }
}