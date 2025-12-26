import { Metadata } from 'next';
import HomeClient from './HomeClient';

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
    const params = await searchParams;
    const address = params.address as string;
    const username = params.username as string;
    const streak = params.streak as string;
    const rewards = params.rewards as string;
    const pfp = params.pfp as string;

    const appUrl = 'https://proof-of-day.vercel.app';

    // If we have stats, use the dynamic OG image
    const ogImageUrl = address
        ? `${appUrl}/api/og?address=${address}&username=${encodeURIComponent(username || 'Anonymous')}&streak=${streak || '0'}&rewards=${rewards || '0'}${pfp ? `&pfp=${encodeURIComponent(pfp)}` : ''}`
        : `${appUrl}/og.png`;

    return {
        title: username ? `Proof Of Day - ${username}'s Streak` : 'Proof Of Day',
        description: streak ? `I'm on a ${streak} day streak! Build your daily streak on Base and earn rewards.` : 'Show up every day on Base. Build your streak, earn rewards, prove your commitment onchain.',
        openGraph: {
            images: [{ url: ogImageUrl }],
        },
        other: {
            'fc:frame': JSON.stringify({
                version: "next",
                imageUrl: ogImageUrl,
                button: {
                    title: "Check In",
                    action: {
                        type: "launch_app",
                        name: "Proof Of Day",
                        url: appUrl,
                        splashImageUrl: `${appUrl}/splash.png`,
                        splashBackgroundColor: "#0052FF",
                    },
                },
            }),
            'fc:frame:image': ogImageUrl,
            'fc:frame:button:1': 'Check In',
            'fc:frame:button:1:action': 'link',
            'fc:frame:button:1:target': appUrl,
        },
    };
}

export default function Home() {
    return <HomeClient />;
}
