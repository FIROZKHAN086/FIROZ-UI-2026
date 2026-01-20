"use client";

import { NewProjectDialog } from "./NewProjectDialog";

interface EditProjectDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: any;
  updateFormData: (updates: any) => void;
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

export function EditProjectDialog(props: EditProjectDialogProps) {
  return (
    <NewProjectDialog
      {...props}
      title="Edit Project"
      description="Update your project details below."
      submitLabel="Update Project"
    />
  );
}