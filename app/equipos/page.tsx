import type { Metadata } from "next";
import Link from "next/link";
import { getEquipos, getPersonajesDeEquipo } from "@/lib/data";

export const metadata: Metadata = {
  title: "Equipos · Enciclopedia Slam Dunk",
  description: "Los institutos y equipos de baloncesto de Slam Dunk.",
};

export default function EquiposPage() {
  const equipos = getEquipos();

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-2 text-3xl font-black">Equipos</h1>
      <p className="mb-8 text-zinc-600 dark:text-zinc-400">
        Los institutos que compiten por el campeonato nacional.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {equipos.map((eq) => {
          const n = getPersonajesDeEquipo(eq.slug).length;
          return (
            <Link
              key={eq.slug}
              href={`/equipos/${eq.slug}`}
              className="overflow-hidden rounded-xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="h-2" style={{ backgroundColor: eq.color }} />
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{eq.nombre}</h2>
                  <span className="text-sm text-zinc-500">{eq.nombreJp}</span>
                </div>
                <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500">
                  {eq.prefectura} · {n} personajes
                </p>
                <p className="mt-3 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {eq.descripcion}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
