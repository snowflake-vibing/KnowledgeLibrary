# 4. Hồi quy Logistic (Logistic Regression)

[⬅ Trước: Thuật toán Gradient Descent](03_thuat_toan_gradient_descent.md) · [Mục lục](README.md) · [Tiếp: Hồi quy Softmax ➡](05_hoi_quy_softmax.md)

---

## 4.1. Ví dụ mở đầu & Động lực của Hồi quy Logistic

### 4.1.1. Bài toán dự đoán kết quả thi của sinh viên
Quan sát 20 sinh viên dành thời gian $x$ (giờ) cho việc ôn thi và kết quả thi $y \in \{0, 1\}$ ($y = 1$: thi đạt / Pass, $y = 0$: không đạt / Not pass):

| STT | Hours ($x$) | Pass ($y$) | STT | Hours ($x$) | Pass ($y$) |
|---|---|---|---|---|---|
| 1 | 0.50 | 0 | 11 | 2.75 | 1 |
| 2 | 0.75 | 0 | 12 | 3.00 | 0 |
| 3 | 1.00 | 0 | 13 | 3.25 | 1 |
| 4 | 1.25 | 0 | 14 | 3.50 | 0 |
| 5 | 1.50 | 0 | 15 | 4.00 | 1 |
| 6 | 1.75 | 0 | 16 | 4.25 | 1 |
| 7 | 1.75 | 1 | 17 | 4.50 | 1 |
| 8 | 2.00 | 0 | 18 | 4.75 | 1 |
| 9 | 2.25 | 1 | 19 | 5.00 | 1 |
| 10 | 2.50 | 0 | 20 | 5.50 | 1 |

**Câu hỏi đặt ra:** *Nếu một sinh viên có thời gian ôn thi là $x^* = 4.1$ giờ thì có thi đạt không? Thời gian ôn thi ảnh hưởng thế nào đến khả năng vượt qua kỳ thi?*

### 4.1.2. Tại sao không dùng được Hồi quy tuyến tính?
Khi biểu diễn tập dữ liệu trên đồ thị phân tán, các điểm chỉ nằm trên hai đường thẳng nằm ngang $y = 0$ và $y = 1$:
- Đường thẳng hồi quy tuyến tính $\hat{y} = \theta_0 + \theta_1 x$ có thể cho giá trị dự đoán **nhỏ hơn $0$** (khi $x$ nhỏ) hoặc **lớn hơn $1$** (khi $x$ lớn), không mang ý nghĩa xác suất.
- Đường thẳng tuyến tính rất nhạy cảm với các điểm ngoại lai (outliers) và không phản ánh đúng bản chất chuyển trạng thái mượt từ $0$ sang $1$.
- **Giải pháp:** Thay thế đường thẳng bằng một **đường cong chữ S (hàm Sigmoid)** bị chặn trong khoảng $(0, 1)$ để ước lượng xác suất thuộc lớp $y = 1$.

---

## 4.2. Xây dựng mô hình Hồi quy Logistic

### 4.2.1. Từ xác suất có điều kiện đến hàm Sigmoid
Với giá trị đầu vào $x^*$, theo công thức Bayes và xác suất có điều kiện, xác suất sinh viên thuộc nhóm $y = 1$ (thi đạt) khi biết $x^*$ là:

$$P(y \mid x^*) = \frac{P(x^*, y)}{P(x^*)} = \frac{P(y)P(x^* \mid y)}{P(y)P(x^* \mid y) + P(\bar{y})P(x^* \mid \bar{y})} = \frac{1}{1 + \dfrac{P(\bar{y})P(x^* \mid \bar{y})}{P(y)P(x^* \mid y)}} \qquad (1)$$

Đặt đại lượng tỉ số log-hợp lý:
$$\alpha = \ln \frac{P(y)P(x^* \mid y)}{P(\bar{y})P(x^* \mid \bar{y})} \implies P(y \mid x^*) = \frac{1}{1 + e^{-\alpha}} = \sigma(\alpha) \qquad (2)$$

Trong đó hàm số:
$$\sigma(\alpha) = \frac{1}{1 + e^{-\alpha}} \in (0, 1)$$
được gọi là **hàm Sigmoid** (hay hàm Logistic).

Xấp xỉ tuyến tính $\alpha$ theo các biến đầu vào $\alpha = \theta_0 + \theta_1 x_1 + \dots + \theta_{n-1} x_{n-1} = \boldsymbol{\theta}^T \mathbf{x}$, ta có **mô hình hồi quy Logistic**:

$$P(y = 1 \mid \mathbf{x}) = \hat{p} = \frac{1}{1 + e^{-(\theta_0 + \theta_1 x_1 + \dots + \theta_{n-1} x_{n-1})}} = \frac{1}{1 + e^{-\boldsymbol{\theta}^T \mathbf{x}}} \qquad (3, 5)$$

### 4.2.2. Tỉ lệ Odds và Hàm Logit
Gọi $p = P(Y = 1 \mid \mathbf{x})$ là xác suất sự kiện $Y$ xảy ra:
- **Tỉ lệ cược (Odds ratio):** $\dfrac{p}{1 - p}$ là tỉ số giữa xác suất sự kiện **xảy ra** ($p$) và xác suất sự kiện **không xảy ra** ($1 - p$).
- **Hàm Logit (Log-odds):** Logarit tự nhiên của tỉ lệ odds là một tổ hợp tuyến tính của các thuộc tính:
  $$\text{logit}(p) = \ln\left(\frac{p}{1 - p}\right) = \theta_0 + \theta_1 x_1 + \dots + \theta_{n-1} x_{n-1} + \varepsilon = \boldsymbol{\theta}^T \mathbf{x} + \varepsilon \qquad (4)$$

### 4.2.3. Biên quyết định (Decision Boundary) và Quy tắc phân lớp
Từ công thức $\hat{p} = \sigma(\boldsymbol{\theta}^T \mathbf{x}) = \dfrac{1}{1 + e^{-\boldsymbol{\theta}^T \mathbf{x}}}$, ta có các tính chất:
- Nếu $\boldsymbol{\theta}^T \mathbf{x} \to +\infty$ thì $\hat{p} \to 1$.
- Nếu $\boldsymbol{\theta}^T \mathbf{x} \to -\infty$ thì $\hat{p} \to 0$.
- Nếu $\boldsymbol{\theta}^T \mathbf{x} = 0$ thì $\hat{p} = \dfrac{1}{1 + e^0} = 0.5$.

Phương trình siêu phẳng **$\boldsymbol{\theta}^T \mathbf{x} = 0$** chia không gian đặc trưng thành 2 nửa và được gọi là **biên quyết định (Decision Boundary)** trong bài toán phân loại nhị phân:

$$\hat{y} = \begin{cases} 0 & \text{nếu } \hat{p} < 0.5 \quad (\text{hay } \boldsymbol{\theta}^T \mathbf{x} < 0) \\ 1 & \text{nếu } \hat{p} \ge 0.5 \quad (\text{hay } \boldsymbol{\theta}^T \mathbf{x} \ge 0) \end{cases} \qquad (6)$$

**Minh họa trên bộ dữ liệu hoa Iris (nhận diện loài *Iris-Virginica*):**
- **Với 1 thuộc tính (`Petal width`):** Biên quyết định là một điểm ngưỡng $x \approx 1.6\text{ cm}$ (tại đó hai đường cong xác suất $P(\text{Iris-Virginica})$ và $P(\text{Not Iris-Virginica})$ cắt nhau ở mức $0.5$). Nếu độ rộng cánh hoa $> 1.6\text{ cm}$ thì phân loại là *Iris-Virginica*.
- **Với 2 thuộc tính (`Petal length` và `Petal width`):** Biên quyết định $\theta_0 + \theta_1 x_1 + \theta_2 x_2 = 0$ là một **đường thẳng** trên mặt phẳng 2D; các đường thẳng song song với nó biểu diễn các mức xác suất không đổi ($0.15, 0.30, 0.50, 0.75, 0.90\dots$).

---

## 4.3. Hàm mất mát (Log Loss) & Tối ưu hóa mô hình

### 4.3.1. Xây dựng hàm mất mát từ Hợp lý cực đại (MLE)
Tại một điểm dữ liệu thứ $i$, đặt $\hat{p}^{(i)} = \sigma(\boldsymbol{\theta}^T \mathbf{x}^{(i)})$. Vì nhãn $y^{(i)} \in \{0, 1\}$ tuân theo phân phối Bernoulli, xác suất nhận giá trị $y^{(i)}$ có thể viết gộp thành:

$$P\left(y^{(i)} \mid \boldsymbol{\theta}, \mathbf{x}^{(i)}\right) = \left(\hat{p}^{(i)}\right)^{y^{(i)}} \left(1 - \hat{p}^{(i)}\right)^{1 - y^{(i)}} \qquad (7)$$
*(Kiểm tra: nếu $y^{(i)} = 1$ thì $P = \hat{p}^{(i)}$; nếu $y^{(i)} = 0$ thì $P = 1 - \hat{p}^{(i)}$).*

Với toàn bộ tập huấn luyện gồm $m$ mẫu độc lập, theo **phương pháp ước lượng hợp lý cực đại (Maximum Likelihood Estimation – MLE)**, ta chọn $\boldsymbol{\theta}$ sao cho cực đại hóa hàm hợp lý:

$$\boldsymbol{\theta} = \arg\max_{\boldsymbol{\theta}} P(\mathbf{y} \mid \boldsymbol{\theta}, \mathbf{X}) = \arg\max_{\boldsymbol{\theta}} \prod_{i=1}^{m} \left(\hat{p}^{(i)}\right)^{y^{(i)}} \left(1 - \hat{p}^{(i)}\right)^{1 - y^{(i)}} \qquad (8)$$

Lấy logarit hai vế để chuyển tích thành tổng, chia trung bình cho $m$ và **đổi dấu** để chuyển bài toán cực đại thành bài toán **cực tiểu hàm mất mát (Log Loss / Binary Cross-Entropy)**:

$$J(\boldsymbol{\theta}) = -\frac{1}{m} \sum_{i=1}^{m} \left[ y^{(i)} \log\left(\hat{p}^{(i)}\right) + \left(1 - y^{(i)}\right) \log\left(1 - \hat{p}^{(i)}\right) \right] \qquad (9)$$

### 4.3.2. Đạo hàm hàm Sigmoid và Vector Gradient của hàm mất mát

**Bước 1: Đạo hàm của hàm Sigmoid $\sigma(s) = \dfrac{1}{1 + e^{-s}}$:**

$$\begin{aligned}
\sigma'(s) &= \frac{e^{-s}}{(1 + e^{-s})^2} = \frac{1}{1 + e^{-s}} \cdot \frac{e^{-s}}{1 + e^{-s}} \qquad (10) \\
&= \sigma(s)\big(1 - \sigma(s)\big) \qquad (11)
\end{aligned}$$

**Bước 2: Đạo hàm hàm mất mát tại 1 điểm dữ liệu:**
Xét mất mát tại 1 mẫu (với $\hat{p}^{(i)} = \sigma(s^{(i)})$ và $s^{(i)} = \boldsymbol{\theta}^T \mathbf{x}^{(i)}$):
$$J^{(i)}(\boldsymbol{\theta}) = -\left[ y^{(i)} \ln \hat{p}^{(i)} + \left(1 - y^{(i)}\right) \ln\left(1 - \hat{p}^{(i)}\right) \right]$$

Áp dụng quy tắc đạo hàm hàm hợp theo $\theta_j$ (biết $\dfrac{\partial \hat{p}^{(i)}}{\partial \theta_j} = \hat{p}^{(i)}(1 - \hat{p}^{(i)}) x_j^{(i)}$):
$$\begin{aligned}
\frac{\partial J^{(i)}(\boldsymbol{\theta})}{\partial \theta_j} &= -\left[ \frac{y^{(i)}}{\hat{p}^{(i)}} - \frac{1 - y^{(i)}}{1 - \hat{p}^{(i)}} \right] \hat{p}^{(i)}\left(1 - \hat{p}^{(i)}\right) x_j^{(i)} \\
&= -\left[ y^{(i)}\left(1 - \hat{p}^{(i)}\right) - \left(1 - y^{(i)}\right)\hat{p}^{(i)} \right] x_j^{(i)} \\
&= \left( \hat{p}^{(i)} - y^{(i)} \right) x_j^{(i)}
\end{aligned}$$

**Bước 3: Đạo hàm riêng trên toàn bộ tập huấn luyện (dùng cho Batch GD):**

$$\frac{\partial J(\boldsymbol{\theta}; \mathbf{x}, \mathbf{y})}{\partial \theta_j} = \frac{1}{m} \sum_{i=1}^{m} \left[ \sigma\left(\boldsymbol{\theta}^T \mathbf{x}^{(i)}\right) - y^{(i)} \right] x_j^{(i)} \qquad (12)$$

**Bước 4: Công thức véc-tơ gradient tại 1 điểm dữ liệu (dùng cho Stochastic GD):**

$$\frac{\partial J\left(\boldsymbol{\theta}; \mathbf{x}^{(i)}, y^{(i)}\right)}{\partial \boldsymbol{\theta}} = \left[ \sigma\left(\boldsymbol{\theta}^T \mathbf{x}^{(i)}\right) - y^{(i)} \right] \mathbf{x}^{(i)} \qquad (13)$$

> 💡 Hàm mất mát $J(\boldsymbol{\theta})$ của hồi quy Logistic là một **hàm lồi (convex)**, do đó Gradient Descent (hoặc L-BFGS, Newton-Raphson) luôn tìm được nghiệm cực tiểu toàn cục!

---

## 4.4. Thực hành Python & Giải chi tiết bài tập cuối chương

### 4.4.1. Thực hành giải bài toán 20 sinh viên ôn thi ($x^* = 4.1$ giờ)
Dữ liệu từ bảng ví dụ mở đầu (Slide 4 & Slide 17):

```python
import numpy as np
import pandas as pd
import statsmodels.api as sm
from sklearn.linear_model import LogisticRegression

# Dữ liệu 20 sinh viên: Hours (x) và Pass (y)
hours = np.array([0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 1.75, 2.0, 2.25, 2.5,
                  2.75, 3.0, 3.25, 3.5, 4.0, 4.25, 4.5, 4.75, 5.0, 5.5]).reshape(-1, 1)
passed = np.array([0, 0, 0, 0, 0, 0, 1, 0, 1, 0,
                   1, 0, 1, 0, 1, 1, 1, 1, 1, 1])

# 1. Tính các hệ số hồi quy Logistic bằng statsmodels (MLE chuẩn không phạt)
X_sm = sm.add_constant(hours)
logit_model = sm.Logit(passed, X_sm).fit()
print(logit_model.summary())

theta_0, theta_1 = logit_model.params
print(f"\nPhương trình Logit: ln(p/(1-p)) = {theta_0:.4f} + {theta_1:.4f} * Hours")
print(f"Biên quyết định (p = 0.5): Hours = {-theta_0 / theta_1:.4f} giờ")

# 2. Dự báo cho sinh viên học x* = 4.1 giờ
x_star = 4.1
prob_pass = logit_model.predict([1, x_star])[0]
print(f"Với x* = {x_star} giờ -> Xác suất đậu p = {prob_pass:.4f} ({prob_pass*100:.2f}%) -> Kết luận: {'ĐẠT (1)' if prob_pass >= 0.5 else 'KHÔNG ĐẠT (0)'}")
```

**Kết quả tính toán chính xác:**
- Hệ số ước lượng MLE (không quy tắc hóa):
  $$\hat{\theta}_0 = -4.0777, \qquad \hat{\theta}_1 = 1.5046$$
- Biên quyết định ($\hat{p} = 0.5$): $x = \dfrac{4.0777}{1.5046} \approx \mathbf{2.71\text{ giờ}}$.
- Với sinh viên ôn thi **$x^* = 4.1$ giờ**:
  $$\boldsymbol{\theta}^T \mathbf{x}^* = -4.0777 + 1.5046 \times 4.1 = 2.0913 \implies \hat{p} = \frac{1}{1 + e^{-2.0913}} \approx \mathbf{0.8901} \ (89.01\%)$$
  Vì $\hat{p} = 0.8901 \ge 0.5$, dự báo sinh viên này **THI ĐẠT ($y = 1$)**.

---

### 4.4.2. Giải Bài tập 1, 2, 3 (Slide 18–19)

#### Câu 1: Sự khác biệt cơ bản giữa Hồi quy tuyến tính và Hồi quy Logistic là gì?

| Tiêu chí | Hồi quy tuyến tính (Linear Regression) | Hồi quy Logistic (Logistic Regression) |
|----------|----------------------------------------|----------------------------------------|
| **Loại bài toán** | **Hồi quy (Regression):** Dự báo biến mục tiêu có giá trị số thực liên tục ($y \in \mathbb{R}$). | **Phân lớp (Classification):** Dự báo xác suất và nhãn phân loại rời rạc ($y \in \{0, 1\}$). |
| **Hàm dự báo** | Hàm tuyến tính: $\hat{y} = \boldsymbol{\theta}^T \mathbf{x} \in (-\infty, +\infty)$. | Hàm Sigmoid: $\hat{p} = \sigma(\boldsymbol{\theta}^T \mathbf{x}) = \dfrac{1}{1 + e^{-\boldsymbol{\theta}^T \mathbf{x}}} \in (0, 1)$. |
| **Hàm mất mát** | Trung bình bình phương sai số (**MSE**): $J(\boldsymbol{\theta}) = \frac{1}{2m}\sum (\hat{y}^{(i)} - y^{(i)})^2$. | **Log Loss (Binary Cross-Entropy)** dựa trên Hợp lý cực đại (MLE). |
| **Phương pháp tìm nghiệm** | Có cả **công thức nghiệm đóng** $(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$ lẫn Gradient Descent. | Không có công thức nghiệm đóng, phải giải bằng tối ưu lặp (GD, Newton-Raphson, L-BFGS). |

---

#### Câu 2: Dự báo sinh viên nặng $62\text{ kg}$ có thích môn Machine Learning không?
- **Dữ liệu ($m = 12$ sinh viên):**
  - Không thích ($y = 0$, `no`): $X \in \{50, 51, 55, 61, 63\}$
  - Thích ($y = 1$, `yes`): $X \in \{59, 60, 65, 70, 73, 75, 80\}$

```python
import numpy as np
import statsmodels.api as sm
from sklearn.linear_model import LogisticRegression

X_weight = np.array([60, 55, 61, 70, 59, 65, 80, 63, 50, 75, 73, 51]).reshape(-1, 1)
y_like   = np.array([ 1,  0,  0,  1,  1,  1,  1,  0,  0,  1,  1,  0])

# Huấn luyện mô hình Logistic Regression
clf = LogisticRegression(penalty=None)
clf.fit(X_weight, y_like)

theta0 = clf.intercept_[0]
theta1 = clf.coef_[0, 0]
prob_62 = clf.predict_proba([[62]])[0, 1]

print(f"Phương trình: logit(p) = {theta0:.4f} + {theta1:.4f} * X")
print(f"Ngưỡng cân nặng (p = 0.5): X = {-theta0/theta1:.2f} kg")
print(f"Xác suất SV nặng 62kg thích ML: p = {prob_62:.4f} -> Dự báo: {'Yes (Thích)' if prob_62 >= 0.5 else 'No (Không thích)'}")
```

- **Kết quả:**
  - Phương trình ước lượng: $\ln\left(\dfrac{p}{1-p}\right) = -20.5922 + 0.3396 X$.
  - Biên quyết định ($\hat{p} = 0.5$): $X = \dfrac{20.5922}{0.3396} \approx \mathbf{60.63\text{ kg}}$.
  - Với sinh viên nặng **$X = 62\text{ kg}$**:
    $$\hat{p}(X=62) = \frac{1}{1 + e^{-(-20.5922 + 0.3396 \times 62)}} = \frac{1}{1 + e^{-0.4648}} \approx \mathbf{0.6142} \ (61.42\% \ge 50\%)$$
    $\Rightarrow$ Dự báo sinh viên nặng $62\text{ kg}$ **THÍCH môn Máy học (`yes`)**.

---

#### Câu 3: Xây dựng mô hình hồi quy Logistic trên tập dữ liệu `PlayTennis`
Với dữ liệu định danh (categorical features: `Outlook`, `Temp`, `Humidity`, `Wind`), ta mã hóa One-Hot Encoding trước khi đưa vào `LogisticRegression`:

```python
import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline

data = [
    ["Sunny", "Hot", "High", "Weak", "No"],
    ["Sunny", "Hot", "High", "Strong", "No"],
    ["Overcast", "Hot", "High", "Weak", "Yes"],
    ["Rain", "Mild", "High", "Weak", "Yes"],
    ["Rain", "Cool", "Normal", "Weak", "Yes"],
    ["Rain", "Cool", "Normal", "Strong", "No"],
    ["Overcast", "Cool", "Normal", "Strong", "Yes"],
    ["Sunny", "Mild", "High", "Weak", "No"],
    ["Sunny", "Cool", "Normal", "Weak", "Yes"],
    ["Rain", "Mild", "Normal", "Weak", "Yes"],
    ["Sunny", "Mild", "Normal", "Strong", "Yes"],
    ["Overcast", "Mild", "High", "Strong", "Yes"],
    ["Overcast", "Hot", "Normal", "Weak", "Yes"],
    ["Rain", "Mild", "High", "Strong", "No"],
]
columns = ["Outlook", "Temp", "Humidity", "Wind", "PlayTennis"]
df_tennis = pd.DataFrame(data, columns=columns)

X_tennis = df_tennis[["Outlook", "Temp", "Humidity", "Wind"]]
y_tennis = (df_tennis["PlayTennis"] == "Yes").astype(int)

model_tennis = make_pipeline(
    OneHotEncoder(drop="first"),
    LogisticRegression()
)
model_tennis.fit(X_tennis, y_tennis)
print("Độ chính xác trên tập huấn luyện PlayTennis:", model_tennis.score(X_tennis, y_tennis))
```

---

[⬅ Trước: Thuật toán Gradient Descent](03_thuat_toan_gradient_descent.md) · [Mục lục](README.md) · [Tiếp: Hồi quy Softmax ➡](05_hoi_quy_softmax.md)
