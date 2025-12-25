import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export const metadata: Metadata = {
    title: 'Proof Of Day',
    description: 'Show up every day on Base. Build your streak, earn rewards, prove your commitment onchain.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Spec-perfect JSON for Farcaster Mini Apps (Frame v2)
    const frameJson = JSON.stringify({
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
    });

    return (
        <html lang="en">
            <head>
                {/* Farcaster Frame v2 / Mini App - Dual Tagging for max compatibility */}
                <meta name="fc:frame" content={frameJson} />
                <meta property="fc:frame" content={frameJson} />

                <meta name="fc:miniapp" content={frameJson} />
                <meta property="fc:miniapp" content={frameJson} />

                <meta name="fc:frame:image" content="https://proof-of-day.vercel.app/og-image.png" />
                <meta property="fc:frame:image" content="https://proof-of-day.vercel.app/og-image.png" />

                {/* Domain Verification & Social */}
                <meta name="base:app_id" content="694c5189c63ad876c9081210" />
                <meta property="og:title" content="Proof Of Day" />
                <meta property="og:description" content="Show up every day on Base. Build your streak, earn rewards, prove your commitment onchain." />
                <meta property="og:image" content="https://proof-of-day.vercel.app/og-image.png" />
                <meta property="og:url" content="https://proof-of-day.vercel.app" />
                <meta property="og:type" content="website" />

                {/* Branding Assets (Force Absolute) */}
                <link rel="icon" href="https://proof-of-day.vercel.app/icon.png" />
                <link rel="apple-touch-icon" href="https://proof-of-day.vercel.app/icon.png" />
                <link rel="shortcut icon" href="https://proof-of-day.vercel.app/icon.png" />
                <link rel="manifest" href="https://proof-of-day.vercel.app/.well-known/farcaster.json" />
            </head>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
