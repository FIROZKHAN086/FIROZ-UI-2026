'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Sparkles } from 'lucide-react';
import { Project } from '../../types';
import { toast } from 'sonner';
import ProjectsTable from '../_Components/ProjectsTable';
import ProjectFormSheet from '../_Components/ProjectFormSheet';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/ProjectApi');
      const data = await res.json();
      setProjects(data);
    } catch {
      toast.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setSheetOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await fetch(`/api/ProjectApi/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Project deleted successfully');
        fetchProjects();
      } else {
        toast.error('Failed to delete project');
      }
    } catch {
      toast.error('Failed to delete project');
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      const url = editingProject ? `/api/ProjectApi/${editingProject.id}` : '/api/ProjectApi';
      const method = editingProject ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      console.log(res);
      
      if (res.ok) {
        toast.success(editingProject ? 'Project updated successfully' : 'Project created successfully');
        fetchProjects();
        setSheetOpen(false);
        setEditingProject(null);
      } else {
        toast.error('Failed  save project');
      }
    } catch {
      toast.error('Failed to save project');
    }
  };

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
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 className="text-5xl font-bold tracking-tight">
            <span className="bg-linear-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="text-gray-500 mt-2">Manage your portfolio projects</p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={() => {
              setEditingProject(null);
              setSheetOpen(true);
            }}
            className="bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg shadow-purple-500/25 px-6 py-6 text-base"
          >
            <Plus className="h-5 w-5 mr-2" />
            <Sparkles className="h-4 w-4 mr-1" />
            Add Project
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 80, damping: 15 }}
      >
        <ProjectsTable
          projects={projects}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </motion.div>

      <ProjectFormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        project={editingProject}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
