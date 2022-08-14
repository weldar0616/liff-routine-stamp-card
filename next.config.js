/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    LIFF_ID_POST_APP: process.env.LIFF_ID_POST_APP,
    MESSAGING_API_CHANNEL_ACCESS_TOKEN:
      process.env.MESSAGING_API_CHANNEL_ACCESS_TOKEN,
  }
}

module.exports = nextConfig
