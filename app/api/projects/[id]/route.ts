import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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

// ✅ GET single project
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Await the params Promise first
    const { id } = await params;
    
    const projects = readProjects();
    const project = projects.find(p => p.id === id);
    
    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("GET PROJECT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// ✅ UPDATE project
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Await the params Promise first
    const { id } = await params;
    const body = await request.json();
    

    // Validate required fields
    if (!body.title || !body.description || !body.category) {
      return NextResponse.json(
        { error: "Missing required fields: title, description, category" },
        { status: 400 }
      );
    }

    const projects = readProjects();
    const index = projects.findIndex(p => p.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Ensure tech is always an array
    const techArray = Array.isArray(body.tech) ? body.tech : [];

    const updatedProject: Project = {
      ...projects[index],
      title: body.title,
      description: body.description,
      image: body.image || "",
      tech: techArray,
      liveDemo: body.liveDemo || "",
      github: body.github || "",
      category: body.category,
      featured: body.featured || false,
      updatedAt: new Date().toISOString(),
    };

    projects[index] = updatedProject;
    writeProjects(projects);

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("PUT PROJECT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// ✅ DELETE project
export async function DELETE(
 request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ Await the params Promise first
    const { id } = await params;
    const body = await request.json();

    const projects = readProjects();
    const index = projects.findIndex(p => p.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    projects.splice(index, 1);
    writeProjects(projects);

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}