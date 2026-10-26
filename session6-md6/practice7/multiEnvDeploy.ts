/**
 * [Bài tập 7 - Session 6] Bộ điều phối Pipeline đa môi trường
 * File: session6-md6/practice7/multiEnvDeploy.ts
 */

export class MultiEnvironmentPipeline {
  evaluateDeploymentTrigger(branch: string, isManualApproved: boolean): {
    environment: "STAGING" | "PRODUCTION" | "NONE";
    canDeploy: boolean;
    reason: string;
  } {
    if (branch === "develop") {
      return { environment: "STAGING", canDeploy: true, reason: "Tự động deploy lên Staging sau khi merge develop." };
    }

    if (branch === "master") {
      if (!isManualApproved) {
        return { environment: "PRODUCTION", canDeploy: false, reason: "DỪNG LẠI: Chờ phê duyệt thủ công từ Tech Lead trước khi lên Production." };
      }
      return { environment: "PRODUCTION", canDeploy: true, reason: "Đã có chữ ký phê duyệt. Tiến hành deploy Production an toàn!" };
    }

    return { environment: "NONE", canDeploy: false, reason: "Nhánh feature không được phép deploy." };
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ PIPELINE ĐA MÔI TRƯỜNG (MULTI-ENVIRONMENT) ===");
  const pipeline = new MultiEnvironmentPipeline();

  console.log("1. Nhánh develop:", pipeline.evaluateDeploymentTrigger("develop", false).reason);
  console.log("2. Nhánh master chưa duyệt:", pipeline.evaluateDeploymentTrigger("master", false).reason);
  console.log("3. Nhánh master đã duyệt:", pipeline.evaluateDeploymentTrigger("master", true).reason);
  console.log("=> KẾT LUẬN: Đã thiết lập hàng rào bảo vệ Production đa tầng thành công!");
}

if (require.main === module) {
  runDemo();
}
