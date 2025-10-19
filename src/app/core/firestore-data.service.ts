import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, query, orderBy } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AboutSection } from './models/about-section.model';
import { Project } from './models/project.model';
import { Skill } from './models/skill.model';
import { TimelineItem } from './models/timeline.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {

  constructor(private firestore: Firestore) { }

  /**
   * Get hero section data from Firestore
   * Collection: heroinfo
   * Document: hero1
   */
  getHeroData(): Observable<any> {
    const heroDocRef = doc(this.firestore, 'heroinfo', 'hero1');
    return from(getDoc(heroDocRef)).pipe(
      map(docSnapshot => {
        if (docSnapshot.exists()) {
          return { id: docSnapshot.id, ...docSnapshot.data() };
        } else {
          console.warn('Hero document not found, returning null');
          return null;
        }
      }),
      catchError(error => {
        console.error('Error fetching hero data:', error);
        return of(null);
      }
    ));
  }

  /**
   * Get about section data from Firestore
   * Collection: aboutmeinfo
   * Document: about1
   */
  getAboutData(): Observable<AboutSection | null> {
    const aboutDocRef = doc(this.firestore, 'aboutmeinfo', 'about1');
    return from(getDoc(aboutDocRef)).pipe(
      map(docSnapshot => {
        if (docSnapshot.exists()) {
          return { id: docSnapshot.id, ...docSnapshot.data() } as AboutSection;
        } else {
          console.warn('About document not found, returning null');
          return null;
        }
      }),
      catchError(error => {
        console.error('Error fetching about data:', error);
        return of(null);
      }
    ));
  }

  /**
   * Get all projects from Firestore
   * Collection: projectsinfo
   */
  getProjectsData(): Observable<Project[]> {
    const projectsCollectionRef = collection(this.firestore, 'projectsinfo');
    const projectsQuery = query(projectsCollectionRef, orderBy('date', 'desc'));
    
    return from(getDocs(projectsQuery)).pipe(
      map(querySnapshot => {
        const projects: Project[] = [];
        querySnapshot.forEach(docSnapshot => {
          projects.push({ id: docSnapshot.id, ...docSnapshot.data() } as Project);
        });
        return projects;
      }),
      catchError(error => {
        console.error('Error fetching projects data:', error);
        return of([]);
      }
    ));
  }

  /**
   * Get all skills from Firestore
   * Collection: skillsinfo
   */
  getSkillsData(): Observable<Skill[]> {
    const skillsCollectionRef = collection(this.firestore, 'skillsinfo');
    const skillsQuery = query(skillsCollectionRef, orderBy('level', 'desc'));
    
    return from(getDocs(skillsQuery)).pipe(
      map(querySnapshot => {
        const skills: Skill[] = [];
        querySnapshot.forEach(docSnapshot => {
          skills.push({ id: docSnapshot.id, ...docSnapshot.data() } as Skill);
        });
        return skills;
      }),
      catchError(error => {
        console.error('Error fetching skills data:', error);
        return of([]);
      }
    ));
  }

  /**
   * Get all experience items from Firestore
   * Collection: experienceinfo
   */
  getExperienceData(): Observable<TimelineItem[]> {
    const experienceCollectionRef = collection(this.firestore, 'experienceinfo');
    const experienceQuery = query(experienceCollectionRef, orderBy('period', 'desc'));
    
    return from(getDocs(experienceQuery)).pipe(
      map(querySnapshot => {
        const experiences: TimelineItem[] = [];
        querySnapshot.forEach((docSnapshot, index) => {
          experiences.push({ 
            id: docSnapshot.id, 
            ...docSnapshot.data(),
            // Alternate alignment for timeline display
            isLeftAligned: index % 2 === 0
          } as TimelineItem);
        });
        return experiences;
      }),
      catchError(error => {
        console.error('Error fetching experience data:', error);
        return of([]);
      }
    ));
  }

  /**
   * Get all education items from Firestore
   * Collection: educationinfo
   */
  getEducationData(): Observable<TimelineItem[]> {
    const educationCollectionRef = collection(this.firestore, 'educationinfo');
    const educationQuery = query(educationCollectionRef, orderBy('period', 'desc'));
    
    return from(getDocs(educationQuery)).pipe(
      map(querySnapshot => {
        const educations: TimelineItem[] = [];
        querySnapshot.forEach((docSnapshot, index) => {
          educations.push({ 
            id: docSnapshot.id, 
            ...docSnapshot.data(),
            // Alternate alignment for timeline display
            isLeftAligned: index % 2 === 0
          } as TimelineItem);
        });
        return educations;
      }),
      catchError(error => {
        console.error('Error fetching education data:', error);
        return of([]);
      }
    ));
  }

  /**
   * Get all certifications from Firestore
   * Collection: certificationinfo
   */
  getCertificationsData(): Observable<any[]> {
    const certificationsCollectionRef = collection(this.firestore, 'certificationinfo');
    const certificationsQuery = query(certificationsCollectionRef, orderBy('date', 'desc'));
    
    return from(getDocs(certificationsQuery)).pipe(
      map(querySnapshot => {
        const certifications: any[] = [];
        querySnapshot.forEach(docSnapshot => {
          certifications.push({ id: docSnapshot.id, ...docSnapshot.data() });
        });
        return certifications;
      }),
      catchError(error => {
        console.error('Error fetching certifications data:', error);
        return of([]);
      }
    ));
  }

  /**
   * Get contact information from Firestore
   * Collection: contactinfo
   * Document: contact1
   */
  getContactData(): Observable<any> {
    const contactDocRef = doc(this.firestore, 'contactinfo', 'contact1');
    return from(getDoc(contactDocRef)).pipe(
      map(docSnapshot => {
        if (docSnapshot.exists()) {
          return { id: docSnapshot.id, ...docSnapshot.data() };
        } else {
          console.warn('Contact document not found, returning null');
          return null;
        }
      }),
      catchError(error => {
        console.error('Error fetching contact data:', error);
        return of(null);
      }
    ));
  }
}