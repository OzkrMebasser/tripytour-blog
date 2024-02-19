/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com","firebasestorage.googleapis.com"]
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/home',
  //       destination: '/',
  //       permanent: true,
  //     },
  //   ]
  // },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path',
  //       destination: 'http://localhost:3000/api/:path', // Proxy to Backend
  //     }
  //     // {
  //     //   source: '/api/auth/:path*',
  //     //   destination: 'https://tripytour-blog.vercel.app/api/auth/:path', // Ajusta la URL según tu estructura
  //     // },
  //   ]
  // },
}

module.exports = nextConfig