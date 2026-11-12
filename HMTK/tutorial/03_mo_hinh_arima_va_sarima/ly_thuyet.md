# CHUYÊN ĐỀ 03: MÔ HÌNH THỐNG KÊ CỔ ĐIỂN AR, MA, ARIMA & SARIMA
## Autoregressive, Moving Average & Seasonal Integrated Models

---

## 1. QUÁ TRÌNH TỰ HỒI QUY (AUTOREGRESSIVE MODEL - AR)

### 1.1. Định nghĩa mô hình AR(p)
Mô hình tự hồi quy bậc $p$, ký hiệu $\text{AR}(p)$, giả định giá trị hiện tại $y_t$ là một hàm tuyến tính của $p$ giá trị trễ trong quá khứ cộng với một số hạng nhiễu trắng:

$$
y_t = c + \phi_1 y_{t-1} + \phi_2 y_{t-2} + \dots + \phi_p y_{t-p} + \epsilon_t
$$

Trong đó:
* $c$ là hằng số (intercept).
* $\phi_1, \phi_2, \dots, \phi_p$ là các tham số tự hồi quy.
* $\epsilon_t \sim \text{WN}(0, \sigma^2)$ là quá trình **nhiễu trắng (White Noise)** với kỳ vọng bằng 0, phương sai $\sigma^2$ và không tự tương quan ($\text{Cov}(\epsilon_t, \epsilon_s) = 0$ khi $t \neq s$).

### 1.2. Điều kiện tính dừng của AR(1) và AR(p)
* Với mô hình $\text{AR}(1)$: $y_t = c + \phi_1 y_{t-1} + \epsilon_t$.
  * Điều kiện để chuỗi dừng là:

  $$
  |\phi_1| < 1
  $$

  * Khi chuỗi dừng, kỳ vọng trung bình dài hạn $\mu = \mathbb{E}[y_t]$ là:

  $$
  \mu = \frac{c}{1 - \phi_1}
  $$

  * Phương sai của chuỗi:

  $$
  \text{Var}(y_t) = \frac{\sigma^2}{1 - \phi_1^2}
  $$

* Với mô hình tổng quát $\text{AR}(p)$: Tất cả các nghiệm của đa thức đặc trưng $1 - \phi_1 z - \phi_2 z^2 - \dots - \phi_p z^p = 0$ phải nằm **ngoài đường tròn đơn vị phức** ($|z| > 1$).

---

## 2. QUÁ TRÌNH TRUNG BÌNH TRƯỢT (MOVING AVERAGE MODEL - MA)

### 2.1. Định nghĩa mô hình MA(q)
Mô hình trung bình trượt bậc $q$, ký hiệu $\text{MA}(q)$, giả định giá trị hiện tại $y_t$ phụ thuộc tuyến tính vào các số hạng sai số ngẫu nhiên hiện tại và $q$ bước trong quá khứ:

$$
y_t = \mu + \epsilon_t + \theta_1 \epsilon_{t-1} + \theta_2 \epsilon_{t-2} + \dots + \theta_q \epsilon_{t-q}
$$

Trong đó:
* $\mu$ là kỳ vọng trung bình của chuỗi.
* $\theta_1, \dots, \theta_q$ là các tham số trung bình trượt.
* **Lưu ý quan trọng:** Mọi quá trình $\text{MA}(q)$ luôn luôn có tính dừng với bất kỳ giá trị tham số $\theta$ nào.

### 2.2. Tính khả nghịch (Invertibility)
Một quá trình $\text{MA}(q)$ được gọi là **khả nghịch** nếu nó có thể được viết lại dưới dạng một quá trình $\text{AR}(\infty)$.
* Với $\text{MA}(1)$: Điều kiện khả nghịch là:

$$
|\theta_1| < 1
$$

---

## 3. MÔ HÌNH KẾT HỢP ARMA(p, q) VÀ TÍCH HỢP ARIMA(p, d, q)

### 3.1. Mô hình ARMA(p, q)
Kết hợp cả thành phần tự hồi quy và trung bình trượt:

$$
y_t = c + \sum_{i=1}^{p} \phi_i y_{t-i} + \epsilon_t + \sum_{j=1}^{q} \theta_j \epsilon_{t-j}
$$

### 3.2. Sai phân (Differencing) biến chuỗi không dừng thành chuỗi dừng
Nhiều chuỗi kinh tế và tài chính có xu hướng thay đổi theo thời gian (chứa nghiệm đơn vị - Unit Root). Kỹ thuật lấy sai phân bậc $d$ loại bỏ xu hướng:
* Sai phân bậc 1: $\Delta y_t = y_t - y_{t-1} = (1 - B) y_t$
* Sai phân bậc 2: $\Delta^2 y_t = \Delta(\Delta y_t) = (y_t - y_{t-1}) - (y_{t-1} - y_{t-2}) = y_t - 2y_{t-1} + y_{t-2}$

### 3.3. Định nghĩa ARIMA(p, d, q)
Một chuỗi $\{y_t\}$ tuân theo mô hình $\text{ARIMA}(p, d, q)$ nếu sau khi lấy sai phân bậc $d$, chuỗi sai phân $w_t = \Delta^d y_t$ là một quá trình $\text{ARMA}(p, q)$ dừng:

$$
(1 - \phi_1 B - \dots - \phi_p B^p)(1 - B)^d y_t = c + (1 + \theta_1 B + \dots + \theta_q B^q)\epsilon_t
$$

---

## 4. NGUYÊN LÝ TÍNH TAY DỰ BÁO TỪNG BƯỚC (POINT FORECASTS)

Để tính dự báo tương lai $\hat{y}_{t+h|t}$ tại thời điểm $t$, ta sử dụng toán tử **kỳ vọng có điều kiện**:

$$
\hat{y}_{t+h|t} = \mathbb{E}[y_{t+h} \mid y_1, y_2, \dots, y_t]
$$

### Các quy tắc thay thế:
1. **Giá trị quan sát trong quá khứ:** Khi $k \le 0$, $\mathbb{E}[y_{t+k} \mid \dots] = y_{t+k}$ (đã biết).
2. **Giá trị trong tương lai:** Khi $k > 0$, $\mathbb{E}[y_{t+k} \mid \dots] = \hat{y}_{t+k|t}$ (thay bằng giá trị dự báo đệ quy).
3. **Nhiễu trắng trong quá khứ:** Khi $k \le 0$, $\mathbb{E}[\epsilon_{t+k} \mid \dots] = e_{t+k} = y_{t+k} - \hat{y}_{t+k|t+k-1}$ (phần dư thực tế).
4. **Nhiễu trắng trong tương lai:** Khi $k > 0$, $\mathbb{E}[\epsilon_{t+k} \mid \dots] = 0$ (vì tương lai chưa xảy ra, kỳ vọng nhiễu bằng 0).

---

## 5. VÍ DỤ TÍNH TAY CHI TIẾT TỪNG BƯỚC (WORKED NUMERICAL EXAMPLE)

### 5.1. Bài toán
Cho mô hình $\text{ARMA}(1, 1)$ có phương trình:

$$
y_t = 10 + 0.6 y_{t-1} + 0.4 \epsilon_{t-1} + \epsilon_t
$$

Tại thời điểm hiện tại $t = 100$:
* Giá trị quan sát được: $y_{100} = 30.0$
* Sai số ước lượng được tại $t = 100$: $\epsilon_{100} = 2.5$

Yêu cầu:
1. Xác định mức kỳ vọng trung bình dài hạn $\mu$ của chuỗi.
2. Tính dự báo điểm cho 3 bước tiếp theo: $\hat{y}_{101|100}$, $\hat{y}_{102|100}$, $\hat{y}_{103|100}$.

### 5.2. Các bước tính toán cụ thể

#### Bước 1: Tính kỳ vọng trung bình dài hạn $\mu$
Lấy kỳ vọng hai vế: $\mu = 10 + 0.6 \mu + 0.4(0) + 0$:

$$
\mu(1 - 0.6) = 10 \implies 0.4 \mu = 10 \implies \mu = \frac{10}{0.4} = 25.0
$$

#### Bước 2: Dự báo 1 bước tới ($h=1$, thời điểm $t=101$)
Viết phương trình tại $t=101$:

$$
y_{101} = 10 + 0.6 y_{100} + 0.4 \epsilon_{100} + \epsilon_{101}
$$

Lấy kỳ vọng có điều kiện tại $t=100$:

$$
\hat{y}_{101|100} = 10 + 0.6 \times y_{100} + 0.4 \times \epsilon_{100} + \mathbb{E}[\epsilon_{101}]
$$

$$
\hat{y}_{101|100} = 10 + 0.6 \times 30.0 + 0.4 \times 2.5 + 0 = 10 + 18.0 + 1.0 = 29.0
$$

#### Bước 3: Dự báo 2 bước tới ($h=2$, thời điểm $t=102$)
Viết phương trình tại $t=102$:

$$
y_{102} = 10 + 0.6 y_{101} + 0.4 \epsilon_{101} + \epsilon_{102}
$$

Lấy kỳ vọng có điều kiện: Vì $\epsilon_{101}$ thuộc tương lai so với mốc $t=100$, nên $\mathbb{E}[\epsilon_{101}] = 0$:

$$
\hat{y}_{102|100} = 10 + 0.6 \times \hat{y}_{101|100} + 0.4 \times 0 + 0
$$

$$
\hat{y}_{102|100} = 10 + 0.6 \times 29.0 = 10 + 17.4 = 27.4
$$

#### Bước 4: Dự báo 3 bước tới ($h=3$, thời điểm $t=103$)
Tương tự:

$$
\hat{y}_{103|100} = 10 + 0.6 \times \hat{y}_{102|100} + 0 = 10 + 0.6 \times 27.4 = 10 + 16.44 = 26.44
$$

> [!NOTE]
> Nhận xét: Khi bước dự báo $h$ tăng dần, dự báo suy giảm dần từ $29.0 \to 27.4 \to 26.44$ và tiệm cận về giá trị kỳ vọng trung bình dài hạn $\mu = 25.0$.
