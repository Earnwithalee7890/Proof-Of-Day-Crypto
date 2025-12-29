'use client';

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { DAILY_CHECKIN_WITH_FEES_ADDRESS, DAILY_CHECKIN_WITH_FEES_ABI } from '@/contracts/DailyCheckInWithFees';

export function useCheckIn() {
    const { data: hash, writeContract, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const checkIn = () => {
        writeContract({
            address: DAILY_CHECKIN_WITH_FEES_ADDRESS,
            abi: DAILY_CHECKIN_WITH_FEES_ABI,
            functionName: 'checkIn',
        });
    };

    return {
        checkIn,
        isPending,
        isConfirming,
        isSuccess,
        error,
        hash,
    };
}
