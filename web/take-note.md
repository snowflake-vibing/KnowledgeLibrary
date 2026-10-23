# 📌 TAKE-NOTE THI GIỮA KỲ MÔN WEB (IS207 - UIT)
### TÀI LIỆU TRA CỨU NHANH: HTML5 • CSS3 • BOOTSTRAP 5 • JAVASCRIPT • JQUERY

> **Mục đích:** Tài liệu cô đọng toàn bộ cú pháp, mẹo lý thuyết và khung code mẫu thực chiến để mang vào phòng thi giữa kỳ (viết code trên giấy hoặc trên máy).

---

## ⚡ 0. KHUNG CODE KHỞI ĐẦU 1 PHÚT (CHÉP NGAY KHI NHẬN ĐỀ)

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bài Thi Giữa Kỳ IS207</title>
  <!-- Nhúng jQuery (nếu đề dùng jQuery) -->
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; background: #f4f6f9; padding: 20px; }
    .container { max-width: 850px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    h2, h3 { text-align: center; color: #003366; margin-bottom: 15px; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th, td { border: 1px solid #333; padding: 8px; }
    th { background: #007bff; color: #fff; text-align: center; }
    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .form-group { margin-bottom: 12px; }
    label { font-weight: bold; display: inline-block; margin-bottom: 4px; }
    input[type="text"], input[type="number"], input[type="date"], select {
      width: 100%; padding: 7px; border: 1px solid #ccc; border-radius: 4px;
    }
    .btn { background: #28a745; color: #fff; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .btn:hover { background: #218838; }
    .btn-del { background: #dc3545; color: #fff; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; }
    .error { color: red; font-size: 13px; font-style: italic; margin-top: 3px; }
  </style>
</head>
<body>
  <div class="container">
    <!-- NỘI DUNG BÀI THI -->
  </div>

  <script>
    $(document).ready(function() {
      // CODE JQUERY / JS TẠI ĐÂY
    });
  </script>
</body>
</html>
```

---

## 🧱 1. HTML & HTML5 TỐC KÝ

### 1.1. Bảng biểu (`<table>`) & Gộp ô (`colspan`, `rowspan`)
- `colspan="N"`: Gộp **N cột ngang** trên cùng 1 hàng (hàng đó sẽ giảm đi $N-1$ thẻ `<td>`).
- `rowspan="M"`: Gộp **M hàng dọc** trên cùng 1 cột (các hàng bên dưới sẽ giảm đi 1 thẻ `<td>` ở vị trí cột đó).

```html
<table border="1" cellspacing="0" cellpadding="8">
  <thead>
    <tr>
      <th rowspan="2">STT</th>
      <th colspan="2">Thông tin sinh viên</th>
    </tr>
    <tr>
      <th>MSSV</th>
      <th>Họ tên</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>24520001</td>
      <td>Nguyễn Văn A</td>
    </tr>
  </tbody>
</table>
```

### 1.2. Form & Các thẻ nhập liệu (`<form>`)
- Thuộc tính thẻ `<form>`:
  - `action="url"`: Địa chỉ nhận dữ liệu.
  - `method="GET"` (dữ liệu nối lên URL, giới hạn độ dài) hoặc `method="POST"` (dữ liệu ẩn trong body, bảo mật, gửi file lớn).
  - `enctype="multipart/form-data"`: **Bắt buộc** khi form có `<input type="file">`.

| Loại Control | Cú pháp chuẩn | Lưu ý quan trọng khi đi thi |
| :--- | :--- | :--- |
| **Ô nhập chữ** | `<input type="text" id="txtName" placeholder="..." required>` | Dùng `.val().trim()` hoặc `.value.trim()` để lấy chuỗi |
| **Ô nhập số** | `<input type="number" id="qty" value="1" min="1" max="99" step="1">` | Nhớ ép kiểu `parseInt()` hoặc `parseFloat()` |
| **Radio (Chọn 1)** | `<input type="radio" name="time" value="day" checked>` | Các radio cùng nhóm **bắt buộc trùng `name`** |
| **Checkbox (Chọn nhiều)** | `<input type="checkbox" name="food" value="20000" data-name="Phở">` | Dùng `data-*` để lưu thêm tên món hoặc đơn giá |
| **Dropdown (`select`)** | `<select id="cboTable"><option value="1">Bàn 1</option></select>` | Lấy text đang chọn: `$("#cbo option:selected").text()` |
| **Nút bấm** | `<button type="button" id="btn">Tính</button>` | Dùng `type="button"` nếu không muốn form tự reload! |

### 1.3. Lý thuyết HTML5 hay hỏi trắc nghiệm
- **Thẻ ngữ nghĩa (Semantic Tags):**
  - `<header>`: Đầu trang/đầu khối.
  - `<nav>`: Thanh điều hướng chính.
  - `<main>`: Nội dung chính duy nhất của trang.
  - `<article>`: Nội dung **độc lập, trọn vẹn**, có thể tách rời/phân phối lại (bài báo, bài blog, comment).
  - `<section>`: Phân nhóm nội dung theo chủ đề (thường có heading).
  - `<aside>`: Nội dung phụ trợ, sidebar, quảng cáo.
  - `<footer>`: Chân trang.
- **Canvas vs SVG:**
  - **Canvas (`<canvas>`)**: Đồ họa **Raster/Bitmap (pixel)**, vẽ hoàn toàn bằng JavaScript, phóng to bị vỡ hạt, không tạo node DOM cho từng hình vẽ (phù hợp làm game 2D).
  - **SVG (`<svg>`)**: Đồ họa **Vector (XML)**, phóng to **không vỡ hạt**, mỗi hình vẽ là 1 phần tử DOM riêng biệt, gắn được sự kiện `click`/`hover` và style bằng CSS.
- **Web Storage (`localStorage` vs `sessionStorage`):**
  - Dung lượng ~5MB, lưu trữ dạng cặp `key - value` kiểu **String** (muốn lưu Object/Array phải dùng `JSON.stringify()` và đọc ra bằng `JSON.parse()`), **không** tự động gửi lên server.
  - `localStorage`: Lưu **vĩnh viễn** cho đến khi xóa thủ công (`localStorage.setItem('k', 'v')`, `getItem('k')`, `removeItem('k')`, `clear()`).
  - `sessionStorage`: Tự động **mất sạch khi đóng tab/cửa sổ trình duyệt**.

---

## 🎨 2. CSS, CSS3 & BOOTSTRAP 5 TỐC KÝ

### 2.1. Độ ưu tiên CSS (Specificity) - Từ cao xuống thấp
1. `!important` (Thắng tuyệt đối)
2. **Inline style** (`style="..."` trong thẻ HTML): **1000 điểm**
3. **ID Selector** (`#id`): **100 điểm**
4. **Class / Attribute / Pseudo-class** (`.class`, `[type="text"]`, `:hover`): **10 điểm**
5. **Element / Pseudo-element** (`div`, `p`, `::before`): **1 điểm**
6. **Universal** (`*`): **0 điểm**
> *Lưu ý:* Nếu bằng điểm nhau $\rightarrow$ Quy tắc nào viết **sau cùng** sẽ được áp dụng.

### 2.2. CSS Box Model & `box-sizing`
- **`box-sizing: content-box` (Mặc định):**
  - $\text{Chiều rộng thực tế} = \text{width} + 2 \times \text{padding} + 2 \times \text{border}$
  - *Ví dụ:* `width: 300px; padding: 20px; border: 5px solid;` $\Rightarrow 300 + 40 + 10 = 350\text{px}$.
- **`box-sizing: border-box` (Khuyên dùng):**
  - $\text{Chiều rộng thực tế} = \text{width}$ (đã bao gồm cả `padding` và `border` bên trong).
- **Căn giữa một khối block theo chiều ngang:** `width: 800px; margin: 0 auto;`

### 2.3. Định vị (`position`)
- `static`: Mặc định (không dùng được `top`, `bottom`, `left`, `right`, `z-index`).
- `relative`: Dịch chuyển so với **vị trí ban đầu của chính nó**, vẫn giữ nguyên khoảng trống cũ. Thường dùng làm mốc cho thẻ con `absolute`.
- `absolute`: Tách khỏi luồng trang, định vị theo **phần tử cha/tổ tiên gần nhất có `position` khác `static`**. Nếu không có cha nào thỏa mãn, nó neo theo `<html>`.
- `fixed`: Neo cố định theo **khung nhìn trình duyệt (viewport)**, cuộn trang không bị trôi (nút Back-to-top, menu nổi).
- `sticky`: Lai giữa `relative` và `fixed` (cuộn chạm mốc `top: 0` sẽ dính lại).

### 2.4. Chia bố cục nhanh khi đi thi (Flexbox & Grid)
```css
/* Chia 2 cột trái - phải bằng Flexbox */
.row-flex {
  display: flex;
  justify-content: space-between; /* Căn đều 2 đầu */
  align-items: center;            /* Căn giữa dọc */
  gap: 20px;                      /* Khoảng cách giữa các cột */
}
.col-left  { flex: 1; }           /* Chiếm 1 phần */
.col-right { flex: 2; }           /* Chiếm 2 phần */

/* Căn chính giữa tuyệt đối (Ngang + Dọc) */
.center-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### 2.5. Pseudo-classes, CSS3 & Bootstrap 5
- **Thứ tự thẻ `<a>` bắt buộc (LVHA):** `:link` $\rightarrow$ `:visited` $\rightarrow$ `:hover` $\rightarrow$ `:active`.
- **Chọn dòng chẵn/lẻ trong CSS:** `tr:nth-child(even)` (chẵn: 2, 4, 6...), `tr:nth-child(odd)` (lẻ: 1, 3, 5...).
- **Hiệu ứng CSS3 thông dụng:**
  - Bo góc: `border-radius: 8px;` (hình tròn: `50%`).
  - Đổ bóng hộp: `box-shadow: 0 4px 10px rgba(0,0,0,0.15);`
  - Chuyển cảnh mượt: `transition: all 0.3s ease;`
  - Biến đổi: `transform: scale(1.05) translateY(-3px) rotate(5deg);`
- **Bootstrap 5 (So với Bootstrap 4):**
  - Bỏ hoàn toàn jQuery, dùng Vanilla JS.
  - Đổi `ml-*` / `mr-*` $\rightarrow$ `ms-*` (margin-start) / `me-*` (margin-end); `pl-*` / `pr-*` $\rightarrow$ `ps-*` / `pe-*`.
  - Bỏ `.form-group` (dùng `.mb-3` thay thế), thêm breakpoint `xxl` ($\ge 1400\text{px}$).
  - Hệ thống lưới **12 cột**: `.container` > `.row` > `.col-12 .col-md-8` + `.col-12 .col-md-4` (Con trực tiếp của `.row` bắt buộc là `.col-*`).

---

## ⚡ 3. JAVASCRIPT (ES6+) & DOM TỐC KÝ

### 3.1. Biến, Kiểu dữ liệu & Các "Bẫy" Toán tử
| Đặc điểm | `var` | `let` | `const` |
| :--- | :--- | :--- | :--- |
| **Scope (Phạm vi)** | Function / Global | Block `{}` | Block `{}` |
| **Hoisting** | Có (`undefined`) | Bị khóa vùng TDZ (Lỗi) | Bị khóa vùng TDZ (Lỗi) |
| **Khai báo lại / Gán lại** | Có / Có | Không / Có | Không / **Không** |

- **Bẫy `typeof` và so sánh:**
  - `typeof null === "object"` | `typeof undefined === "undefined"` | `typeof NaN === "number"`.
  - `null == undefined` (`true`) nhưng `null === undefined` (`false`).
  - `NaN === NaN` luôn là **`false`** $\rightarrow$ Phải dùng `isNaN(x)` hoặc `Number.isNaN(x)`.
- **Bẫy cộng chuỗi vs trừ số:**
  - `"10" + 2` $\rightarrow$ `"102"` (Toán tử `+` ưu tiên nối chuỗi nếu có 1 vế là chuỗi).
  - `"10" - 2` $\rightarrow$ `8` (Toán tử `-`, `*`, `/` ép chuỗi sang số).
  - `"10" - 2 + "5"` $\rightarrow$ `8 + "5"` $\rightarrow$ `"85"`.
- **Toán tử `||` vs `??` (Nullish Coalescing):**
  - `a || b`: Trả về `b` nếu `a` là **Falsy** (`false`, `0`, `""`, `null`, `undefined`, `NaN`).
  - `a ?? b`: Chỉ trả về `b` nếu `a` là **`null` hoặc `undefined`** (Số `0` và chuỗi rỗng `""` vẫn được giữ nguyên!).
  - *Ví dụ:* `0 || 100` $\rightarrow$ `100`, nhưng `0 ?? 100` $\rightarrow$ `0`.

### 3.2. Ép kiểu & Định dạng tiền tệ Việt Nam
```javascript
// 1. Ép kiểu từ ô input (luôn kèm || 0 để chống NaN khi ô trống)
let qty   = parseInt(document.getElementById("qty").value) || 0;
let price = parseFloat(document.getElementById("price").value) || 0;

// 2. Định dạng tiền có dấu chấm phân cách hàng nghìn (VD: 120000 -> "120.000")
let formatted = total.toLocaleString("vi-VN") + " đ";

// 3. Ngược lại: Xóa dấu chấm/chữ để lấy lại số từ chuỗi "120.000 đ" -> 120000
let rawNumber = parseFloat(str.replace(/\./g, "").replace(/[^\d]/g, "")) || 0;
```

### 3.3. Đối tượng `Date` (Lấy Thứ, Ngày, Tháng, Năm, Giờ hệ thống)
> **Bẫy chết người:** `now.getMonth()` trả về từ **0 đến 11** $\rightarrow$ Bắt buộc phải **`+ 1`**! `now.getDay()` trả về từ **0 (Chủ Nhật) đến 6 (Thứ Bảy)**.

```javascript
function getVietnameseDateTime() {
  const days = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
  const now = new Date();
  const thu   = days[now.getDay()];
  const ngay  = String(now.getDate()).padStart(2, "0");
  const thang = String(now.getMonth() + 1).padStart(2, "0"); // NHỚ +1
  const nam   = now.getFullYear();
  const gio   = String(now.getHours()).padStart(2, "0");
  const phut  = String(now.getMinutes()).padStart(2, "0");
  const giay  = String(now.getSeconds()).padStart(2, "0");
  return `${thu}, ${ngay}/${thang}/${nam} - ${gio}:${phut}:${giay}`;
}
// Cập nhật đồng hồ mỗi giây:
// setInterval(() => { document.getElementById("clock").textContent = getVietnameseDateTime(); }, 1000);
```

### 3.4. Bảng Tra Cứu Biểu Thức Chính Quy (Regex) Thi Giữa Kỳ
Cú pháp kiểm tra: `let isHopLe = regex.test(chuoiCanKiemTra);` (Trả về `true` / `false`).

| Yêu cầu kiểm tra trong đề thi | Biểu thức Regex chuẩn | Giải thích nhanh |
| :--- | :--- | :--- |
| **MSSV UIT** (8 chữ số, bắt đầu bằng số 2) | `/^2\d{7}$/` | `^2` (đầu là 2) + `\d{7}` (7 số tiếp theo) |
| **Mã khách hàng** (Ví dụ: `KH` + 4 chữ số) | `/^KH\d{4}$/` | Bắt đầu bằng `KH`, theo sau đúng 4 chữ số |
| **SĐT Việt Nam** (10 số, đầu 03, 05, 07, 08, 09) | `/^0[35789]\d{8}$/` | Số `0` + 1 số thuộc `[35789]` + 8 chữ số |
| **Email chuẩn** | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | Có chữ trước `@`, tên miền và dấu `.` |
| **Chỉ chứa chữ cái & khoảng trắng** (Họ tên) | `/^[a-zA-ZÀ-ỹ\s]+$/` | Hỗ trợ cả tiếng Việt có dấu |
| **Mật khẩu mạnh** ($\ge 8$ ký tự, 1 hoa, 1 thường, 1 số) | `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/` | Dùng positive lookahead `(?=...)` |
| **Số nguyên dương** ($> 0$) | `/^[1-9]\d*$/` | Chữ số đầu từ 1-9, theo sau là các chữ số |

### 3.5. Thao tác DOM & Sự kiện bằng Vanilla JS (Không dùng jQuery)
```javascript
// 1. Truy xuất phần tử
const el   = document.getElementById("myId");
const item = document.querySelector(".my-class");       // Lấy phần tử đầu tiên khớp
const list = document.querySelectorAll("input[name='food']:checked"); // Lấy NodeList

// 2. Đọc / Ghi nội dung & thuộc tính
el.textContent = "Chữ thuần (an toàn XSS)";
el.innerHTML   = "<b>Chèn được thẻ HTML</b>";
let val        = el.value.trim();                       // Dành cho input, select, textarea
let price      = parseFloat(el.dataset.price);          // Đọc thuộc tính data-price="..."
el.style.color = "red";
el.classList.add("active"); el.classList.remove("active"); el.classList.toggle("active");

// 3. Thêm dòng & ô vào bảng (<table> / <tbody>)
const tbody = document.querySelector("#myTable tbody");
const row   = tbody.insertRow();                        // Thêm <tr> vào cuối tbody
row.insertCell(0).textContent = "Áo thun";              // Thêm <td> cột 0
row.insertCell(1).textContent = "120.000 đ";            // Thêm <td> cột 1
row.insertCell(2).innerHTML   = `<button onclick="this.closest('tr').remove()">Xóa</button>`;
```

### 3.6. Event Bubbling & Event Loop (Bất đồng bộ)
- **Event Bubbling (Nổi bọt - Mặc định):** Click vào thẻ con $\rightarrow$ chạy sự kiện thẻ con trước $\rightarrow$ nổi bọt lên thẻ cha $\rightarrow$ `body` $\rightarrow$ `html` $\rightarrow$ `document` $\rightarrow$ `window`.
  - Chặn nổi bọt lên thẻ cha: `e.stopPropagation()`.
  - Chặn hành vi mặc định của trình duyệt (chặn reload khi submit form, chặn chuyển trang thẻ `<a>`): `e.preventDefault()`.
- **Thứ tự ưu tiên Event Loop:**
  1. **Synchronous (Đồng bộ)** trong Call Stack chạy trước tiên.
  2. **Microtasks** (`Promise.then`, `catch`, `finally`, `async/await`) chạy ngay sau khi Call Stack rỗng.
  3. **Macrotasks** (`setTimeout`, `setInterval`) chạy cuối cùng.

---

## 💎 4. JQUERY THỰC CHIẾN TỐC KÝ

> **So sánh `$(document).ready()` vs `window.onload`:**
> - `$(document).ready(function(){ ... })` (viết tắt: `$(function(){ ... })`): Chạy ngay khi **cây DOM vừa dựng xong** (không cần đợi ảnh/video tải xong) $\rightarrow$ Nhanh hơn.
> - `window.onload`: Phải đợi **toàn bộ tài nguyên (ảnh, CSS, iframe)** tải xong 100%.

### 4.1. Bảng đối chiếu Selector & Phương thức jQuery hay dùng nhất
| Thao tác | Cú pháp jQuery | Lưu ý thực chiến |
| :--- | :--- | :--- |
| **Chọn theo ID / Class** | `$("#id")` / `$(".class")` | Trả về đối tượng jQuery |
| **Chọn các ô đã tích** | `$("input[name='food']:checked")` | Duyệt qua bằng `.each(function() { ... })` |
| **Chọn dòng chẵn / lẻ** | `$("tr:even")` / `$("tr:odd")` | **Chỉ số tính từ 0** (`:even` là 0, 2, 4...) |
| **Đọc / Gán giá trị input** | `$("#txt").val()` / `$("#txt").val("Mới")` | Nhớ `.trim()` khi kiểm tra chuỗi |
| **Đọc / Gán text hoặc HTML** | `$("#kq").text("...")` / `$("#kq").html("<b>...</b>")` | Gọi không tham số là Đọc, có tham số là Ghi |
| **Đọc thuộc tính `data-*`** | `$(this).data("price")` hoặc `$(this).attr("data-price")` | Đọc từ `data-price="150000"` |
| **Thêm vào cuối / đầu** | `tbody.append("<tr>...</tr>")` / `tbody.prepend(...)` | Dùng Template Literal `` `<tr>...</tr>` `` rất nhanh |
| **Xóa phần tử vs Làm rỗng** | `$(this).closest("tr").remove()` vs `tbody.empty()` | `.remove()` xóa cả thẻ đó; `.empty()` chỉ xóa ruột |
| **Ẩn / Hiện / Hiệu ứng** | `.hide()`, `.show()`, `.toggle()`, `.fadeIn(300)`, `.slideToggle()` | Chuỗi hóa (Chaining): `$("#box").hide().fadeIn(400);` |
| **Đổi CSS** | `$("#err").css("color", "red")` | Nhiều thuộc tính: `.css({ color: "red", fontWeight: "bold" })` |

### 4.2. Ủy quyền sự kiện (Event Delegation) - BẮT BUỘC NHỚ!
Khi thêm một dòng `<tr>` có nút `<button class="btn-del">Xóa</button>` bằng `.append()` sau khi trang đã tải xong, viết `$(".btn-del").click(...)` sẽ **KHÔNG CHẠY**. Phải gắn sự kiện thông qua thẻ cha cố định (`table` hoặc `tbody` hoặc `document`):

```javascript
// Chuẩn 100% cho mọi phần tử sinh động (Dynamic Elements):
$("#myTable").on("click", ".btn-del", function() {
  $(this).closest("tr").remove(); // Tìm lên thẻ <tr> gần nhất chứa nút này và xóa nó
  capNhatTongTien();              // Gọi lại hàm tính tổng
});
```

---

## 🏆 5. 4 MẪU CODE "CHÉP NHANH" CHO 4 DẠNG ĐỀ THI GIỮA KỲ UIT

### 📌 DẠNG 1: FORM VALIDATION VỚI REGEX + THÊM VÀO BẢNG
```html
<form id="frmDangKy">
  <div class="form-group">
    <label>MSSV (8 số, bắt đầu bằng 2):</label>
    <input type="text" id="mssv">
    <div id="errMssv" class="error"></div>
  </div>
  <div class="form-group">
    <label>Họ và tên:</label>
    <input type="text" id="hoten">
    <div id="errHoten" class="error"></div>
  </div>
  <div class="form-group">
    <label>Số điện thoại (10 số VN):</label>
    <input type="text" id="sdt">
    <div id="errSdt" class="error"></div>
  </div>
  <div class="form-group">
    <label>Email:</label>
    <input type="text" id="email">
    <div id="errEmail" class="error"></div>
  </div>
  <button type="submit" class="btn">Đăng Ký</button>
</form>

<table id="tblDanhSach">
  <thead>
    <tr><th>MSSV</th><th>Họ tên</th><th>SĐT</th><th>Email</th><th>Xóa</th></tr>
  </thead>
  <tbody></tbody>
</table>

<script>
  $("#frmDangKy").on("submit", function(e) {
    e.preventDefault(); // 1. Chặn reload trang
    $(".error").text(""); // 2. Xóa thông báo lỗi cũ
    let valid = true;

    let mssv  = $("#mssv").val().trim();
    let hoten = $("#hoten").val().trim();
    let sdt   = $("#sdt").val().trim();
    let email = $("#email").val().trim();

    if (!/^2\d{7}$/.test(mssv)) {
      $("#errMssv").text("MSSV phải gồm 8 chữ số và bắt đầu bằng số 2!");
      valid = false;
    }
    if (hoten === "") {
      $("#errHoten").text("Họ tên không được để trống!");
      valid = false;
    }
    if (!/^0[35789]\d{8}$/.test(sdt)) {
      $("#errSdt").text("SĐT không hợp lệ (10 số, đầu 03/05/07/08/09)!");
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      $("#errEmail").text("Email không đúng định dạng!");
      valid = false;
    }

    if (valid) {
      $("#tblDanhSach tbody").append(`
        <tr>
          <td>${mssv}</td>
          <td>${hoten}</td>
          <td>${sdt}</td>
          <td>${email}</td>
          <td class="text-center"><button type="button" class="btn-del">Xóa</button></td>
        </tr>
      `);
      this.reset(); // Xóa trắng form sau khi thêm
    }
  });

  // Xóa dòng động
  $("#tblDanhSach").on("click", ".btn-del", function() {
    $(this).closest("tr").remove();
  });
</script>
```

---

### 📌 DẠNG 2: THỰC ĐƠN CHỌN MÓN (CHECKBOX + RADIO NGÀY/ĐÊM PHỤ THU 10%)
```html
<form id="frmMenu">
  <div class="form-group">
    <label>Chọn món ăn:</label><br>
    <label><input type="checkbox" name="mon" value="20000" data-ten="Bún bò"> Bún bò (20.000đ)</label><br>
    <label><input type="checkbox" name="mon" value="18000" data-ten="Hủ tiếu"> Hủ tiếu (18.000đ)</label><br>
    <label><input type="checkbox" name="mon" value="15000" data-ten="Bánh canh"> Bánh canh (15.000đ)</label>
  </div>
  <div class="form-group">
    <label>Thời điểm:</label><br>
    <label><input type="radio" name="buoi" value="ngay" checked> Ban ngày (Giá gốc)</label>
    <label><input type="radio" name="buoi" value="dem"> Ban đêm (Phụ thu +10%)</label>
  </div>
  <button type="button" id="btnTinhTien" class="btn">Tính Tiền</button>
</form>

<table id="tblHoaDon" style="display:none;">
  <thead>
    <tr><th>Món đã chọn</th><th class="text-right">Thành tiền</th></tr>
  </thead>
  <tbody></tbody>
  <tfoot>
    <tr>
      <th>Tổng thanh toán:</th>
      <th id="lblTongTien" class="text-right" style="color:red;">0 đ</th>
    </tr>
  </tfoot>
</table>

<script>
  $("#btnTinhTien").click(function() {
    let dsChon = $("input[name='mon']:checked");
    if (dsChon.length === 0) {
      alert("Vui lòng chọn ít nhất 1 món!");
      $("#tblHoaDon").hide();
      return;
    }

    let tbody = $("#tblHoaDon tbody");
    tbody.empty();
    let tong = 0;

    dsChon.each(function() {
      let ten = $(this).data("ten");
      let gia = parseFloat($(this).val());
      tong += gia;
      tbody.append(`<tr><td>${ten}</td><td class="text-right">${gia.toLocaleString('vi-VN')} đ</td></tr>`);
    });

    // Kiểm tra phụ thu ban đêm 10%
    if ($("input[name='buoi']:checked").val() === "dem") {
      let phuThu = tong * 0.1;
      tong += phuThu;
      tbody.append(`<tr><td><i>Phụ thu ban đêm (10%)</i></td><td class="text-right">${phuThu.toLocaleString('vi-VN')} đ</td></tr>`);
    }

    $("#lblTongTien").text(tong.toLocaleString('vi-VN') + " đ");
    $("#tblHoaDon").fadeIn(300);
  });
</script>
```

---

### 📌 DẠNG 3: BẢNG GIỎ HÀNG ĐỘNG (ĐỔI SỐ LƯỢNG TỰ TÍNH TIỀN & XÓA DÒNG)
```html
<table id="tblGioHang">
  <thead>
    <tr>
      <th>Sản phẩm</th>
      <th>Số lượng</th>
      <th class="text-right">Đơn giá</th>
      <th class="text-right">Thành tiền</th>
      <th>Xóa</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Áo thun UIT</td>
      <td><input type="number" class="qty" value="2" min="1"></td>
      <td class="text-right price" data-price="120000">120.000 đ</td>
      <td class="text-right subtotal">240.000 đ</td>
      <td class="text-center"><button type="button" class="btn-del">Xóa</button></td>
    </tr>
    <tr>
      <td>Balo Laptop</td>
      <td><input type="number" class="qty" value="1" min="1"></td>
      <td class="text-right price" data-price="350000">350.000 đ</td>
      <td class="text-right subtotal">350.000 đ</td>
      <td class="text-center"><button type="button" class="btn-del">Xóa</button></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th colspan="3" class="text-right">Tổng cộng:</th>
      <th id="grandTotal" class="text-right" style="color:red;">590.000 đ</th>
      <th></th>
    </tr>
  </tfoot>
</table>

<script>
  function tinhLaiGioHang() {
    let tongCong = 0;
    $("#tblGioHang tbody tr").each(function() {
      let sl  = parseInt($(this).find(".qty").val()) || 0;
      let gia = parseFloat($(this).find(".price").data("price")) || 0;
      let thanhTien = sl * gia;

      $(this).find(".subtotal").text(thanhTien.toLocaleString('vi-VN') + " đ");
      tongCong += thanhTien;
    });
    $("#grandTotal").text(tongCong.toLocaleString('vi-VN') + " đ");
  }

  // Khi gõ hoặc bấm mũi tên tăng/giảm số lượng
  $("#tblGioHang").on("input change", ".qty", function() {
    if ($(this).val() < 1) $(this).val(1);
    tinhLaiGioHang();
  });

  // Khi bấm nút Xóa dòng
  $("#tblGioHang").on("click", ".btn-del", function() {
    $(this).closest("tr").remove();
    tinhLaiGioHang();
  });
</script>
```

---

### 📌 DẠNG 4: CHỌN MÓN VÀO BÀN (CỘNG DỒN NẾU TRÙNG MÓN + ĐỒNG HỒ HỆ THỐNG)
```html
<div>Thời gian hệ thống: <b id="dongHo"></b></div>

<div class="form-group" style="margin-top:10px;">
  <label>Chọn món:</label>
  <select id="cboMon">
    <option value="20000" data-id="M1">Bún bò (20.000đ)</option>
    <option value="18000" data-id="M2">Hủ tiếu (18.000đ)</option>
    <option value="15000" data-id="M3">Cà phê sữa (15.000đ)</option>
  </select>
  <button type="button" id="btnThemMon" class="btn" style="margin-top:8px;">Thêm vào bàn</button>
</div>

<table id="tblBanAn">
  <thead>
    <tr><th>Tên món</th><th>Số lượng</th><th class="text-right">Đơn giá</th><th class="text-right">Thành tiền</th><th>Xóa</th></tr>
  </thead>
  <tbody></tbody>
  <tfoot>
    <tr>
      <th colspan="3" class="text-right">Tổng tiền bàn:</th>
      <th id="tongBan" class="text-right" style="color:red;">0 đ</th>
      <th></th>
    </tr>
  </tfoot>
</table>

<script>
  // 1. Hiển thị đồng hồ ngày giờ hệ thống
  function capNhatDongHo() {
    const thuArr = ["Chủ Nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    const d = new Date();
    const str = `${thuArr[d.getDay()]}, ${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
    $("#dongHo").text(str);
  }
  capNhatDongHo();

  // 2. Hàm cập nhật tổng tiền bàn
  function tinhTongBan() {
    let tong = 0;
    $("#tblBanAn tbody tr").each(function() {
      let sl  = parseInt($(this).find(".sl").text()) || 0;
      let gia = parseFloat($(this).data("gia")) || 0;
      let tt  = sl * gia;
      $(this).find(".tt").text(tt.toLocaleString('vi-VN') + " đ");
      tong += tt;
    });
    $("#tongBan").text(tong.toLocaleString('vi-VN') + " đ");
  }

  // 3. Thêm món (Nếu món đã có trong bảng thì cộng dồn số lượng +1)
  $("#btnThemMon").click(function() {
    let opt   = $("#cboMon option:selected");
    let idMon = opt.data("id");
    let ten   = opt.text().split("(")[0].trim();
    let gia   = parseFloat(opt.val());

    // Tìm xem dòng có data-id này đã tồn tại trong bảng chưa
    let dongCu = $(`#tblBanAn tbody tr[data-id='${idMon}']`);
    if (dongCu.length > 0) {
      let slHienTai = parseInt(dongCu.find(".sl").text());
      dongCu.find(".sl").text(slHienTai + 1);
    } else {
      $("#tblBanAn tbody").append(`
        <tr data-id="${idMon}" data-gia="${gia}">
          <td>${ten}</td>
          <td class="text-center sl">1</td>
          <td class="text-right">${gia.toLocaleString('vi-VN')} đ</td>
          <td class="text-right tt">${gia.toLocaleString('vi-VN')} đ</td>
          <td class="text-center"><button type="button" class="btn-del">Xóa</button></td>
        </tr>
      `);
    }
    tinhTongBan();
  });

  $("#tblBanAn").on("click", ".btn-del", function() {
    $(this).closest("tr").remove();
    tinhTongBan();
  });
</script>
```

---

## 🚨 6. CHECKLIST 7 ĐIỂM KIỂM TRA TRƯỚC KHI NỘP BÀI

1. **Đã có `e.preventDefault()` trong sự kiện `submit` chưa?** (hoặc đổi nút bấm sang `type="button"` để trang không bị reload mất kết quả).
2. **Đã bọc `parseInt()` / `parseFloat()` khi lấy `.val()` để tính toán chưa?** (Tránh lỗi `"10000" + "20000" = "1000020000"`).
3. **Tháng trong `new Date().getMonth()` đã cộng thêm `1` chưa?**
4. **Sự kiện click nút Xóa dòng mới thêm đã dùng `$("#table").on("click", ".btn-del", ...)` chưa?**
5. **Các nút `radio` cùng nhóm đã có chung thuộc tính `name="..."` chưa?**
6. **Bảng gộp ô `colspan` / `rowspan` đã xóa bớt các thẻ `<td>` bị chiếm chỗ chưa?**
7. **Đã nhúng `<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>` trước khi dùng `$()` chưa?**
