import { NextRequest, NextResponse } from 'next/server';
import { getProjects, createProject } from '@/lib/projects';


export async function GET() {
  const projects = getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
 
 
  try {
    const data = await request.json();
    const project = createProject(data);
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}