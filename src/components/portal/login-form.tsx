"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";
import { portalSignIn } from "@/app/actions/portal";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/forms/form-primitives";

export function PortalLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const result = await Promise.race([
        portalSignIn({ email, password }),
        new Promise<never>((_, reject) => {
          window.setTimeout(() => reject(new Error("timeout")), 20000);
        }),
      ]);
      if (result.ok) {
        router.push("/portal");
        router.refresh();
        return;
      }
      setError(result.error ?? "Authentication failed.");
    } catch {
      setError("Sign-in did not finish. Try again in a moment.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="bg-coolgray">
      <div className="container-x flex min-h-screen items-center justify-center py-16">
        <form
          onSubmit={submit}
          className="w-full max-w-sm rounded-[14px] border border-linehair bg-white p-8"
        >
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-midnight text-white">
            <Lock className="h-5 w-5" aria-hidden />
          </span>
          <h1 className="mt-5 text-center font-display text-[22px] font-bold tracking-tight text-midnight">
            Sign in
          </h1>
          <p className="mt-1.5 text-center text-[13.5px] leading-relaxed text-slateink">
            Staff see the desk. Clients see their own files.
          </p>
          <label htmlFor="portal-email" className="mt-6 mb-1.5 block font-display text-[13.5px] font-semibold text-midnight">
            Email
          </label>
          <FormInput
            id="portal-email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoFocus
          />
          <label htmlFor="portal-password" className="mt-4 mb-1.5 block font-display text-[13.5px] font-semibold text-midnight">
            Password
          </label>
          <FormInput
            id="portal-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {error && (
            <p role="alert" className="mt-3 text-[12.5px] font-semibold text-red-600">
              {error}
            </p>
          )}
          <Button type="submit" className="mt-5 w-full" disabled={busy}>
            {busy ? "Checking…" : "Sign in"}
          </Button>
        </form>
      </div>
    </section>
  );
}
