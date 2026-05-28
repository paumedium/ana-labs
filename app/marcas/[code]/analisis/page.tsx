import { notFound } from "next/navigation";
import { getAuditItems, getBrand, type AuditItem } from "@/lib/data";
import { SiteHeader } from "@/components/site-header";

const statusClass: Record<AuditItem["status"], string> = {
  critico: "status-pill-miss",
  pendiente: "status-pill-rev",
  aplicado: "status-pill-ok",
};

export default async function AnalisisPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const brand = await getBrand(code);
  if (!brand) notFound();

  const items = await getAuditItems(code);
  const score = 72;
  const critical = items.filter((item) => item.status === "critico").length;
  const pending = items.filter((item) => item.status === "pendiente").length;
  const applied = items.filter((item) => item.status === "aplicado").length;
  const categories = [...new Set(items.map((item) => item.category))];

  return (
    <>
      <SiteHeader brand={brand} activeTab="analisis" />
      <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 py-8">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-5">
          <div>
            <div className="eyebrow mb-2">Auditoría integral</div>
            <h1 className="text-4xl font-semibold">ANÁLISIS</h1>
            <div className="mt-5 flex flex-wrap items-center gap-5">
              <ScoreCircle score={score} />
              <Metric n={critical} label="crítico" className="border-[var(--red)] text-[var(--red)]" />
              <Metric n={pending} label="pendiente" className="border-[var(--amber)] text-[var(--amber)]" />
              <Metric n={applied} label="aplicado" className="border-[var(--green)] text-[var(--green)]" />
            </div>
          </div>
          <button className="mono border border-line px-4 py-2 text-[10px] uppercase hover:border-ink">
            Descargar JSON
          </button>
        </div>

        <div className="mb-8 flex flex-wrap gap-7 border-b border-line pb-3">
          {["Marca", "Contenido", "SEO", "Performance", "Conversión"].map((tab) => (
            <span key={tab} className={`mono text-[11px] uppercase ${tab === "Marca" ? "text-ink" : "text-muted"}`}>
              {tab}
            </span>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          <aside className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center justify-between border-b border-line py-2 text-sm">
                <span className="text-ink-soft">{category}</span>
                <span className="mono text-[10px] text-muted">{items.filter((item) => item.category === category).length}</span>
              </div>
            ))}
          </aside>

          <section>
            <div className="mb-4 border-l-4 border-[var(--red)] bg-[#fff6f4] p-4 text-sm">
              Para que esto sea usable con clientes, el bloqueo no es visual: falta conectar requerimientos y publicaciones a datos reales.
            </div>
            <div className="mb-6 border-l-4 border-[var(--amber)] bg-[#fffaf0] p-4 text-sm">
              {brand.name} ya tiene una ficha inicial. El próximo salto de calidad son datos reales: catálogo, assets, precios, canales y reglas comerciales.
            </div>

            <div className="border border-line">
              {items.map((item) => (
                <div key={item.code} className="grid gap-4 border-b border-line p-4 last:border-b-0 md:grid-cols-[70px_1fr_130px]">
                  <div className="mono text-[11px] uppercase text-muted">{item.code}</div>
                  <div>
                    <h2 className="font-medium">{item.title}</h2>
                    <p className="mt-1 text-sm text-muted">{item.note}</p>
                  </div>
                  <div className="md:text-right">
                    <span className={`status-pill ${statusClass[item.status]}`}>{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function ScoreCircle({ score }: { score: number }) {
  return (
    <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-accent text-3xl font-semibold text-accent">
      {score}
    </div>
  );
}

function Metric({ n, label, className }: { n: number; label: string; className: string }) {
  return (
    <div className="text-center">
      <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full border text-xl font-semibold ${className}`}>{n}</div>
      <div className="mono mt-2 text-[10px] uppercase text-muted">{label}</div>
    </div>
  );
}
