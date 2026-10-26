/**
 * [Bài tập 6 - Session 7] Xác thực OIDC Trust Policy cho GitHub Actions
 * File: session7-md6/practice6/oidcValidator.ts
 */

export const GITHUB_OIDC_TRUST_POLICY = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Principal: {
        Federated: "arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com",
      },
      Action: "sts:AssumeRoleWithWebIdentity",
      Condition: {
        StringEquals: {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          "token.actions.githubusercontent.com:sub": "repo:phathuy2805/rikkei-learn:ref:refs/heads/master",
        },
      },
    },
  ],
};

export function validateOIDCToken(claims: { aud: string; sub: string }): boolean {
  return (
    claims.aud === "sts.amazonaws.com" &&
    claims.sub === "repo:phathuy2805/rikkei-learn:ref:refs/heads/master"
  );
}

export function runDemo() {
  console.log("=== KIỂM THỬ XÁC THỰC OIDC CHO CI/CD PIPELINE ===");

  const validToken = { aud: "sts.amazonaws.com", sub: "repo:phathuy2805/rikkei-learn:ref:refs/heads/master" };
  const hackerToken = { aud: "sts.amazonaws.com", sub: "repo:hacker/evil-repo:ref:refs/heads/master" };

  console.log("Token từ repo chính chủ nhánh master:", validateOIDCToken(validToken) ? "CHO PHÉP ASSUME ROLE" : "TỪ CHỐI");
  console.log("Token từ repo lạ bên ngoài:", validateOIDCToken(hackerToken) ? "CHO PHÉP" : "CHẶN ĐỨNG (HTTP 403 Forbidden)");
  console.log("=> KẾT LUẬN: Đã loại bỏ hoàn toàn Long-term Keys, bảo vệ pipeline bằng OIDC!");
}

if (require.main === module) {
  runDemo();
}
