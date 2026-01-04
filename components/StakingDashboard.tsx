'use client';

import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatEther, parseEther } from 'viem';
import { STAKING_VAULT_ADDRESS, STAKING_VAULT_ABI } from '@/contracts/StakingVault';
import { motion } from 'framer-motion';

export default function StakingDashboard() {
    const { address, isConnected } = useAccount();
    const [stakeAmount, setStakeAmount] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [activeTab, setActiveTab] = useState<'stake' | 'withdraw'>('stake');

    const { writeContract, data: hash, isPending: isWritePending } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

    // Read Contract Data
    const { data: totalStaked } = useReadContract({
        address: STAKING_VAULT_ADDRESS,
        abi: STAKING_VAULT_ABI,
        functionName: 'totalStaked',
        query: { refetchInterval: 5000 }
    });

    const { data: myStake } = useReadContract({
        address: STAKING_VAULT_ADDRESS,
        abi: STAKING_VAULT_ABI,
        functionName: 'balances',
        args: address ? [address] : undefined,
        query: { enabled: !!address, refetchInterval: 5000 }
    });

    const { data: earnedRewards } = useReadContract({
        address: STAKING_VAULT_ADDRESS,
        abi: STAKING_VAULT_ABI,
        functionName: 'earned',
        args: address ? [address] : undefined,
        query: { enabled: !!address, refetchInterval: 5000 }
    });

    const handleStake = () => {
        if (!stakeAmount) return;
        writeContract({
            address: STAKING_VAULT_ADDRESS,
            abi: STAKING_VAULT_ABI,
            functionName: 'stake',
            value: parseEther(stakeAmount),
        });
    };

    const handleWithdraw = () => {
        if (!withdrawAmount) return;
        writeContract({
            address: STAKING_VAULT_ADDRESS,
            abi: STAKING_VAULT_ABI,
            functionName: 'withdraw',
            args: [parseEther(withdrawAmount)],
        });
    };

    const handleClaim = () => {
        writeContract({
            address: STAKING_VAULT_ADDRESS,
            abi: STAKING_VAULT_ABI,
            functionName: 'claim',
        });
    };

    if (!isConnected) return null;

    return (
        <div className="glass rounded-2xl p-6 md:p-8 space-y-8 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
                <div className="text-center space-y-2 mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-widest border border-purple-500/20">
                        <span>New</span>
                        <span className="w-1 h-1 rounded-full bg-purple-400 animate-pulse" />
                        <span>Core Vault</span>
                    </div>
                    <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        Earn Yield on Base
                    </h3>
                    <p className="text-gray-400 text-sm max-w-md mx-auto">
                        Stake ETH to earn a share of protocol fees. Rewards are distributed automatically from check-ins.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-1">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Total Value Locked</p>
                        <p className="text-xl font-mono text-white">
                            {totalStaked ? parseFloat(formatEther(totalStaked)).toFixed(4) : '0.0000'} <span className="text-xs text-gray-500">ETH</span>
                        </p>
                    </div>
                    <div className="p-4 rounded-xl bg-black/20 border border-white/5 space-y-1">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">My Staked</p>
                        <p className="text-xl font-mono text-purple-400">
                            {myStake ? parseFloat(formatEther(myStake)).toFixed(4) : '0.0000'} <span className="text-xs text-gray-500">ETH</span>
                        </p>
                    </div>
                    <div className="col-span-2 md:col-span-1 p-4 rounded-xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 space-y-1 relative group">
                        <p className="text-xs text-purple-300 uppercase tracking-wider">Unclaimed Rewards</p>
                        <div className="flex items-center justify-between">
                            <p className="text-xl font-mono text-white">
                                {earnedRewards ? parseFloat(formatEther(earnedRewards)).toFixed(6) : '0.000000'} <span className="text-xs text-gray-500">ETH</span>
                            </p>
                            <button
                                onClick={handleClaim}
                                disabled={!earnedRewards || earnedRewards === 0n || isWritePending}
                                className="px-3 py-1 text-xs bg-purple-500 hover:bg-purple-600 active:scale-95 text-white rounded-lg transition-all disabled:opacity-50 disabled:pointer-events-none"
                            >
                                Claim
                            </button>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="bg-black/20 rounded-xl p-1 border border-white/5 mb-6 flex">
                    <button
                        onClick={() => setActiveTab('stake')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'stake' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Stake
                    </button>
                    <button
                        onClick={() => setActiveTab('withdraw')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'withdraw' ? 'bg-gray-700 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Withdraw
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="relative">
                        <input
                            type="number"
                            placeholder="0.0"
                            value={activeTab === 'stake' ? stakeAmount : withdrawAmount}
                            onChange={(e) => activeTab === 'stake' ? setStakeAmount(e.target.value) : setWithdrawAmount(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-2xl font-mono text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">ETH</span>
                    </div>

                    <button
                        onClick={activeTab === 'stake' ? handleStake : handleWithdraw}
                        disabled={isWritePending || isConfirming}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed
                            ${activeTab === 'stake'
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-500/20'
                                : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
                    >
                        {isWritePending ? 'Confirming...' : isConfirming ? 'Processing...' : activeTab === 'stake' ? 'Stake ETH' : 'Withdraw Stake'}
                    </button>
                </div>
            </div>
        </div>
    );
}
