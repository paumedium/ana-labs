import { notFound } from "next/navigation";
import { getBrand, getCreativePieces, type CreativePiece } from "@/lib/mock-data";
import { SiteHeader } from "@/components/site-header";

const kindLabels: Record<CreativePiece["kind"], string> = {
  cover: "Cover",
  motion: "Motion",
  carrusel: "Carrusel",
  ugc: "UGC",
};

const statusClass: Record<CreativePiece["status"], string> = {
  aprobado: "status-pill-ok",
  "para publicar": "status-pill-ok",
  "para revision": "status-pill-rev",
  observado: "status-pill-rev",
  borrador: "status-pill-opt",
};

export default async function CoverPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const brand = getBrand(code);
  if (!brand) notFound();

  const pieces = getCreativePieces(code);
  const selected = pieces[0];
  const counts = {
    Cover: pieces.filter((p) => p.kind === "cover").length,
    Motion: pieces.filter((p) => p.kind === "motion").length,
    Carrusel: pieces.filter((p) => p.kind === "carrusel").length,
    UGC: pieces.filter((p) => p.kind === "ugc").length,
    Borrador: pieces.filter((p) => p.status === "borrador").length,
    "Para revisión": pieces.filter((p) => p.status === "para revision").length,
    Observ: pieces.filter((p) => p.status === "observado").length,
    Aprob: pieces.filter((p) => p.status === "aprobado").length,
    "Para publicar": pieces.filter((p) => p.status === "para publicar").length,
  };

  return (
    <>
      <SiteHeader brand={brand} activeTab="creatividades" />
      <main className="mx-auto grid w-full max-w-[1600px] flex-1 gap-7 px-6 py-6 xl:grid-cols-[320px_1fr_360px]">
        <section>
          <div className="eyebrow mb-4 text-center">/ Galería</div>
          <div className="mb-3 flex items-baseline justify-between">
            <h1 className="text-2xl font-semibold">CREATIVIDADES</h1>
            <div className="mono text-[10px] uppercase text-muted">Piezas {pieces.length}</div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-1">
            {Object.entries(counts).map(([label, count], index) => (
              <FilterChip key={label} label={label} count={count} active={index === 0} />
            ))}
          </div>

          <div className="grid max-h-[640px] grid-cols-2 gap-2 overflow-y-auto pr-1">
            {pieces.map((piece, index) => (
              <Thumbnail key={piece.id} piece={piece} active={index === 0} />
            ))}
          </div>
        </section>

        <section>
          <div className="eyebrow mb-4 text-center">/ Pieza</div>
          {selected && <HeroPiece piece={selected} />}
          {selected && (
            <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_260px]">
              <div>
                <div className="eyebrow mb-2">Copy</div>
                <p className="text-sm italic text-ink-soft">{selected.copy}</p>
                <p className="mt-3 text-xs text-muted">{selected.caption}</p>
              </div>
              <div className="flex items-start justify-end gap-2">
                <button className="mono border border-line px-4 py-2 text-[10px] uppercase hover:border-ink">Agregar copy</button>
                <button className="mono border border-line px-4 py-2 text-[10px] uppercase hover:border-ink">Descargar</button>
              </div>
            </div>
          )}
        </section>

        <section>
          <div className="eyebrow mb-4 text-center">/ Detalles</div>
          {selected && (
            <>
              <div className="mb-4 border border-line bg-paper-soft p-4">
                <div className="mb-4 flex items-start gap-4">
                  <div className="mono bg-ink px-2 py-3 text-center text-[10px] uppercase text-paper">
                    IMG
                    <br />#{selected.id}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold">{selected.title}</div>
                    <div className="mt-1 text-xs text-muted">{selected.subhead}</div>
                    <span className={`status-pill mt-3 ${statusClass[selected.status]}`}>{selected.status}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <button className="mono bg-paper px-3 py-2 text-[10px] uppercase">{selected.format}</button>
                  <button className="mono border border-line px-3 py-2 text-[10px] uppercase text-muted">Story 9:16</button>
                </div>
                <button className="mono mt-3 w-full border border-line px-3 py-2 text-[10px] uppercase hover:border-ink">
                  Regenerar feed
                </button>
                <dl className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2 text-xs">
                  <dt className="mono uppercase text-muted">Tipo</dt>
                  <dd>{kindLabels[selected.kind]}</dd>
                  <dt className="mono uppercase text-muted">Tono</dt>
                  <dd>Sereno</dd>
                  <dt className="mono uppercase text-muted">Visual</dt>
                  <dd>{selected.visualCue}</dd>
                </dl>
              </div>

              <div className="border border-line bg-paper-soft p-4">
                <div className="mono mb-4 text-[10px] uppercase">Pipeline / {kindLabels[selected.kind]}</div>
                <div className="space-y-4">
                  {selected.pipeline.map((step, index) => (
                    <PipelineStep key={step.title} n={index + 1} title={step.title} body={step.body} />
                  ))}
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}

function FilterChip({ label, count, active }: { label: string; count: number; active?: boolean }) {
  return (
    <div className={`flex items-center justify-between border px-2 py-1.5 ${active ? "border-ink bg-ink text-paper" : "border-line"}`}>
      <span className="mono text-[10px] uppercase">{label}</span>
      <span className="mono text-[10px]">{count}</span>
    </div>
  );
}

function Thumbnail({ piece, active }: { piece: CreativePiece; active?: boolean }) {
  return (
    <div className={`min-h-[152px] border p-2 ${active ? "border-ink bg-paper-soft" : "border-line"}`}>
      <div className="mb-2 flex items-center justify-between">
        <span className={`h-2.5 w-2.5 rounded-full ${piece.status === "aprobado" ? "bg-[var(--green)]" : piece.status === "borrador" ? "bg-muted" : "bg-[var(--amber)]"}`} />
        <span className="mono text-[9px] text-muted">#{piece.id}</span>
      </div>
      <div className="flex aspect-[4/5] flex-col justify-between p-3 text-paper" style={{ background: piece.palette }}>
        <div className="mono text-[9px] uppercase opacity-70">{kindLabels[piece.kind]}</div>
        <div>
          <div className="text-lg font-semibold leading-tight">{piece.headline}</div>
          <div className="mt-1 text-[11px] opacity-80">{piece.subhead}</div>
        </div>
      </div>
    </div>
  );
}

function HeroPiece({ piece }: { piece: CreativePiece }) {
  return (
    <div className="flex min-h-[620px] items-center justify-center border border-line bg-paper-soft p-6">
      <div className="relative flex aspect-[4/5] w-full max-w-[500px] flex-col justify-between overflow-hidden p-10 text-paper shadow-sm" style={{ background: piece.palette }}>
        <div className="absolute inset-x-0 top-0 h-28 bg-black/15" />
        <div className="relative z-10 mono text-[11px] uppercase opacity-75">Pedro y Mateo · Pergamino</div>
        <div className="relative z-10">
          <h2 className="max-w-sm text-5xl font-semibold leading-none">{piece.headline}</h2>
          <p className="mt-4 max-w-sm text-lg opacity-[0.85]">{piece.subhead}</p>
        </div>
        <div className="relative z-10 flex items-end justify-between">
          <div className="mono text-[10px] uppercase opacity-70">49 días · 12 botánicos</div>
          <div className="rounded-full border border-paper/40 px-3 py-1 mono text-[10px] uppercase">Doble plata</div>
        </div>
      </div>
    </div>
  );
}

function PipelineStep({ n, title, body }: { n: number; title: string; body: string }) {
  return (
    <div className="grid grid-cols-[30px_1fr] gap-3">
      <div className="mono flex h-6 w-6 items-center justify-center rounded-full border border-line text-[10px]">{n}</div>
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted">{body}</div>
      </div>
    </div>
  );
}
