# CHUYÊN ĐỀ 04: HỌC MÁY CHO DỰ BÁO CHUỖI THỜI GIAN
## Tabular Feature Engineering & Supervised Regression for Time Series

---

## 1. NGUYÊN LÝ BIẾN ĐỔI CHUỖI THỜI GIAN SANG DỮ LIỆU BẢNG

Mô hình học máy có giám sát (Supervised Machine Learning) như Hồi quy tuyến tính, Random Forest, XGBoost hay LightGBM đòi hỏi dữ liệu đầu vào ở định dạng bảng:

$$
\mathcal{D} = \{(X_t, y_t)\}_{t=1}^N \quad \text{với } X_t \in \mathbb{R}^d, \, y_t \in \mathbb{R}
$$

Để áp dụng cho chuỗi thời gian đơn biến $\{y_t\}$, ta dùng kỹ thuật **Cửa sổ trượt (Sliding Window Formulation)** để trích xuất các đặc trưng thời gian.

---

## 2. CÁC HỌ ĐẶC TRƯNG THỜI GIAN CỐT LÕI (FEATURE ENGINEERING)

### 2.1. Đặc trưng trễ (Lag Features)
Lấy các giá trị quan sát trong quá khứ làm biến độc lập:

$$
\text{Lag}_1 = y_{t-1}, \quad \text{Lag}_2 = y_{t-2}, \quad \dots, \quad \text{Lag}_p = y_{t-p}
$$

*Ý nghĩa:* Giúp mô hình học được mối tương quan tự hồi quy nội tại của chuỗi.

### 2.2. Đặc trưng thống kê trượt (Rolling Window Statistics)
Được tính toán trên một cửa sổ kích thước $k$ kết thúc tại $t-1$ (tuyệt đối không chứa $y_t$ để tránh rò rỉ):

1. **Trung bình trượt (Rolling Mean):**

$$
\text{roll\_mean}_{t, k} = \frac{1}{k} \sum_{i=1}^{k} y_{t-i}
$$

2. **Độ lệch chuẩn trượt (Rolling Standard Deviation):**

$$
\text{roll\_std}_{t, k} = \sqrt{\frac{1}{k-1} \sum_{i=1}^{k} (y_{t-i} - \text{roll\_mean}_{t, k})^2}
$$

3. **Cực trị trượt (Rolling Min / Max):** Đo lường biên độ dao động và độ biến động ngắn hạn.

### 2.3. Đặc trưng lịch & Mã hóa chu kỳ lượng giác (Cyclical Encoding)
Thời gian có tính tuần hoàn khép kín: Giờ 23:00 và Giờ 00:00 rất gần nhau; Thứ Bảy (ngày 6) và Chủ Nhật (ngày 7) nối tiếp Thứ Hai (ngày 1). Để mô hình cây và mạng nơ-ron nhận biết tính liên tục này, ta mã hóa trên vòng tròn lượng giác đơn vị:

$$
x_{\sin} = \sin\left(\frac{2\pi \times t}{T}\right), \qquad x_{\cos} = \cos\left(\frac{2\pi \times t}{T}\right)
$$

* Ví dụ theo giờ trong ngày ($T = 24$, $t \in [0, 23]$):

$$
\text{hour}_{\sin} = \sin\left(\frac{2\pi \times \text{hour}}{24}\right), \qquad \text{hour}_{\cos} = \cos\left(\frac{2\pi \times \text{hour}}{24}\right)
$$

* Ví dụ theo thứ trong tuần ($T = 7$, $t \in [1, 7]$ với 1 là Thứ Hai, 7 là Chủ Nhật):

$$
\text{dow}_{\sin} = \sin\left(\frac{2\pi \times \text{dow}}{7}\right), \qquad \text{dow}_{\cos} = \cos\left(\frac{2\pi \times \text{dow}}{7}\right)
$$

---

## 3. CHIẾN LƯỢC PHÂN CHIA DỮ LIỆU CHUỖI THỜI GIAN (CROSS-VALIDATION)

> [!WARNING]
> ### TUYỆT ĐỐI KHÔNG DÙNG K-FOLD RANDOM SHUFFLE
> Việc xáo trộn ngẫu nhiên dữ liệu chuỗi thời gian sẽ gây ra hiện tượng **Look-ahead Bias (Rò rỉ tương lai vào quá khứ)**: mô hình dùng thông tin của ngày mai để dự báo ngày hôm qua, dẫn đến điểm kiểm thử cao ảo nhưng thất bại hoàn toàn trên thực tế.

### Các chiến lược kiểm định hợp lệ:
1. **Cửa sổ mở rộng (Expanding Window / TimeSeriesSplit):**
   * Fold 1: Train $[1 \dots t_1]$, Test $[t_1+1 \dots t_2]$
   * Fold 2: Train $[1 \dots t_2]$, Test $[t_2+1 \dots t_3]$
2. **Cửa sổ trượt cố định (Rolling Window):**
   * Kích thước tập huấn luyện giữ nguyên độ dài $W$ cố định và dịch chuyển dần theo thời gian.

---

## 4. CÁC CHIẾN LƯỢC DỰ BÁO ĐA BƯỚC (MULTI-STEP FORECASTING)

Khi cần dự báo một chân trời thời gian $H$ bước ($\hat{y}_{t+1}, \hat{y}_{t+2}, \dots, \hat{y}_{t+H}$):

1. **Chiến lược đệ quy (Recursive / Autoregressive Strategy):**
   * Huấn luyện 1 mô hình duy nhất chuyên dự báo 1 bước tới: $\hat{y}_{t+1} = f(y_t, y_{t-1}, \dots)$.
   * Lấy giá trị vừa dự báo $\hat{y}_{t+1}$ đưa ngược lại vào làm đặc trưng trễ để dự báo tiếp $\hat{y}_{t+2}$.
   * *Ưu điểm:* Dễ triển khai, tốn ít tài nguyên.
   * *Nhược điểm:* Tích lũy sai số (error accumulation) khi $H$ lớn.
2. **Chiến lược trực tiếp (Direct Strategy):**
   * Huấn luyện $H$ mô hình độc lập: mô hình thứ $h$ chuyên dự báo tại bước $t+h$: $\hat{y}_{t+h} = f_h(y_t, y_{t-1}, \dots)$.
   * *Ưu điểm:* Không bị tích lũy sai số.
   * *Nhược điểm:* Tốn chi phí huấn luyện gấp $H$ lần.

---

## 5. VÍ DỤ TÍNH TAY CHI TIẾT TỪNG BƯỚC (WORKED NUMERICAL EXAMPLE)

### 5.1. Bài toán
Cho chuỗi thời gian 7 quan sát:

| $t$ | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| $y_t$ | 10 | 12 | 15 | 14 | 18 | 20 | 24 |

Thiết lập bài toán học máy bảng với 2 đặc trưng trễ:
* $L_1 = y_{t-1}$ (Lag 1)
* $L_2 = y_{t-2}$ (Lag 2)
* Trung bình trượt 2 bước: $\text{RM}_2 = \frac{y_{t-1} + y_{t-2}}{2}$

Giả sử mô hình hồi quy tuyến tính đã học được bộ trọng số:

$$
\hat{y}_t = 2.0 + 0.6 L_1 + 0.3 L_2
$$

Yêu cầu:
1. Xây dựng bảng dữ liệu học máy từ $t=3$ đến $t=7$.
2. Tính dự báo điểm cho thời điểm $t=8$ ($\hat{y}_8$).
3. Sử dụng chiến lược đệ quy để tính tiếp dự báo cho thời điểm $t=9$ ($\hat{y}_9$).

### 5.2. Các bước tính toán cụ thể

#### Bước 1: Xây dựng bảng dữ liệu học máy dạng bảng

| Thời điểm ($t$) | Biến mục tiêu ($y_t$) | Đặc trưng $L_1 = y_{t-1}$ | Đặc trưng $L_2 = y_{t-2}$ | $\text{RM}_2 = (L_1 + L_2)/2$ |
|:---:|:---:|:---:|:---:|:---:|
| 3 | 15 | 12 | 10 | 11.0 |
| 4 | 14 | 15 | 12 | 13.5 |
| 5 | 18 | 14 | 15 | 14.5 |
| 6 | 20 | 18 | 14 | 16.0 |
| 7 | 24 | 20 | 18 | 19.0 |

#### Bước 2: Dự báo tại thời điểm $t=8$
* Xác định các đặc trưng đầu vào tại $t=8$:
  * $L_1 = y_7 = 24.0$
  * $L_2 = y_6 = 20.0$
* Áp dụng công thức mô hình:

$$
\hat{y}_8 = 2.0 + 0.6 \times L_1 + 0.3 \times L_2 = 2.0 + 0.6(24.0) + 0.3(20.0) = 2.0 + 14.4 + 6.0 = 22.4
$$

#### Bước 3: Dự báo đệ quy tại thời điểm $t=9$
* Tại $t=9$, quan sát $y_8$ chưa diễn ra, ta thay bằng giá trị dự báo đệ quy $\hat{y}_8 = 22.4$:
  * $L_1 = \hat{y}_8 = 22.4$
  * $L_2 = y_7 = 24.0$
* Áp dụng công thức mô hình:

$$
\hat{y}_9 = 2.0 + 0.6 \times \hat{y}_8 + 0.3 \times y_7 = 2.0 + 0.6(22.4) + 0.3(24.0) = 2.0 + 13.44 + 7.20 = 22.64
$$
