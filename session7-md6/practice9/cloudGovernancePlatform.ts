/**
 * [Bài tập 9 - Session 7] Nền tảng Cloud Access Governance Hub
 * File: session7-md6/practice9/cloudGovernancePlatform.ts
 */

export interface CloudUserAudit {
  username: string;
  keyAgeDays: number;
  hasMFA: boolean;
  hasWildcardPerms: boolean;
}

export class CloudGovernanceHub {
  auditAccount(users: CloudUserAudit[]): {
    totalScanned: number;
    securityRisks: Array<{ user: string; risk: string; severity: "HIGH" | "MEDIUM" }>;
  } {
    const risks: Array<{ user: string; risk: string; severity: "HIGH" | "MEDIUM" }> = [];

    for (const u of users) {
      if (u.keyAgeDays > 90) {
        risks.push({ user: u.username, risk: `Khóa truy cập đã ${u.keyAgeDays} ngày chưa xoay vòng (Quy định < 90 ngày).`, severity: "MEDIUM" });
      }
      if (!u.hasMFA) {
        risks.push({ user: u.username, risk: "Tài khoản chưa bật xác thực 2 bước (MFA).", severity: "HIGH" });
      }
      if (u.hasWildcardPerms) {
        risks.push({ user: u.username, risk: "Phát hiện quyền Wildcard '*' nguy hiểm.", severity: "HIGH" });
      }
    }

    return { totalScanned: users.length, securityRisks: risks };
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ CLOUD ACCESS GOVERNANCE HUB ===");
  const hub = new CloudGovernanceHub();

  const auditReport = hub.auditAccount([
    { username: "alice_dev", keyAgeDays: 30, hasMFA: true, hasWildcardPerms: false },
    { username: "bob_contractor", keyAgeDays: 120, hasMFA: false, hasWildcardPerms: true },
  ]);

  console.log("Tổng số tài khoản đã quét:", auditReport.totalScanned);
  console.log("Danh sách rủi ro bảo mật phát hiện:", auditReport.securityRisks);
  console.log("=> KẾT LUẬN: Nền tảng kiểm toán tự động phát hiện rủi ro truy cập Cloud thành công!");
}

if (require.main === module) {
  runDemo();
}
