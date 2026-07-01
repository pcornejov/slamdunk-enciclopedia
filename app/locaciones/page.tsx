import type { Metadata } from "next";
import { getLocaciones, imagenLocacion, PLACEHOLDER } from "@/lib/data";

export const metadata: Metadata = {
  title: "Locaciones · Enciclopedia Slam Dunk",
  description: "Los escenarios de Slam Dunk.",
};

export default function LocacionesPage() {
  const locaciones = getLocaciones();

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="mb-2 text-3xl font-black">Locaciones</h1>
      <p className="mb-8 text-zinc-600 dark:text-zinc-400">
        Los lugares donde transcurre la historia.
      </p>

      <div className="flex flex-col gap-5">
        {locaciones.map((l) => {
          const img = imagenLocacion(l.slug);
          return (
            <article
              key={l.slug}
              className="flex flex-col gap-4 overflow-hidden rounded-xl border border-zinc-200 bg-white sm:flex-row dark:border-zinc-800 dark:bg-zinc-900"
            >
              {img !== PLACEHOLDER && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={img}
                  alt={l.nombre}
                  className="h-40 w-full object-cover sm:w-56"
                />
              )}
              <div className="p-5">
                <h2 className="text-xl font-bold">{l.nombre}</h2>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {l.descripcion}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
