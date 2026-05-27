import { notFound } from "next/navigation";
import Link from "next/link";
import { getBrand, getBrandDimensions, type BrandDimension } from "@/lib/mock-data";
import { getBrandFichaSections } from "@/lib/brand-ficha";
import { SiteHeader } from "@/components/site-header";

const categories = ["Identidad y propósito", "Mercado y público", "Diferenciación y operación", "Comercial y digital", "Expresión y voz"];

type MarcaSearchParams = Promise<{ dim?: string | string[]; skill?: string | string[] }>;

export default async function MarcaPage({
  params,
  searchParams,
}: {
  params: Promise<{ code: string }>;
  searchParams: MarcaSearchParams;
}) {
  const { code } = await params;
  const query = await searchParams;
  const brand = getBrand(code);
  if (!brand) notFound();

  const dims = getBrandDimensions(code);
  const fichaSections = await getBrandFichaSections(brand.slug);
  const dimParam = Array.isArray(query.dim) ? query.dim[0] : query.dim;
  const skillParam = Array.isArray(query.skill) ? query.skill[0] : query.skill;
  const selectedIndex = Math.max(0, dims.findIndex((dim) => dim.n === dimParam));
  const selected = dims[selectedIndex] ?? dims[0];
  const selectedFichaSection = fichaSections.find((section) => section.n === selected?.n);
  const completed = dims.filter((dim) => dim.status === "completa").length;
  const showSkill = skillParam === "1";

  return (
    <>
      <SiteHeader brand={brand} activeTab="marca" />
      <main className="mx-auto grid w-full max-w-[1600px] flex-1 gap-10 px-6 py-8 xl:grid-cols-[1fr_660px]">
        <section>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow mb-2">Dimensiones</div>
              <h1 className="text-4xl font-semibold">
                FICHA DE MARCA
                <Link
                  href={`/marcas/${brand.code}/marca?dim=${selected.n}${showSkill ? "" : "&skill=1"}`}
                  className="mono ml-3 inline-block border border-line bg-paper-soft px-3 py-2 align-middle text-[10px] uppercase text-muted hover:border-ink hover:text-ink"
                >
                  Skill
                </Link>
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
                    <DimensionButton
                      key={dim.n}
                      brandCode={brand.code}
                      dim={dim}
                      active={dim.n === selected?.n || (!selected && dimIndex === 0)}
                      keepSkillOpen={showSkill}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {selected && (
          <DimensionDetail
            brandCode={brand.code}
            dim={selected}
            dims={dims}
            selectedIndex={selectedIndex}
            showSkill={showSkill}
            fichaBody={selectedFichaSection?.body}
          />
        )}
      </main>
      {showSkill && <SkillDrawer brandCode={brand.code} selectedDim={selected.n} />}
    </>
  );
}

function DimensionButton({
  brandCode,
  dim,
  active,
  keepSkillOpen,
}: {
  brandCode: string;
  dim: BrandDimension;
  active?: boolean;
  keepSkillOpen?: boolean;
}) {
  return (
    <Link
      href={`/marcas/${brandCode}/marca?dim=${dim.n}${keepSkillOpen ? "&skill=1" : ""}`}
      className={`block border px-3 py-2 transition ${active ? "border-ink bg-paper-soft" : "border-line hover:border-ink hover:bg-paper-soft"}`}
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="mono text-[10px] uppercase text-muted">DIM-{dim.n}</span>
        <span className={`status-pill ${dim.status === "completa" ? "status-pill-ok" : "status-pill-miss"}`}>
          {dim.status}
        </span>
      </div>
      <div className="text-sm font-medium">{dim.title}</div>
    </Link>
  );
}

function DimensionDetail({
  brandCode,
  dim,
  dims,
  selectedIndex,
  showSkill,
  fichaBody,
}: {
  brandCode: string;
  dim: BrandDimension;
  dims: BrandDimension[];
  selectedIndex: number;
  showSkill: boolean;
  fichaBody?: string;
}) {
  const previous = dims[selectedIndex - 1] ?? dims[dims.length - 1];
  const next = dims[selectedIndex + 1] ?? dims[0];
  const skillSuffix = showSkill ? "&skill=1" : "";

  return (
    <aside className="h-fit max-h-[calc(100vh-8rem)] overflow-y-auto border border-line bg-paper-soft p-6 xl:sticky xl:top-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mono mb-2 text-[10px] uppercase">DIM-{dim.n}</div>
          <h2 className="text-xl font-semibold uppercase">{dim.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className={`status-pill ${dim.status === "completa" ? "status-pill-ok" : "status-pill-miss"}`}>{dim.status}</span>
          <button className="mono border border-line bg-paper px-3 py-2 text-[10px] uppercase">Editar</button>
          <Link href={`/marcas/${brandCode}/marca?dim=${previous.n}${skillSuffix}`} className="mono border border-line bg-paper px-2 py-2 text-xs hover:border-ink">
            ←
          </Link>
          <Link href={`/marcas/${brandCode}/marca?dim=${next.n}${skillSuffix}`} className="mono border border-line bg-paper px-2 py-2 text-xs hover:border-ink">
            →
          </Link>
        </div>
      </div>

      <p className="mb-6 text-sm text-ink-soft">{dim.summary}</p>

      {fichaBody ? (
        <FichaBody body={fichaBody} />
      ) : (
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
      )}

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

function FichaBody({ body }: { body: string }) {
  const lines = body.split(/\r?\n/);

  return (
    <div className="space-y-2 text-sm">
      {lines.map((line, index) => {
        const key = `${index}-${line.slice(0, 16)}`;
        const trimmed = line.trim();
        if (!trimmed) return <div key={key} className="h-3" />;

        if (trimmed.startsWith("[Persona")) {
          return (
            <h3 key={key} className="pt-3 text-base font-semibold">
              {trimmed}
            </h3>
          );
        }

        if (trimmed.startsWith("- ")) {
          return (
            <div key={key} className="flex gap-3 pl-3">
              <span className="text-muted">•</span>
              <span>{trimmed.slice(2)}</span>
            </div>
          );
        }

        const fieldMatch = trimmed.match(/^([^:]{2,58}):\s*(.*)$/);
        if (fieldMatch) {
          return (
            <div key={key} className="grid gap-2 md:grid-cols-[160px_1fr]">
              <div className="eyebrow">{fieldMatch[1]}</div>
              <div className="whitespace-pre-line">{fieldMatch[2]}</div>
            </div>
          );
        }

        if (/^[A-ZÁÉÍÓÚÑ][A-Za-zÁÉÍÓÚÑáéíóúñ0-9\s/()+-]+:$/.test(trimmed)) {
          return (
            <h3 key={key} className="pt-3 text-base font-semibold">
              {trimmed}
            </h3>
          );
        }

        return (
          <p key={key} className="whitespace-pre-line">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

function SkillDrawer({ brandCode, selectedDim }: { brandCode: string; selectedDim: string }) {
  return (
    <aside className="fixed right-0 top-0 z-30 hidden h-screen w-[390px] overflow-y-auto border-l border-line bg-paper-soft shadow-[-12px_0_30px_rgba(15,20,25,0.08)] xl:block">
      <div className="sticky top-0 border-b border-line bg-paper-soft px-6 py-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="eyebrow">Skill</div>
            <h2 className="mono mt-1 text-base">ana-ficha-marca</h2>
          </div>
          <Link href={`/marcas/${brandCode}/marca?dim=${selectedDim}`} className="mono text-lg text-muted hover:text-ink">
            ×
          </Link>
        </div>
      </div>

      <div className="space-y-6 px-6 py-5 text-sm">
        <section>
          <div className="eyebrow mb-3">Workflow</div>
          <ol className="space-y-2">
            <li>1. Leer datos existentes de la marca.</li>
            <li>2. Cruzar documentos del cliente, web, redes y restricciones.</li>
            <li>3. Sintetizar las 12 dimensiones sin inventar datos factuales.</li>
            <li>4. Marcar pendientes cuando falte validación.</li>
            <li>5. Usar la ficha como fuente para ideas, piezas, copies y publicaciones.</li>
          </ol>
        </section>

        <section>
          <div className="eyebrow mb-3">Dimensiones</div>
          <ul className="space-y-1">
            <li>01 Identidad corporativa</li>
            <li>02 Propósito</li>
            <li>03 Posicionamiento estratégico</li>
            <li>04 Arquitectura de marca</li>
            <li>05 Público objetivo + buyer personas</li>
            <li>06 Diferenciadores</li>
            <li>07 Cobertura y operación</li>
            <li>08 Oferta comercial</li>
            <li>09 Cifras clave</li>
            <li>10 Canales y activos digitales</li>
            <li>11 CTAs validados</li>
            <li>12 Personalidad, arquetipo y tono</li>
          </ul>
        </section>

        <section>
          <div className="eyebrow mb-3">Reglas</div>
          <ul className="space-y-2">
            <li>Cliente y documentos propios tienen prioridad sobre cualquier otra fuente.</li>
            <li>Precios, fechas, direcciones y cifras quedan pendientes si no tienen fuente.</li>
            <li>La dimensión 5 alimenta la tensión narrativa de cada creatividad.</li>
            <li>La dimensión 12 define tono, arquetipo y límites de generación.</li>
          </ul>
        </section>
      </div>
    </aside>
  );
}
