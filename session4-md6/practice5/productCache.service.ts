/**
 * [Bài tập 5 - Session 4] Dịch vụ Cache sản phẩm đã vá lỗi cập nhật giá
 * File: session4-md6/practice5/productCache.service.ts
 */

export interface Product {
  id: string;
  name: string;
  basePrice: number;
}

export class ProductCacheService {
  private db = new Map<string, Product>();
  private redis = new Map<string, string>();

  constructor() {
    this.db.set("PROD_1024", { id: "PROD_1024", name: "Áo Polo Nam", basePrice: 250000 });
  }

  private buildKey(productId: string, tier: "NORMAL" | "VIP"): string {
    return "product:" + productId + ":tier:" + tier;
  }

  // Lấy giá: Cache-Aside Pattern
  async getProductPrice(productId: string, tier: "NORMAL" | "VIP"): Promise<number> {
    const key = this.buildKey(productId, tier);
    const cached = this.redis.get(key);
    if (cached) {
      return JSON.parse(cached).finalPrice;
    }

    const product = this.db.get(productId);
    if (!product) throw new Error("Sản phẩm không tồn tại");

    const discount = tier === "VIP" ? 0.9 : 1.0;
    const finalPrice = product.basePrice * discount;

    this.redis.set(key, JSON.stringify({ productId, finalPrice, cachedAt: Date.now() }));
    return finalPrice;
  }

  // Cập nhật giá: Xóa cache ngay lập tức cho toàn bộ các tier
  async updateBasePrice(productId: string, newPrice: number): Promise<void> {
    const product = this.db.get(productId);
    if (!product) throw new Error("Sản phẩm không tồn tại");

    // 1. Cập nhật DB
    product.basePrice = newPrice;
    this.db.set(productId, product);

    // 2. VÔ HIỆU HÓA CACHE TẤT CẢ TIERS (Fix stale cache)
    this.redis.delete(this.buildKey(productId, "NORMAL"));
    this.redis.delete(this.buildKey(productId, "VIP"));
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ PRODUCT CACHE SERVICE ===");
  const service = new ProductCacheService();

  service.getProductPrice("PROD_1024", "VIP").then((p1) => {
    console.log("1. Giá VIP ban đầu:", p1, "VND (Kỳ vọng 225.000)");

    // Admin đổi giá gốc từ 250k thành 300k
    service.updateBasePrice("PROD_1024", 300000).then(() => {
      console.log("2. Admin đổi giá gốc thành 300.000 VND -> Cache bị xoá lập tức.");
      service.getProductPrice("PROD_1024", "VIP").then((p2) => {
        console.log("3. Giá VIP đọc ngay sau cập nhật:", p2, "VND (Kỳ vọng 270.000)");
        console.log("=> KẾT LUẬN: Đã loại bỏ hoàn toàn lỗi giá cũ trong bộ nhớ đệm!");
      });
    });
  });
}

if (require.main === module) {
  runDemo();
}
