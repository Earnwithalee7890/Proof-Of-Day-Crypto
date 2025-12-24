'use client';

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { DAILY_CHECKIN_ADDRESS, DAILY_CHECKIN_ABI } from '@/contracts/DailyCheckIn';

export function useCheckIn() {
    const { data: hash, writeContract, isPending, error } = useWriteContract();

    const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const checkIn = () => {
        writeContract({
            address: DAILY_CHECKIN_ADDRESS,
            abi: DAILY_CHECKIN_ABI,
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
