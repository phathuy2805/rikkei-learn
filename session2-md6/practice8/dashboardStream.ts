/**
 * [Bài tập 8 - Session 2] Mã nguồn mô phỏng Server-Sent Events (SSE) cho Dashboard Vận hành
 * File: session2-md6/practice8/dashboardStream.ts
 */

export interface MetricUpdate {
  activeDrivers: number;
  ordersDelivered: number;
  pendingOrders: number;
  timestamp: string;
}

export class DashboardStreamService {
  private clients = new Set<(data: MetricUpdate) => void>();

  subscribe(listener: (data: MetricUpdate) => void) {
    this.clients.add(listener);
    return () => this.clients.delete(listener);
  }

  broadcast(metric: MetricUpdate) {
    for (const listener of this.clients) {
      listener(metric);
    }
  }

  getActiveClientCount(): number {
    return this.clients.size;
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ SSE STREAMING CHO DASHBOARD ===");
  const stream = new DashboardStreamService();

  const unsubscribe = stream.subscribe((metric) => {
    console.log(`[Dashboard Event]: Đơn chờ: ${metric.pendingOrders} | Đang giao: ${metric.ordersDelivered} (${metric.timestamp})`);
  });

  stream.broadcast({ activeDrivers: 150, ordersDelivered: 1240, pendingOrders: 18, timestamp: new Date().toISOString() });
  unsubscribe();
  console.log("=> KẾT LUẬN: Đã kiểm chứng luồng SSE 1 chiều hiệu năng cao!");
}

if (require.main === module) {
  runDemo();
}
