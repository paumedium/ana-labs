import { redirect } from "next/navigation";

export default async function BrandIndex({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  redirect(`/marcas/${code}/cover`);
}
