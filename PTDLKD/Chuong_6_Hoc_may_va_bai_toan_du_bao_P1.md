# Chương 6: Máy học và Bài toán Dự báo (Phần 1)

> **Môn học:** Phân tích Dữ liệu Kinh doanh (IS403)  
> **Khoa:** Hệ thống Thông tin – Trường Đại học Công nghệ Thông tin (UIT - ĐHQG-HCM)  
> **Giảng viên biên soạn:** ThS. Dương Phi Long (Email: `longdp@uit.edu.vn`)  
> **Tài liệu nguồn:** `DPL_PTDLKD_Chuong 6_Học máy và bài toán dự báo (P1).pdf`  
> **Trọng tâm bài giảng:** Machine Learning & Deep Learning cho Chuỗi thời gian, Mô hình Hỗ trợ Vector phân lớp (SVM) và Mô hình Hỗ trợ Vector hồi quy (SVR).

---

## Mục lục bài học
- [1. Tổng quan ML & DL trong Phân tích Chuỗi thời gian](#1-tổng-quan-ml--dl-trong-phân-tích-chuỗi-thời-gian)
  - [1.1. Bối cảnh và Vai trò](#11-bối-cảnh-và-vai-trò)
  - [1.2. Các phương pháp Machine Learning truyền thống](#12-các-phương-pháp-machine-learning-truyền-thống)
  - [1.3. Các phương pháp Deep Learning hiện đại](#13-các-phương-pháp-deep-learning-hiện-đại)
  - [1.4. Bảng so sánh tổng hợp ML vs DL](#14-bảng-so-sánh-tổng-hợp-ml-vs-dl)
- [2. Nền tảng: Support Vector Machines (SVM)](#2-nền-tảng-support-vector-machines-svm)
  - [2.1. Ý tưởng hình học và Siêu phẳng phân tách](#21-ý-tưởng-hình-học-và-siêu-phẳng-phân-tách)
  - [2.2. Khái niệm Margin và Support Vectors](#22-khái-niệm-margin-và-support-vectors)
  - [2.3. Hard Margin và Soft Margin SVM](#23-hard-margin-và-soft-margin-svm)
  - [2.4. Kernel SVM – Xử lý phi tuyến](#24-kernel-svm--xử-lý-phi-tuyến)
  - [2.5. Tối ưu hóa: Từ Primal sang Dual Lagrangian và Thuật toán SMO](#25-tối-ưu-hóa-từ-primal-sang-dual-lagrangian-và-thuật-toán-smo)
  - [2.6. Ví dụ giải tay chi tiết (Step-by-step Numerical Examples)](#26-ví-dụ-giải-tay-chi-tiết-step-by-step-numerical-examples)
- [3. Chuyên sâu: Support Vector Regression (SVR)](#3-chuyên-sâu-support-vector-regression-svr)
  - [3.1. Chuyển từ Phân loại sang Dự báo Hồi quy](#31-chuyển-từ-phân-loại-sang-dự-báo-hồi-quy)
  - [3.2. Vùng dung sai $\epsilon$-Tube và Biến phạt $\xi, \xi^*$](#32-vùng-dung-sai-\epsilon-tube-và-biến-phạt-\xi-\xi)
  - [3.3. Xây dựng Bài toán Tối ưu SVR](#33-xây-dựng-bài-toán-tối-ưu-svr)
  - [3.4. Mô hình Hồi quy Phi tuyến và Công thức Dự báo](#34-mô-hình-hồi-quy-phi-tuyến-và-công-thức-dự-báo)
- [4. Ý nghĩa ứng dụng trong Phân tích Kinh doanh & Hướng tiếp cận P2](#4-ý-nghĩa-ứng-dụng-trong-phân-tích-kinh-doanh--hướng-tiếp-cận-p2)

---

## 1. Tổng quan ML & DL trong Phân tích Chuỗi thời gian

### 1.1. Bối cảnh và Vai trò
Trong thời đại kinh tế số, các tổ chức thu thập khối lượng dữ liệu khổng lồ theo thời gian (giá chứng khoán, doanh thu bán lẻ, biến động nhu cầu tồn kho, hành vi khách hàng). Các phương pháp thống kê cổ điển (như hồi quy tuyến tính cổ điển OLS, AR, MA, ARIMA) thường dựa trên giả định tính tuyến tính hoặc tính dừng nghiêm ngặt.

Việc ứng dụng **Học máy (Machine Learning – ML)** và **Học sâu (Deep Learning – DL)** giúp hệ thống:
- Tự động học biểu diễn toán học từ dữ liệu lịch sử để dự báo xu hướng tương lai thay vì lập trình hệ thống quy tắc cố định (rule-based).
- Khám phá các mối quan hệ phi tuyến, tương tác đa chiều giữa các biến kinh tế – xã hội.

### 1.2. Các phương pháp Machine Learning truyền thống
> [!NOTE]
> **Hạn chế cố hữu của ML truyền thống trong chuỗi thời gian:**
> 1. Phụ thuộc lớn vào việc **trích xuất đặc trưng thủ công** (feature engineering: lag features, rolling mean/std, seasonal indicators).
> 2. Khó nắm bắt các mối liên hệ phụ thuộc xa trong chuỗi (long-term dependencies).
> 3. Hạn chế khả năng thích nghi khi cấu trúc dữ liệu biến động phi tuyến phức tạp.

Các thuật toán ML phổ biến:
1. **Hồi quy tuyến tính (Linear Regression):**
   - Dự báo giá trị tương lai dựa trên hàm tuyến tính của dữ liệu lịch sử.
   - *Ví dụ:* Dự báo doanh thu quý dựa trên xu hướng tăng trưởng của các quý trước.
2. **Cây quyết định (Decision Tree) & Rừng ngẫu nhiên (Random Forest):**
   - Mô phỏng các quan hệ phi tuyến dạng phân nhánh quyết định.
   - Random Forest tổng hợp nhiều cây (ensemble learning) giúp giảm thiểu hiện tượng quá khớp (overfitting).
3. **K-Nearest Neighbors (KNN):**
   - Tìm kiếm $K$ điểm dữ liệu lịch sử có thuộc tính hoặc hình mẫu tương tự để nội suy ra kết quả dự báo.
4. **Support Vector Regression (SVR):**
   - Ứng dụng nguyên lý Vector hỗ trợ vào bài toán hồi quy với độ chính xác cao và khả năng mô hình hóa phi tuyến vượt trội nhờ hàm Kernel.

### 1.3. Các phương pháp Deep Learning hiện đại
Học sâu sử dụng mạng nơ-ron đa tầng (Deep Neural Networks) với khả năng **tự động trích xuất đặc trưng** từ mức thô đến mức trừu tượng:

- **Recurrent Neural Network (RNN):**
  - Mạng nơ-ron hồi tiếp có trạng thái ẩn (*hidden state*) lưu vết thông tin tuần tự qua từng bước thời gian.
  - *Hạn chế:* Dễ bị **tiêu biến đạo hàm (vanishing gradient)** hoặc bùng nổ đạo hàm (exploding gradient), làm mô hình nhanh chóng "quên" thông tin ở quá khứ xa.
- **Long Short-Term Memory (LSTM):**
  - Khắc phục triệt để nhược điểm của RNN nhờ tích hợp cấu trúc **Cell State** và 3 cổng điều khiển: Cổng quên (*Forget Gate*), Cổng đầu vào (*Input Gate*) và Cổng đầu ra (*Output Gate*).
  - *Ứng dụng:* Dự báo tài chính, chuỗi tín hiệu cảm biến IoT công nghiệp, nhu cầu thị trường biến động dài hạn.
- **Gated Recurrent Units (GRU):**
  - Phiên bản tinh gọn của LSTM: gom trạng thái ẩn và cell state làm một, chỉ dùng 2 cổng (*Reset Gate* và *Update Gate*).
  - Tốc độ huấn luyện nhanh hơn, ít tham số hơn, phù hợp khi nguồn tài nguyên tính toán có giới hạn.
- **Convolutional Neural Network (CNN 1D):**
  - Trích xuất hiệu quả các đặc trưng cục bộ (*local invariant patterns*) theo cửa sổ trượt thời gian; thường kết hợp thành mô hình lai CNN-LSTM.
- **Transformer:**
  - Kiến trúc đột phá dựa trên cơ chế **Tự chú ý (Self-Attention)**, cho phép xử lý toàn chuỗi song song (không tuần tự như RNN), nắm bắt tương quan giữa mọi mốc thời gian bất kể cự ly.

### 1.4. Bảng so sánh tổng hợp ML vs DL

| Tiêu chí so sánh | Machine Learning (ML) | Deep Learning (DL) |
| :--- | :--- | :--- |
| **Kỹ thuật trích xuất đặc trưng** | Thủ công (Domain Knowledge & Engineering) | Tự động học sâu qua các tầng ẩn |
| **Quy mô tập dữ liệu phù hợp** | Vừa và nhỏ ($< 10^4 - 10^5$ mẫu) | Cần dữ liệu lớn để tránh overfitting |
| **Khả năng nhớ phụ thuộc dài hạn** | Thấp, phải tạo các biến trễ (lag) phức tạp | Rất tốt (nhờ cơ chế Gates / Attention) |
| **Tài nguyên tính toán & Tốc độ** | Huấn luyện nhanh trên CPU thông thường | Đòi hỏi GPU/TPU với thời gian train lâu |
| **Khả năng diễn giải toán học** | Rõ ràng, dễ chứng minh tính hội tụ | Mô hình "hộp đen" (Black box), khó giải thích |

---

## 2. Nền tảng: Support Vector Machines (SVM)

### 2.1. Ý tưởng hình học và Siêu phẳng phân tách
Support Vector Machine (SVM) là thuật toán học có giám sát kinh điển cho bài toán phân loại nhị phân (*Binary Classification*).

**Mục tiêu:** Trong không gian $d$ chiều biểu diễn bởi vector đặc trưng $\mathbf{x} \in \mathbb{R}^d$, tìm một **siêu phẳng (hyperplane)** phân cách có số chiều $d-1$:
$$\mathbf{w}^T \mathbf{x} + b = 0$$
để chia không gian thành 2 nửa miền riêng biệt, mỗi miền chứa trọn vẹn một lớp dữ liệu ($y_i \in \{+1, -1\}$).

![Ý tưởng siêu phẳng phân tách trong SVM](images/svm_concept_hyperplane.jpg)
*Hình 1: Siêu phẳng phân chia không gian đặc trưng thành hai miền phân lớp.*

---

### 2.2. Khái niệm Margin và Support Vectors
Có vô số siêu phẳng có thể tách được dữ liệu, nhưng siêu phẳng tốt nhất là siêu phẳng có **lề (Margin) rộng nhất** (còn gọi là *Maximum Margin Classifier*).

![Siêu phẳng có lề cực đại Maximum Margin](images/svm_maximum_margin.png)
*Hình 2: Phân tách dữ liệu sao cho khoảng cách từ siêu phẳng đến các điểm gần nhất của cả hai lớp là lớn nhất.*

#### Khoảng cách hình học từ điểm đến siêu phẳng
Khoảng cách từ một điểm $\mathbf{x}_i$ đến siêu phẳng $\mathbf{w}^T \mathbf{x} + b = 0$ được tính bằng:
$$d(\mathbf{x}_i) = \frac{|\mathbf{w}^T \mathbf{x}_i + b|}{\|\mathbf{w}\|_2}$$
trong đó $\|\mathbf{w}\|_2 = \sqrt{\sum_{j=1}^d w_j^2}$ là chuẩn Euclid của vector trọng số.

![Khoảng cách từ điểm dữ liệu đến siêu phẳng](images/svm_point_distance.png)
*Hình 3: Thiết lập toán học khoảng cách từ điểm dữ liệu đến siêu phẳng phân tách.*

#### Support Vectors (Các vector hỗ trợ)
- Là những điểm dữ liệu nằm sát siêu phẳng nhất, nằm chính xác trên các đường biên song song:
  $$\mathbf{w}^T \mathbf{x} + b = \pm 1 \iff y_i(\mathbf{w}^T \mathbf{x}_i + b) = 1$$
- Chúng giữ vai trò "cột chống" quyết định vị trí và hướng của siêu phẳng. Nếu loại bỏ các điểm khác ngoài tập Support Vectors, siêu phẳng tối ưu hoàn toàn không thay đổi.

![Vector hỗ trợ và Lề phân tách](images/svm_support_vectors_margin.jpg)
*Hình 4: Vị trí của Support Vectors và bề rộng Margin.*

Bề rộng lề phân tách (Margin) giữa hai lớp là:
$$\text{Margin} = \frac{2}{\|\mathbf{w}\|}$$
Do đó, bài toán tối đại hóa Margin tương đương với bài toán tối thiểu hóa chuẩn của $\mathbf{w}$:
$$\min_{\mathbf{w}, b} \frac{1}{2} \|\mathbf{w}\|^2 \quad \text{với ràng buộc:} \quad y_i(\mathbf{w}^T \mathbf{x}_i + b) \ge 1, \quad \forall i=1,\dots,N$$

---

### 2.3. Hard Margin và Soft Margin SVM

> [!WARNING]
> **Hạn chế của Hard Margin SVM:**  
> Hard Margin đòi hỏi toàn bộ dữ liệu phải phân tách hoàn hảo ($100\%$). Khi dữ liệu xuất hiện nhiễu (noise) hoặc các điểm nằm lấn sang vùng lân cận, bài toán Hard Margin sẽ không tìm được nghiệm khả thi.

![Nhu cầu sử dụng Soft Margin khi dữ liệu có nhiễu](images/soft_margin_need.png)
*Hình 5: Hard Margin thất bại khi dữ liệu có nhiễu (a) hoặc gần như phân tách tuyến tính (b).*

#### Cơ chế Soft Margin và Biến độ chùng $\xi_i$
Để chấp nhận mức sai số có kiểm soát, thuật toán đưa vào **biến độ chùng (slack variable) $\xi_i \ge 0$**:
- Điểm nằm đúng miền an toàn ngoài biên: $\xi_i = 0$.
- Điểm nằm trong vùng lề nhưng phân loại đúng: $0 < \xi_i \le 1$.
- Điểm bị phân loại sai: $\xi_i > 1$.

Công thức biến độ chùng:
$$\xi_i = \max\left(0, 1 - y_i(\mathbf{w}^T \mathbf{x}_i + b)\right)$$

![Biến độ chùng xi trong Soft Margin SVM](images/svm_slack_variable.png)
*Hình 6: Phân bố các điểm vi phạm vùng biên tương ứng với biến độ chùng $\xi_i$.*

Hàm mục tiêu Soft Margin (Primal Form):
$$\min_{\mathbf{w}, b, \boldsymbol{\xi}} \left( \frac{1}{2}\|\mathbf{w}\|^2 + C \sum_{i=1}^N \xi_i \right)$$
$$\text{Thỏa mãn ràng buộc:} \quad y_i(\mathbf{w}^T \mathbf{x}_i + b) \ge 1 - \xi_i, \quad \xi_i \ge 0 \quad (\forall i=1,\dots,N)$$

> [!TIP]
> **Vai trò của siêu tham số $C > 0$:**
> - **$C$ lớn:** Phạt rất nặng các điểm vi phạm $\implies$ Biên hẹp lại, giảm sai số huấn luyện nhưng dễ bị quá khớp (*Overfitting*).
> - **$C$ nhỏ:** Chấp nhận nhiều điểm vi phạm hơn $\implies$ Biên mở rộng hơn, mô hình có tính tổng quát hóa tốt hơn nhưng có thể bị dưới khớp (*Underfitting*).

---

### 2.4. Kernel SVM – Xử lý phi tuyến

Khi dữ liệu không thể phân tách tuyến tính trong không gian ban đầu, **Kernel Trick** cho phép ánh xạ phi tuyến dữ liệu từ không gian đặc trưng $\mathbb{R}^d$ lên không gian mới nhiều chiều hơn $\mathcal{H}$ (Không gian Hilbert): $\mathbf{x} \mapsto \phi(\mathbf{x})$.

![Biến đổi không gian qua Kernel Trick](images/kernel_trick_transformation.png)
*Hình 7: Minh họa Kernel Trick: (a) Dữ liệu 2D phi tuyến $\implies$ (b) Ánh xạ lên không gian 3D $z = x_1^2 + x_2^2$ để tách bằng siêu phẳng phẳng $\implies$ (c) Chiếu ngược lại 2D tạo thành đường biên ellipse phân tách.*

![Hàm Kernel ánh xạ đặc trưng](images/kernel_mapping_function.jpg)
*Hình 8: Nguyên lý hàm Kernel tính trực tiếp tích vô hướng $K(\mathbf{x}, \mathbf{z}) = \langle \phi(\mathbf{x}), \phi(\mathbf{z}) \rangle$.*

#### Điều kiện Mercer
Hàm $K(\mathbf{x}, \mathbf{z})$ là một hàm Kernel hợp lệ khi và chỉ khi:
1. **Tính đối xứng:** $K(\mathbf{x}, \mathbf{z}) = K(\mathbf{z}, \mathbf{x})$.
2. **Ma trận Gram nửa xác định dương (PSD):** Với mọi tập điểm, ma trận $K_{ij} = K(\mathbf{x}_i, \mathbf{x}_j)$ thỏa mãn:
   $$\forall \mathbf{v} \in \mathbb{R}^N, \quad \mathbf{v}^T \mathbf{K} \mathbf{v} \ge 0$$

#### Các hàm Kernel thông dụng

| Loại Kernel | Công thức toán học $K(\mathbf{x}, \mathbf{z})$ | Ứng dụng & Đặc điểm |
| :--- | :--- | :--- |
| **Linear (Tuyến tính)** | $\mathbf{x}^T \mathbf{z}$ | Dữ liệu số chiều lớn (phân loại văn bản, text mining). Nhanh, ít tham số. |
| **Polynomial (Đa thức)** | $(\gamma \mathbf{x}^T \mathbf{z} + r)^d$ | Học tương tác bậc cao giữa các biến. Bậc $d$ càng cao mô hình càng phức tạp. |
| **RBF / Gaussian** | $\exp(-\gamma \|\mathbf{x} - \mathbf{z}\|^2)$ với $\gamma = \frac{1}{2\sigma^2}$ | **Phổ biến nhất**. Ánh xạ sang không gian vô hạn chiều, mô phỏng độ tương đồng. |
| **Sigmoid** | $\tanh(\gamma \mathbf{x}^T \mathbf{z} + r)$ | Mô phỏng mạng nơ-ron đơn tầng. Cần kiểm tra kỹ tính nửa xác định dương. |

---

### 2.5. Tối ưu hóa: Từ Primal sang Dual Lagrangian và Thuật toán SMO

Để giải bài toán tối ưu lồi Soft Margin có ràng buộc bất đẳng thức, ta thiết lập hàm Lagrangian:

#### Bước 1: Xây dựng hàm Lagrangian
$$\mathcal{L}(\mathbf{w}, b, \boldsymbol{\xi}, \boldsymbol{\alpha}, \boldsymbol{\beta}) = \frac{1}{2}\|\mathbf{w}\|^2 + C \sum_{i=1}^N \xi_i - \sum_{i=1}^N \alpha_i \left[ y_i(\mathbf{w}^T \mathbf{x}_i + b) - 1 + \xi_i \right] - \sum_{i=1}^N \beta_i \xi_i$$
với các nhân tử Lagrange $\alpha_i \ge 0, \beta_i \ge 0$.

#### Bước 2: Điều kiện tối ưu KKT (Karush-Kuhn-Tucker)
Cho các đạo hàm riêng theo các biến nguyên thủy bằng 0:
- $\frac{\partial \mathcal{L}}{\partial \mathbf{w}} = 0 \implies \mathbf{w} = \sum_{i=1}^N \alpha_i y_i \mathbf{x}_i$
- $\frac{\partial \mathcal{L}}{\partial b} = 0 \implies \sum_{i=1}^N \alpha_i y_i = 0$
- $\frac{\partial \mathcal{L}}{\partial \xi_i} = 0 \implies C - \alpha_i - \beta_i = 0 \implies 0 \le \alpha_i \le C$ (do $\beta_i \ge 0$)

#### Bước 3: Bài toán Đối ngẫu (Dual Form)
Thay ngược các điều kiện trên vào hàm Lagrangian, bài toán chuyển thành dạng Quy hoạch toàn phương (Quadratic Programming):
$$\max_{\boldsymbol{\alpha}} \left( \sum_{i=1}^N \alpha_i - \frac{1}{2} \sum_{i=1}^N \sum_{j=1}^N \alpha_i \alpha_j y_i y_j K(\mathbf{x}_i, \mathbf{x}_j) \right)$$
$$\text{Ràng buộc:} \quad 0 \le \alpha_i \le C \quad (\forall i=1,\dots,N) \quad \text{và} \quad \sum_{i=1}^N \alpha_i y_i = 0$$

#### Bước 4: Thuật toán SMO (Sequential Minimal Optimization)
- Đề xuất bởi John Platt (Microsoft, 1998) để giải bài toán QP quy mô lớn mà không cần lưu trữ nghịch đảo toàn bộ ma trận Gram $N \times N$.
- **Ý tưởng:** Ở mỗi vòng lặp, chọn cặp 2 hệ số $(\alpha_i, \alpha_j)$ để tối ưu giải tích trực tiếp trong khi cố định tất cả các hệ số $\alpha_k$ còn lại. Lặp lại quá trình này cho đến khi toàn bộ các điều kiện KKT được thỏa mãn trong ngưỡng dung sai.

#### Bước 5: Hàm quyết định dự đoán
Sau khi xác định được dãy nghiệm $\boldsymbol{\alpha}^*$:
$$f(\mathbf{x}) = \text{sign}\left( \sum_{i \in \text{SV}} \alpha_i y_i K(\mathbf{x}_i, \mathbf{x}) + b \right)$$
trong đó hệ số chệch $b$ được tính trung bình trên các Free Support Vectors ($0 < \alpha_k < C$):
$$b = \frac{1}{|SV_{free}|} \sum_{k \in SV_{free}} \left( y_k - \sum_{i=1}^N \alpha_i y_i K(\mathbf{x}_i, \mathbf{x}_k) \right)$$

---

### 2.6. Ví dụ giải tay chi tiết (Step-by-step Numerical Examples)

#### Ví dụ 1: Tuyến tính không sử dụng Kernel
Cho 3 mẫu huấn luyện trong không gian 2 chiều:
- $\mathbf{x}_1 = (1, 0)^T, \quad y_1 = +1$
- $\mathbf{x}_2 = (0, 1)^T, \quad y_2 = +1$
- $\mathbf{x}_3 = (0, 0)^T, \quad y_3 = -1$

**1. Tính ma trận tích vô hướng (Gram Matrix):**
$$\mathbf{K} = \begin{bmatrix}
\mathbf{x}_1^T \mathbf{x}_1 & \mathbf{x}_1^T \mathbf{x}_2 & \mathbf{x}_1^T \mathbf{x}_3 \\
\mathbf{x}_2^T \mathbf{x}_1 & \mathbf{x}_2^T \mathbf{x}_2 & \mathbf{x}_2^T \mathbf{x}_3 \\
\mathbf{x}_3^T \mathbf{x}_1 & \mathbf{x}_3^T \mathbf{x}_2 & \mathbf{x}_3^T \mathbf{x}_3
\end{bmatrix} = \begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 0
\end{bmatrix}$$

**2. Khai triển ràng buộc:**
$$\sum_{i=1}^3 \alpha_i y_i = 0 \iff \alpha_1(1) + \alpha_2(1) + \alpha_3(-1) = 0 \implies \alpha_3 = \alpha_1 + \alpha_2$$

**3. Thiết lập hàm mục tiêu đối ngẫu:**
$$\mathcal{L}_D = (\alpha_1 + \alpha_2 + \alpha_3) - \frac{1}{2} \sum_{i=1}^3 \sum_{j=1}^3 \alpha_i \alpha_j y_i y_j (\mathbf{x}_i^T \mathbf{x}_j)$$
Thay $\alpha_3 = \alpha_1 + \alpha_2$ và các giá trị tích vô hướng:
$$\mathcal{L}_D = (\alpha_1 + \alpha_2 + (\alpha_1 + \alpha_2)) - \frac{1}{2} \left[ \alpha_1^2(1) + \alpha_2^2(1) \right] = 2\alpha_1 - \frac{1}{2}\alpha_1^2 + 2\alpha_2 - \frac{1}{2}\alpha_2^2$$

**4. Tìm cực đại:**
Lấy đạo hàm riêng:
$$\frac{\partial \mathcal{L}_D}{\partial \alpha_1} = 2 - \alpha_1 = 0 \implies \alpha_1^* = 2$$
$$\frac{\partial \mathcal{L}_D}{\partial \alpha_2} = 2 - \alpha_2 = 0 \implies \alpha_2^* = 2$$
Suy ra:
$$\alpha_3^* = \alpha_1^* + \alpha_2^* = 2 + 2 = 4$$
Vì $\alpha_1^*, \alpha_2^*, \alpha_3^* > 0$, **cả 3 điểm đều là Support Vectors**.

**5. Xác định trọng số $\mathbf{w}$ và hệ số chệch $b$:**
$$\mathbf{w} = \sum_{i=1}^3 \alpha_i y_i \mathbf{x}_i = 2(1)\begin{pmatrix}1\\0\end{pmatrix} + 2(1)\begin{pmatrix}0\\1\end{pmatrix} + 4(-1)\begin{pmatrix}0\\0\end{pmatrix} = \begin{pmatrix}2\\2\end{pmatrix}$$
Tính hệ số $b$ từ điểm $\mathbf{x}_1(1,0)$ với nhãn $y_1=1$:
$$y_1(\mathbf{w}^T \mathbf{x}_1 + b) = 1 \iff 1 \cdot (2 \cdot 1 + 2 \cdot 0 + b) = 1 \implies b = -1$$
Phương trình siêu phẳng phân tách:
$$2x_1 + 2x_2 - 1 = 0$$

**6. Kiểm tra lại và tính Margin:**
- Độ dài vector pháp tuyến: $\|\mathbf{w}\|_2 = \sqrt{2^2 + 2^2} = \sqrt{8} = 2\sqrt{2}$
- Bề rộng Margin: $\text{Margin} = \frac{2}{\|\mathbf{w}\|} = \frac{2}{2\sqrt{2}} = \frac{1}{\sqrt{2}} \approx 0.7071$
- Khoảng cách từ siêu phẳng đến support vector: $\frac{1}{\|\mathbf{w}\|} = \frac{1}{2\sqrt{2}} \approx 0.3536$
- Kiểm tra các mẫu:
  - $\mathbf{x}_1(1,0): 2(1) + 2(0) - 1 = +1 > 0 \implies \text{Class } +1$ (Đúng)
  - $\mathbf{x}_2(0,1): 2(0) + 2(1) - 1 = +1 > 0 \implies \text{Class } +1$ (Đúng)
  - $\mathbf{x}_3(0,0): 2(0) + 2(0) - 1 = -1 < 0 \implies \text{Class } -1$ (Đúng)

---

#### Ví dụ 2: Dữ liệu trên kết hợp RBF Kernel ($\gamma = 1$)
Công thức RBF: $K(\mathbf{x}_i, \mathbf{x}_j) = \exp\left(-\frac{\|\mathbf{x}_i - \mathbf{x}_j\|^2}{2}\right)$:
- $K(\mathbf{x}_1, \mathbf{x}_1) = K(\mathbf{x}_2, \mathbf{x}_2) = K(\mathbf{x}_3, \mathbf{x}_3) = \exp(0) = 1$
- $\|\mathbf{x}_1 - \mathbf{x}_2\|^2 = (1-0)^2 + (0-1)^2 = 2 \implies K(\mathbf{x}_1, \mathbf{x}_2) = \exp(-1) \approx 0.3679$
- $\|\mathbf{x}_1 - \mathbf{x}_3\|^2 = 1^2 + 0^2 = 1 \implies K(\mathbf{x}_1, \mathbf{x}_3) = \exp(-0.5) \approx 0.6065$
- $\|\mathbf{x}_2 - \mathbf{x}_3\|^2 = 0^2 + 1^2 = 1 \implies K(\mathbf{x}_2, \mathbf{x}_3) = \exp(-0.5) \approx 0.6065$

Ma trận Gram đối xứng thu được:
$$\mathbf{K}_{RBF} = \begin{bmatrix}
1 & 0.3679 & 0.6065 \\
0.3679 & 1 & 0.6065 \\
0.6065 & 0.6065 & 1
\end{bmatrix}$$
Từ ma trận $\mathbf{K}_{RBF}$, thuật toán SMO sẽ giải hệ phương trình bậc 2 để tìm bộ nghiệm $\boldsymbol{\alpha}^*$ tối ưu trong không gian đặc trưng phi tuyến.

---

## 3. Chuyên sâu: Support Vector Regression (SVR)

### 3.1. Chuyển từ Phân loại sang Dự báo Hồi quy
Trong bài toán hồi quy chuỗi thời gian, mục tiêu là tìm kiếm một hàm liên tục $f(\mathbf{x}) = \mathbf{w}^T \mathbf{x} + b$ mô phỏng sát nhất các giá trị thực $y_i \in \mathbb{R}$.

Khác với hồi quy tuyến tính cổ điển (OLS) luôn phạt mọi độ lệch bình phương $(y_i - \hat{y}_i)^2$, SVR sử dụng hàm tổn thất không nhạy $\epsilon$ (**$\epsilon$-insensitive loss function**).

![Khái niệm ống sai số trong SVR](images/svr_concept_tube.png)
*Hình 9: SVR tìm siêu phẳng xấp xỉ liên tục bên trong một ống sai số chấp nhận được (epsilon-tube).*

---

### 3.2. Vùng dung sai $\epsilon$-Tube và Biến phạt $\xi, \xi^*$

**Hành lang dung sai $\epsilon$-Tube:**
Xung quanh đường dự báo $f(\mathbf{x})$, ta thiết lập một hành lang có độ rộng $\pm \epsilon$:
- Nếu điểm dữ liệu nằm gọn bên trong ống: $|y_i - f(\mathbf{x}_i)| \le \epsilon \implies$ Sai số bằng 0 (không bị phạt).
- Nếu điểm dữ liệu rơi ra ngoài ống: Bị phạt tuyến tính tương ứng với khoảng cách vượt biên.

![Ống sai số và các biến độ chùng trong SVR](images/svr_epsilon_tube_slack.png)
*Hình 10: Minh họa dải $\epsilon$-tube và hai biến độ chùng phạt trên $\xi_i$ và phạt dưới $\xi_i^*$.*

#### Hai biến độ chùng 2 phía:
1. **$\xi_i$ (Phạt trên):** Điểm thực tế nằm cao hơn trần ống:
   $$\xi_i = \max\left(0, y_i - f(\mathbf{x}_i) - \epsilon\right)$$
2. **$\xi_i^*$ (Phạt dưới):** Điểm thực tế nằm thấp hơn sàn ống:
   $$\xi_i^* = \max\left(0, f(\mathbf{x}_i) - y_i - \epsilon\right)$$

---

### 3.3. Xây dựng Bài toán Tối ưu SVR

#### 1. Dạng nguyên thủy (Primal Form):
$$\min_{\mathbf{w}, b, \boldsymbol{\xi}, \boldsymbol{\xi}^*} \left( \frac{1}{2}\|\mathbf{w}\|^2 + C \sum_{i=1}^N (\xi_i + \xi_i^*) \right)$$
$$\text{Ràng buộc:} \quad \begin{cases}
y_i - \mathbf{w}^T \phi(\mathbf{x}_i) - b \le \epsilon + \xi_i \\
\mathbf{w}^T \phi(\mathbf{x}_i) + b - y_i \le \epsilon + \xi_i^* \\
\xi_i \ge 0, \quad \xi_i^* \ge 0 \quad (\forall i=1,\dots,N)
\end{cases}$$

#### 2. Dạng đối ngẫu (Dual Form):
Sử dụng các cặp nhân tử Lagrange $\alpha_i, \alpha_i^* \ge 0$:
$$\max_{\boldsymbol{\alpha}, \boldsymbol{\alpha}^*} \left( -\frac{1}{2}\sum_{i=1}^N \sum_{j=1}^N (\alpha_i^* - \alpha_i)(\alpha_j^* - \alpha_j) K(\mathbf{x}_i, \mathbf{x}_j) - \epsilon \sum_{i=1}^N (\alpha_i^* + \alpha_i) + \sum_{i=1}^N y_i (\alpha_i^* - \alpha_i) \right)$$
$$\text{Ràng buộc:} \quad 0 \le \alpha_i, \alpha_i^* \le C \quad (\forall i=1,\dots,N) \quad \text{và} \quad \sum_{i=1}^N (\alpha_i^* - \alpha_i) = 0$$

Thuật toán SMO tiếp tục được áp dụng tương tự để tìm ra nghiệm tối ưu $(\alpha_i^*, \alpha_i)$.

---

### 3.4. Mô hình Hồi quy Phi tuyến và Công thức Dự báo

Sau khi tối ưu hóa:
- Vector trọng số trong không gian đặc trưng:
  $$\mathbf{w} = \sum_{i=1}^N (\alpha_i^* - \alpha_i) \phi(\mathbf{x}_i)$$
- **Hàm dự báo SVR cho mẫu mới $\mathbf{x}$:**
  $$\hat{y}(\mathbf{x}) = \sum_{i \in \text{SV}} (\alpha_i^* - \alpha_i) K(\mathbf{x}_i, \mathbf{x}) + b$$

![Hồi quy phi tuyến SVR với Kernel](images/svr_nonlinear_regression.png)
*Hình 11: Mô hình SVR phi tuyến $\hat{y}(\mathbf{x}) = \mathbf{w}^T \phi(\mathbf{x}) + b$ mô phỏng đường cong dự báo bao bọc bởi dải $\epsilon$-tube.*

#### Đặc điểm của Support Vectors trong SVR:
- Điểm nằm hoàn toàn bên trong ống: $\alpha_i = 0$ và $\alpha_i^* = 0$ $\implies$ Không ảnh hưởng đến hàm dự báo.
- Điểm là **Support Vectors** khi và chỉ khi $\alpha_i > 0$ hoặc $\alpha_i^* > 0$ (tức là những điểm nằm sát trên đường biên ống hoặc nằm lệch hẳn ra ngoài ống).
- Mô hình SVR có **tính thưa (Sparsity)** cao: chỉ một tỷ lệ nhỏ các điểm dữ liệu trở thành Support Vectors, giúp tốc độ dự báo rất nhanh khi triển khai thực tế.

---

## 4. Ý nghĩa ứng dụng trong Phân tích Kinh doanh & Hướng tiếp cận P2

### 4.1. Giá trị ứng dụng thực tiễn của SVR
1. **Dự báo chuỗi tài chính & Doanh số có tính phi tuyến:** Khác với các mô hình tuyến tính đơn giản, SVR kết hợp với RBF Kernel có thể xấp xỉ bất kỳ hàm liên tục phức tạp nào.
2. **Kháng nhiễu và ngoại lai (Robustness):** Nhờ hàm tổn thất $\epsilon$-insensitive và mức phạt bậc nhất đối với các điểm vi phạm, SVR không bị kéo lệch quá đà bởi các điểm dị biệt (outliers) như mô hình OLS bình phương tối thiểu.
3. **Phù hợp với tập dữ liệu vừa và nhỏ:** Trong các bài toán kinh doanh khi dữ liệu lịch sử chưa đủ lớn để huấn luyện các mạng Deep Learning (như LSTM, Transformer), SVR là sự lựa chọn cân bằng tối ưu giữa độ chính xác, tốc độ huấn luyện và khả năng chống quá khớp.

### 4.2. Bộ ba siêu tham số then chốt cần tinh chỉnh trong SVR
Khi triển khai mô hình SVR trên thực tế (qua Grid Search hoặc Bayesian Optimization với `TimeSeriesSplit`):
- **$C$ (Penalty Factor):** Cân bằng giữa độ phẳng của hàm và mức độ chịu lỗi vi phạm.
- **$\epsilon$ (Epsilon):** Xác định độ rộng của vùng dung sai. $\epsilon$ càng lớn thì mô hình càng thưa (ít support vectors), tính tổng quát hóa càng cao nhưng có thể làm giảm độ khít chi tiết.
- **$\gamma$ (Gamma trong Kernel RBF):** Điều chỉnh bán kính ảnh hưởng của từng điểm dữ liệu mẫu. Cần chọn cẩn thận để tránh đường cong dự báo bị quá gợn sóng cục bộ quanh dữ liệu huấn luyện.

### 4.3. Định hướng kiến thức sang Phần 2 (P2)
Tài liệu Phần 1 đã cung cấp bức tranh toàn diện và nền tảng toán học của SVM/SVR. Trong **Phần 2 của Chương 6**, nội dung sẽ mở rộng sang:
- Kiến trúc chuyên sâu và huấn luyện mạng nơ-ron hồi tiếp: **RNN, LSTM, GRU**.
- Các kỹ thuật trích xuất đặc trưng chuỗi thời gian nâng cao.
- Bài toán phát hiện bất thường trong dòng giao dịch kinh doanh (**Anomaly Detection & Isolation Forest**).
