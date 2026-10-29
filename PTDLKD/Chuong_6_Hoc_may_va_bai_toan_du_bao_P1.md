# Chương 6: Máy học và Bài toán Dự báo (Phần 1)
> **Môn học:** Phân tích Dữ liệu Kinh doanh (IS403)  
> **Giảng viên biên soạn:** ThS. Dương Phi Long (UIT - ĐHQG-HCM)  
> **Tài liệu nguồn:** `DPL_PTDLKD_Chuong 6_Học máy và bài toán dự báo (P1).pdf`  
> **Chủ đề chính:** Tổng quan ML/DL trong Phân tích Chuỗi thời gian, Support Vector Machines (SVM) & Support Vector Regression (SVR).

---

## Mục lục
1. [Tổng quan ML & DL trong Phân tích Chuỗi thời gian](#1-tổng-quan-ml--dl-trong-phân-tích-chuỗi-thời-gian)
   - [1.1. Bối cảnh và Khái niệm](#11-bối-cảnh-và-khái-niệm)
   - [1.2. Các phương pháp Machine Learning (ML)](#12-các-phương-pháp-machine-learning-ml)
   - [1.3. Các phương pháp Deep Learning (DL)](#13-các-phương-pháp-deep-learning-dl)
   - [1.4. Bảng so sánh ML vs DL trong Chuỗi thời gian](#14-bảng-so-sánh-ml-vs-dl-trong-chuỗi-thời-gian)
2. [Cơ sở nền tảng: Support Vector Machines (SVM)](#2-cơ-sở-nền-tảng-support-vector-machines-svm)
   - [2.1. Bản chất và Ý tưởng hình học](#21-bản-chất-và-ý-tưởng-hình-học)
   - [2.2. Khoảng cách và Biên (Margin)](#22-khoảng-cách-và-biên-margin)
   - [2.3. Hard Margin vs Soft Margin](#23-hard-margin-vs-soft-margin)
   - [2.4. Kernel SVM (Phi tuyến)](#24-kernel-svm-phi-tuyến)
   - [2.5. Tối ưu hóa: Primal, Dual Lagrangian và Thuật toán SMO](#25-tối-ưu-hóa-primal-dual-lagrangian-và-thuật-toán-smo)
   - [2.6. Ví dụ giải tay chi tiết (Numerical Examples)](#26-ví-dụ-giải-tay-chi-tiết-numerical-examples)
3. [Chuyên sâu: Support Vector Regression (SVR)](#3-chuyên-sâu-support-vector-regression-svr)
   - [3.1. Chuyển từ Phân loại sang Hồi quy chuỗi](#31-chuyển-từ-phân-loại-sang-hồi-quy-chuỗi)
   - [3.2. Vùng dung sai $\epsilon$-Tube & Biến độ chùng $(\xi, \xi^*)$](#32-vùng-dung-sai-\epsilon-tube--biến-độ-chùng-\xi-\xi)
   - [3.3. Xây dựng Bài toán Tối ưu SVR (Primal & Dual Form)](#33-xây-dựng-bài-toán-tối-ưu-svr-primal--dual-form)
   - [3.4. Hàm dự báo phi tuyến trong SVR](#34-hàm-dự-báo-phi-tuyến-trong-svr)
4. [Ứng dụng trong Phân tích Dữ liệu Kinh doanh & Kết luận](#4-ứng-dụng-trong-phân-tích-dữ-liệu-kinh-doanh--kết-luận)

---

## 1. Tổng quan ML & DL trong Phân tích Chuỗi thời gian

### 1.1. Bối cảnh và Khái niệm
- **Bối cảnh:** Lượng dữ liệu kinh doanh ngày càng lớn, đa dạng và biến động theo thời gian (giá cổ phiếu, doanh số, lượng truy cập, nhu cầu tồn kho...). Việc áp dụng Học máy (Machine Learning - ML) và Học sâu (Deep Learning - DL) mở ra hướng tiếp cận có khả năng nắm bắt được quy luật phi tuyến và phức tạp mà các phương pháp thống kê cổ điển (như AR, MA, ARIMA) khó xử lý toàn diện.
- **Machine Learning (Học máy):** Nhánh của AI cho phép hệ thống tự học các mẫu hình từ dữ liệu quá khứ và cải thiện độ chính xác dự báo mà không cần lập trình các quy tắc cứng nhắc (hard-coded rules).

### 1.2. Các phương pháp Machine Learning (ML)
- **Hạn chế cố hữu của ML truyền thống trên chuỗi thời gian:**
  1. Đòi hỏi kỹ thuật trích xuất đặc trưng thủ công (manual feature engineering: lag features, rolling statistics, windowing...).
  2. Khó nắm bắt các mối quan hệ phụ thuộc dài hạn (long-term dependencies).
  3. Dễ bị giới hạn khi dữ liệu mang tính phi tuyến cao.

- **Các thuật toán ML tiêu biểu:**
  1. **Linear Regression (Hồi quy tuyến tính):** Dự báo giá trị tương lai theo xu hướng tuyến tính của dữ liệu lịch sử (VD: dự báo doanh thu tháng dựa trên xu hướng tăng trưởng).
  2. **Decision Tree & Random Forest:** Dạng cây phân nhánh mô phỏng tương tác phi tuyến giữa các đặc trưng. Random Forest kết hợp nhiều cây (ensemble) giúp kiểm soát và giảm thiểu hiện tượng quá khớp (overfitting).
  3. **Support Vector Regression (SVR):** Biến thể hồi quy của SVM, có độ chính xác cao và khả năng mô hình hóa mối quan hệ phi tuyến mạnh mẽ thông qua Kernel.
  4. **K-Nearest Neighbors (KNN):** Tìm kiếm $K$ điểm dữ liệu lịch sử có mẫu biến động gần tương đồng nhất trong không gian đặc trưng để đưa ra dự báo.

### 1.3. Các phương pháp Deep Learning (DL)
- **Đặc điểm:** Nhánh mở rộng của ML sử dụng mạng nơ-ron sâu (nhiều tầng ẩn). DL vượt trội nhờ khả năng **tự động học biểu diễn đặc trưng** (feature representation learning) từ thô đến tinh mà không cần can thiệp thủ công nhiều.
- **Các kiến trúc DL tiêu biểu:**
  1. **RNN (Recurrent Neural Network):** Mạng nơ-ron hồi tiếp cơ bản, có trạng thái ẩn (hidden state) lưu thông tin từ bước thời gian trước truyền sang bước tiếp theo.  
     *Hạn chế:* Dễ gặp hiện tượng tiêu biến đạo hàm (vanishing gradient), dẫn đến mất khả năng ghi nhớ thông tin ở các bước xa.
  2. **LSTM (Long Short-Term Memory):** Giải quyết triệt để điểm yếu của RNN bằng cơ chế các cổng (gates: Forget gate, Input gate, Output gate) và Cell state, kiểm soát dòng chảy thông tin để lưu giữ mối phụ thuộc dài hạn.  
     *Ứng dụng:* Dự báo tài chính, biến động thị trường, tín hiệu y tế, cảm biến IoT.
  3. **GRU (Gated Recurrent Units):** Biến thể tinh gọn của LSTM gộp cell state và hidden state, chỉ gồm Reset gate và Update gate. Ít tham số hơn, huấn luyện nhanh hơn, hiệu quả với tập dữ liệu vừa hoặc tài nguyên tính toán giới hạn.
  4. **CNN (Convolutional Neural Network 1D):** Dùng phép tích chập trượt trên trục thời gian để trích xuất các đặc trưng cục bộ (local patterns). Thường kết hợp trong mô hình lai CNN-LSTM.
  5. **Transformer:** Kiến trúc dựa trên cơ chế Tự chú ý (Self-Attention), loại bỏ tính tuần tự của hồi tiếp để huấn luyện song song. Mô hình hóa quan hệ giữa mọi điểm thời gian bất kể khoảng cách, là xu hướng nghiên cứu hàng đầu cho chuỗi dữ liệu dài và phức tạp.

### 1.4. Bảng so sánh ML vs DL trong Chuỗi thời gian

| Tiêu chí | Machine Learning (ML) | Deep Learning (DL) |
| :--- | :--- | :--- |
| **Trích xuất đặc trưng** | Thủ công (lags, moving average, seasonal indices) | Tự động học qua các lớp nơ-ron |
| **Quy mô dữ liệu phù hợp** | Dữ liệu vừa và nhỏ ($< 10^4 - 10^5$ mẫu) | Cần tập dữ liệu lớn để tránh overfitting |
| **Mối quan hệ dài hạn** | Khó xử lý nếu không tự tạo lag rất xa | Xử lý tốt (nhờ LSTM, GRU, Transformer) |
| **Chi phí tính toán** | Thấp, chạy nhanh trên CPU thông thường | Cao, cần phần cứng tăng tốc (GPU/TPU) |
| **Khả năng diễn giải** | Cao, dễ hiểu và chứng minh mặt toán học | Thấp (mô hình hộp đen - black box) |

---

## 2. Cơ sở nền tảng: Support Vector Machines (SVM)

### 2.1. Bản chất và Ý tưởng hình học
- SVM ban đầu là thuật toán **học có giám sát (Supervised Learning)** phục vụ bài toán phân loại (Classification).
- **Ý tưởng:** Tìm một **siêu phẳng (hyperplane)** trong không gian $N$ chiều (tương ứng với $N$ đặc trưng) để phân tách các lớp dữ liệu sao cho khoảng cách từ siêu phẳng đến các điểm gần nhất là cực đại.
- Phương trình siêu phẳng tổng quát:
  $$\mathbf{w}^T \mathbf{x} + b = 0$$
  Trong không gian $N$ chiều, siêu phẳng phân tách là một không gian con $(N-1)$ chiều.

### 2.2. Khoảng cách và Biên (Margin)
- **Khoảng cách từ một điểm $\mathbf{x}_i$ đến siêu phẳng:**
  $$d(\mathbf{x}_i) = \frac{|\mathbf{w}^T \mathbf{x}_i + b|}{\|\mathbf{w}\|_2}$$
  trong đó $\|\mathbf{w}\|_2 = \sqrt{\sum_{j=1}^d w_j^2}$ là chuẩn Euclid (độ dài) của vector pháp tuyến $\mathbf{w}$.

- **Support Vectors (Các vector hỗ trợ):**  
  Là những điểm dữ liệu nằm sát siêu phẳng nhất (nằm trên hai đường biên lề). Chúng trực tiếp quyết định vị trí và hướng của siêu phẳng. Nếu loại bỏ các điểm không phải là support vectors, siêu phẳng tối ưu không hề thay đổi.

- **Maximum Margin Classifier:**
  SVM chuẩn hóa khoảng cách sao cho với các support vectors:
  $$|\mathbf{w}^T \mathbf{x} + b| = 1 \implies y_i(\mathbf{w}^T \mathbf{x}_i + b) \ge 1, \quad \forall i$$
  Khoảng cách từ siêu phẳng đến mỗi biên là $\frac{1}{\|\mathbf{w}\|}$.  
  Do đó, độ rộng lề biên (Margin) giữa hai lớp là:
  $$\text{Margin} = \frac{2}{\|\mathbf{w}\|}$$
  Để tối đại hóa Margin, ta quy về bài toán cực tiểu hóa độ dài vector $\mathbf{w}$:
  $$\min_{\mathbf{w}, b} \frac{1}{2} \|\mathbf{w}\|^2 \quad \text{s.t.} \quad y_i(\mathbf{w}^T \mathbf{x}_i + b) \ge 1, \quad \forall i=1,\dots,N$$

```
          x2 ^
             |        Class +1 (+)
             |        +       + (Support Vector)
             |      -------------------  w^T x + b = +1
             |         \     /
             |          \   / Margin = 2 / ||w||
             |           \ /
             |   ======================= Siêu phẳng phân tách: w^T x + b = 0
             |           / \
             |          /   \
             |      -------------------  w^T x + b = -1
             |        - (Support Vector)
             |      -       - Class -1 (-)
             +------------------------------> x1
```

### 2.3. Hard Margin vs Soft Margin
- **Hard Margin SVM:** Yêu cầu toàn bộ điểm dữ liệu phải được phân tách tuyệt đối chính xác không có ngoại lệ. Mô hình thất bại khi dữ liệu có nhiễu (noise) hoặc không phân tách tuyến tính hoàn hảo.
- **Soft Margin SVM:** Cho phép một mức độ vi phạm biên nhất định thông qua biến độ chùng (**slack variable $\xi_i \ge 0$**):
  - Điểm nằm đúng phía và ngoài vùng biên an toàn: $\xi_i = 0$.
  - Điểm nằm trong vùng lề nhưng vẫn phân lớp đúng: $0 < \xi_i \le 1$.
  - Điểm bị phân lớp sai: $\xi_i > 1$.
- **Hàm tối ưu Soft Margin:**
  $$\min_{\mathbf{w}, b, \xi} \left( \frac{1}{2}\|\mathbf{w}\|^2 + C \sum_{i=1}^N \xi_i \right)$$
  $$\text{Ràng buộc:} \quad y_i(\mathbf{w}^T \mathbf{x}_i + b) \ge 1 - \xi_i, \quad \xi_i \ge 0, \quad \forall i=1,\dots,N$$
  - **Hệ số phạt $C > 0$:** Kiểm soát sự đánh đổi giữa việc mở rộng Margin tối đa và giảm thiểu số lượng mẫu vi phạm.
    - $C$ lớn: Phạt nặng mẫu sai $\implies$ Margin hẹp lại, giảm sai số huấn luyện nhưng dễ overfitting.
    - $C$ nhỏ: Chấp nhận nhiều mẫu vi phạm hơn $\implies$ Margin rộng hơn, chống overfitting tốt hơn nhưng có thể underfitting.

### 2.4. Kernel SVM (Phi tuyến)
- Khi dữ liệu không thể phân tách tuyến tính trong không gian ban đầu, SVM sử dụng **Kernel trick**: ánh xạ dữ liệu $\mathbf{x} \in \mathbb{R}^d$ sang không gian đặc trưng mới nhiều chiều hơn $\phi(\mathbf{x}) \in \mathcal{H}$ (không gian Hilbert), nơi các điểm trở nên phân tách tuyến tính được.
- **Hàm Kernel $K(\mathbf{x}_i, \mathbf{x}_j) = \langle\phi(\mathbf{x}_i), \phi(\mathbf{x}_j)\rangle$** tính trực tiếp tích vô hướng trong không gian mới mà không cần tính toán tường minh tọa độ $\phi(\mathbf{x})$.
- **Điều kiện Mercer:** Hàm $K(\cdot, \cdot)$ hợp lệ khi và chỉ khi nó liên tục, đối xứng $K(\mathbf{x}, \mathbf{z}) = K(\mathbf{z}, \mathbf{x})$ và ma trận Gram liên kết là ma trận nửa xác định dương (Positive Semi-Definite - PSD): $\mathbf{v}^T \mathbf{K} \mathbf{v} \ge 0, \forall \mathbf{v}$.

**Các loại Kernel thông dụng:**
1. **Linear Kernel (Tuyến tính):**
   $$K(\mathbf{x}, \mathbf{z}) = \mathbf{x}^T \mathbf{z}$$
   *Đặc điểm:* Đơn giản, tính toán nhanh, ít tham số. Dùng cho dữ liệu có số chiều đặc trưng rất lớn (như phân loại văn bản, ma trận từ thưa).
2. **Polynomial Kernel (Đa thức):**
   $$K(\mathbf{x}, \mathbf{z}) = (\gamma \mathbf{x}^T \mathbf{z} + r)^d$$
   *Đặc điểm:* Mô hình hóa tương tác bậc cao giữa các biến. Khi $d=1$ trở về linear kernel.
3. **Radial Basis Function (RBF) / Gaussian Kernel (Phổ biến nhất):**
   $$K(\mathbf{x}, \mathbf{z}) = \exp(-\gamma \|\mathbf{x} - \mathbf{z}\|^2) = \exp\left(-\frac{\|\mathbf{x} - \mathbf{z}\|^2}{2\sigma^2}\right)$$
   *Đặc điểm:* Ánh xạ dữ liệu vào không gian vô hạn chiều. Đo lường mức độ tương đồng giữa hai điểm (gần bằng 1 nếu hai điểm trùng nhau, tiến về 0 khi xa nhau). Rất nhạy với tham số $\gamma$.
4. **Sigmoid Kernel (Hyperbolic Tangent):**
   $$K(\mathbf{x}, \mathbf{z}) = \tanh(\gamma \mathbf{x}^T \mathbf{z} + r)$$
   *Đặc điểm:* Mô phỏng hàm kích hoạt mạng nơ-ron đơn tầng. Không phải lúc nào cũng thỏa mãn điều kiện Mercer nên ít phổ biến hơn RBF.

### 2.5. Tối ưu hóa: Primal, Dual Lagrangian và Thuật toán SMO
Để giải bài toán tối ưu lồi có ràng buộc bất đẳng thức, phương pháp nhân tử Lagrange được áp dụng:

1. **Hàm Lagrangian:**
   $$\mathcal{L}(\mathbf{w}, b, \xi, \alpha, \beta) = \frac{1}{2}\|\mathbf{w}\|^2 + C \sum_{i=1}^N \xi_i - \sum_{i=1}^N \alpha_i \left[ y_i(\mathbf{w}^T \mathbf{x}_i + b) - 1 + \xi_i \right] - \sum_{i=1}^N \beta_i \xi_i$$
   với các nhân tử Lagrange $\alpha_i \ge 0, \beta_i \ge 0$.

2. **Điều kiện tối ưu KKT (Karush-Kuhn-Tucker):**
   - Đạo hàm theo $\mathbf{w}$: $\frac{\partial \mathcal{L}}{\partial \mathbf{w}} = 0 \implies \mathbf{w} = \sum_{i=1}^N \alpha_i y_i \mathbf{x}_i$
   - Đạo hàm theo $b$: $\frac{\partial \mathcal{L}}{\partial b} = 0 \implies \sum_{i=1}^N \alpha_i y_i = 0$
   - Đạo hàm theo $\xi_i$: $\frac{\partial \mathcal{L}}{\partial \xi_i} = 0 \implies C - \alpha_i - \beta_i = 0 \implies 0 \le \alpha_i \le C$

3. **Bài toán Đối ngẫu (Dual Form):**
   Thay ngược các nghiệm vào $\mathcal{L}$, ta được bài toán quy hoạch toàn phương (Quadratic Programming):
   $$\max_{\boldsymbol{\alpha}} \left( \sum_{i=1}^N \alpha_i - \frac{1}{2} \sum_{i=1}^N \sum_{j=1}^N \alpha_i \alpha_j y_i y_j K(\mathbf{x}_i, \mathbf{x}_j) \right)$$
   $$\text{Ràng buộc:} \quad 0 \le \alpha_i \le C \quad (\forall i=1,\dots,N) \quad \text{và} \quad \sum_{i=1}^N \alpha_i y_i = 0$$

4. **Ý nghĩa của hệ số $\alpha_i$:**
   - $\alpha_i = 0$: Mẫu nằm ngoài biên, không ảnh hưởng đến mô hình.
   - $0 < \alpha_i < C$: Mẫu nằm chính xác trên đường biên (Free Support Vector).
   - $\alpha_i = C$: Mẫu vi phạm biên hoặc nằm trong lề (Bounded Support Vector).

5. **Thuật toán SMO (Sequential Minimal Optimization - John Platt, 1998):**
   - Thay vì giải ma trận kích thước $N \times N$ rất chậm khi dữ liệu lớn, SMO chia nhỏ bài toán thành các bài toán con 2 biến $(\alpha_i, \alpha_j)$.
   - Ở mỗi bước, cố định $N-2$ biến còn lại, giải nghiệm tối ưu giải tích trực tiếp cho cặp được chọn. Quá trình lặp lại đến khi thỏa mãn các điều kiện KKT.

6. **Hàm quyết định sau khi giải xong $\boldsymbol{\alpha}$:**
   $$f(\mathbf{x}) = \text{sign}\left( \sum_{i \in \text{SV}} \alpha_i y_i K(\mathbf{x}_i, \mathbf{x}) + b \right)$$

---

### 2.6. Ví dụ giải tay chi tiết (Numerical Examples)

#### Ví dụ 1: Tuyến tính không dùng Kernel
Cho tập huấn luyện gồm 3 điểm trong không gian 2D:
- $\mathbf{x}_1 = (1, 0)^T, \quad y_1 = +1$
- $\mathbf{x}_2 = (0, 1)^T, \quad y_2 = +1$
- $\mathbf{x}_3 = (0, 0)^T, \quad y_3 = -1$

**Bước 1: Tính ma trận tích vô hướng (Gram Matrix $\mathbf{K}$):**
- $\mathbf{x}_1^T \mathbf{x}_1 = 1$, $\mathbf{x}_2^T \mathbf{x}_2 = 1$, $\mathbf{x}_3^T \mathbf{x}_3 = 0$
- $\mathbf{x}_1^T \mathbf{x}_2 = 0$, $\mathbf{x}_1^T \mathbf{x}_3 = 0$, $\mathbf{x}_2^T \mathbf{x}_3 = 0$
$$\mathbf{K} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 0 \end{bmatrix}$$

**Bước 2: Ràng buộc đối ngẫu:**
$$\sum_{i=1}^3 \alpha_i y_i = 0 \iff \alpha_1(1) + \alpha_2(1) + \alpha_3(-1) = 0 \implies \alpha_3 = \alpha_1 + \alpha_2$$

**Bước 3: Thiết lập hàm mục tiêu đối ngẫu:**
$$\mathcal{L}_D = (\alpha_1 + \alpha_2 + \alpha_3) - \frac{1}{2}\sum_{i,j} \alpha_i \alpha_j y_i y_j (\mathbf{x}_i^T \mathbf{x}_j)$$
Vì chỉ có $(\mathbf{x}_1^T \mathbf{x}_1) = 1$ và $(\mathbf{x}_2^T \mathbf{x}_2) = 1$, các tích chéo khác bằng 0:
$$\mathcal{L}_D = (\alpha_1 + \alpha_2 + (\alpha_1 + \alpha_2)) - \frac{1}{2}\left[\alpha_1^2(1) + \alpha_2^2(1)\right] = 2\alpha_1 - \frac{1}{2}\alpha_1^2 + 2\alpha_2 - \frac{1}{2}\alpha_2^2$$

**Bước 4: Tìm cực đại:**
Đạo hàm riêng theo $\alpha_1, \alpha_2$:
$$\frac{\partial \mathcal{L}_D}{\partial \alpha_1} = 2 - \alpha_1 = 0 \implies \alpha_1^* = 2$$
$$\frac{\partial \mathcal{L}_D}{\partial \alpha_2} = 2 - \alpha_2 = 0 \implies \alpha_2^* = 2$$
Suy ra:
$$\alpha_3^* = \alpha_1^* + \alpha_2^* = 4$$
Tất cả $\alpha_i > 0$, do đó **cả 3 điểm đều là Support Vectors**.

**Bước 5: Xác định vector pháp tuyến $\mathbf{w}$ và hệ số chệch $b$:**
$$\mathbf{w} = \sum_{i=1}^3 \alpha_i y_i \mathbf{x}_i = 2(1)\begin{pmatrix}1\\0\end{pmatrix} + 2(1)\begin{pmatrix}0\\1\end{pmatrix} + 4(-1)\begin{pmatrix}0\\0\end{pmatrix} = \begin{pmatrix}2\\2\end{pmatrix}$$
Với điểm $\mathbf{x}_1(1,0)$ nằm trên biên $y_1(\mathbf{w}^T \mathbf{x}_1 + b) = 1$:
$$1 \cdot (2 \cdot 1 + 2 \cdot 0 + b) = 1 \implies 2 + b = 1 \implies b = -1$$
Phương trình siêu phẳng phân tách:
$$2x_1 + 2x_2 - 1 = 0$$

**Bước 6: Độ dài chuẩn và Margin:**
- $\|\mathbf{w}\|_2 = \sqrt{2^2 + 2^2} = \sqrt{8} = 2\sqrt{2} \approx 2.8284$
- Khoảng cách từ siêu phẳng tới mỗi biên: $\frac{1}{\|\mathbf{w}\|} = \frac{1}{2\sqrt{2}} \approx 0.3536$
- Tổng bề rộng Margin: $\frac{2}{\|\mathbf{w}\|} = \frac{1}{\sqrt{2}} \approx 0.7071$

**Bước 7: Kiểm tra lại các điểm phân loại:**
- Với $\mathbf{x}_1(1,0)$: $2(1) + 2(0) - 1 = +1 > 0 \implies \text{Class } +1$ (chính xác)
- Với $\mathbf{x}_2(0,1)$: $2(0) + 2(1) - 1 = +1 > 0 \implies \text{Class } +1$ (chính xác)
- Với $\mathbf{x}_3(0,0)$: $2(0) + 2(0) - 1 = -1 < 0 \implies \text{Class } -1$ (chính xác)

---

#### Ví dụ 2: Minh họa với RBF Kernel ($\gamma = 1$)
Giữ nguyên 3 điểm trên, áp dụng hàm RBF: $K(\mathbf{x}_i, \mathbf{x}_j) = \exp\left(-\frac{\|\mathbf{x}_i - \mathbf{x}_j\|^2}{2}\right)$:
- $K(\mathbf{x}_1, \mathbf{x}_1) = K(\mathbf{x}_2, \mathbf{x}_2) = K(\mathbf{x}_3, \mathbf{x}_3) = \exp(0) = 1$
- $\|\mathbf{x}_1 - \mathbf{x}_2\|^2 = (1-0)^2 + (0-1)^2 = 2 \implies K(\mathbf{x}_1, \mathbf{x}_2) = \exp(-2/2) = e^{-1} \approx 0.3679$
- $\|\mathbf{x}_1 - \mathbf{x}_3\|^2 = 1^2 + 0^2 = 1 \implies K(\mathbf{x}_1, \mathbf{x}_3) = \exp(-1/2) = e^{-0.5} \approx 0.6065$
- $\|\mathbf{x}_2 - \mathbf{x}_3\|^2 = 0^2 + 1^2 = 1 \implies K(\mathbf{x}_2, \mathbf{x}_3) = \exp(-1/2) = e^{-0.5} \approx 0.6065$

Ma trận Gram $\mathbf{K}$:
$$\mathbf{K} = \begin{bmatrix} 1 & 0.3679 & 0.6065 \\ 0.3679 & 1 & 0.6065 \\ 0.6065 & 0.6065 & 1 \end{bmatrix}$$
Từ ma trận Gram này, bài toán đối ngẫu Lagrangian được thiết lập và giải thông qua thuật toán tối ưu số (SMO) để tìm ra các $\alpha_i^*$.

---

## 3. Chuyên sâu: Support Vector Regression (SVR)

### 3.1. Chuyển từ Phân loại sang Hồi quy chuỗi
- Trong khi SVM tìm siêu phẳng phân tách hai nửa không gian riêng biệt, **SVR (Support Vector Regression)** tìm một hàm liên tục $f(\mathbf{x}) = \mathbf{w}^T \mathbf{x} + b$ xấp xỉ phân bố dữ liệu sao cho các giá trị thực tế $y_i$ nằm gọn nhất trong một dải cho phép.
- **Khác biệt quan trọng với Hồi quy tuyến tính thông thường (OLS):**  
  OLS phạt toàn bộ mọi sai lệch bình phương $(y - \hat{y})^2$, trong khi SVR chỉ phạt những điểm nằm chệch ra ngoài khoảng dung sai $\pm \epsilon$.

### 3.2. Vùng dung sai $\epsilon$-Tube & Biến độ chùng $(\xi, \xi^*)$
- **$\epsilon$-Tube (Ống sai số Epsilon):**  
  Tạo ra một hành lang an toàn biên trên và biên dưới xung quanh hàm hồi quy: $[f(\mathbf{x}) - \epsilon, f(\mathbf{x}) + \epsilon]$.
  - Nếu điểm dữ liệu nằm bên trong hành lang: $|y_i - f(\mathbf{x}_i)| \le \epsilon \implies$ Sai số được coi là 0 (không phạt).
  - Nếu điểm nằm ngoài hành lang: Sai số bị phạt theo khoảng cách vượt quá biên.
- **Hai biến độ chùng kiểm soát vi phạm hai phía:**
  1. $\xi_i$ (Slack phạt trên - điểm nằm vọt lên trên trần ống):
     $$\xi_i = \max(0, y_i - f(\mathbf{x}_i) - \epsilon)$$
  2. $\xi_i^*$ (Slack phạt dưới - điểm nằm tụt xuống dưới sàn ống):
     $$\xi_i^* = \max(0, f(\mathbf{x}_i) - y_i - \epsilon)$$

```
     y ^
       |                     * y_i (phạt xi_i > 0)
       |             ---------------------------  f(x) + epsilon (Trần ống)
       |            /   .         .   .
       |           /       .            .
       |          /=============================  Hàm hồi quy: f(x) = w^T phi(x) + b
       |         /      .     .            .
       |        /-------------------------------  f(x) - epsilon (Sàn ống)
       |       /                    * y_j (phạt xi_j* > 0)
       +---------------------------------------------> x
```

### 3.3. Xây dựng Bài toán Tối ưu SVR (Primal & Dual Form)

#### 1. Dạng nguyên thủy (Primal Problem):
$$\min_{\mathbf{w}, b, \xi, \xi^*} \left( \frac{1}{2}\|\mathbf{w}\|^2 + C \sum_{i=1}^N (\xi_i + \xi_i^*) \right)$$
Thỏa mãn đồng thời các ràng buộc:
$$\begin{cases}
y_i - (\mathbf{w}^T \phi(\mathbf{x}_i) + b) \le \epsilon + \xi_i \\
(\mathbf{w}^T \phi(\mathbf{x}_i) + b) - y_i \le \epsilon + \xi_i^* \\
\xi_i \ge 0, \quad \xi_i^* \ge 0 \quad (\forall i=1,\dots,N)
\end{cases}$$

#### 2. Dạng đối ngẫu (Dual Problem):
Sử dụng các nhân tử Lagrange $\alpha_i, \alpha_i^* \ge 0$, bài toán đối ngẫu quy về:
$$\max_{\boldsymbol{\alpha}, \boldsymbol{\alpha}^*} \left( -\frac{1}{2}\sum_{i=1}^N \sum_{j=1}^N (\alpha_i^* - \alpha_i)(\alpha_j^* - \alpha_j) K(\mathbf{x}_i, \mathbf{x}_j) - \epsilon \sum_{i=1}^N (\alpha_i^* + \alpha_i) + \sum_{i=1}^N y_i (\alpha_i^* - \alpha_i) \right)$$
Ràng buộc:
$$0 \le \alpha_i, \alpha_i^* \le C \quad (\forall i=1,\dots,N)$$
$$\sum_{i=1}^N (\alpha_i^* - \alpha_i) = 0$$

### 3.4. Hàm dự báo phi tuyến trong SVR
Sau khi giải hệ đối ngẫu tìm được dãy nghiệm $\alpha_i^*, \alpha_i$:
- Vector trọng số trong không gian đặc trưng:
  $$\mathbf{w} = \sum_{i=1}^N (\alpha_i^* - \alpha_i)\phi(\mathbf{x}_i)$$
- **Công thức dự báo cho điểm mới $\mathbf{x}$:**
  $$\hat{y}(\mathbf{x}) = \sum_{i \in \text{SV}} (\alpha_i^* - \alpha_i) K(\mathbf{x}_i, \mathbf{x}) + b$$
- **Nhận diện Support Vectors trong SVR:**
  - Điểm nằm trong $\epsilon$-tube: $\alpha_i = 0$ và $\alpha_i^* = 0$ (không tham gia công thức dự báo).
  - Điểm là Support Vectors khi và chỉ khi $\alpha_i > 0$ hoặc $\alpha_i^* > 0$ (nằm trên hoặc ngoài biên $\epsilon$).
- **Tính toán hệ số chệch $b$:**  
  Dựa trên các support vector nằm chính xác trên biên ($0 < \alpha_k < C$ hoặc $0 < \alpha_k^* < C$):
  $$b = y_k - \sum_{i=1}^N (\alpha_i^* - \alpha_i)K(\mathbf{x}_i, \mathbf{x}_k) \mp \epsilon$$

---

## 4. Ứng dụng trong Phân tích Dữ liệu Kinh doanh & Kết luận

### 4.1. Vai trò của SVR trong bài toán chuỗi thời gian kinh doanh
1. **Dự báo chuỗi tài chính & doanh số biến động phi tuyến:** Khác với mô hình tuyến tính đơn giản, SVR kết hợp RBF Kernel có thể xấp xỉ bất kỳ hàm phi tuyến mượt mà nào.
2. **Khả năng kháng nhiễu và ngoại lai (Robustness to Outliers):** Nhờ cơ chế $\epsilon$-insensitive loss, những dao động nhỏ ngẫu nhiên không làm mô hình đổi hướng; biến độ chùng bậc 1 tuyến tính với hệ số phạt $C$ giúp hạn chế việc mô hình bị kéo lệch quá mức bởi các điểm dị biệt (so với bình phương khoảng cách của OLS).
3. **Phù hợp với tập dữ liệu kích thước nhỏ đến trung bình:** Khi doanh nghiệp chưa tích lũy đủ dữ liệu hàng triệu bản ghi để huấn luyện Deep Learning (như LSTM, Transformer), SVR là lựa chọn tối ưu đảm bảo cả độ chính xác lẫn hiệu năng huấn luyện.

### 4.2. Bộ ba siêu tham số cốt lõi trong SVR
Khi triển khai SVR thực tế, cần tinh chỉnh 3 siêu tham số thông qua Cross-Validation (hoặc TimeSeriesSplit):
- **$C$ (Cost/Penalty):** Kiểm soát độ nghiêm khắc phạt lỗi. $C$ quá lớn gây overfitting, $C$ quá nhỏ dẫn đến underfitting.
- **$\epsilon$ (Epsilon):** Độ rộng của ống sai số. $\epsilon$ lớn làm tăng số lượng điểm nằm trong ống $\implies$ mô hình thưa (sparse) hơn, ít support vector hơn, tổng quát hóa tốt hơn nhưng có thể giảm độ khít.
- **$\gamma$ (Gamma trong RBF Kernel):** Xác định bán kính ảnh hưởng của từng điểm dữ liệu mẫu. $\gamma$ quá lớn dẫn đến ranh giới dự báo bị cục bộ hóa quanh các điểm train (overfitting).

### 4.3. Định hướng chuyển tiếp sang Phần 2
Tài liệu Phần 1 đã xây dựng nền tảng vững chắc về:
- Phân biệt bản chất bài toán phân loại (SVM) và hồi quy dự báo (SVR).
- Kỹ thuật Kernel trick và phương pháp tối ưu hóa Lagrangian/SMO.
- Cơ chế $\epsilon$-tube cho dữ liệu chuỗi.

**Phần 2 của Chương 6** sẽ tiếp tục đi sâu vào các mô hình mạng nơ-ron hồi tiếp chuyên sâu (**RNN, LSTM, GRU**) và các thuật toán phát hiện bất thường (**Anomaly Detection & Isolation Forest**) trong dữ liệu kinh doanh.
