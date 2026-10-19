import type { NextConfig } from 'next';
import { MODULE_IMAGE } from './src/constants/module';

// Server-only: the browser calls /api/* on this origin and Next forwards it to NestJS,
// so auth cookies are first-party and no CORS is needed.
const apiUrl = process.env.API_URL ?? 'http://localhost:3001';

/** Room for the multipart headers around the file. */
const MULTIPART_OVERHEAD_BYTES = 1024 * 1024;

const nextConfig: NextConfig = {
   output: 'standalone',
   experimental: {
      // The /api rewrite forwards only this many body bytes (default 10 MB); the largest upload is a 20 MB image.
      proxyClientMaxBodySize: MODULE_IMAGE.maxSizeBytes + MULTIPART_OVERHEAD_BYTES,
   },
   async rewrites() {
      return [{ source: '/api/:path*', destination: `${apiUrl}/:path*` }];
   },
};

export default nextConfig;
