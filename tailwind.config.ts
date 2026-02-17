import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                binance: {
                    yellow: "#F0B90B",
                    dark: "#1E2329",
                    gray: "#474D57",
                    black: "#0B0E11",
                },
            },
        },
    },
    plugins: [],
};
export default config;
