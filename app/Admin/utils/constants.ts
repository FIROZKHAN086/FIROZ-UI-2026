export const techSuggestions = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js",
  "Express", "MongoDB", "PostgreSQL", "GraphQL", "Python",
  "Django", "Vue.js", "Nuxt.js", "Svelte", "Firebase",
  "AWS", "Docker", "Kubernetes", "React Native", "Flutter"
];

export const categories = [
  "Web Application",
  "Mobile App", 
  "API",
  "E-commerce",
  "Dashboard",
  "Landing Page",
  "Full Stack",
  "UI/UX Design",
  "Other"
];

export const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "title", label: "Title A-Z" },
  { value: "featured", label: "Featured First" }
];

export const featuredOptions = [
  { value: "all", label: "All Projects" },
  { value: "featured", label: "Featured Only" },
  { value: "regular", label: "Regular Only" }
];

export const CLOUDINARY_CONFIG = {
  cloudName: 'dofqkx3dh',
  uploadPreset: 'next_Protfolio',
  folder: 'portfolio-projects'
} as const;