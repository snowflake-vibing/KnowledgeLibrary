# Phân Hệ 01: Eloquent Models & 14 Model Factories (Mã Task: S4-03)

> **Căn cứ tài liệu:** `Sprint_4_requirement.pdf` (Mục 4.4.a) & `03._ERD_v1.1.pdf`  
> **Người thực hiện:** Hiệu  
> **Nhiệm vụ:** Thiết lập quan hệ Eloquent Models, cấu hình xóa mềm (Soft Deletes) cho 4 bảng và xây dựng 14 Model Factories cho toàn bộ cơ sở dữ liệu MedSi.

---

## 1. Cấu hình Xóa Mềm (Soft Deletes)

Theo mục 4.4.(a) của `Sprint_4_requirement.pdf` và trang 1 của `03._ERD_v1.1.pdf`:
* Chỉ có đúng **4 bảng** được cấu hình xóa mềm bằng cột `deleted_at`:
  1. `patient_profiles` (Hồ sơ người khám)
  2. `doctors` (Bác sĩ)
  3. `hospitals` (Cơ sở y tế)
  4. `exam_types` (Loại / Gói khám)
* Các bảng còn lại tuyệt đối không xóa cứng dữ liệu giao dịch hay kiểm toán:
  * `users`: Không xóa cứng, sử dụng trạng thái `disabled`.
  * `payments`, `payment_transactions`, `refunds`, `audit_logs`: Chỉ thêm hoặc cập nhật trạng thái, không xóa.

---

## 2. Kiến trúc Eloquent Models & Quan hệ (Relationships)

### 2.1. Model `PatientProfile`
* Sử dụng `SoftDeletes`, `HasFactory`.
* Bổ sung phương thức `makePatientSnapshot()` phục vụ xuất bản chụp đã che cho Hoài Bảo và Tuấn Anh.
* Quan hệ:
  * `user()`: `BelongsTo(User::class)`
  * `bookings()`: `HasMany(Booking::class)`
  * `consents()`: `HasMany(PatientConsent::class)`

```php
namespace App\Models;

use App\Support\DataMasker;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class PatientProfile extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'patient_profiles';

    protected $fillable = [
        'user_id',
        'full_name',
        'dob',
        'gender',
        'phone',
        'relationship',
        'identity_card_number',
        'health_insurance_code',
        'guardian_name',
        'guardian_phone',
        'guardian_relationship',
        'is_default',
    ];

    protected function casts(): array
    {
        return [
            'dob' => 'date',
            'is_default' => 'boolean',
            'deleted_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'patient_profile_id');
    }

    public function consents(): HasMany
    {
        return $this->hasMany(PatientConsent::class, 'patient_profile_id');
    }

    /**
     * Hàm makePatientSnapshot(profile) trả JSON đã che cho Hoài Bảo và Tuấn Anh
     */
    public function makePatientSnapshot(): array
    {
        return [
            'profile_id' => $this->id,
            'full_name' => $this->full_name,
            'dob' => $this->dob?->format('Y-m-d'),
            'gender' => $this->gender,
            'relationship' => $this->relationship,
            'phone' => DataMasker::maskPhone($this->phone),
            'identity_card_number' => DataMasker::maskIdentityCard($this->identity_card_number),
            'health_insurance_code' => DataMasker::maskHealthInsurance($this->health_insurance_code),
            'guardian_name' => $this->guardian_name,
            'guardian_phone' => DataMasker::maskPhone($this->guardian_phone),
            'guardian_relationship' => $this->guardian_relationship,
            'captured_at' => now()->toIso8601String(),
        ];
    }
}
```

---

### 2.2. Model `PatientConsent`
* Cột `patient_profile_id` **cố ý không đặt khóa ngoại cứng** trong schema để khi hồ sơ bị xóa cứng thì bằng chứng đồng ý vẫn được bảo lưu phục vụ pháp lý và đối soát.
* Bổ sung cột `revoked_at` để hỗ trợ rút đồng ý xử lý dữ liệu.

```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PatientConsent extends Model
{
    use HasFactory;

    protected $table = 'patient_consents';

    protected $fillable = [
        'user_id',
        'patient_profile_id',
        'policy_version',
        'is_agreed',
        'agreed_at',
        'ip_address',
        'user_agent',
        'revoked_at',
    ];

    protected function casts(): array
    {
        return [
            'is_agreed' => 'boolean',
            'agreed_at' => 'datetime',
            'revoked_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function profile(): BelongsTo
    {
        return $this->belongsTo(PatientProfile::class, 'patient_profile_id')->withTrashed();
    }
}
```

---

## 3. Danh Mục 14 Model Factories Hoàn Chỉnh

Đã tạo đầy đủ 14 file Factory tại `backend/database/factories/`:

| STT | Model | File Factory | Ghi chú & Ràng buộc Schema Chuẩn |
|:---:|---|---|---|
| 1 | `User` | `UserFactory.php` | Vai trò: `patient`, `doctor`, `staff` (gắn `hospital_id`), `admin`. |
| 2 | `PatientProfile` | `PatientProfileFactory.php` | Giới tính: `male`, `female`, `other`. Hỗ trợ state `child()` và `defaultProfile()`. |
| 3 | `PatientConsent` | `PatientConsentFactory.php` | Lưu IP, User Agent, `policy_version`, `revoked_at = null`. |
| 4 | `Specialty` | `SpecialtyFactory.php` | Mã khoa unique (CK01, CK02, CK03...), name, slug. |
| 5 | `Hospital` | `HospitalFactory.php` | Tên cơ sở y tế, địa chỉ, `city`, tọa độ `latitude`, `longitude`, hotline. |
| 6 | `Doctor` | `DoctorFactory.php` | Liên kết `user_id`, `specialty_id`, `hospital_id`, title, kinh nghiệm. |
| 7 | `ExamType` | `ExamTypeFactory.php` | Gói khám gắn `hospital_id` và `specialty_id`, đơn giá `price >= 0`. |
| 8 | `Slot` | `SlotFactory.php` | Đa hình `owner_type` (`doctor`/`hospital`), `work_date`, `start_time < end_time`. |
| 9 | `Booking` | `BookingFactory.php` | Mã code unique, 9 trạng thái STM, `patient_snapshot` JSON đã che mờ. |
| 10 | `Ticket` | `TicketFactory.php` | Mã `ticket_code`, số thứ tự `queue_seq` unique theo `queue_scope`, `qr_token` (JWT). |
| 11 | `Payment` | `PaymentFactory.php` | Phí khám, phí tiện ích 20.000đ, trạng thái thanh toán. |
| 12 | `PaymentTransaction` | `PaymentTransactionFactory.php` | Mã giao dịch `transaction_code`, nguồn `gateway`/`demo_admin`/`counter`. |
| 13 | `Refund` | `RefundFactory.php` | Chính sách hoàn tiền (`doctor_rejected`, `early_cancel`...), trạng thái. |
| 14 | `AuditLog` | `AuditLogFactory.php` | Bảng log chỉ thêm (`Insert-only`), sự kiện AU-01 đến AU-20. |
