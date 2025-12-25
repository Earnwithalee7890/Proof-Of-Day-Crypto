'use client';

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { DAILY_CHECKIN_WITH_FEES_ADDRESS, DAILY_CHECKIN_WITH_FEES_ABI } from '@/contracts/DailyCheckInWithFees';

export function useBoostClaimRewards() {
    const { data: hash, writeContract, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const claimRewards = () => {
        writeContract({
            address: DAILY_CHECKIN_WITH_FEES_ADDRESS,
            abi: DAILY_CHECKIN_WITH_FEES_ABI,
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
