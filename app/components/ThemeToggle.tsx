"use client";

import { useEffect, useState } from "react";

// Alterna la clase `dark` en <html> y persiste la preferencia en localStorage.
// El estado inicial se lee del DOM (la clase la fija el script anti-FOUC de
// layout.tsx antes de la hidratación), evitando desajustes de hidratación.
export default function ThemeToggle() {
  const [oscuro, setOscuro] = useState(false);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setOscuro(document.documentElement.classList.contains("dark"));
    setMontado(true);
  }, []);

  function alternar() {
    const nuevo = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nuevo);
    try {
      localStorage.setItem("tema", nuevo ? "dark" : "light");
    } catch {
      /* localStorage no disponible */
    }
    setOscuro(nuevo);
  }

  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={oscuro ? "Activar modo claro" : "Activar modo oscuro"}
      title={oscuro ? "Modo claro" : "Modo oscuro"}
      className="rounded-full border border-white/30 p-2 text-base leading-none transition-colors hover:bg-red-700"
    >
      {/* Placeholder estable en SSR para evitar parpadeo del icono */}
      {montado ? (oscuro ? "☀️" : "🌙") : "🌙"}
    </button>
  );
}
