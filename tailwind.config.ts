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
                base: {
                    blue: '#0052FF',
                    dark: '#000000',
                    light: '#F0F0F0',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-base': 'linear-gradient(135deg, #0052FF 0%, #003DB5 100%)',
                'shimmer': 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            },
            animation: {
                'shimmer': 'shimmer 2s infinite',
                'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                'pulse-glow': {
                    '0%, 100%': {
                        opacity: '1',
                        boxShadow: '0 0 20px rgba(0, 82, 255, 0.4)',
                    },
                    '50%': {
                        opacity: '.8',
                        boxShadow: '0 0 40px rgba(0, 82, 255, 0.8)',
                    },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [],
};

export default config;
