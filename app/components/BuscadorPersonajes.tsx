"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export interface PersonajeBuscador {
  slug: string;
  nombre: string;
  equipo: string | null;
  equipoNombre: string | null;
  equipoColor: string | null;
  posicion: string;
  dorsal: number | null;
  imagen: string;
}

export interface EquipoBuscador {
  slug: string;
  nombre: string;
}

export default function BuscadorPersonajes({
  personajes,
  equipos,
}: {
  personajes: PersonajeBuscador[];
  equipos: EquipoBuscador[];
}) {
  const [texto, setTexto] = useState("");
  const [equipoActivo, setEquipoActivo] = useState<string | null>(null);

  const filtrados = useMemo(() => {
    const q = texto.trim().toLowerCase();
    return personajes.filter((p) => {
      const coincideTexto = q === "" || p.nombre.toLowerCase().includes(q);
      const coincideEquipo = equipoActivo === null || p.equipo === equipoActivo;
      return coincideTexto && coincideEquipo;
    });
  }, [personajes, texto, equipoActivo]);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4">
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Buscar por nombre…"
          aria-label="Buscar personaje por nombre"
          className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 shadow-sm outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setEquipoActivo(null)}
            aria-pressed={equipoActivo === null}
            className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
              equipoActivo === null
                ? "border-red-600 bg-red-600 text-white"
                : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
            }`}
          >
            Todos
          </button>
          {equipos.map((eq) => {
            const activo = equipoActivo === eq.slug;
            return (
              <button
                key={eq.slug}
                type="button"
                onClick={() => setEquipoActivo(eq.slug)}
                aria-pressed={activo}
                className={`rounded-full border px-3 py-1 text-sm font-medium transition ${
                  activo
                    ? "border-red-600 bg-red-600 text-white"
                    : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                }`}
              >
                {eq.nombre}
              </button>
            );
          })}
        </div>
      </div>

      {filtrados.length === 0 ? (
        <p className="rounded-lg border border-dashed border-zinc-300 py-12 text-center text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
          No se encontraron personajes con esos filtros.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {filtrados.map((p) => (
            <Link
              key={p.slug}
              href={`/personajes/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="aspect-[3/4] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1 p-3">
                <h3 className="font-bold leading-tight text-zinc-900 dark:text-zinc-50">
                  {p.nombre}
                </h3>
                {p.equipoNombre && (
                  <span className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                    {p.equipoColor && (
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: p.equipoColor }}
                      />
                    )}
                    {p.equipoNombre}
                  </span>
                )}
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {p.posicion}
                </p>
                {p.dorsal != null && (
                  <span className="mt-auto inline-block w-fit rounded bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-900/40 dark:text-red-200">
                    #{p.dorsal}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
