# BỘ CHUYÊN ĐỀ HỌC TẬP & BÀI TẬP TÍNH TOÁN DỰ BÁO CHUỖI THỜI GIAN
## Time-Series Forecasting: Từ Thống Kê Cổ Điển Đến Học Sâu

---

## 📌 QUY CHUẨN THIẾT KẾ CÁC CHUYÊN ĐỀ

Nhằm giúp học viên không chỉ nắm bắt khái niệm trừu tượng mà còn **thực sự hiểu bản chất công thức toán học và tự tay tính toán ra các con số cụ thể**, toàn bộ thư viện bài giảng được cấu trúc đồng bộ theo quy chuẩn nghiêm ngặt.

> [!TIP]
> Xem chi tiết tài liệu quy định và bảng kiểm tra chất lượng xây dựng chuyên đề mới tại: **[`rule.md`](./rule.md)**.

> [!IMPORTANT]
> ### QUY TẮC BẮT BUỘC CHO MỖI CHUYÊN ĐỀ
> Mỗi chuyên đề học tập bao gồm đúng **2 tập tin cốt lõi**:
> 1. **`ly_thuyet.md` (Tài liệu Lý thuyết & Ví dụ Tính toán Chi tiết):**
>    - Trình bày trực quan, bài bản về nguyên lý toán học và mô hình.
>    - Mọi công thức được định dạng chuẩn LaTeX/KaTeX (đặt trên các dòng riêng biệt theo chuẩn GitHub Markdown).
>    - Phân tích cặn kẽ ý nghĩa từng ký hiệu, giả định mô hình và điều kiện áp dụng.
>    - Luôn có **Ví dụ tính tay bằng số thực từng bước (Step-by-step Worked Example)** để học viên đối chiếu trước khi làm bài tập.
> 2. **`bai_tap_tinh_toan.html` (Ứng dụng Tương tác Điền khuyết & Tự tính toán Số liệu):**
>    - Giao diện Web hiện đại (Dark/Light Slate UI, hỗ trợ KaTeX render công thức sắc nét).
>    - Thiết kế dưới dạng **Bài tập điền khuyết số học (Fill-in-the-blank Numerical Exercises)** cho cả các bước tính trung gian lẫn kết quả dự báo cuối cùng.
>    - Chấm điểm tự động, phản hồi tức thời (Input đổi màu xanh lá khi chính xác, đỏ khi sai).
>    - Cung cấp nút *"Xem lời giải & Công thức chi tiết"* để học viên tự kiểm tra tư duy tính toán của mình.

---

## 🗺️ BẢN ĐỒ LỘ TRÌNH CÁC CHUYÊN ĐỀ (ROADMAP)

Dự báo chuỗi thời gian (Time-Series Forecasting) được tổ chức theo lộ trình 5 chuyên đề từ nền tảng thống kê, phân rã cổ điển đến mô hình học máy dạng bảng và học sâu:

```mermaid
flowchart LR
    C1["Chuyên đề 01<br/>Nền tảng & Phân rã<br/>Chuỗi thời gian"] --> C2["Chuyên đề 02<br/>San bằng hàm mũ<br/>Exponential Smoothing"]
    C2 --> C3["Chuyên đề 03<br/>Mô hình Thống kê<br/>ARIMA & SARIMA"]
    C3 --> C4["Chuyên đề 04<br/>Học máy Dạng bảng<br/>Feature Engineering"]
    C4 --> C5["Chuyên đề 05<br/>Học sâu Chuỗi thời gian<br/>RNN & LSTM Network"]
```

---

## 📚 DANH MỤC CHI TIẾT CÁC CHUYÊN ĐỀ

### [Chuyên đề 01: Nền tảng Chuỗi thời gian & Phân rã Xu hướng - Mùa vụ](./01_nen_tang_va_phan_ra_chuoi_thoi_gian/)
* **Trọng tâm lý thuyết:**
  - Khái niệm cơ bản: Tính dừng (Stationarity), Tự tương quan (ACF) và Tự tương quan từng phần (PACF).
  - Hai mô hình phân rã kinh điển: Mô hình cộng ($Y_t = T_t + S_t + R_t$) và Mô hình nhân ($Y_t = T_t \times S_t \times R_t$).
  - Thuật toán Trung bình trượt trung tâm (Centered Moving Average - CMA), phương pháp Tỷ số trên trung bình trượt (Ratio-to-Moving Average).
  - Các thước đo sai số dự báo cốt lõi: $\text{MAE}$, $\text{MSE}$, $\text{RMSE}$, $\text{MAPE}$, $\text{sMAPE}$.
* **Tài liệu lý thuyết:** [`ly_thuyet.md`](./01_nen_tang_va_phan_ra_chuoi_thoi_gian/ly_thuyet.md)
* **Bài tập điền khuyết tương tác:** [`bai_tap_tinh_toan.html`](./01_nen_tang_va_phan_ra_chuoi_thoi_gian/bai_tap_tinh_toan.html)

---

### [Chuyên đề 02: Các Phương pháp San bằng Hàm mũ (Exponential Smoothing)](./02_san_bang_ham_mu_exponential_smoothing/)
* **Trọng tâm lý thuyết:**
  - San bằng hàm mũ đơn (Simple Exponential Smoothing - SES) cho chuỗi không có xu hướng: $\hat{y}_{t+1} = \alpha y_t + (1-\alpha) \hat{y}_t$.
  - Phương pháp Holt tuyến tính (Holt's Linear Trend): Cập nhật Level ($l_t$) và Trend ($b_t$).
  - Phương pháp Holt-Winters (Triple Exponential Smoothing): Kết hợp Level, Trend và Thành phần Mùa vụ (Additive và Multiplicative).
  - Quy tắc khởi tạo giá trị ban đầu và ý nghĩa các tham số san bằng $\alpha, \beta, \gamma \in [0, 1]$.
* **Tài liệu lý thuyết:** [`ly_thuyet.md`](./02_san_bang_ham_mu_exponential_smoothing/ly_thuyet.md)
* **Bài tập điền khuyết tương tác:** [`bai_tap_tinh_toan.html`](./02_san_bang_ham_mu_exponential_smoothing/bai_tap_tinh_toan.html)

---

### [Chuyên đề 03: Mô hình Thống kê Hồi quy Cổ điển AR, MA, ARIMA & SARIMA](./03_mo_hinh_arima_va_sarima/)
* **Trọng tâm lý thuyết:**
  - Quá trình tự hồi quy $\text{AR}(p)$ và điều kiện tính dừng (Stationarity condition, nghiệm đa thức đặc trưng).
  - Quá trình trung bình trượt $\text{MA}(q)$ và tính khả nghịch (Invertibility).
  - Mô hình kết hợp $\text{ARMA}(p, q)$ và kỹ thuật lấy sai phân tích hợp $\text{ARIMA}(p, d, q)$.
  - Mở rộng đa mùa vụ $\text{SARIMA}(p, d, q)(P, D, Q)_s$.
  - Công thức tính tay dự báo $h$ bước tới: $y_{t+h|t}$, tính phần dư $\epsilon_t$, và phương sai sai số dự báo $\sigma_h^2$.
* **Tài liệu lý thuyết:** [`ly_thuyet.md`](./03_mo_hinh_arima_va_sarima/ly_thuyet.md)
* **Bài tập điền khuyết tương tác:** [`bai_tap_tinh_toan.html`](./03_mo_hinh_arima_va_sarima/bai_tap_tinh_toan.html)

---

### [Chuyên đề 04: Biến đổi Chuỗi thời gian thành Học máy Giám sát (Tabular ML)](./04_machine_learning_time_series_regression/)
* **Trọng tâm lý thuyết:**
  - Phương pháp cửa sổ trượt (Sliding Window Formulation): Tạo biến trễ (Lag Features: $y_{t-1}, y_{t-2}, \dots$).
  - Đặc trưng thống kê trượt (Rolling Window Statistics): Rolling Mean, Rolling Standard Deviation, Rolling Min/Max.
  - Trích xuất đặc trưng lịch thời gian (Calendar & Cyclical Features: Day-of-week, Hour, $\sin/\cos$ encoding).
  - Chiến lược chia tập dữ liệu chống rò rỉ (Expanding Window & Rolling Window Cross-Validation).
  - Ứng dụng mô hình Hồi quy tuyến tính, Random Forest, LightGBM và XGBoost trên dữ liệu bảng trích xuất.
* **Tài liệu lý thuyết:** [`ly_thuyet.md`](./04_machine_learning_time_series_regression/ly_thuyet.md)
* **Bài tập điền khuyết tương tác:** [`bai_tap_tinh_toan.html`](./04_machine_learning_time_series_regression/bai_tap_tinh_toan.html)

---

### [Chuyên đề 05: Học sâu cho Chuỗi thời gian (Deep Learning: RNN & LSTM Networks)](./05_deep_learning_rnn_lstm_forecasting/)
* **Trọng tâm lý thuyết:**
  - Mạng nơ-ron hồi quy cơ bản (Vanilla RNN) và bài toán suy hao đạo hàm (Vanishing Gradient Problem).
  - Kiến trúc bộ nhớ dài-ngắn hạn (Long Short-Term Memory - LSTM):
    * Cổng quên (Forget Gate): $f_t = \sigma(W_f x_t + U_f h_{t-1} + b_f)$
    * Cổng vào (Input Gate): $i_t = \sigma(W_i x_t + U_i h_{t-1} + b_i)$
    * Trạng thái ứng viên (Candidate State): $\tilde{C}_t = \tanh(W_c x_t + U_c h_{t-1} + b_c)$
    * Cập nhật ô nhớ (Cell State Update): $C_t = f_t \odot C_{t-1} + i_t \odot \tilde{C}_t$
    * Cổng ra (Output Gate): $o_t = \sigma(W_o x_t + U_o h_{t-1} + b_o)$
    * Trạng thái ẩn (Hidden State Output): $h_t = o_t \odot \tanh(C_t)$
  - Quy trình tính tay từng vector trọng số và phép nhân Hadamard $\odot$ qua các bước thời gian.
* **Tài liệu lý thuyết:** [`ly_thuyet.md`](./05_deep_learning_rnn_lstm_forecasting/ly_thuyet.md)
* **Bài tập điền khuyết tương tác:** [`bai_tap_tinh_toan.html`](./05_deep_learning_rnn_lstm_forecasting/bai_tap_tinh_toan.html)

---

## 🎯 HƯỚNG DẪN HỌC TẬP HIỆU QUẢ

1. **Đọc kỹ tài liệu lý thuyết:** Đọc từng phần trong `ly_thuyet.md`, theo dõi ví dụ tính tay từng bước với máy tính cầm tay (Casio / Python) để hiểu rõ thứ tự phép tính và nguồn gốc các con số.
2. **Mở tệp HTML làm bài tập:** Kích đúp hoặc mở trực tiếp tệp `bai_tap_tinh_toan.html` trong trình duyệt web bất kỳ (Chrome, Edge, Firefox).
3. **Thực hiện tính toán và điền đáp số:**
   - Điền từng con số tính toán vào các ô trống `[ ... ]`.
   - Bấm nút **"Kiểm tra kết quả"** để hệ thống chấm điểm tức thời.
   - Nếu kết quả chưa chính xác (ô đổi sang màu đỏ), kiểm tra lại phép tính hoặc xem gợi ý giải thích để hiểu chỗ sai.
