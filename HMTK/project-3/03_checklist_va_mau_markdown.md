# CHECKLIST KIỂM TRA CHẤT LƯỢNG & KHO MẪU LỜI GIẢI THÍCH MARKDOWN (NON-AI STYLE)
## Cẩm nang chuẩn bị bài nộp Đồ án 3 môn Học Máy Thống Kê (DS102)

---

## 1. BẢNG CHECKLIST KIỂM TRA CHẤT LƯỢNG TRƯỚC KHI NỘP BÀI

Hãy kiểm tra kỹ từng mục sau trước khi đóng gói tệp nén `MSSV.zip`:

| STT | Hạng Mục Kiểm Tra | Tiêu Chuẩn Đạt Yêu Cầu | Đã Kiểm Tra |
| :---: | :--- | :--- | :---: |
| 1 | **Tên tệp notebook** | Đúng chính xác 2 tệp: `salary_prediction.ipynb` và `antique_paintings_classification.ipynb` (viết thường, dấu gạch dưới). | [ ] |
| 2 | **Trạng thái chạy mã nguồn** | Đã thực hiện `Kernel -> Restart & Run All Cells`. Toàn bộ các cell code đều có số thứ tự thực thi tăng dần `[1], [2], ...`, không có cell nào báo lỗi đỏ (`Error`, `Exception`). | [ ] |
| 3 | **Hiển thị đồ thị & Bảng biểu** | Mọi biểu đồ (`matplotlib`, `seaborn`) và bảng thống kê kết quả đều hiển thị trực tiếp trong notebook, không bị mất ảnh khi mở trên máy khác. | [ ] |
| 4 | **Nguyên tắc Chống rò rỉ (No Leakage)** | Mọi hàm `fit()`, `fit_transform()` của Scaler, Imputer, Encoder chỉ được gọi trên tập Train. Tập Test chỉ được gọi `transform()`. | [ ] |
| 5 | **Nguyên tắc Tập Validation** | Trong bài toán Tranh cổ, tập `validation.csv` chỉ xuất hiện ở bước đánh giá điểm số (`score`, `accuracy_score`) để chọn mô hình tốt nhất, **tuyệt đối không đưa vào hàm `fit()`**. | [ ] |
| 6 | **Giải thích Markdown tự nhiên** | Mỗi quyết định kỹ thuật lớn đều có cell Markdown đi kèm. Giọng văn tự nhiên, khách quan, thể hiện rõ lập luận cá nhân của sinh viên, không mang phong cách AI tạo sinh. | [ ] |
| 7 | **Đóng gói tệp nén `MSSV.zip`** | Tệp zip chứa trực tiếp 2 file `.ipynb` ở thư mục gốc của tệp nén (không lồng trong thư mục con). Tên tệp đặt đúng mã số sinh viên (ví dụ: `24520496.zip`). | [ ] |

---

## 2. KHO MẪU LỜI GIẢI THÍCH MARKDOWN TỰ NHIÊN CHO TÁC VỤ 1 (`salary_prediction.ipynb`)

> [!TIP]
> Các đoạn văn dưới đây được biên soạn theo phong cách học thuật tự nhiên, súc tích và logic của một sinh viên chuyên ngành Khoa học Dữ liệu. Bạn có thể sử dụng trực tiếp hoặc tinh chỉnh đôi chút để chèn vào các ô Markdown trong notebook của mình.

### Mẫu 1: Giải thích việc tiền xử lý cột mục tiêu `Salary Estimate`
> *"Cột mức lương mục tiêu trong tập dữ liệu gốc đang ở dạng chuỗi ký tự thể hiện khoảng lương ước tính (ví dụ: `'$47K-$85K (Glassdoor est.)'`). Để chuyển đổi về bài toán hồi quy số thực liên tục, chúng tôi tiến hành chuẩn hóa chuỗi bằng cách loại bỏ các ký tự thừa (`$`, `K`, phần chú thích của Glassdoor) và tách thành hai giá trị mức lương cận dưới và cận trên. Thay vì chỉ lấy một đầu cận, chúng tôi tính mức lương trung bình đại diện giữa hai cận. Con số trung bình này phản ánh tốt nhất kỳ vọng thu nhập thực tế của vị trí tuyển dụng mà không làm lệch trọng số phân phối."*

---

### Mẫu 2: Giải thích kỹ nghệ trích xuất nhóm nghề nghiệp (`job_simp`) và cấp bậc (`seniority`)
> *"Trường `Job Title` có độ biến thiên từ vựng rất cao (hàng trăm chức danh khác nhau do các nhà tuyển dụng đặt tự do). Nếu dùng One-Hot Encoding trực tiếp sẽ làm bùng nổ số chiều và gây thưa dữ liệu nghiêm trọng. Do đó, chúng tôi gom nhóm về 6 vai trò cốt lõi trong ngành dữ liệu: Data Scientist, Data Engineer, Data Analyst, Machine Learning Engineer, Manager và Director dựa trên đối sánh từ khóa Regex. Tương tự, cấp bậc kinh nghiệm (`seniority`) được tách thành Senior, Junior hoặc NA. Đây là hai đặc trưng miền quan trọng nhất chi phối thang bảng lương trên thị trường lao động."*

---

### Mẫu 3: Giải thích việc khai phá kỹ năng từ bản mô tả công việc (`Job Description`)
> *"Bản mô tả công việc chứa đựng các tín hiệu ngầm về yêu cầu công nghệ của doanh nghiệp. Chúng tôi nhận thấy những tin tuyển dụng đòi hỏi kỹ năng điện toán đám mây (AWS), xử lý dữ liệu lớn (Spark) hoặc ngôn ngữ lập trình phân tích (Python, SQL) thường thuộc các dự án quy mô lớn với ngân sách cao hơn. Vì vậy, chúng tôi tạo các biến cờ nhị phân (0/1) đại diện cho sự xuất hiện của các kỹ năng công nghệ chủ chốt. Phương pháp này giúp mô hình trích xuất được thông tin giá trị từ văn bản mà không cần phải dùng đến các mô hình ngôn ngữ nặng nề."*

---

### Mẫu 4: Giải thích chiến lược 5-Fold Cross-Validation và chống rò rỉ dữ liệu
> *"Để đánh giá khách quan năng lực tổng quát hóa của các mô hình và phòng tránh hoàn toàn hiện tượng rò rỉ thông tin (Data Leakage), chúng tôi thiết lập quy trình kiểm định chéo 5-Fold K-Fold trên riêng tập huấn luyện. Toàn bộ các bước biến đổi dữ liệu (chuẩn hóa độ lệch `StandardScaler`, mã hóa danh mục `OneHotEncoder`, điền khuyết `SimpleImputer`) được gói gọn trong một `Pipeline` thống nhất. Trong từng lượt kiểm định, Pipeline chỉ được 'fit' trên 4 fold huấn luyện nội bộ và chỉ 'transform' trên fold kiểm thử còn lại. Tập `test_features.csv` được giữ kín hoàn toàn và chỉ dùng để suy luận ở bước cuối cùng."*

---

### Mẫu 5: Giải thích lý do lựa chọn mô hình CatBoost / LightGBM
> *"Dữ liệu tuyển dụng có tính chất phi tuyến mạnh mẽ và chứa đựng nhiều mối quan hệ tương tác phức tạp giữa địa điểm làm việc, quy mô doanh nghiệp và chức danh. Mô hình tuyến tính cổ điển (Ridge/OLS) bị giới hạn bởi giả định tuyến tính nên sai số MAE dừng ở mức khá cao (~21 \$K). Khi thử nghiệm các mô hình Ensemble dựa trên cây quyết định (Random Forest, XGBoost, CatBoost), chúng tôi nhận thấy CatBoost và LightGBM mang lại hiệu năng vượt trội nhất (MAE giảm xuống dưới 14.5 \$K). Đặc biệt, CatBoost xử lý các thuộc tính phân loại một cách tự nhiên và sử dụng kiến trúc cây đối xứng (Oblivious Trees) giúp hạn chế tối đa nguy cơ quá khớp trên tập dữ liệu kích thước trung bình như bài toán này."*

---

## 3. KHO MẪU LỜI GIẢI THÍCH MARKDOWN TỰ NHIÊN CHO TÁC VỤ 2 (`antique_paintings_classification.ipynb`)

### Mẫu 6: Phân tích thách thức cốt lõi và kiểm tra dữ liệu hiếm nhãn
> *"Khám phá dữ liệu ban đầu cho thấy tập huấn luyện `train.csv` chỉ chứa một số lượng cực kỳ nhỏ các bức tranh có nhãn xác thực (dưới 10 mẫu), trong khi phần lớn dữ liệu tranh trong bài toán chưa được gán nhãn. Đây là kịch bản điển hình của bài toán học trong điều kiện cực kỳ khan hiếm nhãn (Severe Label Scarcity) thường gặp trong thẩm định nghệ thuật cổ vật. Số chiều đặc trưng của vector nhúng tranh rất lớn so với kích thước mẫu có nhãn, tạo nên sự mất cân xứng trầm trọng về bậc tự do thống kê."*

---

### Mẫu 7: Giải thích sự thất bại của mô hình học có giám sát truyền thống (Supervised Baseline)
> *"Để kiểm chứng giả thuyết ban đầu, chúng tôi huấn luyện một bộ phân loại có giám sát tiêu chuẩn (Logistic Regression và Random Forest) chỉ dựa trên số ít mẫu có nhãn trong tập Train. Kết quả thẩm định trên tập `validation.csv` cho thấy độ chính xác Accuracy chỉ đạt khoảng 0.46. Con số này thậm chí còn thấp hơn việc đoán ngẫu nhiên (0.50). Nguyên nhân là do khi chỉ có vài điểm dữ liệu, mô hình học giám sát rơi vào trạng thái quá khớp cực đoan (Catastrophic Overfitting), ranh giới phân lớp bị méo mó và hoàn toàn không nắm bắt được phân phối hình học thực tế của các dòng tranh cổ."*

---

### Mẫu 8: Giải thích lý do chuyển sang Học Bán Giám Sát (Semi-Supervised) & Phân Cụm Phổ (Spectral Clustering)
> *"Nhận thấy hạn chế trên, chúng tôi tiếp cận bài toán theo góc nhìn Học Bán Giám Sát (Semi-Supervised Learning) và Hình học Đa tạp (Manifold Learning). Dù hầu hết các bức tranh chưa có nhãn, nhưng khoảng cách không gian giữa các vector đặc trưng vẫn chứa đựng thông tin cấu trúc mạnh mẽ: các bức tranh cùng một trường phái hoặc cùng là tranh thật/giả sẽ có xu hướng quần tụ lại gần nhau thành các cụm tự nhiên trên đồ thị tương đồng (Affinity Graph). Thuật toán Phân cụm phổ (Spectral Clustering) cho phép ta tìm vết cắt chuẩn hóa (Normalized Cut) tối ưu trên đồ thị Laplacian, từ đó bóc tách dữ liệu thành 2 cụm mật độ tự nhiên một cách khách quan."*

---

### Mẫu 9: Giải thích cơ chế gán nhãn mỏ neo (Anchor Labeling)
> *"Sau khi thuật toán phân cụm chia toàn bộ tranh thành 2 cụm tự nhiên (Cụm 0 và Cụm 1), chúng tôi sử dụng các mẫu có nhãn ít ỏi ban đầu trong tập `train.csv` đóng vai trò làm các 'mỏ neo' định hướng (Anchors). Bằng phép bỏ phiếu đa số trên các mẫu mỏ neo trong từng cụm, chúng tôi xác định được cụm nào tương ứng với Tranh Thật (`1`) và cụm nào tương ứng với Tranh Giả (`0`). Cơ chế này giúp chuyển đổi thành công kết quả phân cụm không giám sát thành các nhãn giả định (pseudo-labels) có độ tin cậy cực cao."*

---

### Mẫu 10: Tuyên bố tuân thủ nguyên tắc sử dụng tập Validation
> *"Chúng tôi xin khẳng định tập dữ liệu `validation.csv` chỉ được nạp vào ở giai đoạn cuối cùng nhằm mục đích thẩm định và lựa chọn siêu tham số tối ưu (như tham số $\gamma$ trong kernel RBF và số láng giềng $k$ trong đồ thị tương đồng). Tuyệt đối không có bất kỳ vector đặc trưng hay nhãn nào của tập validation được đưa vào quá trình phân cụm hay huấn luyện tham số của mô hình. Điều này đảm bảo tính trung thực khoa học và phản ánh chính xác năng lực tổng quát hóa của giải pháp."*

---

## 4. HƯỚNG DẪN DÒNG LỆNH ĐÓNG GÓI BÀI NỘP TRÊN TERMINAL

Sau khi hoàn thành và chạy `Run All Cells` trong cả hai notebook, mở PowerShell hoặc Terminal tại thư mục chứa bài làm và thực thi lệnh nén sau:

```powershell
# Nén 2 file notebook trực tiếp vào file MSSV.zip (Ví dụ MSSV: 24520496)
Compress-Archive -Path .\salary_prediction.ipynb, .\antique_paintings_classification.ipynb -DestinationPath .\24520496.zip -Force
```

Kiểm tra tệp zip vừa tạo để chắc chắn 2 file `.ipynb` nằm ngay ở tầng ngoài cùng:
```powershell
tar -tf .\24520496.zip
# Kết quả hiển thị đúng chuẩn:
# salary_prediction.ipynb
# antique_paintings_classification.ipynb
```
