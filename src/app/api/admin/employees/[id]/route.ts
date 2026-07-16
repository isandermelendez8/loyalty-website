import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated, unauthorizedResponse } from "@/lib/auth/admin";
import { updateEmployee } from "@/lib/booking/service";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminAuthenticated())) return unauthorizedResponse();

  const { id } = await params;

  try {
    const updates = await request.json();
    const employee = await updateEmployee(id, updates);
    return NextResponse.json({ employee });
  } catch (error) {
    console.error("Update employee error:", error);
    return NextResponse.json({ error: "Failed to update employee" }, { status: 500 });
  }
}
