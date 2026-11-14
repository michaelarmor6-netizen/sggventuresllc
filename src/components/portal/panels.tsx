"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  addEngagementUpdate,
  createClientAccount,
  createEngagement,
  portalChangePassword,
  setEngagementStatus,
} from "@/app/actions/portal";
import { updateInquiry } from "@/app/actions/admin";
import { Button } from "@/components/ui/button";
import { FormInput, FormTextarea } from "@/components/forms/form-primitives";
import { SERVICE_CATEGORIES } from "@/content/services";

const INQUIRY_STATUSES = ["new", "in-review", "responded", "closed"] as const;
const FILE_STATUSES = ["intake", "active", "waiting-on-partner", "closed"] as const;

function fmt(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-display text-[13px] font-semibold text-midnight">
        {label}
      </span>
      {children}
    </label>
  );
}

export type InquiryItem = {
  id: string;
  kind: "inquiry" | "partnership";
  title: string;
  email: string;
  detail: string;
  status: string;
  createdAt: string;
};

export type ClientItem = {
  id: string;
  name: string;
  email: string;
  organization: string | null;
};

export type UpdateItem = {
  id: string;
  body: string;
  visibleToClient: boolean;
  createdAt: string;
};

export type FileItem = {
  id: string;
  title: string;
  division: string;
  status: string;
  delivery: string;
  partnerName: string | null;
  summary: string;
  clientName: string;
  clientId: string;
  updates: UpdateItem[];
};

function serviceAreaLabel(slug: string) {
  return SERVICE_CATEGORIES.find((category) => category.slug === slug)?.name ?? slug;
}

const DELIVERY_LABEL: Record<string, string> = {
  direct: "Delivered by SGG Ventures",
  partner: "Named third-party specialist",
  coordination: "SGG Ventures coordinates; a third party performs the specialist work",
};

export function AdminPanel({
  inquiries,
  clients,
  files,
  audit,
}: {
  inquiries: InquiryItem[];
  clients: ClientItem[];
  files: FileItem[];
  audit: { id: string; action: string; detail: string | null; createdAt: string }[];
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"files" | "people" | "inquiries" | "audit">("files");
  const [error, setError] = useState<string | null>(null);
  const [issued, setIssued] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const refresh = () => router.refresh();

  return (
    <div>
      <p className="font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-azure-deep">
        Staff desk
      </p>
      <h1 className="mt-2 font-display text-[2rem] font-bold tracking-tight text-midnight">
        Files, clients, and inquiries
      </h1>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-slateink">
        Open a client account, keep each engagement on one file, and record in
        the file who performs each part of the work.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {(
          [
            ["files", `Files (${files.length})`],
            ["people", `Clients (${clients.length})`],
            ["inquiries", `Inquiries (${inquiries.length})`],
            ["audit", "Audit"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-pressed={tab === key}
            onClick={() => setTab(key)}
            className={`rounded-full px-4 py-2 font-display text-[13px] font-semibold ${
              tab === key
                ? "bg-midnight text-white"
                : "border border-linehair bg-white text-midnight"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-4 text-[13px] font-semibold text-red-600">
          {error}
        </p>
      )}
      {issued && (
        <p className="mt-4 rounded-[14px] border border-linehair bg-white px-4 py-3 text-[13.5px] text-midnight">
          Temporary password, shown once: <span className="font-semibold">{issued}</span>
        </p>
      )}

      {tab === "people" && (
        <form
          className="mt-6 grid max-w-xl gap-4 rounded-[14px] border border-linehair bg-white p-6"
          onSubmit={async (event) => {
            event.preventDefault();
            const formEl = event.currentTarget;
            const form = new FormData(formEl);
            setBusy(true);
            setError(null);
            setIssued(null);
            const result = await createClientAccount({
              name: String(form.get("name") || ""),
              email: String(form.get("email") || ""),
              organization: String(form.get("organization") || ""),
            });
            setBusy(false);
            if (!result.ok) setError(result.error);
            else {
              setIssued(result.temporaryPassword);
              formEl.reset();
              refresh();
            }
          }}
        >
          <h2 className="font-display text-[18px] font-bold text-midnight">New client account</h2>
          <Field label="Name">
            <FormInput name="name" required autoComplete="name" />
          </Field>
          <Field label="Email">
            <FormInput name="email" type="email" required autoComplete="off" />
          </Field>
          <Field label="Organization">
            <FormInput name="organization" autoComplete="organization" />
          </Field>
          <Button type="submit" disabled={busy}>
            {busy ? "Creating…" : "Create account"}
          </Button>
          <ul className="space-y-2 border-t border-linehair pt-4 text-[14px] text-slateink">
            {clients.length === 0 && <li>No client accounts yet.</li>}
            {clients.map((client) => (
              <li key={client.id}>
                <span className="font-semibold text-midnight">{client.name}</span>
                {" · "}
                {client.email}
                {client.organization ? ` · ${client.organization}` : ""}
              </li>
            ))}
          </ul>
        </form>
      )}

      {tab === "files" && (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <form
            className="grid gap-4 rounded-[14px] border border-linehair bg-white p-6"
            onSubmit={async (event) => {
              event.preventDefault();
              const formEl = event.currentTarget;
              const form = new FormData(formEl);
              setBusy(true);
              setError(null);
              const result = await createEngagement({
                clientId: String(form.get("clientId") || ""),
                title: String(form.get("title") || ""),
                division: String(form.get("division") || ""),
                delivery: String(form.get("delivery") || "coordination"),
                status: String(form.get("status") || "intake"),
                partnerName: String(form.get("partnerName") || ""),
                summary: String(form.get("summary") || ""),
                internalNotes: String(form.get("internalNotes") || ""),
              });
              setBusy(false);
              if (!result.ok) setError(result.error);
              else {
                formEl.reset();
                refresh();
              }
            }}
          >
            <h2 className="font-display text-[18px] font-bold text-midnight">Open a file</h2>
            <Field label="Client">
              <select name="clientId" required className="h-11 w-full rounded-[10px] border border-linehair bg-white px-3 text-[14px]">
                <option value="">Select</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Title">
              <FormInput name="title" required placeholder="Q4 settlement exceptions" />
            </Field>
            <Field label="Service area">
              <select name="division" required className="h-11 w-full rounded-[10px] border border-linehair bg-white px-3 text-[14px]">
                {SERVICE_CATEGORIES.map((category) => (
                  <option key={category.slug} value={category.slug}>
                    {category.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Who performs the specialist work">
              <select name="delivery" required className="h-11 w-full rounded-[10px] border border-linehair bg-white px-3 text-[14px]">
                <option value="direct">SGG Ventures delivers this piece</option>
                <option value="coordination">SGG Ventures coordinates</option>
                <option value="partner">A named third-party specialist</option>
              </select>
            </Field>
            <Field label="Status">
              <select name="status" className="h-11 w-full rounded-[10px] border border-linehair bg-white px-3 text-[14px]">
                {FILE_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Third-party firm, if any">
              <FormInput name="partnerName" />
            </Field>
            <Field label="What the client can read">
              <FormTextarea name="summary" required rows={4} />
            </Field>
            <Field label="Internal note">
              <FormTextarea name="internalNotes" rows={3} />
            </Field>
            <Button type="submit" disabled={busy || clients.length === 0}>
              {clients.length === 0 ? "Create a client first" : "Open file"}
            </Button>
          </form>

          <div className="space-y-4">
            {files.length === 0 && (
              <p className="rounded-[14px] border border-linehair bg-white p-6 text-[14px] text-slateink">
                No files yet.
              </p>
            )}
            {files.map((file) => (
              <article key={file.id} className="rounded-[14px] border border-linehair bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-[17px] font-bold text-midnight">{file.title}</h3>
                    <p className="mt-1 text-[13px] text-slateink">
                      {file.clientName} · {serviceAreaLabel(file.division)} · {DELIVERY_LABEL[file.delivery] || file.delivery}
                      {file.partnerName ? ` · ${file.partnerName}` : ""}
                    </p>
                  </div>
                  <select
                    aria-label={`Status for ${file.title}`}
                    defaultValue={file.status}
                    className="h-9 rounded-full border border-linehair bg-white px-3 text-[13px]"
                    onChange={async (event) => {
                      const result = await setEngagementStatus({
                        engagementId: file.id,
                        status: event.target.value as (typeof FILE_STATUSES)[number],
                      });
                      if (!result.ok) setError(result.error);
                      else refresh();
                    }}
                  >
                    {FILE_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-slateink">{file.summary}</p>
                <ul className="mt-3 space-y-2 text-[13px] text-slateink">
                  {file.updates.map((update) => (
                    <li key={update.id}>
                      {fmt(update.createdAt)} · {update.visibleToClient ? "Client" : "Internal"} · {update.body}
                    </li>
                  ))}
                </ul>
                <form
                  className="mt-4 flex flex-col gap-2"
                  onSubmit={async (event) => {
                    event.preventDefault();
                    const formEl = event.currentTarget;
                    const form = new FormData(formEl);
                    const result = await addEngagementUpdate({
                      engagementId: file.id,
                      body: String(form.get("body") || ""),
                      visibleToClient: form.get("visible") === "on",
                    });
                    if (!result.ok) setError(result.error);
                    else {
                      formEl.reset();
                      refresh();
                    }
                  }}
                >
                  <FormInput name="body" placeholder="Status the client should see" required />
                  <label className="flex items-center gap-2 text-[13px] text-slateink">
                    <input type="checkbox" name="visible" defaultChecked />
                    Visible to the client
                  </label>
                  <Button type="submit" size="sm">
                    Add update
                  </Button>
                </form>
              </article>
            ))}
          </div>
        </div>
      )}

      {tab === "inquiries" && (
        <ul className="mt-6 space-y-3">
          {inquiries.length === 0 && (
            <li className="rounded-[14px] border border-linehair bg-white p-6 text-[14px] text-slateink">
              No inquiries yet.
            </li>
          )}
          {inquiries.map((row) => (
            <li key={row.id} className="rounded-[14px] border border-linehair bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-[15px] font-semibold text-midnight">
                    {row.title} · {row.email}
                  </p>
                  <p className="mt-1 text-[12.5px] text-slateink">
                    {row.kind === "partnership" ? "Partnership" : "Inquiry"} · {fmt(row.createdAt)}
                  </p>
                  <p className="mt-2 whitespace-pre-line text-[14px] leading-relaxed text-slateink">{row.detail}</p>
                </div>
                <select
                  aria-label={`Status for ${row.title}`}
                  defaultValue={row.status}
                  className="h-9 rounded-full border border-linehair bg-white px-3 text-[13px]"
                  onChange={async (event) => {
                    const result = await updateInquiry({
                      kind: row.kind,
                      id: row.id,
                      status: event.target.value,
                    });
                    if (!result.ok) setError(result.error ?? "Update failed.");
                    else refresh();
                  }}
                >
                  {INQUIRY_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </li>
          ))}
        </ul>
      )}

      {tab === "audit" && (
        <ul className="mt-6 divide-y divide-linehair rounded-[14px] border border-linehair bg-white">
          {audit.length === 0 && <li className="p-5 text-[14px] text-slateink">No actions yet.</li>}
          {audit.map((row) => (
            <li key={row.id} className="px-5 py-3 text-[13.5px] text-slateink">
              <span className="font-semibold text-midnight">{row.action}</span>
              {row.detail ? ` · ${row.detail}` : ""} · {fmt(row.createdAt)}
            </li>
          ))}
        </ul>
      )}

      <PasswordCard />
    </div>
  );
}

export function ClientPanel({ files }: { files: FileItem[] }) {
  return (
    <div>
      <p className="font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-azure-deep">
        Your files
      </p>
      <h1 className="mt-2 font-display text-[2rem] font-bold tracking-tight text-midnight">
        Where each matter stands
      </h1>
      <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-slateink">
        You see the scope we wrote down, who performs each part of the work, and the updates we marked for you.
      </p>
      <div className="mt-8 space-y-4">
        {files.length === 0 && (
          <p className="rounded-[14px] border border-linehair bg-white p-6 text-[14.5px] text-slateink">
            Nothing is open on your account yet. When a file is started, it appears here.
          </p>
        )}
        {files.map((file) => (
          <article key={file.id} className="rounded-[14px] border border-linehair bg-white p-6">
            <h2 className="font-display text-[18px] font-bold text-midnight">{file.title}</h2>
            <p className="mt-1 text-[13px] text-slateink">
              {file.status} · {DELIVERY_LABEL[file.delivery] || file.delivery}
              {file.partnerName ? ` · ${file.partnerName}` : ""}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-midnight">{file.summary}</p>
            <ul className="mt-4 space-y-2 border-t border-linehair pt-4 text-[14px] text-slateink">
              {file.updates.length === 0 && <li>No updates yet.</li>}
              {file.updates.map((update) => (
                <li key={update.id}>
                  <span className="font-semibold text-midnight">{fmt(update.createdAt)}. </span>
                  {update.body}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <PasswordCard />
    </div>
  );
}

function PasswordCard() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  return (
    <form
      className="mt-8 grid max-w-md gap-3 rounded-[14px] border border-linehair bg-white p-6"
      onSubmit={async (event) => {
        event.preventDefault();
        const formEl = event.currentTarget;
        const form = new FormData(formEl);
        setError(null);
        setMessage(null);
        const result = await portalChangePassword({
          currentPassword: String(form.get("current") || ""),
          nextPassword: String(form.get("next") || ""),
        });
        if (!result.ok) setError(result.error ?? "Could not change the password.");
        else {
          setMessage("Password updated. Other sessions were signed out.");
          formEl.reset();
        }
      }}
    >
      <h2 className="font-display text-[16px] font-bold text-midnight">Change password</h2>
      <Field label="Current password">
        <FormInput name="current" type="password" autoComplete="current-password" required />
      </Field>
      <Field label="New password">
        <FormInput name="next" type="password" autoComplete="new-password" required minLength={10} />
      </Field>
      {error && <p className="text-[13px] text-red-600">{error}</p>}
      {message && <p className="text-[13px] text-midnight">{message}</p>}
      <Button type="submit" size="sm">
        Update password
      </Button>
    </form>
  );
}
