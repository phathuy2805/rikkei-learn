# Introduction to Git & GitHub

---

## 1. Khái Niệm Về VCS (Version Control System)

### Tại Sao Cần VCS?

Hãy tưởng tượng bạn đang làm việc trên một dự án lớn với nhiều thành viên. Nếu không có công cụ quản lý phiên bản, bạn sẽ gặp phải các vấn đề sau:

| Vấn đề                                                                         | Hậu quả                                  |
|--------------------------------------------------------------------------------|------------------------------------------|
| Quản lý thủ công bằng cách đặt tên file (`v1`, `v2_final`, `v2_final_thật sự`) | Hỗn loạn, khó xác định phiên bản đúng    |
| Ghi đè nhầm file của người khác                                                | Mất công sức, gây xung đột               |
| Máy tính hỏng hoặc xóa nhầm file                                               | Mất toàn bộ dữ liệu, không thể khôi phục |
| Nhiều người cùng sửa một file                                                  | Không biết ai sửa gì, khi nào            |

**→ VCS ra đời để giải quyết tất cả những vấn đề trên.**

---

### Version Control System (VCS) Là Gì?

**VCS (Hệ thống Quản lý Phiên bản)** là một công cụ phần mềm theo dõi và ghi lại **mọi thay đổi** của file theo thời gian. Thay vì lưu nhiều bản copy của file, VCS lưu lại **lịch sử chỉnh sửa** dưới dạng các **Snapshot** (ảnh chụp trạng thái).

- **Cơ chế hoạt động:** Mỗi lần bạn "lưu" (commit), hệ thống chụp lại toàn bộ trạng thái dự án tại thời điểm đó.
- **Lợi ích cốt lõi:**
  - Quay lại bất kỳ phiên bản nào trong quá khứ chỉ bằng một lệnh
  - Biết chính xác ai đã thay đổi gì, vào lúc nào, vì lý do gì
  - Nhiều người làm việc song song mà không lo ghi đè lên nhau

---

### Phân Loại VCS

#### Mô Hình 1: Centralized VCS (Tập trung) — Ví dụ: SVN, TFS

```
[Máy A] ──┐
[Máy B] ──┼──► [MÁY CHỦ TRUNG TÂM] ◄── Toàn bộ lịch sử lưu ở đây
[Máy C] ──┘
```

- **Cách hoạt động:** Tất cả lịch sử code chỉ được lưu trên **một máy chủ duy nhất**. Mọi thành viên phải kết nối lên server để làm việc.
- **Ưu điểm:** Dễ quản lý tập trung, admin kiểm soát quyền truy cập dễ dàng.
- **Nhược điểm:**
  - ⚠️ **Mất kết nối Internet = Không thể commit, không thể xem lịch sử**
  - ⚠️ **Server hỏng = Mất toàn bộ lịch sử dự án** (Single point of failure)
  - Tốc độ phụ thuộc vào đường truyền mạng

#### Mô Hình 2: Distributed VCS (Phân tán) — Ví dụ: Git, Mercurial

```
[Máy A: Repo đầy đủ] ◄──► [Remote Server (GitHub)] ◄──► [Máy B: Repo đầy đủ]
```

- **Cách hoạt động:** Mỗi thành viên có **một bản sao đầy đủ** của toàn bộ lịch sử dự án ngay trên máy cá nhân. Remote Server chỉ đóng vai trò đồng bộ.
- **Ưu điểm:**
  - ✅ **Làm việc offline hoàn toàn** — commit, xem lịch sử, tạo nhánh mà không cần Internet
  - ✅ **An toàn tuyệt đối** — nếu server sập, mọi máy đều có bản sao đầy đủ
  - ✅ **Tốc độ nhanh** — hầu hết thao tác thực hiện cục bộ trên máy
  - ✅ **Hỗ trợ workflow linh hoạt** — phân nhánh, merge mạnh mẽ

> **Kết luận:** Git (Distributed) là lựa chọn vượt trội so với SVN (Centralized) cho hầu hết mọi dự án hiện đại.

---

## 2. Giới Thiệu Về Git

### Git Là Gì?

**Git** là hệ thống quản lý phiên bản phân tán (Distributed VCS) phổ biến nhất thế giới.

- **Tác giả:** Linus Torvalds — cha đẻ của Linux, tạo ra Git năm 2005
- **Tốc độ:** Xử lý cực nhanh ngay cả với dự án hàng triệu dòng code
- **Tư duy:** Non-linear development (Phát triển phi tuyến tính) — cho phép nhiều luồng phát triển song song thông qua hệ thống nhánh (branch)

---

### Git vs GitHub — Đừng Nhầm Lẫn!

|                   | Git                              | GitHub                             |
|-------------------|----------------------------------|------------------------------------|
| **Bản chất**      | Phần mềm cài trên máy tính       | Dịch vụ web (Cloud)                |
| **Chức năng**     | Quản lý phiên bản cục bộ (Local) | Lưu trữ và chia sẻ code trực tuyến |
| **Cần Internet?** | Không (hoạt động offline)        | Có                                 |
| **Tương tự**      | Công cụ lưu file của bạn         | Google Drive cho code              |

> **Tóm lại:** Git là công cụ, GitHub là nơi lưu trữ. Bạn dùng Git để làm việc, dùng GitHub để chia sẻ với người khác.

---

### Cấu Hình Định Danh (Identity)

Trước khi làm việc, Git cần biết bạn là ai — vì mọi commit đều được **đóng dấu tên và email** của tác giả.

**Thiết lập định danh lần đầu:**
```bash
git config --global user.name "Tên Của Bạn"
git config --global user.email "email@example.com"
```

**Xem lại định danh đã cấu hình:**
```bash
# Xem toàn bộ cấu hình
git config --list

# Xem riêng từng mục
git config user.name
git config user.email
```

**Chỉnh sửa / Khôi phục định danh:**

Nếu bạn nhập sai tên hoặc email, chỉ cần chạy lại lệnh `config` với giá trị đúng — Git sẽ tự động ghi đè:
```bash
# Sửa tên
git config --global user.name "Tên Đúng"

# Sửa email
git config --global user.email "email_dung@example.com"
```

> **Lưu ý:** Flag `--global` áp dụng cho tất cả dự án trên máy. Nếu muốn cấu hình riêng cho từng dự án, bỏ flag này và chạy trong thư mục dự án.

---

### Quy Trình 3 Khu Vực Của Git

Đây là tư duy quan trọng nhất khi làm việc với Git. Git chia quá trình lưu trữ thành **3 khu vực độc lập**:

```
┌─────────────────────┐    git add    ┌─────────────────────┐    git commit    ┌─────────────────────┐
│                     │  ──────────►  │                     │  ──────────────► │                     │
│  Working Directory  │               │    Staging Area     │                  │     Local Repo      │
│  (Thư mục làm việc) │  ◄──────────  │  (Khu vực chuẩn bị) │                  │  (Kho lưu chính thức│
│                     │  git restore  │                     │                  │   .git folder)      │
└─────────────────────┘               └─────────────────────┘                  └─────────────────────┘
```

**Giải thích từng khu vực:**

| Khu Vực               | Vai Trò                                                                                | Ví Dụ Thực Tế                                     |
|-----------------------|----------------------------------------------------------------------------------------|---------------------------------------------------|
| **Working Directory** | Nơi bạn trực tiếp chỉnh sửa file, giống như bàn làm việc thực tế                       | Bạn mở `index.html` và gõ code                    |
| **Staging Area**      | Khu vực "nháp" — bạn chọn lọc những thay đổi nào sẽ được lưu vào lịch sử               | Giống như đặt tài liệu vào phong bì trước khi gửi |
| **Local Repo**        | Kho lưu trữ chính thức, toàn bộ lịch sử commit được ghi vào đây (trong thư mục `.git`) | Hộp lưu trữ tất cả các phong bì đã gửi            |

**Tại sao cần Staging Area?**

Staging Area cho phép bạn **chọn lọc thay đổi** trước khi commit. Ví dụ: bạn sửa 5 file, nhưng chỉ muốn commit 3 file liên quan đến tính năng A — bạn chỉ `git add` 3 file đó vào Staging, rồi commit, để lại 2 file kia cho lần commit sau.

**Luồng làm việc điển hình:**
```bash
# 1. Chỉnh sửa file trong Working Directory
# ... (sửa code) ...

# 2. Đưa thay đổi vào Staging Area
git add index.html          # Thêm một file cụ thể
git add .                   # Thêm tất cả file đã thay đổi

# 3. Commit từ Staging vào Local Repo
git commit -m "Mô tả rõ ràng những gì bạn đã làm"

# 4. Kiểm tra trạng thái bất cứ lúc nào
git status
```

---

### Vòng Đời Của File Trong Git

```
Tạo file mới
     │
     ▼
[Untracked] ──git add──► [Staged] ──git commit──► [Unmodified]
                                                        │
                                              (chỉnh sửa file)
                                                        │
                                                        ▼
                                                  [Modified] ──git add──► [Staged]
```

| Trạng Thái     | Ý Nghĩa                                                              |
|----------------|----------------------------------------------------------------------|
| **Untracked**  | File mới tạo, Git chưa bao giờ theo dõi file này                     |
| **Modified**   | File đã được Git theo dõi, và vừa bị chỉnh sửa, nhưng chưa `git add` |
| **Staged**     | File đã `git add`, đang chờ được commit vào lịch sử                  |
| **Unmodified** | File đã commit, hiện tại không có thay đổi nào mới                   |

---

### Các Lệnh Thao Tác Cốt Lõi

```bash
git init            # Khởi tạo kho Git trong thư mục hiện tại
git status          # Xem trạng thái của tất cả file
git add <file>      # Đưa file vào Staging Area
git add .           # Đưa tất cả thay đổi vào Staging Area
git commit -m "..."  # Lưu Staging vào Local Repo kèm ghi chú
git log             # Xem lịch sử các commit
git log --oneline   # Xem lịch sử commit ngắn gọn (1 dòng/commit)
```

---

## 3. Tư Duy Làm Việc Theo Nhánh (Branch)

### Nhánh Là Gì?

Hãy hình dung lịch sử commit là một **con đường thẳng**. Khi tạo nhánh, bạn tách ra một **con đường riêng** để thử nghiệm hoặc phát triển tính năng mới mà **không ảnh hưởng đến con đường chính (main)**.

```
main:    A──B──C──────────────────M (merge)
                \                /
feature:         D──E──F──G──H─/
```

- **Mục đích:** Phát triển tính năng mới (Feature) hoặc sửa lỗi (Bugfix) song song và an toàn
- **Lợi ích:** Nhánh `main` luôn chứa code ổn định, sẵn sàng deploy bất cứ lúc nào

**Các lệnh branch cơ bản:**
```bash
git branch                  # Xem danh sách nhánh
git branch ten-nhanh        # Tạo nhánh mới
git checkout ten-nhanh      # Chuyển sang nhánh
git checkout -b ten-nhanh   # Tạo và chuyển sang nhánh ngay
git merge ten-nhanh         # Gộp nhánh vào nhánh hiện tại
```

---

## 4. Xử Lý Xung Đột (Merge Conflict)

### Khi Nào Xảy Ra Conflict?

Conflict xảy ra khi **2 nhánh cùng chỉnh sửa một đoạn code ở cùng một vị trí** và Git không thể tự quyết định giữ bản nào.

```
Nhánh A sửa dòng 10: "color: red"
Nhánh B sửa dòng 10: "color: blue"
→ Git không biết nên giữ cái nào → Conflict!
```

### Cách Xử Lý

1. Mở file bị conflict — Git sẽ đánh dấu phần xung đột:
```
<<<<<<< HEAD (Current Change)
color: red;
=======
color: blue;
>>>>>>> feature/new-design (Incoming Change)
```

2. **Chọn** giữ phần nào (Current, Incoming, hoặc kết hợp cả hai), rồi **xóa** các dòng đánh dấu của Git.

3. Lưu file và hoàn tất:
```bash
git add <file-da-sua>
git commit -m "Resolve merge conflict in style.css"
```

---

## 5. Quản Trị Mã Nguồn Với Remote Repository

### Remote Repository Là Gì?

Remote Repository là kho lưu trữ code **trên máy chủ từ xa** (cloud), đóng vai trò là **trung tâm đồng bộ** cho toàn bộ nhóm.

- **Nền tảng phổ biến:** GitHub, GitLab, Bitbucket
- **Mục đích:** Chia sẻ code, sao lưu an toàn, và phối hợp nhóm

---

### Thiết Lập Kết Nối Local ↔ Remote

```bash
# Liên kết Local Repo với Remote Server
git remote add origin <URL>

# Xem danh sách remote đã kết nối
git remote -v
```

- **`origin`**: Tên gợi nhớ mặc định cho remote chính (có thể đặt tên khác)
- **`<URL>`**: Đường dẫn đến kho trên GitHub (dạng HTTPS hoặc SSH)

---

### Các Thao Tác Đồng Bộ

| Lệnh                   | Chức Năng                                     | Hướng                    |
|------------------------|-----------------------------------------------|--------------------------|
| `git push origin main` | Đẩy commit từ Local lên Remote                | Local → Remote           |
| `git pull origin main` | Kéo thay đổi mới nhất từ Remote về Local      | Remote → Local           |
| `git fetch`            | Tải dữ liệu từ Remote nhưng chưa gộp vào code | Remote → Local (an toàn) |

**Đẩy code lên Remote (Push):**
```bash
git push origin main
# Chuyển các commit từ Local Repository lên Remote Repository
```

**Cập nhật code từ Remote (Pull):**
```bash
git pull origin main
# Lấy thay đổi mới nhất từ Remote và tự động merge vào nhánh hiện tại
```

---

### Khởi Tạo Dự Án Từ Remote (Git Clone)

Khi bạn muốn bắt đầu làm việc trên một dự án đã có sẵn trên GitHub:

```bash
git clone <URL>
```

- **Tác dụng:** Sao chép toàn bộ dự án (kể cả lịch sử commit) về máy và tự động thiết lập kết nối `origin`
- **Lưu ý:** Chỉ thực hiện **1 lần duy nhất** khi bắt đầu. Sau đó dùng `git pull` để cập nhật.

---

### Tổng Kết Workflow Cơ Bản

```
Clone/Init → Chỉnh sửa → git add → git commit → git push
                ▲                                    │
                └──────────── git pull ──────────────┘
```

> **Quy tắc vàng khi làm nhóm:** Luôn `git pull` trước khi bắt đầu làm việc để đảm bảo bạn có code mới nhất, tránh conflict không cần thiết.


