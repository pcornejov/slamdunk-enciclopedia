// Cabecera reutilizable para las páginas de listado.
// Renderiza una banda apaisada con imagen de fondo + overlay rojo/oscuro y el
// título encima. Si `imagen` es null, degrada a un fondo de gradiente rojo.

export default function CabeceraSeccion({
  titulo,
  subtitulo,
  imagen,
}: {
  titulo: string;
  subtitulo?: string;
  imagen?: string | null;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-700 to-red-950 text-white">
      {imagen && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imagen}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-red-950/90 via-red-900/70 to-red-800/60"
            aria-hidden="true"
          />
        </>
      )}
      <div className="relative mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <h1 className="text-3xl font-black tracking-tight drop-shadow-sm sm:text-5xl">
          {titulo}
        </h1>
        {subtitulo && (
          <p className="mt-3 max-w-2xl text-base text-red-50/90 sm:text-lg">
            {subtitulo}
          </p>
        )}
      </div>
    </section>
  );
}
