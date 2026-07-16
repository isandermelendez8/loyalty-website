import { NextRequest, NextResponse } from "next/server";
import { verifyCronSecret } from "@/lib/auth/admin";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import {
  getTomorrowAppointments,
  markReminderSent,
} from "@/lib/booking/service";
import { sendReminder } from "@/lib/email/resend";
import { formatDisplayDate } from "@/lib/booking/rules";
import { APPOINTMENT_SLOTS } from "@/lib/booking/rules";

export async function GET(request: NextRequest) {
  if (!verifyCronSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const appointments = await getTomorrowAppointments();
    const results = [];

    for (const apt of appointments) {
      const displayDate = formatDisplayDate(apt.appointment_date);
      const slot = APPOINTMENT_SLOTS.find((s) => s.start === apt.start_time);
      const timeLabel = slot?.label || apt.start_time;

      const [customerResult, employeeResult] = await Promise.all([
        sendReminder({
          to: apt.customer_email,
          recipientName: apt.customer_name,
          serviceName: apt.service_name,
          date: displayDate,
          time: timeLabel,
        }),
        sendReminder({
          to: apt.employee_email,
          recipientName: apt.employee_name,
          serviceName: apt.service_name,
          date: displayDate,
          time: timeLabel,
          isEmployee: true,
        }),
      ]);

      await markReminderSent(apt.id);

      results.push({
        id: apt.id,
        customer: customerResult.success,
        employee: employeeResult.success,
      });
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
    });
  } catch (error) {
    console.error("Cron reminder error:", error);
    return NextResponse.json({ error: "Reminder job failed" }, { status: 500 });
  }
}
