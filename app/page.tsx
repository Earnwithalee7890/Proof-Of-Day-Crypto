import { Metadata } from 'next';
import HomeClient from './HomeClient';
import { createPublicClient, http, formatEther } from 'viem';
import { base } from 'viem/chains';
import { DAILY_CHECKIN_WITH_FEES_ADDRESS, DAILY_CHECKIN_WITH_FEES_ABI } from '@/contracts/DailyCheckInWithFees';

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
    const params = await searchParams;
    const address = params.address as string;

    const appUrl = 'https://proof-of-day.vercel.app';
    let streak = '0';
    let rewards = '0';
    let username = params.username as string || 'Anonymous';
    let pfp = params.pfp as string;

    // Fetch live data from blockchain if address is present
    if (address && address.startsWith('0x')) {
        try {
            const publicClient = createPublicClient({
                chain: base,
                transport: http()
            });

            const userData = await publicClient.readContract({
                address: DAILY_CHECKIN_WITH_FEES_ADDRESS as `0x${string}`,
                abi: DAILY_CHECKIN_WITH_FEES_ABI,
                functionName: 'users',
                args: [address as `0x${string}`],
            }) as [bigint, bigint, bigint];

            if (userData) {
                streak = userData[1].toString();
                rewards = parseFloat(formatEther(userData[2])).toFixed(5);
            }
        } catch (e) {
            console.error('Error fetching onchain stats for metadata:', e);
        }
    }

    // Final JSON for the Embed Meta Tags
    const miniappEmbed = JSON.stringify({
        version: "1",
        imageUrl: ogImageUrl,
        button: {
            title: "Open App",
            action: {
                type: "launch_miniapp",
                name: "Proof Of Day",
                url: appUrl,
                splashImageUrl: `${appUrl}/splash.png`,
                splashBackgroundColor: "#0052FF",
            },
        },
    });

    return {
        title: 'Proof Of Day',
        description: 'Build your daily streak on Base and earn rewards.',
        openGraph: {
            images: [{ url: ogImageUrl }],
        },
        other: {
            'fc:miniapp': miniappEmbed,
            'fc:frame': miniappEmbed,
            'fc:frame:image': ogImageUrl,
            'fc:frame:image:aspect_ratio': '1.91:1',
            'fc:frame:button:1': "Open App",
            'fc:frame:button:1:action': 'post',
        },
    };
}

export default function Home() {
    return <HomeClient />;
}
