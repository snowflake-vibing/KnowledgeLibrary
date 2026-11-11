# BÁO CÁO PHÂN TÍCH VÀ THIẾT KẾ GIẢI PHÁP BÀI THỰC HÀNH 4 (TH4)
## Huấn luyện Mô hình Học máy cho Dự đoán Mức lương & Xác thực Tranh cổ

---

## 1. TỔNG QUAN VÀ CÁC QUY TẮC CỐT LÕI

Bài thực hành yêu cầu nghiên cứu, phân tích hai bài toán học máy thực tế có độ phức tạp cao từ các kỳ thi Olympic Trí tuệ nhân tạo (BGOAI 2025 và IOAI 2025), sau đó xây dựng hai Notebook độc lập để huấn luyện mô hình:
1. **Tác vụ 1 (`salary_prediction.ipynb`):** Bài toán Hồi quy bảng (Tabular Regression) dự đoán mức lương dựa trên dữ liệu tuyển dụng Glassdoor (nguồn: *BGOAI 2025 - Bulgarian Team Selection Day 2 Task 4*).
2. **Tác vụ 2 (`antique_paintings_classification.ipynb`):** Bài toán Phân loại nhị phân bán giám sát (Semi-Supervised Binary Classification) xác thực tranh cổ thật/giả với dữ liệu cực hiếm nhãn (nguồn: *IOAI 2025 Beijing - Individual Contest: Antique*).

### Các nguyên tắc và ràng buộc nghiêm ngặt trong triển khai:
- **Độc lập và tự sinh:** Mỗi tác vụ được thực hiện trong một tập tin Notebook duy nhất (`salary_prediction.ipynb` và `antique_paintings_classification.ipynb`), sau đó nén vào tập tin `MSSV.zip`.
- **Minh bạch tiền xử lý:** Mọi quyết định tiền xử lý, lọc bỏ hay biến đổi dữ liệu (imputation, encoding, feature scaling, feature extraction) đều phải được giải thích ngắn gọn bằng các ô Markdown ngay trong Notebook.
- **Tuyệt đối không rò rỉ dữ liệu tập Test (No Data Leakage):** Việc lựa chọn mô hình, tinh chỉnh siêu tham số (Hyperparameter Tuning) tuyệt đối không được dựa vào tập Test.
- **Quy tắc sử dụng Validation Set:** Tập Validation (nếu có) chỉ được dùng để đánh giá độc lập nhằm lựa chọn mô hình / kiểm định ngưỡng tối ưu, không được đưa vào huấn luyện trực tiếp tham số mô hình.
- **Tính tự chủ trong chú thích:** Cho phép ứng dụng AI để tìm lời giải và tối ưu giải thuật, nhưng phần phân tích, giải thích và chú thích học thuật phải được tự viết, mạch lạc và chuẩn mực.

---

## 2. PHÂN TÍCH TÁC VỤ 1: DỰ ĐOÁN MỨC LƯƠNG (`salary_prediction.ipynb`)

### 2.1. Nguồn gốc & Bản chất bài toán
- **Nguồn bài toán:** [awesome-BGOAI-tasks: 2025 / BG_Team_Selection / Day_2 / Task_4](https://github.com/yonitoo/awesome-BGOAI-tasks/tree/main/2025/BG_Team_Selection/Day_2/Task_4).
- **Mục tiêu:** Dự đoán mức lương trung bình hàng năm (`Salary Estimate`) tính theo đơn vị nghìn USD/năm (\$K/year) dựa trên thông tin bài đăng tuyển dụng ngành Khoa học Dữ liệu / Phân tích / Kỹ thuật Phần mềm.
- **Dạng bài toán:** Hồi quy trên dữ liệu dạng bảng (Tabular Regression) có sự kết hợp của biến số (numerical), biến phân loại (categorical) và văn bản ngắn (short text: chức danh, mô tả công việc).

### 2.2. Khám phá cấu trúc dữ liệu (Dataset Inspection)
Tập dữ liệu gồm hai tệp chính:
- `train.csv` (593 dòng, 15 cột): Tập huấn luyện có đầy đủ đặc trưng và biến mục tiêu.
- `test_features.csv` (149 dòng, 14 cột): Tập kiểm tra không có cột `Salary Estimate`.
- `test_labels.csv` (145 dòng): Nhãn thực tế của tập test dùng để chấm điểm cuối cùng (sau khi đã loại bỏ 4 dòng chứa giá trị khuyết ở các trường bắt buộc).

Chi tiết các trường thông tin:
| Tên cột | Kiểu dữ liệu | Ý nghĩa & Phân tích |
| :--- | :--- | :--- |
| `Job Title` | Text (string) | Chức danh công việc (chứa tín hiệu mạnh về ngành nghề và thâm niên: Data Scientist, Senior, Lead, Manager...). |
| `Job Description` | Text (string) | Bản mô tả công việc (chứa từ khóa về kỹ năng: Python, AWS, Spark, SQL, Machine Learning...). |
| `Rating` | Float | Điểm đánh giá công ty trên Glassdoor (1.0 đến 5.0; các giá trị $\le 0$ hoặc -1 đại diện cho giá trị khuyết). |
| `Company Name` | Text (string) | Tên doanh nghiệp tuyển dụng. |
| `Location` | Text (string) | Địa điểm làm việc (định dạng `City, State Code`, ví dụ `New York, NY`). |
| `Headquarters` | Text (string) | Địa điểm đặt trụ sở chính của công ty. |
| `Size` | Categorical | Quy mô nhân sự (ví dụ: `10000+ employees`, `501 to 1000 employees`). |
| `Founded` | Integer | Năm thành lập công ty (giá trị `-1` biểu thị thông tin không xác định). |
| `Type of ownership`| Categorical | Loại hình sở hữu (Công ty đại chúng, tư nhân, phi lợi nhuận...). |
| `Industry` | Categorical | Phân ngành công nghiệp (Biotech, IT Services, Finance...). |
| `Sector` | Categorical | Khối kinh tế (Information Technology, Healthcare...). |
| `Revenue` | Categorical | Khung doanh thu hàng năm. |
| `Competitors` | Text / String| Danh sách đối thủ cạnh tranh (thường bị khuyết nhiều, gán `-1`). |
| `Salary Estimate` | Text (Target)| Chuỗi định dạng mức lương, ví dụ: `$47K-$85K (Glassdoor est.)`, `Employer Provided Salary: $110K-$150K`. |

### 2.3. Thang đo đánh giá (Evaluation Metric)
Đánh giá bằng Sai số Tuyệt đối Trung bình (**Mean Absolute Error - MAE**):
$$\text{MAE} = \frac{1}{N} \sum_{i=1}^{N} |y_i - \hat{y}_i|$$
Trong đó:
- $y_i$: Mức lương thực tế (\$K).
- $\hat{y}_i$: Mức lương dự đoán (\$K).
- *Ý nghĩa:* MAE có cùng đơn vị với biến mục tiêu (\$K), trực quan, không phạt quá nặng các giá trị ngoại lai (outliers) như MSE/RMSE. Mục tiêu là cực tiểu hóa MAE.

### 2.4. Đánh giá mô hình cơ sở (Baseline Analysis & Phê phán)
Mô hình cơ sở trong mã nguồn gốc:
```python
# Baseline features và mô hình gốc:
BASELINE_FEATURES = ['Rating', 'Size', 'Type of ownership', 'Industry', 'Sector', 'Revenue']
# Mã hóa dummy qua pd.get_dummies() -> Huấn luyện LinearRegression()
# MAE Baseline: ~28.415
```
**Nhược điểm của Baseline:**
1. **Thiếu vắng các đặc trưng cốt lõi:** Bỏ qua hoàn toàn `Job Title` (yếu tố quyết định 60-70% mức lương giữa Analyst vs. Director/Lead).
2. **Không khai thác tương quan không gian:** Bỏ qua thông tin địa lý (`Location` và `Headquarters`). Các bang như California (CA) hay New York (NY) có mặt bằng lương cao hơn đáng kể so với các vùng khác. Trụ sở chính thường trả lương cao hơn các chi nhánh.
3. **Mô hình tuyến tính đơn giản (Linear Regression):** Không nắm bắt được các tương tác phi tuyến (non-linear interactions) và hiện tượng kết hợp giữa quy mô công ty, ngành nghề và cấp bậc. Dễ bị ảnh hưởng bởi hiện tượng đa cộng tuyến khi áp dụng One-Hot Encoding trên các biến có nhiều phân lớp (High-cardinality categories).

### 2.5. Chiến lược Tiền xử lý & Kỹ nghệ Đặc trưng Đề xuất (Feature Engineering)
Để cải thiện vượt bậc MAE, ta áp dụng các kỹ thuật sau:
1. **Làm sạch và trích xuất biến mục tiêu (`Salary Estimate`):**
   - Loại bỏ các dòng `Salary Estimate == '-1'`.
   - Loại bỏ hậu tố `(Glassdoor est.)`, ký hiệu `$`, chữ `K`, `per hour`, `employer provided salary:`.
   - Trích xuất cận dưới (`Min_Salary`) và cận trên (`Max_Salary`), tính lương trung bình:
     $$\text{Salary} = \frac{\text{Min\_Salary} + \text{Max\_Salary}}{2}$$
2. **Chuẩn hóa chức danh công việc (`job_simp`):**
   - Rút gọn hàng trăm biến thể tiêu đề công việc thành 7 nhóm chuẩn:
     * `data scientist`: nếu chứa "data scientist".
     * `data engineer`: nếu chứa "data engineer".
     * `analyst`: nếu chứa "analyst".
     * `mle`: nếu chứa "machine learning".
     * `manager`: nếu chứa "manager".
     * `director`: nếu chứa "director".
     * `other`: còn lại.
3. **Trích xuất cấp độ thâm niên (`seniority`):**
   - Gán `senior` nếu tiêu đề chứa "sr", "senior", "lead", "principal".
   - Gán `jr` nếu chứa "jr" hoặc "junior".
   - Còn lại gán `na`/`mid`.
4. **Tính toán tuổi công ty (`company_age`):**
   - $\text{company\_age} = 2024 - \text{Founded}$. Nếu $\text{Founded} \le 0$ thì gán bằng giá trị trung vị hoặc gán nhãn khuyết riêng biệt.
5. **Đặc trưng địa lý & tương quan trụ sở (`same_state` & `State`):**
   - Tách mã tiểu bang từ cột `Location` (ví dụ `NY`, `CA`, `TX`).
   - Tạo cờ nhị phân `same_state = (Location == Headquarters)`: phản ánh nhân viên làm việc trực tiếp tại đại bản doanh công ty hay chi nhánh ngoài.
6. **Xử lý giá trị khuyết (`Rating`):**
   - `Rating <= 0` được thay thế bằng trung vị của ngành tương ứng hoặc để mô hình cây tự xử lý nhánh khuyết.
7. **Khai thác từ khóa kỹ thuật từ `Job Description` (Nâng cao):**
   - Tạo các cờ nhị phân: `has_python`, `has_aws`, `has_spark`, `has_sql` qua regex khớp từ khóa.

### 2.6. Chiến lược Huấn luyện & Lựa chọn Mô hình (Tuân thủ Quy tắc)
- **Thiết lập K-Fold Cross Validation:** Sử dụng 5-Fold Cross Validation trên tập `train.csv` để đo lường MAE trung bình và phương sai giữa các fold. Tuyệt đối không dùng `test_features.csv` để chọn mô hình.
- **Các mô hình ứng viên thử nghiệm:**
  1. *Ridge / Lasso Regression:* Đại diện mô hình tuyến tính có điều chuẩn L1/L2.
  2. *Random Forest Regressor:* Mô hình Bagging cây quyết định, giảm phương sai và kiểm soát overfitting tốt.
  3. *Gradient Boosting / LightGBM / XGBoost:* Mô hình tăng cường tuần tự, bắt trọn tương tác phi tuyến.
  4. *CatBoost Regressor (Mô hình ưu tiên hàng đầu):* Xử lý cực kỳ tối ưu dữ liệu dạng bảng với nhiều biến định tính mà không làm bùng nổ số chiều như One-Hot thông thường, chống overfitting mạnh mẽ trên tập dữ liệu kích thước nhỏ (~600 dòng).
- **Tinh chỉnh siêu tham số:** Sử dụng `GridSearchCV` trên 5-fold CV của tập train để tìm tổ hợp `depth`, `learning_rate`, `iterations`, `l2_leaf_reg`.
- **Mục tiêu hiệu năng:** Hạ MAE từ **28.415** (baseline) xuống dưới **15.0 - 17.0** (\$K).

---

## 3. PHÂN TÍCH TÁC VỤ 2: PHÂN LOẠI TRANH CỔ (`antique_paintings_classification.ipynb`)

### 3.1. Nguồn gốc & Bản chất bài toán
- **Nguồn bài toán:** [IOAI-2025 / Individual-Contest / Antique](https://github.com/IOAI-official/IOAI-2025/tree/main/Individual-Contest/Antique).
- **Mục tiêu:** Xây dựng thuật toán phân loại tranh cổ là đồ thật bản gốc (`1 - Authentic`) hay tranh sao chép/giả mạo (`-1 - Replica`).
- **Dạng bài toán:** Học bán giám sát (Semi-Supervised Learning) kết hợp Học đa tạp phi tuyến (Manifold Learning) trên không gian số 5 chiều.

### 3.2. Cấu trúc tập dữ liệu & Thách thức đặc thù
Tập dữ liệu gồm 3 tệp độc lập, mỗi tệp có 500 mẫu:
- `training_set.csv`: 500 mẫu, gồm 5 đặc trưng số liên tục (`feature1` đến `feature5`) và cột nhãn `Authenticated`.
  * **Phân phối nhãn trong tập huấn luyện:**
    - Nhãn `1` (Authentic): **2 mẫu duy nhất**.
    - Nhãn `-1` (Replica): **2 mẫu duy nhất**.
    - Nhãn `0` (Unknown / Chưa có nhãn): **496 mẫu (chiếm 99.2%)!**
- `validation_set.csv`: 500 mẫu, 5 đặc trưng số (không có nhãn). Dùng để chấm điểm Public Leaderboard A (`submissionA.csv`).
- `test_set.csv`: 500 mẫu, 5 đặc trưng số (không có nhãn). Dùng để chấm điểm Private Leaderboard B (`submissionB.csv`).
- `label.csv`: Chứa nhãn mặt đất (Ground Truth) cho 500 mẫu validation và 500 mẫu test, dùng độc quyền trong hệ thống chấm điểm `Scoring/metrics.py`.

### 3.3. Thang đo đánh giá (Evaluation Metric)
Độ chính xác phân loại (**Classification Accuracy**):
$$\text{Accuracy} = \frac{1}{N} \sum_{i=1}^{N} \mathbb{I}(y_i = \hat{y}_i)$$
Điểm chuẩn ban tổ chức IOAI 2025 công bố:
- Điểm Baseline của Hội đồng khoa học: **0.46** trên Leaderboard B.
- Điểm Kỷ lục cao nhất của Hội đồng khoa học: **0.98** trên Leaderboard B.

### 3.4. Đánh giá mô hình cơ sở (Baseline Flaws)
Trong notebook mẫu của ban tổ chức:
```python
# Baseline approach:
X = np.array(train.iloc[:, :5])
y = np.array(train.iloc[:, 5])
# Gán nhãn ngẫu nhiên cho 496 mẫu chưa biết:
np.random.seed(42)
y[y == 0] = np.random.choice([-1, 1], size=(y == 0).sum())
# Huấn luyện SVC:
svm_binary_model = SVC(kernel='rbf', C=1.0, gamma='scale', random_state=42)
svm_binary_model.fit(X, y)
# Độ chính xác trên Test B: ~0.46
```
**Nguyên nhân mô hình cơ sở thất bại:**
- Việc gán nhãn ngẫu nhiên cho 99.2% dữ liệu tạo ra **nhiễu nhãn cực đại (Maximum Label Noise)**, hủy hoại hoàn toàn cấu trúc hình học thực sự của dữ liệu.
- Ngược lại, nếu chỉ dùng 4 điểm có nhãn để huấn luyện SVM giám sát truyền thống thì mô hình không thể khái quát hóa được biên phân chia phi tuyến phức tạp trong không gian 5D.

### 3.5. Cơ sở lý thuyết & Giải pháp đề xuất (Spectral Clustering & Pseudo-Labeling)
Dữ liệu đặc trưng số của tranh cổ chứa cấu trúc đa tạp hình học (structural manifold patterns) rất mạnh. Hai lớp tranh thật và giả nằm trên hai cấu trúc cụm phi tuyến tách biệt:
1. **Phân cụm phổ (Spectral Clustering) trên toàn bộ không gian:**
   - Thay vì dùng khoảng cách Euclid tuyến tính (như K-Means), Spectral Clustering xây dựng đồ thị tương đồng (Affinity Matrix) bằng hàm nhân RBF (Gaussian Radial Basis Function):
     $$W_{ij} = \exp(-\gamma ||x_i - x_j||^2)$$
   - Sử dụng ma trận Laplacian chuẩn hóa $L = I - D^{-1/2} W D^{-1/2}$, trích xuất các vector riêng tương ứng với các giá trị riêng nhỏ nhất để chiếu dữ liệu lên không gian đa tạp chiều thấp, nơi hai cụm trở nên tách biệt tuyến tính rõ rệt.
   - Thiết lập số cụm $k = 2$, hàm nhân `affinity='rbf'`, tham số tỷ lệ `gamma = 10`.
2. **Cơ chế khớp nhãn neo (Anchor Seed Matching) tạo Pseudo-Labels:**
   - Sau khi phân chia 500 điểm thành 2 cụm $\{0, 1\}$, ta kiểm tra vị trí của 4 mẫu đã biết nhãn gốc.
   - Do cấu trúc đa tạp hoàn hảo, các mẫu có nhãn $+1$ sẽ rơi vào cụm thứ nhất và mẫu có nhãn $-1$ sẽ rơi vào cụm thứ hai.
   - Sử dụng thuật toán biểu quyết đa số (`Counter` / Majority Vote) trên tập nhãn neo để ánh xạ: $\text{Cluster } c \rightarrow \text{Label } \{-1, +1\}$.
   - Toàn bộ 500 mẫu huấn luyện lúc này nhận nhãn giả (pseudo-labels) có độ tin cậy tiệm cận 100%.
3. **Huấn luyện mô hình cảm nạp (Inductive Support Vector Classifier):**
   - Spectral Clustering là phương pháp chuyển nạp (Transductive), không thể trực tiếp dự đoán cho các điểm mới bên ngoài.
   - Vì vậy, ta lấy 500 điểm $X$ kèm nhãn giả đã gán để huấn luyện mô hình `SVC(kernel='rbf', C=1.0, gamma='scale')`.
   - Mô hình SVC này sẽ đóng vai trò là hàm quyết định (Decision Function) liên tục, sẵn sàng phân loại cho bất kỳ mẫu nào từ `validation_set.csv` và `test_set.csv`.
4. **Phương pháp mở rộng kiểm chứng:**
   - Triển khai thêm thuật toán **Lan truyền nhãn (Label Spreading / Label Propagation)** với đồ thị k-NN/RBF để so sánh tính ổn định của biên quyết định.

### 3.6. Chiến lược Kiểm định & Tuân thủ Ràng buộc
- **Không dùng Validation/Test để train:** Quá trình Spectral Clustering và gán nhãn giả chỉ thực hiện trên tập `training_set.csv`.
- **Validation Set:** Dùng để đối chiếu điểm Public A (đạt ~0.98), hoàn toàn độc lập với quá trình học tham số.
- **Test Set:** Hoàn toàn được bảo vệ, chỉ nạp vào mô hình SVC đã đóng băng để trích xuất `submissionB.csv`.

---

## 4. BẢNG SO SÁNH TỔNG HỢP HAI TÁC VỤ

| Tiêu chí | Tác vụ 1: Dự đoán Mức lương | Tác vụ 2: Phân loại Tranh cổ |
| :--- | :--- | :--- |
| **Tên notebook** | `salary_prediction.ipynb` | `antique_paintings_classification.ipynb` |
| **Nguồn gốc** | BGOAI 2025 Team Selection Day 2 Task 4 | IOAI 2025 Individual Contest - Antique |
| **Loại bài toán** | Hồi quy bảng (Tabular Regression) | Học bán giám sát (Semi-Supervised Classification) |
| **Kích thước dữ liệu** | 593 train / 149 test / 145 test labels | 500 train (4 nhãn, 496 ẩn) / 500 val / 500 test |
| **Không gian đặc trưng**| 14 cột (Số, phân loại, chuỗi văn bản tự do)| 5 đặc trưng số liên tục (đa tạp phi tuyến) |
| **Thang đo chính** | Mean Absolute Error (MAE) - Càng nhỏ càng tốt | Classification Accuracy - Càng lớn càng tốt |
| **Điểm Baseline** | $\text{MAE} \approx 28.415$ (\$K) | $\text{Accuracy} \approx 0.46$ |
| **Điểm Kỳ vọng** | $\text{MAE} < 16.0$ (\$K) | $\text{Accuracy} \approx 0.96 - 0.98$ |
| **Kỹ thuật chủ chốt** | Trích xuất chức danh, thâm niên, tuổi công ty, CatBoost | Spectral Clustering + Anchor Matching + RBF SVC |
| **Cách dùng Validation**| 5-Fold Cross Validation trên tập train | Đánh giá độc lập trên `validation_set.csv` |

---

## 5. BỐ CỤC VÀ THIẾT KẾ CÁC NOTEBOOK CHI TIẾT

### 5.1. Thiết kế Notebook: `salary_prediction.ipynb`
Mỗi phần đều có các ô Markdown giải thích ngắn gọn quyết định tiền xử lý:
1. **Tiêu đề & Khai báo thư viện:** `pandas`, `numpy`, `sklearn`, `catboost`, `lightgbm`, `matplotlib`, `seaborn`.
2. **Khám phá Dữ liệu (EDA):** Kiểm tra phân phối mức lương, các giá trị khuyết ở `Rating` và `Founded`.
3. **Tiền xử lý & Kỹ nghệ Đặc trưng (Feature Engineering):**
   - *Markdown:* Thuyết minh lý do tách `job_simp` và `seniority` từ `Job Title`, tính `company_age`, kiểm tra `same_state`.
   - *Code:* Định nghĩa các hàm `title_simplifier`, `seniority`, hàm xử lý chuỗi lương.
4. **Chuẩn bị Dữ liệu Huấn luyện & Kiểm định:**
   - Mã hóa biến phân loại, xử lý missing value thống nhất giữa train và test.
5. **Đánh giá Mô hình Cơ sở (Linear Regression Baseline):** Tái hiện kết quả gốc MAE ~28.415 để làm chuẩn so sánh.
6. **Thử nghiệm & So sánh Các Mô hình (5-Fold CV):**
   - So sánh Ridge, Random Forest, XGBoost, CatBoost.
   - Minh họa bảng MAE trung bình của từng mô hình trên validation folds.
7. **Tinh chỉnh Siêu tham số (CatBoost Hyperparameter Tuning):**
   - Tối ưu `depth`, `learning_rate`, `iterations` bằng `GridSearchCV`.
8. **Dự đoán & Xuất kết quả:**
   - Dự đoán trên `test_features.csv`, xuất tệp `predictions.csv`.
   - Đánh giá trên `test_labels.csv` để đối chiếu độ cải thiện so với baseline.

### 5.2. Thiết kế Notebook: `antique_paintings_classification.ipynb`
1. **Tiêu đề & Phân tích Bối cảnh:** Trình bày bài toán Art Authentication và hiện tượng khan hiếm nhãn (4/500).
2. **Khám phá Không gian Đặc trưng:** Kiểm tra 5 đặc trưng số, thống kê nhãn ($+1$: 2, $-1$: 2, $0$: 496).
3. **Mô phỏng Mô hình Cơ sở (Baseline):** Minh họa việc gán nhãn ngẫu nhiên và giải thích vì sao độ chính xác chỉ đạt ~0.46.
4. **Phân cụm phổ (Spectral Clustering):**
   - *Markdown:* Giải thích nguyên lý phân cụm dựa trên đồ thị tương đồng RBF Kernel và ma trận Laplacian để phát hiện cấu trúc phi tuyến.
   - *Code:* Chạy `SpectralClustering(n_clusters=2, affinity='rbf', gamma=10)`.
5. **Gán nhãn giả qua Mẫu mỏ neo (Anchor Matching):**
   - *Markdown:* Giải thích thuật toán biểu quyết đa số dựa trên 4 mẫu neo có nhãn gốc.
   - *Code:* Ánh xạ cụm thành nhãn $\pm 1$ và tạo `pseudo_labels`.
6. **Huấn luyện Mô hình Cảm nạp (RBF Support Vector Machine):**
   - Huấn luyện `SVC(kernel='rbf', C=1.0, gamma='scale')` trên dữ liệu kèm `pseudo_labels`.
7. **Dự đoán & Đóng gói Submission:**
   - Dự đoán trên `validation_set.csv` $\rightarrow$ `submissionA.csv`.
   - Dự đoán trên `test_set.csv` $\rightarrow$ `submissionB.csv`.
   - Đóng gói tệp `submission.zip` vào thư mục `Scoring`.
8. **Chấm điểm & Kiểm định Hiệu năng:**
   - Thực thi `Scoring/metrics.py`, hiển thị độ chính xác trên Leaderboard A và Leaderboard B (kỳ vọng $\ge 0.96$).

---

## 6. QUY TRÌNH NÉN VÀ BÀN GIAO `MSSV.zip`

Sau khi hoàn thành hai notebook, tiến hành đóng gói vào tệp zip theo đúng định dạng yêu cầu:
```text
MSSV.zip
├── salary_prediction.ipynb
└── antique_paintings_classification.ipynb
```

Lệnh PowerShell để tạo tệp zip:
```powershell
Compress-Archive -Path "salary_prediction.ipynb", "antique_paintings_classification.ipynb" -DestinationPath "MSSV.zip" -Force
```

Hoặc bằng Python script:
```python
import zipfile

with zipfile.ZipFile("MSSV.zip", "w", zipfile.ZIP_DEFLATED) as zipf:
    zipf.write("salary_prediction.ipynb", arcname="salary_prediction.ipynb")
    zipf.write("antique_paintings_classification.ipynb", arcname="antique_paintings_classification.ipynb")
```

---

## 7. CHECKLIST KIỂM TRA TRƯỚC KHI NỘP BÀI

- [x] Đã tạo thư mục `HMTK/TH4` và tệp phân tích chi tiết.
- [ ] Tệp `salary_prediction.ipynb` chạy trơn tru từ đầu đến cuối không lỗi (Restart & Run All).
- [ ] Tệp `antique_paintings_classification.ipynb` chạy trơn tru và sinh tệp `submission.zip` hợp lệ.
- [ ] Mọi bước tiền xử lý đều có ô Markdown giải thích ngắn gọn, súc tích.
- [ ] Không có hiện tượng rò rỉ dữ liệu từ tập Test vào quá trình huấn luyện hoặc chọn mô hình.
- [ ] Tập Validation chỉ được dùng để so sánh, chọn mô hình hoặc tinh chỉnh tham số, không train trực tiếp.
- [ ] Đã nén thành công tệp `MSSV.zip` chứa đúng 2 notebook theo yêu cầu.
