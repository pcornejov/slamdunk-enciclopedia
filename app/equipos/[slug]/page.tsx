import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  bannerEquipo,
  getEquipo,
  getEquipos,
  getPersonajesDeEquipo,
} from "@/lib/data";
import TarjetaPersonaje from "../../components/TarjetaPersonaje";

export function generateStaticParams() {
  return getEquipos().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = getEquipo(slug);
  return {
    title: e ? `${e.nombre} · Slam Dunk` : "Equipo · Slam Dunk",
    description: e?.descripcion?.slice(0, 150),
  };
}

export default async function EquipoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const equipo = getEquipo(slug);
  if (!equipo) notFound();

  const jugadores = getPersonajesDeEquipo(equipo.slug);
  const banner = bannerEquipo(equipo.slug);

  return (
    <div>
      <div
        className="relative overflow-hidden text-white"
        style={{ backgroundColor: equipo.color }}
      >
        {banner && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={banner}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0 opacity-80 mix-blend-multiply"
              style={{ backgroundColor: equipo.color }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
              aria-hidden="true"
            />
          </>
        )}
        <div className="relative mx-auto max-w-6xl px-6 py-14">
          <Link
            href="/equipos"
            className="mb-4 inline-block text-sm text-white/80 hover:underline"
          >
            ← Volver a equipos
          </Link>
          <h1 className="text-4xl font-black drop-shadow-sm">{equipo.nombre}</h1>
          <p className="mt-1 text-lg text-white/80">
            {equipo.nombreJp} · {equipo.prefectura}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="max-w-3xl leading-relaxed text-zinc-700 dark:text-zinc-300">
          {equipo.descripcion}
        </p>

        <h2 className="mb-4 mt-10 text-2xl font-bold">Plantilla</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {jugadores.map((p) => (
            <TarjetaPersonaje key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
