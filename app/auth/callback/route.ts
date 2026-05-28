import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function getSafeNext(request: NextRequest) {
  const next = request.nextUrl.searchParams.get("next");
  return next?.startsWith("/") && !next.startsWith("//") ? next : "/marcas";
}

function redirectTo(request: NextRequest, path: string) {
  return NextResponse.redirect(new URL(path, request.url));
}

function redirectToLogin(request: NextRequest, error: string) {
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  url.searchParams.set("error", error);
  return NextResponse.redirect(url);
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const oauthError = request.nextUrl.searchParams.get("error_description");

  if (oauthError) return redirectToLogin(request, oauthError);
  if (!code) return redirectToLogin(request, "El link de acceso no trajo un código válido. Pedí uno nuevo.");

  const supabase = await createSupabaseServerClient();
  if (!supabase) return redirectToLogin(request, "Supabase no está configurado.");

  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) return redirectToLogin(request, error.message);

  return redirectTo(request, getSafeNext(request));
}
