# Phân Hệ 04: Kịch Bản & Code Kiểm Thử Tự Động E2E (Mã Nghiệm Thu: E15 & E17)

> **Căn cứ tài liệu:** `Sprint_4_requirement.pdf` (Trang 3 & 4)  
> **Người thực hiện:** Hiệu  
> **Nhiệm vụ:** Viết bộ test tự động (Feature/E2E Test) chứng minh hai kịch bản nghiệm thu **E15** và **E17** đạt 100% yêu cầu trước khi tích hợp vào nhánh `main`.

---

## 1. Kịch Bản Nghiệm Thu E15

* **Mô tả kịch bản:**
  * Bệnh nhân tạo hồ sơ trẻ em dưới ngưỡng tuổi giám hộ (mặc định 16 tuổi theo Luật Trẻ em 2016).
  * Thử lưu mà không có thông tin người giám hộ $\rightarrow$ Thất bại (Lỗi validation 422).
  * Thử lưu mà không có đồng thuận dữ liệu $\rightarrow$ Thất bại (Lỗi validation 422).
  * Điền đầy đủ thông tin giám hộ + đồng ý điều khoản $\rightarrow$ Thành công HTTP 201.
  * Kiểm tra CSDL: Bảng `patient_consents` có đúng 1 bản ghi.
  * Response trả về: CCCD, BHYT, SĐT đều được che mờ (masked).
  * Hàm `makePatientSnapshot(profile)` trả về JSON đã che mờ.

* **File test thực tế:** [`tests/Feature/E2E/E15_ChildProfileAndConsentTest.php`](file:///d:/KnowledgeLibrary/web/project/Main-Project-IS207/backend/tests/Feature/E2E/E15_ChildProfileAndConsentTest.php)

---

## 2. Kịch Bản Nghiệm Thu E17

* **Mô tả kịch bản:**
  * Chuẩn bị 3 hồ sơ bệnh nhân:
    1. **Hồ sơ 1:** Đang có lịch khám chờ duyệt (`pending_approval`).
    2. **Hồ sơ 2:** Đã từng khám bệnh trong quá khứ (`completed`).
    3. **Hồ sơ 3:** Chưa từng đặt bất kỳ lịch khám nào + có bản ghi consent.
  * Yêu cầu xóa lần lượt cả 3 hồ sơ:
    * Hồ sơ 1: Bị chặn xóa với mã lỗi **`EX-PRF-06`**.
    * Hồ sơ 2: Được xóa mềm (`deleted_at`), khôi phục thành công qua API `restore`.
    * Hồ sơ 3: Bị xóa cứng khỏi bảng `patient_profiles`, trong khi bản ghi trong `patient_consents` vẫn còn nguyên vẹn.

* **File test thực tế:** [`tests/Feature/E2E/E17_ProfileDeletionPolicyTest.php`](file:///d:/KnowledgeLibrary/web/project/Main-Project-IS207/backend/tests/Feature/E2E/E17_ProfileDeletionPolicyTest.php)

---

## 3. Lệnh Chạy Kiểm Thử Trên Database Test

```bash
# Chạy fresh database kiểm thử
DB_DATABASE=medsi_test php artisan migrate:fresh --seed --force

# Chạy riêng 2 test case E15 và E17 của Hiệu
php artisan test --filter=E15_ChildProfileAndConsentTest
php artisan test --filter=E17_ProfileDeletionPolicyTest
```
