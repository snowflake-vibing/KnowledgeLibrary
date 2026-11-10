# Thành Viên Tính Toán (Calculated Members), Named Sets & Hàm AGGREGATE

> **Tài liệu tham khảo chính thức:** [Microsoft Learn - MDX Calculated Members & Aggregate Function](https://learn.microsoft.com/en-us/analysis-services/multidimensional-models/mdx/mdx-calculated-members-building-calculated-members?view=sql-analysis-services-2025)  
> **Áp dụng cho:** Câu 3b Đề thi Cuối kỳ Kho dữ liệu & OLAP (Khoa Hệ thống Thông tin - UIT), SSAS.

---

## I. MỆNH ĐỀ `WITH` TRONG TRUY VẤN MDX

Trong thực tế thi cử và phân tích, các khối Cube không thể định nghĩa sẵn mọi chỉ số hoặc nhóm dữ liệu mà người dùng muốn. Mệnh đề `WITH` cho phép bạn tạo ra các đối tượng tính toán tạm thời trong phạm vi câu truy vấn:

1. **`WITH MEMBER`**: Tạo thành viên tính toán mới (Measure tính toán hoặc Dimension Member gộp).
2. **`WITH SET`**: Tạo một tập hợp đặt tên (Named Set) tái sử dụng nhiều lần trên các trục.

---

## II. ĐỊNH NGHĨA THÀNH VIÊN TÍNH TOÁN: `WITH MEMBER`

### 1. Cú pháp chuẩn
```mdx
WITH 
    MEMBER Dimension_Name.Member_Name AS 'Expression' 
    [, Property_Name = Property_Value ... ]
SELECT ...
```

### 2. Dạng 1: Tạo Measure tính toán (Calculated Measure)
Tạo độ đo mới từ các độ đo có sẵn (ví dụ: Giá vé trung bình, Lợi nhuận, Tỷ suất lợi nhuận):

```mdx
WITH 
    MEMBER [Measures].[GiaTourTrungBinh] AS
        [Measures].[DoanhThu] / [Measures].[SoLuotKhach],
        FORMAT_STRING = "#,##0 VNĐ"
SELECT 
    {[Measures].[DoanhThu], [Measures].[SoLuotKhach], [Measures].[GiaTourTrungBinh]} ON COLUMNS,
    [Dim_LoaiHinhDuLich].[TenLoaiHinhDL].Members ON ROWS
FROM [Tour_DW]
```

### 3. Dạng 2: Tạo Dimension Member gộp nhiều năm / nhiều phần tử (Dạng bài Câu 3b Đề thi UIT)
Khi bài thi yêu cầu: *"Liệt kê top 03 hướng dẫn viên hướng dẫn nhiều tour du lịch nhất trong **cả hai năm 2022 và 2023**"*:
- Ta cần tạo một thành viên thời gian đại diện cho tổng hợp của cả 2 năm: `[GiaiDoan2022_2023]`.
- Cú pháp tạo:

```mdx
WITH MEMBER [Dim_ThoiGian].[Nam].[GiaiDoan2022_2023] AS
    AGGREGATE({[Dim_ThoiGian].[Nam].[2022], [Dim_ThoiGian].[Nam].[2023]})
```

---

## III. HÀM TỔNG HỢP ĐA NĂNG: `AGGREGATE` VS `SUM`

> [!IMPORTANT]
> **Điểm mấu chốt lấy trọn điểm Câu 3b:** Phân biệt khi nào dùng `AGGREGATE` và khi nào dùng `SUM`!

| Tiêu chí | Hàm `SUM(...)` | Hàm `AGGREGATE(...)` (Khuyên dùng trong thi) |
| :--- | :--- | :--- |
| **Cơ chế tính toán** | Luôn luôn thực hiện **phép cộng số học thông thường** ($\sum$) trên dữ liệu. | Tự động áp dụng **đúng quy tắc tổng hợp được định nghĩa sẵn trong Cube** cho từng Measure cụ thể. |
| **Với Additive Measure (`DoanhThu`)** | Hoạt động bình thường (tính tổng doanh thu). | Hoạt động bình thường (tính tổng doanh thu). |
| **Với Non-Additive / Distinct Count (`SoLuongTour`)** | **BỊ SAI NGHIỆP VỤ!** Nó sẽ cộng dồn số tour của năm 2022 và 2023, dẫn đến những tour chạy vắt qua 2 năm hoặc các tour bị đếm trùng! | **HOÀN TOÀN CHÍNH XÁC!** Hệ thống tự động gọi phép `DistinctCount` trên toàn bộ tập dữ liệu gộp của cả 2 năm! |

---

## IV. GIẢI PHÁP CHI TIẾT CÂU 3b ĐỀ THI UIT (2 CÁCH VIẾT)

### Cách 1: Sử dụng `WITH MEMBER` kết hợp `AGGREGATE` (Chuẩn mực nhất)
```mdx
WITH MEMBER [Dim_ThoiGian].[Nam].[GiaiDoan2022_2023] AS
    AGGREGATE({[Dim_ThoiGian].[Nam].[2022], [Dim_ThoiGian].[Nam].[2023]})
SELECT 
    {[Measures].[SoLuongTour]} ON COLUMNS,
    TOPCOUNT(
        [Dim_HuongDanVien].[HoTenHDV].Members,
        3,
        ([Measures].[SoLuongTour], [Dim_ThoiGian].[Nam].[GiaiDoan2022_2023])
    ) ON ROWS
FROM [Tour_DW]
WHERE ([Dim_ThoiGian].[Nam].[GiaiDoan2022_2023])
```

- **Giải thích:**
  - `WITH MEMBER ... AS AGGREGATE(...)`: Gộp không gian của năm 2022 và 2023 thành một thành viên thời gian duy nhất.
  - `TOPCOUNT(..., 3, ([Measures].[SoLuongTour], [Dim_ThoiGian].[Nam].[GiaiDoan2022_2023]))`: Tuple tiêu chí đánh giá lấy đúng số lượng tour trong giai đoạn gộp này để sắp xếp giảm dần và lấy 3 người đứng đầu.
  - `WHERE ([Dim_ThoiGian].[Nam].[GiaiDoan2022_2023])`: Cắt lát toàn bộ kết quả bảng theo giai đoạn này.

### Cách 2: Sử dụng Tuple trong `TOPCOUNT` và Set trong `WHERE`
```mdx
SELECT 
    {[Measures].[SoLuongTour]} ON COLUMNS,
    TOPCOUNT(
        [Dim_HuongDanVien].[HoTenHDV].Members,
        3,
        ([Measures].[SoLuongTour])
    ) ON ROWS
FROM [Tour_DW]
WHERE ({[Dim_ThoiGian].[Nam].[2022], [Dim_ThoiGian].[Nam].[2023]})
```

---

## V. ĐỊNH NGHĨA TẬP HỢP ĐẶT TÊN: `WITH SET`

### 1. Cú pháp chuẩn
```mdx
WITH 
    SET Set_Name AS 'Set_Expression'
SELECT ...
```

### 2. Ví dụ ứng dụng
Định nghĩa tập hợp Top 5 Điểm đến doanh thu cao nhất và tái sử dụng trên nhiều trục:

```mdx
WITH 
    SET [Top5DiemDen] AS
        TOPCOUNT([Dim_DiemDen].[TenDiemDen].Members, 5, [Measures].[DoanhThu])
SELECT 
    {[Measures].[DoanhThu], [Measures].[SoLuotKhach]} ON COLUMNS,
    [Top5DiemDen] ON ROWS
FROM [Tour_DW]
```

---

## VI. CÁC HÀM TỔNG HỢP ĐO LƯỜNG PHỔ BIẾN KHÁC

1. **`Count(Set_Expression [, EXCLUDEEMPTY | INCLUDEEMPTY])`:**
   - Đếm số lượng phần tử trong một tập hợp.
   - Ví dụ: Đếm số lượng loại hình du lịch có phát sinh tour: `Count(NonEmpty([Dim_LoaiHinhDuLich].[TenLoaiHinhDL].Members, [Measures].[SoLuongTour]))`.
2. **`Avg(Set_Expression [, Numeric_Expression])`:**
   - Tính giá trị trung bình của một độ đo trên tập hợp.
3. **`Min(Set_Expression [, Numeric_Expression])` & `Max(...)`:**
   - Lấy giá trị nhỏ nhất hoặc lớn nhất.
4. **`DistinctCount`:**
   - Thường được cài đặt trực tiếp trong Cube để đếm các khóa duy nhất (như `MaTour`).
