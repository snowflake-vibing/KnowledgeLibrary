# 1. Giới thiệu về hồi quy

[⬅ Mục lục](README.md) · [Tiếp: Hồi quy tuyến tính đơn biến ➡](02_hoi_quy_tuyen_tinh_don_bien.md)

---

## 1.1. Phân tích tương quan

**Tương quan** là mối quan hệ ràng buộc lẫn nhau giữa các chỉ số hoặc tiêu chí của một hiện tượng. Trong đó, sự biến động của một chỉ số (**chỉ số kết quả**) là do tác động của nhiều chỉ số khác (**các chỉ số nguyên nhân**).

**Quá trình phân tích tương quan:**
1. Phân tích định tính về bản chất của mối quan hệ.
2. Dùng phương pháp gom cụm hoặc đồ thị để xác định tính chất và xu thế của mối quan hệ.
3. Biểu diễn mối quan hệ bằng phương trình hồi quy (tuyến tính hoặc phi tuyến) và tính các tham số của phương trình.
4. Đánh giá mức độ chặt chẽ của mối quan hệ tương quan.

---

### 1.1.1. Tương quan với dữ liệu định danh (nominal): kiểm định $\chi^2$ (Chi-square)

$$\chi^2 = \sum \frac{(Observed - Expected)^2}{Expected} \qquad (1)$$

- $\chi^2$ càng lớn thì khả năng các thuộc tính có liên quan với nhau càng cao.
- Các ô đóng góp nhiều nhất vào $\chi^2$ là những ô có số lượng thực tế (*Observed*) khác nhiều so với số lượng kỳ vọng (*Expected*).
- Giá trị kỳ vọng: $Expected_{ij} = \dfrac{Tổng\ hàng_i \times Tổng\ cột_j}{Tổng\ chung}$

> ⚠️ **Tương quan không bao hàm quan hệ nhân quả.**
> Ví dụ: *số bệnh viện* và *số vụ trộm xe* trong một thành phố có tương quan với nhau, nhưng cả hai đều do thuộc tính thứ ba là *dân số* gây ra.

#### 📝 VD1: Thích khoa học viễn tưởng và chơi cờ
Mỗi ô ghi số quan sát, trong ngoặc là giá trị kỳ vọng.

| | Play chess | Not play chess | Sum (row) |
|---|---|---|---|
| **Like science fiction** | 250 (90) | 200 (360) | 450 |
| **Not like science fiction** | 50 (210) | 1000 (840) | 1050 |
| **Sum (col.)** | 300 | 1200 | 1500 |

Ví dụ ô đầu tiên: $Expected = \dfrac{450 \times 300}{1500} = 90$.

$$\chi^2 = \frac{(250-90)^2}{90} + \frac{(50-210)^2}{210} + \frac{(200-360)^2}{360} + \frac{(1000-840)^2}{840} = 507.93$$

**Kết luận:** `like_science_fiction` và `play_chess` có tương quan với nhau. Với bậc tự do $(2-1)(2-1) = 1$, giá trị tới hạn ở mức ý nghĩa 0.001 là 10.828, nhỏ hơn rất nhiều so với 507.93.

---

### 1.1.2. Tương quan với dữ liệu số (numeric): hệ số tương quan Pearson

$$r_{X,Y} = \frac{\sum_{i=1}^{n}(x_i - \bar{X})(y_i - \bar{Y})}{n\,\sigma_X \sigma_Y} \qquad (2)$$

với:
- $n$: số bộ giá trị
- $\bar{X}, \bar{Y}$: giá trị trung bình của $X$, $Y$
- $\sigma_X = \sqrt{\frac{1}{n}\sum (x_i - \bar{X})^2}$, $\sigma_Y = \sqrt{\frac{1}{n}\sum (y_i - \bar{Y})^2}$: độ lệch chuẩn của $X$, $Y$

Các dạng tương đương:

$$r_{X,Y} = \frac{\sum (x_i - \bar{X})(y_i - \bar{Y})}{\sqrt{\sum (x_i - \bar{X})^2}\sqrt{\sum (y_i - \bar{Y})^2}} \qquad (3)$$

$$r_{X,Y} = \frac{n\sum xy - \sum x \sum y}{\sqrt{n\sum x^2 - \left(\sum x\right)^2}\ \sqrt{n\sum y^2 - \left(\sum y\right)^2}} \qquad (4)$$

**Diễn giải:** $r_{X,Y} \in [-1, 1]$

| Giá trị | Ý nghĩa |
|---------|---------|
| $r = 0$ | X, Y không tương quan (tuyến tính) |
| $r > 0$ | Tương quan **thuận**: X tăng thì Y tăng |
| $r < 0$ | Tương quan **nghịch**: X tăng thì Y giảm |
| $\lvert r \rvert$ càng gần 1 | Mối quan hệ tuyến tính càng chặt chẽ |

#### 📝 VD2: Tuổi và lượng đường trong máu

| Subject | Age (X) | Glucose Level (Y) | $XY$ | $X^2$ | $Y^2$ |
|---|---|---|---|---|---|
| 1 | 43 | 99 | 4,257 | 1,849 | 9,801 |
| 2 | 21 | 65 | 1,365 | 441 | 4,225 |
| 3 | 25 | 79 | 1,975 | 625 | 6,241 |
| 4 | 42 | 75 | 3,150 | 1,764 | 5,625 |
| 5 | 57 | 87 | 4,959 | 3,249 | 7,569 |
| 6 | 59 | 81 | 4,779 | 3,481 | 6,561 |
| **Tổng** | **247** | **486** | **20,485** | **11,409** | **40,022** |

$$r = \frac{6 \times 20485 - 247 \times 486}{\sqrt{6 \times 11409 - 247^2}\ \sqrt{6 \times 40022 - 486^2}} = \frac{2868}{\sqrt{7445}\ \sqrt{3936}} = 0.5298$$

**Kết luận:** $r > 0$ nên X và Y tương quan thuận: tuổi càng cao thì lượng đường trong máu càng cao (mức độ trung bình).

---

## 1.2. Hồi quy và mô hình hồi quy

### Hồi quy (Regression)
- Kỹ thuật thống kê cho phép **dự đoán/dự báo các giá trị số thực, liên tục** *(J. Han và cộng sự, 2012)*.
- Kỹ thuật thống kê dùng trong phân tích dữ liệu và xây dựng mô hình từ thực nghiệm, cho phép dự đoán, điều khiển và học các quy luật tạo ra dữ liệu (*data generation rules*) *(R. D. Snee, 1977)*.

### Mô hình hồi quy (Regression Model)
Mô hình hồi quy mô tả mối quan hệ giữa **các biến dự đoán/độc lập** (*predictor / independent variables*) và **biến đáp ứng/phụ thuộc** (*response / dependent variables*), dưới dạng phương trình:

$$Y = f(X, \theta) \qquad (5)$$

- $Y$: biến đáp ứng/phụ thuộc, mô tả thực tế hoặc sự kiện
- $X$: biến dự đoán/độc lập, mô tả sự thay đổi của $Y$ thông qua hàm hồi quy $f$
- $\theta$: bộ tham số hồi quy, biểu diễn mức độ ảnh hưởng của $X$ lên $Y$

**Ví dụ:** mô hình hồi quy giữa giá (Price) và diện tích (Size) nhà đất:

$$Price = 9161.159 + 77.00769 \times Size$$

---

## 1.3. Phân loại mô hình hồi quy

### a) Tuyến tính và phi tuyến tính (xét theo **tham số**)
| Loại | Đặc điểm | Ví dụ |
|------|----------|-------|
| **Tuyến tính** (*linear in parameters*) | Các tham số kết hợp tuyến tính | $Y = \theta_0 + \theta_1 x$ &nbsp; (6) |
| **Phi tuyến tính** (*non-linear in parameters*) | Các tham số kết hợp phi tuyến | $Y = \theta_0 + \dfrac{\theta_1 x_1}{\theta_2 + x_2}$ &nbsp; (7) |

> 💡 $Y = \theta_0 + \theta_1 x + \theta_2 x^2$ vẫn là **hồi quy tuyến tính** vì nó tuyến tính theo tham số $\theta$, dù phi tuyến theo $x$.

### b) Đơn biến và đa biến (xét theo **số biến độc lập**)
| Loại | Đặc điểm | Ví dụ |
|------|----------|-------|
| **Đơn biến** (*simple, univariate*) | Chỉ có 1 biến độc lập | $Y = \theta_0 + \theta_1 x$ &nbsp; (8) |
| **Đa biến** (*multiple, multivariate*) | Có nhiều biến độc lập | $Y = \theta_0 + \theta_1 x_1 + \theta_2 x_2$ &nbsp; (9) |

### c) Tham số, phi tham số và tham số kết hợp
| Loại | Đặc điểm | Ví dụ |
|------|----------|-------|
| **Tham số** (*parametric*) | Có hữu hạn tham số | $Y = \theta_0 + \theta_1 x$ &nbsp; (10) |
| **Phi tham số** (*nonparametric*) | Vô hạn tham số (không xác định được số tham số) | $Y = \theta_0 + f(x)$ &nbsp; (11) |
| **Tham số kết hợp** (*semiparametric*) | Có vô số tham số nhưng số tham số **cần quan tâm** là hữu hạn | $Y = \theta_0 + \theta_1 x_1 + f(x_2)$ &nbsp; (12) |

### d) Đối xứng và bất đối xứng
| Loại | Đặc điểm | Ví dụ |
|------|----------|-------|
| **Đối xứng** (*symmetric*) | Đầu ra đối xứng qua một điểm/trục, mang tính **mô tả** | Hồi quy logistic (hàm sigmoid) |
| **Bất đối xứng** (*asymmetric*) | Đầu ra không đối xứng, mang tính **dự báo** | Hồi quy tuyến tính |

---

## 💻 Minh họa Python

```python
import numpy as np
from scipy.stats import chi2_contingency, pearsonr

# VD1: Chi-square
observed = np.array([[250, 200],
                     [50, 1000]])
chi2, p, dof, expected = chi2_contingency(observed, correction=False)
print(f"chi2 = {chi2:.2f}, p-value = {p:.2e}, dof = {dof}")
print("Expected:\n", expected)

# VD2: Pearson
age = [43, 21, 25, 42, 57, 59]
glucose = [99, 65, 79, 75, 87, 81]
r, p = pearsonr(age, glucose)
print(f"r = {r:.4f}, p-value = {p:.4f}")   # r = 0.5298
```

---

[⬅ Mục lục](README.md) · [Tiếp: Hồi quy tuyến tính đơn biến ➡](02_hoi_quy_tuyen_tinh_don_bien.md)
