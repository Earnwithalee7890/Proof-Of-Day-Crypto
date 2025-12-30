/**
 * Daily Check-In Contract with Fees (Premium)
 * 
 * Deployed on Base Mainnet
 * Contract Address: 0x60947AD600c925d7BDC7e29727D769EF3aa29f57
 * Network: Base (Chain ID: 8453)
 * 
 * Features:
 * - Daily check-in with 0.0001 ETH fee
 * - Streak tracking and rewards
 * - Claimable ETH rewards
 * - 24-hour check-in interval
 * 
 * Built for Base Builder Campaign
 * Repository: https://github.com/Earnwithalee7890/Proof-Of-Day-Crypto
 * 
 * @author Proof Of Day (earnwithalee@gmail.com)
 * @license MIT
 */
export const DAILY_CHECKIN_WITH_FEES_ADDRESS = '0x60947AD600c925d7BDC7e29727D769EF3aa29f57' as const;

export const DAILY_CHECKIN_WITH_FEES_ABI = [
    {
        type: 'function',
        name: 'checkIn',
        inputs: [],
        outputs: [],
        stateMutability: 'payable',
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
        name: 'withdrawFees',
        inputs: [{ name: 'amount', type: 'uint256' }],
        outputs: [],
        stateMutability: 'nonpayable',
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
