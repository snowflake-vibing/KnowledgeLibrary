# CHUYÊN ĐỀ 10: JQUERY CƠ BẢN, SELECTOR, DOM MANIPULATION & HIỆU ỨNG (EFFECTS)

> **Môn học:** Phát triển ứng dụng Web (IS207)  
> **Tài liệu tham khảo chính:** `Chương 3 JQuery - SV.pdf` (Slide 1 - 57)

---

## 1. GIỚI THIỆU JQUERY & THỜI ĐIỂM THỰC THI

### 1.1. jQuery là gì?
- **jQuery** là một thư viện JavaScript mã nguồn mở nhanh, nhỏ gọn và giàu tính năng.
- Triết lý cốt lõi: **"Write less, do more"** (Viết ít hơn, làm được nhiều hơn).
- Giúp đơn giản hóa triệt để việc:
  - Truy xuất và thao tác cây DOM HTML.
  - Xử lý các sự kiện người dùng (Click, Hover, Keyboard...).
  - Tạo hiệu ứng chuyển động mượt mà (Fade, Slide, Animation).
  - Tương thích tốt trên hầu hết các trình duyệt (*Cross-browser*), không lo lỗi khác biệt engine giữa Chrome, Firefox hay Safari.

### 1.2. Cách nhúng thư viện jQuery
1. **Tải file về máy:**
   ```html
   <script src="js/jquery-3.7.1.min.js"></script>
   ```
2. **Nhúng trực tiếp qua mạng bằng CDN (Content Delivery Network - Khuyến nghị):**
   ```html
   <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
   ```

### 1.3. Bảng so sánh sống còn: `$(document).ready()` vs `window.onload`

| Tiêu chí | `$(document).ready()` (jQuery) | `window.onload` (JavaScript thuần) |
| :--- | :--- | :--- |
| **Thời điểm kích hoạt** | Kích hoạt ngay khi **cây cấu trúc DOM đã được nạp xong** (không cần đợi ảnh, video hay iframe tải xong). | Phải đợi **toàn bộ tài nguyên trên trang (bao gồm cả ảnh nặng, flash, video, CSS bên ngoài...) tải xong 100%**. |
| **Tốc độ phản hồi** | **Nhanh hơn rất nhiều**, người dùng có thể tương tác với giao diện ngay lập tức. | Chậm hơn, phụ thuộc vào tốc độ đường truyền mạng tải ảnh. |
| **Số lượng hàm đăng ký** | Cho phép gọi nhiều khối `$(document).ready()` khác nhau trên cùng một trang mà không bị xung đột. | Nếu gán nhiều lần `window.onload = fn`, hàm sau cùng sẽ **ghi đè** toàn bộ các hàm trước. |
| **Cú pháp viết tắt** | `$(function() { /* Code ở đây */ });` | — |

---

## 2. HỆ THỐNG SELECTORS TRONG JQUERY

Mọi câu lệnh jQuery đều bắt đầu bằng cú pháp chuẩn:
```javascript
$("selector").action();
```

### 2.1. Bộ chọn cơ bản (Basic Selectors)
- Theo thẻ: `$("p")` $\rightarrow$ Chọn tất cả các thẻ `<p>`.
- Theo ID: `$("#myId")` $\rightarrow$ Chọn phần tử có `id="myId"`.
- Theo Class: `$(".highlight")` $\rightarrow$ Chọn tất cả phần tử mang class `highlight`.
- Gom nhóm: `$("h1, h2, .title")` $\rightarrow$ Chọn cùng lúc nhiều nhóm phần tử.
- Toàn cục: `$("*")` $\rightarrow$ Chọn tất cả phần tử.

### 2.2. Bộ chọn theo Thuộc tính (Attribute Selectors)
- `$("[href]")`: Các phần tử có thuộc tính `href`.
- `$("input[name='email']")`: Phần tử input có `name` bằng chính xác `"email"`.
- `$("a[target='_blank']")`: Các liên kết mở trong tab mới.
- `$("a[href^='https']")`: Các liên kết bắt đầu bằng tiền tố `"https"`.
- `$("img[src$='.png']")`: Các ảnh có đuôi mở rộng kết thúc bằng `".png"`.

### 2.3. Bộ chọn Form chuyên dụng (Form Selectors)
- `$(":input")`: Chọn tất cả các thẻ nhập liệu (`<input>`, `<textarea>`, `<select>`, `<button>`).
- `$(":text")`, `$(":password")`, `$(":checkbox")`, `$(":radio")`: Chọn theo từng kiểu input cụ thể.
- `$(":checked")`: Chọn các radio hoặc checkbox **đang được đánh dấu tick chọn**.
- `$(":selected")`: Chọn các thẻ `<option>` **đang được chọn** trong hộp `<select>`.

### 2.4. Bộ chọn mở rộng của jQuery (jQuery Extension Selectors - Trọng tâm thi)
- `$("tr:first")`: Phần tử `<tr>` đầu tiên.
- `$("tr:last")`: Phần tử `<tr>` cuối cùng.
- `$("tr:even")`: Các dòng ở **chỉ số chẵn** (0, 2, 4...) $\rightarrow$ Thường dùng làm bảng kẻ sọc so le.
- `$("tr:odd")`: Các dòng ở **chỉ số lẻ** (1, 3, 5...).
- `$("li:eq(2)")`: Phần tử `<li>` tại vị trí chỉ số chính xác bằng 2 (phần tử thứ 3 tính từ 0).
- `$("li:gt(2)")`: Các phần tử có chỉ số lớn hơn 2 (*greater than*).
- `$("li:lt(2)")`: Các phần tử có chỉ số nhỏ hơn 2 (*less than*).
- `$("p:not(.intro)")`: Tất cả thẻ `<p>` không mang class `intro`.

---

## 3. THAO TÁC DOM VỚI JQUERY (DOM MANIPULATION)

### 3.1. Đọc và Ghi nội dung / Giá trị
- **`.text()`:** Lấy hoặc gán nội dung văn bản thuần:
  - Đọc: `let txt = $("#title").text();`
  - Ghi: `$("#title").text("Tiêu đề mới");`
- **`.html()`:** Lấy hoặc gán nội dung kèm cả thẻ HTML:
  - `$("#box").html("<b>Văn bản in đậm</b>");`
- **`.val()`:** Lấy hoặc gán giá trị của các ô điều khiển Form:
  - `let username = $("#txtUser").val();`
  - `$("#txtUser").val("admin");`

### 3.2. Thao tác Thuộc tính (Attributes)
- Đọc thuộc tính: `let link = $("a").attr("href");`
- Thiết lập thuộc tính: `$("a").attr("href", "https://uit.edu.vn");`
- Thiết lập nhiều thuộc tính cùng lúc:
  ```javascript
  $("img").attr({
    "src": "logo.png",
    "title": "Logo trường"
  });
  ```
- Xóa thuộc tính: `$("input").removeAttr("disabled");`

### 3.3. Thêm và Xóa phần tử DOM
- **`.append()`:** Chèn nội dung vào **bên trong, ở cuối** phần tử được chọn.
- **`.prepend()`:** Chèn nội dung vào **bên trong, ở đầu** phần tử được chọn.
- **`.after()`:** Chèn nội dung vào **bên ngoài, ngay phía sau** phần tử.
- **`.before()`:** Chèn nội dung vào **bên ngoài, ngay phía trước** phần tử.
- **Phân biệt `.remove()` và `.empty()`:**
  - `$("#box").remove();` $\rightarrow$ Xóa sổ **hoàn toàn thẻ `#box` cùng mọi thứ bên trong** ra khỏi cây DOM.
  - `$("#box").empty();` $\rightarrow$ Chỉ xóa sạch **các phần tử con bên trong**, giữ nguyên thẻ bao ngoài `#box`.

### 3.4. Thao tác CSS và Kích thước (Dimensions)
- Quản lý class: `addClass("active")`, `removeClass("active")`, `toggleClass("active")`, `hasClass("active")`.
- Style trực tiếp:
  ```javascript
  $("#box").css("color", "red");
  $("#box").css({ "background-color": "#eee", "padding": "10px" });
  ```
- **Hệ thống đo kích thước hộp trong jQuery:**
  - `.width()`, `.height()`: Kích thước vùng Content (không tính padding, border).
  - `.innerWidth()`, `.innerHeight()`: Content + Padding.
  - `.outerWidth()`, `.outerHeight()`: Content + Padding + Border.
  - `.outerWidth(true)`, `.outerHeight(true)`: Content + Padding + Border + **Margin**.

---

## 4. XỬ LÝ SỰ KIỆN TRONG JQUERY (JQUERY EVENTS)

### 4.1. Các sự kiện thông dụng
- Chuột: `.click()`, `.dblclick()`, `.mouseenter()`, `.mouseleave()`, `.hover(hIn, hOut)`.
- Bàn phím: `.keydown()`, `.keyup()`, `.keypress()`.
- Form: `.submit()`, `.change()`, `.focus()`, `.blur()`.

### 4.2. Cơ chế `.on()` & Ủy quyền sự kiện (Event Delegation)
Khi một phần tử được sinh ra **động bằng code JavaScript sau khi trang đã tải xong**, cách gán sự kiện thông thường `$(".btn-del").click(...)` sẽ **không có tác dụng**. Ta bắt buộc phải dùng kỹ thuật **Event Delegation** thông qua phương thức `.on()`:

```javascript
// Gán sự kiện cho thẻ cha đã tồn tại sẵn, ủy quyền lắng nghe phần tử con sinh động:
$("#tableBody").on("click", ".btn-del", function() {
  // $(this) đại diện cho chính nút .btn-del vừa được click
  $(this).closest("tr").remove();
});
```

---

## 5. HIỆU ỨNG VÀ HOẠT HỌA (EFFECTS & ANIMATION)

### 5.1. Hiệu ứng cơ bản & Fading (Mờ dần)
- **Ẩn / Hiện cơ bản:**
  - `hide(speed, callback)`, `show(speed, callback)`, `toggle(speed)`.
  - Tham số `speed`: `"slow"`, `"fast"` hoặc số mili-giây (vd: `400`, `1000`).
- **Làm mờ (Fading):**
  - `fadeIn(speed)`: Hiện dần lên.
  - `fadeOut(speed)`: Mờ và biến mất dần.
  - `fadeToggle(speed)`: Chuyển đổi qua lại giữa fade in và fade out.
  - `fadeTo(speed, opacity)`: Làm mờ đến một độ trong suốt xác định (từ 0.0 đến 1.0).

### 5.2. Hiệu ứng trượt (Sliding)
- `slideDown(speed)`: Trượt mở rộng xuống dưới.
- `slideUp(speed)`: Trượt thu gọn lên trên.
- `slideToggle(speed)`: Chuyển đổi trượt lên/xuống (cực kỳ thông dụng cho menu Accordion).

### 5.3. Hiệu ứng tùy biến (`.animate()`) & Dừng hiệu ứng (`.stop()`)
- Phương thức `.animate({ thuộc_tính_css }, speed, callback)`:
  ```javascript
  $("#box").animate({
    left: '250px',
    opacity: '0.5',
    height: '150px',
    width: '150px'
  }, 1000);
  ```
  *(Lưu ý: Chỉ áp dụng được cho các thuộc tính CSS có giá trị số học).*
- `.stop()`: Dừng ngay lập tức chuyển động animation đang chạy trước khi chạy chuyển động mới (tránh bị hiệu ứng chạy dồn toa khi người dùng rê chuột liên tục).

### 5.4. Kỹ thuật Nối chuỗi phương thức (Method Chaining)
jQuery cho phép nối nhiều phương thức liên tiếp nhau trên cùng một phần tử mà không cần truy xuất lại DOM:
```javascript
$("#message")
  .css("color", "red")
  .slideUp(1000)
  .slideDown(1000)
  .fadeOut(500);
```

---

## 6. BÀI TẬP ỨNG DỤNG MẪU: ACCORDION HOÀN CHỈNH BẰNG JQUERY

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Accordion jQuery Đơn Giản</title>
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <style>
    .accordion-header {
      background: #007bff;
      color: white;
      padding: 10px 15px;
      cursor: pointer;
      margin-top: 5px;
      font-weight: bold;
    }
    .accordion-body {
      display: none;
      padding: 15px;
      border: 1px solid #007bff;
      background: #f9f9f9;
    }
  </style>
</head>
<body>

  <div class="accordion-item">
    <div class="accordion-header">Chuyên đề 1: HTML Cơ bản</div>
    <div class="accordion-body">Nội dung chi tiết về các thẻ cấu trúc, bảng biểu và form...</div>
  </div>

  <div class="accordion-item">
    <div class="accordion-header">Chuyên đề 2: JavaScript DOM</div>
    <div class="accordion-body">Nội dung chi tiết về mô hình DOM, bắt sự kiện và thao tác node...</div>
  </div>

  <script>
    $(document).ready(function() {
      $(".accordion-header").click(function() {
        // Đóng các accordion-body khác và trượt mở body của header được click
        $(this).next(".accordion-body").slideToggle(300);
        $(".accordion-body").not($(this).next()).slideUp(300);
      });
    });
  </script>

</body>
</html>
```
