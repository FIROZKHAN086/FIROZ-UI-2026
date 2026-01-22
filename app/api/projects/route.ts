import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

type Project = {
  id: string; 
  title: string;
  description: string;
  image: string;
  tech: string[];
  liveDemo?: string;
  github?: string;
  category: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

const filePath = path.join(
  process.cwd(),
  "app",
  "_data",
  "projects.json"
);

function readProjects(): Project[] {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, "[]", "utf-8");
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  return raw ? JSON.parse(raw) : [];
}

function writeProjects(data: Project[]) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// GET all projects
export async function GET() {
  try {
    const projects = readProjects();
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// CREATE new project
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // required fields
    if (!body.title || !body.description || !body.category) {
      return NextResponse.json(
        { error: "Missing required fields: title, description, category" },
        { status: 400 }
      );
    }

    const projects = readProjects();
    
    
    const techArray = Array.isArray(body.tech) ? body.tech : [];
    
    const newProject: Project = {
      id: `proj_${uuidv4().replace(/-/g, '').substring(0, 16)}`, 
      title: body.title,
      description: body.description,
      image: body.image || "",
      tech: techArray,
      liveDemo: body.liveDemo || "",
      github: body.github || "",
      category: body.category,
      featured: body.featured || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    
    projects.unshift(newProject); // Add to beginning
    writeProjects(projects);

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("POST PROJECT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to save project" },
      { status: 500 }
    );
  }
}

// CORS headers for preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000, https://firoz-dev.vercel.app',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}