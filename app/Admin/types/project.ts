export type Project = {
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
  updatedAt?: string;
};

export type ProjectFormData = {
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveDemo: string;
  github: string;
  category: string;
  featured: boolean;
};

export type Stats = {
  total: number;
  featured: number;
  webApps: number;
  mobile: number;
  api: number;
  lastUpdated: string;
  totalTech: number;
};

export type FilterState = {
  searchTerm: string;
  filterCategory: string;
  filterFeatured: string;
  sortBy: string;
};