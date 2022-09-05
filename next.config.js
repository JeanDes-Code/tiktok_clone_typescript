/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.la-croix.com', 'lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig
