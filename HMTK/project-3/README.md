# ĐỒ ÁN 3 (PROJECT 3): HUẤN LUYỆN MÔ HÌNH HỌC MÁY THỰC CHIẾN
## BGOAI Salary Prediction & IOAI Antique Paintings Authentication
> **Học phần:** Học Máy và Thống Kê (DS102) – UIT  
> **Bộ dữ liệu thi đấu:** [BGOAI 2025 Day 2 Task 4](https://github.com/yonitoo/awesome-BGOAI-tasks/tree/main/2025/BG_Team_Selection/Day_2/Task_4) & [IOAI 2025 Individual Contest - Antique](https://github.com/IOAI-official/IOAI-2025/tree/main/Individual-Contest/Antique)

---

## 🎯 MỤC TIÊU & TỔNG QUAN DỰ ÁN

Dự án yêu cầu sinh viên giải quyết hai bài toán học máy thực tế có độ phức tạp cao, được trích xuất từ các kỳ thi Olympic Trí tuệ Nhân tạo quốc gia và quốc tế:

1. **Tác vụ 1 – Dự đoán Mức lương (`salary_prediction.ipynb`):**
   - **Nguồn bài toán:** *BGOAI 2025 (Bulgarian National Olympiad in AI - Team Selection Day 2 Task 4)*.
   - **Bản chất:** Hồi quy bảng (Tabular Regression) dự đoán mức lương trung bình hàng năm (\$K/năm) từ dữ liệu tuyển dụng Glassdoor kết hợp giữa biến số, biến phân loại và văn bản ngắn.
   - **Thang đo:** Sai số Tuyệt đối Trung bình (**MAE - Mean Absolute Error**).
   - **Mục tiêu kỹ thuật:** Vượt qua Baseline MAE `28.415`, tối ưu xuống dải `12.0 - 15.5` thông qua kỹ nghệ đặc trưng miền (Domain Feature Engineering) và mô hình Gradient Boosting (CatBoost / LightGBM / XGBoost).

2. **Tác vụ 2 – Xác thực Tranh cổ (`antique_paintings_classification.ipynb`):**
   - **Nguồn bài toán:** *IOAI 2025 Beijing (International Olympiad in Artificial Intelligence - Individual Contest)*.
   - **Bản chất:** Phân loại nhị phân trong điều kiện **cực kỳ hiếm nhãn (Severe Label Scarcity / Semi-Supervised Learning)** nhằm phân biệt tranh cổ thật (True) và tranh giả mạo (Fake).
   - **Thang đo:** Độ chính xác (**Accuracy**).
   - **Mục tiêu kỹ thuật:** Giải quyết hiện tượng mô hình học giám sát tiêu chuẩn thất bại hoàn toàn (Baseline Accuracy chỉ đạt $\approx 0.46$, thấp hơn đoán ngẫu nhiên), đưa độ chính xác lên ngưỡng $\ge 0.95$ bằng thuật toán Phân cụm phổ (Spectral Clustering) hoặc Lan truyền nhãn (Label Spreading / Label Propagation).

---

## ⚠️ CÁC NGUYÊN TẮC BẮT BUỘC (STRICT ACADEMIC RULES)

> [!IMPORTANT]
> ### 1. Chống Rò Rỉ Dữ Liệu Tập Test (Strictly No Data Leakage)
> - Toàn bộ các bước tiền xử lý (Imputer, Scaler, Encoder, Feature Selector) **bắt buộc phải được `fit` trên tập Huấn luyện (Train set)** rồi mới `transform` sang tập Kiểm tra (Test set).
> - Quá trình lựa chọn mô hình, tinh chỉnh siêu tham số (Hyperparameter Tuning) **tuyệt đối không được dựa vào kết quả trên tập Test**.

> [!WARNING]
> ### 2. Quy Tắc Sử Dụng Tập Validation
> - Tập Validation (nếu có, đặc biệt trong bài toán Tranh cổ) **chỉ được dùng để so sánh chọn mô hình và tối ưu ngưỡng (thresholding)**.
> - **Tuyệt đối không đưa tập Validation vào quá trình huấn luyện trực tiếp các trọng số (parameters) của mô hình.**

> [!CAUTION]
> ### 3. Quy Chuẩn Nội Dung Markdown Trong Notebook (Không Dùng Văn Phong AI)
> - Các quyết định tiền xử lý, trích xuất đặc trưng, lựa chọn giải thuật cần kèm theo phần giải thích bằng ô Markdown ngay trước hoặc sau cell code tương ứng.
> - **Nội dung Markdown phải mang văn phong tự nhiên, phản ánh tư duy phản biện và suy luận cá nhân của sinh viên**, không sao chép nguyên văn văn phong AI máy móc, sáo rỗng hoặc lặp từ ngữ khuôn mẫu.

> [!NOTE]
> ### 4. Trạng Thái Notebook Khi Nộp
> - Cả hai notebook nộp bài phải ở trạng thái **đã chạy hoàn tất từ đầu đến cuối (Run → Run All Cells)**, lưu đầy đủ toàn bộ bảng biểu, đồ thị và log kết quả. Không để sót lỗi biên dịch hoặc lỗi chạy dở dang.

---

## 📦 QUY CÁCH ĐÓNG GÓI BÀI NỘP (`MSSV.zip`)

Cấu trúc tệp nén bài nộp phải phẳng và chứa trực tiếp 2 tệp Notebook:

```text
MSSV.zip
├── salary_prediction.ipynb                  # Notebook hoàn chỉnh tác vụ 1 (kèm kết quả đã chạy)
└── antique_paintings_classification.ipynb   # Notebook hoàn chỉnh tác vụ 2 (kèm kết quả đã chạy)
```

*(Trong đó `MSSV` là Mã số sinh viên của bạn, ví dụ: `24520496.zip`).*

---

## 📚 BẢN ĐỒ TÀI LIỆU HƯỚNG DẪN TRONG THƯ MỤC

| Tệp Tài Liệu | Nội Dung Trọng Tâm | Liên Kết Trực Tiếp |
| :--- | :--- | :---: |
| **`01_salary_prediction_guide.md`** | Phân tích tập dữ liệu lương Glassdoor, kỹ nghệ trích xuất đặc trưng chức danh & kỹ năng, chiến lược 5-Fold CV và huấn luyện mô hình CatBoost/XGBoost. | [Xem hướng dẫn Task 1](file:///d:/KnowledgeLibrary/HMTK/project-3/01_salary_prediction_guide.md) |
| **`02_antique_paintings_guide.md`** | Bản chất bài toán hiếm nhãn IOAI, lý giải thất bại của Supervised Baseline, thuật toán Spectral Clustering & Label Spreading, huấn luyện RBF SVM cảm nạp. | [Xem hướng dẫn Task 2](file:///d:/KnowledgeLibrary/HMTK/project-3/02_antique_paintings_guide.md) |
| **`03_checklist_va_mau_markdown.md`** | Checklist kiểm tra chất lượng trước khi nén zip + Kho đoạn văn Markdown mẫu chuẩn học thuật tự nhiên (không AI) sẵn sàng chèn vào Notebook. | [Xem Checklist & Mẫu Markdown](file:///d:/KnowledgeLibrary/HMTK/project-3/03_checklist_va_mau_markdown.md) |
| **`04_huong_dan_setup_kaggle.md`** | Hướng dẫn chi tiết cách cấu hình môi trường Kaggle Notebooks (GPU/Internet), tải gọn dữ liệu GitHub bằng `sparse-checkout` và xuất file `.ipynb` chuẩn nộp bài. | [Xem hướng dẫn Kaggle](file:///d:/KnowledgeLibrary/HMTK/project-3/04_huong_dan_setup_kaggle.md) |

---

## 🛠️ KHUYẾN NGHỊ MÔI TRƯỜNG & THƯ VIỆN

```bash
# Cài đặt các thư viện phụ thuộc cho cả hai tác vụ:
pip install numpy pandas scikit-learn matplotlib seaborn
pip install xgboost lightgbm catboost
```
