import type { Metadata } from "next";
import { getManga } from "@/lib/data";

export const metadata: Metadata = {
  title: "Manga · Enciclopedia Slam Dunk",
  description: "El manga de Slam Dunk, obra de Takehiko Inoue.",
};

export default function MangaPage() {
  const m = getManga() as {
    titulo?: string;
    tituloJp?: string;
    autor?: string;
    revista?: string;
    editorial?: string;
    publicacionDesde?: string;
    publicacionHasta?: string;
    tomos?: number;
    capitulos?: number;
    generos?: string[];
    sinopsis?: string;
    legado?: string;
  };

  const fichas: [string, string | number | undefined][] = [
    ["Autor", m.autor],
    ["Revista", m.revista],
    ["Editorial", m.editorial],
    ["Publicación", m.publicacionDesde ? `${m.publicacionDesde}–${m.publicacionHasta}` : undefined],
    ["Tomos", m.tomos],
    ["Capítulos", m.capitulos],
  ];

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-black">{m.titulo ?? "Manga"}</h1>
      <p className="mt-1 text-lg text-zinc-500">{m.tituloJp}</p>

      <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {fichas.map(([k, v]) => (
          <div
            key={k}
            className="rounded-lg border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <dt className="text-xs uppercase tracking-wide text-zinc-500">
              {k}
            </dt>
            <dd className="mt-1 font-semibold">{v ?? "—"}</dd>
          </div>
        ))}
      </dl>

      {m.generos && (
        <div className="mt-6 flex flex-wrap gap-2">
          {m.generos.map((g) => (
            <span
              key={g}
              className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800 dark:bg-red-900/40 dark:text-red-200"
            >
              {g}
            </span>
          ))}
        </div>
      )}

      {m.sinopsis && (
        <section className="mt-10">
          <h2 className="mb-2 text-xl font-bold">Sinopsis</h2>
          <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
            {m.sinopsis}
          </p>
        </section>
      )}

      {m.legado && (
        <section className="mt-8">
          <h2 className="mb-2 text-xl font-bold">Legado</h2>
          <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
            {m.legado}
          </p>
        </section>
      )}
    </div>
  );
}
