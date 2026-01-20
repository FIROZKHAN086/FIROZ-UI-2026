"use client";

import { useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Project, ProjectFormData } from "../types/project";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/projects");
      setProjects(response.data);
      return response.data;
    } catch (error: any) {
      console.error("Fetch projects error:", error);
      toast.error(error.response?.data?.error || "Failed to load projects");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = useCallback(async (formData: ProjectFormData) => {
    try {
     
      
      const projectData = {
        ...formData,
        // Ensure all fields are properly formatted
        tech: Array.isArray(formData.tech) ? formData.tech : [],
        liveDemo: formData.liveDemo || "",
        github: formData.github || "",
        image: formData.image || "",
        featured: formData.featured || false,
      };

      const response = await axios.post("/api/projects", projectData);
      
      // Update local state immediately
      setProjects(prev => [response.data, ...prev]);
      
      toast.success("Project created successfully");
      return response.data;
    } catch (error: any) {
      console.error("Create project error:", error);
      
    
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          "Failed to create project";
      
      toast.error(errorMessage);
      throw error;
    }
  }, []);

  const updateProject = useCallback(async (id: string, formData: ProjectFormData) => {
    try {
      const projectData = {
        ...formData,
        tech: Array.isArray(formData.tech) ? formData.tech : [],
        liveDemo: formData.liveDemo || "",
        github: formData.github || "",
        image: formData.image || "",
        featured: formData.featured || false,
      };

      
      
      const response = await axios.put(`/api/projects/${id}`, projectData);
      
      // Update local state
      setProjects(prev => 
        prev.map(project => 
          project.id === id ? response.data : project
        )
      );
      
      toast.success("Project updated successfully");
      return response.data;
    } catch (error: any) {
      console.error("Update project error:", error);
      
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          "Failed to update project";
      
      toast.error(errorMessage);
      throw error;
    }
  }, []);

 const deleteProject = useCallback(async (id: string) => {
  try {
 
    
    // ✅ Validate ID before making request
    if (!id || id === "undefined") {
      toast.error("Invalid project ID");
      throw new Error("Invalid project ID");
    }
    
    const response = await axios.delete(`/api/projects/${id}`);
   
    setProjects(prev => prev.filter(project => project.id !== id));
    
    toast.success("Project deleted successfully");
  } catch (error: any) {
    console.error("❌ Delete project error:", error);
    
    let errorMessage = "Failed to delete project";
    
    if (error.response) {
      // Server responded with error
      errorMessage = error.response.data?.error || error.response.data?.message || errorMessage;
      console.error("Server error response:", error.response.data);
    } else if (error.request) {
      // No response received
      errorMessage = "No response from server";
      console.error("No response received:", error.request);
    } else {
      // Request setup error
      errorMessage = error.message || errorMessage;
      console.error("Request setup error:", error.message);
    }
    
    toast.error(errorMessage);
    throw error;
  }
  }, []);

  const duplicateProject = useCallback(async (project: Project) => {
    try {
      const { id, ...projectData } = project;
      const newProject = {
        ...projectData,
        title: `${project.title} (Copy)`,
        // Reset timestamps
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

     
      
      const response = await axios.post("/api/projects", newProject);
      
      // Update local state
      setProjects(prev => [response.data, ...prev]);
      
      toast.success("Project duplicated successfully");
      return response.data;
    } catch (error: any) {
      console.error("Duplicate project error:", error);
      
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          "Failed to duplicate project";
      
      toast.error(errorMessage);
      throw error;
    }
  }, []);

  return {
    projects,
    setProjects,
    loading,
    editingProject,
    setEditingProject,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    duplicateProject,
  };
};