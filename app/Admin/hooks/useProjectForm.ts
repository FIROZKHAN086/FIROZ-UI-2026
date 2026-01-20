// /app/Admin/hooks/useProjectForm.ts
"use client";

import { useState, useCallback } from "react";
import { ProjectFormData } from "../types/project";
import { CLOUDINARY_CONFIG } from "../utils/constants";
import { validateFile } from "../utils/validators";
import toast from "react-hot-toast";

export const useProjectForm = (initialData?: Partial<ProjectFormData>) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    image: initialData?.image || "",
    tech: initialData?.tech || [],
    liveDemo: initialData?.liveDemo || "",
    github: initialData?.github || "",
    category: initialData?.category || "",
    featured: initialData?.featured || false,
  });

  const [uploading, setUploading] = useState(false);

  const updateFormData = useCallback((updates: Partial<ProjectFormData>) => {
    
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const resetForm = useCallback(() => {
    
    setFormData({
      title: "",
      description: "",
      image: "",
      tech: [],
      liveDemo: "",
      github: "",
      category: "",
      featured: false,
    });
  }, []);

  const handleCloudinaryUpload = async (file: File): Promise<string> => {
    setUploading(true);
    try {
      
      
      const formDataToSend = new FormData();
      formDataToSend.append('file', file);
      formDataToSend.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
      formDataToSend.append('folder', CLOUDINARY_CONFIG.folder);
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
        {
          method: 'POST',
          body: formDataToSend,
        }
      );

      const data = await response.json();
     
      
      if (data.secure_url) {
        const imageUrl = data.secure_url;
       
        
        updateFormData({ image: imageUrl });
        
        toast.success("Image uploaded successfully!");
        return imageUrl;
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (error: any) {
      console.error('❌ Cloudinary upload error:', error);
      toast.error(error.message || "Failed to upload image");
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (file: File): Promise<string> => {
    
    
    const validationError = validateFile(file);
    if (validationError) {
      toast.error(validationError);
      throw new Error(validationError);
    }

    return await handleCloudinaryUpload(file);
  };

  return {
    formData,
    setFormData,
    updateFormData,
    resetForm,
    uploading,
    setUploading,
    handleFileChange,
  };
};