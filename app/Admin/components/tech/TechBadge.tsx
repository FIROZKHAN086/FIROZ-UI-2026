"use client";

import { Badge } from "@/components/ui/badge";
import { Code, X } from "lucide-react";

interface TechBadgeProps {
  tech: string;
  onRemove: () => void;
}

export function TechBadge({ tech, onRemove }: TechBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className="pl-3 pr-2 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30"
    >
      <Code className="h-3 w-3 mr-1" />
      {tech}
      <button
        type="button"
        onClick={onRemove}
        className="ml-2 hover:text-red-500 transition-colors"
      >
        <X className="h-3 w-3" />
      </button>
    </Badge>
  );
}