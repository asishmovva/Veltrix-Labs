type Bucket = {
  timestamps: number[];
};

const buckets = new Map<string, Bucket>();

type CheckRateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterMs: number;
};

export function checkRateLimit({
  key,
  limit,
  windowMs,
}: CheckRateLimitOptions): RateLimitResult {
  const now = Date.now();
  const windowStart = now - windowMs;
  const existing = buckets.get(key);
  const filtered = existing
    ? existing.timestamps.filter((timestamp) => timestamp > windowStart)
    : [];

  if (filtered.length >= limit) {
    const oldest = filtered[0];
    const retryAfterMs = Math.max(0, oldest + windowMs - now);
    buckets.set(key, { timestamps: filtered });
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs,
    };
  }

  filtered.push(now);
  buckets.set(key, { timestamps: filtered });

  return {
    allowed: true,
    remaining: Math.max(0, limit - filtered.length),
    retryAfterMs: 0,
  };
}
