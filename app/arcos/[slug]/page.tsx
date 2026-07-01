import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArco, getArcos, getEquipo } from "@/lib/data";

export function generateStaticParams() {
  return getArcos().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArco(slug);
  return {
    title: a ? `${a.titulo} · Slam Dunk` : "Arco · Slam Dunk",
    description: a?.resumen?.slice(0, 150),
  };
}

export default async function ArcoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const arco = getArco(slug);
  if (!arco) notFound();

  const equipos = (arco.equipos ?? [])
    .map((s) => getEquipo(s))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link
        href="/arcos"
        className="mb-6 inline-block text-sm text-red-700 hover:underline dark:text-red-400"
      >
        ← Volver a los arcos
      </Link>

      <span className="text-sm font-semibold text-red-600">
        Arco {arco.orden}
      </span>
      <h1 className="mt-1 text-3xl font-black">{arco.titulo}</h1>

      <p className="mt-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
        {arco.resumen}
      </p>

      {equipos.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-sm uppercase tracking-wide text-zinc-500">
            Equipos involucrados
          </h2>
          <div className="flex flex-wrap gap-2">
            {equipos.map((e) => (
              <Link
                key={e.slug}
                href={`/equipos/${e.slug}`}
                className="rounded-full px-3 py-1 text-sm font-semibold text-white"
                style={{ backgroundColor: e.color }}
              >
                {e.nombre}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
