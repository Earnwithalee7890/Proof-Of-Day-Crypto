import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

const frameConfig = {
    version: "next",
    imageUrl: "https://proof-of-day.vercel.app/og-image.png",
    button: {
        title: "Check In",
        action: {
            type: "launch_app",
            name: "Proof Of Day",
            url: "https://proof-of-day.vercel.app",
            splashImageUrl: "https://proof-of-day.vercel.app/splash.png",
            splashBackgroundColor: "#0052FF",
        },
    },
};

export const metadata: Metadata = {
    title: 'Proof Of Day',
    description: 'Show up every day on Base. Build your streak, earn rewards, prove your commitment onchain.',
    metadataBase: new URL('https://proof-of-day.vercel.app'),
    other: {
        'base:app_id': '694c5189c63ad876c9081210',
        // Support both Frame v2 standards
        'fc:frame': JSON.stringify(frameConfig),
        'fc:miniapp': JSON.stringify(frameConfig),
        // Fallback for discovery
        'fc:frame:image': 'https://proof-of-day.vercel.app/og-image.png',
    },
    openGraph: {
        title: 'Proof Of Day',
        description: 'Show up every day on Base. Build your streak, earn rewards, prove your commitment onchain.',
        url: 'https://proof-of-day.vercel.app',
        siteName: 'Proof Of Day',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Proof Of Day'
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/icon.png" />
                <link rel="apple-touch-icon" href="/icon.png" />
                <link rel="manifest" href="/.well-known/farcaster.json" />
            </head>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
