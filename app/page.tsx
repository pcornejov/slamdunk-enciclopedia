export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-b from-red-700 to-red-900 text-white">
      <main className="flex w-full max-w-3xl flex-col items-center gap-6 px-8 py-32 text-center">
        <span className="rounded-full border border-white/30 px-4 py-1 text-sm uppercase tracking-widest">
          #10 · Shohoku
        </span>
        <h1 className="text-5xl font-black tracking-tight sm:text-6xl">
          Enciclopedia Slam Dunk
        </h1>
        <p className="max-w-md text-lg text-red-100">
          Personajes, equipos, arcos argumentales, manga y anime. En
          construcción — el contenido irá creciendo de forma incremental.
        </p>
        <p className="text-sm text-red-200/80">
          「左手はそえるだけ」
        </p>
      </main>
    </div>
  );
}
