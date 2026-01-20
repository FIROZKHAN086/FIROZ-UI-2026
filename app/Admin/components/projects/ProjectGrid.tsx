"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";
import { Project } from "../../types/project";
import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onDuplicate: (project: Project) => void;
}

export function ProjectGrid({ projects, onEdit, onDelete, onDuplicate }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <Card className="border-dashed border-2">
        <CardContent className="py-16 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
            <ImageIcon className="w-10 h-10 text-blue-500 dark:text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
            No projects found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
            Try adjusting your search or filter criteria
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          onEdit={() => onEdit(project)}
          onDelete={() => onDelete(project.id)}
          onDuplicate={() => onDuplicate(project)}
        />
      ))}
    </div>
  );
}