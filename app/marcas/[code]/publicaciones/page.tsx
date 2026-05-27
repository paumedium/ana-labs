import { notFound } from "next/navigation";
import { getBrand, getCreativePieces, getPublications, type Brand, type Publication } from "@/lib/mock-data";
import { SiteHeader } from "@/components/site-header";

const statusClass: Record<Publication["status"], string> = {
  publicada: "status-pill-ok",
  programada: "status-pill-rev",
  borrador: "status-pill-opt",
};

export default async function PublicacionesPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const brand = getBrand(code);
  if (!brand) notFound();

  const posts = getPublications(code);
  const pieces = getCreativePieces(code);
  const days = Array.from({ length: 35 }, (_, index) => index + 1);
  const activeChannels = brandChannels(brand.socials);
  const scheduledChannels = [...new Set(posts.map((post) => post.channel))];
  const inactiveScheduled = scheduledChannels.filter((channel) => !activeChannels.includes(channel));

  return (
    <>
      <SiteHeader brand={brand} activeTab="publicaciones" />
      <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 py-8">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow mb-2">Publicaciones</div>
            <h1 className="text-4xl font-semibold">PUBLICACIONES</h1>
          </div>
          <div className="mono text-[11px] uppercase text-muted">
            {channelCountLabel(activeChannels.length)} · {posts.length} posts
          </div>
        </div>

        {inactiveScheduled.length > 0 && (
          <div className="mb-6 border border-[var(--amber)] bg-[#fffaf0] p-4 text-sm text-ink-soft">
            Hay publicaciones en canales no activos para esta marca: {inactiveScheduled.join(", ")}. Validar antes de programar.
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[640px_1fr]">
          <section>
            <div className="mb-4 grid grid-cols-3 border border-line">
              <Filter label="Feed 4:5" count={posts.filter((post) => post.format === "Feed 4:5").length} active />
              <Filter label="Story 9:16" count={posts.filter((post) => post.format === "Story 9:16").length} />
              <Filter label="Carrusel" count={posts.filter((post) => post.format === "Carrusel").length} />
            </div>

            <div className="grid max-h-[620px] gap-3 overflow-y-auto pr-2 md:grid-cols-2">
              {posts.map((post) => {
                const piece = pieces.find((item) => item.id === post.creativeId);
                return (
                  <article key={post.id} className="grid grid-cols-[86px_1fr] gap-3 border border-line bg-paper-soft p-3">
                    <div className="aspect-[4/5] p-3 text-paper" style={{ background: piece?.palette ?? "#46515A" }}>
                      <div className="mono text-[9px] uppercase opacity-70">#{post.id}</div>
                      <div className="mt-8 text-sm font-semibold leading-tight">{piece?.headline ?? post.title}</div>
                    </div>
                    <div>
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="mono text-[11px] text-muted">#{post.id}</span>
                        <span className={`status-pill ${statusClass[post.status]}`}>{post.status}</span>
                      </div>
                      <h2 className="text-sm font-semibold">{post.title}</h2>
                      <div className="mt-2 text-xs text-muted">
                        {post.channel} · {post.format} · {post.date} {post.time}
                      </div>
                      <button className="mono mt-4 border border-line bg-paper px-3 py-1.5 text-[10px] uppercase">Repetir</button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="border border-line bg-paper-soft">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-3">
              <div className="mono text-[11px] uppercase">Junio de 2026</div>
              <div className="mono text-[10px] uppercase text-muted">{posts.length} posts</div>
            </div>
            <div className="grid grid-cols-7 border-b border-line bg-paper text-center">
              {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
                <div key={day} className="mono border-r border-line px-2 py-2 text-[10px] uppercase text-muted last:border-r-0">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {days.map((day) => {
                const dayPosts = posts.filter((post) => post.day === day);
                return (
                  <div key={day} className="min-h-24 border-r border-b border-line p-2 last:border-r-0">
                    <div className="mono text-[10px] text-muted">{day}</div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {dayPosts.slice(0, 3).map((post) => {
                        const piece = pieces.find((item) => item.id === post.creativeId);
                        return (
                          <div key={post.id} className="h-8 w-6 border border-paper bg-ink" style={{ background: piece?.palette ?? "#46515A" }} title={post.title} />
                        );
                      })}
                      {dayPosts.length > 3 && <span className="mono text-[10px] text-muted">+{dayPosts.length - 3}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function Filter({ label, count, active }: { label: string; count: number; active?: boolean }) {
  return (
    <div className={`mono flex items-center justify-center gap-2 px-3 py-2 text-[10px] uppercase ${active ? "bg-paper text-ink" : "text-muted"}`}>
      <span>{label}</span>
      <span>({count})</span>
    </div>
  );
}

function brandChannels(socials: Brand["socials"]): Publication["channel"][] {
  const channels: Publication["channel"][] = [];
  if (socials.instagram) channels.push("Instagram");
  if (socials.facebook) channels.push("Facebook");
  if (socials.linkedin) channels.push("LinkedIn");
  if (socials.tiktok) channels.push("TikTok");
  return channels;
}

function channelCountLabel(count: number): string {
  return count === 1 ? "1 canal activo" : `${count} canales activos`;
}
