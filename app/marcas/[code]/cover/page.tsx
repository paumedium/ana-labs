import { notFound } from "next/navigation";
import { getBrand } from "@/lib/mock-data";
import { SiteHeader } from "@/components/site-header";

export default async function CoverPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const brand = getBrand(code);
  if (!brand) notFound();

  return (
    <>
      <SiteHeader brand={brand} activeTab="creatividades" />
      <div className="flex-1 px-6 py-6 max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-[280px_1fr_360px] gap-8 h-[calc(100vh-180px)]">
          {/* Galería */}
          <div>
            <div className="eyebrow mb-4 text-center">/ Galería</div>
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="text-xl font-semibold tracking-tight">COVERS</h2>
              <div className="mono text-[10px] text-muted">PIEZAS 0 DE 0</div>
            </div>
            <div className="grid grid-cols-2 gap-1 mb-4">
              <FilterChip label="Cover" count={0} active />
              <FilterChip label="Borrador" count={0} />
              <FilterChip label="Motion" count={0} />
              <FilterChip label="Para revisión" count={0} variant="rev" />
              <FilterChip label="Carrusel" count={0} />
              <FilterChip label="Observ." count={0} variant="rev" />
              <FilterChip label="UGC" count={0} />
              <FilterChip label="Aprob." count={0} variant="ok" />
              <FilterChip label="" count={0} disabled />
              <FilterChip label="Para publicar" count={0} variant="ok" />
            </div>
            <div className="text-xs text-muted text-center py-8 border border-dashed border-line">
              Todavía no hay creatividades.
              <br />
              Generá la primera desde Ideas → Cover.
            </div>
          </div>

          {/* Creatividad central */}
          <div>
            <div className="eyebrow mb-4 text-center">/ Pieza</div>
            <div className="border border-line bg-paper-soft h-full flex items-center justify-center">
              <div className="text-center text-muted text-sm max-w-xs">
                <div className="text-4xl mb-3 opacity-30">⊡</div>
                Acá va a aparecer la creatividad seleccionada.
                <br />
                <br />
                Cuando tengas piezas en la galería, click en cualquiera para verla acá.
              </div>
            </div>
          </div>

          {/* Detalles + pipeline */}
          <div>
            <div className="eyebrow mb-4 text-center">/ Detalles</div>
            <div className="border border-line p-4 mb-4">
              <div className="mono text-[10px] text-muted tracking-[0.1em] mb-2">IMG #—</div>
              <div className="text-sm text-muted italic">Seleccioná una pieza para ver los detalles</div>
            </div>
            <div className="border border-line p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="mono text-[10px] tracking-[0.1em]">PIPELINE / COVER</div>
                <div className="flex gap-2">
                  <button className="mono text-[9px] text-muted hover:text-ink uppercase">Copiar MD</button>
                  <button className="mono text-[9px] text-muted hover:text-ink uppercase">Descargar</button>
                </div>
              </div>
              <div className="space-y-3 opacity-50">
                <PipelineStep n="1" title="Idea" sub="Gatillador humano" />
                <PipelineStep n="2" title="Lectura marca" sub="12 dims · identidad · restricciones" />
                <PipelineStep n="2.b" title="Anchor" sub="dim · gatillador" />
                <PipelineStep n="2.c" title="Assets de marca" sub="0 elementos" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function FilterChip({
  label,
  count,
  active,
  variant,
  disabled,
}: {
  label: string;
  count: number;
  active?: boolean;
  variant?: "ok" | "rev";
  disabled?: boolean;
}) {
  if (!label) return <div />;
  return (
    <div
      className={`flex items-center justify-between px-2 py-1.5 border ${
        active ? "border-ink bg-ink text-paper" : "border-line"
      } ${disabled ? "opacity-30" : ""}`}
    >
      <span className="mono text-[10px] tracking-[0.06em] uppercase">{label}</span>
      <span className={`mono text-[10px] font-bold ${
        variant === "ok" && !active ? "text-[var(--green)]" :
        variant === "rev" && !active ? "text-[var(--amber)]" :
        active ? "text-paper" : "text-muted"
      }`}>{count}</span>
    </div>
  );
}

function PipelineStep({ n, title, sub }: { n: string; title: string; sub: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 border border-line rounded-full flex items-center justify-center mono text-[10px] shrink-0 mt-0.5">
        {n}
      </div>
      <div>
        <div className="font-medium text-sm">{title}</div>
        <div className="text-xs text-muted">{sub}</div>
      </div>
    </div>
  );
}
