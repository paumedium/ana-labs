import {
  auditItems as mockAuditItems,
  brandUsers as mockBrandUsers,
  brands as mockBrands,
  creativePieces as mockCreativePieces,
  getAuditItems as getMockAuditItems,
  getBrand as getMockBrand,
  getBrandUsers as getMockBrandUsers,
  getCreativePieces as getMockCreativePieces,
  getIdeas as getMockIdeas,
  getPublications as getMockPublications,
  getRequirements as getMockRequirements,
  ideas as mockIdeas,
  publications as mockPublications,
  requirements as mockRequirements,
  type AuditItem,
  type Brand,
  type BrandDimension,
  type BrandUser,
  type CreativePiece,
  type Idea,
  type Publication,
  type Requirement,
} from "@/lib/mock-data";
import { parseBrandFicha, type BrandFicha } from "@/lib/brand-ficha";
import { canUseMockFallback } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type {
  AuditItem,
  Brand,
  BrandDimension,
  BrandUser,
  CreativePiece,
  Idea,
  Publication,
  Requirement,
};

type BrandRow = {
  id: string;
  code: string;
  name: string;
  slug: string;
  slogan: string | null;
  parent: string | null;
  crs: number | null;
  assets_count: number | null;
  users_count: number | null;
  socials: Brand["socials"] | null;
};

type BrandFichaRow = {
  content: string;
};

function fallbackAllowed() {
  return canUseMockFallback();
}

async function getSupabaseOrNull() {
  return createSupabaseServerClient();
}

function mapBrand(row: BrandRow): Brand {
  return {
    code: row.code,
    name: row.name,
    slug: row.slug,
    slogan: row.slogan ?? undefined,
    parent: row.parent ?? undefined,
    crs: row.crs ?? 0,
    assets: row.assets_count ?? 0,
    users: row.users_count ?? 0,
    socials: row.socials ?? {},
  };
}

function normalizeCode(code: string) {
  return code.toUpperCase();
}

async function getBrandRow(code: string): Promise<BrandRow | null> {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("brands")
    .select("id, code, name, slug, slogan, parent, crs, assets_count, users_count, socials")
    .ilike("code", normalizeCode(code))
    .maybeSingle();

  if (error) {
    if (!fallbackAllowed()) throw error;
    return null;
  }

  return data as BrandRow | null;
}

export async function getBrands(): Promise<Brand[]> {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return mockBrands;

  const { data, error } = await supabase
    .from("brands")
    .select("id, code, name, slug, slogan, parent, crs, assets_count, users_count, socials")
    .order("name", { ascending: true });

  if (error) {
    if (fallbackAllowed()) return mockBrands;
    throw error;
  }

  return (data as BrandRow[]).map(mapBrand);
}

export async function getBrand(code: string): Promise<Brand | undefined> {
  const row = await getBrandRow(code);
  if (row) return mapBrand(row);
  if (fallbackAllowed()) return getMockBrand(code);
  return undefined;
}

export async function getBrandUsers(code: string): Promise<BrandUser[]> {
  const brand = await getBrandRow(code);
  const supabase = await getSupabaseOrNull();
  if (!brand || !supabase) return fallbackAllowed() ? getMockBrandUsers(code) : [];

  const { data, error } = await supabase
    .from("brand_members")
    .select("email, role, status, invited_label, last_access_label")
    .eq("brand_id", brand.id)
    .order("created_at", { ascending: true });

  if (error) {
    if (fallbackAllowed()) return getMockBrandUsers(code);
    throw error;
  }

  return data.map((row) => ({
    email: row.email,
    role: row.role,
    status: row.status,
    invited: row.invited_label ?? "-",
    lastAccess: row.last_access_label ?? "-",
  }));
}

export async function getBrandFichaByCode(code: string): Promise<BrandFicha> {
  const brand = await getBrand(code);
  if (!brand) return parseBrandFicha("");
  return getBrandFicha(brand.slug, code);
}

export async function getBrandFicha(slug: string, code?: string): Promise<BrandFicha> {
  const brandCode = code ?? mockBrands.find((brand) => brand.slug === slug)?.code;
  const brand = brandCode ? await getBrandRow(brandCode) : null;
  const supabase = await getSupabaseOrNull();

  if (brand && supabase) {
    const { data, error } = await supabase
      .from("brand_fichas")
      .select("content")
      .eq("brand_id", brand.id)
      .maybeSingle();

    if (!error && data) return parseBrandFicha((data as BrandFichaRow).content);
    if (error && !fallbackAllowed()) throw error;
  }

  if (fallbackAllowed()) {
    const local = await import("@/lib/brand-ficha");
    return local.getBrandFicha(slug);
  }

  return parseBrandFicha("");
}

export async function getBrandDimensions(code: string): Promise<BrandDimension[]> {
  const ficha = await getBrandFichaByCode(code);
  if (!ficha.sections.length && fallbackAllowed()) {
    const mock = await import("@/lib/mock-data");
    return mock.getBrandDimensions(code);
  }

  return ficha.sections.map((section) => {
    const meta = dimensionMeta(section.n);
    return {
      n: section.n,
      title: section.title.toLocaleLowerCase("es-AR"),
      category: meta.category,
      status: "completa",
      required: meta.required,
      summary: summarizeSection(section.body),
      fields: [],
    };
  });
}

export async function getCreativePieces(code: string): Promise<CreativePiece[]> {
  const brand = await getBrandRow(code);
  const supabase = await getSupabaseOrNull();
  if (!brand || !supabase) return fallbackAllowed() ? getMockCreativePieces(code) : [];

  const { data, error } = await supabase
    .from("creatives")
    .select("id, kind, status, format, title, headline, subhead, copy, caption, visual_cue, palette, tags, pipeline")
    .eq("brand_id", brand.id)
    .order("id", { ascending: false });

  if (error) {
    if (fallbackAllowed()) return getMockCreativePieces(code);
    throw error;
  }

  return data.map((row) => ({
    id: row.id,
    kind: row.kind,
    status: row.status,
    format: row.format,
    title: row.title,
    headline: row.headline,
    subhead: row.subhead,
    copy: row.copy,
    caption: row.caption,
    visualCue: row.visual_cue,
    palette: row.palette,
    tags: row.tags ?? [],
    pipeline: row.pipeline ?? [],
  }));
}

export async function getIdeas(code: string): Promise<Idea[]> {
  const brand = await getBrandRow(code);
  const supabase = await getSupabaseOrNull();
  if (!brand || !supabase) return fallbackAllowed() ? getMockIdeas(code) : [];

  const { data, error } = await supabase
    .from("ideas")
    .select("id, status, title, category, skill, trigger, phrases, anchor, notes")
    .eq("brand_id", brand.id)
    .order("sort_order", { ascending: true });

  if (error) {
    if (fallbackAllowed()) return getMockIdeas(code);
    throw error;
  }

  return data.map((row) => ({
    id: row.id,
    status: row.status,
    title: row.title,
    category: row.category,
    skill: row.skill,
    trigger: row.trigger,
    phrases: row.phrases ?? [],
    anchor: row.anchor,
    notes: row.notes,
  }));
}

export async function getRequirements(code: string): Promise<Requirement[]> {
  const brand = await getBrandRow(code);
  const supabase = await getSupabaseOrNull();
  if (!brand || !supabase) return fallbackAllowed() ? getMockRequirements(code) : [];

  const { data, error } = await supabase
    .from("requirements")
    .select("id, date_label, status, title, detail, asset")
    .eq("brand_id", brand.id)
    .order("id", { ascending: true });

  if (error) {
    if (fallbackAllowed()) return getMockRequirements(code);
    throw error;
  }

  return data.map((row) => ({
    id: row.id,
    date: row.date_label,
    status: row.status,
    title: row.title,
    detail: row.detail,
    asset: row.asset ?? undefined,
  }));
}

export async function getPublications(code: string): Promise<Publication[]> {
  const brand = await getBrandRow(code);
  const supabase = await getSupabaseOrNull();
  if (!brand || !supabase) return fallbackAllowed() ? getMockPublications(code) : [];

  const { data, error } = await supabase
    .from("publications")
    .select("id, date, day, time, channel, format, status, title, creative_id")
    .eq("brand_id", brand.id)
    .order("date", { ascending: true });

  if (error) {
    if (fallbackAllowed()) return getMockPublications(code);
    throw error;
  }

  return data.map((row) => ({
    id: row.id,
    date: row.date,
    day: row.day,
    time: row.time,
    channel: row.channel,
    format: row.format,
    status: row.status,
    title: row.title,
    creativeId: row.creative_id,
  }));
}

export async function getAuditItems(code: string): Promise<AuditItem[]> {
  const brand = await getBrandRow(code);
  const supabase = await getSupabaseOrNull();
  if (!brand || !supabase) return fallbackAllowed() ? getMockAuditItems(code) : [];

  const { data, error } = await supabase
    .from("audit_items")
    .select("code, title, status, category, note")
    .eq("brand_id", brand.id)
    .order("code", { ascending: true });

  if (error) {
    if (fallbackAllowed()) return getMockAuditItems(code);
    throw error;
  }

  return data;
}

export async function getStats() {
  const [brands, requirements, users] = await Promise.all([
    getBrands(),
    getAllRequirements(),
    getAllBrandUsers(),
  ]);

  return {
    requerimientosActivas: requirements.filter((item) => item.status !== "resuelto").length,
    usuariosTotal: users.length,
    crsTotal: brands.reduce((sum, brand) => sum + brand.crs, 0),
  };
}

async function getAllRequirements() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return Object.values(mockRequirements).flat();

  const { data, error } = await supabase.from("requirements").select("status");
  if (error) return fallbackAllowed() ? Object.values(mockRequirements).flat() : [];
  return data as Pick<Requirement, "status">[];
}

async function getAllBrandUsers() {
  const supabase = await getSupabaseOrNull();
  if (!supabase) return Object.values(mockBrandUsers).flat();

  const { data, error } = await supabase.from("brand_members").select("email");
  if (error) return fallbackAllowed() ? Object.values(mockBrandUsers).flat() : [];
  return data;
}

function summarizeSection(body: string) {
  const clean = body
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .find((line) => !line.startsWith("-"));

  return clean?.replace(/^([^:]{2,58}):\s*/, "").slice(0, 170) ?? "Sin resumen disponible.";
}

function dimensionMeta(n: string): Pick<BrandDimension, "category" | "required"> {
  const meta: Record<string, Pick<BrandDimension, "category" | "required">> = {
    "01": { category: "Identidad y propósito", required: "obligatoria" },
    "02": { category: "Identidad y propósito", required: "obligatoria" },
    "03": { category: "Identidad y propósito", required: "obligatoria" },
    "04": { category: "Mercado y público", required: "opcional" },
    "05": { category: "Mercado y público", required: "critica" },
    "06": { category: "Diferenciación y operación", required: "obligatoria" },
    "07": { category: "Diferenciación y operación", required: "opcional" },
    "08": { category: "Comercial y digital", required: "obligatoria" },
    "09": { category: "Comercial y digital", required: "opcional" },
    "10": { category: "Comercial y digital", required: "obligatoria" },
    "11": { category: "Expresión y voz", required: "obligatoria" },
    "12": { category: "Expresión y voz", required: "obligatoria" },
  };

  return meta[n] ?? { category: "Identidad y propósito", required: "opcional" };
}

export const seedSources = {
  brands: mockBrands,
  creativePieces: mockCreativePieces,
  ideas: mockIdeas,
  requirements: mockRequirements,
  publications: mockPublications,
  auditItems: mockAuditItems,
};
