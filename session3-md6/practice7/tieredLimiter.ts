/**
 * [Bài tập 7 - Session 3] Tiered Rate Limiter theo gói dịch vụ
 * File: session3-md6/practice7/tieredLimiter.ts
 */

export type ServiceTier = "FREE" | "PRO" | "ENTERPRISE";

export interface TierConfig {
  limitPerMinute: number;
}

export const TIER_CONFIGS: Record<ServiceTier, TierConfig> = {
  FREE: { limitPerMinute: 60 },
  PRO: { limitPerMinute: 600 },
  ENTERPRISE: { limitPerMinute: 6000 },
};

export class TieredRateLimiter {
  private counters = new Map<string, { count: number; expiresAt: number }>();

  check(apiKey: string, tier: ServiceTier): { allowed: boolean; remaining: number; limit: number } {
    const config = TIER_CONFIGS[tier];
    const now = Date.now();
    const entry = this.counters.get(apiKey);

    if (!entry || now > entry.expiresAt) {
      this.counters.set(apiKey, { count: 1, expiresAt: now + 60000 });
      return { allowed: true, remaining: config.limitPerMinute - 1, limit: config.limitPerMinute };
    }

    if (entry.count >= config.limitPerMinute) {
      return { allowed: false, remaining: 0, limit: config.limitPerMinute };
    }

    entry.count++;
    return { allowed: true, remaining: config.limitPerMinute - entry.count, limit: config.limitPerMinute };
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ TIERED RATE LIMITER ===");
  const limiter = new TieredRateLimiter();

  const freeRes = limiter.check("free_key_1", "FREE");
  const proRes = limiter.check("pro_key_1", "PRO");
  const entRes = limiter.check("ent_key_1", "ENTERPRISE");

  console.log("FREE Plan Limit:", freeRes.limit, "req/min | Remaining:", freeRes.remaining);
  console.log("PRO Plan Limit:", proRes.limit, "req/min | Remaining:", proRes.remaining);
  console.log("ENTERPRISE Limit:", entRes.limit, "req/min | Remaining:", entRes.remaining);
  console.log("=> KẾT LUẬN: Đã phân tầng hạn mức chuẩn xác theo từng gói dịch vụ!");
}

if (require.main === module) {
  runDemo();
}
