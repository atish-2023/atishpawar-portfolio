import { Component, OnInit } from '@angular/core';
import { Firestore, collection, query, where, getDocs, doc, getDoc, collectionData } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-firestore-debug',
  standalone: true,
  template: `
    <div class="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h2 class="text-2xl font-bold text-center text-gray-800">Firestore Debug Tool</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="border rounded-lg p-4">
          <h3 class="text-lg font-semibold mb-3">Connection Tests</h3>
          <div class="space-y-3">
            <button (click)="testCollectionAccess()" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Test Collection Access
            </button>
            <button (click)="listAllDocuments()" class="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded">
              List All Documents
            </button>
            <button (click)="testSpecificDocument()" class="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">
              Test Specific Document
            </button>
          </div>
        </div>
        
        <div class="border rounded-lg p-4">
          <h3 class="text-lg font-semibold mb-3">Login Simulation</h3>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input [(ngModel)]="testEmail" type="email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Password</label>
              <input [(ngModel)]="testPassword" type="password" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
            </div>
            <button (click)="testLoginQuery()" class="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded">
              Test Login Query
            </button>
          </div>
        </div>
      </div>
      
      <div *ngIf="loading" class="text-center py-4">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p class="mt-2">Processing...</p>
      </div>
      
      <div *ngIf="results.length > 0" class="border rounded-lg p-4 bg-gray-50">
        <h3 class="text-lg font-semibold mb-3">Test Results</h3>
        <div *ngFor="let result of results; let i = index" class="mb-4 p-3 rounded border bg-white">
          <div class="font-medium" [ngClass]="result.success ? 'text-green-600' : 'text-red-600'">
            {{ result.title }}
          </div>
          <div class="mt-2 text-sm">
            <pre class="whitespace-pre-wrap">{{ result.data | json }}</pre>
          </div>
          <div *ngIf="result.error" class="mt-2 text-xs text-red-500">
            Error: {{ result.error }}
          </div>
        </div>
        <button (click)="clearResults()" class="mt-2 text-sm text-gray-500 hover:text-gray-700">
          Clear Results
        </button>
      </div>
    </div>
  `,
  imports: [CommonModule, FormsModule]
})
export class FirestoreDebugComponent implements OnInit {
  testEmail: string = 'atishpawar1193@gmail.com';
  testPassword: string = 'Shraddhaone@28';
  loading: boolean = false;
  results: any[] = [];

  constructor(private firestore: Firestore) {}

  ngOnInit() {}

  clearResults() {
    this.results = [];
  }

  async testCollectionAccess() {
    this.loading = true;
    try {
      console.log('Testing collection access...');
      const adminCollection = collection(this.firestore, 'adminlogin');
      // This should work if rules allow read access
      const snapshot = await getDocs(adminCollection);
      
      this.results.unshift({
        title: 'Collection Access Test',
        success: true,
        data: {
          message: 'Successfully accessed collection',
          documentCount: snapshot.size
        }
      });
    } catch (error: any) {
      this.results.unshift({
        title: 'Collection Access Test',
        success: false,
        error: error?.message || 'Unknown error',
        data: {
          code: error?.code || 'N/A'
        }
      });
    } finally {
      this.loading = false;
    }
  }

  async listAllDocuments() {
    this.loading = true;
    try {
      console.log('Listing all documents...');
      const adminCollection = collection(this.firestore, 'adminlogin');
      const snapshot = await getDocs(adminCollection);
      
      const documents = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }));
      
      this.results.unshift({
        title: 'List All Documents',
        success: true,
        data: {
          message: `Found ${documents.length} documents`,
          documents: documents
        }
      });
    } catch (error: any) {
      this.results.unshift({
        title: 'List All Documents',
        success: false,
        error: error?.message || 'Unknown error',
        data: {
          code: error?.code || 'N/A'
        }
      });
    } finally {
      this.loading = false;
    }
  }

  async testSpecificDocument() {
    this.loading = true;
    try {
      console.log('Testing specific document access...');
      // Try to access the document that should exist
      const docRef = doc(this.firestore, 'adminlogin', 'adminUser');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        this.results.unshift({
          title: 'Specific Document Test',
          success: true,
          data: {
            message: 'Document found',
            id: docSnap.id,
            data: docSnap.data()
          }
        });
      } else {
        this.results.unshift({
          title: 'Specific Document Test',
          success: false,
          data: {
            message: 'Document does not exist'
          }
        });
        
        // Let's also check if there might be documents with different IDs
        await this.listAllDocuments();
      }
    } catch (error: any) {
      this.results.unshift({
        title: 'Specific Document Test',
        success: false,
        error: error?.message || 'Unknown error',
        data: {
          code: error?.code || 'N/A'
        }
      });
    } finally {
      this.loading = false;
    }
  }

  async testLoginQuery() {
    this.loading = true;
    try {
      console.log('Testing login query...', {
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
      
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }));
      
      this.results.unshift({
        title: 'Login Query Test',
        success: true,
        data: {
          message: `Query returned ${documents.length} matching documents`,
          matches: documents.length,
          documents: documents
        }
      });
    } catch (error: any) {
      this.results.unshift({
        title: 'Login Query Test',
        success: false,
        error: error?.message || 'Unknown error',
        data: {
          code: error?.code || 'N/A'
        }
      });
    } finally {
      this.loading = false;
    }
  }
}