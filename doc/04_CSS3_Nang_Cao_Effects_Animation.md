# CHUYÊN ĐỀ 04: CSS3 NÂNG CAO, HIỆU ỨNG & HOẠT HỌA

> **Môn học:** Phát triển ứng dụng Web (IS207)  
> **Tài liệu tham khảo chính:** `Chương 2 CSS3-SV.pdf` (73 trang)

---

## 1. BỘ CHỌN NÂNG CAO (ATTRIBUTE SELECTORS & COMBINATORS)

### 1.1. Bộ chọn thuộc tính (Attribute Selectors)
Cho phép định dạng phần tử HTML dựa trên sự tồn tại hoặc giá trị cụ thể của các thuộc tính:

| Cú pháp | Ý nghĩa | Ví dụ minh họa |
| :--- | :--- | :--- |
| `[attr]` | Phần tử sở hữu thuộc tính `attr` bất kể giá trị | `input[required]` (các ô bắt buộc) |
| `[attr=val]` | Giá trị của thuộc tính bằng **chính xác** `val` | `input[type="password"]` |
| `[attr^=val]` | Giá trị thuộc tính **bắt đầu bằng** tiền tố `val` | `a[href^="https"]` (liên kết bảo mật) |
| `[attr$=val]` | Giá trị thuộc tính **kết thúc bằng** hậu tố `val` | `a[href$=".pdf"]` (liên kết tải PDF) |
| `[attr*=val]` | Giá trị thuộc tính **chứa chuỗi con** `val` | `img[src*="thumbnail"]` |
| `[attr~=val]` | Giá trị chứa **từ nguyên vẹn** `val` trong chuỗi | `[class~="warning"]` |

### 1.2. Bộ kết hợp quan hệ (CSS Combinators)
- **Hậu duệ (Dấu cách ` `):** `div p` $\rightarrow$ Tất cả các thẻ `<p>` nằm bên trong thẻ `<div>` (kể cả con, cháu, chắt).
- **Con trực tiếp (`>`):** `div > p` $\rightarrow$ Chỉ chọn những thẻ `<p>` là **con trực tiếp cấp 1** của `<div>`.
- **Liền kề kề sát (`+`):** `h2 + p` $\rightarrow$ Chọn thẻ `<p>` nằm **ngay sát phía sau** thẻ `<h2>`.
- **Anh em cùng cấp (`~`):** `h2 ~ p` $\rightarrow$ Chọn tất cả các thẻ `<p>` đứng sau `<h2>` và có cùng cha.

---

## 2. MÀU SẮC, BO GÓC, ĐỔ BÓNG & GRADIENT

### 2.1. Hệ màu với kênh trong suốt (Alpha)
- `rgba(red, green, blue, alpha)`: Giá trị RGB từ 0 đến 255; kênh `alpha` từ 0.0 (trong suốt hoàn toàn) đến 1.0 (đặc hoàn toàn).
- `hsla(hue, saturation, lightness, alpha)`: Hue (0 - 360 độ góc màu), Saturation (%), Lightness (%).
- *Khác biệt với `opacity`:* Thuộc tính `opacity` áp dụng làm mờ **toàn bộ phần tử cùng mọi phần tử con bên trong**. Trong khi đó, `rgba()` chỉ áp dụng độ trong suốt riêng cho màu nền mà chữ bên trong vẫn rõ nét 100%.

### 2.2. Bo tròn góc (`border-radius`)
- Bo đều 4 góc: `border-radius: 12px;`
- Tạo khối tròn hoàn hảo: `border-radius: 50%;` (kết hợp với khối có `width` = `height`).
- Bo riêng từng góc:
  `border-radius: top-left top-right bottom-right bottom-left;` (vd: `border-radius: 10px 0 10px 0;`)

### 2.3. Đổ bóng khối (`box-shadow`) và Đổ bóng chữ (`text-shadow`)
- **Cú pháp `box-shadow`:**
  ```css
  box-shadow: h-offset v-offset blur spread color inset;
  ```
  - `h-offset`: Độ dịch bóng theo phương ngang (dương sang phải, âm sang trái).
  - `v-offset`: Độ dịch bóng theo phương dọc (dương xuống dưới, âm lên trên).
  - `blur`: Độ nhòe, mờ của bóng (giá trị càng lớn càng lan tỏa mềm mại).
  - `spread`: Độ mở rộng kích thước bóng.
  - `color`: Màu bóng (thường dùng `rgba` để bóng mờ tự nhiên).
  - `inset`: Từ khóa đổi bóng từ bên ngoài đổ ngược vào bên trong khối.
  - *Ví dụ:* `box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);`
- **Đổ bóng chữ (`text-shadow`):**
  `text-shadow: 2px 2px 4px #888888;`

### 2.4. Màu chuyển sắc (Gradients)
- **Linear Gradient (Chuyển sắc tuyến tính theo đường thẳng):**
  ```css
  /* Hướng: to right, to bottom, to bottom right hoặc độ góc 45deg */
  background-image: linear-gradient(to right, #ff7e5f, #feb47b);
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  ```
- **Radial Gradient (Chuyển sắc hình cầu tâm tròn/bầu dục):**
  ```css
  background-image: radial-gradient(circle, red, yellow, green);
  ```

---

## 3. BACKGROUND MỞ RỘNG & XỬ LÝ TRÀN VĂN BẢN

### 3.1. Kích thước nền (`background-size`)
- `background-size: cover;`: Phóng to ảnh nền sao cho **phủ kín hoàn toàn** diện tích phần tử (ảnh có thể bị cắt bớt viền nhưng không để lại khoảng trống trắng).
- `background-size: contain;`: Thu nhỏ hoặc phóng to ảnh sao cho **toàn bộ ảnh nằm trọn** bên trong phần tử mà không bị méo tỉ lệ.
- `background-size: 100% 100%;`: Ép ảnh co giãn theo đúng tỉ lệ khung (dễ bị méo hình).

### 3.2. Kỹ thuật tạo dấu 3 chấm khi văn bản bị tràn (`text-overflow`)
Đây là bài toán kinh điển trong lập trình Front-End khi hiển thị tiêu đề bài viết dài trên 1 dòng:
```css
.truncate-text {
  width: 250px;
  white-space: nowrap;       /* 1. Không cho phép chữ tự động xuống dòng */
  overflow: hidden;          /* 2. Ẩn phần chữ tràn ra khỏi khung */
  text-overflow: ellipsis;   /* 3. Hiển thị dấu ba chấm (...) ở đoạn bị tràn */
}
```

---

## 4. BIẾN ĐỔI HÌNH HỌC (2D & 3D TRANSFORMATIONS)

Thuộc tính `transform` cho phép thay đổi hình dạng, vị trí và góc nghiêng của phần tử mà không ảnh hưởng đến vị trí luồng tài liệu xung quanh:

- `translate(x, y)`: Dịch chuyển phần tử theo tọa độ X, Y (vd: `translate(20px, -10px)`).
- `rotate(angle)`: Xoay phần tử theo chiều kim đồng hồ (vd: `rotate(45deg)`).
- `scale(x, y)`: Phóng to hoặc thu nhỏ kích thước theo tỉ lệ (vd: `scale(1.2)` phóng to 120%, `scale(0.8)` thu nhỏ).
- `skew(x-angle, y-angle)`: Làm nghiêng phần tử theo góc (vd: `skewX(20deg)`).
- **Kết hợp nhiều phép biến đổi:**
  ```css
  transform: translate(50px, 100px) rotate(30deg) scale(1.1);
  ```
- **Biến đổi 3D:** `rotateX()`, `rotateY()`, `rotateZ()`, `perspective` (tạo phối cảnh chiều sâu).

---

## 5. HIỆU ỨNG CHUYỂN TIẾP (TRANSITIONS)

Cho phép chuyển đổi giá trị thuộc tính CSS một cách mượt mà qua một khoảng thời gian nhất định (thay vì đổi đột ngột).

### 5.1. Bốn thuộc tính cơ bản
1. `transition-property`: Tên thuộc tính cần tạo hiệu ứng (`background-color`, `transform`, `all`...).
2. `transition-duration`: Thời gian diễn ra hiệu ứng (đơn vị `s` hoặc `ms`, vd: `0.3s`).
3. `transition-timing-function`: Gia tốc chuyển động:
   - `linear`: Đều từ đầu đến cuối.
   - `ease`: Chậm ban đầu, tăng tốc, rồi chậm dần khi kết thúc (mặc định).
   - `ease-in`: Chậm ban đầu, tăng dần về sau.
   - `ease-out`: Nhanh ban đầu, chậm dần về cuối.
   - `ease-in-out`: Chậm ở cả hai đầu.
4. `transition-delay`: Thời gian chờ trước khi bắt đầu hiệu ứng.

### 5.2. Cú pháp viết tắt (Shorthand)
```css
.button {
  background-color: #007bff;
  transition: all 0.3s ease-in-out;
}

.button:hover {
  background-color: #0056b3;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
```

---

## 6. HOẠT HỌA CHUYỂN ĐỘNG (ANIMATIONS & @KEYFRAMES)

Animation cho phép tạo chuyển động tự động lặp lại theo nhiều bước phức tạp mà không cần người dùng phải tương tác chuột.

### 6.1. Định nghĩa khung hình `@keyframes`
```css
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

### 6.2. Các thuộc tính áp dụng animation
- `animation-name`: Tên khung hình `@keyframes` đã định nghĩa.
- `animation-duration`: Thời lượng chạy hết 1 vòng chuyển động (vd: `2s`).
- `animation-iteration-count`: Số lần lặp (`1`, `3`, hoặc `infinite` để lặp vô hạn).
- `animation-direction`: Hướng chuyển động (`normal`, `reverse`, `alternate` - đổi chiều lặp lại liên tục).
- `animation-fill-mode`: Trạng thái sau khi hoàn tất (`forwards` giữ nguyên giao diện của frame cuối cùng 100%).
- `animation-play-state`: Trạng thái thực thi (`running`, `paused`).

### 6.3. Ví dụ tạo Spinner quay tròn tải dữ liệu:
```css
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
```

---

## 7. QUẢN LÝ KÍCH THƯỚC HỘP (`BOX-SIZING: BORDER-BOX`)

Đây là thuộc tính CSS3 quan trọng nhất giúp giải quyết triệt để lỗi vỡ layout:

| Giá trị | Cách tính tổng độ rộng hiển thị (`Total Width`) |
| :--- | :--- |
| **`content-box`** *(Mặc định)* | $\text{Total Width} = \text{width} + \text{padding-left} + \text{padding-right} + \text{border-left} + \text{border-right}$ $\rightarrow$ Khi thêm padding hoặc border, khối hộp sẽ bị phình to hơn kích thước `width` ban đầu! |
| **`border-box`** *(Chuẩn hiện đại)* | $\text{Total Width} = \text{width}$ đã khai báo. Trình duyệt tự động trừ bớt phần đệm và đường viền vào bên trong lõi content. Khối hộp **không bao giờ bị phình to ra ngoài**. |

### Quy tắc chuẩn mực bắt đầu mọi dự án Web hiện đại:
```css
*, *::before, *::after {
  box-sizing: border-box;
}
```
