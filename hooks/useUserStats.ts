'use client';

import { useReadContract, useAccount } from 'wagmi';
import { DAILY_CHECKIN_ADDRESS, DAILY_CHECKIN_ABI } from '@/contracts/DailyCheckIn';
import { formatEther } from 'viem';

export function useUserStats() {
    const { address } = useAccount();

    const { data, isLoading, refetch } = useReadContract({
        address: DAILY_CHECKIN_ADDRESS,
        abi: DAILY_CHECKIN_ABI,
        functionName: 'users',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address,
            refetchInterval: 5000, // Refresh every 5 seconds
        },
    });

    const lastCheckIn = data ? Number(data[0]) : 0;
    const streak = data ? Number(data[1]) : 0;
    const pendingRewards = data ? data[2] : BigInt(0);

    // Calculate if user can check in
    const now = Math.floor(Date.now() / 1000);
    const CHECK_IN_INTERVAL = 24 * 60 * 60; // 24 hours in seconds
    const canCheckIn = !lastCheckIn || now >= lastCheckIn + CHECK_IN_INTERVAL;

    // Calculate time until next check-in
    const nextCheckInTime = lastCheckIn ? lastCheckIn + CHECK_IN_INTERVAL : 0;
    const timeUntilNextCheckIn = Math.max(0, nextCheckInTime - now);

    return {
        lastCheckIn,
        streak,
        pendingRewards,
        pendingRewardsFormatted: formatEther(pendingRewards),
        canCheckIn,
        timeUntilNextCheckIn,
        isLoading,
        refetch,
    };
}
