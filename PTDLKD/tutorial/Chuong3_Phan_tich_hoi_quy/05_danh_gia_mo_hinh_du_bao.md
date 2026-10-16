# 5. Đánh giá mô hình dự báo

[⬅ Trước: Hồi quy phi tuyến & Gradient Descent](04_hoi_quy_phi_tuyen_gradient_descent.md) · [Mục lục](README.md)

---

## 5.1. Tổng quan các tiêu chí

Đánh giá mô hình hồi quy tập trung vào **khả năng dự báo** (không phải tốc độ hay khả năng mở rộng).

| Nhóm | Độ đo |
|------|-------|
| **Sai số tuyệt đối** | SAE, MAE, MAPE |
| **Bình phương sai số** | SSE, MSE, RMSE, MSLE, RMSLE |
| **R-squared** | RRSE, RAE, $R^2$, Adjusted $R^2$ |

**Ký hiệu dùng trong cả chương:**

| Ký hiệu | Ý nghĩa |
|---------|---------|
| $Y_i$ | Giá trị thực tế của quan sát thứ $i$ |
| $\hat{Y}_i$ | Giá trị dự đoán của quan sát thứ $i$ |
| $\bar{Y}$ | Giá trị trung bình của $Y$ |
| $n$ | Số lượng quan sát |

---

## 5.2. Các tiêu chí dựa trên sai số tuyệt đối

### SAE – Sum of Absolute Errors (Tổng sai số tuyệt đối)

$$SAE = \sum_{i=1}^{n} \left|Y_i - \hat{Y}_i\right| \qquad (28)$$

| ✅ Ưu điểm | ❌ Nhược điểm |
|-----------|--------------|
| Dễ hiểu, cung cấp cái nhìn tổng quan | Không phân biệt sai số nhỏ và lớn (không phạt nặng outliers) |
| Không tính đến dấu của sai số | Không có ngưỡng "tốt" tuyệt đối; phụ thuộc vào đơn vị dữ liệu |

---

### MAE – Mean Absolute Error (Trung bình sai số tuyệt đối)

$$MAE = \frac{1}{n}\sum_{i=1}^{n} \left|Y_i - \hat{Y}_i\right| \qquad (29)$$

| ✅ Ưu điểm | ❌ Nhược điểm |
|-----------|--------------|
| Dễ hiểu, cùng đơn vị với $Y$ | Không phạt nặng các outliers (sai số lớn) |
| Robust hơn MSE với outliers | Không có ngưỡng tuyệt đối |

---

### MAPE – Mean Absolute Percentage Error (Trung bình phần trăm sai số tuyệt đối)

$$MAPE = \frac{100\%}{n}\sum_{i=1}^{n} \left|\frac{Y_i - \hat{Y}_i}{Y_i}\right| \qquad (30)$$

| ✅ Ưu điểm | ❌ Nhược điểm |
|-----------|--------------|
| Không phụ thuộc đơn vị, dễ so sánh giữa các bài toán khác nhau | Không xác định được khi $Y_i = 0$ |
| Dễ hiểu vì thể hiện sai số dưới dạng % | Có thể thiên lệch khi $Y_i$ rất nhỏ |

---

## 5.3. Các tiêu chí dựa trên bình phương sai số

### SSE – Sum of Squared Errors (Tổng bình phương sai số)

$$SSE = \sum_{i=1}^{n} \left(Y_i - \hat{Y}_i\right)^2 \qquad (31)$$

- Tăng trọng số của sai số lớn (bình phương hoá).
- Được dùng trong bình phương tối thiểu (OLS).
- Ảnh hưởng mạnh bởi outliers.

---

### MSE – Mean Squared Error (Trung bình bình phương sai số)

$$MSE = \frac{1}{n}\sum_{i=1}^{n} \left(Y_i - \hat{Y}_i\right)^2 \qquad (32)$$

| ✅ Ưu điểm | ❌ Nhược điểm |
|-----------|--------------|
| Phạt nặng sai số lớn (hữu ích nếu cần tránh sai số lớn) | Nhạy cảm với outliers |
| Khả vi (differentiable) – dễ tối ưu bằng GD | Đơn vị là bình phương đơn vị của $Y$, khó diễn giải trực tiếp |
| Nếu MSE quá cao: mô hình có thể bị **underfitting** hoặc **overfitting** | |

---

### RMSE – Root Mean Squared Error

$$RMSE = \sqrt{MSE} = \sqrt{\frac{1}{n}\sum_{i=1}^{n} \left(Y_i - \hat{Y}_i\right)^2} \qquad (33)$$

- Cùng đơn vị với dữ liệu gốc → dễ diễn giải hơn MSE.
- Vẫn nhạy cảm với outliers.
- Được dùng rộng rãi nhất trong hồi quy.

---

### MSLE – Mean Squared Logarithmic Error

$$MSLE = \frac{1}{n}\sum_{i=1}^{n} \left(\log(1 + Y_i) - \log(1 + \hat{Y}_i)\right)^2 \qquad (34)$$

- Hữu ích khi dữ liệu có phạm vi lớn hoặc phân phối lệch (*skewed*).
- Ít bị ảnh hưởng bởi outliers hơn MSE/RMSE.
- Phù hợp khi quan tâm đến **sai số tương đối** (tỷ lệ) hơn sai số tuyệt đối.

---

### RMSLE – Root Mean Squared Logarithmic Error

$$RMSLE = \sqrt{\frac{1}{n}\sum_{i=1}^{n} \left(\log(1 + Y_i) - \log(1 + \hat{Y}_i)\right)^2} \qquad (35)$$

- Cùng đơn vị với dữ liệu (sau khi lấy log), dễ so sánh hơn MSLE.
- Phù hợp khi quan tâm đến **sự khác biệt tỷ lệ** (thay vì tuyệt đối).

---

## 5.4. Các tiêu chí dựa trên R-squared

### RRSE – Relative Root Squared Error

$$RRSE = \sqrt{\frac{\sum_{i=1}^{n}(Y_i - \hat{Y}_i)^2}{\sum_{i=1}^{n}(Y_i - \bar{Y})^2}} \qquad (36)$$

- So sánh lỗi dự đoán với **phương sai** của dữ liệu thực tế.
- Giúp so sánh mô hình trên các tập dữ liệu khác quy mô.
- Giá trị càng lớn, mô hình càng kém.

---

### RAE – Relative Absolute Error

$$RAE = \frac{\sum_{i=1}^{n}\left|Y_i - \hat{Y}_i\right|}{\sum_{i=1}^{n}\left|Y_i - \bar{Y}\right|} \qquad (37)$$

- Chuẩn hoá sai số tuyệt đối so với tổng độ biến động của dữ liệu.
- Giá trị < 1: mô hình tốt hơn dự đoán bằng trung bình.
- Giá trị càng lớn, độ chính xác càng kém.

---

### $R^2$ – Hệ số xác định (Coefficient of Determination)

$$R^2 = 1 - \frac{SSE}{SST} = 1 - \frac{\sum_{i=1}^{n}(Y_i - \hat{Y}_i)^2}{\sum_{i=1}^{n}(Y_i - \bar{Y})^2} \qquad (38)$$

- $SST = \sum(Y_i - \bar{Y})^2$: tổng bình phương toàn phần (*Total Sum of Squares*).
- $R^2$ đo **tỷ lệ biến thiên của $Y$ được mô hình giải thích**.
- $R^2 = 1$: mô hình giải thích hoàn toàn; $R^2 = 0$: không khác gì đoán bằng $\bar{Y}$.

| Giá trị $R^2$ | Ý nghĩa |
|---|---|
| $= 1$ | Mô hình khớp hoàn hảo |
| $\geq 0.5$ | Chấp nhận được (theo slide) |
| $= 0$ | Mô hình không giải thích được gì |
| $< 0$ | Mô hình tệ hơn đoán bằng $\bar{Y}$ (outliers hoặc phi tuyến) |

| ✅ Ưu điểm | ❌ Nhược điểm |
|-----------|--------------|
| Dễ diễn giải, không phụ thuộc đơn vị | **Không giảm khi thêm biến** vào mô hình, dù biến mới không có ý nghĩa → dẫn đến overfitting |
| Thích hợp cho hồi quy tuyến tính | Không phản ánh mức độ sai số cụ thể; $R^2$ cao không đồng nghĩa dự đoán chính xác |
| | Outliers có thể làm $R^2$ sai lệch |

---

### Adjusted $R^2$ – Hệ số xác định điều chỉnh

$$Adjusted\,R^2 = 1 - \frac{(1 - R^2)(n - 1)}{n - p - 1} \qquad (39)$$

- $n$: số lượng quan sát
- $p$: số lượng biến độc lập trong mô hình

| ✅ Ưu điểm | ❌ Nhược điểm |
|-----------|--------------|
| Điều chỉnh theo số biến và độ phức tạp → ngăn overfitting | Vẫn có thể bị ảnh hưởng bởi outliers |
| **Giảm** khi thêm biến không liên quan; **tăng** khi thêm biến liên quan | Chỉ phù hợp cho hồi quy tuyến tính |
| So sánh các mô hình có số biến khác nhau chính xác hơn $R^2$ | |

> 💡 Khi so sánh hai mô hình với **số biến khác nhau**, dùng **Adjusted $R^2$** thay vì $R^2$ thường.

---

## 5.5. Bảng tóm tắt tất cả độ đo

| Độ đo | Công thức | Đơn vị | Càng nhỏ/lớn thì... |
|-------|-----------|--------|---------------------|
| SAE | $\sum\lvert e_i\rvert$ | Đơn vị Y | Càng **nhỏ** càng tốt |
| MAE | $\frac{1}{n}\sum\lvert e_i\rvert$ | Đơn vị Y | Càng **nhỏ** càng tốt |
| MAPE | $\frac{100\%}{n}\sum\lvert e_i/Y_i\rvert$ | % | Càng **nhỏ** càng tốt |
| SSE | $\sum e_i^2$ | Đơn vị Y² | Càng **nhỏ** càng tốt |
| MSE | $\frac{1}{n}\sum e_i^2$ | Đơn vị Y² | Càng **nhỏ** càng tốt |
| RMSE | $\sqrt{MSE}$ | Đơn vị Y | Càng **nhỏ** càng tốt |
| MSLE | $\frac{1}{n}\sum(\log(1+Y)-\log(1+\hat{Y}))^2$ | – | Càng **nhỏ** càng tốt |
| RMSLE | $\sqrt{MSLE}$ | – | Càng **nhỏ** càng tốt |
| RRSE | $\sqrt{SSE/SST}$ | – | Càng **nhỏ** càng tốt |
| RAE | $\sum\lvert e_i\rvert / \sum\lvert Y_i - \bar{Y}\rvert$ | – | Càng **nhỏ** càng tốt |
| $R^2$ | $1 - SSE/SST$ | – | Càng **lớn** càng tốt ($\leq 1$) |
| Adjusted $R^2$ | $1-(1-R^2)(n-1)/(n-p-1)$ | – | Càng **lớn** càng tốt |

với $e_i = Y_i - \hat{Y}_i$, $SST = \sum(Y_i - \bar{Y})^2$.

---

## 📝 Bài tập tổng hợp cuối chương

Dữ liệu: tuổi nghề $x$ (năm) và năng suất lao động $y$ (triệu đồng) của 11 công nhân trong một công ty.

| STT | A | B | C | D | E | F | G | H | I | K | L |
|-----|---|---|---|---|---|---|---|---|---|---|---|
| $x$ (năm) | 1 | 1 | 3 | 4 | 5 | 7 | 8 | 9 | 10 | 11 | 12 |
| $y$ (triệu) | 2 | 3 | 12 | 9 | 16 | 12 | 21 | 21 | 24 | 19 | 27 |

**Yêu cầu:**
- **(a)** Tính hệ số tương quan giữa tuổi nghề và năng suất lao động, rút ra kết luận.
- **(b)** Xác định phương trình hồi quy tuyến tính đơn biến để dự đoán năng suất của công nhân có tuổi nghề 6 năm.
- **(c)** Tính RMSE và $R^2$ của mô hình hồi quy vừa tìm được.

<details>
<summary><b>Xem lời giải</b></summary>

**Bảng tính các tổng:**

| | $\sum x$ | $\sum y$ | $\sum xy$ | $\sum x^2$ | $\sum y^2$ |
|--|--|--|--|--|--|
| **Giá trị** | 71 | 166 | 1371 | 611 | 3186 |

$n = 11$, $\bar{x} = 71/11 \approx 6.4545$, $\bar{y} = 166/11 \approx 15.0909$

---

**Câu (a): Hệ số tương quan Pearson**

$$r = \frac{n\sum xy - \sum x\sum y}{\sqrt{n\sum x^2 - (\sum x)^2}\ \sqrt{n\sum y^2 - (\sum y)^2}}$$

$$= \frac{11 \times 1371 - 71 \times 166}{\sqrt{11 \times 611 - 71^2}\ \sqrt{11 \times 3186 - 166^2}} = \frac{15081 - 11786}{\sqrt{6721 - 5041}\ \sqrt{35046 - 27556}} = \frac{3295}{\sqrt{1680}\ \sqrt{7490}}$$

$$= \frac{3295}{40.988 \times 86.544} = \frac{3295}{3547.77} \approx \mathbf{0.9289}$$

**Kết luận:** $r = 0.9289 > 0$, rất gần 1 → tuổi nghề và năng suất lao động **tương quan thuận, rất chặt chẽ**: tuổi nghề càng cao thì năng suất lao động càng cao.

---

**Câu (b): Phương trình hồi quy**

$$SS_{XX} = 611 - \frac{71^2}{11} = 611 - 458.27 = 152.727$$

$$SS_{XY} = 1371 - \frac{71 \times 166}{11} = 1371 - 1071.45 = 299.545$$

$$\beta_1 = \frac{SS_{XY}}{SS_{XX}} = \frac{299.545}{152.727} \approx 1.9613$$

$$\beta_0 = \bar{y} - \beta_1\bar{x} = 15.0909 - 1.9613 \times 6.4545 \approx 2.4315$$

$$\Rightarrow \hat{Y} = 2.4315 + 1.9613\,x$$

**Dự đoán** với $x = 6$:

$$\hat{Y} = 2.4315 + 1.9613 \times 6 = 2.4315 + 11.7678 \approx \mathbf{14.20}\ \text{triệu đồng}$$

---

**Câu (c): RMSE và $R^2$**

Tính $\hat{Y}_i$ và sai số cho từng quan sát:

| x | y | $\hat{Y}$ | $e = y - \hat{Y}$ | $e^2$ | $(y - \bar{y})^2$ |
|---|---|---|---|---|---|
| 1 | 2 | 4.393 | -2.393 | 5.726 | 170.908 |
| 1 | 3 | 4.393 | -1.393 | 1.940 | 145.822 |
| 3 | 12 | 10.315 | 1.685 | 2.838 | 9.578 |
| 4 | 9 | 12.276 | -3.276 | 10.733 | 37.008 |
| 5 | 16 | 14.238 | 1.762 | 3.104 | 0.826 |
| 7 | 12 | 18.160 | -6.160 | 37.946 | 9.578 |
| 8 | 21 | 20.122 | 0.878 | 0.771 | 35.652 |
| 9 | 21 | 22.083 | -1.083 | 1.173 | 35.652 |
| 10 | 24 | 24.045 | -0.045 | 0.002 | 79.744 |
| 11 | 19 | 26.006 | -7.006 | 49.088 | 15.826 |
| 12 | 27 | 27.967 | -0.967 | 0.935 | 140.826 |
| **Tổng** | | | | **SSE = 93.256** | **SST = 681.422** |

$$SSE = \sum e_i^2 \approx 93.41, \qquad SST = \sum(y_i - \bar{y})^2 \approx 680.91$$

$$RMSE = \sqrt{\frac{SSE}{n}} = \sqrt{\frac{93.41}{11}} = \sqrt{8.492} \approx \mathbf{2.914}\ \text{triệu đồng}$$

$$R^2 = 1 - \frac{SSE}{SST} = 1 - \frac{93.41}{680.91} \approx 1 - 0.1372 \approx \mathbf{0.8628}$$

**Kết luận:** Mô hình giải thích được **86.28%** sự biến thiên của năng suất lao động. Đây là mức khá tốt ($R^2 > 0.5$). RMSE ≈ 2.91 triệu đồng.

</details>

---

## 💻 Minh họa Python

```python
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import warnings; warnings.filterwarnings('ignore')

x = np.array([1, 1, 3, 4, 5, 7, 8, 9, 10, 11, 12], dtype=float)
y = np.array([2, 3, 12, 9, 16, 12, 21, 21, 24, 19, 27], dtype=float)
n = len(y)

model = LinearRegression().fit(x.reshape(-1, 1), y)
y_hat = model.predict(x.reshape(-1, 1))

# Hệ số tương quan
r = np.corrcoef(x, y)[0, 1]

# Các độ đo
mae   = mean_absolute_error(y, y_hat)
mse   = mean_squared_error(y, y_hat)
rmse  = np.sqrt(mse)
mape  = np.mean(np.abs((y - y_hat) / y)) * 100
r2    = r2_score(y, y_hat)

SSE = np.sum((y - y_hat)**2)
SST = np.sum((y - y.mean())**2)
rrse = np.sqrt(SSE / SST)
rae  = np.sum(np.abs(y - y_hat)) / np.sum(np.abs(y - y.mean()))

adj_r2 = 1 - (1 - r2) * (n - 1) / (n - 1 - 1)    # p = 1 biến

msle  = np.mean((np.log1p(y) - np.log1p(y_hat))**2)
rmsle = np.sqrt(msle)

print(f"r (Pearson)    = {r:.4f}")
print(f"β0 = {model.intercept_:.4f}, β1 = {model.coef_[0]:.4f}")
print(f"Dự đoán x=6    = {model.predict([[6]])[0]:.4f} triệu đồng")
print()
print(f"MAE    = {mae:.4f}")
print(f"MAPE   = {mape:.2f}%")
print(f"MSE    = {mse:.4f}")
print(f"RMSE   = {rmse:.4f}")
print(f"MSLE   = {msle:.4f}")
print(f"RMSLE  = {rmsle:.4f}")
print(f"RRSE   = {rrse:.4f}")
print(f"RAE    = {rae:.4f}")
print(f"R²     = {r2:.4f}")
print(f"Adj R² = {adj_r2:.4f}")
```

**Kết quả mong đợi:**
```
r (Pearson)    = 0.9289
β0 = 2.4315, β1 = 1.9613
Dự đoán x=6    = 14.1994 triệu đồng

MAE    = 2.5418
MAPE   = 24.56%
MSE    = 8.4916
RMSE   = 2.9141
R²     = 0.8628
Adj R² = 0.8476
```

---

[⬅ Trước: Hồi quy phi tuyến & Gradient Descent](04_hoi_quy_phi_tuyen_gradient_descent.md) · [Mục lục](README.md)
