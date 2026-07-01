import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const enlaces = [
  { href: "/", texto: "Inicio" },
  { href: "/personajes", texto: "Personajes" },
  { href: "/equipos", texto: "Equipos" },
  { href: "/arcos", texto: "Arcos" },
  { href: "/partidos", texto: "Partidos" },
  { href: "/manga", texto: "Manga" },
  { href: "/anime", texto: "Anime" },
  { href: "/locaciones", texto: "Locaciones" },
  { href: "/curiosidades", texto: "Curiosidades" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-red-900/40 bg-red-800 text-white shadow-md">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3">
        <Link href="/" className="text-lg font-black tracking-tight">
          🏀 Enciclopedia <span className="text-red-200">Slam Dunk</span>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <ul className="flex flex-wrap gap-1 text-sm font-medium">
            {enlaces.map((e) => (
              <li key={e.href}>
                <Link
                  href={e.href}
                  className="rounded-full px-3 py-1.5 transition-colors hover:bg-red-700"
                >
                  {e.texto}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
