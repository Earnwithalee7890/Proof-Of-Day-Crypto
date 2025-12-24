import { NextRequest, NextResponse } from 'next/server';
import { NeynarAPIClient } from '@neynar/nodejs-sdk';

const client = process.env.NEXT_PUBLIC_NEYNAR_API_KEY
    ? new NeynarAPIClient(process.env.NEXT_PUBLIC_NEYNAR_API_KEY)
    : null;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const address = searchParams.get('address');

    if (!address) {
        return NextResponse.json({ error: 'Address required' }, { status: 400 });
    }

    if (!client) {
        return NextResponse.json({ error: 'Neynar not configured' }, { status: 500 });
    }

    try {
        const response = await client.fetchBulkUsersByEthereumAddress([address]);
        const user = response && response[address] && response[address].length > 0
            ? response[address][0]
            : null;

        return NextResponse.json({ user });
    } catch (error) {
        console.error('Error fetching Farcaster user:', error);
        return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}
