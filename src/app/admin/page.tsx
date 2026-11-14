import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/server/auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getSessionUser();
  redirect(user ? "/portal" : "/portal/login");
}
