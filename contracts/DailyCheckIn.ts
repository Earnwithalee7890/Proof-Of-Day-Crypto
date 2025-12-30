/**
 * Daily Check-In Contract (Standard)
 * 
 * Deployed on Base Mainnet
 * Contract Address: 0x44B80503Aec711F5F36958604D79547ADC7D07ef
 * Network: Base (Chain ID: 8453)
 * 
 * Features:
 * - Free daily check-in
 * - Streak tracking
 * - Reward accumulation
 * - 24-hour check-in interval
 * 
 * Built for Base Builder Campaign
 * Repository: https://github.com/Earnwithalee7890/Proof-Of-Day-Crypto
 * 
 * @author Proof Of Day (earnwithalee@gmail.com)
 * @license MIT
 */
export const DAILY_CHECKIN_ADDRESS = '0x44B80503Aec711F5F36958604D79547ADC7D07ef' as const;

export const DAILY_CHECKIN_ABI = [
    {
        type: 'function',
        name: 'checkIn',
        inputs: [],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'claimRewards',
        inputs: [],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'users',
        inputs: [{ name: '', type: 'address' }],
        outputs: [
            { name: 'lastCheckIn', type: 'uint256' },
            { name: 'streak', type: 'uint256' },
            { name: 'pendingRewards', type: 'uint256' },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'rewardPerCheckIn',
        inputs: [],
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'CHECK_IN_INTERVAL',
        inputs: [],
        outputs: [{ name: '', type: 'uint256' }],
        stateMutability: 'view',
    },
    {
        type: 'event',
        name: 'CheckedIn',
        inputs: [
            { name: 'user', type: 'address', indexed: true },
            { name: 'timestamp', type: 'uint256', indexed: false },
            { name: 'streak', type: 'uint256', indexed: false },
            { name: 'reward', type: 'uint256', indexed: false },
        ],
    },
    {
        type: 'event',
        name: 'RewardsClaimed',
        inputs: [
            { name: 'user', type: 'address', indexed: true },
            { name: 'amount', type: 'uint256', indexed: false },
        ],
    },
    {
        type: 'receive',
        stateMutability: 'payable',
    },
] as const;
