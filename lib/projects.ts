import fs from 'fs';
import path from 'path';
import { Project, CreateProjectDTO } from '../app/(admin)/types';
import { v4 as uuidv4 } from 'uuid';

const projectsPath = path.join(process.cwd(), 'app', '_data', 'projects.json');

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'app', '_data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(projectsPath)) {
    fs.writeFileSync(projectsPath, JSON.stringify([], null, 2));
  }
};

export const getProjects = (): Project[] => {
  ensureDataDir();
  const data = fs.readFileSync(projectsPath, 'utf-8');
  return JSON.parse(data);
};

export const getProjectById = (id: string): Project | null => {
  const projects = getProjects();
  return projects.find(project => project.id === id) || null;
};

export const createProject = (projectData: CreateProjectDTO): Project => {
  const projects = getProjects();
  const newProject: Project = {
    id: `proj_${uuidv4().replace(/-/g, '').substring(0, 16)}`,
    ...projectData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  projects.push(newProject);
  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
  return newProject;
};

export const updateProject = (id: string, projectData: Partial<CreateProjectDTO>): Project | null => {
  const projects = getProjects();
  const index = projects.findIndex(project => project.id === id);
  
  if (index === -1) return null;
  
  projects[index] = {
    ...projects[index],
    ...projectData,
    updatedAt: new Date().toISOString(),
  };
  
  fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2));
  return projects[index];
};

export const deleteProject = (id: string): boolean => {
  const projects = getProjects();
  const filtered = projects.filter(project => project.id !== id);
  
  if (filtered.length === projects.length) return false;
  
  fs.writeFileSync(projectsPath, JSON.stringify(filtered, null, 2));
  return true;
};