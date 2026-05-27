import { readFile } from "node:fs/promises";
import path from "node:path";

export type BrandFichaSection = {
  n: string;
  title: string;
  body: string;
};

export type BrandFicha = {
  title: string;
  subtitle?: string;
  generatedBy?: string;
  generatedAt?: string;
  sources: string[];
  sections: BrandFichaSection[];
  pendingCount: number;
  referenceCount: number;
};

export async function getBrandFichaSections(slug: string): Promise<BrandFichaSection[]> {
  const ficha = await getBrandFicha(slug);
  return ficha.sections;
}

export async function getBrandFicha(slug: string): Promise<BrandFicha> {
  try {
    const filePath = path.join(process.cwd(), "brands", slug, "ficha-marca.txt");
    const raw = await readFile(filePath, "utf8");
    return parseBrandFicha(raw);
  } catch {
    return emptyBrandFicha();
  }
}

export function parseBrandFicha(raw: string): BrandFicha {
  const parts = raw.split(/═{10,}/g);
  const sections: BrandFichaSection[] = [];
  const header = parseHeader(parts[0] ?? "");

  for (let index = 1; index < parts.length; index += 2) {
    const heading = parts[index]?.trim();
    const body = parts[index + 1]?.trim();
    if (!heading || !body) continue;

    const match = heading.match(/^(\d{1,2})\.\s+(.+)$/m);
    if (!match) continue;

    sections.push({
      n: match[1].padStart(2, "0"),
      title: match[2].trim(),
      body,
    });
  }

  return {
    ...header,
    sections,
    pendingCount: countMatches(raw, /(pendiente|verificar vigencia|requiere validar|requiere insumo)/gi),
    referenceCount: countMatches(raw, /(referencial|fuente|mayo 2026|2025|2026)/gi),
  };
}

function parseHeader(rawHeader: string): Omit<BrandFicha, "sections" | "pendingCount" | "referenceCount"> {
  const lines = rawHeader
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const generated = lines.find((line) => line.includes("Generado por"));
  const generatedMatch = generated?.match(/Generado por\s+(.+?)\s+—\s+(\d{4}-\d{2}-\d{2})/);
  const sourcesLine = lines.find((line) => line.startsWith("Fuentes:"));

  return {
    title: lines[0] ?? "FICHA DE MARCA INTEGRAL",
    subtitle: lines[1]?.startsWith("12 dimensiones") ? undefined : lines[1],
    generatedBy: generatedMatch?.[1],
    generatedAt: generatedMatch?.[2],
    sources: sourcesLine ? splitSources(sourcesLine.replace(/^Fuentes:\s*/, "")) : [],
  };
}

function splitSources(value: string): string[] {
  const sources: string[] = [];
  let current = "";
  let depth = 0;

  for (const char of value) {
    if (char === "(") depth += 1;
    if (char === ")") depth = Math.max(0, depth - 1);

    if (char === "," && depth === 0) {
      if (current.trim()) sources.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  if (current.trim()) sources.push(current.trim());
  return sources;
}

function countMatches(value: string, pattern: RegExp): number {
  return value.match(pattern)?.length ?? 0;
}

function emptyBrandFicha(): BrandFicha {
  return {
    title: "FICHA DE MARCA INTEGRAL",
    sources: [],
    sections: [],
    pendingCount: 0,
    referenceCount: 0,
  };
}
