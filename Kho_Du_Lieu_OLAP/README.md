# Kho Dữ Liệu & OLAP (Data Warehouse & OLAP)

Kho tài liệu học tập, thiết kế hệ thống Kho dữ liệu (Data Warehouse) và thực hành truy vấn phân tích đa chiều (OLAP / MDX) – Khoa Hệ thống Thông tin, Trường Đại học Công nghệ Thông tin (UIT - ĐHQG-HCM).

---

## 📂 Cấu trúc thư mục

```
Kho_Du_Lieu_OLAP/
├── giai_de/
│   └── DeThiCuoiKy_KhoDLOLAP_HK2-20232024.md         # Lời giải chi tiết Đề thi Cuối kỳ HK2 (2023 - 2024)
├── mdx/
│   ├── README.md                                     # Mục đích học tập (ghi nhớ cú pháp & tự viết code)
│   ├── 01_mdx_query_fundamentals/                    # Module 01: Nền tảng truy vấn MDX
│   │   ├── ly_thuyet.md                              # Lý thuyết chuyên sâu từ Microsoft Learn
│   │   └── bai_tap_dien_tu.html                      # Web App bài tập điền từ khóa & cú pháp (15 câu)
│   └── 02_specify_the_contents_of_a_query_axis/      # Module 02: Đặc tả các trục truy vấn (Query Axes)
│       ├── ly_thuyet.md                              # Lý thuyết chuyên sâu về Query Axes
│       ├── query.mdx                                 # Bộ truy vấn mẫu thực hành (SSMS / Analysis Services)
│       └── bai_tap_dien_tu.html                      # Web App bài tập điền từ khóa & cú pháp (18 câu)
└── README.md                                         # Tổng quan danh mục tài liệu
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

### 2. [Chuyên đề MDX & OLAP (`mdx/`)](mdx/README.md)
*Mục đích cốt lõi: Ghi nhớ chuẩn xác từ khóa, quy tắc cú pháp và rèn luyện kỹ năng tự viết code MDX hoàn chỉnh thông qua mô hình: Mỗi Folder = 1 File Lý thuyết (`ly_thuyet.md`) + 1 File Bài tập điền từ (`bai_tap_dien_tu.html`).*

* **[Chuyên đề 01: Nền tảng truy vấn MDX (MDX Query Fundamentals)](mdx/01_mdx_query_fundamentals/)**
  - **Lý thuyết:** [`ly_thuyet.md`](mdx/01_mdx_query_fundamentals/ly_thuyet.md) – Multidimensional Expressions & Cellset, 4 khối Dimension/Measure/Tuple/Set, cấu trúc lệnh `SELECT...FROM...WHERE`, Default Member và bảng so sánh SQL vs MDX.
  - **Bài tập điền từ khóa:** [`bai_tap_dien_tu.html`](mdx/01_mdx_query_fundamentals/bai_tap_dien_tu.html) – 15 bài tập tương tác gõ trực tiếp từ khóa cú pháp, kiểm tra tức thì và gợi ý chi tiết.

* **[Chuyên đề 02: Đặc tả nội dung trục truy vấn (Specify Query Axes)](mdx/02_specify_the_contents_of_a_query_axis/)**
  - **Lý thuyết:** [`ly_thuyet.md`](mdx/02_specify_the_contents_of_a_query_axis/ly_thuyet.md) – Cú pháp `<SELECT query axis clause>`, 128 trục truy vấn, hệ thống Alias (`COLUMNS`, `ROWS`, `PAGES`,...), `NON EMPTY`, mệnh đề `HAVING`, `DIMENSION PROPERTIES`, quy tắc *No Skipped Axes* và *Empty SELECT*.
  - **Bài tập điền từ khóa:** [`bai_tap_dien_tu.html`](mdx/02_specify_the_contents_of_a_query_axis/bai_tap_dien_tu.html) – 18 bài tập tương tác điền từ khóa hoàn thiện code MDX có chấm điểm.
  - **File code mẫu:** [`query.mdx`](mdx/02_specify_the_contents_of_a_query_axis/query.mdx) – 10 kịch bản truy vấn thực hành sẵn sàng chạy trên SSMS / Adventure Works.

---

## 🛠 Công cụ & Môi trường thực hành khuyến nghị
- **SQL Server Analysis Services (SSAS)** (Multidimensional Mode).
- **SQL Server Management Studio (SSMS)**: Thực thi và xem kết quả MDX Grid.
- **Visual Studio** kết hợp tiện ích mở rộng *Microsoft Analysis Services Projects*.
- Trình duyệt Web (Chrome, Edge, Firefox) để mở file trắc nghiệm tương tác.
