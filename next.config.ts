import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true, // This bypasses the Next.js IPv6 NAT64 bug!
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xoxrxntcnqqqhhztqmie.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;