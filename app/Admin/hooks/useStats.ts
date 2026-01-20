"use client";

import { useState, useEffect, useCallback } from "react";
import { Project } from "../types/project";
import { Stats } from "../types/project";

export const useStats = (projects: Project[]) => {
  const [stats, setStats] = useState<Stats>({
    total: 0,
    featured: 0,
    webApps: 0,
    mobile: 0,
    api: 0,
    lastUpdated: "",
    totalTech: 0,
  });

  const calculateStats = useCallback(() => {
    const webApps = projects.filter(p => 
      p.category.toLowerCase().includes('web') || 
      p.category.toLowerCase().includes('app')
    ).length;
    
    const mobile = projects.filter(p => 
      p.category.toLowerCase().includes('mobile')
    ).length;
    
    const api = projects.filter(p => 
      p.category.toLowerCase().includes('api')
    ).length;
    
    const featured = projects.filter(p => p.featured).length;
    
    const totalTech = projects.reduce((acc, project) => 
      acc + project.tech.length, 0
    );
    
    return {
      total: projects.length,
      featured,
      webApps,
      mobile,
      api,
      lastUpdated: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      totalTech,
    };
  }, [projects]);

  useEffect(() => {
    setStats(calculateStats());
  }, [projects, calculateStats]);

  return { stats };
};