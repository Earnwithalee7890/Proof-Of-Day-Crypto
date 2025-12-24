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

                {/* Base App Meta Tags */}
                <meta property="og:title" content="Proof Of Day" />
                <meta property="og:description" content="Show up every day on Base. Build your streak, earn rewards, prove your commitment onchain." />
                <meta property="og:image" content="/og-image.png" />
                <meta name="fc:frame" content="vNext" />
                <meta name="fc:frame:image" content="/og-image.png" />

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
