'use client';

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { DAILY_CHECKIN_ADDRESS, DAILY_CHECKIN_ABI } from '@/contracts/DailyCheckIn';

export function useClaimRewards() {
    const { data: hash, writeContract, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const claimRewards = () => {
        writeContract({
            address: DAILY_CHECKIN_ADDRESS,
            abi: DAILY_CHECKIN_ABI,
            functionName: 'claimRewards',
        });
    };

    return {
        claimRewards,
        isPending,
        isConfirming,
        isSuccess,
        error,
        hash,
    };
}
