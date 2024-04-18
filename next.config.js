/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        PARSER_API: process.env.PARSER_API,
        DEV_PARSER_API: process.env.DEV_PARSER_API,
        DEV_PARSER: process.env.DEV_PARSER,
        VERCEL_URL: process.env.VERCEL_URL
    }
}

module.exports = nextConfig
