'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { config } from '@/lib/wagmi';
import './globals.css';
import { useState } from 'react';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <html lang="en">
            <head>
                <title>Proof Of Day</title>
                <meta name="description" content="Show up every day on Base. Build your streak, earn rewards, prove your commitment onchain." />

                {/* Base App ID */}
                <meta name="base:app_id" content="694c5189c63ad876c9081210" />

                {/* Open Graph / Social */}
                <meta property="og:title" content="Proof Of Day" />
                <meta property="og:description" content="Show up every day on Base. Build your streak, earn rewards, prove your commitment onchain." />
                <meta property="og:image" content="https://proof-of-day.vercel.app/og-image.png" />
                <meta property="og:url" content="https://proof-of-day.vercel.app" />
                <meta property="og:type" content="website" />

                {/* Farcaster Mini App (Frame v2) */}
                <meta name="fc:frame" content='{"version": "next", "imageUrl": "https://proof-of-day.vercel.app/og-image.png", "button": {"title": "Check In", "action": {"type": "launch_app", "name": "Proof Of Day", "url": "https://proof-of-day.vercel.app", "splashImageUrl": "https://proof-of-day.vercel.app/splash.png", "splashBackgroundColor": "#0052FF"}}}' />


                {/* Favicon */}
                <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔵</text></svg>" />
            </head>
            <body>
                <WagmiProvider config={config}>
                    <QueryClientProvider client={queryClient}>
                        <RainbowKitProvider
                            theme={darkTheme({
                                accentColor: '#0052FF',
                                accentColorForeground: 'white',
                                borderRadius: 'medium',
                            })}
                        >
                            {children}
                        </RainbowKitProvider>
                    </QueryClientProvider>
                </WagmiProvider>
            </body>
        </html>
    );
}
