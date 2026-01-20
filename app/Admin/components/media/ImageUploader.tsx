// /app/Admin/components/media/ImageUploader.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Loader2, CloudUpload, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ImageUploaderProps {
  uploading: boolean;
  onFileSelect: (file: File) => Promise<void>;
  className?: string;
}

export function ImageUploader({ uploading, onFileSelect, className }: ImageUploaderProps) {
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    
    
    try {
      await onFileSelect(file);
     
    } catch (error) {
      console.error("❌ File upload failed:", error);
    }
    
    // Reset file input
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

   
    
    try {
      await onFileSelect(file);
     
    } catch (error) {
      console.error("❌ File upload failed:", error);
    }
  };

  return (
    <div 
      className={cn(
        "border-2 border-dashed rounded-xl p-6 transition-all duration-300 cursor-pointer",
        dragOver 
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10" 
          : uploading
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
          : "border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('image-upload')?.click()}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />
      
      {uploading ? (
        <div className="text-center p-4">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-blue-500" />
          <p className="text-blue-600 dark:text-blue-400 mt-4">
            Uploading to Cloudinary...
          </p>
        </div>
      ) : (
        <div className="text-center p-4">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 flex items-center justify-center">
            <CloudUpload className="h-8 w-8 text-blue-500 dark:text-blue-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {dragOver ? "Drop image here" : "Drag & drop or click to upload"}
          </p>
          <Button
            type="button"
            variant="outline"
            className="gap-2 h-10"
            onClick={(e) => {
              e.stopPropagation();
              document.getElementById('image-upload')?.click();
            }}
          >
            <Upload className="h-4 w-4" />
            Choose Image
          </Button>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
            Supports: JPG, PNG, WebP, GIF • Max 5MB
          </p>
        </div>
      )}
    </div>
  );
}