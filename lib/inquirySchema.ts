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
