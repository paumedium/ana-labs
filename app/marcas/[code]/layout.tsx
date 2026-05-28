import { notFound } from "next/navigation";
import { getBrand } from "@/lib/data";
import { SiteFooter } from "@/components/site-footer";

export default async function BrandLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const brand = await getBrand(code);
  if (!brand) notFound();

  return (
    <>
      <div className="flex-1 flex flex-col">{children}</div>
      <SiteFooter />
    </>
  );
}
