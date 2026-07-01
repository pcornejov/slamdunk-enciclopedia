// Acceso a la "base de datos" en JSON de la enciclopedia.
// Se lee en tiempo de build (Server Components + export estático).
//
// Contrato de imágenes: `data/imagenes.json` es propiedad del Agente de Imágenes.
// Aquí se FUSIONA con los datos: si un slug tiene entrada en el manifiesto, esa
// imagen gana; si no, se usa como respaldo la imagen de Jikan (por malId).

import { readFileSync } from "node:fs";
import { join } from "node:path";

const DATA_DIR = join(process.cwd(), "data");

function leerJson<T>(archivo: string, respaldo: T): T {
  try {
    return JSON.parse(readFileSync(join(DATA_DIR, archivo), "utf8")) as T;
  } catch {
    return respaldo;
  }
}

// ---------- Tipos ----------

export interface Personaje {
  slug: string;
  nombre: string;
  nombreJp: string;
  equipo: string | null;
  posicion: string;
  dorsal: number | null;
  altura: string | null;
  rol: string;
  malId: number | null;
  destacado: boolean;
  bio: string;
}

export interface Equipo {
  slug: string;
  nombre: string;
  nombreJp: string;
  color: string;
  prefectura: string;
  descripcion: string;
  destacado: boolean;
}

export interface Arco {
  slug: string;
  titulo: string;
  orden: number;
  resumen: string;
  equipos?: string[];
}

export interface Partido {
  slug: string;
  titulo: string;
  torneo: string;
  local: string;
  visitante: string;
  resultado: string;
  orden: number;
  resumen: string;
  arco?: string;
}

export interface Locacion {
  slug: string;
  nombre: string;
  descripcion: string;
}

export interface Curiosidad {
  id: string;
  categoria: string;
  titulo: string;
  texto: string;
}

export interface ImagenEntrada {
  principal?: string;
  galeria?: string[];
  fuente?: string;
  alt?: string;
}

interface ManifiestoImagenes {
  personajes: Record<string, ImagenEntrada>;
  equipos: Record<string, ImagenEntrada>;
  locaciones: Record<string, ImagenEntrada>;
  ui?: {
    hero?: ImagenEntrada;
    banners?: Record<string, ImagenEntrada>;
  };
}

interface RawPersonaje {
  malId: number;
  imagen?: string;
}

// ---------- Carga cruda ----------

const manifiesto = leerJson<ManifiestoImagenes>("imagenes.json", {
  personajes: {},
  equipos: {},
  locaciones: {},
});

const rawPersonajes = leerJson<RawPersonaje[]>("_raw/personajes.json", []);
const rawPorMalId = new Map(rawPersonajes.map((p) => [p.malId, p]));

// Imagen placeholder si no hay ninguna fuente disponible.
export const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='420'><rect width='100%' height='100%' fill='#7f1d1d'/><text x='50%' y='50%' fill='#fca5a5' font-family='sans-serif' font-size='20' text-anchor='middle'>Sin imagen</text></svg>`,
  );

// ---------- API pública ----------

export function getPersonajes(): Personaje[] {
  return leerJson<Personaje[]>("personajes.json", []);
}

export function getPersonaje(slug: string): Personaje | undefined {
  return getPersonajes().find((p) => p.slug === slug);
}

export function getEquipos(): Equipo[] {
  return leerJson<Equipo[]>("equipos.json", []);
}

export function getEquipo(slug: string): Equipo | undefined {
  return getEquipos().find((e) => e.slug === slug);
}

export function getPersonajesDeEquipo(equipoSlug: string): Personaje[] {
  return getPersonajes().filter((p) => p.equipo === equipoSlug);
}

export function getArcos(): Arco[] {
  return leerJson<Arco[]>("arcos.json", []).sort((a, b) => a.orden - b.orden);
}

export function getArco(slug: string): Arco | undefined {
  return getArcos().find((a) => a.slug === slug);
}

export function getPartidos(): Partido[] {
  return leerJson<Partido[]>("partidos.json", []).sort(
    (a, b) => a.orden - b.orden,
  );
}

export function getPartido(slug: string): Partido | undefined {
  return getPartidos().find((p) => p.slug === slug);
}

export function getLocaciones(): Locacion[] {
  return leerJson<Locacion[]>("locaciones.json", []);
}

export function getCuriosidades(): Curiosidad[] {
  return leerJson<Curiosidad[]>("curiosidades.json", []);
}

// Anime / Manga: objetos libres, se tipan de forma laxa donde se usen.
export function getAnime(): Record<string, unknown> {
  return leerJson<Record<string, unknown>>("_raw/anime.json", {});
}

export function getManga(): Record<string, unknown> {
  return leerJson<Record<string, unknown>>("manga.json", {});
}

// ---------- Imágenes fusionadas ----------

/** Imagen principal de un personaje: manifiesto → Jikan (raw) → placeholder. */
export function imagenPersonaje(p: Pick<Personaje, "slug" | "malId">): string {
  const m = manifiesto.personajes[p.slug];
  if (m?.principal) return m.principal;
  if (p.malId != null) {
    const raw = rawPorMalId.get(p.malId);
    if (raw?.imagen) return raw.imagen;
  }
  return PLACEHOLDER;
}

/** Galería de un personaje (incluye la principal como primer elemento). */
export function galeriaPersonaje(
  p: Pick<Personaje, "slug" | "malId">,
): string[] {
  const m = manifiesto.personajes[p.slug];
  const urls = new Set<string>();
  if (m?.principal) urls.add(m.principal);
  for (const g of m?.galeria ?? []) urls.add(g);
  const principal = imagenPersonaje(p);
  if (urls.size === 0 && principal !== PLACEHOLDER) urls.add(principal);
  return [...urls];
}

/** Imagen de un equipo: manifiesto → placeholder. */
export function imagenEquipo(slug: string): string {
  return manifiesto.equipos[slug]?.principal ?? PLACEHOLDER;
}

/** Imagen de una locación: manifiesto → placeholder. */
export function imagenLocacion(slug: string): string {
  return manifiesto.locaciones[slug]?.principal ?? PLACEHOLDER;
}

/** Imagen de fondo del hero de la home. `null` si aún no existe. */
export function imagenHero(): string | null {
  return manifiesto.ui?.hero?.principal ?? null;
}

/** Banner de cabecera de un equipo. `null` si aún no existe. */
export function bannerEquipo(slug: string): string | null {
  return manifiesto.ui?.banners?.[slug]?.principal ?? null;
}
