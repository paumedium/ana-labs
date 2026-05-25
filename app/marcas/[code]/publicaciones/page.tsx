import { notFound } from "next/navigation";
import { getBrand } from "@/lib/mock-data";
import { SiteHeader } from "@/components/site-header";

export default async function PublicacionesPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const brand = getBrand(code);
  if (!brand) notFound();

  return (
    <>
      <SiteHeader brand={brand} activeTab="publicaciones" />
      <div className="flex-1 px-6 py-6 max-w-[1600px] mx-auto w-full">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <div className="eyebrow mb-2">Publicaciones</div>
            <h1 className="text-4xl font-semibold tracking-tight">PUBLICACIONES</h1>
          </div>
          <div className="mono text-[11px] text-muted tracking-[0.08em] uppercase">0 redes · 0 posts</div>
        </div>
        <div className="border border-dashed border-line p-12 text-center text-muted text-sm">
          Acá vas a ver el calendario de publicaciones cuando integremos con Zernio / Buffer / similar.
        </div>
      </div>
    </>
  );
}
