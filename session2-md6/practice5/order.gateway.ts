/**
 * [Bài tập 5 - Session 2] Gateway thông báo trạng thái đơn hàng thời gian thực đã vá lỗi
 * File: session2-md6/practice5/order.gateway.ts
 */

export class MockSocket {
  id: string;
  rooms = new Set<string>();
  receivedEvents: Array<{ event: string; data: any }> = [];

  constructor(id: string) {
    this.id = id;
  }

  join(room: string) {
    this.rooms.add(room);
  }

  leave(room: string) {
    this.rooms.delete(room);
  }

  emit(event: string, data: any) {
    this.receivedEvents.push({ event, data });
  }
}

export class MockServer {
  sockets = new Map<string, MockSocket>();

  to(room: string) {
    const matchingSockets: MockSocket[] = [];
    for (const socket of this.sockets.values()) {
      if (socket.rooms.has(room)) {
        matchingSockets.push(socket);
      }
    }
    return {
      emit: (event: string, data: any) => {
        matchingSockets.forEach((s) => s.emit(event, data));
      },
    };
  }
}

export class OrderGateway {
  server = new MockServer();
  // Quản lý mapping client -> Set<orderId> hỗ trợ 1 client theo dõi nhiều đơn
  private clientTracking = new Map<string, Set<string>>();

  handleConnection(client: MockSocket) {
    this.server.sockets.set(client.id, client);
    this.clientTracking.set(client.id, new Set());
  }

  // 1. Vá lỗi: Đưa client vào Room tương ứng với mã đơn hàng
  handleTrack(orderId: string, client: MockSocket) {
    const roomName = `order:${orderId}`;
    client.join(roomName);

    const orders = this.clientTracking.get(client.id);
    if (orders) {
      orders.add(orderId);
    }
    return { ok: true, room: roomName };
  }

  // 2. Vá lỗi: Chỉ phát sự kiện tới Room của chính đơn hàng đó
  notifyStatusChanged(orderId: string, status: string) {
    const roomName = `order:${orderId}`;
    this.server.to(roomName).emit("order:updated", { orderId, status });
  }

  // 3. Vá lỗi: Dọn dẹp triệt để tài nguyên khi client disconnect
  handleDisconnect(client: MockSocket) {
    this.clientTracking.delete(client.id);
    this.server.sockets.delete(client.id);
  }

  getTrackedCount(): number {
    return this.clientTracking.size;
  }
}

// Chạy kịch bản kiểm thử tự động
export function runTest() {
  console.log("=== KIỂM THỬ ORDER GATEWAY ĐÃ VÁ LỖI ===");
  const gateway = new OrderGateway();

  const clientA = new MockSocket("client_A"); // Khách A xem đơn 1024
  const clientB = new MockSocket("client_B"); // Khách B xem đơn 2048

  gateway.handleConnection(clientA);
  gateway.handleConnection(clientB);

  gateway.handleTrack("1024", clientA);
  gateway.handleTrack("2048", clientB);

  console.log("\n-> Cập nhật trạng thái đơn #1024: DANG_GIAO");
  gateway.notifyStatusChanged("1024", "DANG_GIAO");

  console.log("Sự kiện Client A nhận được:", clientA.receivedEvents);
  console.log("Sự kiện Client B nhận được:", clientB.receivedEvents);

  const passedIsolation = clientA.receivedEvents.length === 1 && clientB.receivedEvents.length === 0;
  console.log("=> Kiểm thử cô lập Room: " + (passedIsolation ? "PASSED (Client B không nhận đơn của A)" : "FAILED"));

  // Kiểm thử dọn dẹp memory
  gateway.handleDisconnect(clientA);
  gateway.handleDisconnect(clientB);
  console.log("=> Kích thước Map sau disconnect: " + gateway.getTrackedCount() + " (Kỳ vọng: 0)");
}

if (require.main === module) {
  runTest();
}
