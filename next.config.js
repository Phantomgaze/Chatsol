/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ucarecdn.com',
      },
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
  transpilePackages: ['framer-motion'],
};

module.exports = nextConfig;