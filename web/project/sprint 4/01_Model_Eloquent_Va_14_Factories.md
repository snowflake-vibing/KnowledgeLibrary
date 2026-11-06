# Phân Hệ 01: Eloquent Models & 14 Model Factories (Mã Task: S4-03)

> **Người thực hiện:** Hiệu  
> **Nhiệm vụ:** Thiết lập quan hệ Eloquent Models, cấu hình xóa mềm (Soft Deletes) và xây dựng 14 Model Factories cho toàn bộ cơ sở dữ liệu MedSi.

---

## 1. Kiến trúc Eloquent Models & Quan hệ (Relationships)

### 1.1. Model `PatientProfile`
Đại diện cho hồ sơ người được khám bệnh (thuộc bảng `patient_profiles`).

* **Thuộc tính chính:**
  * `user_id`: ID tài khoản người dùng sở hữu.
  * `full_name`, `dob`, `gender`, `phone`, `relationship`.
  * `identity_card_number`: Số CCCD/Định danh cá nhân.
  * `health_insurance_code`: Mã thẻ BHYT.
  * `guardian_name`, `guardian_phone`, `guardian_relationship`: Thông tin người giám hộ (dành cho người dưới 16 tuổi).
  * `is_default`: Cờ đánh dấu hồ sơ mặc định (`0` hoặc `1`).
  * `deleted_at`: Cột lưu vết xóa mềm (`SoftDeletes`).

* **Code mẫu Model (`app/Models/PatientProfile.php`):**
```php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    protected $casts = [
        'dob' => 'date',
        'is_default' => 'boolean',
        'deleted_at' => 'datetime',
    ];

    /**
     * Tài khoản người dùng sở hữu hồ sơ này
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Các lịch khám gắn với hồ sơ này
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'patient_profile_id');
    }

    /**
     * Lịch sử đồng ý điều khoản (Không ràng buộc khóa ngoại cứng)
     */
    public function consents(): HasMany
    {
        return $this->hasMany(PatientConsent::class, 'patient_profile_id');
    }
}
```

---

### 1.2. Model `PatientConsent`
Đại diện cho bằng chứng chấp thuận điều khoản y tế (thuộc bảng `patient_consents`).

* **Đặc tính kỹ thuật schema:** Cột `patient_profile_id` **không ràng buộc Foreign Key cứng** trỏ về bảng `patient_profiles` (`ON DELETE RESTRICT` hoặc `CASCADE`), đảm bảo khi hồ sơ bị xóa cứng thì bằng chứng pháp lý này vẫn tồn tại.

* **Code mẫu Model (`app/Models/PatientConsent.php`):**
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

    protected $casts = [
        'is_agreed' => 'boolean',
        'agreed_at' => 'datetime',
        'revoked_at' => 'datetime',
    ];

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

## 2. Hệ thống 14 Model Factories

Mục tiêu là cung cấp các Factory sinh dữ liệu ngẫu nhiên chuẩn xác theo schema `medsi_schema_v1.sql` và cấu hình tiền tệ VND, múi giờ Việt Nam.

### Danh mục 14 Factories cần triển khai:

| STT | Model | Tên File Factory | Ghi chú & Ràng buộc Schema |
|:---:|---|---|---|
| 1 | `User` | `database/factories/UserFactory.php` | Vai trò: `patient`, `doctor`, `staff`, `admin`. Staff bắt buộc có `hospital_id`. |
| 2 | `PatientProfile` | `database/factories/PatientProfileFactory.php` | Giới tính: `male`, `female`, `other`. Hỗ trợ state trẻ em `< 16 tuổi`. |
| 3 | `PatientConsent` | `database/factories/PatientConsentFactory.php` | `policy_version` mặc định "v1.0", `is_agreed = true`, lưu IP và User Agent. |
| 4 | `Specialty` | `database/factories/SpecialtyFactory.php` | Mã khoa `code` unique (CK01, CK02...), `name`, `slug` unique. |
| 5 | `Hospital` | `database/factories/HospitalFactory.php` | Tên bệnh viện, địa chỉ, `city`, tọa độ `latitude` / `longitude`, hotline. |
| 6 | `Doctor` | `database/factories/DoctorFactory.php` | Liên kết `user_id`, `specialty_id`, `hospital_id`, chức danh (`title`), kinh nghiệm. |
| 7 | `ExamType` | `database/factories/ExamTypeFactory.php` | Gói khám thuộc bệnh viện & chuyên khoa, đơn giá `price >= 0`. |
| 8 | `Slot` | `database/factories/SlotFactory.php` | Đa hình `owner_type` (`doctor`/`hospital`), `work_date`, `start_time < end_time`, `booked_count <= capacity`. |
| 9 | `Booking` | `database/factories/BookingFactory.php` | Mã `code` unique, `booking_type`, `patient_snapshot` JSON masked, 9 trạng thái STM. |
| 10 | `Ticket` | `database/factories/TicketFactory.php` | Mã `ticket_code`, số thứ tự `queue_seq` unique theo `queue_scope`, `qr_token` (JWT). |
| 11 | `Payment` | `database/factories/PaymentFactory.php` | Mã `payment_code`, số tiền khám, phí dịch vụ 20.000đ, trạng thái thanh toán. |
| 12 | `PaymentTransaction` | `database/factories/PaymentTransactionFactory.php`| Mã giao dịch cổng thanh toán `transaction_code` unique, phương thức (`qr_code`, `store_pay`...). |
| 13 | `Refund` | `database/factories/RefundFactory.php` | Mã `refund_code`, chính sách hoàn tiền (`doctor_rejected`, `early_cancel`...), trạng thái. |
| 14 | `AuditLog` | `database/factories/AuditLogFactory.php` | Bảng log chỉ ghi (`INSERT only`), mã sự kiện AU-01 đến AU-20, IP, metadata JSON. |

---

### Code chi tiết các Factories tiêu biểu

#### 1. `PatientProfileFactory.php`
```php
namespace Database\Factories;

use App\Models\PatientProfile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PatientProfileFactory extends Factory
{
    protected $model = PatientProfile::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'full_name' => $this->faker->name(),
            'dob' => $this->faker->dateTimeBetween('-60 years', '-18 years')->format('Y-m-d'),
            'gender' => $this->faker->randomElement(['male', 'female', 'other']),
            'phone' => '09' . $this->faker->numerify('########'),
            'relationship' => 'Bản thân',
            'identity_card_number' => $this->faker->numerify('001099######'),
            'health_insurance_code' => 'DN401' . $this->faker->numerify('##########'),
            'guardian_name' => null,
            'guardian_phone' => null,
            'guardian_relationship' => null,
            'is_default' => false,
        ];
    }

    /**
     * Trạng thái hồ sơ trẻ em dưới 16 tuổi (có người giám hộ)
     */
    public function child(): static
    {
        return $this->state(fn (array $attributes) => [
            'dob' => now()->subYears(8)->format('Y-m-d'),
            'relationship' => 'Con',
            'guardian_name' => $this->faker->name(),
            'guardian_phone' => '09' . $this->faker->numerify('########'),
            'guardian_relationship' => 'Bố/Mẹ',
        ]);
    }

    /**
     * Trạng thái hồ sơ mặc định
     */
    public function defaultProfile(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_default' => true,
        ]);
    }
}
```

#### 2. `PatientConsentFactory.php`
```php
namespace Database\Factories;

use App\Models\PatientConsent;
use App\Models\PatientProfile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PatientConsentFactory extends Factory
{
    protected $model = PatientConsent::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'patient_profile_id' => PatientProfile::factory(),
            'policy_version' => 'v1.0',
            'is_agreed' => true,
            'agreed_at' => now(),
            'ip_address' => $this->faker->ipv4(),
            'user_agent' => $this->faker->userAgent(),
            'revoked_at' => null,
        ];
    }
}
```

#### 3. `BookingFactory.php` (với masked patient_snapshot)
```php
namespace Database\Factories;

use App\Models\Booking;
use App\Models\PatientProfile;
use App\Models\Slot;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class BookingFactory extends Factory
{
    protected $model = Booking::class;

    public function definition(): array
    {
        return [
            'code' => 'BK' . strtoupper(Str::random(10)),
            'user_id' => User::factory(),
            'patient_profile_id' => PatientProfile::factory(),
            'booking_type' => 'doctor',
            'doctor_id' => null,
            'hospital_id' => null,
            'exam_type_id' => null,
            'slot_id' => Slot::factory(),
            'symptoms' => 'Đau đầu, sốt nhẹ',
            'patient_snapshot' => [
                'full_name' => $this->faker->name(),
                'dob' => '1995-05-12',
                'gender' => 'male',
                'phone' => '090*****89', // Masked phone
                'identity_card_number' => '001099****12', // Masked CCCD
                'relationship' => 'Bản thân',
            ],
            'status' => 'pending_payment',
            'hold_expires_at' => now()->addMinutes(15),
            'approval_expires_at' => null,
            'version' => 1,
        ];
    }
}
```
