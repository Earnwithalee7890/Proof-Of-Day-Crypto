'use client';

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { DAILY_CHECKIN_WITH_FEES_ADDRESS, DAILY_CHECKIN_WITH_FEES_ABI } from '@/contracts/DailyCheckInWithFees';
import { parseEther } from 'viem';

export function useBoostCheckIn() {
    const { data: hash, writeContract, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const boostCheckIn = () => {
        writeContract({
            address: DAILY_CHECKIN_WITH_FEES_ADDRESS,
            abi: DAILY_CHECKIN_WITH_FEES_ABI,
            functionName: 'checkIn',
            value: parseEther('0.000008'),
        });
    };

    return {
        boostCheckIn,
        isPending,
        isConfirming,
        isSuccess,
        error,
        hash,
    };
}
