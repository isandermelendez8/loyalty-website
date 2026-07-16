import { NextRequest, NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/admin";
import { createAppointment } from "@/lib/booking/service";
import { getEndTime, isValidSlot } from "@/lib/booking/rules";
import { submitToFormspree } from "@/lib/email/resend";

export async function POST(request: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { error: "Database not configured. Please set up Supabase." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      serviceId,
      serviceName,
      employeeId,
      employeeName,
      employeeEmail,
      appointmentDate,
      startTime,
      notes,
      instagramConfirmed,
    } = body;

    if (
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !serviceId ||
      !serviceName ||
      !employeeId ||
      !employeeName ||
      !employeeEmail ||
      !appointmentDate ||
      !startTime
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!isValidSlot(startTime)) {
      return NextResponse.json({ error: "Invalid time slot" }, { status: 400 });
    }

    const { appointment } = await createAppointment({
      customerName,
      customerEmail,
      customerPhone,
      serviceId,
      serviceName,
      employeeId,
      employeeName,
      employeeEmail,
      appointmentDate,
      startTime,
      endTime: getEndTime(startTime),
      notes,
      instagramConfirmed,
    });

    // Formspree fallback notification
    await submitToFormspree({
      _subject: `LOYALTY Booking - ${customerName}`,
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      service: serviceName,
      employee: employeeName,
      date: appointmentDate,
      time: startTime,
      notes: notes || "",
    });

    return NextResponse.json({
      success: true,
      appointment: {
        id: appointment.id,
        customerName: appointment.customer_name,
        customerEmail: appointment.customer_email,
        customerPhone: appointment.customer_phone,
        serviceId: appointment.service_id,
        serviceName: appointment.service_name,
        employeeId: appointment.employee_id,
        employeeName: appointment.employee_name,
        date: appointment.appointment_date,
        time: appointment.start_time,
        endTime: appointment.end_time,
        notes: appointment.notes,
        status: appointment.status,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Booking failed";
    const status = message.includes("available") || message.includes("booked") ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
