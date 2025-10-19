export interface AboutSection {
  profilePhotoUrl: string;
  title: string;
  content: string;
  skills: AboutSkill[];
  stats: AboutStats;
}

export interface AboutSkill {
  name: string;
  description: string;
}

export interface AboutStats {
  experience: string;
  projects: string;
  satisfaction: string;
} 