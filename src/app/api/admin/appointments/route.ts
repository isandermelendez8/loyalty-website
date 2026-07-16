import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated, unauthorizedResponse } from "@/lib/auth/admin";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { getAllAppointments } from "@/lib/booking/service";

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthenticated())) return unauthorizedResponse();
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || undefined;
  const date = searchParams.get("date") || undefined;
  const employeeId = searchParams.get("employeeId") || undefined;

  try {
    const appointments = await getAllAppointments({ status, date, employeeId });
    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Admin appointments error:", error);
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}
