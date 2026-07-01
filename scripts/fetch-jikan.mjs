// Descarga datos crudos de Slam Dunk desde la API de Jikan (MyAnimeList).
// Uso: node scripts/fetch-jikan.mjs
//
// Genera:
//   data/_raw/anime.json        -> serie TV + películas + OVAs (búsqueda)
//   data/_raw/personajes.json   -> lista de personajes con id, nombre, rol e imagen principal
//
// La API de Jikan limita a ~3 req/s. Usamos un throttle de ~400ms entre llamadas.

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ANIME_ID = 170; // Slam Dunk (serie TV) en MyAnimeList
const RAW_DIR = join(process.cwd(), "data", "_raw");
const THROTTLE_MS = 450;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function jikan(path) {
  const url = `https://api.jikan.moe/v4${path}`;
  for (let intento = 1; intento <= 4; intento++) {
    const res = await fetch(url);
    if (res.status === 429) {
      // Rate limit: esperar más y reintentar.
      await sleep(THROTTLE_MS * intento * 3);
      continue;
    }
    if (!res.ok) throw new Error(`Jikan ${res.status} en ${path}`);
    await sleep(THROTTLE_MS);
    return res.json();
  }
  throw new Error(`Jikan agotó reintentos en ${path}`);
}

async function main() {
  await mkdir(RAW_DIR, { recursive: true });

  console.log("→ Info del anime (serie TV)…");
  const anime = (await jikan(`/anime/${ANIME_ID}/full`)).data;

  console.log("→ Búsqueda de películas y OVAs…");
  const busqueda = (await jikan(`/anime?q=slam%20dunk&limit=25`)).data;

  const animeOut = {
    serie: {
      malId: anime.mal_id,
      titulo: anime.title,
      tituloJp: anime.title_japanese,
      tipo: anime.type,
      episodios: anime.episodes,
      estado: anime.status,
      emitidoDesde: anime.aired?.from,
      emitidoHasta: anime.aired?.to,
      estudios: (anime.studios || []).map((s) => s.name),
      sinopsis: anime.synopsis,
      imagen: anime.images?.jpg?.large_image_url,
      url: anime.url,
    },
    relacionados: busqueda
      .filter((a) => a.mal_id !== ANIME_ID)
      .map((a) => ({
        malId: a.mal_id,
        titulo: a.title,
        tipo: a.type,
        episodios: a.episodes,
        anio: a.year,
        imagen: a.images?.jpg?.image_url,
        url: a.url,
      })),
  };
  await writeFile(
    join(RAW_DIR, "anime.json"),
    JSON.stringify(animeOut, null, 2),
    "utf8",
  );
  console.log(`  ✓ anime.json (${animeOut.relacionados.length} relacionados)`);

  console.log("→ Personajes…");
  const personajes = (await jikan(`/anime/${ANIME_ID}/characters`)).data;
  const persOut = personajes
    .map((c) => ({
      malId: c.character.mal_id,
      nombreOriginal: c.character.name, // formato "Apellido, Nombre"
      rol: c.role,
      favoritos: c.favorites,
      imagen: c.character.images?.jpg?.image_url,
      url: c.character.url,
    }))
    .sort((a, b) => b.favoritos - a.favoritos);
  await writeFile(
    join(RAW_DIR, "personajes.json"),
    JSON.stringify(persOut, null, 2),
    "utf8",
  );
  console.log(`  ✓ personajes.json (${persOut.length} personajes)`);

  console.log("Listo.");
}

main().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});
