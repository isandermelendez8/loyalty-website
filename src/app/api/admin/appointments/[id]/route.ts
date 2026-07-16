import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated, unauthorizedResponse } from "@/lib/auth/admin";
import { updateAppointmentStatus, deleteAppointment } from "@/lib/booking/service";
import { Appointment } from "@/lib/booking/types";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) return unauthorizedResponse();

  const { id } = await params;
  const { status } = await request.json();

  if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    const appointment = await updateAppointmentStatus(id, status as Appointment["status"]);
    return NextResponse.json({ appointment });
  } catch (error) {
    console.error("Update appointment error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) return unauthorizedResponse();

  const { id } = await params;

  try {
    await deleteAppointment(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete appointment error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
