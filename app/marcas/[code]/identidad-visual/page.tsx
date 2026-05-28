import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { getBrand } from "@/lib/data";
import { getVisualIdentity, type BrandColor, type BrandVisualSection } from "@/lib/brand-system";

type IdentidadSearchParams = Promise<{ sec?: string | string[] }>;

const statusClass: Record<BrandVisualSection["status"], string> = {
  presente: "status-pill-ok",
  pendiente: "status-pill-rev",
};

export default async function IdentidadVisualPage({
  params,
  searchParams,
}: {
  params: Promise<{ code: string }>;
  searchParams: IdentidadSearchParams;
}) {
  const [{ code }, query] = await Promise.all([params, searchParams]);
  const brand = await getBrand(code);
  if (!brand) notFound();

  const identity = getVisualIdentity(code);
  const selectedParam = firstParam(query.sec);
  const selectedIndex = Math.max(
    0,
    identity.sections.findIndex((section) => section.id === selectedParam),
  );
  const selected = identity.sections[selectedIndex] ?? identity.sections[0];
  const previous = identity.sections[selectedIndex - 1] ?? identity.sections[identity.sections.length - 1];
  const next = identity.sections[selectedIndex + 1] ?? identity.sections[0];
  const groups = Array.from(new Set(identity.sections.map((section) => section.group)));
  const presentCount = identity.sections.filter((section) => section.status === "presente").length;

  return (
    <>
      <SiteHeader brand={brand} activeTab="marca" />
      <main className="mx-auto grid w-full max-w-[1600px] flex-1 gap-10 px-6 py-8 xl:grid-cols-[1fr_680px]">
        <section>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow mb-2">Dimensiones</div>
              <h1 className="text-4xl font-semibold">
                IDENTIDAD VISUAL
                <span className="mono ml-3 inline-block border border-line bg-paper-soft px-3 py-2 align-middle text-[10px] uppercase text-muted">
                  Skill
                </span>
              </h1>
            </div>
            <div>
              <div className="eyebrow">Dimensiones</div>
              <div className="mono text-5xl">
                {presentCount}
                <span className="text-muted">/{identity.sections.length}</span>
              </div>
            </div>
          </div>

          <div className="space-y-7">
            {groups.map((group, index) => (
              <div key={group}>
                <div className="mono mb-2 text-[10px] uppercase text-muted">{index + 1} · {group}</div>
                <div className="grid gap-1 md:grid-cols-2">
                  {identity.sections
                    .filter((section) => section.group === group)
                    .map((section) => (
                      <VisualSectionLink
                        key={section.id}
                        brandCode={brand.code}
                        section={section}
                        active={section.id === selected?.id}
                      />
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {selected && (
          <aside className="h-fit max-h-[calc(100vh-8rem)] overflow-y-auto border border-line bg-paper-soft p-6 xl:sticky xl:top-6">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <div className="mono mb-2 text-[10px] uppercase">SEC-{selected.code}</div>
                <h2 className="text-xl font-semibold">{selected.title}</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className={`status-pill ${statusClass[selected.status]}`}>{selected.status}</span>
                <Link href={`/marcas/${brand.code}/identidad-visual?sec=${previous.id}`} className="mono border border-line bg-paper px-2 py-2 text-xs hover:border-ink">
                  ←
                </Link>
                <Link href={`/marcas/${brand.code}/identidad-visual?sec=${next.id}`} className="mono border border-line bg-paper px-2 py-2 text-xs hover:border-ink">
                  →
                </Link>
              </div>
            </div>

            <p className="mb-6 text-sm text-ink-soft">{selected.body}</p>

            {selected.id === "colores" ? (
              <ColorSystem colors={identity.colors} hexList={identity.hexList} />
            ) : (
              <SectionItems section={selected} />
            )}
          </aside>
        )}
      </main>
    </>
  );
}

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function VisualSectionLink({
  brandCode,
  section,
  active,
}: {
  brandCode: string;
  section: BrandVisualSection;
  active?: boolean;
}) {
  return (
    <Link
      href={`/marcas/${brandCode}/identidad-visual?sec=${section.id}`}
      className={`block border px-3 py-2 transition ${active ? "border-ink bg-paper-soft" : "border-line hover:border-ink hover:bg-paper-soft"}`}
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="mono text-[10px] uppercase text-muted">{section.code}</span>
        <span className={`status-pill ${statusClass[section.status]}`}>{section.status}</span>
      </div>
      <div className="text-sm font-medium">{section.label}</div>
    </Link>
  );
}

function ColorSystem({ colors, hexList }: { colors: BrandColor[]; hexList: string[] }) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="eyebrow">Paleta · {colors.length} colores</div>
        <div className="mono text-[10px] uppercase text-muted">HEX_LIST · {hexList.length}</div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {colors.map((color) => (
          <article key={`${color.hex}-${color.role}`} className="overflow-hidden border border-line bg-paper">
            <div className="h-24 border-b border-line" style={{ backgroundColor: color.hex }} />
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="mono text-[11px] uppercase">{color.hex}</span>
                <span className="mono text-[9px] uppercase text-muted">{color.role}</span>
              </div>
              <h3 className="text-sm font-semibold">{color.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{color.description}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-5 border border-line bg-paper p-4">
        <div className="eyebrow mb-2">HEX_LIST</div>
        <div className="flex flex-wrap gap-2">
          {hexList.map((hex) => (
            <span key={hex} className="mono border border-line bg-paper-soft px-2 py-1 text-[10px] uppercase">
              {hex}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionItems({ section }: { section: BrandVisualSection }) {
  return (
    <div>
      <div className="eyebrow mb-3">Reglas y señales</div>
      <div className="space-y-3">
        {section.items.map((item, index) => (
          <div key={`${item}-${index}`} className="grid grid-cols-[38px_1fr] gap-3 border border-line bg-paper p-4">
            <div className="mono text-[10px] text-muted">{String(index + 1).padStart(2, "0")}</div>
            <p className="text-sm text-ink-soft">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
