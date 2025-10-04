import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// We'll implement Firebase authentication methods here
// For now, we'll create a mock implementation that can be replaced with actual Firebase integration

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  isAdmin: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdminSubject.asObservable();

  constructor() {
    // Check if user is already logged in (from localStorage, etc.)
    this.checkAuthState();
  }

  private checkAuthState(): void {
    // In a real implementation, this would check Firebase auth state
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
      this.isAdminSubject.next(user.isAdmin || false);
    }
  }

  // Mock login method - replace with actual Firebase authentication
  login(email: string, password: string): Observable<User> {
    return new Observable(observer => {
      // Simulate API call delay
      setTimeout(() => {
        // Mock user data - in real implementation, this would come from Firebase
        const user: User = {
          uid: 'mock-uid-123',
          email: email,
          displayName: 'Atish Pawar',
          photoURL: '',
          isAdmin: true // For demo purposes, assume all logins are admin
        };

        // Store user in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(user));
        
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
        this.isAdminSubject.next(user.isAdmin);
        
        observer.next(user);
        observer.complete();
      }, 500);
    });
  }

  // Mock logout method
  logout(): void {
    // Remove user from localStorage
    localStorage.removeItem('user');
    
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.isAdminSubject.next(false);
  }

  // Get current user token (for API requests)
  async getToken(): Promise<string | null> {
    // In a real implementation, this would get the Firebase ID token
    const user = this.currentUserSubject.value;
    if (user) {
      // Mock token - in real implementation, use Firebase getIdToken()
      return 'mock-firebase-token-123';
    }
    return null;
  }

  // Check if user is admin
  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.isAdmin : false;
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}