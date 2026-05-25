export type Brand = {
  code: string;
  name: string;
  crs: number;
  assets: number;
  users: number;
  socials: { web?: string; instagram?: string; facebook?: string; tiktok?: string; linkedin?: string };
};

export const brands: Brand[] = [
  {
    code: "VPM",
    name: "Vermouth Pedro y Mateo",
    crs: 0,
    assets: 0,
    users: 1,
    socials: {},
  },
  {
    code: "DRV",
    name: "Driven",
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
  usuariosTotal: 1,
  crsTotal: 0,
};
