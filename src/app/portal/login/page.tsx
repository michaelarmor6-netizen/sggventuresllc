import { redirect } from "next/navigation";

/** Sign-in lives at /login. */
export default function PortalLoginRedirect() {
  redirect("/login");
}
