/**
 * [Bài tập 5 - Session 5] Worker gửi email xác nhận đơn hàng đảm bảo tính Idempotent
 * File: session5-md6/practice5/orderEmailWorker.ts
 */

export class SafeEmailQueue {
  private jobs = new Map<string, any>();
  private sentRecords = new Set<string>();
  public actualSentCount = 0;

  // 1. Vá lỗi: Đẩy job với Custom JobId chống trùng lặp từ gốc
  addEmailJob(orderId: string, email: string): { added: boolean; jobId: string } {
    const customJobId = "email:order_confirm:" + orderId;
    if (this.jobs.has(customJobId)) {
      return { added: false, jobId: customJobId }; // Bỏ qua trùng lặp
    }
    this.jobs.set(customJobId, { orderId, email });
    return { added: true, jobId: customJobId };
  }

  // 2. Vá lỗi: Xử lý idempotent bên trong worker
  async processJob(jobId: string, data: { orderId: string; email: string }): Promise<boolean> {
    const idempotencyKey = "sent:" + data.orderId;
    if (this.sentRecords.has(idempotencyKey)) {
      return false; // Đã gửi trước đó, không gửi lại
    }

    // Thực hiện gửi email thật
    this.actualSentCount++;
    this.sentRecords.add(idempotencyKey);
    return true;
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ WORKER EMAIL BẤT BIẾN (IDEMPOTENT) ===");
  const queue = new SafeEmailQueue();

  // Khách bấm 5 lần nút đặt hàng cho đơn 1024
  console.log("1. Khách gửi 5 request đặt hàng liên tiếp cho đơn #1024:");
  for (let i = 1; i <= 5; i++) {
    const res = queue.addEmailJob("ORD_1024", "customer@shopfast.vn");
    console.log("Lần " + i + ": " + (res.added ? "ACCEPTED (Đã tạo job)" : "SKIPPED (Phát hiện trùng lặp jobId)"));
  }

  // Worker xử lý
  queue.processJob("email:order_confirm:ORD_1024", { orderId: "ORD_1024", email: "customer@shopfast.vn" });
  console.log("2. Tổng số email thực tế gửi tới khách hàng:", queue.actualSentCount);
  console.log("=> KẾT LUẬN: " + (queue.actualSentCount === 1 ? "PASSED (Chỉ đúng 1 email duy nhất)" : "FAILED"));
}

if (require.main === module) {
  runDemo();
}
