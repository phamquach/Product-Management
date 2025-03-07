import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["dummyimage.com"], // Cho phép tải ảnh từ domain ngoài
  },
  env: {
    NEXT_PUBLIC_API_URL_PRODUCTS:'http://localhost:3000/products'
  },
};

export default nextConfig;
