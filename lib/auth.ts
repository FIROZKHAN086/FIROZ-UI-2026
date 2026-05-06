import { NextResponse } from "next/server";

export function verifyAuth(request: Request) {
  const authHeader = request.headers.get("authorization");
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@portfolio.com";
  const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";

  if (!authHeader) {
    return { authorized: false, error: "No authorization header" };
  }

  const [scheme, credentials] = authHeader.split(" ");
  
  if (scheme !== "Basic" || !credentials) {
    return { authorized: false, error: "Invalid authorization scheme" };
  }

  try {
    const decoded = Buffer.from(credentials, "base64").toString("utf-8");
    const [email, password] = decoded.split(":");

    if (email === adminEmail && password === adminPassword) {
      return { authorized: true };
    }

    return { authorized: false, error: "Invalid credentials" };
  } catch {
    return { authorized: false, error: "Invalid authorization header" };
  }
}
