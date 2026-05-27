import { readFile } from "node:fs/promises";
import path from "node:path";

export type BrandFichaSection = {
  n: string;
  title: string;
  body: string;
};

export async function getBrandFichaSections(slug: string): Promise<BrandFichaSection[]> {
  try {
    const filePath = path.join(process.cwd(), "brands", slug, "ficha-marca.txt");
    const raw = await readFile(filePath, "utf8");
    return parseBrandFicha(raw);
  } catch {
    return [];
  }
}

export function parseBrandFicha(raw: string): BrandFichaSection[] {
  const parts = raw.split(/═{10,}/g);
  const sections: BrandFichaSection[] = [];

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

  return sections;
}
