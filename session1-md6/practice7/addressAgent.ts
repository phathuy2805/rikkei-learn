/**
 * [Bài tập 7 - Mức độ: Vận dụng chuyên sâu] Agent tự phục vụ đổi địa chỉ giao hàng
 * File: session1-md6/practice7/addressAgent.ts
 */

export interface ShippingAddress {
  province: string;
  district: string;
  street: string;
}

export interface Order {
  orderId: string;
  customerId: string;
  status: "CHO_XAC_NHAN" | "DANG_CHUAN_BI" | "DANG_GIAO" | "DA_GIAO" | "DA_HUY";
  address: ShippingAddress;
  addressChangeCount: number;
}

// 1. Giả lập Cơ sở dữ liệu đơn hàng ShopFast
const orderDatabase: Record<string, Order> = {
  "1024": {
    orderId: "1024",
    customerId: "CUST_001",
    status: "CHO_XAC_NHAN",
    address: { province: "Hà Nội", district: "Cầu Giấy", street: "Số 10 Phạm Văn Đồng" },
    addressChangeCount: 0,
  },
  "1025": {
    orderId: "1025",
    customerId: "CUST_001",
    status: "DANG_GIAO", // Đang giao -> Bị chặn
    address: { province: "Hà Nội", district: "Đống Đa", street: "Số 20 Chùa Bộc" },
    addressChangeCount: 0,
  },
  "1026": {
    orderId: "1026",
    customerId: "CUST_001",
    status: "DANG_CHUAN_BI",
    address: { province: "Hà Nội", district: "Nam Từ Liêm", street: "Số 15 Lê Đức Thọ" },
    addressChangeCount: 1, // Đã đổi 1 lần -> Bị chặn
  },
  "1027": {
    orderId: "1027",
    customerId: "CUST_001",
    status: "CHO_XAC_NHAN",
    address: { province: "Hà Nội", district: "Ba Đình", street: "Số 1 Kim Mã" },
    addressChangeCount: 0,
  },
  "1028": {
    orderId: "1028",
    customerId: "CUST_001",
    status: "CHO_XAC_NHAN",
    address: { province: "Hà Nội", district: "Hai Bà Trưng", street: "Số 2 Phố Huế" },
    addressChangeCount: 0,
  },
};

// 2. Bộ Tool tối thiểu đủ dùng (Least Privilege)
export const tools = [
  {
    name: "get_order_details",
    description: "Tra cứu thông tin trạng thái đơn hàng, người sở hữu và địa chỉ hiện tại (Read-only).",
    input_schema: {
      type: "object",
      properties: {
        orderId: { type: "string" },
      },
      required: ["orderId"],
    },
  },
  {
    name: "update_order_shipping_address",
    description: "Cập nhật địa chỉ nhận hàng mới cho đơn (Write-only).",
    input_schema: {
      type: "object",
      properties: {
        orderId: { type: "string" },
        customerId: { type: "string" },
        newAddress: {
          type: "object",
          properties: {
            province: { type: "string" },
            district: { type: "string" },
            street: { type: "string" },
          },
          required: ["province", "street"],
        },
      },
      required: ["orderId", "customerId", "newAddress"],
    },
  },
];

// 3. Thực thi tool với các quy tắc nghiệp vụ nghiêm ngặt
export async function executeTool(name: string, input: any): Promise<string> {
  if (name === "get_order_details") {
    const order = orderDatabase[input.orderId];
    if (!order) {
      return JSON.stringify({ error: `Không tìm thấy đơn hàng #${input.orderId}` });
    }
    return JSON.stringify(order);
  }

  if (name === "update_order_shipping_address") {
    const { orderId, customerId, newAddress } = input;
    const order = orderDatabase[orderId];

    if (!order) {
      return JSON.stringify({ success: false, error: "Đơn hàng không tồn tại." });
    }

    // Bẫy bảo mật: Kiểm tra quyền sở hữu đơn hàng
    if (order.customerId !== customerId) {
      return JSON.stringify({
        success: false,
        error: "Bạn không có quyền thay đổi địa chỉ của đơn hàng này.",
      });
    }

    // Kiểm tra trạng thái đơn
    if (order.status === "DANG_GIAO" || order.status === "DA_GIAO") {
      return JSON.stringify({
        success: false,
        error: `Đơn hàng đang ở trạng thái '${order.status}', không thể đổi địa chỉ trực tiếp. Quý khách vui lòng liên hệ tổng đài 1900-xxxx để được hỗ trợ.`,
      });
    }

    if (order.status !== "CHO_XAC_NHAN" && order.status !== "DANG_CHUAN_BI") {
      return JSON.stringify({
        success: false,
        error: `Đơn hàng ở trạng thái '${order.status}' không hỗ trợ đổi địa chỉ.`,
      });
    }

    // Kiểm tra giới hạn số lần đổi (tối đa 1 lần)
    if (order.addressChangeCount >= 1) {
      return JSON.stringify({
        success: false,
        error: "Đơn hàng này đã được thay đổi địa chỉ 1 lần trước đó. Mỗi đơn chỉ được đổi tối đa 1 lần.",
      });
    }

    // Bẫy dữ liệu: Kiểm tra địa chỉ rỗng hoặc chỉ có khoảng trắng
    if (
      !newAddress ||
      !newAddress.street ||
      newAddress.street.trim() === "" ||
      !newAddress.province ||
      newAddress.province.trim() === ""
    ) {
      return JSON.stringify({
        success: false,
        error: "Địa chỉ giao hàng không hợp lệ hoặc thiếu tên Tỉnh/Thành phố.",
      });
    }

    // Kiểm tra ràng buộc cùng tỉnh/thành
    const oldProvinceNorm = order.address.province.toLowerCase().trim();
    const newProvinceNorm = newAddress.province.toLowerCase().trim();
    if (oldProvinceNorm !== newProvinceNorm) {
      return JSON.stringify({
        success: false,
        error: `Địa chỉ mới (${newAddress.province}) khác Tỉnh/Thành phố với địa chỉ ban đầu (${order.address.province}). Để đổi sang tỉnh khác, quý khách vui lòng huỷ đơn hiện tại và đặt lại đơn mới.`,
      });
    }

    // Hợp lệ -> Thực hiện ghi dữ liệu
    order.address = {
      province: newAddress.province.trim(),
      district: (newAddress.district || "").trim(),
      street: newAddress.street.trim(),
    };
    order.addressChangeCount += 1;

    return JSON.stringify({
      success: true,
      message: `Đã đổi địa chỉ đơn hàng #${orderId} thành công!`,
      updatedAddress: order.address,
      remainingChanges: 0,
    });
  }

  return JSON.stringify({ error: `Tool ${name} không tồn tại.` });
}

// 4. Kịch bản chạy thử nghiệm chứng minh logic chống lỗi
export async function runDemonstration() {
  console.log("==================================================================");
  console.log("KIỂM THỬ AGENT ĐỔI ĐỊA CHỈ ĐƠN HÀNG SHOPFAST");
  console.log("==================================================================\n");

  const customerId = "CUST_001";

  console.log("--- CASE 1: Đổi thành công (cùng tỉnh Hà Nội, đơn CHO_XAC_NHAN) ---");
  const res1 = await executeTool("update_order_shipping_address", {
    orderId: "1024",
    customerId,
    newAddress: {
      province: "Hà Nội",
      district: "Cầu Giấy",
      street: "Số 99 Xuân Thủy",
    },
  });
  console.log("Kết quả:", res1);

  console.log("\n--- CASE 2: Bị chặn do đơn DANG_GIAO (Đơn #1025) ---");
  const res2 = await executeTool("update_order_shipping_address", {
    orderId: "1025",
    customerId,
    newAddress: {
      province: "Hà Nội",
      district: "Đống Đa",
      street: "Số 50 Thái Hà",
    },
  });
  console.log("Kết quả:", res2);

  console.log("\n--- CASE 3: Bị chặn do khác Tỉnh/Thành (Hà Nội -> TP. Hồ Chí Minh) ---");
  const res3 = await executeTool("update_order_shipping_address", {
    orderId: "1027",
    customerId,
    newAddress: {
      province: "TP. Hồ Chí Minh",
      district: "Quận 1",
      street: "Số 1 Lê Duẩn",
    },
  });
  console.log("Kết quả:", res3);

  console.log("\n--- CASE 4: Bị chặn do địa chỉ rỗng / khoảng trắng ---");
  const res4 = await executeTool("update_order_shipping_address", {
    orderId: "1028",
    customerId,
    newAddress: {
      province: "Hà Nội",
      district: "",
      street: "    ", // Khoảng trắng
    },
  });
  console.log("Kết quả:", res4);

  console.log("\n--- CASE 5: Bị chặn do không phải chủ đơn hàng (Sai customerId) ---");
  const res5 = await executeTool("update_order_shipping_address", {
    orderId: "1026",
    customerId: "HACKER_999", // Không phải chủ đơn
    newAddress: {
      province: "Hà Nội",
      district: "Nam Từ Liêm",
      street: "Số 88 Mễ Trì",
    },
  });
  console.log("Kết quả:", res5);

  console.log("\n=> KẾT LUẬN: Toàn bộ 5 kịch bản và bẫy dữ liệu đều được chặn an toàn, trả thông báo rõ ràng!");
}

if (require.main === module) {
  runDemonstration();
}
