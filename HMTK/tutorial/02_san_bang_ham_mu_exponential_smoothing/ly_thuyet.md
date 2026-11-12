# CHUYÊN ĐỀ 02: CÁC PHƯƠNG PHÁP SAN BẰNG HÀM MŨ
## Exponential Smoothing Methods: SES, Holt's Linear & Holt-Winters

---

## 1. TỔNG QUAN VỀ SAN BẰNG HÀM MŨ

San bằng hàm mũ (Exponential Smoothing) là một trong những họ phương pháp dự báo thành công và được ứng dụng rộng rãi nhất trong thực tế. Điểm cốt lõi của phương pháp là:
* **Nguyên lý suy giảm hàm mũ:** Các quan sát gần nhất trong quá khứ được gán trọng số lớn nhất, các quan sát càng xa trong quá khứ thì trọng số suy giảm dần theo quy luật hàm mũ.
* **Tốc độ tính toán tức thời:** Không đòi hỏi lưu trữ toàn bộ lịch sử dài, mô hình liên tục cập nhật theo công thức đệ quy (recursive updates).

---

## 2. SAN BẰNG HÀM MŨ ĐƠN (SIMPLE EXPONENTIAL SMOOTHING - SES)

### 2.1. Điều kiện áp dụng
Áp dụng cho chuỗi thời gian **không có xu hướng rõ rệt (no trend)** và **không có tính mùa vụ (no seasonality)**.

### 2.2. Phương trình mô hình
Dự báo cho thời điểm $t+1$ dựa trên quan sát thực tế $y_t$ và dự báo trước đó $\hat{y}_t$:

$$
\hat{y}_{t+1|t} = \alpha y_t + (1 - \alpha) \hat{y}_{t|t-1}
$$

Trong đó:
* $\alpha \in [0, 1]$ là **hệ số san bằng (smoothing parameter)**.
  * Nếu $\alpha \to 1$: Dự báo phụ thuộc gần như toàn bộ vào quan sát mới nhất (phản ứng rất nhạy với biến động ngắn hạn).
  * Nếu $\alpha \to 0$: Dự báo phụ thuộc vào toàn bộ quá khứ lịch sử (đường dự báo phẳng và mịn).

### 2.3. Dạng phương trình Thành phần (Component Form)
Biểu diễn qua mức độ hiện tại (Level - $l_t$):

$$
l_t = \alpha y_t + (1 - \alpha) l_{t-1}
$$

$$
\hat{y}_{t+h|t} = l_t \quad (\forall h \ge 1)
$$

### 2.4. Dạng hiệu chỉnh theo sai số (Error Correction Form)
Đặt sai số một bước $e_t = y_t - \hat{y}_{t|t-1}$:

$$
l_t = l_{t-1} + \alpha e_t
$$

Dự báo mới chính là dự báo cũ được điều chỉnh một lượng tỷ lệ thuận với sai số vừa mắc phải.

---

## 3. PHƯƠNG PHÁP HOLT TUYẾN TÍNH (HOLT'S LINEAR TREND METHOD)

### 3.1. Điều kiện áp dụng
Áp dụng cho chuỗi thời gian **có xu hướng tăng hoặc giảm tuyến tính**, nhưng **không có mùa vụ**.

### 3.2. Hệ phương trình Holt
Phương pháp mở rộng SES bằng cách tách làm hai phương trình trạng thái: Mức (Level $l_t$) và Độ dốc xu hướng (Trend $b_t$):

1. **Phương trình Mức (Level Equation):**

$$
l_t = \alpha y_t + (1 - \alpha)(l_{t-1} + b_{t-1})
$$

2. **Phương trình Xu hướng (Trend Equation):**

$$
b_t = \beta (l_t - l_{t-1}) + (1 - \beta) b_{t-1}
$$

3. **Phương trình Dự báo $h$ bước tới (Forecast Equation):**

$$
\hat{y}_{t+h|t} = l_t + h \cdot b_t
$$

Trong đó:
* $\alpha \in [0, 1]$: Hệ số san bằng cho Level.
* $\beta \in [0, 1]$: Hệ số san bằng cho Trend.
* $l_t - l_{t-1}$ là ước lượng độ biến thiên xu hướng vừa quan sát được ở bước $t$.

---

## 4. PHƯƠNG PHÁP HOLT-WINTERS (TRIPLE EXPONENTIAL SMOOTHING)

Áp dụng cho chuỗi thời gian vừa có **xu hướng** vừa có **yếu tố mùa vụ** với chu kỳ $m$.

### 4.1. Holt-Winters Mô hình Cộng (Additive Seasonality)
Áp dụng khi biên độ dao động mùa vụ không đổi theo thời gian:

1. **Level:**

$$
l_t = \alpha (y_t - s_{t-m}) + (1 - \alpha)(l_{t-1} + b_{t-1})
$$

2. **Trend:**

$$
b_t = \beta (l_t - l_{t-1}) + (1 - \beta) b_{t-1}
$$

3. **Seasonal:**

$$
s_t = \gamma (y_t - l_{t-1} - b_{t-1}) + (1 - \gamma) s_{t-m}
$$

4. **Forecast:**

$$
\hat{y}_{t+h|t} = l_t + h \cdot b_t + s_{t+h - m(k+1)}
$$

*(với $k$ là phần nguyên của $(h-1)/m$)*.

### 4.2. Holt-Winters Mô hình Nhân (Multiplicative Seasonality)
Áp dụng khi biên độ dao động mùa vụ tỷ lệ thuận với độ lớn của xu hướng:

1. **Level:**

$$
l_t = \alpha \left(\frac{y_t}{s_{t-m}}\right) + (1 - \alpha)(l_{t-1} + b_{t-1})
$$

2. **Trend:**

$$
b_t = \beta (l_t - l_{t-1}) + (1 - \beta) b_{t-1}
$$

3. **Seasonal:**

$$
s_t = \gamma \left(\frac{y_t}{l_{t-1} + b_{t-1}}\right) + (1 - \gamma) s_{t-m}
$$

4. **Forecast:**

$$
\hat{y}_{t+h|t} = (l_t + h \cdot b_t) \times s_{t+h - m(k+1)}
$$

---

## 5. VÍ DỤ TÍNH TAY CHI TIẾT TỪNG BƯỚC (WORKED NUMERICAL EXAMPLE)

### 5.1. Ví dụ Holt's Linear Trend
Cho dữ liệu bán hàng 2 tháng đầu: $y_1 = 115$, $y_2 = 125$.
Khởi tạo ban đầu tại $t=0$:
* $l_0 = 100$
* $b_0 = 10$
* Thiết lập siêu tham số: $\alpha = 0.3$, $\beta = 0.2$.

Yêu cầu:
1. Tính $l_1, b_1$ và dự báo một bước $\hat{y}_{2|1}$.
2. Tính $l_2, b_2$ sau khi quan sát được $y_2 = 125$.
3. Dự báo cho 2 tháng tiếp theo: $\hat{y}_{3|2}$ và $\hat{y}_{4|2}$.

### 5.2. Các bước tính toán cụ thể

#### Bước 1: Cập nhật tại thời điểm $t=1$ ($y_1 = 115$)
* Tính dự báo trước khi có $y_1$:

$$
\hat{y}_{1|0} = l_0 + b_0 = 100 + 10 = 110
$$

* Cập nhật Level $l_1$:

$$
l_1 = \alpha y_1 + (1 - \alpha)(l_0 + b_0) = 0.3 \times 115 + 0.7 \times (100 + 10) = 34.5 + 0.7 \times 110 = 34.5 + 77.0 = 111.5
$$

* Cập nhật Trend $b_1$:

$$
b_1 = \beta (l_1 - l_0) + (1 - \beta) b_0 = 0.2 \times (111.5 - 100) + 0.8 \times 10 = 0.2 \times 11.5 + 8.0 = 2.3 + 8.0 = 10.3
$$

* Dự báo cho thời điểm $t=2$:

$$
\hat{y}_{2|1} = l_1 + 1 \cdot b_1 = 111.5 + 10.3 = 121.8
$$

#### Bước 2: Cập nhật tại thời điểm $t=2$ ($y_2 = 125$)
* Quan sát thực tế $y_2 = 125$ (sai số $e_2 = 125 - 121.8 = 3.2$).
* Cập nhật Level $l_2$:

$$
l_2 = \alpha y_2 + (1 - \alpha)(l_1 + b_1) = 0.3 \times 125 + 0.7 \times (111.5 + 10.3) = 37.5 + 0.7 \times 121.8 = 37.5 + 85.26 = 122.76
$$

* Cập nhật Trend $b_2$:

$$
b_2 = \beta (l_2 - l_1) + (1 - \beta) b_1 = 0.2 \times (122.76 - 111.5) + 0.8 \times 10.3 = 0.2 \times 11.26 + 8.24 = 2.252 + 8.24 = 10.492
$$

#### Bước 3: Dự báo tương lai tại $t=2$
* Dự báo tháng tiếp theo ($h=1$, thời điểm $t=3$):

$$
\hat{y}_{3|2} = l_2 + 1 \cdot b_2 = 122.76 + 10.492 = 133.252
$$

* Dự báo 2 tháng tới ($h=2$, thời điểm $t=4$):

$$
\hat{y}_{4|2} = l_2 + 2 \cdot b_2 = 122.76 + 2 \times 10.492 = 122.76 + 20.984 = 143.744
$$
