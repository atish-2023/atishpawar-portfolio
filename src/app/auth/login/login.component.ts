import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
    rememberMe: false
  };
  errorMessage = '';
  showPassword = false;
  isLoading = false;

  constructor(
    private firestore: Firestore,
    private router: Router
  ) {}

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  async onLogin(): Promise<void> {
    // Reset error message
    this.errorMessage = '';
    
    // Simple validation
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Please fill in all required fields';
      return;
    }

    // Set loading state
    this.isLoading = true;
    console.log('Login process started');

    try {
      console.log('Attempting login with:', {
        email: this.loginData.email,
        password: this.loginData.password
      });
      
      // Query Firestore for admin credentials
      // Using the correct collection name as defined in firestore.rules
      const adminCollection = collection(this.firestore, 'adminlogin');
      console.log('Admin collection reference created');
      
      const q = query(
        adminCollection, 
        where('email', '==', this.loginData.email),
        where('password', '==', this.loginData.password)
      );
      console.log('Query created with email and password filters');
      
      const querySnapshot = await getDocs(q);
      console.log('Query executed, snapshot received:', {
        empty: querySnapshot.empty,
        size: querySnapshot.size
      });
      
      // Log all documents for debugging
      querySnapshot.forEach((doc) => {
        console.log('Found document:', doc.id, '=>', doc.data());
      });
      
      if (!querySnapshot.empty) {
        // Login successful
        console.log('Login successful, navigating to admin dashboard');
        // Clear input fields
        this.loginData.email = '';
        this.loginData.password = '';
        // Navigate to admin dashboard
        this.router.navigate(['/admin/dashboard']);
      } else {
        // Invalid credentials
        this.errorMessage = 'Invalid email or password.';
        console.log('Invalid credentials - no matching documents found');
      }
    } catch (error: any) {
      console.error('Error during login:', error);
      console.error('Error name:', error?.name);
      console.error('Error message:', error?.message);
      console.error('Error code:', error?.code);
      console.error('Error stack:', error?.stack);
      
      // More user-friendly error messages
      if (error?.code === 'permission-denied') {
        this.errorMessage = 'Access denied. Please check your Firestore rules and permissions.';
        // Provide specific guidance
        console.log('PERMISSION DENIED: This usually means your Firestore rules are not properly configured.');
        console.log('Please ensure your firestore.rules file allows read access to the adminlogin collection.');
      } else if (error?.code === 'unavailable') {
        this.errorMessage = 'Service unavailable. Please try again later.';
      } else if (error?.code === 'failed-precondition') {
        this.errorMessage = 'Database operation failed. Please check your connection.';
      } else {
        this.errorMessage = 'An error occurred during login. Please try again.';
      }
    } finally {
      // Reset loading state
      this.isLoading = false;
      console.log('Login process completed');
    }
  }
}