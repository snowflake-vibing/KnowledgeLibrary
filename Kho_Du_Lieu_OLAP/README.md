# Kho Dữ Liệu & OLAP (Data Warehouse & OLAP)

Kho tài liệu học tập, thiết kế hệ thống Kho dữ liệu (Data Warehouse) và thực hành truy vấn phân tích đa chiều (OLAP / MDX) – Khoa Hệ thống Thông tin, Trường Đại học Công nghệ Thông tin (UIT - ĐHQG-HCM).

---

## 📂 Cấu trúc thư mục

```
Kho_Du_Lieu_OLAP/
├── giai_de/
│   └── DeThiCuoiKy_KhoDLOLAP_HK2-20232024.md   # Lời giải chi tiết Đề thi Cuối kỳ HK2 (2023 - 2024)
├── mdx/
│   ├── mdx_query_fundamentals.md               # Kiến thức nền tảng về MDX Query (Microsoft Learn)
│   ├── specify_the_contents_of_a_query_axis.md # Hướng dẫn chi tiết về Query Axes trong MDX
│   ├── query.mdx                               # Bộ truy vấn MDX thực hành mẫu (SSMS / Analysis Services)
│   └── trac_nghiem_specify_query_axis.html     # Web App trắc nghiệm tương tác 18 câu có chấm điểm & giải thích
└── README.md                                   # Tổng quan danh mục tài liệu
```

---

## 📑 Danh mục tài liệu chi tiết

### 1. [Giải đề thi cuối kỳ (`giai_de/`)](giai_de/)
* **[Lời giải chi tiết Đề thi Cuối kỳ HK2 (2023 - 2024)](giai_de/DeThiCuoiKy_KhoDLOLAP_HK2-20232024.md)**
  - **Câu 1 (3.0 điểm):** Thiết kế Kho dữ liệu mô hình hình sao (Star Schema) cho nghiệp vụ điều hành tour du lịch: Xác định Grain, 5 bảng chiều (`Dim_ThoiGian`, `Dim_KhachDuLich`, `Dim_HuongDanVien`, `Dim_DiemDen`, `Dim_LoaiHinhDuLich`), bảng sự kiện `Fact_ThamGiaTour`, 4 độ đo (Measures) và biểu đồ Mermaid ERD.
  - **Câu 2 (3.0 điểm):** Đề xuất 3 truy vấn MDX sử dụng hàm `FILTER`, thao tác `DRILL DOWN` (chiều Thời gian từ Năm xuống Quý) và kết hợp `CROSSJOIN` đa chiều (chuẩn hóa 100% định danh không chứa space).
  - **Câu 3 (2.0 điểm):** 2 truy vấn MDX nghiệp vụ: Top 2 loại hình du lịch theo từng quý năm 2023 (kết hợp `GENERATE` & `TOPCOUNT`) và Top 3 hướng dẫn viên nhiều tour nhất cả hai năm 2022 - 2023.
  - **Câu 4 (2.0 điểm):** Bộ dữ liệu mẫu nhất quán và lưới kết quả thực thi chi tiết cho cả 5 truy vấn MDX.
  - **Mục lưu ý thi cử:** Phân biệt `COUNT` vs `DISTINCTCOUNT`, cơ chế `CurrentMember` trong `GENERATE`.

---

### 2. [Chuyên đề MDX & OLAP (`mdx/`)](mdx/)
* **[Nền tảng truy vấn MDX (MDX Query Fundamentals)](mdx/mdx_query_fundamentals.md)**
  - Nền tảng về Multidimensional Expressions & Cellset.
  - 4 khối xây dựng: Dimension, Measure, Tuple `(...)` và Set `{...}`.
  - Cấu trúc lệnh `SELECT ... FROM ... WHERE ...`.
  - Phân biệt chuyên sâu giữa Query Axis (`SELECT`) và Slicer Axis (`WHERE`).
  - Bảng so sánh đối chiếu giữa SQL và MDX.

* **[Đặc tả nội dung trục truy vấn (Specify the Contents of a Query Axis)](mdx/specify_the_contents_of_a_query_axis.md)**
  - Cú pháp mệnh đề `<SELECT query axis clause>`.
  - Ánh xạ 128 trục truy vấn, hệ thống alias chuẩn: `COLUMNS (0)`, `ROWS (1)`, `PAGES (2)`, `SECTIONS (3)`, `CHAPTERS (4)`.
  - Từ khóa `NON EMPTY` để loại bỏ các ô dữ liệu rỗng.
  - Mệnh đề `HAVING` lọc trực tiếp trên trục và `DIMENSION PROPERTIES` lấy siêu dữ liệu thành viên.
  - Quy tắc bắt buộc: **No Skipped Axes** (không được nhảy cóc trục) và **Empty SELECT clause** (0 trục - Single Cell).

* **[Kịch bản truy vấn mẫu thực hành (`query.mdx`)](mdx/query.mdx)**
  - File mã nguồn `.mdx` gồm 10 phần truy vấn thực hành mẫu, sẵn sàng chạy trực tiếp trên SSMS / Azure Analysis Services / Power BI XMLA Endpoint trên cơ sở dữ liệu Adventure Works.

* **[Ứng dụng trắc nghiệm tương tác (`trac_nghiem_specify_query_axis.html`)](mdx/trac_nghiem_specify_query_axis.html)**
  - Giao diện trực quan trên nền Web (HTML5/CSS3/JavaScript thuần).
  - Bộ 18 câu trắc nghiệm bao quát toàn diện lý thuyết, cú pháp và các bẫy đề thi.
  - Chấm điểm tự động, phân loại kết quả và cung cấp lời giải thích chi tiết cho từng phương án.

---

## 🛠 Công cụ & Môi trường thực hành khuyến nghị
- **SQL Server Analysis Services (SSAS)** (Multidimensional Mode).
- **SQL Server Management Studio (SSMS)**: Thực thi và xem kết quả MDX Grid.
- **Visual Studio** kết hợp tiện ích mở rộng *Microsoft Analysis Services Projects*.
- Trình duyệt Web (Chrome, Edge, Firefox) để mở file trắc nghiệm tương tác.
