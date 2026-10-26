/**
 * [Bài tập 9 - Clean Code Layer 2] Business Logic & Services
 * File: session1-md6/practice9/services.ts
 */

// Mock Database ShopFast
export const mockData = {
  metrics: {
    totalOrders: 1420,
    cancelledOrders: 285, // 20% -> Bất thường cao!
    revenueVND: 425_000_000,
    delayedOrdersCount: 48,
    primaryReason: "Cổng thanh toán ZaloPay bảo trì từ 01h00 - 03h00 dẫn đến đơn thanh toán lỗi bị huỷ hàng loạt.",
  },
  inventory: [
    { sku: "IP15-128-BLK", name: "iPhone 15 128GB Đen", stock: 0, status: "CHÁY_HÀNG", soldLastNight: 35 },
    { sku: "MAC-M3-16GB", name: "MacBook Air M3 16GB", stock: 2, status: "NGUY_CƠ_HẾT", soldLastNight: 8 },
    { sku: "AIRPODS-PRO-2", name: "Tai nghe AirPods Pro 2", stock: 45, status: "AN_TOÀN", soldLastNight: 12 },
  ],
  delayedOrders: [
    { orderId: "ORD-901", warehouseId: "KHO_BAC_NINH", carrier: "VNPOST", status: "KẸT_XE_TẢI" },
    { orderId: "ORD-902", warehouseId: "KHO_BAC_NINH", carrier: "VNPOST", status: "KẸT_XE_TẢI" },
  ],
};

export class OperationService {
  // 1. Tổng hợp số liệu ca đêm
  static getNightlyMetricsSummary(shiftDate?: string) {
    const rate = ((mockData.metrics.cancelledOrders / mockData.metrics.totalOrders) * 100).toFixed(1);
    return {
      date: shiftDate || new Date().toISOString().split("T")[0],
      totalOrders: mockData.metrics.totalOrders,
      revenueVND: mockData.metrics.revenueVND,
      cancelledOrders: mockData.metrics.cancelledOrders,
      cancellationRate: `${rate}%`,
      isAnomalyDetected: parseFloat(rate) > 15,
      alertMessage: `Cảnh báo: Tỷ lệ huỷ đơn đêm qua lên tới ${rate}% (ngưỡng an toàn < 5%). Nguyên nhân chính: ${mockData.metrics.primaryReason}`,
    };
  }

  // 2. Cảnh báo tồn kho
  static detectInventoryAnomalies(threshold = 10) {
    const anomalies = mockData.inventory.filter((item) => item.stock <= threshold);
    return {
      totalAlertCount: anomalies.length,
      items: anomalies,
    };
  }

  // 3. Danh sách đơn chậm trễ
  static listDelayedOrders(warehouseId: string) {
    const list = mockData.delayedOrders.filter((d) => d.warehouseId === warehouseId);
    return {
      warehouseId,
      totalDelayed: list.length,
      orders: list,
    };
  }

  // 4. GHI DỮ LIỆU - Tuân thủ nghiêm ngặt Human-in-the-loop (HITL)
  static executeAction(actionType: string, payload: any, confirmedByHuman: boolean) {
    // Rào chắn bảo vệ dữ liệu
    if (!confirmedByHuman) {
      return {
        status: "PENDING_CONFIRMATION",
        requiresConfirmation: true,
        message: `[DỪNG LẠI CHỜ XÁC NHẬN]: Hệ thống đã soạn thảo thao tác '${actionType}'. Bạn có chắc chắn muốn thực thi không? Vui lòng xác nhận 'CONFIRM' để ghi dữ liệu.`,
        draftPayload: payload,
      };
    }

    // Đã có xác nhận con người -> Thực hiện ghi
    if (actionType === "REASSIGN_CARRIER") {
      return {
        status: "EXECUTED",
        success: true,
        message: `[THÀNH CÔNG] Đã chuyển đổi ${payload.orderIds?.length || 2} đơn hàng từ ${payload.fromCarrier || "VNPOST"} sang ${payload.toCarrier || "GHTK"}.`,
        timestamp: new Date().toISOString(),
      };
    }

    if (actionType === "CREATE_EMERGENCY_PO") {
      return {
        status: "EXECUTED",
        success: true,
        message: `[THÀNH CÔNG] Đã tạo phiếu nhập kho khẩn cấp PO-${Date.now()} cho SKU ${payload.sku} với số lượng ${payload.quantity}.`,
        timestamp: new Date().toISOString(),
      };
    }

    return { status: "ERROR", message: "Hành động không xác định." };
  }
}
