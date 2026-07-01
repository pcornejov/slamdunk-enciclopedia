import type { Metadata } from "next";
import Link from "next/link";
import { getArcos } from "@/lib/data";

export const metadata: Metadata = {
  title: "Arcos argumentales · Enciclopedia Slam Dunk",
  description: "La historia de Slam Dunk, del instituto al campeonato nacional.",
};

export default function ArcosPage() {
  const arcos = getArcos();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="mb-2 text-3xl font-black">Arcos argumentales</h1>
      <p className="mb-8 text-zinc-600 dark:text-zinc-400">
        El recorrido de Shohoku, paso a paso.
      </p>

      <ol className="relative border-l-2 border-red-200 dark:border-red-900/50">
        {arcos.map((a) => (
          <li key={a.slug} className="mb-8 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
              {a.orden}
            </span>
            <Link href={`/arcos/${a.slug}`} className="group">
              <h2 className="text-lg font-bold group-hover:text-red-700 dark:group-hover:text-red-400">
                {a.titulo}
              </h2>
              <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                {a.resumen}
              </p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
