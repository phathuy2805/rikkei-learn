/**
 * [Bài tập 9 - Session 3] Adaptive DDoS Shield cho ShopFast Mega Sale
 * File: session3-md6/practice9/adaptiveShield.ts
 */

export type SystemLoadLevel = "NORMAL" | "HIGH_LOAD" | "CRITICAL";

export class AdaptiveDDoSShield {
  private currentMode: SystemLoadLevel = "NORMAL";

  setSystemLoad(cpuUsagePercent: number) {
    if (cpuUsagePercent >= 85) {
      this.currentMode = "CRITICAL";
    } else if (cpuUsagePercent >= 60) {
      this.currentMode = "HIGH_LOAD";
    } else {
      this.currentMode = "NORMAL";
    }
  }

  evaluateRequest(req: { isBotPattern: boolean; isAuthenticated: boolean; path: string }): {
    action: "ALLOW" | "RATE_LIMIT_STRICT" | "CHALLENGE_CAPTCHA" | "REDIRECT_WAITING_ROOM";
  } {
    if (this.currentMode === "CRITICAL") {
      if (req.isBotPattern) return { action: "CHALLENGE_CAPTCHA" };
      if (!req.isAuthenticated) return { action: "REDIRECT_WAITING_ROOM" };
      return { action: "RATE_LIMIT_STRICT" };
    }

    if (this.currentMode === "HIGH_LOAD") {
      if (req.isBotPattern) return { action: "CHALLENGE_CAPTCHA" };
      if (!req.isAuthenticated) return { action: "RATE_LIMIT_STRICT" };
      return { action: "ALLOW" };
    }

    return { action: "ALLOW" };
  }

  getMode() {
    return this.currentMode;
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ ADAPTIVE DDOS SHIELD ===");
  const shield = new AdaptiveDDoSShield();

  console.log("1. Tải bình thường (CPU 40%):");
  shield.setSystemLoad(40);
  console.log("Action:", shield.evaluateRequest({ isBotPattern: false, isAuthenticated: false, path: "/products" }));

  console.log("2. Cao điểm Flash Sale (CPU 90%):");
  shield.setSystemLoad(90);
  console.log("Khách vãng lai:", shield.evaluateRequest({ isBotPattern: false, isAuthenticated: false, path: "/flash-sale" }));
  console.log("Phát hiện Bot:", shield.evaluateRequest({ isBotPattern: true, isAuthenticated: false, path: "/checkout" }));
  console.log("=> KẾT LUẬN: Lá chắn tự động chuyển sang chế độ bảo vệ tối cao thành công!");
}

if (require.main === module) {
  runDemo();
}
