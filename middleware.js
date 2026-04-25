import { NextResponse } from 'next/server';

// ---------------------------------------------------------------------------
// Lightweight in-memory IP-based rate limiter
// Max 60 requests per 60-second sliding window per IP.
// The Map is scoped to the edge runtime instance; on Vercel each isolate gets
// its own copy, which is fine for per-instance burst protection.
// ---------------------------------------------------------------------------
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60;

/** @type {Map<string, { count: number, resetTime: number }>} */
const rateLimitMap = new Map();

// Periodically prune expired entries to avoid unbounded memory growth
let lastPrune = Date.now();
const PRUNE_INTERVAL_MS = 5 * 60 * 1000; // every 5 minutes

function pruneExpiredEntries() {
  const now = Date.now();
  if (now - lastPrune < PRUNE_INTERVAL_MS) return;
  lastPrune = now;
  for (const [key, value] of rateLimitMap) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

/**
 * Returns true if the request should be blocked (rate limit exceeded).
 */
function isRateLimited(ip) {
  pruneExpiredEntries();

  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    // First request in this window or window expired — start fresh
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;

  if (entry.count > MAX_REQUESTS) {
    return true; // exceeded
  }

  return false;
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // ── Rate-limit only /api/* routes ──────────────────────────────────────
  if (pathname.startsWith('/api')) {
    // Resolve the caller's IP (works on Vercel, Cloudflare, and locally)
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || request.ip || '127.0.0.1';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Limit': String(MAX_REQUESTS),
          },
        }
      );
    }
  }

  // ── All other routes pass through (auth is handled client-side) ────────
  return NextResponse.next();
}

export const config = {
  // Match all API routes for rate limiting
  matcher: ['/api/:path*'],
};
