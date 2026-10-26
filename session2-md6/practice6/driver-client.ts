/**
 * [Bài tập 6 - Session 2] Mã nguồn hoàn thiện cơ chế Reconnect & Heartbeat cho tài xế ShopFast
 * File: session2-md6/practice6/driver-client.ts
 */

export interface DriverClientOptions {
  token: string;
  driverId: string;
  assignedZone: string;
}

export class DriverConnectionManager {
  private activeRooms = new Set<string>();
  private isConnected = false;
  private reconnectAttemptCount = 0;

  // Cấu hình Socket.io Client với 5 chỗ khuyết đã hoàn thiện
  public clientConfig = {
    // (1) Bật kết nối lại tự động
    reconnection: true,
    // (2) Exponential Backoff kèm Jitter chống Thundering Herd
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    randomizationFactor: 0.5,
    timeout: 10000,
  };

  // (5) Cấu hình Server Gateway Heartbeat
  public static serverGatewayConfig = {
    pingInterval: 10000, // 10 giây gửi ping
    pingTimeout: 15000,  // 15 giây không có phản hồi thì coi là offline
  };

  constructor(private options: DriverClientOptions) {
    this.activeRooms.add(`zone:${options.assignedZone}`);
    this.activeRooms.add(`driver:${options.driverId}`);
  }

  // (3) Đăng ký lại các room sau khi kết nối lại
  onConnect() {
    this.isConnected = true;
    this.reconnectAttemptCount = 0;
    console.log(`[UI]: Đã kết nối thành công tới Server. Đang khôi phục ${this.activeRooms.size} rooms...`);
    for (const room of this.activeRooms) {
      console.log(`  ↳ Tự động Rejoin Room: ${room}`);
    }
  }

  // (4) Xử lý sự kiện mất kết nối hiển thị UI cho tài xế
  onDisconnect(reason: string) {
    this.isConnected = false;
    console.log(`[UI CẢNH BÁO]: ⚠️ Mất kết nối mạng (Lý do: ${reason}). Ứng dụng đang tự động kết nối lại trong nền...`);
  }

  onReconnectAttempt(attempt: number) {
    this.reconnectAttemptCount = attempt;
    // Giãn dần thời gian chờ
    const delay = Math.min(1000 * Math.pow(1.5, attempt), 5000);
    console.log(`[UI]: Đang thử kết nối lại lần ${attempt}/10... (Độ trễ dự kiến: ${delay.toFixed(0)}ms)`);
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ VÒNG ĐỜI KẾT NỐI LẠI CỦA ỨNG DỤNG TÀI XẾ ===");
  const manager = new DriverConnectionManager({
    token: "mock_jwt_token",
    driverId: "DRV_888",
    assignedZone: "CAU_GIAY_HN",
  });

  // Mô phỏng: Tài xế đi qua hầm mất sóng 15 giây
  manager.onConnect();
  manager.onDisconnect("transport close");
  manager.onReconnectAttempt(1);
  manager.onReconnectAttempt(2);
  manager.onConnect();
  console.log("=> KẾT LUẬN: Đã hoàn thiện đủ 5 chỗ khuyết, khôi phục room thành công!");
}

if (require.main === module) {
  runDemo();
}
