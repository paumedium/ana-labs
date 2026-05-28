import type { EmailOtpType } from "@supabase/supabase-js";
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
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const type = request.nextUrl.searchParams.get("type") as EmailOtpType | null;

  if (!tokenHash || !type) {
    return redirectToLogin(request, "El link de confirmación no es válido. Pedí uno nuevo.");
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return redirectToLogin(request, "Supabase no está configurado.");

  const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type });
  if (error) return redirectToLogin(request, error.message);

  return redirectTo(request, getSafeNext(request));
}
