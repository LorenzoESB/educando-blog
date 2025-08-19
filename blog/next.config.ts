/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
  }
}

module.exports = nextConfig