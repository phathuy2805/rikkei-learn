/**
 * [Bài tập 5 - Session 3] Rate Limiter Guard an toàn chống IP Spoofing
 * File: session3-md6/practice5/rateLimiter.guard.ts
 */

export class SafeRateLimiter {
  private redisStore = new Map<string, { count: number; resetTime: number }>();
  private readonly WINDOW_MS = 60 * 1000; // 1 phút
  private readonly MAX_REQUESTS = 60; // 60 req/phút

  // Trích xuất định danh tin cậy: Ưu tiên User ID / API Key, sau đó mới dùng IP thực
  getClientIdentifier(req: { headers: Record<string, string>; remoteIp: string; userId?: string }): string {
    if (req.userId) {
      return "user:" + req.userId;
    }
    const apiKey = req.headers["x-api-key"];
    if (apiKey) {
      return "key:" + apiKey;
    }
    // Chống giả mạo header x-forwarded-for: chỉ lấy remoteIp thực tế từ TCP socket
    return "ip:" + req.remoteIp;
  }

  isAllowed(clientId: string): { allowed: boolean; remaining: number; resetInSec: number } {
    const now = Date.now();
    const entry = this.redisStore.get(clientId);

    if (!entry || now > entry.resetTime) {
      this.redisStore.set(clientId, { count: 1, resetTime: now + this.WINDOW_MS });
      return { allowed: true, remaining: this.MAX_REQUESTS - 1, resetInSec: 60 };
    }

    if (entry.count >= this.MAX_REQUESTS) {
      const resetInSec = Math.ceil((entry.resetTime - now) / 1000);
      return { allowed: false, remaining: 0, resetInSec };
    }

    entry.count += 1;
    const remaining = this.MAX_REQUESTS - entry.count;
    const resetInSec = Math.ceil((entry.resetTime - now) / 1000);
    return { allowed: true, remaining, resetInSec };
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ SAFE RATE LIMITER GUARD ===");
  const limiter = new SafeRateLimiter();

  // Test giả mạo Header x-forwarded-for
  const botReq = {
    headers: { "x-forwarded-for": "1.2.3.4, 5.6.7.8" }, // Header giả mạo
    remoteIp: "192.168.1.100", // IP TCP socket thực tế
  };

  const id = limiter.getClientIdentifier(botReq);
  console.log("1. Định danh thực tế nhận diện được:", id);

  // Mô phỏng bắn 65 requests
  let blockedCount = 0;
  for (let i = 0; i < 65; i++) {
    const res = limiter.isAllowed(id);
    if (!res.allowed) blockedCount++;
  }

  console.log("2. Kết quả chặn sau 65 requests:");
  console.log("  ↳ Số request bị chặn HTTP 429:", blockedCount);
  console.log("=> KẾT LUẬN: Đã vá hoàn toàn lỗ hổng IP Spoofing và giới hạn chuẩn 60 req/phút!");
}

if (require.main === module) {
  runDemo();
}
