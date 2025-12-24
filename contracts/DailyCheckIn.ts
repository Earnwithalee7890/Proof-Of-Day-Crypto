// Contract deployed at: 0x44b80503aec711f5f36958604d79547adc7d07e
export const DAILY_CHECKIN_ADDRESS = '0x44b80503aec711f5f36958604d79547adc7d07e' as const;

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
