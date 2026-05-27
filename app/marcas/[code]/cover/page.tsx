import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { getBrand, getCreativePieces, type Brand, type CreativePiece } from "@/lib/mock-data";

type CoverSearchParams = Promise<{ piece?: string | string[]; skill?: string | string[] }>;

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

const statusDotClass: Record<CreativePiece["status"], string> = {
  aprobado: "bg-[var(--green)]",
  "para publicar": "bg-[var(--green)]",
  "para revision": "bg-[var(--red)]",
  observado: "bg-[var(--amber)]",
  borrador: "bg-muted",
};

const aestheticRegisters = [
  "metafora-minimalista-solitaria",
  "editorial-monumental",
  "ugc-scribble",
  "brand-dominant-flat",
  "cinematic-direccional",
  "portal-organico",
  "split-frame-arc",
  "anatomy-heat-overlay",
];

const aestheticPatternDetails = [
  {
    name: "#35 object-as-other-minimalist",
    body: "Un objeto deviene otro sobre fondo plano. Mucho aire, una metáfora pura y cero decoración sobrante.",
  },
  {
    name: "#36 page-curl-reveal",
    body: "Una capa de papel se levanta o rasga para revelar otro mundo: destino, escena o promesa visual.",
  },
  {
    name: "#37 hand-through-symbol",
    body: "Un símbolo plano de marca funciona como portal y una mano real aparece con el producto o acción.",
  },
  {
    name: "#38 eye-as-micro-portal",
    body: "Una escena miniatura aparece dentro de un iris, vidrio, agua o superficie reflectante.",
  },
  {
    name: "#39 type-treatment-imperfecto",
    body: "Composición type-first con subrayados manuales, pesos mixtos y un tratamiento tipográfico expresivo.",
  },
  {
    name: "#40 product-monumentality-lifestyle-wide-angle",
    body: "Producto gigante en primer plano, cámara baja y una escena humana natural detrás.",
  },
  {
    name: "#41 scribble-overlay-portrait",
    body: "Retrato lifestyle con flechas, círculos y palabras manuscritas estilo UGC cuidado.",
  },
];

const aestheticRegisterDetails = [
  ["metafora-minimalista-solitaria", "65-80% de espacio negativo, fondo plano, 1-2 capas, sin partículas ni scatter."],
  ["editorial-monumental", "Tipografía grande, escala institucional, silueta o producto con presencia fuerte."],
  ["ugc-scribble", "Foto cotidiana, anotaciones manuales y tono de testimonio real, no estudio corporativo."],
  ["brand-dominant-flat", "Color primario de marca domina 60-80% del canvas con contraste fuerte."],
  ["cinematic-direccional", "Luz direccional, rim light, clima fotográfico y profundidad dramática controlada."],
  ["portal-organico", "Sujeto mirando o entrando a una apertura luminosa: transición, descubrimiento, futuro."],
  ["split-frame-arc", "Repetición de sujeto sobre arco geométrico, usualmente monocroma y premium."],
  ["anatomy-heat-overlay", "Visualización clínica: mapa de calor, ondas concéntricas y sujeto fotográfico real."],
];

export default async function CoverPage({
  params,
  searchParams,
}: {
  params: Promise<{ code: string }>;
  searchParams: CoverSearchParams;
}) {
  const [{ code }, query] = await Promise.all([params, searchParams]);
  const brand = getBrand(code);
  if (!brand) notFound();

  const pieces = getCreativePieces(code);
  const selectedId = firstParam(query.piece);
  const showSkill = firstParam(query.skill) === "1";
  const selectedIndex = Math.max(
    0,
    pieces.findIndex((piece) => String(piece.id) === selectedId),
  );
  const selected = pieces[selectedIndex];
  const previous = pieces[(selectedIndex - 1 + pieces.length) % pieces.length];
  const next = pieces[(selectedIndex + 1) % pieces.length];
  const counts = getCounts(pieces);

  return (
    <>
      <SiteHeader brand={brand} activeTab="creatividades" />
      <main
        className={`mx-auto grid w-full flex-1 gap-6 px-6 py-6 ${
          showSkill
            ? "max-w-[1840px] xl:grid-cols-[300px_minmax(500px,1fr)_340px_360px]"
            : "max-w-[1600px] xl:grid-cols-[320px_1fr_360px]"
        }`}
      >
        <section>
          <div className="eyebrow mb-4 text-center">/ Galería</div>
          <div className="mb-3 flex items-baseline justify-between">
            <h1 className="text-2xl font-semibold">CREATIVIDADES</h1>
            <div className="mono text-[10px] uppercase text-muted">Piezas {pieces.length}</div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-1">
            {Object.entries(counts).map(([label, count]) => (
              <FilterChip
                key={label}
                label={label}
                count={count}
                active={isChipActive(label, selected)}
              />
            ))}
          </div>

          <div className="grid max-h-[650px] grid-cols-2 gap-2 overflow-y-auto pr-1">
            {pieces.map((piece) => (
              <Thumbnail
                key={piece.id}
                brandCode={brand.code}
                piece={piece}
                active={piece.id === selected?.id}
                showSkill={showSkill}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="eyebrow mb-4 text-center">/ Pieza</div>
          {selected ? (
            <>
              <div className="mb-3 flex items-center justify-between">
                <div className="mono text-[10px] uppercase text-muted">
                  {kindLabels[selected.kind]} / #{selected.id}
                </div>
                <div className="flex items-center gap-2">
                  {previous && (
                    <Link
                      href={coverHref(brand.code, previous.id, showSkill)}
                      className="mono border border-line px-3 py-1.5 text-[10px] uppercase hover:border-ink"
                    >
                      Anterior
                    </Link>
                  )}
                  {next && (
                    <Link
                      href={coverHref(brand.code, next.id, showSkill)}
                      className="mono border border-line px-3 py-1.5 text-[10px] uppercase hover:border-ink"
                    >
                      Siguiente
                    </Link>
                  )}
                </div>
              </div>

              <HeroPiece brand={brand} piece={selected} />

              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_280px]">
                <div>
                  <div className="eyebrow mb-2">Copy</div>
                  <p className="max-w-2xl text-sm italic text-ink-soft">{selected.copy}</p>
                  <p className="mt-3 max-w-2xl text-xs text-muted">{selected.caption}</p>
                </div>
                <div className="flex items-start justify-end gap-2">
                  <button className="mono border border-line px-4 py-2 text-[10px] uppercase hover:border-ink">Editar copy</button>
                  <button className="mono border border-line px-4 py-2 text-[10px] uppercase hover:border-ink">Descargar</button>
                </div>
              </div>
            </>
          ) : (
            <EmptyState />
          )}
        </section>

        <section>
          <div className="eyebrow mb-4 text-center">/ Detalles</div>
          {selected && <DetailsPanel brand={brand} piece={selected} showSkill={showSkill} />}
        </section>

        {showSkill && selected && <CoverSkillDrawer brand={brand} piece={selected} />}
      </main>
    </>
  );
}

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function coverHref(code: string, pieceId: number, showSkill = false) {
  return `/marcas/${code}/cover?piece=${pieceId}${showSkill ? "&skill=1" : ""}`;
}

function getCounts(pieces: CreativePiece[]) {
  return {
    Cover: pieces.filter((piece) => piece.kind === "cover").length,
    Motion: pieces.filter((piece) => piece.kind === "motion").length,
    Carrusel: pieces.filter((piece) => piece.kind === "carrusel").length,
    UGC: pieces.filter((piece) => piece.kind === "ugc").length,
    Borrador: pieces.filter((piece) => piece.status === "borrador").length,
    "Para revisión": pieces.filter((piece) => piece.status === "para revision").length,
    Observ: pieces.filter((piece) => piece.status === "observado").length,
    Aprob: pieces.filter((piece) => piece.status === "aprobado").length,
    "Para publicar": pieces.filter((piece) => piece.status === "para publicar").length,
  };
}

function isChipActive(label: string, piece?: CreativePiece) {
  if (!piece) return false;
  if (label.toLowerCase() === kindLabels[piece.kind].toLowerCase()) return true;
  if (label === "Borrador") return piece.status === "borrador";
  if (label === "Para revisión") return piece.status === "para revision";
  if (label === "Observ") return piece.status === "observado";
  if (label === "Aprob") return piece.status === "aprobado";
  if (label === "Para publicar") return piece.status === "para publicar";
  return false;
}

function FilterChip({ label, count, active }: { label: string; count: number; active?: boolean }) {
  return (
    <div
      className={`flex min-h-8 items-center justify-between border px-2 py-1.5 ${
        active ? "border-ink bg-ink text-paper" : "border-line bg-paper"
      }`}
    >
      <span className="mono text-[10px] uppercase">{label}</span>
      <span className="mono text-[10px]">{count}</span>
    </div>
  );
}

function Thumbnail({
  brandCode,
  piece,
  active,
  showSkill,
}: {
  brandCode: string;
  piece: CreativePiece;
  active?: boolean;
  showSkill?: boolean;
}) {
  return (
    <Link
      href={coverHref(brandCode, piece.id, showSkill)}
      className={`block min-h-[158px] border p-2 transition hover:border-ink ${
        active ? "border-ink bg-paper-soft" : "border-line bg-paper"
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className={`h-2.5 w-2.5 rounded-full ${statusDotClass[piece.status]}`} />
        <span className="mono text-[9px] text-muted">#{piece.id}</span>
      </div>
      <div
        className="flex aspect-[4/5] flex-col justify-between overflow-hidden p-3 text-paper"
        style={{ background: piece.palette }}
      >
        <div className="mono flex items-center justify-between text-[9px] uppercase opacity-75">
          <span>{kindLabels[piece.kind]}</span>
          <span>{piece.format === "Story 9:16" ? "9:16" : piece.format === "Carrusel" ? "CAR" : "4:5"}</span>
        </div>
        <div>
          <div className="text-lg font-semibold leading-tight">{piece.headline}</div>
          <div className="mt-1 line-clamp-2 text-[11px] opacity-85">{piece.subhead}</div>
        </div>
      </div>
    </Link>
  );
}

function HeroPiece({ brand, piece }: { brand: Brand; piece: CreativePiece }) {
  const isStory = piece.format === "Story 9:16";
  const isCarousel = piece.format === "Carrusel";

  return (
    <div className="border border-line bg-paper-soft p-4">
      <div className="mb-4 grid grid-cols-3 gap-1">
        <FormatTab active={!isStory && !isCarousel}>Feed 4:5</FormatTab>
        <FormatTab active={isStory}>Story 9:16</FormatTab>
        <FormatTab active={isCarousel}>Carrusel</FormatTab>
      </div>

      <div className="flex min-h-[580px] items-center justify-center bg-paper px-4 py-6">
        <div
          className={`relative flex w-full max-w-[500px] flex-col justify-between overflow-hidden p-10 text-paper shadow-sm ${
            isStory ? "aspect-[9/16]" : isCarousel ? "aspect-square" : "aspect-[4/5]"
          }`}
          style={{ background: piece.palette }}
        >
          <div className="absolute inset-x-0 top-0 h-32 bg-black/15" />
          <div className="absolute -right-12 top-16 h-40 w-40 rounded-full border border-paper/20" />
          <div className="absolute -bottom-16 -left-12 h-44 w-44 rounded-full border border-paper/15" />

          <div className="relative z-10 flex items-start justify-between gap-8">
            <div>
              <div className="mono text-[11px] uppercase opacity-75">{brand.name}</div>
              <div className="mono mt-1 text-[9px] uppercase opacity-55">Pergamino / Aperitivo</div>
            </div>
            <div className="mono rounded-full border border-paper/35 px-3 py-1 text-[9px] uppercase">
              {kindLabels[piece.kind]}
            </div>
          </div>

          <div className="relative z-10">
            <h2 className="max-w-md text-5xl font-semibold leading-none">{piece.headline}</h2>
            <p className="mt-4 max-w-sm text-lg opacity-[0.85]">{piece.subhead}</p>
          </div>

          <div className="relative z-10 flex items-end justify-between gap-5">
            <div className="mono text-[10px] uppercase opacity-70">{piece.tags.join(" · ")}</div>
            <div className="mono shrink-0 rounded-[4px] bg-paper px-3 py-1 text-[10px] uppercase text-ink">
              {ctaFor(piece)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormatTab({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <button
      className={`mono min-h-9 border px-3 text-[10px] uppercase ${
        active ? "border-ink bg-paper text-ink" : "border-line bg-paper-soft text-muted"
      }`}
    >
      {children}
    </button>
  );
}

function DetailsPanel({ brand, piece, showSkill }: { brand: Brand; piece: CreativePiece; showSkill: boolean }) {
  const pipeline = buildCoverPipeline(piece);
  const isObserved = piece.status === "observado";

  return (
    <>
      <div className="mb-4 border border-line bg-paper-soft p-4">
        <div className="mb-4 flex items-start gap-4">
          <div className="mono bg-ink px-2 py-3 text-center text-[10px] uppercase text-paper">
            IMG
            <br />#{piece.id}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold">{piece.title}</div>
            <div className="mt-1 text-xs text-muted">{piece.subhead}</div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className={`status-pill ${statusClass[piece.status]}`}>{piece.status}</span>
              <span className="status-pill status-pill-opt">{kindLabels[piece.kind]}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <ActionButton tone="ok">{piece.status === "aprobado" ? "Ya aprobada" : "Aprobar"}</ActionButton>
          <ActionButton tone="warn">Editar observ.</ActionButton>
          <ActionButton tone="info">Para publicar</ActionButton>
          <ActionButton tone="danger">Eliminar</ActionButton>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-1">
          <button className="mono bg-paper px-3 py-2 text-[10px] uppercase">{piece.format}</button>
          <button className="mono border border-line px-3 py-2 text-[10px] uppercase text-muted">Story 9:16</button>
        </div>
        <button className="mono mt-3 w-full border border-line px-3 py-2 text-[10px] uppercase hover:border-ink">
          Regenerar feed
        </button>

        <dl className="mt-5 grid grid-cols-[110px_1fr] gap-x-3 gap-y-2 text-xs">
          <dt className="mono uppercase text-muted">Marca</dt>
          <dd>{brand.name}</dd>
          <dt className="mono uppercase text-muted">Patrón</dt>
          <dd>{patternFor(piece)}</dd>
          <dt className="mono uppercase text-muted">Registro</dt>
          <dd>{aestheticFor(piece).label}</dd>
          <dt className="mono uppercase text-muted">Anchor</dt>
          <dd>{anchorFor(piece)}</dd>
          <dt className="mono uppercase text-muted">Visual</dt>
          <dd>{piece.visualCue}</dd>
        </dl>

        <div className={`mt-5 border p-3 text-xs ${isObserved ? "border-[var(--amber)] bg-[#FFF7DE]" : "border-line bg-paper"}`}>
          <div className="eyebrow mb-2">Observación</div>
          {isObserved ? "Falta validar punto de venta real antes de cerrar el CTA." : "Sin observaciones abiertas."}
        </div>
      </div>

      <div className="border border-line bg-paper-soft p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="mono text-[10px] uppercase">Pipeline / {kindLabels[piece.kind]}</div>
          <Link
            href={showSkill ? coverHref(brand.code, piece.id, false) : coverHref(brand.code, piece.id, true)}
            className="mono border border-line bg-paper px-3 py-1.5 text-[10px] uppercase hover:border-ink"
          >
            {showSkill ? "Cerrar skill" : "Ver skill"}
          </Link>
        </div>
        <div className="space-y-4">
          {pipeline.map((step, index) => (
            <PipelineStep key={`${step.title}-${index}`} n={index + 1} title={step.title} body={step.body} />
          ))}
        </div>
      </div>
    </>
  );
}

function ActionButton({ children, tone }: { children: React.ReactNode; tone: "ok" | "warn" | "info" | "danger" }) {
  const classes = {
    ok: "border-[var(--green)] text-[var(--green)]",
    warn: "border-[var(--amber)] text-[#755700]",
    info: "border-[#4877B8] text-[#214F91]",
    danger: "border-[var(--red)] text-[var(--red)]",
  };

  return (
    <button className={`mono min-h-9 border bg-paper px-3 py-2 text-[10px] uppercase hover:bg-paper-soft ${classes[tone]}`}>
      {children}
    </button>
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

function CoverSkillDrawer({ brand, piece }: { brand: Brand; piece: CreativePiece }) {
  const steps = [
    ["Source", "Pieza original, referencia o pedido standalone con marca y gatillador."],
    ["Ficha", "Lee las 12 dimensiones: tono, CTAs, restricciones, buyer persona y oferta."],
    ["Anchor", "Elige DIM ancla y apoyo para no diluir el brief en toda la ficha."],
    ["Textos", "Normaliza headline, subhead, CTA y copy de redes por separado."],
    ["Sistema visual", "Selecciona patrón, paleta, escala, assets, logo y contact strip."],
    ["Eje estético", "Modula composición: minimalista, monumental, UGC, cinematic, portal o heat-map."],
    ["Prompt 6 bloques", "Artifact, Exact Text, Layout, Visual System, Details y Constraints."],
    ["Moderación", "Revisa restricciones de marca, texto exacto, acentos y datos factuales."],
    ["Output", "Deja la pieza en revisión con pipeline auditable y lista para aprobar."],
  ];
  const currentAesthetic = aestheticFor(piece);

  return (
    <aside className="border border-line bg-paper-soft xl:sticky xl:top-6 xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto">
      <div className="flex items-start justify-between border-b border-line p-4">
        <div>
          <div className="eyebrow">Skill</div>
          <h2 className="mt-1 text-lg font-semibold">ana-creatividad-cover</h2>
        </div>
        <Link href={coverHref(brand.code, piece.id, false)} className="mono px-2 text-lg leading-none hover:text-accent">
          x
        </Link>
      </div>

      <div className="grid grid-cols-3 border-b border-line text-center">
        <div className="mono bg-paper px-2 py-3 text-[10px] uppercase">Skill</div>
        <div className="mono px-2 py-3 text-[10px] uppercase text-muted">Aesthetic-refinements</div>
        <div className="mono px-2 py-3 text-[10px] uppercase text-muted">Baseline-v8</div>
      </div>

      <div className="space-y-6 p-4">
        <section>
          <div className="eyebrow mb-2">Propósito</div>
          <p className="text-sm text-ink-soft">
            Crear covers publicitarios con texto integrado, usando la ficha de marca como fuente de verdad y dejando trazabilidad de cada decisión visual.
          </p>
        </section>

        <section>
          <div className="eyebrow mb-3">Workflow</div>
          <div className="space-y-3">
            {steps.map(([title, body], index) => (
              <div key={title} className="grid grid-cols-[28px_1fr] gap-3">
                <div className="mono flex h-6 w-6 items-center justify-center rounded-full border border-line text-[10px]">{index + 1}</div>
                <div>
                  <div className="text-sm font-medium">{title}</div>
                  <div className="text-xs text-muted">{body}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="eyebrow mb-3">Reglas duras</div>
          <div className="space-y-2 text-xs text-ink-soft">
            <Rule>Texto en imagen corto, exacto y con acentos preservados.</Rule>
            <Rule>Paleta de marca estricta: color vibrante pero contenido.</Rule>
            <Rule>Margen libre y cluster visual controlado para que respire.</Rule>
            <Rule>Logo por composición posterior; no se le pide al modelo que lo invente.</Rule>
            <Rule>Datos factuales solo si aparecen en ficha o assets aprobados.</Rule>
          </div>
        </section>

        <section>
          <div className="eyebrow mb-3">Eje estético</div>
          <div className="space-y-3">
            <div className="border-l-2 border-line pl-3 text-sm leading-6 text-ink-soft">
              <p>
                <strong>SCOPE:</strong> este catálogo es cover 3:4 only. Opera como dimensión opcional ortogonal:
                intención, motor, patrón, estrategia comunicacional y registro estético se componen sin reemplazarse.
              </p>
              <p className="mt-3">
                El patrón decide dónde van los elementos. El registro decide cómo se sienten: minimalista, monumental,
                UGC, cinematic, portal, flat brand o visualización clínica.
              </p>
            </div>
            <div className="border border-line bg-paper p-3">
              <div className="mono text-[10px] uppercase text-muted">Registro actual</div>
              <div className="mt-1 text-sm font-medium">{currentAesthetic.label}</div>
              <div className="mt-1 text-xs text-muted">{currentAesthetic.body}</div>
            </div>
            <div>
              <div className="mono mb-2 text-[10px] uppercase text-muted">Registros disponibles</div>
              <div className="flex flex-wrap gap-1.5">
                {aestheticRegisters.map((register) => (
                  <span
                    key={register}
                    className={`mono border px-2 py-1 text-[9px] uppercase ${
                      register === currentAesthetic.slug ? "border-ink bg-ink text-paper" : "border-line bg-paper text-muted"
                    }`}
                  >
                    {register}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="mono mb-2 text-[10px] uppercase text-muted">Patrones candidatos #35-#41</div>
              <div className="space-y-2 text-xs text-ink-soft">
                {aestheticPatternDetails.map((pattern) => (
                  <div key={pattern.name} className="border border-line bg-paper p-2">
                    <div className="mono mb-1 text-[10px] uppercase text-ink">{pattern.name}</div>
                    <div>{pattern.body}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="mono mb-2 text-[10px] uppercase text-muted">Reglas por registro</div>
              <div className="space-y-2">
                {aestheticRegisterDetails.map(([name, body]) => (
                  <div key={name} className="grid grid-cols-[120px_1fr] gap-3 border-b border-line pb-2 text-xs last:border-b-0">
                    <div className="mono text-[9px] uppercase text-ink">{name}</div>
                    <div className="text-ink-soft">{body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border border-line bg-paper p-3">
          <div className="eyebrow mb-2">Pieza actual</div>
          <div className="text-sm font-medium">#{piece.id} - {piece.title}</div>
          <div className="mt-1 text-xs text-muted">{patternFor(piece)} / {anchorFor(piece)}</div>
        </section>
      </div>
    </aside>
  );
}

function Rule({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[10px_1fr] gap-2">
      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-ink" />
      <span>{children}</span>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex min-h-[520px] items-center justify-center border border-line bg-paper-soft p-8 text-center">
      <div>
        <div className="mono text-[10px] uppercase text-muted">Sin piezas</div>
        <p className="mt-2 text-sm text-ink-soft">Todavía no hay creatividades cargadas para esta marca.</p>
      </div>
    </div>
  );
}

function buildCoverPipeline(piece: CreativePiece) {
  if (piece.kind !== "cover") return piece.pipeline;

  return [
    { title: "Idea", body: piece.pipeline[0]?.body ?? piece.title },
    { title: "Lectura marca", body: "Ficha 12D: tono, CTAs, restricciones, oferta y buyer persona." },
    { title: "Anchor", body: anchorFor(piece) },
    { title: "Textos", body: `${piece.headline} / ${piece.subhead} / CTA: ${ctaFor(piece)}` },
    { title: "Sistema visual", body: `${patternFor(piece)} + paleta ${piece.palette} + margen libre.` },
    { title: "Registro estético", body: aestheticFor(piece).body },
    { title: "Prompt 6 bloques", body: "Artifact, Exact Text, Layout, Visual System, Details, Constraints." },
    { title: "Moderación", body: "Sin datos inventados, sin marcas externas y con acentos preservados." },
  ];
}

function anchorFor(piece: CreativePiece) {
  const explicit = piece.pipeline.find((step) => step.title.toLowerCase().includes("ancla"))?.body;
  if (explicit) return explicit;
  if (piece.tags.includes("Medallas")) return "DIM-09 cifras clave + DIM-11 CTAs validados.";
  if (piece.tags.includes("B2B")) return "DIM-05 buyer persona B2B + DIM-08 oferta comercial.";
  return "DIM-03 posicionamiento + DIM-12 personalidad y tono.";
}

function patternFor(piece: CreativePiece) {
  if (piece.kind === "motion") return "secuencia-ritual";
  if (piece.kind === "carrusel") return "editorial-grid";
  if (piece.kind === "ugc") return "ugc-testimonial";
  if (piece.tags.includes("Maceración")) return "big-number-hero";
  if (piece.tags.includes("Vinoteca")) return "product-hero-block-panel";
  if (piece.tags.includes("Mundial")) return "photo-frame-cutout";
  return "type-lockup";
}

function aestheticFor(piece: CreativePiece) {
  if (piece.kind === "ugc") {
    return {
      slug: "ugc-scribble",
      label: "ugc-scribble",
      body: "Lifestyle natural con anotaciones manuscritas, ideal para testimonio o escena cotidiana.",
    };
  }
  if (piece.tags.includes("Mundial")) {
    return {
      slug: "editorial-monumental",
      label: "editorial-monumental",
      body: "Tipografía protagonista, escala grande y composición de alto impacto institucional.",
    };
  }
  if (piece.tags.includes("Vinoteca")) {
    return {
      slug: "cinematic-direccional",
      label: "cinematic-direccional",
      body: "Luz direccional, producto protagonista y clima editorial con profundidad controlada.",
    };
  }
  if (piece.tags.includes("Maceración")) {
    return {
      slug: "metafora-minimalista-solitaria",
      label: "metafora-minimalista-solitaria",
      body: "Una metáfora visual principal sobre fondo limpio, con mucho aire y sin decoración sobrante.",
    };
  }
  if (piece.tags.includes("B2B")) {
    return {
      slug: "brand-dominant-flat",
      label: "brand-dominant-flat",
      body: "Color de marca dominante, contraste fuerte y geometría plana para lectura inmediata.",
    };
  }
  return {
    slug: "default",
    label: "default",
    body: "Baseline editorial: respeta patrón, paleta, escala y restricciones sin override estético.",
  };
}

function ctaFor(piece: CreativePiece) {
  if (piece.tags.includes("B2B")) return "Escribinos";
  if (piece.tags.includes("Vinoteca")) return "Ver puntos";
  if (piece.tags.includes("Maceración")) return "Servilo";
  return "Pedilo";
}
