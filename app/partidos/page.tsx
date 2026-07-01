import type { Metadata } from "next";
import Link from "next/link";
import { getEquipo, getPartidos, imagenSeccion } from "@/lib/data";
import CabeceraSeccion from "../components/CabeceraSeccion";

export const metadata: Metadata = {
  title: "Partidos clave · Enciclopedia Slam Dunk",
  description:
    "Los partidos más decisivos de Shohoku, del torneo de Kanagawa al campeonato nacional.",
};

export default function PartidosPage() {
  const partidos = getPartidos();

  return (
    <>
      <CabeceraSeccion
        titulo="Partidos clave"
        subtitulo="Los enfrentamientos que definieron el camino de Shohoku."
        imagen={imagenSeccion("partidos")}
      />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <ul className="flex flex-col gap-4">
        {partidos.map((p) => {
          const local = getEquipo(p.local);
          const visitante = getEquipo(p.visitante);
          return (
            <li key={p.slug}>
              <Link
                href={`/partidos/${p.slug}`}
                className="group block rounded-xl border border-zinc-200 p-5 transition-colors hover:border-red-400 dark:border-zinc-800 dark:hover:border-red-500"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-red-600">
                  {p.torneo}
                </span>
                <h2 className="mt-1 text-lg font-bold group-hover:text-red-700 dark:group-hover:text-red-400">
                  {p.titulo}
                </h2>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {local && (
                    <span
                      className="rounded-full px-3 py-1 text-sm font-semibold text-white"
                      style={{ backgroundColor: local.color }}
                    >
                      {local.nombre}
                    </span>
                  )}
                  <span className="text-sm font-bold text-zinc-500">vs</span>
                  {visitante && (
                    <span
                      className="rounded-full px-3 py-1 text-sm font-semibold text-white"
                      style={{ backgroundColor: visitante.color }}
                    >
                      {visitante.nombre}
                    </span>
                  )}
                  {p.resultado && (
                    <span className="ml-auto text-sm font-bold text-zinc-700 dark:text-zinc-300">
                      {p.resultado}
                    </span>
                  )}
                </div>

                <p className="mt-3 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {p.resumen}
                </p>
              </Link>
            </li>
          );
          })}
        </ul>
      </div>
    </>
  );
}
