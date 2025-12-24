import { NeynarAPIClient } from '@neynar/nodejs-sdk';

const apiKey = process.env.NEXT_PUBLIC_NEYNAR_API_KEY || '';

export const neynarClient = apiKey ? new NeynarAPIClient(apiKey) : null;

// Helper function to get Farcaster user by wallet address
export async function getFarcasterUserByAddress(address: string) {
    if (!neynarClient) {
        console.warn('Neynar API key not configured');
        return null;
    }

    try {
        const response = await neynarClient.fetchBulkUsersByEthereumAddress([address]);
        if (response && response[address] && response[address].length > 0) {
            return response[address][0];
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
