import Link from "next/link";
import { getPersonajes, imagenHero } from "@/lib/data";
import TarjetaPersonaje from "./components/TarjetaPersonaje";

const secciones = [
  { href: "/personajes", titulo: "Personajes", desc: "Jugadores, entrenadores y protagonistas." },
  { href: "/equipos", titulo: "Equipos", desc: "Shohoku, Ryonan, Kainan, Sannoh y más." },
  { href: "/arcos", titulo: "Arcos", desc: "La historia, del instituto al nacional." },
  { href: "/manga", titulo: "Manga", desc: "La obra de Takehiko Inoue." },
  { href: "/anime", titulo: "Anime", desc: "Serie, películas y OVAs." },
  { href: "/locaciones", titulo: "Locaciones", desc: "Los escenarios de la historia." },
  { href: "/curiosidades", titulo: "Curiosidades", desc: "Datos reales del manga y su autor." },
];

export default function Home() {
  const destacados = getPersonajes().filter((p) => p.destacado).slice(0, 12);
  const hero = imagenHero();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-red-700 to-red-900 text-white">
        {hero && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-b from-red-900/80 via-red-800/70 to-red-950/90"
              aria-hidden="true"
            />
          </>
        )}
        <div className="relative mx-auto max-w-6xl px-6 py-24 text-center sm:py-28">
          <span className="mb-5 inline-block rounded-full border border-white/30 bg-black/10 px-4 py-1 text-sm font-medium uppercase tracking-widest backdrop-blur-sm">
            #10 · Shohoku
          </span>
          <h1 className="text-4xl font-black tracking-tight drop-shadow-sm sm:text-6xl">
            Enciclopedia Slam Dunk
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-red-50/90">
            Personajes, equipos, arcos argumentales, manga y anime del clásico
            del baloncesto de Takehiko Inoue.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/personajes"
              className="rounded-full bg-white px-6 py-2.5 font-semibold text-red-800 shadow-lg transition hover:bg-red-100"
            >
              Ver personajes
            </Link>
            <Link
              href="/equipos"
              className="rounded-full border border-white/50 px-6 py-2.5 font-semibold backdrop-blur-sm transition hover:bg-white/10"
            >
              Ver equipos
            </Link>
          </div>
          <p className="mt-10 text-sm text-red-200/80">「左手はそえるだけ」</p>
        </div>
      </section>

      {/* Secciones */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-6 text-2xl font-bold">Explora la enciclopedia</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {secciones.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-xl border border-zinc-200 bg-white p-5 transition hover:-translate-y-1 hover:border-red-400 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              <h3 className="text-lg font-bold text-red-700 dark:text-red-400">
                {s.titulo}
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {s.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Personajes destacados */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Personajes destacados</h2>
          <Link
            href="/personajes"
            className="text-sm font-medium text-red-700 hover:underline dark:text-red-400"
          >
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {destacados.map((p) => (
            <TarjetaPersonaje key={p.slug} p={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
