import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { getBrand } from "@/lib/data";
import { getRestrictions, type BrandRestriction } from "@/lib/brand-system";

export default async function RestriccionesPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const brand = await getBrand(code);
  if (!brand) notFound();

  const restrictions = getRestrictions(code);
  const plainText = restrictions.map((restriction) => restriction.text).join(" | ");

  return (
    <>
      <SiteHeader brand={brand} activeTab="marca" />
      <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 py-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow mb-2">Reglas</div>
            <h1 className="text-4xl font-semibold">
              RESTRICCIONES
              <span className="mono ml-3 align-middle text-[10px] uppercase text-muted">Editable · sin skill</span>
            </h1>
          </div>
          <div>
            <div className="eyebrow">Reglas</div>
            <div className="mono text-5xl">{restrictions.length}</div>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="mono bg-paper-soft px-3 py-2 text-[10px] uppercase text-muted">Lista · {restrictions.length}</span>
            <span className="mono px-3 py-2 text-[10px] uppercase">Texto plano</span>
          </div>
          <button className="mono cursor-not-allowed border border-line bg-paper-soft px-4 py-2 text-[10px] uppercase text-muted" disabled>
            Guardar
          </button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
          <section className="max-h-[680px] overflow-y-auto pr-1">
            {restrictions.length > 0 ? (
              <div className="space-y-2">
                {restrictions.map((restriction) => (
                  <RestrictionRow key={restriction.id} restriction={restriction} />
                ))}
              </div>
            ) : (
              <div className="border border-line bg-paper-soft p-6 text-sm text-muted">
                Todavía no hay restricciones cargadas para esta marca.
              </div>
            )}
          </section>

          <aside className="h-fit border border-line bg-paper-soft p-5 xl:sticky xl:top-6">
            <div className="eyebrow mb-3">Texto plano para skills</div>
            <div className="min-h-56 border border-line bg-paper p-4 font-mono text-xs leading-5 text-ink-soft">
              {plainText || "(sin restricciones)"}
            </div>
            <div className="mt-4 border-t border-line pt-4 text-xs text-muted">
              En producción estas reglas viajan al pre-check de moderación y al bloque de constraints de generación.
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

function RestrictionRow({ restriction }: { restriction: BrandRestriction }) {
  return (
    <article className="grid grid-cols-[44px_1fr_24px] items-start gap-3 border border-line bg-paper-soft px-4 py-4">
      <div className="mono text-[11px] text-muted">{String(restriction.id).padStart(2, "0")}</div>
      <p className="text-sm leading-6 text-ink">{restriction.text}</p>
      <span className="mono text-right text-xs text-muted">×</span>
    </article>
  );
}
