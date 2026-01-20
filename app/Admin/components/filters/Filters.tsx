"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { SearchInput } from "./SearchInput";
import { sortOptions, featuredOptions } from "../../utils/constants";

interface FiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  filterFeatured: string;
  setFilterFeatured: (featured: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  categories: string[];
}

export function Filters({
  searchTerm,
  setSearchTerm,
  filterCategory,
  setFilterCategory,
  filterFeatured,
  setFilterFeatured,
  sortBy,
  setSortBy,
  categories,
}: FiltersProps) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Project Management</CardTitle>
            <CardDescription>
              Manage and organize your portfolio projects
            </CardDescription>
          </div>
          
          <div className="flex items-center space-x-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search */}
          <div className="flex-1">
            <SearchInput
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search projects, technologies, descriptions..."
            />
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-3">
              <Filter className="text-blue-500 h-4 w-4" />
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.filter(c => c !== "all").map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Select value={filterFeatured} onValueChange={setFilterFeatured}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Featured" />
              </SelectTrigger>
              <SelectContent>
                {featuredOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}