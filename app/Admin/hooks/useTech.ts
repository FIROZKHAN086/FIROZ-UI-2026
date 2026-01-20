"use client";

import { useState, useCallback } from "react";
import { ProjectFormData } from "../types/project";
import { techSuggestions } from "../utils/constants";

export const useTech = (formData: ProjectFormData, updateFormData: (updates: Partial<ProjectFormData>) => void) => {
  const [techInput, setTechInput] = useState("");

  const addTech = useCallback(() => {
    if (techInput.trim() && !formData.tech.includes(techInput.trim())) {
      updateFormData({
        tech: [...formData.tech, techInput.trim()]
      });
      setTechInput("");
    }
  }, [techInput, formData.tech, updateFormData]);

  const removeTech = useCallback((techToRemove: string) => {
    updateFormData({
      tech: formData.tech.filter(t => t !== techToRemove)
    });
  }, [formData.tech, updateFormData]);

  const addTechFromSuggestion = useCallback((tech: string) => {
    if (!formData.tech.includes(tech)) {
      updateFormData({
        tech: [...formData.tech, tech]
      });
    }
  }, [formData.tech, updateFormData]);

  const getFilteredSuggestions = useCallback(() => {
    return techSuggestions.filter(
      tech => 
        tech.toLowerCase().includes(techInput.toLowerCase()) &&
        !formData.tech.includes(tech)
    ).slice(0, 5);
  }, [techInput, formData.tech]);

  return {
    techInput,
    setTechInput,
    addTech,
    removeTech,
    addTechFromSuggestion,
    getFilteredSuggestions,
  };
};