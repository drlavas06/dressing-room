/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  webpack: (config, { isServer }) => {
    // Add ESM support
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx']
    }
    
    return config
  },
  transpilePackages: ['rc-util', 'rc-picker', 'antd'],
}

module.exports = nextConfig
