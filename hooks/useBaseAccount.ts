'use client';

import { useState, useEffect } from 'react';
import { useAccount, useEnsName } from 'wagmi';
import { normalize } from 'viem/ens';
import { base } from 'wagmi/chains';

export function useBaseAccount() {
    const { address } = useAccount();
    const [basename, setBasename] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Try to get ENS name (Basename) on Base
    const { data: ensName } = useEnsName({
        address,
        chainId: base.id,
    });

    useEffect(() => {
        if (ensName) {
            setBasename(ensName);
        } else {
            setBasename(null);
        }
    }, [ensName]);

    return {
        basename,
        isLoading,
        hasBasename: !!basename,
        formattedAddress: address
            ? `${address.slice(0, 6)}...${address.slice(-4)}`
            : null,
    };
}
