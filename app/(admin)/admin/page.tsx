'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, Star, Sparkles, TrendingUp } from 'lucide-react';
import { Project } from '../types';

const statIcons = [FolderGit2, Star, Sparkles, TrendingUp];

const statGradients = [
  'from-purple-500 to-pink-500',
  'from-amber-500 to-orange-500',
  'from-emerald-500 to-teal-500',
  'from-blue-500 to-cyan-500',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0, opacity: 1, scale: 1,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15 },
  },
  hover: {
    y: -4,
    transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
  },
};

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/ProjectApi');
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { title: 'Total Projects', value: projects.length },
    { title: 'Featured Projects', value: projects.filter(p => p.featured).length },
    { title: 'Categories', value: new Set(projects.map(p => p.category)).size },
    { title: 'Technologies', value: new Set(projects.flatMap(p => p.tech)).size },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-2 border-white/5" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
            className="absolute inset-2 rounded-full border-2 border-transparent border-t-pink-400"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      >
        <h1 className="text-5xl font-bold tracking-tight">
          <span className="bg-linear-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
            Dashboard
          </span>
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Welcome back! Here&apos;s what&apos;s happening with your portfolio.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {stats.map((stat, index) => {
          const Icon = statIcons[index];
          return (
            <motion.div
              key={stat.title}
              variants={cardVariants}
              whileHover="hover"
              className="group relative"
            >
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-white/[0.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-2xl bg-linear-to-b from-gray-900/80 to-gray-950/80 backdrop-blur-xl border border-white/5 p-6 overflow-hidden">
                {/* Animated gradient background */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-linear-to-br ${statGradients[index]} opacity-5 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:opacity-10 transition-opacity duration-500`} />

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {stat.title}
                  </span>
                  <div className={`p-3 rounded-xl bg-linear-to-br ${statGradients[index]} shadow-lg`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </div>

                <motion.div
                  key={stat.value}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring' as const, stiffness: 200, damping: 15, delay: 0.2 + index * 0.1 }}
                  className="text-4xl font-bold tracking-tight text-white"
                >
                  {stat.value}
                </motion.div>

                {/* Shimmer line */}
                <div className="mt-4 h-0.5 w-full rounded-full bg-linear-to-r from-transparent via-white/5 to-transparent" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Recent Projects */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, type: 'spring' as const, stiffness: 80, damping: 15 }}
      >
        <div className="rounded-2xl bg-linear-to-b from-gray-900/80 to-gray-950/80 backdrop-blur-xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-white/5">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
              Recent Projects
            </h2>
          </div>
          <div className="p-2">
            {projects.slice(0, 5).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.08, type: 'spring' as const, stiffness: 100 }}
                className="group flex items-center justify-between p-4 rounded-xl hover:bg-white/[0.03] transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`h-2 w-2 rounded-full ${
                    index === 0 ? 'bg-purple-500' :
                    index === 1 ? 'bg-pink-500' :
                    index === 2 ? 'bg-blue-500' :
                    index === 3 ? 'bg-emerald-500' : 'bg-amber-500'
                  }`} />
                  <div>
                    <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500">{project.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {project.featured && (
                    <span className="text-[11px] font-semibold uppercase tracking-wider bg-linear-to-r from-amber-500/10 to-orange-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                  <div className="flex -space-x-2">
                    {project.tech.slice(0, 3).map((tech, i) => (
                      <div
                        key={i}
                        className="h-7 w-7 rounded-full bg-gray-800 border-2 border-gray-900 flex items-center justify-center text-[9px] font-medium text-gray-400"
                        title={tech}
                      >
                        {tech[0]}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
            {projects.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No projects yet. Create your first project!
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
