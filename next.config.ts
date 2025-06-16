import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});



const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        // This needs to be changed when deploying to production
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/blogs/**', 
      },
      {
        // This needs to be changed when deploying to production
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/projects/**',
      }
    ],
  },
  /* other config options here */
};

export default nextConfig;
module.exports = withBundleAnalyzer(nextConfig);


