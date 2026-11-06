# Phân Hệ 02: CRUD Hồ Sơ Bệnh Nhân, Người Giám Hộ & Bằng Chứng Đồng Thuận (Mã Task: S4-20, S4-21, S4-22)

> **Căn cứ tài liệu:** `Sprint_4_requirement.pdf` (Mục 4.4.b, 4.4.c, 4.4.d) & `03._ERD_v1.1.pdf` (Mục 4.2, 4.3)  
> **Người thực hiện:** Hiệu  
> **Nhiệm vụ:** Xây dựng logic API & Service quản lý hồ sơ người khám (`patient_profiles`), xác thực thông tin người giám hộ khi dưới 16 tuổi và ghi nhận bằng chứng đồng ý điều khoản (`patient_consents`), hỗ trợ rút đồng ý.

---

## 1. Nghiệp vụ Quản lý Hồ sơ (`patient_profiles` — S4-20)

### 1.1. Các quy tắc nghiệp vụ bắt buộc (Business Rules)
1. **Giới hạn số lượng:** Mỗi tài khoản (`user_id`) chỉ được phép tạo tối đa **10 hồ sơ** (theo quy định DL-06, CF-43).
2. **Quy tắc hồ sơ mặc định (`is_default`):**
   * Mỗi tài khoản chỉ có duy nhất **1 hồ sơ mặc định** (`is_default = 1`) dùng để điền nhanh khi đặt lịch.
   * Tạo hồ sơ đầu tiên tự động thành mặc định.
   * Khi cập nhật 1 hồ sơ thành mặc định, hệ thống tự động gỡ cờ mặc định ở tất cả các hồ sơ còn lại của user đó.
3. **Danh mục giá trị mối quan hệ (`relationship`):**
   * Theo trang 4 của `03._ERD_v1.1.pdf`, quan hệ với chủ tài khoản bắt buộc thuộc danh sách cố định:
     `['Bản thân', 'Cha', 'Mẹ', 'Con', 'Vợ', 'Chồng', 'Khác']`.
4. **Chống trùng lặp định danh:**
   * Cột `identity_card_number` (CCCD/Định danh) được ràng buộc `UNIQUE (user_id, identity_card_number)`.
   * Một tài khoản không được tạo 2 hồ sơ trùng số CCCD.
   * Nếu CCCD là `NULL` (ví dụ trẻ nhỏ chưa làm CCCD), MySQL cho phép nhiều bản ghi `NULL` mà không vi phạm unique.
5. **Quy định đơn giản hóa:**
   * Bỏ hoàn toàn xác thực OTP khi thêm hồ sơ (theo CF-51, sửa `BR-PRF-03`).
   * Số điện thoại (`phone`) và CCCD là tùy chọn (`nullable`).

---

## 2. Xác thực Người Giám Hộ (Guardian Validation — S4-21)

* **Căn cứ pháp lý:** **Điều 1, Luật Trẻ em số 102/2016/QH13** quy định: *"Trẻ em là người dưới 16 tuổi."*
* **Ngưỡng tuổi hệ thống:** Đọc từ file cấu hình:
  ```php
  $threshold = (int) config('medsi.guardian_age_threshold', 16);
  ```
* **Quy tắc kiểm tra:**
  * Tính tuổi dựa trên ngày sinh (`dob`) so với thời điểm hiện tại (`Carbon::parse($dob)->age`).
  * Nếu `tuổi < threshold`: Bắt buộc phải có đủ 3 trường thông tin:
    * `guardian_name`: Họ tên người giám hộ (chuỗi, tối đa 150 ký tự).
    * `guardian_phone`: Số điện thoại người giám hộ (chuỗi, định dạng số điện thoại Việt Nam).
    * `guardian_relationship`: Mối quan hệ của người giám hộ với người được khám.
  * Nếu thiếu một trong 3 trường trên, hệ thống trả về mã lỗi HTTP 422 Unprocessable Entity.

---

## 3. Quản lý Bằng chứng Đồng thuận & Rút Đồng ý (`patient_consents` — S4-22)

* **Bắt buộc đồng thuận trước khi lưu:** Khi tạo mới hồ sơ bệnh nhân, người dùng bắt buộc phải tick xác nhận đồng ý các điều khoản và chính sách xử lý dữ liệu y tế (`is_agreed = true`).
* **Lưu vết pháp lý:** Bản ghi đồng thuận được ghi vào bảng `patient_consents` với các thông tin:
  * `user_id`: ID của tài khoản đang thao tác.
  * `patient_profile_id`: ID của hồ sơ bệnh nhân vừa tạo.
  * `policy_version`: Phiên bản điều khoản hiện hành (`v1.0`).
  * `is_agreed`: Giá trị `true` (1).
  * `agreed_at`: Thời điểm xác nhận (`now()`).
  * `ip_address`: Địa chỉ IP của client gọi API.
  * `user_agent`: Thông tin trình duyệt/thiết bị lúc đồng ý.
  * `revoked_at`: Mặc định `NULL`.
* **Hỗ trợ rút đồng ý (Consent Revocation):**
  * Theo `03._ERD_v1.1.pdf` trang 6: Khi người dùng muốn rút lại sự đồng ý xử lý dữ liệu cho một hồ sơ, hệ thống cập nhật cột `revoked_at = now()`, **tuyệt đối không xoá bản ghi** để lưu trữ vết kiểm toán.
  * API hỗ trợ: `POST /api/patient-profiles/{patient_profile}/revoke-consent`.
* **Bảo lưu bằng chứng:** Cố ý **không đặt khoá ngoại cứng** (`FK RESTRICT/CASCADE`) ở cột `patient_consents.patient_profile_id` để khi hồ sơ bệnh nhân bị xoá cứng thì bản ghi bằng chứng đồng ý vẫn tồn tại phục vụ pháp lý và đối soát.

---

## 4. Code Triển Khai Thực Tế

Đã triển khai hoàn chỉnh trong codebase Laravel:
* Form Request: [`StorePatientProfileRequest.php`](file:///d:/KnowledgeLibrary/web/project/Main-Project-IS207/backend/app/Http/Requests/Profile/StorePatientProfileRequest.php)
* Service: [`PatientProfileService.php`](file:///d:/KnowledgeLibrary/web/project/Main-Project-IS207/backend/app/Services/PatientProfileService.php)
* Controller: [`PatientProfileController.php`](file:///d:/KnowledgeLibrary/web/project/Main-Project-IS207/backend/app/Http/Controllers/Api/PatientProfileController.php)
