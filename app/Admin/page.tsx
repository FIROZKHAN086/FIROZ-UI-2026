"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";

// Hooks
import { useProjects } from "./hooks/useProjects";
import { useProjectForm } from "./hooks/useProjectForm";
import { useTech } from "./hooks/useTech";
import { useStats } from "./hooks/useStats";

// Components
import { PageContainer } from "./components/layout/PageContainer";
import { Header } from "./components/layout/Header";
import { StatsCards } from "./components/stats/StatsCards";
import { Filters } from "./components/filters/Filters";
import { ProjectGrid } from "./components/projects/ProjectGrid";
import { NewProjectDialog } from "./components/dialogs/NewProjectDialog";
import { EditProjectDialog } from "./components/dialogs/EditProjectDialog";
import { DeleteProjectDialog } from "./components/dialogs/DeleteProjectDialog";

// Utils
import { validateProjectForm } from "./utils/validators";
import { Project } from "./types/project";

export default function AdminDashboard() {
  const router = useRouter();
  const { theme } = useTheme();
  
  // Hooks
  const {
    projects,
    loading,
    editingProject,
    setEditingProject,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    duplicateProject,
  } = useProjects();

  const {
    formData,
    updateFormData,
    resetForm,
    uploading,
    handleFileChange,
  } = useProjectForm();

  const {
    techInput,
    setTechInput,
    addTech,
    removeTech,
    addTechFromSuggestion,
    getFilteredSuggestions,
  } = useTech(formData, updateFormData);

  const { stats } = useStats(projects);

  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterFeatured, setFilterFeatured] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  
  // Dialog states
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuth");
    if (!isAuthenticated) {
      router.push("/Admin/login");
    }
  }, [router]);

  // Load projects on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  // Handlers
  const handleEdit = (project: Project) => {
    setEditingProject(project);
    updateFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      tech: project.tech,
      liveDemo: project.liveDemo || "",
      github: project.github || "",
      category: project.category,
      featured: project.featured,
    });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (project: Project) => {
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;
    
    try {
      await deleteProject(projectToDelete.id);
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const handleDuplicate = async (project: Project) => {
    try {
      await duplicateProject(project);
    } catch (error) {
      console.error("Duplicate error:", error);
    }
  };

  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  
  
  const errors = validateProjectForm(formData);
  if (errors.length > 0) {
    errors.forEach(error => toast.error(error));
    return;
  }

  try {
  
    const projectData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      image: formData.image,
      tech: formData.tech,
      liveDemo: formData.liveDemo.trim(),
      github: formData.github.trim(),
      category: formData.category.trim(),
      featured: formData.featured,
    };

   

    if (editingProject) {
      // Update  project
      await updateProject(editingProject.id, projectData);
      setEditDialogOpen(false);
    } else {
      // Create new project
      await createProject(projectData);
      setNewDialogOpen(false);
    }
    
    // Reset form
    resetForm();
    setEditingProject(null);
    
  } catch (error) {
    console.error("❌ Submit error:", error);
  }
};

  // Filter and sort projects
  const filteredProjects = projects
    .filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tech.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = 
        filterCategory === "all" || project.category === filterCategory;
      
      const matchesFeatured = 
        filterFeatured === "all" || 
        (filterFeatured === "featured" && project.featured) ||
        (filterFeatured === "regular" && !project.featured);
      
      return matchesSearch && matchesCategory && matchesFeatured;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
        case "oldest":
          return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        case "featured":
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return 0;
      }
    });

  const categories = ["all", ...new Set(projects.map(p => p.category).filter(Boolean))];

  // Loading state
  if (loading && projects.length === 0) {
    return (
      <PageContainer>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-6">
            <Skeleton className="h-12 w-48" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-2xl" />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    );
  }

  const darkMode = theme === "dark";

  return (
    <PageContainer>
      <Toaster 
        position="top-right"
        toastOptions={{
          className: 'dark:bg-gray-800 dark:text-white',
          style: {
            borderRadius: '12px',
            background: darkMode ? '#1f2937' : '#fff',
            color: darkMode ? '#fff' : '#000',
            border: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
          },
        }}
      />

      <Header totalProjects={projects.length} totalTech={stats.totalTech} />

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <StatsCards 
          stats={stats}
          onRefresh={fetchProjects}
          onNewProject={() => setNewDialogOpen(true)}
        />
      </div>

      {/* Controls Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          filterFeatured={filterFeatured}
          setFilterFeatured={setFilterFeatured}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={categories}
        />
      </div>

      {/* Projects Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-12">
        <ProjectGrid
          projects={filteredProjects}
          onEdit={handleEdit}
          onDelete={(id: string) => {
            const project = projects.find(p => p.id === id);
            if (project) handleDeleteClick(project);
          }}
          onDuplicate={handleDuplicate}
        />
      </main>

      {/* New Project Dialog */}
      <NewProjectDialog
        isOpen={newDialogOpen}
        onOpenChange={setNewDialogOpen}
        formData={formData}
        updateFormData={updateFormData}
        uploading={uploading}
        onFileSelect={async (file: File) => {
          await handleFileChange(file);
        }}
        onSubmit={handleSubmit}
        onCancel={() => {
          setNewDialogOpen(false);
          resetForm();
        }}
        techInput={techInput}
        onTechInputChange={setTechInput}
        onAddTech={addTech}
        onRemoveTech={removeTech}
        onAddSuggestion={addTechFromSuggestion}
        filteredSuggestions={getFilteredSuggestions()}
      />

      {/* Edit Project Dialog */}
      <EditProjectDialog
        isOpen={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        formData={formData}
        updateFormData={updateFormData}
        uploading={uploading}
        onFileSelect={async (file: File) => {
          await handleFileChange(file);
        }}
        onSubmit={handleSubmit}
        onCancel={() => {
          setEditDialogOpen(false);
          resetForm();
          setEditingProject(null);
        }}
        techInput={techInput}
        onTechInputChange={setTechInput}
        onAddTech={addTech}
        onRemoveTech={removeTech}
        onAddSuggestion={addTechFromSuggestion}
        filteredSuggestions={getFilteredSuggestions()}
      />

      {/* Delete Project Dialog */}
      <DeleteProjectDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        projectTitle={projectToDelete?.title || ""}
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setProjectToDelete(null);
        }}
      />

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12 border-t border-gray-200 dark:border-gray-800">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Portfolio Admin Dashboard • Built with Next.js & shadcn/ui
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
            Last sync: {stats.lastUpdated} • {projects.length} projects
          </p>
        </div>
      </footer>
    </PageContainer>
  );
}