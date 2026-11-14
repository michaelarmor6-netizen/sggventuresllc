"use client";

import { forwardRef, useState } from "react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/classnames";

const controlBase =
  "w-full rounded-lg border border-linehair bg-pearl px-4 py-3 text-[16px] text-midnight placeholder:text-slateink/70 transition-colors focus:border-royal focus:bg-white focus:outline-none focus:ring-1 focus:ring-royal disabled:opacity-60";

export function Field({
  label,
  htmlFor,
  optional,
  error,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-[15px] font-semibold text-midnight"
      >
        {label}
        {optional && (
          <span className="ml-1.5 font-body text-[13px] font-normal text-slateink">
            (optional)
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${htmlFor}-hint`} className="mt-1.5 text-[15px] text-slateink">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="mt-1.5 text-[14px] font-semibold text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}

type InputProps = ComponentProps<"input"> & { invalid?: boolean };

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  function FormInput({ className, invalid, ...props }, ref) {
    return (
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(controlBase, invalid && "border-red-500 focus:ring-red-500/20", className)}
        {...props}
      />
    );
  },
);

type TextareaProps = ComponentProps<"textarea"> & { invalid?: boolean };

export const FormTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function FormTextarea({ className, invalid, rows = 5, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        aria-invalid={invalid || undefined}
        className={cn(controlBase, "resize-y", invalid && "border-red-500 focus:ring-red-500/20", className)}
        {...props}
      />
    );
  },
);

type SelectProps = ComponentProps<"select"> & { invalid?: boolean };

export const FormSelect = forwardRef<HTMLSelectElement, SelectProps>(
  function FormSelect({ className, invalid, children, ...props }, ref) {
    return (
      <select
        ref={ref}
        aria-invalid={invalid || undefined}
        className={cn(controlBase, "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%228%22%20viewBox%3D%220%200%2012%208%22%3E%3Cpath%20fill%3D%22%233d5266%22%20d%3D%22M6%208L0%200h12z%22/%3E%3C/svg%3E')] bg-[position:right_1rem_center] bg-no-repeat pr-10", invalid && "border-red-500", className)}
        {...props}
      >
        {children}
      </select>
    );
  },
);

/**
 * Hidden field that people never see or reach by keyboard. Pass the
 * react-hook-form registration so a filled value is actually submitted.
 */
export const HoneypotField = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  function HoneypotField(props, ref) {
    return (
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="websiteUrl">Leave this field empty</label>
        <input
          ref={ref}
          id="websiteUrl"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          {...props}
        />
      </div>
    );
  },
);

/** Record the moment the user began filling, for fill-time spam checks. */
export function useFormStartedAt() {
  const [startedAt] = useState(() => Date.now());
  return startedAt;
}
