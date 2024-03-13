export const checkEnvironment = () => {
    const baseURL =
        process.env.NODE_ENV === "production"
            ? "https://" + process.env.VERCEL_URL
            : process.env.API_URL;

    return {
        BASE_URL: baseURL,
    }
}