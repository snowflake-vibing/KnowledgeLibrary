# Lọc & Sắp Xếp Nâng Cao Trong MDX (Filtering & Sorting)

> **Tài liệu tham khảo chính thức:** [Microsoft Learn - MDX Set Functions: Filter, TopCount, Order](https://learn.microsoft.com/en-us/analysis-services/multidimensional-models/mdx/mdx-function-reference-mdx?view=sql-analysis-services-2025)  
> **Áp dụng cho:** Đề thi Cuối kỳ Kho dữ liệu & OLAP (Khoa Hệ thống Thông tin - UIT), SSAS.

---

## I. TỔNG QUAN VỀ LỌC VÀ SẮP XẾP TRONG MDX

Trong các bài toán phân tích kinh doanh thực tế và các đề thi cuối kỳ, yêu cầu thường xoay quanh việc:
- Lọc các đối tượng thỏa mãn ngưỡng kinh doanh (ví dụ: Doanh thu > 30 triệu).
- Tìm kiếm các đối tượng dẫn đầu hoặc yếu kém nhất (Top 3 hướng dẫn viên, Top 5 sản phẩm bán chạy).
- Sắp xếp thứ bậc theo độ đo (tăng dần/giảm dần, giữ nguyên hay phá vỡ cây phân cấp).

Các hàm tập hợp (**Set Functions**) đóng vai trò quyết định để xử lý các nghiệp vụ này.

---

## II. HÀM LỌC ĐIỀU KIỆN: `FILTER`

### 1. Cú pháp chuẩn
```mdx
Filter( Set_Expression, Logical_Expression )
```

### 2. Cơ chế thực thi
- Hàm `FILTER` duyệt qua từng phần tử (Tuple) trong `Set_Expression`.
- Đánh giá `Logical_Expression` trong ngữ cảnh của Tuple đó.
- Chỉ giữ lại các Tuple có biểu thức điều kiện trả về `TRUE`.

### 3. Ví dụ điển hình trong đề thi UIT
Liệt kê các điểm đến có tổng doanh thu từ tour đạt trên 30,000,000 VNĐ:
```mdx
SELECT 
    {[Measures].[DoanhThu], [Measures].[SoLuotKhach]} ON COLUMNS,
    FILTER(
        [Dim_DiemDen].[TenDiemDen].Members,
        [Measures].[DoanhThu] > 30000000
    ) ON ROWS
FROM [Tour_DW]
```

### 4. Kết hợp nhiều điều kiện logic
Có thể sử dụng các toán tử logic `AND`, `OR`, `NOT` và hàm kiểm tra rỗng `NOT IsEmpty(...)`:
```mdx
FILTER(
    [Dim_HuongDanVien].[HoTenHDV].Members,
    [Measures].[SoLuongTour] >= 5 AND [Measures].[DoanhThu] > 50000000
)
```

---

## III. BỘ ĐÔI HÀM TOP / BOTTOM: `TOPCOUNT` & `BOTTOMCOUNT`

### 1. Hàm `TOPCOUNT` (Lấy top N giá trị lớn nhất)
- **Cú pháp:**
```mdx
TopCount( Set_Expression, Count [, Numeric_Expression ] )
```
- **Cơ chế:**
  - Sắp xếp tập hợp `Set_Expression` theo thứ tự **giảm dần** dựa trên giá trị của `Numeric_Expression` (thường là một Measure).
  - Trích xuất ra `Count` phần tử đứng đầu.
  - **Tự động phá vỡ phân cấp (Break Hierarchy)** để xếp hạng tuyệt đối.
- **Ví dụ đề thi:** Top 3 hướng dẫn viên nhiều tour nhất:
```mdx
SELECT 
    {[Measures].[SoLuongTour]} ON COLUMNS,
    TOPCOUNT(
        [Dim_HuongDanVien].[HoTenHDV].Members,
        3,
        [Measures].[SoLuongTour]
    ) ON ROWS
FROM [Tour_DW]
```

### 2. Hàm `BOTTOMCOUNT` (Lấy bottom N giá trị nhỏ nhất)
- **Cú pháp:**
```mdx
BottomCount( Set_Expression, Count [, Numeric_Expression ] )
```
- **Cơ chế:** Sắp xếp tập hợp theo thứ tự **tăng dần** và lấy `Count` phần tử có giá trị nhỏ nhất.

---

## IV. CÁC HÀM XẾP HẠNG THEO TỶ LỆ & TÍCH LŨY

Bên cạnh đếm số lượng tuyệt đối `TopCount`, MDX cung cấp các hàm xếp hạng theo phần trăm và ngưỡng tích lũy:

| Hàm MDX | Ý nghĩa nghiệp vụ | Ví dụ áp dụng |
| :--- | :--- | :--- |
| **`TOPPERCENT(Set, Percent, Measure)`** | Lấy các phần tử đứng đầu có tổng giá trị đóng góp đạt tối thiểu `Percent`% tổng thể. | Tìm nhóm khách hàng VIP đóng góp 80% doanh thu (Nguyên lý Pareto 80/20). |
| **`BOTTOMPERCENT(Set, Percent, Measure)`** | Lấy các phần tử dưới đáy đóng góp đến ngưỡng `Percent`%. | Tìm nhóm sản phẩm tiêu thụ chậm nhất chiếm 10% doanh thu. |
| **`TOPSUM(Set, Value, Measure)`** | Lấy các phần tử đứng đầu cho đến khi tổng tích lũy đạt ngưỡng giá trị `Value`. | Lấy các tour dẫn đầu cho đến khi đạt mốc doanh số 500 triệu. |
| **`BOTTOMSUM(Set, Value, Measure)`** | Lấy các phần tử từ đáy cho đến khi tổng tích lũy đạt mốc `Value`. | Phân tích nhóm hàng tồn kho giá trị thấp. |

---

## V. HÀM SẮP XẾP: `ORDER` & PHÂN BIỆT `DESC` VS `BDESC`

### 1. Cú pháp hàm `ORDER`
```mdx
Order( Set_Expression, Numeric_Or_String_Expression [, ASC | DESC | BASC | BDESC ] )
```

### 2. Điểm khác biệt cốt tử: Cờ thường (`ASC`/`DESC`) vs Cờ phá vỡ (`BASC`/`BDESC`)

> [!IMPORTANT]
> Đây là câu hỏi phân loại cực kỳ phổ biến trong các đề thi và phỏng vấn về MDX!

- **`ASC` / `DESC` (Hierarchical Sort - Giữ nguyên phân cấp):**
  - Sắp xếp các phần tử con **bên trong từng nút cha riêng biệt**.
  - Không làm xáo trộn cấu trúc cây phân cấp (ví dụ: các quý thuộc năm 2022 vẫn đứng cạnh nhau, các quý của năm 2023 đứng cạnh nhau).
- **`BASC` / `BDESC` (Break Hierarchy - Phá vỡ phân cấp):**
  - Chữ **`B`** viết tắt của **Break Hierarchy**.
  - Toàn bộ các phần tử trong tập hợp bị san phẳng và xếp hạng toàn cục dựa trên độ đo, bất kể chúng thuộc cha nào.

```mdx
-- Sắp xếp tất cả khách hàng giảm dần theo doanh thu (phá vỡ phân cấp quốc gia):
SELECT 
    {[Measures].[DoanhThu]} ON COLUMNS,
    ORDER(
        [Dim_KhachDuLich].[HoTenKDL].Members,
        [Measures].[DoanhThu],
        BDESC
    ) ON ROWS
FROM [Tour_DW]
```

---

## VI. HÀM CẮT ĐẦU & CẮT ĐUÔI: `HEAD` VÀ `TAIL`

1. **`Head(Set_Expression [, Count])`:**
   - Trả về `Count` phần tử đầu tiên của tập hợp (mặc định lấy 1 phần tử nếu không truyền `Count`).
   - Khác với `TopCount`: `Head` **không tự sắp xếp**, nó chỉ cắt đúng các phần tử đứng đầu của tập hợp đã có sẵn.

2. **`Tail(Set_Expression [, Count])`:**
   - Trả về `Count` phần tử cuối cùng của tập hợp.
   - Thường dùng để lấy kỳ gần đây nhất trong chuỗi thời gian (ví dụ: `TAIL([Dim_ThoiGian].[Thang].Members, 1)` để lấy tháng mới nhất).

---

## VII. TỔNG KẾT BẢNG TRA CỨU CÔNG THỨC NHANH CHO PHÒNG THI

| Yêu cầu bài toán | Hàm MDX tối ưu | Cú pháp mẫu |
| :--- | :---: | :--- |
| Lọc theo điều kiện ngưỡng | `FILTER` | `FILTER(Set, [Measures].[DoanhThu] > 30000000)` |
| Lấy Top N lớn nhất | `TOPCOUNT` | `TOPCOUNT(Set, 3, [Measures].[SoLuongTour])` |
| Lấy Bottom N nhỏ nhất | `BOTTOMCOUNT` | `BOTTOMCOUNT(Set, 5, [Measures].[DoanhThu])` |
| Sắp xếp giảm dần toàn cục | `ORDER(..., BDESC)` | `ORDER(Set, [Measures].[DoanhThu], BDESC)` |
| Sắp xếp tăng dần theo cha con | `ORDER(..., ASC)` | `ORDER(Set, [Measures].[DoanhThu], ASC)` |
| Lấy phần tử mới nhất / cuối cùng | `TAIL` | `TAIL(Set, 1)` |
