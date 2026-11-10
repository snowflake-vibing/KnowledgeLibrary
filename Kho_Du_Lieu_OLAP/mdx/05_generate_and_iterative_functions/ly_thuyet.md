# Kỹ Thuật Lặp Đa Cấp: Hàm GENERATE & Bài Toán "Top N Theo Từng Nhóm"

> **Tài liệu tham khảo chính thức:** [Microsoft Learn - MDX Generate Function](https://learn.microsoft.com/en-us/analysis-services/multidimensional-models/mdx/generate-mdx?view=sql-analysis-services-2025)  
> **Áp dụng cho:** Câu 3a Đề thi Cuối kỳ Kho dữ liệu & OLAP (Khoa Hệ thống Thông tin - UIT), SSAS.

---

## I. VẤN ĐỀ "TOP N PER GROUP" TRONG THỰC TẾ VÀ ĐỀ THI UIT

### 1. Đề thi cuối kỳ UIT thường hỏi dạng này như thế nào?
> *"Với mỗi quý trong năm 2023, cho biết 02 loại hình du lịch có số tour du lịch nhiều nhất."* (Trích Đề thi HK2 2023-2024 - 1.0 điểm).  
> *"Với mỗi quốc gia, liệt kê 03 khách hàng có tổng doanh thu lớn nhất."*  
> *"Với mỗi loại điểm đến, tìm 01 điểm đến có số lượt khách cao nhất."*

### 2. Sai lầm phổ biến của sinh viên
Nhiều sinh viên viết câu lệnh chỉ dùng `CROSSJOIN` kết hợp `TOPCOUNT`:
```mdx
-- SAI HOÀN TOÀN VỀ LOGIC NGHIỆP VỤ:
CROSSJOIN(
    [Dim_ThoiGian].[Nam].[2023].Children,
    TOPCOUNT([Dim_LoaiHinhDuLich].[TenLoaiHinhDL].Members, 2, [Measures].[SoLuongTour])
)
```
> [!WARNING]
> Cách viết trên sẽ tính `TOPCOUNT` toàn cục trên cả năm 2023 trước, chọn ra đúng 2 loại hình du lịch chung, sau đó mới nhân Cartesian với 4 quý. Kết quả là cả 4 quý đều hiển thị đúng 2 loại hình đó, chứ **không phải là 2 loại hình dẫn đầu của riêng từng quý**!

Để giải quyết bài toán lặp **"Với mỗi X, tìm top N của Y"**, ngôn ngữ MDX bắt buộc phải dùng hàm **`GENERATE`**.

---

## II. CÚ PHÁP VÀ NGUYÊN LÝ HOẠT ĐỘNG CỦA HÀM `GENERATE`

### 1. Cú pháp chuẩn
```mdx
Generate( Set1, Set2_Expression [, ALL ] )
```

### 2. Cơ chế thực thi (Tương tự vòng lặp `FOR EACH`)

```
Tập hợp Set1 (Ví dụ: 4 Quý trong năm 2023)
  │
  ├── Duyệt Quý 1: Gán CurrentMember = Q1 ──> Tính TOPCOUNT cho riêng Q1 ──> Kết quả Q1
  ├── Duyệt Quý 2: Gán CurrentMember = Q2 ──> Tính TOPCOUNT cho riêng Q2 ──> Kết quả Q2
  ├── Duyệt Quý 3: Gán CurrentMember = Q3 ──> Tính TOPCOUNT cho riêng Q3 ──> Kết quả Q3
  └── Duyệt Quý 4: Gán CurrentMember = Q4 ──> Tính TOPCOUNT cho riêng Q4 ──> Kết quả Q4
        │
        └──> Ghép nối (Union) tất cả kết quả thành một Set duy nhất trả về cho trục!
```

- **`Set1` (Tập hợp nhóm):** Tập hợp các phần tử cha cần duyệt qua từng phần tử (ví dụ: các Quý của năm 2023).
- **`Set2_Expression`:** Biểu thức tập hợp được đánh giá lại độc lập ứng với từng phần tử hiện tại (`CurrentMember`) của `Set1`.
- **Cờ `ALL` *(Tùy chọn)*:** Nếu có từ khóa `ALL`, hàm giữ lại các tuple trùng lặp; nếu không có `ALL`, các tuple trùng nhau sẽ bị loại bỏ khỏi tập kết quả cuối cùng.

---

## III. MẪU THIẾT KẾ CHUẨN (DESIGN PATTERN) ĐỂ LẤY TRỌN ĐIỂM THI UIT

Mẫu thiết kế kinh điển bắt buộc phải học thuộc lòng:

```mdx
GENERATE(
    [Tập_Hợp_Nhóm],
    CROSSJOIN(
        { [Phân_Cấp_Nhóm].CurrentMember },
        TOPCOUNT(
            [Tập_Hợp_Đối_Tượng_Cần_Xếp_Hạng],
            N,
            [Độ_Đo]
        )
    )
)
```

### Giải phẫu chi tiết lời giải Câu 3a Đề thi Cuối kỳ:

```mdx
SELECT 
    {[Measures].[SoLuongTour]} ON COLUMNS,
    GENERATE(
        -- 1. Tập hợp nhóm duyệt qua: 4 Quý của năm 2023
        [Dim_ThoiGian].[Nam].[2023].Children,
        
        -- 2. Ứng với mỗi quý, kết hợp quý đó với Top 2 loại hình tour
        CROSSJOIN(
            {[Dim_ThoiGian].[Nam].CurrentMember},
            TOPCOUNT(
                [Dim_LoaiHinhDuLich].[TenLoaiHinhDL].Members,
                2,
                [Measures].[SoLuongTour]
            )
        )
    ) ON ROWS
FROM [Tour_DW]
```

### Vì sao phải có `CROSSJOIN({CurrentMember}, TOPCOUNT(...))`?
- Vì trên trục `ROWS`, ta cần hiển thị cả 2 cột: Cột 1 là Quý (`CurrentMember`), Cột 2 là Loại hình du lịch (`TopCount`).
- Dấu ngoặc nhọn `{ ... }` bao bọc quanh `CurrentMember` là bắt buộc, vì `CurrentMember` trả về một **Member**, trong khi hàm `CROSSJOIN` bắt buộc 2 tham số đầu vào phải là **Set**!

---

## IV. CÁC BIẾN THỂ PHỔ BIẾN TRONG ĐỀ THI UIT

### Biến thể 1: Với mỗi quốc gia, tìm top 3 khách hàng chi tiêu nhiều nhất
```mdx
SELECT 
    {[Measures].[DoanhThu]} ON COLUMNS,
    GENERATE(
        [Dim_KhachDuLich].[QuocGiaKDL].Members,
        CROSSJOIN(
            {[Dim_KhachDuLich].[QuocGiaKDL].CurrentMember},
            TOPCOUNT(
                [Dim_KhachDuLich].[HoTenKDL].Members,
                3,
                [Measures].[DoanhThu]
            )
        )
    ) ON ROWS
FROM [Tour_DW]
```

### Biến thể 2: Với mỗi loại điểm đến, tìm 1 điểm đến có số lượt khách đông nhất
```mdx
SELECT 
    {[Measures].[SoLuotKhach]} ON COLUMNS,
    GENERATE(
        [Dim_DiemDen].[LoaiDiemDen].Members,
        CROSSJOIN(
            {[Dim_DiemDen].[LoaiDiemDen].CurrentMember},
            TOPCOUNT(
                [Dim_DiemDen].[TenDiemDen].Members,
                1,
                [Measures].[SoLuotKhach]
            )
        )
    ) ON ROWS
FROM [Tour_DW]
```

---

## V. CÁC LỖI CÚ PHÁP THƯỜNG GẶP KHI VIẾT HÀM `GENERATE`

1. **Quên dấu ngoặc nhọn `{}` quanh `CurrentMember`:**
   - *Viết sai:* `CROSSJOIN([Dim_ThoiGian].[Nam].CurrentMember, TOPCOUNT(...))`
   - *Lỗi:* `CurrentMember` là Member, không phải Set.
   - *Viết đúng:* `CROSSJOIN({ [Dim_ThoiGian].[Nam].CurrentMember }, TOPCOUNT(...))`
2. **Sai thứ tự tham số:** Tham số 1 luôn là Tập hợp nhóm duyệt (`Set1`), tham số 2 là biểu thức tính toán (`Set2`).
3. **Quên gọi `.Children` hoặc `.Members` cho `Set1`:**
   - *Viết sai:* `GENERATE([Dim_ThoiGian].[Nam].[2023], ...)` (Đây chỉ là 1 Member, không phải Set).
   - *Viết đúng:* `GENERATE([Dim_ThoiGian].[Nam].[2023].Children, ...)`
