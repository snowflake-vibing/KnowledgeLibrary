# BẢNG CHECKLIST TỔNG HỢP TOÀN DIỆN: USER DASHBOARD, HỒ SƠ BỆNH NHÂN & TÀI LIỆU DOCX (SPRINT 4)

> **Dự án:** MedSi (YouMed Mini) — Nền tảng đặt lịch khám bệnh trực tuyến  
> **Người thực hiện:** **Hiệu**  
> **Vai trò:** Backend Developer (Core Patient Profiles, Privacy, Factories & Acceptance Tests)  
> **Tài liệu tích hợp:**
> 1. `user_profile_checklist.docx`: Phác thảo Checklist Hồ sơ User (User Dashboard UI/UX & Flow)
> 2. `Sprint_4_requirement.pdf` & `Ti_liu_thng_nht_cho_sprint_3.pdf`: Đặc tả miền & Yêu cầu kỹ thuật Sprint 4 (Mục 4.4 Hiệu, Quyết định DL-01 đến DL-26)
> 3. `03._ERD_v1.1.pdf` & `medsi_schema_v1.sql`: Chuẩn hóa Cơ sở dữ liệu v1.1
> 
> **Mã công việc:** `S4-03`, `S4-20`, `S4-21`, `S4-22`, `S4-23`, `S4-24`, `S4-25`  
> **Kịch bản nghiệm thu:** `E15`, `E17`  
> **Trạng thái:** **100% HOÀN THÀNH (Đã kiểm tra, commit & push lên GitHub)**

---

## PHẦN A. FRONTEND: MÀN HÌNH & TƯƠNG TÁC GIAO DIỆN (UI & UX)

### Màn hình 1: Quản lý Lịch khám bệnh
- [x] **Điều hướng & Tìm kiếm:**
  - [x] Sidebar menu navigation bên trái: Highlight tab active "Lịch khám".
  - [x] Thanh tìm kiếm top bar: Placeholder "Mã giao dịch, tên dịch vụ, tên bệnh nhân,...".
  - [x] Tự động debounce (300ms) khi nhập từ khóa tìm kiếm để lọc danh sách.
  - [x] Nút "Lọc" ở góc trên bên phải: Mở Popover/Modal chọn khoảng ngày khám và trạng thái.
- [x] **Bộ lọc theo 9 trạng thái STM chuẩn:**
  - [x] Tất cả, Chờ thanh toán (`pending_payment`), Chờ duyệt (`pending_approval`), Đã xác nhận (`confirmed`), Tiếp nhận (`checked_in`), Hoàn thành (`completed`), Đã hủy (`cancelled`), Hết hạn (`expired`), Bác sĩ từ chối (`rejected`), Không đến khám (`no_show`).
- [x] **Card hiển thị thông tin lịch hẹn:**
  - [x] Tên bác sĩ / Cơ sở y tế, Chuyên khoa, Ngày & Khung giờ khám.
  - [x] Số thứ tự khám (STT), Mã đặt khám (Booking Code).
  - [x] Badge màu sắc trực quan theo từng trạng thái lịch khám.
- [x] **Hành động & Tương tác:**
  - [x] Nút "Hủy lịch": Chỉ hiển thị/active khi lịch còn đủ điều kiện hủy. Click $\rightarrow$ Mở Modal xác nhận lý do hủy $\rightarrow$ Gọi API hủy $\rightarrow$ Hiển thị Toast thông báo & cập nhật UI.
- [x] **Xử lý các trạng thái giao diện:**
  - [x] *Empty state:* Hiển thị minh họa folder trống + Nhãn text "Lịch khám của bạn trống!".
  - [x] *Loading state:* Hiển thị Skeleton card trong lúc chờ API trả về.
  - [x] *Error state:* Hiển thị thông báo lỗi thân thiện kèm nút "Thử lại".

---

### Màn hình 2: Lịch sử Thanh toán & Giao dịch
- [x] **Điều hướng & Bộ lọc:**
  - [x] Sidebar navigation bên trái: Highlight tab active "Lịch sử thanh toán".
  - [x] Thanh tìm kiếm top bar: Lọc theo mã giao dịch, dịch vụ, ngày giờ thanh toán.
- [x] **Card hiển thị thông tin giao dịch:**
  - [x] Mã giao dịch (`transaction_code`), Tên dịch vụ / Gói khám / Bác sĩ.
  - [x] Số tiền khám, Phí tiện ích (20.000đ), Tổng số tiền (VNĐ).
  - [x] Phương thức thanh toán: QR Pay, ATM, Thẻ tín dụng, Thanh toán tại quầy (`store_pay`).
  - [x] Ngày giờ giao dịch, Badge trạng thái: Đã thanh toán (`paid`), Thất bại (`failed`), Đang chờ (`pending`), Đã hoàn tiền (`refunded`).
- [x] **Tương tác:**
  - [x] Click Card giao dịch $\rightarrow$ Mở Popup / Modal chi tiết hóa đơn biên nhận.
  - [x] Hiển thị chi tiết khoản hoàn tiền (nếu có yêu cầu hoàn).

---

### Màn hình 3: Quản lý Hồ sơ Bệnh nhân (Core Module của Hiệu)
- [x] **Cột bên trái (Danh sách hồ sơ bệnh nhân):**
  - [x] Ô nhập "Tìm nhanh hồ sơ" (lọc real-time).
  - [x] Danh sách Card hồ sơ: Avatar hình tròn chữ cái đầu, Họ và tên, Ngày sinh, Badge nhãn "Mặc định" (`is_default = 1`).
  - [x] Nút bấm "+ Thêm hồ sơ" ở góc dưới danh sách.
  - [x] Khống chế số lượng: Tối đa 10 hồ sơ / tài khoản (nếu đủ 10 hồ sơ thì disable nút thêm và hiển thị cảnh báo).
- [x] **Cột bên phải (Chi tiết hồ sơ bệnh nhân được chọn):**
  - [x] Header Hồ sơ: Avatar lớn, Họ tên bệnh nhân, ID hồ sơ, Quan hệ với chủ tài khoản.
  - [x] Khối "Thông tin cơ bản": Họ và tên, Ngày sinh, Giới tính, Số điện thoại (hiển thị che mờ: `091*****78`).
  - [x] Khối "Thông tin định danh": Số CCCD (hiển thị che mờ: `001099****56`), Mã BHYT (hiển thị che mờ: `DN401*****89`).
  - [x] Khối "Người giám hộ" (Tự động hiển thị khi bệnh nhân `< 16 tuổi`): Họ tên người giám hộ, Số điện thoại người giám hộ (che mờ: `090*****67`), Mối quan hệ với người giám hộ.
  - [x] Cờ đánh dấu hồ sơ mặc định: Toggle Switch "Đặt làm hồ sơ mặc định".
- [x] **Tương tác & Form thao tác:**
  - [x] *Thêm mới hồ sơ:* Mở Modal Form $\rightarrow$ Nhập thông tin $\rightarrow$ Nếu ngày sinh `< 16 tuổi` thì bắt buộc nhập thông tin người giám hộ $\rightarrow$ Bắt buộc tick checkbox "Tôi đồng ý với chính sách xử lý dữ liệu cá nhân & y tế" $\rightarrow$ Bấm Lưu $\rightarrow$ Gọi API `POST /api/patient-profiles`.
  - [x] *Chỉnh sửa thông tin:* Bấm "Thay đổi thông tin" $\rightarrow$ Mở Form sửa với query `?mode=edit` để hiển thị đầy đủ số CCCD/SĐT cho chủ sở hữu đối soát $\rightarrow$ Bấm Lưu $\rightarrow$ Gọi API `PUT /api/patient-profiles/{id}`.
  - [x] *Xóa hồ sơ:* Nút "Xóa hồ sơ" $\rightarrow$ Modal xác nhận cảnh báo:
    - Nếu có lịch đang chờ: Chặn xóa với thông báo lỗi mã `EX-PRF-06`.
    - Nếu có lịch sử cũ: Chuyển sang lưu trữ (xóa mềm).
    - Nếu chưa từng đặt: Xóa hoàn toàn (xóa cứng), bảo lưu bản ghi đồng thuận.
  - [x] *Khôi phục hồ sơ:* Nút "Khôi phục hồ sơ đã lưu trữ" gọi API `POST /api/patient-profiles/{id}/restore`.
  - [x] *Rút đồng ý điều khoản:* Nút "Rút đồng ý xử lý dữ liệu" gọi API `POST /api/patient-profiles/{id}/revoke-consent`.

---

### Màn hình 4: Tài khoản & Đổi mật khẩu
- [x] Form "Thay đổi mật khẩu": Mật khẩu hiện tại, Mật khẩu mới, Xác nhận mật khẩu mới.
- [x] Đăng xuất an toàn: Thu hồi token Sanctum, xóa token ở client.

---

## PHẦN B. BACKEND: CƠ SỞ DỮ LIỆU & ELOQUENT MODELS (Mã: `S4-03`)

### 1. Chuẩn hóa Schema & Ràng buộc CSDL (v1.1)
- [x] **Bảng `patient_profiles`:**
  - [x] `id` (BigInt, PK, tự tăng)
  - [x] `user_id` (FK trỏ `users.id` ON DELETE RESTRICT)
  - [x] `full_name` (VARCHAR 150)
  - [x] `dob` (DATE, ngày sinh)
  - [x] `gender` (ENUM: `male`, `female`, `other`)
  - [x] `phone` (VARCHAR 20, NULLABLE)
  - [x] `relationship` (VARCHAR 50, kiểm tra danh mục: `Bản thân`, `Cha`, `Mẹ`, `Con`, `Vợ`, `Chồng`, `Khác`)
  - [x] `identity_card_number` (VARCHAR 20, NULLABLE, Unique theo `(user_id, identity_card_number)`)
  - [x] `health_insurance_code` (VARCHAR 20, NULLABLE)
  - [x] `guardian_name` (VARCHAR 150, NULLABLE)
  - [x] `guardian_phone` (VARCHAR 20, NULLABLE)
  - [x] `guardian_relationship` (VARCHAR 50, NULLABLE)
  - [x] `is_default` (BOOLEAN, default 0)
  - [x] `deleted_at` (TIMESTAMP, NULLABLE — Cột lưu trữ / xóa mềm)
  - [x] `created_at`, `updated_at` (Timestamps)
- [x] **Bảng `patient_consents` (Bằng chứng đồng thuận dữ liệu y tế):**
  - [x] `id` (BigInt, PK, tự tăng)
  - [x] `user_id` (FK trỏ `users.id` ON DELETE RESTRICT)
  - [x] `patient_profile_id` (BigInt — Cố ý **không tạo khóa ngoại cứng** để bảo lưu bằng chứng khi profile bị xóa cứng)
  - [x] `policy_version` (VARCHAR 20, ví dụ `v1.0`)
  - [x] `is_agreed` (BOOLEAN)
  - [x] `agreed_at` (DATETIME)
  - [x] `ip_address` (VARCHAR 45, lưu IP kiểm toán)
  - [x] `user_agent` (TEXT, thông tin thiết bị/trình duyệt)
  - [x] `revoked_at` (DATETIME, NULLABLE — Thời điểm rút đồng ý, không xóa bản ghi)

### 2. Cấu hình Xóa mềm (SoftDeletes) trên 4 bảng
- [x] `patient_profiles` (Hồ sơ người khám)
- [x] `doctors` (Bác sĩ)
- [x] `hospitals` (Cơ sở y tế)
- [x] `exam_types` (Loại gói khám)
- [x] Các bảng còn lại tuyệt đối không xóa cứng (dùng `disabled` cho User, không xóa giao dịch/audit log).

### 3. Hệ thống 14 Model Factories
- [x] `UserFactory.php`: Sinh user đầy đủ các role (`patient`, `doctor`, `staff`, `admin`).
- [x] `PatientProfileFactory.php`: Hỗ trợ state `child()` (< 16t) và `defaultProfile()`.
- [x] `PatientConsentFactory.php`: Sinh bản ghi đồng ý với IP, User Agent, `policy_version`.
- [x] `SpecialtyFactory.php`: Sinh 14 chuyên khoa (mã `CK01`, `CK02`, `CK03` Tim mạch...).
- [x] `HospitalFactory.php`: Sinh bệnh viện, địa chỉ, `city = 'Thành phố Hồ Chí Minh'`, lat/lng, hotline.
- [x] `DoctorFactory.php`: Sinh bác sĩ gắn chuyên khoa, bệnh viện, phí khám 200.000đ.
- [x] `ExamTypeFactory.php`: Sinh gói khám gắn viện & chuyên khoa, giá 200.000đ.
- [x] `SlotFactory.php`: Sinh slot cho bác sĩ (30p, capacity 1) và bệnh viện (ca, capacity 20).
- [x] `BookingFactory.php`: Sinh booking với 9 trạng thái chuẩn, snapshot JSON đã che mờ.
- [x] `TicketFactory.php`: Sinh phiếu khám có `queue_seq` theo `queue_scope`, `qr_token` JWT.
- [x] `PaymentFactory.php`: Tiền khám 200.000đ, phí tiện ích 20.000đ, tổng tiền 220.000đ.
- [x] `PaymentTransactionFactory.php`: Sinh mã giao dịch unique, nguồn gateway.
- [x] `RefundFactory.php`: Sinh yêu cầu hoàn tiền theo chính sách (`doctor_rejected`, `early_cancel`...).
- [x] `AuditLogFactory.php`: Sinh nhật ký kiểm toán AU-01 đến AU-20 (Insert-only).

---

## PHẦN C. LOGIC NGHIỆP VỤ & ĐIỂM NGHẼN (BUSINESS RULES & S4-20..25)

- [x] **Logic 1: Giới hạn số lượng hồ sơ (Mã `S4-20`):**
  - [x] Mỗi tài khoản tối đa **10 hồ sơ** (`config('medsi.max_profiles_per_user', 10)`).
  - [x] Nếu đã có 10 hồ sơ mà cố tạo tiếp $\rightarrow$ Trả lỗi validation 422.
- [x] **Logic 2: Quy tắc 1 hồ sơ mặc định duy nhất (Mã `S4-20`):**
  - [x] Tạo hồ sơ đầu tiên tự động set `is_default = 1`.
  - [x] Khi cập nhật hồ sơ thành mặc định, tự động gỡ `is_default = 0` ở toàn bộ hồ sơ khác của user.
- [x] **Logic 3: Chống trùng lặp định danh (Mã `S4-20`):**
  - [x] Ràng buộc unique `(user_id, identity_card_number)`.
  - [x] Giá trị `NULL` được bỏ qua để trẻ em chưa có CCCD không bị lỗi trùng.
- [x] **Logic 4: Xác thực người giám hộ khi dưới 16 tuổi (Mã `S4-21`):**
  - [x] Căn cứ pháp lý: **Điều 1, Luật Trẻ em 2016** (người dưới 16 tuổi là trẻ em).
  - [x] Kiểm tra ngày sinh so với `config('medsi.guardian_age_threshold', 16)`.
  - [x] Nếu tuổi `< 16`: Bắt buộc đủ 3 trường `guardian_name`, `guardian_phone`, `guardian_relationship`. Thiếu bất kỳ trường nào $\rightarrow$ Chặn với lỗi 422.
- [x] **Logic 5: Ghi nhận & Rút đồng ý điều khoản dữ liệu (Mã `S4-22`):**
  - [x] Bắt buộc tick đồng ý điều khoản (`consent_agreed = true`) trước khi lưu hồ sơ.
  - [x] Tự động ghi 1 bản ghi vào `patient_consents` (lưu IP, User Agent, `policy_version`).
  - [x] Hỗ trợ rút đồng ý (`POST /api/patient-profiles/{id}/revoke-consent`): Cập nhật `revoked_at = now()`, không xóa bản ghi.
- [x] **Logic 6: Che mờ dữ liệu nhạy cảm (Data Masking — Mã `S4-23`):**
  - [x] Số CCCD: Che ở giữa `001099****56` (giữ 6 số đầu, 2 số cuối).
  - [x] Số điện thoại: Che ở giữa `091*****78` (giữ 3 số đầu, 2 số cuối).
  - [x] Mã BHYT: Che ở giữa `DN401*****89` (giữ 5 ký tự đầu, 2 số cuối).
  - [x] Ngoại lệ: Hiển thị nguyên văn khi chủ hồ sơ truy cập xem sửa (`?mode=edit`).
- [x] **Logic 7: Bản chụp thông tin bệnh nhân (Mã `S4-24`):**
  - [x] Cung cấp hàm `makePatientSnapshot(profile)` trên Model và Service.
  - [x] Trả về JSON chứa thông tin người bệnh đã được che mờ tại thời điểm đặt lịch.
  - [x] Phục vụ xuất dữ liệu cho Hoài Bảo (luồng bác sĩ) và Tuấn Anh (luồng bệnh viện) ghi vào `bookings.patient_snapshot`.
- [x] **Logic 8: Chính sách xóa hồ sơ 3 trường hợp & Khôi phục (Mã `S4-25`):**
  - [x] *Trường hợp 1 (Có lịch chờ):* Đang có lịch `pending_payment`, `pending_approval`, `confirmed`, `checked_in` $\rightarrow$ **Chặn xóa ngay lập tức** và trả về mã lỗi **`EX-PRF-06`**.
  - [x] *Trường hợp 2 (Đã từng có lịch sử khám):* Đã từng khám hoặc hủy lịch trong quá khứ $\rightarrow$ **Xóa mềm (Soft Delete)** gán timestamp `deleted_at`.
  - [x] *Trường hợp 3 (Chưa từng đặt lịch):* Tổng số booking = 0 $\rightarrow$ **Xóa cứng (Hard Delete)** khỏi bảng `patient_profiles`. Bản ghi `patient_consents` và `audit_logs` **vẫn được bảo lưu trọn vẹn**.
  - [x] *Khôi phục hồ sơ:* Cung cấp API `POST /api/patient-profiles/{id}/restore` giúp khôi phục hồ sơ đã lưu trữ mềm (`deleted_at = NULL`).

---

## PHẦN D. DANH SÁCH API ENDPOINTS HOÀN CHỈNH

Tất cả các API được bảo vệ bởi middleware `auth:sanctum`:

| Phương thức | URI | Tác vụ | Tham số / Body |
|---|---|---|---|
| `GET` | `/api/patient-profiles` | Lấy danh sách hồ sơ của user | Header Bearer Token |
| `GET` | `/api/patient-profiles/{id}` | Chi tiết 1 hồ sơ (đã che mờ) | Query `?mode=edit` để xem rõ |
| `POST` | `/api/patient-profiles` | Tạo mới hồ sơ + lưu consent | Họ tên, ngày sinh, giới tính, quan hệ, CCCD, SĐT, BHYT, người giám hộ, `consent_agreed: true` |
| `PUT` | `/api/patient-profiles/{id}` | Cập nhật hồ sơ bệnh nhân | Các trường cần cập nhật |
| `DELETE` | `/api/patient-profiles/{id}` | Xóa hồ sơ (xử lý 3 ca) | Chặn `EX-PRF-06`, xóa mềm hoặc xóa cứng |
| `POST` | `/api/patient-profiles/{id}/restore` | Khôi phục hồ sơ đã xóa mềm | Khôi phục `deleted_at = NULL` |
| `POST` | `/api/patient-profiles/{id}/revoke-consent`| Rút đồng ý xử lý dữ liệu | Cập nhật `revoked_at = now()` |

---

## PHẦN E. KIỂM THỬ TỰ ĐỘNG E2E (E15 & E17)

- [x] **Test `E15` (`backend/tests/Feature/E2E/E15_ChildProfileAndConsentTest.php`):**
  - [x] Bước 1: Lưu hồ sơ trẻ em < 16t thiếu người giám hộ $\rightarrow$ Assert lỗi 422.
  - [x] Bước 2: Lưu hồ sơ thiếu consent $\rightarrow$ Assert lỗi 422.
  - [x] Bước 3: Lưu hợp lệ $\rightarrow$ Assert HTTP 201.
  - [x] Bước 4: Assert có đúng 1 bản ghi consent trong DB.
  - [x] Bước 5: Assert response trả về đã che mờ CCCD, BHYT, SĐT.
  - [x] Bước 6: Assert hàm `makePatientSnapshot()` trích xuất snapshot chuẩn xác.
- [x] **Test `E17` (`backend/tests/Feature/E2E/E17_ProfileDeletionPolicyTest.php`):**
  - [x] Bước 1: Xóa hồ sơ có lịch chờ $\rightarrow$ Assert lỗi 400 kèm mã lỗi `EX-PRF-06`.
  - [x] Bước 2: Xóa hồ sơ có lịch sử cũ $\rightarrow$ Assert `assertSoftDeleted('patient_profiles')`.
  - [x] Bước 3: Thử khôi phục qua API restore $\rightarrow$ Assert hồ sơ hoạt động trở lại.
  - [x] Bước 4: Xóa hồ sơ chưa từng đặt lịch $\rightarrow$ Assert `assertDatabaseMissing('patient_profiles')` và `assertDatabaseHas('patient_consents')`.
- [x] **Bộ Test Case & Tài khoản thử nghiệm (Mới bổ sung):**
  - [x] Đã hoàn thành và đẩy lên tài liệu [**`05_Bo_Test_Case_Va_Huong_Dan_Kiem_Thu_E15_E17.md`**](05_Bo_Test_Case_Va_Huong_Dan_Kiem_Thu_E15_E17.md) (gồm 5 tài khoản test phân quyền, ma trận test case chi tiết cho E15, E17, các case biên và truy vấn SQL đối soát CSDL).

---

## PHẦN F. CĂN CỨ PHÁP LÝ & TÀI LIỆU MIỀN CỦA HIỆU

1. **Căn cứ Ngưỡng tuổi giám hộ 16 tuổi:** Điều 1, Luật Trẻ em số 102/2016/QH13 (*"Trẻ em là người dưới 16 tuổi"*).
2. **Căn cứ Thời hạn lưu trữ y tế:** Điều 69, Luật Khám bệnh, chữa bệnh số 15/2023/QH15 (lưu trữ hồ sơ y tế tối thiểu 10 năm - 20 năm) và Nghị định 13/2023/NĐ-CP (bảo vệ dữ liệu cá nhân).
3. **Quyết định thống nhất đã chuẩn hóa:**
   - Bỏ `district_id` (theo CF-09).
   - Dùng `deleted_at` cho xóa mềm (theo CF-06).
   - Che mờ dữ liệu nhạy cảm CCCD, BHYT, SĐT (theo CF-11).
   - Bỏ OTP khi tạo hồ sơ bệnh nhân (theo CF-51, `BR-PRF-03`).
   - Chuẩn hóa tên trạng thái lịch khám STM (theo CF-47, `BR-PRF-10`).

---

## PHẦN G. ĐỐI SOÁT & NHIỆM VỤ HOÀN THIỆN CÁC TÀI LIỆU WORD (DOCX) CỦA HIỆU

*Căn cứ: Mục 4.4 ("Việc tài liệu") trong `Sprint_4_requirement.pdf` và file `user_profile_checklist.docx`.*

- [x] **1. Đối soát và chuẩn hóa tệp `user_profile_checklist.docx`:**
  - [x] Rà soát cấu trúc cũ trong file Word phác thảo: Các tên cột cũ (`date_of_birth`, `national_id`, `bhyt_code`, `is_primary`) và cơ chế `ON DELETE CASCADE` đã được chuẩn hóa sang schema CSDL v1.1 (`dob`, `identity_card_number`, `health_insurance_code`, `is_default`, xóa mềm `deleted_at`).
  - [x] Bổ sung các luồng nghiệp vụ còn thiếu trong bản Word cũ: Ghi nhận bằng chứng đồng thuận `patient_consents`, xác thực người giám hộ khi dưới 16 tuổi, cơ chế che mờ dữ liệu nhạy cảm (Data Masking) và bản chụp bệnh nhân `makePatientSnapshot()`.
  - [x] Tích hợp toàn bộ 4 màn hình Dashboard của bản Word vào tài liệu `checklist.md` này để phục vụ phát triển đồng bộ giữa Frontend và Backend.
- [x] **2. Cập nhật tài liệu thiết kế dữ liệu `PRF_DD.docx`:**
  - [x] Bỏ cột `district_id` khỏi từ điển dữ liệu theo quyết định CF-09 (chỉ quản lý cấp tỉnh/thành phố `city`).
  - [x] Bổ sung định nghĩa cột `deleted_at` cho cơ chế lưu trữ mềm hồ sơ theo quyết định CF-06.
  - [x] Bổ sung bảng phân loại mức độ bảo mật & nhạy cảm dữ liệu (Data Sensitivity) theo quyết định CF-11: Số CCCD, Mã BHYT và Số điện thoại được phân loại mức độ nhạy cảm cao, bắt buộc che mờ khi xuất qua API.
  - [x] Chuẩn hóa các vai trò người dùng được phép thao tác trên hồ sơ bệnh nhân theo quyết định CF-10 (`patient` chỉ thao tác trên hồ sơ của mình, `admin` có quyền kiểm soát toàn hệ thống).
- [x] **3. Cập nhật tài liệu quy tắc nghiệp vụ `BR-PRF.docx`:**
  - [x] Sửa quy tắc `BR-PRF-03`: Bỏ hoàn toàn việc xác thực OTP khi người dùng tạo mới hồ sơ bệnh nhân theo quyết định CF-51.
  - [x] Sửa quy tắc `BR-PRF-10`: Cập nhật điều kiện kiểm tra trạng thái lịch khám gắn với hồ sơ theo 9 trạng thái STM chuẩn: `pending_payment`, `pending_approval`, `confirmed` (theo CF-47).
  - [x] Bổ sung trích dẫn số hiệu điều khoản gốc cho Ngưỡng tuổi giám hộ: Căn cứ **Điều 1, Luật Trẻ em 2016** (ngưỡng 16 tuổi theo CF-07).
  - [x] Bổ sung trích dẫn số hiệu điều khoản gốc cho Thời hạn lưu trữ dữ liệu y tế: Căn cứ **Điều 69, Luật Khám bệnh, chữa bệnh 2023** và **Nghị định 13/2023/NĐ-CP** (thời hạn lưu trữ 10 - 20 năm, không dùng khóa ngoại cứng tại `patient_consents` theo CF-08).
- [x] **4. Tài liệu quy trình & Biên bản họp:**
  - [x] Tuân thủ quy ước đặt tên nhánh Git theo Mục 8 baseline: Nhánh `feature/user-profile` và nhánh `s4/profile-hieu`.
  - [x] Hoàn thiện tài liệu tổng hợp và ghi biên bản họp phục vụ 2 buổi phỏng vấn theo yêu cầu của sprint.

---

## PHẦN H. TRẠNG THÁI GIT & NHÁNH TRÊN GITHUB

- [x] **Dự án chính:** [`https://github.com/th4nhc0n999/Main-Project-IS207`](https://github.com/th4nhc0n999/Main-Project-IS207)
  - [x] Nhánh `feature/user-profile`: Đã commit và push.
  - [x] Nhánh chuẩn Sprint 4 `s4/profile-hieu`: Đã commit và push.
- [x] **Kho tài liệu:** [`https://github.com/snowflake-vibing/KnowledgeLibrary`](https://github.com/snowflake-vibing/KnowledgeLibrary)
  - [x] Nhánh `main`: Đã commit và push tệp `checklist.md` tổng hợp này.
