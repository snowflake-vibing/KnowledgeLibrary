# Giải thích Chi tiết: Hàm Mục tiêu Soft Margin SVM (Primal Form)

> **Tài liệu tham chiếu:** [Chương 6: Máy học và Bài toán Dự báo (P1)](../Chuong_6_Hoc_may_va_bai_toan_du_bao_P1.md)  
> **Chủ đề:** Hiểu sâu bản chất toán học, hình học và ứng dụng thực tế của bài toán tối ưu Soft Margin Support Vector Machine.

---

## 1. Công thức Hàm mục tiêu

Trong bài toán Soft Margin SVM dạng nguyên thủy (*Primal Form*), hàm mục tiêu tối ưu được viết dưới dạng:

$$
\min_{\mathbf{w}, b, \boldsymbol{\xi}} \left( \frac{1}{2}\|\mathbf{w}\|^2 + C \sum_{i=1}^N \xi_i \right)
$$

thỏa mãn hệ ràng buộc:

$$
y_i(\mathbf{w}^T \mathbf{x}_i + b) \ge 1 - \xi_i, \quad \xi_i \ge 0 \quad (\forall i = 1, 2, \dots, N)
$$

---

## 2. Vì sao cần hàm này? (Nguồn gốc bài toán)

### 2.1. Vấn đề của Hard Margin (SVM thuần túy)
Trong Hard Margin SVM, ta bắt buộc **toàn bộ mọi điểm dữ liệu** phải được phân loại đúng $100\%$ và nằm ngoài vùng lề an toàn:

$$
y_i(\mathbf{w}^T \mathbf{x}_i + b) \ge 1, \quad \forall i = 1, \dots, N
$$

Điều này dẫn đến 2 thảm họa trong thực tế:
1. **Dữ liệu thực tế luôn có nhiễu (Noise / Outliers):** Chỉ cần duy nhất 1 điểm dữ liệu bị gán nhãn nhầm hoặc nằm chệch sang phần sân đối phương, bài toán Hard Margin sẽ **vô nghiệm hoàn toàn** (không tồn tại siêu phẳng nào thỏa mãn).
2. **Hiện tượng Quá khớp (Overfitting):** Để cố gắng né một vài điểm dị biệt, siêu phẳng bị ép phải xoay theo hướng kỳ quặc, khiến lề (*Margin*) bị thu hẹp lại cực nhỏ $\implies$ Mô hình dự đoán rất tệ trên dữ liệu mới.

<div align="center">
  <img src="../images/soft_margin_need.png" alt="Sự cần thiết của Soft Margin" width="85%">
  <p><em>Hình 1: Khi dữ liệu có nhiễu (a) hoặc gần như phân tách tuyến tính (b), Hard Margin thất bại hoặc tạo ra biên quá hẹp.</em></p>
</div>

---

## 3. Mổ xẻ từng thành phần trong công thức

Hàm mục tiêu là một bài toán **tối ưu hóa đa mục tiêu** gồm hai phần mâu thuẫn được kết nối bởi hệ số $C$:

$$
\min \Big( \underbrace{\frac{1}{2}\|\mathbf{w}\|^2}_{\text{Phần 1: Mở rộng Lề}} + \underbrace{C \sum_{i=1}^N \xi_i}_{\text{Phần 2: Phạt sai số}} \Big)
$$

---

### 3.1. Thành phần 1: $\frac{1}{2}\|\mathbf{w}\|^2$ (Cực đại hóa Lề Margin)

- **Lề Margin là gì?** Khoảng cách từ siêu phẳng $\mathbf{w}^T \mathbf{x} + b = 0$ đến các điểm biên an toàn là $\frac{1}{\|\mathbf{w}\|}$.
- **Mục tiêu:** Ta muốn lề này **càng rộng càng tốt** (để mô hình có tính tổng quát hóa cao, không bị bó sát vào dữ liệu học).

$$
\max \left(\frac{1}{\|\mathbf{w}\|}\right) \iff \min \|\mathbf{w}\| \iff \min \frac{1}{2}\|\mathbf{w}\|^2
$$

> [!NOTE]
> **Tại sao lại có hệ số $\frac{1}{2}$ và bình phương $\|\mathbf{w}\|^2$?**
> - Hàm $\|\mathbf{w}\| = \sqrt{w_1^2 + \dots + w_d^2}$ chứa căn bậc hai, đạo hàm tại gốc tọa độ không trơn và tính toán phức tạp.
> - Hàm $\frac{1}{2}\|\mathbf{w}\|^2 = \frac{1}{2}(w_1^2 + \dots + w_d^2)$ là hàm lồi mượt mà (*Convex, Quadratic*).
> - Khi lấy đạo hàm: $\frac{\partial}{\partial \mathbf{w}} \left(\frac{1}{2}\|\mathbf{w}\|^2\right) = \mathbf{w}$, số $2$ và $\frac{1}{2}$ triệt tiêu lẫn nhau, làm cho các bước giải Lagrangian / KKT cực kỳ gọn gàng.

---

### 3.2. Thành phần 2: Biến độ chùng $\xi_i$ (Slack Variable)

Ký hiệu $\xi_i$ (đọc là *Xi*) đo lường **mức độ vi phạm** của điểm dữ liệu $\mathbf{x}_i$ đối với đường biên an toàn:

$$
\xi_i = \max\left(0, \, 1 - y_i(\mathbf{w}^T \mathbf{x}_i + b)\right)
$$

Đây chính là hàm mất mát bản lề (**Hinge Loss**). Có 3 kịch bản xảy ra cho một điểm $\mathbf{x}_i$:

<div align="center">
  <img src="../images/svm_slack_variable.png" alt="Phân loại các điểm theo biến độ chùng xi" width="75%">
  <p><em>Hình 2: Ý nghĩa hình học của biến độ chùng $\xi_i$ đối với vị trí các điểm dữ liệu.</em></p>
</div>

| Vị trí của điểm $\mathbf{x}_i$ | Giá trị $\xi_i$ | Trạng thái phân loại | Mức phạt |
| :--- | :--- | :--- | :--- |
| **Nằm ngoài lề an toàn** ($y_i(\mathbf{w}^T \mathbf{x}_i + b) \ge 1$) | $\xi_i = 0$ | Phân loại đúng tuyệt đối, an toàn | Không phạt ($0$) |
| **Nằm trong vùng lề** ($0 \le y_i(\mathbf{w}^T \mathbf{x}_i + b) < 1$) | $0 < \xi_i \le 1$ | Phân loại đúng nhưng lấn vào lề an toàn | Phạt nhẹ bằng khoảng cách vi phạm $\xi_i$ |
| **Nằm sai phía siêu phẳng** ($y_i(\mathbf{w}^T \mathbf{x}_i + b) < 0$) | $\xi_i > 1$ | **Phân loại SAI** | Phạt nặng ($\xi_i > 1$) |

---

### 3.3. Thành phần 3: Tổng vi phạm $\sum_{i=1}^N \xi_i$

- Là tổng toàn bộ sai số / mức độ vi phạm của tất cả $N$ điểm trong tập dữ liệu.
- Cực tiểu hóa $\sum \xi_i$ đồng nghĩa với việc ta yêu cầu: *"Hãy tìm siêu phẳng sao cho tổng mức độ vi phạm của các điểm là ít nhất"*.

---

### 3.4. Hệ số phạt $C$ – Người cầm cân nảy mực

$C > 0$ là một siêu tham số (*Hyperparameter*) đóng vai trò là hệ số quy đổi giữa hai mong muốn đối nghịch nhau:

1. **Mong muốn 1 (Ưu tiên lề rộng):** Thu nhỏ $\|\mathbf{w}\|$ để Margin to ra.
2. **Mong muốn 2 (Ưu tiên ít lỗi):** Thu nhỏ $\sum \xi_i$ để không có điểm nào bị phân loại sai.

```
       C NHỎ                                          C LỚN
<------------------------- [ Cân bằng ] ------------------------->
Ưu tiên: LỀ RỘNG                              Ưu tiên: ÍT SAI SỐ
Chấp nhận nhiều điểm lọt lề                   Phạt cực nặng mẫu vi phạm
Margin rộng, tổng quát hóa tốt                Margin hẹp, cố tách từng điểm
Nguy cơ: Underfitting                         Nguy cơ: Overfitting
```

> [!IMPORTANT]
> **Hai trường hợp cực đoan của $C$:**
> - Khi $C \to \infty$: Bất kỳ vi phạm $\xi_i > 0$ nào cũng khiến hàm mục tiêu bùng nổ vô cùng lớn. Do đó, mô hình bị ép buộc $\xi_i = 0$ với mọi $i$, tức là quay trở lại chính xác mô hình **Hard Margin**.
> - Khi $C \to 0$: Thành phần phạt biến mất, mô hình chỉ tìm cách làm cho $\|\mathbf{w}\| \to 0$ (Margin to vô hạn), bỏ mặc các điểm dữ liệu bị phân loại đúng hay sai.

---

## 4. Ví dụ Tính toán Cụ thể bằng Số

Giả sử ta đã tìm được siêu phẳng với phương trình: $2x_1 + 2x_2 - 1 = 0$ (tức $\mathbf{w} = (2, 2)^T, b = -1$).  
Biên an toàn lớp $+1$ là: $2x_1 + 2x_2 - 1 = 1 \iff 2x_1 + 2x_2 = 2$.  
Biên an toàn lớp $-1$ là: $2x_1 + 2x_2 - 1 = -1 \iff 2x_1 + 2x_2 = 0$.

Hãy tính $\xi$ cho 3 điểm dữ liệu sau:

### Điểm A: $\mathbf{x}_A = (1, 1)^T$, nhãn $y_A = +1$
- Tính giá trị lề:
  $$y_A(\mathbf{w}^T \mathbf{x}_A + b) = (+1) \cdot (2(1) + 2(1) - 1) = 3$$
- Tính $\xi_A$:
  $$\xi_A = \max(0, 1 - 3) = \max(0, -2) = 0$$
- **Nhận xét:** $\xi_A = 0 \implies$ Điểm A nằm sâu trong vùng an toàn của lớp $+1$, hoàn hảo, không bị phạt.

---

### Điểm B: $\mathbf{x}_B = (0.3, 0.4)^T$, nhãn $y_B = +1$
- Tính giá trị lề:
  $$y_B(\mathbf{w}^T \mathbf{x}_B + b) = (+1) \cdot (2(0.3) + 2(0.4) - 1) = 0.6 + 0.8 - 1 = 0.4$$
- Tính $\xi_B$:
  $$\xi_B = \max(0, 1 - 0.4) = 0.6$$
- **Nhận xét:** $0 < \xi_B \le 1 \implies$ Điểm B vẫn có giá trị $+0.4 > 0$ (vẫn phân loại đúng lớp $+1$), nhưng đã bị lọt vào bên trong dải lề biên an toàn (giá trị $< 1$). Điểm B bị phạt một lượng $\xi_B = 0.6$.

---

### Điểm C: $\mathbf{x}_C = (0, 0)^T$, nhãn gán $y_C = +1$ (điểm nhiễu)
- Tính giá trị lề:
  $$y_C(\mathbf{w}^T \mathbf{x}_C + b) = (+1) \cdot (2(0) + 2(0) - 1) = -1$$
- Tính $\xi_C$:
  $$\xi_C = \max(0, 1 - (-1)) = 2$$
- **Nhận xét:** $\xi_C = 2 > 1 \implies$ Giá trị âm ($-1 < 0$), nghĩa là điểm C đã nhảy sang phần sân của lớp đối nghịch. Điểm C bị phân loại sai hoàn toàn và bị phạt nặng $\xi_C = 2$.

---

## 5. Tóm tắt Bản chất Cốt lõi

| Thành phần | Tên gọi | Bản chất toán học / thực tế |
| :---: | :---: | :--- |
| $\min_{\mathbf{w}, b, \boldsymbol{\xi}}$ | Toán tử tối ưu | Tìm bộ tham số tối ưu gồm vector pháp tuyến $\mathbf{w}$, độ chệch $b$, và các mức vi phạm $\boldsymbol{\xi}$. |
| $\frac{1}{2}\|\mathbf{w}\|^2$ | Regularization Term | Kéo độ dài vector $\mathbf{w}$ nhỏ lại $\iff$ Mở rộng độ rộng lề Margin $\iff$ Giúp mô hình đơn giản, chống học vẹt (Overfitting). |
| $\xi_i$ | Slack Variable | Độ vi phạm lề của từng điểm; $\xi_i = 0$ nếu an toàn, $\xi_i \in (0, 1]$ nếu lấn lề, $\xi_i > 1$ nếu đoán sai. |
| $\sum_{i=1}^N \xi_i$ | Total Violation | Tổng lượng sai lệch của toàn bộ tập dữ liệu cần được đè nén xuống mức nhỏ nhất. |
| $C$ | Penalty Factor | Hệ số đánh đổi: $C$ cao ép mô hình phân loại chuẩn xác từng điểm (dễ quá khớp), $C$ thấp ưu tiên lề rộng bao dung lỗi (dễ dưới khớp). |
