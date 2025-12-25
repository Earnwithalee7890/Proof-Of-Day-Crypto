import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

const appUrl = 'https://proof-of-day.vercel.app';

export const metadata: Metadata = {
    title: 'Proof Of Day',
    description: 'Show up every day on Base. Build your streak, earn rewards, prove your commitment onchain.',
    openGraph: {
        title: 'Proof Of Day',
        description: 'Show up every day on Base. Build your streak, earn rewards, prove your commitment onchain.',
        url: appUrl,
        siteName: 'Proof Of Day',
        images: [
            {
                url: `${appUrl}/og.png`,
                width: 1200,
                height: 630,
                alt: 'Proof Of Day',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    other: {
        'base:app_id': '694c5189c63ad876c9081210',
        'fc:frame': JSON.stringify({
            version: "next",
            imageUrl: `${appUrl}/og.png`,
            button: {
                title: "Check In",
                action: {
                    type: "launch_app",
                    name: "Proof Of Day",
                    url: appUrl,
                    splashImageUrl: `${appUrl}/splash.png`,
                    splashBackgroundColor: "#0052FF",
                },
            },
        }),
        'fc:frame:image': `${appUrl}/og.png`,
        'fc:frame:button:1': 'Check In',
        'fc:frame:button:1:action': 'link',
        'fc:frame:button:1:target': appUrl,
        'fc:miniapp': 'true',
        'fc:miniapp:name': 'Proof Of Day',
        'fc:miniapp:url': appUrl,
        'fc:miniapp:icon': `${appUrl}/icon.png`,
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
                <link rel="icon" href={`${appUrl}/icon.png`} />
                <link rel="apple-touch-icon" href={`${appUrl}/icon.png`} />
                <link rel="manifest" href={`${appUrl}/.well-known/farcaster.json`} />
            </head>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
