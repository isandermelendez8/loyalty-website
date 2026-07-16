import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail, submitToFormspree } from "@/lib/email/resend";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailResult = await sendContactEmail({ name, email, phone: phone || "", message });

    // Formspree fallback
    if (!emailResult.success) {
      await submitToFormspree({
        _subject: `LOYALTY Contact - ${name}`,
        name,
        email,
        phone: phone || "",
        message,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
