import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { readData, writeData } from "@/lib/data";

async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return false;
  const payload = await verifyToken(token);
  return !!payload;
}

export async function GET(req: NextRequest) {
  if (!(await isAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await readData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    await writeData(data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
