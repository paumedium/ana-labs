import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { getBrand } from "@/lib/data";
import { getTypography } from "@/lib/brand-system";

export default async function TipografiaPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const brand = await getBrand(code);
  if (!brand) notFound();

  const typography = getTypography(code);
  const chars = typography.content.length;
  const hasImageRecipe = /RECETA gpt-image-2/i.test(typography.content);
  const hasMotionRecipe = /RECETA motion/i.test(typography.content);

  return (
    <>
      <SiteHeader brand={brand} activeTab="marca" />
      <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 py-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow mb-2">Chars</div>
            <h1 className="text-4xl font-semibold">
              TIPOGRAFÍA
              <span className="mono ml-3 align-middle text-[10px] uppercase text-muted">Editable · sin skill</span>
            </h1>
          </div>
          <div>
            <div className="eyebrow">Chars</div>
            <div className="mono text-5xl">{chars}</div>
          </div>
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="mono text-[10px] uppercase text-muted">{chars} chars</span>
            <span className={`status-pill ${hasImageRecipe ? "status-pill-ok" : "status-pill-rev"}`}>
              receta gpt-image-2
            </span>
            <span className={`status-pill ${hasMotionRecipe ? "status-pill-ok" : "status-pill-opt"}`}>
              receta motion
            </span>
          </div>
          <button className="mono cursor-not-allowed border border-line bg-paper-soft px-4 py-2 text-[10px] uppercase text-muted" disabled>
            Guardar
          </button>
        </div>

        <section className="border border-line bg-paper-soft p-3">
          {typography.content ? (
            <pre className="min-h-[620px] overflow-auto whitespace-pre-wrap border border-line bg-paper p-4 font-mono text-sm leading-6 text-ink">
              {typography.content}
            </pre>
          ) : (
            <div className="min-h-72 border border-line bg-paper p-6 text-sm text-muted">
              Esta marca todavía no tiene receta tipográfica cargada.
            </div>
          )}
        </section>
      </main>
    </>
  );
}
