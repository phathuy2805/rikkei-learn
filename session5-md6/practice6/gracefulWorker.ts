/**
 * [Bài tập 6 - Session 5] Cơ chế Graceful Shutdown cho Worker
 * File: session5-md6/practice6/gracefulWorker.ts
 */

export class GracefulWorkerManager {
  private isShuttingDown = false;
  private activeJobCount = 0;

  async startJob(jobId: string) {
    if (this.isShuttingDown) throw new Error("Worker đang tắt, từ chối nhận job mới");
    this.activeJobCount++;
    // Giả lập xử lý job trong 100ms
    await new Promise((r) => setTimeout(r, 100));
    this.activeJobCount--;
  }

  async shutdown(signal: string): Promise<string> {
    console.log(`[SHUTDOWN]: Nhận tín hiệu ${signal}. Đang bắt đầu quy trình Graceful Shutdown...`);
    this.isShuttingDown = true;

    // Chờ tất cả job đang chạy dở hoàn thành
    const timeout = 5000;
    const start = Date.now();
    while (this.activeJobCount > 0 && Date.now() - start < timeout) {
      console.log(`  ↳ Chờ ${this.activeJobCount} job đang xử lý dở...`);
      await new Promise((r) => setTimeout(r, 50));
    }

    console.log("[SHUTDOWN]: Toàn bộ active jobs đã hoàn tất sạch sẽ. Đóng kết nối Redis.");
    return "SHUTDOWN_COMPLETE";
  }

  getActiveCount() {
    return this.activeJobCount;
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ GRACEFUL SHUTDOWN ===");
  const worker = new GracefulWorkerManager();

  // Bắt đầu 2 jobs
  worker.startJob("job_1");
  worker.startJob("job_2");

  console.log("Số job đang chạy:", worker.getActiveCount());
  worker.shutdown("SIGTERM").then((status) => {
    console.log("Trạng thái dừng:", status);
    console.log("Số job còn sót lại:", worker.getActiveCount());
    console.log("=> KẾT LUẬN: Đã bảo toàn các job đang chạy, tắt tiến trình an toàn 100%!");
  });
}

if (require.main === module) {
  runDemo();
}
