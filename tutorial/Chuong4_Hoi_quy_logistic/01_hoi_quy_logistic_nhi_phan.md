# 1. Hồi quy Logistic nhị phân

[⬅ Mục lục](README.md) · [Tiếp: Ước lượng MLE ➡](02_uoc_luong_hop_ly_toi_da.md)

---

## 1.0. Linear Regression vs Logistic Regression

Ví dụ câu hỏi nghiên cứu cho từng mô hình:

| Mô hình | Câu hỏi ví dụ |
|---------|---------------|
| **Simple Linear Regression** | Thời gian làm việc hàng tuần có ảnh hưởng đến tiền lương theo giờ của nhân viên? |
| **Multiple Linear Regression** | Trình độ học vấn, thời gian làm việc hàng tuần và độ tuổi có ảnh hưởng đến tiền lương theo giờ? |
| **Logistic Regression** | Thời gian làm việc hàng tuần và độ tuổi có ảnh hưởng đến **khả năng có nguy cơ bị kiệt sức hay không**? |

So sánh theo thang đo:

| Mô hình | Số biến độc lập | Thang đo biến phụ thuộc | Thang đo biến độc lập |
|---------|-----------------|--------------------------|------------------------|
| Simple Linear Regression | 1 | numeric | numeric, ordinal, nominal |
| Multiple Linear Regression | nhiều | numeric | numeric, ordinal, nominal |
| **Logistic Regression** | 1 / nhiều | **ordinal, nominal** | numeric, ordinal, nominal |

**Ví dụ**: số giờ học (*Learning hours*) và kết quả thi đậu (*Pass Exam*: 1 = đậu, 0 = rớt)

| Learning hours | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 1.75 | 1.75 | 2.75 | 3 | 3.25 | 3.5 | 4 | 4.25 | 4.5 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Pass Exam | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 1 | 0 | 1 | 0 | 1 | 1 | 1 |

> Biến phụ thuộc chỉ nhận giá trị 0/1. Nếu dùng đường thẳng hồi quy tuyến tính, giá trị dự đoán có thể < 0 hoặc > 1, không phải là xác suất. Hồi quy logistic khắc phục điều này bằng **đường cong hình chữ S (sigmoid)**.

---

## 1.1. Hồi quy Logistic

### Bài toán phân lớp dữ liệu
- Dự đoán **nhãn lớp** (discrete hoặc nominal).
- Xây dựng mô hình phân lớp dựa trên **tập huấn luyện** và nhãn lớp, sau đó dùng mô hình để phân lớp cho dữ liệu mới.

### Định nghĩa
**Hồi quy Logistic** là mô hình thống kê dùng để **phân loại nhị phân**, tức dự đoán một đối tượng thuộc một trong hai lớp (class, label).

- **Đầu vào**: các biến độc lập $x = \{x_1, x_2, \dots, x_m\}$
- **Đầu ra**: nhãn dự đoán $\hat{y} \in \{0, 1\}$
- **Multiclass Logistic Regression**: $\hat{y} \in C$, với $C = \{c_1, c_2, \dots, c_j\}$

### Ý tưởng
Hồi quy logistic tiếp nối ý tưởng của hồi quy tuyến tính cho bài toán phân loại: **đầu ra của hàm tuyến tính được đưa vào hàm Sigmoid** để thu được xác suất. Hàm Sigmoid chỉ dùng cho phân loại nhị phân (1, 0).

**Hàm Sigmoid:**

$$\sigma(z) = \frac{1}{1 + e^{-z}} \qquad (1)$$

**Hồi quy Logistic:**

$$p(class = 1 \mid X; \beta) = \sigma(\beta^T X) = h_\beta(X) = \frac{1}{1 + e^{-\beta^T X}}, \quad p \in [0, 1] \qquad (2)$$

**Hồi quy tuyến tính** (phần bên trong sigmoid):

$$\hat{y} = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \dots + \beta_m x_m = \beta^T X \qquad (3)$$

**Quy tắc phân lớp** (ngưỡng 0.5):

$$
\hat{y} =
\begin{cases}
1 & \text{nếu } p(class = 1 \mid X; \beta) > 0.5 \iff \beta^T X > 0 \\
0 & \text{ngược lại} \iff \beta^T X \le 0
\end{cases}
$$

> 💡 Vì $\sigma(0) = 0.5$ nên **ranh giới quyết định** (decision boundary) chính là siêu phẳng $\beta^T X = 0$.

---

## 1.2. Hàm Logit

- Logit dùng để liên kết đầu ra của mô hình tuyến tính, nằm trong $(-\infty, +\infty)$, với xác suất trong khoảng $[0, 1]$.
- Trong hồi quy logistic, **Logit là logarit của tỷ lệ cược (odds)**:

$$Logit = \log\left(\frac{p}{1 - p}\right) \qquad (4)$$

| Đại lượng | Miền giá trị | Ý nghĩa |
|-----------|--------------|---------|
| $p$ | $[0, 1]$ | Xác suất sự kiện xảy ra, $p(class = 1)$ |
| $\dfrac{p}{1-p}$ | $[0, +\infty)$ | **Odds** – tỷ lệ giữa xác suất xảy ra và không xảy ra |
| $\log\dfrac{p}{1-p}$ | $(-\infty, +\infty)$ | **Log-odds** – cho phép dùng mô hình tuyến tính để dự đoán logit thay vì dự đoán trực tiếp $p$ |

Hồi quy logistic dùng mô hình tuyến tính để dự đoán **logit (log-odds)**:

$$Logit = \beta_0 + \beta_1 x_1 + \beta_2 x_2 + \dots + \beta_m x_m = \beta^T X \qquad (5)$$

Sau đó chuyển logit trở lại thành xác suất bằng **hàm sigmoid (hàm logistic)**:

$$p(class = 1 \mid X; \beta) = h_\beta(X) = \frac{1}{1 + e^{-Logit}}, \quad p \in [0, 1] \qquad (6)$$

> 💡 **Diễn giải hệ số**: khi $x_j$ tăng 1 đơn vị (các biến khác giữ nguyên), log-odds tăng $\beta_j$, tức **odds được nhân lên $e^{\beta_j}$ lần** (odds ratio).

---

## 1.3. Hàm Likelihood

### Phân phối Bernoulli
Xác suất xảy ra của một sự kiện:

$$
p(y = k) =
\begin{cases}
p & \text{nếu } k = 1 \\
1 - p & \text{nếu } k = 0
\end{cases} \qquad (7)
$$

Gộp cả hai trường hợp {0, 1} vào một công thức:

$$p(y = k) = p^k (1 - p)^{1 - k} \qquad (8)$$

### Áp dụng cho hồi quy logistic
Xác suất của điểm dữ liệu $x^{(i)}$ theo hàm sigmoid:

$$
\begin{cases}
p(y^{(i)} = 1 \mid x^{(i)}; \beta) = \sigma(\beta^T x^{(i)}) \\
p(y^{(i)} = 0 \mid x^{(i)}; \beta) = 1 - \sigma(\beta^T x^{(i)})
\end{cases} \qquad (9)
$$

Gộp cả hai trường hợp:

$$p(y^{(i)} \mid x^{(i)}; \beta) = \left[\sigma(\beta^T x^{(i)})\right]^{y^{(i)}} \times \left[1 - \sigma(\beta^T x^{(i)})\right]^{1 - y^{(i)}} \qquad (10)$$

### Hàm hợp lý (Likelihood)
Giả sử các quan sát độc lập, xác suất của toàn bộ $n$ quan sát là:

$$L(\beta) = P(y \mid X; \beta) = \prod_{i=1}^{n} \left[\sigma(\beta^T x^{(i)})\right]^{y^{(i)}} \left[1 - \sigma(\beta^T x^{(i)})\right]^{1 - y^{(i)}} \qquad (11)$$

- $L(\beta)$ đo **mức độ hợp lý (goodness of fit)** của mô hình đối với dữ liệu.
- $L(\beta)$ càng lớn càng tốt: mẫu có class = 1 thì xác suất dự đoán gần 1, mẫu có class = 0 thì xác suất gần 0.
- 🎯 **Mục tiêu:** tìm $\beta$ để **hàm hợp lý đạt giá trị lớn nhất**, xem tiếp ở [phần 2](02_uoc_luong_hop_ly_toi_da.md).

---

## 💻 Minh họa Python

```python
import numpy as np
from sklearn.linear_model import LogisticRegression

hours = np.array([0.5, 0.75, 1, 1.25, 1.5, 1.75, 1.75, 2.75, 3, 3.25, 3.5, 4, 4.25, 4.5]).reshape(-1, 1)
passed = np.array([0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1])

model = LogisticRegression().fit(hours, passed)
b0, b1 = model.intercept_[0], model.coef_[0][0]
print(f"Logit = {b0:.3f} + {b1:.3f} * hours")
print("Odds ratio:", np.exp(b1))           # odds được nhân lên bao nhiêu khi học thêm 1 giờ
print("P(pass | 3 giờ) =", model.predict_proba([[3]])[0, 1])
```

---

[⬅ Mục lục](README.md) · [Tiếp: Ước lượng MLE ➡](02_uoc_luong_hop_ly_toi_da.md)
