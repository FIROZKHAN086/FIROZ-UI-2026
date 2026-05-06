 export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveDemo?: string;
  github?: string;
  category: string;
  featured: boolean;
  createdAt?: string;
  views?: number;
  likes?: number;
}