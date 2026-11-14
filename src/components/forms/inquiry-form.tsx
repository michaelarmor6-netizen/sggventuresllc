"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, CheckCircle2, Loader2, Send } from "lucide-react";
import {
  enquirySchema,
  PROJECT_TYPES,
  type EnquiryInput,
  type ProjectType,
} from "@/lib/validation/schemas";
import { submitEnquiry } from "@/app/actions/inquiries";
import {
  Field,
  FormInput,
  FormSelect,
  FormTextarea,
  HoneypotField,
  useFormStartedAt,
} from "@/components/forms/form-primitives";
import { Button } from "@/components/ui/button";

type FieldName = keyof EnquiryInput;

function describedBy(id: string, hasError: boolean, hasHint = false) {
  if (hasError) return `${id}-error`;
  return hasHint ? `${id}-hint` : undefined;
}

export function EnquiryForm({
  defaultProjectType,
  fallbackEmail,
}: {
  defaultProjectType?: ProjectType;
  /** Verified direct address offered when sending fails. */
  fallbackEmail?: string | null;
}) {
  const startedAt = useFormStartedAt();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      email: "",
      businessName: "",
      projectType: defaultProjectType,
      description: "",
      budget: "",
      timeline: "",
      consent: false,
      websiteUrl: "",
      formStartedAt: startedAt,
    },
    mode: "onTouched",
  });

  // Move focus to the outcome so keyboard and screen-reader users hear it.
  useEffect(() => {
    if (status === "error") alertRef.current?.focus();
    if (status === "success") successRef.current?.focus();
  }, [status, errorMessage]);

  const onValid = async (values: EnquiryInput) => {
    setStatus("idle");
    setErrorMessage(null);
    try {
      const result = await submitEnquiry({ ...values, formStartedAt: startedAt });
      if (result.ok) {
        // Shown only after the server confirms the enquiry was stored.
        reset();
        setStatus("success");
        return;
      }
      // The values stay in the form so nothing has to be retyped.
      for (const [field, messages] of Object.entries(result.fieldErrors ?? {})) {
        if (messages[0]) {
          setError(field as FieldName, { type: "server", message: messages[0] });
        }
      }
      setErrorMessage(result.error);
      setStatus("error");
    } catch {
      setErrorMessage(
        "We could not reach the server, so your enquiry was not sent. Check your connection and try again.",
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-xl bg-white p-8 text-center outline-none md:p-10"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-700" aria-hidden="true" />
        <h2 className="mt-4 font-display text-title text-midnight">
          Your enquiry has been received.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-slateink">
          We will review it and reply to the email address you gave to discuss
          whether the project fits our services.
        </p>
        <Button
          variant="outline"
          size="md"
          className="mt-7"
          onClick={() => setStatus("idle")}
        >
          Send another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onValid, () => {
        setErrorMessage(
          "Some fields need attention. Check the messages below and send again.",
        );
        setStatus("error");
      })}
      noValidate
      aria-labelledby="enquiry-form-title"
      className="relative rounded-xl bg-white p-6 md:p-9"
    >
      <h2 id="enquiry-form-title" className="font-display text-title text-midnight">
        Project enquiry
      </h2>
      <p className="mt-2 text-[15px] text-slateink">
        All fields are required unless marked optional.
      </p>

      {status === "error" && errorMessage && (
        <div
          ref={alertRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 p-4 outline-none"
        >
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-700" aria-hidden="true" />
          <p className="text-[15px] leading-relaxed text-red-900">
            {errorMessage}
            {fallbackEmail && (
              <>
                {" "}
                You can also email us directly at{" "}
                <a href={`mailto:${fallbackEmail}`} className="font-semibold underline">
                  {fallbackEmail}
                </a>
                .
              </>
            )}
          </p>
        </div>
      )}

      <HoneypotField {...register("websiteUrl")} />

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" error={errors.name?.message}>
          <FormInput
            id="name"
            autoComplete="name"
            invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name", Boolean(errors.name))}
            {...register("name")}
          />
        </Field>
        <Field label="Email" htmlFor="email" error={errors.email?.message}>
          <FormInput
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email", Boolean(errors.email))}
            {...register("email")}
          />
        </Field>
        <Field
          label="Business name"
          htmlFor="businessName"
          error={errors.businessName?.message}
        >
          <FormInput
            id="businessName"
            autoComplete="organization"
            invalid={Boolean(errors.businessName)}
            aria-describedby={describedBy("businessName", Boolean(errors.businessName))}
            {...register("businessName")}
          />
        </Field>
        <Field
          label="Project type"
          htmlFor="projectType"
          error={errors.projectType?.message}
        >
          <FormSelect
            id="projectType"
            defaultValue={defaultProjectType ?? ""}
            invalid={Boolean(errors.projectType)}
            aria-describedby={describedBy("projectType", Boolean(errors.projectType))}
            {...register("projectType")}
          >
            <option value="" disabled>
              Choose one
            </option>
            {PROJECT_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </FormSelect>
        </Field>
        <div className="sm:col-span-2">
          <Field
            label="Project description"
            htmlFor="description"
            hint="What you want to build, the problem it solves, and who will use it."
            error={errors.description?.message}
          >
            <FormTextarea
              id="description"
              rows={6}
              invalid={Boolean(errors.description)}
              aria-describedby={describedBy("description", Boolean(errors.description), true)}
              {...register("description")}
            />
          </Field>
        </div>
        <Field
          label="Budget"
          htmlFor="budget"
          optional
          hint="A rough figure or range helps us suggest a sensible scope."
          error={errors.budget?.message}
        >
          <FormInput
            id="budget"
            invalid={Boolean(errors.budget)}
            aria-describedby={describedBy("budget", Boolean(errors.budget), true)}
            {...register("budget")}
          />
        </Field>
        <Field
          label="Timeline"
          htmlFor="timeline"
          optional
          hint="When you would like to start or launch."
          error={errors.timeline?.message}
        >
          <FormInput
            id="timeline"
            invalid={Boolean(errors.timeline)}
            aria-describedby={describedBy("timeline", Boolean(errors.timeline), true)}
            {...register("timeline")}
          />
        </Field>
      </div>

      <div className="mt-6">
        <label
          htmlFor="consent"
          className="flex min-h-11 items-start gap-3 text-[15px] leading-relaxed text-slateink"
        >
          <input
            id="consent"
            type="checkbox"
            className="mt-1 h-5 w-5 shrink-0 rounded border-linehair accent-royal"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            {...register("consent")}
          />
          <span>
            I have read the{" "}
            <Link
              href="/legal/privacy-policy"
              className="font-semibold text-royal underline underline-offset-2 hover:text-royal-deep"
            >
              Privacy Policy
            </Link>{" "}
            and agree to SGG Ventures LLC using these details to respond to my
            enquiry.
          </span>
        </label>
        {errors.consent?.message && (
          <p
            id="consent-error"
            role="alert"
            className="mt-1.5 text-[14px] font-semibold text-red-700"
          >
            {errors.consent.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="mt-7 w-full sm:w-auto"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send enquiry <Send className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
}
