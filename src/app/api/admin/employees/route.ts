import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated, unauthorizedResponse } from "@/lib/auth/admin";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { getAllEmployees, createEmployee } from "@/lib/booking/service";

export async function GET() {
  if (!(await isAdminAuthenticated())) return unauthorizedResponse();
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const employees = await getAllEmployees();
    return NextResponse.json({ employees });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch employees" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) return unauthorizedResponse();
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const employee = await createEmployee({
      id: body.id,
      name: body.name,
      email: body.email,
      role_en: body.role_en,
      role_es: body.role_es,
      image: body.image || "",
      specialties: body.specialties || [],
      active: body.active !== false,
    });
    return NextResponse.json({ employee });
  } catch (error) {
    console.error("Create employee error:", error);
    return NextResponse.json({ error: "Failed to create employee" }, { status: 500 });
  }
}
