"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, AlertTriangle, Send } from "lucide-react";
import {
  partnershipSchema,
  PARTNER_TYPES,
  type PartnershipInput,
} from "@/lib/validation/schemas";
import { submitPartnership } from "@/app/actions/partnerships";
import {
  Field,
  FormInput,
  FormSelect,
  FormTextarea,
  HoneypotField,
  useFormStartedAt,
} from "@/components/forms/form-primitives";
import { Button } from "@/components/ui/button";

export function PartnershipForm() {
  const startedAt = useFormStartedAt();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<PartnershipInput>({
    resolver: zodResolver(partnershipSchema),
    defaultValues: { formStartedAt: startedAt, websiteUrl: "" },
    mode: "onBlur",
  });

  const onValid = async (values: PartnershipInput) => {
    setStatus("idle");
    setErrorMessage(null);
    const result = await submitPartnership({
      ...values,
      phone: values.phone || "",
      website: values.website || "",
      formStartedAt: startedAt,
    });
    if (result.ok) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-azure/30 bg-mist p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-azure" aria-hidden="true" />
        <h3 className="mt-4 font-display text-title">Partnership inquiry received.</h3>
        <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-slateink">
          We have the proposal. If the licenses and the work line up, someone
          will write back.
        </p>
        <Button variant="outline" size="md" className="mt-6" onClick={() => setStatus("idle")}>
          Submit another proposal
        </Button>
      </div>
    );
  }

  const partnerTypeValue = watch("partnerType");

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      noValidate
      className="rounded-xl border border-linehair bg-white p-7 shadow-card md:p-9"
    >
      <HoneypotField {...register("websiteUrl")} />
      <input type="hidden" {...register("formStartedAt")} value={startedAt} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Organization" htmlFor="p-organization" error={errors.organization?.message}>
          <FormInput
            id="p-organization"
            autoComplete="organization"
            placeholder="Institution or firm name"
            invalid={Boolean(errors.organization)}
            {...register("organization")}
          />
        </Field>
        <Field label="Contact Name" htmlFor="p-contact" error={errors.contactName?.message}>
          <FormInput
            id="p-contact"
            autoComplete="name"
            placeholder="Full name"
            invalid={Boolean(errors.contactName)}
            {...register("contactName")}
          />
        </Field>
        <Field label="Business Email" htmlFor="p-email" error={errors.email?.message}>
          <FormInput
            id="p-email"
            type="email"
            autoComplete="email"
            placeholder="name@institution.com"
            invalid={Boolean(errors.email)}
            {...register("email")}
          />
        </Field>
        <Field label="Telephone" htmlFor="p-phone" optional error={errors.phone?.message}>
          <FormInput
            id="p-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (___) ___-____"
            invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
        </Field>
        <Field label="Country" htmlFor="p-country" error={errors.country?.message}>
          <FormInput
            id="p-country"
            autoComplete="country-name"
            placeholder="United States"
            invalid={Boolean(errors.country)}
            {...register("country")}
          />
        </Field>
        <Field label="Website" htmlFor="p-website" optional error={errors.website?.message}>
          <FormInput
            id="p-website"
            type="url"
            placeholder="https://yourinstitution.com"
            invalid={Boolean(errors.website)}
            {...register("website")}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field
            label="Partnership Category"
            htmlFor="p-type"
            error={errors.partnerType?.message}
          >
            <FormSelect
              id="p-type"
              invalid={Boolean(errors.partnerType)}
              value={partnerTypeValue ?? ""}
              onChange={(e) =>
                setValue("partnerType", e.target.value as PartnershipInput["partnerType"])
              }
            >
              <option value="" disabled>
                Select a category…
              </option>
              {PARTNER_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </FormSelect>
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field
            label="Institution & Capabilities"
            htmlFor="p-capabilities"
            error={errors.capabilities?.message}
            hint="Describe your institution, licenses or authorizations, service capability, and the relationship you envision."
          >
            <FormTextarea
              id="p-capabilities"
              rows={6}
              invalid={Boolean(errors.capabilities)}
              {...register("capabilities")}
            />
          </Field>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="p-consent" className="flex items-start gap-3 text-[15px] text-slateink">
          <input
            id="p-consent"
            type="checkbox"
            className="mt-0.5 h-4.5 w-4.5 rounded border-linehair accent-azure"
            {...register("consent")}
          />
          <span>
            I have read and accept the{" "}
            <Link
              href="/legal/privacy-policy"
              className="font-semibold text-royal underline decoration-azure/40 underline-offset-2 hover:text-azure-deep"
            >
              Privacy Policy
            </Link>{" "}
            and consent to SGG Ventures processing this
            partnership proposal for evaluation purposes.
          </span>
        </label>
        {errors.consent?.message && (
          <p role="alert" className="mt-1.5 text-[13px] font-semibold text-red-600">
            {errors.consent.message}
          </p>
        )}
      </div>

      {status === "error" && errorMessage && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4" role="alert">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
          <p className="text-[15px] text-red-800">{errorMessage}</p>
        </div>
      )}

      <Button type="submit" size="lg" className="mt-7 w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4.5 w-4.5 animate-spin" aria-hidden="true" />
            Submitting…
          </>
        ) : (
          <>
            Submit Proposal <Send className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </Button>
    </form>
  );
}
