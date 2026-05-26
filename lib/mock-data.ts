export type Brand = {
  code: string;
  name: string;
  slug: string;
  slogan?: string;
  crs: number;
  assets: number;
  users: number;
  socials: { web?: string; instagram?: string; facebook?: string; tiktok?: string; linkedin?: string; whatsapp?: string };
  parent?: string;
};

export const brands: Brand[] = [
  {
    code: "VPM",
    name: "Vermouth Pedro y Mateo",
    slug: "vermouth-pedro-y-mateo",
    slogan: "Pedro y Mateo. El antes.",
    parent: "Casa Sarria",
    crs: 0,
    assets: 0,
    users: 2,
    socials: {
      instagram: "https://instagram.com/vermouthpedroymateo",
      whatsapp: "https://wa.me/5492477329612",
    },
  },
  {
    code: "DRV",
    name: "Driven",
    slug: "driven",
    slogan: "Equipate para todo",
    crs: 0,
    assets: 1,
    users: 1,
    socials: {
      web: "https://driven.com.ar",
      instagram: "https://instagram.com/driven.ar",
      facebook: "https://facebook.com/driven.ar",
      tiktok: "https://tiktok.com/@driven.ar",
    },
  },
];

export function getBrand(code: string): Brand | undefined {
  return brands.find((b) => b.code.toLowerCase() === code.toLowerCase());
}

export const stats = {
  requerimientosActivas: 0,
  usuariosTotal: 2,
  crsTotal: 0,
};
