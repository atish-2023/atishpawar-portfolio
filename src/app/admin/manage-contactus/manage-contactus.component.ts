import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, ContactMessage } from '../../core/api.service';

@Component({
  selector: 'app-manage-contactus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-contactus.component.html',
  styleUrls: ['./manage-contactus.component.scss']
})
export class ManageContactusComponent implements OnInit {
  contactMessages: ContactMessage[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.loadContactMessages();
  }

  loadContactMessages(): void {
    this.apiService.getContactMessages().subscribe({
      next: (messages: ContactMessage[]) => {
        this.contactMessages = messages;
      },
      error: (error: any) => {
        console.error('Error loading contact messages', error);
      }
    });
  }

  deleteMessage(messageId: string): void {
    if (confirm('Are you sure you want to delete this message?')) {
      this.apiService.deleteContactMessage(messageId).subscribe({
        next: () => {
          console.log('Message deleted successfully');
          this.loadContactMessages(); // Refresh the list
        },
        error: (error: any) => {
          console.error('Error deleting message', error);
        }
      });
    }
  }

  formatDate(timestamp: number): string {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}