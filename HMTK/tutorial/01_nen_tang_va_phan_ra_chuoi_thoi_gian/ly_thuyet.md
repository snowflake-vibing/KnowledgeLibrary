# CHUYÊN ĐỀ 01: NỀN TẢNG CHUỖI THỜI GIAN & PHÂN RÃ CỔ ĐIỂN
## Time Series Foundations & Classical Decomposition

---

## 1. KHÁI NIỆM CƠ BẢN VỀ CHUỖI THỜI GIAN

### 1.1. Định nghĩa
Chuỗi thời gian (Time Series) là một chuỗi các quan sát $\{y_t\}$ được thu thập theo trình tự thời gian với khoảng cách thời gian đều nhau (theo giây, giờ, ngày, tuần, tháng, quý hoặc năm):

$$
y = (y_1, y_2, \dots, y_n) \quad \text{với } t \in \{1, 2, \dots, n\}
$$

### 1.2. Bốn thành phần cốt lõi của chuỗi thời gian
Một chuỗi thời gian thực tế thường là sự tổng hòa của 4 thành phần:

1. **Xu hướng dài hạn ($T_t$ - Trend):** Hướng dịch chuyển tổng thể của chuỗi qua thời gian dài (tăng trưởng, suy giảm hoặc đi ngang).
2. **Mùa vụ ($S_t$ - Seasonality):** Dao động lặp lại theo chu kỳ cố định và tuần hoàn gắn liền với lịch dương (ví dụ: doanh số bán lẻ tăng vọt vào quý 4 dịp lễ tết, nhu cầu điện đạt đỉnh vào buổi trưa các tháng hè). Chu kỳ mùa vụ có độ dài $m$ cố định.
3. **Chu kỳ kinh tế ($C_t$ - Cyclical):** Dao động hình sóng gắn liền với chu kỳ kinh tế vĩ mô (khủng hoảng, phục hồi, bùng nổ), độ dài không cố định (thường từ 2–10 năm). Trong phân tích ngắn hạn, $T_t$ và $C_t$ thường được gộp chung thành **Xu hướng - Chu kỳ ($TC_t$)**.
4. **Nhiễu ngẫu nhiên ($R_t$ hoặc $I_t$ - Irregular / Residual):** Các biến động ngẫu nhiên, không thể đoán trước do thiên tai, dịch bệnh hoặc nhiễu đo lường.

### 1.3. Hai dạng mô hình phân rã kinh điển
Tùy thuộc vào việc biên độ dao động mùa vụ có thay đổi theo độ lớn của xu hướng hay không, ta chọn:

* **Mô hình cộng (Additive Model):** Biên độ dao động mùa vụ giữ nguyên bất kể mức độ cao thấp của xu hướng:

$$
Y_t = T_t + S_t + R_t
$$

* **Mô hình nhân (Multiplicative Model):** Biên độ dao động mùa vụ tỷ lệ thuận với độ lớn của xu hướng (khi mức bán hàng tăng cao thì chênh lệch đỉnh mùa vụ cũng mở rộng theo):

$$
Y_t = T_t \times S_t \times R_t
$$

---

## 2. HÀM TỰ TƯƠNG QUAN (ACF) & TỰ TƯƠNG QUAN TỪNG PHẦN (PACF)

### 2.1. Tính dừng (Stationarity)
Một chuỗi thời gian được gọi là **dừng yếu (Weakly Stationary / Covariance Stationary)** nếu thỏa mãn 3 điều kiện:
1. Kỳ vọng không đổi theo thời gian: $\mathbb{E}[y_t] = \mu \quad \forall t$.
2. Phương sai hữu hạn và không đổi theo thời gian: $\text{Var}(y_t) = \sigma^2 < \infty \quad \forall t$.
3. Hiệp phương sai giữa hai thời điểm $t$ và $t-k$ chỉ phụ thuộc vào độ trễ $k$, không phụ thuộc vào gốc thời gian $t$:

$$
\gamma_k = \text{Cov}(y_t, y_{t-k}) = \mathbb{E}[(y_t - \mu)(y_{t-k} - \mu)]
$$

### 2.2. Hệ số tự tương quan mẫu (Sample Autocorrelation Function - ACF)
Hệ số tự tương quan bậc $k$ (ký hiệu $r_k$) đo lường mức độ tương quan tuyến tính giữa giá trị hiện tại $y_t$ và giá trị quá khứ trễ $k$ bước $y_{t-k}$:

$$
r_k = \frac{\sum_{t=k+1}^{n} (y_t - \bar{y})(y_{t-k} - \bar{y})}{\sum_{t=1}^{n} (y_t - \bar{y})^2}
$$

Trong đó:
* $\bar{y} = \frac{1}{n} \sum_{t=1}^{n} y_t$ là giá trị trung bình mẫu.
* $r_0 = 1$ (chuỗi tương quan hoàn hảo với chính nó tại độ trễ 0).
* Giá trị $r_k \in [-1, 1]$.

---

## 3. PHƯƠNG PHÁP PHÂN RÃ CỔ ĐIỂN TỪNG BƯỚC (RATIO-TO-MOVING AVERAGE)

Quy trình chuẩn để phân rã chuỗi thời gian có mùa vụ chu kỳ $m$ (ví dụ: dữ liệu theo quý có $m = 4$, dữ liệu theo tháng có $m = 12$):

### Bước 1: Tính Trung bình trượt trung tâm (Centered Moving Average - CMA)
Với chu kỳ chẵn $m = 4$ (quý), trung bình trượt 4 điểm sẽ rơi vào giữa hai quý. Do đó ta tính trung bình của 2 giá trị MA 4 điểm kế tiếp (gọi là $2 \times 4 \text{ MA}$ hay CMA):

$$
\text{CMA}_t = \frac{0.5 y_{t-2} + y_{t-1} + y_t + y_{t+1} + 0.5 y_{t+2}}{4}
$$

$\text{CMA}_t$ đóng vai trò xấp xỉ thành phần xu hướng - chu kỳ: $T_t \approx \text{CMA}_t$.

### Bước 2: Tách tỷ số mùa vụ thô (Ratio Calculation)
Với mô hình nhân, tỷ số thô tại thời điểm $t$ là:

$$
z_t = \frac{y_t}{\text{CMA}_t} = \frac{T_t \times S_t \times R_t}{T_t} \approx S_t \times R_t
$$

### Bước 3: Tính chỉ số mùa vụ chuẩn hóa (Seasonal Indices)
1. Gom nhóm các tỷ số $z_t$ theo từng mùa/quý $j \in \{1, 2, \dots, m\}$ và tính trung bình: $\bar{S}_j$.
2. Chuẩn hóa để tổng các chỉ số mùa vụ bằng đúng $m$ (với mô hình nhân):

$$
c = \frac{m}{\sum_{j=1}^{m} \bar{S}_j} \implies S_j = c \times \bar{S}_j
$$

*(Ghi chú: Đối với mô hình cộng, ta tính độ lệch $y_t - \text{CMA}_t$ và chuẩn hóa sao cho tổng các chỉ số mùa vụ bằng 0).*

### Bước 4: Khử mùa vụ (Deseasonalization)
Loại bỏ tác động mùa vụ khỏi dữ liệu ban đầu để quan sát xu hướng thực sự:

$$
d_t = \frac{y_t}{S_t}
$$

### Bước 5: Ước lượng đường xu hướng và Dự báo
1. Khớp hồi quy tuyến tính theo thời gian $t$ trên dữ liệu đã khử mùa vụ:

$$
\hat{T}_t = a + b \cdot t
$$

2. Dự báo tương lai tại thời điểm $t + h$:

$$
\hat{y}_{t+h} = \hat{T}_{t+h} \times S_{t+h}
$$

---

## 4. CÁC THƯỚC ĐO ĐÁNH GIÁ ĐỘ CHÍNH XÁC DỰ BÁO

Gọi $y_t$ là giá trị thực tế, $\hat{y}_t$ là giá trị dự báo tại thời điểm $t$, $e_t = y_t - \hat{y}_t$ là sai số dự báo. Tập đánh giá gồm $n$ bước:

### 4.1. Sai số tuyệt đối trung bình (Mean Absolute Error - MAE)
Đo lường độ lớn trung bình của sai số (cùng đơn vị với dữ liệu gốc):

$$
\text{MAE} = \frac{1}{n} \sum_{t=1}^{n} |y_t - \hat{y}_t|
$$

### 4.2. Sai số bình phương trung bình (Mean Squared Error - MSE)
Phạt rất nặng các sai số lớn do phép bình phương:

$$
\text{MSE} = \frac{1}{n} \sum_{t=1}^{n} (y_t - \hat{y}_t)^2
$$

### 4.3. Căn bậc hai sai số bình phương trung bình (Root Mean Squared Error - RMSE)
Đưa thước đo về cùng đơn vị gốc nhưng vẫn giữ tính nhạy cảm với sai số lớn:

$$
\text{RMSE} = \sqrt{\text{MSE}} = \sqrt{\frac{1}{n} \sum_{t=1}^{n} (y_t - \hat{y}_t)^2}
$$

### 4.4. Phần trăm sai số tuyệt đối trung bình (Mean Absolute Percentage Error - MAPE)
Đo lường sai số tương đối theo tỷ lệ phần trăm (độc lập với thang đo dữ liệu):

$$
\text{MAPE} = \frac{100\%}{n} \sum_{t=1}^{n} \left| \frac{y_t - \hat{y}_t}{y_t} \right|
$$

### 4.5. Phần trăm sai số tuyệt đối đối xứng (Symmetric MAPE - sMAPE)
Khắc phục nhược điểm của MAPE khi $y_t$ gần bằng 0 và đối xứng giữa dự báo thiếu/thừa:

$$
\text{sMAPE} = \frac{100\%}{n} \sum_{t=1}^{n} \frac{2 |y_t - \hat{y}_t|}{|y_t| + |\hat{y}_t|}
$$

---

## 5. VÍ DỤ TÍNH TAY CHI TIẾT TỪNG BƯỚC (WORKED NUMERICAL EXAMPLE)

### 5.1. Bài toán
Cho chuỗi doanh số bán hàng theo quý trong 2 năm (8 quý, đơn vị: triệu VNĐ):

| Quý ($t$) | Thời điểm | Doanh số ($y_t$) |
|:---:|:---:|:---:|
| 1 | Năm 1 - Q1 | 40 |
| 2 | Năm 1 - Q2 | 56 |
| 3 | Năm 1 - Q3 | 68 |
| 4 | Năm 1 - Q4 | 92 |
| 5 | Năm 2 - Q1 | 50 |
| 6 | Năm 2 - Q2 | 70 |
| 7 | Năm 2 - Q3 | 84 |
| 8 | Năm 2 - Q4 | 114 |

Yêu cầu:
1. Tính $\text{CMA}$ cho Quý 3 và Quý 4 của Năm 1.
2. Xác định các chỉ số mùa vụ chuẩn hóa $S_1, S_2, S_3, S_4$ theo mô hình nhân.
3. Tính giá trị khử mùa vụ $d_3$ và dự báo doanh số cho Quý 1 Năm 3 ($t = 9$) biết phương trình xu hướng là $\hat{T}_t = 36.5 + 8.5 \times t$.

### 5.2. Lời giải chi tiết từng phép tính

#### Bước 1: Tính CMA tại $t=3$ và $t=4$
* Tại $t=3$ (Năm 1 - Q3):

$$
\text{CMA}_3 = \frac{0.5 \times y_1 + y_2 + y_3 + y_4 + 0.5 \times y_5}{4}
$$

$$
\text{CMA}_3 = \frac{0.5 \times 40 + 56 + 68 + 92 + 0.5 \times 50}{4} = \frac{20 + 56 + 68 + 92 + 25}{4} = \frac{261}{4} = 65.25
$$

* Tại $t=4$ (Năm 1 - Q4):

$$
\text{CMA}_4 = \frac{0.5 \times y_2 + y_3 + y_4 + y_5 + 0.5 \times y_6}{4}
$$

$$
\text{CMA}_4 = \frac{0.5 \times 56 + 68 + 92 + 50 + 0.5 \times 70}{4} = \frac{28 + 68 + 92 + 50 + 35}{4} = \frac{273}{4} = 68.25
$$

#### Bước 2: Tính tỷ số $z_t = y_t / \text{CMA}_t$
* Tại $t=3$:

$$
z_3 = \frac{68}{65.25} \approx 1.0421
$$

* Tại $t=4$:

$$
z_4 = \frac{92}{68.25} \approx 1.3480
$$

* Tương tự, nếu tính tiếp cho Năm 2:
  * Tại $t=5$ (Q1 Năm 2): $\text{CMA}_5 = 71.75 \implies z_5 = \frac{50}{71.75} \approx 0.6969$.
  * Tại $t=6$ (Q2 Năm 2): $\text{CMA}_6 = 75.75 \implies z_6 = \frac{70}{75.75} \approx 0.9241$.

#### Bước 3: Tính chỉ số mùa vụ chuẩn hóa
Giả sử ta thu thập các tỷ số trung bình qua các năm:
* $\bar{S}_1 \approx 0.6969$
* $\bar{S}_2 \approx 0.9241$
* $\bar{S}_3 \approx 1.0421$
* $\bar{S}_4 \approx 1.3480$

Tổng các chỉ số thô:

$$
\sum \bar{S}_j = 0.6969 + 0.9241 + 1.0421 + 1.3480 = 4.0111
$$

Hệ số chuẩn hóa $c = \frac{4}{4.0111} \approx 0.99723$.
Các chỉ số mùa vụ chính thức:
* $S_1 = 0.6969 \times 0.99723 \approx 0.6950$
* $S_2 = 0.9241 \times 0.99723 \approx 0.9215$
* $S_3 = 1.0421 \times 0.99723 \approx 1.0392$
* $S_4 = 1.3480 \times 0.99723 \approx 1.3443$
*(Tổng $S_1 + S_2 + S_3 + S_4 = 4.0000$)*.

#### Bước 4: Khử mùa vụ tại $t=3$

$$
d_3 = \frac{y_3}{S_3} = \frac{68}{1.0392} \approx 65.435 \text{ (triệu VNĐ)}
$$

#### Bước 5: Dự báo doanh số cho Quý 1 Năm 3 ($t=9$)
* Xu hướng tại $t=9$:

$$
\hat{T}_9 = 36.5 + 8.5 \times 9 = 36.5 + 76.5 = 113.0 \text{ (triệu VNĐ)}
$$

* Dự báo có điều chỉnh mùa vụ Quý 1 ($S_1 = 0.6950$):

$$
\hat{y}_9 = \hat{T}_9 \times S_1 = 113.0 \times 0.6950 = 78.535 \text{ (triệu VNĐ)}
$$
