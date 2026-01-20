"use client";

import { LogOut, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface HeaderProps {
  totalProjects: number;
  totalTech: number;
}

export function Header({ totalProjects, totalTech }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 border-b mt-[8rem] border-gray-200/50 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Portfolio Admin
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {totalProjects} projects • {totalTech} technologies
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={() => {
                localStorage.removeItem("adminAuth");
                router.push("/Admin/login");
              }}
              className="rounded-xl space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}