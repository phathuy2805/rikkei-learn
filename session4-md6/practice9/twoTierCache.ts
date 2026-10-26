/**
 * [Bài tập 9 - Session 4] Nền tảng Two-Tier Cache (L1 Memory + L2 Redis)
 * File: session4-md6/practice9/twoTierCache.ts
 */

export class TwoTierCacheSystem {
  private l1Memory = new Map<string, string>(); // Tầng 1: Siêu nhanh < 0.1ms
  private l2Redis = new Map<string, string>();  // Tầng 2: Chia sẻ tập trung
  public l1HitCount = 0;
  public l2HitCount = 0;

  get(key: string): string | null {
    // 1. Kiểm tra L1
    const l1Val = this.l1Memory.get(key);
    if (l1Val !== undefined) {
      this.l1HitCount++;
      return l1Val;
    }

    // 2. Kiểm tra L2
    const l2Val = this.l2Redis.get(key);
    if (l2Val !== undefined) {
      this.l2HitCount++;
      // Backfill ngược lại vào L1
      this.l1Memory.set(key, l2Val);
      return l2Val;
    }

    return null; // Cache Miss
  }

  set(key: string, value: string) {
    this.l2Redis.set(key, value);
    this.l1Memory.set(key, value);
  }

  // Giả lập Pub/Sub Eviction
  invalidateAcrossCluster(key: string) {
    this.l2Redis.delete(key);
    this.l1Memory.delete(key); // Đồng bộ dọn dẹp L1
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ TWO-TIER CACHE SYSTEM ===");
  const system = new TwoTierCacheSystem();

  system.set("banner_config", "Flash Sale 50%");

  // Đọc lần 1: Hit L1
  system.get("banner_config");
  // Đọc lần 2: Hit L1
  system.get("banner_config");

  console.log("L1 Memory Hits:", system.l1HitCount);
  console.log("L2 Redis Hits:", system.l2HitCount);

  system.invalidateAcrossCluster("banner_config");
  console.log("Giá trị sau khi Invalidate cụm:", system.get("banner_config") || "NULL (Đã xoá)");
  console.log("=> KẾT LUẬN: Nền tảng Two-Tier tối ưu tốc độ vượt trội cho toàn bộ ShopFast!");
}

if (require.main === module) {
  runDemo();
}
