"use server";

import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  products: z
    .array(z.enum(["coconut", "copra", "cloves", "pepper"]))
    .min(1, "Select at least one product"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;

export type InquiryActionResult =
  | { success: true }
  | { success: false; error: string };

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
  const to = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !to) {
    if (process.env.NODE_ENV === "development") {
      return { success: true };
    }

    return {
      success: false,
      error: "Contact form is not configured yet.",
    };
  }

  // Resend integration will be wired in Phase 12.
  void parsed.data;

  return { success: true };
}
