/**
 * [Bài tập 6 - Session 4] Cơ chế Mutex Lock chống Cache Stampede
 * File: session4-md6/practice6/stampedeLock.ts
 */

export class CacheStampedeProtector {
  private cache = new Map<string, string>();
  private locks = new Set<string>();
  public dbQueryCount = 0;

  async getOrCompute(key: string, computeFn: () => Promise<string>): Promise<string> {
    const cached = this.cache.get(key);
    if (cached) return cached;

    const lockKey = "lock:" + key;

    // Cố gắng chiếm Mutex Lock (SETNX)
    if (!this.locks.has(lockKey)) {
      this.locks.add(lockKey);
      try {
        this.dbQueryCount++;
        const freshData = await computeFn();
        this.cache.set(key, freshData);
        return freshData;
      } finally {
        this.locks.delete(lockKey);
      }
    } else {
      // Đợi request đầu tiên nạp xong
      await new Promise((r) => setTimeout(r, 50));
      return this.cache.get(key) || (await computeFn());
    }
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ CHỐNG CACHE STAMPEDE BẰNG MUTEX LOCK ===");
  const protector = new CacheStampedeProtector();

  // Mô phỏng 100 requests đồng thời khi cache rỗng
  const requests = Array.from({ length: 100 }, () =>
    protector.getOrCompute("hot_deal_feed", async () => {
      await new Promise((r) => setTimeout(r, 10)); // Giả lập query DB 10ms
      return JSON.stringify({ item: "Flash Sale Tivi", stock: 5 });
    })
  );

  Promise.all(requests).then(() => {
    console.log("Tổng số requests đồng thời: 100");
    console.log("Số lần thực tế chạm vào Database:", protector.dbQueryCount);
    console.log("=> KẾT LUẬN: " + (protector.dbQueryCount === 1 ? "PASSED (Chỉ đúng 1 request chạm DB)" : "FAILED"));
  });
}

if (require.main === module) {
  runDemo();
}
