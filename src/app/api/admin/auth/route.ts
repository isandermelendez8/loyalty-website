import { NextRequest, NextResponse } from "next/server";
import {
  isAdminAuthenticated,
  verifyAdminPassword,
  setAdminCookie,
  clearAdminCookie,
  unauthorizedResponse,
} from "@/lib/auth/admin";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  return setAdminCookie(response);
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  return clearAdminCookie(response);
}

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) return unauthorizedResponse();
  return NextResponse.json({ authenticated: true });
}
