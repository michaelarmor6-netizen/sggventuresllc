"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { portalSignIn } from "@/app/actions/portal";
import { forgotPassword, resetPassword, signUp } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Field, FormInput, HoneypotField, useFormStartedAt } from "@/components/forms/form-primitives";
import { PasswordInput } from "@/components/auth/password-input";
import { AuthNotice } from "@/components/auth/auth-shell";

type Errors = Record<string, string | undefined>;

function describedBy(id: string, error?: string, hint?: boolean) {
  if (error) return `${id}-error`;
  return hint ? `${id}-hint` : undefined;
}

/** Moves focus to the status message so screen-reader users hear it. */
function useFocusOnChange<T>(value: T) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (value) ref.current?.querySelector<HTMLElement>("[tabindex='-1']")?.focus();
  }, [value]);
  return ref;
}

/* ------------------------------------------------------------------ */
/* Log in                                                               */
/* ------------------------------------------------------------------ */

export function LoginForm({ notice }: { notice?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const statusRef = useFocusOnChange(error);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const result = await portalSignIn({ email, password });
      if (result.ok) {
        router.push("/portal");
        router.refresh();
        return;
      }
      setError(result.error ?? "That email and password do not match an account.");
    } catch {
      setError("Log in did not finish. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div ref={statusRef} className="space-y-3">
        {notice && <AuthNotice tone="success">{notice}</AuthNotice>}
        {error && <AuthNotice tone="error">{error}</AuthNotice>}
      </div>
      <Field label="Email" htmlFor="login-email">
        <FormInput
          id="login-email"
          type="email"
          inputMode="email"
          autoComplete="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </Field>
      <div>
        <Field label="Password" htmlFor="login-password">
          <PasswordInput
            id="login-password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Field>
        <p className="mt-2 text-right">
          <Link href="/forgot-password" className="text-[15px] text-royal underline-offset-4 hover:underline">
            Forgot password?
          </Link>
        </p>
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={busy} aria-busy={busy}>
        {busy ? "Logging in…" : "Log in"}
      </Button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Sign up                                                              */
/* ------------------------------------------------------------------ */

export function SignUpForm() {
  const router = useRouter();
  const startedAt = useFormStartedAt();
  const [values, setValues] = useState({
    name: "",
    email: "",
    organization: "",
    password: "",
    confirmPassword: "",
    consent: false,
    websiteUrl: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const statusRef = useFocusOnChange(error);

  const set = (key: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setValues((current) => ({
      ...current,
      [key]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
    }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setErrors({});
    try {
      const result = await signUp({ ...values, formStartedAt: startedAt });
      if (result.ok) {
        router.push("/portal?welcome=1");
        router.refresh();
        return;
      }
      setErrors(result.fieldErrors ?? {});
      setError(result.error);
    } catch {
      setError("Sign-up did not finish. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} noValidate className="relative space-y-5">
      <div ref={statusRef}>{error && <AuthNotice tone="error">{error}</AuthNotice>}</div>
      <HoneypotField value={values.websiteUrl} onChange={set("websiteUrl")} />
      <Field label="Full name" htmlFor="signup-name" error={errors.name}>
        <FormInput
          id="signup-name"
          autoComplete="name"
          value={values.name}
          onChange={set("name")}
          invalid={Boolean(errors.name)}
          aria-describedby={describedBy("signup-name", errors.name)}
          required
        />
      </Field>
      <Field label="Email" htmlFor="signup-email" error={errors.email}>
        <FormInput
          id="signup-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={values.email}
          onChange={set("email")}
          invalid={Boolean(errors.email)}
          aria-describedby={describedBy("signup-email", errors.email)}
          required
        />
      </Field>
      <Field label="Company" htmlFor="signup-organization" optional error={errors.organization}>
        <FormInput
          id="signup-organization"
          autoComplete="organization"
          value={values.organization}
          onChange={set("organization")}
          invalid={Boolean(errors.organization)}
          aria-describedby={describedBy("signup-organization", errors.organization)}
        />
      </Field>
      <Field
        label="Password"
        htmlFor="signup-password"
        hint="At least 10 characters. A short sentence works well."
        error={errors.password}
      >
        <PasswordInput
          id="signup-password"
          autoComplete="new-password"
          value={values.password}
          onChange={set("password")}
          invalid={Boolean(errors.password)}
          aria-describedby={describedBy("signup-password", errors.password, true)}
          required
        />
      </Field>
      <Field label="Confirm password" htmlFor="signup-confirm" error={errors.confirmPassword}>
        <PasswordInput
          id="signup-confirm"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={set("confirmPassword")}
          invalid={Boolean(errors.confirmPassword)}
          aria-describedby={describedBy("signup-confirm", errors.confirmPassword)}
          required
        />
      </Field>
      <div>
        <label htmlFor="signup-consent" className="flex min-h-11 items-start gap-3 text-[15px] leading-[1.47] text-slateink">
          <input
            id="signup-consent"
            type="checkbox"
            checked={values.consent}
            onChange={set("consent")}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "signup-consent-error" : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-royal"
          />
          <span>
            I agree to the{" "}
            <Link href="/legal/terms-of-use" className="text-royal underline underline-offset-2">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="/legal/privacy-policy" className="text-royal underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p id="signup-consent-error" role="alert" className="mt-1.5 text-[14px] font-semibold text-red-700">
            {errors.consent}
          </p>
        )}
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={busy} aria-busy={busy}>
        {busy ? "Creating your account…" : "Create account"}
      </Button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Forgot password                                                      */
/* ------------------------------------------------------------------ */

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const statusRef = useFocusOnChange(error || sent);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const result = await forgotPassword({ email });
      if (result.ok) setSent(true);
      else setError(result.error);
    } catch {
      setError("The request did not finish. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  if (sent) {
    return (
      <div ref={statusRef}>
        <AuthNotice tone="success">
          If an account exists for <strong className="font-semibold">{email}</strong>, we have sent a
          link to reset the password. It expires in 1 hour. Check your spam folder if it does not
          arrive in a few minutes.
        </AuthNotice>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div ref={statusRef}>{error && <AuthNotice tone="error">{error}</AuthNotice>}</div>
      <Field label="Email" htmlFor="forgot-email">
        <FormInput
          id="forgot-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </Field>
      <Button type="submit" size="lg" className="w-full" disabled={busy} aria-busy={busy}>
        {busy ? "Sending…" : "Send reset link"}
      </Button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Reset password                                                       */
/* ------------------------------------------------------------------ */

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [error, setError] = useState<string | null>(null);
  const [expired, setExpired] = useState(false);
  const [busy, setBusy] = useState(false);
  const statusRef = useFocusOnChange(error);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setErrors({});
    try {
      const result = await resetPassword({ token, password, confirmPassword });
      if (result.ok) {
        router.push("/portal?reset=1");
        router.refresh();
        return;
      }
      setExpired(Boolean(result.expired));
      setErrors(result.fieldErrors ?? {});
      setError(result.error);
    } catch {
      setError("The reset did not finish. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  if (expired) {
    return (
      <div ref={statusRef} className="space-y-5">
        <AuthNotice tone="error">{error}</AuthNotice>
        <Link href="/forgot-password" className="inline-flex min-h-11 items-center text-[17px] text-royal underline-offset-4 hover:underline">
          Request a new link ›
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div ref={statusRef}>{error && <AuthNotice tone="error">{error}</AuthNotice>}</div>
      <Field label="New password" htmlFor="reset-password" hint="At least 10 characters." error={errors.password}>
        <PasswordInput
          id="reset-password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          invalid={Boolean(errors.password)}
          aria-describedby={describedBy("reset-password", errors.password, true)}
          required
        />
      </Field>
      <Field label="Confirm new password" htmlFor="reset-confirm" error={errors.confirmPassword}>
        <PasswordInput
          id="reset-confirm"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          invalid={Boolean(errors.confirmPassword)}
          aria-describedby={describedBy("reset-confirm", errors.confirmPassword)}
          required
        />
      </Field>
      <Button type="submit" size="lg" className="w-full" disabled={busy} aria-busy={busy}>
        {busy ? "Saving…" : "Save new password"}
      </Button>
    </form>
  );
}
