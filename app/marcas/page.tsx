import Link from "next/link";
import { brands, stats } from "@/lib/mock-data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function MarcasPage() {
  return (
    <>
      <SiteHeader />
      <div className="flex-1 px-6 py-8 max-w-[1600px] mx-auto w-full">
        {/* Breadcrumb + stats */}
        <div className="flex justify-between items-baseline mb-6">
          <div className="eyebrow">ANA LABS · MARCAS</div>
          <div className="mono text-[11px] text-muted tracking-[0.08em] uppercase flex gap-4">
            <span>Requerimientos → {stats.requerimientosActivas} activas</span>
            <span>{stats.usuariosTotal} usuario{stats.usuariosTotal !== 1 ? "s" : ""}</span>
            <span>{stats.crsTotal} CRS</span>
          </div>
        </div>

        <h1 className="text-4xl font-semibold mb-8 tracking-tight">MARCAS</h1>

        <div className="divider mb-6" />

        <div className="grid grid-cols-[320px_1fr] gap-8">
          {/* Sidebar de marcas */}
          <div className="space-y-1">
            {brands.length === 0 && (
              <div className="text-sm text-muted">No hay marcas cargadas todavía.</div>
            )}
            {brands.map((b, i) => (
              <Link
                key={b.code}
                href={`/marcas/${b.code}/cover`}
                className={`block px-4 py-3 border ${
                  i === 0 ? "border-ink bg-paper-soft" : "border-transparent hover:bg-paper-soft hover:border-line"
                } transition`}
              >
                <div className="flex items-baseline gap-3">
                  <span className="mono text-[10px] text-muted tracking-[0.15em] w-8">{b.code}</span>
                  <span className="font-medium">{b.name}</span>
                </div>
                <div className="mono text-[10px] text-muted tracking-[0.08em] uppercase ml-11 mt-1">
                  {b.crs} CRS · {b.assets} ASSETS · {b.users} USR
                </div>
              </Link>
            ))}

            <Link
              href="#"
              className="block px-4 py-3 border border-dashed border-line hover:border-accent hover:bg-accent-soft mt-4 transition"
            >
              <div className="flex items-baseline gap-3">
                <span className="mono text-[10px] text-muted tracking-[0.15em] w-8">+</span>
                <span className="font-medium">Nueva marca</span>
              </div>
              <div className="mono text-[10px] text-muted tracking-[0.08em] uppercase ml-11 mt-1">
                CREAR
              </div>
            </Link>
          </div>

          {/* Detalle de marca seleccionada */}
          {brands[0] && <BrandDetail brand={brands[0]} />}
        </div>
      </div>
      <SiteFooter />
    </>
  );
}

function BrandDetail({ brand }: { brand: typeof brands[0] }) {
  return (
    <div className="border border-line p-6 bg-paper">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="eyebrow mb-2">{brand.code} · {brand.code}</div>
          <h2 className="text-3xl font-semibold tracking-tight">{brand.name}</h2>
          <div className="mono text-[11px] text-muted tracking-[0.08em] uppercase mt-2 flex gap-3">
            <span>{brand.crs} CRS</span>
            <span className="opacity-50">·</span>
            <span>{brand.assets} ASSETS</span>
            <span className="opacity-50">·</span>
            <span>{brand.users} USUARIOS</span>
          </div>
        </div>
        <Link
          href={`/marcas/${brand.code}/cover`}
          className="mono text-[10px] tracking-[0.12em] uppercase px-3 py-2 border border-line hover:bg-ink hover:text-paper hover:border-ink transition"
        >
          👁 Dashboard cliente
        </Link>
      </div>

      <div className="divider mb-4" />

      <div className="flex gap-6 mb-6 border-b border-line">
        <button className="mono text-[11px] tracking-[0.12em] uppercase pb-2 border-b-2 border-accent text-ink">
          Usuarios ({brand.users})
        </button>
        <button className="mono text-[11px] tracking-[0.12em] uppercase pb-2 text-muted hover:text-ink">
          Integraciones
        </button>
        <button className="mono text-[11px] tracking-[0.12em] uppercase pb-2 text-muted hover:text-ink">
          Links
        </button>
      </div>

      <button className="mono text-[11px] tracking-[0.12em] uppercase px-4 py-2 border border-line hover:bg-ink hover:text-paper transition mb-4">
        + Invitar usuario
      </button>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line">
            <th className="text-left py-2 eyebrow font-normal">Email</th>
            <th className="text-left py-2 eyebrow font-normal">Rol</th>
            <th className="text-left py-2 eyebrow font-normal">Estado</th>
            <th className="text-left py-2 eyebrow font-normal">Invitado</th>
            <th className="text-left py-2 eyebrow font-normal">Último acceso</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-line/50">
            <td className="py-3">anapaula@driven.com.ar</td>
            <td className="py-3 mono text-xs uppercase tracking-[0.08em]">Admin</td>
            <td className="py-3">
              <span className="status-pill status-pill-ok">Activo</span>
            </td>
            <td className="py-3 text-muted text-xs">hoy</td>
            <td className="py-3 text-muted text-xs">hoy</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
