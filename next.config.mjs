/** @type {import('next').NextConfig} */
const config = {
  output: 'export', // Enable static exports
  images: {
    unoptimized: true, // Required for static export
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  trailingSlash: true, // Add trailing slashes for cleaner URLs
  // Performance optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Note: redirects don't work with static export
  // You'll need to handle redirects at the hosting platform level
}

export default config 