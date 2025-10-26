export interface Review {
  id?: string;
  name: string;
  role: string;
  message: string;
  rating: number;
  image: string;
  company?: string;
  date: string;
}