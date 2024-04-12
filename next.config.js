/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        PARSER_API: process.env.PARSER_API,
        DEV_PARSER_API: process.env.DEV_PARSER_API,
    }
}

module.exports = nextConfig
