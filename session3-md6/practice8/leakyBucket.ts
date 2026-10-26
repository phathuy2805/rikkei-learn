/**
 * [Bài tập 8 - Session 3] Thuật toán Leaky Bucket làm mịn luồng thanh toán
 * File: session3-md6/practice8/leakyBucket.ts
 */

export class LeakyBucketLimiter {
  private capacity: number; // Dung lượng xô
  private leakRatePerSec: number; // Tốc độ rò rỉ (req/s)
  private currentWater = 0; // Số request đang đọng trong xô
  private lastLeakTime: number;

  constructor(capacity = 20, leakRatePerSec = 5) {
    this.capacity = capacity;
    this.leakRatePerSec = leakRatePerSec;
    this.lastLeakTime = Date.now();
  }

  // Rò rỉ nước theo thời gian trôi qua
  private leak() {
    const now = Date.now();
    const elapsedSec = (now - this.lastLeakTime) / 1000;
    const leaked = elapsedSec * this.leakRatePerSec;
    this.currentWater = Math.max(0, this.currentWater - leaked);
    this.lastLeakTime = now;
  }

  acquire(): boolean {
    this.leak();
    if (this.currentWater + 1 <= this.capacity) {
      this.currentWater += 1;
      return true; // Được xếp hàng xử lý
    }
    return false; // Xô tràn -> Bị từ chối
  }

  getStatus() {
    this.leak();
    return {
      currentWater: parseFloat(this.currentWater.toFixed(2)),
      capacity: this.capacity,
    };
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ LEAKY BUCKET CHO CỔNG THANH TOÁN ===");
  const bucket = new LeakyBucketLimiter(5, 2); // Dung lượng 5, xả 2 req/giây

  console.log("1. Gửi dồn dập 6 giao dịch thanh toán trong tích tắc:");
  for (let i = 1; i <= 6; i++) {
    const ok = bucket.acquire();
    console.log("Giao dịch " + i + ": " + (ok ? "ACCEPTED" : "DROPPED (Bucket Full)"));
  }
  console.log("=> KẾT LUẬN: Đã làm mịn luồng giao dịch, chặn tràn xô bảo vệ ngân hàng!");
}

if (require.main === module) {
  runDemo();
}
