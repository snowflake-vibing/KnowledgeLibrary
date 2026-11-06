# Phân Hệ 02: CRUD Hồ Sơ Bệnh Nhân, Người Giám Hộ & Bằng Chứng Đồng Thuận (Mã Task: S4-20, S4-21, S4-22)

> **Người thực hiện:** Hiệu  
> **Nhiệm vụ:** Xây dựng logic API & Service quản lý hồ sơ người khám (`patient_profiles`), xác thực thông tin người giám hộ khi dưới 16 tuổi và ghi nhận bằng chứng đồng ý điều khoản (`patient_consents`).

---

## 1. Nghiệp vụ Quản lý Hồ sơ (`patient_profiles` — S4-20)

### 1.1. Các quy tắc nghiệp vụ bắt buộc (Business Rules)
1. **Giới hạn số lượng:** Mỗi tài khoản (`user_id`) chỉ được phép tạo tối đa **10 hồ sơ** (theo quy định DL-06 / CF-43). Nếu vượt quá, hệ thống từ chối với thông báo lỗi rõ ràng.
2. **Quy tắc hồ sơ mặc định (`is_default`):**
   * Mỗi tài khoản chỉ có duy nhất **1 hồ sơ mặc định** (`is_default = 1`).
   * Nếu tạo hồ sơ đầu tiên, tự động đánh dấu là mặc định.
   * Khi người dùng cập nhật một hồ sơ thành mặc định, hệ thống phải tự động gỡ cờ mặc định (`is_default = 0`) ở toàn bộ các hồ sơ khác của cùng người dùng đó.
3. **Chống trùng lặp định danh:**
   * Cột `identity_card_number` (CCCD/Định danh) được ràng buộc `UNIQUE (user_id, identity_card_number)`.
   * Một tài khoản không được tạo 2 hồ sơ trùng số CCCD.
   * Nếu CCCD là `NULL` (ví dụ trẻ nhỏ chưa làm CCCD), MySQL cho phép nhiều bản ghi `NULL` mà không vi phạm unique.
4. **Quy định đơn giản hóa (DL-14):**
   * Bỏ hoàn toàn việc xác thực OTP khi thêm hồ sơ.
   * Số điện thoại (`phone`) là tùy chọn (`nullable`).

---

## 2. Xác thực Người Giám Hộ (Guardian Validation — S4-21)

Khi đăng ký hồ sơ cho trẻ em hoặc người vị thành niên:

* **Ngưỡng tuổi giám hộ:** Hệ thống đọc từ file cấu hình:
  ```php
  $threshold = config('medsi.guardian_age_threshold', 16);
  ```
* **Quy tắc kiểm tra:**
  * Tính tuổi dựa trên ngày sinh (`dob`) so với thời điểm hiện tại (`Carbon::parse($dob)->age`).
  * Nếu `tuổi < threshold`: Bắt buộc phải có đủ 3 trường thông tin:
    * `guardian_name`: Họ tên người giám hộ (chuỗi, tối đa 150 ký tự).
    * `guardian_phone`: Số điện thoại người giám hộ (chuỗi, định dạng số điện thoại Việt Nam).
    * `guardian_relationship`: Mối quan hệ với bệnh nhân (ví dụ: Bố, Mẹ, Người giám hộ hợp pháp).
  * Nếu thiếu một trong 3 trường trên, hệ thống trả về lỗi HTTP 422 Unprocessable Entity.

---

## 3. Quản lý Bằng chứng Đồng thuận (`patient_consents` — S4-22)

Theo quy định bảo vệ dữ liệu y tế cá nhân:

1. **Bắt buộc đồng thuận:** Khi tạo mới hồ sơ bệnh nhân, người dùng bắt buộc phải tick xác nhận đồng ý các điều khoản và chính sách xử lý dữ liệu (`is_agreed = true`).
2. **Lưu vết pháp lý:** Bản ghi đồng thuận được ghi vào bảng `patient_consents` với các thông tin:
   * `user_id`: ID của tài khoản đang thao tác.
   * `patient_profile_id`: ID của hồ sơ bệnh nhân vừa tạo.
   * `policy_version`: Phiên bản điều khoản hiện hành (ví dụ: `config('medsi.policy_version', 'v1.0')`).
   * `is_agreed`: Giá trị `true` (1).
   * `agreed_at`: Thời điểm xác nhận (`now()`).
   * `ip_address`: Địa chỉ IP của client gọi API (`$request->ip()`).
   * `user_agent`: Thông tin trình duyệt/ứng dụng client (`$request->userAgent()`).
3. **Thiết kế kiến trúc bảo lưu bằng chứng:**
   * Bảng `patient_consents` **không tạo Foreign Key cứng** liên kết với `patient_profiles(id)`.
   * Mục đích: Khi hồ sơ bệnh nhân bị xóa cứng khỏi hệ thống (hard-deleted), bằng chứng đồng thuận pháp lý và audit log vẫn còn nguyên vẹn trong CSDL để phục vụ đối soát, kiểm toán hoặc tranh chấp sau này.

---

## 4. Triển khai Code Chi Tiết (Laravel)

### 4.1. Form Request Validation (`app/Http/Requests/StorePatientProfileRequest.php`)
```php
namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePatientProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        $userId = $this->user()->id;
        $threshold = config('medsi.guardian_age_threshold', 16);

        return [
            'full_name' => ['required', 'string', 'max:150'],
            'dob' => ['required', 'date', 'before_or_equal:today'],
            'gender' => ['required', Rule::in(['male', 'female', 'other'])],
            'phone' => ['nullable', 'string', 'regex:/^(0[3|5|7|8|9])[0-9]{8}$/'],
            'relationship' => ['required', 'string', 'max:50'],
            'identity_card_number' => [
                'nullable',
                'string',
                'regex:/^[0-9]{9,12}$/',
                Rule::unique('patient_profiles')->where(function ($query) use ($userId) {
                    return $query->where('user_id', $userId)->whereNull('deleted_at');
                }),
            ],
            'health_insurance_code' => ['nullable', 'string', 'max:20'],
            'is_default' => ['boolean'],

            // Guardian fields: bắt buộc khi tuổi < ngưỡng cấu hình
            'guardian_name' => [
                Rule::requiredIf(function () use ($threshold) {
                    return $this->dob && Carbon::parse($this->dob)->age < $threshold;
                }),
                'nullable', 'string', 'max:150',
            ],
            'guardian_phone' => [
                Rule::requiredIf(function () use ($threshold) {
                    return $this->dob && Carbon::parse($this->dob)->age < $threshold;
                }),
                'nullable', 'string', 'regex:/^(0[3|5|7|8|9])[0-9]{8}$/',
            ],
            'guardian_relationship' => [
                Rule::requiredIf(function () use ($threshold) {
                    return $this->dob && Carbon::parse($this->dob)->age < $threshold;
                }),
                'nullable', 'string', 'max:50',
            ],

            // Consent validation: bắt buộc tick đồng ý
            'consent_agreed' => ['required', 'accepted'],
        ];
    }

    public function messages(): array
    {
        return [
            'guardian_name.required' => 'Bệnh nhân dưới 16 tuổi bắt buộc phải có thông tin họ tên người giám hộ.',
            'guardian_phone.required' => 'Bệnh nhân dưới 16 tuổi bắt buộc phải có số điện thoại người giám hộ.',
            'guardian_relationship.required' => 'Bệnh nhân dưới 16 tuổi bắt buộc phải khai báo mối quan hệ với người giám hộ.',
            'consent_agreed.accepted' => 'Bạn phải đồng ý với các điều khoản và chính sách xử lý dữ liệu y tế.',
            'identity_card_number.unique' => 'Số CCCD này đã tồn tại trong danh sách hồ sơ của bạn.',
        ];
    }
}
```

---

### 4.2. Service xử lý nghiệp vụ (`app/Services/PatientProfileService.php`)
```php
namespace App\Services;

use App\Models\PatientConsent;
use App\Models\PatientProfile;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class PatientProfileService
{
    /**
     * Tạo hồ sơ mới kèm theo bằng chứng consent
     */
    public function createProfile(User $user, array $data, string $ip, ?string $userAgent): PatientProfile
    {
        return DB::transaction(function () use ($user, $data, $ip, $userAgent) {
            // 1. Kiểm tra giới hạn 10 hồ sơ
            $currentCount = $user->patientProfiles()->count();
            if ($currentCount >= 10) {
                throw ValidationException::withMessages([
                    'profile_limit' => 'Mỗi tài khoản chỉ được phép tạo tối đa 10 hồ sơ.',
                ]);
            }

            // 2. Xử lý cờ mặc định: Nếu chưa có hồ sơ nào hoặc user chọn mặc định
            $isDefault = $data['is_default'] ?? false;
            if ($currentCount === 0 || $isDefault) {
                // Gỡ mặc định các hồ sơ cũ nếu set hồ sơ mới là mặc định
                if ($isDefault) {
                    $user->patientProfiles()->update(['is_default' => false]);
                }
                $isDefault = true;
            }

            // 3. Tạo PatientProfile
            $profile = $user->patientProfiles()->create([
                'full_name' => $data['full_name'],
                'dob' => $data['dob'],
                'gender' => $data['gender'],
                'phone' => $data['phone'] ?? null,
                'relationship' => $data['relationship'],
                'identity_card_number' => $data['identity_card_number'] ?? null,
                'health_insurance_code' => $data['health_insurance_code'] ?? null,
                'guardian_name' => $data['guardian_name'] ?? null,
                'guardian_phone' => $data['guardian_phone'] ?? null,
                'guardian_relationship' => $data['guardian_relationship'] ?? null,
                'is_default' => $isDefault,
            ]);

            // 4. Ghi nhận bằng chứng Consent
            PatientConsent::create([
                'user_id' => $user->id,
                'patient_profile_id' => $profile->id,
                'policy_version' => config('medsi.policy_version', 'v1.0'),
                'is_agreed' => true,
                'agreed_at' => now(),
                'ip_address' => $ip,
                'user_agent' => $userAgent,
            ]);

            return $profile;
        });
    }
}
```
