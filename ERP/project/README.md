# Phân Tích & Giải Thích Chi Tiết Dự Án Odoo ERP - Nhựt Rạng

> **Repository:** [https://github.com/nntGinger/NhutRangOdoo](https://github.com/nntGinger/NhutRangOdoo)  
> **Chủ đề:** Giải pháp Chuyển đổi số & Triển khai Odoo ERP 18.0 cho Công ty TNHH Nhựt Rạng  
> **Mô hình Doanh nghiệp:** Sản xuất & Thương mại (Sản xuất băng keo, màng PE, hạt nhựa & kinh doanh máy móc ngành bao bì)  

---

## 1. Giới Thiệu Tổng Quan Repository

Repository **`NhutRangOdoo`** là một bộ giải pháp toàn diện bao gồm cả **Tài liệu Phân tích Nghiệp vụ (Business Blueprint)**, **Bộ Cấu hình Kỹ thuật (Technical Deployment)** và **Bộ Dữ liệu Nền Chuẩn hóa (Master Data)** được thiết kế dành riêng cho bài toán chuyển đổi số tại **Công ty TNHH Nhựt Rạng** (doanh nghiệp sản xuất và thương mại với hơn 15 năm hoạt động).

### 1.1. Bối cảnh & Điểm đau (Pain Points) của Doanh nghiệp
* **Đặc thù sản xuất & kinh doanh:**
  * **Sản xuất & Gia công:** Băng keo dán thùng, băng keo bảo vệ bề mặt (xanh, trong, trắng đen), băng keo in logo theo yêu cầu, màng PE quấn pallet, hạt nhựa nguyên liệu (PP, PE, PS, PET).
  * **Thương mại:** Cung cấp máy móc phụ trợ ngành băng keo (máy phân cuộn, máy sang cuộn, máy cắt).
  * **Mô hình cung ứng hỗn hợp:** Vừa sản xuất lưu kho (**MTS - Make-To-Stock**) cho các mặt hàng đại trà chuẩn quy cách, vừa sản xuất theo đơn hàng (**MTO - Make-To-Order**) đối với băng keo in logo, cắt khổ đặc thù.
* **Hiện trạng bất cập:**
  * Luồng trao đổi thông tin nội bộ bị phân tán qua tin nhắn Zalo và các file Excel cá nhân.
  * Mất liên kết giữa khâu **Bán hàng $\rightarrow$ Kỹ thuật $\rightarrow$ Sản xuất $\rightarrow$ Kho $\rightarrow$ Kế toán**.
  * Thiếu kiểm soát việc gửi hàng mẫu (Sample) cho khách hàng B2B, dễ gây thất thoát chi phí.
  * Khó kiểm soát định mức nguyên vật liệu (BOM), tiến độ xưởng và tính giá thành thực tế.
  * Kế toán hiện tại đang thuê ngoài (outsource), dẫn đến việc đối soát công nợ, doanh thu và tồn kho bị chậm trễ so với thực tế phát sinh.

### 1.2. Mục tiêu của Repository
1. Cung cấp môi trường triển khai thực nghiệm nhanh hệ thống **Odoo 18.0 Community Edition (CE)** kết hợp **PostgreSQL 16** chạy trên nền tảng **Docker**.
2. Chuẩn hóa quy trình nghiệp vụ nội bộ theo chuẩn mực ERP quốc tế, đối sánh trực tiếp giữa hai hệ thống lớn là **Odoo** và **SAP S/4HANA (SAP B1)**.
3. Cung cấp bộ dữ liệu mẫu (Master Data) thực tế về danh mục sản phẩm, bảng giá sỉ và danh bạ khách hàng sẵn sàng nạp vào hệ thống để thử nghiệm quy trình.

---

## 2. Cấu Trúc Thành Phần Trong Repository

```text
NhutRangOdoo/
├── addons/                     # Thư mục chứa các Custom Addons/Modules tự phát triển cho Odoo
│   └── README.md
├── config/                     # Thư mục chứa file cấu hình hệ thống Odoo
│   └── odoo.conf
├── odoo_masterdata/            # Bộ dữ liệu nền (Master Data) chuẩn hóa dạng CSV để import
│   └── odoo_masterdata/
│       ├── 1_product_categories.csv         # Danh mục nhóm sản phẩm
│       ├── 2_ecommerce_categories.csv       # Danh mục hiển thị trên website/eCommerce
│       ├── 3_products.csv                   # Danh sách sản phẩm, giá bán, giá vốn, thuế
│       ├── 4_opening_stock.csv              # Số dư tồn kho ban đầu (Opening Stock)
│       ├── 5_wholesale_pricelist_rules.csv  # Quy tắc bảng giá sỉ (Pricelist B2B)
│       └── 6_customers.csv                  # Danh bạ khách hàng mẫu
├── docker-compose.yml          # Kịch bản khởi tạo container Odoo 18.0 và PostgreSQL 16
├── ERP.md                      # Tài liệu đặc tả phân tích quy trình nghiệp vụ tổng thể (>119 KB)
├── Hướng Dẫn cài đặt Odoo CE.md # Tài liệu hướng dẫn thiết lập Odoo On-Premise & Docker
├── start-odoo.bat              # Script 1-click khởi chạy Odoo trên Windows
├── stop-odoo.bat               # Script 1-click dừng Odoo trên Windows
└── .gitignore                  # Cấu hình bỏ qua các file tạm, log, dữ liệu cục bộ
```

---

## 3. Chi Tiết Các Tệp Tin & Thành Phần Kỹ Thuật

### 3.1. Kịch bản Triển khai Docker (`docker-compose.yml`)
Hệ thống sử dụng Docker Compose nhằm đơn giản hóa việc triển khai, bao gồm 2 dịch vụ chính:
* **`web` (Odoo 18.0 CE):**
  * Image chính thức: `odoo:18.0`
  * Mở cổng dịch vụ: `8069:8069`
  * Mount volumes:
    * `odoo-web-data` $\rightarrow$ `/var/lib/odoo`: Lưu trữ session, attachment, tài liệu tải lên.
    * `./config` $\rightarrow$ `/etc/odoo`: Nhúng tệp cấu hình tùy biến `odoo.conf`.
    * `./addons` $\rightarrow$ `/mnt/extra-addons`: Nhúng các module tùy biến bổ sung của dự án.
* **`db` (PostgreSQL Database Server):**
  * Image: `postgres:16`
  * Cấu hình biến môi trường tài khoản kết nối: `odoo/odoo`, DB `postgres`.
  * Mount dữ liệu bền vững (volume `odoo-db-data`).

### 3.2. Cấu hình Odoo (`config/odoo.conf`)
* Thiết lập kết nối cơ sở dữ liệu qua hostname nội bộ mạng Docker (`db_host = db`, `db_port = 5432`).
* Khai báo đường dẫn `addons_path = /mnt/extra-addons` cho phép hệ sinh thái Odoo nhận diện tức thời các module mới đặt trong thư mục `addons/`.
* Thiết lập `admin_passwd` mã hóa chuẩn `pbkdf2-sha512` bảo mật cho các tác vụ quản trị database (tạo mới, sao lưu, phục hồi).

### 3.3. Script Tiện Ích Trên Windows (`start-odoo.bat`, `stop-odoo.bat`)
* **`start-odoo.bat`**: Thực hiện lệnh `docker compose up -d`, thông báo đường link truy cập `http://localhost:8069` cùng mật khẩu master quản trị.
* **`stop-odoo.bat`**: Dừng nhanh các container bằng `docker compose down` mà không làm mất dữ liệu đã mount trong volumes.

### 3.4. Bộ Dữ Liệu Nền Khởi Tạo (`odoo_masterdata/`)
Bộ file CSV định dạng chuẩn UTF-8 được thiết kế theo đúng cấu trúc trường dữ liệu của Odoo 18.0:
1. **`1_product_categories.csv`**: Phân cấp nhóm hàng hóa logic (`All / Protective Tape`, `All / PE Film`, `All / Plastic Resin`, `All / Tape Cutting Machines`).
2. **`3_products.csv`**: Danh mục chi tiết các mặt hàng thực tế của Nhựt Rạng kèm mã SKU nội bộ (ví dụ: `NR-PE-WB` - Băng keo bảo vệ PE trắng đen, `NR-STRETCH-5KG` - Màng PE 5kg, `NR-PP-25KG` - Hạt nhựa PP, `NR-MAY-CAT` - Máy cắt băng keo).
3. **`4_opening_stock.csv`**: Định vị số lượng tồn đầu kỳ tại địa điểm kho `WH/Stock`.
4. **`5_wholesale_pricelist_rules.csv`**: Quy tắc chiết khấu theo số lượng (Volume-based pricing) phục vụ khách hàng đại lý và mua buôn.
5. **`6_customers.csv`**: Danh bạ khách hàng B2B mẫu có đầy đủ thông tin pháp lý, ngành nghề và nhân viên phụ trách.

---

## 4. Đặc Tả Nghiệp Vụ Cốt Lõi (Nội Dung Phân Tích Trong `ERP.md`)

File **`ERP.md`** là trọng tâm học thuật và ứng dụng thực tiễn của repository. Tài liệu dài hơn 119 KB chia làm các trụ cột nghiệp vụ:

### 4.1. Quy trình Marketing & CRM B2B
* **Vòng đời phát triển cơ hội bán hàng:**
  $$\text{Lead} \longrightarrow \text{Opportunity} \longrightarrow \text{Sample Order (Hàng mẫu 0đ)} \longrightarrow \text{Quotation} \longrightarrow \text{Sales Order (SO)} \longrightarrow \text{Manufacturing Order (MO)}$$
* **Quy trình gửi hàng mẫu (Sample Handling):**
  * Doanh nghiệp ngành bao bì bắt buộc phải gửi mẫu thử (kiểm tra độ dính, độ giãn màng, mẫu in màu).
  * Odoo giải quyết bằng cách tạo đơn hàng mẫu loại chuyên biệt giá 0 đồng, tự động trừ kho mẫu tại phân hệ Kho (Inventory) và kết chuyển chi phí vào tài khoản chi phí Marketing, ngăn ngừa việc thất thoát vật tư thử mẫu.
* **Xử lý ngoại lệ (Exception Handling):**
  * Khách hàng đánh giá hàng mẫu không đạt $\rightarrow$ Ghi nhận lý do kỹ thuật (độ dính yếu, màu mực lệch), kích hoạt lệnh R&D điều chỉnh công thức.
  * Sản xuất hoặc Giám đốc từ chối nhận đơn do công suất xưởng quá tải $\rightarrow$ Tự động cảnh báo và chuyển trạng thái đàm phán lại thời gian giao nhận.

### 4.2. Quy trình Báo Giá & Ký Hợp Đồng Bán Hàng
* **So sánh hai trường phái ERP:**
  * **SAP S/4HANA / SAP B1:** Quản lý chặt chẽ thông qua Hợp đồng khung (**Blanket Agreement**), kiểm soát tự động thông qua **Approval Process Engine** dựa trên hạn mức tín dụng và biên lợi nhuận sàn.
  * **Odoo ERP:** Linh hoạt, trực quan qua giao diện Kanban Pipeline, quy tắc chiết khấu tự động (Pricelists) và thiết lập cơ chế phê duyệt nhiều cấp (Approval Rules) khi giá bán nằm dưới sàn quy định.

### 4.3. Quản Trị Sản Xuất & Hoạch Định Nhu Cầu Vật Tư (Manufacturing & MRP)
Chuẩn hóa 4 thành phần Master Data sản xuất cho xưởng Nhựt Rạng:
* **Material Master (Quản lý cấp bậc vật tư):**
  * Nguyên vật liệu thô (Raw Materials): Hạt nhựa PE/PP, keo dính, lõi giấy, mực in.
  * Bán thành phẩm (Semi-Finished Goods): Màng cuộn thô (sau khi thổi màng), cuộn Jumbo đã tráng keo.
  * Thành phẩm (Finished Goods): Cuộn băng keo thành phẩm đóng thùng, cuộn màng quấn pallet.
* **BOM (Bill of Materials - Định mức 3 cấp độ):**
  * Cấp 1: Băng keo in logo hoàn thiện.
  * Cấp 2: Cuộn Jumbo keo + Mực in màu + Lõi giấy theo kích thước.
  * Cấp 3: Hạt nhựa PE + Hạt tạo màu + Keo acrylic gốc nước.
* **Work Centers (Trung tâm sản xuất):**
  * `WC-100`: Xưởng Thổi màng (PE Extrusion).
  * `WC-200`: Xưởng Tráng keo (Coating).
  * `WC-300`: Xưởng In logo (Printing).
  * `WC-400`: Xưởng Cắt & Phân cuộn (Slitting & Cutting).
  * `WC-500`: Xưởng Đóng gói & Kiểm tra chất lượng (Packaging & QC).
* **Routing (Quy trình công nghệ):**
  * Định lượng thời gian setup máy, thời gian chạy trên từng mét màng, tỷ lệ hao hụt phế phẩm ở từng công đoạn.

### 4.4. Quy trình Kế Toán - Chứng Từ & Kiểm Soát Nội Bộ
* **Tương thích pháp lý Việt Nam:** Đối chiếu với Thông tư 200/2014/TT-BTC, Thông tư 133/2016/TT-BTC và Nghị định 123/2020/NĐ-CP về hóa đơn điện tử.
* **Mô hình phối hợp Kế toán nội bộ vs Kế toán thuê ngoài (Outsource):**
  * Nhân viên vận hành (Kho, Bán hàng, Mua hàng) thao tác trực tiếp tạo chứng từ gốc trên Odoo.
  * Hệ thống tự động hạch toán bút toán ghi sổ nháp (Draft Journal Entries).
  * Đơn vị kế toán dịch vụ định kỳ kiểm tra, đối soát và khóa sổ mà không cần phải nhập tay lại từ các file hóa đơn giấy/Zalo rời rạc.
* **Nguyên tắc kiểm soát 3 chiều (3-Way Matching):** Khớp nối giữa `Đơn đặt hàng mua (PO) - Phiếu nhập kho (GRN) - Hóa đơn nhà cung cấp (Vendor Bill)`.

---

## 5. Hướng Dẫn Vận Hành & Khởi Chạy Nhanh Dự Án

### Bước 1: Chuẩn bị Môi trường
Cài đặt [Docker Desktop](https://www.docker.com/products/docker-desktop/) trên máy tính và bật dịch vụ Docker.

### Bước 2: Khởi động Hệ thống
Clone repository về máy hoặc tải mã nguồn, sau đó mở terminal tại thư mục gốc và chạy:
```bash
docker compose up -d
```
*(Trên Windows, bạn có thể chỉ cần click đúp vào file `start-odoo.bat`)*

### Bước 3: Truy cập Giao diện Odoo
Mở trình duyệt web và truy cập địa chỉ:
```text
http://localhost:8069
```
* **Master Password:** Cấu hình trong `config/odoo.conf` (hoặc nhập mặc định `admin` khi tạo database mới).
* **Database Name:** Ví dụ `nhutrang_db`.
* **Email & Password Quản trị:** Tự thiết lập theo hướng dẫn khởi tạo của Odoo.

### Bước 4: Nạp Dữ Liệu Master Data (Khuyến nghị thứ tự Import)
Truy cập vào các phân hệ tương ứng trong Odoo và import các file CSV trong thư mục `odoo_masterdata/odoo_masterdata/` theo đúng thứ tự:
1. `1_product_categories.csv` (vào phân hệ Inventory $\rightarrow$ Configuration $\rightarrow$ Product Categories).
2. `2_ecommerce_categories.csv` (vào Website $\rightarrow$ Configuration $\rightarrow$ eCommerce Categories).
3. `3_products.csv` (vào Sales/Inventory $\rightarrow$ Products).
4. `4_opening_stock.csv` (vào Inventory $\rightarrow$ Operations $\rightarrow$ Physical Inventory).
5. `5_wholesale_pricelist_rules.csv` (vào Sales $\rightarrow$ Products $\rightarrow$ Pricelists).
6. `6_customers.csv` (vào Contacts $\rightarrow$ Import Contacts).

---

## 6. Đánh Giá Giá Trị Dự Án

| Tiêu chí | Đánh giá | Chi tiết |
| :--- | :---: | :--- |
| **Tính ứng dụng** | **Rất cao** | Không dừng lại ở mức đồ án lý thuyết suông; dự án đi sâu vào đúng ngành nghề đặc thù (sản xuất băng keo/màng nhựa) với bộ thông số định mức vật tư, xưởng máy và dữ liệu SKU thực tế. |
| **Kiến trúc kỹ thuật** | **Chuẩn hóa** | Đóng gói qua Docker Compose giúp dễ dàng sao chép, triển khai thử nghiệm (PoC) trên máy trạm hoặc đưa lên máy chủ Linux đám mây (AWS, DigitalOcean, Cloud Server). |
| **Chất lượng phân tích** | **Chuyên sâu** | Bản đặc tả nghiệp vụ `ERP.md` thể hiện tầm nhìn kiến trúc giải pháp chuyên nghiệp, kết hợp so sánh chi tiết giữa Odoo và giải pháp Tier 1 thế giới (SAP S/4HANA). |

---
*Tài liệu được tổng hợp và đối soát trực tiếp từ mã nguồn và dữ liệu đặc tả của repository [nntGinger/NhutRangOdoo](https://github.com/nntGinger/NhutRangOdoo).*
