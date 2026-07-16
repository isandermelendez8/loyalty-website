const brandColor = "#c9a962";
const darkBg = "#111111";
const textColor = "#faf6f0";

function baseTemplate(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:${darkBg};font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${darkBg};padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:16px;overflow:hidden;border:1px solid #2a2a2a;">
        <tr><td style="background:linear-gradient(135deg,#0a0a0a,#1a1a1a);padding:32px;text-align:center;">
          <h1 style="margin:0;color:${brandColor};font-size:32px;letter-spacing:4px;">LOYALTY</h1>
          <p style="margin:8px 0 0;color:#888;font-size:12px;letter-spacing:2px;">PREMIUM BEAUTY & LIFESTYLE</p>
        </td></tr>
        <tr><td style="padding:32px;color:${textColor};font-size:16px;line-height:1.6;">
          ${content}
        </td></tr>
        <tr><td style="padding:24px 32px;border-top:1px solid #2a2a2a;text-align:center;">
          <p style="margin:0;color:#666;font-size:12px;">&copy; LOYALTY Studio &bull; Miami Beach, FL</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function detailRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;color:#888;font-size:14px;width:120px;">${label}</td>
    <td style="padding:8px 0;color:${textColor};font-size:14px;font-weight:bold;">${value}</td>
  </tr>`;
}

export function customerConfirmationHtml(data: {
  customerName: string;
  serviceName: string;
  date: string;
  time: string;
  employeeName: string;
  location: string;
}): string {
  return baseTemplate(`
    <h2 style="color:${brandColor};margin:0 0 16px;">Your appointment has been confirmed!</h2>
    <p style="color:#ccc;margin:0 0 24px;">Hi ${data.customerName}, thank you for choosing LOYALTY.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border-radius:12px;padding:16px;">
      ${detailRow("Service", data.serviceName)}
      ${detailRow("Date", data.date)}
      ${detailRow("Time", data.time)}
      ${detailRow("Employee", data.employeeName)}
      ${detailRow("Location", data.location)}
    </table>
    <p style="color:#888;margin:24px 0 0;font-size:14px;">We look forward to seeing you!</p>
  `);
}

export function employeeNotificationHtml(data: {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceName: string;
  date: string;
  time: string;
  notes: string;
}): string {
  return baseTemplate(`
    <h2 style="color:${brandColor};margin:0 0 16px;">New LOYALTY Appointment</h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border-radius:12px;padding:16px;">
      ${detailRow("Customer", data.customerName)}
      ${detailRow("Phone", data.customerPhone)}
      ${data.customerEmail ? detailRow("Email", data.customerEmail) : ""}
      ${detailRow("Service", data.serviceName)}
      ${detailRow("Date", data.date)}
      ${detailRow("Time", data.time)}
      ${data.notes ? detailRow("Notes", data.notes) : ""}
    </table>
  `);
}

export function reminderHtml(data: {
  recipientName: string;
  serviceName: string;
  date: string;
  time: string;
  isEmployee?: boolean;
}): string {
  const greeting = data.isEmployee
    ? `Hi ${data.recipientName}, you have an appointment tomorrow.`
    : `Hi ${data.recipientName}, your LOYALTY appointment is tomorrow.`;

  return baseTemplate(`
    <h2 style="color:${brandColor};margin:0 0 16px;">Appointment Reminder</h2>
    <p style="color:#ccc;margin:0 0 24px;">${greeting}</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border-radius:12px;padding:16px;">
      ${detailRow("Service", data.serviceName)}
      ${detailRow("Date", data.date)}
      ${detailRow("Time", data.time)}
    </table>
    <p style="color:#888;margin:24px 0 0;font-size:14px;">We look forward to seeing you!</p>
  `);
}

export function contactNotificationHtml(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): string {
  return baseTemplate(`
    <h2 style="color:${brandColor};margin:0 0 16px;">New Contact Message</h2>
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;border-radius:12px;padding:16px;">
      ${detailRow("Name", data.name)}
      ${detailRow("Email", data.email)}
      ${data.phone ? detailRow("Phone", data.phone) : ""}
      ${detailRow("Message", data.message)}
    </table>
  `);
}
