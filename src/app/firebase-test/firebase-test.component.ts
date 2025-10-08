import { Component, OnInit } from '@angular/core';
import { Firestore, collection, query, where, getDocs, doc, getDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-firebase-test',
  standalone: true,
  template: `
    <div class="p-4 max-w-2xl mx-auto">
      <h2 class="text-2xl font-bold mb-6 text-center">Firebase Connection Test</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button (click)="testConnection()" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition">
          Test Collection Access
        </button>
        <button (click)="testDocument()" class="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition">
          Test Specific Document
        </button>
        <button (click)="testLoginQuery()" class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg transition">
          Test Login Query
        </button>
        <button (click)="testRules()" class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded-lg transition">
          Test Rules
        </button>
      </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Test Email:</label>
        <input 
          [(ngModel)]="testEmail" 
          type="email" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg"
          placeholder="Enter test email">
      </div>
      
      <div class="mb-6">
        <label class="block text-gray-700 mb-2">Test Password:</label>
        <input 
          [(ngModel)]="testPassword" 
          type="password" 
          class="w-full px-3 py-2 border border-gray-300 rounded-lg"
          placeholder="Enter test password">
      </div>
      
      <div *ngIf="loading" class="mt-4 text-yellow-600 bg-yellow-50 p-4 rounded-lg">
        <div class="flex items-center">
          <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600 mr-3"></div>
          <span>Processing...</span>
        </div>
      </div>
      
      <div *ngIf="result" class="mt-4 p-4 bg-green-50 text-green-800 rounded-lg">
        <h3 class="font-bold mb-2">Success:</h3>
        <pre class="whitespace-pre-wrap">{{ result | json }}</pre>
      </div>
      
      <div *ngIf="error" class="mt-4 p-4 bg-red-50 text-red-800 rounded-lg">
        <h3 class="font-bold mb-2">Error:</h3>
        <pre class="whitespace-pre-wrap">{{ error }}</pre>
      </div>
    </div>
  `,
  imports: [CommonModule, FormsModule]
})
export class FirebaseTestComponent implements OnInit {
  result: any = null;
  error: string = '';
  loading: boolean = false;
  testEmail: string = 'atishpawar1193@gmail.com';
  testPassword: string = 'Shraddhaone@28';

  constructor(private firestore: Firestore) {}

  ngOnInit() {}

  async testConnection() {
    this.loading = true;
    this.result = null;
    this.error = '';
    
    try {
      console.log('Testing Firestore collection access...');
      const adminCollection = collection(this.firestore, 'adminlogin');
      const q = query(adminCollection);
      const querySnapshot = await getDocs(q);
      
      console.log('Query snapshot:', querySnapshot);
      this.result = {
        success: true,
        message: 'Collection access successful',
        docCount: querySnapshot.size,
        docs: querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))
      };
    } catch (error: any) {
      console.error('Collection access test error:', error);
      this.error = `Error: ${error?.message || 'Unknown error'}\nCode: ${error?.code || 'N/A'}`;
    } finally {
      this.loading = false;
    }
  }

  async testDocument() {
    this.loading = true;
    this.result = null;
    this.error = '';
    
    try {
      console.log('Testing specific document...');
      const docRef = doc(this.firestore, 'adminlogin', 'adminUser');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        this.result = {
          success: true,
          message: 'Document found',
          id: docSnap.id,
          data: docSnap.data()
        };
      } else {
        this.result = {
          success: false,
          message: 'Document not found'
        };
      }
    } catch (error: any) {
      console.error('Document test error:', error);
      this.error = `Error: ${error?.message || 'Unknown error'}\nCode: ${error?.code || 'N/A'}`;
    } finally {
      this.loading = false;
    }
  }

  async testLoginQuery() {
    this.loading = true;
    this.result = null;
    this.error = '';
    
    try {
      console.log('Testing login query with:', {
        email: this.testEmail,
        password: this.testPassword
      });
      
      const adminCollection = collection(this.firestore, 'adminlogin');
      const q = query(
        adminCollection,
        where('email', '==', this.testEmail),
        where('password', '==', this.testPassword)
      );
      const querySnapshot = await getDocs(q);
      
      console.log('Login query snapshot:', querySnapshot);
      this.result = {
        success: true,
        message: 'Login query executed',
        matches: querySnapshot.size,
        docs: querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }))
      };
    } catch (error: any) {
      console.error('Login query test error:', error);
      this.error = `Error: ${error?.message || 'Unknown error'}\nCode: ${error?.code || 'N/A'}`;
    } finally {
      this.loading = false;
    }
  }

  async testRules() {
    this.loading = true;
    this.result = null;
    this.error = '';
    
    try {
      console.log('Testing Firestore rules by attempting various operations...');
      
      // Test 1: Can we read from the collection?
      const readTest = await this.testReadAccess();
      
      // Test 2: Can we write to the collection? (should fail)
      const writeTest = await this.testWriteAccess();
      
      this.result = {
        readAccess: readTest,
        writeAccess: writeTest
      };
    } catch (error: any) {
      console.error('Rules test error:', error);
      this.error = `Error: ${error?.message || 'Unknown error'}\nCode: ${error?.code || 'N/A'}`;
    } finally {
      this.loading = false;
    }
  }

  private async testReadAccess(): Promise<any> {
    try {
      const adminCollection = collection(this.firestore, 'adminlogin');
      const q = query(adminCollection, where('email', '==', 'test@test.com'));
      await getDocs(q);
      return { success: true, message: 'Read access granted' };
    } catch (error: any) {
      return { success: false, message: error?.message || 'Read access denied', code: error?.code || 'N/A' };
    }
  }

  private async testWriteAccess(): Promise<any> {
    try {
      const adminCollection = collection(this.firestore, 'adminlogin');
      // We won't actually write, just test if we can
      return { success: false, message: 'Write test skipped for safety', code: 'SKIPPED' };
    } catch (error: any) {
      return { success: false, message: error?.message || 'Write access denied', code: error?.code || 'N/A' };
    }
  }
}