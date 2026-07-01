import type { Metadata } from "next";
import {
  getEquipos,
  getPersonajes,
  getEquipo,
  imagenPersonaje,
  imagenSeccion,
} from "@/lib/data";
import BuscadorPersonajes, {
  type PersonajeBuscador,
} from "../components/BuscadorPersonajes";
import CabeceraSeccion from "../components/CabeceraSeccion";

export const metadata: Metadata = {
  title: "Personajes · Enciclopedia Slam Dunk",
  description: "Busca y filtra a todos los personajes de Slam Dunk.",
};

export default function PersonajesPage() {
  const equipos = getEquipos();

  const personajes: PersonajeBuscador[] = getPersonajes().map((p) => {
    const eq = p.equipo ? getEquipo(p.equipo) : undefined;
    return {
      slug: p.slug,
      nombre: p.nombre,
      equipo: p.equipo,
      equipoNombre: eq?.nombre ?? null,
      equipoColor: eq?.color ?? null,
      posicion: p.posicion,
      dorsal: p.dorsal,
      imagen: imagenPersonaje(p),
    };
  });

  const equiposFiltro = equipos.map((e) => ({ slug: e.slug, nombre: e.nombre }));

  return (
    <>
      <CabeceraSeccion
        titulo="Personajes"
        subtitulo="Jugadores, entrenadores y protagonistas. Busca por nombre o filtra por equipo."
        imagen={imagenSeccion("personajes")}
      />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <BuscadorPersonajes personajes={personajes} equipos={equiposFiltro} />
      </div>
    </>
  );
}
