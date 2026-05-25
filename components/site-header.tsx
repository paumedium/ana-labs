import Link from "next/link";

type Props = {
  brand?: { code: string; name: string };
  activeTab?: "creatividades" | "ideas" | "analisis" | "publicaciones" | "marca" | "requerimientos";
};

export function SiteHeader({ brand, activeTab }: Props) {
  const tabs = [
    { id: "creatividades", label: "Creatividades", href: brand ? `/marcas/${brand.code}/cover` : "#" },
    { id: "ideas", label: "Ideas", href: brand ? `/marcas/${brand.code}/ideas` : "#" },
    { id: "analisis", label: "Análisis", href: brand ? `/marcas/${brand.code}/analisis` : "#" },
    { id: "publicaciones", label: "Publicaciones", href: brand ? `/marcas/${brand.code}/publicaciones` : "#" },
    { id: "marca", label: "Marca", href: brand ? `/marcas/${brand.code}/marca` : "#" },
    { id: "requerimientos", label: "Requerimientos", href: brand ? `/marcas/${brand.code}/requerimientos` : "#" },
  ];

  return (
    <header className="border-b border-line bg-paper">
      <div className="px-6 py-4 flex items-center gap-6 max-w-[1600px] mx-auto">
        {/* Logo */}
        <Link href="/marcas" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 rounded-full bg-ink text-paper flex items-center justify-center text-sm font-bold">
            AL
          </div>
          {brand ? (
            <div className="flex items-center gap-2">
              <span className="mono text-xs text-muted">/</span>
              <span className="mono text-xs tracking-[0.1em] uppercase">{brand.name}</span>
              <span className="mono text-xs text-muted">▾</span>
            </div>
          ) : (
            <span className="mono text-xs tracking-[0.1em] uppercase">ANA LABS</span>
          )}
        </Link>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Tabs */}
        {brand && (
          <nav className="flex items-center gap-6">
            {tabs.map((t) => (
              <Link
                key={t.id}
                href={t.href}
                className={`mono text-[11px] tracking-[0.12em] uppercase ${
                  activeTab === t.id ? "text-ink border-b-2 border-accent pb-1" : "text-muted hover:text-ink"
                }`}
              >
                {t.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
