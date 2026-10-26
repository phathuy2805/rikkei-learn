# [Bài tập 6 - Mức độ: Vận dụng cơ bản] Điền khuyết bộ đếm cửa sổ trượt

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** API Rate Limiting in Nest.js (`session3-md6`)
> **Mã bài tập trên Portal:** `10229`
> **Mức độ:** Vận dụng cơ bản
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10229)

---

**\[Bài tập 6 - Mức độ: Vận dụng cơ bản\] Điền khuyết bộ đếm cửa sổ trượt**

**1\. Mục tiêu**

-   Hiểu nhược điểm biên của thuật toán cửa sổ cố định.

-   Bổ sung logic tính toán theo cửa sổ trượt.

**2\. Mô tả**

**Bối cảnh nghiệp vụ**

Quy tắc đúng: trong bất kỳ khoảng 60 giây liên tiếp nào, một tài khoản cũng chỉ được gọi tối đa 100 lần.

**Vấn đề hiện tại**

Với thuật toán cửa sổ cố định hiện tại, kẻ tấn công gọi 100 lần vào giây thứ 59 rồi 100 lần nữa vào giây thứ 61. Kết quả: 200 request trong 2 giây mà không bị chặn lần nào.

**Hiện trường**

*Lớp giới hạn cửa sổ trượt - hãy điền vào 5 chỗ khuyết được đánh dấu:*

 `class SlidingWindowLimiter {` 

 `private counters = new Map<string, { prev: number; curr: number }>();` 

 `private readonly windowMs = 60\_000;` 

 `private readonly limit = 100;` 

 `isAllowed(key: string, now: number): boolean {` 

 `const windowStart = Math.floor(now / this.windowMs) \* this.windowMs;` 

 `const c = this.counters.get(key) ?? { prev: 0, curr: 0 };` 

 `// (1) thieu buoc xoay vong khi da sang cua so moi` 

 `// (2) thieu tinh ti le phan con lai cua cua so truoc` 

 `// (3) thieu cong thuc uoc luong tong so request trong 60s vua qua` 

 `// (4) thieu so sanh voi han muc de quyet dinh cho qua hay chan` 

 `// (5) thieu buoc tang bo dem khi request duoc cho qua` 

 `return true;` 

 `}` 

 `}` 

**Yêu cầu đầu ra**

-   Hoàn thiện đủ 5 chỗ khuyết. Gợi ý công thức ước lượng: lấy số đếm của cửa sổ hiện tại cộng với số đếm cửa sổ trước nhân tỉ lệ phần thời gian của cửa sổ trước còn nằm trong 60 giây gần nhất.

-   Viết bộ kiểm thử tự động chứng minh kịch bản tấn công biên (100 lần ở giây 59, 100 lần ở giây 61) bị chặn.

    **Bẫy dữ liệu**

-   Một khoá chưa từng xuất hiện - phải xử lý được mà không ném lỗi.

-   Khoá xuất hiện lần cuối cách đây 10 phút - số đếm cũ phải được coi là đã hết hạn, không cộng dồn vào.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Kịch bản tấn công biên bị chặn, chứng minh bằng bộ kiểm thử tự động.

-   Lưu lượng đều đặn 90 request mỗi phút vẫn được cho qua bình thường, không chặn oan.

-   Khoá mới và khoá đã lâu không dùng đều xử lý đúng, không ném lỗi.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
