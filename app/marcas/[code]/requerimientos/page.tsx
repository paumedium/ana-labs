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

  return (
    <>
      <SiteHeader brand={brand} activeTab="requerimientos" />
      <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 py-8">
        <div className="mb-8 flex flex-wrap items-baseline gap-4">
          <h1 className="text-4xl font-semibold">REQUERIMIENTOS</h1>
          <p className="text-sm text-muted">Pedidos, correcciones e insumos que destraban la producción creativa.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr]">
          <section className="h-fit border border-line bg-paper-soft p-5">
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
              <button className="mono w-full border border-line bg-ink px-4 py-3 text-[11px] uppercase text-paper opacity-50">
                Enviar requerimiento
              </button>
            </div>
          </section>

          <section className="grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
            {requirements.map((item) => (
              <article key={item.id} className="border border-line bg-paper-soft p-5">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="mono text-[11px] text-muted">{item.date}</span>
                  <span className={`status-pill ${statusClass[item.status]}`}>{item.status}</span>
                </div>
                <button className="mono mb-4 text-[10px] uppercase text-muted">Cancelar</button>
                <h2 className="mb-3 font-semibold">{item.title}</h2>
                <p className="text-sm text-ink-soft">{item.detail}</p>
                {item.asset && (
                  <div className="mono mt-5 flex h-14 w-14 items-center justify-center border border-line bg-paper text-[11px] text-muted">
                    {item.asset}
                  </div>
                )}
              </article>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
