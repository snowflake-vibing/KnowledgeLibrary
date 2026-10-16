# 3. Thuật toán Gradient giảm (Gradient Descent)

[⬅ Trước: Hồi quy tuyến tính quy tắc hóa](02_hoi_quy_quy_tac_hoa_ridge_lasso_elastic_net.md) · [Mục lục](README.md) · [Tiếp: Hồi quy Logistic ➡](04_hoi_quy_logistic.md)

---

## 3.1. Nhắc lại về giải tích nhiều biến

### 3.1.1. Hàm nhiều biến, Đạo hàm riêng và Véc-tơ Gradient
- **Định nghĩa hàm $n$ biến:** Hàm số $n$ biến số có tập xác định $D \subset \mathbb{R}^n$ là ánh xạ:
  $$\begin{aligned}
  f : D &\to \mathbb{R} \\
  \mathbf{x} &\mapsto f(\mathbf{x}), \quad \mathbf{x} = (x_1, x_2, \dots, x_n)
  \end{aligned} \qquad (1)$$
- **Đạo hàm riêng:** Đạo hàm của $f(\mathbf{x})$ theo biến $x_i$ (coi tất cả các biến khác như hằng số) được gọi là *đạo hàm riêng* của $f$ theo biến $x_i$, ký hiệu là $f'_{x_i}(\mathbf{x})$ hay $\dfrac{\partial}{\partial x_i}f(\mathbf{x})$.
- **Biểu thức vi phân của hàm hai biến $f(x_1, x_2)$:**
  - Vi phân cấp 1: $df(x_1, x_2) = f'_{x_1}dx_1 + f'_{x_2}dx_2$
  - Vi phân cấp 2: $d^2f(x_1, x_2) = f''_{x_1^2}dx_1^2 + 2f''_{x_1 x_2}dx_1 dx_2 + f''_{x_2^2}dx_2^2$
- **Véc-tơ Gradient** của hàm $n$ biến $f(\mathbf{x})$ được định nghĩa là véc-tơ chứa tất cả các đạo hàm riêng cấp 1:
  $$\nabla f(\mathbf{x}) = \left( f'_{x_1}, f'_{x_2}, \dots, f'_{x_n} \right) = \left( \frac{\partial f}{\partial x_1}, \frac{\partial f}{\partial x_2}, \dots, \frac{\partial f}{\partial x_n} \right) \qquad (2)$$

### 3.1.2. Bài toán cực trị tự do
Thuật toán giải tích cổ điển tìm cực trị tự do (cực đại hoặc cực tiểu địa phương) của hàm số $f(\mathbf{x})$:
1. Tìm tập xác định $D$.
2. Tính đạo hàm (gradient) và giải hệ phương trình $\nabla f(\mathbf{x}) = \mathbf{0}$ để tìm các **điểm dừng** $M$.
3. Tại mỗi điểm dừng $M$, xét dấu của vi phân cấp 2 $d^2 f(M)$ (hoặc ma trận Hessian):
   - Nếu $d^2 f(M) > 0$ ($\forall d\mathbf{x} \neq \mathbf{0}$) thì $M$ là **điểm cực tiểu địa phương**.
   - Nếu $d^2 f(M) < 0$ ($\forall d\mathbf{x} \neq \mathbf{0}$) thì $M$ là **điểm cực đại địa phương**.

**Nhận xét dấu của đạo hàm $f'(x)$ quanh điểm cực tiểu $x^*$ (hàm 1 biến):**
- Bên trái điểm cực tiểu ($x < x^*$): Đồ thị đi xuống nên đạo hàm âm ($f'(x) < 0$). Muốn tiến về $x^*$ cần **tăng** $x$.
- Bên phải điểm cực tiểu ($x > x^*$): Đồ thị đi lên nên đạo hàm dương ($f'(x) > 0$). Muốn tiến về $x^*$ cần **giảm** $x$.
- Như vậy, ở cả hai phía, chiều di chuyển về điểm cực tiểu luôn **ngược dấu với đạo hàm $f'(x)$**.

---

## 3.2. Thuật toán Gradient Descent (GD)

### 3.2.1. Động lực ra đời trong Machine Learning
Trong Machine Learning, ta thường xuyên phải tìm giá trị nhỏ nhất của hàm mất mát $J(\boldsymbol{\theta})$. Việc giải trực tiếp phương trình đạo hàm bằng $0$ thường gặp khó khăn lớn vì:
1. **Biểu thức hàm số phức tạp** (phi tuyến, có chứa hàm mũ, logarit, trị tuyệt đối...) nên không giải được phương trình $\nabla J(\boldsymbol{\theta}) = \mathbf{0}$ dưới dạng công thức tường minh.
2. **Số chiều của dữ liệu ($n$) rất lớn** khiến việc tính nghịch đảo ma trận $(\mathbf{X}^T\mathbf{X})^{-1}$ quá tốn kém.
3. **Quá nhiều điểm dữ liệu ($m$)** không thể nạp toàn bộ vào bộ nhớ RAM cùng lúc.

Do đó, người ta tiếp cận gần đúng: xuất phát từ một điểm khởi tạo $\mathbf{x}_0$, sau đó dùng phép lặp di chuyển từng bước **ngược chiều véc-tơ gradient** cho đến khi đạo hàm xấp xỉ bằng $0$.

### 3.2.2. Gradient Descent cho hàm một biến

**Thuật toán GD 1 biến:**
1. **Khởi tạo:** Chọn điểm bắt đầu $x \in D$.
2. **Chọn tốc độ học:** Chọn giá trị bước nhảy $\eta > 0$ ($\eta$ gọi là **độ học – learning rate**).
3. **Vòng lặp:** Khi điều kiện dừng chưa thỏa mãn, cập nhật điểm theo công thức:
   $$x \leftarrow x - \eta f'(x)$$
4. **Điều kiện dừng:** Có thể là đạt số vòng lặp tối đa (`max_iter`) ấn định trước, hoặc khi độ lớn của đạo hàm nhỏ hơn một ngưỡng dung sai $\varepsilon > 0$:
   $$|f'(x)| < \varepsilon$$

#### 📝 Bài tập thực hành & Tính tay 2 vòng lặp (Slide 10)
**Đề bài:** Cho hàm một biến $f(x) = x^2 + 4x + 3$.
- *Tại sao hàm đạt cực tiểu tại $x^* = -2$?*
  Ta có $f(x) = (x + 2)^2 - 1 \ge -1$, hoặc giải $f'(x) = 2x + 4 = 0 \Rightarrow x^* = -2$ và $f''(x) = 2 > 0$.
- **Chạy bằng "sức người" 2 vòng lặp:** Giả sử khởi tạo $x_0 = 0$ và chọn độ học $\eta = 0.2$:
  - **Vòng lặp 1:**
    - Đạo hàm tại $x_0 = 0$: $f'(x_0) = 2(0) + 4 = 4$.
    - Cập nhật: $x_1 = x_0 - \eta f'(x_0) = 0 - 0.2 \times 4 = -0.8$.
  - **Vòng lặp 2:**
    - Đạo hàm tại $x_1 = -0.8$: $f'(x_1) = 2(-0.8) + 4 = 2.4$.
    - Cập nhật: $x_2 = x_1 - \eta f'(x_1) = -0.8 - 0.2 \times 2.4 = -1.28$ (tiến dần về $x^* = -2$).

### 3.2.3. Tốc độ và độ chính xác của GD
Tốc độ hội tụ và độ chính xác của GD phụ thuộc chặt chẽ vào:

1. **Giá trị khởi tạo ban đầu:**
   - Nếu hàm mất mát **không lồi (non-convex)**, có nhiều cực tiểu địa phương (*local minimum*) hoặc vùng bằng phẳng (*plateau*), việc chọn điểm khởi tạo khác nhau có thể khiến thuật toán bị kẹt ở cực tiểu địa phương hoặc tốn rất nhiều thời gian để vượt qua vùng bằng phẳng.
2. **Cách chọn độ học $\eta$ (Learning rate):**
   - **Nếu $\eta$ quá nhỏ:** Thuật toán đi từng bước rất ngắn, mất rất nhiều vòng lặp mới hội tụ và dễ bị kẹt ở cực tiểu địa phương.
   - **Nếu $\eta$ quá lớn:** Bước nhảy vọt qua cả đáy thung lũng sang bờ đối diện, làm giá trị hàm mất mát ngày càng tăng và **phân kỳ (không hội tụ được)**.
3. **Tốc độ hội tụ và Chuẩn hóa đặc trưng (Feature Scaling):**
   - Với **hàm lồi (convex function)** (như MSE của hồi quy tuyến tính), GD đảm bảo hội tụ về cực trị toàn cục (nếu $\eta$ vừa phải) với độ phức tạp số vòng lặp là $\mathcal{O}(1/\varepsilon)$, trong đó $\varepsilon$ là dung sai (tolerance). Nghĩa là nếu muốn tăng độ chính xác gấp $10$ lần ($\varepsilon / 10$), số vòng lặp cần tăng lên khoảng **$10$ lần**.
   - **Tại sao cần Feature Scaling?** Nếu các thuộc tính có thang đo chênh lệch lớn, các đường đồng mức (contour) của hàm mất mát có dạng **elip dẹp kéo dài**, làm quỹ đạo GD đi theo đường zíc-zắc mất nhiều thời gian. Khi chuẩn hóa các thuộc tính về cùng thang đo (ví dụ dùng `StandardScaler`), đường đồng mức trở thành **hình tròn đồng tâm**, giúp véc-tơ gradient trỏ thẳng về tâm cực tiểu và hội tụ nhanh hơn rất nhiều!

---

## 3.3. GD cho hàm nhiều biến & Batch Gradient Descent (BGD)

### 3.3.1. Thuật toán GD cho hàm nhiều biến
1. Khởi tạo điểm bắt đầu $\mathbf{x} \in D \subset \mathbb{R}^N$.
2. Chọn bước nhảy (learning rate) $\eta > 0$.
3. Lặp cập nhật khi điều kiện dừng chưa thỏa:
   $$\mathbf{x} \leftarrow \mathbf{x} - \eta \nabla f(\mathbf{x}) \qquad (3)$$
4. Điều kiện dừng theo chuẩn Euclid ($L_2$) của véc-tơ gradient:
   $$\|\nabla f(\mathbf{x})\|_2 = \sqrt{\sum_{i=1}^{N} \left[ \frac{\partial}{\partial x_i} f(\mathbf{x}) \right]^2} < \varepsilon \qquad (4)$$

#### 📝 Bài tập tính tay GD cho hàm 2 biến (Slide 14)
**Đề bài:** Cho hàm hai biến $f(x_1, x_2) = x_1^2 + 3x_2^2 + 1$.
- *Tại sao điểm cực trị là $\mathbf{x}^* = (0, 0)$?*
  Vì $x_1^2 \ge 0$ và $3x_2^2 \ge 0 \ \forall (x_1, x_2)$, nên $f(x_1, x_2) \ge 1$. Dấu $"="$ xảy ra khi và chỉ khi $\nabla f(x_1, x_2) = (2x_1, 6x_2) = (0, 0) \Leftrightarrow (x_1, x_2) = (0, 0)$.
- **Chạy bằng "sức người" 2 vòng lặp:** Giả sử khởi tạo $\mathbf{x}^{(0)} = (2, 1)^T$ và chọn $\eta = 0.1$:
  - Véc-tơ gradient: $\nabla f(x_1, x_2) = \begin{bmatrix} 2x_1 \\ 6x_2 \end{bmatrix}$.
  - **Vòng lặp 1:**
    $$\nabla f(\mathbf{x}^{(0)}) = \begin{bmatrix} 2(2) \\ 6(1) \end{bmatrix} = \begin{bmatrix} 4 \\ 6 \end{bmatrix} \implies \mathbf{x}^{(1)} = \begin{bmatrix} 2 \\ 1 \end{bmatrix} - 0.1 \begin{bmatrix} 4 \\ 6 \end{bmatrix} = \begin{bmatrix} 1.6 \\ 0.4 \end{bmatrix}$$
  - **Vòng lặp 2:**
    $$\nabla f(\mathbf{x}^{(1)}) = \begin{bmatrix} 2(1.6) \\ 6(0.4) \end{bmatrix} = \begin{bmatrix} 3.2 \\ 2.4 \end{bmatrix} \implies \mathbf{x}^{(2)} = \begin{bmatrix} 1.6 \\ 0.4 \end{bmatrix} - 0.1 \begin{bmatrix} 3.2 \\ 2.4 \end{bmatrix} = \begin{bmatrix} 1.28 \\ 0.16 \end{bmatrix}$$

### 3.3.2. Batch Gradient Descent (BGD) cho Hồi quy tuyến tính
Từ hàm mất mát của mô hình hồi quy tuyến tính:
$$J(\boldsymbol{\theta}) = \frac{1}{2m} \sum_{i=1}^{m} \left(\hat{y}^{(i)} - y^{(i)}\right)^2 = \frac{1}{2m} \sum_{i=1}^{m} \left(\boldsymbol{\theta}^T \mathbf{x}^{(i)} - y^{(i)}\right)^2 \qquad (5)$$

Lấy đạo hàm riêng của $J(\boldsymbol{\theta})$ theo từng trọng số $\theta_j$ ($j = 0, 1, \dots, n-1$):
$$J'_{\theta_j}(\boldsymbol{\theta}) = \frac{\partial J(\boldsymbol{\theta})}{\partial \theta_j} = \frac{1}{m} \sum_{i=1}^{m} \left(\boldsymbol{\theta}^T \mathbf{x}^{(i)} - y^{(i)}\right) x_j^{(i)} \qquad (6)$$

Gom toàn bộ các đạo hàm riêng vào véc-tơ gradient:
$$\nabla_{\boldsymbol{\theta}} J(\boldsymbol{\theta}) = \left( J'_{\theta_0}(\boldsymbol{\theta}), \dots, J'_{\theta_{n-1}}(\boldsymbol{\theta}) \right)^T = \frac{1}{m} \mathbf{X}^T \left(\mathbf{X}\boldsymbol{\theta} - \mathbf{y}\right) \qquad (7)$$

**Công thức cập nhật của Batch GD:**
$$\boldsymbol{\theta} \leftarrow \boldsymbol{\theta} - \eta \nabla_{\boldsymbol{\theta}} J(\boldsymbol{\theta}) = \boldsymbol{\theta} - \frac{\eta}{m} \mathbf{X}^T \left(\mathbf{X}\boldsymbol{\theta} - \mathbf{y}\right) \qquad (8)$$

> 📌 Phương pháp này được gọi là **GD toàn phần (Batch GD – BGD)** vì ở **mỗi bước cập nhật**, thuật toán phải duyệt qua toàn bộ $m$ mẫu dữ liệu của tập huấn luyện.

---

## 3.4. Gradient Descent ngẫu nhiên (Stochastic Gradient Descent – SGD)

### 3.4.1. Hạn chế của Batch GD
Vì BGD dùng toàn bộ tập dữ liệu huấn luyện ở mỗi bước cập nhật nên gặp 3 khó khăn lớn khi tập dữ liệu cực lớn:
1. **Khối lượng tính toán lớn:** Mỗi bước lặp phải nhân ma trận $\mathbf{X}$ có $m$ hàng.
2. **Tốc độ hội tụ chậm** khi $m$ hàng triệu mẫu.
3. **Không có tính "thời sự" (Online learning):** Không thể cập nhật nhanh tức thời khi có từng điểm dữ liệu mới sinh ra liên tục.

### 3.4.2. Nguyên lý và Công thức cập nhật của SGD
Thay vì dùng toàn bộ tập dữ liệu, **Stochastic Gradient Descent (SGD)** chỉ lấy ngẫu nhiên **từng điểm dữ liệu một** $(\mathbf{x}^{(i)}, y^{(i)})$ để tính đạo hàm và cập nhật trọng số ngay lập tức:

$$\boldsymbol{\theta}^{\text{Next}} = \boldsymbol{\theta} - \eta \nabla_{\boldsymbol{\theta}} J\left(\boldsymbol{\theta}; \mathbf{x}^{(i)}, y^{(i)}\right) \qquad (9)$$

Với hồi quy tuyến tính, véc-tơ gradient tính tại một điểm dữ liệu thứ $i$ là:

$$\nabla_{\boldsymbol{\theta}} J\left(\boldsymbol{\theta}; \mathbf{x}^{(i)}, y^{(i)}\right) = \left(\mathbf{x}^{(i)}\right) \left( (\mathbf{x}^{(i)})^T \boldsymbol{\theta} - y^{(i)} \right) \qquad (10)$$
*(Nếu biểu diễn $\mathbf{x}^{(i)}$ là véc-tơ hàng $1 \times n$ và $\boldsymbol{\theta}$ là véc-tơ cột $n \times 1$ thì viết là ${\mathbf{x}^{(i)}}^T (\mathbf{x}^{(i)}\boldsymbol{\theta} - y^{(i)})$).*

### 3.4.3. Đặc điểm của SGD và Learning Schedule
- **Khái niệm Epoch:** Mỗi lần duyệt qua hết tất cả $m$ điểm dữ liệu của tập huấn luyện được gọi là $1$ **epoch**.
  - Với **BGD**: $1$ epoch chỉ có **$1$ lần** cập nhật trọng số $\boldsymbol{\theta}$.
  - Với **SGD**: $1$ epoch tương ứng với **$m$ lần** cập nhật trọng số $\boldsymbol{\theta}$.
- **Xáo trộn dữ liệu (Shuffling):** Sau mỗi epoch, ta cần **trộn ngẫu nhiên thứ tự** của các điểm dữ liệu để đảm bảo tính ngẫu nhiên và tránh chu kỳ lặp thiên lệch.
- **Ưu & Nhược điểm của SGD:**
  - *Ưu điểm:* Hội tụ ban đầu **rất nhanh** (chỉ cần duyệt qua vài điểm dữ liệu đã tiến rất gần đến nghiệm), tiết kiệm bộ nhớ RAM (hỗ trợ *out-of-core / online learning*), và nhờ tính ngẫu nhiên nảy lên xuống nên SGD **dễ thoát khỏi các cực tiểu địa phương (local minima)** hơn BGD.
  - *Nhược điểm:* Do tính ngẫu nhiên của từng điểm, hàm mất mát không giảm đều đặn mà nhảy lên xuống, khiến khi đến gần điểm cực tiểu toàn cục thì nghiệm cứ dao động quanh đáy chứ không dừng hẳn lại.
- **Vai trò của hàm `learning_schedule` (Lịch giảm tốc độ học):**
  - Bắt đầu với độ học $\eta$ lớn (để tiến nhanh về vùng cực tiểu và thoát khỏi local minima), sau đó **giảm dần $\eta$** theo thời gian (ví dụ $\eta(t) = \dfrac{t_0}{t + t_1}$) để các bước nhảy nhỏ dần và hội tụ ổn định quanh điểm cực tiểu. Nếu bỏ `learning_schedule` (giữ $\eta$ cố định lớn), nghiệm của SGD sẽ dao động mạnh quanh cực trị mãi mãi.

---

## 3.5. Mini-Batch Gradient Descent

**Mini-Batch GD** là sự kết hợp hài hòa giữa BGD và SGD:
- Bắt đầu mỗi epoch, thuật toán xáo trộn ngẫu nhiên toàn bộ dữ liệu rồi chia thành các **nhóm nhỏ (mini-batches)** gồm $b$ điểm dữ liệu (trừ mini-batch cuối có thể ít hơn nếu $m$ không chia hết cho $b$).
- Ở mỗi bước, thuật toán tính gradient trên một mini-batch gồm $b$ mẫu thay vì toàn bộ $m$ mẫu hay chỉ $1$ mẫu:

$$\boldsymbol{\theta} \leftarrow \boldsymbol{\theta} - \eta \nabla_{\boldsymbol{\theta}} J\left(\boldsymbol{\theta}; \mathbf{x}^{(i:i+b)}, \mathbf{y}^{(i:i+b)}\right) \qquad (11)$$

- **Trường hợp đặc biệt:**
  - Khi kích thước bó $b = 1$: Mini-Batch GD trở thành **SGD**.
  - Khi kích thước bó $b = m$: Mini-Batch GD trở thành **Batch GD (BGD)**.
- **Kích thước mini-batch thường chọn:** Các lũy thừa của $2$ ($2^k$) như **$32, 64, 128, 256, 512, 1024,\dots$** để tối ưu hóa phép nhân ma trận song song trên phần cứng bộ nhớ đệm CPU/GPU.

---

## 3.6. Bảng so sánh các thuật toán cho Hồi quy tuyến tính

| Thuật toán | $m$ lớn (nhiều mẫu) | Hỗ trợ Out-of-core (ngoài RAM) | $n$ lớn (nhiều thuộc tính) | Số siêu tham số | Cần chuẩn hóa (Scaling)? | Lớp trong `scikit-learn` |
|---|---|---|---|---|---|---|
| **Normal Equation** | Nhanh | Không | Chậm ($\mathcal{O}(n^3)$) | $0$ | Không | `n/a` (tự viết bằng `numpy`) |
| **SVD** | Nhanh | Không | Chậm ($\mathcal{O}(n^2)$) | $0$ | Không | `LinearRegression` |
| **Batch GD** | Chậm | Không | Nhanh | $2$ ($\eta$, `tol`/`epochs`) | **Có** | `SGDRegressor` |
| **Stochastic GD** | Nhanh | **Có** | Nhanh | $\ge 2$ | **Có** | `SGDRegressor` |
| **Mini-batch GD** | Nhanh | **Có** | Nhanh | $\ge 2$ | **Có** | `SGDRegressor` |

---

## 3.7. Phụ lục: Tính đạo hàm gần đúng bằng sai phân hữu hạn

Khi biểu thức hàm số $f(x)$ quá phức tạp khiến việc lấy đạo hàm giải tích gặp khó khăn (hoặc khi cần kiểm tra tính đúng đắn của code đạo hàm – *gradient checking*), ta sử dụng định nghĩa giới hạn của đạo hàm:

$$f'(x) = \lim_{\varepsilon \to 0} \frac{f(x + \varepsilon) - f(x)}{\varepsilon} \qquad (12)$$

Với $\varepsilon > 0$ rất nhỏ (ví dụ $\varepsilon = 10^{-6}$), ta xấp xỉ đạo hàm tại điểm $x$ bằng công thức:

$$f'(x) \approx \frac{f(x + \varepsilon) - f(x)}{\varepsilon} \qquad (13)$$

---

## 3.8. 💻 Thực hành Python & Giải đáp câu hỏi bài tập

### Giải đáp nhanh câu hỏi lý thuyết trong bài tập (Slide 17 & 22)
- **BT2 (Slide 17):** Trong công thức gradient $\frac{2}{m}\mathbf{X}^T(\mathbf{X}\boldsymbol{\theta} - \mathbf{y})$ (ứng với $J = \text{MSE}$):
  - *(a) Nếu bỏ số $2$:* Chỉ làm thay đổi hằng số tỷ lệ của gradient đi $2$ lần (tương đương giảm $\eta$ đi một nửa), điểm cực tiểu $\hat{\boldsymbol{\theta}}$ hoàn toàn **không đổi**.
  - *(b) Nếu bỏ $m$ (không chia cho $m$):* Độ lớn của gradient sẽ bị nhân lên gấp $m$ lần. Khi số mẫu $m$ lớn, bước nhảy $\eta \cdot \text{gradient}$ trở nên khổng lồ khiến thuật toán **bị tràn số (`nan`/`inf`) và phân kỳ** trừ khi giảm $\eta$ xuống cực nhỏ ($\eta / m$).

### Code cài đặt BGD, SGD, Mini-Batch GD và `SGDRegressor`

```python
import numpy as np
from sklearn.linear_model import SGDRegressor

# Tạo dữ liệu giả lập: y = 4 + 3x + nhiễu
np.random.seed(42)
m = 100
X = 2 * np.random.rand(m, 1)
y = 4 + 3 * X + np.random.randn(m, 1)
X_b = np.c_[np.ones((m, 1)), X]  # Thêm cột x0 = 1

# 1. Batch Gradient Descent (với điều kiện dừng ||gradient||_2 < epsilon)
eta = 0.1
max_iterations = 1000
epsilon = 1e-5
theta_bgd = np.random.randn(2, 1)

for iteration in range(max_iterations):
    gradients = (1 / m) * X_b.T @ (X_b @ theta_bgd - y)
    if np.linalg.norm(gradients) < epsilon:
        print(f"BGD hội tụ ở vòng lặp {iteration}")
        break
    theta_bgd = theta_bgd - eta * gradients

print("Theta BGD       :", theta_bgd.ravel())

# 2. Stochastic Gradient Descent (SGD) với Learning Schedule
n_epochs = 50
t0, t1 = 5, 50  # Siêu tham số của learning schedule

def learning_schedule(t):
    return t0 / (t + t1)

theta_sgd = np.random.randn(2, 1)
for epoch in range(n_epochs):
    # Xáo trộn dữ liệu đầu mỗi epoch
    indices = np.random.permutation(m)
    X_b_shuffled = X_b[indices]
    y_shuffled = y[indices]
    for i in range(m):
        xi = X_b_shuffled[i:i+1]
        yi = y_shuffled[i:i+1]
        gradients = xi.T @ (xi @ theta_sgd - yi)
        eta = learning_schedule(epoch * m + i)
        theta_sgd = theta_sgd - eta * gradients

print("Theta SGD       :", theta_sgd.ravel())

# 3. Mini-Batch Gradient Descent
minibatch_size = 20
theta_mgd = np.random.randn(2, 1)
t = 0
for epoch in range(n_epochs):
    shuffled_indices = np.random.permutation(m)
    X_b_shuffled = X_b[shuffled_indices]
    y_shuffled = y[shuffled_indices]
    for i in range(0, m, minibatch_size):
        t += 1
        xi = X_b_shuffled[i:i + minibatch_size]
        yi = y_shuffled[i:i + minibatch_size]
        gradients = (1 / len(xi)) * xi.T @ (xi @ theta_mgd - yi)
        eta = learning_schedule(t)
        theta_mgd = theta_mgd - eta * gradients

print("Theta Mini-Batch:", theta_mgd.ravel())

# 4. Sử dụng SGDRegressor của scikit-learn
# max_iter: số epoch tối đa; tol: ngưỡng dừng khi loss giảm ít hơn tol
# penalty: loại quy tắc hóa (None, 'l2', 'l1', 'elasticnet'); eta0: learning rate khởi tạo
sgd_reg = SGDRegressor(max_iter=1000, tol=1e-3, penalty=None, eta0=0.1, random_state=42)
sgd_reg.fit(X, y.ravel())
print("Scikit-Learn SGD:", sgd_reg.intercept_[0], sgd_reg.coef_[0])
```

---

[⬅ Trước: Hồi quy tuyến tính quy tắc hóa](02_hoi_quy_quy_tac_hoa_ridge_lasso_elastic_net.md) · [Mục lục](README.md) · [Tiếp: Hồi quy Logistic ➡](04_hoi_quy_logistic.md)
