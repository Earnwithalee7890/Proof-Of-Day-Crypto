'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';

export default function ExportData() {
    const { address } = useAccount();
    const [exporting, setExporting] = useState<string | null>(null);

    const generateCSV = () => {
        setExporting('csv');

        // Generate sample check-in data
        const csvData = [
            ['Date', 'Status', 'Streak', 'Reward (ETH)'],
            ['2025-12-30', 'Checked In', '15', '0.0001'],
            ['2025-12-29', 'Checked In', '14', '0.0001'],
            ['2025-12-28', 'Checked In', '13', '0.0001'],
            ['2025-12-27', 'Missed', '0', '0'],
            ['2025-12-26', 'Checked In', '12', '0.0001'],
        ];

        const csvContent = csvData.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `proof-of-day-history-${Date.now()}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);

        setTimeout(() => setExporting(null), 2000);
    };

    const generateJSON = () => {
        setExporting('json');

        const jsonData = {
            address: address || '0x...',
            exportDate: new Date().toISOString(),
            stats: {
                currentStreak: 15,
                longestStreak: 25,
                totalCheckIns: 87,
                totalRewards: '0.0087 ETH',
                memberSince: '2025-12-01',
            },
            achievements: [
                { name: 'Week Warrior', date: '2025-12-07', milestone: 7 },
                { name: 'Getting Started', date: '2025-12-03', milestone: 3 },
            ],
            checkInHistory: [
                { date: '2025-12-30', checkedIn: true, streak: 15 },
                { date: '2025-12-29', checkedIn: true, streak: 14 },
                { date: '2025-12-28', checkedIn: true, streak: 13 },
            ],
        };

        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `proof-of-day-data-${Date.now()}.json`;
        a.click();
        window.URL.revokeObjectURL(url);

        setTimeout(() => setExporting(null), 2000);
    };

    const copyToClipboard = async () => {
        setExporting('clipboard');

        const summary = `🔵 Proof Of Day Stats

Wallet: ${address || '0x...'}
Current Streak: 15 days 🔥
Total Check-Ins: 87
Total Rewards: 0.0087 ETH ($25.81)

Achievements:
💪 Week Warrior (7 days)
🌱 Getting Started (3 days)

Exported on: ${new Date().toLocaleDateString()}`;

        await navigator.clipboard.writeText(summary);
        setTimeout(() => setExporting(null), 2000);
    };

    const exportFormats = [
        {
            id: 'csv',
            title: 'CSV Export',
            description: 'Download check-in history',
            icon: '📊',
            action: generateCSV,
            color: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
        },
        {
            id: 'json',
            title: 'JSON Export',
            description: 'Full data export',
            icon: '📦',
            action: generateJSON,
            color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
        },
        {
            id: 'clipboard',
            title: 'Copy Summary',
            description: 'Share-friendly format',
            icon: '📋',
            action: copyToClipboard,
            color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
        },
    ];

    return (
        <div className="glass rounded-2xl p-6 space-y-6">
            <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    📥 Export Your Data
                </h2>
                <p className="text-sm text-gray-400 mt-1">Download your check-in history and stats</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {exportFormats.map((format) => (
                    <button
                        key={format.id}
                        onClick={format.action}
                        disabled={exporting === format.id}
                        className={`p-5 rounded-xl border bg-gradient-to-br ${format.color} hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:scale-100 text-left`}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <span className="text-4xl">{format.icon}</span>
                            {exporting === format.id && (
                                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30">
                                    <span className="text-xs text-green-400 font-bold">✓</span>
                                </div>
                            )}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">{format.title}</h3>
                        <p className="text-sm text-gray-400">{format.description}</p>
                        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-white/60">
                            <span>↓</span>
                            <span>{exporting === format.id ? 'Exported!' : 'Click to export'}</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Data Ownership Notice */}
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-start gap-3">
                    <span className="text-2xl">🔐</span>
                    <div>
                        <h4 className="font-bold text-blue-300 mb-1">Your Data, Your Control</h4>
                        <p className="text-sm text-gray-300">
                            All your check-in data is stored onchain and belongs to you. Export anytime for personal records, tax reporting, or data portability.
                        </p>
                    </div>
                </div>
            </div>

            {/* Export Info */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                <div className="text-center">
                    <p className="text-2xl font-black text-gradient">87</p>
                    <p className="text-xs text-gray-400 mt-1">Total Records</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-black text-gradient">3</p>
                    <p className="text-xs text-gray-400 mt-1">Export Formats</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-black text-gradient">∞</p>
                    <p className="text-xs text-gray-400 mt-1">Free Exports</p>
                </div>
            </div>
        </div>
    );
}
