/**
 * [Bài tập 7 - Session 7] Hệ thống phân quyền RBAC & Permission Boundaries
 * File: session7-md6/practice7/accessGovernance.ts
 */

export type UserRole = "DEVELOPER" | "DEVOPS_SRE" | "SECURITY_AUDITOR";

export class AccessGovernanceManager {
  checkPermission(role: UserRole, action: string, resource: string): { allowed: boolean; reason: string } {
    // Permission Boundary: Tuyệt đối cấm Developers động vào Production DB
    if (role === "DEVELOPER" && resource.includes("prod-db")) {
      return { allowed: false, reason: "BỊ CHẶN BỞI PERMISSION BOUNDARY: Developer không được truy cập Production DB." };
    }

    if (role === "SECURITY_AUDITOR" && (action.startsWith("write") || action.startsWith("delete"))) {
      return { allowed: false, reason: "BỊ CHẶN: Auditor chỉ có quyền Read-only." };
    }

    if (role === "DEVOPS_SRE") {
      return { allowed: true, reason: "DevOps được phép quản trị hạ tầng." };
    }

    return { allowed: true, reason: "Yêu cầu hợp lệ theo phân nhóm quyền." };
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ PHÂN QUYỀN RBAC VÀ PERMISSION BOUNDARIES ===");
  const gov = new AccessGovernanceManager();

  console.log("1. Developer truy cập Prod DB:", gov.checkPermission("DEVELOPER", "read", "arn:aws:rds:prod-db").reason);
  console.log("2. Auditor cố tình xoá log:", gov.checkPermission("SECURITY_AUDITOR", "delete", "arn:aws:logs:*").reason);
  console.log("3. DevOps triển khai hạ tầng:", gov.checkPermission("DEVOPS_SRE", "write", "arn:aws:eks:cluster").reason);
  console.log("=> KẾT LUẬN: Đã thiết lập hàng rào quản trị phân quyền đa tầng an toàn!");
}

if (require.main === module) {
  runDemo();
}
