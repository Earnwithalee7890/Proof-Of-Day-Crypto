/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['base.org'],
        formats: ['image/avif', 'image/webp'],
    },
    reactStrictMode: true,
    webpack: (config) => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding');
        config.resolve.fallback = { fs: false, net: false, tls: false };
        config.resolve.alias = {
            ...config.resolve.alias,
            '@react-native-async-storage/async-storage': false,
        };
        return config;
    },
}

export default nextConfig
