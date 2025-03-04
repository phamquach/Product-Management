import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["example.com"], // Cho phép tải ảnh từ domain ngoài
  },
  env: {

  },
};

export default nextConfig;
