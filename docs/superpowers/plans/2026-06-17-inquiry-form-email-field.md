# Inquiry Form Email Field Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a required `email` field to the contact page inquiry form so the business can identify and follow up with buyers who submit inquiries.

**Architecture:** Extend the existing Zod schema (`lib/inquirySchema.ts`) with an `email` field, surface it in the React Hook Form UI (`components/forms/InquiryForm.tsx`), and include it in the HTML body of the Resend notification email (`lib/actions.ts`). No new files, no new dependencies — this codebase has no unit test framework (no Jest/Vitest/RTL), so verification follows its existing pattern: `scripts/qa-smoke.mjs` static text assertions for structural checks, `pnpm type-check` for type safety, and a real browser submission against the already-configured live Resend API key for behavioral verification.

**Tech Stack:** Next.js 16 Server Actions, Zod, React Hook Form + `@hookform/resolvers/zod`, Resend SDK.

**Reference spec:** `docs/superpowers/specs/2026-06-17-inquiry-form-email-field-design.md`

---

### Task 1: Add email field to the inquiry schema and form UI

These two changes are coupled: `InquiryFormData` is inferred from the Zod schema, so making `email` required there immediately requires `defaultValues` (and the JSX) in `InquiryForm.tsx` to supply it, or `pnpm type-check` breaks. They must land in the same commit to keep the repo in a working state at every checkpoint.

**Files:**
- Modify: `lib/inquirySchema.ts:4` (insert new field after `name`)
- Modify: `components/forms/InquiryForm.tsx:33-40` (defaultValues) and after line 105 (new FormField)
- Test: `scripts/qa-smoke.mjs`

- [ ] **Step 1: Add failing smoke assertions**

In `scripts/qa-smoke.mjs`, insert this block after line 74 (`assert(products.includes("getProductSampleLink"), ...)`) and before line 76 (`if (failures.length > 0) {`):

```js

const inquirySchema = read("lib/inquirySchema.ts");
assert(
  inquirySchema.includes(`email: z.string()`) &&
    inquirySchema.includes(`.email(`),
  "inquirySchema requires and validates an email field",
);

const inquiryForm = read("components/forms/InquiryForm.tsx");
assert(inquiryForm.includes(`email: ""`), "InquiryForm defaultValues includes email");
assert(
  inquiryForm.includes(`name="email"`) && inquiryForm.includes(`type="email"`),
  "InquiryForm renders a required email input",
);
```

- [ ] **Step 2: Run smoke script, verify the new assertions fail**

Run: `node scripts/qa-smoke.mjs`
Expected: exits with code 1, output includes:
```
- inquirySchema requires and validates an email field
- InquiryForm defaultValues includes email
- InquiryForm renders a required email input
```
(All other existing assertions still pass — only these three are new failures.)

- [ ] **Step 3: Add the email field to the schema**

In `lib/inquirySchema.ts`, the full file becomes:

```ts
import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  company: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  phone: z.string().optional(),
  products: z
    .array(z.enum(["coconut", "copra", "cloves", "pepper", "cacao-bean"]))
    .min(1, "Select at least one product"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type InquiryFormData = z.infer<typeof inquirySchema>;
```

(`.min(1, ...)` is chained before `.email(...)` deliberately: with React Hook Form's default `criteriaMode: 'firstError'`, an empty field shows "Email is required"; a non-empty malformed value shows "Enter a valid email".)

- [ ] **Step 4: Add `email` to defaultValues in the form**

In `components/forms/InquiryForm.tsx`, replace lines 33-40:

```ts
const defaultValues: InquiryFormData = {
  name: "",
  company: "",
  country: "",
  phone: "",
  products: [],
  message: "",
};
```

with:

```ts
const defaultValues: InquiryFormData = {
  name: "",
  email: "",
  company: "",
  country: "",
  phone: "",
  products: [],
  message: "",
};
```

- [ ] **Step 5: Add the Email FormField to the form UI**

In `components/forms/InquiryForm.tsx`, insert this block immediately after the closing `/>` of the Name `FormField` (originally ending at line 105) and before the Company `FormField` (originally starting at line 107):

```tsx
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-body text-lg font-semibold text-ivory">
                Email <span className="text-gold">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  autoComplete="email"
                  className="h-10 w-full rounded-sm border-border bg-bg text-ivory"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
```

- [ ] **Step 6: Run smoke script, verify it passes**

Run: `node scripts/qa-smoke.mjs`
Expected: `QA smoke checks passed.` (exit code 0)

- [ ] **Step 7: Run type-check**

Run: `pnpm type-check`
Expected: no errors (confirms `defaultValues` and the new field satisfy the now-required `InquiryFormData.email`)

- [ ] **Step 8: Commit**

```bash
git add lib/inquirySchema.ts components/forms/InquiryForm.tsx scripts/qa-smoke.mjs
git commit -m "Add required email field to inquiry form."
```

---

### Task 2: Include the buyer's email in the Resend notification body

**Files:**
- Modify: `lib/actions.ts:24-37` (`buildInquiryEmailHtml`)
- Test: `scripts/qa-smoke.mjs`

- [ ] **Step 1: Add a failing smoke assertion**

In `scripts/qa-smoke.mjs`, insert after the block added in Task 1:

```js

const actions = read("lib/actions.ts");
assert(
  actions.includes("data.email"),
  "Inquiry notification email includes the buyer's email address",
);
```

- [ ] **Step 2: Run smoke script, verify it fails**

Run: `node scripts/qa-smoke.mjs`
Expected: exits with code 1, output includes:
```
- Inquiry notification email includes the buyer's email address
```

- [ ] **Step 3: Add the email line to the notification body**

In `lib/actions.ts`, replace the `buildInquiryEmailHtml` function (lines 24-37):

```ts
function buildInquiryEmailHtml(data: InquiryFormData): string {
  const company = data.company?.trim() ? data.company : "Not provided";
  const phone = data.phone?.trim() ? data.phone : "Not provided";

  return `
    <h2>New inquiry from ${data.name}</h2>
    <p><strong>Company:</strong> ${company}</p>
    <p><strong>Country:</strong> ${data.country}</p>
    <p><strong>WhatsApp / Phone:</strong> ${phone}</p>
    <p><strong>Products:</strong> ${formatProducts(data.products)}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, "<br />")}</p>
  `;
}
```

with:

```ts
function buildInquiryEmailHtml(data: InquiryFormData): string {
  const company = data.company?.trim() ? data.company : "Not provided";
  const phone = data.phone?.trim() ? data.phone : "Not provided";

  return `
    <h2>New inquiry from ${data.name}</h2>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Company:</strong> ${company}</p>
    <p><strong>Country:</strong> ${data.country}</p>
    <p><strong>WhatsApp / Phone:</strong> ${phone}</p>
    <p><strong>Products:</strong> ${formatProducts(data.products)}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, "<br />")}</p>
  `;
}
```

Do not add a `replyTo` option to the `resend.emails.send()` call elsewhere in this file — this was an explicit decision during design (the notification's reply-to stays as the business's own sender address; the buyer's email is informational in the body only).

- [ ] **Step 4: Run smoke script, verify it passes**

Run: `node scripts/qa-smoke.mjs`
Expected: `QA smoke checks passed.` (exit code 0)

- [ ] **Step 5: Run type-check**

Run: `pnpm type-check`
Expected: no errors

- [ ] **Step 6: Commit**

```bash
git add lib/actions.ts scripts/qa-smoke.mjs
git commit -m "Include buyer email in inquiry notification body."
```

---

### Task 3: Verify end-to-end against the live Resend API

No automated test exists for this step — it's the one thing static checks can't prove. The goal is direct evidence that Resend actually accepts the send, observed through the form's own success/error UI state (`InquiryForm.tsx` only renders the success block when `sendInquiryAction` returns `{ success: true }`, which — given `RESEND_API_KEY` and `CONTACT_EMAIL_TO` are already set in `.env.local` — only happens after a real, error-free Resend API response).

**Files:** none modified.

- [ ] **Step 1: Start the dev server**

Run: `pnpm dev` (background)
Expected: output includes `Ready` and `http://localhost:3000`

- [ ] **Step 2: Open the contact page in a real browser**

Navigate to `http://localhost:3000/contact` using browser automation (e.g. chrome-devtools MCP) or have the user do this manually if no browser tool is available in this session.

- [ ] **Step 3: Verify the "required" validation path**

Fill Name = `Test Buyer`, leave Email blank, Country = `China`, Products = select `Coconut`, Message = `This is a test inquiry message for verification purposes.` Click "Send Inquiry".
Expected: form does not submit; the text `Email is required` appears under the Email field.

- [ ] **Step 4: Verify the "invalid format" validation path**

Fill Email = `not-an-email`. Click "Send Inquiry" again.
Expected: form does not submit; the text `Enter a valid email` appears under the Email field.

- [ ] **Step 5: Submit a valid inquiry and confirm Resend accepts it**

Fill Email = `buyer-test@example.com`. Click "Send Inquiry".
Expected: button briefly shows "Sending...", then the form is replaced with:
```
Thanks. We've received your inquiry.
We'll be in touch within 24 hours.
```
If instead the red error text "Unable to send your inquiry. Please try WhatsApp instead." appears, stop and report the dev server's console output (the action logs `Resend error: <message>` there) — do not proceed to Step 6 until this is resolved, since it means Resend rejected the send (e.g. unverified sending domain).

- [ ] **Step 6: Stop the dev server**

- [ ] **Step 7: Ask the user to confirm inbox delivery**

UI success confirms Resend's API *accepted* the request, not that it was delivered. Ask the user to check the `marketing@kaembabuntusu.com` inbox (and spam folder) for the test inquiry email and confirm it arrived with the new Email line visible in the body. This step has no automated equivalent — it requires the user's own inbox access.

---

## Notes

- Rate-limiting middleware (mentioned in `CLAUDE.md`, not yet implemented) is explicitly out of scope for this plan — see spec.
- `InquiryForm` is shared by both `components/sections/Contact.tsx` (homepage) and `components/pages/ContactPageContent.tsx` (`/contact` page) — fixing it once in `InquiryForm.tsx` covers both surfaces, no duplicate work needed.
