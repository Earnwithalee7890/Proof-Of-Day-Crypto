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
        const score = searchParams.get('score') || streak; // Use streak as default score if none provided

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
                        // Mesh gradient inspired by the user's image (coral -> teal -> purple)
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
                        {/* Profile Picture centered at top */}
                        <div style={{ display: 'flex', marginBottom: '30px' }}>
                            {pfp ? (
                                <img
                                    src={pfp}
                                    style={{
                                        width: '180px',
                                        height: '180px',
                                        borderRadius: '90px',
                                        border: '8px solid white',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                        objectFit: 'cover'
                                    }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: '180px',
                                        height: '180px',
                                        borderRadius: '90px',
                                        backgroundColor: '#0052FF',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '80px',
                                        color: 'white',
                                        border: '8px solid white',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                    }}
                                >
                                    {username[0]?.toUpperCase() || 'P'}
                                </div>
                            )}
                        </div>

                        {/* Title text */}
                        <div style={{
                            fontSize: '48px',
                            fontWeight: '600',
                            color: 'white',
                            marginBottom: '20px',
                            textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                            opacity: 0.9,
                        }}>
                            {username}'s Proof Score
                        </div>

                        {/* Large Score/Streak */}
                        <div style={{
                            fontSize: '180px',
                            fontWeight: '900',
                            color: 'white',
                            lineHeight: 1,
                            textShadow: '0 10px 30px rgba(0,0,0,0.2)',
                            marginBottom: '10px'
                        }}>
                            {score}
                        </div>

                        {/* Label */}
                        <div style={{
                            fontSize: '32px',
                            fontWeight: '700',
                            color: 'white',
                            opacity: 0.8,
                            textTransform: 'uppercase',
                            letterSpacing: '2px'
                        }}>
                            Daily Streak 🔥
                        </div>
                    </div>

                    {/* Bottom White Strip "Button" */}
                    <div style={{
                        position: 'absolute',
                        bottom: '0',
                        width: '100%',
                        backgroundColor: 'white',
                        padding: '30px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <span style={{
                            color: '#7C3AED',
                            fontSize: '28px',
                            fontWeight: '800',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Check Proof Of Day
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
