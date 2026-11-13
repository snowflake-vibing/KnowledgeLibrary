# QUY CHUẨN XÂY DỰNG CHUYÊN ĐỀ HỌC TẬP & BÀI TẬP HMTK (DS102)
## Standard Operating Procedure (SOP) for Statistical Machine Learning & Regression Tutorials

> **Mục tiêu tối thượng:** Giúp người học không chỉ đọc lý thuyết trừu tượng hay bấm máy tính dựa trên công thức có sẵn, mà phải **hiểu bản chất cơ chế toán học (Mechanism & Matrix Inversion)**, **tự nhớ công thức trong đầu (Active Recall from Theory)** và **tự tay thực hiện toàn bộ các phép tính ma trận & kiểm định thống kê cụ thể (Hands-on Computation)**.

---

## 1. CẤU TRÚC THƯ MỤC BẮT BUỘC (MODULE STRUCTURE)

Mỗi chuyên đề nằm trong một thư mục riêng biệt được đánh số thứ tự: `HMTK/tutorial/XX_ten_chuyen_de/` (ví dụ `01_hoi_quy_tuyen_tinh_va_phuong_phap_lsm/`, `02_danh_gia_kiem_dinh_mo_hinh_anova_va_r2/`, `03_hoi_quy_quy_tac_hoa_ridge_lasso_elastic_net/`).

Mỗi chuyên đề **BẮT BUỘC GỒM ĐÚNG 2 TẬP TIN CỐT LÕI**:

```text
HMTK/tutorial/XX_ten_chuyen_de/
├── ly_thuyet.md            # Tài liệu lý thuyết, kiến trúc, nguồn gốc đại số ma trận & ví dụ tính tay chi tiết
└── bai_tap_tinh_toan.html   # Web app tương tác kiểm tra kiến trúc & tự tay tính toán số liệu
```

---

## 2. NGUYÊN TẮC "100% ĐỒNG BỘ VÀ KHÔNG RỖNG RANH GIỚI"

> [!IMPORTANT]
> **Quy tắc bất biến:** *"Bất kỳ bài toán, ma trận trung gian (như ma trận thiết kế $X$, $X^T X$, định thức $\det$, ma trận nghịch đảo, tổng bình phương sai số $TSS, ESS, RSS$, thống kê kiểm định $F, t$, chuẩn phạt $L_1, L_2$) nào xuất hiện trong bài tập HTML thì BẮT BUỘC PHẢI ĐƯỢC DẠY VÀ GIẢI THÍCH TƯỜNG MINH trong file lý thuyết Markdown."*

- Không được phép đưa ra một bài tập trong HTML với các đại lượng hoặc công thức mà trong `ly_thuyet.md` không đề cập hoặc chỉ lướt qua.
- Các ký hiệu (ví dụ: $X, y, \theta, \hat{y}, e_i, TSS, ESS, RSS, R^2, \bar{R}^2, MS_{REG}, MS_{ERR}, F, t, \alpha, \|\theta\|_1, \|\theta\|_2^2$) phải có định nghĩa, đơn vị và ý nghĩa thống kê đồng nhất giữa hai tệp.
- Các con số và bước tính toán trong bài tập HTML phải có bài toán mẫu tương ứng trong mục *Ví dụ tính toán chi tiết bằng số (Step-by-Step Numerical Example)* của `ly_thuyet.md`.

---

## 3. QUY CHUẨN SOẠN THẢO TỆP LÝ THUYẾT (`ly_thuyet.md`)

Mỗi tệp `ly_thuyet.md` là cuốn tài liệu tự học toàn diện:

1. **Tiêu đề & Khái niệm cốt lõi:** Nêu rõ bối cảnh, giả định thống kê (Gauss-Markov, phân phối chuẩn của sai số, v.v.).
2. **Sơ đồ Kiến trúc & Luồng Xử Lý (Mermaid Diagram):**
   - Sử dụng biểu đồ `flowchart LR` hoặc `flowchart TD`.
   - Mô tả trực quan luồng tính toán từ dữ liệu quan sát thô $\to$ ma trận thiết kế $\to$ tích vô hướng ma trận $\to$ nghịch đảo $\to$ dự báo & kiểm định.
3. **Bản chất cơ chế & Nguồn gốc giải tích:**
   - Chứng minh nguồn gốc công thức (đạo hàm hàm mất mát $J(\theta)$ theo $\theta$ bằng 0).
   - Phân tích trực quan hình học (ví dụ: hình chiếu trực giao của véc-tơ $y$ lên không gian cột của $X$; vùng giới hạn hình thoi của L1 vs hình tròn của L2).
4. **Hệ thống công thức toán học chi tiết:**
   - Trình bày dạng hiển thị độc lập: đặt giữa `$$ ... $$` với một dòng trống phía trước và một dòng trống phía sau.
5. **Ví dụ tính tay chi tiết từng bước:**
   - Bộ số liệu mẫu rõ ràng, tính từng ma trận thành phần, định thức, nghịch đảo đến kết quả cuối.
6. **Liên kết bài tập thực hành:**
   - Cuối bài luôn có link trỏ trực tiếp đến `bai_tap_tinh_toan.html` bằng giao thức `file:///`.

---

## 4. QUY CHUẨN THIẾT KẾ BÀI TẬP TƯƠNG TÁC (`bai_tap_tinh_toan.html`)

Tệp HTML là công cụ kiểm tra đánh giá năng lực tính toán và ghi nhớ kiến trúc.

### 4.1. Nguyên tắc "Tập trung 100% vào tính toán & Tuyệt đối không show công thức"
> [!IMPORTANT]
> **Quy chuẩn đề bài trong HTML:**
> 1. **Bỏ phần điền công thức:** Không tạo các ô điền chữ/ký hiệu trừu tượng. Bài tập chỉ tập trung 100% vào việc **tự tính toán ra các con số cụ thể**.
> 2. **Không show công thức trong câu hỏi:** 
>    - Tuyệt đối **không in sẵn công thức toán** hoặc **công thức đã thế số** trong phần câu hỏi / nhãn input (ví dụ: dùng `$MS_{REG} = $`, không dùng `$MS_{REG} = 380 / 4 = $`).
>    - Chỉ cung cấp ma trận đầu vào, số liệu thô hoặc bảng thống kê cơ sở.
>    - Người học bắt buộc phải tự nhớ công thức trong đầu để tự áp dụng và bấm máy tính.
> 3. **Sơ đồ kiến trúc không lộ công thức:**
>    - Sơ đồ kiến trúc ở đầu trang HTML chỉ thể hiện tên khái niệm và luồng dữ liệu, tuyệt đối không ghi công thức giải tích bên trong các node.

### 4.2. Cấu trúc câu hỏi tính toán chuẩn
Mỗi câu hỏi chỉ nêu yêu cầu tính toán và ô nhập số:
```html
<div class="question-row">
  <span>1.1. Định thức của ma trận $X^T X$ là: $\det(X^T X) = $</span>
  <input type="text" class="fill-input" data-ans="16" data-tol="0.05" placeholder="Kết quả">
</div>
```

### 4.3. Hộp giải thích & Lời giải chi tiết (Solution Box)
- Mỗi bài tập có phần `<details><summary>Xem hướng dẫn và đáp án chi tiết...</summary>...</details>`.
- Mặc định đóng lại; khi học viên mở ra sẽ hiển thị đầy đủ công thức, từng bước thế số và kết quả làm tròn.

### 4.4. Quy tắc cấm kỵ về KaTeX và Thẻ Input trong HTML
> [!CAUTION]
> **TUYỆT ĐỐI KHÔNG ĐƯỢC NHÚNG THẺ `<input>` BÊN TRONG KHỐI KaTeX (`$$...$$` hoặc `$..$`)!**
> Luôn đặt thẻ `<input>` bên ngoài các thẻ KaTeX.

### 4.5. Dung sai số học & Chuẩn hóa dữ liệu đầu vào
- Mọi ô nhập kết quả tính toán số thực phải có thuộc tính `data-tol` (thường là `0.05`, `0.02` hoặc `0.01`).
- Hàm JavaScript `normalizeInput(val)` xử lý thay thế dấu phẩy `,` thành dấu chấm `.` và loại bỏ khoảng trắng thừa.

---

## 5. BẢNG KIỂM TRA ĐÁNH GIÁ (QUALITY CHECKLIST)

| STT | Hạng mục kiểm tra | Tiêu chuẩn đạt |
|:---:|:---|:---|
| 1 | **Cấu trúc thư mục** | Có đủ đúng 2 tệp `ly_thuyet.md` và `bai_tap_tinh_toan.html` trong thư mục `XX_...`. |
| 2 | **Sơ đồ kiến trúc HTML** | Có sơ đồ luồng dữ liệu ở đầu trang, **không lộ công thức toán trong các node**. |
| 3 | **Không show công thức đề bài** | Toàn bộ câu hỏi trong HTML chỉ nêu yêu cầu và dữ liệu thô, **không in sẵn công thức**. |
| 4 | **Tập trung tính toán số liệu** | 100% câu hỏi yêu cầu người học tự tính ra con số cụ thể qua các bước trung gian. |
| 5 | **Đồng bộ lý thuyết** | Mọi bước tính và khái niệm trong HTML đều có mục giải thích và ví dụ tính tay tương ứng trong `ly_thuyet.md`. |
| 6 | **Tách biệt KaTeX / Input** | Không có bất kỳ thẻ `<input>` nào nằm trong dấu `$` hay `$$`. |
| 7 | **Dung sai số học** | Mọi ô nhập số đều có `data-tol` (ví dụ `0.05` hoặc `0.02`). |
| 8 | **Định dạng Markdown** | Các khối `$$...$$` trong `ly_thuyet.md` có dòng trống bao quanh, ký hiệu `\$` được escape đúng. |
| 9 | **Kiểm thử giao diện** | Tệp HTML mở mượt mà, KaTeX render chuẩn, chấm điểm chính xác. |
| 10 | **Cập nhật Roadmap** | Đã cập nhật mục lục và liên kết chuyên đề mới vào `HMTK/tutorial/README.md`. |
