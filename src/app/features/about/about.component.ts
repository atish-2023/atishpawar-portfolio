import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionWrapperComponent } from '../../shared/components/layout/section-wrapper/section-wrapper.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SectionWrapperComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  profileConfig = {
    title: 'Professional Summary',
    content: `I'm a passionate Full Stack Developer with expertise in creating modern web applications. 
              With a strong foundation in both frontend and backend technologies, I bring ideas to life 
              through clean, efficient, and scalable code.

              My approach combines technical excellence with creative problem-solving to deliver 
              exceptional digital experiences that meet both user needs and business objectives.`,
    customClasses: 'bg-slate-800/50 backdrop-blur border border-slate-700/30'
  };
}