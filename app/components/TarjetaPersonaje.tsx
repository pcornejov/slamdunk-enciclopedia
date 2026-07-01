import Link from "next/link";
import { imagenPersonaje, type Personaje } from "@/lib/data";

export default function TarjetaPersonaje({ p }: { p: Personaje }) {
  return (
    <Link
      href={`/personajes/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="aspect-[3/4] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imagenPersonaje(p)}
          alt={p.nombre}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h3 className="font-bold leading-tight text-zinc-900 dark:text-zinc-50">
          {p.nombre}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{p.posicion}</p>
        {p.dorsal != null && (
          <span className="mt-auto inline-block w-fit rounded bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-900/40 dark:text-red-200">
            #{p.dorsal}
          </span>
        )}
      </div>
    </Link>
  );
}
