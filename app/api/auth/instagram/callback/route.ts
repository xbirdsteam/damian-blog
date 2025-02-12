import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
        return NextResponse.json({ error: 'No code provided' }, { status: 400 });
    }

    try {
        // 1. Exchange code for short-lived access token
        const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID!,
                client_secret: process.env.INSTAGRAM_CLIENT_SECRET!,
                grant_type: 'authorization_code',
                redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`,
                code,
            }),
        });

        if (!tokenResponse.ok) {
            throw new Error('Failed to get short-lived access token');
        }

        const shortLivedToken = await tokenResponse.json();

        // 2. Exchange short-lived token for long-lived token
        const longLivedTokenResponse = await fetch(
            `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${shortLivedToken.access_token}`
        );

        if (!longLivedTokenResponse.ok) {
            throw new Error('Failed to get long-lived access token');
        }

        const longLivedToken = await longLivedTokenResponse.json();

        // 3. Get user info using the long-lived token
        const userResponse = await fetch(
            `https://graph.instagram.com/me?fields=id,username&access_token=${longLivedToken.access_token}`
        );

        if (!userResponse.ok) {
            throw new Error('Failed to get user info');
        }

        const userData = await userResponse.json();

        // Create response with redirect
        const response = NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/gastronomy`);

        // Set cookies with user data and long-lived token
        response.cookies.set('instagram_user_id', userData.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 24 * 60 * 60 // 60 days to match token expiration
        });

        response.cookies.set('instagram_username', userData.username, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 24 * 60 * 60
        });

        response.cookies.set('instagram_access_token', longLivedToken.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 24 * 60 * 60
        });

        return response;
    } catch (error) {
        console.error('Instagram auth error:', error);
        return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }
} 