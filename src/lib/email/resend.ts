import { Resend } from "resend";
import { businessInfo } from "@/data/business";
import {
  customerConfirmationHtml,
  employeeNotificationHtml,
  reminderHtml,
  contactNotificationHtml,
} from "./templates";

let resend: Resend | null = null;

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!resend) resend = new Resend(apiKey);
  return resend;
}

function getFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL || "LOYALTY <onboarding@resend.dev>";
}

export function isResendConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}

export async function sendCustomerConfirmation(data: {
  to: string;
  customerName: string;
  serviceName: string;
  date: string;
  time: string;
  employeeName: string;
}) {
  const client = getResend();
  if (!client) {
    console.log("[Email] Resend not configured - skipping customer confirmation");
    return { success: false, skipped: true };
  }

  try {
    const result = await client.emails.send({
      from: getFromEmail(),
      to: data.to,
      subject: "LOYALTY - Your appointment has been confirmed!",
      html: customerConfirmationHtml({
        customerName: data.customerName,
        serviceName: data.serviceName,
        date: data.date,
        time: data.time,
        employeeName: data.employeeName,
        location: `${businessInfo.address}, ${businessInfo.city}`,
      }),
    });
    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error("[Email] Customer confirmation failed:", error);
    return { success: false, error };
  }
}

export async function sendEmployeeNotification(data: {
  to: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceName: string;
  date: string;
  time: string;
  notes: string;
}) {
  const client = getResend();
  if (!client) {
    console.log("[Email] Resend not configured - skipping employee notification");
    return { success: false, skipped: true };
  }

  try {
    const result = await client.emails.send({
      from: getFromEmail(),
      to: data.to,
      subject: "New LOYALTY Appointment",
      html: employeeNotificationHtml(data),
    });
    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error("[Email] Employee notification failed:", error);
    return { success: false, error };
  }
}

export async function sendReminder(data: {
  to: string;
  recipientName: string;
  serviceName: string;
  date: string;
  time: string;
  isEmployee?: boolean;
}) {
  const client = getResend();
  if (!client) return { success: false, skipped: true };

  try {
    const result = await client.emails.send({
      from: getFromEmail(),
      to: data.to,
      subject: "Reminder: Your LOYALTY appointment is tomorrow",
      html: reminderHtml(data),
    });
    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error("[Email] Reminder failed:", error);
    return { success: false, error };
  }
}

export async function sendAdminNotification(data: {
  customerName: string;
  customerPhone: string;
  serviceName: string;
  date: string;
  time: string;
  employeeName: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!adminEmail) return { success: false, skipped: true };

  const client = getResend();
  if (!client) return { success: false, skipped: true };

  try {
    await client.emails.send({
      from: getFromEmail(),
      to: adminEmail,
      subject: `New Booking: ${data.customerName} - ${data.serviceName}`,
      html: employeeNotificationHtml({
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: "",
        serviceName: data.serviceName,
        date: data.date,
        time: data.time,
        notes: `Employee: ${data.employeeName}`,
      }),
    });
    return { success: true };
  } catch (error) {
    console.error("[Email] Admin notification failed:", error);
    return { success: false, error };
  }
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const client = getResend();
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!client || !adminEmail) return { success: false, skipped: true };

  try {
    await client.emails.send({
      from: getFromEmail(),
      to: adminEmail,
      replyTo: data.email,
      subject: `LOYALTY Contact - ${data.name}`,
      html: contactNotificationHtml(data),
    });
    return { success: true };
  } catch (error) {
    console.error("[Email] Contact email failed:", error);
    return { success: false, error };
  }
}

export async function submitToFormspree(data: Record<string, string>): Promise<boolean> {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  if (!formId || formId === "your_formspree_id_here") return false;

  try {
    const response = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });
    return response.ok;
  } catch {
    return false;
  }
}
