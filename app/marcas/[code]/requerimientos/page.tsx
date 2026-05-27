import { notFound } from "next/navigation";
import { getBrand, getRequirements, type Requirement } from "@/lib/mock-data";
import { SiteHeader } from "@/components/site-header";

const statusClass: Record<Requirement["status"], string> = {
  pendiente: "status-pill-rev",
  resuelto: "status-pill-ok",
};

export default async function RequerimientosPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const brand = getBrand(code);
  if (!brand) notFound();

  const requirements = getRequirements(code);
  const pending = requirements.filter((item) => item.status === "pendiente");
  const resolved = requirements.filter((item) => item.status === "resuelto");

  return (
    <>
      <SiteHeader brand={brand} activeTab="requerimientos" />
      <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 py-8">
        <div className="mb-8 flex flex-wrap items-baseline gap-4">
          <h1 className="text-4xl font-semibold">REQUERIMIENTOS</h1>
          <p className="text-sm text-muted">Pedidos, correcciones e insumos que destraban la producción creativa.</p>
        </div>

        <div className="mb-6 grid gap-3 md:grid-cols-4">
          <RequirementMetric label="Pendientes" value={String(pending.length)} tone="amber" />
          <RequirementMetric label="Resueltos" value={String(resolved.length)} tone="green" />
          <RequirementMetric label="Bloquean marca" value={String(requirements.filter((item) => requirementImpact(item).area === "Marca").length)} />
          <RequirementMetric label="Con adjunto" value={String(requirements.filter((item) => item.asset).length)} />
        </div>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <section className="h-fit border border-line bg-paper-soft p-5">
            <div className="mb-5 border border-[var(--amber)] bg-[#fffaf0] p-3 text-sm text-ink-soft">
              Envío pendiente de backend: por ahora este panel funciona como checklist visible para el equipo y cliente.
            </div>
            <div className="space-y-4">
              <label className="block">
                <span className="eyebrow mb-2 block">¿Qué necesitás?</span>
                <input className="w-full border border-line bg-paper px-3 py-2 text-sm" placeholder="Ej: subir fotos de la medalla" />
              </label>
              <label className="block">
                <span className="eyebrow mb-2 block">Detalle (opcional)</span>
                <textarea className="h-28 w-full border border-line bg-paper px-3 py-2 text-sm" placeholder="Contexto, referencias, qué importa que sepamos..." />
              </label>
              <label className="block">
                <span className="eyebrow mb-2 block">Imágenes (opcional)</span>
                <div className="border border-line bg-paper px-3 py-2 text-sm">Elegir archivos · sin archivos seleccionados</div>
                <div className="mono mt-1 text-[10px] text-muted">Hasta 5 imágenes JPG/PNG/WebP, máx 5 MB c/u.</div>
              </label>
              <button className="mono w-full border border-line bg-ink px-4 py-3 text-[11px] uppercase text-paper opacity-50" aria-disabled="true">
                Envío pendiente
              </button>
            </div>
          </section>

          <section className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
            {requirements.map((item) => (
              <RequirementCard key={item.id} item={item} />
            ))}
          </section>
        </div>
      </main>
    </>
  );
}

function RequirementCard({ item }: { item: Requirement }) {
  const impact = requirementImpact(item);
  const priority = requirementPriority(item);

  return (
    <article className="border border-line bg-paper-soft p-5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <span className="mono text-[11px] text-muted">{item.date}</span>
        <span className={`status-pill ${statusClass[item.status]}`}>{item.status}</span>
      </div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className={`status-pill ${priority === "alta" ? "status-pill-miss" : priority === "media" ? "status-pill-rev" : "status-pill-opt"}`}>{priority}</span>
        <span className="status-pill status-pill-opt">{impact.area}</span>
      </div>
      <h2 className="mb-3 font-semibold">{item.title}</h2>
      <p className="text-sm text-ink-soft">{item.detail}</p>
      <div className="mt-5 border-t border-line pt-4">
        <div className="eyebrow mb-1">Bloquea</div>
        <div className="text-sm">{impact.blocks}</div>
      </div>
      {item.asset && (
        <div className="mono mt-5 flex h-14 w-14 items-center justify-center border border-line bg-paper text-[11px] text-muted">
          {item.asset}
        </div>
      )}
    </article>
  );
}

function RequirementMetric({ label, value, tone = "neutral" }: { label: string; value: string; tone?: "neutral" | "amber" | "green" }) {
  const toneClass = tone === "amber" ? "text-[var(--amber)]" : tone === "green" ? "text-[var(--green)]" : "text-ink";

  return (
    <div className="border border-line bg-paper-soft p-4">
      <div className="eyebrow mb-1">{label}</div>
      <div className={`mono text-3xl ${toneClass}`}>{value}</div>
    </div>
  );
}

function requirementPriority(item: Requirement): "alta" | "media" | "baja" {
  if (item.status === "resuelto") return "baja";
  if (/precio|punto|venta|foto|asset|medalla/i.test(`${item.title} ${item.detail}`)) return "alta";
  return "media";
}

function requirementImpact(item: Requirement): { area: "Marca" | "Creatividad" | "Comercial"; blocks: string } {
  const text = `${item.title} ${item.detail}`;
  if (/precio|PVP|mayorista/i.test(text)) return { area: "Comercial", blocks: "Piezas comerciales, publicaciones con tarifa y CTAs de compra." };
  if (/punto|vinoteca|venta/i.test(text)) return { area: "Comercial", blocks: "CTAs de punto de venta, calendario local y cierres de publicación." };
  if (/foto|imagen|asset|medalla/i.test(text)) return { area: "Creatividad", blocks: "Covers con producto real, carruseles de prueba social y piezas UGC." };
  return { area: "Marca", blocks: "Actualización de ficha y decisiones downstream." };
}
