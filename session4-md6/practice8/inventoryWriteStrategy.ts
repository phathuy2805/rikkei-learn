/**
 * [Bài tập 8 - Session 4] Mô phỏng chiến lược Write-Back cho Tồn kho Flash Sale
 * File: session4-md6/practice8/inventoryWriteStrategy.ts
 */

export class WriteBackInventoryManager {
  private redisStock: number;
  private dbStock: number;
  private pendingDeductions = 0;

  constructor(initialStock: number) {
    this.redisStock = initialStock;
    this.dbStock = initialStock;
  }

  // Ghi cực nhanh vào Redis (< 1ms)
  decrementStockFast(quantity: number): boolean {
    if (this.redisStock >= quantity) {
      this.redisStock -= quantity;
      this.pendingDeductions += quantity;
      return true;
    }
    return false; // Hết hàng
  }

  // Worker định kỳ gom cụm ghi xuống Database (Batching)
  flushToDatabase(): { flushed: number; newDbStock: number } {
    const toFlush = this.pendingDeductions;
    this.dbStock -= toFlush;
    this.pendingDeductions = 0;
    return { flushed: toFlush, newDbStock: this.dbStock };
  }

  getStatus() {
    return { redisStock: this.redisStock, dbStock: this.dbStock, pendingDeductions: this.pendingDeductions };
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ CHIẾN LƯỢC WRITE-BACK TỒN KHO ===");
  const manager = new WriteBackInventoryManager(100);

  // 10 khách mua thành công trong 100ms
  for (let i = 0; i < 10; i++) {
    manager.decrementStockFast(2);
  }

  console.log("1. Trạng thái sau 10 đơn mua chớp nhoáng:", manager.getStatus());
  console.log("2. Worker kích hoạt đồng bộ DB:");
  const sync = manager.flushToDatabase();
  console.log("  ↳ Đã cập nhật DB:", sync);
  console.log("=> KẾT LUẬN: Đạt tốc độ in-memory siêu nhanh, bảo toàn số lượng chính xác!");
}

if (require.main === module) {
  runDemo();
}
