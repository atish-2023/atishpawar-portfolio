import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot
} from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AboutSection } from './models/about-section.model';
import { Project } from './models/project.model';
import { Review } from './models/review.model';
import { Skill } from './models/skill.model';
import { TimelineItem } from './models/timeline.model';

// Define interfaces for Firestore data structures
export interface HeroData {
  id?: string;
  name: string;
  tagline: string;
  description: string;
  profileImageUrl: string;
  resumeUrl: string;
  ctaButtons: Array<{
    text: string;
    link: string;
    primary: boolean;
  }>;
}

export interface ContactData {
  id?: string;
  title: string;
  description: string;
  phone: string;
  email: string;
  location: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
}

export interface CertificationData {
  id?: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  logo: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreDataService {
  // Using inject() function (Angular 14+) - preferred approach
  private firestore: Firestore = inject(Firestore);

  /**
   * Get hero section data from Firestore
   * Collection: heroinfo
   * Document: hero1
   */
  getHeroData(): Observable<HeroData | null> {
    console.log('[Firestore] Fetching hero data from heroinfo/hero1');
    const heroDocRef = doc(this.firestore, 'heroinfo', 'hero1');
    return from(getDoc(heroDocRef)).pipe(
      map(docSnapshot => {
        if (docSnapshot.exists()) {
          console.log('[Firestore] Hero data found:', docSnapshot.data());
          const data = docSnapshot.data();
          return {
            id: docSnapshot.id,
            name: data['name'] || '',
            tagline: data['tagline'] || '',
            description: data['description'] || '',
            profileImageUrl: data['profileImageUrl'] || '',
            resumeUrl: data['resumeUrl'] || '',
            ctaButtons: data['ctaButtons'] || []
          } as HeroData;
        } else {
          console.warn('[Firestore] Hero document not found');
          return null;
        }
      }),
      catchError(error => {
        console.error('[Firestore] Error fetching hero data:', error);
        return of(null);
      })
    );
  }

  /**
   * Get about section data from Firestore
   * Collection: aboutmeinfo
   * Document: about1
   */
  getAboutData(): Observable<AboutSection | null> {
    console.log('[Firestore] Fetching about data from aboutmeinfo/about1');
    const aboutDocRef = doc(this.firestore, 'aboutmeinfo', 'about1');
    return from(getDoc(aboutDocRef)).pipe(
      map(docSnapshot => {
        if (docSnapshot.exists()) {
          console.log('[Firestore] About data found:', docSnapshot.data());
          const data = docSnapshot.data();
          return {
            profilePhotoUrl: data['profilePhotoUrl'] || '',
            title: data['title'] || '',
            content: data['content'] || '',
            skills: data['skills'] || [],
            stats: data['stats'] || { experience: '', projects: '', satisfaction: '' }
          } as AboutSection;
        } else {
          console.warn('[Firestore] About document not found');
          return null;
        }
      }),
      catchError(error => {
        console.error('[Firestore] Error fetching about data:', error);
        return of(null);
      })
    );
  }

  /**
   * Get all projects from Firestore
   * Collection: projectsinfo
   */
  getProjectsData(): Observable<Project[]> {
    console.log('[Firestore] Fetching projects data from projectsinfo collection');
    const projectsCollectionRef = collection(this.firestore, 'projectsinfo');
    const projectsQuery = query(projectsCollectionRef, orderBy('title'));

    return from(getDocs(projectsQuery)).pipe(
      map((querySnapshot: QuerySnapshot<DocumentData>) => {
        const projects: Project[] = [];
        querySnapshot.docs.forEach((docSnapshot: QueryDocumentSnapshot<DocumentData>) => {
          const data = docSnapshot.data();
          projects.push({
            id: docSnapshot.id,
            title: data['title'] || 'Untitled Project',
            description: data['description'] || 'No description available',
            longDescription: data['longDescription'] || data['description'] || 'No detailed description available',
            images: data['images'] || [],
            tags: data['tags'] || ['General'],
            repoUrl: data['repoUrl'] || '#',
            liveUrl: data['liveUrl'] || '#',
            category: data['category'] || 'General',
            date: data['date'] || new Date().toISOString()
          } as Project);
        });
        console.log(`[Firestore] Found ${projects.length} projects`);
        return projects;
      }),
      catchError(error => {
        console.error('[Firestore] Error fetching projects data:', error);
        return of([] as Project[]);
      })
    );
  }

  /**
   * Get all skills from Firestore
   * Collection: skillsinfo
   */
  getSkillsData(): Observable<Skill[]> {
    console.log('[Firestore] Fetching skills data from skillsinfo collection');
    const skillsCollectionRef = collection(this.firestore, 'skillsinfo');
    
    // First, try to get individual skill documents
    return from(getDocs(skillsCollectionRef)).pipe(
      map((querySnapshot: QuerySnapshot<DocumentData>) => {
        const skills: Skill[] = [];
        
        // If we have individual skill documents
        if (!querySnapshot.empty) {
          querySnapshot.docs.forEach((docSnapshot: QueryDocumentSnapshot<DocumentData>) => {
            const data = docSnapshot.data();
            // Check if this is a grouped skill category or individual skill
            if (data['technologies']) {
              // This is a grouped category, extract individual skills
              const technologies = data['technologies'] || [];
              technologies.forEach((tech: any, index: number) => {
                skills.push({
                  id: `${docSnapshot.id}-${index}`,
                  name: tech.name || '',
                  category: data['name'] || data['category'] || 'Other',
                  level: tech.level || 0,
                  icon: '',
                  description: ''
                } as Skill);
              });
            } else {
              // This is an individual skill document
              skills.push({
                id: docSnapshot.id,
                name: data['name'] || '',
                category: data['category'] || 'Other',
                level: data['level'] || 0,
                icon: data['icon'] || '',
                description: data['description'] || ''
              } as Skill);
            }
          });
        }
        
        console.log(`[Firestore] Found ${skills.length} skills`);
        return skills;
      }),
      catchError(error => {
        console.error('[Firestore] Error fetching skills data:', error);
        return of([] as Skill[]);
      })
    );
  }

  /**
   * Get all experience items from Firestore
   * Collection: experienceinfo
   */
  getExperienceData(): Observable<TimelineItem[]> {
    console.log('[Firestore] Fetching experience data from experienceinfo collection');
    const experienceCollectionRef = collection(this.firestore, 'experienceinfo');
    const experienceQuery = query(experienceCollectionRef, orderBy('period', 'desc'));

    return from(getDocs(experienceQuery)).pipe(
      map((querySnapshot: QuerySnapshot<DocumentData>) => {
        const experiences: TimelineItem[] = [];
        querySnapshot.docs.forEach((docSnapshot: QueryDocumentSnapshot<DocumentData>, index: number) => {
          const data = docSnapshot.data();
          experiences.push({
            id: docSnapshot.id,
            title: data['title'] || '',
            subtitle: data['subtitle'] || '',
            period: data['period'] || '',
            description: data['description'] || '',
            location: data['location'] || '',
            icon: data['icon'] || '',
            iconColor: data['iconColor'] || '',
            bgColor: data['bgColor'] || '',
            technologies: data['technologies'] || [],
            isLeftAligned: index % 2 === 0,
            image: data['image'] || '',
            coursework: data['coursework'] || [],
            achievements: data['achievements'] || [],
            keyProjects: data['keyProjects'] || []
          } as TimelineItem);
        });
        console.log(`[Firestore] Found ${experiences.length} experience items`);
        return experiences;
      }),
      catchError(error => {
        console.error('[Firestore] Error fetching experience data:', error);
        return of([] as TimelineItem[]);
      })
    );
  }

  /**
   * Get all education items from Firestore
   * Collection: educationinfo
   */
  getEducationData(): Observable<TimelineItem[]> {
    console.log('[Firestore] Fetching education data from educationinfo collection');
    const educationCollectionRef = collection(this.firestore, 'educationinfo');
    const educationQuery = query(educationCollectionRef, orderBy('period', 'desc'));

    return from(getDocs(educationQuery)).pipe(
      map((querySnapshot: QuerySnapshot<DocumentData>) => {
        const educations: TimelineItem[] = [];
        querySnapshot.docs.forEach((docSnapshot: QueryDocumentSnapshot<DocumentData>, index: number) => {
          const data = docSnapshot.data();
          educations.push({
            id: docSnapshot.id,
            title: data['title'] || '',
            subtitle: data['subtitle'] || '',
            period: data['period'] || '',
            description: data['description'] || '',
            location: data['location'] || '',
            icon: data['icon'] || '',
            iconColor: data['iconColor'] || '',
            bgColor: data['bgColor'] || '',
            technologies: data['technologies'] || [],
            isLeftAligned: index % 2 === 0,
            image: data['image'] || '',
            coursework: data['coursework'] || [],
            achievements: data['achievements'] || [],
            keyProjects: data['keyProjects'] || []
          } as TimelineItem);
        });
        console.log(`[Firestore] Found ${educations.length} education items`);
        return educations;
      }),
      catchError(error => {
        console.error('[Firestore] Error fetching education data:', error);
        return of([] as TimelineItem[]);
      })
    );
  }

  /**
   * Get all certifications from Firestore
   * Collection: certificationinfo
   */
  getCertificationsData(): Observable<CertificationData[]> {
    console.log('[Firestore] Fetching certifications data from certificationinfo collection');
    const certificationsCollectionRef = collection(this.firestore, 'certificationinfo');
    const certificationsQuery = query(certificationsCollectionRef, orderBy('date', 'desc'));

    return from(getDocs(certificationsQuery)).pipe(
      map((querySnapshot: QuerySnapshot<DocumentData>) => {
        const certifications: CertificationData[] = [];
        querySnapshot.docs.forEach((docSnapshot: QueryDocumentSnapshot<DocumentData>) => {
          const data = docSnapshot.data();
          certifications.push({
            id: docSnapshot.id,
            title: data['title'] || '',
            organization: data['organization'] || '',
            date: data['date'] || '',
            description: data['description'] || '',
            logo: data['logo'] || ''
          } as CertificationData);
        });
        console.log(`[Firestore] Found ${certifications.length} certifications`);
        return certifications;
      }),
      catchError(error => {
        console.error('[Firestore] Error fetching certifications data:', error);
        return of([] as CertificationData[]);
      })
    );
  }

  /**
   * Get contact information from Firestore
   * Collection: contactinfo
   * Document: contact1
   */
  getContactData(): Observable<ContactData | null> {
    console.log('[Firestore] Fetching contact data from contactinfo/contact1');
    const contactDocRef = doc(this.firestore, 'contactinfo', 'contact1');
    return from(getDoc(contactDocRef)).pipe(
      map(docSnapshot => {
        if (docSnapshot.exists()) {
          console.log('[Firestore] Contact data found:', docSnapshot.data());
          const data = docSnapshot.data();
          return {
            id: docSnapshot.id,
            title: data['title'] || '',
            description: data['description'] || '',
            phone: data['phone'] || '',
            email: data['email'] || '',
            location: data['location'] || '',
            socialLinks: data['socialLinks'] || { github: '', linkedin: '', twitter: '', instagram: '' }
          } as ContactData;
        } else {
          console.warn('[Firestore] Contact document not found');
          return null;
        }
      }),
      catchError(error => {
        console.error('[Firestore] Error fetching contact data:', error);
        return of(null);
      })
    );
  }

  /**
   * Get all reviews from Firestore
   * Collection: reviewsinfo
   */
  getReviewsData(): Observable<Review[]> {
    console.log('[FirestoreService] getReviewsData called - Starting reviews data fetch');
    console.log('[FirestoreService] Accessing collection: reviewsinfo');
    
    const reviewsCollectionRef = collection(this.firestore, 'reviewsinfo');
    console.log('[FirestoreService] Collection reference created:', reviewsCollectionRef);
    
    const reviewsQuery = query(reviewsCollectionRef, orderBy('date', 'desc'));
    console.log('[FirestoreService] Query created with orderBy date descending');
    
    console.log('[FirestoreService] Executing getDocs query');

    return from(getDocs(reviewsQuery)).pipe(
      map((querySnapshot: QuerySnapshot<DocumentData>) => {
        console.log('[FirestoreService] SUCCESS: Query snapshot received');
        console.log('[FirestoreService] Query snapshot size:', querySnapshot.size);
        console.log('[FirestoreService] Query snapshot empty:', querySnapshot.empty);
        
        const reviews: Review[] = [];
        console.log('[FirestoreService] Processing', querySnapshot.docs.length, 'documents');
        
        querySnapshot.docs.forEach((docSnapshot: QueryDocumentSnapshot<DocumentData>, index: number) => {
          console.log(`[FirestoreService] Processing document ${index + 1}:`, docSnapshot.id);
          const data = docSnapshot.data();
          console.log(`[FirestoreService] Document ${index + 1} data:`, data);
          
          const review: Review = {
            id: docSnapshot.id,
            name: data['name'] || '',
            role: data['role'] || '',
            message: data['message'] || '',
            rating: data['rating'] || 0,
            image: data['image'] || '',
            company: data['company'] || '',
            date: data['date'] || ''
          };
          
          console.log(`[FirestoreService] Processed review ${index + 1}:`, review);
          reviews.push(review);
        });
        
        console.log(`[FirestoreService] Found ${reviews.length} reviews`);
        console.log('[FirestoreService] Returning reviews array:', reviews);
        return reviews;
      }),
      catchError(error => {
        console.error('[FirestoreService] ERROR: Error fetching reviews data:', error);
        console.error('[FirestoreService] Error type:', typeof error);
        console.error('[FirestoreService] Error name:', error.name);
        console.error('[FirestoreService] Error message:', error.message);
        console.error('[FirestoreService] Error stack:', error.stack);
        
        console.log('[FirestoreService] Returning empty reviews array as fallback');
        return of([] as Review[]);
      })
    );
  }
}