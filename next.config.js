/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.la-croix.com', 'lh3.googleusercontent.com', 'cdn.sanity.io'],
  },
  async rewrites() {
    return [
      {
        source: '/studio/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3333/studio/:path*'
            : '/studio/index.html',
      },
    ]
  },
}

module.exports = nextConfig
