import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionWrapperComponent } from '../../shared/components/layout/section-wrapper/section-wrapper.component';
import { ContactFormComponent } from '../../shared/components/ui/contact-form/contact-form.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, SectionWrapperComponent, ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  onFormSubmit(formData: any) {
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  }
}