"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateNameAction, type ActionState } from "@/app/app/_actions/settings";

const initialState: ActionState = { status: "idle", message: "" };

export function UpdateNameForm({ initialName }: { initialName: string }) {
  const [state, formAction, isPending] = useActionState(updateNameAction, initialState);

  useEffect(() => {
    if (state.status === "success" && state.message) toast.success(state.message);
    if (state.status === "error" && state.message && !state.fieldErrors) {
      toast.error(state.message);
    }
  }, [state]);

  const nameError = state.fieldErrors?.name;

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Display name</Label>
        <Input
          id="name"
          name="name"
          defaultValue={initialName}
          required
          disabled={isPending}
          aria-invalid={nameError ? true : undefined}
          className="max-w-sm"
        />
        {nameError ? <p className="text-destructive text-sm">{nameError}</p> : null}
      </div>
      <div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
}
