# QUY CHUẨN XÂY DỰNG CHUYÊN ĐỀ HỌC TẬP & BÀI TẬP DỰ BÁO
## Standard Operating Procedure (SOP) for Time-Series Forecasting & ML Tutorials

> **Mục tiêu tối thượng:** Giúp người học không chỉ đọc lý thuyết trừu tượng hay bấm máy tính dựa trên công thức có sẵn, mà phải **hiểu bản chất cơ chế (Mechanism & Architecture)**, **tự nhớ công thức trong đầu (Active Recall from Theory)** và **tự tay thực hiện toàn bộ các phép tính toán số liệu cụ thể (Hands-on Computation)**.

---

## 1. CẤU TRÚC THƯ MỤC BẮT BUỘC (MODULE STRUCTURE)

Mỗi chuyên đề nằm trong một thư mục riêng biệt được đánh số thứ tự: `HMTK/tutorial/XX_ten_chuyen_de/` (ví dụ `01_...`, `06_...`).
Mỗi chuyên đề **BẮT BUỘC CHỈ GỒM ĐÚNG 2 TẬP TIN CỐT LÕI**:

```text
HMTK/tutorial/XX_ten_chuyen_de/
├── ly_thuyet.md            # Tài liệu lý thuyết, kiến trúc, nguồn gốc toán học & ví dụ tính tay chi tiết
└── bai_tap_tinh_toan.html   # Web app tương tác kiểm tra kiến trúc & tự tay tính toán số liệu
```

---

## 2. NGUYÊN TẮC "100% ĐỒNG BỘ VÀ KHÔNG RỖNG RANH GIỚI"

> [!IMPORTANT]
> **Quy tắc bất biến:** *"Bất kỳ bài toán, bước tính trung gian (như logit tuyến tính $z$, sai số $e_t$, mức nền $l_t$, tọa độ lượng giác $\sin/\cos$, tỷ số mùa vụ) nào xuất hiện trong bài tập HTML thì BẮT BUỘC PHẢI ĐƯỢC DẠY VÀ GIẢI THÍCH TƯỜNG MINH trong file lý thuyết Markdown."*

* Không được phép đưa ra một bài tập trong HTML với các đại lượng hoặc công thức mà trong `ly_thuyet.md` không đề cập hoặc chỉ lướt qua.
* Các ký hiệu (ví dụ: $l_t, b_t, s_t, w_t, \nabla, z_f, z_i, z_c, z_o, \sigma, \tanh, e_t, \text{RM}_k$) phải có định nghĩa, đơn vị và ý nghĩa vật lý đồng nhất giữa hai tệp.
* Các con số và bước tính toán trong bài tập HTML phải có bài toán mẫu tương ứng trong mục *Ví dụ tính tay chi tiết (Worked Numerical Example)* của `ly_thuyet.md`.

---

## 3. QUY CHUẨN SOẠN THẢO TỆP LÝ THUYẾT (`ly_thuyet.md`)

Mỗi tệp `ly_thuyet.md` là cuốn giáo trình tự học toàn diện, bao gồm:

### 3.1. Cấu trúc tiêu chuẩn của `ly_thuyet.md`
1. **Tiêu đề & Tổng quan chuyên đề:** Nêu rõ bối cảnh, bài toán thực tế cần giải quyết.
2. **Sơ đồ Kiến trúc & Luồng Forward Pass (Mermaid Diagram):**
   * Sử dụng biểu đồ `flowchart LR` hoặc `flowchart TD`.
   * Mô tả trực quan luồng dữ liệu từ quan sát gốc $\to$ qua các tầng xử lý / bộ nhớ trạng thái $\to$ tính toán đầu ra $\to$ cơ chế hồi tiếp (recursive feedback) hoặc tích hợp phục hồi (undifferencing).
3. **Bản chất cơ chế & Khái niệm cốt lõi:**
   * Không chỉ liệt kê công thức mà phải giải thích *bản chất tại sao lại làm như vậy* (ví dụ: tại sao dùng hàm $\sigma$ cho cổng nhưng dùng $\tanh$ cho ô nhớ; tại sao đường cao tốc ô nhớ giải quyết triệt tiêu đạo hàm; tại sao phải lấy sai phân; tại sao cần mã hóa $\sin/\cos$ trên vòng tròn đơn vị).
   * Phân tích rõ các trường hợp biên ($\alpha \to 1$ vs $\alpha \to 0$, điều kiện dừng $|\phi_1| < 1$, v.v.).
4. **Hệ thống phương trình toán học chi tiết:**
   * Trình bày dạng hiển thị độc lập: đặt giữa `$$ ... $$` với một dòng trống phía trước và một dòng trống phía sau.
   * Ghi rõ dạng thành phần (Component form), dạng hiệu chỉnh sai số (Error-correction form) hoặc dạng rút gọn nếu có.
5. **Ví dụ tính tay chi tiết từng bước (Worked Numerical Examples):**
   * Cho bộ số liệu nhỏ, sạch, dễ nhẩm hoặc dễ bấm máy tính.
   * Viết rõ từng bước: Thế số $\to$ Phép tính trung gian $\to$ Kết quả làm tròn.
   * Nêu nhận xét về mặt trực quan để học viên hiểu ý nghĩa của con số vừa tính ra.
6. **Liên kết bài tập thực hành:**
   * Cuối bài luôn có link trỏ trực tiếp đến `bai_tap_tinh_toan.html` sử dụng giao thức `file:///` chuẩn URL Markdown.

### 3.2. Tiêu chuẩn định dạng KaTeX / Markdown
* **Công thức hiển thị (Display Math):** Luôn tách biệt trên dòng riêng, có dòng trống bao quanh:
  ```markdown
  $$
  l_t = \alpha y_t + (1 - \alpha)(l_{t-1} + b_{t-1})
  $$
  ```
* **Ký tự tiền tệ:** Khi viết giá tiền hay biểu tượng dollar trong văn bản prose, bắt buộc phải escape: `\$100`.
* **Đường dẫn tệp:** Dùng dấu gạch chéo xuôi (`/`), ví dụ: `[bai_tap.html](file:///d:/KnowledgeLibrary/HMTK/tutorial/...)`.

---

## 4. QUY CHUẨN THIẾT KẾ BÀI TẬP TƯƠNG TÁC (`bai_tap_tinh_toan.html`)

Tệp HTML là công cụ kiểm tra đánh giá năng lực tính toán và ghi nhớ kiến trúc. Giao diện sử dụng Dark Slate theme, KaTeX để hiển thị công thức sắc nét.

### 4.1. Nguyên tắc "Tập trung 100% vào tính toán & Tuyệt đối không show công thức"
> [!IMPORTANT]
> **Quy chuẩn đề bài trong HTML:**
> 1. **Bỏ phần điền công thức:** Không tạo các ô điền chữ/ký hiệu như `alpha`, `1-alpha`, `sigmoid` trong bài tập. Bài tập chỉ tập trung 100% vào việc **tính toán ra các con số cụ thể**.
> 2. **Không show công thức trong câu hỏi:** 
>    - Tuyệt đối **không in sẵn công thức toán** hoặc **công thức đã thế số** trong phần câu hỏi / nhãn input.
>    - Chỉ cung cấp dữ liệu quan sát ($y_t$) và bộ tham số siêu cấp ($\alpha, \beta, W, b, c$).
>    - Người học bắt buộc phải tự nhớ công thức trong đầu (đã học từ `ly_thuyet.md`) để tự áp dụng và bấm máy tính.
> 3. **Sơ đồ kiến trúc không lộ công thức:**
>    - Sơ đồ kiến trúc (Architecture Diagram) ở đầu trang HTML chỉ thể hiện tên khái niệm và luồng dữ liệu (ví dụ: *Quan sát mới $\to$ Cập nhật Level $\to$ Cập nhật Trend $\to$ Phóng chiếu dự báo*), tuyệt đối không ghi công thức toán chi tiết bên trong các node để tránh làm lộ công thức làm bài.

### 4.2. Cấu trúc câu hỏi tính toán chuẩn
Mỗi câu hỏi chỉ nêu yêu cầu tính toán và ô nhập số:
```html
<div class="calc-step">
    <div class="step-desc">1. Tính giá trị trung bình trượt trung tâm $\text{CMA}_3$ tại Quý 3 (chu kỳ $m=4$)</div>
    <div class="input-row">
        <span class="input-label">$\text{CMA}_3 = $</span>
        <input type="text" class="blank-input" data-ans="65.25" data-tol="0.05" placeholder="Nhập số...">
    </div>
</div>
```

### 4.3. Hộp giải thích & Lời giải chi tiết (Solution Box)
* Mỗi bài tập (`card`) có một nút *"Xem giải thích bản chất & lời giải"*.
* Mặc định được ẩn đi (`display: none`). Chỉ khi học viên bấm nút thì mới mở ra để xem:
  * Công thức gốc áp dụng.
  * Từng bước thế số và kết quả làm tròn chi tiết.
  * Nhận xét bản chất để đối chiếu tư duy.

### 4.4. Quy tắc cấm kỵ về KaTeX và Thẻ Input trong HTML
> [!CAUTION]
> **TUYỆT ĐỐI KHÔNG ĐƯỢC NHÚNG THẺ `<input>` BÊN TRONG KHỐI KaTeX (`$$...$$` hoặc `$..$`)!**
> Trình phân tích cú pháp của KaTeX sẽ coi thẻ HTML là chuỗi văn bản không hợp lệ hoặc render lỗi khiến ô input biến mất khỏi cây DOM.

Luôn tách biệt:
* Thẻ văn bản / công thức toán hiển thị riêng (`<div class="step-desc">...</div>` hoặc `<span class="input-label">$l_1 = $</span>`).
* Thẻ nhập liệu nằm riêng lẻ (`<input type="text" class="blank-input" ...>`).

### 4.5. Thiết lập dung sai số học (`data-tol`)
Mọi ô nhập kết quả tính toán số thực phải có thuộc tính `data-tol` (thường là `0.05`, `0.02` hoặc `0.01` tùy độ dài chữ số thập phân) để học viên không bị trừ điểm oan do làm tròn số học trung gian.

---

## 5. BẢNG KIỂM TRA ĐÁNH GIÁ (QUALITY CHECKLIST CHO CHUYÊN ĐỀ MỚI)

Trước khi nghiệm thu và commit bất kỳ chuyên đề mới nào lên hệ thống, bắt buộc phải tick kiểm tra đầy đủ các tiêu chí sau:

| STT | Hạng mục kiểm tra | Tiêu chuẩn đạt |
|:---:|:---|:---|
| 1 | **Cấu trúc thư mục** | Có đủ đúng 2 tệp `ly_thuyet.md` và `bai_tap_tinh_toan.html` trong thư mục `XX_...`. |
| 2 | **Sơ đồ kiến trúc HTML** | Có sơ đồ luồng dữ liệu khái niệm ở đầu trang, **không lộ công thức toán trong các node**. |
| 3 | **Không show công thức đề bài** | Toàn bộ câu hỏi trong HTML chỉ nêu yêu cầu và dữ liệu thô, **không in sẵn công thức**. |
| 4 | **Tập trung tính toán số liệu** | 100% câu hỏi yêu cầu người học tự tính ra con số cụ thể qua các bước trung gian. |
| 5 | **Đồng bộ lý thuyết** | Mọi bước tính và khái niệm trong HTML đều có mục giải thích và ví dụ tính tay tương ứng trong `ly_thuyet.md`. |
| 6 | **Tách biệt KaTeX / Input** | Không có bất kỳ thẻ `<input>` nào nằm trong dấu `$` hay `$$`. |
| 7 | **Dung sai số học** | Mọi ô nhập số đều có `data-tol` (ví dụ `0.05` hoặc `0.01`). |
| 8 | **Định dạng Markdown** | Các khối `$$...$$` trong `ly_thuyet.md` có dòng trống bao quanh, ký hiệu `\$` được escape đúng. |
| 9 | **Kiểm thử giao diện** | Mở tệp HTML trên trình duyệt, KaTeX render đẹp, nút xem lời giải đóng/mở mượt mà, chấm điểm chính xác. |
| 10 | **Cập nhật Roadmap** | Đã cập nhật mục lục và liên kết chuyên đề mới vào `HMTK/tutorial/README.md`. |
