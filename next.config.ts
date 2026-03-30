import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.venturesquare.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.venturesquare.net',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
