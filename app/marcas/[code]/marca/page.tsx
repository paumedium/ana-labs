import { notFound } from "next/navigation";
import { getBrand, getBrandDimensions, type BrandDimension } from "@/lib/mock-data";
import { SiteHeader } from "@/components/site-header";

const categories = ["Identidad y propósito", "Mercado y público", "Diferenciación y operación", "Comercial y digital", "Expresión y voz"];

export default async function MarcaPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const brand = getBrand(code);
  if (!brand) notFound();

  const dims = getBrandDimensions(code);
  const selected = dims[0];
  const completed = dims.filter((dim) => dim.status === "completa").length;

  return (
    <>
      <SiteHeader brand={brand} activeTab="marca" />
      <main className="mx-auto grid w-full max-w-[1600px] flex-1 gap-10 px-6 py-8 xl:grid-cols-[1fr_620px]">
        <section>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow mb-2">Dimensiones</div>
              <h1 className="text-4xl font-semibold">
                FICHA DE MARCA
                <span className="mono ml-3 align-middle text-[10px] uppercase text-muted">Skill</span>
              </h1>
            </div>
            <div>
              <div className="eyebrow">Dimensiones</div>
              <div className="mono text-5xl">
                {completed}
                <span className="text-muted">/{dims.length}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {categories.map((category, index) => (
              <div key={category}>
                <div className="mono mb-2 text-[10px] uppercase text-muted">{index + 1} · {category}</div>
                <div className="grid gap-1 md:grid-cols-2">
                  {dims.filter((dim) => dim.category === category).map((dim, dimIndex) => (
                    <DimensionButton key={dim.n} dim={dim} active={dim.n === selected?.n || (!selected && dimIndex === 0)} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {selected && <DimensionDetail dim={selected} />}
      </main>
    </>
  );
}

function DimensionButton({ dim, active }: { dim: BrandDimension; active?: boolean }) {
  return (
    <div className={`border px-3 py-2 transition ${active ? "border-ink bg-paper-soft" : "border-line hover:border-ink hover:bg-paper-soft"}`}>
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="mono text-[10px] uppercase text-muted">DIM-{dim.n}</span>
        <span className={`status-pill ${dim.status === "completa" ? "status-pill-ok" : "status-pill-miss"}`}>
          {dim.status}
        </span>
      </div>
      <div className="text-sm font-medium">{dim.title}</div>
    </div>
  );
}

function DimensionDetail({ dim }: { dim: BrandDimension }) {
  return (
    <aside className="h-fit border border-line bg-paper-soft p-6 xl:sticky xl:top-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mono mb-2 text-[10px] uppercase">DIM-{dim.n}</div>
          <h2 className="text-xl font-semibold uppercase">{dim.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className={`status-pill ${dim.status === "completa" ? "status-pill-ok" : "status-pill-miss"}`}>{dim.status}</span>
          <button className="mono border border-line bg-paper px-3 py-2 text-[10px] uppercase">Editar</button>
        </div>
      </div>

      <p className="mb-6 text-sm text-ink-soft">{dim.summary}</p>

      <div className="space-y-5">
        {dim.fields.map((field) => (
          <div key={field.label} className="grid gap-2 md:grid-cols-[140px_1fr]">
            <div className="eyebrow">{field.label}</div>
            <div className="whitespace-pre-line text-sm">
              {Array.isArray(field.value) ? (
                <ul className="space-y-1">
                  {field.value.map((value) => (
                    <li key={value} className="pl-4 before:mr-2 before:content-['·']">
                      {value}
                    </li>
                  ))}
                </ul>
              ) : (
                field.value
              )}
            </div>
          </div>
        ))}
      </div>

      {dim.pending && dim.pending.length > 0 && (
        <div className="mt-6 border border-[var(--amber)] bg-[#fffaf0] p-4">
          <div className="eyebrow mb-2">Pendiente validar</div>
          <ul className="space-y-1 text-sm">
            {dim.pending.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
