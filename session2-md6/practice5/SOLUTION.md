# Báo Cáo Giải Bài Tập 5 (Session 2): Vá Lỗi Khách Hàng Nhận Được Đơn Hàng Của Người Khác

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10223` | `session2-md6/practice5`  
**Mức độ:** Vận dụng cơ bản  

---

## PHẦN 1: CHỈ RA LỖI BẰNG DỮ LIỆU & PHÂN TÍCH LUỒNG THỰC THI

### Đoạn mã hiện trường ban đầu (`order.gateway.ts`):
```typescript
@WebSocketGateway({ cors: { origin: "*" } })
export class OrderGateway {
  @WebSocketServer() server: Server;
  private tracked = new Map<string, string>();

  @SubscribeMessage("order:track")
  handleTrack(@MessageBody() orderId: string, @ConnectedSocket() client: Socket) {
    this.tracked.set(client.id, orderId);
    return { ok: true };
  }

  notifyStatusChanged(orderId: string, status: string) {
    this.server.emit("order:updated", { orderId, status });
  }

  handleDisconnect(client: Socket) {
    console.log("client roi di:", client.id);
  }
}
```

---

### Khiếm khuyết 1: Lỗ hổng phát tán dữ liệu sai đối tượng (Broadcast to All Instead of Room)
- **Nguyên nhân kỹ thuật:** Lệnh `this.server.emit("order:updated", ...)` phát sự kiện tới **toàn bộ socket đang kết nối trên toàn server** thay vì chỉ gửi riêng cho các client đăng ký theo dõi đơn hàng đó. Việc lưu `this.tracked.set(client.id, orderId)` hoàn toàn không được sử dụng khi phát thông báo.
- **Kịch bản kiểm thử (Test Case 1):**
  - Mở 2 tab trình duyệt: Tab 1 (Khách A) theo dõi đơn #1024, Tab 2 (Khách B) theo dõi đơn #2048.
  - Server gọi `notifyStatusChanged("1024", "DANG_GIAO")`.
  - **Kết quả thực tế:** Cả Tab 1 và Tab 2 đều nhận được sự kiện cập nhật của đơn #1024. Khách B nhìn thấy thông tin đơn hàng và địa chỉ của Khách A (vi phạm nghiêm trọng bảo mật dữ liệu khách hàng).
  - **Kết quả mong đợi:** Chỉ Tab 1 nhận được sự kiện. Tab 2 hoàn toàn không nhận được bất kỳ dữ liệu nào của đơn #1024.

---

### Khiếm khuyết 2: Rò rỉ bộ nhớ khi Client ngắt kết nối (Memory Leak)
- **Nguyên nhân kỹ thuật:** Trong hàm `handleDisconnect(client: Socket)`, server chỉ in log console mà **không hề xoá `client.id` khỏi `this.tracked`**.
- **Kịch bản kiểm thử (Test Case 2):**
  - Thực hiện kết nối và ngắt kết nối liên tục 50 lần.
  - **Kết quả thực tế:** Map `tracked` tích tụ 50 entry rác với các `client.id` đã chết, kích thước Map tăng dần theo thời gian (Memory Leak) và không bao giờ được GC dọn dẹp.
  - **Kết quả mong đợi:** Khi client ngắt kết nối, phải gọi `this.tracked.delete(client.id)`. Sau khi 50 client rời đi, `this.tracked.size` phải trở về đúng bằng 0.
