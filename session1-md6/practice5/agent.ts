/**
 * [Bài tập 5 - Mức độ: Vận dụng cơ bản] Vá lỗi agent trả lời cụt lủn giữa chừng
 * File: session1-md6/practice5/agent.ts
 */

// Định nghĩa kiểu dữ liệu theo chuẩn Anthropic SDK
export namespace Anthropic {
  export interface TextBlock {
    type: "text";
    text: string;
  }

  export interface ToolUseBlock {
    type: "tool_use";
    id: string;
    name: string;
    input: Record<string, any>;
  }

  export type ContentBlock = TextBlock | ToolUseBlock;

  export interface ToolResultBlockParam {
    type: "tool_result";
    tool_use_id: string;
    content: string;
    is_error?: boolean;
  }

  export type MessageParam =
    | { role: "user"; content: string | (ToolResultBlockParam | TextBlock)[] }
    | { role: "assistant"; content: ContentBlock[] };

  export interface Tool {
    name: string;
    description: string;
    input_schema: {
      type: "object";
      properties: Record<string, any>;
      required?: string[];
    };
  }

  export interface Response {
    id: string;
    model: string;
    content: ContentBlock[];
    stop_reason: "end_turn" | "tool_use" | "max_tokens" | "stop_sequence";
  }
}

// 1. Định nghĩa công cụ theo chuẩn Anthropic tool definition
export const tools: Anthropic.Tool[] = [
  {
    name: "check_order_status",
    description: "Tra cứu thông tin trạng thái, vị trí hiện tại và shipper của đơn hàng theo mã đơn.",
    input_schema: {
      type: "object",
      properties: {
        orderId: {
          type: "string",
          description: "Mã đơn hàng cần kiểm tra (ví dụ: '1024')",
        },
      },
      required: ["orderId"],
    },
  },
];

// 2. Hàm thực thi tool mô phỏng hệ thống vận chuyển của ShopFast
export async function executeTool(name: string, input: any): Promise<string> {
  if (name === "check_order_status") {
    const orderId = String(input.orderId || "");
    if (orderId === "1024") {
      return JSON.stringify({
        orderId: "1024",
        status: "DANG_GIAO",
        currentLocation: "Kho trung chuyển Cầu Giấy, Hà Nội",
        shipper: "Nguyễn Văn A (0987654321)",
        estimatedDelivery: "Trước 18:00 chiều nay",
      });
    }
    return JSON.stringify({
      orderId,
      status: "NOT_FOUND",
      message: "Không tìm thấy thông tin đơn hàng trên hệ thống.",
    });
  }
  return JSON.stringify({ error: `Tool ${name} không được hỗ trợ.` });
}

// 3. Client giả lập (hoặc kết nối Anthropic API thực tế)
export const client = {
  messages: {
    create: async (params: {
      model: string;
      max_tokens: number;
      tools?: Anthropic.Tool[];
      messages: Anthropic.MessageParam[];
    }): Promise<Anthropic.Response> => {
      // Dò tin nhắn cuối cùng để giả lập phản hồi của Claude
      const lastMsg = params.messages[params.messages.length - 1];

      // Lần đầu: Khách hỏi "Đơn 1024 của tôi đang ở đâu?"
      if (
        lastMsg.role === "user" &&
        typeof lastMsg.content === "string" &&
        lastMsg.content.includes("1024")
      ) {
        return {
          id: "msg_turn_1",
          model: params.model,
          content: [
            {
              type: "tool_use",
              id: "tool_call_1024",
              name: "check_order_status",
              input: { orderId: "1024" },
            },
          ],
          stop_reason: "tool_use",
        };
      }

      // Lần 2: Agent gửi tool_result quay lại cho Model
      if (
        lastMsg.role === "user" &&
        Array.isArray(lastMsg.content) &&
        lastMsg.content.some((c) => c.type === "tool_result")
      ) {
        return {
          id: "msg_turn_2",
          model: params.model,
          content: [
            {
              type: "text",
              text: "Đơn hàng #1024 của bạn hiện đang ở Kho trung chuyển Cầu Giấy, Hà Nội và đang được shipper Nguyễn Văn A (0987654321) giao. Dự kiến đơn hàng sẽ tới tay bạn trước 18:00 chiều nay!",
            },
          ],
          stop_reason: "end_turn",
        };
      }

      // Trường hợp chào hỏi thông thường
      return {
        id: "msg_turn_greeting",
        model: params.model,
        content: [
          {
            type: "text",
            text: "Xin chào! Tôi là trợ lý ảo ShopFast. Tôi có thể giúp gì về đơn hàng của bạn hôm nay?",
          },
        ],
        stop_reason: "end_turn",
      };
    },
  },
};

/**
 * Hàm điều phối Agent đã được vá toàn bộ lỗi logic:
 * 1. Bổ sung vòng lặp Agent Loop chạy tới khi stop_reason === "end_turn".
 * 2. Lưu lại phản hồi của assistant vào lịch sử trước khi gửi lượt tool_result của user.
 * 3. Gom tất cả tool_results của một lượt vào cùng một message role: "user".
 * 4. Cơ chế bảo vệ MAX_ITERATIONS chống lặp vô hạn.
 */
export async function runAgent(userInput: string): Promise<string> {
  const messages: Anthropic.MessageParam[] = [
    { role: "user", content: userInput },
  ];

  const MAX_ITERATIONS = 10;
  let iterations = 0;

  while (iterations < MAX_ITERATIONS) {
    iterations++;

    // BƯỚC 1: Gửi toàn bộ lịch sử hiện tại tới Model
    const response = await client.messages.create({
      model: "claude-opus-5",
      max_tokens: 4096,
      tools,
      messages,
    });

    // BƯỚC 2: [QUAN TRỌNG] Ghi nhận lượt của assistant vào lịch sử
    messages.push({
      role: "assistant",
      content: response.content,
    });

    // BƯỚC 3: Nếu Model kết thúc lượt hội thoại (stop_reason === "end_turn")
    if (response.stop_reason === "end_turn") {
      const textBlock = response.content.find((b): b is Anthropic.TextBlock => b.type === "text");
      return textBlock ? textBlock.text : "";
    }

    // BƯỚC 4: Nếu Model yêu cầu gọi tool (stop_reason === "tool_use")
    if (response.stop_reason === "tool_use") {
      const toolUses = response.content.filter(
        (b): b is Anthropic.ToolUseBlock => b.type === "tool_use"
      );

      // Gom tất cả tool_result vào 1 mảng duy nhất
      const toolResults: Anthropic.ToolResultBlockParam[] = [];

      for (const tool of toolUses) {
        try {
          const result = await executeTool(tool.name, tool.input);
          toolResults.push({
            type: "tool_result",
            tool_use_id: tool.id,
            content: result,
          });
        } catch (error: any) {
          toolResults.push({
            type: "tool_result",
            tool_use_id: tool.id,
            content: JSON.stringify({ error: error.message || "Lỗi thực thi tool" }),
            is_error: true,
          });
        }
      }

      // Đẩy tất cả kết quả tool vào 1 message duy nhất với role "user"
      messages.push({
        role: "user",
        content: toolResults,
      });

      // Tiếp tục vòng lặp để Model đọc kết quả tool và trả lời
      continue;
    }

    // BƯỚC 5: Xử lý fallback cho các stop_reason khác
    const textBlock = response.content.find((b): b is Anthropic.TextBlock => b.type === "text");
    if (textBlock) {
      return textBlock.text;
    }
    break;
  }

  throw new Error(`Agent vượt quá giới hạn ${MAX_ITERATIONS} vòng lặp mà chưa hoàn tất lượt.`);
}

// 4. Kịch bản chạy thử nghiệm
async function main() {
  console.log("================================================================");
  console.log("KIỂM THỬ AGENT ĐÃ ĐƯỢC VÁ LỖI (Vòng lặp Agent & Bảo toàn History)");
  console.log("================================================================\n");

  console.log("--- TEST CASE 1: Khách hỏi đơn hàng #1024 ---");
  const q1 = "Đơn 1024 của tôi đang ở đâu?";
  console.log(`[User]: ${q1}`);
  const ans1 = await runAgent(q1);
  console.log(`[Agent]: ${ans1}\n`);

  console.log("--- TEST CASE 2: Khách chào hỏi thông thường ---");
  const q2 = "Xin chào bạn!";
  console.log(`[User]: ${q2}`);
  const ans2 = await runAgent(q2);
  console.log(`[Agent]: ${ans2}\n`);

  console.log("=> KẾT LUẬN: Cả 2 trường hợp đều trả lời hoàn chỉnh, không còn chuỗi rỗng!");
}

if (require.main === module) {
  main();
}
