import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(
  process.cwd(),
  "app",
  "_data",
  "testimonials.json"
);

export async function POST(req: Request) {
  try {
    const body = await req.json();


    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, "[]", "utf-8");
    }


    const rawData = fs.readFileSync(filePath, "utf-8");
    const testimonials = rawData ? JSON.parse(rawData) : [];


    testimonials.unshift(body);


    fs.writeFileSync(
      filePath,
      JSON.stringify(testimonials, null, 2),
      "utf-8"
    );

    return NextResponse.json(
      { success: true, message: "Testimonial saved" },
      { status: 201 }
    );
  } catch (error) {
  console.log(error);
  
    return NextResponse.json(
      { success: false, error: "Failed to write file" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json([], { status: 200 });
    }
    const rawData = fs.readFileSync(filePath, "utf-8");
    const testimonials = rawData ? JSON.parse(rawData) : [];

    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to read file" },
      { status: 500 }
    );
  }
}