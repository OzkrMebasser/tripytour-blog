/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com","firebasestorage.googleapis.com"]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://tripytour-blog.vercel.app/api/:path*', // Proxy to Backend
      },
    ]
  },
}

module.exports = nextConfig