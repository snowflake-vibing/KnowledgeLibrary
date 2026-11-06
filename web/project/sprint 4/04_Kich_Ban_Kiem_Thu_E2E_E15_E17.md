# Phân Hệ 04: Kịch Bản & Code Kiểm Thử Tự Động E2E (Mã Nghiệm Thu: E15 & E17)

> **Người thực hiện:** Hiệu  
> **Nhiệm vụ:** Viết bộ test tự động (Feature/E2E Test) chứng minh hai kịch bản nghiệm thu **E15** và **E17** đạt 100% yêu cầu trước khi tích hợp vào nhánh `main`.

---

## 1. Kịch Bản Nghiệm Thu E15

### 1.1. Mô tả kịch bản (Scenario Specification)
* **Mục tiêu:** Kiểm tra luồng tạo hồ sơ bệnh nhân là trẻ em, xác thực thông tin người giám hộ, bắt buộc đồng ý điều khoản y tế và bảo vệ quyền riêng tư qua Masking.
* **Chuẩn bị dữ liệu (Setup):** Tạo một tài khoản bệnh nhân mới (`role = 'patient'`).
* **Các bước thực hiện:**
  1. Gửi request tạo hồ sơ trẻ em có ngày sinh dưới 16 tuổi (`guardian_age_threshold = 16`), không điền thông tin người giám hộ $\rightarrow$ Kỳ vọng: Báo lỗi validation bắt buộc người giám hộ.
  2. Bổ sung thông tin giám hộ nhưng **không tick đồng ý điều khoản** (`consent_agreed = false` hoặc bỏ trống) $\rightarrow$ Kỳ vọng: Báo lỗi validation từ chối lưu hồ sơ.
  3. Cung cấp đầy đủ thông tin người giám hộ và tick đồng ý điều khoản $\rightarrow$ Kỳ vọng: Tạo thành công HTTP 201.
  4. Kiểm tra dữ liệu:
     * Trong bảng `patient_consents` tồn tại đúng 1 bản ghi với `is_agreed = 1`, lưu đúng `policy_version`, IP và User-Agent.
     * Response JSON trả về: Số CCCD và Số điện thoại (cả của bệnh nhân và người giám hộ) phải được **che mờ (masked)**, không lộ số nguyên bản.

---

### 1.2. Mã nguồn kiểm thử E15 (`tests/Feature/E2E/E15_ChildProfileAndConsentTest.php`)
```php
namespace Tests\Feature\E2E;

use App\Models\PatientConsent;
use App\Models\PatientProfile;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class E15_ChildProfileAndConsentTest extends TestCase
{
    use RefreshDatabase;

    public function test_e15_child_profile_requires_guardian_consent_and_returns_masked_data(): void
    {
        // 1. Setup: Khởi tạo tài khoản bệnh nhân mới
        $patientUser = User::factory()->create([
            'role' => 'patient',
            'status' => 'active',
        ]);

        $this->actingAs($patientUser, 'sanctum');

        // Dữ liệu hồ sơ trẻ em 8 tuổi (< 16 tuổi mặc định)
        $childDob = now()->subYears(8)->format('Y-m-d');

        // BƯỚC 1: Thử lưu hồ sơ trẻ em mà KHÔNG có thông tin người giám hộ
        $responseNoGuardian = $this->postJson('/api/v1/patient-profiles', [
            'full_name' => 'Nguyễn Văn Bé',
            'dob' => $childDob,
            'gender' => 'male',
            'relationship' => 'Con',
            'consent_agreed' => true,
        ]);

        $responseNoGuardian->assertStatus(422)
            ->assertJsonValidationErrors(['guardian_name', 'guardian_phone', 'guardian_relationship']);

        // BƯỚC 2: Thử lưu hồ sơ có người giám hộ nhưng KHÔNG có Consent
        $responseNoConsent = $this->postJson('/api/v1/patient-profiles', [
            'full_name' => 'Nguyễn Văn Bé',
            'dob' => $childDob,
            'gender' => 'male',
            'relationship' => 'Con',
            'guardian_name' => 'Nguyễn Văn Cha',
            'guardian_phone' => '0901234567',
            'guardian_relationship' => 'Bố',
            'consent_agreed' => false, // Chưa đồng ý điều khoản
        ]);

        $responseNoConsent->assertStatus(422)
            ->assertJsonValidationErrors(['consent_agreed']);

        // BƯỚC 3: Cung cấp đầy đủ thông tin hợp lệ + Đồng ý điều khoản
        $validPayload = [
            'full_name' => 'Nguyễn Văn Bé',
            'dob' => $childDob,
            'gender' => 'male',
            'relationship' => 'Con',
            'identity_card_number' => '001099123456',
            'phone' => '0912345678',
            'guardian_name' => 'Nguyễn Văn Cha',
            'guardian_phone' => '0901234567',
            'guardian_relationship' => 'Bố',
            'consent_agreed' => true,
        ];

        $responseSuccess = $this->postJson('/api/v1/patient-profiles', $validPayload);

        // Kỳ vọng: Tạo thành công HTTP 201
        $responseSuccess->assertStatus(201);

        $createdProfileId = $responseSuccess->json('data.id');

        // BƯỚC 4: Kiểm tra bằng chứng Consent trong CSDL
        $this->assertDatabaseHas('patient_consents', [
            'user_id' => $patientUser->id,
            'patient_profile_id' => $createdProfileId,
            'is_agreed' => true,
            'policy_version' => config('medsi.policy_version', 'v1.0'),
        ]);

        $this->assertEquals(
            1,
            PatientConsent::where('patient_profile_id', $createdProfileId)->count(),
            'Chỉ được tồn tại duy nhất 1 bản ghi consent cho lần tạo này.'
        );

        // BƯỚC 5: Kiểm tra dữ liệu nhạy cảm được che mờ (Masked) trong API response
        $responseData = $responseSuccess->json('data');

        // Số CCCD: 001099123456 -> phải được che mờ thành 001099****56
        $this->assertNotEquals('001099123456', $responseData['identity_card_number']);
        $this->assertStringContainsString('****', $responseData['identity_card_number']);

        // Số SĐT bệnh nhân: 0912345678 -> phải được che mờ thành 091*****78
        $this->assertNotEquals('0912345678', $responseData['phone']);
        $this->assertStringContainsString('*****', $responseData['phone']);

        // Số SĐT giám hộ: 0901234567 -> phải được che mờ thành 090*****67
        $this->assertNotEquals('0901234567', $responseData['guardian_phone']);
        $this->assertStringContainsString('*****', $responseData['guardian_phone']);
    }
}
```

---

## 2. Kịch Bản Nghiệm Thu E17

### 2.1. Mô tả kịch bản (Scenario Specification)
* **Mục tiêu:** Kiểm thử chính sách xóa 3 loại hồ sơ bệnh nhân theo tài liệu hợp nhất baseline `DL-14` và mã lỗi chuẩn `EX-PRF-06`.
* **Chuẩn bị dữ liệu (Setup):** Tạo 1 tài khoản bệnh nhân sở hữu **3 hồ sơ khác nhau**:
  1. **Hồ sơ 1 (Profile A):** Đang có 1 lịch khám ở trạng thái chờ duyệt (`pending_approval`).
  2. **Hồ sơ 2 (Profile B):** Đã từng khám bệnh trong quá khứ (`completed`), hiện không có lịch khám nào đang chờ.
  3. **Hồ sơ 3 (Profile C):** Mới tạo, chưa từng phát sinh bất kỳ lượt đặt lịch nào.
* **Các bước thực hiện:**
  1. Gửi yêu cầu xóa **Hồ sơ 1** $\rightarrow$ Kỳ vọng: Bị từ chối với HTTP 400 và mã lỗi nghiệp vụ **`EX-PRF-06`**, hồ sơ vẫn tồn tại bình thường.
  2. Gửi yêu cầu xóa **Hồ sơ 2** $\rightarrow$ Kỳ vọng: Thành công với hình thức **xóa mềm (Soft Delete)**. Cột `deleted_at` được gán timestamp, hồ sơ bị ẩn khỏi danh sách truy vấn thông thường nhưng bản ghi vẫn nằm trong DB.
  3. Gửi yêu cầu xóa **Hồ sơ 3** $\rightarrow$ Kỳ vọng: Thành công với hình thức **xóa cứng (Hard Delete)**. Dòng dữ liệu trong bảng `patient_profiles` bị xóa hoàn toàn; tuy nhiên bản ghi consent trong `patient_consents` và log kiểm toán liên quan **vẫn được bảo lưu nguyên vẹn**.

---

### 2.2. Mã nguồn kiểm thử E17 (`tests/Feature/E2E/E17_ProfileDeletionPolicyTest.php`)
```php
namespace Tests\Feature\E2E;

use App\Models\Booking;
use App\Models\PatientConsent;
use App\Models\PatientProfile;
use App\Models\Slot;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class E17_ProfileDeletionPolicyTest extends TestCase
{
    use RefreshDatabase;

    public function test_e17_profile_deletion_policy_three_scenarios(): void
    {
        // 1. Setup: Tài khoản bệnh nhân
        $user = User::factory()->create(['role' => 'patient']);
        $this->actingAs($user, 'sanctum');

        // Tạo slot mẫu phục vụ booking
        $slot = Slot::factory()->create();

        // Hồ sơ 1: Đang có lịch khám chờ duyệt (pending_approval)
        $profileWithPending = PatientProfile::factory()->create(['user_id' => $user->id]);
        Booking::factory()->create([
            'user_id' => $user->id,
            'patient_profile_id' => $profileWithPending->id,
            'slot_id' => $slot->id,
            'status' => 'pending_approval',
        ]);

        // Hồ sơ 2: Có lịch sử khám cũ đã hoàn tất (completed)
        $profileWithHistory = PatientProfile::factory()->create(['user_id' => $user->id]);
        Booking::factory()->create([
            'user_id' => $user->id,
            'patient_profile_id' => $profileWithHistory->id,
            'slot_id' => $slot->id,
            'status' => 'completed',
        ]);

        // Hồ sơ 3: Chưa từng đặt lịch nào + có bản ghi Consent
        $profileNeverBooked = PatientProfile::factory()->create(['user_id' => $user->id]);
        $consentOfProfile3 = PatientConsent::factory()->create([
            'user_id' => $user->id,
            'patient_profile_id' => $profileNeverBooked->id,
            'is_agreed' => true,
        ]);

        // ===============================================================
        // BƯỚC 1: Xóa Hồ sơ 1 (Đang có lịch chờ) -> Chặn với mã EX-PRF-06
        // ===============================================================
        $response1 = $this->deleteJson("/api/v1/patient-profiles/{$profileWithPending->id}");

        $response1->assertStatus(400)
            ->assertJson([
                'success' => false,
                'error_code' => 'EX-PRF-06',
            ]);

        // Đảm bảo hồ sơ 1 vẫn còn nguyên, không bị xóa mềm
        $this->assertDatabaseHas('patient_profiles', [
            'id' => $profileWithPending->id,
            'deleted_at' => null,
        ]);

        // ===============================================================
        // BƯỚC 2: Xóa Hồ sơ 2 (Đã có lịch sử khám cũ) -> Xóa mềm
        // ===============================================================
        $response2 = $this->deleteJson("/api/v1/patient-profiles/{$profileWithHistory->id}");

        $response2->assertStatus(200);

        // Kiểm tra trong DB: Cột deleted_at đã có timestamp (Soft Deleted)
        $this->assertSoftDeleted('patient_profiles', [
            'id' => $profileWithHistory->id,
        ]);

        // ===============================================================
        // BƯỚC 3: Xóa Hồ sơ 3 (Chưa từng đặt lịch) -> Xóa cứng
        // ===============================================================
        $response3 = $this->deleteJson("/api/v1/patient-profiles/{$profileNeverBooked->id}");

        $response3->assertStatus(200);

        // Kiểm tra trong DB: Hồ sơ 3 bị xóa hoàn toàn khỏi bảng patient_profiles
        $this->assertDatabaseMissing('patient_profiles', [
            'id' => $profileNeverBooked->id,
        ]);

        // ĐẶC BIỆT: Bản ghi Consent của Hồ sơ 3 vẫn được bảo lưu trọn vẹn!
        $this->assertDatabaseHas('patient_consents', [
            'id' => $consentOfProfile3->id,
            'patient_profile_id' => $profileNeverBooked->id,
            'is_agreed' => true,
        ]);
    }
}
```

---

## 3. Lệnh Chạy Kiểm Thử An Toàn Trên Môi Trường Local

Theo tài liệu yêu cầu kiểm thử an toàn của dự án Sprint 4, các kiểm thử phải chạy trên CSDL MySQL chuyên dụng (`medsi_test`):

```bash
# Thiết lập DB kiểm thử chuyên dụng
DB_DATABASE=medsi_test php artisan migrate:fresh --seed --force

# Chạy riêng 2 test case E15 và E17 của Hiệu
php artisan test --filter=E15_ChildProfileAndConsentTest
php artisan test --filter=E17_ProfileDeletionPolicyTest
```
