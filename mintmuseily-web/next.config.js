/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'pino-pretty': false,
      'lokijs': false,
      'encoding': false,
      '@react-native-async-storage/async-storage': false,
    };
    return config;
  },
}

module.exports = nextConfig
