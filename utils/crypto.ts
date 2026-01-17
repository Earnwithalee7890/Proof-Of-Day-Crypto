/**
 * Crypto utility functions
 */

/**
 * Format a crypto address with ellipsis
 */
export function formatAddress(address: string, startChars = 6, endChars = 4): string {
    if (!address) return '';
    if (address.length <= startChars + endChars) return address;
    return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Validate Ethereum address format
 */
export function isValidEthAddress(address: string): boolean {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Convert Wei to Ether
 */
export function weiToEther(wei: bigint | string): number {
    const weiValue = typeof wei === 'string' ? BigInt(wei) : wei;
    return Number(weiValue) / 1e18;
}

/**
 * Convert Ether to Wei
 */
export function etherToWei(ether: number): bigint {
    return BigInt(Math.floor(ether * 1e18));
}

/**
 * Format token amount with decimals
 */
export function formatTokenAmount(
    amount: bigint | string,
    decimals: number = 18,
    displayDecimals: number = 4
): string {
    const amountBigInt = typeof amount === 'string' ? BigInt(amount) : amount;
    const divisor = BigInt(10 ** decimals);
    const integerPart = amountBigInt / divisor;
    const fractionalPart = amountBigInt % divisor;

    const fractionalStr = fractionalPart.toString().padStart(decimals, '0').slice(0, displayDecimals);

    return `${integerPart.toLocaleString()}.${fractionalStr}`;
}

/**
 * Parse token amount string to bigint
 */
export function parseTokenAmount(amount: string, decimals: number = 18): bigint {
    const [integerPart, fractionalPart = ''] = amount.split('.');
    const paddedFractional = fractionalPart.padEnd(decimals, '0').slice(0, decimals);
    return BigInt(integerPart + paddedFractional);
}

/**
 * Calculate gas price in Gwei
 */
export function weiToGwei(wei: bigint): number {
    return Number(wei) / 1e9;
}

/**
 * Estimate transaction cost
 */
export function estimateTransactionCost(gasLimit: bigint, gasPrice: bigint): bigint {
    return gasLimit * gasPrice;
}

/**
 * Check if transaction hash is valid
 */
export function isValidTxHash(hash: string): boolean {
    return /^0x[a-fA-F0-9]{64}$/.test(hash);
}

/**
 * Get explorer URL for address
 */
export function getExplorerUrl(
    address: string,
    type: 'address' | 'tx' = 'address',
    chainId: number = 8453 // Base mainnet
): string {
    const explorers: Record<number, string> = {
        1: 'https://etherscan.io',
        8453: 'https://basescan.org',
        84532: 'https://sepolia.basescan.org',
    };

    const baseUrl = explorers[chainId] || explorers[8453];
    return `${baseUrl}/${type}/${address}`;
}
