'use client';

import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { REFERRAL_REGISTRY_ADDRESS, REFERRAL_REGISTRY_ABI } from '@/contracts/ReferralRegistry';

export default function ReferralDashboard() {
    const { address, isConnected } = useAccount();
    const [referrerInput, setReferrerInput] = useState('');

    const { writeContract, data: hash, isPending } = useWriteContract();
    const { isSuccess } = useWaitForTransactionReceipt({ hash });

    // Read Data
    const { data: myReferrer } = useReadContract({
        address: REFERRAL_REGISTRY_ADDRESS,
        abi: REFERRAL_REGISTRY_ABI,
        functionName: 'getReferrer',
        args: address ? [address] : undefined,
    });

    const { data: referralCount } = useReadContract({
        address: REFERRAL_REGISTRY_ADDRESS,
        abi: REFERRAL_REGISTRY_ABI,
        functionName: 'getReferralCount',
        args: address ? [address] : undefined,
    });

    const handleRegister = () => {
        if (!referrerInput || !referrerInput.startsWith('0x')) return;
        writeContract({
            address: REFERRAL_REGISTRY_ADDRESS,
            abi: REFERRAL_REGISTRY_ABI,
            functionName: 'register',
            args: [referrerInput as `0x${string}`],
        });
    };

    const copyLink = () => {
        if (address) {
            const link = `https://proof-of-day.vercel.app?ref=${address}`;
            navigator.clipboard.writeText(link);
            alert('Referral link copied!');
        }
    };

    if (!isConnected) return null;

    const hasReferrer = myReferrer && myReferrer !== '0x0000000000000000000000000000000000000000';

    return (
        <div className="glass rounded-2xl p-8 space-y-6">
            <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🤝</span>
                <div>
                    <h3 className="text-xl font-bold">Referral Program</h3>
                    <p className="text-sm text-gray-400">Invite friends, build the community.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">

                {/* Your Stats */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">You Invited</p>
                    <p className="text-3xl font-mono font-bold">{referralCount ? referralCount.toString() : '0'}</p>
                    <p className="text-xs text-gray-400 mt-1">Friends Onchain</p>

                    <button
                        onClick={copyLink}
                        className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                        Copy Invite Link
                    </button>
                </div>

                {/* Set Referrer */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Your Referrer</p>

                    {hasReferrer ? (
                        <div className="text-green-400 font-mono text-sm break-all">
                            ✅ Linked to:<br />
                            <span className="text-white">{myReferrer}</span>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <p className="text-xs text-gray-400">Who invited you?</p>
                            <input
                                type="text"
                                placeholder="0x..."
                                value={referrerInput}
                                onChange={(e) => setReferrerInput(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm font-mono"
                            />
                            <button
                                onClick={handleRegister}
                                disabled={isPending || !referrerInput}
                                className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-bold transition-colors disabled:opacity-50"
                            >
                                {isPending ? 'Linking...' : 'Confirm Referrer'}
                            </button>
                            {isSuccess && <p className="text-green-400 text-xs">Successfully linked!</p>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
