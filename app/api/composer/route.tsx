import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    // Return a simple HTML page that will be rendered in the Farcaster composer
    return new NextResponse(`
        <!DOCTYPE html>
        <html>
            <head>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        background: #050505;
                        color: white;
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        height: 100vh;
                        text-align: center;
                    }
                    .container {
                        padding: 20px;
                        max-width: 400px;
                    }
                    .logo {
                        width: 60px;
                        height: 60px;
                        margin-bottom: 20px;
                        border-radius: 12px;
                        border: 1px solid rgba(255,255,255,0.1);
                    }
                    h1 {
                        font-size: 20px;
                        font-weight: 800;
                        margin-bottom: 8px;
                        text-transform: uppercase;
                        letter-spacing: -0.02em;
                    }
                    p {
                        color: #888;
                        font-size: 14px;
                        margin-bottom: 24px;
                    }
                    button {
                        background: #0052FF;
                        color: white;
                        border: none;
                        padding: 12px 24px;
                        border-radius: 12px;
                        font-weight: 700;
                        font-size: 16px;
                        cursor: pointer;
                        width: 100%;
                        transition: transform 0.2s;
                    }
                    button:active {
                        transform: scale(0.98);
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <img src="https://proof-of-day.vercel.app/icon.png" class="logo" />
                    <h1>Share Your Streak</h1>
                    <p>Embed your Proof Of Day commitment into your cast.</p>
                    <button onclick="embed()">Embed Proof</button>
                </div>
                <script>
                    function embed() {
                        const message = {
                            type: 'createCast',
                            data: {
                                text: "I'm building my streak on Proof Of Day! 🔵🔥\\n\\nJoin me on Base:",
                                embeds: ["https://proof-of-day.vercel.app"]
                            }
                        };
                        window.parent.postMessage(message, "*");
                    }
                </script>
            </body>
        </html>
    `, {
        headers: {
            'Content-Type': 'text/html',
        },
    });
}
