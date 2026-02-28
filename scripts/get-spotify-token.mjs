/**
 * One-time script to obtain a Spotify refresh_token.
 *
 * Usage:
 *   1. Run: node scripts/get-spotify-token.mjs
 *   2. Open the printed URL in your browser
 *   3. Authorize the app
 *   4. Copy the FULL URL from the browser address bar (even if the page shows 404)
 *   5. Paste it into the terminal
 *   6. Copy the refresh_token to your .env file
 */

import readline from 'node:readline';

// ──────────────────────────────────────────
const CLIENT_ID = 'fd5be3b46be14074be846b946de5808c';
const CLIENT_SECRET = '379f1edaa7c14a8b8a34320c42996a27';
// ──────────────────────────────────────────

// Use the redirect URI that's already in your Spotify Dashboard
const REDIRECT_URI = 'https://www.adampukaluk.pl/callback';
const SCOPES = 'user-read-currently-playing user-read-recently-played';

const authUrl = new URL('https://accounts.spotify.com/authorize');
authUrl.searchParams.set('client_id', CLIENT_ID);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
authUrl.searchParams.set('scope', SCOPES);

console.log('\n🎵  Spotify OAuth Token Generator\n');
console.log('1. Open this URL in your browser:\n');
console.log(authUrl.toString());
console.log('\n2. Authorize the app (log in to Spotify if needed)');
console.log('3. You will be redirected — the page may show 404, THAT IS OK!');
console.log('4. Copy the ENTIRE URL from your browser address bar');
console.log('   It will look like: https://www.adampukaluk.pl/callback?code=AQBx...\n');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question('Paste the full redirect URL here: ', async (input) => {
    try {
        const url = new URL(input.trim());
        const code = url.searchParams.get('code');

        if (!code) {
            console.error('\n❌ No "code" parameter found in the URL. Make sure you copied the full URL.');
            rl.close();
            process.exit(1);
        }

        console.log('\n⏳ Exchanging code for tokens...');

        const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

        const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${basic}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: REDIRECT_URI,
            }),
        });

        const data = await tokenRes.json();

        if (data.error) {
            console.error(`\n❌ Error: ${data.error} — ${data.error_description}`);
            rl.close();
            process.exit(1);
        }

        console.log('\n✅  Success! Here are your tokens:\n');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('\n👉  Copy the line above and paste it into your .env file.');
        console.log('    Then restart npm run dev.\n');
    } catch (e) {
        console.error('\n❌ Failed to parse URL. Make sure you pasted the full URL.', e.message);
    }

    rl.close();
});
