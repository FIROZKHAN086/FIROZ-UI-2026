"use client";

import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";

interface BaseProjectDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: ReactNode;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
  submitLabel: string;
  cancelLabel?: string;
}

export function BaseProjectDialog({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
  onCancel,
  onSubmit,
  isSubmitting,
  submitLabel,
  cancelLabel = "Cancel",
}: BaseProjectDialogProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(e);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {children}

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="h-11 px-6"
            >
              {cancelLabel}
            </Button>
            <Button 
              type="submit"
              className="h-11 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {submitLabel}
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}