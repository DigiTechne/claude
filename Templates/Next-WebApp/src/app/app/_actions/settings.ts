"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/lib/auth";

export type ActionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
};

const updateNameSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(100, "Name is too long."),
});

export async function updateNameAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const parsed = updateNameSchema.safeParse({ name: formData.get("name") });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "");
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please fix the errors below.", fieldErrors };
  }

  try {
    await auth.api.updateUser({
      headers: await headers(),
      body: { name: parsed.data.name },
    });
  } catch (err) {
    return {
      status: "error",
      message: err instanceof Error ? err.message : "Failed to update your name.",
    };
  }

  revalidatePath("/app/settings");
  return { status: "success", message: "Display name updated." };
}

export async function deleteAccountAction(): Promise<void> {
  try {
    await auth.api.deleteUser({
      headers: await headers(),
      body: {},
    });
  } catch (err) {
    // Surface as URL flash so the page can render it after a redirect.
    const message = err instanceof Error ? err.message : "Failed to delete account.";
    redirect(`/app/settings?error=${encodeURIComponent(message)}`);
  }
  redirect("/login");
}
