import { redirect } from "next/navigation";

export default async function Page({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const sp = await searchParams;
  const q = sp.lang === "es" ? "?lang=es" : "";
  redirect(`/nail-match${q}`);
}
