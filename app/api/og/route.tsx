import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const username = searchParams.get('username') || 'Anonymous';
        const streak = searchParams.get('streak') || '0';
        const rewards = searchParams.get('rewards') || '0';
        const pfp = searchParams.get('pfp');
        const score = searchParams.get('score');

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#050505',
                        backgroundImage: 'radial-gradient(circle at 50% 50%, #0052FF20 0%, #050505 100%)',
                        padding: '40px',
                    }}
                >
                    {/* Background Orbs */}
                    <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '400px', height: '400px', borderRadius: '200px', backgroundColor: 'rgba(0, 82, 255, 0.06)', filter: 'blur(80px)' }} />
                    <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '200px', backgroundColor: 'rgba(124, 58, 237, 0.06)', filter: 'blur(80px)' }} />

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            backgroundColor: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: '40px',
                            padding: '60px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                        }}
                    >
                        {/* Profile Section */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '40px' }}>
                            {pfp ? (
                                <img
                                    src={pfp}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50px',
                                        border: '4px solid #0052FF',
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50px',
                                        backgroundColor: '#0052FF',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '48px',
                                        color: 'white',
                                    }}
                                >
                                    {username[0]?.toUpperCase() || 'P'}
                                </div>
                            )}
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{ fontSize: '42px', fontWeight: '900', color: 'white', letterSpacing: '-0.05em' }}>
                                    {username}
                                </span>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <span style={{ fontSize: '18px', fontWeight: '700', color: '#0052FF', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                                        Onchain Commitment
                                    </span>
                                    {score && (
                                        <span style={{ fontSize: '14px', fontWeight: '800', backgroundColor: 'rgba(0, 82, 255, 0.15)', color: '#0052FF', padding: '4px 8px', borderRadius: '6px' }}>
                                            Rep: {score}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div style={{ display: 'flex', gap: '40px' }}>
                            {/* Streak Card */}
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(255, 255, 0, 0.05)',
                                    padding: '30px 50px',
                                    borderRadius: '30px',
                                    border: '1px solid rgba(255, 255, 0, 0.2)',
                                }}
                            >
                                <span style={{ fontSize: '16px', fontWeight: '800', color: '#EAB308', textTransform: 'uppercase', marginBottom: '10px' }}>
                                    Streak
                                </span>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                    <span style={{ fontSize: '72px', fontWeight: '900', color: 'white' }}>{streak}</span>
                                    <span style={{ fontSize: '24px', fontWeight: '700', color: '#EAB308' }}>Days</span>
                                </div>
                                <span style={{ fontSize: '32px', marginTop: '10px' }}>🔥</span>
                            </div>

                            {/* Rewards Card */}
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(0, 82, 255, 0.05)',
                                    padding: '30px 50px',
                                    borderRadius: '30px',
                                    border: '1px solid rgba(0, 82, 255, 0.2)',
                                }}
                            >
                                <span style={{ fontSize: '16px', fontWeight: '800', color: '#0052FF', textTransform: 'uppercase', marginBottom: '10px' }}>
                                    Earned
                                </span>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                    <span style={{ fontSize: '72px', fontWeight: '900', color: 'white' }}>{rewards}</span>
                                    <span style={{ fontSize: '24px', fontWeight: '700', color: '#0052FF' }}>ETH</span>
                                </div>
                                <span style={{ fontSize: '32px', marginTop: '10px' }}>💎</span>
                            </div>
                        </div>

                        {/* Footer */}
                        <div style={{ marginTop: '50px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#0052FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="https://proof-of-day.vercel.app/icon.png" style={{ width: '32px', height: '32px', borderRadius: '8px' }} />
                            </div>
                            <span style={{ fontSize: '24px', fontWeight: '900', color: 'white', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                                Proof Of Day
                            </span>
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        );
    } catch (e: any) {
        console.error('OG Image Generation Error:', e);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
