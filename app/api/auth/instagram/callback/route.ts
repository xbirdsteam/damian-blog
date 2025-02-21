import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
        return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }
    try {
        // Step 1: Exchange code for short-lived access token
        const formData = new FormData();
        formData.append('client_id', process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID!);
        formData.append('client_secret', process.env.INSTAGRAM_CLIENT_SECRET!);
        formData.append('grant_type', 'authorization_code');
        formData.append('redirect_uri', `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback/`);
        formData.append('code', code);

        const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
            method: 'POST',
            body: formData
        });

        const tokenData = await tokenResponse.json();
        if (!tokenResponse.ok) {
            throw new Error('Failed to get access token');
        }

        // Step 2: Exchange for long-lived token
        const longLivedTokenResponse = await fetch(
            `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${tokenData.access_token}`
        );

        if (!longLivedTokenResponse.ok) {
            throw new Error('Failed to get long-lived access token');
        }

        const longLivedToken = await longLivedTokenResponse.json();

        // Return HTML that sets cookie and redirects back
        const response = new Response(
            `
            <html>
                <body>
                    <script>
                        // Set cookie
                        document.cookie = 'instagram_access_token=${longLivedToken.access_token}; path=/; max-age=${60 * 24 * 60 * 60}; SameSite=Lax';
                        
                        // Redirect back to stored URL or homepage
                        const redirectUrl = localStorage.getItem('instagram_redirect_url') || '/';
                        window.location.href = redirectUrl;
                    </script>
                </body>
            </html>
            `,
            {
                headers: {
                    'Content-Type': 'text/html',
                },
            }
        );

        return response;
    } catch (error) {
        console.error('Instagram auth error:', error);
        return new Response(
            `
            <html>
                <body>
                    <script>
                        const redirectUrl = localStorage.getItem('instagram_redirect_url') || '/';
                        window.location.href = redirectUrl + '?error=instagram_auth_failed';
                    </script>
                </body>
            </html>
            `,
            {
                headers: {
                    'Content-Type': 'text/html',
                },
            }
        );
    }
} 