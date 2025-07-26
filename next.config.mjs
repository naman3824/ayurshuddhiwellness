/** @type {import('next').NextConfig} */
const config = {
  output: 'export', // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Add trailing slashes for cleaner URLs
  // Note: redirects don't work with static export
  // You'll need to handle redirects at the hosting platform level
}

export default config 