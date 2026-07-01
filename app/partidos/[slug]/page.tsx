import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArco, getEquipo, getPartido, getPartidos } from "@/lib/data";

export function generateStaticParams() {
  return getPartidos().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPartido(slug);
  return {
    title: p ? `${p.titulo} · Slam Dunk` : "Partido · Slam Dunk",
    description: p?.resumen?.slice(0, 150),
  };
}

export default async function PartidoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const partido = getPartido(slug);
  if (!partido) notFound();

  const local = getEquipo(partido.local);
  const visitante = getEquipo(partido.visitante);
  const arco = partido.arco ? getArco(partido.arco) : undefined;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link
        href="/partidos"
        className="mb-6 inline-block text-sm text-red-700 hover:underline dark:text-red-400"
      >
        ← Volver a los partidos
      </Link>

      <span className="text-sm font-semibold text-red-600">
        {partido.torneo}
      </span>
      <h1 className="mt-1 text-3xl font-black">{partido.titulo}</h1>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {local && (
          <Link
            href={`/equipos/${local.slug}`}
            className="rounded-full px-4 py-1.5 text-sm font-semibold text-white"
            style={{ backgroundColor: local.color }}
          >
            {local.nombre}
          </Link>
        )}
        <span className="text-sm font-bold text-zinc-500">vs</span>
        {visitante && (
          <Link
            href={`/equipos/${visitante.slug}`}
            className="rounded-full px-4 py-1.5 text-sm font-semibold text-white"
            style={{ backgroundColor: visitante.color }}
          >
            {visitante.nombre}
          </Link>
        )}
      </div>

      {partido.resultado && (
        <p className="mt-4 text-xl font-black text-zinc-800 dark:text-zinc-100">
          {partido.resultado}
        </p>
      )}

      <p className="mt-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
        {partido.resumen}
      </p>

      {arco && (
        <div className="mt-8">
          <h2 className="mb-3 text-sm uppercase tracking-wide text-zinc-500">
            Arco relacionado
          </h2>
          <Link
            href={`/arcos/${arco.slug}`}
            className="inline-block rounded-full bg-red-600 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            {arco.titulo}
          </Link>
        </div>
      )}
    </div>
  );
}
