"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Search, X, Code } from "lucide-react";
import { useState } from "react";
import { TechBadge } from "./TechBadge";

interface TechSelectorProps {
  tech: string[];
  techInput: string;
  onTechInputChange: (value: string) => void;
  onAddTech: () => void;
  onRemoveTech: (tech: string) => void;
  onAddSuggestion: (tech: string) => void;
  filteredSuggestions: string[];
}

export function TechSelector({
  tech,
  techInput,
  onTechInputChange,
  onAddTech,
  onRemoveTech,
  onAddSuggestion,
  filteredSuggestions,
}: TechSelectorProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Technologies</Label>
      
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            value={techInput}
            onChange={(e) => {
              onTechInputChange(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), onAddTech())}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Type technology and press Enter..."
            className="pl-10 h-11"
          />
          {techInput && (
            <button
              type="button"
              onClick={() => onTechInputChange("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          {/* Suggestions Dropdown */}
          {showSuggestions && techInput && filteredSuggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full border rounded-lg bg-white dark:bg-gray-900 shadow-lg max-h-60 overflow-y-auto">
              {filteredSuggestions.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  onClick={() => {
                    onAddSuggestion(tech);
                    onTechInputChange("");
                    setShowSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 text-sm"
                >
                  <Plus className="h-3 w-3" />
                  <span>{tech}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <Button
          type="button"
          onClick={onAddTech}
          className="bg-gradient-to-r from-blue-600 to-purple-600 whitespace-nowrap h-11 px-4"
          disabled={!techInput.trim()}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
      
      {/* Tech Tags */}
      <div className="min-h-[100px] p-4 rounded-lg border bg-gray-50 dark:bg-gray-900/50">
        <div className="flex flex-wrap gap-2">
          {tech.length > 0 ? (
            tech.map((techItem) => (
              <TechBadge
                key={techItem}
                tech={techItem}
                onRemove={() => onRemoveTech(techItem)}
              />
            ))
          ) : (
            <div className="text-center w-full py-6">
              <Code className="h-8 w-8 text-gray-400 dark:text-gray-600 mx-auto mb-2" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No technologies added yet
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                Start typing above to add technologies
              </p>
            </div>
          )}
        </div>

        {tech.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {tech.length} technology{tech.length !== 1 ? 's' : ''} added
            </p>
          </div>
        )}
      </div>
    </div>
  );
}