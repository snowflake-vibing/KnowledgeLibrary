# Phân Tích Chuỗi Thời Gian & Tăng Trưởng (Time Intelligence in MDX)

> **Tài liệu tham khảo chính thức:** [Microsoft Learn - MDX Time Intelligence: ParallelPeriod, PeriodsToDate, YTD](https://learn.microsoft.com/en-us/analysis-services/multidimensional-models/mdx/mdx-function-reference-mdx?view=sql-analysis-services-2025)  
> **Áp dụng cho:** Các câu hỏi nâng cao (Điểm 9 - 10) Đề thi Kho dữ liệu & OLAP (Khoa Hệ thống Thông tin - UIT), SSAS.

---

## I. TẦM QUAN TRỌNG CỦA TIME INTELLIGENCE TRONG OLAP

Trong mọi hệ thống kho dữ liệu doanh nghiệp, chiều **Thời gian (Time Dimension)** luôn là chiều phân tích quan trọng nhất. Các báo cáo phân tích xu hướng thường yêu cầu:
1. **So sánh cùng kỳ năm trước (Year-over-Year - YoY):** So sánh Tháng 5/2023 với Tháng 5/2022.
2. **So sánh kỳ liền trước (Month-over-Month - MoM / Quarter-over-Quarter - QoQ):** So sánh Tháng 5/2023 với Tháng 4/2023.
3. **Tính toán lũy kế từ đầu năm đến nay (Year-to-Date - YTD):** Tổng doanh thu từ Tháng 1 đến tháng hiện tại.
4. **Số dư đầu kỳ và cuối kỳ (Opening & Closing Period):** Phân tích tồn kho hoặc tài chính.

---

## II. HÀM TÌM KỲ SONG SONG CÙNG KỲ: `PARALLELPERIOD`

### 1. Cú pháp chuẩn
```mdx
ParallelPeriod( [ Level [, Index [, Member ] ] ] )
```

### 2. Ý nghĩa các tham số
- **`Level`:** Cấp độ gốc dùng để nhảy bước (ví dụ: cấp `[Nam]`).
- **`Index`:** Số bước nhảy (mặc định là `1` $\rightarrow$ lùi lại 1 chu kỳ; nếu âm là tiến về phía trước).
- **`Member`:** Phần tử mốc (mặc định là `CurrentMember` của phân cấp thời gian).

### 3. Công thức tính Doanh thu cùng kỳ năm trước (Same Period Last Year - SPLY)
Tìm kỳ song song của tháng hiện tại nhưng thuộc về năm trước:

```mdx
WITH MEMBER [Measures].[DoanhThuCungKyNamTruoc] AS
    (
        [Measures].[DoanhThu],
        PARALLELPERIOD(
            [Dim_ThoiGian].[Nam_Quy_Thang].[Nam],
            1,
            [Dim_ThoiGian].[Nam_Quy_Thang].CurrentMember
        )
    )
```

### 4. Công thức tính % Tăng trưởng so với cùng kỳ năm trước (YoY Growth Rate)
$$\text{Tỷ lệ tăng trưởng YoY} = \frac{\text{Doanh thu năm nay} - \text{Doanh thu năm trước}}{\text{Doanh thu năm trước}}$$

```mdx
WITH 
    MEMBER [Measures].[DoanhThuCungKyNamTruoc] AS
        ( [Measures].[DoanhThu], PARALLELPERIOD([Dim_ThoiGian].[Nam_Quy_Thang].[Nam], 1, [Dim_ThoiGian].[Nam_Quy_Thang].CurrentMember) )
    MEMBER [Measures].[TyLeTangTruongYoY] AS
        IIF(
            IsEmpty([Measures].[DoanhThuCungKyNamTruoc]) OR [Measures].[DoanhThuCungKyNamTruoc] = 0,
            NULL,
            ([Measures].[DoanhThu] - [Measures].[DoanhThuCungKyNamTruoc]) / [Measures].[DoanhThuCungKyNamTruoc]
        ),
        FORMAT_STRING = "Percent"
SELECT 
    {[Measures].[DoanhThu], [Measures].[DoanhThuCungKyNamTruoc], [Measures].[TyLeTangTruongYoY]} ON COLUMNS,
    [Dim_ThoiGian].[Nam_Quy_Thang].[Thang].Members ON ROWS
FROM [Tour_DW]
WHERE ([Dim_ThoiGian].[Nam].[2023])
```

---

## III. CÁC HÀM TÍNH LŨY KẾ: `PERIODSTODATE`, `YTD`, `QTD`, `MTD`

### 1. Hàm tổng quát: `PeriodsToDate`
- **Cú pháp:** `PeriodsToDate( [ Level [, Member ] ] )`
- **Tác dụng:** Trả về tập hợp các thành viên anh chị em cùng cấp bắt đầu từ thành viên đầu tiên của cấp độ `Level` cho đến thành viên `Member` hiện tại.

### 2. Bộ 3 hàm viết tắt tiện lợi
- **`YTD([Member])` (Year-to-Date):** Lũy kế từ đầu năm đến tháng/ngày hiện tại.
  - Tương đương: `PeriodsToDate([Dim_ThoiGian].[Nam], [Dim_ThoiGian].CurrentMember)`.
- **`QTD([Member])` (Quarter-to-Date):** Lũy kế từ đầu quý đến tháng/ngày hiện tại.
- **`MTD([Member])` (Month-to-Date):** Lũy kế từ đầu tháng đến ngày hiện tại.

### 3. Ví dụ tính Doanh thu lũy kế từ đầu năm (YTD Revenue)
```mdx
WITH MEMBER [Measures].[DoanhThuLuyKeYTD] AS
    AGGREGATE(
        YTD([Dim_ThoiGian].[Nam_Quy_Thang].CurrentMember),
        [Measures].[DoanhThu]
    )
SELECT 
    {[Measures].[DoanhThu], [Measures].[DoanhThuLuyKeYTD]} ON COLUMNS,
    [Dim_ThoiGian].[Nam_Quy_Thang].[Thang].Members ON ROWS
FROM [Tour_DW]
WHERE ([Dim_ThoiGian].[Nam].[2023])
```

---

## IV. ĐẦU KỲ VÀ CUỐI KỲ: `OPENINGPERIOD` & `CLOSINGPERIOD`

1. **`OpeningPeriod( [ Level [, Member ] ] )`:**
   - Trả về phần tử con đầu tiên ở cấp độ `Level` bên dưới `Member`.
   - *Ví dụ:* Tìm ngày mở đầu của năm 2023:
     `OpeningPeriod([Dim_ThoiGian].[Ngay], [Dim_ThoiGian].[Nam].[2023])` $\rightarrow$ Ngày 01/01/2023.

2. **`ClosingPeriod( [ Level [, Member ] ] )`:**
   - Trả về phần tử con cuối cùng ở cấp độ `Level` bên dưới `Member`.
   - *Ví dụ:* Tìm ngày kết thúc của năm 2023:
     `ClosingPeriod([Dim_ThoiGian].[Ngay], [Dim_ThoiGian].[Nam].[2023])` $\rightarrow$ Ngày 31/12/2023.
   - Thường dùng trong các chỉ số đo lường số dư cuối kỳ (*Closing Balance / Ending Inventory*).

---

## V. TỔNG KẾT BẢNG CÔNG THỨC TIME INTELLIGENCE TRONG PHÒNG THI

| Nghiệp vụ phân tích | Hàm / Biểu thức MDX tối ưu |
| :--- | :--- |
| **Kỳ liền kề trước đó (MoM, QoQ)** | `[Dim_ThoiGian].CurrentMember.PrevMember` |
| **Cùng kỳ năm trước (YoY / SPLY)** | `PARALLELPERIOD([Dim_ThoiGian].[Nam], 1, [Dim_ThoiGian].CurrentMember)` |
| **Lũy kế từ đầu năm đến nay** | `AGGREGATE(YTD(), [Measures].[DoanhThu])` |
| **Lũy kế từ đầu quý đến nay** | `AGGREGATE(QTD(), [Measures].[DoanhThu])` |
| **Ngày đầu kỳ / mở màn** | `OpeningPeriod([Level], [Member])` |
| **Ngày cuối kỳ / kết sổ** | `ClosingPeriod([Level], [Member])` |
| **Tránh chia cho 0 khi tính %** | `IIF([MauSo] = 0 OR IsEmpty([MauSo]), NULL, ([TuSo] / [MauSo]))` |
