import { LRUCache } from "lru-cache";

export const rateLimit = new LRUCache<string, number>({
  max: 500,
  ttl: 5 * 60 * 1000,
});
