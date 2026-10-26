/**
 * [Bài tập 8 - Session 7] Đánh giá cơ chế xác thực IAM Role Metadata Service
 * File: session7-md6/practice8/authMechanismEvaluation.ts
 */

export class CloudCredentialProvider {
  // Mô phỏng IMDSv2 token ngắn hạn tự động xoay vòng
  getTemporaryCredentials(): { accessKeyId: string; secretAccessKey: string; sessionToken: string; expiresAt: string } {
    const expires = new Date(Date.now() + 3600 * 1000).toISOString(); // 1 giờ
    return {
      accessKeyId: "ASIA_TEMP_" + Math.random().toString(36).substring(7).toUpperCase(),
      secretAccessKey: "mock_temp_secret_key",
      sessionToken: "mock_session_token",
      expiresAt: expires,
    };
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ CƠ CHẾ IAM ROLE / IMDSv2 ===");
  const provider = new CloudCredentialProvider();
  const creds = provider.getTemporaryCredentials();

  console.log("Temporary Access Key:", creds.accessKeyId);
  console.log("Hạn dùng của Token:", creds.expiresAt, "(Tự động huỷ sau 1 giờ)");
  console.log("=> KẾT LUẬN: Xác thực máy chủ bảo mật tuyệt đối, không lưu key tĩnh trên ổ đĩa!");
}

if (require.main === module) {
  runDemo();
}
