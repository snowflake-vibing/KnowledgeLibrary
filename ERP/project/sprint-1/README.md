# Sprint 1: Khởi Tạo Môi Trường & Thiết Lập Odoo Database

> **Dự án:** Triển khai Odoo 18.0 ERP cho Công ty TNHH Nhựt Rạng  
> **Giai đoạn:** Sprint 1 - Cài đặt hạ tầng & Khởi tạo Cơ sở dữ liệu ban đầu  
> **Thời gian thực hiện:** 28/10/2026  

---

## 1. Thông Tin Cấu Hình Cơ Sở Dữ Liệu (Odoo Database Creation)

Dưới đây là thông tin thiết lập quản trị được sử dụng khi khởi tạo cơ sở dữ liệu trên hệ thống Odoo 18.0:

| Thuộc tính (Field) | Giá trị thiết lập (Value) | Ghi chú |
| :--- | :--- | :--- |
| **System URL** | `http://localhost:8069` | Cổng truy cập mặc định của Odoo Web |
| **Master Password** | `admin` | Khóa bảo mật quản lý database (theo `odoo.conf`) |
| **Database Name** | `nhutrang_odoo` | Tên cơ sở dữ liệu chính của dự án |
| **Admin Email (Login)** | `admin@nhutrang.com` | Tài khoản đăng nhập quản trị tối cao |
| **Password** | `Snowflake@2006` | Mật khẩu đăng nhập quản trị |
| **Phone Number** | *(Để trống)* | Không bắt buộc, có thể cập nhật sau trong phần Hồ sơ người dùng |
| **Language** | `Vietnamese / Tiếng Việt` | Ngôn ngữ giao diện hệ thống |
| **Country** | `Vietnam` | Thiết lập bản địa hóa chuẩn kế toán & tiền tệ (VND) |
| **Demo Data** | `False` (Bỏ chọn) | Không tải dữ liệu mẫu rác, giữ database sạch để import Master Data thực tế |

---

## 2. Thông Tin Hạ Tầng & Dịch Vụ Đi Kèm

* **Nền tảng:** Docker Desktop trên Windows (Docker Engine 29.5.3, Docker Compose v5.1.4).
* **Ứng dụng Web:** Odoo 18.0 Community Edition (`odoo:18.0`).
* **Hệ quản trị CSDL:** PostgreSQL 16 (`postgres:16`).
* **Đường dẫn thư mục dự án cục bộ:** `d:\KnowledgeLibrary\ERP\project\NhutRangOdoo`
* **Lưu trữ dữ liệu (Persistent Volumes):**
  * `odoo-web-data`: Lưu trữ tệp đính kèm, session và tài nguyên web.
  * `odoo-db-data`: Lưu trữ toàn bộ dữ liệu database PostgreSQL của hệ thống.

---

## 3. Lệnh Thao Tác Nhanh

* **Khởi động hệ thống:**
  * Click đúp file `start-odoo.bat` hoặc chạy:
    ```bash
    cd d:\KnowledgeLibrary\ERP\project\NhutRangOdoo
    docker compose up -d
    ```
* **Dừng hệ thống:**
  * Click đúp file `stop-odoo.bat` hoặc chạy:
    ```bash
    cd d:\KnowledgeLibrary\ERP\project\NhutRangOdoo
    docker compose down
    ```

---

## 4. Kế Hoạch Tiếp Theo Trong Sprint 1

1. **Kích hoạt các phân hệ cốt lõi (Apps):**
   * CRM
   * Sales (Bán hàng)
   * Inventory (Quản lý kho)
   * Manufacturing - MRP (Sản xuất & BOM)
   * Invoicing (Kế toán & Hóa đơn)
2. **Nạp dữ liệu nền (Master Data Import):**
   * Nhóm danh mục sản phẩm (`1_product_categories.csv`)
   * Danh mục sản phẩm & bảng giá (`3_products.csv`, `5_wholesale_pricelist_rules.csv`)
   * Số dư tồn kho ban đầu (`4_opening_stock.csv`)
   * Danh bạ khách hàng Nhựt Rạng (`6_customers.csv`)
