import { Metadata } from 'next';
import HomeClient from './HomeClient';
import { createPublicClient, http, formatEther } from 'viem';
import { base } from 'viem/chains';
import { DAILY_CHECKIN_WITH_FEES_ADDRESS, DAILY_CHECKIN_WITH_FEES_ABI } from '@/contracts/DailyCheckInWithFees';
import { getFarcasterUserByAddress } from '@/lib/neynar';

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
    let username = params.username as string || '';
    let pfp = params.pfp as string || '';
    let score = params.score as string || '';

    // If we have an address, fetch live on-chain stats AND Farcaster profile
    if (address && address.startsWith('0x')) {
        console.log(`🔍 Generating metadata for address: ${address}`);
        try {
            // 1. Fetch On-chain Stats
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
                console.log(`✅ Fetched on-chain stats: Streak ${streak}, Rewards ${rewards}`);
            }

            // 2. Fetch Farcaster Profile automatically if not provided in URL
            if (!username || !pfp) {
                console.log('📡 Fetching Farcaster profile from Neynar...');
                const fcUser = await getFarcasterUserByAddress(address);
                if (fcUser) {
                    username = username || fcUser.username || fcUser.display_name || '';
                    pfp = pfp || fcUser.pfp_url || '';
                    console.log(`✅ Found Farcaster user: ${username}`);

                    // Use any for score to avoid SDK type mismatch during build
                    const anyUser = fcUser as any;
                    score = score || (anyUser.profile?.reputation_score || anyUser.reputation_score)?.toString() || '';
                } else {
                    console.warn(`⚠️ No Farcaster user found for address ${address}`);
                }
            }
        } catch (e) {
            console.error('❌ Error fetching data for metadata:', e);
        }
    }

    // Fallback for username
    const finalUsername = username || 'Friend';

    // Dynamic OG Image URL - now fully server-side prepared
    const ogImageUrl = address
        ? `${appUrl}/api/og?streak=${streak}&rewards=${rewards}&username=${encodeURIComponent(finalUsername)}${pfp ? `&pfp=${encodeURIComponent(pfp)}` : ''}${score ? `&score=${score}` : ''}`
        : `${appUrl}/og.png`;

    // Final JSON for the Embed Meta Tags - Using launch_frame (legacy but more compatible)
    const miniappEmbed = JSON.stringify({
        version: "1",
        imageUrl: ogImageUrl,
        button: {
            title: "Check In",
            action: {
                type: "launch_frame",
                name: "Proof Of Day",
                url: appUrl,
                splashImageUrl: `${appUrl}/splash.png`,
                splashBackgroundColor: "#0052FF",
            },
        },
    });

    return {
        title: finalUsername !== 'Friend' ? `Proof Of Day - ${finalUsername}'s Streak` : 'Proof Of Day',
        description: `View ${finalUsername}'s daily streak and rewards on Base.`,
        openGraph: {
            images: [{ url: ogImageUrl }],
        },
        other: {
            'fc:miniapp': miniappEmbed,
            'fc:frame': miniappEmbed,
            'fc:frame:image': ogImageUrl,
            'fc:frame:image:aspect_ratio': '1.91:1',
            'fc:frame:button:1': "Check In",
            'fc:frame:button:1:action': 'post',
        },
    };
}

export default function Home() {
    return <HomeClient />;
}
