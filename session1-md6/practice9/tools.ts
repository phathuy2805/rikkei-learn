/**
 * [Bài tập 9 - Clean Code Layer 1] Tool Definitions
 * File: session1-md6/practice9/tools.ts
 */

export const tools = [
  // Tool 1: Tổng hợp số liệu ca đêm
  {
    name: "get_nightly_metrics_summary",
    description: "Tổng hợp các chỉ số vận hành quan trọng ca đêm (22h - 06h): tổng đơn, doanh thu, tỷ lệ đơn hủy và các chỉ số bất thường.",
    input_schema: {
      type: "object",
      properties: {
        shiftDate: {
          type: "string",
          description: "Ngày cần xem báo cáo định dạng YYYY-MM-DD (mặc định hôm nay).",
        },
      },
      required: [],
    },
  },
  // Tool 2: Cảnh báo tồn kho bất thường
  {
    name: "detect_inventory_anomalies",
    description: "Quét kho và phát hiện các sản phẩm có số lượng tồn kho chạm ngưỡng nguy hiểm hoặc bị hết hàng đột ngột trong đêm.",
    input_schema: {
      type: "object",
      properties: {
        threshold: {
          type: "integer",
          description: "Ngưỡng số lượng tồn kho tối thiểu cần cảnh báo (mặc định 10).",
        },
      },
      required: [],
    },
  },
  // Tool 3: Danh sách đơn kẹt / chậm trễ
  {
    name: "list_flagged_delayed_orders",
    description: "Liệt kê các đơn hàng ca đêm bị nghẽn chưa thể xuất kho tại một kho cụ thể.",
    input_schema: {
      type: "object",
      properties: {
        warehouseId: {
          type: "string",
          description: "Mã kho hàng (ví dụ: 'KHO_BAC_NINH', 'KHO_CU_GIAY').",
        },
      },
      required: ["warehouseId"],
    },
  },
  // Tool 4: GHI DỮ LIỆU - Thực thi hành động khắc phục (Yêu cầu HITL)
  {
    name: "execute_operational_action",
    description: "Thực thi thao tác ghi dữ liệu: Đổi đơn vị vận chuyển hàng loạt hoặc tạo lệnh nhập kho khẩn cấp. BẮT BUỘC phải có xác nhận con người.",
    input_schema: {
      type: "object",
      properties: {
        actionType: {
          type: "string",
          enum: ["REASSIGN_CARRIER", "CREATE_EMERGENCY_PO"],
          description: "Loại hành động: REASSIGN_CARRIER (Đổi hãng vận chuyển), CREATE_EMERGENCY_PO (Tạo lệnh nhập kho).",
        },
        payload: {
          type: "object",
          description: "Dữ liệu thực thi chi tiết.",
        },
        confirmedByHuman: {
          type: "boolean",
          description: "Cờ xác nhận của con người. Nếu false, hệ thống sẽ KHÔNG ghi vào database.",
        },
      },
      required: ["actionType", "payload", "confirmedByHuman"],
    },
  },
];
