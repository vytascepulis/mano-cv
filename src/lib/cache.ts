import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
const redis = Redis.fromEnv();

export function createRateLimiter(maxRequests: number) {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(maxRequests, "3 m"),
    analytics: true,
  });
}
