import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper px-6 py-3 mono text-[11px] text-muted flex flex-wrap items-center gap-x-4 gap-y-1">
      <Link href="/login" className="flex items-center gap-1.5 hover:text-ink">
        <span>←</span>
        <span className="tracking-[0.1em]">SALIR</span>
      </Link>
      <span className="opacity-50">/</span>
      <span className="tracking-[0.1em]">ANA LABS v0</span>
      <span className="opacity-50">/</span>
      <span className="tracking-[0.1em]">BUILD: {process.env.NEXT_PUBLIC_BUILD_DATE ?? "dev"}</span>
      <span className="opacity-50">/</span>
      <span className="tracking-[0.1em]">USER: anapaula</span>
      <span className="opacity-50">/</span>
      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] inline-block" />
        <span className="tracking-[0.1em]">ONLINE</span>
      </span>
    </footer>
  );
}
