/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['base.org'],
        formats: ['image/avif', 'image/webp'],
    },
    reactStrictMode: true,
}

export default nextConfig
