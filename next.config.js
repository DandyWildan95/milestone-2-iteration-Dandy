/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add image optimization
  images: {
    domains: ['example.com'], // Add domains for external images
  },
  // Explicitly configure SWC
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: true,
  },
};

module.exports = nextConfig;
