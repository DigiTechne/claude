import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

/**
 * Returns the current session's user, or redirects to /login.
 * Use at the top of any server component or server action in the /app route group.
 */
export async function requireUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    redirect("/login");
  }
  return session.user;
}

/**
 * Returns the current session's user, or null if not logged in.
 * Use when auth is optional (e.g., showing a "welcome back" on a public page).
 */
export async function getOptionalUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user ?? null;
}
