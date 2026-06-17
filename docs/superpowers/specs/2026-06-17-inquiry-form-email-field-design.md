# Inquiry Form Email Field — Design Spec

**Date:** 2026-06-17  
**Status:** Approved (pending implementation)  
**Scope:** `components/forms/InquiryForm.tsx`, `lib/inquirySchema.ts`, `lib/actions.ts`

---

## Context

The contact page inquiry form and its Resend-backed Server Action (`sendInquiryAction`) were already implemented in a prior pass — schema validation, HTML email construction, and error handling all work, and a live `RESEND_API_KEY` is already configured in `.env.local`. The one gap: there is no `email` field anywhere in the pipeline (schema, form UI, or notification email body), so the business has no reliable way to email a buyer back. This spec adds that field only; it does not touch the existing Resend wiring, which already works.

**Out of scope:** rate-limiting middleware (called for in `CLAUDE.md`, not yet built) — deferred per user request ("dulu").

---

## Changes

### 1. `lib/inquirySchema.ts`
Add a required `email` field between `name` and `company`:
```ts
email: z.string().min(1, "Email is required").email("Enter a valid email"),
```

### 2. `components/forms/InquiryForm.tsx`
- Add `email: ""` to `defaultValues`.
- Add a new `FormField` for `email`, positioned directly after Name, before Company. Same visual treatment as the Name field (`h-10 w-full rounded-sm border-border bg-bg text-ivory` input, gold `*` required marker), with `type="email"` and `autoComplete="email"`.

### 3. `lib/actions.ts`
- Add `<p><strong>Email:</strong> ${data.email}</p>` to `buildInquiryEmailHtml`, directly after the `<h2>` heading and before the Company line — mirroring its position in the form (right after Name).
- No `replyTo` change — the outbound notification keeps its existing reply-to behavior (business's own sender address). Email is informational in the body only, not used for reply routing. This was an explicit decision made when the design was approved.

---

## Verification

Type checks alone aren't sufficient here — the actual goal is "the business receives a real email." Verification is:
1. `pnpm type-check` — confirm the new required field doesn't break existing call sites.
2. Start `pnpm dev`, open the contact page in a real browser, submit a real test inquiry with a valid email.
3. Confirm the email arrives at `marketing@kaembabuntusu.com` (the currently configured `CONTACT_EMAIL_TO`) with the new Email line present in the body.

---

## Success criteria

1. Submitting the form without an email shows a validation error ("Email is required") and does not call the server action.
2. Submitting with an invalid email (e.g. `abc`) shows "Enter a valid email."
3. A valid submission sends a real email via Resend containing the buyer's email address in the body.
4. No existing field's behavior changes (phone/company remain optional, country/products/message validation unchanged).

---

## Implementation order

1. Schema field
2. Form field
3. Email body line
4. `pnpm type-check`
5. Manual end-to-end send test
