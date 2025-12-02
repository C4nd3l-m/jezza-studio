import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["res.cloudinary.com"], // <- agrega tu dominio de Cloudinary aquí
  },
};

export default nextConfig;
