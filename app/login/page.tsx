import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-sm w-full text-center">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-ink text-paper flex items-center justify-center text-2xl font-bold">
            AL
          </div>
        </div>
        <h1 className="text-3xl font-semibold mb-1 tracking-tight">
          ANA LABS <span className="mono text-xs text-muted align-middle ml-1">v0</span>
        </h1>
        <p className="text-sm text-muted mb-10">
          Plataforma exclusiva para clientes Ana Labs.
          <br />
          Si tu correo está registrado, recibirás un enlace de acceso.
        </p>

        <form action="/marcas" className="space-y-4">
          <div className="text-left">
            <label htmlFor="email" className="eyebrow block mb-2">
              Correo de acceso
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tu@empresa.com"
              className="w-full px-4 py-3 border border-line rounded bg-paper-soft text-ink placeholder:text-muted/50 focus:outline-none focus:border-ink"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-paper-soft border border-line rounded mono text-xs tracking-[0.12em] uppercase text-ink-soft hover:bg-ink hover:text-paper hover:border-ink transition"
          >
            Enviar enlace
          </button>
        </form>

        <p className="mt-10 text-xs text-muted">
          <Link href="https://wa.me/" className="hover:text-accent">
            ¿Necesitás ayuda? Escribinos por WhatsApp
          </Link>
        </p>
      </div>
    </div>
  );
}
