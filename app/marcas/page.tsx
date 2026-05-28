import Link from "next/link";
import { getBrands, getBrandUsers, getStats, type Brand, type BrandUser } from "@/lib/data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default async function MarcasPage() {
  const brands = await getBrands();
  const selected = brands[0];
  const users = selected ? await getBrandUsers(selected.code) : [];
  const stats = await getStats();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-6 py-8">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className="eyebrow mb-3">ANA LABS · MARCAS</div>
            <h1 className="text-4xl font-semibold">MARCAS</h1>
          </div>
          <div className="mono flex flex-wrap gap-4 text-[11px] uppercase text-muted">
            <Link href="/marcas/VPM/requerimientos" className="border border-line px-3 py-1.5 hover:border-ink hover:text-ink">
              Requerimientos
            </Link>
            <span>{stats.requerimientosActivas} activas</span>
            <span>{stats.usuariosTotal} usuarios</span>
            <span>{stats.crsTotal} CRS</span>
          </div>
        </div>

        <div className="divider mb-6" />

        <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
          <aside className="border border-line">
            {brands.map((brand, index) => (
              <Link
                key={brand.code}
                href={`/marcas/${brand.code}/cover`}
                className={`block border-b border-line px-4 py-4 transition last:border-b-0 ${
                  index === 0 ? "bg-paper-soft shadow-[inset_3px_0_0_var(--ink)]" : "hover:bg-paper-soft"
                }`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="mono w-9 text-[10px] uppercase text-muted">{brand.code}</span>
                  <span className="font-medium">{brand.name}</span>
                </div>
                <div className="mono ml-[52px] mt-1 text-[10px] uppercase text-muted">
                  {brand.crs} CRS · {brand.assets} assets · {brand.users} usr
                </div>
              </Link>
            ))}
          </aside>

          {selected && <BrandDetail brand={selected} users={users} />}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function BrandDetail({ brand, users }: { brand: Brand; users: BrandUser[] }) {
  return (
    <section className="border border-line bg-paper">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line p-6">
        <div>
          <div className="eyebrow mb-2">{brand.code} · {brand.slug}</div>
          <h2 className="text-3xl font-semibold">{brand.name}</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted">{brand.slogan}</p>
          <div className="mono mt-3 flex flex-wrap gap-3 text-[11px] uppercase text-muted">
            <span>{brand.crs} CRS</span>
            <span>·</span>
            <span>{brand.assets} assets</span>
            <span>·</span>
            <span>{brand.users} usuarios</span>
          </div>
        </div>
        <Link
          href={`/marcas/${brand.code}/cover`}
          className="mono border border-line px-4 py-2 text-[10px] uppercase transition hover:border-ink hover:bg-ink hover:text-paper"
        >
          Dashboard cliente
        </Link>
      </div>

      <div className="border-b border-line px-6 pt-4">
        <div className="flex gap-6">
          <button className="mono border-b-2 border-ink pb-3 text-[11px] uppercase">Usuarios ({users.length})</button>
          <button className="mono pb-3 text-[11px] uppercase text-muted">Integraciones</button>
          <button className="mono pb-3 text-[11px] uppercase text-muted">Links</button>
        </div>
      </div>

      <div className="p-6">
        <button className="mono mb-5 border border-line bg-paper-soft px-4 py-2 text-[11px] uppercase text-muted">
          + Invitar usuario
        </button>

        <div className="overflow-x-auto border border-line">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="bg-paper-soft">
              <tr className="border-b border-line">
                <th className="eyebrow px-4 py-3 text-left font-normal">Email</th>
                <th className="eyebrow px-4 py-3 text-left font-normal">Rol</th>
                <th className="eyebrow px-4 py-3 text-left font-normal">Estado</th>
                <th className="eyebrow px-4 py-3 text-left font-normal">Invitado</th>
                <th className="eyebrow px-4 py-3 text-left font-normal">Último acceso</th>
                <th className="eyebrow px-4 py-3 text-right font-normal">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email} className="border-b border-line last:border-b-0">
                  <td className="px-4 py-4">{user.email}</td>
                  <td className="mono px-4 py-4 text-[11px] uppercase">{user.role}</td>
                  <td className="px-4 py-4">
                    <span className={`status-pill ${user.status === "activo" ? "status-pill-ok" : "status-pill-miss"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-muted">{user.invited}</td>
                  <td className="px-4 py-4 text-muted">{user.lastAccess}</td>
                  <td className="px-4 py-4 text-right">
                    <span className="mono inline-flex gap-2 text-[10px] text-muted">
                      <button className="border border-line px-2 py-1">Enviar</button>
                      <button className="border border-line px-2 py-1">Rol</button>
                      <button className="border border-line px-2 py-1 text-[var(--red)]">Quitar</button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
