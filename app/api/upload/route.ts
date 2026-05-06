import { NextResponse } from "next/server";
import { upload } from "@/lib/multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export async function POST(request: Request) {
  try {
    const req: any = request;
    const res: any = NextResponse;

    await runMiddleware(req, res, upload.single("image"));

    if (!req.file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const imageUrl = `/projects/${req.file.filename}`;

    return NextResponse.json(
      { url: imageUrl, filename: req.file.filename },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}
