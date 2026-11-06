# BỘ TEST CASE & HƯỚNG DẪN KIỂM THỬ PHÂN HỆ HỒ SƠ BỆNH NHÂN (SPRINT 4)

> **Người thực hiện:** **Lê Thành Hiệu (24520496)**  
> **Dự án:** MedSi — Nền tảng đặt lịch khám bệnh trực tuyến  
> **Phạm vi kiểm thử:** Hồ sơ bệnh nhân (`patient_profiles`), Đồng thuận dữ liệu (`patient_consents`), Giám hộ <16 tuổi, Che mờ dữ liệu (Masking), Bản chụp bệnh nhân (Snapshot), Chính sách xóa 3 trường hợp và Khôi phục (Restore).  
> **Mã công việc:** `S4-03`, `S4-20`, `S4-21`, `S4-22`, `S4-23`, `S4-24`, `S4-25`.  
> **Tiêu chí nghiệm thu E2E trực tiếp:** **`E15`** và **`E17`**.

---

## 1. DANH SÁCH TÀI KHOẢN DÙNG ĐỂ TEST (TEST ACCOUNTS)

Hệ thống cung cấp sẵn các bộ tài khoản thử nghiệm theo từng kịch bản nghiệp vụ để bạn dễ dàng đăng nhập, test API qua Postman hoặc test trên giao diện UI:

| Vai trò | Email đăng nhập | Mật khẩu chung | Mục đích kiểm thử cụ thể | Dữ liệu khởi tạo kèm theo |
|---|---|---|---|---|
| **Patient (Test E15)** | `patient.e15@medsi.vn` | `Password@123` | Kiểm thử tạo hồ sơ trẻ em, xác thực người giám hộ <16 tuổi, đồng thuận consent và che mờ dữ liệu | Tài khoản mới, chưa có hồ sơ nào. |
| **Patient (Test E17)** | `patient.e17@medsi.vn` | `Password@123` | Kiểm thử chính sách xóa 3 loại hồ sơ (chặn xóa lịch chờ, xóa mềm lịch cũ, xóa cứng hồ sơ trắng) | Đã có sẵn 3 hồ sơ tương ứng với 3 trạng thái lịch khám. |
| **Patient (Hồ sơ đầy)** | `patient.max10@medsi.vn` | `Password@123` | Kiểm thử chặn tạo hồ sơ thứ 11 (`max_profiles_per_user = 10`) | Đã có sẵn 10 hồ sơ hợp lệ. |
| **Doctor (Bác sĩ)** | `doctor.ck03@medsi.vn` | `Password@123` | Kiểm tra bác sĩ chỉ nhận được dữ liệu che mờ `patient_snapshot` trong lịch hẹn | Thuộc chuyên khoa Tim mạch CK03. |
| **Admin** | `admin.audit@medsi.vn` | `Password@123` | Kiểm tra tra cứu hồ sơ và kiểm tra nhật ký `audit_logs` | Toàn quyền tra cứu hệ thống. |

---

## 2. MA TRẬN TEST CASE CHI TIẾT (TEST CASES MATRIX)

### 2.1. Nhóm kịch bản E15: Hồ sơ trẻ em, Người giám hộ, Consent & Data Masking

#### `TC-E15-01`: Tạo hồ sơ trẻ em (<16 tuổi) nhưng thiếu thông tin người giám hộ
* **Mục tiêu:** Đảm bảo hệ thống chặn lưu hồ sơ trẻ em khi chưa có người giám hộ theo Điều 1 Luật Trẻ em và quyết định CF-07.
* **Tài khoản test:** `patient.e15@medsi.vn`
* **Dữ liệu đầu vào (Payload):**
  ```json
  {
    "full_name": "Nguyễn Văn Bé",
    "dob": "2018-05-10",
    "gender": "male",
    "relationship": "Con",
    "consent_agreed": true
  }
  ```
* **Các bước thực hiện:** Gửi `POST /api/patient-profiles` kèm Token xác thực.
* **Kết quả mong đợi:**
  * Mã HTTP: `422 Unprocessable Entity`
  * JSON Response chứa lỗi validation các trường: `guardian_name`, `guardian_phone`, `guardian_relationship`.

---

#### `TC-E15-02`: Tạo hồ sơ nhưng KHÔNG tick đồng ý điều khoản dữ liệu (`consent_agreed = false`)
* **Mục tiêu:** Đảm bảo bắt buộc phải có sự đồng thuận trước khi lưu dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP và quyết định CF-08.
* **Tài khoản test:** `patient.e15@medsi.vn`
* **Dữ liệu đầu vào (Payload):**
  ```json
  {
    "full_name": "Nguyễn Văn Bé",
    "dob": "2018-05-10",
    "gender": "male",
    "relationship": "Con",
    "guardian_name": "Nguyễn Văn Cha",
    "guardian_phone": "0901234567",
    "guardian_relationship": "Cha",
    "consent_agreed": false
  }
  ```
* **Các bước thực hiện:** Gửi `POST /api/patient-profiles`.
* **Kết quả mong đợi:**
  * Mã HTTP: `422 Unprocessable Entity`
  * JSON Response chứa lỗi: `consent_agreed` bắt buộc phải là `true`.

---

#### `TC-E15-03`: Tạo hồ sơ trẻ em thành công với đầy đủ giám hộ & Consent
* **Mục tiêu:** Tạo hồ sơ hợp lệ và ghi nhận đúng 1 bản ghi `patient_consents` trong CSDL.
* **Tài khoản test:** `patient.e15@medsi.vn`
* **Dữ liệu đầu vào (Payload):**
  ```json
  {
    "full_name": "Nguyễn Văn Bé",
    "dob": "2018-05-10",
    "gender": "male",
    "relationship": "Con",
    "identity_card_number": "001099123456",
    "phone": "0912345678",
    "health_insurance_code": "DN4010123456789",
    "guardian_name": "Nguyễn Văn Cha",
    "guardian_phone": "0901234567",
    "guardian_relationship": "Cha",
    "consent_agreed": true
  }
  ```
* **Các bước thực hiện:** Gửi `POST /api/patient-profiles`.
* **Kết quả mong đợi:**
  * Mã HTTP: `201 Created`
  * Trong CSDL bảng `patient_consents`: Tồn tại đúng 1 bản ghi với `patient_profile_id`, `policy_version = "v1.0"`, `agreed_at` có timestamp, `revoked_at = NULL`.

---

#### `TC-E15-04`: Kiểm tra Che mờ dữ liệu (Data Masking) khi xem hồ sơ
* **Mục tiêu:** Kiểm tra các trường CCCD, BHYT, SĐT được che mờ theo CF-11.
* **Các bước thực hiện:** Gửi `GET /api/patient-profiles/{id}` (chế độ xem thông thường).
* **Kết quả mong đợi:**
  * `identity_card_number`: Che dạng `001******456` (không lộ nguyên số CCCD).
  * `health_insurance_code`: Che dạng `DN4******789`.
  * `phone`: Che dạng `091*****78`.
  * `guardian_phone`: Che dạng `090*****67`.

---

#### `TC-E15-05`: Kiểm tra Giải mờ khi chủ hồ sơ mở chế độ chỉnh sửa (`?mode=edit`)
* **Mục tiêu:** Chủ tài khoản được xem thông tin gốc khi vào màn hình Edit.
* **Các bước thực hiện:** Gửi `GET /api/patient-profiles/{id}?mode=edit`.
* **Kết quả mong đợi:** Dữ liệu trả về đầy đủ nguyên bản: `"001099123456"`, `"DN4010123456789"`, `"0912345678"`.

---

#### `TC-E15-06`: Kiểm tra hàm `makePatientSnapshot(profile)`
* **Mục tiêu:** Trả về JSON snapshot đã che mờ để lưu trữ vào bảng `bookings.patient_snapshot`.
* **Các bước thực hiện:** Gọi hàm `profile->makePatientSnapshot()`.
* **Kết quả mong đợi:** Trả về mảng thông tin người bệnh có `profile_id`, họ tên, ngày sinh, quan hệ, kèm các trường CCCD, BHYT, SĐT đều ở trạng thái che mờ.

---

### 2.2. Nhóm kịch bản E17: Chính sách xóa 3 trường hợp & Khôi phục (Restore)

#### `TC-E17-01`: Chặn xóa hồ sơ khi đang có lịch chờ khám (Pending Bookings)
* **Mục tiêu:** Ngăn chặn mất mát dữ liệu ca khám sắp diễn ra.
* **Tài khoản test:** `patient.e17@medsi.vn`
* **Tiền điều kiện:** Hồ sơ ID `101` đang gắn với lượt khám trạng thái `pending_approval` hoặc `confirmed`.
* **Các bước thực hiện:** Gửi `DELETE /api/patient-profiles/101`.
* **Kết quả mong đợi:**
  * Mã HTTP: `400 Bad Request` (hoặc `422`)
  * JSON Response: `{"success": false, "error_code": "EX-PRF-06", "message": "Hồ sơ đang có lịch khám chưa hoàn tất, không thể xóa."}`
  * Hồ sơ trong DB: `deleted_at` vẫn là `NULL` (không bị xóa).

---

#### `TC-E17-02`: Xóa mềm khi hồ sơ đã từng có lịch sử khám (Past Bookings)
* **Mục tiêu:** Bảo tồn dữ liệu y tế 10 - 20 năm theo Luật Khám bệnh, chữa bệnh 2023.
* **Tiền điều kiện:** Hồ sơ ID `102` chỉ gắn với các lượt khám đã hoàn tất (`completed`) hoặc đã hủy (`cancelled`).
* **Các bước thực hiện:** Gửi `DELETE /api/patient-profiles/102`.
* **Kết quả mong đợi:**
  * Mã HTTP: `200 OK`
  * Bản ghi trong CSDL `patient_profiles` **không bị mất**, cột `deleted_at` được gán timestamp hiện tại.
  * Khi gọi `GET /api/patient-profiles`, hồ sơ ID `102` không còn xuất hiện trong danh sách.

---

#### `TC-E17-03`: Khôi phục hồ sơ đã xóa mềm (Restore API)
* **Mục tiêu:** Cho phép người dùng lấy lại hồ sơ đã xóa mềm trước đó.
* **Tiền điều kiện:** Hồ sơ ID `102` đang có `deleted_at != NULL`.
* **Các bước thực hiện:** Gửi `POST /api/patient-profiles/102/restore`.
* **Kết quả mong đợi:**
  * Mã HTTP: `200 OK`
  * Trong CSDL: `deleted_at` trở về `NULL`.
  * Hồ sơ xuất hiện trở lại trên danh sách hồ sơ người dùng.

---

#### `TC-E17-04`: Xóa cứng khi hồ sơ chưa từng phát sinh lượt đặt lịch nào
* **Mục tiêu:** Làm sạch CSDL đối với hồ sơ rác chưa từng sử dụng, nhưng bảo lưu bằng chứng pháp lý.
* **Tiền điều kiện:** Hồ sơ ID `103` vừa tạo, chưa từng có lượt khám nào, có 1 bản ghi `patient_consents` (ID `501`).
* **Các bước thực hiện:** Gửi `DELETE /api/patient-profiles/103`.
* **Kết quả mong đợi:**
  * Mã HTTP: `200 OK`
  * Bản ghi ID `103` **bị xóa vĩnh viễn** khỏi bảng `patient_profiles`.
  * Bản ghi `patient_consents` (ID `501`) **vẫn còn nguyên 100%** trong CSDL phục vụ đối soát thanh tra (không bị xóa theo kiểu CASCADE).

---

### 2.3. Nhóm kịch bản biên & giới hạn (Edge Cases)

#### `TC-PRF-EDGE-01`: Chặn tạo hồ sơ thứ 11 trong một tài khoản
* **Mục tiêu:** Kiểm tra cấu hình `max_profiles_per_user = 10`.
* **Tài khoản test:** `patient.max10@medsi.vn` (đã có 10 hồ sơ).
* **Các bước thực hiện:** Gửi `POST /api/patient-profiles` để thêm hồ sơ mới.
* **Kết quả mong đợi:** Lỗi `422 Unprocessable Entity`, thông báo: *"Mỗi tài khoản chỉ được quản lý tối đa 10 hồ sơ người bệnh."*

---

#### `TC-PRF-EDGE-02`: Trùng số CCCD giữa 2 hồ sơ trong cùng tài khoản
* **Mục tiêu:** Một người dùng không được nhập trùng số CCCD cho 2 người khác nhau trong cùng 1 tài khoản.
* **Dữ liệu đầu vào:** Tạo hồ sơ mới với số CCCD đã có trong hồ sơ cũ của tài khoản đó.
* **Kết quả mong đợi:** Lỗi `422 Unprocessable Entity` tại trường `identity_card_number`.

---

#### `TC-PRF-EDGE-03`: Tự động chuyển đổi hồ sơ mặc định (`is_default`)
* **Mục tiêu:** Một tài khoản luôn chỉ có đúng 1 hồ sơ `is_default = true`.
* **Các bước thực hiện:** Cập nhật hồ sơ B thành `is_default = true`.
* **Kết quả mong đợi:** Hồ sơ B trở thành `is_default = true`, hồ sơ A (vốn là mặc định trước đó) tự động chuyển thành `is_default = false`.

---

## 3. HƯỚNG DẪN THỰC HIỆN KIỂM THỬ (TESTING GUIDE)

### Cách 1: Chạy kiểm thử tự động bằng PHPUnit (Nhanh & Chuẩn xác nhất)

Mở terminal tại thư mục backend và chạy các lệnh kiểm thử tự động tương ứng:

```bash
cd web/project/Main-Project-IS207/backend

# 1. Chạy toàn bộ test E15 (Hồ sơ trẻ em, Người giám hộ, Consent & Masking)
php artisan test --filter=E15_ChildProfileAndConsentTest

# 2. Chạy toàn bộ test E17 (Chính sách xóa 3 trường hợp & Khôi phục)
php artisan test --filter=E17_ProfileDeletionPolicyTest

# 3. Chạy tổng hợp cả 2 bộ test nghiệm thu
php artisan test tests/Feature/E2E/
```

---

### Cách 2: Kiểm thử thủ công qua API (cURL hoặc Postman)

#### Bước 1: Đăng nhập lấy Bearer Token
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"patient.e15@medsi.vn","password":"Password@123"}'
```

#### Bước 2: Gọi API tạo hồ sơ trẻ em (Test E15)
```bash
curl -X POST http://localhost:8000/api/patient-profiles \
  -H "Authorization: Bearer <TOKEN_O_BUOC_1>" \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Nguyễn Văn Bé",
    "dob": "2018-05-10",
    "gender": "male",
    "relationship": "Con",
    "identity_card_number": "001099123456",
    "phone": "0912345678",
    "health_insurance_code": "DN4010123456789",
    "guardian_name": "Nguyễn Văn Cha",
    "guardian_phone": "0901234567",
    "guardian_relationship": "Cha",
    "consent_agreed": true
  }'
```

#### Bước 3: Gọi API xem hồ sơ che mờ
```bash
curl -X GET http://localhost:8000/api/patient-profiles/1 \
  -H "Authorization: Bearer <TOKEN_O_BUOC_1>"
```

#### Bước 4: Gọi API xóa hồ sơ (Test E17)
```bash
curl -X DELETE http://localhost:8000/api/patient-profiles/101 \
  -H "Authorization: Bearer <TOKEN_O_BUOC_1>"
```

---

### Cách 3: Kiểm tra trực tiếp trong Cơ sở dữ liệu MySQL

Sau khi thực hiện test API hoặc giao diện, bạn chạy các câu lệnh SQL dưới đây để đối soát dữ liệu thực tế:

```sql
-- 1. Kiểm tra hồ sơ bị xóa mềm (cột deleted_at có timestamp)
SELECT id, fullname, dob, is_default, deleted_at 
FROM patient_profiles 
WHERE user_id = 2;

-- 2. Kiểm tra bản ghi đồng thuận (vẫn bảo lưu ngay cả khi hồ sơ bị xóa cứng)
SELECT id, user_id, patient_profile_id, policy_version, agreed_at, revoked_at 
FROM patient_consents 
WHERE user_id = 2;

-- 3. Kiểm tra tính duy nhất của hồ sơ mặc định trong tài khoản
SELECT user_id, count(*) as default_count 
FROM patient_profiles 
WHERE is_default = 1 AND deleted_at IS NULL 
GROUP BY user_id;
```

---

*Tài liệu được lưu trữ tại:* `d:\KnowledgeLibrary\web\project\sprint 4\05_Bo_Test_Case_Va_Huong_Dan_Kiem_Thu_E15_E17.md`.
