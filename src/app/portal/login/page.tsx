import { redirect } from "next/navigation";

/** The sign-in screen moved to /login. */
export default function PortalLoginRedirect() {
  redirect("/login");
}
