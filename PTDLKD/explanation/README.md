# Thư Mục Giải Thích Chuyên Sâu (PTDLKD Explanations Hub)

Thư mục này chứa các tài liệu phân tích kỹ thuật chuyên sâu (Deep-dive Explanations), bóc tách các khái niệm then chốt, nền tảng toán học, cạm bẫy mô hình và kỹ thuật triển khai thực chiến trong chuyên ngành **Phân Tích Dữ Liệu Kinh Doanh (Business Data Analytics - PTDLKD)**.

---

## DANH MỤC CÁC CHUYÊN ĐỀ PHÂN TÍCH

| STT | Chuyên Đề Phân Tích | File Tài Liệu | Trọng Tâm Kiến Thức Cốt Lõi |
| :---: | :--- | :--- | :--- |
| **01** | **Chiến Lược Phân Chia Dữ Liệu Chuỗi Thời Gian** | [purging_buffer_and_rolling_origin_cv.md](purging_buffer_and_rolling_origin_cv.md) | • Bản chất sụp đổ của giả định I.I.D<br>• Cạm bẫy rò rỉ dữ liệu (Look-ahead Bias / Silent Leakage)<br>• Rolling-Origin CV: Expanding Window vs Sliding Window<br>• Kỹ thuật Purging Buffer (Gap) & Embargo của Marcos López de Prado<br>• Cài đặt mã nguồn Python chuẩn mực Scikit-Learn |
| **02** | **Kiểm Định Tính Dừng: Augmented Dickey-Fuller (ADF)** | [augmented_dickey_fuller_test.md](augmented_dickey_fuller_test.md) | • Tính dừng yếu & Hiểm họa hồi quy giả mạo (Spurious Regression)<br>• Bản chất toán học của Nghiệm đơn vị (Unit Root $\rho = 1$)<br>• Phân phối phi chuẩn Dickey-Fuller và 3 biến thể phương trình ADF<br>• Tiêu chí ra quyết định: ADF Statistic vs Critical Values vs p-value<br>• Ma trận đối chuẩn ADF vs KPSS Test và Pipeline tự động hóa sai phân $d$ |
| **03** | **Mô Hình Kinh Điển: ARIMA & SARIMAX** | [arima_and_sarimax.md](arima_and_sarimax.md) | • Bóc tách toán học 3 thành phần $\text{AR}(p)$, $\text{I}(d)$, $\text{MA}(q)$<br>• Quy trình 4 bước Box-Jenkins chuẩn mực (Nhận dạng qua ACF/PACF)<br>• Mở rộng mùa vụ $\text{SARIMA}(p,d,q)(P,D,Q)_s$<br>• Đỉnh cao $\text{SARIMAX}$: Hồi quy tuyến tính với sai số chuỗi thời gian<br>• Pipeline thực chiến bằng `pmdarima` (`auto_arima`) và `statsmodels` |

---

## BẢN ĐỒ LỘ TRÌNH HỌC TẬP & NGHIÊN CỨU

```mermaid
flowchart LR
    Step1["<b>1. KIỂM ĐỊNH TÍNH DỪNG</b><br><a href='augmented_dickey_fuller_test.md'>augmented_dickey_fuller_test.md</a><br><i>ADF Test, KPSS Test, Khử Trend & Tìm bậc d</i>"] 
    
    Step2["<b>2. CHIA TẬP KIỂM ĐỊNH CHUẨN</b><br><a href='purging_buffer_and_rolling_origin_cv.md'>purging_buffer_and_rolling_origin_cv.md</a><br><i>Rolling-Origin CV, Purging Buffer Gap, Embargo</i>"]
    
    Step3["<b>3. MÔ HÌNH HÓA & DỰ BÁO</b><br><a href='arima_and_sarimax.md'>arima_and_sarimax.md</a><br><i>Quy trình Box-Jenkins, SARIMAX với biến ngoại sinh X</i>"]

    Step1 --> Step2 --> Step3
```

---

> 💡 **Mục đích:** Cung cấp tài liệu tham khảo chi tiết, có tính ứng dụng cao dành cho sinh viên, kỹ sư dữ liệu và chuyên gia phân tích trong việc thiết kế các hệ thống học máy chuỗi thời gian bền vững, loại bỏ các kết quả đo lường ảo tưởng trước khi triển khai vào môi trường sản xuất (Production).
