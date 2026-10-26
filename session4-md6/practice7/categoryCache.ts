/**
 * [Bài tập 7 - Session 4] Tầng Cache danh mục đa bộ lọc
 * File: session4-md6/practice7/categoryCache.ts
 */

import crypto from "node:crypto";

export class CategoryCacheService {
  private cache = new Map<string, string>();
  private categoryTags = new Map<string, Set<string>>();

  // Tạo Deterministic Cache Key bằng cách chuẩn hóa tham số
  generateCacheKey(categoryId: string, filters: Record<string, any>): string {
    const sortedKeys = Object.keys(filters).sort();
    const normalizedQuery = sortedKeys.map((k) => k + "=" + String(filters[k])).join("&");
    const hash = crypto.createHash("md5").update(normalizedQuery).digest("hex").slice(0, 8);
    return "cat:" + categoryId + ":" + hash;
  }

  setCategoryCache(categoryId: string, filters: Record<string, any>, data: any) {
    const key = this.generateCacheKey(categoryId, filters);
    this.cache.set(key, JSON.stringify(data));

    if (!this.categoryTags.has(categoryId)) {
      this.categoryTags.set(categoryId, new Set());
    }
    this.categoryTags.get(categoryId)!.add(key);
  }

  invalidateCategory(categoryId: string) {
    const keys = this.categoryTags.get(categoryId);
    if (keys) {
      for (const k of keys) {
        this.cache.delete(k);
      }
      this.categoryTags.delete(categoryId);
    }
  }

  getCacheSize() {
    return this.cache.size;
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ CATEGORY CACHE SERVICE ===");
  const service = new CategoryCacheService();

  // Test tính deterministic: Đảo thứ tự query params nhưng key phải giống nhau
  const k1 = service.generateCacheKey("shoes", { brand: "Nike", size: 42 });
  const k2 = service.generateCacheKey("shoes", { size: 42, brand: "Nike" });
  console.log("Key 1:", k1);
  console.log("Key 2:", k2);
  console.log("Khớp key:", k1 === k2 ? "PASSED (Deterministic)" : "FAILED");

  service.setCategoryCache("shoes", { brand: "Nike", size: 42 }, [{ id: "S1", name: "Nike Air" }]);
  console.log("Số cache hiện có:", service.getCacheSize());
  service.invalidateCategory("shoes");
  console.log("Số cache sau khi invalidate danh mục shoes:", service.getCacheSize());
  console.log("=> KẾT LUẬN: Quản lý cache đa bộ lọc và xóa nhóm theo tag hoàn hảo!");
}

if (require.main === module) {
  runDemo();
}
