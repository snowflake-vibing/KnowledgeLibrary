# Kho Dữ Liệu & OLAP (Data Warehouse & OLAP)

Kho tài liệu học tập, thiết kế hệ thống Kho dữ liệu (Data Warehouse) và thực hành chuyên sâu truy vấn phân tích đa chiều (OLAP / MDX) phục vụ ôn thi cuối kỳ môn Kho dữ liệu & OLAP – Khoa Hệ thống Thông tin, Trường Đại học Công nghệ Thông tin (UIT - ĐHQG-HCM).

---

## 📂 Cấu trúc thư mục

```
Kho_Du_Lieu_OLAP/
├── giai_de/
│   └── DeThiCuoiKy_KhoDLOLAP_HK2-20232024.md             # Lời giải chi tiết Đề thi Cuối kỳ HK2 (2023 - 2024)
├── mdx/                                                  # Chuyên đề Truy vấn Đa chiều MDX toàn diện
│   ├── README.md                                         # Mục đích học tập & phương pháp ghi nhớ cú pháp
│   ├── 01_mdx_query_fundamentals/                        # Module 01: Nền tảng truy vấn MDX
│   │   ├── ly_thuyet.md                                  # Lý thuyết Cube Context, SELECT/FROM/WHERE, Tuple, Set
│   │   └── bai_tap_dien_tu.html                          # Web App điền từ khóa (15 bài)
│   ├── 02_specify_the_contents_of_a_query_axis/          # Module 02: Đặc tả các trục truy vấn (Query Axes)
│   │   ├── ly_thuyet.md                                  # Lý thuyết COLUMNS, ROWS, NON EMPTY, HAVING, PROPERTIES
│   │   ├── query.mdx                                     # Bộ 10 câu lệnh mẫu thực hành trên SSMS
│   │   └── bai_tap_dien_tu.html                          # Web App điền từ khóa (18 bài)
│   ├── 03_hierarchical_navigation_drill_rollup/          # Module 03: Phân cấp & Thao tác Roll-up / Drill-down
│   │   ├── ly_thuyet.md                                  # Lý thuyết Children, Parent, Descendants, Siblings, PrevMember
│   │   └── bai_tap_dien_tu.html                          # Web App điền từ khóa (15 bài)
│   ├── 04_advanced_filtering_and_sorting/                # Module 04: Lọc & Sắp xếp nâng cao
│   │   ├── ly_thuyet.md                                  # Lý thuyết Filter, TopCount, BottomCount, Order, BDESC, Head, Tail
│   │   └── bai_tap_dien_tu.html                          # Web App điền từ khóa (15 bài)
│   ├── 05_generate_and_iterative_functions/              # Module 05: Hàm GENERATE & Kỹ thuật Top N Per Group
│   │   ├── ly_thuyet.md                                  # Bí quyết giải Câu 3a Đề thi UIT (1.0 điểm)
│   │   └── bai_tap_dien_tu.html                          # Web App điền từ khóa (12 bài)
│   ├── 06_calculated_members_named_sets_aggregates/      # Module 06: Thành viên tính toán & Hàm AGGREGATE
│   │   ├── ly_thuyet.md                                  # Bí quyết giải Câu 3b Đề thi UIT (1.0 điểm) - AGGREGATE vs SUM
│   │   └── bai_tap_dien_tu.html                          # Web App điền từ khóa (12 bài)
│   └── 07_time_intelligence_and_trend_analysis/          # Module 07: Phân tích chuỗi thời gian & Tăng trưởng
│       ├── ly_thuyet.md                                  # Chuyên đề điểm 9-10: ParallelPeriod, YTD, QTD, % tăng trưởng YoY/MoM
│       └── bai_tap_dien_tu.html                          # Web App điền từ khóa (12 bài)
└── README.md                                             # Tổng quan danh mục tài liệu
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

### 2. [Hệ thống 7 Chuyên đề MDX & OLAP (`mdx/`)](mdx/README.md)
*Mục đích cốt lõi: Ghi nhớ chuẩn xác từ khóa, quy tắc cú pháp và rèn luyện kỹ năng tự viết code MDX hoàn chỉnh thông qua mô hình: Mỗi Folder = 1 File Lý thuyết (`ly_thuyet.md`) + 1 File Bài tập điền từ (`bai_tap_dien_tu.html`).*

1. **[01. MDX Query Fundamentals](mdx/01_mdx_query_fundamentals/)** – Nền tảng khối Cube, Cellset, bộ 3 mệnh đề SELECT/FROM/WHERE, Tuples, Sets và bảng so sánh SQL vs MDX.
2. **[02. Specify Query Axes](mdx/02_specify_the_contents_of_a_query_axis/)** – Cú pháp `<SELECT query axis clause>`, 128 trục truy vấn, `NON EMPTY`, `HAVING`, `DIMENSION PROPERTIES`, quy tắc *No Skipped Axes*.
3. **[03. Hierarchical Navigation & Drill down / Roll up](mdx/03_hierarchical_navigation_drill_rollup/)** – Thao tác Roll up / Drill down (Trọng tâm Câu 2 đề thi), `.Children`, `.Parent`, `DESCENDANTS(Member, Level, Flags)`, `.PrevMember`.
4. **[04. Advanced Filtering & Sorting](mdx/04_advanced_filtering_and_sorting/)** – Lọc điều kiện `FILTER`, xếp hạng `TOPCOUNT`/`BOTTOMCOUNT`, sắp xếp phá vỡ phân cấp `ORDER(..., BDESC)` vs giữ phân cấp `DESC`, hàm cắt đầu đuôi `HEAD`/`TAIL`.
5. **[05. GENERATE & Iterative Functions](mdx/05_generate_and_iterative_functions/)** – **Vũ khí giải quyết Câu 3a Đề thi UIT (1.0 điểm):** Bài toán *Top N per group* ("Với mỗi X, tìm top N của Y"), `GENERATE + CurrentMember + CROSSJOIN + TOPCOUNT`.
6. **[06. Calculated Members, Named Sets & AGGREGATE](mdx/06_calculated_members_named_sets_aggregates/)** – **Vũ khí giải quyết Câu 3b Đề thi UIT (1.0 điểm):** `WITH MEMBER`, `WITH SET`, hàm tổng hợp thông minh `AGGREGATE` (xử lý chuẩn DistinctCount / SoLuongTour) vs `SUM`.
7. **[07. Time Intelligence & Trend Analysis](mdx/07_time_intelligence_and_trend_analysis/)** – Chuyên đề điểm 9 - 10: `PARALLELPERIOD` (kỳ song song cùng kỳ), tính % tăng trưởng YoY/MoM, lũy kế `YTD()`, `QTD()`, `MTD()`, đầu kỳ `OpeningPeriod` và cuối kỳ `ClosingPeriod`.

---

## 🛠 Công cụ & Môi trường thực hành khuyến nghị
- **SQL Server Analysis Services (SSAS)** (Multidimensional Mode).
- **SQL Server Management Studio (SSMS)**: Thực thi và xem kết quả MDX Grid.
- **Visual Studio** kết hợp tiện ích mở rộng *Microsoft Analysis Services Projects*.
- Trình duyệt Web (Chrome, Edge, Firefox) để mở trực tiếp các file Web App bài tập điền từ khóa `bai_tap_dien_tu.html`.
