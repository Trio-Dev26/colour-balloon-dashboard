import type { NextConfig } from 'next';

// Server-only: the browser calls /api/* on this origin and Next forwards it to NestJS,
// so auth cookies are first-party and no CORS is needed.
const apiUrl = process.env.API_URL ?? 'http://localhost:3001';

const nextConfig: NextConfig = {
   output: 'standalone',
   async rewrites() {
      return [{ source: '/api/:path*', destination: `${apiUrl}/:path*` }];
   },
};

export default nextConfig;
