# [Bài tập 5 - Mức độ: Vận dụng cơ bản] Vá lỗi bộ nhớ đệm phục vụ giá sai cho khách hàng

> **Khóa học:** [FJS-MD6] Professional Backend Development & Optimization (Mã: `175`)
> **Session:** Redis Caching Fundamentals (`session4-md6`)
> **Mã bài tập trên Portal:** `10233`
> **Mức độ:** Vận dụng cơ bản
> **Đường dẫn nộp bài Portal:** [Link Portal](https://portal.rikkei.edu.vn/learn/175/homework/10233)

---

**\[Bài tập 5 - Mức độ: Vận dụng cơ bản\] Vá lỗi bộ nhớ đệm phục vụ giá sai cho khách hàng**

**1\. Mục tiêu**

-   Đọc hiểu mã nguồn tầng bộ nhớ đệm có sẵn và dò được luồng thực thi.

-   Phát hiện lỗi khiến bộ nhớ đệm trả về dữ liệu cũ và dữ liệu lẫn lộn.

-   Chứng minh lỗi bằng test case cụ thể trước khi sửa.

**2\. Mô tả**

**Bối cảnh nghiệp vụ**

Quy tắc đúng: khi giá sản phẩm thay đổi, khách hàng phải thấy giá mới ngay lập tức. Mỗi sản phẩm có bản ghi đệm riêng, không được lẫn với sản phẩm khác.

**Vấn đề hiện tại**

Bộ phận kinh doanh báo hai sự cố: khách đặt hàng theo giá khuyến mãi đã kết thúc từ hôm qua, và có khách mở sản phẩm A nhưng thấy thông tin của sản phẩm B.

**Hiện trường**

*Đoạn mã đang chạy trên môi trường thật của ShopFast:*

 `// product.service.ts - chay duoc, khong loi cu phap, nhung sai logic` 

 `@Injectable()` 

 `export class ProductService {` 

 `constructor(` 

 `@Inject(CACHE\_MANAGER) private cache: Cache,` 

 `private repo: ProductRepository,` 

 `) {}` 

 `async findOne(id: string) {` 

 `const cached = await this.cache.get("product");` 

 `if (cached) return cached;` 

 `const product = await this.repo.findById(id);` 

 `await this.cache.set("product", product);` 

 `return product;` 

 `}` 

 `async update(id: string, dto: UpdateProductDto) {` 

 `return this.repo.update(id, dto);` 

 `}` 

 `}` 

**Yêu cầu đầu ra**

-   Phần 1 - Chỉ ra lỗi bằng dữ liệu: nêu ít nhất 3 khiếm khuyết, mỗi khiếm khuyết kèm một test case cụ thể (gọi API nào với tham số gì, kết quả thực tế so với kết quả đúng).

-   Phần 2 - Source code đã sửa: nộp bản  `product.service.ts`  đặt khoá đúng, có thời gian sống và vô hiệu hoá bộ nhớ đệm khi cập nhật.

    Gợi ý phạm vi soi: khoá bộ nhớ đệm có phân biệt được các sản phẩm khác nhau không, bản ghi đệm sống bao lâu, và điều gì xảy ra với bộ nhớ đệm sau khi dữ liệu được cập nhật.

**3\. Đánh giá**

Để hoàn thành bài thực hành, học viên cần:

-   Bản phân tích chỉ ra được ít nhất 3 lỗi, mỗi lỗi có test case tái hiện.

-   Sau khi sửa: mở sản phẩm A rồi sản phẩm B cho ra đúng dữ liệu của từng sản phẩm.

-   Sau khi sửa: cập nhật giá xong thì lần đọc tiếp theo trả về giá mới ngay lập tức.

-   Bản ghi đệm có thời gian sống hữu hạn, kiểm chứng được bằng lệnh xem thời gian sống.

-   Đưa mã nguồn lên GitHub và dán link repository lên phần nộp bài trên hệ thống.
