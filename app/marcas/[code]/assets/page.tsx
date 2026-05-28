import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { getBrand } from "@/lib/data";
import { getAssets, type BrandAsset } from "@/lib/brand-system";

const typeLabels: Record<BrandAsset["type"], string> = {
  logo: "Logo",
  producto: "Producto",
  interior: "Interior",
  exterior: "Exterior",
  fachada: "Fachada",
  otro: "Otro",
};

export default async function AssetsPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const brand = await getBrand(code);
  if (!brand) notFound();

  const assets = getAssets(code);
  const logos = assets.filter((asset) => asset.type === "logo");
  const contextAssets = assets.filter((asset) => asset.type !== "logo");
  const logoVariants = new Set(logos.map((asset) => asset.variant).filter(Boolean));
  const contextTypes = new Set(contextAssets.map((asset) => asset.type));

  return (
    <>
      <SiteHeader brand={brand} activeTab="marca" />
      <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 py-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow mb-2">Assets</div>
            <h1 className="text-4xl font-semibold">
              ASSETS VISUALES
              <span className="mono ml-3 align-middle text-[10px] uppercase text-muted">Editable · sin skill</span>
            </h1>
          </div>
          <div>
            <div className="eyebrow">Assets</div>
            <div className="mono text-5xl">{assets.length}</div>
          </div>
        </div>

        <div className="mb-8 grid gap-3 md:grid-cols-4">
          <AssetMetric label="Logos" value={`${logoVariants.size}/3`} tone={logoVariants.size >= 3 ? "green" : "amber"} />
          <AssetMetric label="Extras" value={String(contextAssets.length)} />
          <AssetMetric label="Tipos" value={`${contextTypes.size}/5`} />
          <AssetMetric label="Estado" value={assets.length ? "Starter" : "Vacío"} tone={assets.length ? "amber" : "neutral"} />
        </div>

        <section className="mb-10">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="eyebrow">Logos · variantes pre-renderizadas + extras</div>
            <button className="mono cursor-not-allowed border border-line bg-paper-soft px-4 py-2 text-[10px] uppercase text-muted" disabled>
              + Subir extra
            </button>
          </div>
          {logos.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-5">
              {logos.map((asset) => (
                <AssetCard key={asset.id} asset={asset} compact />
              ))}
            </div>
          ) : (
            <EmptyAssetBlock label="Sin logos cargados" />
          )}
        </section>

        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="eyebrow">Assets contextuales · producto, fachada, interiores, exteriores</div>
            <button className="mono cursor-not-allowed border border-line bg-paper-soft px-4 py-2 text-[10px] uppercase text-muted" disabled>
              + Agregar asset
            </button>
          </div>
          {contextAssets.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {contextAssets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          ) : (
            <EmptyAssetBlock label="Sin assets contextuales" />
          )}
        </section>
      </main>
    </>
  );
}

function AssetMetric({
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

function AssetCard({ asset, compact = false }: { asset: BrandAsset; compact?: boolean }) {
  return (
    <article className="border border-line bg-paper-soft p-2">
      <div
        className={`flex items-center justify-center border border-line bg-paper ${compact ? "aspect-[4/3]" : "aspect-[5/4]"}`}
        style={{ backgroundColor: asset.preview ?? "#F1F0EA" }}
      >
        <div className="mono max-w-[78%] text-center text-[11px] uppercase text-paper mix-blend-difference">
          {asset.name}
        </div>
      </div>
      <div className="p-2">
        <div className="mb-1 flex items-start justify-between gap-3">
          <h2 className="text-sm font-semibold">{asset.name}</h2>
          <span className="mono shrink-0 text-[9px] uppercase text-muted">{asset.variant ?? typeLabels[asset.type]}</span>
        </div>
        <p className="line-clamp-3 text-xs text-ink-soft">{asset.description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          <span className="mono text-[9px] uppercase text-muted">{typeLabels[asset.type]}</span>
          {asset.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="mono text-[9px] uppercase text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function EmptyAssetBlock({ label }: { label: string }) {
  return (
    <div className="border border-line bg-paper-soft p-6 text-sm text-muted">
      {label}. Este bloque queda listo para conectar subida real a Supabase Storage.
    </div>
  );
}
