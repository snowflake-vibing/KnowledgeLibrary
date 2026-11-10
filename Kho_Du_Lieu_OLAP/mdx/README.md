# CHUYÊN ĐỀ TRUY VẤN ĐA CHIỀU MDX (ANALYSIS SERVICES)

Kho tài liệu học tập, thực hành và rèn luyện kỹ năng viết truy vấn **MDX (Multidimensional Expressions)** cho Microsoft SQL Server Analysis Services (SSAS), Azure Analysis Services (AAS) và Power BI Premium / Microsoft Fabric.

---

## 🎯 MỤC ĐÍCH HỌC TẬP

Khác với các môn học lý thuyết thông thường, việc làm chủ ngôn ngữ MDX đòi hỏi người học phải đạt được 2 mục tiêu cốt lõi:

1. **Ghi nhớ chính xác từ khóa và cấu trúc cú pháp (Active Keyword & Syntax Recall):**
   - Không học thụ động theo dạng chọn đáp án trắc nghiệm A/B/C/D (dễ đoán mò dựa trên nhận diện mặt chữ).
   - Buộc não bộ phải tự truy xuất và gõ chính xác các từ khóa (`NON EMPTY`, `ON COLUMNS`, `ON ROWS`, `CROSSJOIN`, `HAVING`, `DIMENSION PROPERTIES`, `WITH MEMBER`, `GENERATE`,...) cũng như các ký hiệu đặc trưng của MDX (dấu ngoặc đơn `( )` cho Tuple, dấu ngoặc nhọn `{ }` cho Set).

2. **Rèn luyện kỹ năng tự viết code MDX hoàn chỉnh (Hands-on Code Writing):**
   - Chuyển hóa yêu cầu phân tích kinh doanh thành câu lệnh truy vấn đa chiều mạch lạc.
   - Hiểu sâu bản chất tập ô kết quả (`Cellset`), cơ chế phân cấp (`Hierarchy`), thành viên mặc định (`Default Member`) và phân biệt rõ ràng giữa **Query Axis (`SELECT`)** và **Slicer Axis (`WHERE`)**.

---

## 🏗 NGUYÊN TẮC TỔ CHỨC THƯ MỤC HỌC TẬP

Để phục vụ tối đa cho mục tiêu trên, toàn bộ các chuyên đề MDX được chuẩn hóa theo quy tắc **Mỗi thư mục là một đơn vị học tập trọn vẹn (Self-contained Module)** bao gồm:

$$\text{1 Folder} = \text{1 File lý thuyết (`ly_thuyet.md`)} + \text{1 File bài tập điền từ khóa (`bai_tap_dien_tu.html`)}$$

| Thành phần | Định dạng | Vai trò & Mục đích |
| :--- | :---: | :--- |
| **Lý thuyết chuyên đề** | `ly_thuyet.md` | Hệ thống hóa kiến thức trọng tâm, cú pháp chuẩn Microsoft Learn, phân tích nguyên lý hoạt động kèm bảng đối chiếu và code mẫu giải thích chi tiết. |
| **Ứng dụng bài tập tương tác** | `bai_tap_dien_tu.html` | Web App bài tập tương tác dạng **Điền từ khóa / Hoàn thiện code (Fill-in-the-Blank)**. Yêu cầu tự tay gõ từ khóa còn thiếu vào câu lệnh MDX, có chấm điểm tự động, gợi ý (Hint), kiểm tra đúng/sai ngay lập tức và giải thích chuyên sâu. |

---

## 📂 DANH MỤC CÁC CHUYÊN ĐỀ HỌC TẬP

### 1. [01_mdx_query_fundamentals/](01_mdx_query_fundamentals/)
- **Lý thuyết:** [`ly_thuyet.md`](01_mdx_query_fundamentals/ly_thuyet.md)
  - Nền tảng về khối Cube và tập ô đa chiều (`Multidimensional Cellset`).
  - 4 khối xây dựng: Dimension, Measure, Tuple `(...)` và Set `{...}`.
  - Cấu trúc 3 mệnh đề cơ bản: `SELECT ... FROM ... WHERE ...`.
  - Phân biệt chi tiết Query Axis vs Slicer Axis, cơ chế Default Member và Sub-SELECT.
  - Bảng so sánh toàn diện giữa tư duy truy vấn SQL vs MDX.
- **Bài tập điền từ khóa:** [`bai_tap_dien_tu.html`](01_mdx_query_fundamentals/bai_tap_dien_tu.html)
  - 15 câu bài tập điền từ khóa và hoàn thiện câu lệnh truy vấn nền tảng.

---

### 2. [02_specify_the_contents_of_a_query_axis/](02_specify_the_contents_of_a_query_axis/)
- **Lý thuyết:** [`ly_thuyet.md`](02_specify_the_contents_of_a_query_axis/ly_thuyet.md)
  - Cú pháp mệnh đề đặc tả trục truy vấn: `<SELECT query axis clause>`.
  - Bản đồ 128 trục truy vấn, hệ thống Alias chuẩn: `COLUMNS (0)`, `ROWS (1)`, `PAGES (2)`, `SECTIONS (3)`, `CHAPTERS (4)`.
  - Tối ưu hóa bảng kết quả với từ khóa `NON EMPTY`.
  - Lọc điều kiện trực tiếp trên trục bằng mệnh đề `HAVING`.
  - Truy xuất siêu dữ liệu thành viên bằng `DIMENSION PROPERTIES`.
  - 2 quy tắc vàng: **No Skipped Axes** (không được nhảy cóc trục) và **Empty SELECT Clause** (0 trục - Single Cell).
- **Kịch bản truy vấn mẫu:** [`query.mdx`](02_specify_the_contents_of_a_query_axis/query.mdx) (Bộ 10 truy vấn thực hành mẫu trên Adventure Works).
- **Bài tập điền từ khóa:** [`bai_tap_dien_tu.html`](02_specify_the_contents_of_a_query_axis/bai_tap_dien_tu.html)
  - 18 câu bài tập chuyên sâu điền từ khóa, sửa lỗi cú pháp trục và hoàn thiện code MDX.

---

## 💡 HƯỚNG DẪN HỌC TẬP HIỆU QUẢ

1. **Bước 1 - Đọc hiểu lý thuyết:** Mở file `ly_thuyet.md` của từng chuyên đề, nắm vững cú pháp, ý nghĩa các tham số và quan sát các đoạn code minh họa.
2. **Bước 2 - Luyện phản xạ gõ code:** Mở trực tiếp file `bai_tap_dien_tu.html` trên trình duyệt (Chrome, Edge,...). Đọc kỹ ngữ cảnh bài toán, tự gõ các từ khóa/cú pháp còn thiếu vào các ô trống mà không mở tài liệu tham khảo.
3. **Bước 3 - Kiểm tra & Sửa lỗi:** Bấm **"Kiểm tra câu này"** để xem đúng/sai ngay lập tức. Nếu chưa nhớ, bấm **"Xem gợi ý"** để gợi nhắc lại quy tắc ngữ pháp.
4. **Bước 4 - Thực hành trên SSMS:** Mở các câu lệnh trong `query.mdx` chạy thử trên SQL Server Management Studio kết nối với Cube Adventure Works để đối chiếu kết quả dạng Cellset thực tế.
