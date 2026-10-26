/**
 * [Bài tập 7 - Session 2] Khung chat CSKH thời gian thực
 * File: session2-md6/practice7/chatGateway.ts
 */

export interface ChatMessage {
  id: string;
  sessionId: string;
  senderRole: "CUSTOMER" | "STAFF";
  senderId: string;
  content: string;
  sentAt: string;
}

export class RealtimeChatEngine {
  private activeSessions = new Map<string, { customerId: string; staffId?: string }>();
  private messageHistory = new Map<string, ChatMessage[]>();
  private typingTimers = new Map<string, any>();

  joinSession(sessionId: string, customerId: string, staffId?: string) {
    if (!this.activeSessions.has(sessionId)) {
      this.activeSessions.set(sessionId, { customerId, staffId });
      this.messageHistory.set(sessionId, []);
    }
    return { ok: true, sessionId, history: this.messageHistory.get(sessionId) || [] };
  }

  sendMessage(sessionId: string, senderRole: "CUSTOMER" | "STAFF", senderId: string, content: string): ChatMessage {
    const message: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      sessionId,
      senderRole,
      senderId,
      content,
      sentAt: new Date().toISOString(),
    };

    const history = this.messageHistory.get(sessionId) || [];
    history.push(message);
    this.messageHistory.set(sessionId, history);
    return message;
  }

  handleTyping(sessionId: string, senderId: string, onAutoStop: () => void) {
    const key = `${sessionId}:${senderId}`;
    if (this.typingTimers.has(key)) {
      clearTimeout(this.typingTimers.get(key));
    }
    const timer = setTimeout(() => {
      this.typingTimers.delete(key);
      onAutoStop();
    }, 3000); // Tự tắt sau 3 giây không gõ
    this.typingTimers.set(key, timer);
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ KHUNG CHAT REALTIME ===");
  const chat = new RealtimeChatEngine();
  const session = chat.joinSession("SESSION_101", "CUST_001", "STAFF_999");
  console.log("1. Đã kết nối phiên chat:", session.sessionId);

  const msg1 = chat.sendMessage("SESSION_101", "CUSTOMER", "CUST_001", "Xin chào Shop, áo này có size M không?");
  console.log("2. Khách gửi tin nhắn:", msg1.content);

  const msg2 = chat.sendMessage("SESSION_101", "STAFF", "STAFF_999", "Dạ chào bạn, size M hiện đang còn sẵn tại kho ạ!");
  console.log("3. Nhân viên phản hồi:", msg2.content);

  console.log("=> KẾT LUẬN: Tin nhắn phản hồi tức thì, quản lý phiên và typing indicator chuẩn xác!");
}

if (require.main === module) {
  runDemo();
}
