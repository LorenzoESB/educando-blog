/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: undefined,
  },
  images: {
    domains: ['159-112-182-249.traefik.me'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '159-112-182-249.traefik.me',
      },
      {
        protocol: 'https',
        hostname: '**',
      }
    ]
  },
  // Headers de segurança
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ];
  }
}

module.exports = nextConfig