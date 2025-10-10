import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
export interface Hero {
  title: string;
  subtitle: string;
  intro: string;
  photoUrl: string;
  ctaText: string;
  ctaTarget: string;
  updatedAt: number;
}

export interface About {
  title: string;
  content: string;
  photoUrl: string;
  updatedAt: number;
}

export interface Skill {
  id?: string;
  name: string;
  level: number;
  category: string;
  icon: string;
  order: number;
}

export interface Project {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  repoUrl: string;
  liveUrl: string;
  images: string[];
  featured: boolean;
  createdAt: number;
}

export interface Experience {
  id?: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Education {
  id?: string;
  institution: string;
  degree: string;
  period: string;
  description: string;
  coursework?: string[];
}

export interface Certification {
  id?: string;
  name: string;
  issuer: string;
  date: string;
  description: string;
  link: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/api';

  // Cache for frequently accessed data
  private heroCache = new BehaviorSubject<Hero | null>(null);
  private aboutCache = new BehaviorSubject<About | null>(null);
  private skillsCache = new BehaviorSubject<Skill[] | null>(null);
  private projectsCache = new BehaviorSubject<Project[] | null>(null);

  constructor(private http: HttpClient) { }

  // Public API methods
  getHero(): Observable<Hero> {
    if (this.heroCache.value) {
      return new Observable(observer => {
        observer.next(this.heroCache.value!);
        observer.complete();
      });
    }

    return this.http.get<Hero>(`${this.apiUrl}/hero`).pipe(
      map(hero => {
        this.heroCache.next(hero);
        return hero;
      })
    );
  }

  getAbout(): Observable<About> {
    if (this.aboutCache.value) {
      return new Observable(observer => {
        observer.next(this.aboutCache.value!);
        observer.complete();
      });
    }

    return this.http.get<About>(`${this.apiUrl}/about`).pipe(
      map(about => {
        this.aboutCache.next(about);
        return about;
      })
    );
  }

  getSkills(): Observable<Skill[]> {
    if (this.skillsCache.value) {
      return new Observable(observer => {
        observer.next(this.skillsCache.value!);
        observer.complete();
      });
    }

    return this.http.get<Skill[]>(`${this.apiUrl}/skills`).pipe(
      map(skills => {
        this.skillsCache.next(skills);
        return skills;
      })
    );
  }

  getProjects(): Observable<Project[]> {
    if (this.projectsCache.value) {
      return new Observable(observer => {
        observer.next(this.projectsCache.value!);
        observer.complete();
      });
    }

    return this.http.get<Project[]>(`${this.apiUrl}/projects`).pipe(
      map(projects => {
        this.projectsCache.next(projects);
        return projects;
      })
    );
  }

  getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.apiUrl}/experience`);
  }

  getEducation(): Observable<Education[]> {
    return this.http.get<Education[]>(`${this.apiUrl}/education`);
  }

  getCertifications(): Observable<Certification[]> {
    return this.http.get<Certification[]>(`${this.apiUrl}/certifications`);
  }

  getContactMessages(): Observable<ContactMessage[]> {
    return this.http.get<ContactMessage[]>(`${this.apiUrl}/contact-messages`);
  }

  // Contact form submission
  submitContactForm(message: ContactMessage): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact`, message);
  }

  // Admin API methods
  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.apiUrl}/hero`, hero).pipe(
      map(updatedHero => {
        this.heroCache.next(updatedHero);
        return updatedHero;
      })
    );
  }

  updateAbout(about: About): Observable<About> {
    return this.http.put<About>(`${this.apiUrl}/about`, about).pipe(
      map(updatedAbout => {
        this.aboutCache.next(updatedAbout);
        return updatedAbout;
      })
    );
  }

  createSkill(skill: Skill): Observable<Skill> {
    return this.http.post<Skill>(`${this.apiUrl}/skills`, skill).pipe(
      map(newSkill => {
        // Invalidate cache
        this.skillsCache.next(null);
        return newSkill;
      })
    );
  }

  updateSkill(id: string, skill: Skill): Observable<Skill> {
    return this.http.patch<Skill>(`${this.apiUrl}/skills/${id}`, skill).pipe(
      map(updatedSkill => {
        // Invalidate cache
        this.skillsCache.next(null);
        return updatedSkill;
      })
    );
  }

  deleteSkill(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/skills/${id}`).pipe(
      map(() => {
        // Invalidate cache
        this.skillsCache.next(null);
      })
    );
  }

  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/projects`, project).pipe(
      map(newProject => {
        // Invalidate cache
        this.projectsCache.next(null);
        return newProject;
      })
    );
  }

  updateProject(id: string, project: Project): Observable<Project> {
    return this.http.patch<Project>(`${this.apiUrl}/projects/${id}`, project).pipe(
      map(updatedProject => {
        // Invalidate cache
        this.projectsCache.next(null);
        return updatedProject;
      })
    );
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/projects/${id}`).pipe(
      map(() => {
        // Invalidate cache
        this.projectsCache.next(null);
      })
    );
  }

  createExperience(experience: Experience): Observable<Experience> {
    return this.http.post<Experience>(`${this.apiUrl}/experience`, experience);
  }

  updateExperience(id: string, experience: Experience): Observable<Experience> {
    return this.http.patch<Experience>(`${this.apiUrl}/experience/${id}`, experience);
  }

  deleteExperience(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/experience/${id}`);
  }

  createEducation(education: Education): Observable<Education> {
    return this.http.post<Education>(`${this.apiUrl}/education`, education);
  }

  updateEducation(id: string, education: Education): Observable<Education> {
    return this.http.patch<Education>(`${this.apiUrl}/education/${id}`, education);
  }

  deleteEducation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/education/${id}`);
  }

  createCertification(certification: Certification): Observable<Certification> {
    return this.http.post<Certification>(`${this.apiUrl}/certifications`, certification);
  }

  updateCertification(id: string, certification: Certification): Observable<Certification> {
    return this.http.patch<Certification>(`${this.apiUrl}/certifications/${id}`, certification);
  }

  deleteCertification(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/certifications/${id}`);
  }

  deleteContactMessage(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/contact-messages/${id}`);
  }

  // Cache invalidation for all data
  invalidateAllCache(): void {
    this.heroCache.next(null);
    this.aboutCache.next(null);
    this.skillsCache.next(null);
    this.projectsCache.next(null);
  }
}