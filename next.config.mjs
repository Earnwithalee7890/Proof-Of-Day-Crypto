/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['base.org'],
        formats: ['image/avif', 'image/webp'],
    },
    reactStrictMode: true,
    webpack: (config) => {
        config.externals.push('pino-pretty', 'lokijs', 'encoding');
        return config;
    },
}

export default nextConfig
