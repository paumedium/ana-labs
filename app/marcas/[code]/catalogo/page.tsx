import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { getBrand } from "@/lib/data";
import { getDrivenCatalog, summarizeDrivenCatalog, type DrivenProduct } from "@/lib/driven-catalog";

type CatalogoSearchParams = Promise<{ group?: string | string[]; q?: string | string[] }>;

export default async function CatalogoPage({
  params,
  searchParams,
}: {
  params: Promise<{ code: string }>;
  searchParams: CatalogoSearchParams;
}) {
  const [{ code }, query] = await Promise.all([params, searchParams]);
  const brand = await getBrand(code);
  if (!brand) notFound();

  const group = firstParam(query.group);
  const q = firstParam(query.q);
  const isDriven = brand.code.toUpperCase() === "DRV";
  const [catalog, summaryCatalog] = isDriven
    ? await Promise.all([
        getDrivenCatalog({ group, q, limit: 120 }),
        getDrivenCatalog({ limit: 500 }),
      ])
    : [
        { products: [], total: null, fetched: 0, unavailableReason: "Catálogo externo disponible solo para Driven." },
        { products: [], total: null, fetched: 0 },
      ];
  const summary = summarizeDrivenCatalog(summaryCatalog.products);
  const groups = summary.groups.map(([name]) => name);

  return (
    <>
      <SiteHeader brand={brand} activeTab="marca" />
      <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 py-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow mb-2">Stock enriquecido</div>
            <h1 className="text-4xl font-semibold">CATÁLOGO DRIVEN</h1>
            <p className="mt-2 max-w-3xl text-sm text-ink-soft">
              Lectura directa desde el Supabase de Driven: productos, rubros, stock, precios y links de tienda.
            </p>
          </div>
          <div>
            <div className="eyebrow">Items</div>
            <div className="mono text-5xl">{catalog.total ?? catalog.fetched}</div>
          </div>
        </div>

        <div className="mb-6 grid gap-3 md:grid-cols-4">
          <CatalogMetric label="Traídos" value={String(catalog.fetched)} />
          <CatalogMetric label="Con stock positivo" value={String(summary.withStock)} tone={summary.withStock ? "green" : "amber"} />
          <CatalogMetric label="Rubros" value={String(summary.groups.length)} />
          <CatalogMetric label="PVP prom." value={formatMoney(summary.averageRetailPrice)} />
        </div>

        <form className="mb-6 grid gap-3 border border-line bg-paper-soft p-4 lg:grid-cols-[1fr_260px_120px]">
          <label>
            <span className="eyebrow mb-2 block">Buscar</span>
            <input
              name="q"
              defaultValue={q}
              className="h-11 w-full border border-line bg-paper px-3 text-sm focus:border-ink focus:outline-none"
              placeholder="Big Boy, bidón, Flamate, código..."
            />
          </label>
          <label>
            <span className="eyebrow mb-2 block">Grupo</span>
            <select name="group" defaultValue={group ?? ""} className="h-11 w-full border border-line bg-paper px-3 text-sm focus:border-ink focus:outline-none">
              <option value="">Todos</option>
              {groups.map((groupName) => (
                <option key={groupName} value={groupName}>
                  {groupName}
                </option>
              ))}
            </select>
          </label>
          <button className="mono mt-auto h-11 border border-line bg-ink px-4 text-[10px] uppercase text-paper" type="submit">
            Filtrar
          </button>
        </form>

        {catalog.unavailableReason ? (
          <div className="border border-[var(--amber)] bg-[#fff7de] p-5 text-sm text-ink-soft">
            {catalog.unavailableReason}
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[260px_1fr]">
            <aside className="h-fit border border-line bg-paper-soft p-4 xl:sticky xl:top-6">
              <div className="eyebrow mb-3">Rubros</div>
              <div className="space-y-1">
                <GroupLink brandCode={brand.code} label="Todos" count={summaryCatalog.fetched} active={!group} q={q} />
                {summary.groups.slice(0, 18).map(([groupName, count]) => (
                  <GroupLink key={groupName} brandCode={brand.code} label={groupName} count={count} active={group === groupName} q={q} />
                ))}
              </div>
            </aside>

            <section>
              <div className="mb-3 flex items-center justify-between gap-4">
                <div className="eyebrow">Productos · {catalog.fetched}</div>
                <div className="mono text-[10px] uppercase text-muted">is_sellable=true · orden stock desc</div>
              </div>
              <div className="overflow-hidden border border-line">
                <div className="hidden grid-cols-[120px_1.5fr_150px_90px_120px_120px_90px] border-b border-line bg-paper-soft px-3 py-3 text-xs font-semibold lg:grid">
                  <div>Código</div>
                  <div>Producto</div>
                  <div>Rubro</div>
                  <div>Stock</div>
                  <div>Mayorista</div>
                  <div>PVP</div>
                  <div>Link</div>
                </div>
                <div className="divide-y divide-line">
                  {catalog.products.map((product) => (
                    <ProductRow key={product.itemCode} product={product} />
                  ))}
                  {catalog.products.length === 0 && (
                    <div className="bg-paper-soft p-6 text-sm text-muted">No hay productos para ese filtro.</div>
                  )}
                </div>
              </div>
            </section>
          </div>
        )}
      </main>
    </>
  );
}

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function CatalogMetric({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "amber" | "green";
}) {
  const toneClass = tone === "amber" ? "text-[var(--amber)]" : tone === "green" ? "text-[var(--green)]" : "text-ink";

  return (
    <div className="border border-line bg-paper-soft p-4">
      <div className="eyebrow mb-1">{label}</div>
      <div className={`mono text-3xl ${toneClass}`}>{value}</div>
    </div>
  );
}

function GroupLink({
  brandCode,
  label,
  count,
  active,
  q,
}: {
  brandCode: string;
  label: string;
  count: number;
  active?: boolean;
  q?: string;
}) {
  const params = new URLSearchParams();
  if (label !== "Todos") params.set("group", label);
  if (q) params.set("q", q);

  return (
    <Link
      href={`/marcas/${brandCode}/catalogo${params.size ? `?${params.toString()}` : ""}`}
      className={`flex items-center justify-between border px-3 py-2 text-sm ${active ? "border-ink bg-ink text-paper" : "border-line bg-paper hover:border-ink"}`}
    >
      <span className="truncate">{label}</span>
      <span className="mono ml-3 text-[10px]">{count}</span>
    </Link>
  );
}

function ProductRow({ product }: { product: DrivenProduct }) {
  return (
    <article className="grid gap-3 bg-paper-soft p-3 text-sm lg:grid-cols-[120px_1.5fr_150px_90px_120px_120px_90px] lg:items-start">
      <div>
        <div className="mono text-[11px] uppercase">{product.itemCode}</div>
        <div className={`status-pill mt-2 ${stockClass(product.stock)}`}>{stockLabel(product.stock)}</div>
      </div>
      <div>
        <h2 className="font-semibold leading-snug">{product.itemName}</h2>
        {product.description && <p className="mt-1 line-clamp-2 text-xs text-ink-soft">{product.description}</p>}
        {(product.tags.length > 0 || product.keywords.length > 0) && (
          <div className="mt-2 flex flex-wrap gap-1">
            {[...product.tags, ...product.keywords].slice(0, 4).map((tag) => (
              <span key={tag} className="mono border border-line bg-paper px-1.5 py-0.5 text-[9px] uppercase text-muted">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div>
        <div className="mono text-[10px] uppercase text-muted">{product.group ?? "Sin grupo"}</div>
        <div className="mt-1 text-xs text-ink-soft">{[product.subRubro1, product.subRubro2].filter(Boolean).join(" / ") || "-"}</div>
      </div>
      <div className="mono text-sm">{formatStock(product.stock)}</div>
      <div className="mono text-sm">{formatMoney(product.wholesalePrice)}</div>
      <div className="mono text-sm font-semibold">{formatMoney(product.retailPrice)}</div>
      <div>
        {product.link ? (
          <Link href={product.link} target="_blank" rel="noreferrer" className="mono border border-line bg-paper px-3 py-2 text-[10px] uppercase hover:border-ink">
            Abrir
          </Link>
        ) : (
          <span className="mono text-[10px] uppercase text-muted">Sin link</span>
        )}
      </div>
    </article>
  );
}

function formatMoney(value: number | null) {
  if (!value) return "-";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatStock(value: number | null) {
  if (value === null) return "-";
  return new Intl.NumberFormat("es-AR", { maximumFractionDigits: 0 }).format(value);
}

function stockClass(value: number | null) {
  if (value === null) return "status-pill-opt";
  if (value > 0) return "status-pill-ok";
  if (value === 0) return "status-pill-rev";
  return "status-pill-miss";
}

function stockLabel(value: number | null) {
  if (value === null) return "sin stock";
  if (value > 0) return "stock +";
  if (value === 0) return "stock 0";
  return "stock -";
}
