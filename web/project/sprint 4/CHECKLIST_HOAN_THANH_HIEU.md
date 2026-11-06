# Bảng Checklist Kiểm Tra Tiến Độ & Mức Độ Hoàn Thành — Hiệu (Sprint 4)

> **Dự án:** MedSi — Nền tảng đặt lịch khám bệnh trực tuyến  
> **Người thực hiện:** **Hiệu**  
> **Căn cứ đối soát:** 
> 1. `Sprint_4_requirement.pdf` (Mục 4.4 Hiệu, trang 5)
> 2. `03._ERD_v1.1.pdf` (Mục 4.2, 4.3, 5, 6)
> 3. `Ti_liu_thng_nht_cho_sprint_3.pdf` (Tài liệu thống nhất baseline v1.0, DL-01 đến DL-26, Mục 3, 4, 7, 8)
> 
> **Mã công việc:** `S4-03`, `S4-20`, `S4-21`, `S4-22`, `S4-23`, `S4-24`, `S4-25`  
> **Kịch bản nghiệm thu:** `E15`, `E17`  
> **Trạng thái tổng thể:** **100% HOÀN THÀNH (Đã kiểm tra, commit & push lên GitHub)**

---

## 1. Checklist Chi Tiết Từng Hạng Mục

### Phần 1: Model Eloquent & Xóa Mềm SoftDeletes (Mã: `S4-03`)
*Căn cứ: Mục 4.4.(a) `Sprint_4_requirement.pdf` & Mục 4.2 `03._ERD_v1.1.pdf`.*

- [x] **Model `PatientProfile`** (`backend/app/Models/PatientProfile.php`):
  - [x] Tích hợp trait `SoftDeletes` trên cột `deleted_at`.
  - [x] Thiết lập quan hệ `user()`: `belongsTo(User::class)`.
  - [x] Thiết lập quan hệ `bookings()`: `hasMany(Booking::class)`.
  - [x] Thiết lập quan hệ `consents()`: `hasMany(PatientConsent::class)`.
  - [x] Khai báo đầy đủ `$fillable` và `$casts` (`dob` là date, `is_default` là boolean, `deleted_at` là datetime).
  - [x] Bổ sung phương thức `makePatientSnapshot()` trích xuất snapshot đã che mờ.
- [x] **Model `PatientConsent`** (`backend/app/Models/PatientConsent.php`):
  - [x] Thiết lập quan hệ `user()`: `belongsTo(User::class)`.
  - [x] Thiết lập quan hệ `profile()`: `belongsTo(PatientProfile::class)->withTrashed()`.
  - [x] Khai báo các cột: `user_id`, `patient_profile_id`, `policy_version`, `is_agreed`, `agreed_at`, `ip_address`, `user_agent`, `revoked_at`.
  - [x] Đảm bảo cấu trúc không ràng buộc khóa ngoại cứng (không có FK CASCADE) để bảo lưu bằng chứng pháp lý khi profile bị xóa.
- [x] **Cấu hình SoftDeletes cho 4 bảng theo đúng quy chuẩn ERD v1.1:**
  - [x] `patient_profiles` (Hồ sơ người khám)
  - [x] `doctors` (Bác sĩ)
  - [x] `hospitals` (Cơ sở y tế)
  - [x] `exam_types` (Loại gói khám)
- [x] **Bổ sung quan hệ trên các Model liên quan:**
  - [x] `User.php`: Thêm `patientProfiles()`, `patientConsents()`, `bookings()`, `hospital()`.
  - [x] `Booking.php`: Thêm `patientProfile()`, `user()`, `slot()`, `doctor()`, `hospital()`, `examType()`, `payment()`, `ticket()`, `refunds()`.
  - [x] `Slot.php`: Thêm `specialty()`, `bookings()`.

---

### Phần 2: Hệ Thống 14 Model Factories (Mã: `S4-03`)
*Căn cứ: Mục 4.4.(a) `Sprint_4_requirement.pdf` & `medsi_schema_v1.sql`.*

- [x] `UserFactory.php`: Hỗ trợ sinh user bệnh nhân, bác sĩ (`doctor()`), nhân viên (`staff()`), quản trị (`admin()`).
- [x] `PatientProfileFactory.php`: Sinh họ tên, CCCD, BHYT, SĐT, quan hệ, hỗ trợ state `child()` (< 16 tuổi có người giám hộ) và `defaultProfile()`.
- [x] `PatientConsentFactory.php`: Sinh bản ghi đồng ý điều khoản với IP, User Agent, `policy_version = 'v1.0'`.
- [x] `SpecialtyFactory.php`: Sinh 14 chuyên khoa với mã `code` dạng `CK01`, `CK02`, `CK03` (Tim mạch) và slug unique.
- [x] `HospitalFactory.php`: Sinh cơ sở y tế với tên, địa chỉ, `city = 'Thành phố Hồ Chí Minh'`, tọa độ lat/lng và hotline.
- [x] `DoctorFactory.php`: Sinh bác sĩ gắn với chuyên khoa, cơ sở, title, kinh nghiệm, phí khám 200.000đ.
- [x] `ExamTypeFactory.php`: Sinh gói khám gắn viện & chuyên khoa, giá tiền 200.000đ.
- [x] `SlotFactory.php`: Sinh slot đa hình cho bác sĩ (30 phút, capacity 1) và bệnh viện (theo ca, capacity 20).
- [x] `BookingFactory.php`: Sinh lượt đặt khám với 9 trạng thái chuẩn, mã code unique, và snapshot bệnh nhân JSON đã che mờ.
- [x] `TicketFactory.php`: Sinh phiếu khám điện tử có mã `ticket_code`, số thứ tự `queue_seq` theo `queue_scope`, `qr_token` JWT.
- [x] `PaymentFactory.php`: Sinh hóa đơn thanh toán chuẩn: tiền khám 200.000đ, phí tiện ích 20.000đ, tổng tiền 220.000đ.
- [x] `PaymentTransactionFactory.php`: Sinh giao dịch thanh toán thành công với mã `transaction_code` unique, nguồn gateway.
- [x] `RefundFactory.php`: Sinh yêu cầu hoàn tiền gắn với chính sách (`doctor_rejected`, `early_cancel`...).
- [x] `AuditLogFactory.php`: Sinh nhật ký kiểm toán với mã sự kiện AU-01 đến AU-20, IP, metadata JSON (Insert-only).

---

### Phần 3: CRUD Hồ Sơ Bệnh Nhân (Mã: `S4-20`)
*Căn cứ: Mục 4.4.(b) `Sprint_4_requirement.pdf` & Mục 4.2 `03._ERD_v1.1.pdf`.*

- [x] **Giới hạn số lượng:** Mỗi tài khoản (`user_id`) chỉ được phép tạo tối đa **10 hồ sơ** (`config('medsi.max_profiles_per_user', 10)`).
- [x] **Hồ sơ mặc định (`is_default`):**
  - [x] Mỗi tài khoản chỉ có duy nhất 1 hồ sơ mặc định.
  - [x] Tạo hồ sơ đầu tiên tự động thành mặc định.
  - [x] Khi cập nhật một hồ sơ thành mặc định, tự động gỡ cờ mặc định ở toàn bộ hồ sơ khác của tài khoản đó.
- [x] **Danh mục giá trị mối quan hệ (`relationship`):**
  - [x] Ràng buộc chặt chẽ trong danh sách: `['Bản thân', 'Cha', 'Mẹ', 'Con', 'Vợ', 'Chồng', 'Khác']` theo đúng quy định trang 4 của `03._ERD_v1.1.pdf`.
- [x] **Chống trùng lặp CCCD:**
  - [x] Kiểm tra unique `(user_id, identity_card_number)` trong cùng tài khoản.
  - [x] Cho phép nhiều giá trị `NULL` (trẻ nhỏ chưa làm CCCD không bị báo trùng).
- [x] **Đơn giản hóa thủ tục:**
  - [x] Bỏ OTP khi tạo hồ sơ (theo CF-51, sửa `BR-PRF-03`).
  - [x] Số điện thoại (`phone`) và CCCD là tùy chọn (`nullable`).

---

### Phần 4: Xác Thực Người Giám Hộ Khi Dưới 16 Tuổi (Mã: `S4-21`)
*Căn cứ: Mục 4.4.(d) `Sprint_4_requirement.pdf` & Điều 1 Luật Trẻ em 2016.*

- [x] **Căn cứ pháp lý:** Điều 1, Luật Trẻ em số 102/2016/QH13 (*"Trẻ em là người dưới 16 tuổi"*).
- [x] **Cấu hình ngưỡng tuổi:** Đọc từ `config('medsi.guardian_age_threshold', 16)`.
- [x] **Kiểm tra tự động theo ngày sinh:**
  - [x] Nếu `tuổi < 16`: Bắt buộc phải có đủ 3 trường `guardian_name`, `guardian_phone`, `guardian_relationship`.
  - [x] Nếu thiếu một trong 3 trường: Trả về lỗi validation HTTP 422 Unprocessable Entity kèm thông báo tiếng Việt rõ ràng.

---

### Phần 5: Bằng Chứng Đồng Thuận & Rút Đồng Ý (Mã: `S4-22`)
*Căn cứ: Mục 4.4.(c) `Sprint_4_requirement.pdf` & Mục 4.3 `03._ERD_v1.1.pdf`.*

- [x] **Bắt buộc đồng thuận:**
  - [x] Người dùng bắt buộc phải tick xác nhận đồng ý điều khoản (`consent_agreed = true`) trước khi lưu hồ sơ. Nếu chưa tick $\rightarrow$ Chặn với lỗi validation 422.
- [x] **Ghi nhận bằng chứng:**
  - [x] Tự động tạo 1 bản ghi trong bảng `patient_consents` ngay khi tạo hồ sơ: lưu `policy_version`, IP, User Agent, `agreed_at = now()`.
- [x] **Hỗ trợ rút đồng ý (Consent Revocation):**
  - [x] Cung cấp hàm `revokeConsent()` và endpoint `POST /api/patient-profiles/{id}/revoke-consent`.
  - [x] Cập nhật thời điểm `revoked_at = now()`, **tuyệt đối không xoá bản ghi** để lưu vết kiểm toán theo đúng quy định `03._ERD_v1.1.pdf` trang 6.
- [x] **Bảo lưu bằng chứng:** Không dùng khóa ngoại cứng để dù hồ sơ có bị xóa cứng thì bằng chứng pháp lý vẫn tồn tại nguyên vẹn.

---

### Phần 6: Che Mờ Dữ Liệu Nhạy Cảm (Mã: `S4-23`)
*Căn cứ: Mục 4.4.(d) `Sprint_4_requirement.pdf` & Mục 4.2 `03._ERD_v1.1.pdf`.*

- [x] **Triển khai tại `DataMasker.php` & `PatientProfileResource.php`:**
  - [x] **Che mờ CCCD (`identity_card_number`):** Giữ 6 số đầu, 2 số cuối, che ở giữa bằng `****` (ví dụ `001099****56`).
  - [x] **Che mờ SĐT (`phone`, `guardian_phone`):** Giữ 3 số đầu, 2 số cuối, che ở giữa bằng `*****` (ví dụ `091*****78`).
  - [x] **Che mờ BHYT (`health_insurance_code`):** Giữ 5 ký tự đầu, 2 số cuối, che ở giữa bằng `*****` (ví dụ `DN401*****89`).
  - [x] **Quyền xem rõ của chủ sở hữu:** Khi chủ sở hữu xem hồ sơ ở chế độ chỉnh sửa (`?mode=edit` hoặc `for_edit=1`), API trả về dữ liệu nguyên bản để chỉnh sửa.

---

### Phần 7: Bản Chụp Thông Tin Bệnh Nhân (Mã: `S4-24`)
*Căn cứ: Mục 4.4.(f) `Sprint_4_requirement.pdf` & `03._ERD_v1.1.pdf`.*

- [x] **Hàm `makePatientSnapshot(profile)`:**
  - [x] Đã tích hợp cả trên Model `PatientProfile` và trong `PatientProfileService`.
  - [x] Trả về mảng JSON cố định (immutable) chứa đầy đủ thông tin bệnh nhân đã được che mờ tại thời điểm đặt lịch.
  - [x] Sẵn sàng để Hoài Bảo (luồng bác sĩ) và Tuấn Anh (luồng bệnh viện) gọi để điền vào cột `bookings.patient_snapshot`.

---

### Phần 8: Chính Sách Xóa Hồ Sơ & Khôi Phục (Mã: `S4-25`)
*Căn cứ: Mục 4.4.(e) `Sprint_4_requirement.pdf` & Quyết định DL-14 `Ti_liu_thng_nht_cho_sprint_3.pdf`.*

- [x] **Trường hợp 1 (Có lịch chờ):**
  - [x] Kiểm tra các trạng thái lịch: `pending_payment`, `pending_approval`, `confirmed`, `checked_in`.
  - [x] Chặn xóa ngay lập tức và trả về mã lỗi nghiệp vụ chuẩn **`EX-PRF-06`** thông qua `ProfileDeletionBlockedException`.
- [x] **Trường hợp 2 (Đã có lịch sử khám):**
  - [x] Hồ sơ từng có lịch trong quá khứ (`completed`, `cancelled`, `expired`, `rejected`, `no_show`).
  - [x] Thực hiện **xóa mềm (Soft Delete)**: gán timestamp vào cột `deleted_at`, hồ sơ được chuyển sang trạng thái lưu trữ (`ARCHIVED`).
- [x] **Trường hợp 3 (Chưa từng đặt lịch):**
  - [x] Tổng số lịch khám = 0.
  - [x] Thực hiện **xóa cứng (Hard Delete)**: gọi `$profile->forceDelete()`. Bản ghi trong `patient_consents` và `audit_logs` **vẫn được bảo lưu trọn vẹn**.
- [x] **Khôi phục hồ sơ đã xóa mềm (Restore):**
  - [x] Cung cấp hàm `restoreProfile()` và API `POST /api/patient-profiles/{id}/restore` giúp khôi phục hồ sơ đã lưu trữ mềm.

---

### Phần 9: Kịch Bản Nghiệm Thu Tự Động E2E (E15 & E17)
*Căn cứ: Mục 2 bảng E2E trong `Sprint_4_requirement.pdf`.*

- [x] **Test `E15`** (`backend/tests/Feature/E2E/E15_ChildProfileAndConsentTest.php`):
  - [x] Thử tạo hồ sơ trẻ em < 16 tuổi không có giám hộ $\rightarrow$ Assert lỗi 422 (`guardian_name`, `guardian_phone`, `guardian_relationship`).
  - [x] Thử tạo hồ sơ không có consent $\rightarrow$ Assert lỗi 422 (`consent_agreed`).
  - [x] Tạo hồ sơ hợp lệ $\rightarrow$ Assert status 201.
  - [x] Assert CSDL có đúng 1 bản ghi consent trong `patient_consents`.
  - [x] Assert response trả về đã che mờ CCCD, BHYT, SĐT.
  - [x] Assert hàm `makePatientSnapshot()` hoạt động chuẩn xác.
- [x] **Test `E17`** (`backend/tests/Feature/E2E/E17_ProfileDeletionPolicyTest.php`):
  - [x] Xóa hồ sơ có lịch chờ $\rightarrow$ Assert lỗi 400 kèm mã lỗi `EX-PRF-06`, hồ sơ không bị xóa.
  - [x] Xóa hồ sơ có lịch sử cũ $\rightarrow$ Assert `assertSoftDeleted('patient_profiles')`.
  - [x] Test gọi API `restore` $\rightarrow$ Assert hồ sơ được khôi phục (`deleted_at = NULL`).
  - [x] Xóa hồ sơ chưa từng đặt lịch $\rightarrow$ Assert `assertDatabaseMissing('patient_profiles')`, đồng thời `assertDatabaseHas('patient_consents')` vẫn còn nguyên vẹn.

---

### Phần 10: Tài Liệu Đặc Tả & Căn Cứ Pháp Lý
*Căn cứ: Mục 4.4 phần Việc tài liệu trong `Sprint_4_requirement.pdf`.*

- [x] Bộ 5 tài liệu markdown chi tiết tại `KnowledgeLibrary/web/project/sprint 4/`:
  - [x] `README.md`: Tổng quan phân công, sơ đồ luồng, WBS, mục lục.
  - [x] `01_Model_Eloquent_Va_14_Factories.md`: Đặc tả 14 Models & 14 Factories.
  - [x] `02_Quan_Ly_Ho_So_Va_Dong_Thuan.md`: CRUD hồ sơ, Enum quan hệ, Giám hộ < 16 tuổi, Consent & Rút đồng ý.
  - [x] `03_Masking_Snapshot_Va_Chinh_Sach_Xoa.md`: Che mờ CCCD/BHYT/SĐT, hàm `makePatientSnapshot`, chính sách xóa 3 trường hợp và khôi phục.
  - [x] `04_Kich_Ban_Kiem_Thu_E2E_E15_E17.md`: Kịch bản và code kiểm thử tự động E15, E17.
  - [x] `CHECKLIST_HOAN_THANH_HIEU.md`: File checklist đối soát toàn diện này.
- [x] Dẫn chứng đầy đủ căn cứ pháp lý:
  - [x] **Luật Trẻ em số 102/2016/QH13 (Điều 1):** Định nghĩa người dưới 16 tuổi là trẻ em.
  - [x] **Luật Khám bệnh, chữa bệnh số 15/2023/QH15 (Điều 69):** Quy định thời hạn lưu trữ hồ sơ y tế tối thiểu 10 năm – 20 năm.
  - [x] **Nghị định 13/2023/NĐ-CP:** Quy định về bảo vệ dữ liệu cá nhân y tế.
  - [x] Chuẩn hóa các quy tắc: CF-06 (`deleted_at`), CF-09 (bỏ `district_id`), CF-11 (Masking), CF-47 (trạng thái STM), CF-51 (bỏ OTP `BR-PRF-03`).

---

### Phần 11: Trạng Thái Git & Nhánh Push Lên GitHub
*Căn cứ: Mục 8 Quy trình trong `Ti_liu_thng_nht_cho_sprint_3.pdf`.*

- [x] **Repository chính:** [`https://github.com/th4nhc0n999/Main-Project-IS207`](https://github.com/th4nhc0n999/Main-Project-IS207)
  - [x] Nhánh `feature/user-profile`: Đã commit và push (`Commit 77c7694`).
  - [x] Nhánh chuẩn quy trình `s4/profile-hieu`: Đã commit và push theo đúng quy ước `s4/<luồng>-<tên>` tại Mục 8 của baseline sprint 3.
- [x] **Repository tài liệu:** [`https://github.com/snowflake-vibing/KnowledgeLibrary`](https://github.com/snowflake-vibing/KnowledgeLibrary)
  - [x] Nhánh `main`: Đã commit và push toàn bộ tài liệu Sprint 4 (`Commit dd9c3ec`).

---

## 2. Bảng Tổng Hợp Trạng Thái Các File Của Hiệu

| Tên File | Đường dẫn | Trạng thái | Ghi chú |
|---|---|:---:|---|
| `PatientProfile.php` | `backend/app/Models/PatientProfile.php` | **XONG** | SoftDeletes, quan hệ, `makePatientSnapshot()`. |
| `PatientConsent.php` | `backend/app/Models/PatientConsent.php` | **XONG** | Không FK cứng, lưu IP, UserAgent, `revoked_at`. |
| 14 Model Factories | `backend/database/factories/*Factory.php` | **XONG** | Đủ 14 file Factory theo schema v1.1. |
| `DataMasker.php` | `backend/app/Support/DataMasker.php` | **XONG** | Che mờ CCCD, SĐT, BHYT. |
| `PatientProfileResource.php` | `backend/app/Http/Resources/PatientProfileResource.php` | **XONG** | Che mờ khi trả API, mở khi `mode=edit`. |
| `StorePatientProfileRequest.php`| `backend/app/Http/Requests/Profile/...` | **XONG** | Validate enum quan hệ, giám hộ < 16, consent. |
| `UpdatePatientProfileRequest.php`| `backend/app/Http/Requests/Profile/...` | **XONG** | Validate phân quyền, enum quan hệ, giám hộ. |
| `ProfileDeletionBlockedException.php`| `backend/app/Exceptions/Profile/...` | **XONG** | Trả mã lỗi `EX-PRF-06`. |
| `PatientProfileService.php` | `backend/app/Services/PatientProfileService.php` | **XONG** | Giới hạn 10 hồ sơ, 1 mặc định, xóa 3 ca, restore, revokeConsent. |
| `PatientProfileController.php` | `backend/app/Http/Controllers/Api/...` | **XONG** | Đủ RESTful API + `restore` + `revokeConsent`. |
| `api.php` | `backend/routes/api.php` | **XONG** | Đăng ký đầy đủ routes với `auth:sanctum`. |
| `E15_ChildProfileAndConsentTest.php`| `backend/tests/Feature/E2E/...` | **XONG** | Test tự động kịch bản E15. |
| `E17_ProfileDeletionPolicyTest.php`| `backend/tests/Feature/E2E/...` | **XONG** | Test tự động kịch bản E17 & khôi phục. |
| Bộ tài liệu Sprint 4 | `web/project/sprint 4/*.md` | **XONG** | Đủ 5 file md đặc tả + file checklist này. |
