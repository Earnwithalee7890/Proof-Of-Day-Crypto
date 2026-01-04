/**
 * ReferralRegistry Contract
 * 
 * Tracks who invited whom.
 */

export const REFERRAL_REGISTRY_ADDRESS = '0x7642C2cba58f9c7f7b988b09306515BEd211b13C';

export const REFERRAL_REGISTRY_ABI = [
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "user", "type": "address" },
            { "indexed": true, "internalType": "address", "name": "referrer", "type": "address" }
        ],
        "name": "ReferralRegistered",
        "type": "event"
    },
    {
        "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
        "name": "getReferralCount",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "user", "type": "address" }],
        "name": "getReferrer",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "_referrer", "type": "address" }],
        "name": "register",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const;
