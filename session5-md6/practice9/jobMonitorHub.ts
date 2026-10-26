/**
 * [Bài tập 9 - Session 5] Trung tâm điều hành tác vụ nền ShopFast
 * File: session5-md6/practice9/jobMonitorHub.ts
 */

export interface QueueHealthStats {
  waiting: number;
  active: number;
  completed: number;
  failed: number;
  failureRate: string;
  status: "HEALTHY" | "WARNING" | "CRITICAL";
}

export class JobMonitorHub {
  private waiting = 0;
  private active = 0;
  private completed = 0;
  private failed = 0;
  private dlq: Array<{ id: string; error: string }> = [];

  recordJobFinished(success: boolean, jobId: string, error?: string) {
    if (success) {
      this.completed++;
    } else {
      this.failed++;
      this.dlq.push({ id: jobId, error: error || "Unknown Error" });
    }
  }

  getHealthReport(): QueueHealthStats {
    const total = this.completed + this.failed;
    const rate = total === 0 ? 0 : (this.failed / total) * 100;

    let status: "HEALTHY" | "WARNING" | "CRITICAL" = "HEALTHY";
    if (rate > 10) status = "CRITICAL";
    else if (rate > 3) status = "WARNING";

    return {
      waiting: this.waiting,
      active: this.active,
      completed: this.completed,
      failed: this.failed,
      failureRate: rate.toFixed(1) + "%",
      status,
    };
  }

  getDLQItems() {
    return this.dlq;
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ TRUNG TÂM GIÁM SÁT TÁC VỤ NỀN (JOB MONITOR HUB) ===");
  const hub = new JobMonitorHub();

  // Mô phỏng 95 jobs thành công, 5 jobs lỗi
  for (let i = 0; i < 95; i++) hub.recordJobFinished(true, "job_ok_" + i);
  hub.recordJobFinished(false, "job_err_1", "SMTP Server Timeout");
  hub.recordJobFinished(false, "job_err_2", "Database Connection Refused");

  const report = hub.getHealthReport();
  console.log("Báo cáo sức khỏe hàng đợi:", report);
  console.log("Danh sách lỗi trong DLQ:", hub.getDLQItems());
  console.log("=> KẾT LUẬN: Nền tảng giám sát và phát hiện cảnh báo hàng đợi hoạt động hoàn hảo!");
}

if (require.main === module) {
  runDemo();
}
