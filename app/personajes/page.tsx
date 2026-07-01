import type { Metadata } from "next";
import { getEquipos, getPersonajesDeEquipo } from "@/lib/data";
import TarjetaPersonaje from "../components/TarjetaPersonaje";

export const metadata: Metadata = {
  title: "Personajes · Enciclopedia Slam Dunk",
  description: "Todos los personajes de Slam Dunk agrupados por equipo.",
};

export default function PersonajesPage() {
  const equipos = getEquipos();

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="mb-2 text-3xl font-black">Personajes</h1>
      <p className="mb-8 text-zinc-600 dark:text-zinc-400">
        Jugadores, entrenadores y protagonistas, organizados por equipo.
      </p>

      <div className="flex flex-col gap-12">
        {equipos.map((eq) => {
          const jugadores = getPersonajesDeEquipo(eq.slug);
          if (jugadores.length === 0) return null;
          return (
            <section key={eq.slug}>
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="h-5 w-5 rounded-full"
                  style={{ backgroundColor: eq.color }}
                />
                <h2 className="text-xl font-bold">{eq.nombre}</h2>
                <span className="text-sm text-zinc-500">{eq.nombreJp}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {jugadores.map((p) => (
                  <TarjetaPersonaje key={p.slug} p={p} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
