# HMTK Tutorial: Chuyên Đề Hồi Quy Tuyến Tính & Quy Tắc Hóa (Regression & Regularization)

Bộ tài liệu chuyên đề tự học và bài tập điền khuyết tính toán tương tác môn **Học Máy Thống Kê (DS102)**, được biên soạn bám sát theo giáo trình slide bài giảng **Chương 4: Hồi quy tuyến tính (Linear Regression, Ridge & Lasso - UIT)**.

---

## 🎯 Triết Lý Học Tập & Quy Chuẩn (SOP)

- **Hiểu bản chất toán học & cơ chế đại số:** Nắm vững từ phương trình giải tích, phép chiếu trực giao không gian véc-tơ đến phân tích ma trận nghịch đảo.
- **Active Recall (Tự nhớ công thức):** Bài tập tương tác không in sẵn công thức hay thế số trước; người học phải tự vận dụng lý thuyết trong đầu để tính toán.
- **Tính toán số liệu cụ thể (Hands-on Computation):** Làm việc trực tiếp với các ma trận hiệp phương sai, giá trị định thức, bảng phân tích phương sai ANOVA, kiểm định $F, t$ và chuẩn phạt $L_1, L_2$.
- 📜 Chi tiết quy chuẩn thiết kế: xem tại [rule.md](file:///d:/KnowledgeLibrary/HMTK/tutorial/rule.md).

---

## 📚 Danh Mục Các Chuyên Đề

| Chuyên Đề | Nội Dung Trọng Tâm | Tài Liệu Lý Thuyết | Bài Tập Tính Toán Tương Tác |
| :--- | :--- | :---: | :---: |
| **01. Hồi quy tuyến tính & Phương pháp LSM** | Ma trận thiết kế $X$, hệ phương trình chuẩn $\hat{\theta} = (X^TX)^{-1}X^Ty$, 4 giả định Gauss-Markov, trực quan hóa hình chiếu, tuyến tính hóa mô hình phi tuyến. | [ly_thuyet.md](file:///d:/KnowledgeLibrary/HMTK/tutorial/01_hoi_quy_tuyen_tinh_va_phuong_phap_lsm/ly_thuyet.md) | [bai_tap_tinh_toan.html](file:///d:/KnowledgeLibrary/HMTK/tutorial/01_hoi_quy_tuyen_tinh_va_phuong_phap_lsm/bai_tap_tinh_toan.html) |
| **02. Đánh giá & Kiểm định mô hình (ANOVA & R²)** | Phân rã phương sai $TSS = ESS + RSS$, hệ số xác định $R^2$, $\bar{R}^2$, bảng ANOVA & kiểm định giả thuyết $F$, kiểm định Student $t$ cho từng hệ số hồi quy, ma trận hiệp phương sai mẫu. | [ly_thuyet.md](file:///d:/KnowledgeLibrary/HMTK/tutorial/02_danh_gia_kiem_dinh_mo_hinh_anova_va_r2/ly_thuyet.md) | [bai_tap_tinh_toan.html](file:///d:/KnowledgeLibrary/HMTK/tutorial/02_danh_gia_kiem_dinh_mo_hinh_anova_va_r2/bai_tap_tinh_toan.html) |
| **03. Hồi quy quy tắc hóa: Ridge, Lasso & Elastic Net** | Hiện tượng Overfitting, Bias-Variance tradeoff, Ridge ($L_2$ closed-form $\hat{\theta} = (X^TX+\alpha I)^{-1}X^Ty$), Lasso ($L_1$, subgradient, sparsity & automatic feature selection), Elastic Net, Early Stopping. | [ly_thuyet.md](file:///d:/KnowledgeLibrary/HMTK/tutorial/03_hoi_quy_quy_tac_hoa_ridge_lasso_elastic_net/ly_thuyet.md) | [bai_tap_tinh_toan.html](file:///d:/KnowledgeLibrary/HMTK/tutorial/03_hoi_quy_quy_tac_hoa_ridge_lasso_elastic_net/bai_tap_tinh_toan.html) |

---

## 🛠️ Hướng Dẫn Sử Dụng

1. **Bước 1:** Đọc kỹ tài liệu lý thuyết `ly_thuyet.md` trong từng chuyên đề. Chú ý các sơ đồ Mermaid giải thích luồng tính toán (Architecture / Forward Pass) và mục *Ví dụ tính toán chi tiết bằng số*.
2. **Bước 2:** Mở tệp `bai_tap_tinh_toan.html` tương ứng trên trình duyệt web (Chrome, Edge, Firefox, v.v.).
3. **Bước 3:** Sử dụng máy tính cầm tay (hoặc công cụ tính toán) để tính ra các giá trị vào từng ô trống.
4. **Bước 4:** Bấm **"Kiểm Tra Kết Quả"** để hệ thống chấm điểm tự động. Nếu có câu sai, mở phần **"Xem hướng dẫn và đáp án chi tiết"** để xem các bước phân tích.
