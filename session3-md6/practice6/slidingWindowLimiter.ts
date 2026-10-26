/**
 * [Bài tập 6 - Session 3] Bộ đếm cửa sổ trượt Sliding Window Log
 * File: session3-md6/practice6/slidingWindowLimiter.ts
 */

export class SlidingWindowLogLimiter {
  // Giả lập Redis Sorted Set (ZSET)
  private redisZSet = new Map<string, number[]>();

  constructor(private limit = 10, private windowMs = 60000) {}

  checkRateLimit(key: string): { allowed: boolean; currentCount: number; retryAfterSec?: number } {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    let timestamps = this.redisZSet.get(key) || [];

    // 1. ZREMRANGEBYSCORE: Loại bỏ các phần tử nằm ngoài cửa sổ trượt
    timestamps = timestamps.filter((t) => t > windowStart);

    // 2. ZCARD: Kiểm tra số lượng phần tử hiện có
    if (timestamps.length >= this.limit) {
      const oldestInWindow = timestamps[0];
      const retryAfterSec = Math.ceil((oldestInWindow + this.windowMs - now) / 1000);
      this.redisZSet.set(key, timestamps);
      return { allowed: false, currentCount: timestamps.length, retryAfterSec };
    }

    // 3. ZADD: Ghi nhận request mới
    timestamps.push(now);
    this.redisZSet.set(key, timestamps);

    return { allowed: true, currentCount: timestamps.length };
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ SLIDING WINDOW LOG ===");
  const limiter = new SlidingWindowLogLimiter(5, 10000); // 5 req / 10s
  const clientId = "client_test_sliding";

  for (let i = 1; i <= 6; i++) {
    const res = limiter.checkRateLimit(clientId);
    console.log("Request " + i + ": " + (res.allowed ? "ALLOWED" : "BLOCKED (HTTP 429)") + " | Đếm: " + res.currentCount);
  }
  console.log("=> KẾT LUẬN: Cửa sổ trượt loại trừ hoàn toàn hiện tượng Spike ở biên Fixed Window!");
}

if (require.main === module) {
  runDemo();
}
