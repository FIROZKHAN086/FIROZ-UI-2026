"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Globe, Github } from "lucide-react";
import { BaseProjectDialog } from "./BaseProjectDialog";
import { TechSelector } from "../tech/TechSelector";
import { ImageUploader } from "../media/ImageUploader";
import { ImagePreview } from "../media/ImagePreview";
import { categories } from "../../utils/constants";
import { ProjectFormData } from "../../types/project";

interface NewProjectDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: ProjectFormData;
  updateFormData: (updates: Partial<ProjectFormData>) => void;
  uploading: boolean;
  onFileSelect: (file: File) => Promise<void>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onCancel: () => void;
  techInput: string;
  onTechInputChange: (value: string) => void;
  onAddTech: () => void;
  onRemoveTech: (tech: string) => void;
  onAddSuggestion: (tech: string) => void;
  filteredSuggestions: string[];
}

export function NewProjectDialog({
  isOpen,
  onOpenChange,
  formData,
  updateFormData,
  uploading,
  onFileSelect,
  onSubmit,
  onCancel,
  techInput,
  onTechInputChange,
  onAddTech,
  onRemoveTech,
  onAddSuggestion,
  filteredSuggestions,
}: NewProjectDialogProps) {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <BaseProjectDialog
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Create New Project"
      description="Fill in the details to add a new project to your portfolio."
      onCancel={onCancel}
      onSubmit={onSubmit}
      isSubmitting={uploading}
      submitLabel="Create Project"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="title" className="text-sm font-medium">
                Project Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => updateFormData({ title: e.target.value })}
                placeholder="Enter project title"
                required
                className="h-11"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="category" className="text-sm font-medium">
                Category *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => updateFormData({ category: value })}
              >
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="description" className="text-sm font-medium">
              Description *
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => updateFormData({ description: e.target.value })}
              placeholder="Describe your project..."
              rows={4}
              required
              className="resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="liveDemo" className="text-sm font-medium flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Live Demo URL
              </Label>
              <Input
                id="liveDemo"
                type="url"
                value={formData.liveDemo}
                onChange={(e) => updateFormData({ liveDemo: e.target.value })}
                placeholder="https://demo.example.com"
                className="h-11"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="github" className="text-sm font-medium flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub URL
              </Label>
              <Input
                id="github"
                type="url"
                value={formData.github}
                onChange={(e) => updateFormData({ github: e.target.value })}
                placeholder="https://github.com/username/project"
                className="h-11"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium">Project Image</Label>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {formData.image ? (
                <ImagePreview
                  imageUrl={formData.image}
                  onRemove={() => updateFormData({ image: "" })}
                />
              ) : (
                <ImageUploader
                  uploading={uploading}
                  onFileSelect={onFileSelect}
                />
              )}

              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Or enter image URL</Label>
                  <Input
                    type="url"
                    value={formData.image}
                    onChange={(e) => updateFormData({ image: e.target.value })}
                    placeholder="https://res.cloudinary.com/your-cloud/image.jpg"
                    className="h-11"
                  />
                </div>
                
                <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    <strong>Tip:</strong> For best results, upload high-quality images in 16:9 aspect ratio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <TechSelector
            tech={formData.tech}
            techInput={techInput}
            onTechInputChange={onTechInputChange}
            onAddTech={onAddTech}
            onRemoveTech={onRemoveTech}
            onAddSuggestion={onAddSuggestion}
            filteredSuggestions={filteredSuggestions}
          />

          <div className="flex items-center justify-between p-4 rounded-lg border bg-gray-50 dark:bg-gray-900/50">
            <div className="space-y-1">
              <Label htmlFor="featured" className="text-sm font-medium">
                Featured Project
              </Label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Featured projects are highlighted on your portfolio
              </p>
            </div>
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => 
                updateFormData({ featured: checked })
              }
            />
          </div>
        </TabsContent>
      </Tabs>
    </BaseProjectDialog>
  );
}