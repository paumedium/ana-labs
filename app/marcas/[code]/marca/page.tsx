import { notFound } from "next/navigation";
import { getBrand } from "@/lib/mock-data";
import { SiteHeader } from "@/components/site-header";

const dims = [
  { n: "01", title: "Identidad corporativa", cat: "Identidad y propósito", req: "req" },
  { n: "02", title: "Propósito", cat: "Identidad y propósito", req: "req" },
  { n: "03", title: "Posicionamiento estratégico", cat: "Identidad y propósito", req: "req" },
  { n: "04", title: "Arquitectura de marca", cat: "Mercado y público", req: "opt" },
  { n: "05", title: "Público objetivo + Buyer Personas", cat: "Mercado y público", req: "crit" },
  { n: "06", title: "Diferenciadores", cat: "Diferenciación y operación", req: "req" },
  { n: "07", title: "Cobertura y operación", cat: "Diferenciación y operación", req: "opt" },
  { n: "08", title: "Oferta comercial", cat: "Comercial y digital", req: "req" },
  { n: "09", title: "Cifras clave", cat: "Comercial y digital", req: "opt" },
  { n: "10", title: "Canales y activos digitales", cat: "Comercial y digital", req: "req" },
  { n: "11", title: "CTAs validados", cat: "Expresión y voz", req: "req" },
  { n: "12", title: "Personalidad, arquetipo y tono", cat: "Expresión y voz", req: "req" },
];

const categories = ["Identidad y propósito", "Mercado y público", "Diferenciación y operación", "Comercial y digital", "Expresión y voz"];

export default async function MarcaPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const brand = getBrand(code);
  if (!brand) notFound();

  return (
    <>
      <SiteHeader brand={brand} activeTab="marca" />
      <div className="flex-1 px-6 py-6 max-w-[1600px] mx-auto w-full">
        <div className="grid grid-cols-[1fr_500px] gap-12">
          {/* Sidebar DIMs */}
          <div>
            <div className="flex items-baseline justify-between mb-8">
              <h1 className="text-3xl font-semibold tracking-tight">
                FICHA DE MARCA
                <button className="ml-3 mono text-[10px] tracking-[0.12em] uppercase px-2 py-1 border border-line hover:bg-ink hover:text-paper align-middle">
                  Skill
                </button>
              </h1>
              <div className="text-right">
                <div className="eyebrow">DIMENSIONES</div>
                <div className="text-3xl font-semibold mono">
                  <span className="text-muted">0</span>
                  <span className="text-muted">/</span>
                  <span>12</span>
                </div>
              </div>
            </div>

            {categories.map((cat, ci) => (
              <div key={cat} className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="mono text-[10px] text-muted tracking-[0.12em] uppercase">
                    {ci + 1} · {cat}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {dims.filter((d) => d.cat === cat).map((d) => (
                    <div
                      key={d.n}
                      className="px-3 py-2 border border-line hover:border-ink hover:bg-paper-soft cursor-pointer transition"
                    >
                      <div className="flex items-baseline gap-2">
                        <span className="mono text-[10px] text-muted tracking-[0.1em]">DIM-{d.n}</span>
                        {d.req === "crit" && <span className="status-pill status-pill-miss text-[8px]">crit</span>}
                        {d.req === "opt" && <span className="status-pill status-pill-opt text-[8px]">opt</span>}
                      </div>
                      <div className="text-sm font-medium mt-0.5">{d.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Panel detalle DIM seleccionada */}
          <div className="border border-line p-6 h-fit sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="mono text-[10px] text-muted tracking-[0.1em] mb-1">DIM-01</div>
                <h3 className="text-lg font-semibold">Identidad corporativa</h3>
              </div>
              <span className="status-pill status-pill-miss">Vacía</span>
            </div>

            <div className="text-sm text-muted italic mb-4">
              Todavía no se cargó información para esta dimensión.
            </div>

            <button className="w-full py-2 border border-line mono text-[11px] tracking-[0.12em] uppercase hover:bg-ink hover:text-paper transition">
              + Cargar manualmente
            </button>
            <button className="w-full py-2 border border-line mono text-[11px] tracking-[0.12em] uppercase hover:bg-accent hover:text-paper hover:border-accent transition mt-2">
              ✨ Generar con skill
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
