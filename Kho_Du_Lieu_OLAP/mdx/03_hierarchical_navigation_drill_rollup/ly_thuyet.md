# Điều Hướng Phân Cấp & Thao Tác Roll-up / Drill-down (MDX)

> **Tài liệu tham khảo chính thức:** [Microsoft Learn - MDX Navigation Functions & Hierarchies](https://learn.microsoft.com/en-us/analysis-services/multidimensional-models/mdx/mdx-cell-properties-using-cell-properties?view=sql-analysis-services-2025)  
> **Áp dụng cho:** Đề thi Cuối kỳ Kho dữ liệu & OLAP (Khoa Hệ thống Thông tin - UIT), SSAS, Power BI XMLA.

---

## I. TỔNG QUAN VỀ PHÂN CẤP (HIERARCHY) TRONG OLAP

Trong mô hình đa chiều (Cube), dữ liệu không chỉ nằm phẳng mà được tổ chức theo các **cây phân cấp (Hierarchies)**. Một phân cấp gồm nhiều **cấp độ (Levels)** có quan hệ cha - con (*Parent - Child*).

```
[All] (Toàn bộ)
  └── [Nam] (Ví dụ: 2022, 2023)
        └── [Quy] (Quý 1, Quý 2, Quý 3, Quý 4)
              └── [Thang] (Tháng 1 -> Tháng 12)
                    └── [Ngay] (Ngày 1 -> Ngày 31)
```

Hai thao tác cơ bản và quan trọng nhất khi phân tích dữ liệu trên cây phân cấp là **Roll-up (Cuộn gộp)** và **Drill-down (Khoan sâu)**. Đề thi cuối kỳ UIT luôn yêu cầu đề xuất ít nhất một truy vấn thuộc dạng này và **ghi rõ theo yếu tố gì**.

---

## II. BẢN CHẤT CỦA DRILL DOWN VÀ ROLL UP

| Tiêu chí | DRILL DOWN (Khoan sâu) | ROLL UP (Cuộn gộp / Cuộn lên) |
| :--- | :--- | :--- |
| **Bản chất** | Đi từ cấp độ **tổng quát** xuống cấp độ **chi tiết hơn** (mở rộng dữ liệu). | Đi từ cấp độ **chi tiết** lên cấp độ **tổng quát hơn** (gom nhóm, khái quát hóa). |
| **Hướng di chuyển** | Từ nút Cha $\rightarrow$ các nút Con (`Parent` $\rightarrow$ `Children`). | Từ nút Con $\rightarrow$ nút Cha (`Child` $\rightarrow$ `Parent`). |
| **Ví dụ chiều Thời gian** | Từ Năm 2023 $\rightarrow$ Chi tiết xuống 4 Quý (`Q1, Q2, Q3, Q4`). | Từ các Tháng $\rightarrow$ Gộp lên doanh thu cả Năm. |
| **Ví dụ chiều Địa lý** | Từ Quốc gia $\rightarrow$ Khoan sâu xuống các Thành phố / Điểm đến. | Từ Điểm du lịch $\rightarrow$ Gộp lên Vùng / Quốc gia. |
| **Hàm MDX tiêu biểu** | `.Children`, `Descendants(...)`, `.FirstChild`, `.LastChild` | `.Parent`, `Ancestor(...)`, `Ancestors(...)`, `AGGREGATE(...)` |
| **Cách ghi điểm trong đề thi** | *"Drill down theo chiều Thời gian từ cấp độ Năm xuống cấp độ Quý".* | *"Roll up theo chiều Địa lý từ cấp độ Thành phố lên cấp độ Quốc gia".* |

---

## III. CÁC HÀM ĐIỀU HƯỚNG PHÂN CẤP CỐT LÕI

### 1. Hàm `.Children` (Lấy các con trực tiếp)
- **Kiểu trả về:** `Set` (Tập hợp các Member).
- **Cú pháp:** `Member.Children`
- **Tác dụng:** Trả về tất cả các phần tử ở cấp độ con trực tiếp bên dưới phần tử đang xét (chuẩn cho thao tác **Drill down 1 cấp**).
- **Ví dụ đề thi:** Khoan sâu năm 2023 thành các quý con:
```mdx
SELECT 
    {[Measures].[DoanhThu]} ON COLUMNS,
    [Dim_ThoiGian].[Nam].[2023].Children ON ROWS
FROM [Tour_DW]
```

---

### 2. Hàm `.Parent` (Lấy phần tử cha trực tiếp)
- **Kiểu trả về:** `Member` (Một phần tử duy nhất).
- **Cú pháp:** `Member.Parent`
- **Tác dụng:** Trả về nút cha trực tiếp của phần tử đang xét (chuẩn cho thao tác **Roll up 1 cấp**).
- **Ví dụ đề thi:** Từ Tháng 3 năm 2023 cuộn gộp lên Quý cha:
```mdx
SELECT 
    {[Measures].[DoanhThu]} ON COLUMNS,
    { [Dim_ThoiGian].[Thang].[2023-03].Parent } ON ROWS
FROM [Tour_DW]
```

---

### 3. Hàm `Descendants(...)` (Khoan sâu đa cấp linh hoạt)
- **Kiểu trả về:** `Set`.
- **Cú pháp chuẩn:**
```mdx
Descendants( Member [, [ Level | Distance ] [, Flags ] ] )
```
- **Các cờ (Flags) điều khiển kết quả khoan sâu:**
  - `SELF` *(Mặc định)*: Chỉ lấy các phần tử ở cấp độ đích được chỉ định.
  - `BEFORE`: Lấy tất cả các phần tử từ nút hiện tại đến trước cấp độ đích (không lấy cấp độ đích).
  - `AFTER`: Lấy các phần tử nằm bên dưới cấp độ đích.
  - `SELF_AND_BEFORE`: Lấy nút hiện tại, các cấp trung gian và cấp độ đích.
  - `SELF_AND_AFTER`: Lấy cấp độ đích và toàn bộ các phần tử con bên dưới nó.
  - `LEAVES`: Lấy các phần tử lá (cấp thấp nhất) bên dưới nút.

- **Ví dụ 1 (Khoan sâu theo tên Level):** Lấy tất cả các Quý của năm 2023:
```mdx
SELECT 
    {[Measures].[DoanhThu]} ON COLUMNS,
    DESCENDANTS(
        [Dim_ThoiGian].[Nam_Quy_Thang].[Nam].[2023],
        [Dim_ThoiGian].[Nam_Quy_Thang].[Quy]
    ) ON ROWS
FROM [Tour_DW]
```

- **Ví dụ 2 (Khoan sâu theo khoảng cách Distance):**
  - `Distance = 1`: Tương đương `.Children` (xuống 1 cấp).
  - `Distance = 2`: Xuống 2 cấp (từ Năm xuống Tháng).
```mdx
SELECT 
    {[Measures].[DoanhThu]} ON COLUMNS,
    DESCENDANTS([Dim_ThoiGian].[Nam].[2023], 2, SELF) ON ROWS
FROM [Tour_DW]
```

---

### 4. Hàm `Ancestor(...)` và `Ancestors(...)`
- **`Ancestor(Member, Level | Distance)`:** Trả về **1 Member** tổ tiên ở cấp độ chỉ định.
- **`Ancestors(Member, Level | Distance)`:** Trả về **1 Set** chứa tổ tiên.
- **Ví dụ:** Tìm Quốc gia tổ tiên của thành phố "Đà Nẵng":
```mdx
SELECT 
    {[Measures].[DoanhThu]} ON COLUMNS,
    { ANCESTOR([Dim_DiemDen].[DiaLy].[ThanhPho].[Đà Nẵng], [Dim_DiemDen].[DiaLy].[QuocGia]) } ON ROWS
FROM [Tour_DW]
```

---

### 5. Điều hướng anh chị em và chuỗi thời gian: `.Siblings`, `.PrevMember`, `.NextMember`

1. **`.Siblings`:** Trả về tập hợp các thành viên **cùng cấp có chung cha** (bao gồm chính phần tử đó).
   - *Ví dụ:* `[Date].[Calendar].[Quarter].[Q1 2023].Siblings` $\rightarrow$ Trả về `{Q1 2023, Q2 2023, Q3 2023, Q4 2023}`.

2. **`.PrevMember`:** Trả về phần tử liền kề phía trước trên cùng cấp độ.
   - *Ứng dụng:* Dùng trong công thức tính toán tăng trưởng so với kỳ trước (MoM, QoQ, YoY).
   - *Ví dụ:* `[Date].[Calendar Year].[CY 2023].PrevMember` $\rightarrow$ Trả về `[CY 2022]`.

3. **`.NextMember`:** Trả về phần tử liền kề phía sau trên cùng cấp độ.

4. **`.FirstChild` / `.LastChild`:** Lấy thành viên con đầu tiên hoặc cuối cùng.
   - *Ví dụ:* `[Nam].[2023].FirstChild` $\rightarrow$ Quý 1/2023; `[Nam].[2023].LastChild` $\rightarrow$ Quý 4/2023.

---

## IV. BÀI TẬP MẪU ĐỀ THI UIT (KÈM LỜI GIẢI CHUẨN)

### Đề bài yêu cầu:
> *"Đề xuất 01 truy vấn Roll up hoặc Drill down (ghi rõ theo yếu tố gì)"* (Trích Đề thi Cuối kỳ Kho DL & OLAP UIT).

#### Mẫu 1: Câu lệnh DRILL DOWN
- **Yếu tố thực hiện:** Chiều `Dim_ThoiGian`, thực hiện **Drill down** từ cấp độ **Năm** (`[Nam].[2023]`) xuống cấp độ con trực tiếp là **Quý** (`[Quy]`).
- **Câu lệnh MDX:**
```mdx
SELECT 
    {[Measures].[DoanhThu], [Measures].[SoLuongTour]} ON COLUMNS,
    [Dim_ThoiGian].[Nam].[2023].Children ON ROWS
FROM [Tour_DW]
```

#### Mẫu 2: Câu lệnh ROLL UP
- **Yếu tố thực hiện:** Chiều `Dim_DiemDen`, thực hiện **Roll up** từ cấp độ chi tiết **Điểm đến** (`[TenDiemDen]`) cuộn gộp lên cấp độ **Loại điểm đến** (`[LoaiDiemDen]`) và **Quốc gia**.
- **Câu lệnh MDX:**
```mdx
SELECT 
    {[Measures].[DoanhThu], [Measures].[SoLuotKhach]} ON COLUMNS,
    [Dim_DiemDen].[LoaiDiemDen].Members ON ROWS
FROM [Tour_DW]
```

---

## V. TÓM TẮT CÔNG THỨC NHANH ĐỂ LÀM BÀI THI

1. Muốn lấy các con trực tiếp (Drill down): Dùng `.Children`
2. Muốn khoan sâu nhiều cấp linh hoạt: Dùng `DESCENDANTS(Member, Level, Flags)`
3. Muốn lấy phần tử cha (Roll up): Dùng `.Parent`
4. Muốn lấy phần tử trước đó để tính tăng trưởng: Dùng `.PrevMember`
5. Trong bài thi: **Luôn ghi rõ câu thuyết minh: "Drill down / Roll up theo chiều [Tên_Chiều] từ cấp độ [X] sang cấp độ [Y]" để đạt điểm tối đa!**
