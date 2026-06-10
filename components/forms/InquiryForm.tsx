"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  BUYER_COUNTRIES,
  INQUIRY_PRODUCT_OPTIONS,
  WA_LINK,
} from "@/lib/constants";
import { sendInquiryAction } from "@/lib/actions";
import { inquirySchema, type InquiryFormData } from "@/lib/inquirySchema";
import { cn } from "@/lib/utils";

const defaultValues: InquiryFormData = {
  name: "",
  company: "",
  country: "",
  products: [],
  message: "",
};

export function InquiryForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues,
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: InquiryFormData) {
    setSubmitError(null);

    const result = await sendInquiryAction(values);

    if (result.success) {
      setIsSuccess(true);
      form.reset(defaultValues);
      return;
    }

    setSubmitError(result.error);
  }

  if (isSuccess) {
    return (
      <div className="border border-border bg-surface p-8 md:p-10">
        <p className="font-heading text-xl font-semibold text-ivory">
          Thanks. We&apos;ve received your inquiry.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-sage md:text-base">
          We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 border border-border bg-surface p-6 md:p-8"
        noValidate
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-body text-sm text-ivory">
                Name <span className="text-gold">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="name"
                  className="h-10 w-full rounded-sm border-border bg-bg text-ivory"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-body text-sm text-ivory">
                Company
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  autoComplete="organization"
                  className="h-10 w-full rounded-sm border-border bg-bg text-ivory"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-body text-sm text-ivory">
                Country <span className="text-gold">*</span>
              </FormLabel>
              <Select
                value={field.value || undefined}
                onValueChange={field.onChange}
              >
                <FormControl>
                  <SelectTrigger className="h-10 w-full rounded-sm border-border bg-bg text-ivory">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-sm border-border bg-surface text-ivory">
                  {BUYER_COUNTRIES.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="products"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-body text-sm text-ivory">
                Product <span className="text-gold">*</span>
              </FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {INQUIRY_PRODUCT_OPTIONS.map((option) => {
                    const selected = field.value.includes(option.value);

                    return (
                      <button
                        key={option.value}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => {
                          const next = selected
                            ? field.value.filter((v) => v !== option.value)
                            : [...field.value, option.value];
                          field.onChange(next);
                        }}
                        className={cn(
                          "rounded-sm border px-3 py-2 font-body text-sm transition-colors",
                          selected
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-border bg-bg text-sage hover:border-gold/30",
                        )}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-body text-sm text-ivory">
                Message <span className="text-gold">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={4}
                  className="min-h-[6.5rem] w-full rounded-sm border-border bg-bg text-ivory"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {submitError ? (
          <p className="text-sm text-red" role="alert">
            {submitError}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full cursor-pointer rounded-sm bg-gold font-body text-sm font-medium text-on-gold hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Sending..." : "Send Inquiry"}
        </Button>

        <p className="text-center text-sm text-sage">
          Prefer a faster response?{" "}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ivory underline-offset-4 hover:text-gold hover:underline"
          >
            Message us on WhatsApp
          </a>
          . We reply within the hour during business hours.
        </p>
      </form>
    </Form>
  );
}
