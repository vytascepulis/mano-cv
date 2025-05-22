import { LRUCache } from "lru-cache";

export const rateLimit = new LRUCache<string, number>({
  max: 500,
  ttl: 3 * 60 * 1000,
});
