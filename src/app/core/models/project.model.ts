export interface Project {
  id?: string;
  title: string;
  description: string;
  longDescription?: string;
  images?: string[];
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  category?: string;
  date?: string;
}