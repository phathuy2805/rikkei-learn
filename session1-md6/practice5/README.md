# [Bài tập 5 - Mức độ: Vận dụng cơ bản] Vá lỗi agent trả lời cụt lủn giữa chừng

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** AI Agent Fundamentals: Flow, Tools & Prompting (`session1-md6`)
> **Mã bài tập trên Portal:** `10218`
> **Mức độ:** Vận dụng cơ bản
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10218)

---

**\[Bài tập 5 - Mức độ: Vận dụng cơ bản\] Vá lỗi agent trả lời cụt lủn giữa chừng**

**1\. Mục tiêu**

-   Đọc hiểu mã nguồn vòng lặp agent có sẵn và dò được luồng thực thi.

-   Phát hiện lỗi logic khiến agent dừng sai thời điểm.

-   Chứng minh lỗi bằng test case cụ thể trước khi sửa.

**2\. Mô tả**

**Bối cảnh nghiệp vụ**

Quy tắc đúng: agent phải lặp cho tới khi model trả về câu trả lời hoàn chỉnh cho khách. Chỉ khi  `stop\_reason`  là  `end\_turn`  thì lượt hội thoại mới kết thúc.

**Vấn đề hiện tại**

CSKH phản ánh: khi khách hỏi về đơn hàng, agent chỉ im lặng hoặc trả về chuỗi rỗng. Nhưng khi khách chào hỏi bình thường thì agent trả lời tốt.

**Hiện trường**

*Đoạn mã đang chạy trên môi trường staging của ShopFast:*

 `// agent.ts - chay duoc, khong loi cu phap, nhung sai logic` 

 `async function runAgent(userInput: string) {` 

 `const messages: Anthropic.MessageParam\[\] = \[` 

 `{ role: "user", content: userInput },` 

 `\];` 

 `const response = await client.messages.create({` 

 `model: "claude-opus-5",` 

 `max\_tokens: 4096,` 

 `tools,` 

 `messages,` 

 `});` 

 `const toolUses = response.content.filter((b) => b.type === "tool\_use");` 

 `for (const tool of toolUses) {` 

 `const result = await executeTool(tool.name, tool.input);` 

 `messages.push({` 

 `role: "user",` 

 `content: \[` 

 `{ type: "tool\_result", tool\_use\_id: tool.id, content: result },` 

 `\],` 

 `});` 

 `}` 

 `const textBlock = response.content.find((b) => b.type === "text");` 

 `return textBlock ? textBlock.text : "";` 

 `}` 

**Yêu cầu đầu ra**

-   Phần 1 - Chỉ ra lỗi bằng dữ liệu: nêu ít nhất 2 khiếm khuyết trong đoạn mã trên, mỗi khiếm khuyết kèm một test case cụ thể (câu hỏi đầu vào, kết quả thực tế, kết quả đúng phải là gì).

-   Phần 2 - Source code đã sửa: nộp bản  `agent.ts`  chạy đúng, trả lời trọn vẹn câu hỏi "Đơn 1024 của tôi đang ở đâu?".

    Gợi ý phạm vi soi: thứ tự các message được đẩy vào lịch sử, và điều kiện kết thúc của một lượt hội thoại.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Bản phân tích chỉ ra được ít nhất 2 lỗi, mỗi lỗi có test case tái hiện.

-   Mã sau khi sửa trả lời đúng câu hỏi về đơn hàng, không còn chuỗi rỗng.

-   Lịch sử hội thoại chứa lượt  `assistant`  trước khi chứa  `tool\_result` .

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
