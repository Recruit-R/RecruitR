export const checkEnvironment = () => {
    const baseURL =
        process.env.NODE_ENV === "production"
            ? "https://" + process.env.VERCEL_URL
            : process.env.API_URL;

    const parserURL = process.env.NODE_ENV === "production"
        ? process.env.PARSER_URL
        : process.env.DEV_PARSER_API;

    return {
        BASE_URL: baseURL,
        PARSER_URL: parserURL
    }
}