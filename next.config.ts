import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    domains: ['images.unsplash.com', 'cdn-icons-png.flaticon.com','images.pexels.com'] // <-- add this line
  },
};

export default nextConfig;
