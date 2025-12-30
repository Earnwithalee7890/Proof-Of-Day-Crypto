'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

interface LeaderboardEntry {
    address: string;
    username: string | null;
    streak: number;
    rank: number;
}

export default function Leaderboard() {
    const { address: currentAddress } = useAccount();
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

    useEffect(() => {
        // Simulate leaderboard data - in production, this would come from a subgraph or indexer
        const generateLeaderboard = () => {
            const mockData: LeaderboardEntry[] = [
                { address: '0x742d...5D1E', username: 'streakmaster.base.eth', streak: 127, rank: 1 },
                { address: '0x8F3b...2A9C', username: 'dailygrind.base.eth', streak: 98, rank: 2 },
                { address: '0x1A2B...3C4D', username: 'consistent.base.eth', streak: 85, rank: 3 },
                { address: '0x5E6F...7G8H', username: null, streak: 72, rank: 4 },
                { address: '0x9I0J...1K2L', username: 'hodler.base.eth', streak: 65, rank: 5 },
                { address: '0x3M4N...5O6P', username: null, streak: 58, rank: 6 },
                { address: '0x7Q8R...9S0T', username: 'basebuilder.base.eth', streak: 51, rank: 7 },
                { address: '0x1U2V...3W4X', username: null, streak: 47, rank: 8 },
                { address: '0x5Y6Z...7A8B', username: 'proof.base.eth', streak: 42, rank: 9 },
                { address: '0x9C0D...1E2F', username: null, streak: 38, rank: 10 },
            ];

            setLeaderboard(mockData);
        };

        generateLeaderboard();
    }, []);

    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return '🥇';
            case 2:
                return '🥈';
            case 3:
                return '🥉';
            default:
                return `#${rank}`;
        }
    };

    const getRankStyle = (rank: number) => {
        switch (rank) {
            case 1:
                return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30';
            case 2:
                return 'from-gray-400/20 to-gray-500/20 border-gray-400/30';
            case 3:
                return 'from-orange-500/20 to-orange-600/20 border-orange-500/30';
            default:
                return 'from-white/5 to-white/10 border-white/10';
        }
    };

    const isCurrentUser = (address: string) => {
        if (!currentAddress) return false;
        return address.toLowerCase() === currentAddress.toLowerCase() ||
            address.slice(0, 6).toLowerCase() === currentAddress.slice(0, 6).toLowerCase();
    };

    return (
        <div className="glass rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        🏆 Leaderboard
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">Top streakers on Base</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                    <span className="text-xs font-medium text-purple-400">Top 10</span>
                </div>
            </div>

            {/* Podium for Top 3 */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {leaderboard.slice(0, 3).map((entry) => (
                    <div
                        key={entry.address}
                        className={`relative ${entry.rank === 1 ? 'order-2' : entry.rank === 2 ? 'order-1 mt-8' : 'order-3 mt-8'
                            }`}
                    >
                        <div className={`bg-gradient-to-br ${getRankStyle(entry.rank)} border rounded-xl p-4 text-center space-y-2 hover:scale-105 transition-transform duration-300`}>
                            <div className="text-4xl">{getRankIcon(entry.rank)}</div>
                            <div>
                                <p className="font-bold text-sm truncate">
                                    {entry.username || `${entry.address.slice(0, 6)}...${entry.address.slice(-4)}`}
                                </p>
                                <div className="flex items-center justify-center gap-1 text-2xl font-black mt-2">
                                    <span className="text-gradient">{entry.streak}</span>
                                    <span className="text-xs text-gray-400">days</span>
                                </div>
                            </div>
                            {entry.rank === 1 && (
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                                    <div className="text-5xl animate-bounce">👑</div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Rest of Leaderboard */}
            <div className="space-y-2">
                {leaderboard.slice(3).map((entry, index) => (
                    <div
                        key={entry.address}
                        className={`flex items-center justify-between p-4 rounded-xl bg-gradient-to-r ${getRankStyle(entry.rank)} border hover:border-white/20 transition-all duration-300 ${isCurrentUser(entry.address) ? 'ring-2 ring-blue-500/50' : ''
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center font-bold text-gray-400">
                                {getRankIcon(entry.rank)}
                            </div>
                            <div>
                                <p className="font-bold text-sm">
                                    {entry.username || 'Anonymous'}
                                    {isCurrentUser(entry.address) && (
                                        <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs">You</span>
                                    )}
                                </p>
                                <p className="text-xs text-gray-500 font-mono">
                                    {entry.address}
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-black text-gradient">{entry.streak}</span>
                                <div className="text-xs text-gray-400">
                                    <div>days</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-white/5 text-center text-xs text-gray-500">
                Keep checking in daily to climb the ranks! 🚀
            </div>
        </div>
    );
}
