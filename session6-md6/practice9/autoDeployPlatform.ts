/**
 * [Bài tập 9 - Session 6] Nền tảng Auto-Deploy & Self-Healing ShopFast
 * File: session6-md6/practice9/autoDeployPlatform.ts
 */

export class SelfHealingDeployPlatform {
  private currentVersion = "v1.0.0";
  private previousVersion = "v0.9.0";
  private consecutiveFailures = 0;

  deployNewVersion(newVersion: string) {
    this.previousVersion = this.currentVersion;
    this.currentVersion = newVersion;
    this.consecutiveFailures = 0;
    console.log(`[DEPLOY]: Đã deploy phiên bản mới: ${this.currentVersion}`);
  }

  // Healthcheck tự phục hồi
  recordHealthCheck(isHealthy: boolean): { status: string; activeVersion: string } {
    if (isHealthy) {
      this.consecutiveFailures = 0;
      return { status: "HEALTHY", activeVersion: this.currentVersion };
    }

    this.consecutiveFailures++;
    console.log(`[CẢNH BÁO]: Container không phản hồi lần ${this.consecutiveFailures}/3`);

    if (this.consecutiveFailures >= 3) {
      console.log(`[TỰ ĐỘNG PHỤC HỒI]: Phiên bản ${this.currentVersion} lỗi liên tiếp! Tiến hành Auto-Rollback về ${this.previousVersion}`);
      this.currentVersion = this.previousVersion;
      this.consecutiveFailures = 0;
      return { status: "AUTO_ROLLED_BACK", activeVersion: this.currentVersion };
    }

    return { status: "DEGRADED", activeVersion: this.currentVersion };
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ NỀN TẢNG SELF-HEALING AUTO-DEPLOY ===");
  const platform = new SelfHealingDeployPlatform();

  platform.deployNewVersion("v1.1.0-buggy");

  // Mô phỏng 3 lần healthcheck thất bại liên tiếp
  platform.recordHealthCheck(false);
  platform.recordHealthCheck(false);
  const finalStatus = platform.recordHealthCheck(false);

  console.log("Kết quả kiểm soát cuối cùng:", finalStatus);
  console.log("=> KẾT LUẬN: Nền tảng tự động phát hiện lỗi và Rollback thần tốc không cần can thiệp thủ công!");
}

if (require.main === module) {
  runDemo();
}
