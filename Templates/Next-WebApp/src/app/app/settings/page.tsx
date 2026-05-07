import { requireUser } from "@/lib/auth-helpers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdateNameForm } from "@/app/app/settings/_components/update-name-form";
import { DeleteAccountButton } from "@/app/app/settings/_components/delete-account-button";

interface SettingsPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const user = await requireUser();
  const { error } = await searchParams;

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm">Manage your account.</p>
      </div>

      {error ? (
        <div className="border-destructive/30 bg-destructive/5 text-destructive rounded-lg border p-3 text-sm">
          {error}
        </div>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update how your name is displayed in the app.</CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateNameForm initialName={user.name} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email</CardTitle>
          <CardDescription>Your sign-in email address.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="text-sm">
            <span className="text-muted-foreground">Current email: </span>
            <span className="font-medium">{user.email}</span>
          </div>
          <p className="text-muted-foreground text-xs">
            Changing your email triggers a re-verification flow. To change your email, contact
            support or wire up <code className="bg-muted rounded px-1">auth.api.changeEmail</code>{" "}
            in a future iteration.
          </p>
        </CardContent>
      </Card>

      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-destructive">Danger zone</CardTitle>
          <CardDescription>
            Permanently delete your account and all associated data. This cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DeleteAccountButton />
        </CardContent>
      </Card>
    </div>
  );
}
