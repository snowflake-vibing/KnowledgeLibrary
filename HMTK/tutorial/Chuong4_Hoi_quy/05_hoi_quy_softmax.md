# 5. Hồi quy Softmax (Softmax Regression / Multinomial Logistic Regression)

[⬅ Trước: Hồi quy Logistic](04_hoi_quy_logistic.md) · [Mục lục](README.md)

---

## 5.1. Giới thiệu & Nguyên lý Hồi quy Softmax

### 5.1.1. Từ phân lớp nhị phân sang phân lớp đa lớp
Mô hình hồi quy Logistic có thể được tổng quát hóa trực tiếp cho **bài toán phân lớp đa lớp ($K$ lớp, $K > 2$)** mà không cần phải huấn luyện và tổ hợp nhiều bộ phân lớp nhị phân (như One-vs-One hay One-vs-Rest). Cách tiếp cận này được gọi là **Hồi quy Softmax (Softmax Regression)** hay **Hồi quy Logistic đa thức (Multinomial Logistic Regression)**.

### 5.1.2. Hai bước tính toán của Hồi quy Softmax
Với một mẫu dữ liệu đầu vào mới $\mathbf{x} \in \mathbb{R}^n$, hồi quy Softmax ước lượng xác suất để $\mathbf{x}$ thuộc về mỗi lớp $k \in \{1, 2, \dots, K\}$ qua 2 bước:

#### Bước 1: Tính điểm số tuyến tính $s_k(\mathbf{x})$ cho từng lớp $k$ (Softmax score)
$$s_k(\mathbf{x}) = \mathbf{x}^T \boldsymbol{\theta}^{(k)} = \left(\boldsymbol{\theta}^{(k)}\right)^T \mathbf{x} \qquad \text{(Equation 4-19)}$$

- Mỗi lớp $k$ có một véc-tơ tham số riêng $\boldsymbol{\theta}^{(k)} \in \mathbb{R}^n$.
- Tất cả các véc-tơ tham số $\boldsymbol{\theta}^{(1)}, \boldsymbol{\theta}^{(2)}, \dots, \boldsymbol{\theta}^{(K)}$ thường được xếp thành các hàng của **ma trận tham số $\mathbf{\Theta} \in \mathbb{R}^{K \times n}$**.

#### Bước 2: Ước lượng xác suất bằng hàm Softmax (Normalized Exponential)
Áp dụng **hàm Softmax** (còn gọi là *hàm mũ chuẩn hóa – Normalized exponential*) lên véc-tơ điểm số $\mathbf{s}(\mathbf{x}) = [s_1(\mathbf{x}), \dots, s_K(\mathbf{x})]^T$:

$$\hat{p}_k = \sigma\big(\mathbf{s}(\mathbf{x})\big)_k = \frac{\exp\big(s_k(\mathbf{x})\big)}{\sum_{j=1}^{K} \exp\big(s_j(\mathbf{x})\big)} \qquad \text{(Equation 4-20)}$$

Trong đó:
- $K$: tổng số lớp phân loại.
- $\mathbf{s}(\mathbf{x})$: véc-tơ chứa các điểm số (logits) của mẫu $\mathbf{x}$ ứng với mỗi lớp.
- $\hat{p}_k = \sigma(\mathbf{s}(\mathbf{x}))_k \in (0, 1)$: xác suất ước lượng để mẫu $\mathbf{x}$ thuộc về lớp $k$ (thỏa mãn $\sum_{k=1}^K \hat{p}_k = 1$).

### 5.1.3. Quy tắc dự đoán lớp (Prediction)
Tương tự bộ phân lớp hồi quy Logistic, bộ phân lớp hồi quy Softmax dự đoán mẫu $\mathbf{x}$ thuộc về **lớp có xác suất ước lượng lớn nhất** (cũng chính là lớp có điểm số $s_k(\mathbf{x})$ lớn nhất):

$$\hat{y} = \arg\max_{k} \sigma\big(\mathbf{s}(\mathbf{x})\big)_k = \arg\max_{k} s_k(\mathbf{x}) = \arg\max_{k} \left( \left(\boldsymbol{\theta}^{(k)}\right)^T \mathbf{x} \right) \qquad \text{(Equation 4-21)}$$

### 5.1.4. Phân biệt Phân lớp đa lớp (Multiclass) và Phân lớp đa nhãn (Multioutput)
> ⚠️ **Lưu ý quan trọng:**
> Bộ phân lớp hồi quy Softmax **chỉ dự báo 1 lớp duy nhất tại một thời điểm** (các lớp loại trừ lẫn nhau), tức là thuộc bài toán **phân lớp đa lớp (multiclass)** chứ **không phải** bài toán **đa nhãn (multioutput / multilabel)**.
>
> - **Ví dụ bài toán đa lớp (Multiclass) — Dùng được Softmax:** Nhận diện loài cây hoặc loài hoa từ một bức ảnh (mỗi bông hoa chỉ thuộc 1 loài: *Iris setosa*, *Iris versicolor*, hoặc *Iris virginica*).
> - **Ví dụ bài toán đa nhãn (Multilabel / Multioutput) — Không dùng 1 hàm Softmax đơn lẻ:** Nhận diện nhiều người cùng xuất hiện trong một bức ảnh (bức ảnh có thể vừa có mặt An, vừa có mặt Bình, vừa có mặt Chi cùng lúc).

---

## 5.2. Hàm Cross-Entropy & Hàm mất mát của Softmax Regression

### 5.2.1. Hàm đo khoảng cách hai phân phối xác suất Cross-Entropy
Trong lý thuyết thông tin, **Cross-Entropy** giữa phân phối xác suất thực tế $\mathbf{p} = (p_1, \dots, p_C)$ và phân phối xác suất ước lượng $\mathbf{q} = (q_1, \dots, q_C)$ được định nghĩa là:

$$H(\mathbf{p}, \mathbf{q}) = -\sum_{i=1}^{C} p_i \log q_i$$

**So sánh hàm Cross-Entropy $-\big(p\log q + (1-p)\log(1-q)\big)$ và hàm bình phương khoảng cách $(q - p)^2$:**
1. **Điểm cực tiểu trùng nhau:** Giá trị nhỏ nhất của cả hai hàm số đều đạt được khi phân phối dự đoán trùng khớp hoàn toàn với phân phối thực tế ($q = p$).
2. **Độ nhạy và cơ chế trừng phạt khi dự đoán sai ($q$ ở xa $p$):**
   - Hàm bình phương khoảng cách $(q - p)^2$ bị chặn trong $[0, 1]$, nên sự chênh lệch giữa loss ở gần nghiệm hay xa nghiệm là **không đáng kể** (đạo hàm nhỏ làm quá trình học chậm khi khởi tạo sai lệch).
   - Ngược lại, **hàm Cross-Entropy tiến tới $+\infty$** (nhận giá trị loss cực kỳ lớn) khi $q$ ở xa $p$ (ví dụ khi $p = 1$ mà dự đoán $q \to 0$).
   - **Về mặt tối ưu:** Nhờ việc **trừng phạt rất nặng** những dự đoán sai lệch xa thực tế, hàm Cross-Entropy tạo ra độ dốc (gradient) lớn khi ở xa nghiệm và giúp thuật toán tối ưu hội tụ về gần $p$ nhanh và chính xác hơn rất nhiều.

### 5.2.2. Hàm mất mát Cross-Entropy (Cost Function)
Với tập huấn luyện gồm $m$ mẫu, hàm mất mát của mô hình Softmax Regression là trung bình Cross-Entropy trên toàn bộ các mẫu:

$$J(\mathbf{\Theta}) = -\frac{1}{m} \sum_{i=1}^{m} \sum_{k=1}^{K} y_k^{(i)} \log\left(\hat{p}_k^{(i)}\right) \qquad \text{(Equation 4-22)}$$

Trong đó:
- $y_k^{(i)} \in \{0, 1\}$ là xác suất mục tiêu (dạng one-hot) cho biết quan sát thứ $i$ có thuộc lớp $k$ hay không ($y_k^{(i)} = 1$ nếu mẫu thứ $i$ thuộc lớp $k$, ngược lại $y_k^{(i)} = 0$).
- Khi số lớp $K = 2$, công thức $(4\text{-}22)$ rút gọn chính xác về hàm mất mát Log Loss của Hồi quy Logistic nhị phân!

### 5.2.3. Véc-tơ Gradient của hàm mất mát theo từng lớp $k$
Đạo hàm riêng của hàm mất mát $J(\mathbf{\Theta})$ theo véc-tơ tham số $\boldsymbol{\theta}^{(k)}$ của lớp thứ $k$ có dạng hoàn toàn tương đồng với hồi quy tuyến tính và hồi quy logistic:

$$\nabla_{\boldsymbol{\theta}^{(k)}} J(\mathbf{\Theta}) = \frac{1}{m} \sum_{i=1}^{m} \left( \hat{p}_k^{(i)} - y_k^{(i)} \right) \mathbf{x}^{(i)} \qquad \text{(Equation 4-23)}$$

Sau khi tính được $\nabla_{\boldsymbol{\theta}^{(k)}} J(\mathbf{\Theta})$ cho mọi lớp $k = 1, \dots, K$, ta dùng Gradient Descent (hoặc các bộ giải như `lbfgs`, `newton-cg`, `sag`, `saga`) để cập nhật ma trận tham số $\mathbf{\Theta}$.

---

## 5.3. 💻 Minh họa Python: Phân lớp đa lớp hoa Iris

Trong `scikit-learn`, `LogisticRegression` tự động sử dụng **Softmax Regression** khi bài toán có nhiều hơn 2 lớp (hoặc chỉ định tường minh `multi_class="multinomial"`, với bộ giải `solver="lbfgs"` và hệ số điều chuẩn nghịch đảo `C=10`):

```python
import numpy as np
from sklearn import datasets
from sklearn.linear_model import LogisticRegression

# 1. Tải bộ dữ liệu hoa Iris (3 lớp: 0=Setosa, 1=Versicolor, 2=Virginica)
iris = datasets.load_iris()
X = iris["data"][:, (2, 3)]  # Lấy 2 thuộc tính: petal length (chiều dài), petal width (chiều rộng)
y = iris["target"]

# 2. Huấn luyện mô hình Softmax Regression
# C = 1/alpha là nghịch đảo cường độ quy tắc hóa L2 (C càng lớn thì phạt càng nhẹ)
softmax_reg = LogisticRegression(multi_class="multinomial", solver="lbfgs", C=10, random_state=42)
softmax_reg.fit(X, y)

# 3. Dự đoán cho một bông hoa có cánh dài 5 cm và rộng 2 cm
x_new = [[5, 2]]
pred_class = softmax_reg.predict(x_new)[0]
pred_probs = softmax_reg.predict_proba(x_new)[0]

print(f"Dự đoán lớp      : {pred_class} ({iris.target_names[pred_class]})")
print(f"Xác suất 3 lớp   : Setosa={pred_probs[0]:.4f}, Versicolor={pred_probs[1]:.4f}, Virginica={pred_probs[2]:.4f}")
# Kết quả: Virginica chiếm khoảng 94.2%, Versicolor khoảng 5.8%
```

### Nhận xét quan trọng về Biên quyết định của Softmax Regression (Figure 4-25)
1. **Biên quyết định tuyến tính:** Biên quyết định giữa bất kỳ hai lớp nào ($k$ và $j$, nơi $\hat{p}_k = \hat{p}_j \Leftrightarrow (\boldsymbol{\theta}^{(k)} - \boldsymbol{\theta}^{(j)})^T \mathbf{x} = 0$) đều là các **đường thẳng** (hoặc siêu phẳng).
2. **Dự đoán lớp khi xác suất thấp hơn $50\%$:**
   - Trong phân lớp đa lớp ($K \ge 3$), mô hình vẫn có thể dự đoán một lớp ngay cả khi lớp đó có xác suất ước lượng **nhỏ hơn $50\%$** (miễn là xác suất của nó lớn nhất trong $K$ lớp).
   - Ví dụ, tại điểm giao nhau nơi cả 3 biên quyết định gặp nhau trên đồ thị Iris, cả 3 loài hoa đều có xác suất ước lượng bằng nhau là **$33.3\%$**.

---

[⬅ Trước: Hồi quy Logistic](04_hoi_quy_logistic.md) · [Mục lục](README.md)
