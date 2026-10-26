/**
 * [Bài tập 6 - Mức độ: Vận dụng cơ bản] Điền khuyết lược đồ tool khiến agent gọi sai tham số
 * File: session1-md6/practice6/refundTool.ts
 */

// 1. Lược đồ tool đã hoàn thiện 5 chỗ khuyết nghiêm ngặt
export const createRefundTool = {
  name: "create_refund",
  // (1) Mô tả chi tiết nghiệp vụ và ràng buộc
  description:
    "Tạo phiếu hoàn tiền cho khách hàng ShopFast. Chỉ được thực hiện khi đơn hàng đáp ứng chính sách: " +
    "Số tiền hoàn tối đa 5.000.000 VND và lý do hoàn tiền phải thuộc một trong ba lý do được duyệt: " +
    "HANG_LOI (sản phẩm lỗi/hỏng), GIAO_CHAM (giao hàng trễ hạn quá quy định), TRU_TIEN_2_LAN (lỗi cổng thanh toán trừ tiền trùng lặp).",
  input_schema: {
    type: "object",
    properties: {
      orderId: {
        type: "string",
        description: "Mã định danh đơn hàng cần hoàn tiền (ví dụ: '1024', 'ORD-998').",
      },
      // (2) Giới hạn số tiền: tối thiểu 1.000đ, tối đa 5.000.000đ, kiểu integer VND
      amount: {
        type: "integer",
        minimum: 1000,
        maximum: 5000000,
        description: "Số tiền hoàn bằng Việt Nam Đồng (VND), từ 1.000đ đến tối đa 5.000.000đ.",
      },
      // (3) Ràng buộc chặt chẽ vào đúng 3 lý do cho phép
      reason: {
        type: "string",
        enum: ["HANG_LOI", "GIAO_CHAM", "TRU_TIEN_2_LAN"],
        description: "Lý do hoàn tiền hợp lệ: HANG_LOI, GIAO_CHAM, hoặc TRU_TIEN_2_LAN.",
      },
    },
    // (4) Khai báo các trường bắt buộc
    required: ["orderId", "amount", "reason"],
    // (5) Chặn trường lạ / thuộc tính không khai báo
    additionalProperties: false,
  },
};

// 2. Xử lý bẫy dữ liệu: Hàm chuẩn hóa đơn vị rút gọn (ví dụ "5tr", "500k")
export function parseVietnameseAmount(input: string | number): number | null {
  if (typeof input === "number") return input;
  const cleaned = input.toLowerCase().trim().replace(/,/g, "").replace(/\./g, "");

  // Nhận diện "tr", "trieu", "triệu", "m"
  const millionMatch = cleaned.match(/^(\d+(?:\.\d+)?)\s*(tr|trieu|triệu|m)$/);
  if (millionMatch) {
    return Math.round(parseFloat(millionMatch[1]) * 1_000_000);
  }

  // Nhận diện "k", "nghin", "nghìn"
  const thousandMatch = cleaned.match(/^(\d+(?:\.\d+)?)\s*(k|nghin|nghìn)$/);
  if (thousandMatch) {
    return Math.round(parseFloat(thousandMatch[1]) * 1_000);
  }

  const num = parseInt(cleaned, 10);
  return isNaN(num) ? null : num;
}

// 3. Hàm kiểm tra và thực thi tool nghiêm ngặt (Strict Schema Validation)
export interface CreateRefundInput {
  orderId: string;
  amount: number | string;
  reason: string;
}

export function executeCreateRefund(input: CreateRefundInput): {
  success: boolean;
  message: string;
  data?: any;
} {
  const errors: string[] = [];

  // Kiểm tra orderId
  if (!input.orderId || typeof input.orderId !== "string" || input.orderId.trim() === "") {
    errors.push("orderId bắt buộc phải có giá trị hợp lệ.");
  }

  // Chuẩn hóa amount (xử lý bẫy 5tr)
  const normalizedAmount = parseVietnameseAmount(input.amount);
  if (normalizedAmount === null) {
    errors.push(`Số tiền '${input.amount}' không hợp lệ. Vui lòng nhập số tiền rõ ràng (ví dụ 5000000 hoặc 5tr).`);
  } else if (normalizedAmount < 1000) {
    errors.push("Số tiền hoàn tối thiểu là 1.000 VND.");
  } else if (normalizedAmount > 5_000_000) {
    errors.push(`Số tiền hoàn (${normalizedAmount.toLocaleString("vi-VN")} VND) vượt quá hạn mức tối đa cho phép là 5.000.000 VND.`);
  }

  // Kiểm tra lý do (enum)
  const validReasons = ["HANG_LOI", "GIAO_CHAM", "TRU_TIEN_2_LAN"];
  if (!validReasons.includes(input.reason)) {
    errors.push(
      `Lý do hoàn tiền '${input.reason}' không hợp lệ. Chỉ chấp nhận các lý do: ${validReasons.join(", ")}.`
    );
  }

  // Kiểm tra trường lạ
  const allowedKeys = new Set(["orderId", "amount", "reason"]);
  for (const key of Object.keys(input)) {
    if (!allowedKeys.has(key)) {
      errors.push(`Phát hiện trường lạ không được phép: '${key}'.`);
    }
  }

  if (errors.length > 0) {
    return {
      success: false,
      message: `[TỪ CHỐI TẠO PHIẾU]: \n- ${errors.join("\n- ")}`,
    };
  }

  return {
    success: true,
    message: `[THÀNH CÔNG] Đã tạo phiếu hoàn tiền cho đơn #${input.orderId} thành công.`,
    data: {
      refundId: `REF-${input.orderId}-${Date.now()}`,
      orderId: input.orderId,
      amountVND: normalizedAmount,
      reason: input.reason,
      createdAt: new Date().toISOString(),
    },
  };
}

// 4. Kịch bản chạy thử nghiệm 2 lần theo yêu cầu đầu ra
export function runDemo() {
  console.log("=================================================================");
  console.log("KIỂM THỬ LƯỢC ĐỒ TOOL TẠO PHIẾU HOÀN TIỀN NGHIÊM NGẶT");
  console.log("=================================================================\n");

  console.log("--- CHẠY THỬ LẦN 1: Yêu cầu hợp lệ (hoàn '2tr' do HANG_LOI) ---");
  const validReq: CreateRefundInput = {
    orderId: "1024",
    amount: "2tr", // Thử nghiệm bẫy dữ liệu đơn vị rút gọn
    reason: "HANG_LOI",
  };
  const res1 = executeCreateRefund(validReq);
  console.log(res1.message);
  if (res1.data) console.log("Data:", JSON.stringify(res1.data, null, 2));

  console.log("\n--- CHẠY THỬ LẦN 2: Yêu cầu sai (50 triệu vì khách không thích màu) ---");
  const invalidReq: CreateRefundInput = {
    orderId: "1024",
    amount: 50_000_000,
    reason: "Khách không thích màu",
  };
  const res2 = executeCreateRefund(invalidReq);
  console.log(res2.message);

  console.log("\n=> KẾT LUẬN: Đã hoàn thiện đủ 5 chỗ khuyết, chặn hoàn 50 triệu và lý do ngoài danh mục thành công!");
}

if (require.main === module) {
  runDemo();
}
