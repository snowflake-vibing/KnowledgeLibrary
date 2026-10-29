# Giải thích Chi tiết: Kernel Trick và Kernel SVM

> **Tài liệu tham chiếu:** [Chương 6: Máy học và Bài toán Dự báo (P1)](../Chuong_6_Hoc_may_va_bai_toan_du_bao_P1.md)  
> **Chủ đề:** Hiểu sâu bản chất toán học, trực giác hình học và ứng dụng của Kernel Trick trong Support Vector Machines.

---

## 1. Vấn đề cốt lõi: Khi dữ liệu không thể phân tách tuyến tính

Trong không gian ban đầu, dữ liệu thực tế hiếm khi phân tách hoàn hảo bằng một đường thẳng (trong không gian 2D) hoặc một mặt phẳng (trong không gian 3D).

Các ví dụ điển hình không thể tách tuyến tính:
- **Bài toán XOR:** Hai lớp dữ liệu nằm đan chéo nhau theo đường chéo.
- **Dữ liệu vòng tròn đồng tâm:** Lớp $+1$ nằm trọn ở lõi giữa, lớp $-1$ bao bọc ở vành ngoài.

Nếu chỉ dùng SVM tuyến tính thuần túy, mô hình hoàn toàn bất lực và cho độ chính xác rất thấp.

<div align="center">
  <img src="../images/kernel_trick_transformation.png" alt="Biến đổi không gian qua Kernel Trick" width="90%">
  <p><em>Hình 1: Trực giác hình học: (a) Dữ liệu 2D không thể phân tách bằng đường thẳng $\implies$ (b) Ánh xạ lên không gian 3D $z = x_1^2 + x_2^2$ tạo thành mặt paraboloid để phân tách bằng một mặt phẳng $\implies$ (c) Chiếu ngược giao tuyến xuống không gian 2D ban đầu tạo thành đường cong ellipse phân tách hoàn hảo.</em></p>
</div>

---

## 2. Ý tưởng nền tảng: Định lý Cover và Ánh xạ không gian

> [!NOTE]
> **Định lý Cover (Cover's Theorem on Separability of Patterns):**  
> Một tập dữ liệu không thể phân tách tuyến tính trong không gian chiều thấp sẽ có xác suất rất cao trở thành **phân tách tuyến tính được** khi được ánh xạ phi tuyến lên một không gian đặc trưng có **số chiều cao hơn**.

Giả sử ta có hàm ánh xạ $\phi(\mathbf{x})$ chuyển điểm $\mathbf{x} \in \mathbb{R}^d$ sang không gian mới $\mathcal{H}$ có số chiều $D \gg d$:

$$
\mathbf{x} \mapsto \phi(\mathbf{x})
$$

Trong không gian mới $\mathcal{H}$, siêu phẳng phân tách có dạng:

$$
\mathbf{w}^T \phi(\mathbf{x}) + b = 0
$$

---

## 3. Kernel Trick là gì? Tại sao gọi là "Trick" (Mẹo thông minh)?

### 3.1. Thảm họa tính toán nếu làm theo cách thông thường
Nếu làm theo cách ngây thơ (*Naive approach*):
1. Lấy từng vector $\mathbf{x}_i \in \mathbb{R}^d$, tính toán tường minh tọa độ mới $\phi(\mathbf{x}_i) \in \mathbb{R}^D$.
2. Nếu $D$ rất lớn (hàng triệu chiều) hoặc vô hạn chiều, việc lưu trữ và tính toán $\phi(\mathbf{x})$ sẽ làm tràn bộ nhớ và treo máy (**Curse of Dimensionality**).

### 3.2. Cứu cánh từ dạng đối ngẫu Lagrangian
Quan sát bài toán đối ngẫu trong SVM:

$$
\max_{\boldsymbol{\alpha}} \left( \sum_{i=1}^N \alpha_i - \frac{1}{2} \sum_{i=1}^N \sum_{j=1}^N \alpha_i \alpha_j y_i y_j \langle \phi(\mathbf{x}_i), \phi(\mathbf{x}_j) \rangle \right)
$$

Và hàm phân loại dự đoán:

$$
f(\mathbf{x}) = \text{sign}\left( \sum_{i \in SV} \alpha_i y_i \langle \phi(\mathbf{x}_i), \phi(\mathbf{x}) \rangle + b \right)
$$

> [!IMPORTANT]
> **Nhận xét then chốt:**  
> Thuật toán SVM **hoàn toàn không cần biết tọa độ riêng lẻ** của $\phi(\mathbf{x})$ là gì! Toàn bộ quá trình huấn luyện và dự báo chỉ cần **tích vô hướng (Dot Product)** giữa các cặp vector trong không gian mới: $\langle \phi(\mathbf{x}_i), \phi(\mathbf{x}_j) \rangle$.

### 3.3. Định nghĩa Hàm Kernel
Một hàm Kernel $K(\mathbf{x}, \mathbf{z})$ là một hàm số nhận vào 2 vector trong không gian ban đầu $\mathbb{R}^d$, và trả về trực tiếp giá trị tích vô hướng của chúng trong không gian đặc trưng mới $\mathcal{H}$:

$$
K(\mathbf{x}, \mathbf{z}) = \langle \phi(\mathbf{x}), \phi(\mathbf{z}) \rangle = \phi(\mathbf{x})^T \phi(\mathbf{z})
$$

<div align="center">
  <img src="../images/kernel_mapping_function.jpg" alt="Nguyên lý hàm Kernel" width="70%">
  <p><em>Hình 2: Kernel Trick cho phép tính trực tiếp $K(\mathbf{x}, \mathbf{z})$ ở không gian thấp mà thu được kết quả tương đương tích vô hướng ở không gian cao.</em></p>
</div>

---

## 4. Ví dụ Toán học Minh họa Cực kỳ Dễ hiểu

Xét dữ liệu 2 chiều: $\mathbf{x} = (x_1, x_2)^T$ và $\mathbf{z} = (z_1, z_2)^T$.

Chọn hàm Kernel đa thức bậc 2 không thuần nhất:

$$
K(\mathbf{x}, \mathbf{z}) = (\mathbf{x}^T \mathbf{z} + 1)^2
$$

Khai triển đại số:

$$
K(\mathbf{x}, \mathbf{z}) = (x_1 z_1 + x_2 z_2 + 1)^2
$$

$$
= x_1^2 z_1^2 + x_2^2 z_2^2 + 2x_1 z_1 x_2 z_2 + 2x_1 z_1 + 2x_2 z_2 + 1
$$

Tách biểu thức trên thành tích vô hướng của hai vector cùng dạng:

$$
= \begin{pmatrix} x_1^2 \\ x_2^2 \\ \sqrt{2}x_1 x_2 \\ \sqrt{2}x_1 \\ \sqrt{2}x_2 \\ 1 \end{pmatrix} \cdot \begin{pmatrix} z_1^2 \\ z_2^2 \\ \sqrt{2}z_1 z_2 \\ \sqrt{2}z_1 \\ \sqrt{2}z_2 \\ 1 \end{pmatrix} = \phi(\mathbf{x})^T \phi(\mathbf{z})
$$

Ánh xạ ẩn ở đây là chuyển từ không gian 2D sang không gian 6D:

$$
\phi(\mathbf{x}) = \left( x_1^2, \, x_2^2, \, \sqrt{2}x_1 x_2, \, \sqrt{2}x_1, \, \sqrt{2}x_2, \, 1 \right)^T
$$

### So sánh chi phí tính toán:
- **Cách trực tiếp:** Biến đổi $\mathbf{x} \to \phi(\mathbf{x})$ (6 phép tính), biến đổi $\mathbf{z} \to \phi(\mathbf{z})$ (6 phép tính), rồi nhân vô hướng 6 chiều (6 nhân + 5 cộng) $\implies$ Tốn công sức.
- **Cách Kernel Trick:** Tính $\mathbf{x}^T \mathbf{z} = x_1 z_1 + x_2 z_2$ (2 nhân, 1 cộng), cộng thêm 1, rồi bình phương $\implies$ Chỉ mất **4 phép toán cơ bản**, nhưng kết quả hoàn toàn tương đương!

---

## 5. Điều kiện Mercer và Ma trận Gram

Làm sao biết một hàm $K(\mathbf{x}, \mathbf{z})$ bất kỳ có tương ứng với một tích vô hướng trong không gian nào đó hay không?

### 5.1. Ma trận Gram (Kernel Matrix)
Với tập dữ liệu gồm $N$ điểm $\{\mathbf{x}_1, \dots, \mathbf{x}_N\}$, ma trận Gram $\mathbf{K} \in \mathbb{R}^{N \times N}$ được định nghĩa:

$$
\mathbf{K} = \begin{bmatrix}
K(\mathbf{x}_1, \mathbf{x}_1) & K(\mathbf{x}_1, \mathbf{x}_2) & \dots & K(\mathbf{x}_1, \mathbf{x}_N) \\
K(\mathbf{x}_2, \mathbf{x}_1) & K(\mathbf{x}_2, \mathbf{x}_2) & \dots & K(\mathbf{x}_2, \mathbf{x}_N) \\
\vdots & \vdots & \ddots & \vdots \\
K(\mathbf{x}_N, \mathbf{x}_1) & K(\mathbf{x}_N, \mathbf{x}_2) & \dots & K(\mathbf{x}_N, \mathbf{x}_N)
\end{bmatrix}
$$

### 5.2. Định lý Mercer
Hàm $K(\mathbf{x}, \mathbf{z})$ là một Kernel hợp lệ khi thỏa mãn 2 điều kiện:
1. **Tính đối xứng:** $K(\mathbf{x}, \mathbf{z}) = K(\mathbf{z}, \mathbf{x})$ với mọi $\mathbf{x}, \mathbf{z}$.
2. **Ma trận Gram nửa xác định dương (Positive Semi-Definite - PSD):**

$$
\forall \mathbf{v} \in \mathbb{R}^N, \quad \mathbf{v}^T \mathbf{K} \mathbf{v} \ge 0
$$

> [!TIP]
> **Ý nghĩa thực tế của điều kiện PSD:**  
> Ma trận Gram nửa xác định dương đảm bảo bài toán tối ưu đối ngẫu của SVM là một **bài toán quy hoạch toàn phương lồi (Convex Quadratic Programming)**. Điều này đảm bảo thuật toán luôn tìm được **duy nhất một điểm cực tiểu toàn cục (Global Optimum)**, không bao giờ bị mắc kẹt ở các cực tiểu cục bộ (*Local Minima*) như trong huấn luyện mạng nơ-ron sâu!

---

## 6. Phân tích Các Hàm Kernel Phổ biến

### 6.1. Linear Kernel (Tuyến tính)
$$
K(\mathbf{x}, \mathbf{z}) = \mathbf{x}^T \mathbf{z}
$$
- **Bản chất:** Giữ nguyên không gian ban đầu, không ánh xạ.
- **Ưu điểm:** Tính toán nhanh nhất, ít tốn RAM, không có siêu tham số phụ nào ngoài $C$.
- **Khi nào nên dùng?** Khi số lượng đặc trưng ($d$) rất lớn so với số lượng mẫu ($N$), ví dụ: phân loại văn bản (*Text Classification*), xử lý dữ liệu biểu diễn túi từ (*Bag-of-Words*), ma trận thưa TF-IDF.

---

### 6.2. Polynomial Kernel (Đa thức)
$$
K(\mathbf{x}, \mathbf{z}) = (\gamma \mathbf{x}^T \mathbf{z} + r)^d
$$
- **Tham số:** Bậc đa thức $d$, hệ số tỷ lệ $\gamma$, và hệ số chệch tự do $r$ (*coef0*).
- **Bản chất:** Tạo ra tất cả các tổ hợp tích chéo bậc $d$ giữa các thuộc tính.
- **Khi nào nên dùng?** Trong các bài toán thị giác máy tính, nhận dạng chữ viết tay (như tập dữ liệu MNIST), khi các đặc trưng có mối tương tác phối hợp rõ ràng.
- **Lưu ý:** Không nên chọn bậc $d$ quá lớn ($d > 5$) vì dễ gây bùng nổ giá trị và quá khớp nặng.

---

### 6.3. RBF / Gaussian Kernel (Hàm xuyên tâm - Phổ biến nhất)
$$
K(\mathbf{x}, \mathbf{z}) = \exp\left(-\gamma \|\mathbf{x} - \mathbf{z}\|^2\right) = \exp\left(-\frac{\|\mathbf{x} - \mathbf{z}\|^2}{2\sigma^2}\right)
$$

#### Trực giác không gian vô hạn chiều:
Khai triển chuỗi Taylor của hàm $\exp(u) = 1 + u + \frac{u^2}{2!} + \frac{u^3}{3!} + \dots$ cho thấy RBF Kernel thực chất đang ánh xạ dữ liệu vào một không gian Hilbert có **vô hạn chiều** ($\infty$-dimensional space)!

#### Ý nghĩa của khoảng cách và thước đo độ tương đồng:
- Nếu $\mathbf{x} = \mathbf{z}$ (hai điểm trùng nhau) $\implies \|\mathbf{x} - \mathbf{z}\|^2 = 0 \implies K(\mathbf{x}, \mathbf{z}) = \exp(0) = 1$.
- Nếu $\mathbf{x}$ và $\mathbf{z}$ nằm rất xa nhau $\implies \|\mathbf{x} - \mathbf{z}\|^2 \to \infty \implies K(\mathbf{x}, \mathbf{z}) \to 0$.
- Do đó, RBF Kernel đóng vai trò như một **hàm đo lường độ tương đồng**: Mỗi Support Vector tạo ra một "chuông Gaussian" cục bộ xung quanh nó.

#### Ảnh hưởng sống còn của tham số $\gamma$ (hoặc $\sigma$):
- **$\gamma$ lớn ($\sigma$ nhỏ):** Bán kính ảnh hưởng hẹp, chuông Gaussian nhọn hoắt. Siêu phẳng bị uốn lượn sát sạt từng điểm train $\implies$ **Overfitting**.
- **$\gamma$ nhỏ ($\sigma$ lớn):** Bán kính ảnh hưởng rộng, chuông Gaussian thoai thoải. Ranh giới quyết định trở nên gần như tuyến tính $\implies$ **Underfitting**.

---

### 6.4. Sigmoid Kernel
$$
K(\mathbf{x}, \mathbf{z}) = \tanh(\gamma \mathbf{x}^T \mathbf{z} + r)
$$
- **Bản chất:** Mô phỏng hàm kích hoạt sigmoid trong mạng nơ-ron Perceptron đa tầng.
- **Hạn chế:** Không phải với mọi giá trị của $\gamma$ và $r$, Sigmoid Kernel đều thỏa mãn điều kiện Mercer (ma trận Gram có thể không PSD). Do đó, hiệu quả thường kém ổn định và ít được ưu tiên trong thực tế.

---

## 7. Bảng Tổng kết & Hướng dẫn Chọn Kernel Thực tế

| Tiêu chí | Linear Kernel | Polynomial Kernel | RBF / Gaussian Kernel | Sigmoid Kernel |
| :--- | :--- | :--- | :--- | :--- |
| **Công thức** | $\mathbf{x}^T \mathbf{z}$ | $(\gamma \mathbf{x}^T \mathbf{z} + r)^d$ | $\exp(-\gamma \|\mathbf{x} - \mathbf{z}\|^2)$ | $\tanh(\gamma \mathbf{x}^T \mathbf{z} + r)$ |
| **Số chiều không gian mới** | Bằng không gian gốc ($d$) | Hữu hạn $\binom{d+n}{n}$ | **Vô hạn chiều ($\infty$)** | Tùy tham số |
| **Tham số cần tinh chỉnh** | Chỉ có $C$ | $C, d, \gamma, r$ | $C, \gamma$ | $C, \gamma, r$ |
| **Tốc độ huấn luyện** | Rất nhanh | Trung bình | Khá nhanh | Khá nhanh |
| **Độ phức tạp ranh giới** | Tuyến tính phẳng | Đa thức uốn lượn | Linh hoạt mọi hình dạng | Dạng hyperbolic |
| **Trường hợp khuyên dùng** | Số đặc trưng rất lớn ($d \gg N$) | Dữ liệu dạng đa thức, ảnh | **Lựa chọn mặc định khi chưa rõ phân bố** | Ít khi khuyên dùng |

### Chiến lược thực tế khi làm dự án Machine Learning:
1. **Bước 1:** Thử **Linear Kernel** trước nếu tập dữ liệu có số chiều rất lớn (hàng nghìn thuộc tính) hoặc tập dữ liệu cực kỳ khổng lồ.
2. **Bước 2:** Nếu dữ liệu có kích thước vừa phải và mối quan hệ phi tuyến, chuyển sang **RBF Kernel** (đây là lựa chọn mặc định hiệu quả nhất). Sử dụng Grid Search kết hợp Cross-Validation để tìm cặp tham số $(C, \gamma)$ tối ưu.
3. **Bước 3:** Thử **Polynomial Kernel** nếu có giả thuyết cụ thể từ nghiệp vụ rằng các đặc trưng tương tác nhân bậc cao với nhau.
