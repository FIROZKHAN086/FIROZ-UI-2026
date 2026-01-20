"use client";

import { Button } from "@/components/ui/button";
import { X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImagePreviewProps {
  imageUrl: string;
  onRemove: () => void;
  className?: string;
}

export function ImagePreview({ imageUrl, onRemove, className }: ImagePreviewProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative">
        <img
          src={imageUrl}
          alt="Preview"
          className="w-full h-48 object-cover rounded-lg"
        />
        <Button
          type="button"
          variant="destructive"
          size="icon"
          className="absolute -top-2 -right-2 h-8 w-8"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-green-600 dark:text-green-400 text-sm flex items-center justify-center gap-2">
        <CheckCircle2 className="h-4 w-4" />
        Image uploaded successfully
      </p>
    </div>
  );
}