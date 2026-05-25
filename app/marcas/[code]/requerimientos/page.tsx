import { notFound } from "next/navigation";
import { getBrand } from "@/lib/mock-data";
import { SiteHeader } from "@/components/site-header";

export default async function RequerimientosPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const brand = getBrand(code);
  if (!brand) notFound();

  return (
    <>
      <SiteHeader brand={brand} activeTab="requerimientos" />
      <div className="flex-1 px-6 py-6 max-w-[1600px] mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-4xl font-semibold tracking-tight mb-2">REQUERIMIENTOS</h1>
          <p className="text-sm text-muted">Enviános pedidos, correcciones o ideas. Recibimos un aviso por correo y los revisamos.</p>
        </div>
        <div className="grid grid-cols-[400px_1fr] gap-8">
          <div className="border border-line p-5 space-y-4">
            <div>
              <label className="eyebrow block mb-2">¿Qué necesitás?</label>
              <input className="w-full px-3 py-2 border border-line bg-paper-soft text-sm" placeholder="Ej: cambiar el horario del aviso del jueves" />
            </div>
            <div>
              <label className="eyebrow block mb-2">Detalle (opcional)</label>
              <textarea className="w-full px-3 py-2 border border-line bg-paper-soft text-sm h-24" placeholder="Contexto, referencias, lo que importa que sepamos…" />
            </div>
            <div>
              <label className="eyebrow block mb-2">Imágenes (opcional)</label>
              <input type="file" multiple className="text-xs" />
              <div className="mono text-[10px] text-muted mt-1">Hasta 5 imágenes JPG/PNG/WebP, máx 5 MB c/u</div>
            </div>
            <button className="w-full py-3 mono text-[11px] tracking-[0.12em] uppercase border border-line opacity-50 cursor-not-allowed">
              Enviar requerimiento
            </button>
          </div>
          <div className="border border-dashed border-line flex flex-col items-center justify-center text-muted text-sm p-12">
            <div className="text-4xl mb-3 opacity-30">📥</div>
            Aún no hay requerimientos. Usá el formulario para enviarnos tu primer pedido.
          </div>
        </div>
      </div>
    </>
  );
}
