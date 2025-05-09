import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(1000000000, "10s"),
  prefix: "@upstash/ratelimit",
  analytics: true,
});
