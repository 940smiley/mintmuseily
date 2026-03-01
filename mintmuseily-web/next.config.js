/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security Header: X-Frame-Options
          // Prevents clickjacking by forbidding the site from being embedded in an iframe.
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Security Header: X-Content-Type-Options
          // Stops the browser from sniffing the MIME type and forces it to use the declared content-type.
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Security Header: Referrer-Policy
          // Controls how much referrer information is passed when navigating from this site.
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Security Header: Permissions-Policy
          // Disables features like camera, microphone, and geolocation for added privacy.
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // Security Header: Content-Security-Policy
          // Restricts where resources can be loaded from to mitigate XSS and other injection attacks.
          // Note: 'unsafe-inline' is used for styles and 'unsafe-eval' for Next.js dev mode/scripts.
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' https://*.walletconnect.com https://*.walletconnect.org https://*.rpc.sepolia.org https://*.alchemy.com https://*.infura.io; frame-ancestors 'none';",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
