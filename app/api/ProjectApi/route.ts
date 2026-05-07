import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "app",
  "_data",
  "projects.json"
);



export async function GET() {
  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([], { status: 200 });
    }
    const rawData = fs.readFileSync(filePath, "utf-8");
    const projects = rawData ? JSON.parse(rawData) : [];

    return NextResponse.json(projects, { status: 200 });
  } catch (error : any) {
    return NextResponse.json(
      { success: false, error: "Failed to read file" },
      { status: 500 }
    );
  }
}