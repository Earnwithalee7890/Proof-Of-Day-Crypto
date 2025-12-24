'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

export function useFarcasterAccount() {
    const { address } = useAccount();
    const [farcasterUser, setFarcasterUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!address) {
            setFarcasterUser(null);
            return;
        }

        const fetchFarcasterData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/farcaster?address=${address}`);
                const data = await response.json();

                if (data.error) {
                    throw new Error(data.error);
                }

                setFarcasterUser(data.user);
            } catch (err) {
                console.error('Error fetching Farcaster account:', err);
                setError('Failed to fetch Farcaster account');
            } finally {
                setIsLoading(false);
            }
        };

        fetchFarcasterData();
    }, [address]);

    return {
        farcasterUser,
        isLoading,
        error,
        hasFarcaster: !!farcasterUser,
        username: farcasterUser?.username || null,
        displayName: farcasterUser?.display_name || null,
        pfp: farcasterUser?.pfp_url || null,
        fid: farcasterUser?.fid || null,
    };
}
