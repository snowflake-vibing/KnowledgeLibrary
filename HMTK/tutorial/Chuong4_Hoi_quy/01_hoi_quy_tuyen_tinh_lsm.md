# 1. Hồi quy tuyến tính & Phương pháp bình phương bé nhất (LSM)

[⬅ Mục lục](README.md) · [Tiếp: Hồi quy tuyến tính quy tắc hóa ➡](02_hoi_quy_quy_tac_hoa_ridge_lasso_elastic_net.md)

---

## 1.1. Giới thiệu về hàm hồi quy

### 1.1.1. Hồi quy là gì?
Khái niệm **hồi quy (Regression)** dùng để mô tả mối quan hệ thống kê giữa các biến. Để đọc được mối liên hệ giữa biến độc lập $X$ và biến phụ thuộc $Y$, đồng thời dự đoán được $Y$ khi biết giá trị của $X$, người ta thực hiện theo các bước:

1. **Biểu diễn đám mây điểm:** Biểu diễn mỗi quan sát $(x_i, y_i)$ bởi một điểm trên mặt phẳng tọa độ — gọi là **đồ thị phân tán (Scatter plot)**.
2. **Xây dựng đường hồi quy:** "Vẽ" một đường cong để mô tả mối quan hệ giữa hai đại lượng và dùng nó để dự đoán xu hướng cũng như giá trị của $Y$ khi biết $X$. Đường cong như vậy được gọi là **đường hồi quy** (hay *đường cong xấp xỉ*).

> 💡 Thuật toán hồi quy tuyến tính thuộc nhóm **Học có giám sát (Supervised Learning)**.

### 1.1.2. Cách chọn hàm hồi quy
Việc chọn hàm hồi quy tùy thuộc vào hình dáng của đám mây điểm trên đồ thị phân tán:
- **Tương quan tuyến tính thuận / nghịch:** Đường thẳng $y = a + bx$ (với $b > 0$ hoặc $b < 0$).
- **Hồi quy bậc hai:** Đường parabol $y = a + bx + cx^2$.
- **Không tương quan:** Đám mây điểm phân bố ngẫu nhiên không có xu hướng rõ rệt.

Các hàm có dạng xác định với bộ hệ số $a, b, c, \dots$ thuộc **họ hồi quy có tham số (parametric regression)**. Phương pháp chọn đường cong gọi là *phương pháp hồi quy*, còn phương trình của đường cong gọi là *phương trình hồi quy*.

### 1.1.3. Tại sao chọn mô hình tuyến tính? (Kỹ thuật "Tuyến tính hóa")
Bằng các phép biến đổi đại số hoặc đặt biến phụ, nhiều đường cong phi tuyến theo biến đầu vào có thể được **"tuyến tính hóa"** để đưa về mô hình tuyến tính:

1. **Đa thức bậc 2 dạng bình phương:**
   $$y = a + bx + cx^2 = A + B(C + Dx)^2$$
   Đặt biến mới $X = (C + Dx)^2$, ta thu được phương trình tuyến tính đơn biến:
   $$y = A + BX$$

2. **Đa thức bậc 2 tổng quát (Đưa về siêu phẳng đa biến):**
   $$y = a + bx + cx^2$$
   Đặt biến phụ $x_1 = x$ và $x_2 = x^2$, ta thu được phương trình mặt phẳng tuyến tính theo tham số:
   $$y = a + bx_1 + cx_2$$

3. **Hàm mũ (Exponential):**
   $$y = a^{b + cx} \quad (a > 0, y > 0)$$
   Lấy logarit tự nhiên ($\ln$) hai vế:
   $$\ln y = (b + cx)\ln a = (b\ln a) + (c\ln a)x$$
   Đặt $Y = \ln y$, $A = b\ln a$, $B = c\ln a$, ta thu được phương trình tuyến tính:
   $$Y = A + Bx$$

---

## 1.2. Phương pháp bình phương bé nhất – Least Squares Method (LSM)

### 1.2.1. Nguyên lý LSM và Hàm mất mát
- Xác định trước dạng của hàm hồi quy: $y = E(Y \mid X = x) = f(x)$.
- Với mỗi quan sát thực tế $(x^{(i)}, y^{(i)})$, gọi $\varepsilon_i = y^{(i)} - f(x^{(i)})$ là **độ lệch (sai số / phần dư – residual)** giữa giá trị quan sát thực tế và giá trị dự đoán bởi hàm hồi quy.
- Đặt **hàm mất mát (Loss function)** — còn gọi là tổng bình phương sai số:
  $$L = \sum_{i} \varepsilon_i^2 = \sum_{i} \left[ y^{(i)} - f\left(x^{(i)}\right) \right]^2 \qquad (1)$$
- **Mục tiêu của LSM:** Chọn bộ tham số của mô hình sao cho tổng bình phương sai số $L$ đạt giá trị **bé nhất**.

### 1.2.2. Hiện tượng quá khớp (Overfitting)
> ⚠️ **Mô hình quá khớp với dữ liệu (Overfitting a model):**
> Nếu ta cố chọn hàm hồi quy bậc quá cao sao cho hàm mất mát $L = 0$ (tức là đường cong hồi quy đi qua tất cả các điểm dữ liệu huấn luyện), thì có vô số đường cong phức tạp thỏa mãn điều này. Khi đó, đường cong bị uốn lượn theo nhiễu, làm mất đi xu hướng tổng quát của dữ liệu và khiến việc dự đoán trên dữ liệu mới ($x^*$) trở nên sai lệch nghiêm trọng.

---

## 1.3. Mô hình hồi quy tuyến tính đa biến & Công thức nghiệm ma trận

### 1.3.1. Biểu diễn véc-tơ và Ma trận thiết kế (Design Matrix)
Giả sử biến đáp ứng $y$ phụ thuộc vào $n - 1$ biến độc lập (hay *thuộc tính / features*) $x_1, x_2, \dots, x_{n-1}$. Mô hình hồi quy tuyến tính đa biến có dạng:

$$\hat{y}(\mathbf{x}, \boldsymbol{\theta}) = \theta_0 + \theta_1 x_1 + \dots + \theta_{n-1} x_{n-1} = \boldsymbol{\theta}^T \begin{bmatrix} 1 \\ \mathbf{x}^- \end{bmatrix} = \boldsymbol{\theta}^T \mathbf{x} \qquad (2)$$

Trong đó:
- $\mathbf{x}^- = [x_1, x_2, \dots, x_{n-1}]^T \in \mathbb{R}^{n-1}$ là véc-tơ biến đầu vào ($n-1$ thuộc tính).
- $\mathbf{x} = [1, x_1, x_2, \dots, x_{n-1}]^T \in \mathbb{R}^n$ là véc-tơ đầu vào mở rộng (thêm $x_0 = 1$ ứng với hệ số chặn $\theta_0$).
- $\boldsymbol{\theta} = [\theta_0, \theta_1, \dots, \theta_{n-1}]^T \in \mathbb{R}^n$ là véc-tơ tham số (trọng số) của mô hình.

Với tập huấn luyện gồm $m$ cặp dữ liệu quan sát $(\mathbf{x}^{(i)}, y^{(i)})$ ($i = \overline{1, m}$), ta biểu diễn dưới dạng **ma trận mẫu (ma trận thiết kế – Design Matrix)** $\mathbf{X} \in \mathbb{R}^{m \times n}$ và véc-tơ đáp ứng $\mathbf{y} \in \mathbb{R}^m$:

$$\mathbf{X} = \begin{bmatrix} (\mathbf{x}^{(1)})^T \\ (\mathbf{x}^{(2)})^T \\ \vdots \\ (\mathbf{x}^{(m)})^T \end{bmatrix} = \begin{bmatrix} 1 & x_1^{(1)} & \dots & x_{n-1}^{(1)} \\ 1 & x_1^{(2)} & \dots & x_{n-1}^{(2)} \\ \vdots & \vdots & \ddots & \vdots \\ 1 & x_1^{(m)} & \dots & x_{n-1}^{(m)} \end{bmatrix}, \qquad \mathbf{y} = \begin{bmatrix} y^{(1)} \\ y^{(2)} \\ \vdots \\ y^{(m)} \end{bmatrix} \qquad (3)$$

> 📌 **Quy ước cấu trúc ma trận $\mathbf{X}$:** Mỗi mẫu dữ liệu huấn luyện xếp theo **hàng** ($m$ hàng) và các thuộc tính xếp theo **cột** ($n$ cột, cột đầu tiên toàn số $1$).

### 1.3.2. Hàm mất mát chuẩn hóa $J(\boldsymbol{\theta})$
Để xác định tham số $\boldsymbol{\theta}$ theo phương pháp bình phương bé nhất, ta cực tiểu hóa hàm mất mát (Cost function):

$$J(\boldsymbol{\theta}) = \frac{1}{2m} \sum_{i=1}^{m} \left(\hat{y}^{(i)} - y^{(i)}\right)^2 = \frac{1}{2m} \sum_{i=1}^{m} \left(\boldsymbol{\theta}^T \mathbf{x}^{(i)} - y^{(i)}\right)^2 = \frac{1}{2m} \|\mathbf{X}\boldsymbol{\theta} - \mathbf{y}\|_2^2 \qquad (4)$$

**Tại sao chia cho $2$ và $m$?**
- **Chia cho $2$:** Nhằm triệt tiêu hệ số $2$ sinh ra khi lấy đạo hàm bậc nhất của hàm bình phương, giúp biểu thức gradient gọn hơn.
- **Chia cho $m$:** Tính trung bình trên kích thước mẫu để giảm sai số (tránh tràn số khi $m$ lớn) trong quá trình tính gần đúng.
- Đại lượng $2J(\boldsymbol{\theta}) = \frac{1}{m}\sum_{i=1}^m (\hat{y}^{(i)} - y^{(i)})^2$ chính là **MSE (Mean Squared Error)**.

### 1.3.3. Tổng quát hóa với hàm cơ sở (Basis Functions)
Mô hình hồi quy tuyến tính đa biến có thể mở rộng thông qua các **hàm cơ sở (basis functions)** $\varphi_i(\mathbf{x})$ (với $\varphi_0(\mathbf{x}) = 1$):

$$\hat{y}(\mathbf{x}, \boldsymbol{\theta}) = \theta_0 + \theta_1 \varphi_1(\mathbf{x}) + \dots + \theta_{n-1} \varphi_{n-1}(\mathbf{x}) = \sum_{i=0}^{n-1} \theta_i \varphi_i(\mathbf{x}) = \boldsymbol{\theta}^T \boldsymbol{\varphi}(\mathbf{x}) \qquad (5, 6)$$

Hồi quy tuyến tính thông thường tương ứng với trường hợp đặc biệt khi chọn $\boldsymbol{\varphi}(\mathbf{x}) = \mathbf{x}$.

### 1.3.4. Công thức nghiệm chuẩn (Normal Equation)
Tham số ước lượng $\hat{\boldsymbol{\theta}}$ làm cực tiểu hàm mất mát:

$$\hat{\boldsymbol{\theta}} = \arg\min_{\boldsymbol{\theta}} J(\boldsymbol{\theta}) \qquad (7)$$

Giải phương trình đạo hàm $\nabla_{\boldsymbol{\theta}} J(\boldsymbol{\theta}) = \frac{1}{m}\mathbf{X}^T(\mathbf{X}\boldsymbol{\theta} - \mathbf{y}) = \mathbf{0}$, ta thu được **công thức nghiệm chuẩn (Normal Equation)**:

$$\hat{\boldsymbol{\theta}} = \left(\mathbf{X}^T \mathbf{X}\right)^{-1} \mathbf{X}^T \mathbf{y} \qquad (8)$$

**Nhận xét về công thức nghiệm $(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$:**
- **Ưu điểm:** Tính trực tiếp ra nghiệm chính xác chỉ trong 1 bước mà không cần chọn tốc độ học ($\eta$) hay lặp nhiều lần; không cần chuẩn hóa thang đo thuộc tính (feature scaling).
- **Nhược điểm:**
  1. Đòi hỏi ma trận $\mathbf{X}^T\mathbf{X}$ phải **khả nghịch** (nếu số mẫu $m < n$ hoặc có các thuộc tính phụ thuộc tuyến tính / đa cộng tuyến hoàn hảo thì $\mathbf{X}^T\mathbf{X}$ suy biến, không có nghịch đảo thông thường).
  2. Độ phức tạp tính nghịch đảo ma trận cấp $n \times n$ là $\mathcal{O}(n^{2.4})$ đến $\mathcal{O}(n^3)$ — rất chậm khi số thuộc tính $n$ lớn (ví dụ $n > 10{,}000$).

### 1.3.5. 📝 Ví dụ mô phỏng tính toán ma trận từng bước
**Đề bài:** Lập phương trình hồi quy tuyến tính của $Y$ theo $X$ từ tập huấn luyện gồm 4 điểm:
$$(x_i, y_i) \in \{(147, 49), (150, 53), (153, 51), (160, 54)\}$$

**Lời giải chi tiết:**

1. **Lập ma trận thiết kế $\mathbf{X}$ và véc-tơ đáp ứng $\mathbf{y}$:**
   $$\mathbf{X} = \begin{bmatrix} 1 & 147 \\ 1 & 150 \\ 1 & 153 \\ 1 & 160 \end{bmatrix}, \qquad \mathbf{y} = \begin{bmatrix} 49 \\ 53 \\ 51 \\ 54 \end{bmatrix}$$

2. **Tính các ma trận trung gian:**
   - Tổng các phần tử: $\sum x_i = 610$, $\sum x_i^2 = 147^2 + 150^2 + 153^2 + 160^2 = 93{,}118$.
   $$\mathbf{X}^T \mathbf{X} = \begin{bmatrix} 4 & 610 \\ 610 & 93118 \end{bmatrix}$$
   - Định thức: $\det(\mathbf{X}^T\mathbf{X}) = 4 \times 93118 - 610^2 = 372472 - 372100 = 372$.
   - Ma trận nghịch đảo (rút gọn tử và mẫu cho $2$, với $372 / 2 = 186$):
   $$\left(\mathbf{X}^T \mathbf{X}\right)^{-1} = \frac{1}{186} \begin{bmatrix} 46559 & -305 \\ -305 & 2 \end{bmatrix}$$
   - Tích $\mathbf{X}^T \mathbf{y}$:
   $$\mathbf{X}^T \mathbf{y} = \begin{bmatrix} 49 + 53 + 51 + 54 \\ 147(49) + 150(53) + 153(51) + 160(54) \end{bmatrix} = \begin{bmatrix} 207 \\ 31596 \end{bmatrix}$$

3. **Thay vào công thức nghiệm $\hat{\boldsymbol{\theta}} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}$:**
   $$\hat{\boldsymbol{\theta}} = \frac{1}{186} \begin{bmatrix} 46559 \times 207 - 305 \times 31596 \\ -305 \times 207 + 2 \times 31596 \end{bmatrix} = \frac{1}{186} \begin{bmatrix} 933 \\ 57 \end{bmatrix} \approx \begin{bmatrix} 5.02 \\ 0.31 \end{bmatrix}$$

**Kết luận:** Phương trình hồi quy tuyến tính cần tìm là:
$$\hat{y} = 5.02 + 0.31x$$

---

## 1.4. Điều kiện sử dụng LSM & Đánh giá thống kê mô hình

### 1.4.1. Điều kiện sử dụng phương pháp LSM
Xét mô hình tuyến tính có nhiễu ngẫu nhiên $u$:
$$y(\mathbf{x}, \boldsymbol{\theta}) = \theta_0 + \theta_1 x_1 + \dots + \theta_{n-1} x_{n-1} + u = \boldsymbol{\theta}^T \mathbf{x} + u \qquad (9)$$

Để ước lượng LSM có tính chất thống kê tốt nhất (BLUE – Best Linear Unbiased Estimator) và thực hiện được các kiểm định $F, t$, sai số ngẫu nhiên $u$ cần thỏa mãn:
- $u \sim \mathcal{N}(0, \sigma^2)$ (phân phối chuẩn với kỳ vọng bằng $0$ và phương sai hằng số $\sigma^2$).
- $E(u_i) = 0$, $\text{cov}(u_i, u_j) = 0 \ (\forall i \neq j)$ (không có tự tương quan), $\text{var}(u_i) = \sigma^2 \ (\forall i)$ (phương sai đồng nhất – homoscedasticity).

### 1.4.2. Các tổng bình phương và Hệ số xác định $R^2$
Để đánh giá mức độ phụ thuộc tuyến tính (độ phù hợp của mô hình – *Goodness of fit*), ta phân rã biến thiên của $y$ thành 3 đại lượng:

| Ký hiệu | Tên tiếng Anh | Công thức | Ý nghĩa |
|---------|---------------|-----------|---------|
| **TSS** ($SS_{\text{TOT}}$) | Total Sum of Squares | $\sum_{i=1}^m (y_i - \bar{y})^2$ | Tổng bình phương tất cả sai lệch giữa giá trị quan sát $y_i$ và trung bình mẫu $\bar{y}$. |
| **ESS** ($SS_{\text{REG}}$) | Explained Sum of Squares | $\sum_{i=1}^m (\hat{y}_i - \bar{y})^2$ | Tổng bình phương sai lệch giữa giá trị dự đoán $\hat{y}_i$ và trung bình $\bar{y}$ (phần biến thiên giải thích được bởi mô hình). |
| **RSS** ($SS_{\text{ERR}}$) | Residual Sum of Squares | $\sum_{i=1}^m e_i^2 = \sum_{i=1}^m (y_i - \hat{y}_i)^2$ | Tổng bình phương sai số (phần dư không giải thích được bởi mô hình). |

Từ đẳng thức phân rã phương sai:
$$TSS = ESS + RSS \qquad (10)$$

Chia hai vế cho $TSS$, ta được **hệ số xác định $R^2$ (Coefficient of Determination)**:
$$R^2 = \frac{ESS}{TSS} = 1 - \frac{RSS}{TSS} \qquad (11)$$

- $R^2 \in [0, 1]$: $R^2$ càng cao (càng gần $1$) thì mô hình càng giải thích tốt biến động của biến phụ thuộc.
- **Ví dụ diễn giải:** $R^2 = 0.85$ cho biết các biến độc lập trong mô hình giải thích được **$85\%$** sự biến thiên của biến phụ thuộc $Y$, còn **$15\%$** còn lại là do các yếu tố ngẫu nhiên hoặc các biến chưa đưa vào mô hình gây ra.

### 1.4.3. Hệ số xác định hiệu chỉnh $\bar{R}^2$ (Adjusted R-squared)
Khi đưa thêm nhiều biến độc lập vào mô hình, $R^2$ luôn tăng (hoặc không giảm) ngay cả khi biến thêm vào không có ý nghĩa, trong khi **bậc tự do** giảm đi ($\text{df} = m - n$, với $m$ là cỡ mẫu và $n$ là tổng số hệ số của mô hình tính cả $\theta_0$). Để khắc phục, ta dùng **hệ số xác định hiệu chỉnh $\bar{R}^2$**:

$$\bar{R}^2 = 1 - \frac{RSS / (m - n)}{TSS / (m - 1)} = R^2 + (1 - R^2)\frac{1 - n}{m - n} \qquad (12)$$

- Một biến độc lập đưa thêm vào mô hình là **xác đáng** nếu nó làm **tăng $\bar{R}^2$** và hệ số hồi quy của nó khác $0$ có ý nghĩa thống kê.
- *Ghi chú:* $\bar{R}^2$ có thể nhận giá trị âm (khi mô hình quá kém và $n$ tiệm cận $m$), khi đó ta quy ước gán bằng $0$.

**Minh họa ảnh hưởng của số biến $k$ và cỡ mẫu đến $\text{Adj-}R^2$:**

| Số quan sát ($m$) | Số biến ($k$) | $R^2$ | $\text{Adj-}R^2$ | Nhận xét |
|---|---|---|---|---|
| 25 | 4 | 0.71 | 0.6520 | |
| 25 | 5 | 0.76 | 0.6968 | Tăng $\text{Adj-}R^2$ |
| 25 | 6 | 0.78 | **0.7067** | Đạt đỉnh $\text{Adj-}R^2$ |
| 25 | 7 | 0.79 | 0.7035 | $R^2$ tăng nhưng $\text{Adj-}R^2$ giảm (biến thứ 7 dư thừa) |
| 10 | 4 | 0.71 | 0.4780 | Cỡ mẫu nhỏ khiến $\text{Adj-}R^2$ bị phạt nặng |
| 10 | 7 | 0.79 | **0.0550** | Quá nhiều biến trên mẫu nhỏ làm mất bậc tự do |

### 1.4.4. Bảng phân tích phương sai (ANOVA) và Kiểm định $F$

#### a) Bảng ANOVA một biến ($n = 2$ tham số: $\theta_0, \theta_1$)
| Nguồn biến thiên (Source) | Tổng bình phương (Sum of Squares) | Bậc tự do (df) | Trung bình bình phương (Mean Squares) | Thống kê $F$ |
|---|---|---|---|---|
| **Model** (Hồi quy) | $SS_{\text{REG}} = \sum (\hat{y}_i - \bar{y})^2$ | $1$ | $MS_{\text{REG}} = SS_{\text{REG}}$ | $F = \dfrac{MS_{\text{REG}}}{MS_{\text{ERR}}}$ |
| **Error** (Sai số) | $SS_{\text{ERR}} = \sum (y_i - \hat{y}_i)^2$ | $m - 2$ | $MS_{\text{ERR}} = \dfrac{SS_{\text{ERR}}}{m - 2}$ | |
| **Total** (Tổng) | $SS_{\text{TOT}} = \sum (y_i - \bar{y})^2$ | $m - 1$ | | |

#### b) Bảng ANOVA nhiều biến ($n$ tham số, $n-1$ biến độc lập)
| Nguồn biến thiên (Source) | Tổng bình phương (dạng véc-tơ) | Bậc tự do (df) | Trung bình bình phương (Mean Squares) | Thống kê $F$ |
|---|---|---|---|---|
| **Model** (Hồi quy) | $SS_{\text{REG}} = (\hat{\mathbf{y}} - \bar{\mathbf{y}})^T(\hat{\mathbf{y}} - \bar{\mathbf{y}})$ | $n - 1$ | $MS_{\text{REG}} = \dfrac{SS_{\text{REG}}}{n - 1}$ | $F = \dfrac{MS_{\text{REG}}}{MS_{\text{ERR}}}$ |
| **Error** (Sai số) | $SS_{\text{ERR}} = (\mathbf{y} - \hat{\mathbf{y}})^T(\mathbf{y} - \hat{\mathbf{y}})$ | $m - n$ | $MS_{\text{ERR}} = \dfrac{SS_{\text{ERR}}}{m - n}$ | |
| **Total** (Tổng) | $SS_{\text{TOT}} = (\mathbf{y} - \bar{\mathbf{y}})^T(\mathbf{y} - \bar{\mathbf{y}})$ | $m - 1$ | | |

#### c) Kiểm định mức ý nghĩa toàn bộ mô hình (F-test)
Để kiểm tra xem toàn bộ mô hình hồi quy có ý nghĩa thống kê hay không ở mức ý nghĩa $\alpha$ (thường chọn $\alpha = 0.05$):
- **Giả thuyết $H_0$:** $\theta_1 = \theta_2 = \dots = \theta_{n-1} = 0$ (tất cả các hệ số góc đều bằng $0$, mô hình không có ý nghĩa).
- **Đối thuyết $H_1$:** $\exists\, i > 0$ sao cho $\theta_i \neq 0$ (có ít nhất một biến độc lập có tác động tuyến tính lên $Y$).
- **Thống kê kiểm định:** $F = \dfrac{MS_{\text{REG}}}{MS_{\text{ERR}}} \sim F(n - 1, m - n)$ (phân phối Fisher-Snedecor với bậc tự do $(n-1, m-n)$).
- **Quy tắc quyết định:** Nếu $\text{P-value (Prob(F-statistic))} < \alpha$ thì **bác bỏ $H_0$**, kết luận mô hình hồi quy có ý nghĩa thống kê.

### 1.4.5. Kiểm định giả thuyết từng hệ số của mô hình (t-test)
Để kiểm tra xem từng biến độc lập $x_i$ có thực sự có ý nghĩa thống kê hay không ở mức ý nghĩa $\alpha$:
- **Giả thuyết $H_0$:** $\theta_i = 0$ (biến $x_i$ không ảnh hưởng đến $Y$).
- **Đối thuyết $H_1$:** $\theta_i \neq 0$ (biến $x_i$ có ý nghĩa giải thích cho $Y$).
- **Thống kê kiểm định $t$:**
  $$t = \left| \frac{\theta_i}{S(\theta_i)} \right|, \qquad S(\theta_i) = \sqrt{\text{Var}(\boldsymbol{\theta})[i, i]} \qquad (13)$$
  Trong đó:
  - $\hat{\sigma}^2 = \dfrac{SS_{\text{ERR}}}{m - n}$ là ước lượng không chệch của phương sai sai số.
  - $\text{Var}(\boldsymbol{\theta}) = \hat{\sigma}^2 (\mathbf{X}^T\mathbf{X})^{-1}$ là ma trận hiệp phương sai của véc-tơ ước lượng $\hat{\boldsymbol{\theta}}$.
  - $S(\theta_i)$ là sai số chuẩn (**std err**) của hệ số $\theta_i$.
- **Quy tắc quyết định:**
  - Theo giá trị tới hạn: Tra bảng phân phối Student $t(m - n, \alpha)$. Nếu $t \ge t(m - n, \alpha)$ thì bác bỏ $H_0$.
  - Theo $\text{P-value}$ (trong Python):
    $$\text{P-value} = P(|T| \ge t) \qquad (14)$$
    Nếu $\text{P-value} \le \alpha$ (cột `P>|t|` $\le 0.05$) thì **bác bỏ $H_0$**, nghĩa là biến $x_i$ có ý nghĩa thống kê.

---

## 1.5. Thực hành với Python & Giải thích bảng `statsmodels` OLS

### 1.5.1. Giải thích các thông số trong bảng `OLS Regression Results` (BT1)

Đoạn chương trình phân tích hồi quy bằng thư viện `statsmodels`:

```python
import statsmodels.formula.api as smf
import pandas as pd
import numpy as np

# Đọc dữ liệu hoặc tạo dữ liệu mẫu
# xl = pd.ExcelFile('demo_data.xls')
# df = pd.read_excel(xl, 0, header=0)

np.random.seed(42)
X_val = np.linspace(0, 2, 100)
y_val = 4 + 3 * X_val + np.random.randn(100)
df = pd.DataFrame({'X': X_val, 'y': y_val})

results = smf.ols('y ~ X', data=df).fit()
print(results.summary())
```

**Ý nghĩa các thông số trong bảng kết quả `results.summary()`:**

1. **Khối thông tin mô hình (góc trên bên trái):**
   - `Dep. Variable`: Tên biến phụ thuộc ($y$).
   - `Model` / `Method`: Mô hình `OLS` (Ordinary Least Squares – Bình phương tối thiểu thông thường).
   - `No. Observations`: Kích thước mẫu $m$ (ví dụ: $100$).
   - `Df Residuals`: Bậc tự do của phần dư $m - n$ (ví dụ: $100 - 2 = 98$).
   - `Df Model`: Bậc tự do của mô hình $n - 1$ = số biến độc lập (ví dụ: $1$).

2. **Khối đánh giá độ phù hợp (góc trên bên phải):**
   - `R-squared`: Hệ số xác định $R^2$ (ví dụ: $0.733$ $\rightarrow$ giải thích $73.3\%$ biến thiên của $y$).
   - `Adj. R-squared`: Hệ số xác định hiệu chỉnh $\bar{R}^2$ ($0.730$).
   - `F-statistic` & `Prob (F-statistic)`: Giá trị thống kê $F$ ($268.6$) và P-value của kiểm định $F$ ($7.88 \times 10^{-30} \ll 0.05$ $\rightarrow$ mô hình có ý nghĩa thống kê rất cao).
   - `Log-Likelihood`, `AIC`, `BIC`: Giá trị hàm hợp lý logarit và các tiêu chuẩn thông tin Akaike / Bayes (AIC, BIC càng nhỏ mô hình càng tốt khi so sánh).

3. **Bảng hệ số hồi quy ( ở giữa):**
   - `coef`: Giá trị ước lượng của các hệ số $\hat{\theta}_0$ (`Intercept`) và $\hat{\theta}_1$ (`X`).
   - `std err`: Sai số chuẩn $S(\theta_i)$ của từng hệ số.
   - `t`: Thống kê kiểm định $t = \text{coef} / \text{std err}$.
   - `P>|t|`: P-value của kiểm định $t$ (nếu $< 0.05$ thì hệ số khác $0$ có ý nghĩa thống kê).
   - `[0.025, 0.975]`: Khoảng tin cậy $95\%$ của hệ số $\theta_i$.

4. **Khối kiểm định phần dư (phía dưới):**
   - `Omnibus` / `Prob(Omnibus)` & `Jarque-Bera (JB)` / `Prob(JB)`: Kiểm định tính chuẩn của phần dư ($H_0$: phần dư phân phối chuẩn; nếu Prob $> 0.05$ thì thỏa giả thiết phân phối chuẩn).
   - `Skew` (độ lệch) & `Kurtosis` (độ nhọn): Với phân phối chuẩn chuẩn tắc, $\text{Skew} \approx 0$ và $\text{Kurtosis} \approx 3$.
   - `Durbin-Watson`: Kiểm định tự tương quan bậc nhất của phần dư (dao động từ $0$ đến $4$; xấp xỉ $2.0$ là không có tự tương quan).
   - `Cond. No.` (Condition Number): Số điều kiện của ma trận dùng để phát hiện đa cộng tuyến (nếu $> 30$ hoặc $> 1000$ cần lưu ý đa cộng tuyến).

### 1.5.2. Code Python giải bài tập mô phỏng (BT2, BT3, BT5, BT6)

```python
import numpy as np
import pandas as pd
import statsmodels.formula.api as smf
from sklearn.linear_model import LinearRegression

# --- BT3: Tính lại ví dụ mô phỏng ở Slide 14 bằng Công thức nghiệm & Scikit-Learn ---
X_raw = np.array([[147], [150], [153], [160]])
y = np.array([[49], [53], [51], [54]])

# Cách 1: Dùng công thức ma trận (Normal Equation)
X_b = np.c_[np.ones((len(X_raw), 1)), X_raw]  # Thêm cột 1 vào đầu
theta_best = np.linalg.inv(X_b.T @ X_b) @ X_b.T @ y
print(f"Normal Equation: theta_0 = {theta_best[0, 0]:.2f}, theta_1 = {theta_best[1, 0]:.2f}")
# Kết quả: theta_0 = 5.02, theta_1 = 0.31

# Cách 2: Dùng LinearRegression của scikit-learn
lin_reg = LinearRegression()
lin_reg.fit(X_raw, y)
print(f"Scikit-Learn   : theta_0 = {lin_reg.intercept_[0]:.2f}, theta_1 = {lin_reg.coef_[0, 0]:.2f}")

# --- BT6: Minh họa thêm biến bậc hai X2^2 trong statsmodels ---
# Giả sử DataFrame df có các cột Y, X1, X2:
# df['X2_sq'] = df['X2'] ** 2
# model_poly = smf.ols('Y ~ X1 + X2 + X2_sq', data=df).fit()
# print(model_poly.summary())
```

---

[⬅ Mục lục](README.md) · [Tiếp: Hồi quy tuyến tính quy tắc hóa ➡](02_hoi_quy_quy_tac_hoa_ridge_lasso_elastic_net.md)
