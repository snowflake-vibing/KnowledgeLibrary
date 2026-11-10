# CHUYÊN ĐỀ TRUY VẤN ĐA CHIỀU MDX (ANALYSIS SERVICES)
## TÀI LIỆU ÔN THI CUỐI KỲ MÔN KHO DỮ LIỆU & OLAP – UIT

Kho tài liệu học tập, thực hành và rèn luyện kỹ năng viết truy vấn **MDX (Multidimensional Expressions)** chuẩn mực phục vụ kỳ thi kết thúc học phần môn Kho dữ liệu & OLAP (Khoa Hệ thống Thông tin - Trường Đại học Công nghệ Thông tin, ĐHQG-HCM) và hệ thống Microsoft SQL Server Analysis Services (SSAS).

---

## 🎯 MỤC ĐÍCH HỌC TẬP

Khác với các môn học lý thuyết thông thường, việc làm chủ ngôn ngữ MDX đòi hỏi người học phải đạt được 2 mục tiêu cốt lõi:

1. **Ghi nhớ chính xác từ khóa và cấu trúc cú pháp (Active Keyword & Syntax Recall):**
   - Không học thụ động theo dạng chọn đáp án trắc nghiệm A/B/C/D (dễ đoán mò dựa trên nhận diện mặt chữ).
   - Buộc não bộ phải tự truy xuất và gõ chính xác các từ khóa (`NON EMPTY`, `ON COLUMNS`, `ON ROWS`, `CROSSJOIN`, `HAVING`, `DIMENSION PROPERTIES`, `WITH MEMBER`, `GENERATE`, `PARALLELPERIOD`,...) cũng như các ký hiệu đặc trưng của MDX (dấu ngoặc đơn `( )` cho Tuple, dấu ngoặc nhọn `{ }` cho Set).

2. **Rèn luyện kỹ năng tự viết code MDX hoàn chỉnh (Hands-on Code Writing):**
   - Chuyển hóa yêu cầu phân tích kinh doanh thành câu lệnh truy vấn đa chiều mạch lạc.
   - Hiểu sâu bản chất tập ô kết quả (`Cellset`), cơ chế phân cấp (`Hierarchy`), thành viên mặc định (`Default Member`) và phân biệt rõ ràng giữa **Query Axis (`SELECT`)** và **Slicer Axis (`WHERE`)**.

---

## 🏗 NGUYÊN TẮC TỔ CHỨC THƯ MỤC HỌC TẬP

Toàn bộ các chuyên đề MDX được chuẩn hóa theo quy tắc **Mỗi thư mục là một đơn vị học tập trọn vẹn (Self-contained Module)**:

$$\text{1 Folder} = \text{1 File lý thuyết (`ly_thuyet.md`)} + \text{1 File bài tập điền từ khóa (`bai_tap_dien_tu.html`)}$$

| Thành phần | Định dạng | Vai trò & Mục đích |
| :--- | :---: | :--- |
| **Lý thuyết chuyên đề** | `ly_thuyet.md` | Hệ thống hóa kiến thức trọng tâm, cú pháp chuẩn Microsoft Learn & đề thi UIT, phân tích nguyên lý hoạt động kèm bảng đối chiếu và code mẫu giải thích chi tiết. |
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
- **Bài tập điền từ khóa:** [`bai_tap_dien_tu.html`](01_mdx_query_fundamentals/bai_tap_dien_tu.html) (15 bài tập điền từ khóa nền tảng).

---

### 2. [02_specify_the_contents_of_a_query_axis/](02_specify_the_contents_of_a_query_axis/)
- **Lý thuyết:** [`ly_thuyet.md`](02_specify_the_contents_of_a_query_axis/ly_thuyet.md)
  - Cú pháp mệnh đề đặc tả trục truy vấn: `<SELECT query axis clause>`.
  - Bản đồ 128 trục truy vấn, hệ thống Alias chuẩn: `COLUMNS (0)`, `ROWS (1)`, `PAGES (2)`, `SECTIONS (3)`, `CHAPTERS (4)`.
  - Tối ưu hóa bảng kết quả với từ khóa `NON EMPTY`.
  - Lọc điều kiện trực tiếp trên trục bằng mệnh đề `HAVING`.
  - Truy xuất siêu dữ liệu thành viên bằng `DIMENSION PROPERTIES`.
  - 2 quy tắc vàng: **No Skipped Axes** (không được nhảy cóc trục) và **Empty SELECT Clause** (0 trục - Single Cell).
- **Kịch bản truy vấn mẫu:** [`query.mdx`](02_specify_the_contents_of_a_query_axis/query.mdx) (Bộ 10 truy vấn thực hành mẫu).
- **Bài tập điền từ khóa:** [`bai_tap_dien_tu.html`](02_specify_the_contents_of_a_query_axis/bai_tap_dien_tu.html) (18 bài tập điền từ khóa cú pháp trục).

---

### 3. [03_hierarchical_navigation_drill_rollup/](03_hierarchical_navigation_drill_rollup/)
- **Lý thuyết:** [`ly_thuyet.md`](03_hierarchical_navigation_drill_rollup/ly_thuyet.md)
  - Bản chất thao tác **Roll-up (Cuộn gộp)** và **Drill-down (Khoan sâu)** (Trọng tâm Câu 2 Đề thi UIT).
  - Kỹ thuật điều hướng cha con: `.Children`, `.Parent`, `.Siblings`, `.FirstChild`, `.LastChild`.
  - Hàm khoan sâu đa cấp cực mạnh: `DESCENDANTS(Member, Level, Flags)` với các cờ `SELF`, `LEAVES`, `BEFORE`, `AFTER`.
  - Hàm điều hướng chuỗi thời gian: `.PrevMember`, `.NextMember`.
  - Mẫu câu thuyết minh *"theo yếu tố gì"* để đạt trọn điểm thi.
- **Bài tập điền từ khóa:** [`bai_tap_dien_tu.html`](03_hierarchical_navigation_drill_rollup/bai_tap_dien_tu.html) (15 bài tập điền từ điều hướng phân cấp).

---

### 4. [04_advanced_filtering_and_sorting/](04_advanced_filtering_and_sorting/)
- **Lý thuyết:** [`ly_thuyet.md`](04_advanced_filtering_and_sorting/ly_thuyet.md)
  - Lọc điều kiện nâng cao với hàm `FILTER(Set, Logical_Expression)`.
  - Bộ đôi xếp hạng: `TOPCOUNT` (giảm dần) và `BOTTOMCOUNT` (tăng dần).
  - Xếp hạng theo phần trăm và tích lũy: `TOPPERCENT`, `BOTTOMPERCENT`, `TOPSUM`, `BOTTOMSUM`.
  - Hàm sắp xếp `ORDER`: Phân biệt cốt tử giữa cờ **Hierarchical (`ASC`, `DESC`)** và cờ **Break Hierarchy (`BASC`, `BDESC`)**.
  - Hàm cắt đầu & cắt đuôi tập hợp: `HEAD` và `TAIL`.
- **Bài tập điền từ khóa:** [`bai_tap_dien_tu.html`](04_advanced_filtering_and_sorting/bai_tap_dien_tu.html) (15 bài tập điền từ lọc và xếp hạng).

---

### 5. [05_generate_and_iterative_functions/](05_generate_and_iterative_functions/)
- **Lý thuyết:** [`ly_thuyet.md`](05_generate_and_iterative_functions/ly_thuyet.md)
  - **Bài toán kinh điển Câu 3a Đề thi UIT (1.0 điểm):** *"Với mỗi X, tìm top N của Y"* (Top N per group).
  - Vì sao không thể dùng `CROSSJOIN + TOPCOUNT` đơn thuần (lỗi tính toán toàn cục).
  - Cú pháp và nguyên lý lặp của hàm `GENERATE(Set1, Set2_Expression [, ALL])`.
  - Mẫu thiết kế chuẩn kết hợp `GENERATE + CurrentMember + CROSSJOIN + TOPCOUNT`.
  - Giải phẫu chi tiết lời giải Câu 3a Đề thi HK2 2023-2024.
- **Bài tập điền từ khóa:** [`bai_tap_dien_tu.html`](05_generate_and_iterative_functions/bai_tap_dien_tu.html) (12 bài tập điền từ hàm GENERATE).

---

### 6. [06_calculated_members_named_sets_aggregates/](06_calculated_members_named_sets_aggregates/)
- **Lý thuyết:** [`ly_thuyet.md`](06_calculated_members_named_sets_aggregates/ly_thuyet.md)
  - **Bài toán kinh điển Câu 3b Đề thi UIT (1.0 điểm):** Tính toán gộp nhiều năm / nhiều thời kỳ.
  - Định nghĩa thành viên tính toán: `WITH MEMBER`.
  - Định nghĩa tập hợp đặt tên: `WITH SET`.
  - **Hàm tổng hợp thông minh `AGGREGATE` vs `SUM`:** Xử lý chuẩn xác các độ đo không cộng dồn / DistinctCount (như `SoLuongTour`).
  - Giải phẫu chi tiết 2 cách giải Câu 3b Đề thi HK2 2023-2024.
- **Bài tập điền từ khóa:** [`bai_tap_dien_tu.html`](06_calculated_members_named_sets_aggregates/bai_tap_dien_tu.html) (12 bài tập điền từ Calculated Members & AGGREGATE).

---

### 7. [07_time_intelligence_and_trend_analysis/](07_time_intelligence_and_trend_analysis/)
- **Lý thuyết:** [`ly_thuyet.md`](07_time_intelligence_and_trend_analysis/ly_thuyet.md)
  - **Chuyên đề điểm 9 - 10:** Phân tích chuỗi thời gian và tốc độ tăng trưởng.
  - Hàm tìm kỳ song song cùng kỳ: `PARALLELPERIOD(Level, Lag, Member)`.
  - Công thức tính tăng trưởng cùng kỳ năm trước (YoY) và kỳ trước (MoM / QoQ).
  - Hàm tính lũy kế: `PeriodsToDate`, `YTD()`, `QTD()`, `MTD()`.
  - Hàm lấy đầu kỳ và cuối kỳ: `OpeningPeriod` và `ClosingPeriod`.
  - Xử lý chia cho 0 bằng hàm `IIF` và định dạng `FORMAT_STRING = "Percent"`.
- **Bài tập điền từ khóa:** [`bai_tap_dien_tu.html`](07_time_intelligence_and_trend_analysis/bai_tap_dien_tu.html) (12 bài tập điền từ Time Intelligence).

---

## 💡 HƯỚNG DẪN HỌC TẬP HIỆU QUẢ

1. **Bước 1 - Đọc hiểu lý thuyết:** Mở file `ly_thuyet.md` của từng chuyên đề, nắm vững cú pháp, ý nghĩa các tham số và quan sát các đoạn code minh họa.
2. **Bước 2 - Luyện phản xạ gõ code:** Mở trực tiếp file `bai_tap_dien_tu.html` trên trình duyệt (Chrome, Edge,...). Đọc kỹ ngữ cảnh bài toán, tự gõ các từ khóa/cú pháp còn thiếu vào các ô trống mà không mở tài liệu tham khảo.
3. **Bước 3 - Kiểm tra & Sửa lỗi:** Bấm **"Kiểm tra câu này"** để xem đúng/sai ngay lập tức. Nếu chưa nhớ, bấm **"Xem gợi ý"** để gợi nhắc lại quy tắc ngữ pháp.
4. **Bước 4 - Thực hành trên SSMS:** Mở các câu lệnh trong `query.mdx` chạy thử trên SQL Server Management Studio kết nối với Cube Adventure Works để đối chiếu kết quả dạng Cellset thực tế.
