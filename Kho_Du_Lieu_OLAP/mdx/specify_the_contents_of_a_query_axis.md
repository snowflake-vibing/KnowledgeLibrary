# Specify the Contents of a Query Axis (MDX)

> **Tài liệu tham khảo chính thức:** [Microsoft Learn - Specify the Contents of a Query Axis (MDX)](https://learn.microsoft.com/en-us/analysis-services/multidimensional-models/mdx/mdx-query-and-slicer-axes-specify-the-contents-of-a-query-axis?view=sql-analysis-services-2025)  
> **Áp dụng cho:** SQL Server Analysis Services (SSAS), Azure Analysis Services (AAS), Microsoft Fabric / Power BI Premium.

---

## I. TỔNG QUAN VỀ QUERY AXES (TRỤC TRUY VẤN)

Trong Multidimensional Expressions (MDX), **Query Axes (các trục truy vấn)** xác định các cạnh (*edges*) của tập ô kết quả (**Cellset**) được trả về từ câu lệnh `SELECT`.

Các trục truy vấn cho phép bạn:
- Định hình cấu trúc hiển thị của dữ liệu (dòng, cột, trang,...).
- Chỉ định tập hợp các thành viên (Members), bộ tọa độ (Tuples) hoặc tập hợp (Sets) hiển thị trên từng trục.
- Lọc bỏ các phần tử rỗng (`NON EMPTY`).
- Lọc có điều kiện trực tiếp trên trục bằng mệnh đề `HAVING`.
- Truy xuất thêm các thuộc tính mở rộng của thành viên thông qua `DIMENSION PROPERTIES`.

---

## II. CÚ PHÁP ĐẶC TẢ TRỤC TRUY VẤN

Cú pháp chuẩn của mệnh đề đặc tả trục truy vấn (`<SELECT query axis clause>`):

```mdx
<SELECT query axis clause> ::= 
   [ NON EMPTY ] Set_Expression [ <SELECT dimension property list clause> ] [ <HAVING clause> ] 
   ON { Integer_Expression | AXIS( Integer_Expression ) | { COLUMNS | ROWS | PAGES | SECTIONS | CHAPTERS } }
```

---

## III. CHI TIẾT CÁC THÀNH PHẦN TRONG CÚ PHÁP

### 1. `Set_Expression` (Biểu thức tập hợp)
- Là thành phần bắt buộc xác định các phần tử sẽ xuất hiện trên trục đó.
- Phải trả về một **Set** hợp lệ (được bao bởi dấu ngoặc nhọn `{ ... }` hoặc kết quả của các hàm trả về Set như `Members`, `Children`, `Descendants`, `Filter`, `TopCount`, `Crossjoin`...).
- *Ví dụ:*
  - `{ [Measures].[Internet Sales Amount], [Measures].[Order Quantity] }`
  - `[Product].[Category].Members`
  - `TOPCOUNT([Customer].[Country].Members, 5, [Measures].[Internet Sales Amount])`

### 2. Từ khóa `NON EMPTY`
- Đặt ở đầu mệnh đề định nghĩa trục.
- **Tác dụng:** Tự động loại bỏ tất cả các Tuple (dòng hoặc cột) mà toàn bộ giá trị giao điểm của nó với các trục khác đều là giá trị rỗng (`NULL` / Empty Cell).
- Giúp kết quả trả về gọn gàng, loại bỏ các dòng/cột "rác" không phát sinh số liệu, đồng thời tăng tốc độ hiển thị cho ứng dụng phía client.

### 3. Tên định danh và chỉ số trục (`ON ...`)
MDX hỗ trợ lên tới **128 trục truy vấn** (từ trục 0 đến trục 127). Bạn có thể chỉ định trục theo 3 cách:

| Trục logic | Chỉ số nguyên (`Integer_Expression`) | Cú pháp hàm `AXIS(n)` | Tên định danh chuẩn (Axis Aliases) | Ý nghĩa hiển thị thường gặp |
| :---: | :---: | :---: | :---: | :--- |
| **Trục 0** | `0` | `AXIS(0)` | **`COLUMNS`** | Trục hoành / Cột (X-axis) |
| **Trục 1** | `1` | `AXIS(1)` | **`ROWS`** | Trục tung / Dòng (Y-axis) |
| **Trục 2** | `2` | `AXIS(2)` | **`PAGES`** | Trang dữ liệu (Z-axis) |
| **Trục 3** | `3` | `AXIS(3)` | **`SECTIONS`** | Phân đoạn dữ liệu |
| **Trục 4** | `4` | `AXIS(4)` | **`CHAPTERS`** | Chương dữ liệu |
| **Trục 5 - 127**| `5` đến `127` | `AXIS(5)` - `AXIS(127)` | *(Không có alias)* | Các chiều đa chiều mở rộng |

> [!NOTE]
> Mặc dù MDX cho phép tối đa 128 trục, trong thực tế hầu hết các báo cáo BI (Power BI, Excel PivotTable, SSRS) chỉ sử dụng **0, 1 hoặc 2 trục** (`COLUMNS` và `ROWS`).

### 4. Mệnh đề `HAVING`
- Cho phép lọc tập hợp trên trục dựa trên một điều kiện logic đánh giá theo độ đo hoặc biểu thức logic.
- Khác với hàm `FILTER(...)` được bọc bên trong `Set_Expression`, mệnh đề `HAVING` được đặt ngay sau `Set_Expression` trước từ khóa `ON`.
- *Ví dụ:* `[Date].[Calendar Year].Members HAVING [Measures].[Internet Sales Amount] > 1000000 ON ROWS`

### 5. Mệnh đề `DIMENSION PROPERTIES`
- Cho phép yêu cầu Analysis Services trả về các thuộc tính mở rộng của các thành viên trên trục (Member Properties), phục vụ hiển thị chi tiết (ví dụ: mã format số, màu sắc, khóa đại diện).
- *Ví dụ:* `DIMENSION PROPERTIES MEMBER_UNIQUE_NAME, MEMBER_CAPTION, FORMATTED_VALUE`

---

## IV. CÁC QUY TẮC BẮT BUỘC KHI SỬ DỤNG QUERY AXES

### 1. Quy tắc không được nhảy cóc trục (No Skipped Axes)
> [!WARNING]
> Một truy vấn MDX **không bao giờ được phép nhảy cóc qua một trục nào**.
- Các trục phải được khai báo tuần tự bắt đầu từ trục `0` (`COLUMNS`).
- Bạn **không thể** khai báo `ROWS` (Trục 1) nếu chưa có `COLUMNS` (Trục 0).
- Bạn **không thể** khai báo `PAGES` (Trục 2) nếu chưa có cả `COLUMNS` (Trục 0) và `ROWS` (Trục 1).

**Ví dụ sai cú pháp (Bị lỗi):**
```mdx
-- SAI: Không thể có ROWS mà không có COLUMNS
SELECT 
    [Product].[Category].Members ON ROWS
FROM [Adventure Works]
```

**Ví dụ sửa đúng:**
```mdx
-- ĐÚNG: Đưa sang trục COLUMNS
SELECT 
    [Product].[Category].Members ON COLUMNS
FROM [Adventure Works]
```

---

### 2. Truy vấn không có trục nào (Empty SELECT Clause)
MDX cho phép bạn viết câu lệnh `SELECT` **hoàn toàn không chứa bất kỳ Query Axis nào**:

```mdx
SELECT 
FROM [Adventure Works]
WHERE ([Measures].[Internet Sales Amount], [Date].[Calendar Year].[CY 2023])
```
- Khi một câu lệnh `SELECT` không có trục nào, tất cả các chiều trong khối Cube sẽ đóng vai trò là chiều cắt lát (**Slicer Dimensions**).
- Kết quả trả về sẽ là một tập ô gồm **đúng 1 ô dữ liệu duy nhất (Single Cell)** đại diện cho giao điểm của các giá trị mặc định hoặc các thành viên trong mệnh đề `WHERE`.

---

## V. CÁC VÍ DỤ THỰC HÀNH CỤ THỂ

*(Tất cả ví dụ đều chạy trên cơ sở dữ liệu mẫu Adventure Works)*

### Ví dụ 1: Sử dụng Alias `COLUMNS` và `ROWS`
Truy vấn kinh điển lấy Doanh thu hiển thị trên các cột và Danh mục sản phẩm trên các dòng:

```mdx
SELECT 
    { [Measures].[Internet Sales Amount] } ON COLUMNS,
    { [Product].[Category].Members } ON ROWS
FROM [Adventure Works]
```

---

### Ví dụ 2: Sử dụng chỉ số nguyên hoặc hàm `AXIS(n)`
Kết quả hoàn toàn tương đương với Ví dụ 1 nhưng sử dụng cú pháp chỉ số trục:

```mdx
-- Cách dùng chỉ số số nguyên:
SELECT 
    { [Measures].[Internet Sales Amount] } ON 0,
    { [Product].[Category].Members } ON 1
FROM [Adventure Works]
```

```mdx
-- Hoặc cách dùng hàm AXIS(n):
SELECT 
    { [Measures].[Internet Sales Amount] } ON AXIS(0),
    { [Product].[Category].Members } ON AXIS(1)
FROM [Adventure Works]
```

---

### Ví dụ 3: Sử dụng từ khóa `NON EMPTY` để loại bỏ dữ liệu trống
Khi phân tích theo các cấp độ chi tiết như Tên khách hàng hoặc Mã bưu điện, rất nhiều phần tử không phát sinh giao dịch. Thêm `NON EMPTY` sẽ loại bỏ các dòng này:

```mdx
SELECT 
    { [Measures].[Internet Sales Amount] } ON COLUMNS,
    NON EMPTY [Customer].[Customer Geography].[Postal Code].Members ON ROWS
FROM [Adventure Works]
```

---

### Ví dụ 4: Lọc dữ liệu trên trục bằng mệnh đề `HAVING`
Lấy danh sách các năm có doanh thu bán hàng Internet lớn hơn \$5,000,000:

```mdx
SELECT 
    { [Measures].[Internet Sales Amount] } ON COLUMNS,
    [Date].[Calendar].[Calendar Year].Members 
        HAVING [Measures].[Internet Sales Amount] > 5000000 ON ROWS
FROM [Adventure Works]
```

---

### Ví dụ 5: Kết hợp `CROSSJOIN` trên cùng một trục
Trên cùng một trục (ví dụ trục `ROWS`), bạn có thể phối hợp nhiều chiều khác nhau tạo thành các Tuple đa chiều:

```mdx
SELECT 
    { [Measures].[Internet Sales Amount], [Measures].[Internet Order Quantity] } ON COLUMNS,
    NON EMPTY CROSSJOIN(
        [Product].[Category].Members,
        [Customer].[Customer Geography].[Country].Members
    ) ON ROWS
FROM [Adventure Works]
```

---

### Ví dụ 6: Chỉ định thuộc tính thành viên `DIMENSION PROPERTIES`
Lấy tên thành viên kèm theo tên duy nhất (`MEMBER_UNIQUE_NAME`) và cấp độ cha con:

```mdx
SELECT 
    { [Measures].[Internet Sales Amount] } ON COLUMNS,
    [Product].[Category].Members 
        DIMENSION PROPERTIES MEMBER_UNIQUE_NAME, LEVEL_NUMBER ON ROWS
FROM [Adventure Works]
```

---

## VI. TÓM TẮT CẦN NHỚ

1. **Query Axes** quyết định hình dạng và dữ liệu hiển thị của tập kết quả trả về (`Cellset`).
2. Có thể dùng **Alias** (`COLUMNS`, `ROWS`, `PAGES`,...) hoặc **Chỉ số** (`0`, `1`, `2`,... / `AXIS(0)`, `AXIS(1)`,...).
3. **Tuyệt đối không được bỏ qua trục** (phải liên tục từ trục `0` trở đi).
4. `NON EMPTY` là từ khóa quan trọng giúp tối ưu hiển thị bằng cách gạt bỏ các dòng/cột toàn giá trị `NULL`.
5. Mệnh đề `HAVING` và `DIMENSION PROPERTIES` là các công cụ nâng cao để lọc và lấy siêu dữ liệu cho các phần tử trên trục.
