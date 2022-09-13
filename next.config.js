/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.la-croix.com', 'lh3.googleusercontent.com'],
  },
}
const STUDIO_REWRITE = {
  source: '/studio/(.*)',
  destination: `${process.env.NEXT_PUBLIC_BASE_URL}/studio`,
}

module.exports = {
  rewrites: () => [STUDIO_REWRITE],
}

module.exports = nextConfig
