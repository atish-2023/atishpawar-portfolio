import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, AboutSection } from '../../core/api.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  aboutSection: AboutSection | null = null;
  
  constructor(private apiService: ApiService) {}
  
  ngOnInit(): void {
    this.apiService.getAboutSection().subscribe(
      data => {
        this.aboutSection = data;
      },
      error => {
        console.error('Error fetching about section data:', error);
        // Fallback to default data
        this.aboutSection = {
          profilePhotoUrl: "./../../../../public/src/assets/scalartechhub.png",
          title: "I'm Atish Datattray Pawar",
          content: "I'm a passionate software engineer specialized in building full-stack web applications...",
          skills: [
            {
              name: "Frontend Development",
              description: "Building responsive and modern UI with Angular, React, and Tailwind CSS."
            },
            {
              name: "Backend Development",
              description: "Creating scalable REST APIs using Node.js, Express, and Firebase."
            },
            {
              name: "UI/UX Design",
              description: "Designing user-friendly interfaces with Figma and Adobe XD."
            },
            {
              name: "Cloud Deployment",
              description: "Deploying and managing applications on Firebase, AWS, and Vercel."
            }
          ],
          stats: {
            experience: "5+ Years Experience",
            projects: "20+ Projects Completed",
            satisfaction: "100% Client Satisfaction"
          }
        };
      }
    );
  }
}