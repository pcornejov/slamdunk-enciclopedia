import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPersonaje,
  getPersonajes,
  getEquipo,
  galeriaPersonaje,
} from "@/lib/data";
import Galeria from "../../components/Galeria";

export function generateStaticParams() {
  return getPersonajes().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPersonaje(slug);
  return {
    title: p ? `${p.nombre} · Slam Dunk` : "Personaje · Slam Dunk",
    description: p?.bio?.slice(0, 150),
  };
}

export default async function PersonajePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getPersonaje(slug);
  if (!p) notFound();

  const equipo = p.equipo ? getEquipo(p.equipo) : undefined;
  const imagenes = galeriaPersonaje(p);

  const datos: [string, string | number | null][] = [
    ["Nombre japonés", p.nombreJp],
    ["Equipo", equipo?.nombre ?? "—"],
    ["Posición", p.posicion],
    ["Dorsal", p.dorsal != null ? `#${p.dorsal}` : "—"],
    ["Altura", p.altura ?? "—"],
    ["Rol", p.rol],
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link
        href="/personajes"
        className="mb-6 inline-block text-sm text-red-700 hover:underline dark:text-red-400"
      >
        ← Volver a personajes
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <Galeria imagenes={imagenes} alt={p.nombre} />

        <div>
          <h1 className="text-3xl font-black">{p.nombre}</h1>
          <p className="mt-1 text-lg text-zinc-500">{p.nombreJp}</p>

          {equipo && (
            <Link
              href={`/equipos/${equipo.slug}`}
              className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold text-white"
              style={{ backgroundColor: equipo.color }}
            >
              {equipo.nombre}
            </Link>
          )}

          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3">
            {datos.map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs uppercase tracking-wide text-zinc-500">
                  {k}
                </dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          {p.bio && (
            <div className="mt-6">
              <h2 className="mb-2 text-lg font-bold">Biografía</h2>
              <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
                {p.bio}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
