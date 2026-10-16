# Hệ Sinh Thái Case Study Thực Tế: Chuỗi Thời Gian (Time Series Real-World Case Studies Hub)

Hệ thống tài liệu này bao gồm bộ sưu tập các **Case Study thực chiến đa ngành (Bán lẻ E-Commerce, Tài chính Ngân hàng, Năng lượng Smart Grid, Công nghiệp IoT, Hàng không và Y tế số)**, được thiết kế song hành $1-1$ với từng file lý thuyết nền tảng trong thư mục [time-series-data-fundamentals-conecpts/](file:///D:/KnowledgeLibrary/PTDLKD/time-series-data-fundamentals-conecpts):

---

## BẢNG TRA CỨU SONG HÀNH (THEORY ↔ CASE STUDY MAPPING)

| STT | File Lý Thuyết Nền Tảng | File Case Study Thực Chiến Song Hành | Các Ngành Công Nghiệp & Ứng Dụng Đại Diện |
| :---: | :--- | :--- | :--- |
| **01** | [general_infomation.md](general_infomation.md)<br>*(Tổng quan, I.I.D, Phân rã, 6 Tasks)* | [case_study_general_information.md](case_study_general_information.md)<br>*(Ứng dụng tổng quan các nguyên lý)* | • Chuỗi cung ứng bán lẻ VinMart/Shopee<br>• Quản lý phụ tải lưới điện quốc gia EVN<br>• Cảnh báo sớm rung nhĩ Apple Watch |
| **02** | [data_generation.md](data_generation.md)<br>*(DGP, Stochastic Process, TimeGAN, Augmentation)* | [case_study_data_generation.md](case_study_data_generation.md)<br>*(Sinh dữ liệu & Tăng cường thực chiến)* | • Stress Testing danh mục ngân hàng đầu tư<br>• Sinh chuỗi ICU nhân tạo bằng TimeGAN / Diffusion-TS<br>• Tăng cường dữ liệu gia tốc kế xe tự hành IMU |
| **03** | [data_valuation.md](data_valuation.md)<br>*(Data Valuation, Shapley, Influence, Pruning)* | [case_study_data_valuation.md](case_study_data_valuation.md)<br>*(Định giá & Cắt tỉa dữ liệu hại)* | • Bắt lỗi cảm biến áp suất bám cặn nhà máy lọc dầu<br>• Nhận diện Concept Drift sau đại dịch tại Shopee<br>• Thị trường dữ liệu giao thông Smart City bằng DVRL |
| **04** | [model.md](model.md)<br>*(ARIMA, GBDT, TCN, PatchTST vs DLinear, Foundation)* | [case_study_model.md](case_study_model.md)<br>*(Thực chiến 5 họ mô hình chuỗi thời gian)* | • Dự báo tỷ giá USD/VND & Biến động bằng GARCH<br>• Minh chứng Nghịch lý DLinear trên 50.000 SKU siêu thị<br>• Zero-shot Auto-scaling Kubernetes bằng Chronos |
| **05** | [learning_paradigm.md](learning_paradigm.md)<br>*(Supervised, SSL TS2Vec, Continual, Federated)* | [case_study_learning_paradigm.md](case_study_learning_paradigm.md)<br>*(Ứng dụng các mô thức học hiện đại)* | • Dự báo điện mặt trời 48 bước bằng Joint Output<br>• Giám sát tuốc-bin máy bay GE bằng Contrastive SSL<br>• Chống quên thảm họa trong phát hiện gian lận thẻ<br>• Học liên hợp (Federated Learning) trên Smartwatch |
| **06** | [evaluation.md](evaluation.md)<br>*(Purged CV, WAPE/MASE, Range-based Anomaly)* | [case_study_evaluation.md](case_study_evaluation.md)<br>*(Kiểm định chuẩn mực & Vạch trần cạm bẫy)* | • Chặn đứng Sharpe Ratio ảo trong quỹ đầu tư định lượng<br>• Vạch trần bẫy MAPE chia cho 0 tại chuỗi 1.500 nhà thuốc<br>• Lật tẩy bẫy Point-Adjusted F1 (98% ảo) trong an ninh SCADA |
| **07** | [repository.md](repository.md)<br>*(Darts, Nixtla, sktime, PyPOTS, ETT, M5 Walmart)* | [case_study_repository.md](case_study_repository.md)<br>*(Làm chủ công cụ & Benchmark quốc tế)* | • Tăng tốc dự báo 50.000 điểm phát điện gấp 40x với Nixtla<br>• Khôi phục 35% dữ liệu thủy văn Mê Kông bằng PyPOTS<br>• Điều khiển tay giả sinh học từ cơ EMG bằng sktime |

---

## BẢN ĐỒ CÁC BÀI TOÁN KINH ĐIỂN ĐƯỢC GIẢI QUYẾT

```mermaid
mindmap
  root((Hệ Sinh Thái Case Studies))
    Chuỗi Cung Ứng & Bán Lẻ
      Dự báo nhu cầu 50.000 SKU
      Đo lường sai số bằng WAPE và MASE
      Nghịch lý DLinear tiết kiệm 80% chi phí GPU
    Tài Chính & Ngân Hàng
      Dự báo tỷ giá USD/VND và độ biến động GARCH
      Purged & Embargoed CV triệt tiêu rò rỉ nhãn
      Phát hiện gian lận bằng Online Continual Learning
    Năng Lượng & Môi Trường
      Cân bằng phụ tải lưới điện quốc gia đa chu kỳ mùa vụ
      Dự báo điện mặt trời 48 bước bằng Joint Multi-output
      Khôi phục cảm biến mất tín hiệu bằng PyPOTS SAITS
    Y Tế & Thiết Bị Đeo Thông Minh
      Chẩn đoán rối loạn nhịp tim ECG bằng DTW
      Sinh tín hiệu sinh tồn nhân tạo bảo vệ quyền riêng tư
      Học liên hợp Federated Learning trên thiết bị biên
    Công Nghiệp & Giao Thông Thông Minh
      Bảo trì dự đoán động cơ tuốc-bin gió và máy bay
      Phát hiện hỏng cảm biến bằng Influence Functions
      Tăng cường dữ liệu gia tốc kế xe tự hành IMU
```

---

> 🧠 **Kim chỉ nam thực hành:** Mỗi file case study được thiết kế độc lập, có thể đọc riêng rẽ hoặc đối chiếu song song với file lý thuyết tương ứng. Độc giả nên bắt đầu từ [case_study_general_information.md](case_study_general_information.md) để nắm bức tranh toàn cảnh, sau đó đi sâu vào từng kỹ thuật chuyên biệt tùy theo bài toán nghiệp vụ cụ thể.
