"use client";

import { forwardRef, useState } from "react";
import type { ComponentProps } from "react";
import { FormInput } from "@/components/forms/form-primitives";

/** Password field with a show/hide toggle. */
export const PasswordInput = forwardRef<
  HTMLInputElement,
  Omit<ComponentProps<"input">, "type"> & { invalid?: boolean }
>(function PasswordInput(props, ref) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <FormInput ref={ref} type={visible ? "text" : "password"} className="pr-20" {...props} />
      <button
        type="button"
        onClick={() => setVisible((value) => !value)}
        aria-pressed={visible}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute inset-y-1 right-1 min-w-16 rounded-lg px-3 text-[14px] text-royal hover:bg-coolgray"
      >
        {visible ? "Hide" : "Show"}
      </button>
    </div>
  );
});
