import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { sendMagicLink, signIn, signUp } from "./actions";

type LoginSearchParams = Promise<{ error?: string | string[]; message?: string | string[] }>;

export default async function LoginPage({ searchParams }: { searchParams: LoginSearchParams }) {
  const user = await getCurrentUser();
  if (user) redirect("/marcas");

  const query = await searchParams;
  const error = Array.isArray(query.error) ? query.error[0] : query.error;
  const message = Array.isArray(query.message) ? query.message[0] : query.message;

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
          Entrá con contraseña o recibí un link por email.
        </p>

        {error && <div className="mb-5 border border-[var(--red)] bg-[#fff6f4] p-3 text-left text-sm text-[var(--red)]">{error}</div>}
        {message && <div className="mb-5 border border-[var(--green)] bg-[#f2fff7] p-3 text-left text-sm text-[var(--green)]">{message}</div>}

        <form className="space-y-4">
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
              required
            />
          </div>
          <div className="text-left">
            <label htmlFor="password" className="eyebrow block mb-2">
              Contraseña <span className="normal-case tracking-normal text-muted">(solo si ya tenés una)</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-line rounded bg-paper-soft text-ink placeholder:text-muted/50 focus:outline-none focus:border-ink"
              minLength={6}
            />
          </div>
          <button
            type="submit"
            formAction={signIn}
            className="w-full py-3 bg-paper-soft border border-line rounded mono text-xs tracking-[0.12em] uppercase text-ink-soft hover:bg-ink hover:text-paper hover:border-ink transition"
          >
            Ingresar
          </button>
          <button
            type="submit"
            formAction={signUp}
            className="w-full py-3 border border-line rounded mono text-xs tracking-[0.12em] uppercase text-muted hover:border-ink hover:text-ink transition"
          >
            Crear acceso
          </button>
          <button
            type="submit"
            formAction={sendMagicLink}
            className="w-full py-3 border border-line rounded mono text-xs tracking-[0.12em] uppercase text-muted hover:border-ink hover:text-ink transition"
          >
            Enviar link de acceso
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
