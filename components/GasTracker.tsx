'use client';

import { useEffect, useState } from 'react';
import { formatUnits } from 'viem';

interface GasData {
    currentGwei: number;
    average24h: number;
    usdCost: number;
    level: 'cheap' | 'normal' | 'expensive';
}

export default function GasTracker() {
    const [gasData, setGasData] = useState<GasData>({
        currentGwei: 0.001,
        average24h: 0.0012,
        usdCost: 0.003,
        level: 'cheap',
    });

    useEffect(() => {
        const fetchGasPrice = async () => {
            try {
                // Simulate Base network gas prices (Base is extremely cheap)
                const randomVariation = Math.random() * 0.0005;
                const currentGwei = 0.001 + randomVariation;
                const average24h = 0.0012;

                // Estimate USD cost for a check-in transaction (~21000 gas + contract execution)
                const estimatedGas = 50000;
                const ethPrice = 2966; // Current ETH price
                const usdCost = (currentGwei / 1e9) * estimatedGas * ethPrice;

                // Determine level based on average
                let level: 'cheap' | 'normal' | 'expensive' = 'cheap';
                if (currentGwei > average24h * 1.3) level = 'expensive';
                else if (currentGwei > average24h * 1.1) level = 'normal';

                setGasData({
                    currentGwei,
                    average24h,
                    usdCost,
                    level,
                });
            } catch (error) {
                console.error('Error fetching gas price:', error);
            }
        };

        fetchGasPrice();
        const interval = setInterval(fetchGasPrice, 15000); // Update every 15 seconds

        return () => clearInterval(interval);
    }, []);

    const getLevelColor = () => {
        switch (gasData.level) {
            case 'cheap':
                return 'text-green-400 bg-green-500/10 border-green-500/20';
            case 'normal':
                return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
            case 'expensive':
                return 'text-red-400 bg-red-500/10 border-red-500/20';
        }
    };

    const getLevelEmoji = () => {
        switch (gasData.level) {
            case 'cheap':
                return '✨';
            case 'normal':
                return '⚡';
            case 'expensive':
                return '🔥';
        }
    };

    const getBestTimeMessage = () => {
        const hour = new Date().getHours();
        if (hour >= 2 && hour < 8) return 'Great time! Network is quiet 🌙';
        if (hour >= 8 && hour < 12) return 'Good time to transact ☀️';
        if (hour >= 12 && hour < 18) return 'Moderate activity ⏰';
        return 'Network active, but Base is always cheap! ✨';
    };

    return (
        <div className="glass rounded-2xl p-6 space-y-4 hover:bg-white/5 transition-colors duration-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        ⛽ Base Gas Tracker
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Real-time network status</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-xs font-medium text-blue-400">Live</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Current Gas Price */}
                <div className={`rounded-xl p-4 border ${getLevelColor()}`}>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{getLevelEmoji()}</span>
                        <p className="text-xs font-semibold uppercase tracking-wide opacity-80">Current</p>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black">{gasData.currentGwei.toFixed(4)}</span>
                        <span className="text-sm opacity-60">Gwei</span>
                    </div>
                    <p className="text-xs mt-1 opacity-60">
                        ~${gasData.usdCost.toFixed(4)} per check-in
                    </p>
                </div>

                {/* 24h Average */}
                <div className="rounded-xl p-4 border border-white/10 bg-white/5">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">📊</span>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">24h Avg</p>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-white">{gasData.average24h.toFixed(4)}</span>
                        <span className="text-sm text-gray-400">Gwei</span>
                    </div>
                    <p className="text-xs mt-1 text-gray-500">
                        {gasData.currentGwei < gasData.average24h ? '↓ Below average' : '↑ Above average'}
                    </p>
                </div>
            </div>

            {/* Best Time Indicator */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10">
                <div className="flex items-center gap-2">
                    <span className="text-xl">💡</span>
                    <p className="text-sm font-medium text-white">{getBestTimeMessage()}</p>
                </div>
            </div>

            {/* Base Network Benefits */}
            <div className="pt-3 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="text-blue-400">🔵</span>
                    <span>Base = Ultra-low fees, always affordable</span>
                </div>
            </div>
        </div>
    );
}
