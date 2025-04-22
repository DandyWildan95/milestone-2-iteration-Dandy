import type { Config } from 'tailwindcss'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias['@'] = __dirname + '/src'
    return config
  },
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js']
}

export default nextConfig
