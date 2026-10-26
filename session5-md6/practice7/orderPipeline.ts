/**
 * [Bài tập 7 - Session 5] Pipeline xử lý đơn hàng theo mô hình Saga
 * File: session5-md6/practice7/orderPipeline.ts
 */

export interface OrderFlowContext {
  orderId: string;
  stockDeducted: boolean;
  paymentCompleted: boolean;
  waybillCreated: boolean;
}

export class OrderProcessingPipeline {
  async executePipeline(orderId: string, shouldFailAtPayment = false): Promise<{
    success: boolean;
    state: OrderFlowContext;
    logs: string[];
  }> {
    const logs: string[] = [];
    const state: OrderFlowContext = { orderId, stockDeducted: false, paymentCompleted: false, waybillCreated: false };

    // BƯỚC 1: Trừ tồn kho
    logs.push("Bước 1: Đã giữ tồn kho cho đơn #" + orderId);
    state.stockDeducted = true;

    // BƯỚC 2: Thanh toán
    if (shouldFailAtPayment) {
      logs.push("Bước 2: Giao dịch thanh toán THẤT BẠI (Thẻ bị từ chối)");
      // KÍCH HOẠT GIAO DỊCH BÙ (Compensating Step)
      logs.push("  ↳ [COMPENSATION]: Hoàn trả tồn kho về trạng thái ban đầu!");
      state.stockDeducted = false;
      return { success: false, state, logs };
    }

    logs.push("Bước 2: Thanh toán THÀNH CÔNG");
    state.paymentCompleted = true;

    // BƯỚC 3: Tạo vận đơn
    logs.push("Bước 3: Đã tạo vận đơn giao hàng");
    state.waybillCreated = true;

    // BƯỚC 4: Gửi thông báo
    logs.push("Bước 4: Đã gửi email xác nhận cho khách hàng");

    return { success: true, state, logs };
  }
}

export function runDemo() {
  console.log("=== KIỂM THỬ ORDER PROCESSING PIPELINE ===");
  const pipeline = new OrderProcessingPipeline();

  console.log("--- CASE 1: Đơn hàng thành công trọn vẹn ---");
  pipeline.executePipeline("ORD_001", false).then((res1) => {
    console.log(res1.logs.join("\n"));

    console.log("\n--- CASE 2: Thanh toán lỗi -> Tự động kích hoạt Giao dịch bù ---");
    pipeline.executePipeline("ORD_002", true).then((res2) => {
      console.log(res2.logs.join("\n"));
      console.log("Trạng thái tồn kho cuối cùng:", res2.state.stockDeducted ? "VẪN BỊ TRỪ (LỖI)" : "ĐÃ HOÀN TRẢ (CHUẨN)");
      console.log("=> KẾT LUẬN: Pipeline Saga bảo vệ toàn vẹn dữ liệu đơn hàng thành công!");
    });
  });
}

if (require.main === module) {
  runDemo();
}
