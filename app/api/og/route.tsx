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
        const score = searchParams.get('score') || streak;

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
                        backgroundImage: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #A06EE1 100%)',
                        fontFamily: 'sans-serif',
                        position: 'relative',
                    }}
                >
                    {/* Top Left App Icon */}
                    <div style={{ position: 'absolute', top: '40px', left: '40px', display: 'flex' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: '#0052FF',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                        }}>
                            <img src="https://proof-of-day.vercel.app/icon.png" style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
                        </div>
                    </div>

                    {/* Content Container */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            height: '100%',
                            padding: '60px',
                        }}
                    >
                        {/* Profile Picture */}
                        <div style={{ display: 'flex', marginBottom: '20px' }}>
                            {pfp ? (
                                <img
                                    src={pfp}
                                    style={{
                                        width: '140px',
                                        height: '140px',
                                        borderRadius: '70px',
                                        border: '6px solid white',
                                        boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
                                        objectFit: 'cover'
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: '140px',
                                        height: '140px',
                                        borderRadius: '70px',
                                        backgroundColor: '#0052FF',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '60px',
                                        color: 'white',
                                        border: '6px solid white',
                                        boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
                                    }}
                                >
                                    {username[0]?.toUpperCase() || 'P'}
                                </div>
                            )}
                        </div>

                        {/* Username */}
                        <div style={{
                            fontSize: '42px',
                            fontWeight: '600',
                            color: 'white',
                            marginBottom: '10px',
                            textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                            opacity: 0.9,
                        }}>
                            {username}
                        </div>

                        {/* Stats Grid */}
                        <div style={{ display: 'flex', gap: '60px', alignItems: 'center', marginTop: '10px' }}>
                            {/* Streak Section */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{
                                    fontSize: '120px',
                                    fontWeight: '900',
                                    color: 'white',
                                    lineHeight: 1,
                                    textShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                }}>
                                    {score}
                                </div>
                                <div style={{
                                    fontSize: '24px',
                                    fontWeight: '700',
                                    color: 'white',
                                    opacity: 0.8,
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    marginTop: '5px'
                                }}>
                                    Streak 🔥
                                </div>
                            </div>

                            {/* Divider Line */}
                            <div style={{ width: '2px', height: '100px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '1px' }} />

                            {/* Rewards Section */}
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{
                                    fontSize: '120px',
                                    fontWeight: '900',
                                    color: 'white',
                                    lineHeight: 1,
                                    textShadow: '0 10px 30px rgba(0,0,0,0.2)',
                                }}>
                                    {rewards}
                                </div>
                                <div style={{
                                    fontSize: '24px',
                                    fontWeight: '700',
                                    color: 'white',
                                    opacity: 0.8,
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px',
                                    marginTop: '5px'
                                }}>
                                    ETH Earned 💎
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom White Strip "Button" */}
                    <div style={{
                        position: 'absolute',
                        bottom: '0',
                        width: '100%',
                        backgroundColor: 'white',
                        padding: '25px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <span style={{
                            color: '#7C3AED',
                            fontSize: '24px',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Join Proof Of Day
                        </span>
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
