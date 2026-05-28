"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parseBrandFicha } from "@/lib/brand-ficha";
import { requireUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Role = "admin" | "operador" | "cliente";

async function requireBrandAccess(code: string, allowedRoles: Role[]) {
  const user = await requireUser();
  const supabase = await createSupabaseServerClient();
  if (!supabase) throw new Error("Supabase no está configurado.");

  const { data: brand, error: brandError } = await supabase
    .from("brands")
    .select("id, code")
    .ilike("code", code.toUpperCase())
    .maybeSingle();

  if (brandError || !brand) throw new Error("Marca no encontrada.");

  const { data: membership, error: membershipError } = await supabase
    .from("brand_members")
    .select("role")
    .eq("brand_id", brand.id)
    .or(`user_id.eq.${user.id},email.eq.${user.email?.toLowerCase() ?? ""}`)
    .maybeSingle();

  if (membershipError || !membership || !allowedRoles.includes(membership.role)) {
    throw new Error("No tenés permiso para esta acción.");
  }

  return { supabase, user, brand };
}

export async function saveBrandFicha(code: string, formData: FormData) {
  const content = String(formData.get("content") ?? "").trim();
  if (!content) throw new Error("La ficha no puede quedar vacía.");

  const { supabase, user, brand } = await requireBrandAccess(code, ["admin", "operador"]);
  const parsed = parseBrandFicha(content);

  const { data: current } = await supabase
    .from("brand_fichas")
    .select("active_version")
    .eq("brand_id", brand.id)
    .maybeSingle();

  const nextVersion = (current?.active_version ?? 0) + 1;
  const formatMeta = parsed.format;

  const { error: upsertError } = await supabase.from("brand_fichas").upsert({
    brand_id: brand.id,
    content,
    format_meta: formatMeta,
    active_version: nextVersion,
    updated_by: user.id,
    updated_at: new Date().toISOString(),
  });

  if (upsertError) throw upsertError;

  const { error: versionError } = await supabase.from("brand_ficha_versions").insert({
    brand_id: brand.id,
    version: nextVersion,
    content,
    format_meta: formatMeta,
    created_by: user.id,
  });

  if (versionError) throw versionError;

  revalidatePath(`/marcas/${code}/marca`);
  redirect(`/marcas/${code}/marca?dim=05`);
}

export async function createRequirement(code: string, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const detail = String(formData.get("detail") ?? "").trim();
  const asset = String(formData.get("asset") ?? "").trim();

  if (!title) throw new Error("El requerimiento necesita título.");

  const { supabase, brand } = await requireBrandAccess(code, ["admin", "operador", "cliente"]);

  const { error } = await supabase.from("requirements").insert({
    brand_id: brand.id,
    title,
    detail: detail || "Sin detalle adicional.",
    asset: asset || null,
    status: "pendiente",
    date_label: new Intl.DateTimeFormat("es-AR", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date()),
  });

  if (error) throw error;

  revalidatePath(`/marcas/${code}/requerimientos`);
}

export async function updateCreativeStatus(code: string, creativeId: number, status: string) {
  const { supabase, brand } = await requireBrandAccess(code, ["admin", "operador"]);

  const { error } = await supabase
    .from("creatives")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("brand_id", brand.id)
    .eq("id", creativeId);

  if (error) throw error;

  revalidatePath(`/marcas/${code}/cover`);
}
