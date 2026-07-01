import type { Metadata } from "next";
import { getAnime } from "@/lib/data";

export const metadata: Metadata = {
  title: "Anime · Enciclopedia Slam Dunk",
  description: "La serie de anime de Slam Dunk, sus películas y OVAs.",
};

interface Serie {
  titulo?: string;
  tituloJp?: string;
  tipo?: string;
  episodios?: number;
  estado?: string;
  emitidoDesde?: string;
  emitidoHasta?: string;
  estudios?: string[];
  sinopsis?: string;
  imagen?: string;
}

interface Relacionado {
  malId: number;
  titulo: string;
  tipo?: string;
  episodios?: number;
  anio?: number;
  imagen?: string;
}

function anio(fecha?: string) {
  return fecha ? new Date(fecha).getFullYear() : undefined;
}

export default function AnimePage() {
  const data = getAnime() as { serie?: Serie; relacionados?: Relacionado[] };
  const serie = data.serie ?? {};
  const relacionados = (data.relacionados ?? []).filter((r) => r.imagen);

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="mb-8 text-3xl font-black">Anime</h1>

      {/* Serie principal */}
      <section className="grid gap-6 md:grid-cols-[220px_1fr]">
        {serie.imagen && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={serie.imagen}
            alt={serie.titulo ?? "Slam Dunk"}
            className="w-full rounded-xl border border-zinc-200 object-cover dark:border-zinc-800"
          />
        )}
        <div>
          <h2 className="text-2xl font-bold">{serie.titulo}</h2>
          <p className="text-zinc-500">{serie.tituloJp}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            {serie.tipo && (
              <span className="rounded bg-zinc-200 px-2 py-0.5 dark:bg-zinc-800">
                {serie.tipo}
              </span>
            )}
            {serie.episodios != null && (
              <span className="rounded bg-zinc-200 px-2 py-0.5 dark:bg-zinc-800">
                {serie.episodios} episodios
              </span>
            )}
            {(anio(serie.emitidoDesde) || anio(serie.emitidoHasta)) && (
              <span className="rounded bg-zinc-200 px-2 py-0.5 dark:bg-zinc-800">
                {anio(serie.emitidoDesde)}–{anio(serie.emitidoHasta)}
              </span>
            )}
          </div>
          {serie.estudios && serie.estudios.length > 0 && (
            <p className="mt-2 text-sm text-zinc-500">
              Estudio: {serie.estudios.join(", ")}
            </p>
          )}
          {serie.sinopsis && (
            <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {serie.sinopsis}
            </p>
          )}
        </div>
      </section>

      {/* Películas y OVAs */}
      {relacionados.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold">Películas y OVAs</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {relacionados.map((r) => (
              <div
                key={r.malId}
                className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="aspect-[3/4] bg-zinc-100 dark:bg-zinc-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.imagen}
                    alt={r.titulo}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold leading-tight">
                    {r.titulo}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-500">
                    {r.tipo}
                    {r.anio ? ` · ${r.anio}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
