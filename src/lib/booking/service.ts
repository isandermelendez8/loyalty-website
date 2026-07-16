import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { Appointment, CreateAppointmentInput, DbEmployee } from "@/lib/booking/types";
import {
  APPOINTMENT_SLOTS,
  getAvailableSlots,
  isDayFullyBooked,
  isValidSlot,
  isDateBookable,
  getEndTime,
  formatDisplayDate,
} from "@/lib/booking/rules";
import {
  sendCustomerConfirmation,
  sendEmployeeNotification,
  sendAdminNotification,
} from "@/lib/email/resend";

export async function getBookedTimesForDate(date: string): Promise<string[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("appointments")
    .select("start_time")
    .eq("appointment_date", date)
    .neq("status", "cancelled");

  if (error) throw error;
  return (data || []).map((a) => a.start_time);
}

export async function getAvailability(date: string) {
  if (!isDateBookable(new Date(date + "T12:00:00"))) {
    return { available: false, slots: [], fullyBooked: true, reason: "closed" };
  }

  const bookedTimes = await getBookedTimesForDate(date);
  const slots = getAvailableSlots(bookedTimes);

  return {
    available: slots.length > 0,
    slots: slots.map((s) => ({
      start: s.start,
      end: s.end,
      label: s.label,
    })),
    fullyBooked: isDayFullyBooked(bookedTimes.length),
    bookedCount: bookedTimes.length,
    maxPerDay: 2,
  };
}

export async function getMonthAvailability(year: number, month: number) {
  const startDate = `${year}-${String(month + 1).padStart(2, "0")}-01`;
  const lastDay = new Date(year, month + 1, 0).getDate();
  const endDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("appointments")
    .select("appointment_date, start_time")
    .gte("appointment_date", startDate)
    .lte("appointment_date", endDate)
    .neq("status", "cancelled");

  if (error) throw error;

  const dateCounts: Record<string, number> = {};
  (data || []).forEach((a) => {
    dateCounts[a.appointment_date] = (dateCounts[a.appointment_date] || 0) + 1;
  });

  return dateCounts;
}

export async function createAppointment(
  input: CreateAppointmentInput
): Promise<{ appointment: Appointment; emailsSent: boolean }> {
  if (!isValidSlot(input.startTime)) {
    throw new Error("Invalid time slot");
  }

  if (!isDateBookable(new Date(input.appointmentDate + "T12:00:00"))) {
    throw new Error("Date is not available");
  }

  const bookedTimes = await getBookedTimesForDate(input.appointmentDate);
  if (bookedTimes.includes(input.startTime)) {
    throw new Error("Time slot is no longer available");
  }
  if (isDayFullyBooked(bookedTimes.length)) {
    throw new Error("This day is fully booked");
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("appointments")
    .insert({
      customer_name: input.customerName,
      customer_email: input.customerEmail,
      customer_phone: input.customerPhone,
      service_id: input.serviceId,
      service_name: input.serviceName,
      employee_id: input.employeeId,
      employee_name: input.employeeName,
      employee_email: input.employeeEmail,
      appointment_date: input.appointmentDate,
      start_time: input.startTime,
      end_time: input.endTime || getEndTime(input.startTime),
      notes: input.notes || "",
      status: "confirmed",
      instagram_confirmed: input.instagramConfirmed || false,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("Time slot was just booked by another customer");
    }
    throw error;
  }

  const displayDate = formatDisplayDate(input.appointmentDate);
  const slot = APPOINTMENT_SLOTS.find((s) => s.start === input.startTime);
  const timeLabel = slot?.label || input.startTime;

  await Promise.all([
    sendCustomerConfirmation({
      to: input.customerEmail,
      customerName: input.customerName,
      serviceName: input.serviceName,
      date: displayDate,
      time: timeLabel,
      employeeName: input.employeeName,
    }),
    sendEmployeeNotification({
      to: input.employeeEmail,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      customerEmail: input.customerEmail,
      serviceName: input.serviceName,
      date: displayDate,
      time: timeLabel,
      notes: input.notes || "",
    }),
    sendAdminNotification({
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      serviceName: input.serviceName,
      date: displayDate,
      time: timeLabel,
      employeeName: input.employeeName,
    }),
  ]);

  return { appointment: data as Appointment, emailsSent: true };
}

export async function getAllAppointments(filters?: {
  status?: string;
  date?: string;
  employeeId?: string;
}): Promise<Appointment[]> {
  const supabase = getSupabaseAdmin();
  let query = supabase
    .from("appointments")
    .select("*")
    .order("appointment_date", { ascending: true })
    .order("start_time", { ascending: true });

  if (filters?.status) query = query.eq("status", filters.status);
  if (filters?.date) query = query.eq("appointment_date", filters.date);
  if (filters?.employeeId) query = query.eq("employee_id", filters.employeeId);

  const { data, error } = await query;
  if (error) throw error;
  return (data || []) as Appointment[];
}

export async function updateAppointmentStatus(
  id: string,
  status: Appointment["status"]
): Promise<Appointment> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("appointments")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Appointment;
}

export async function deleteAppointment(id: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("appointments").delete().eq("id", id);
  if (error) throw error;
}

export async function getAllEmployees(): Promise<DbEmployee[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .order("name");

  if (error) throw error;
  return (data || []) as DbEmployee[];
}

export async function getActiveEmployees(): Promise<DbEmployee[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .eq("active", true)
    .order("name");

  if (error) throw error;
  return (data || []) as DbEmployee[];
}

export async function createEmployee(
  employee: Omit<DbEmployee, "created_at" | "updated_at">
): Promise<DbEmployee> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("employees")
    .insert(employee)
    .select()
    .single();

  if (error) throw error;
  return data as DbEmployee;
}

export async function updateEmployee(
  id: string,
  updates: Partial<DbEmployee>
): Promise<DbEmployee> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("employees")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as DbEmployee;
}

export async function getTomorrowAppointments(): Promise<Appointment[]> {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateStr = tomorrow.toISOString().split("T")[0];

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("appointment_date", dateStr)
    .eq("reminder_sent", false)
    .in("status", ["confirmed", "pending"]);

  if (error) throw error;
  return (data || []) as Appointment[];
}

export async function markReminderSent(id: string): Promise<void> {
  const supabase = getSupabaseAdmin();
  await supabase
    .from("appointments")
    .update({ reminder_sent: true })
    .eq("id", id);
}
