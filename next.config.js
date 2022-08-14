/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://nextjs.org/docs/api-reference/next.config.js/rewrites#rewriting-to-an-external-url
  async rewrites() {
    return [
      {
        source: "/bot/message/broadcast",
        destination: "https://api.line.me/v2/bot/message/broadcast",
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    LIFF_ID_POST_APP: process.env.LIFF_ID_POST_APP,
    MESSAGING_API_CHANNEL_ACCESS_TOKEN:
      process.env.MESSAGING_API_CHANNEL_ACCESS_TOKEN,
  },
};

module.exports = nextConfig;
