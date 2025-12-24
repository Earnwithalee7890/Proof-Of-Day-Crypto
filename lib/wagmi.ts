import { createConfig, http } from 'wagmi';
import { base } from 'wagmi/chains';
import { farcasterFrame } from '@farcaster/frame-wagmi-connector';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
    rainbowWallet,
    walletConnectWallet,
    coinbaseWallet,
} from '@rainbow-me/rainbowkit/wallets';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID';

const connectors = connectorsForWallets(
    [
        {
            groupName: 'Recommended',
            wallets: [rainbowWallet, walletConnectWallet, coinbaseWallet],
        },
    ],
    {
        appName: 'Proof Of Day',
        projectId,
    }
);

export const config = createConfig({
    connectors: [
        ...connectors,
        farcasterFrame(),
    ],
    chains: [base],
    transports: {
        [base.id]: http(),
    },
    ssr: true,
});

