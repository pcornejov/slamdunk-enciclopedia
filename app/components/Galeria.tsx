"use client";

import { useState } from "react";

export default function Galeria({
  imagenes,
  alt,
}: {
  imagenes: string[];
  alt: string;
}) {
  const [activa, setActiva] = useState(0);
  if (imagenes.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imagenes[activa]}
          alt={alt}
          className="max-h-[28rem] w-full object-contain"
        />
      </div>
      {imagenes.length > 1 && (
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          {imagenes.map((src, i) => (
            <button
              key={src}
              onClick={() => setActiva(i)}
              className={`aspect-square overflow-hidden rounded-lg border-2 transition ${
                i === activa
                  ? "border-red-600"
                  : "border-transparent hover:border-red-300"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${alt} (${i + 1})`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
