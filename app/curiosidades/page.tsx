import type { Metadata } from "next";
import { getCuriosidades } from "@/lib/data";

export const metadata: Metadata = {
  title: "Curiosidades · Enciclopedia Slam Dunk",
  description:
    "Datos y curiosidades reales sobre el manga y anime Slam Dunk de Takehiko Inoue.",
};

const COLORES_CATEGORIA: Record<string, string> = {
  Manga: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
  Anime: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  Autor: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  Personajes:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  Cultura:
    "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
};

function chipCategoria(categoria: string): string {
  return (
    COLORES_CATEGORIA[categoria] ??
    "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300"
  );
}

export default function CuriosidadesPage() {
  const curiosidades = getCuriosidades();

  const categorias = [...new Set(curiosidades.map((c) => c.categoria))];

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-2 text-3xl font-black">Curiosidades</h1>
      <p className="mb-6 text-zinc-600 dark:text-zinc-400">
        Datos reales sobre el manga, el anime y su autor, Takehiko Inoue.
      </p>

      <div className="mb-8 flex flex-wrap gap-2">
        {categorias.map((cat) => (
          <span
            key={cat}
            className={`rounded-full px-3 py-1 text-xs font-semibold ${chipCategoria(cat)}`}
          >
            {cat}
          </span>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {curiosidades.map((c) => (
          <article
            key={c.id}
            className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-red-400 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          >
            <span
              className={`mb-3 inline-block w-fit rounded-full px-3 py-1 text-xs font-semibold ${chipCategoria(c.categoria)}`}
            >
              {c.categoria}
            </span>
            <h2 className="text-lg font-bold text-red-700 dark:text-red-400">
              {c.titulo}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              {c.texto}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
