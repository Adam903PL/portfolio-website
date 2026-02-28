const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_URL =
    'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_URL =
    'https://api.spotify.com/v1/me/player/recently-played?limit=1';

// ── In-memory token cache ──
let cachedToken: { access_token: string; expires_at: number } | null = null;

async function getAccessToken(): Promise<string> {
    if (cachedToken && Date.now() < cachedToken.expires_at) {
        return cachedToken.access_token;
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
        throw new Error('Missing Spotify environment variables');
    }

    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const res = await fetch(TOKEN_URL, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }),
    });

    if (!res.ok) {
        throw new Error(`Token refresh failed: ${res.status}`);
    }

    const data = await res.json();

    cachedToken = {
        access_token: data.access_token,
        expires_at: Date.now() + (data.expires_in - 300) * 1000, // expire 5 min early
    };

    return data.access_token;
}

// ── Response cache (10s TTL) ──
let responseCache: { data: NowPlayingData; expires_at: number } | null = null;
const CACHE_TTL = 10_000;

export interface NowPlayingData {
    isPlaying: boolean;
    title?: string;
    artists?: string;
    album?: string;
    albumImage?: string;
    songUrl?: string;
    progress?: number;
    duration?: number;
}

export async function getNowPlaying(): Promise<NowPlayingData> {
    // Return cached if fresh
    if (responseCache && Date.now() < responseCache.expires_at) {
        return responseCache.data;
    }

    try {
        const token = await getAccessToken();

        const res = await fetch(NOW_PLAYING_URL, {
            headers: { Authorization: `Bearer ${token}` },
            next: { revalidate: 0 },
        });

        // 204 = nothing playing
        if (res.status === 204) {
            const fallback = await getRecentlyPlayed(token);
            cacheResponse(fallback);
            return fallback;
        }

        // 429 = rate limited
        if (res.status === 429) {
            const data: NowPlayingData = { isPlaying: false };
            cacheResponse(data);
            return data;
        }

        if (!res.ok) {
            const data: NowPlayingData = { isPlaying: false };
            cacheResponse(data);
            return data;
        }

        const json = await res.json();
        const item = json?.item;

        if (!item) {
            const fallback = await getRecentlyPlayed(token);
            cacheResponse(fallback);
            return fallback;
        }

        const data: NowPlayingData = {
            isPlaying: json.is_playing ?? false,
            title: item.name,
            artists: item.artists?.map((a: { name: string }) => a.name).join(', '),
            album: item.album?.name,
            albumImage: item.album?.images?.[0]?.url,
            songUrl: item.external_urls?.spotify,
            progress: json.progress_ms,
            duration: item.duration_ms,
        };

        cacheResponse(data);
        return data;
    } catch {
        return { isPlaying: false };
    }
}

async function getRecentlyPlayed(token: string): Promise<NowPlayingData> {
    try {
        const res = await fetch(RECENTLY_PLAYED_URL, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) return { isPlaying: false };

        const json = await res.json();
        const track = json?.items?.[0]?.track;

        if (!track) return { isPlaying: false };

        return {
            isPlaying: false,
            title: track.name,
            artists: track.artists
                ?.map((a: { name: string }) => a.name)
                .join(', '),
            album: track.album?.name,
            albumImage: track.album?.images?.[0]?.url,
            songUrl: track.external_urls?.spotify,
        };
    } catch {
        return { isPlaying: false };
    }
}

function cacheResponse(data: NowPlayingData) {
    responseCache = { data, expires_at: Date.now() + CACHE_TTL };
}
