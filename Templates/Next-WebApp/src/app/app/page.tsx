import { requireUser } from "@/lib/auth-helpers";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/app/_actions/logout";

export default async function DashboardPage() {
  const user = await requireUser();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, {user.name}!</h1>
        <p className="text-muted-foreground mt-1 text-sm">{user.email}</p>
      </div>

      <form action={logoutAction}>
        <Button type="submit" variant="outline">
          Log out
        </Button>
      </form>
    </div>
  );
}
