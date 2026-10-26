# Báo Cáo Giải Bài Tập 7 (Session 2): Khung Chat Hỗ Trợ Khách Hàng Thời Gian Thực

**Học viên:** [FJS-MD6] Professional Backend Development & Optimization  
**Mã bài tập:** `homeworkId: 10225` | `session2-md6/practice7`  
**Mức độ:** Vận dụng chuyên sâu  

---

## 1. THIẾT KẾ BỘ SỰ KIỆN HAI CHIỀU (BIDIRECTIONAL EVENTS)

| Sự kiện Client gửi lên | Sự kiện Server phát xuống | Mục đích nghiệp vụ |
| :--- | :--- | :--- |
| `chat:join_session` | `chat:session_ready` | Mở hoặc tiếp tục phiên chat giữa Khách & CSKH |
| `chat:send_message` | `chat:new_message` | Chuyển tiếp tin nhắn thời gian thực (< 1 giây) |
| `chat:typing` | `chat:user_typing` | Hiển thị trạng thái "đang soạn tin" |
| `chat:stop_typing` | `chat:user_stop_typing` | Tắt trạng thái đang soạn tin (hoặc timeout 3s) |
| `chat:end_session` | `chat:session_closed` | Kết thúc phiên chat và lưu lịch sử |
