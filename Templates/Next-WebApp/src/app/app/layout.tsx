import Link from "next/link";
import { requireUser } from "@/lib/auth-helpers";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  await requireUser();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b px-6 py-3">
        <span className="font-semibold">template-next-stack</span>
        <nav className="flex gap-4 text-sm">
          <Link href="/app" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/app/settings" className="hover:underline">
            Settings
          </Link>
        </nav>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
