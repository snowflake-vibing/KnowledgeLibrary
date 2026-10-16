# 3. Hồi quy tuyến tính đa biến (Multiple Linear Regression)

[⬅ Trước: Hồi quy tuyến tính đơn biến](02_hoi_quy_tuyen_tinh_don_bien.md) · [Mục lục](README.md) · [Tiếp: Hồi quy phi tuyến & Gradient Descent ➡](04_hoi_quy_phi_tuyen_gradient_descent.md)

---

## 3.1. Mô hình

Mô hình hồi quy tuyến tính đa biến mô tả mối quan hệ giữa **một biến phụ thuộc $Y$** và **nhiều biến độc lập** $X_1, X_2, \dots, X_k$:

$$\hat{Y} = \beta_0 + \beta_1 X_1 + \beta_2 X_2 + \dots + \beta_k X_k + \varepsilon \qquad (20)$$

**Các giả sử của mô hình:**
- Sai số $\varepsilon$ có phân phối chuẩn.
- Các biến độc lập $X_1, X_2, \dots, X_k$ có phương sai bằng nhau (*homoscedasticity*).
- Các biến độc lập $X_1, X_2, \dots, X_k$ là độc lập nhau (không có đa cộng tuyến nghiêm trọng).

**Mục tiêu:** tìm bộ tham số $(\beta_0, \beta_1, \dots, \beta_k)$ sao cho sai số giữa giá trị dự đoán và giá trị thực tế nhỏ nhất.

---

## 3.2. Hàm sai số SSE

$$SSE = \sum_{i=1}^{n}\left(Y_i - \hat{Y}_i\right)^2 = \sum_{i=1}^{n}\left(Y_i - \beta_0 - \beta_1 X_{1i} - \beta_2 X_{2i} - \dots - \beta_k X_{ki} + \varepsilon\right)^2 \qquad (21)$$

---

## 3.3. Tìm tham số bằng phương pháp bình phương tối thiểu

Đặt đạo hàm riêng của SSE theo từng tham số bằng 0:

$$\frac{\partial SSE}{\partial \beta_0} = 0;\quad \frac{\partial SSE}{\partial \beta_1} = 0;\quad \dots;\quad \frac{\partial SSE}{\partial \beta_k} = 0$$

Khai triển ta được **hệ phương trình chuẩn** gồm $(k+1)$ phương trình $(k+1)$ ẩn:

$$n\beta_0 + \beta_1\sum X_{1i} + \beta_2\sum X_{2i} + \dots + \beta_k\sum X_{ki} = \sum Y_i$$

$$\beta_0\sum X_{1i} + \beta_1\sum X_{1i}^2 + \beta_2\sum X_{2i}X_{1i} + \dots + \beta_k\sum X_{ki}X_{1i} = \sum X_{1i}Y_i$$

$$\vdots$$

$$\beta_0\sum X_{ki} + \beta_1\sum X_{1i}X_{ki} + \beta_2\sum X_{2i}X_{ki} + \dots + \beta_k\sum X_{ki}^2 = \sum X_{ki}Y_i \qquad (22)$$

### Biểu diễn dạng ma trận

Hệ (22) tương đương:

$$X^T X \beta = X^T Y \qquad (23)$$

Suy ra nghiệm:

$$\boxed{\beta = (X^T X)^{-1} X^T Y}$$

Trong đó:

$$X = \begin{bmatrix} 1 & X_{11} & X_{21} & \dots & X_{k1} \\ 1 & X_{12} & X_{22} & \dots & X_{k2} \\ \vdots & \vdots & \vdots & & \vdots \\ 1 & X_{1n} & X_{2n} & \dots & X_{kn} \end{bmatrix}, \quad \beta = \begin{bmatrix} \beta_0 \\ \beta_1 \\ \vdots \\ \beta_k \end{bmatrix}, \quad Y = \begin{bmatrix} Y_1 \\ Y_2 \\ \vdots \\ Y_n \end{bmatrix}$$

- Cột đầu tiên của $X$ là cột toàn số 1 để tính $\beta_0$.
- $X^T$: ma trận chuyển vị của $X$.
- $(X^T X)^{-1}$: ma trận nghịch đảo của tích $X^T X$.

---

## 📝 VD3: Dự đoán năng suất lao động

Dữ liệu: tuổi nghề $x_1$ (năm), số giờ làm việc mỗi tuần $x_2$ (giờ) và năng suất lao động $y$ của 5 công nhân.

| Công nhân | $x_1$ (tuổi nghề) | $x_2$ (giờ/tuần) | $y$ (năng suất) |
|-----------|---|---|---|
| A | 2 | 40 | 3 |
| B | 3 | 45 | 6 |
| C | 4 | 48 | 10 |
| D | 5 | 50 | 12 |
| E | 6 | 52 | 14 |

**Câu hỏi:** Dự đoán năng suất lao động của công nhân có tuổi nghề 7 năm và làm 52 giờ/tuần.

### Bước 1: Xây dựng ma trận

$$X = \begin{bmatrix} 1 & 2 & 40 \\ 1 & 3 & 45 \\ 1 & 4 & 48 \\ 1 & 5 & 50 \\ 1 & 6 & 52 \end{bmatrix}, \quad Y = \begin{bmatrix} 3 \\ 6 \\ 10 \\ 12 \\ 14 \end{bmatrix}$$

### Bước 2: Tính $X^T X$

$$X^T = \begin{bmatrix} 1 & 1 & 1 & 1 & 1 \\ 2 & 3 & 4 & 5 & 6 \\ 40 & 45 & 48 & 50 & 52 \end{bmatrix}$$

$$X^T X = \begin{bmatrix} 5 & 20 & 235 \\ 20 & 90 & 969 \\ 235 & 969 & 11133 \end{bmatrix}$$

### Bước 3: Tính $X^T Y$

$$X^T Y = \begin{bmatrix} 45 \\ 208 \\ 2198 \end{bmatrix}$$

### Bước 4: Tính $(X^T X)^{-1}$

$$(X^T X)^{-1} = \frac{1}{39}\begin{bmatrix} 21003/65 & 337/13 & -118/13 \\ 337/13 & 88/39 & -29/39 \\ -118/13 & -29/39 & 10/39 \end{bmatrix} \approx \begin{bmatrix} 8.278 & 0.665 & -0.233 \\ 0.665 & 0.058 & -0.019 \\ -0.233 & -0.019 & 0.007 \end{bmatrix}$$

### Bước 5: Tính $\beta$

$$\beta = (X^T X)^{-1} X^T Y = \begin{bmatrix} -18.54 \\ 1.46 \\ 0.46 \end{bmatrix}$$

**Phương trình hồi quy:** $\hat{Y} = -18.54 + 1.46\,x_1 + 0.46\,x_2$

**Dự đoán** với $x_1 = 7$, $x_2 = 52$:

$$\hat{Y} = -18.54 + 1.46 \times 7 + 0.46 \times 52 = -18.54 + 10.22 + 24.00 = 15.68$$

Năng suất lao động dự đoán ≈ **15.68** (đơn vị).

> **Diễn giải hệ số:**
> - $\beta_1 = 1.46$: khi tuổi nghề tăng 1 năm (giữ giờ làm cố định), năng suất tăng thêm 1.46 đơn vị.
> - $\beta_2 = 0.46$: khi số giờ làm tăng 1 giờ/tuần (giữ tuổi nghề cố định), năng suất tăng thêm 0.46 đơn vị.
> - $\beta_0 = -18.54$: hệ số chặn (không có ý nghĩa thực tế ở đây vì không ai có tuổi nghề và số giờ làm bằng 0).

---

## 💻 Minh họa Python

```python
import numpy as np
from sklearn.linear_model import LinearRegression

# Dữ liệu VD3
X_raw = np.array([[2, 40], [3, 45], [4, 48], [5, 50], [6, 52]], dtype=float)
Y = np.array([3, 6, 10, 12, 14], dtype=float)

# --- Cách 1: Công thức ma trận thủ công ---
n = len(Y)
X = np.column_stack([np.ones(n), X_raw])   # thêm cột 1 cho beta_0
beta = np.linalg.solve(X.T @ X, X.T @ Y)  # (X'X)^{-1} X'Y, tránh dùng inv() trực tiếp
print("beta:", beta.round(4))              # [-18.5385  1.4615  0.4615]
print("Dự đoán x1=7, x2=52:", beta @ [1, 7, 52])   # ≈ 15.69

# --- Cách 2: scikit-learn ---
model = LinearRegression().fit(X_raw, Y)
print("sklearn intercept:", model.intercept_, "coefs:", model.coef_)
print("Dự đoán sklearn:", model.predict([[7, 52]])[0])

# Kiểm tra X'X
print("X'X:\n", (X.T @ X).astype(int))
print("X'Y:", (X.T @ Y).astype(int))
```

---

[⬅ Trước: Hồi quy tuyến tính đơn biến](02_hoi_quy_tuyen_tinh_don_bien.md) · [Mục lục](README.md) · [Tiếp: Hồi quy phi tuyến & Gradient Descent ➡](04_hoi_quy_phi_tuyen_gradient_descent.md)
