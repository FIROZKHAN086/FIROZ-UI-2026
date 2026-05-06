import { Globe, Layers, Star,Smartphone, Database, Brain, ShoppingCart,  } from "lucide-react";

export const techColors: Record<string, string> = {
  "React": "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
  "Next.js": "bg-gray-900/10 dark:bg-gray-100/10 text-gray-900 dark:text-gray-100 border-gray-700/30",
  "TypeScript": "bg-blue-600/10 text-blue-700 dark:text-blue-300 border-blue-600/30",
  "JavaScript": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-500/30",
  "Tailwind CSS": "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30",
  "Node.js": "bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/30",
  "Express": "bg-gray-500/10 text-gray-700 dark:text-gray-300 border-gray-500/30",
  "MongoDB": "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  "Firebase": "bg-yellow-500/10 text-yellow-700 dark:text-orange-300 border-yellow-500/30",
  "Gsap": "bg-green-400/10 text-green-700 dark:text-green-300 border-green-400/30",
  "Motion": "bg-purple-500/10 text-purple-700 dark:text-pink-300 border-purple-500/30",
  "Axios": "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
  "Redux": "bg-purple-600/10 text-purple-700 dark:text-purple-300 border-purple-600/30",
  "Three.js": "bg-gray-800/10 dark:bg-gray-100/10 text-gray-900 dark:text-gray-100 border-gray-700/30",
  "HTML": "bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/30",
  "CSS": "bg-blue-400/10 text-blue-700 dark:text-blue-300 border-blue-400/30",
  "default": "bg-gray-500/10 text-gray-700 dark:text-gray-300 border-gray-500/30",
};

export const categories = [
  { id: "all", label: "All Projects", icon: Layers, color: "from-blue-500 to-cyan-500" },
  { id: "featured", label: "Featured", icon: Star, color: "from-yellow-500 to-orange-500" },
  { id: "web", label: "Web Apps", icon: Globe, color: "from-green-500 to-emerald-500" },
  { id: "mobile", label: "Mobile", icon: Smartphone, color: "from-purple-500 to-pink-500" },
  { id: "api", label: "APIs", icon: Database, color: "from-red-500 to-pink-500" },
  { id: "ai", label: "AI/ML", icon: Brain, color: "from-indigo-500 to-purple-500" },
  { id: "ecommerce", label: "E-commerce", icon: ShoppingCart, color: "from-teal-500 to-cyan-500" },
];