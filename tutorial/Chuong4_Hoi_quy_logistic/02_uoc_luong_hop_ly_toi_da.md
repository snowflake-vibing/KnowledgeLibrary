# 2. Ước lượng hợp lý tối đa (Maximum Likelihood Estimation – MLE)

[⬅ Trước: Hồi quy Logistic nhị phân](01_hoi_quy_logistic_nhi_phan.md) · [Mục lục](README.md) · [Tiếp: Hồi quy Logistic đa lớp ➡](03_hoi_quy_logistic_da_lop.md)

---

## 2.1. Log-Likelihood

- MLE là phương pháp tìm $\beta$ dựa trên hàm Likelihood.
- Tối đa hóa trực tiếp $L(\beta)$ (tích của nhiều xác suất) rất phức tạp, nên ta tối đa hóa **Log-Likelihood** $\ell(\beta)$ (biến tích thành tổng):

$$
\begin{aligned}
\ell(\beta) = \log L(\beta) &= \log \prod_{i=1}^{n} p(y^{(i)} \mid x^{(i)}; \beta) \\
&= \sum_{i=1}^{n} \Big[ y^{(i)} \log \sigma(\beta^T x^{(i)}) + (1 - y^{(i)}) \log\big(1 - \sigma(\beta^T x^{(i)})\big) \Big]
\end{aligned} \qquad (12)
$$

**Mục tiêu:** tìm tham số $\beta$ để tối đa hóa log-likelihood:

$$\hat{\beta} = \arg\max_\beta \ \ell(\beta) = \arg\max_\beta \sum_{i=1}^{n} \Big[ y^{(i)} \log \sigma(\beta^T x^{(i)}) + (1 - y^{(i)}) \log\big(1 - \sigma(\beta^T x^{(i)})\big) \Big] \qquad (13)$$

Hai phương pháp phổ biến:
1. **Newton-Raphson**: dùng đạo hàm bậc 1 (gradient) và bậc 2 (Hessian).
2. **Gradient Descent**: chỉ dùng đạo hàm bậc 1.

---

## 2.2. Phương pháp Newton-Raphson

### Thuật toán
| Bước | Nội dung |
|------|----------|
| **B1** | Khởi tạo giá trị ban đầu cho tham số $\beta^{(0)}$ |
| **B2** | Tính gradient $\nabla \ell(\beta^{(t)})$ |
| **B3** | Tính ma trận Hessian $H_{\ell}(\beta^{(t)})$ |
| **B4** | Cập nhật: $\beta^{(t+1)} = \beta^{(t)} - H_{\ell}(\beta^{(t)})^{-1} \, \nabla \ell(\beta^{(t)})$ &nbsp;&nbsp; **(14)** |
| **B5** | Dừng khi tham số thay đổi rất ít hoặc gradient gần 0, hoặc khi vượt số vòng lặp tối đa; ngược lại quay lại B2 |

Trong đó:
- $\beta^{(t)}$: vector tham số tại vòng lặp thứ $t$
- $H_{\ell}(\beta^{(t)})^{-1}$: ma trận nghịch đảo của Hessian tại $\beta^{(t)}$
- $\nabla \ell(\beta^{(t)})$: gradient (đạo hàm bậc nhất) tại $\beta^{(t)}$

### Gradient
Đạo hàm theo từng tham số $\beta_j$ $(j = 1, \dots, m)$:

$$\frac{\partial \ell(\beta)}{\partial \beta_j} = \sum_{i=1}^{n} \big(y^{(i)} - \sigma(\beta^T x^{(i)})\big) x_j^{(i)} \qquad (15)$$

Ví dụ mô hình đơn biến $\beta^T x = \beta_1 x + \beta_0$:

$$\nabla \ell(\beta) = \begin{bmatrix} \dfrac{\partial \ell}{\partial \beta_1} \\ \dfrac{\partial \ell}{\partial \beta_0} \end{bmatrix} = \begin{bmatrix} \sum_{i} \big(y^{(i)} - \sigma(\beta^T x^{(i)})\big) x^{(i)} \\ \sum_{i} \big(y^{(i)} - \sigma(\beta^T x^{(i)})\big) \end{bmatrix} \qquad (16)$$

Dạng ma trận tổng quát (theo slide):

$$\nabla \ell(\beta) = X^T (h - y) \qquad (17)$$

- $X^T$: ma trận chuyển vị của $X$ (đã thêm cột 1 cho hệ số chặn)
- $h - y$: vector chênh lệch giữa xác suất dự đoán $h = \sigma(X\beta)$ và nhãn thực tế $y$

> ⚠️ **Lưu ý về dấu:** $X^T(h - y)$ thực chất là gradient của **$-\ell(\beta)$** (negative log-likelihood); nó trái dấu với (15). Kết hợp với Hessian xác định dương $X^T W X$ ở (20), công thức (14) đúng là bước Newton để **cực tiểu $-\ell$**, tương đương **cực đại $\ell$**.

### Ma trận Hessian
Ma trận Hessian là ma trận vuông $m \times m$ gồm các đạo hàm bậc 2:

$$H_{jk} = \frac{\partial^2 \ell(\beta)}{\partial \beta_j \partial \beta_k} = \sum_{i=1}^{n} \sigma(\beta^T x^{(i)})\big(1 - \sigma(\beta^T x^{(i)})\big)\, x_j^{(i)} x_k^{(i)} \qquad (18)$$

với $x_j^{(i)}$ là giá trị đặc trưng thứ $j$ của mẫu thứ $i$. Ví dụ đơn biến:

$$H = \begin{bmatrix} \sum_i \sigma_i(1-\sigma_i)\,(x^{(i)})^2 & \sum_i \sigma_i(1-\sigma_i)\,x^{(i)} \\ \sum_i \sigma_i(1-\sigma_i)\,x^{(i)} & \sum_i \sigma_i(1-\sigma_i) \end{bmatrix} \qquad (19)$$

Dạng ma trận tổng quát:

$$H_{\ell}(\beta^{(t)}) = X^T W^{(t)} X \qquad (20)$$

với $W^{(t)}$ là **ma trận đường chéo** có phần tử $\sigma(\beta^T x^{(i)})\big(1 - \sigma(\beta^T x^{(i)})\big)$. *(Trên slide ma trận này cũng được ký hiệu là $\beta^{(t)}$.)*

### 📝 VD1: Một vòng lặp Newton-Raphson

Dữ liệu 5 mẫu, mỗi mẫu có 1 đặc trưng $x$ và nhãn $y$:

| $x^{(i)}$ | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|
| $y^{(i)}$ | 1 | 1 | 0 | 0 | 0 |

**B1. Khởi tạo:** $\beta_0 = 0.5,\ \beta_1 = 0.5 \Rightarrow \beta^T x = 0.5 + 0.5x$

**B2. Tính gradient**

| $x^{(i)}$ | $\beta^T x^{(i)}$ | $\sigma(\beta^T x^{(i)})$ | $y^{(i)}$ | $h - y$ |
|---|---|---|---|---|
| 2 | 1.5 | 0.818 | 1 | −0.182 |
| 3 | 2.0 | 0.881 | 1 | −0.119 |
| 4 | 2.5 | 0.924 | 0 | 0.924 |
| 5 | 3.0 | 0.953 | 0 | 0.953 |
| 6 | 3.5 | 0.971 | 0 | 0.971 |

$$X = \begin{bmatrix} 1 & 2 \\ 1 & 3 \\ 1 & 4 \\ 1 & 5 \\ 1 & 6 \end{bmatrix}, \qquad \nabla \ell(\beta) = X^T(h - y) = \begin{bmatrix} 1 & 1 & 1 & 1 & 1 \\ 2 & 3 & 4 & 5 & 6 \end{bmatrix} \begin{bmatrix} -0.182 \\ -0.119 \\ 0.924 \\ 0.953 \\ 0.971 \end{bmatrix} = \begin{bmatrix} 2.546 \\ 13.561 \end{bmatrix}$$

**B3. Tính Hessian**

| $\sigma$ | $1 - \sigma$ | $\sigma(1 - \sigma)$ |
|---|---|---|
| 0.818 | 0.182 | 0.149 |
| 0.881 | 0.119 | 0.105 |
| 0.924 | 0.076 | 0.070 |
| 0.953 | 0.047 | 0.045 |
| 0.971 | 0.029 | 0.028 |

$$W = \mathrm{diag}(0.149;\ 0.105;\ 0.070;\ 0.045;\ 0.028)$$

$$H = X^T W X = \begin{bmatrix} 0.398 & 1.290 \\ 1.290 & 4.817 \end{bmatrix}, \qquad H^{-1} = \begin{bmatrix} 19.13953191 & -5.1268409 \\ -5.1268409 & 1.58091117 \end{bmatrix}$$

**B4. Cập nhật tham số**

$$\beta^{(1)} = \begin{bmatrix} 0.5 \\ 0.5 \end{bmatrix} - \begin{bmatrix} 19.13953191 & -5.1268409 \\ -5.1268409 & 1.58091117 \end{bmatrix} \begin{bmatrix} 2.546 \\ 13.561 \end{bmatrix} = \begin{bmatrix} 21.301 \\ -7.887 \end{bmatrix}$$

Sau vòng lặp đầu tiên:

$$p = \sigma(\beta^T X) = \frac{1}{1 + e^{-(21.301 - 7.887x)}}$$

### Ưu – nhược điểm của Newton-Raphson
| ✅ Ưu điểm | ❌ Nhược điểm |
|-----------|--------------|
| Hội tụ nhanh, nhất là khi log-likelihood gần với hàm bậc hai (Hessian có điều kiện tốt) | Tính Hessian tốn kém khi mô hình có nhiều tham số |
| Dùng cả gradient và Hessian nên đạt kết quả chính xác hơn với ít vòng lặp hơn | Nghịch đảo Hessian gặp vấn đề nếu ma trận không khả nghịch |

---

## 2.3. Phương pháp Gradient Descent

### Hàm chi phí Cross-Entropy
Từ (13), cực đại log-likelihood tương đương **cực tiểu âm log-likelihood**:

$$\arg\max_\beta \ell(\beta) = \arg\min_\beta \sum_{i=1}^{n} -\Big[ y^{(i)} \log \sigma(\beta^T x^{(i)}) + (1 - y^{(i)}) \log\big(1 - \sigma(\beta^T x^{(i)})\big) \Big]$$

Chia cho $n$ ta được **hàm mất mát Cross-Entropy (Log Loss)**:

$$\mathcal{L}(\beta) = -\frac{1}{n} \sum_{i=1}^{n} \Big[ y^{(i)} \log \sigma(\beta^T x^{(i)}) + (1 - y^{(i)}) \log\big(1 - \sigma(\beta^T x^{(i)})\big) \Big] \qquad (21)$$

🎯 **Mục tiêu:** cực tiểu hàm Cross-Entropy để tìm $\beta$.

### Thuật toán
| Bước | Nội dung |
|------|----------|
| **B1** | Khởi tạo ngẫu nhiên tham số $\beta^{(0)}$ |
| **B2** | Tính hàm chi phí Cross-Entropy |
| **B3** | Tính gradient của hàm chi phí theo từng tham số |
| **B4** | Cập nhật tham số **ngược hướng gradient**: $\beta_j = \beta_j - \eta \dfrac{\partial \mathcal{L}(\beta)}{\partial \beta_j}$ &nbsp;&nbsp; **(22)** |
| **B5** | Dừng khi hàm chi phí không đổi hoặc đổi dưới ngưỡng cho trước, hoặc khi vượt số vòng lặp tối đa; ngược lại quay lại B2 |

với $\eta$ là **learning rate** (tốc độ học).

### Gradient của Cross-Entropy

$$\frac{\partial \mathcal{L}(\beta)}{\partial \beta_j} = \frac{1}{n} \sum_{i=1}^{n} \big(\sigma(\beta^T x^{(i)}) - y^{(i)}\big)\, x_j^{(i)} \qquad (23)$$

$$\nabla \mathcal{L}(\beta) = \frac{1}{n} X^T (h - y) \qquad (24)$$

### 📝 VD2: Một vòng lặp Gradient Descent ($\eta = 0.1$)

Dùng cùng dữ liệu với VD1; khởi tạo $\beta_0 = 0.5,\ \beta_1 = 0.5$.

**B2. Tính Cross-Entropy**

$$
\begin{aligned}
\mathcal{L}(\beta) &= -\frac{1}{5}\Big[ 1\cdot\log 0.818 + 1\cdot\log 0.881 + 1\cdot\log(1-0.924) \\
&\quad + 1\cdot\log(1-0.953) + 1\cdot\log(1-0.971) \Big] \\
&= -\frac{1}{5}\big[ -0.087 - 0.055 - 1.120 - 1.327 - 1.539 \big] = -\frac{1}{5}(-4.128) = \mathbf{0.8254}
\end{aligned}
$$

> ℹ️ Slide tính bằng $\log_{10}$. Nếu dùng logarit tự nhiên $\ln$ (như `sklearn.metrics.log_loss`), kết quả xấp xỉ **1.90**. Chọn cơ số nào cũng không làm thay đổi nghiệm tối ưu.

**B3. Tính gradient**

$$\nabla \mathcal{L}(\beta) = \frac{1}{5} X^T(h - y) = \frac{1}{5}\begin{bmatrix} 2.546 \\ 13.561 \end{bmatrix} = \begin{bmatrix} 0.5092 \\ 2.7122 \end{bmatrix}$$

**B4. Cập nhật tham số**

$$\beta_0 = 0.5 - 0.1 \times 0.5092 = 0.44908$$
$$\beta_1 = 0.5 - 0.1 \times 2.7122 = 0.22878$$

Sau vòng lặp đầu tiên:

$$p = \sigma(\beta^T X) = \frac{1}{1 + e^{-(0.44908 + 0.22878x)}}$$

> So với Newton-Raphson, một bước Gradient Descent chỉ dịch chuyển tham số một đoạn nhỏ nên cần **nhiều vòng lặp hơn** để hội tụ.

### Ưu – nhược điểm của Gradient Descent
| ✅ Ưu điểm | ❌ Nhược điểm |
|-----------|--------------|
| Đơn giản, dễ hiểu, dễ cài đặt | Learning rate quá lớn hoặc quá nhỏ đều ảnh hưởng đến sự hội tụ |
| Phù hợp dữ liệu lớn, không cần nghịch đảo ma trận | Không đảm bảo tối ưu toàn cục, có thể chỉ tìm được cực trị cục bộ* |
| Có các biến thể Stochastic / Mini-batch GD cho dữ liệu lớn | Cần nhiều vòng lặp, chậm nếu learning rate không tối ưu |
| | Phải tính gradient ở mỗi vòng lặp, tốn thời gian với dữ liệu lớn |

\* *Ghi chú: riêng với hồi quy logistic, Cross-Entropy là hàm lồi nên mọi cực tiểu cục bộ đều là cực tiểu toàn cục. Nhược điểm này đúng với các mô hình tổng quát như mạng nơ-ron.*

---

## 💻 Cài đặt bằng NumPy

```python
import numpy as np

x = np.array([2, 3, 4, 5, 6], dtype=float)
y = np.array([1, 1, 0, 0, 0], dtype=float)
X = np.column_stack([np.ones_like(x), x])       # thêm cột 1 cho beta_0
sigmoid = lambda z: 1 / (1 + np.exp(-z))

# ---- Newton-Raphson (1 vòng lặp) ----
beta = np.array([0.5, 0.5])
h = sigmoid(X @ beta)
grad = X.T @ (h - y)                             # (17)
H = X.T @ np.diag(h * (1 - h)) @ X               # (20)
beta_nr = beta - np.linalg.inv(H) @ grad         # (14)
print("Newton-Raphson:", beta_nr.round(3))       # ≈ [21.30, -7.887]

# ---- Gradient Descent (1 vòng lặp, eta = 0.1) ----
eta, n = 0.1, len(y)
beta = np.array([0.5, 0.5])
h = sigmoid(X @ beta)
loss = -np.mean(y * np.log(h) + (1 - y) * np.log(1 - h))   # (21) với ln
grad = X.T @ (h - y) / n                                    # (24)
beta_gd = beta - eta * grad                                 # (22)
print("Loss (ln):", round(loss, 4), "| GD:", beta_gd.round(5))  # ≈ [0.44908, 0.22878]
```

---

[⬅ Trước: Hồi quy Logistic nhị phân](01_hoi_quy_logistic_nhi_phan.md) · [Mục lục](README.md) · [Tiếp: Hồi quy Logistic đa lớp ➡](03_hoi_quy_logistic_da_lop.md)
