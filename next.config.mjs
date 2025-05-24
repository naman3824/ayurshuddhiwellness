/** @type {import('next').NextConfig} */
const config = {
  output: 'export', // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Add trailing slashes for cleaner URLs
  // Redirect root to en-IN in your hosting platform
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en-IN',
        permanent: true,
      },
    ]
  },
}

export default config 