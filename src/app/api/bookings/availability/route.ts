import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { getAvailability, getMonthAvailability } from "@/lib/booking/service";

export async function GET(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({
        available: true,
        slots: [
          { start: "10:00 AM", end: "2:00 PM", label: "10:00 AM - 2:00 PM" },
          { start: "3:00 PM", end: "7:00 PM", label: "3:00 PM - 7:00 PM" },
        ],
        fullyBooked: false,
        fallback: true,
      });
    }

    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const year = searchParams.get("year");
    const month = searchParams.get("month");

    if (year && month) {
      const dateCounts = await getMonthAvailability(
        parseInt(year),
        parseInt(month)
      );
      return NextResponse.json({ dateCounts });
    }

    if (!date) {
      return NextResponse.json({ error: "Date parameter required" }, { status: 400 });
    }

    const availability = await getAvailability(date);
    return NextResponse.json(availability);
  } catch (error) {
    console.error("Availability error:", error);
    return NextResponse.json({ error: "Failed to check availability" }, { status: 500 });
  }
}
