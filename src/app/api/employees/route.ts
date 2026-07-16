import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { getActiveEmployees } from "@/lib/booking/service";
import { employees as staticEmployees } from "@/data/employees";

export async function GET() {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        employees: staticEmployees.map((e) => ({
          id: e.id,
          name: e.name,
          email: `${e.id}@loyaltystudio.com`,
          role_en: e.roleEn,
          role_es: e.roleEs,
          image: e.image,
          specialties: e.specialties,
          active: true,
        })),
        fallback: true,
      });
    }

    const employees = await getActiveEmployees();
    return NextResponse.json({ employees });
  } catch (error) {
    console.error("Employees fetch error:", error);
    return NextResponse.json({ employees: staticEmployees }, { status: 200 });
  }
}
