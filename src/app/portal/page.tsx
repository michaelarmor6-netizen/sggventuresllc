import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/server/db";
import { getSessionUser } from "@/lib/server/auth";
import { projectTypeLabel } from "@/lib/validation/schemas";
import { PortalShell } from "@/components/portal/shell";
import { AdminPanel, ClientPanel, type FileItem, type InquiryItem } from "@/components/portal/panels";

export const metadata: Metadata = {
  title: "Portal",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PortalPage() {
  const user = await getSessionUser();
  if (!user) redirect("/portal/login");

  if (user.role === "client") {
    const engagements = await prisma.engagement.findMany({
      where: { clientId: user.id },
      orderBy: { updatedAt: "desc" },
      include: {
        updates: {
          where: { visibleToClient: true },
          orderBy: { createdAt: "desc" },
          take: 20,
        },
      },
    });
    const files: FileItem[] = engagements.map((file) => ({
      id: file.id,
      title: file.title,
      division: file.division,
      status: file.status,
      delivery: file.delivery,
      partnerName: file.partnerName,
      summary: file.summary,
      clientName: user.name,
      clientId: user.id,
      updates: file.updates.map((update) => ({
        id: update.id,
        body: update.body,
        visibleToClient: true,
        createdAt: update.createdAt.toISOString(),
      })),
    }));
    return (
      <PortalShell name={user.name} role="client">
        <ClientPanel files={files} />
      </PortalShell>
    );
  }

  const [inquiries, partnerships, clients, engagements, audit] = await Promise.all([
    prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.partnershipInquiry.findMany({ orderBy: { createdAt: "desc" }, take: 50 }),
    prisma.user.findMany({
      where: { role: "client" },
      orderBy: { name: "asc" },
      select: { id: true, name: true, email: true, organization: true },
    }),
    prisma.engagement.findMany({
      orderBy: { updatedAt: "desc" },
      take: 40,
      include: {
        client: { select: { name: true } },
        updates: { orderBy: { createdAt: "desc" }, take: 6 },
      },
    }),
    prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 40 }),
  ]);

  const inquiryItems: InquiryItem[] = [
    ...inquiries.map((row) => ({
      id: row.id,
      kind: "inquiry" as const,
      title: row.fullName,
      email: row.email,
      detail: [
        row.company ? `Business: ${row.company}` : null,
        `Project type: ${projectTypeLabel(row.division)}`,
        row.budget ? `Budget: ${row.budget}` : null,
        row.timeline ? `Timeline: ${row.timeline}` : null,
        "",
        row.message,
      ]
        .filter((line) => line !== null)
        .join("\n"),
      status: row.status,
      createdAt: row.createdAt.toISOString(),
    })),
    ...partnerships.map((row) => ({
      id: row.id,
      kind: "partnership" as const,
      title: row.organization,
      email: row.email,
      detail: row.capabilities,
      status: row.status,
      createdAt: row.createdAt.toISOString(),
    })),
  ].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));

  const files: FileItem[] = engagements.map((file) => ({
    id: file.id,
    title: file.title,
    division: file.division,
    status: file.status,
    delivery: file.delivery,
    partnerName: file.partnerName,
    summary: file.summary,
    clientName: file.client.name,
    clientId: file.clientId,
    updates: file.updates.map((update) => ({
      id: update.id,
      body: update.body,
      visibleToClient: update.visibleToClient,
      createdAt: update.createdAt.toISOString(),
    })),
  }));

  return (
    <PortalShell name={user.name} role="admin">
      <AdminPanel
        inquiries={inquiryItems}
        clients={clients}
        files={files}
        audit={audit.map((row) => ({
          id: row.id,
          action: row.action,
          detail: row.detail,
          createdAt: row.createdAt.toISOString(),
        }))}
      />
    </PortalShell>
  );
}
