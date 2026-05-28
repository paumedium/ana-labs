import { requireUser } from "@/lib/auth";

export default async function MarcasLayout({ children }: { children: React.ReactNode }) {
  await requireUser();
  return children;
}
