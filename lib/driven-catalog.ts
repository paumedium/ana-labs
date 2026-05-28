export type DrivenProduct = {
  itemCode: string;
  itemName: string;
  group: string | null;
  subRubro1: string | null;
  subRubro2: string | null;
  stock: number | null;
  wholesalePrice: number | null;
  wholesaleCurrency: string | null;
  retailPrice: number | null;
  retailCurrency: string | null;
  description: string | null;
  keywords: string[];
  tags: string[];
  attributes: Record<string, unknown> | null;
  isSellable: boolean;
  link: string | null;
};

export type DrivenCatalogResult = {
  products: DrivenProduct[];
  total: number | null;
  fetched: number;
  unavailableReason?: string;
};

type CatalogOptions = {
  group?: string;
  q?: string;
  limit?: number;
};

const CATALOG_SELECT = [
  "ItemCode",
  "ItemName",
  "GrupoArticulo",
  "SubRubro1",
  "SubRubro2",
  "Stock",
  '"01_Mayorista(SinIVA)"',
  '"01_Moneda"',
  '"02_PVP(ConIVA)"',
  '"02_Moneda"',
  "descripcion",
  "keywords",
  "tags",
  "atributos",
  "is_sellable",
  "link",
].join(",");

function getDrivenCatalogConfig() {
  const url = process.env.DRIVEN_SUPABASE_URL ?? process.env.NEXT_PUBLIC_DRIVEN_SUPABASE_URL;
  const publishableKey =
    process.env.DRIVEN_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_DRIVEN_SUPABASE_PUBLISHABLE_KEY ??
    process.env.DRIVEN_SUPABASE_ANON_KEY;

  if (!url || !publishableKey) return null;
  return { url, publishableKey };
}

export async function getDrivenCatalog(options: CatalogOptions = {}): Promise<DrivenCatalogResult> {
  const config = getDrivenCatalogConfig();
  if (!config) {
    return {
      products: [],
      total: null,
      fetched: 0,
      unavailableReason: "Faltan DRIVEN_SUPABASE_URL y DRIVEN_SUPABASE_PUBLISHABLE_KEY.",
    };
  }

  const limit = Math.min(Math.max(options.limit ?? 100, 1), 500);
  const url = new URL("/rest/v1/stock_enriquecido", config.url);
  url.searchParams.set("select", CATALOG_SELECT);
  url.searchParams.set("is_sellable", "eq.true");
  url.searchParams.set("order", "Stock.desc.nullslast");
  url.searchParams.set("limit", String(limit));

  if (options.group) url.searchParams.set("GrupoArticulo", `eq.${options.group}`);
  if (options.q) {
    const q = sanitizeSearch(options.q);
    if (q) url.searchParams.set("or", `(ItemName.ilike.*${q}*,ItemCode.ilike.*${q}*,SubRubro1.ilike.*${q}*)`);
  }

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        apikey: config.publishableKey,
        Authorization: `Bearer ${config.publishableKey}`,
        Prefer: "count=exact",
      },
    });

    if (!response.ok) {
      return {
        products: [],
        total: null,
        fetched: 0,
        unavailableReason: `Supabase Driven respondió ${response.status}: ${await response.text()}`,
      };
    }

    const rows = (await response.json()) as RawDrivenProduct[];
    return {
      products: rows.map(mapDrivenProduct),
      total: parseContentRangeTotal(response.headers.get("content-range")),
      fetched: rows.length,
    };
  } catch (error) {
    return {
      products: [],
      total: null,
      fetched: 0,
      unavailableReason: error instanceof Error ? error.message : "No se pudo leer el catálogo Driven.",
    };
  }
}

export function summarizeDrivenCatalog(products: DrivenProduct[]) {
  const groups = new Map<string, number>();
  let withStock = 0;
  let sellableWithPrice = 0;
  let retailSum = 0;

  for (const product of products) {
    const group = product.group ?? "Sin grupo";
    groups.set(group, (groups.get(group) ?? 0) + 1);
    if ((product.stock ?? 0) > 0) withStock += 1;
    if (typeof product.retailPrice === "number" && product.retailPrice > 0) {
      sellableWithPrice += 1;
      retailSum += product.retailPrice;
    }
  }

  return {
    groups: Array.from(groups.entries()).sort((a, b) => b[1] - a[1]),
    withStock,
    averageRetailPrice: sellableWithPrice ? retailSum / sellableWithPrice : null,
  };
}

type RawDrivenProduct = {
  ItemCode: string;
  ItemName: string;
  GrupoArticulo: string | null;
  SubRubro1: string | null;
  SubRubro2: string | null;
  Stock: number | null;
  "01_Mayorista(SinIVA)": number | null;
  "01_Moneda": string | null;
  "02_PVP(ConIVA)": number | null;
  "02_Moneda": string | null;
  descripcion: string | null;
  keywords: unknown;
  tags: unknown;
  atributos: Record<string, unknown> | null;
  is_sellable: boolean;
  link: string | null;
};

function mapDrivenProduct(row: RawDrivenProduct): DrivenProduct {
  return {
    itemCode: row.ItemCode,
    itemName: row.ItemName,
    group: row.GrupoArticulo,
    subRubro1: row.SubRubro1,
    subRubro2: row.SubRubro2,
    stock: toNumberOrNull(row.Stock),
    wholesalePrice: toNumberOrNull(row["01_Mayorista(SinIVA)"]),
    wholesaleCurrency: row["01_Moneda"],
    retailPrice: toNumberOrNull(row["02_PVP(ConIVA)"]),
    retailCurrency: row["02_Moneda"],
    description: row.descripcion,
    keywords: toStringArray(row.keywords),
    tags: toStringArray(row.tags),
    attributes: row.atributos,
    isSellable: row.is_sellable,
    link: row.link,
  };
}

function sanitizeSearch(value: string) {
  return value.trim().replace(/[(),.*]/g, " ").replace(/\s+/g, "%");
}

function parseContentRangeTotal(value: string | null) {
  if (!value) return null;
  const match = value.match(/\/(\d+)$/);
  return match ? Number(match[1]) : null;
}

function toNumberOrNull(value: number | string | null) {
  if (value === null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function toStringArray(value: unknown) {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string" && value.trim()) return [value];
  return [];
}
