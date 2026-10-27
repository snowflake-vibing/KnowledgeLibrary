# MDX Query Fundamentals (Analysis Services)

> **Tài liệu tham khảo chính thức:** [Microsoft Learn - MDX Query Fundamentals (Analysis Services)](https://learn.microsoft.com/en-us/analysis-services/multidimensional-models/mdx/mdx-query-fundamentals-analysis-services?view=sql-analysis-services-2025)  
> **Áp dụng cho:** SQL Server Analysis Services (SSAS), Azure Analysis Services (AAS), Microsoft Fabric / Power BI Premium (thông qua XMLA Endpoints).

---

## I. TỔNG QUAN VỀ TRUY VẤN MDX (MULTIDIMENSIONAL EXPRESSIONS)

**Multidimensional Expressions (MDX)** là ngôn ngữ truy vấn được thiết kế chuyên biệt để truy xuất và thao tác trên dữ liệu đa chiều (multidimensional data) lưu trữ trong các khối **Cube** của Analysis Services.

Khác với SQL trả về dữ liệu dưới dạng bảng 2 chiều (bảng gồm các dòng và cột phẳng), truy vấn MDX trả về một **tập ô đa chiều (Multidimensional Cellset)**, cho phép bạn cắt lát (*slice*), xoay chiều (*dice*), khoan sâu (*drill-down*) và cuộn gộp (*roll-up*) dữ liệu phân tích một cách trực quan và tối ưu hiệu năng.

```
+--------------------------------------------------------------+
|                        Analysis Services                     |
|                                                              |
|   +-------------------+              +-------------------+   |
|   |   Cube Storage    |  MDX Query   |      Cellset      |   |
|   | (Measures, Dims,  | -----------> | (Axes 0, 1... N,  |   |
|   |   Hierarchies)    |              |   Slicer Filter)  |   |
|   +-------------------+              +-------------------+   |
+--------------------------------------------------------------+
```

---

## II. CÁC KHÁI NIỆM NỀN TẢNG TRONG MDX

Trước khi xây dựng câu truy vấn MDX, bạn cần nắm vững 4 khối xây dựng cốt lõi của mô hình đa chiều:

### 1. Dimension (Chiều) & Hierarchy (Phân cấp)
- **Dimension (Chiều):** Thể hiện các góc nhìn ngữ cảnh để phân tích dữ liệu (ví dụ: *Thời gian, Khách hàng, Sản phẩm, Địa lý*).
- **Hierarchy (Phân cấp):** Cấu trúc cây phản ánh mối quan hệ cha - con giữa các cấp độ trong một chiều.
  - *Ví dụ:* Chiều `Date` có phân cấp `Calendar` gồm các Level: `[Year] -> [Quarter] -> [Month] -> [Date]`.
- **Level (Cấp độ):** Vị trí của một thuộc tính trong cây phân cấp.
- **Member (Thành viên):** Một phần tử dữ liệu cụ thể thuộc một cấp độ trong phân cấp.
  - *Ví dụ:* `[Date].[Calendar].[Year].[2023]`, `[Customer].[Country].[Vietnam]`.

### 2. Measure (Độ đo)
- Là giá trị định lượng, số liệu kinh doanh cần được đo lường và tính toán tổng hợp (ví dụ: *Doanh thu, Số lượng bán, Chi phí, Lợi nhuận*).
- Trong Analysis Services, tất cả các Measures được tập hợp thành một chiều ảo đặc biệt có tên là **`[Measures]`**.
  - *Ví dụ:* `[Measures].[Internet Sales Amount]`, `[Measures].[Order Quantity]`.

### 3. Tuple (Bộ tọa độ)
- **Tuple** xác định tọa độ của một ô (Cell) duy nhất trong không gian đa chiều của Cube.
- Một Tuple kết hợp **duy nhất một thành viên từ mỗi chiều** (hoặc một số chiều; các chiều còn lại nhận thành viên mặc định - *Default Member*).
- Cú pháp: Đặt trong dấu ngoặc đơn `( ... )`.
  - *Ví dụ:* `([Date].[Calendar].[Year].[2023], [Measures].[Internet Sales Amount])`
  - Nếu Tuple chỉ chứa một thành viên duy nhất, dấu ngoặc đơn có thể được lược bỏ: `[Measures].[Internet Sales Amount]`.

### 4. Set (Tập hợp các bộ tọa độ)
- **Set** là một tập hợp có thứ tự gồm **không, một hoặc nhiều Tuple có cùng cấu trúc chiều**.
- Cú pháp: Đặt trong dấu ngoặc nhọn `{ ... }`.
  - *Ví dụ:* 
    ```mdx
    { [Date].[Calendar].[Year].[2022], [Date].[Calendar].[Year].[2023] }
    ```
  - *Tập hợp gồm các Tuple 2 chiều:*
    ```mdx
    { 
      ([Product].[Category].[Bikes], [Customer].[Gender].[Male]),
      ([Product].[Category].[Bikes], [Customer].[Gender].[Female])
    }
    ```

---

## III. CẤU TRÚC CƠ BẢN CỦA MỘT CÂU TRUY VẤN MDX

Tương tự câu lệnh `SELECT` trong SQL, một câu truy vấn MDX cơ bản bao gồm 3 mệnh đề chính:

```mdx
SELECT 
    [ <axis_specification> 
        [, <axis_specification> ... ] ]
FROM 
    [ <cube_specification> ]
[ WHERE 
    [ <slicer_specification> ] ]
```

### 1. Mệnh đề `SELECT` (Query Axes)
- Xác định các **trục truy vấn (Query Axes)** của tập kết quả trả về.
- Mỗi trục truy vấn được gán một tập hợp (`Set`) các Tuple để định hình dòng (`ROWS`) hoặc cột (`COLUMNS`).
- Khác với SQL chỉ có 2 trục hiển thị (dòng và cột), MDX chuẩn hỗ trợ từ **0 đến 128 trục truy vấn** (Axis). Tuy nhiên, hầu hết các ứng dụng trực quan hóa chỉ sử dụng từ 0 đến 2 trục:
  - **Trục 0:** `AXIS(0)` hoặc định danh tương đương là **`COLUMNS`**.
  - **Trục 1:** `AXIS(1)` hoặc định danh tương đương là **`ROWS`**.
  - **Trục 2:** `AXIS(2)` hoặc `PAGES`.
  - **Trục 3:** `AXIS(3)` hoặc `SECTIONS`.
  - **Trục 4:** `AXIS(4)` hoặc `CHAPTERS`.

> [!IMPORTANT]
> - Nếu câu truy vấn sử dụng 1 trục: Bắt buộc phải là `COLUMNS` (hoặc `AXIS(0)`). Không được dùng `ROWS` khi chưa có `COLUMNS`.
> - Nếu sử dụng 2 trục: Bắt buộc phải là `COLUMNS` (trục 0) và `ROWS` (trục 1).

### 2. Mệnh đề `FROM` (Cube Context)
- Xác định ngữ cảnh Cube hoặc Subcube mà dữ liệu sẽ được truy vấn.
- *Cú pháp:* `FROM [Tên_Cube]` (ví dụ: `FROM [Adventure Works]`).

### 3. Mệnh đề `WHERE` (Slicer Axis)
- Đóng vai trò là **trục cắt lát (Slicer Axis)**.
- Mệnh đề `WHERE` trong MDX **không phải là bộ lọc dòng như trong SQL**. Thay vào đó, nó thiết lập **tọa độ ngầm định (ngữ cảnh lọc nền)** cho toàn bộ Cube đối với các chiều không xuất hiện trên trục `SELECT`.
- Chấp nhận một **Tuple** duy nhất hoặc một **Set** (trong một số trường hợp lọc gộp thành viên).
- *Ví dụ:* `WHERE ( [Customer].[Country].[United States], [Date].[Calendar Year].[CY 2023] )`

---

## IV. PHÂN BIỆT QUERY AXIS VÀ SLICER AXIS

| Tiêu chí | Trục truy vấn (Query Axis - Mệnh đề `SELECT`) | Trục cắt lát (Slicer Axis - Mệnh đề `WHERE`) |
| :--- | :--- | :--- |
| **Vị trí cú pháp** | Khai báo sau từ khóa `SELECT ... ON COLUMNS / ON ROWS` | Khai báo sau từ khóa `WHERE ( ... )` |
| **Ảnh hưởng hiển thị** | Các thành viên xuất hiện trực tiếp trên tiêu đề Dòng/Cột của bảng kết quả | Thành viên **không xuất hiện** trên Dòng/Cột của bảng kết quả |
| **Kiểu dữ liệu nhận** | Bắt buộc là một **Set** (Tập hợp các Tuple: `{ ... }`) | Thường là một **Tuple** đơn lẻ `( ... )` |
| **Bản chất hoạt động** | Định hình cấu trúc và số chiều của lưới dữ liệu | Cắt lát không gian Cube để thu hẹp phạm vi tính toán của các ô dữ liệu |

---

## V. THIẾT LẬP NGỮ CẢNH KHỐI (ESTABLISHING CUBE CONTEXT)

### 1. Thành viên mặc định (Default Member)
Khi một chiều không được chỉ định trên Query Axis (trục `SELECT`) cũng không nằm trên Slicer Axis (mệnh đề `WHERE`), Analysis Services sẽ tự động áp dụng **thành viên mặc định (Default Member)** của chiều đó:
- Thường là thành viên **`[All]`** (tổng hợp toàn bộ giá trị của chiều).
- Đối với chiều `[Measures]`, thành viên mặc định thường là Measure đầu tiên được định nghĩa trong Cube.

### 2. Truy vấn trên Subcube (Sub-SELECT)
MDX hỗ trợ tạo một không gian con (Subcube) ngay bên trong mệnh đề `FROM` bằng cách lồng một truy vấn con `SELECT`:

```mdx
SELECT 
    [Measures].[Internet Sales Amount] ON COLUMNS,
    [Product].[Category].Members ON ROWS
FROM 
    (
        SELECT 
            {[Date].[Calendar Year].[CY 2022], [Date].[Calendar Year].[CY 2023]} ON COLUMNS
        FROM [Adventure Works]
    )
```
> [!NOTE]
> Khác với mệnh đề `WHERE` chỉ lọc ngữ cảnh tính toán, Subcube tạo ra một không gian dữ liệu thu nhỏ, ảnh hưởng trực tiếp đến việc tính toán các hàm tổng hợp như `COUNT` hay `ALL`.

---

## VI. CÁC VÍ DỤ TRUY VẤN MDX KINH ĐIỂN

### Ví dụ 1: Truy vấn 2 trục cơ bản (Rows & Columns)
Thống kê Doanh thu và Số lượng bán theo từng Danh mục sản phẩm:

```mdx
SELECT 
    { [Measures].[Internet Sales Amount], [Measures].[Internet Order Quantity] } ON COLUMNS,
    { [Product].[Category].[Bikes], [Product].[Category].[Accessories] } ON ROWS
FROM 
    [Adventure Works]
```

### Ví dụ 2: Kết hợp trục cắt lát `WHERE` (Slicer)
Thống kê Doanh thu theo Danh mục sản phẩm, chỉ tính riêng cho khách hàng tại thị trường `United States` trong năm `CY 2023`:

```mdx
SELECT 
    { [Measures].[Internet Sales Amount] } ON COLUMNS,
    [Product].[Category].Members ON ROWS
FROM 
    [Adventure Works]
WHERE 
    ( [Customer].[Country].[United States], [Date].[Calendar Year].[CY 2023] )
```

### Ví dụ 3: Định nghĩa phần tử tính toán (`WITH MEMBER`)
Tạo một Measure tính toán tỷ lệ lợi nhuận ngay trong lúc thực thi truy vấn:

```mdx
WITH 
    MEMBER [Measures].[Profit Margin] AS
        ([Measures].[Internet Sales Amount] - [Measures].[Total Product Cost]) / [Measures].[Internet Sales Amount],
        FORMAT_STRING = "Percent"
SELECT 
    { [Measures].[Internet Sales Amount], [Measures].[Total Product Cost], [Measures].[Profit Margin] } ON COLUMNS,
    [Product].[Category].Children ON ROWS
FROM 
    [Adventure Works]
```

### Ví dụ 4: Định nghĩa tập hợp đặt tên (`WITH SET`)
Tạo một Named Set chứa danh sách Top 5 sản phẩm bán chạy nhất:

```mdx
WITH 
    SET [Top5Products] AS
        TOPCOUNT(
            [Product].[Product].[Product].Members,
            5,
            [Measures].[Internet Sales Amount]
        )
SELECT 
    { [Measures].[Internet Sales Amount] } ON COLUMNS,
    [Top5Products] ON ROWS
FROM 
    [Adventure Works]
```

---

## VII. BẢNG SO SÁNH GIỮA SQL VÀ MDX

| Tiêu chí | SQL (Relational) | MDX (Multidimensional) |
| :--- | :--- | :--- |
| **Mô hình dữ liệu** | Bảng 2 chiều phẳng (Tables với Rows & Columns) | Khối dữ liệu đa chiều (Hypercube, Measures, Dimensions) |
| **Kết quả trả về** | Bảng phẳng (Tabular Resultset) | Tập ô đa chiều (Multidimensional Cellset) |
| **Mệnh đề `SELECT`** | Chọn các cột (Fields) | Chỉ định các trục (`COLUMNS`, `ROWS`, ...) bằng các Set |
| **Mệnh đề `FROM`** | Chỉ định bảng hoặc view (`FROM Table`) | Chỉ định Cube hoặc Subcube (`FROM [Cube]`) |
| **Mệnh đề `WHERE`** | Bộ lọc điều kiện trên từng dòng (Row filter) | Trục cắt lát ngầm định (Slicer Axis) thiết lập ngữ cảnh cho toàn cube |
| **Phép kết hợp đa chiều** | `JOIN` giữa các bảng thông qua khóa | Tự động liên kết các chiều thông qua mô hình Cube (`CROSSJOIN`, Tuples) |
| **Tổng hợp dữ liệu** | Dùng `GROUP BY` và hàm tổng hợp (`SUM`, `AVG`) | Đã được tính toán hoặc tổng hợp phân cấp tự động trong Cube |

---

## VIII. TÀI LIỆU VÀ CÁC CHỦ ĐỀ LIÊN QUAN TRONG HỆ THỐNG MICROSOFT LEARN

- **The Basic MDX Query (MDX):** Cú pháp và cách xây dựng truy vấn cơ bản.
- **Restricting the Query with Query and Slicer Axis (MDX):** Kiểm soát dữ liệu hiển thị và dữ liệu ngầm định.
- **Establishing Cube Context in a Query (MDX):** Mệnh đề `FROM`, Subcube và phạm vi tính toán.
- **MDX Function Reference:** Các hàm quan trọng: `Crossjoin`, `Filter`, `NonEmpty`, `TopCount`, `Generate`, `Descendants`, `Children`, `Members`.
