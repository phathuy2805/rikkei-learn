/**
 * [Bài tập 8 - Session 6] Bộ định tuyến Blue/Green Router chuyển đổi tức thì
 * File: session6-md6/practice8/deploymentStrategy.ts
 */

export class BlueGreenRouter {
  private activeEnvironment: "BLUE" | "GREEN" = "BLUE";

  getActiveEnvironment() {
    return this.activeEnvironment;
  }

  // Chuyển router tức thì (< 1ms)
  switchTraffic(): string {
    this.activeEnvironment = this.activeEnvironment === "BLUE" ? "GREEN" : "BLUE";
    return "Đã chuyển 100% traffic sang môi trường: " + this.activeEnvironment;
  }

  // Rollback tức thì
  rollback(): string {
    return this.switchTraffic();
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ CHIẾN LƯỢC BLUE/GREEN DEPLOYMENT ===");
  const router = new BlueGreenRouter();

  console.log("1. Môi trường phục vụ ban đầu:", router.getActiveEnvironment());
  console.log("2. Deploy bản mới lên GREEN thành công -> Chuyển traffic:");
  console.log("  ↳", router.switchTraffic());

  console.log("3. Phát hiện lỗi phát sinh -> Rollback khẩn cấp:");
  console.log("  ↳", router.rollback());
  console.log("=> KẾT LUẬN: Rollback tức thì trong 0 giây, không có downtime!");
}

if (require.main === module) {
  runDemo();
}
