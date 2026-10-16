# 2. Hồi quy tuyến tính đơn biến (Simple Linear Regression)

[⬅ Trước: Giới thiệu về hồi quy](01_gioi_thieu_hoi_quy.md) · [Mục lục](README.md) · [Tiếp: Hồi quy tuyến tính đa biến ➡](03_hoi_quy_tuyen_tinh_da_bien.md)

---

## 2.1. Mục tiêu

- Xác định **phương trình hồi quy tuyến tính** biểu diễn mối quan hệ giữa biến phụ thuộc và **một** biến độc lập:

$$\hat{Y} = \beta_0 + \beta_1 X \qquad (13)$$

- $\beta_0$: **tham số chặn** (*intercept*), là giá trị của $\hat{Y}$ khi $X = 0$.
- $\beta_1$: **hệ số góc** (*slope*), là mức thay đổi của $\hat{Y}$ khi $X$ tăng 1 đơn vị.

Ví dụ: dự đoán mức lương (*Salary*) theo số giờ làm việc (*Working hours*).

Có 3 cách tìm bộ tham số $(\beta_0, \beta_1)$ sao cho sai số giữa giá trị dự đoán và giá trị thực tế nhỏ nhất:
1. Phương pháp "thử và sai" (*trial-and-error*)
2. **Bình phương tối thiểu** (*Least Squares*)
3. Tối ưu bằng giải thuật **Gradient Descent**, xem [phần 4](04_hoi_quy_phi_tuyen_gradient_descent.md)

---

## 2.2. Hàm sai số SSE

$$SSE = \sum_{i=1}^{n}\left(Y_i - \hat{Y}_i\right)^2 = \sum_{i=1}^{n}\left(Y_i - (\beta_0 + \beta_1 X_i)\right)^2 \qquad (14)$$

- $\hat{Y}_i$: giá trị dự đoán (ước lượng) của biến phụ thuộc
- $Y_i$: giá trị thực tế (quan sát được) của biến phụ thuộc

---

## 2.3. Phương pháp bình phương tối thiểu (Least Squares)

Cần tìm $\beta_0, \beta_1$ để **SSE nhỏ nhất**, tức đạo hàm riêng của SSE theo $\beta_0$ và $\beta_1$ bằng 0:

$$\frac{\partial SSE}{\partial \beta_0} = -2\sum_{i=1}^{n}\left(Y_i - \beta_0 - \beta_1 X_i\right) = 0$$

$$\frac{\partial SSE}{\partial \beta_1} = -2\sum_{i=1}^{n}X_i\left(Y_i - \beta_0 - \beta_1 X_i\right) = 0$$

Từ đó ta được **hệ phương trình chuẩn** (*normal equations*):

$$
\begin{cases}
n\beta_0 + \beta_1 \sum X_i = \sum Y_i \\
\beta_0 \sum X_i + \beta_1 \sum X_i^2 = \sum X_i Y_i
\end{cases} \qquad (15)
$$

### Cách 1: Giải bằng ma trận

Đặt $a = n,\ b = \sum X_i,\ c = \sum X_i,\ d = \sum X_i^2,\ e = \sum Y_i,\ f = \sum X_i Y_i$. Hệ (15) trở thành:

$$
\begin{cases}
a\beta_0 + b\beta_1 = e \\
c\beta_0 + d\beta_1 = f
\end{cases}
\iff A\beta = B \qquad (16)
$$

với $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$, $B = \begin{bmatrix} e \\ f \end{bmatrix}$, $\beta = \begin{bmatrix} \beta_0 \\ \beta_1 \end{bmatrix}$. Suy ra:

$$\beta = A^{-1}B$$

với $A^{-1}$ là ma trận nghịch đảo của $A$.

### Cách 2: Công thức trực tiếp

$$
\begin{cases}
\beta_1 = \dfrac{n\sum X_i Y_i - \sum X_i \sum Y_i}{n\sum X_i^2 - \left(\sum X_i\right)^2} \\[4mm]
\beta_0 = \dfrac{\sum Y_i - \beta_1 \sum X_i}{n} = \bar{Y} - \beta_1 \bar{X}
\end{cases} \qquad (17)
$$

Dạng gọn dùng **tổng bình phương hiệu chỉnh** (*corrected sum of squares*):

$$\beta_1 = \frac{SS_{XY}}{SS_{XX}}, \qquad \beta_0 = \bar{Y} - \beta_1\bar{X}$$

với:
- $SS_{XY} = \sum X_i Y_i - \dfrac{\sum X_i \sum Y_i}{n}$: tổng bình phương hiệu chỉnh của tích chéo XY
- $SS_{XX} = \sum X_i^2 - \dfrac{\left(\sum X_i\right)^2}{n}$: tổng bình phương hiệu chỉnh của X

### Cách 3: Dạng theo giá trị trung bình

$$\beta_1 = \frac{\sum X_i Y_i - n\bar{X}\bar{Y}}{\sum X_i^2 - n\bar{X}^2} \qquad (18)$$

$$\beta_1 = \frac{\sum (X_i - \bar{X})(Y_i - \bar{Y})}{\sum (X_i - \bar{X})^2}, \qquad \beta_0 = \bar{Y} - \beta_1\bar{X} \qquad (19)$$

> 💡 Cả 3 cách cho **cùng một kết quả**. Từ công thức $\beta_0 = \bar{Y} - \beta_1\bar{X}$ suy ra đường hồi quy luôn đi qua điểm trung bình $(\bar{X}, \bar{Y})$.
>
> Liên hệ với Pearson: $\beta_1 = r_{X,Y}\dfrac{\sigma_Y}{\sigma_X}$.

---

## 📝 Ví dụ áp dụng

Dữ liệu tuổi nghề $x$ (năm) và năng suất lao động $y$ (triệu đồng) của 11 công nhân (lấy từ bài tập cuối chương):

| x | 1 | 1 | 3 | 4 | 5 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| y | 2 | 3 | 12 | 9 | 16 | 12 | 21 | 21 | 24 | 19 | 27 |

Các tổng cần tính: $n = 11$, $\sum x = 71$, $\sum y = 166$, $\sum xy = 1371$, $\sum x^2 = 611$.

**Theo cách 2:**

$$SS_{XY} = 1371 - \frac{71 \times 166}{11} = 299.545, \qquad SS_{XX} = 611 - \frac{71^2}{11} = 152.727$$

$$\beta_1 = \frac{299.545}{152.727} = 1.9613, \qquad \beta_0 = \frac{166}{11} - 1.9613 \times \frac{71}{11} = 2.4315$$

$$\Rightarrow \hat{Y} = 2.4315 + 1.9613X$$

Công nhân có tuổi nghề 6 năm: $\hat{Y} = 2.4315 + 1.9613 \times 6 \approx 14.20$ triệu đồng.

---

## 💻 Minh họa Python

```python
import numpy as np
from sklearn.linear_model import LinearRegression

x = np.array([1, 1, 3, 4, 5, 7, 8, 9, 10, 11, 12], dtype=float)
y = np.array([2, 3, 12, 9, 16, 12, 21, 21, 24, 19, 27], dtype=float)
n = len(x)

# Cách 1: ma trận A*beta = B
A = np.array([[n, x.sum()], [x.sum(), (x**2).sum()]])
B = np.array([y.sum(), (x*y).sum()])
print("Cách 1:", np.linalg.solve(A, B))

# Cách 3: theo trung bình
b1 = ((x - x.mean()) * (y - y.mean())).sum() / ((x - x.mean())**2).sum()
b0 = y.mean() - b1 * x.mean()
print("Cách 3:", b0, b1)

# scikit-learn
model = LinearRegression().fit(x.reshape(-1, 1), y)
print("sklearn:", model.intercept_, model.coef_[0], "| dự đoán x=6:", model.predict([[6]])[0])
```

---

[⬅ Trước: Giới thiệu về hồi quy](01_gioi_thieu_hoi_quy.md) · [Mục lục](README.md) · [Tiếp: Hồi quy tuyến tính đa biến ➡](03_hoi_quy_tuyen_tinh_da_bien.md)
