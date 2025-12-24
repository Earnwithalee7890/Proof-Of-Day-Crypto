import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base } from 'wagmi/chains';
import { farcasterFrame } from '@farcaster/frame-wagmi-connector';

export const config = getDefaultConfig({
    appName: 'Proof Of Day',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
    chains: [base],
    ssr: true,
    connectors: [
        farcasterFrame(),
    ],
});
