/**
 * [Bài tập 6 - Session 6] Trình thẩm định Pipeline CI/CD an toàn
 * File: session6-md6/practice6/ciValidator.ts
 */

export interface CIPipelineStage {
  name: string;
  command: string;
  required: boolean;
}

export const SECURE_PIPELINE: CIPipelineStage[] = [
  { name: "Lint & Format", command: "npm run lint", required: true },
  { name: "Automated Tests", command: "npm test -- --coverage", required: true },
  { name: "Security Audit", command: "npm audit --audit-level=high", required: true },
  { name: "Build Container", command: "docker build -t shopfast:" + "$" + "{GITHUB_SHA}", required: true },
  { name: "Deploy & Healthcheck", command: "kubectl rollout status deployment/shopfast", required: true },
];

export function runDemo() {
  console.log("=== KIỂM THỬ PIPELINE CI/CD AN TOÀN ===");
  console.log("Danh sách các bước kiểm soát chất lượng bắt buộc:");
  SECURE_PIPELINE.forEach((s, idx) => {
    console.log("  " + (idx + 1) + ". [" + s.name + "]: " + s.command);
  });
  console.log("=> KẾT LUẬN: Đã hoàn thiện đủ 5 bước bảo vệ, không deploy image lỗi!");
}

if (require.main === module) {
  runDemo();
}
