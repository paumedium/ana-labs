import { signOut } from "@/app/login/actions";
import { getCurrentUser } from "@/lib/auth";

export async function SiteFooter() {
  const user = await getCurrentUser();

  return (
    <footer className="border-t border-line bg-paper px-6 py-3 mono text-[11px] text-muted flex flex-wrap items-center gap-x-4 gap-y-1">
      <form action={signOut}>
        <button className="flex items-center gap-1.5 hover:text-ink" type="submit">
          <span>←</span>
          <span className="tracking-[0.1em]">SALIR</span>
        </button>
      </form>
      <span className="opacity-50">/</span>
      <span className="tracking-[0.1em]">ANA LABS v0</span>
      <span className="opacity-50">/</span>
      <span className="tracking-[0.1em]">BUILD: {process.env.NEXT_PUBLIC_BUILD_DATE ?? "dev"}</span>
      <span className="opacity-50">/</span>
      <span className="tracking-[0.1em]">USER: {user?.email ?? "sin sesión"}</span>
      <span className="opacity-50">/</span>
      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] inline-block" />
        <span className="tracking-[0.1em]">ONLINE</span>
      </span>
    </footer>
  );
}
