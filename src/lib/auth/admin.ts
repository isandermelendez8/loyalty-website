import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "loyalty_admin_session";
const SESSION_DURATION = 60 * 60 * 24; // 24 hours

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "";
}

function getAdminSecret(): string {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "loyalty-secret";
}

export function createSessionToken(): string {
  const payload = {
    authenticated: true,
    exp: Date.now() + SESSION_DURATION * 1000,
  };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64");
  const secret = getAdminSecret();
  const signature = Buffer.from(`${data}.${secret}`).toString("base64");
  return `${data}.${signature}`;
}

export function verifySessionToken(token: string): boolean {
  try {
    const [data, signature] = token.split(".");
    if (!data || !signature) return false;

    const expectedSig = Buffer.from(`${data}.${getAdminSecret()}`).toString("base64");
    if (signature !== expectedSig) return false;

    const payload = JSON.parse(Buffer.from(data, "base64").toString());
    if (!payload.authenticated || payload.exp < Date.now()) return false;

    return true;
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export function setAdminCookie(response: NextResponse): NextResponse {
  const token = createSessionToken();
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION,
    path: "/",
  });
  return response;
}

export function clearAdminCookie(response: NextResponse): NextResponse {
  response.cookies.delete(COOKIE_NAME);
  return response;
}

export function verifyAdminPassword(password: string): boolean {
  const adminPassword = getAdminPassword();
  if (!adminPassword) return false;
  return password === adminPassword;
}

export function verifyCronSecret(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer ${secret}`;
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
