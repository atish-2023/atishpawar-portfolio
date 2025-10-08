import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Certification {
  title: string;
  organization: string;
  date: string;
  description: string;
  logo: string;
}

@Component({
  selector: 'app-certification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent {
  certifications: Certification[] = [
    {
      title: 'AWS Certified Solutions Architect',
      organization: 'Amazon Web Services',
      date: 'March 2023',
      description: 'Validates ability to design and deploy scalable, highly available, and fault-tolerant systems on AWS.',
      logo: 'assets/aws.png'
    },
    {
      title: 'Google Professional Cloud Developer',
      organization: 'Google Cloud',
      date: 'November 2022',
      description: 'Demonstrates proficiency in designing, building, and managing cloud applications using Google Cloud Platform.',
      logo: 'assets/gcp.png'
    },
    {
      title: 'Certified Kubernetes Administrator',
      organization: 'Cloud Native Computing Foundation',
      date: 'July 2022',
      description: 'Proves expertise in Kubernetes administration, installation, configuration, and management.',
      logo: 'assets/kubernetes.png'
    },
    {
      title: 'Microsoft Certified: Azure Developer',
      organization: 'Microsoft',
      date: 'April 2022',
      description: 'Validates skills in designing, building, testing, and maintaining cloud applications on Azure.',
      logo: 'assets/azure.png'
    },
    {
      title: 'Full Stack Web Development',
      organization: 'University of Technology',
      date: 'January 2021',
      description: 'Comprehensive program covering modern web technologies, frameworks, and best practices.',
      logo: 'assets/university.png'
    },
    {
      title: 'Agile Project Management',
      organization: 'Scrum Alliance',
      date: 'September 2020',
      description: 'Certification in agile methodologies, Scrum framework, and iterative project delivery.',
      logo: 'assets/scrum.png'
    }
  ];
}