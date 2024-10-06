/** @type {import('next').NextConfig} */
const nextConfig = {
    // Images configuration
    images: {
      // formats: ['image/avif', 'image/webp'],
      // domains: ['admin.seamad-liveaboards.com','lh3.googleusercontent.com','imgs.search.brave.com','images.unsplash.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'admin.seamad-liveaboards.com',
          // port: '',
          pathname: '/assets/**'
        },
        {
          protocol: 'http',
          hostname: 'admin.seamad-liveaboards.com',
          // port: '8055',
          pathname: '/assets/**'
        }
      ]
    },
    // experimental: {
    //   appDir: true
    // }
  }
  
  export default nextConfig;
  