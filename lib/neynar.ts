import { NeynarAPIClient } from '@neynar/nodejs-sdk';

const apiKey = process.env.NEYNAR_API_KEY || process.env.NEXT_PUBLIC_NEYNAR_API_KEY || '';

if (!apiKey) {
    console.warn('⚠️ NEYNAR_API_KEY is missing from environment variables');
} else {
    console.log('✅ NEYNAR_API_KEY is configured');
}

export const neynarClient = apiKey ? new NeynarAPIClient({ apiKey }) : null;

// Helper function to get Farcaster user by wallet address
export async function getFarcasterUserByAddress(address: string) {
    if (!neynarClient) {
        console.warn('Neynar API key not configured');
        return null;
    }

    try {
        const lowerAddr = address.toLowerCase();
        const response = await neynarClient.fetchBulkUsersByEthOrSolAddress({ addresses: [address, lowerAddr] });

        // Try to find the user using the original address or the lowercase version
        const userList = response[address] || response[lowerAddr];

        if (userList && userList.length > 0) {
            return userList[0];
        }

        // Final attempt: check if any key in the response matches (case-insensitive)
        const matchedKey = Object.keys(response).find(key => key.toLowerCase() === lowerAddr);
        if (matchedKey && response[matchedKey].length > 0) {
            return response[matchedKey][0];
        }

        return null;
    } catch (error) {
        console.error('Error fetching Farcaster user:', error);
        return null;
    }
}

// Helper function to get Farcaster user by FID
export async function getFarcasterUserByFid(fid: number) {
    if (!neynarClient) {
        console.warn('Neynar API key not configured');
        return null;
    }

    try {
        const response = await neynarClient.fetchBulkUsers({ fids: [fid] });
        if (response && response.users && response.users.length > 0) {
            return response.users[0];
        }
        return null;
    } catch (error) {
        console.error('Error fetching Farcaster user:', error);
        return null;
    }
}

// Helper function to send a notification cast
export async function sendNotificationCast(text: string) {
    if (!neynarClient) {
        console.warn('Neynar API key not configured');
        return null;
    }

    try {
        // Note: This requires a SIGNER_UUID which needs to be set up through Neynar
        // For now, we'll just log it
        console.log('Would send notification cast:', text);
        return { success: true, message: 'Notification prepared' };
    } catch (error) {
        console.error('Error sending notification:', error);
        return null;
    }
}
