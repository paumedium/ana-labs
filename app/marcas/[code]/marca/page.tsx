import { notFound } from "next/navigation";
import Link from "next/link";
import { getBrand, getBrandDimensions, type BrandDimension } from "@/lib/mock-data";
import { getBrandFicha, type BrandFicha } from "@/lib/brand-ficha";
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
  const ficha = await getBrandFicha(brand.slug);
  const fichaSections = ficha.sections;
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

          <FichaSnapshot ficha={ficha} dims={dims} />

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
      <div className="mb-2 text-sm font-medium">{dim.title}</div>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`status-pill ${dimensionRequirementClass(dim.required)}`}>{dim.required === "critica" ? "crítica" : dim.required}</span>
        {dim.n === "05" && <span className="status-pill status-pill-rev">estratégica</span>}
      </div>
    </Link>
  );
}

function FichaSnapshot({ ficha, dims }: { ficha: BrandFicha; dims: BrandDimension[] }) {
  const critical = dims.find((dim) => dim.required === "critica");
  const sourcesLabel = ficha.sources.length === 1 ? "1 fuente" : `${ficha.sources.length} fuentes`;
  const pendingLabel = ficha.pendingCount === 0 ? "Sin pendientes detectados" : `${ficha.pendingCount} alertas`;
  const formatOk = ficha.format.issues.length === 0;

  return (
    <div className="mb-8 border border-line bg-paper-soft p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="eyebrow mb-2">Documento canónico</div>
          <h2 className="text-lg font-semibold">{ficha.subtitle ?? ficha.title}</h2>
          <p className="mt-1 max-w-3xl text-sm text-ink-soft">
            Fuente de verdad para ideas, piezas, copy, publicaciones y restricciones de generación.
          </p>
        </div>
        <span className="status-pill status-pill-ok">12D activa</span>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        <FichaMetric label="Fecha" value={ficha.generatedAt ?? "pendiente"} />
        <FichaMetric label="Fuentes" value={sourcesLabel} />
        <FichaMetric label="Alertas" value={pendingLabel} tone={ficha.pendingCount > 0 ? "amber" : "green"} />
        <FichaMetric label="Formato" value={formatOk ? "Canónico" : `${ficha.format.issues.length} alertas`} tone={formatOk ? "green" : "amber"} />
      </div>

      <div className="mt-4 grid gap-3 border-t border-line pt-4 md:grid-cols-4">
        <FichaCheck label="Header" ok={ficha.format.hasCanonicalHeader} />
        <FichaCheck label="12 secciones" ok={ficha.format.hasTwelveSections} />
        <FichaCheck label="Fecha ISO" ok={ficha.format.hasGeneratedLine} />
        <FichaCheck label={`Separadores ${ficha.format.expectedSeparatorLength}`} ok={ficha.format.separatorCount >= 24 && ficha.format.separatorCount === ficha.format.exactSeparatorCount} />
      </div>

      {ficha.sources.length > 0 && (
        <div className="mt-4 border-t border-line pt-4">
          <div className="eyebrow mb-2">Fuentes principales</div>
          <div className="flex flex-wrap gap-2 text-xs text-ink-soft">
            {ficha.sources.slice(0, 4).map((source) => (
              <span key={source} className="border border-line bg-paper px-2 py-1">
                {source}
              </span>
            ))}
          </div>
        </div>
      )}
      {critical && (
        <div className="mt-4 text-xs text-muted">
          Dimensión crítica del sistema: DIM-{critical.n} {critical.title}. Alimenta buyer persona, dolor/anhelo y tensión narrativa.
        </div>
      )}
    </div>
  );
}

function FichaMetric({ label, value, tone = "neutral" }: { label: string; value: string; tone?: "neutral" | "amber" | "green" }) {
  const toneClass = tone === "amber" ? "text-[var(--amber)]" : tone === "green" ? "text-[var(--green)]" : "text-ink";

  return (
    <div className="border border-line bg-paper p-3">
      <div className="eyebrow mb-1">{label}</div>
      <div className={`text-sm font-semibold ${toneClass}`}>{value}</div>
    </div>
  );
}

function FichaCheck({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between border border-line bg-paper px-3 py-2">
      <span className="mono text-[10px] uppercase text-muted">{label}</span>
      <span className={`status-pill ${ok ? "status-pill-ok" : "status-pill-rev"}`}>{ok ? "ok" : "revisar"}</span>
    </div>
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

      <DimensionUsage dim={dim} />

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

function DimensionUsage({ dim }: { dim: BrandDimension }) {
  const usage = dimensionUsage(dim.n);

  return (
    <div className="mb-6 grid gap-3 border-y border-line py-4 md:grid-cols-3">
      <div>
        <div className="eyebrow mb-1">Tipo</div>
        <div className="text-sm">{dim.required === "critica" ? "Crítica" : dim.required}</div>
      </div>
      <div>
        <div className="eyebrow mb-1">Alimenta</div>
        <div className="text-sm">{usage.feeds}</div>
      </div>
      <div>
        <div className="eyebrow mb-1">Cuidado</div>
        <div className="text-sm">{usage.risk}</div>
      </div>
    </div>
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
            <li>5. Preservar CTAs, precios, plazos, normativas y buyer personas previas.</li>
            <li>6. Usar la ficha como fuente para ideas, piezas, copies y publicaciones.</li>
          </ol>
        </section>

        <section>
          <div className="eyebrow mb-3">Formato canónico</div>
          <ul className="space-y-2">
            <li>Header: FICHA DE MARCA INTEGRAL — {"{MARCA}"}.</li>
            <li>Línea obligatoria: 12 dimensiones — Generado por Ana Labs — YYYY-MM-DD.</li>
            <li>Separadores de 39 caracteres entre secciones, sin cambiar el carácter.</li>
            <li>Header de dimensión: N. TÍTULO, numerado del 1 al 12.</li>
            <li>Fuentes declaradas en una sola línea antes de la primera dimensión.</li>
          </ul>
        </section>

        <section>
          <div className="eyebrow mb-3">Sintaxis del texto</div>
          <ul className="space-y-2">
            <li>Campos simples como Clave: valor.</li>
            <li>Listas con dos espacios, guion y espacio.</li>
            <li>Personas con [Persona N] Nombre y subcampos indentados.</li>
            <li>Objeciones con formato “pregunta” → respuesta.</li>
            <li>Sin datos: (Información pendiente — requiere insumo del cliente).</li>
            <li>Datos inferidos: agregar (pendiente validar) al final.</li>
            <li>Precios antiguos: marcar como referenciales y verificar vigencia.</li>
          </ul>
        </section>

        <section>
          <div className="eyebrow mb-3">Idioma y tono</div>
          <ul className="space-y-2">
            <li>Español con tildes, ñ y signos de apertura.</li>
            <li>Sin emojis dentro de la ficha canónica.</li>
            <li>Objetivo, profesional, estratégico y accesible.</li>
            <li>Hechos verificables antes que opinión editorial o jerga técnica.</li>
          </ul>
        </section>

        <section>
          <div className="eyebrow mb-3">Dimensiones</div>
          <div className="space-y-3">
            {dimensionRules.map((rule) => (
              <div key={rule.n} className="border border-line bg-paper p-3">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="mono text-[10px] uppercase">DIM-{rule.n}</span>
                  <span className={`status-pill ${rule.required === "crítica" ? "status-pill-rev" : rule.required === "opcional" ? "status-pill-opt" : "status-pill-ok"}`}>
                    {rule.required}
                  </span>
                </div>
                <div className="text-sm font-semibold">{rule.title}</div>
                <p className="mt-1 text-xs text-ink-soft">{rule.rule}</p>
              </div>
            ))}
          </div>
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

        <section>
          <div className="eyebrow mb-3">Consumidores</div>
          <ul className="space-y-2">
            <li>Ideas: extrae ángulos desde propósito, público, oferta y cifras.</li>
            <li>Covers: cruza buyer persona, diferenciador, CTA, tono y restricciones.</li>
            <li>Publicaciones: valida canal, copy, frecuencia y pendientes comerciales.</li>
            <li>Análisis: detecta huecos de assets, precios y datos operativos.</li>
          </ul>
        </section>
      </div>
    </aside>
  );
}

function dimensionRequirementClass(required: BrandDimension["required"]): string {
  if (required === "critica") return "status-pill-rev";
  if (required === "opcional") return "status-pill-opt";
  return "status-pill-ok";
}

function dimensionUsage(dim: string): { feeds: string; risk: string } {
  const usage: Record<string, { feeds: string; risk: string }> = {
    "01": { feeds: "Identidad, sede, sector y alcance", risk: "No inventar datos legales" },
    "02": { feeds: "Manifiestos e institucionales", risk: "Separar propuesta de dato" },
    "03": { feeds: "Claims, pitch y mapas de posición", risk: "Evitar claims genéricos" },
    "04": { feeds: "Unidades, paraguas y portfolio", risk: "No crear submarcas falsas" },
    "05": { feeds: "Buyer persona y tensión narrativa", risk: "Debe quedar accionable" },
    "06": { feeds: "Headlines de diferenciación", risk: "Usar ventajas verificables" },
    "07": { feeds: "Cobertura, rutas y operación", risk: "Direcciones solo validadas" },
    "08": { feeds: "Oferta, condiciones y precios", risk: "Marcar vigencia comercial" },
    "09": { feeds: "Cifras, hitos y prueba social", risk: "Citar fecha/fuente" },
    "10": { feeds: "Canales, footer y soporte", risk: "No mostrar canales inactivos" },
    "11": { feeds: "CTAs y cierres de pieza", risk: "No endurecer venta" },
    "12": { feeds: "Arquetipo, tono y límites", risk: "Mantener coherencia visual" },
  };

  return usage[dim] ?? { feeds: "Contexto de marca", risk: "Validar con cliente" };
}

const dimensionRules = [
  {
    n: "01",
    title: "Identidad corporativa",
    required: "obligatoria",
    rule: "Solo datos factuales verificables: razón social, fundación, sede, gerente, sector y alcance.",
  },
  {
    n: "02",
    title: "Propósito",
    required: "obligatoria",
    rule: "Misión, visión y valores con expresión concreta; si es propuesta, marcar pendiente de validación.",
  },
  {
    n: "03",
    title: "Posicionamiento estratégico",
    required: "obligatoria",
    rule: "Definir qué hace, a quién sirve, qué la diferencia y por qué importa; incluir claims y mapa de posición.",
  },
  {
    n: "04",
    title: "Arquitectura de marca",
    required: "opcional",
    rule: "Solo sub-marcas o unidades reales; si no existen, declarar marca única sin inventar estructura.",
  },
  {
    n: "05",
    title: "Público objetivo + buyer personas",
    required: "crítica",
    rule: "2-5 personas con perfil, dolor, anhelo, cambio emocional, diferenciador y objeciones accionables.",
  },
  {
    n: "06",
    title: "Diferenciadores",
    required: "obligatoria",
    rule: "Ventajas verificables agrupadas por operación, tecnología, servicio, producto o assets disponibles.",
  },
  {
    n: "07",
    title: "Cobertura y operación",
    required: "opcional",
    rule: "Sucursales, direcciones, teléfonos y horarios exactos; si no aplica, explicitar operación digital/remota.",
  },
  {
    n: "08",
    title: "Oferta comercial",
    required: "obligatoria",
    rule: "Servicios/productos con condiciones, restricciones, normativas, tarifas referenciales y procedimientos.",
  },
  {
    n: "09",
    title: "Cifras clave",
    required: "opcional",
    rule: "Métricas publicables con fuente y fecha; cifras antiguas se marcan como referenciales.",
  },
  {
    n: "10",
    title: "Canales y activos digitales",
    required: "obligatoria",
    rule: "Web, redes, WhatsApp, email, soporte y tiempos de respuesta; no activar canales inexistentes.",
  },
  {
    n: "11",
    title: "CTAs validados",
    required: "obligatoria",
    rule: "Banco de cierres permitidos para piezas; preservar CTAs anteriores si ya fueron validados.",
  },
  {
    n: "12",
    title: "Personalidad, arquetipo y tono",
    required: "obligatoria",
    rule: "Arquetipo Mark/Pearson, manifestación, voz, directivas, palabras clave y límites de generación.",
  },
] as const;
