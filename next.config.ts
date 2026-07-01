import type { NextConfig } from "next";

// El sitio se publica en https://pcornejov.github.io/slamdunk-enciclopedia/
// Por eso usamos export estático + basePath. Las imágenes son URLs remotas
// (Jikan / AniList), así que desactivamos la optimización de imágenes.
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/slamdunk-enciclopedia" : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
