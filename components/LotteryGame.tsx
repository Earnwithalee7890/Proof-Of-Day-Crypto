'use client';

import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import { DAILY_LOTTERY_ADDRESS, DAILY_LOTTERY_ABI } from '@/contracts/DailyLottery';
import { motion, AnimatePresence } from 'framer-motion';

export default function LotteryGame() {
    const { address, isConnected } = useAccount();
    const { writeContract, data: hash, isPending: isWritePending } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

    // Read Contract Data
    const { data: ticketPrice } = useReadContract({
        address: DAILY_LOTTERY_ADDRESS,
        abi: DAILY_LOTTERY_ABI,
        functionName: 'ticketPrice',
    });

    const { data: potSize } = useReadContract({
        address: DAILY_LOTTERY_ADDRESS,
        abi: DAILY_LOTTERY_ABI,
        functionName: 'getPot',
        query: { refetchInterval: 5000 }
    });

    const { data: players } = useReadContract({
        address: DAILY_LOTTERY_ADDRESS,
        abi: DAILY_LOTTERY_ABI,
        functionName: 'getPlayers',
        query: { refetchInterval: 5000 }
    });

    const { data: lastWinner } = useReadContract({
        address: DAILY_LOTTERY_ADDRESS,
        abi: DAILY_LOTTERY_ABI,
        functionName: 'lastWinner',
    });

    const { data: lastWinAmount } = useReadContract({
        address: DAILY_LOTTERY_ADDRESS,
        abi: DAILY_LOTTERY_ABI,
        functionName: 'lastWinAmount',
    });

    const handleEnter = () => {
        if (!ticketPrice) return;
        writeContract({
            address: DAILY_LOTTERY_ADDRESS,
            abi: DAILY_LOTTERY_ABI,
            functionName: 'enter',
            value: ticketPrice,
        });
    };

    if (!isConnected) return null;

    const formattedPrice = ticketPrice ? formatEther(ticketPrice) : '0.001';
    const formattedPot = potSize ? formatEther(potSize) : '0';
    const odds = players ? (1 / (players.length + 1) * 100).toFixed(1) : '100';

    return (
        <div className="glass rounded-2xl p-8 relative overflow-hidden group">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-yellow-500/5 group-hover:bg-yellow-500/10 transition-colors duration-500" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">

                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <span className="text-2xl">🎰</span>
                            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                                Daily Jackpot
                            </h3>
                        </div>
                        <p className="text-sm text-gray-400">Winner takes 90% of the pot every 24h.</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-yellow-500/80 font-bold uppercase tracking-widest mb-1">Current Pot</p>
                        <p className="text-2xl font-mono text-white drop-shadow-lg">
                            {formattedPot} <span className="text-sm text-gray-500">ETH</span>
                        </p>
                    </div>
                </div>

                {/* Main Action Area */}
                <div className="bg-black/30 rounded-xl p-6 border border-yellow-500/20 backdrop-blur-sm">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="space-y-1">
                            <p className="text-xs text-gray-400 uppercase">Entry Fee</p>
                            <p className="font-mono text-lg">{formattedPrice} ETH</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-400 uppercase">Your Odds</p>
                            <p className="font-mono text-lg text-green-400">~{odds}%</p>
                        </div>
                    </div>

                    <button
                        onClick={handleEnter}
                        disabled={isWritePending || isConfirming}
                        className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black shadow-lg shadow-yellow-500/20 transform active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale"
                    >
                        {isWritePending ? 'Confirming...' : isConfirming ? 'Buying Ticket...' : '🎟️ Buy Ticket'}
                    </button>

                    {isConfirmed && (
                        <p className="text-center text-green-400 text-sm mt-3 font-bold animate-pulse">
                            ✅ Ticket Purchased! Good luck!
                        </p>
                    )}
                </div>

                {/* Stats / Footer */}
                <div className="flex items-center justify-between text-xs text-gray-500 border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2">
                        <span>👥 {players?.length || 0} Players</span>
                    </div>
                    {lastWinner && lastWinner !== '0x0000000000000000000000000000000000000000' && (
                        <div className="text-right">
                            <span className="block text-[10px] uppercase tracking-wider">Last Winner:</span>
                            <span className="font-mono text-yellow-500">
                                {lastWinner.slice(0, 6)}...{lastWinner.slice(-4)}
                                <span className="text-white ml-2">({formatEther(lastWinAmount || BigInt(0))} ETH)</span>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
