'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useConnect } from 'wagmi';
import { useEffect } from 'react';
import sdk from '@farcaster/frame-sdk';
import CheckInButton from '@/components/CheckInButton';
import StatsCard from '@/components/StatsCard';
import ClaimButton from '@/components/ClaimButton';
import StreakVisual from '@/components/StreakVisual';
import ShareButton from '@/components/ShareButton';
import UserProfile from '@/components/UserProfile';
import AnimatedBackground from '@/components/AnimatedBackground';
import { DAILY_CHECKIN_ADDRESS } from '@/contracts/DailyCheckIn';

export default function Home() {
    const { isConnected } = useAccount();
    const { connect, connectors } = useConnect();

    useEffect(() => {
        const init = async () => {
            sdk.actions.ready();
        };
        init();
    }, []);

    useEffect(() => {
        if (!isConnected) {
            const farcasterConnector = connectors.find((c) => c.id === 'farcaster-frame');
            if (farcasterConnector) {
                connect({ connector: farcasterConnector });
            }
        }
    }, [isConnected, connectors, connect]);

    return (
        <main className="min-h-screen relative">
            {/* Animated Background */}
            <AnimatedBackground />

            {/* Header */}
            <header className="glass sticky top-0 z-50 border-b border-white/10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className="text-4xl">🔵</div>
                            <div>
                                <h1 className="text-2xl font-black text-gradient">Proof Of Day</h1>
                                <p className="text-xs text-gray-400">Show up. Build streaks. Earn onchain.</p>
                            </div>
                        </div>

                        <ConnectButton />
                    </div>

                    {/* User Profile - Shows when connected */}
                    {isConnected && (
                        <div className="animate-in">
                            <UserProfile />
                        </div>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-12 md:py-20">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h2 className="text-5xl md:text-7xl font-black text-gradient animate-in">
                        Show Up Daily.
                        <br />
                        Earn Onchain.
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto animate-in" style={{ animationDelay: '100ms' }}>
                        Check in once every 24 hours on Base mainnet. Build your streak, earn rewards, and prove your commitment onchain.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            {isConnected ? (
                <section className="container mx-auto px-4 pb-20">
                    <div className="max-w-6xl mx-auto space-y-8">
                        {/* Streak Visual */}
                        <div className="animate-in" style={{ animationDelay: '200ms' }}>
                            <StreakVisual />
                        </div>

                        {/* Stats Cards */}
                        <div className="animate-in" style={{ animationDelay: '300ms' }}>
                            <StatsCard />
                        </div>

                        {/* Check-In Section */}
                        <div className="glass rounded-2xl p-8 space-y-6 animate-in" style={{ animationDelay: '400ms' }}>
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-bold">Daily Check-In</h3>
                                <p className="text-gray-400">
                                    Check in once every 24 hours to maintain your streak
                                </p>
                                {/* Contract Address */}
                                <div className="pt-2">
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(DAILY_CHECKIN_ADDRESS);
                                        }}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass glass-hover text-xs font-mono group"
                                        title="Click to copy contract address"
                                    >
                                        <svg className="w-4 h-4 text-base-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span className="text-gray-400 group-hover:text-white transition-colors">
                                            Contract: <span className="text-base-blue">{DAILY_CHECKIN_ADDRESS.slice(0, 8)}...{DAILY_CHECKIN_ADDRESS.slice(-6)}</span>
                                        </span>
                                        <svg className="w-3 h-3 text-gray-500 group-hover:text-base-blue transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <CheckInButton />
                        </div>

                        {/* Claim Rewards Section */}
                        <div className="glass rounded-2xl p-8 space-y-6 animate-in" style={{ animationDelay: '500ms' }}>
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-bold">Claim Rewards</h3>
                                <p className="text-gray-400">
                                    Withdraw your accumulated rewards
                                </p>
                            </div>
                            <ClaimButton />
                        </div>

                        {/* Share Section */}
                        <div className="glass rounded-2xl p-8 space-y-6 animate-in" style={{ animationDelay: '600ms' }}>
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-bold">Share Your Progress</h3>
                                <p className="text-gray-400">
                                    Show off your streak on Farcaster and Base
                                </p>
                            </div>
                            <ShareButton />
                        </div>

                        {/* Info Cards */}
                        <div className="grid md:grid-cols-3 gap-6 pt-8">
                            {[
                                {
                                    icon: '⚡',
                                    title: '24-Hour Cycle',
                                    description: 'Check in once every 24 hours to keep your streak alive',
                                },
                                {
                                    icon: '🔥',
                                    title: 'Build Streaks',
                                    description: 'Consecutive check-ins build your streak and reputation',
                                },
                                {
                                    icon: '💎',
                                    title: 'Earn Rewards',
                                    description: 'Each check-in earns you ETH rewards you can claim anytime',
                                },
                            ].map((item, i) => (
                                <div key={i} className="glass glass-hover rounded-xl p-6 text-center space-y-3">
                                    <div className="text-4xl">{item.icon}</div>
                                    <h4 className="font-bold text-lg">{item.title}</h4>
                                    <p className="text-sm text-gray-400">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : (
                <section className="container mx-auto px-4 pb-20">
                    <div className="max-w-2xl mx-auto">
                        <div className="glass rounded-2xl p-12 text-center space-y-6">
                            <div className="text-6xl">👛</div>
                            <h3 className="text-3xl font-bold">Connect Your Wallet</h3>
                            <p className="text-gray-400 text-lg">
                                Connect your wallet to start your daily check-in journey on Base
                            </p>
                            <div className="pt-4">
                                <ConnectButton />
                            </div>
                        </div>

                        {/* Features Preview */}
                        <div className="mt-12 grid md:grid-cols-2 gap-6">
                            {[
                                {
                                    icon: '🔵',
                                    title: 'Base Mainnet',
                                    description: 'Built on Base for fast, low-cost transactions',
                                },
                                {
                                    icon: '🛡️',
                                    title: 'Fully Onchain',
                                    description: 'All data and rewards stored onchain',
                                },
                                {
                                    icon: '🚀',
                                    title: 'Instant Rewards',
                                    description: 'Claim your accumulated rewards anytime',
                                },
                                {
                                    icon: '📱',
                                    title: 'Farcaster Native',
                                    description: 'Share your achievements seamlessly',
                                },
                            ].map((item, i) => (
                                <div key={i} className="glass glass-hover rounded-xl p-6 space-y-3">
                                    <div className="text-3xl">{item.icon}</div>
                                    <h4 className="font-bold">{item.title}</h4>
                                    <p className="text-sm text-gray-400">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="glass border-t border-white/10 py-8 mt-20">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-400">
                        Built with 💙 on <span className="text-base-blue font-semibold">Base</span>
                    </p>
                </div>
            </footer>
        </main>
    );
}
