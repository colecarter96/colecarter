/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        pathname: '/**',
      },
    ],
    domains: ['i.postimg.cc', 'variety.com'],
  },
}

module.exports = nextConfig 