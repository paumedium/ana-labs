import { notFound } from "next/navigation";
import { getBrand, getIdeas, type Idea } from "@/lib/mock-data";
import { SiteHeader } from "@/components/site-header";

const categoryClasses: Record<string, string> = {
  Mundial: "border-[var(--green)] text-[var(--green)]",
  "Prueba social": "border-[var(--amber)] text-[var(--amber)]",
  Oferta: "border-accent text-accent",
  Territorio: "border-ink text-ink",
};

export default async function IdeasPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const brand = getBrand(code);
  if (!brand) notFound();

  const ideas = getIdeas(code);

  return (
    <>
      <SiteHeader brand={brand} activeTab="ideas" />
      <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 py-8">
        <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="eyebrow mb-2">Ideas · Cover</div>
            <h1 className="text-4xl font-semibold">IDEAS</h1>
            <p className="mt-3 max-w-4xl text-sm text-ink-soft">
              Lote inicial para Pedro y Mateo: piezas de alto impacto visual ancladas en la ficha de marca.
              Cada idea deja claro qué gatillador usa, qué frase podría salir y qué dimensión sostiene la propuesta.
            </p>
          </div>
          <button className="mono border border-line px-4 py-2 text-[10px] uppercase hover:border-ink">
            Descargar JSON
          </button>
        </div>

        <div className="mb-6 border border-line bg-paper-soft p-4">
          <div className="mono mb-3 text-[10px] uppercase text-muted">
            Diversidad {ideas.length}/10 intenciones · {ideas.filter((idea) => idea.status === "disponible").length} disponibles
          </div>
          <div className="flex flex-wrap gap-2">
            {["Objeción", "Dolor", "Anhelo", "Diferenciador", "Oferta", "Territorio", "Cifras", "CTA"].map((tag) => (
              <span key={tag} className="mono border border-line bg-paper px-2 py-1 text-[10px] uppercase text-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {ideas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </main>
    </>
  );
}

function IdeaCard({ idea }: { idea: Idea }) {
  return (
    <article className="border border-line bg-paper-soft p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="mono text-[11px] uppercase">{idea.id}</span>
          <span className={`mono border px-2 py-1 text-[10px] uppercase ${categoryClasses[idea.category] ?? "border-line text-muted"}`}>
            {idea.category}
          </span>
          <span className="mono border border-line bg-paper px-2 py-1 text-[10px] uppercase text-muted">{idea.skill}</span>
        </div>
        <span className={`status-pill ${idea.status === "usada" ? "status-pill-ok" : "status-pill-opt"}`}>{idea.status}</span>
      </div>

      <h2 className="mb-4 text-xl font-semibold">{idea.title}</h2>

      <div className="mb-5">
        <div className="eyebrow mb-2">Gatillador</div>
        <p className="text-sm">{idea.trigger}</p>
      </div>

      <div className="mb-5">
        <div className="eyebrow mb-2">Frases editoriales candidatas</div>
        <ul className="space-y-1 text-sm">
          {idea.phrases.map((phrase) => (
            <li key={phrase}>“{phrase}”</li>
          ))}
        </ul>
      </div>

      <div className="border-l-2 border-line pl-4">
        <div className="eyebrow mb-2">Ancla en ficha</div>
        <p className="text-sm text-ink-soft">{idea.anchor}</p>
        <p className="mt-3 text-xs text-muted">{idea.notes}</p>
      </div>
    </article>
  );
}
