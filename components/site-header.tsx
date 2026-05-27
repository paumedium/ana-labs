import Link from "next/link";
import type { Brand } from "@/lib/mock-data";

type Props = {
  brand?: Brand;
  activeTab?: "creatividades" | "ideas" | "analisis" | "publicaciones" | "marca" | "requerimientos";
};

const tabGroups = [
  { id: "creatividades", label: "Creatividades", path: "cover" },
  { id: "ideas", label: "Ideas", path: "ideas" },
  { id: "analisis", label: "Análisis", path: "analisis" },
  { id: "publicaciones", label: "Publicaciones", path: "publicaciones" },
  { id: "marca", label: "Marca", path: "marca" },
  { id: "requerimientos", label: "Requerimientos", path: "requerimientos" },
] as const;

export function SiteHeader({ brand, activeTab }: Props) {
  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto flex min-h-20 w-full max-w-[1600px] items-center gap-5 px-6 py-4">
        <Link href="/marcas" className="flex shrink-0 items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-[13px] font-bold text-paper">
            AL
          </div>
          {brand ? (
            <div className="min-w-0">
              <div className="mono text-[10px] uppercase text-muted">{brand.parent ?? "Ana Labs"}</div>
              <div className="flex items-center gap-2">
                <span className="mono text-xs text-muted">/</span>
                <span className="mono truncate text-xs uppercase">{brand.name}</span>
                <span className="mono text-xs text-muted">▾</span>
              </div>
            </div>
          ) : (
            <span className="mono text-xs uppercase">ANA LABS</span>
          )}
        </Link>

        {brand && (
          <div className="hidden items-center gap-1 md:flex">
            {brand.socials.web && <SocialDot label="WEB" />}
            {brand.socials.instagram && <SocialDot label="IG" />}
            {brand.socials.facebook && <SocialDot label="FB" />}
            {brand.socials.tiktok && <SocialDot label="TK" />}
            {brand.socials.linkedin && <SocialDot label="IN" />}
            {brand.socials.whatsapp && <SocialDot label="WA" />}
          </div>
        )}

        <div className="flex-1" />

        {brand && (
          <nav className="hidden items-center border border-line lg:flex">
            {tabGroups.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <Link
                  key={tab.id}
                  href={`/marcas/${brand.code}/${tab.path}`}
                  className={`mono min-w-32 px-5 py-3 text-center text-[10px] uppercase transition ${
                    active ? "bg-paper-soft text-ink shadow-[inset_0_-2px_0_var(--ink)]" : "text-muted hover:bg-paper-soft hover:text-ink"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}

function SocialDot({ label }: { label: string }) {
  return (
    <span className="mono flex h-7 min-w-7 items-center justify-center rounded-full border border-line bg-paper-soft px-1.5 text-[9px] text-muted">
      {label}
    </span>
  );
}
