/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['base.org'],
        formats: ['image/avif', 'image/webp'],
    },
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/.well-known/farcaster.json',
                destination: 'https://api.farcaster.xyz/miniapps/hosted-manifest/019b55ba-307e-cb9c-17b1-88fa0368ee07',
                permanent: false,
            },
        ]
    },
}

export default nextConfig
