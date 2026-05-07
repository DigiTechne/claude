"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { deleteAccountAction } from "@/app/app/_actions/settings";

export function DeleteAccountButton() {
  const [confirming, setConfirming] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (!confirming) {
    return (
      <Button variant="destructive" onClick={() => setConfirming(true)}>
        Delete account
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-destructive text-sm font-medium">
        This is permanent. Are you sure you want to delete your account?
      </p>
      <div className="flex gap-2">
        <Button
          variant="destructive"
          disabled={isPending}
          onClick={() => startTransition(() => deleteAccountAction())}
        >
          {isPending ? "Deleting..." : "Yes, delete it"}
        </Button>
        <Button variant="outline" disabled={isPending} onClick={() => setConfirming(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
