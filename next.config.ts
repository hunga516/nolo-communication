import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.mux.com',
        port: '',
        pathname: '/**',
        search: '',
       },
       {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/**',
        search: '',
       },
        {
        protocol: 'https',
        hostname: 'img.clerk.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
