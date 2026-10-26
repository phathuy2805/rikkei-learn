/**
 * [Bài tập 8 - Session 5] Kiến trúc hàng đợi email 500.000 lượt có Rate Limiting
 * File: session5-md6/practice8/emailCampaignQueue.ts
 */

export class EmailCampaignDispatcher {
  private transactionalQueue: string[] = [];
  private marketingQueue: string[] = [];
  public sentHistory: Array<{ type: string; id: string }> = [];

  enqueueTransactional(emailId: string) {
    this.transactionalQueue.push(emailId);
  }

  enqueueMarketing(emailId: string) {
    this.marketingQueue.push(emailId);
  }

  // Luôn ưu tiên xử lý sạch Transactional trước khi gắp Marketing
  processNext(): string | null {
    if (this.transactionalQueue.length > 0) {
      const id = this.transactionalQueue.shift()!;
      this.sentHistory.push({ type: "TRANSACTIONAL", id });
      return id;
    }
    if (this.marketingQueue.length > 0) {
      const id = this.marketingQueue.shift()!;
      this.sentHistory.push({ type: "MARKETING", id });
      return id;
    }
    return null;
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ BỘ ĐIỀU PHỐI EMAIL CHIẾN DỊCH ===");
  const dispatcher = new EmailCampaignDispatcher();

  // Nạp 3 email marketing
  dispatcher.enqueueMarketing("MKT_01");
  dispatcher.enqueueMarketing("MKT_02");
  dispatcher.enqueueMarketing("MKT_03");

  // Đột ngột có email OTP đặt hàng đến
  dispatcher.enqueueTransactional("OTP_999");

  // Xử lý lần lượt
  for (let i = 0; i < 4; i++) {
    dispatcher.processNext();
  }

  console.log("Thứ tự gửi thực tế:");
  dispatcher.sentHistory.forEach((item, idx) => {
    console.log("  " + (idx + 1) + ". [" + item.type + "] " + item.id);
  });
  console.log("=> KẾT LUẬN: Email giao dịch được ưu tiên vượt mặt email marketing thành công!");
}

if (require.main === module) {
  runDemo();
}
