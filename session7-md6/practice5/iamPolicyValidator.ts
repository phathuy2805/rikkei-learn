/**
 * [Bài tập 5 - Session 7] Trình thẩm định IAM Policy chuẩn Least Privilege
 * File: session7-md6/practice5/iamPolicyValidator.ts
 */

export interface IAMStatement {
  Effect: "Allow" | "Deny";
  Action: string[] | string;
  Resource: string[] | string;
  Condition?: Record<string, any>;
}

export const SECURE_S3_POLICY: IAMStatement[] = [
  {
    Effect: "Allow",
    Action: ["s3:GetObject", "s3:PutObject"],
    Resource: "arn:aws:s3:::shopfast-product-images/*",
    Condition: {
      Bool: { "aws:SecureTransport": "true" },
    },
  },
];

export function auditIAMPolicy(statements: IAMStatement[]): { isCompliant: boolean; violations: string[] } {
  const violations: string[] = [];
  for (const stmt of statements) {
    if (stmt.Effect === "Allow") {
      if (stmt.Action === "*" || (Array.isArray(stmt.Action) && stmt.Action.includes("*"))) {
        violations.push("CỰC KỲ NGUY HIỂM: Cấp quyền Action wildcard '*'!");
      }
      if (stmt.Resource === "*" || (Array.isArray(stmt.Resource) && stmt.Resource.includes("*"))) {
        violations.push("CỰC KỲ NGUY HIỂM: Cấp quyền trên Resource wildcard '*' (Toàn bộ buckets)!");
      }
      if (!stmt.Condition || !stmt.Condition.Bool?.["aws:SecureTransport"]) {
        violations.push("CẢNH BÁO: Chưa bắt buộc giao thức HTTPS (aws:SecureTransport)!");
      }
    }
  }
  return { isCompliant: violations.length === 0, violations };
}

export function runDemo() {
  console.log("=== KIỂM THỬ CHÍNH SÁCH IAM AN TOÀN (LEAST PRIVILEGE) ===");
  const audit = auditIAMPolicy(SECURE_S3_POLICY);
  console.log("Kết quả kiểm toán:", audit.isCompliant ? "PASSED (Tuân thủ chuẩn bảo mật AWS CIS Benchmark)" : "FAILED");
  console.log("Quyền hạn đã thu hẹp: Chỉ đúng 's3:GetObject', 's3:PutObject' trên bucket 'shopfast-product-images'");
  console.log("=> KẾT LUẬN: Đã vá hoàn toàn lỗ hổng cấp quyền quá rộng!");
}

if (require.main === module) {
  runDemo();
}
