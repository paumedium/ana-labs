"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function loginRedirect(error: string): never {
  redirect(`/login?error=${encodeURIComponent(error)}`);
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

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) loginRedirect(error.message);

  redirect("/login?message=Revisá tu email si Supabase pide confirmación. Si no, ya podés ingresar.");
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect("/login");
}
