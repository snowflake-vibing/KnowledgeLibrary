# Ví Dụ Chuỗi Thời Gian (Time Series) Cụ Thể Cho Sơ Đồ LSTM Cell

Tài liệu này xây dựng một **bài toán Time Series hoàn chỉnh có số liệu tính tay từng bước**, bám sát 100% cấu trúc, ký hiệu và 4 hộp chú thích trong sơ đồ LSTM của bạn (gồm `Forget Gate`, `Input Gate`, `Cell State`, `Output Gate` và đầu ra `softmax` cho $Y_t$).

---

## 1. Bối Cảnh Bài Toán Thực Tế (Để Trình Bày Với Team)

* **Bài toán:** Dự báo trạng thái phụ tải lưới điện theo từng ngày (**Time Series Regime Classification**).
* **Đầu vào tại ngày $t$ ($W_t \in \mathbb{R}^2$):** Vector 2 đặc trưng đã chuẩn hóa về $[0, 1]$ *(lưu ý: trong sơ đồ của bạn, ký hiệu $W_t$ là vector đầu vào tại bước $t$, tương đương $x_t$ trong một số sách)*:
  $$W_t = \begin{bmatrix} \text{Nhu cầu điện tiêu thụ (chuẩn hóa)} \\ \text{Nhiệt độ môi trường (chuẩn hóa)} \end{bmatrix}$$
* **Đầu ra tại ngày $t$ ($Y_t \in \mathbb{R}^3$):** Xác suất 3 trạng thái phụ tải sau hàm $\text{softmax}$:
  $$Y_t = \begin{bmatrix} P(\text{Thấp}) \\ P(\text{Trung bình}) \\ P(\text{Quá tải}) \end{bmatrix}$$
* **Kích thước bộ nhớ ẩn ($d_h = 2$):** Ta dùng **2 chiều** cho $C_t$ và $h_t$ để minh họa rõ ý nghĩa *"quyết định từng chiều thông tin trong $C_{t-1}$ được giữ lại bao nhiêu phần trăm"*:
  * **Chiều 1:** Xu hướng phụ tải nền dài hạn (thay đổi chậm).
  * **Chiều 2:** Áp lực sốc nhiệt ngắn hạn (tăng vọt khi nắng nóng, xả nhanh khi trời mát).

---

## 2. Bộ Dữ Liệu Chuỗi Thời Gian & Trọng Số Đã Huấn Luyện

### 2.1. Chuỗi dữ liệu đầu vào qua các ngày ($W_t$)

| Ngày ($t$) | Diễn biến thời tiết & phụ tải | $W_t = [\text{Nhu cầu}, \text{Nhiệt độ}]^T$ | Trạng thái trước đó ($C_{t-1}, h_{t-1}$) |
|:---:|---|---|---|
| $t=1 \dots 2$ | Thời tiết ôn hòa, phụ tải ổn định | $[0.40,\; 0.35]^T$ | — |
| **$t=3$** | **Nắng nóng gay gắt đột biến (Cao điểm)** | **$[0.90,\; 0.85]^T$** | $C_2 = [0.40,\; 0.15]^T,\; h_2 = [0.20,\; 0.10]^T$ |
| **$t=4$** | **Mưa giông hạ nhiệt, phụ tải giảm mạnh** | **$[0.20,\; 0.10]^T$** | Lấy kết quả $C_3, h_3$ từ bước $t=3$ |

### 2.2. Toàn bộ ma trận Trọng số & Bias (Thông số mô hình)

Công thức chuẩn tại mỗi cổng là $\text{Gate} = \text{act}\big(W_{\text{in}} \cdot W_t + U_h \cdot h_{t-1} + b\big)$:

| Khối trong sơ đồ | Trọng số đầu vào ($W_{\text{in}}$) | Trọng số hồi quy ($U_h$) | Bias ($b$) | Hàm kích hoạt |
|---|---|---|---|---|
| **1. Forget Gate ($f_t$)** *(Khung đỏ)* | $W_f = \begin{bmatrix} 1.5 & 0.5 \\ -0.5 & 3.0 \end{bmatrix}$ | $U_f = \begin{bmatrix} 0.8 & -0.2 \\ 0.2 & 0.5 \end{bmatrix}$ | $b_f = \begin{bmatrix} 0.4 \\ -1.2 \end{bmatrix}$ | $\sigma$ (Sigmoid) |
| **2a. Input Gate ($i_t$)** *(Khung xanh dương)* | $W_i = \begin{bmatrix} 1.5 & 1.5 \\ 0.5 & 2.5 \end{bmatrix}$ | $U_i = \begin{bmatrix} 0.4 & 0.2 \\ 0.1 & 0.5 \end{bmatrix}$ | $b_i = \begin{bmatrix} -1.0 \\ -1.2 \end{bmatrix}$ | $\sigma$ (Sigmoid) |
| **2b. Candidate ($\tilde{C}_t$)** *(Khung xanh dương)* | $W_c = \begin{bmatrix} 1.5 & 0.5 \\ -0.5 & 2.0 \end{bmatrix}$ | $U_c = \begin{bmatrix} 0.3 & 0.1 \\ 0.1 & 0.4 \end{bmatrix}$ | $b_c = \begin{bmatrix} -0.5 \\ -0.4 \end{bmatrix}$ | $\tanh$ |
| **3. Output Gate ($O_t$)** *(Khung xanh lá)* | $W_o = \begin{bmatrix} 1.2 & 1.0 \\ 0.8 & 1.5 \end{bmatrix}$ | $U_o = \begin{bmatrix} 0.4 & 0.2 \\ 0.2 & 0.6 \end{bmatrix}$ | $b_o = \begin{bmatrix} -0.3 \\ -0.5 \end{bmatrix}$ | $\sigma$ (Sigmoid) |
| **4. Lớp đầu ra ($Y_t$)** *(Khung xanh lá)* | — | $W_y = \begin{bmatrix} -3.0 & -2.5 \\ 0.2 & -0.5 \\ 3.0 & 2.5 \end{bmatrix}$ | $b_y = \begin{bmatrix} 1.8 \\ 1.2 \\ -1.0 \end{bmatrix}$ | $\text{softmax}$ |

---

## 3. Tính Chi Tiết Từng Bước Tại $t = 3$ (Ngày Nắng Nóng Đột Biến)

Dữ liệu bước vào Cell LSTM tại $t=3$:
$$W_3 = \begin{bmatrix} 0.90 \\ 0.85 \end{bmatrix}, \qquad h_2 = \begin{bmatrix} 0.20 \\ 0.10 \end{bmatrix}, \qquad C_2 = \begin{bmatrix} 0.40 \\ 0.15 \end{bmatrix}$$

### Bước 1: Forget Gate (Hộp chú thích Đỏ)
* **Input:** $W_3, h_2$ $\longrightarrow$ **Output:** $f_3 \in [0, 1]$
* Tính tổng tuyến tính:
  $$z_f = W_f \cdot W_3 + U_f \cdot h_2 + b_f = \begin{bmatrix} 1.5(0.90) + 0.5(0.85) \\ -0.5(0.90) + 3.0(0.85) \end{bmatrix} + \begin{bmatrix} 0.8(0.20) - 0.2(0.10) \\ 0.2(0.20) + 0.5(0.10) \end{bmatrix} + \begin{bmatrix} 0.4 \\ -1.2 \end{bmatrix} = \begin{bmatrix} 1.775 \\ 2.100 \end{bmatrix} + \begin{bmatrix} 0.140 \\ 0.090 \end{bmatrix} + \begin{bmatrix} 0.4 \\ -1.2 \end{bmatrix} = \begin{bmatrix} 2.315 \\ 0.990 \end{bmatrix}$$
* Qua hàm $\sigma(z) = \dfrac{1}{1 + e^{-z}}$:
  $$f_3 = \sigma\begin{pmatrix} 2.315 \\ 0.990 \end{pmatrix} = \begin{bmatrix} \mathbf{0.9101} \\ \mathbf{0.7291} \end{bmatrix}$$
* 💡 **Diễn giải cho team:** Giữ lại **91.01%** xu hướng phụ tải nền (Chiều 1) và **72.91%** áp lực nhiệt (Chiều 2) từ ngày hôm qua.

---

### Bước 2: Input Gate (Hộp chú thích Xanh dương)
* **Input:** $W_3, h_2$ $\longrightarrow$ **Output:** $i_3 \odot \tilde{C}_3$
* **Tính cổng mở $i_3$:**
  $$z_i = W_i \cdot W_3 + U_i \cdot h_2 + b_i = \begin{bmatrix} 1.5(0.90) + 1.5(0.85) \\ 0.5(0.90) + 2.5(0.85) \end{bmatrix} + \begin{bmatrix} 0.4(0.20) + 0.2(0.10) \\ 0.1(0.20) + 0.5(0.10) \end{bmatrix} + \begin{bmatrix} -1.0 \\ -1.2 \end{bmatrix} = \begin{bmatrix} 1.725 \\ 1.445 \end{bmatrix}$$
  $$i_3 = \sigma\begin{pmatrix} 1.725 \\ 1.445 \end{pmatrix} = \begin{bmatrix} \mathbf{0.8488} \\ \mathbf{0.8092} \end{bmatrix}$$
* **Tính giá trị ứng viên $\tilde{C}_3$:**
  $$z_c = W_c \cdot W_3 + U_c \cdot h_2 + b_c = \begin{bmatrix} 1.5(0.90) + 0.5(0.85) \\ -0.5(0.90) + 2.0(0.85) \end{bmatrix} + \begin{bmatrix} 0.3(0.20) + 0.1(0.10) \\ 0.1(0.20) + 0.4(0.10) \end{bmatrix} + \begin{bmatrix} -0.5 \\ -0.4 \end{bmatrix} = \begin{bmatrix} 1.345 \\ 0.910 \end{bmatrix}$$
  $$\tilde{C}_3 = \tanh\begin{pmatrix} 1.345 \\ 0.910 \end{pmatrix} = \begin{bmatrix} \mathbf{0.8729} \\ \mathbf{0.7211} \end{bmatrix}$$
* **Nhân từng phần tử ($i_3 \odot \tilde{C}_3$):**
  $$i_3 \odot \tilde{C}_3 = \begin{bmatrix} 0.8488 \times 0.8729 \\ 0.8092 \times 0.7211 \end{bmatrix} = \begin{bmatrix} \mathbf{0.7409} \\ \mathbf{0.5836} \end{bmatrix}$$
* 💡 **Diễn giải cho team:** Nắng nóng đẩy $i_3$ lên trên $80\%$, cho phép ghi mạnh thông tin cảnh báo mới (`+0.7409` và `+0.5836`) vào bộ nhớ dài hạn.

---

### Bước 3: Cập Nhật Cell State (Hộp chú thích Vàng)
* **Input:** $C_2$, $f_3$, và $i_3 \odot \tilde{C}_3$ $\longrightarrow$ **Output:** $C_3 = f_3 \odot C_2 + i_3 \odot \tilde{C}_3$
  $$C_3 = \begin{bmatrix} 0.9101 \times 0.40 \\ 0.7291 \times 0.15 \end{bmatrix} + \begin{bmatrix} 0.7409 \\ 0.5836 \end{bmatrix} = \begin{bmatrix} 0.3640 \\ 0.1094 \end{bmatrix} + \begin{bmatrix} 0.7409 \\ 0.5836 \end{bmatrix} = \begin{bmatrix} \mathbf{1.1049} \\ \mathbf{0.6929} \end{bmatrix}$$
* 💡 **Diễn giải cho team:** Ký ức dài hạn $C_3$ vọt từ $[0.40, 0.15]^T$ lên $[1.1049, 0.6929]^T$ — ghi nhận rõ trạng thái tích lũy cao điểm.

---

### Bước 4: Output Gate & Dự Báo $Y_3$ (Hộp chú thích Xanh lá)
* **Input:** $W_3, h_2, C_3$ $\longrightarrow$ **Output:** $Y_3, C_3, h_3$
* **Tính cổng ra $O_3$:**
  $$z_o = W_o \cdot W_3 + U_o \cdot h_2 + b_o = \begin{bmatrix} 1.2(0.90) + 1.0(0.85) \\ 0.8(0.90) + 1.5(0.85) \end{bmatrix} + \begin{bmatrix} 0.4(0.20) + 0.2(0.10) \\ 0.2(0.20) + 0.6(0.10) \end{bmatrix} + \begin{bmatrix} -0.3 \\ -0.5 \end{bmatrix} = \begin{bmatrix} 1.730 \\ 1.595 \end{bmatrix}$$
  $$O_3 = \sigma\begin{pmatrix} 1.730 \\ 1.595 \end{pmatrix} = \begin{bmatrix} \mathbf{0.8494} \\ \mathbf{0.8313} \end{bmatrix}$$
* **Tính Hidden State $h_3 = O_3 \odot \tanh(C_3)$:**
  $$\tanh(C_3) = \tanh\begin{pmatrix} 1.1049 \\ 0.6929 \end{pmatrix} = \begin{bmatrix} 0.8023 \\ 0.5999 \end{bmatrix} \implies h_3 = \begin{bmatrix} 0.8494 \times 0.8023 \\ 0.8313 \times 0.5999 \end{bmatrix} = \begin{bmatrix} \mathbf{0.6814} \\ \mathbf{0.4987} \end{bmatrix}$$
* **Tính đầu ra phân lớp $Y_3 = \text{softmax}(W_y \cdot h_3 + b_y)$:**
  $$z_y = \begin{bmatrix} -3.0 & -2.5 \\ 0.2 & -0.5 \\ 3.0 & 2.5 \end{bmatrix} \begin{bmatrix} 0.6814 \\ 0.4987 \end{bmatrix} + \begin{bmatrix} 1.8 \\ 1.2 \\ -1.0 \end{bmatrix} = \begin{bmatrix} -1.4910 \\ 1.0870 \\ 2.2910 \end{bmatrix}$$
  $$Y_3 = \text{softmax}\begin{pmatrix} -1.4910 \\ 1.0870 \\ 2.2910 \end{pmatrix} = \begin{bmatrix} 0.0172 \\ 0.2268 \\ \mathbf{0.7560} \end{bmatrix} \quad \begin{matrix} \text{(Thấp: 1.72\%)} \\ \text{(Trung bình: 22.68\%)} \\ \mathbf{\text{(Quá tải: 75.60\%)}} \end{matrix}$$

---

## 4. Tiếp Nối Sang $t = 4$ (Ngày Mưa Mát — Thấy Rõ Vai Trò "Quên Từng Chiều")

Sang ngày hôm sau, trời bất ngờ đổ mưa mát: $W_4 = [0.20,\; 0.10]^T$, kế thừa $C_3 = [1.1049,\; 0.6929]^T$ và $h_3 = [0.6814,\; 0.4987]^T$. Áp dụng đúng các công thức trên:

| Bước tính tại $t=4$ | Kết quả Vector | Ý nghĩa trực quan khi trình bày |
|---|---|---|
| **Forget Gate ($f_4$)** | $[0.7677,\; \mathbf{0.3511}]^T$ | **Quên mạnh Chiều 2** (chỉ giữ lại **35.11%** áp lực sốc nhiệt), nhưng vẫn giữ **76.77%** Chiều 1 (quán tính nền phụ tải). |
| **Input Gate ($i_4 \odot \tilde{C}_4$)** | $[0.0474,\; -0.0120]^T$ | Cổng vào thu hẹp ($i_4 = [0.4557, 0.3699]^T$), gần như không nạp thêm áp lực nóng mới. |
| **Cell State ($C_4$)** | $[0.8956,\; \mathbf{0.2313}]^T$ | Chiều 2 tụt mạnh từ $0.6929 \to 0.2313$, giải phóng trạng thái căng thẳng. |
| **Output Gate & $h_4$** | $O_4 = [0.6016,\; 0.5611]^T \implies h_4 = [0.4297,\; 0.1275]^T$ | Giảm tín hiệu xuất ra làm trạng thái ngắn hạn. |
| **Dự báo $Y_4$ (`softmax`)** | $[0.1881,\; \mathbf{0.5269},\; 0.2850]^T$ | Chuyển dự báo sang **Trung bình (52.69%)**, thoát khỏi cảnh báo Quá tải! |

---

## 5. Kịch Bản 3 Ý Chốt Hạ Khi Thuyết Trình Cho Team

1. **Khớp 100% với sơ đồ:** Ký hiệu $W_t$ trong slide chính là vector đầu vào tại bước $t$, $h_{t-1}$ và $C_{t-1}$ đi từ ngày trước sang, và đầu ra `softmax` biến $h_t$ thành phân phối xác suất cho các trạng thái của chuỗi thời gian.
2. **Tại sao cần vector nhiều chiều ($d_h \ge 2$)?** Ở ngày $t=4$, Forget Gate cho thấy sức mạnh của phép nhân từng phần tử ($\odot$): nó có thể giữ **76.77%** xu hướng dài hạn ở Chiều 1, nhưng đồng thời xóa mạnh chỉ giữ **35.11%** sốc nhiệt ngắn hạn ở Chiều 2.
3. **Sức mạnh của đường $C_t$:** Nhờ phép cập nhật cộng dồn $C_t = f_t \odot C_{t-1} + i_t \odot \tilde{C}_t$, trạng thái quá tải ngày $t=3$ ($C_3[0] = 1.1049$) không bị biến mất hoàn toàn ngay khi sang ngày $t=4$ ($C_4[0] = 0.8956$), phản ánh đúng **tính quán tính (inertia)** đặc trưng của dữ liệu chuỗi thời gian thực tế.
