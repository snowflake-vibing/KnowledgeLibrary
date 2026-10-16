# Chương 4: Hồi quy Logistic

> Tài liệu tóm tắt từ bài giảng **Phân tích dữ liệu kinh doanh – IS403**
> ThS. Dương Phi Long – Khoa Hệ thống Thông tin, Trường ĐH Công nghệ Thông tin (UIT)

## Nội dung chuyên đề

| # | Chuyên đề | Nội dung chính |
|---|-----------|----------------|
| 1 | [Hồi quy Logistic nhị phân](01_hoi_quy_logistic_nhi_phan.md) | Linear vs Logistic, hàm Sigmoid, hàm Logit, hàm Likelihood |
| 2 | [Ước lượng hợp lý tối đa (MLE)](02_uoc_luong_hop_ly_toi_da.md) | Log-likelihood, Newton-Raphson, Gradient Descent, ví dụ tính tay |
| 3 | [Hồi quy Logistic đa lớp](03_hoi_quy_logistic_da_lop.md) | One-vs-All (OvA/OvR), Softmax Regression |
| 4 | [Đánh giá mô hình dự đoán](04_danh_gia_mo_hinh.md) | Confusion matrix, Accuracy, Precision, Recall, F1, Macro/Weighted, Holdout, k-fold CV, Bootstrap |

## Lộ trình học gợi ý

```mermaid
flowchart LR
    A[Hồi quy tuyến tính] --> B[Hàm Sigmoid & Logit]
    B --> C[Hàm Likelihood]
    C --> D[MLE: Newton-Raphson / Gradient Descent]
    D --> E[Đa lớp: OvA & Softmax]
    E --> F[Đánh giá mô hình]
```

## Tổng kết chương

1. **Hồi quy Logistic nhị phân**: Hồi quy Logistic, hàm logit, hàm Likelihood, Maximum Likelihood Estimation.
2. **Hồi quy Logistic đa lớp**: Hồi quy logistic đa lớp, phương pháp One-vs-All, Softmax Regression.
3. **Đánh giá mô hình dự đoán**: Đánh giá mô hình, Classifier Evaluation Metrics, phương pháp ước tính độ chính xác.
