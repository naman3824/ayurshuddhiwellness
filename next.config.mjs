/** @type {import('next').NextConfig} */
const config = {
  // Removed 'output: export' to enable API routes for contact form functionality
  // This allows the contact form to work with server-side email processing
  // while still generating static pages where possible
  images: {
    unoptimized: true, // Keep for better compatibility
  },
  trailingSlash: true, // Add trailing slashes for cleaner URLs
}

export default config