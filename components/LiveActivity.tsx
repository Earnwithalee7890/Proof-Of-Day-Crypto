'use client';

import { useWatchContractEvent } from 'wagmi';
import { DAILY_CHECKIN_WITH_FEES_ADDRESS, DAILY_CHECKIN_WITH_FEES_ABI } from '@/contracts/DailyCheckInWithFees';
import { useState, useEffect } from 'react';
import { distanceToNow } from '@/utils/time';

interface CheckInEvent {
    user: string;
    timestamp: bigint;
    streak: bigint;
    hash?: string;
}

export default function LiveActivity() {
    const [events, setEvents] = useState<CheckInEvent[]>([]);

    useWatchContractEvent({
        address: DAILY_CHECKIN_WITH_FEES_ADDRESS,
        abi: DAILY_CHECKIN_WITH_FEES_ABI,
        eventName: 'CheckedIn',
        onLogs(logs) {
            const newEvents = logs.map(log => ({
                user: log.args.user as string,
                timestamp: log.args.timestamp as bigint,
                streak: log.args.streak as bigint,
                hash: log.transactionHash
            }));

            setEvents(prev => [...newEvents, ...prev].slice(0, 10)); // Keep last 10
        },
    });

    return (
        <div className="glass rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        🔴 Live Activity
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">Real-time check-ins on Base</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-medium text-red-400">Listening</span>
                </div>
            </div>

            <div className="space-y-4">
                {events.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 border border-dashed border-white/10 rounded-xl">
                        <div className="text-4xl mb-2">📡</div>
                        <p>Waiting for new check-ins...</p>
                        <p className="text-xs mt-1">Be the first to appear!</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {events.map((event, index) => (
                            <div
                                key={`${event.hash}-${index}`}
                                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 animate-in fade-in slide-in-from-top-2"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                                        ⚡
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">
                                            {event.user.slice(0, 6)}...{event.user.slice(-4)}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Streak: <span className="text-yellow-400 font-bold">{event.streak.toString()}</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right text-xs text-gray-400">
                                    <a
                                        href={`https://basescan.org/tx/${event.hash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-blue-400 transition-colors"
                                    >
                                        View Tx ↗
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="pt-4 border-t border-white/5 text-center text-xs text-gray-500">
                Showing real-time events from contract 0x6094...29f57
            </div>
        </div>
    );
}
