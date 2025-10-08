import { Injectable } from '@angular/core';
import { Firestore, collection, query, where, getDocs, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(
    private firestore: Firestore,
    private router: Router
  ) {
    console.log('AuthService initialized');
  }

  async login(email: string, password: string): Promise<{ success: boolean; message?: string }> {
    try {
      console.log('Attempting login with:', email);
      const adminCollection = collection(this.firestore, 'adminlogin');
      const q = query(adminCollection, where('email', '==', email), where('password', '==', password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        this.isAuthenticated = true;
        console.log('Login successful');
        return { success: true };
      } else {
        console.log('Invalid credentials');
        return { success: false, message: 'Invalid credentials. Please try again.' };
      }
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, message: 'An error occurred during login. Please try again.' };
    }
  }

  async initializeAdminUser(): Promise<void> {
    try {
      console.log('Initializing admin user in Firestore');
      const adminCollection = collection(this.firestore, 'adminlogin');
      const q = query(adminCollection, where('email', '==', 'atishpawar1193@gmail.com'));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Create the admin user document if it doesn't exist
        const adminDoc = doc(this.firestore, 'adminlogin', 'adminUser');
        await setDoc(adminDoc, {
          email: 'atishpawar1193@gmail.com',
          password: 'Shraddhaone@28'
        });
        console.log('Admin user created successfully in Firestore');
      } else {
        console.log('Admin user already exists in Firestore');
      }
    } catch (error) {
      console.error('Error initializing admin user:', error);
    }
  }

  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getToken(): Promise<string | null> {
    // For now, return null as we're not using token-based auth
    return Promise.resolve(null);
  }
}