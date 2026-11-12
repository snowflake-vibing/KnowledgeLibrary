# QUY CHUẨN XÂY DỰNG CHUYÊN ĐỀ HỌC TẬP & BÀI TẬP DỰ BÁO
## Standard Operating Procedure (SOP) for Time-Series Forecasting & ML Tutorials

> **Mục tiêu tối thượng:** Giúp người học không chỉ đọc lý thuyết trừu tượng hay bấm máy tính đơn thuần, mà phải **hiểu bản chất cơ chế (Mechanism & Architecture)**, **chủ động nhớ công thức (Active Recall)** và **tự tay tính toán ra các con số cụ thể (Step-by-step Computation)**.

---

## 1. CẤU TRÚC THƯ MỤC BẮT BUỘC (MODULE STRUCTURE)

Mỗi chuyên đề nằm trong một thư mục riêng biệt được đánh số thứ tự: `HMTK/tutorial/XX_ten_chuyen_de/` (ví dụ `01_...`, `06_...`).
Mỗi chuyên đề **BẮT BUỘC CHỈ GỒM ĐÚNG 2 TẬP TIN CỐT LÕI**:

```text
HMTK/tutorial/XX_ten_chuyen_de/
├── ly_thuyet.md            # Tài liệu lý thuyết, kiến trúc, nguồn gốc toán học & ví dụ tính tay
└── bai_tap_tinh_toan.html   # Web app tương tác điền khuyết nhớ công thức & tự tính toán số liệu
```

---

## 2. NGUYÊN TẮC "100% ĐỒNG BỘ VÀ KHÔNG RỖNG RANH GIỚI"

> [!IMPORTANT]
> **Quy tắc bất biến:** *"Bất kỳ nội dung, sơ đồ, biến số, logit tuyến tính hay bước tính nào xuất hiện trong bài tập HTML thì BẮT BUỘC PHẢI ĐƯỢC GIẢI THÍCH TƯỜNG MINH trong file lý thuyết Markdown."*

* Không được phép đưa ra một bài tập trong HTML với các khái niệm hoặc công thức mà trong `ly_thuyet.md` không đề cập hoặc chỉ lướt qua.
* Các ký hiệu (ví dụ: $l_t, b_t, s_t, w_t, \nabla, z_f, z_i, z_c, z_o, \sigma, \tanh, e_t, \text{RM}_k$) phải có định nghĩa, đơn vị và ý nghĩa vật lý đồng nhất giữa hai tệp.
* Các con số và bước tính toán trong bài tập HTML phải có bài toán mẫu tương ứng trong mục *Ví dụ tính tay chi tiết (Worked Numerical Example)* của `ly_thuyet.md`.

---

## 3. QUY CHUẨN SOẠN THẢO TỆP LÝ THUYẾT (`ly_thuyet.md`)

Mỗi tệp `ly_thuyet.md` phải tuân theo khung sườn chuẩn sau:

### 3.1. Cấu trúc tiêu chuẩn của `ly_thuyet.md`
1. **Tiêu đề & Tổng quan chuyên đề:** Nêu rõ bối cảnh, bài toán thực tế giải quyết.
2. **Sơ đồ Kiến trúc & Luồng Forward Pass (Mermaid Diagram):**
   * Sử dụng biểu đồ `flowchart LR` hoặc `flowchart TD`.
   * Mô tả đường đi của dữ liệu từ quan sát gốc $\to$ qua các tầng xử lý/bộ nhớ trạng thái $\to$ tính toán đầu ra $\to$ cơ chế hồi tiếp (recursive feedback) hoặc tích hợp phục hồi (undifferencing).
3. **Bản chất cơ chế & Khái niệm cốt lõi:**
   * Không chỉ liệt kê công thức mà phải giải thích *tại sao lại làm như vậy* (ví dụ: tại sao dùng hàm $\sigma$ cho cổng nhưng dùng $\tanh$ cho ô nhớ; tại sao đường cao tốc ô nhớ giải quyết triệt tiêu đạo hàm; tại sao phải lấy sai phân; tại sao cần mã hóa $\sin/\cos$ trên vòng tròn đơn vị).
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

Tệp HTML là công cụ tương tác cốt lõi. Giao diện sử dụng Dark Slate theme, nhúng thư viện KaTeX để hiển thị công thức sắc nét.

### 4.1. Cấu trúc bài tập: Bắt buộc tách làm 2 phần rõ rệt

Mỗi dạng bài toán trong thẻ `<div class="card">` bắt buộc chia làm 2 phân mục:

#### Phần A: Điền khuyết nhớ công thức (Active Formula Recall)
* **Mục đích:** Bắt buộc người học phải kích hoạt trí nhớ chủ động để nhớ tên tham số, ký hiệu toán học hoặc hàm kích hoạt, **chấm dứt tình trạng chỉ nhìn công thức có sẵn rồi bấm máy tính**.
* **Cách thiết kế:**
  * Che đi một thành phần cốt lõi trong công thức bằng `[ ... ]`.
  * Yêu cầu người học gõ vào ô text input giá trị biểu tượng (ví dụ: `alpha`, `1 - alpha`, `e_t`, `phi_1`, `1 - phi_1^2`, `sigmoid`, `tanh`, `*`, `+`).
  * Có nhãn gợi ý kiểu nhập văn bản bình thường (ví dụ: *Gõ: alpha hoặc α*).

#### Phần B: Tự tay tính toán con số (Step-by-step Numerical Computation)
* **Mục đích:** Rèn luyện khả năng tự triển khai công thức vào dữ liệu số.
* **Cách thiết kế:**
  * Chỉ cung cấp dữ liệu đầu vào ($y_t$) và bộ tham số siêu cấp ($\alpha, \beta, W, b$).
  * **TUYỆT ĐỐI KHÔNG ghi sẵn công thức đã thế số**.
  * Chia nhỏ bài toán thành từng bước tính trung gian (ví dụ: Bước 1 tính sai số $e_2 \to$ Bước 2 tính mức nền $l_2 \to$ Bước 3 tính dự báo $\hat{y}_3$).
  * Thiết lập ngưỡng dung sai (`data-tol="0.05"` hoặc `data-tol="0.01"`) để học viên không bị chấm sai do làm tròn số học.

### 4.2. Quy tắc cấm kỵ về KaTeX và Thẻ Input trong HTML
> [!CAUTION]
> **TUYỆT ĐỐI KHÔNG ĐƯỢC NHÚNG THẺ `<input>` BÊN TRONG KHỐI KaTeX (`$$...$$` hoặc `$..$`)!**
> Trình phân tích cú pháp của KaTeX sẽ coi thẻ HTML là chuỗi văn bản không hợp lệ hoặc render lỗi khiến ô input biến mất khỏi cây DOM.

**Cách viết đúng chuẩn:**
```html
<!-- KHỐI 1: HIỂN THỊ CÔNG THỨC TOÁN BẰNG KATEX -->
<div class="step-desc">
    1. Điền trọng số gán cho quan sát thực tế $y_t$ trong phương trình: 
    $\hat{y}_{t+1} = [ \dots ] y_t + (1-\alpha)\hat{y}_t$
</div>

<!-- KHỐI 2: HÀNG NHẬP LIỆU RIÊNG BIỆT BÊN DƯỚI -->
<div class="input-row">
    <span class="input-label">Trọng số của $y_t$ là hệ số nào:</span>
    <input type="text" class="blank-input" data-ans="alpha" data-alt="α, a" placeholder="Ví dụ: alpha">
    <span class="hint-text">(Gõ: alpha hoặc α)</span>
</div>
```

### 4.3. Bộ chuẩn hóa đầu vào Javascript (`normalizeInput`)
Học viên có thể gõ bằng nhiều cách khác nhau (chữ thường, chữ hoa, có dấu cách, dùng dấu chấm hay phẩy, gõ chữ Hy Lạp hoặc chữ phiên âm). Hàm xử lý Javascript phải hỗ trợ chuẩn hóa:

```javascript
function normalizeInput(val) {
    return val.trim().toLowerCase()
        .replace(/\s+/g, '')              // Bỏ khoảng trắng
        .replace(/,/g, '.')               // Chuẩn hóa dấu phẩy thành dấu chấm
        .replace(/alpha/g, 'α')
        .replace(/beta/g, 'β')
        .replace(/gamma/g, 'γ')
        .replace(/sigma/g, 'σ')
        .replace(/phi/g, 'ϕ')
        .replace(/theta/g, 'θ')
        .replace(/nhan/g, '*')
        .replace(/x/g, '*')
        .replace(/_/g, '')                // Cho phép gõ e_t hoặc et
        .replace(/\{|\}/g, '');           // Bỏ ngoặc nhọn LaTeX nếu có
}
```

---

## 5. BẢNG KIỂM TRA ĐÁNH GIÁ (QUALITY CHECKLIST CHO CHUYÊN ĐỀ MỚI)

Trước khi nghiệm thu và commit bất kỳ chuyên đề mới nào lên hệ thống, bắt buộc phải tick kiểm tra đầy đủ các tiêu chí sau:

| STT | Hạng mục kiểm tra | Tiêu chuẩn đạt |
|:---:|:---|:---|
| 1 | **Cấu trúc thư mục** | Có đủ đúng 2 tệp `ly_thuyet.md` và `bai_tap_tinh_toan.html` trong thư mục `XX_...`. |
| 2 | **Sơ đồ kiến trúc** | Có sơ đồ Mermaid trong `ly_thuyet.md` và flow diagram trong `bai_tap_tinh_toan.html`. |
| 3 | **Đồng bộ nội dung** | 100% câu hỏi trong HTML có lý thuyết tương ứng giải thích trong markdown. |
| 4 | **Phần A (Nhớ công thức)** | Đã che biến/toán tử/hàm kích hoạt cốt lõi, người học nhập chữ bình thường. |
| 5 | **Phần B (Tính toán số)** | Người học tự tay tính từ dữ liệu thô, không in sẵn công thức thế số. |
| 6 | **Tách biệt KaTeX / Input** | Không có bất kỳ thẻ `<input>` nào nằm trong dấu `$` hay `$$`. |
| 7 | **Dung sai số học** | Mọi ô nhập số đều có `data-tol` (thường là `0.05` hoặc `0.01`). |
| 8 | **Định dạng Markdown** | Các khối `$$...$$` có dòng trống bao quanh, ký hiệu `\$` được escape đúng. |
| 9 | **Kiểm thử giao diện** | Mở tệp HTML trên trình duyệt, KaTeX render đẹp, bấm Enter hoặc nút kiểm tra chấm điểm chính xác. |
| 10 | **Cập nhật Roadmap** | Đã cập nhật mục lục và liên kết chuyên đề mới vào `HMTK/tutorial/README.md`. |
