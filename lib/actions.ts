"use server";

import { Resend } from "resend";
import {
  inquirySchema,
  type InquiryFormData,
} from "@/lib/inquirySchema";

export type { InquiryFormData } from "@/lib/inquirySchema";

export type InquiryActionResult =
  | { success: true }
  | { success: false; error: string };

function buildInquiryEmailHtml(data: InquiryFormData): string {
  const company = data.company?.trim() ? data.company : "Not provided";
  const phone = data.phone?.trim() ? data.phone : "Not provided";

  return `
    <h2>New inquiry from ${data.name}</h2>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Company:</strong> ${company}</p>
    <p><strong>Country:</strong> ${data.country}</p>
    <p><strong>WhatsApp / Phone:</strong> ${phone}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, "<br />")}</p>
  `;
}

function buildInquiryEmailText(data: InquiryFormData): string {
  const company = data.company?.trim() ? data.company : "Not provided";
  const phone = data.phone?.trim() ? data.phone : "Not provided";

  return [
    `New inquiry from ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${company}`,
    `Country: ${data.country}`,
    `WhatsApp / Phone: ${phone}`,
    ``,
    `Message:`,
    data.message,
  ].join("\n");
}

export async function sendInquiryAction(
  data: InquiryFormData,
): Promise<InquiryActionResult> {
  const parsed = inquirySchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid form data",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO?.split(",")
    .map((email) => email.trim())
    .filter(Boolean);

  if (!apiKey || !to || to.length === 0) {
    if (process.env.NODE_ENV === "development") {
      return { success: true };
    }

    return {
      success: false,
      error: "Contact form is not configured yet.",
    };
  }

  const from =
    process.env.CONTACT_EMAIL_FROM ??
    "CV. Kaemba Buntusu Indonesia <marketing@kaembabuntusu.com>";

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to,
      subject: `Inquiry from ${parsed.data.name} (${parsed.data.country})`,
      html: buildInquiryEmailHtml(parsed.data),
      text: buildInquiryEmailText(parsed.data),
    });

    if (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Resend error:", error.message);
      }

      return {
        success: false,
        error: "Unable to send your inquiry. Please try WhatsApp instead.",
      };
    }

    return { success: true };
  } catch {
    return {
      success: false,
      error: "Unable to send your inquiry. Please try WhatsApp instead.",
    };
  }
}
