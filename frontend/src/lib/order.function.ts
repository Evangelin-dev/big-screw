// src/lib/order.functions.ts
// Runs on the server only. Needs env vars: RESEND_API_KEY, ADMIN_EMAIL, FROM_EMAIL
import { createServerFn } from "@tanstack/react-start";

export type OrderPayload = {
  orderId: string;
  utr: string;
  customer: {
    company: string;
    gstin: string;
    contact: string;
    mobile: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pin: string;
  };
  lines: { name: string; quantity: number; price: number }[];
  subtotal: number;
  gst: number;
  total: number;
};

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

async function sendMail(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env["RESEND_API_KEY"]}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env["FROM_EMAIL"] ?? "onboarding@resend.dev",
      to,
      subject,
      html,
    }),
  });
  if (!res.ok) throw new Error(`Email failed: ${res.status} ${await res.text()}`);
}

export const submitOrder = createServerFn({ method: "POST" })
  // On older TanStack Start versions this is called `.validator(...)`
  .inputValidator((d: OrderPayload) => d)
  .handler(async ({ data }) => {
    const c = data.customer;
    const rows = data.lines
      .map(
        (l) =>
          `<tr><td>${l.name}</td><td align="right">${l.quantity}</td><td align="right">${inr(l.price * l.quantity)}</td></tr>`,
      )
      .join("");

    const adminHtml = `
      <h2>New order ${data.orderId}</h2>
      <p><b>UPI transaction ID (UTR):</b> ${data.utr}<br/>
      Please verify this payment in your bank/UPI app before dispatch.</p>
      <h3>Customer</h3>
      <p>${c.company}<br/>GSTIN: ${c.gstin || "-"}<br/>
      ${c.contact} · ${c.mobile} · ${c.email}<br/>
      ${c.address}, ${c.city}, ${c.state} ${c.pin}</p>
      <h3>Items</h3>
      <table cellpadding="6" border="1" style="border-collapse:collapse">
        <tr><th>Product</th><th>Qty</th><th>Amount</th></tr>${rows}
      </table>
      <p>Subtotal ${inr(data.subtotal)}<br/>GST 18% ${inr(data.gst)}<br/>
      <b>Total ${inr(data.total)}</b></p>`;

    // Admin email must succeed
    await sendMail(process.env["ADMIN_EMAIL"]!, `New order ${data.orderId} - ${inr(data.total)}`, adminHtml);

    // Customer copy is best-effort
    try {
      await sendMail(
        c.email,
        `Order ${data.orderId} received`,
        `<p>Hi ${c.contact},</p>
         <p>Thanks for your order <b>${data.orderId}</b> (${inr(data.total)}).
         We will verify your payment (UTR ${data.utr}) and confirm dispatch shortly.</p>`,
      );
    } catch {
      /* ignore */
    }

    return { ok: true as const };
  });