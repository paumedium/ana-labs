"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function loginRedirect(error: string): never {
  redirect(`/login?error=${encodeURIComponent(error)}`);
}

async function getAuthRedirect(path: string) {
  const headerStore = await headers();
  const origin = headerStore.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://ana-labs.vercel.app";
  return `${origin}${path}`;
}

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) loginRedirect("Ingresá email y contraseña.");

  const supabase = await createSupabaseServerClient();
  if (!supabase) loginRedirect("Supabase no está configurado.");

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) loginRedirect(error.message);

  redirect("/marcas");
}

export async function signUp(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) loginRedirect("Ingresá email y contraseña.");

  const supabase = await createSupabaseServerClient();
  if (!supabase) loginRedirect("Supabase no está configurado.");

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: await getAuthRedirect("/auth/callback") },
  });
  if (error) loginRedirect(error.message);

  redirect("/login?message=Te enviamos un email. Abrí el link nuevo para activar el acceso.");
}

export async function sendMagicLink(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!email) loginRedirect("Ingresá tu email.");

  const supabase = await createSupabaseServerClient();
  if (!supabase) loginRedirect("Supabase no está configurado.");

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: await getAuthRedirect("/auth/callback") },
  });
  if (error) loginRedirect(error.message);

  redirect("/login?message=Te enviamos un link de acceso. Usá el último email que llegue.");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect("/login");
}
