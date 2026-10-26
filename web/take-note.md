# 📌 TỔNG HỢP KIẾN THỨC MÔN WEB (IS207 - UIT)
### TÀI LIỆU TRA CỨU: HTML5 • CSS3 • BOOTSTRAP 5 • JAVASCRIPT THUẦN (VANILLA JS)

> **Nội dung:** Hệ thống hóa cú pháp, kiến thức trọng tâm và các mẫu bài tập thực hành kết hợp **HTML5 + CSS3 + JavaScript thuần**.

---

## ⚡ 0. TEMPLATE CẤU TRÚC TRANG WEB CƠ BẢN (TỐI GIẢN PHÒNG THI)

> 💡 **Lưu ý phòng thi quan trọng:**
> - Trong đề thi thực tế, giảng viên **KHÔNG** bắt buộc bạn phải viết các CSS trang trí rườm rà (như `box-shadow`, `border-radius`, hover nút, màu nền...).
> - **Nếu đề có chấm CSS:** Đề sẽ ghi rõ từng thông số cụ thể (VD: *khung rộng 480px, viền 2px solid darkcyan...*), đề bảo viết gì thì viết nấy.
> - **Nếu đề chú trọng JavaScript/PHP:** Bạn chỉ cần dùng bộ CSS **tối giản (4-5 dòng cốt lõi)** bên dưới để giao diện ngay ngắn, không vỡ layout và tiết kiệm tối đa thời gian làm bài.

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ứng Dụng Web IS207</title>
  <style>
    /* 1. Tránh vỡ layout khi dùng width 100% kèm padding */
    * { box-sizing: border-box; }

    /* 2. Khung chứa căn giữa cơ bản */
    .container { max-width: 800px; margin: 20px auto; font-family: Arial, sans-serif; }

    /* 3. Kẻ bảng nét đơn chuẩn phòng thi */
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th, td { border: 1px solid #333; padding: 8px; }
    th { background: #eee; }

    /* 4. Căn lề số lượng / đơn giá / nút bấm */
    .text-right { text-align: right; }
    .text-center { text-align: center; }

    /* 5. Khoảng cách form & thông báo lỗi màu đỏ */
    .form-group { margin-bottom: 12px; }
    .error { color: red; font-size: 13px; font-style: italic; }
  </style>
</head>
<body>
  <div class="container">
    <!-- NỘI DUNG GIAO DIỆN ĐẶT TẠI ĐÂY -->
  </div>

  <script>
    document.addEventListener("DOMContentLoaded", function() {
      // CODE JAVASCRIPT THUẦN TẠI ĐÂY
    });
  </script>
</body>
</html>
```

#### 📖 Bảng giải thích các thẻ và thuộc tính trong Template trên:
| Thuộc tính / Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `<!DOCTYPE html>` | Khai báo chuẩn tài liệu là **HTML5** (nếu thiếu trình duyệt sẽ chạy ở chế độ cũ Quirks Mode và bị trừ `0.25đ`). |
| `<html lang="vi">` | Thẻ gốc bao bọc toàn bộ trang web; `lang="vi"` báo ngôn ngữ trang là Tiếng Việt. |
| `<meta charset="UTF-8">` | Khai báo bảng mã **Unicode (UTF-8)** giúp hiển thị tiếng Việt có dấu không bị lỗi font. |
| `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | Giúp giao diện hiển thị đúng tỷ lệ kích thước thật trên cả màn hình máy tính và điện thoại. |
| `<title>...</title>` | Tiêu đề hiển thị trên **thanh Tab của trình duyệt** (cần ghi đúng từng chữ theo hình chụp đề bài). |
| `* { box-sizing: border-box; }` | `*` là chọn mọi thẻ; `border-box` ép tổng chiều rộng thẻ luôn bằng đúng `width` đã khai báo (tự trừ `padding` và `border` vào trong, chống vỡ khung). |
| `margin: 20px auto;` | Cách trên/dưới `20px`, trái/phải `auto` (tự động đẩy khối `.container` ra **chính giữa màn hình** theo chiều ngang). |
| `border-collapse: collapse;` | Gộp 2 đường viền kép mặc định của bảng HTML thành **1 đường kẻ đơn** sắc nét. |
| `DOMContentLoaded` | Sự kiện kích hoạt ngay khi trình duyệt vừa đọc và dựng xong cây HTML (đảm bảo gọi `getElementById` không bị `null`). |

---

## 🧱 1. HTML & HTML5 TỐC KÝ

### 1.1. Bảng biểu (`<table>`) & Gộp ô (`colspan`, `rowspan`)

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

#### 📖 Bảng giải thích các thẻ và thuộc tính của `<table>`:
| Thuộc tính / Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `border="1"` | Kẻ đường viền bao quanh bảng và các ô với độ dày `1px` (nếu viết bằng CSS thì dùng `border: 1px solid #333;`). |
| `cellspacing="0"` | **Khoảng cách giữa các ô (Cell Spacing)**: Đặt bằng `0` để triệt tiêu khe hở giữa các ô cạnh nhau (tương đương `border-collapse: collapse` trong CSS). |
| `cellpadding="8"` | **Khoảng đệm bên trong ô (Cell Padding)**: Tạo khoảng trống `8px` từ chữ bên trong ra tới 4 cạnh viền của ô để chữ không bị dính sát viền (tương đương `padding: 8px` trên thẻ `th, td`). |
| `<thead>`, `<tbody>`, `<tfoot>` | Chia bảng thành 3 vùng ngữ nghĩa: **Phần đầu tiêu đề cột** (`thead`), **Phần thân chứa dữ liệu** (`tbody` - rất quan trọng để JS chèn/xóa dòng mà không xóa nhầm dòng tiêu đề), và **Phần chân tổng kết** (`tfoot`). |
| `<tr>` (*Table Row*) | Định nghĩa **1 hàng ngang** trong bảng. |
| `<th>` (*Table Header*) | Ô tiêu đề cột: chữ bên trong mặc định được **in đậm và căn giữa**. |
| `<td>` (*Table Data*) | Ô dữ liệu thông thường: chữ bên trong mặc định **in thường và căn trái**. |
| `colspan="2"` (*Column Span*) | **Gộp 2 cột liên tiếp theo chiều ngang** trên cùng 1 hàng (hàng đó sẽ giảm bớt $2 - 1 = 1$ thẻ `<th>`/`<td>`). |
| `rowspan="2"` (*Row Span*) | **Gộp 2 hàng liên tiếp theo chiều dọc** trên cùng 1 cột (hàng ngay bên dưới sẽ bị chiếm chỗ nên phải **bỏ đi 1 thẻ `<th>`/`<td>`** ở cột đó). |

---

### 1.2. Các loại Form Control & Giải thích toàn bộ thuộc tính (`<form>`, `<input>`, `<select>`, `<textarea>`)

#### A. Bảng giải thích các thuộc tính (Attributes) trong Form & Input
| Thuộc tính (Attribute) | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `action="GroupInfo.php"` | Đường dẫn file phía Server sẽ nhận và xử lý dữ liệu khi bấm nút Submit form. |
| `method="post"` / `"get"` | Phương thức gửi dữ liệu: **`GET`** nối dữ liệu lên thanh địa chỉ URL (`?name=A`); **`POST`** đóng gói dữ liệu ẩn trong thân bản tin HTTP (bảo mật hơn, gửi được dữ liệu lớn/file). |
| `enctype="multipart/form-data"` | Thuộc tính đặt trong `<form>`, **bắt buộc phải có** khi trong form có ô chọn file `<input type="file">`. |
| `id="txtName"` | Định danh duy nhất của thẻ trên trang, dùng để: **(1)** JS gọi `document.getElementById("txtName")`, và **(2)** liên kết với `<label for="txtName">`. |
| `name="food"` | Tên biến gửi lên Server VÀ dùng để **gom nhóm các nút `radio` hoặc `checkbox`**. Các nút `radio` cùng 1 câu hỏi bắt buộc phải có **cùng `name`** thì mới chỉ chọn được 1! |
| `for="txtName"` | Đặt trong thẻ `<label for="txtName">`. Khi người dùng bấm chuột vào chữ của Label, con trỏ sẽ tự động nhảy vào ô input có `id="txtName"` (trong barem chấm thi UIT chiếm `0.5đ`). |
| `value="20000"` | Giá trị thực sự của ô nhập/lựa chọn (lấy ra bằng `.value` trong JS). |
| `placeholder="Nhập họ tên..."` | Dòng chữ gợi ý mờ nằm bên trong ô input, tự biến mất khi người dùng bắt đầu gõ. |
| `required` | Bắt buộc người dùng không được để trống ô này khi bấm nút Submit. |
| `readonly` vs `disabled` | **`readonly`**: Chỉ xem, không sửa được nhưng **vẫn gửi dữ liệu đi** khi submit. **`disabled`**: Khóa xám hoàn toàn, không bấm được và **không gửi dữ liệu đi**. |
| `checked` | Đặt mặc định tích chọn sẵn cho ô `radio` hoặc `checkbox` ngay khi mở trang. |
| `selected` | Đặt mặc định chọn sẵn cho 1 dòng `<option>` bên trong thẻ `<select>`. |
| `min="0" max="100" step="10"` | Giới hạn giá trị nhỏ nhất (`min`), lớn nhất (`max`) và bước nhảy mỗi lần tăng/giảm (`step`) cho `type="number"` hoặc thanh trượt `type="range"`. |
| `rows="4" cols="30"` | Quy định chiều cao (số dòng `rows`) và chiều rộng (`cols`) cho ô văn bản nhiều dòng `<textarea>`. |
| `data-price="120000"` | Thuộc tính tùy chỉnh (`data-*`) giúp gắn kèm dữ liệu phụ (đơn giá, tên món, thời hạn mượn...) vào thẻ HTML. Trong JS đọc ra cực dễ bằng `el.dataset.price`. |

#### B. Bảng tổng hợp tất cả các loại ô nhập liệu (Form Controls) & Cách đọc bằng JS
| Loại Control | Cú pháp HTML chuẩn | Ý nghĩa hiển thị & Cách đọc giá trị bằng JS |
| :--- | :--- | :--- |
| **Ô nhập chữ 1 dòng** | `<input type="text" id="hoten" placeholder="Nguyễn Văn A" required>` | Nhập văn bản ngắn.<br>JS: `document.getElementById("hoten").value.trim()` |
| **Ô mật khẩu** | `<input type="password" id="matkhau" required>` | Tự động che ký tự gõ vào thành dấu chấm tròn `••••`.<br>JS: `document.getElementById("matkhau").value` |
| **Ô Email / URL** | `<input type="email" id="mail">`<br>`<input type="url" id="web">` | Tự kiểm tra định dạng phải có `@` (email) hoặc `http://` / `https://` (url) khi submit. |
| **Ô nhập số** | `<input type="number" id="sl" value="1" min="1" max="50" step="1">` | Chỉ cho nhập số, có nút mũi tên tăng/giảm.<br>JS: `parseInt(document.getElementById("sl").value) \|\| 0` |
| **Thanh trượt (Slider)** | `<input type="range" id="mucdo" min="0" max="100" step="10" value="80">` | Thanh kéo mức độ từ `0` đến `100`, mỗi nấc nhảy `10` đơn vị (Đề CV Kỹ năng).<br>JS: `parseInt(document.getElementById("mucdo").value)` |
| **Ô chọn Ngày / Tháng** | `<input type="date" id="ngay">`<br>`<input type="month" id="thang">` | Bật lịch chọn ngày/tháng/năm chuẩn HTML5.<br>JS: `new Date(document.getElementById("ngay").value)` |
| **Ô chọn File ảnh** | `<input type="file" id="anh" accept="image/*">` | Nút `"Chọn tệp"` từ máy tính (`accept="image/*"` chỉ lọc file ảnh). |
| **Radio (Chọn 1)** | `<input type="radio" name="buoi" value="ngay" checked> Ngày`<br>`<input type="radio" name="buoi" value="dem"> Đêm` | Nút tròn: chỉ được chọn **duy nhất 1** phương án trong cùng `name="buoi"`.<br>JS: `document.querySelector("input[name='buoi']:checked").value` |
| **Checkbox (Chọn nhiều)** | `<input type="checkbox" name="mon" value="20000" data-ten="Phở">` | Ô vuông: tích chọn được **nhiều món cùng lúc**.<br>JS: `document.querySelectorAll("input[name='mon']:checked")` |
| **Dropdown (`<select>`)** | `<select id="cbo"><option value="7 ngày">Nexus</option></select>` | Danh sách thả xuống.<br>JS lấy `value`: `cbo.value` \| Lấy chữ: `cbo.options[cbo.selectedIndex].text` |
| **Ô chữ nhiều dòng** | `<textarea id="ghichu" rows="3" placeholder="Ghi chú..."></textarea>` | Khung nhập đoạn văn dài (Mô tả công việc, Ghi chú, Ý kiến). **Lưu ý:** Có thẻ đóng `</textarea>`! |
| **Khung nhóm có tiêu đề trên viền** | `<fieldset><legend>Tiêu đề nhóm</legend> ... </fieldset>` | `<fieldset>` tạo khung viền bao quanh, `<legend>` tạo chữ nằm đè lên cạnh viền trên (Đề Form Nhóm). |
| **3 loại Nút bấm (`<button>`)** | `<button type="submit">Đăng ký</button>`<br>`<button type="reset">Cancel</button>`<br>`<button type="button">Tính tiền</button>` | • `type="submit"`: Gửi form đi (kích hoạt sự kiện `submit`).<br>• `type="reset"`: Tự động xóa trắng toàn bộ form về ban đầu.<br>• `type="button"`: Nút bấm thường để chạy hàm JS mà không làm reload trang. |

#### 💻 Ví dụ code minh họa: Form tích hợp đầy đủ các loại Control & Cách đọc bằng JS
```html
<form id="demoForm" action="xuly.php" method="post" enctype="multipart/form-data">
  <!-- 1. Ô nhập chữ + liên kết for-id -->
  <label for="txtHoTen">Họ và tên:</label>
  <input type="text" id="txtHoTen" name="hoten" placeholder="Nhập họ và tên..." required>

  <!-- 2. Ô nhập số có giới hạn min, max, step -->
  <label for="numSoLuong">Số lượng vé:</label>
  <input type="number" id="numSoLuong" name="soluong" value="1" min="1" max="10" step="1">

  <!-- 3. Thanh trượt (range) từ 0 đến 100, bước nhảy 10 -->
  <label for="rngMucDo">Mức độ hài lòng (0 - 100%):</label>
  <input type="range" id="rngMucDo" name="mucdo" min="0" max="100" step="10" value="80">

  <!-- 4. Khung nhóm Fieldset & Legend chứa Radio + Checkbox + Select -->
  <fieldset>
    <legend><strong>Tùy chọn dịch vụ</strong></legend>

    <!-- Radio: Cùng name="ca" để chỉ chọn được 1 -->
    <label>Thời điểm:</label>
    <label><input type="radio" name="ca" value="ngay" checked> Ban ngày</label>
    <label><input type="radio" name="ca" value="dem"> Ban đêm (+10%)</label>
    <br>

    <!-- Checkbox: Chọn nhiều món kèm data-ten -->
    <label>Dịch vụ thêm:</label>
    <label><input type="checkbox" name="dichvu" value="30000" data-ten="Bắp rang"> Bắp rang (30k)</label>
    <label><input type="checkbox" name="dichvu" value="20000" data-ten="Nước ngọt"> Nước ngọt (20k)</label>
    <br>

    <!-- Dropdown Select -->
    <label for="cboRap">Chọn rạp:</label>
    <select id="cboRap" name="rap">
      <option value="R1" selected>CGV Thủ Đức</option>
      <option value="R2">Lotte Cinema</option>
    </select>
  </fieldset>

  <!-- 5. Ô chọn file & Ô văn bản nhiều dòng -->
  <label for="fileAnh">Ảnh đính kèm:</label>
  <input type="file" id="fileAnh" name="anh" accept="image/*">

  <label for="txtGhiChu">Ghi chú thêm:</label>
  <textarea id="txtGhiChu" name="ghichu" rows="3" placeholder="Nhập yêu cầu đặc biệt..."></textarea>

  <!-- 6. Các nút bấm -->
  <button type="submit">Xác nhận đặt vé</button>
  <button type="reset">Nhập lại (Cancel)</button>
</form>

<script>
  document.getElementById("demoForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Ngăn trang tự tải lại

    const hoTen   = document.getElementById("txtHoTen").value.trim();
    const soLuong = parseInt(document.getElementById("numSoLuong").value) || 1;
    const mucDo   = parseInt(document.getElementById("rngMucDo").value) || 0;
    const caChon  = document.querySelector("input[name='ca']:checked").value;

    const cboRap  = document.getElementById("cboRap");
    const maRap   = cboRap.value;
    const tenRap  = cboRap.options[cboRap.selectedIndex].text;
    const ghiChu  = document.getElementById("txtGhiChu").value.trim();

    // Đọc danh sách các checkbox được tích chọn
    const dsDichVu = [];
    document.querySelectorAll("input[name='dichvu']:checked").forEach(chk => {
      dsDichVu.push(`${chk.dataset.ten} (${chk.value}đ)`);
    });

    console.log({ hoTen, soLuong, mucDo, caChon, maRap, tenRap, dsDichVu, ghiChu });
  });
</script>
```

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

#### 💻 Ví dụ code minh họa: Cấu trúc Semantic HTML5 & Lưu/Đọc `localStorage`
```html
<!-- 1. Bố cục trang chuẩn Semantic HTML5 -->
<header>
  <h1>Cổng Thông Tin Thư Viện UIT</h1>
  <nav>
    <a href="index.html">Trang chủ</a> | <a href="giohang.html">Giỏ sách</a>
  </nav>
</header>

<main>
  <section>
    <h2>Sách mới cập nhật</h2>
    <article>
      <h3>Giáo trình Phát triển ứng dụng Web</h3>
      <p>Tài liệu học tập chính thức môn IS207...</p>
    </article>
  </section>
  <aside>Thông báo lịch nghỉ lễ</aside>
</main>

<footer>&copy; 2026 Khoa HTTT - UIT</footer>

<script>
  // 2. Cách lưu và đọc một mảng đối tượng bằng localStorage
  const danhSach = [
    { mssv: "24520001", ten: "Nguyễn Văn A" },
    { mssv: "24520002", ten: "Trần Thị B" }
  ];

  // Lưu mảng vào localStorage (phải chuyển sang chuỗi JSON)
  localStorage.setItem("dsSinhVien", JSON.stringify(danhSach));

  // Đọc mảng từ localStorage ra lại
  const duLieuDocRa = JSON.parse(localStorage.getItem("dsSinhVien")) || [];
  console.log(duLieuDocRa[0].ten); // In ra: "Nguyễn Văn A"
</script>
```

---

## 🎨 2. CSS, CSS3 & BOOTSTRAP 5 TỐC KÝ

### 2.1. Hệ thống Bộ chọn CSS (Selectors) & Độ ưu tiên (Specificity)

#### A. Bảng các bộ chọn CSS quan trọng cần nhớ
| Loại bộ chọn | Cú pháp | Ý nghĩa & Ứng dụng thực tế |
| :--- | :--- | :--- |
| **Con hậu duệ (Descendant)** | `A B` (VD: `.card p`) | Chọn **mọi** thẻ `B` nằm bên trong `A` (ở bất kỳ cấp nào) |
| **Con trực tiếp (Child)** | `A > B` (VD: `.cv-table > tbody > tr > td`) | Chỉ chọn `B` là **con ruột cấp 1** của `A` (tránh làm hỏng bảng con bên trong) |
| **Anh em kế tiếp sát nhau** | `A + B` (VD: `label + input`) | Chọn thẻ `B` đứng **ngay sát sau** thẻ `A` (cùng cha) |
| **Tất cả anh em phía sau** | `A ~ B` | Chọn tất cả thẻ `B` đứng sau `A` (cùng cha) |
| **Theo thuộc tính** | `input[type="text"]`, `[data-id]` | Chọn chính xác loại ô input để định dạng mà không ảnh hưởng radio/checkbox |
| **Trạng thái tương tác** | `:hover`, `:focus`, `:checked`, `:disabled` | Đổi màu khi rê chuột (`:hover`), khi đang gõ chữ (`:focus`), khi được tích (`:checked`) |
| **Vị trí con trong danh sách** | `:first-child`, `:last-child`, `:nth-child(even/odd)` | Tô màu xen kẽ các dòng chẵn (`even`) / lẻ (`odd`) trong bảng `<table>` |

#### 💻 Ví dụ code minh họa: Cách hoạt động của các Bộ chọn CSS trên
```css
/* 1. Con hậu duệ (A B): Chọn mọi thẻ p nằm trong .card */
.card p { line-height: 1.5; }

/* 2. Con trực tiếp (A > B): Chỉ kẻ viền các ô của bảng chính .cv-table, không ảnh hưởng bảng con bên trong */
.cv-table > tbody > tr > td { border: 1px solid #000; padding: 8px; }

/* 3. Anh em kế tiếp (A + B): Ô input nằm ngay sau label sẽ cách trên 4px */
label + input { margin-top: 4px; }

/* 4. Bộ chọn thuộc tính: Chỉ định dạng ô chữ và ô số, không làm ảnh hưởng nút radio/checkbox */
input[type="text"], input[type="number"] { width: 100%; padding: 6px; }

/* 5. Trạng thái tương tác (:hover, :focus) */
.btn:hover { background-color: darkgreen; }
input:focus { border-color: #007bff; outline: none; }

/* 6. Tô màu dòng chẵn / lẻ trong bảng */
#myTable tbody tr:nth-child(even) { background-color: #f9f9f9; }
#myTable tbody tr:nth-child(odd)  { background-color: #ffffff; }
```

#### B. Độ ưu tiên CSS (Specificity) - Từ cao xuống thấp
1. `!important` (Thắng tuyệt đối)
2. **Inline style** (`style="..."` trong thẻ HTML): **1000 điểm**
3. **ID Selector** (`#id`): **100 điểm**
4. **Class / Attribute / Pseudo-class** (`.class`, `[type="text"]`, `:hover`): **10 điểm**
5. **Element / Pseudo-element** (`div`, `p`, `::before`): **1 điểm**
6. **Universal** (`*`): **0 điểm**
> *Lưu ý:* Nếu bằng điểm nhau $\rightarrow$ Quy tắc nào viết **sau cùng** sẽ được áp dụng.

### 2.2. Màu Sắc Trong CSS (Color Formats, RGB, RGBA, HSL, HEX & Bảng Màu Hay Dùng)

CSS hỗ trợ nhiều cách biểu diễn màu sắc khác nhau. Hiểu rõ từng định dạng giúp bạn linh hoạt khi thiết kế giao diện, làm đổ bóng `box-shadow`, hoặc làm lớp phủ mờ (overlay/backdrop).

#### A. Bảng so sánh 5 định dạng biểu diễn màu sắc trong CSS
| Định dạng màu | Cú pháp ví dụ | Giải thích chi tiết ý nghĩa & Đặc điểm |
| :--- | :--- | :--- |
| **Color Names (Tên màu chuẩn)** | `color: red;`<br>`background: darkcyan;` | Dùng tên tiếng Anh có sẵn của màu (CSS hỗ trợ 140 tên màu chuẩn như `red`, `blue`, `green`, `orange`, `purple`, `darkcyan`, `gold`, `gray`, `transparent`...). Rất nhanh gọn trong phòng thi khi đề chỉ yêu cầu màu cơ bản. |
| **Hex Color (`#RRGGBB` / `#RGB`)** | `color: #ff0000;`<br>`color: #f00;`<br>`color: #006699;` | Hệ đếm cơ số 16 (Hexadecimal: `0-9`, `a-f`). Gồm 3 cặp số đại diện cho **Red - Green - Blue** từ `00` (tối nhất) đến `ff` (sáng nhất, tương đương `255`).<br>• Dạng rút gọn 3 ký tự: `#f00` tương đương `#ff0000` (đỏ), `#fff` là trắng, `#000` là đen. |
| **RGB (`rgb(r, g, b)`)** | `color: rgb(255, 0, 0);`<br>`background: rgb(0, 102, 153);` | Hàm trộn 3 kênh màu ánh sáng: **Đỏ (Red), Xanh lá (Green), Xanh dương (Blue)**. Mỗi kênh nhận giá trị từ **`0` đến `255`**.<br>• `rgb(0, 0, 0)` là màu Đen tuyệt đối.<br>• `rgb(255, 255, 255)` là màu Trắng tinh. |
| **RGBA (`rgba(r, g, b, a)`)** | `background: rgba(0, 0, 0, 0.5);`<br>`box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);` | **Mở rộng của RGB kèm thêm kênh Alpha (`a`) quy định ĐỘ TRONG SUỐT (Opacity)**:<br>• `a` nhận giá trị số thực từ **`0.0` (trong suốt hoàn toàn - vô hình)** đến **`1.0` (đậm đặc 100% - không trong suốt)**.<br>• *Ví dụ cực hay dùng trong thi cử:*<br>  - `rgba(0, 0, 0, 0.5)`: Màn phủ mờ màu đen 50% cho cửa sổ Modal Popup.<br>  - `rgba(255, 255, 255, 0.8)`: Nền trắng mờ nhìn xuyên thấu nhẹ phía sau.<br>  - `rgba(0, 0, 0, 0.15)`: Màu bóng đổ mềm mại, tự nhiên cho `box-shadow`.<br>• *Điểm khác biệt sống còn giữa `rgba()` và `opacity`:* `rgba()` **chỉ làm trong suốt màu nền** (chữ bên trong vẫn sắc nét, rõ ràng), trong khi thuộc tính `opacity: 0.5;` sẽ làm mờ **toàn bộ khối kể cả chữ và ảnh con bên trong**! |
| **HSL / HSLA (`hsl(h, s, l)`)** | `color: hsl(200, 100%, 50%);`<br>`color: hsla(200, 100%, 50%, 0.5);` | Mô hình màu trực quan theo mắt người:<br>• **H (Hue - Vòng tròn màu)**: Từ `0` đến `360` (`0`: Đỏ, `120`: Xanh lá, `240`: Xanh dương).<br>• **S (Saturation - Độ bão hòa/độ tươi)**: `0%` (xám xịt) đến `100%` (rực rỡ nhất).<br>• **L (Lightness - Độ sáng)**: `0%` (đen thui), `50%` (chuẩn màu), `100%` (trắng toát).<br>• Kênh `a` trong `hsla`: độ trong suốt từ `0.0` đến `1.0`. |

#### B. Bảng các mã màu thực chiến hay dùng nhất trong đề thi và lập trình web
| Tên màu / Vai trò giao diện | Mã HEX (`#...`) | Mã RGB (`rgb(...)`) | Mã RGBA tương ứng (Độ mờ trong suốt) |
| :--- | :--- | :--- | :--- |
| **Màu đen (Văn bản chính)** | `#000000` / `#212529` | `rgb(0, 0, 0)` | `rgba(0, 0, 0, 0.5)` *(Màn phủ Modal)* |
| **Màu trắng (Nền khối/thẻ)** | `#ffffff` | `rgb(255, 255, 255)` | `rgba(255, 255, 255, 0.8)` *(Nền kính mờ)* |
| **Xám nhạt (Nền trang web / Viền)** | `#f8f9fa` / `#e9ecef` | `rgb(248, 249, 250)` | `rgba(0, 0, 0, 0.08)` *(Viền mờ nhẹ)* |
| **Xanh dương chính (Primary / Link)** | `#0066cc` / `#007bff` | `rgb(0, 102, 204)` | `rgba(0, 102, 204, 0.2)` *(Viền focus ô input)* |
| **Xanh lá (Success / Đặt hàng thành công)** | `#28a745` / `#059669` | `rgb(40, 167, 69)` | `rgba(40, 167, 69, 0.15)` *(Nền thông báo xanh)* |
| **Đỏ (Danger / Lỗi / Nút Xóa)** | `#dc3545` / `#ef4444` | `rgb(220, 53, 69)` | `rgba(220, 53, 69, 0.1)` *(Nền nút Xóa hover)* |
| **Vàng cam (Warning / Chú ý / Nút Cam)** | `#ff9900` / `#f59e0b` | `rgb(255, 153, 0)` | `rgba(255, 153, 0, 0.25)` *(Đổ bóng nút cam)* |
| **Xanh mòng két (Darkcyan - Đề IS207)** | `#008b8b` | `rgb(0, 139, 139)` | `rgba(0, 139, 139, 0.3)` |

#### 💻 Ví dụ code minh họa: Phân biệt `rgba()` (chỉ mờ nền) và `opacity` (mờ cả chữ) + Lớp phủ Modal
```html
<style>
  /* 1. LỚP PHỦ MODAL DÙNG RGBA: Nền đen mờ 50%, nhìn thấy mờ mờ trang web phía sau */
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Đen mờ 50% */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 2. HỘP THÔNG BÁO DÙNG BOX-SHADOW RGBA: Bóng đổ màu đen trong suốt 20% rất tự nhiên */
  .modal-content {
    background-color: #ffffff;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    width: 320px;
    text-align: center;
  }

  /* 3. SO SÁNH RGBA VS OPACITY:
     - .box-rgba: Chỉ có màu nền là mờ 20%, chữ "Chữ này vẫn đen đậm 100%" hiển thị rõ nét!
     - .box-opacity: Cả nền VÀ chữ đều bị mờ nhạt đi 50%.
  */
  .box-rgba {
    background-color: rgba(220, 53, 69, 0.15); /* Nền đỏ mờ 15% */
    color: #dc3545;                             /* Chữ đỏ đậm nét 100% */
    padding: 10px;
    border: 1px solid #dc3545;
    margin-bottom: 10px;
  }
  .box-opacity {
    background-color: #dc3545;
    color: #ffffff;
    opacity: 0.5; /* MỜ TOÀN BỘ CẢ NỀN LẪN CHỮ */
    padding: 10px;
  }
</style>

<div class="box-rgba">
  <strong>Dùng RGBA:</strong> Nền đỏ mờ nhẹ nhưng chữ đỏ vẫn đậm và sắc nét!
</div>
<div class="box-opacity">
  <strong>Dùng Opacity:</strong> Cả khối và chữ bị mờ đục 50%.
</div>
```

---

### 2.3. Bảng Tra Cứu Toàn Bộ Thuộc Tính CSS Cơ Bản (Cột Code & Cột Giải Thích)

| Thuộc tính / Cú pháp CSS | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `width: 480px;` / `width: 100%;` | Chiều rộng của phần tử (cố định `480px` hoặc chiếm `100%` chiều rộng của thẻ cha). |
| `max-width: 800px;` | Chiều rộng tối đa `800px` (nếu màn hình nhỏ hơn `800px` thì tự co lại cho vừa màn hình). |
| `height: 150px;` / `min-height: 40px;` | Chiều cao cố định (`height`) hoặc chiều cao tối thiểu (`min-height`). |
| `box-sizing: border-box;` | Giữ tổng kích thước hộp đúng bằng `width` đã khai báo (tự động gói cả `padding` và `border` vào bên trong). Nếu để mặc định `content-box` thì $\text{Rộng thực tế} = \text{width} + 2\times\text{padding} + 2\times\text{border}$. |
| `padding: 20px;` | **Khoảng đệm bên trong** (từ nội dung chữ đến đường viền `border`). Viết 2 số `padding: 8px 16px;` là trên/dưới `8px`, trái/phải `16px`. |
| `margin: 15px;` | **Khoảng cách bên ngoài** (đẩy các phần tử xung quanh ra xa đường viền `border`). |
| `margin: 0 auto;` (hoặc `margin: auto;`) | Tự động chia đều khoảng trống 2 bên trái/phải để **căn giữa khối block** ra giữa màn hình (bắt buộc khối đó phải có `width` nhỏ hơn 100%). |
| `border: 2px solid darkcyan;` | Đường viền bao quanh: dày `2px`, nét liền `solid` (nét đứt là `dashed`, nét chấm là `dotted`), màu `darkcyan`. Xóa viền của nút bấm: `border: none;`. |
| `border-radius: 8px;` | Bo tròn 4 góc của khung hoặc nút bấm (nếu đặt `50%` trên hình vuông sẽ tạo ra **hình tròn**). |
| `background-color: darkorange;` | Màu nền của phần tử (có thể viết tắt là `background: #f4f6f9;`). |
| `color: red;` / `color: #003366;` | Màu chữ văn bản bên trong phần tử. |
| `font-family: Arial, sans-serif;` | Phông chữ không chân hiện đại (`Arial`). Nếu đề yêu cầu chữ có chân truyền thống thì dùng `"Times New Roman", serif`. |
| `font-size: 22px;` | Cỡ chữ (`px`, `rem`, `em`). |
| `font-weight: bold;` | Làm **in đậm** chữ (tương đương thẻ `<b>` hoặc `<strong>`). |
| `font-style: italic;` | Làm *in nghiêng* chữ (tương đương thẻ `<i>`). |
| `text-align: center;` / `right;` / `left;` | Căn lề văn bản hoặc các phần tử `inline`/`inline-block` (như `button`, `img`) vào **giữa** (`center`), **phải** (`right`) hoặc **trái** (`left`). |
| `text-decoration: underline;` / `none;` | Gạch chân chữ (`underline`) hoặc bỏ gạch chân mặc định của thẻ `<a>` (`none`). |
| `display: block;` | Biến phần tử thành khối riêng biệt chiếm 1 dòng (đặt trên `<label>` để đẩy `<input>` xuống dòng dưới). |
| `display: inline-block;` | Cho phép các phần tử nằm cạnh nhau trên cùng 1 hàng nhưng vẫn chỉnh được `width`, `height`, `padding`. |
| `display: none;` | Ẩn hoàn toàn phần tử khỏi giao diện (dùng khi ẩn bảng hóa đơn lúc chưa bấm nút "Tính tiền"). |
| `cursor: pointer;` | Đổi con trỏ chuột thành **hình bàn tay** khi rê chuột vào nút bấm hoặc liên kết. |
| `border-collapse: collapse;` | Đặt trên thẻ `table`: gộp các đường viền đôi của bảng thành **1 đường kẻ đơn**. |
| `vertical-align: middle;` / `top;` | Đặt trên `td, th`: căn nội dung trong ô bảng nằm **chính giữa theo chiều dọc** (`middle`) hoặc sát mép trên (`top`). |
| `object-fit: cover;` / `contain;` | Đặt trên `img`: giúp ảnh có `width`/`height` cố định không bị méo tỷ lệ (`cover` lấp đầy khung, `contain` hiển thị trọn vẹn bức ảnh). |

#### 💻 Ví dụ code minh họa: Kết hợp các thuộc tính CSS cơ bản để định dạng Khung, Bảng và Nút bấm
```html
<style>
  /* Khung chứa rộng 500px, căn giữa màn hình, viền xanh đậm, đệm trong 20px */
  .box-demo {
    width: 500px;
    margin: 20px auto;
    padding: 20px;
    border: 2px solid darkcyan;
    border-radius: 8px;
    background-color: #ffffff;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
  }

  /* Tiêu đề màu đỏ, in đậm, căn giữa */
  .box-demo h2 {
    color: red;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
  }

  /* Bảng gộp viền đơn, rộng 100% khung */
  .tbl-demo {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 15px;
  }
  .tbl-demo th, .tbl-demo td {
    border: 1px solid #333;
    padding: 8px;
    vertical-align: middle;
  }

  /* Nút bấm màu cam, không viền, con trỏ bàn tay */
  .btn-orange {
    display: inline-block;
    width: 140px;
    padding: 10px;
    background-color: darkorange;
    color: #000;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>

<div class="box-demo">
  <h2>THÔNG TIN ĐƠN HÀNG</h2>
  <table class="tbl-demo">
    <tr><th>Sản phẩm</th><th>Thành tiền</th></tr>
    <tr><td>Sách Lập trình Web</td><td style="text-align: right;">120.000 đ</td></tr>
  </table>
  <div style="text-align: center;">
    <button type="button" class="btn-orange">Thanh Toán</button>
  </div>
</div>
```

---

### 2.4. Cú Pháp Viết Ngắn Gọn Trong CSS (Shorthand Properties)

CSS Shorthand cho phép gộp nhiều thuộc tính liên quan (như `padding`, `margin`, `border`, `background`, `font`, `transition`, `overflow`,...) vào một dòng lệnh duy nhất, giúp code gọn gàng, giảm tối đa thời gian gõ trong phòng thi và tránh lỗi cú pháp.

> **Quy tắc chiều kim đồng hồ (Clockwise Rule) kinh điển:** Khi viết 4 giá trị số cách nhau bằng dấu cách, thứ tự luôn là: **TRÊN $\rightarrow$ PHẢI $\rightarrow$ DƯỚI $\rightarrow$ TRÁI** (*Top $\rightarrow$ Right $\rightarrow$ Bottom $\rightarrow$ Left*).

#### A. Bảng từ điển các cú pháp viết tắt CSS (Shorthand) từ cơ bản đến nâng cao
| Thuộc tính Shorthand | Cú pháp viết tắt & Số lượng tham số | Giải thích chi tiết ý nghĩa & Tương đương viết dài |
| :--- | :--- | :--- |
| **`margin`** (Khoảng cách ngoài) | • `margin: 10px;`<br>• `margin: 10px 20px;`<br>• `margin: 10px 20px 30px;`<br>• `margin: 10px 20px 30px 40px;`<br>• `margin: 0 auto;` | • **1 giá trị**: Cả 4 phía đều cách `10px`.<br>• **2 giá trị**: [Trên-Dưới: `10px`] [Trái-Phải: `20px`].<br>• **3 giá trị**: [Trên: `10px`] [Trái-Phải: `20px`] [Dưới: `30px`].<br>• **4 giá trị (Kim đồng hồ)**: [Trên `10px`] [Phải `20px`] [Dưới `30px`] [Trái `40px`].<br>• `0 auto`: Trên-Dưới `0px`, Trái-Phải tự động chia đều $\rightarrow$ **Căn giữa khung ra giữa màn hình**! |
| **`padding`** (Đệm khoảng cách trong) | • `padding: 8px;`<br>• `padding: 6px 12px;`<br>• `padding: 10px 15px 20px;`<br>• `padding: 5px 10px 15px 20px;` | Tương tự `margin` theo đúng thứ tự kim đồng hồ nhưng là tạo khoảng đệm trống **bên trong** đường viền của phần tử (như ô `<td>` bảng hoặc nút `<button>`). |
| **`border`** (Đường viền 4 phía) | `border: 1px solid #333;` | Gộp 3 thuộc tính: `border-width` (`1px`) + `border-style` (`solid`, `dashed`, `dotted`, `none`) + `border-color` (`#333`).<br>• Viết tắt từng cạnh: `border-bottom: 2px solid red;` (chỉ kẻ viền dưới). |
| **`border-radius`** (Bo tròn góc) | • `border-radius: 8px;`<br>• `border-radius: 50%;`<br>• `border-radius: 10px 20px 30px 40px;` | • `8px`: Bo tròn đều 4 góc.<br>• `50%`: Bo tròn thành **hình tròn hoặc oval** (dùng cho ảnh đại diện avatar).<br>• 4 giá trị: [Góc trên-trái] [Góc trên-phải] [Góc dưới-phải] [Góc dưới-trái]. |
| **`font`** (Định dạng chữ tổng hợp) | `font: italic bold 16px/1.5 Arial, sans-serif;` | Gộp: `font-style` (`italic`) + `font-weight` (`bold`) + `font-size/line-height` (`16px/1.5`) + `font-family` (`Arial, sans-serif`).<br>• *Lưu ý:* `font-size` và `font-family` là 2 giá trị bắt buộc phải có khi dùng shorthand `font`! |
| **`background`** (Hình & màu nền) | `background: #f8f9fa url('bg.png') no-repeat center / cover fixed;` | Gộp: `background-color` + `background-image` + `background-repeat` (`no-repeat` không lặp) + `background-position / background-size` (`center / cover`) + `background-attachment` (`fixed` cố định khi cuộn).<br>• Viết màu đơn giản: `background: #ffffff;` (thay vì viết dài `background-color: #ffffff;`). |
| **`outline`** (Viền ngoài không chiếm diện tích) | `outline: 2px solid blue;` hoặc `outline: none;` | Gộp: `outline-width` + `outline-style` + `outline-color`. Rất hay dùng `outline: none;` để xóa viền xanh mặc định khi click chuột vào ô input. |
| **`box-shadow`** (Đổ bóng khối hộp) | `box-shadow: 0 4px 10px rgba(0,0,0,0.15);` | Gộp: `offset-x` (`0px` lệch ngang) + `offset-y` (`4px` lệch dọc xuống) + `blur-radius` (`10px` độ mờ nhòe) + `color` (`rgba(...)` màu bóng trong suốt). |
| **`text-shadow`** (Đổ bóng chữ) | `text-shadow: 1px 1px 2px #888;` | Gộp: `offset-x` + `offset-y` + `blur-radius` + `color`. |
| **`overflow`** (Xử lý nội dung tràn khung) | • `overflow: hidden;`<br>• `overflow: auto;`<br>• `overflow: scroll;` | Gộp cả `overflow-x` (ngang) và `overflow-y` (dọc).<br>• `hidden`: Cắt bỏ phần thừa ra ngoài khung.<br>• `auto`: Tự động hiện thanh cuộn chỉ khi nội dung vượt quá kích thước. |
| **`transition`** (Hiệu ứng chuyển động mượt) | `transition: all 0.3s ease-in-out;` | Gộp: `transition-property` (`all` hoặc `background-color`) + `transition-duration` (`0.3s` thời gian chạy) + `transition-timing-function` (`ease`, `linear`, `ease-in-out`). |
| **`flex`** (Co giãn trong Flexbox) | `flex: 1;` hoặc `flex: 0 0 250px;` | Gộp: `flex-grow` (độ dãn) + `flex-shrink` (độ co) + `flex-basis` (kích thước gốc ban đầu). `flex: 1;` là viết tắt của `flex: 1 1 0%;` (chiếm hết khoảng trống còn lại). |
| **`list-style`** (Dấu đầu dòng danh sách `<ul>`) | `list-style: none;` | Viết tắt xóa sạch chấm tròn mặc định của thẻ `<ul>` và `<li>` (gộp của `list-style-type`, `list-style-position`, `list-style-image`). |

#### 💻 Ví dụ code minh họa: So sánh viết dài (Longhand) vs viết ngắn gọn (Shorthand)
```html
<style>
  /* CÁCH 1: VIẾT DÀI DÒNG (LONGHAND) - TỐN THỜI GIAN TRONG PHÒNG THI */
  .card-longhand {
    margin-top: 20px;
    margin-right: auto;
    margin-bottom: 20px;
    margin-left: auto;
    padding-top: 15px;
    padding-right: 25px;
    padding-bottom: 15px;
    padding-left: 25px;
    border-width: 2px;
    border-style: solid;
    border-color: #006699;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
    background-color: #ffffff;
    font-family: Arial, sans-serif;
    font-size: 15px;
    font-weight: bold;
    line-height: 1.5;
  }

  /* CÁCH 2: VIẾT NGẮN GỌN (SHORTHAND) - CHỈ VỎN VẸN 6 DÒNG! */
  .card-shorthand {
    margin: 20px auto;                     /* Trên-Dưới: 20px | Trái-Phải: Tự căn giữa */
    padding: 15px 25px;                    /* Trên-Dưới: 15px | Trái-Phải: 25px */
    border: 2px solid #006699;             /* Độ dày: 2px | Kiểu viền: Liền | Màu: Xanh */
    border-radius: 8px;                    /* Bo tròn đều 4 góc */
    background: #ffffff;                   /* Màu nền trắng */
    font: bold 15px/1.5 Arial, sans-serif; /* Đậm, cỡ 15px, giãn dòng 1.5, phông Arial */
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);/* Đổ bóng nhẹ phía dưới */
  }
</style>

<div class="card-shorthand">
  Khung này được định dạng hoàn toàn bằng các thuộc tính CSS Shorthand siêu ngắn gọn!
</div>
```

---

### 2.5. Định vị (`position`) & Mẫu chữ/nhãn đè lên ảnh

```css
/* MẪU KINH ĐIỂN: Đặt Tên ứng viên hoặc Nhãn giảm giá (-20%) đè lên góc ảnh */
.image-wrapper {
  position: relative;
  width: 300px;
}
.image-wrapper img {
  width: 100%;
  display: block;
}
.overlay-text {
  position: absolute;
  bottom: 12px;
  left: 16px;
  color: #000;
  font-size: 22px;
  font-weight: bold;
}
```

#### 📖 Bảng giải thích cơ chế `position` và đoạn code trên:
| Thuộc tính / Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `position: static;` | Giá trị mặc định của mọi thẻ HTML (không thể dùng `top`, `bottom`, `left`, `right`). |
| `position: relative;` | Đặt trên thẻ cha `.image-wrapper` để biến khung ảnh thành **mốc tọa độ gốc** cho các thẻ con bên trong (bản thân nó vẫn đứng yên tại chỗ). |
| `position: absolute;` | Đặt trên thẻ con `.overlay-text` để tách chữ ra khỏi luồng bình thường và **trôi nổi đè lên trên ảnh**, căn vị trí theo thẻ cha `.image-wrapper` gần nhất có `position: relative`. |
| `bottom: 12px; left: 16px;` | Neo dòng chữ cách cạnh đáy của ảnh `12px` và cách cạnh trái của ảnh `16px` (giống hệt tên `Nguyễn Văn C` trong đề thi CV). Nếu muốn đặt ở góc trên bên phải thì đổi thành `top: 10px; right: 10px;`. |
| `position: fixed;` | Neo cố định theo **màn hình trình duyệt (viewport)**, khi cuộn chuột lên/xuống phần tử vẫn đứng yên. |

---

### 2.6. Thuộc Tính `display` Trong CSS & Các Mẫu Bố Cục (Layout) Cốt Lõi

Thuộc tính `display` xác định kiểu hiển thị của một phần tử trên trang web, quyết định cách phần tử đó tương tác với các phần tử xung quanh và cách nó quản lý các phần tử con bên trong.

#### A. Bảng từ điển chi tiết các giá trị của `display` (1 cột Cú pháp - 1 cột Giải thích)
| Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `display: block;` | **Khối độc lập**: Phần tử luôn **bắt đầu trên 1 dòng mới** và tự động chiếm **100% chiều ngang** của thẻ cha. Thiết lập được `width`, `height`, `padding`, `margin` (kể cả trên/dưới). Mặc định trên các thẻ: `<div>`, `<p>`, `<h1>`-`<h6>`, `<form>`, `<header>`, `<footer>`, `<section>`,... |
| `display: inline;` | **Nội dòng**: Phần tử nằm **chung hàng với các chữ và phần tử khác**, chỉ chiếm chiều ngang vừa khít với nội dung bên trong, **không xuống dòng**. **Đặc biệt lưu ý:** **KHÔNG THỂ** chỉnh được `width`, `height`, và `margin-top` / `margin-bottom`! Mặc định trên các thẻ: `<span>`, `<a>`, `<strong>`, `<em>`, `<label>`,... |
| `display: inline-block;` | **Lai giữa Inline và Block**: Vừa nằm **ngang hàng** với các phần tử khác trên cùng một dòng (như `inline`), nhưng **VẪN THIẾT LẬP ĐƯỢC** `width`, `height`, `padding`, `margin` (như `block`). Rất hay dùng cho thẻ `<a>` muốn biến thành nút bấm có kích thước cố định (`width: 140px; padding: 10px;`). |
| `display: none;` | **Ẩn hoàn toàn phần tử**: Phần tử bị gỡ bỏ khỏi luồng hiển thị của trang web như thể nó không hề tồn tại (không chiếm bất kỳ khoảng trống nào). Dùng nhiều nhất trong JavaScript để ẩn Form, ẩn Modal, hoặc ẩn hàng trong bảng (`el.style.display = "none"`). |
| `display: flex;` | **Bố cục Flexbox 1 chiều (theo hàng hoặc theo cột)**: Biến thẻ cha thành khung Flex Container, các thẻ con trực tiếp bên trong sẽ tự động dàn thành hàng ngang và căn chỉnh khoảng cách linh hoạt bằng `gap`, `justify-content`, `align-items`. |
| `display: inline-flex;` | Giống như `flex`, nhưng bản thân khung cha hiển thị như một phần tử `inline` thay vì chiếm trọn 100% bề ngang. |
| `display: grid;` | **Bố cục CSS Grid 2 chiều (gồm cả hàng và cột)**: Cho phép chia lưới thành các cột có độ rộng bằng nhau hoặc linh hoạt (`grid-template-columns: repeat(4, 1fr)`). |
| `display: table;` / `table-cell;` | Hiển thị phần tử theo hành vi của thẻ `<table>` hoặc `<td>` (hữu ích khi muốn căn giữa chữ theo chiều dọc bằng `vertical-align: middle`). |

#### ⚠️ So sánh 3 cách ẩn phần tử trong CSS:
- `display: none;`: Ẩn mất tích, **KHÔNG** chiếm chỗ trống trên trang web.
- `visibility: hidden;`: Ẩn đi nhưng **VẪN GIỮ NGUYÊN** khoảng trống kích thước của phần tử trên trang web.
- `opacity: 0;`: Phần tử chỉ trở nên trong suốt 100%, **vẫn chiếm chỗ** và **vẫn click chuột trúng được**.

#### B. Các mẫu Bố cục (Layout) thực chiến bằng Flexbox & CSS Grid
```css
/* 1. BỐ CỤC 2 CỘT (Cột trái cố định + Cột phải tự co giãn - Đề CV / Tin tức) */
.layout-2col {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}
.sidebar { width: 300px; }
.content { flex: 1; }

/* 2. BỐ CỤC LƯỚI N CỘT ĐỀU NHAU (Đề Bán sách 4 cột / Đề Mượn sách 3 cột) */
.grid-products {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  text-align: center;
}

/* 3. BỐ CỤC DÒNG FORM NGANG (Label bên trái, Input bên phải trên cùng 1 hàng) */
.form-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.form-row label { width: 140px; font-weight: bold; }
.form-row input, .form-row select { flex: 1; padding: 6px 8px; }

/* 4. THANH TIẾN TRÌNH (PROGRESS BAR - Đề Kỹ năng CV) */
.progress-bg {
  width: 100%;
  background-color: #f1f1f1;
  border-radius: 12px;
  overflow: hidden;
}
.progress-fill {
  background-color: #009688;
  color: #fff;
  font-size: 12px;
  text-align: center;
  padding: 2px 0;
  border-radius: 12px;
}
```

#### 📖 Bảng giải thích các thuộc tính Flexbox, Grid & Progress Bar ở trên:
| Thuộc tính / Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `display: flex;` | Bật chế độ **Flexbox** trên thẻ cha: tự động xếp tất cả các thẻ con trực tiếp bên trong nằm **ngang hàng nhau** từ trái sang phải. |
| `gap: 20px;` | Tạo khoảng cách trống `20px` đều đặn giữa các cột hoặc các ô trong lưới (dùng được cho cả `flex` và `grid`). |
| `align-items: flex-start;` | Căn các cột con bám sát mép trên cùng (không tự kéo giãn chiều cao cột ngắn bằng cột dài). |
| `align-items: center;` | Căn các phần tử con trên cùng 1 dòng nằm **thẳng hàng chính giữa theo chiều dọc** (rất hữu ích khi xếp `label` ngang hàng với `input`). |
| `justify-content: space-between;` | Đẩy phần tử đầu sát lề trái, phần tử cuối sát lề phải, các phần tử giữa chia đều khoảng cách (dùng cho thanh menu / header). |
| `flex: 1;` | Đặt trên thẻ con (`.content` hoặc `input`): bảo phần tử đó **tự động phình ra chiếm hết toàn bộ chiều ngang còn trống** của hàng. |
| `display: grid;` | Bật chế độ **CSS Grid** (hệ thống lưới 2 chiều gồm hàng và cột). |
| `grid-template-columns: repeat(4, 1fr);` | Chia lưới thành **4 cột có chiều rộng bằng nhau** (`1fr` = 1 phần bằng nhau). Nếu đề yêu cầu 3 cột thì đổi số `4` thành `3`. Khi hết 4 phần tử trên 1 hàng, phần tử thứ 5 sẽ tự động xuống hàng tiếp theo! |
| `overflow: hidden;` | Đặt trên `.progress-bg`: cắt gọn phần góc thừa của thanh màu xanh bên trong để không bị tràn ra ngoài khung bo tròn `border-radius: 12px`. |

### 2.7. Định dạng Bảng biểu (`<table>`), Hình ảnh (`<img>`) & Hiệu ứng CSS3
- **Bảng biểu có đường viền đơn sắc nét:**
  - `table { width: 100%; border-collapse: collapse; }` (Gộp viền đôi thành viền đơn).
  - `th, td { border: 1px solid #333; padding: 8px; vertical-align: middle; }`
- **Giữ tỷ lệ hình ảnh đồng đều không bị méo:**
  - `img.thumb { width: 120px; height: 160px; object-fit: cover; }` (`cover`: lấp đầy khung; `contain`: thấy trọn vẹn ảnh).
- **Thứ tự thẻ `<a>` bắt buộc (LVHA):** `:link` $\rightarrow$ `:visited` $\rightarrow$ `:hover` $\rightarrow$ `:active`.
- **Hiệu ứng CSS3 thông dụng:**
  - Bo góc: `border-radius: 8px;` (hình tròn: `50%`).
  - Đổ bóng hộp: `box-shadow: 0 4px 10px rgba(0,0,0,0.15);`
  - Chuyển cảnh mượt: `transition: all 0.3s ease;`
  - Biến đổi: `transform: scale(1.05) translateY(-3px) rotate(5deg);`

---

### 2.8. Các Đơn Vị Đo Lường Trong CSS (`px`, `em`, `rem`, `%`, `vw`, `vh`, `fr`)
> **Quy ước mặc định của trình duyệt:** Nếu không chỉnh sửa gì ở thẻ gốc `<html>`, kích thước chữ mặc định luôn là **`16px`** (tức là `1rem = 16px`).

| Đơn vị / Cú pháp Code | Giải thích chi tiết ý nghĩa, Cách quy đổi & Khi nào nên dùng |
| :--- | :--- |
| `px` (*Pixels*) | **Đơn vị tuyệt đối (Cố định)**: 1 điểm ảnh trên màn hình (`10px`, `200px`). Kích thước cố định, không tự co giãn theo cỡ chữ của người dùng. Thường dùng cho độ dày viền (`border: 1px`), bo góc (`border-radius: 8px`), hoặc khoảng cách nhỏ cố định. |
| `em` (*Element*) | **Đơn vị tương đối theo phần tử CHA trực tiếp** (hoặc chính nó): `1em` bằng đúng `font-size` của phần tử cha chứa nó.<br>• *Ví dụ:* Thẻ `<div style="font-size: 20px">` chứa thẻ `<p style="font-size: 1.5em">` $\rightarrow$ Cỡ chữ của `<p>` sẽ là $1.5 \times 20\text{px} = 30\text{px}$.<br>• **Bẫy cộng dồn (Compounding):** Nếu lồng nhiều thẻ `div` dùng `em` vào nhau, cỡ chữ sẽ bị nhân dồn liên tiếp rất dễ vỡ giao diện! |
| `rem` (*Root em*) | **Đơn vị tương đối theo phần tử GỐC `<html>`** (*lưu ý: thường bị gõ nhầm thành `fem`*): `1rem` luôn bằng `font-size` của thẻ `<html>` (mặc định là **`16px`**), bất kể lồng sâu bao nhiêu cấp thẻ cha.<br>• *Cách quy đổi nhanh:* `0.5rem = 8px` \| `0.75rem = 12px` \| `1rem = 16px` \| `1.25rem = 20px` \| `1.5rem = 24px` \| `2rem = 32px`.<br>• **Khuyên dùng:** Chuẩn hiện đại để đặt `font-size`, `padding`, `margin` đồng bộ trên toàn trang web. |
| `%` (*Phần trăm*) | **Đơn vị tương đối theo kích thước của THẺ CHA chứa nó**:<br>• `width: 50%;` $\rightarrow$ Chiều rộng bằng một nửa chiều rộng của thẻ cha.<br>• `width: 100%;` $\rightarrow$ Trải rộng kín hết chiều ngang của thẻ cha. |
| `vw` (*Viewport Width*) | **Phần trăm chiều rộng MÀN HÌNH trình duyệt**: `1vw` = 1% chiều rộng cửa sổ trình duyệt; `100vw` = toàn bộ chiều ngang màn hình (không phụ thuộc thẻ cha). |
| `vh` (*Viewport Height*) | **Phần trăm chiều cao MÀN HÌNH trình duyệt**: `1vh` = 1% chiều cao cửa sổ trình duyệt; `100vh` = cao kín hết chiều dọc màn hình (rất hay dùng để căn giữa form đăng nhập giữa màn hình: `min-height: 100vh;`). |
| `fr` (*Fraction*) | **Phần bằng nhau của khoảng trống còn lại (Chỉ dùng trong CSS Grid)**:<br>• `grid-template-columns: 1fr 2fr 1fr;` $\rightarrow$ Chia hàng thành 4 phần: cột 1 chiếm 1 phần (25%), cột 2 chiếm 2 phần (50%), cột 3 chiếm 1 phần (25%). |
| `calc(...)` | **Hàm tính toán kết hợp nhiều đơn vị khác nhau**:<br>• *Ví dụ:* `width: calc(100% - 250px);` (Lấy toàn bộ chiều ngang trừ đi 250px của thanh Sidebar cố định). Nhớ bắt buộc phải có **dấu cách** ở 2 bên dấu `+` hoặc `-`! |

#### 💻 Ví dụ code minh họa: Sự khác biệt giữa `px`, `em`, `rem`, `%`, `vh` và `calc()`
```html
<style>
  /* 1. Đặt cỡ chữ gốc cho thẻ html: 1rem = 16px */
  html {
    font-size: 16px;
  }

  /* 2. Dùng vh và % để tạo khung chiếm trọn chiều cao màn hình */
  .page-wrapper {
    width: 90%;             /* Chiếm 90% chiều ngang của thẻ body */
    min-height: 100vh;      /* Cao tối thiểu bằng 100% màn hình thiết bị */
    margin: 0 auto;
  }

  /* 3. So sánh rem (theo gốc html) và em (nhân theo thẻ cha) */
  .parent-box {
    font-size: 20px;        /* Cỡ chữ của cha là 20px */
    padding: 1.5rem;        /* 1.5 * 16px (gốc html) = 24px */
    border: 2px solid #333; /* Dùng px cố định cho đường viền */
  }
  .child-em {
    font-size: 1.5em;       /* Nhân theo cha: 1.5 * 20px = 30px */
  }
  .child-rem {
    font-size: 1.5rem;      /* Nhân theo gốc html: 1.5 * 16px = 24px (không bị ảnh hưởng bởi 20px của cha) */
  }

  /* 4. Dùng calc() để chia cột Sidebar cố định (220px) + Nội dung tự co giãn */
  .main-content {
    width: calc(100% - 220px);
  }
</style>

<div class="page-wrapper">
  <div class="parent-box">
    Chữ trong thẻ cha (20px)
    <p class="child-em">Chữ dùng 1.5em -> Thành 30px (nhân theo cha 20px)</p>
    <p class="child-rem">Chữ dùng 1.5rem -> Thành 24px (nhân theo gốc html 16px)</p>
  </div>
</div>
```

---

### 2.9. Thay Đổi Bố Cục & Vị Trí Trang Web Theo Thiết Bị (Responsive Web Design & Media Queries)
Để một trang web tự động **đổi số cột, đổi kích thước hoặc đảo vị trí các khối** khi xem trên **Máy tính (Desktop)**, **Máy tính bảng (Tablet)** và **Điện thoại (Mobile)**, ta kết hợp **Thẻ Meta Viewport** và **`@media` (Media Queries)**:

#### A. Bảng các kỹ thuật Responsive & Đảo vị trí theo thiết bị (1 cột Code - 1 cột Giải thích)
| Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | Đặt trong `<head>`: Bắt buộc phải có để trình duyệt điện thoại nhận diện đúng chiều rộng thực tế của màn hình (`device-width`), nếu thiếu thẻ này thì `@media` trên điện thoại sẽ không hoạt động! |
| `@media (max-width: 992px) { ... }` | **Desktop-first (Viết cho máy tính trước, thu nhỏ dần)**: Áp dụng CSS bên trong khi chiều rộng màn hình **nhỏ hơn hoặc bằng `992px`** (Máy tính bảng / Tablet). |
| `@media (max-width: 576px) { ... }` | Áp dụng CSS bên trong khi chiều rộng màn hình **nhỏ hơn hoặc bằng `576px`** (Điện thoại / Mobile). |
| `@media (min-width: 768px) { ... }` | **Mobile-first (Viết cho điện thoại trước, mở rộng dần)**: Áp dụng CSS bên trong khi màn hình **từ `768px` trở lên**. |
| `flex-direction: column;` | Đặt trong `@media`: Chuyển các cột đang nằm ngang (`row` trên máy tính) thành **xếp chồng dọc từ trên xuống dưới** khi xem trên điện thoại. |
| `flex-direction: column-reverse;` | Xếp chồng dọc nhưng **đảo ngược thứ tự từ dưới lên trên** (VD: đưa khối phải lên nằm trên khối trái khi xuống màn hình điện thoại). |
| `order: 1;` / `order: 2;` / `order: -1;` | **Đảo vị trí bất kỳ phần tử con nào trong Flexbox hoặc Grid** mà không cần sửa thứ tự HTML! Mặc định mọi phần tử có `order: 0`. Phần tử nào có số **`order` nhỏ hơn sẽ đứng trước (lên trên / sang trái)**, số lớn hơn sẽ bị đẩy ra sau (xuống dưới / sang phải). |
| `grid-template-columns: repeat(2, 1fr);` | Trong `@media (max-width: 992px)`: Giảm lưới sản phẩm từ **4 cột** (trên máy tính) xuống còn **2 cột** (trên Tablet) và `1fr` (**1 cột** trên điện thoại). |
| `display: none;` (trong `@media`) | Ẩn bớt các thành phần phụ (như banner quảng cáo, cột phụ bên phải) khi màn hình quá nhỏ trên điện thoại. |

#### 💻 Ví dụ code minh họa: Thay đổi số cột & Đảo vị trí Sidebar / Nội dung khi đổi từ Máy tính sang Điện thoại
```html
<style>
  /* --- GIAO DIỆN MẶC ĐỊNH TRÊN MÁY TÍNH (DESKTOP > 992px) --- */
  .page-layout {
    display: flex;
    gap: 20px;
  }
  .sidebar-left {
    width: 280px;
    background: #e3f2fd;
    padding: 16px;
    order: 1; /* Trên máy tính: Cột Danh mục đứng bên trái (số 1) */
  }
  .main-articles {
    flex: 1;
    background: #fff8e1;
    padding: 16px;
    order: 2; /* Trên máy tính: Nội dung chính đứng bên phải (số 2) */
  }

  /* Lưới sản phẩm: Mặc định trên máy tính hiển thị 4 cột */
  .product-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-top: 20px;
  }
  .product-item {
    border: 1px solid #ccc;
    padding: 12px;
    text-align: center;
  }

  /* --- KHI XEM TRÊN MÁY TÍNH BẢNG (TABLET <= 992px) --- */
  @media (max-width: 992px) {
    .product-grid {
      grid-template-columns: repeat(2, 1fr); /* Giảm từ 4 cột xuống 2 cột */
    }
  }

  /* --- KHI XEM TRÊN ĐIỆN THOẠI (MOBILE <= 576px) --- */
  @media (max-width: 576px) {
    .page-layout {
      flex-direction: column; /* Chuyển từ 2 cột ngang thành xếp chồng dọc */
    }
    .sidebar-left {
      width: 100%;
      order: 2; /* ĐẢO VỊ TRÍ: Đẩy Sidebar xuống dưới (order: 2) */
    }
    .main-articles {
      width: 100%;
      order: 1; /* ĐẢO VỊ TRÍ: Đưa Nội dung chính lên đầu trang (order: 1) */
    }
    .product-grid {
      grid-template-columns: 1fr; /* Giảm xuống còn 1 cột duy nhất */
    }
  }
</style>

<div class="page-layout">
  <aside class="sidebar-left">Khối Sidebar (Trái ở PC -> Xuống dưới ở Mobile)</aside>
  <main class="main-articles">Khối Nội dung chính (Phải ở PC -> Lên đầu ở Mobile)</main>
</div>

<div class="product-grid">
  <div class="product-item">Sản phẩm 1</div>
  <div class="product-item">Sản phẩm 2</div>
  <div class="product-item">Sản phẩm 3</div>
  <div class="product-item">Sản phẩm 4</div>
</div>
```

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

#### 💻 Ví dụ code minh họa: Phạm vi biến (`var` / `let` / `const`) và các bẫy toán tử
```javascript
// 1. Sự khác biệt về phạm vi (Scope) giữa var và let/const
if (true) {
  var bienVar = "Dùng được cả bên ngoài khối if (Function Scope)";
  let bienLet = "Chỉ tồn tại bên trong cặp ngoặc nhọn {} (Block Scope)";
  const PI = 3.14; // Hằng số, nếu gán lại PI = 3.15 sẽ báo lỗi TypeError
}
console.log(bienVar); // In ra bình thường
// console.log(bienLet); // Lỗi ReferenceError: bienLet is not defined

// 2. Bẫy cộng chuỗi (+) và trừ số (-)
console.log("10" + 2);       // Kết quả: "102" (Nối chuỗi)
console.log("10" - 2);       // Kết quả: 8     (Ép kiểu sang số để trừ)
console.log("10" - 2 + "5"); // Kết quả: "85"  (10 - 2 = 8, sau đó 8 + "5" = "85")

// 3. Kiểm tra NaN và phân biệt || với ??
let diemThi = 0;
console.log(diemThi || 10);  // Kết quả: 10 (Vì 0 bị coi là Falsy nên nhảy sang lấy 10 -> Sai logic điểm 0!)
console.log(diemThi ?? 10);  // Kết quả: 0  (Vì ?? chỉ lấy 10 khi diemThi là null hoặc undefined)
```

### 3.2. Ép kiểu & Định dạng tiền tệ Việt Nam
```javascript
// 1. Ép kiểu từ ô input (luôn kèm || 0 để chống NaN khi ô trống)
let qty   = parseInt(document.getElementById("qty").value) || 0;
let price = parseFloat(document.getElementById("price").value) || 0;

// 2. Định dạng tiền có dấu chấm phân cách hàng nghìn (VD: 120000 -> "120.000 đ")
let formatted = total.toLocaleString("vi-VN") + " đ";

// 3. Ngược lại: Xóa dấu chấm/chữ để lấy lại số từ chuỗi "120.000 đ" -> 120000
let rawNumber = parseFloat(str.replace(/\./g, "").replace(/[^\d]/g, "")) || 0;
```

#### 📖 Bảng giải thích các hàm Ép kiểu & Định dạng số ở trên:
| Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `parseInt(str)` | Chuyển chuỗi `str` sang **số nguyên** (VD: `"15"` $\rightarrow$ `15`). Dùng cho Số lượng, Tuổi, Số ngày. |
| `parseFloat(str)` | Chuyển chuỗi `str` sang **số thực** (giữ cả phần thập phân, VD: `"12.5"` $\rightarrow$ `12.5`). Dùng cho Đơn giá, Điểm số. |
| `... \|\| 0` | Nếu người dùng để trống ô input thì `parseInt("")` sẽ trả về `NaN` (làm hỏng phép cộng). Thêm `\|\| 0` giúp tự động biến `NaN` thành số `0`. |
| `total.toLocaleString("vi-VN")` | Tự động chèn dấu chấm phân cách hàng nghìn theo chuẩn Việt Nam (VD: số `1250000` $\rightarrow$ chuỗi `"1.250.000"`). |
| `str.replace(/\./g, "")` | Xóa toàn bộ dấu chấm `.` trong chuỗi tiền tệ (`g` là *global* - xóa tất cả các dấu chấm chứ không chỉ dấu đầu tiên). |

---

### 3.3. Đối tượng `Date` (Lấy Ngày Giờ Hệ Thống & Tính Số Ngày Thuê/Mượn)
> **Bẫy chết người:** `now.getMonth()` trả về từ **0 đến 11** $\rightarrow$ Bắt buộc phải **`+ 1`**! `now.getDay()` trả về từ **0 (Chủ Nhật) đến 6 (Thứ Bảy)**.

```javascript
// 1. Lấy Thứ, Ngày, Tháng, Năm, Giờ hiện tại
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

// 2. Tính số ngày chênh lệch giữa 2 ô <input type="date"> (Đặt phòng khách sạn / Thuê xe / Mượn sách)
const d1 = new Date(document.getElementById("ngayNhan").value);
const d2 = new Date(document.getElementById("ngayTra").value);
const soNgay = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
if (soNgay <= 0) {
  alert("Ngày trả phải lớn hơn ngày nhận!");
}
```

#### 📖 Bảng giải thích các phương thức của `Date` ở trên:
| Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `new Date()` | Lấy thời điểm ngày giờ hiện tại của máy tính (nếu truyền chuỗi `"2026-10-25"` vào trong ngoặc thì tạo mốc ngày đó). |
| `now.getDay()` | Lấy **Thứ trong tuần**, trả về số từ `0` đến `6` (`0` là Chủ Nhật, `1` là Thứ 2, ..., `6` là Thứ 7). |
| `now.getDate()` | Lấy **Ngày trong tháng** (`1` đến `31`). |
| `now.getMonth() + 1` | Lấy **Tháng trong năm**: vì JS đánh số tháng từ `0` (tháng 1) đến `11` (tháng 12) nên bắt buộc phải cộng thêm `1`. |
| `now.getFullYear()` | Lấy **Năm** đầy đủ 4 chữ số (VD: `2026`). |
| `now.getHours()`, `getMinutes()`, `getSeconds()` | Lấy Giờ (`0-23`), Phút (`0-59`), Giây (`0-59`). |
| `.padStart(2, "0")` | Nếu chuỗi chỉ có 1 ký tự (VD: ngày `"5"`), tự động đệm thêm số `"0"` vào bên trái thành `"05"`. |
| `(d2 - d1) / (1000 * 60 * 60 * 24)` | Phép trừ 2 đối tượng `Date` trả về độ lệch tính bằng **mili-giây (ms)**. Chia cho `1000 * 60 * 60 * 24` ($= 86.400.000\text{ ms}$) để đổi từ mili-giây ra **số ngày**. |
| `Math.ceil(x)` | Làm tròn lên số nguyên gần nhất (VD: thuê `1.2` ngày tính thành `2` ngày). |

---

### 3.4. Bảng Tổng Hợp Các Hàm Xử Lý Mảng (Array) & Chuỗi (String) Cốt Lõi
```javascript
// --- CÁC HÀM MẢNG (ARRAY) DÙNG CHO GIỎ HÀNG / DANH SÁCH ---
let list = JSON.parse(localStorage.getItem("data")) || [];

list.push({ id: "SP1", name: "Áo", price: 120000, qty: 1 });
let found = list.find(item => item.id === "SP1");
if (found) found.qty += 1;
list.splice(index, 1);
let ketQuaLoc = list.filter(item => item.name.toLowerCase().includes(tuKhoa.toLowerCase()));
list.sort((a, b) => a.price - b.price);
let tongTien = list.reduce((sum, item) => sum + item.price * item.qty, 0);

tbody.innerHTML = list.map((item, idx) => `
  <tr data-index="${idx}">
    <td>${item.name}</td>
    <td>${item.price.toLocaleString("vi-VN")} đ</td>
  </tr>
`).join("");
```

#### 📖 Bảng giải thích từng hàm Mảng (Array) & Chuỗi (String) ở trên:
| Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `list.push(phanTuMoi)` | Thêm 1 phần tử mới vào **cuối mảng** `list`. |
| `list.find(item => điều_kiện)` | Tìm và trả về **phần tử đầu tiên** trong mảng thỏa mãn điều kiện (nếu không có trả về `undefined`). Rất tiện để kiểm tra món hàng đã có trong giỏ chưa để cộng dồn `qty += 1`. |
| `list.splice(index, 1)` | Xóa phần tử tại vị trí thứ `index`, số lượng xóa là `1` phần tử (dùng khi bấm nút `"Xóa"` dòng thứ `index`). |
| `list.filter(item => điều_kiện)` | Lọc và trả về một **mảng mới** chỉ chứa các phần tử thỏa mãn điều kiện. |
| `str.toLowerCase().includes(sub)` | Đổi chuỗi về chữ thường rồi kiểm tra xem có chứa chuỗi con `sub` bên trong không (trả về `true`/`false`). |
| `list.sort((a, b) => a.price - b.price)` | Sắp xếp mảng số **tăng dần** theo `price` (nếu muốn sắp xếp **giảm dần** thì lấy `b.price - a.price`). |
| `list.reduce((sum, item) => sum + ..., 0)` | Duyệt qua toàn bộ mảng để cộng dồn thành **1 con số tổng duy nhất** (`sum` khởi đầu từ `0`). |
| `list.map(...).join("")` | `.map()` biến mỗi phần tử trong mảng thành 1 chuỗi `<tr>...</tr>`, sau đó `.join("")` nối tất cả các chuỗi đó lại liền mạch (không có dấu phẩy ngăn cách) để gán vào `tbody.innerHTML`. |

---

### 3.5. Giải Thích Chi Tiết Biểu Thức Chính Quy (Regex) Từ Cơ Bản Đến Thực Chiến

Cú pháp kiểm tra một chuỗi có khớp mẫu Regex hay không:
```javascript
const regex = /^2\d{7}$/;
let isHopLe = regex.test(chuoiCanKiemTra); // Trả về true nếu hợp lệ, false nếu sai
```

#### A. Bảng từ điển giải nghĩa từng ký hiệu cấu tạo nên Regex (1 cột Ký hiệu - 1 cột Giải thích)
| Ký hiệu trong Regex | Giải thích chi tiết ý nghĩa & Ví dụ minh họa |
| :--- | :--- |
| `/ ... /` | Cặp dấu gạch chéo bao bọc ở 2 đầu để báo cho JavaScript biết đây là một biểu thức Regex. |
| `^` (Đặt ở đầu mẫu) | **Neo bắt đầu chuỗi**: Bắt buộc chuỗi phải bắt đầu ngay bằng ký tự đứng sau dấu `^` (VD: `/^2/` nghĩa là ký tự đầu tiên bắt buộc là số `2`). |
| `$` (Đặt ở cuối mẫu) | **Neo kết thúc chuỗi**: Bắt buộc chuỗi phải kết thúc ngay tại đây, không được thừa thêm ký tự nào phía sau. **Lưu ý:** Kiểm tra Form luôn phải có cả `^` ở đầu và `$` ở cuối! |
| `\d` (*Digit*) | Đại diện cho **1 chữ số bất kỳ từ `0` đến `9`** (viết tắt của `[0-9]`). Ngược lại `\D` là ký tự **không** phải chữ số. |
| `\w` (*Word*) | Đại diện cho **1 ký tự chữ cái không dấu, chữ số hoặc dấu gạch dưới `_`** (`[a-zA-Z0-9_]`). |
| `\s` (*Space*) | Đại diện cho **1 khoảng trắng** (dấu cách, phím Tab, xuống dòng). Ngược lại `\S` là ký tự **không** phải khoảng trắng. |
| `.` (Dấu chấm) | Đại diện cho **1 ký tự bất kỳ** (trừ ký tự xuống dòng). |
| `\.` (Có gạch chéo ngược) | Vì dấu `.` có ý nghĩa đặc biệt nên khi muốn kiểm tra **dấu chấm thật** (như trong `.com`, `.edu.vn`), phải thêm `\` phía trước thành `\.`. |
| `[abc]` hoặc `[35789]` | **Tập hợp lựa chọn (1 ký tự)**: Khớp với **1 ký tự** nằm trong ngoặc vuông. VD: `[35789]` nghĩa là chỉ chấp nhận 1 số là `3`, `5`, `7`, `8` hoặc `9`. |
| `[a-z]`, `[A-Z]`, `[0-9]` | **Dải ký tự**: `[a-z]` là 1 chữ thường; `[A-Z]` là 1 chữ hoa; `[a-zA-ZÀ-ỹ\s]` là chữ cái tiếng Việt (cả hoa, thường, có dấu) và dấu cách. |
| `[^abc]` (`^` trong `[]`) | **Phủ định (Loại trừ)**: Khi dấu `^` nằm **bên trong** ngoặc vuông `[...]`, nó có nghĩa là **"KHÔNG được chứa"**. VD: `[^\s@]` nghĩa là 1 ký tự bất kỳ miễn không phải khoảng trắng `\s` và không phải `@`. |
| `{n}` (VD: `\d{7}`) | **Số lượng chính xác**: Ký tự đứng ngay trước nó phải lặp lại **đúng `n` lần** (VD: `\d{7}` là đúng 7 chữ số liên tiếp). |
| `{n,m}` (VD: `\d{8,10}`) | **Số lượng trong khoảng**: Lặp lại **từ `n` đến tối đa `m` lần** (VD: từ 8 đến 10 chữ số). |
| `{n,}` (VD: `.{8,}`) | **Số lượng tối thiểu**: Lặp lại **ít nhất `n` lần trở lên** (VD: `.{8,}` là độ dài từ 8 ký tự trở lên). |
| `+` | Lặp lại **từ 1 lần trở lên** (tương đương `{1,}`). VD: `\d+` là có ít nhất 1 chữ số. |
| `*` | Lặp lại **từ 0 lần trở lên** (có cũng được, không có cũng được – tương đương `{0,}`). |
| `?` | Xuất hiện **0 hoặc 1 lần** (tùy chọn có hoặc không – tương đương `{0,1}`). |
| `(A\|B)` | Toán tử **HOẶC**: khớp với mẫu `A` hoặc mẫu `B` (VD: `/^(Nam\|Nữ)$/`). |
| `(?=.*[A-Z])` | **Kiểm tra điều kiện nhìn trước (Lookahead)**: Yêu cầu trong chuỗi bắt buộc phải có xuất hiện ít nhất 1 chữ cái in hoa `[A-Z]` ở vị trí bất kỳ. |

#### B. Bảng phân tích từng cụm trong các mẫu Regex thường gặp nhất
| Yêu cầu kiểm tra | Biểu thức Regex chuẩn | Giải thích chi tiết từng thành phần ghép lại |
| :--- | :--- | :--- |
| **MSSV UIT** (8 chữ số, bắt đầu bằng số 2) | `/^2\d{7}$/` | • `^`: Bắt đầu chuỗi<br>• `2`: Ký tự đầu tiên bắt buộc là số `2`<br>• `\d{7}`: Theo sau là đúng `7` chữ số nữa (tổng cộng $1 + 7 = 8$ số)<br>• `$`: Kết thúc chuỗi |
| **Mã khách hàng / Mã hóa đơn** (`KH` + 4 chữ số, VD: `KH0125`) | `/^KH\d{4}$/` | • `^KH`: Bắt đầu bằng đúng 2 chữ in hoa `KH`<br>• `\d{4}`: Theo sau là đúng `4` chữ số từ 0-9<br>• `$`: Kết thúc chuỗi |
| **Số điện thoại Việt Nam** (10 số, đầu 03, 05, 07, 08, 09) | `/^0[35789]\d{8}$/` | • `^0`: Bắt đầu bằng số `0`<br>• `[35789]`: Chữ số thứ 2 phải là `3`, `5`, `7`, `8` hoặc `9`<br>• `\d{8}`: Theo sau là đúng `8` chữ số nữa (tổng $1 + 1 + 8 = 10$ số)<br>• `$`: Kết thúc chuỗi |
| **Địa chỉ Email chuẩn** (VD: `sv@uit.edu.vn`) | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | • `^[^\s@]+`: Phần tên trước `@` có ít nhất 1 ký tự (không chứa khoảng trắng và `@`)<br>• `@`: Phải có ký tự `@`<br>• `[^\s@]+`: Tên miền sau `@` có ít nhất 1 ký tự<br>• `\.`: Phải có dấu chấm `.`<br>• `[^\s@]+$`: Đuôi tên miền (`com`, `vn`) ở cuối |
| **Họ và tên tiếng Việt** (Chỉ chứa chữ cái & khoảng trắng) | `/^[a-zA-ZÀ-ỹ\s]+$/` | • `[a-zA-ZÀ-ỹ\s]+`: Chỉ cho phép các chữ cái không dấu (`a-z`, `A-Z`), chữ cái tiếng Việt có dấu (`À-ỹ`) và dấu cách (`\s`), xuất hiện từ 1 ký tự trở lên (`+`). Không cho phép số hay ký tự đặc biệt! |
| **Mật khẩu mạnh** ($\ge 8$ ký tự, gồm ít nhất 1 thường, 1 hoa, 1 số) | `/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/` | • `(?=.*[a-z])`: Phải có ít nhất 1 chữ thường<br>• `(?=.*[A-Z])`: Phải có ít nhất 1 chữ hoa<br>• `(?=.*\d)`: Phải có ít nhất 1 chữ số<br>• `.{8,}`: Tổng độ dài từ `8` ký tự trở lên |
| **Số nguyên dương** ($> 0$) | `/^[1-9]\d*$/` | • `^[1-9]`: Chữ số đầu tiên phải từ `1` đến `9` (không được bắt đầu bằng `0`)<br>• `\d*$`: Theo sau là 0 hoặc nhiều chữ số bất kỳ |

#### 💻 Ví dụ code minh họa: Hàm kiểm tra dữ liệu Form (Validation) bằng Regex
```html
<form id="registerForm">
  <div>
    <label>MSSV (8 số, bắt đầu bằng số 2):</label>
    <input type="text" id="mssv" placeholder="VD: 22520001">
  </div>
  <div>
    <label>Họ và tên:</label>
    <input type="text" id="hoten" placeholder="VD: Nguyễn Văn A">
  </div>
  <div>
    <label>Số điện thoại:</label>
    <input type="text" id="sdt" placeholder="VD: 0912345678">
  </div>
  <div>
    <label>Email:</label>
    <input type="text" id="email" placeholder="VD: sv@uit.edu.vn">
  </div>
  <p id="thongBaoLoi" style="color: red; font-weight: bold;"></p>
  <button type="button" id="btnKiemTra">Kiểm tra hợp lệ</button>
</form>

<script>
  document.getElementById("btnKiemTra").addEventListener("click", function() {
    const mssv  = document.getElementById("mssv").value.trim();
    const hoten = document.getElementById("hoten").value.trim();
    const sdt   = document.getElementById("sdt").value.trim();
    const email = document.getElementById("email").value.trim();
    const msgEl = document.getElementById("thongBaoLoi");

    // Khai báo các mẫu Regex từ bảng trên
    const reMSSV  = /^2\d{7}$/;
    const reHoTen = /^[a-zA-ZÀ-ỹ\s]+$/;
    const reSDT   = /^0[35789]\d{8}$/;
    const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Kiểm tra lần lượt bằng hàm .test()
    if (!reMSSV.test(mssv)) {
      msgEl.textContent = "Lỗi: MSSV phải gồm đúng 8 chữ số và bắt đầu bằng số 2!";
      return;
    }
    if (!reHoTen.test(hoten)) {
      msgEl.textContent = "Lỗi: Họ tên chỉ được chứa chữ cái và khoảng trắng!";
      return;
    }
    if (!reSDT.test(sdt)) {
      msgEl.textContent = "Lỗi: Số điện thoại phải gồm 10 số (đầu 03, 05, 07, 08, 09)!";
      return;
    }
    if (!reEmail.test(email)) {
      msgEl.textContent = "Lỗi: Định dạng Email không hợp lệ!";
      return;
    }

    msgEl.style.color = "green";
    msgEl.textContent = "Tất cả thông tin đều hợp lệ!";
  });
</script>
```

---

## 🛠️ 4. THAO TÁC DOM, SỰ KIỆN & 5 KỸ THUẬT XỬ LÝ ĐỀ MỚI (VANILLA JS)

> **So sánh `DOMContentLoaded` vs `window.onload`:**
> - `document.addEventListener("DOMContentLoaded", fn)`: Chạy ngay khi **cây DOM vừa dựng xong** (không cần đợi ảnh/video tải xong) $\rightarrow$ Nhanh hơn.
> - `window.onload = fn`: Phải đợi **toàn bộ tài nguyên (ảnh, CSS, iframe)** tải xong 100%.

### 4.1. Bảng Tra Cứu Nhanh Các Hàm DOM Thuần Thay Cho Mọi Thao Tác
| Thao tác cần làm | Cú pháp JavaScript thuần (Vanilla JS) |
| :--- | :--- |
| **Tìm 1 phần tử theo ID** | `const el = document.getElementById("myId");` |
| **Tìm 1 phần tử theo CSS Selector** | `const el = document.querySelector("#tbl tbody");` |
| **Tìm tất cả phần tử khớp Selector** | `const list = document.querySelectorAll("input[name='mon']:checked");` |
| **Duyệt qua danh sách phần tử** | `list.forEach(item => { ... });` |
| **Tìm phần tử con bên trong 1 dòng `tr`** | `const qtyInput = row.querySelector(".qty");` |
| **Tìm thẻ cha `<tr>` gần nhất (để xóa dòng)** | `const row = btn.closest("tr"); row.remove();` |
| **Đọc / Ghi giá trị ô input, select** | `let v = el.value.trim();` / `el.value = "Mới";` |
| **Kiểm tra 1 ô checkbox có được tích không** | `let isChecked = document.getElementById("chk").checked;` (`true`/`false`) |
| **Đọc / Ghi nội dung chữ thuần** | `let t = el.textContent;` / `el.textContent = "120.000 đ";` |
| **Đọc / Ghi mã HTML bên trong** | `el.innerHTML = "<tr><td>...</td></tr>";` (Xóa rỗng: `el.innerHTML = "";`) |
| **Đọc / Ghi thuộc tính `data-*`** | `<td data-price="20000">` $\rightarrow$ `el.dataset.price` |
| **Ẩn / Hiện phần tử** | `el.style.display = "none";` / `el.style.display = "block";` (hoặc `"table"`) |
| **Thêm / Xóa / Đảo class CSS** | `el.classList.add("active");` / `.remove("active");` / `.toggle("active");` |
| **Bật / Tắt khóa ô nhập hoặc nút bấm** | `el.disabled = true;` / `el.disabled = false;` |

#### 💻 Ví dụ code minh họa: Kết hợp các hàm DOM thuần để đọc dữ liệu, `dataset`, ẩn/hiện và xóa dòng
```html
<!-- Ô tích chọn để bật/tắt nút đặt hàng -->
<label>
  <input type="checkbox" id="chkDongY"> Tôi đồng ý với điều khoản
</label>
<button type="button" id="btnDatHang" disabled>Đặt hàng ngay</button>

<!-- Bảng danh sách món có gắn thuộc tính data-price -->
<table border="1" cellpadding="6" style="border-collapse: collapse; margin-top: 10px;">
  <tbody id="dsMon">
    <tr>
      <td class="ten-mon">Cà phê sữa</td>
      <td class="gia-mon" data-price="25000">25.000 đ</td>
      <td><input type="number" class="qty" value="2" min="1"></td>
      <td><button type="button" class="btn-xoa">Xóa</button></td>
    </tr>
  </tbody>
</table>

<p>Tổng cộng: <strong id="ketQuaTong">50.000 đ</strong></p>

<script>
  // 1. Kiểm tra checkbox (.checked) để Bật / Tắt khóa nút bấm (.disabled)
  const chkDongY = document.getElementById("chkDongY");
  const btnDatHang = document.getElementById("btnDatHang");

  chkDongY.addEventListener("change", function() {
    btnDatHang.disabled = !this.checked; // Tích chọn -> mở khóa (disabled = false)
    btnDatHang.classList.toggle("active", this.checked); // Thêm/bớt class .active
  });

  // 2. Tìm dòng <tr> gần nhất (.closest("tr")), đọc data-price (.dataset.price) và xóa dòng (.remove())
  document.getElementById("dsMon").addEventListener("click", function(e) {
    if (e.target.classList.contains("btn-xoa")) {
      const row = e.target.closest("tr"); // Tìm đúng dòng <tr> chứa nút vừa bấm
      row.remove();                       // Xóa dòng đó khỏi bảng
      document.getElementById("ketQuaTong").textContent = "0 đ"; // Ghi lại chữ bằng .textContent
    }
  });
</script>
```

### 4.2. Hai cách thêm dòng mới vào bảng `<table>`
**Cách 1: Dùng `insertAdjacentHTML("beforeend", ...)` (Ngắn gọn & trực quan)**
```javascript
const tbody = document.querySelector("#myTable tbody");
tbody.insertAdjacentHTML("beforeend", `
  <tr>
    <td>Áo thun</td>
    <td class="text-right">120.000 đ</td>
    <td class="text-center"><button type="button" class="btn-del">Xóa</button></td>
  </tr>
`);
```

**Cách 2: Dùng API bảng `insertRow()` và `insertCell()`**
```javascript
const tbody = document.querySelector("#myTable tbody");
const row = tbody.insertRow(); // Tạo <tr> ở cuối tbody
row.insertCell(0).textContent = "Áo thun";
row.insertCell(1).textContent = "120.000 đ";
row.insertCell(2).innerHTML = `<button type="button" class="btn-del">Xóa</button>`;
```

#### 📖 Bảng giải thích các hàm chèn bảng ở trên:
| Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `insertAdjacentHTML("beforeend", html)` | Chèn thêm đoạn mã `html` vào **ngay cuối bên trong** `tbody` mà không làm mất hay reset dữ liệu của các dòng đang có sẵn trước đó. |
| `` `<tr><td>${ten}</td></tr>` `` | **Template Literal** (cặp dấu huyền `` ` `` nằm dưới phím Esc): cho phép viết HTML nhiều dòng và nhúng trực tiếp biến vào bên trong `${...}`. |
| `tbody.insertRow()` | Hàm chuyên dụng của bảng HTML: tự động tạo và chèn 1 thẻ `<tr>` mới vào cuối `tbody`. |
| `row.insertCell(0)` | Tự động tạo và chèn 1 ô `<td>` ở vị trí cột `0` (cột đầu tiên) bên trong dòng `row`. |

---

### 4.3. Năm mẫu kỹ thuật "Mảnh ghép" giải quyết các dạng đề biến tấu mới

#### Mẫu A: Nhân bản khối nhập liệu khi bấm nút "Thêm..." (Thêm sách, Thêm kỹ năng, Thêm thành viên)
```javascript
document.getElementById("btnAddBlock").addEventListener("click", function() {
  const container = document.getElementById("blockContainer");
  const blocks = container.querySelectorAll(".item-block");

  // Nếu đề giới hạn số lượng tối đa (VD: tối đa 3 quyển sách)
  if (blocks.length >= 3) {
    alert("Chỉ được thêm tối đa 3 mục!");
    return;
  }

  // Nhân bản khối đầu tiên và xóa trắng dữ liệu bên trong
  const newBlock = blocks[0].cloneNode(true);
  newBlock.querySelectorAll("input, textarea").forEach(el => el.value = "");
  container.appendChild(newBlock);
});
```

#### Mẫu B: Chọn Dropdown `<select>` tự động nhảy Đơn giá & Hình ảnh tương ứng
```javascript
// HTML: <select id="cboSP"><option value="150000" data-img="ao.jpg">Áo sơ mi</option></select>
document.getElementById("cboSP").addEventListener("change", function() {
  const opt = this.options[this.selectedIndex];
  document.getElementById("txtDonGia").value = opt.value;
  document.getElementById("imgPreview").src  = opt.dataset.img;
});
```

#### Mẫu C: Đọc và hiển thị ảnh từ `<input type="file">` (Vừa xem trước vừa lưu vào `localStorage`)
```javascript
let avatarBase64 = "default.png";
document.getElementById("fileInput").addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      avatarBase64 = evt.target.result; // Chuỗi Base64 lưu được vào localStorage
      document.getElementById("imgPreview").src = avatarBase64;
    };
    reader.readAsDataURL(file);
  }
});
```

#### Mẫu D: Tìm kiếm / Lọc các dòng trong bảng theo từ khóa gõ vào (`input` event)
```javascript
document.getElementById("txtSearch").addEventListener("input", function() {
  const keyword = this.value.trim().toLowerCase();
  document.querySelectorAll("#myTable tbody tr").forEach(function(row) {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(keyword) ? "" : "none";
  });
});
```

#### Mẫu E: Truyền dữ liệu từ Trang 1 sang Trang 2 bằng `localStorage`
```javascript
// Ở Trang 1 (Trước khi mở hoặc chuyển sang Trang 2):
localStorage.setItem("savedData", JSON.stringify(myObjectOrArray));
window.location.href = "trang2.html"; // Hoặc dùng thẻ <a href="trang2.html" target="_blank">

// Ở Trang 2 (Khi vừa mở trang):
const data = JSON.parse(localStorage.getItem("savedData")) || [];
```

#### 📖 Bảng giải thích các thuộc tính & hàm trong 5 mẫu kỹ thuật trên:
| Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `blocks[0].cloneNode(true)` | Nhân bản (sao chép) phần tử `blocks[0]`. Tham số **`true`** bắt buộc phải có để sao chép toàn bộ các thẻ con (`input`, `option`, `td`...) nằm bên trong nó. |
| `container.appendChild(newBlock)` | Gắn phần tử vừa nhân bản `newBlock` vào vị trí cuối cùng bên trong `container`. |
| `this.options[this.selectedIndex]` | Lấy ra đúng thẻ `<option>` đang được người dùng chọn bên trong `<select>`. Từ đó đọc được cả `.value`, `.text` và `.dataset.*` của `<option>` đó. |
| `e.target.files[0]` | Lấy ra file đầu tiên mà người dùng vừa chọn từ hộp thoại `<input type="file">`. |
| `reader.readAsDataURL(file)` | Dùng đối tượng `FileReader` biến file ảnh thành chuỗi mã hóa Base64 (`data:image/png;base64,...`) để vừa gán được vào `<img src="...">` vừa lưu được vào `localStorage`. |
| `JSON.stringify(obj)` | Biến Mảng hoặc Object trong JS thành **chuỗi JSON** (vì `localStorage` chỉ lưu được kiểu chuỗi String). |
| `JSON.parse(str)` | Biến chuỗi JSON đọc từ `localStorage` ngược trở lại thành **Mảng hoặc Object** ban đầu để sử dụng. |
| `window.location.href = "trang2.html"` | Lệnh chuyển hướng trình duyệt sang trang `trang2.html` bằng JavaScript. |

### 4.4. Ủy quyền sự kiện (Event Delegation) trong JS thuần & Event Loop
- **Ủy quyền sự kiện cho các nút "Xóa" hoặc ô số lượng mới sinh ra:**
```javascript
document.getElementById("myTable").addEventListener("click", function(e) {
  if (e.target.classList.contains("btn-del")) {
    e.target.closest("tr").remove(); // Xóa dòng chứa nút vừa bấm
    capNhatTongTien();
  }
});
```

#### 📖 Bảng giải thích cơ chế Ủy quyền sự kiện (Event Delegation) ở trên:
| Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `e` (Event Object) | Đối tượng sự kiện được trình duyệt tự động truyền vào hàm mỗi khi người dùng click hoặc gõ phím. |
| `e.target` | Chính là **phần tử HTML cụ thể mà chuột vừa bấm trúng** (ví dụ: nút `<button class="btn-del">` nằm bên trong bảng). |
| `e.target.classList.contains("btn-del")` | Kiểm tra xem phần tử vừa bị bấm trúng có mang class `"btn-del"` (nút Xóa) hay không. |
| `e.target.closest("tr")` | Từ nút Xóa vừa bấm, tìm ngược lên cha/ông gần nhất là thẻ dòng `<tr>` đang chứa nút đó. |
| `.remove()` | Xóa bỏ hoàn toàn dòng `<tr>` đó khỏi bảng HTML. |
| `e.preventDefault()` | Chặn hành vi mặc định của trình duyệt (ngăn form tự tải lại trang khi bấm nút `type="submit"`). |
| `e.stopPropagation()` | Chặn sự kiện nổi bọt (`Event Bubbling`) không cho lan tiếp lên các thẻ cha bên ngoài. |
- **Event Bubbling (Nổi bọt - Mặc định):** Click vào thẻ con $\rightarrow$ chạy sự kiện thẻ con trước $\rightarrow$ nổi bọt lên thẻ cha $\rightarrow$ `body` $\rightarrow$ `html` $\rightarrow$ `document` $\rightarrow$ `window`.
  - Chặn nổi bọt lên thẻ cha: `e.stopPropagation()`.
  - Chặn hành vi mặc định của trình duyệt (chặn reload khi submit form): `e.preventDefault()`.
- **Thứ tự ưu tiên Event Loop:**
  1. **Synchronous (Đồng bộ)** trong Call Stack chạy trước tiên.
  2. **Microtasks** (`Promise.then`, `catch`, `finally`, `async/await`) chạy ngay sau khi Call Stack rỗng.
  3. **Macrotasks** (`setTimeout`, `setInterval`) chạy cuối cùng.

---

### 4.5. Tổng Hợp Các Sự Kiện (Events) & Kịch Bản Tính Toán Thực Chiến Hay Ra Thi Nhất
> Đây là các kịch bản tương tác động rất hay xuất hiện trong đề thi thực hành và lý thuyết: **tích chọn món mới hiện cột chọn Loại/Size**, **chọn Loại đổi đơn giá**, **phụ thu/giảm giá theo Radio/Checkbox**, và **bấm Submit để tính toán & in hóa đơn chi tiết**.

#### A. Bảng từ điển các Sự kiện (Events) thường dùng trong Form & Tính toán
| Tên Sự Kiện (`addEventListener`) | Khi nào sự kiện này kích hoạt & Ứng dụng trong đề thi |
| :--- | :--- |
| `"click"` | Khi người dùng **bấm chuột** vào nút `<button>`, đường link `<a>`, hoặc bấm nút `"Xóa"`, `"Thêm món"`, `"Tính tiền"`. |
| `"submit"` | Đặt trên thẻ **`<form>`** khi bấm nút `<button type="submit">`. **Bắt buộc** gọi `e.preventDefault()` ở dòng đầu tiên để ngăn trang web tự tải lại (reload) làm mất hết hóa đơn vừa in! |
| `"change"` | Khi giá trị của **`<select>` (Dropdown)**, **`checkbox`**, **`radio`**, hoặc **`<input type="date">`** bị thay đổi (ví dụ: tích vào món ăn để hiện cột chọn Loại Nóng/Đá, hoặc đổi Size S/M/L để cập nhật lại đơn giá). |
| `"input"` | Kích hoạt **ngay lập tức mỗi khi gõ 1 phím hoặc bấm mũi tên tăng/giảm** trong ô `<input type="number">` / `<input type="text">`. Rất hợp để tính lại *Thành tiền = Số lượng × Đơn giá* theo thời gian thực hoặc tìm kiếm trực tiếp. |
| `"blur"` / `"focus"` | • `"blur"`: Khi người dùng **nhấp chuột rời khỏi ô input** (dùng để kiểm tra Regex báo lỗi ngay sau khi nhập xong 1 ô).<br>• `"focus"`: Khi người dùng **bấm chuột vào trong ô input** (dùng để xóa dòng chữ báo lỗi màu đỏ trước đó). |
| `"reset"` | Đặt trên thẻ `<form>` khi bấm nút `<button type="reset">`: ngoài việc xóa trắng các ô input, ta gắn thêm sự kiện này để ẩn lại các cột/khung hóa đơn về trạng thái ban đầu. |

#### B. Bảng các công thức & kỹ thuật xử lý tính toán theo sự kiện
| Yêu cầu trong đề thi | Cú pháp JavaScript giải quyết | Giải thích chi tiết cơ chế hoạt động |
| :--- | :--- | :--- |
| **1. Tích chọn món (`checkbox`) $\rightarrow$ Hiện ô chọn Loại / Số lượng của đúng dòng đó** | `const row = chk.closest("tr");`<br>`const boxLoai = row.querySelector(".loai-box");`<br>`boxLoai.style.display = chk.checked ? "block" : "none";` | Từ ô checkbox vừa tích (`chk`), dùng `.closest("tr")` để lấy dòng chứa món đó, rồi tìm phần tử `.loai-box` bên trong dòng đó. Nếu `chk.checked === true` thì hiện (`"block"` hoặc mở khóa `disabled = false`), bỏ tích thì ẩn đi (`"none"`). |
| **2. Chọn Danh mục cha $\rightarrow$ Tự động đổ danh sách Loại con vào `<select>` thứ 2 (Cascading Dropdown)** | `cboLoai.innerHTML = ds[nhom].map(x =>`<br>`  '<option value="' + x.gia + '">' + x.ten + '</option>'`<br>`).join("");` | Khi chọn `<select id="cboNhom">` (VD: `"Đồ uống"` hay `"Đồ ăn"`), sự kiện `"change"` sẽ lấy mảng con tương ứng và ghi đè các thẻ `<option>` mới vào `<select id="cboLoai">`. |
| **3. Tính phụ thu từ Radio (`name="loai"`) hoặc Checkbox** | `const rd = document.querySelector("input[name='loai']:checked");`<br>`let phuThu = rd ? parseFloat(rd.value) : 0;` | Tìm đúng nút Radio đang được chọn thông qua bộ chọn `:checked`. Nếu có chọn thì lấy `.value` ép kiểu sang số, nếu chưa chọn thì bằng `0`. |
| **4. Tính chiết khấu / Giảm giá VIP hoặc Thuế VAT (%)** | `let giamGia = isVip ? tamTinh * 0.1 : 0;`<br>`let vat = (tamTinh - giamGia) * 0.08;`<br>`let tongCong = tamTinh - giamGia + vat;` | • Giảm 10% $\rightarrow$ nhân `0.1`.<br>• Thuế VAT 8% $\rightarrow$ nhân `0.08` (hoặc 10% $\rightarrow$ nhân `0.1`).<br>• Tổng thanh toán cuối cùng = Tạm tính $-$ Giảm giá $+$ Thuế VAT $+$ Phí giao hàng. |
| **5. Bấm Submit $\rightarrow$ Gom các món đã chọn & In bảng Hóa đơn** | `frm.addEventListener("submit", function(e) {`<br>`  e.preventDefault();`<br>`  // Duyệt các dòng được tích & vẽ bảng hóa đơn`<br>`});` | Chặn tải lại trang bằng `e.preventDefault()`, duyệt qua `document.querySelectorAll(".chk-mon:checked")`, nối chuỗi HTML các dòng `<tr>` vào `tbody` của hóa đơn và bật `hoaDonBox.style.display = "block"`. |

#### 💻 Ví dụ code minh họa 1: Chọn Danh mục tự động hiện Cột Loại tương ứng & Cập nhật Đơn giá
```html
<style>
  .form-inline { display: flex; gap: 15px; align-items: flex-end; margin-bottom: 12px; }
  .col-hidden  { display: none; } /* Ban đầu ẩn cột Loại và cột Đơn giá */
</style>

<div class="form-inline">
  <!-- Bước 1: Chọn Nhóm món -->
  <div>
    <label><strong>1. Chọn nhóm món:</strong></label><br>
    <select id="cboNhom">
      <option value="">-- Chọn nhóm --</option>
      <option value="cafe">Cà phê</option>
      <option value="trasua">Trà sữa</option>
    </select>
  </div>

  <!-- Bước 2: Cột Loại món (Chỉ hiện ra sau khi đã chọn Nhóm món!) -->
  <div id="cotLoai" class="col-hidden">
    <label><strong>2. Chọn loại chi tiết:</strong></label><br>
    <select id="cboLoai"></select>
  </div>

  <!-- Bước 3: Cột Đơn giá & Số lượng (Tự động nhảy giá theo Loại) -->
  <div id="cotGia" class="col-hidden">
    <label><strong>Đơn giá:</strong></label><br>
    <input type="text" id="txtDonGia" readonly style="width: 100px; background: #eee;">
  </div>
</div>

<script>
  // Dữ liệu các loại món tương ứng với từng nhóm
  const menuData = {
    cafe: [
      { ten: "Cà phê Đen (Đá/Nóng)", gia: 25000 },
      { ten: "Cà phê Sữa (Đá/Nóng)", gia: 30000 },
      { ten: "Bạc xỉu đặc biệt",     gia: 35000 }
    ],
    trasua: [
      { ten: "Trà sữa Truyền thống (Size M)", gia: 35000 },
      { ten: "Trà sữa Truyền thống (Size L)", gia: 45000 },
      { ten: "Trà sữa Kem trứng nướng",       gia: 50000 }
    ]
  };

  const cboNhom   = document.getElementById("cboNhom");
  const cotLoai   = document.getElementById("cotLoai");
  const cboLoai   = document.getElementById("cboLoai");
  const cotGia    = document.getElementById("cotGia");
  const txtDonGia = document.getElementById("txtDonGia");

  // SỰ KIỆN 1: Khi chọn Nhóm món -> Hiện cột Loại và đổ danh sách Loại tương ứng
  cboNhom.addEventListener("change", function() {
    const nhom = this.value;
    if (!nhom) {
      // Nếu quay về "-- Chọn nhóm --" thì ẩn lại cột Loại và cột Giá
      cotLoai.style.display = "none";
      cotGia.style.display  = "none";
      return;
    }

    // Đổ các <option> của nhóm vừa chọn vào cboLoai
    const danhSachLoai = menuData[nhom];
    cboLoai.innerHTML = danhSachLoai.map(item =>
      `<option value="${item.gia}">${item.ten}</option>`
    ).join("");

    // Hiện cột Loại và cột Giá lên màn hình
    cotLoai.style.display = "block";
    cotGia.style.display  = "block";

    // Tự động hiển thị giá của loại đầu tiên
    txtDonGia.value = danhSachLoai[0].gia.toLocaleString("vi-VN") + " đ";
  });

  // SỰ KIỆN 2: Khi đổi Loại chi tiết -> Tự động cập nhật lại ô Đơn giá
  cboLoai.addEventListener("change", function() {
    const gia = parseFloat(this.value) || 0;
    txtDonGia.value = gia.toLocaleString("vi-VN") + " đ";
  });
</script>
```

#### 💻 Ví dụ code minh họa 2: Tích chọn món thì hiện cột Loại/Số lượng + Bấm Submit in Hóa Đơn tính tiền đầy đủ
```html
<style>
  .tbl-menu, .tbl-bill { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
  .tbl-menu th, .tbl-menu td, .tbl-bill th, .tbl-bill td { border: 1px solid #333; padding: 8px; }
  .tbl-menu th, .tbl-bill th { background: #e3f2fd; }
  .an-khi-chua-chon { display: none; } /* Ẩn ô chọn Loại và Số lượng khi chưa tích checkbox */
  #khungHoaDon { display: none; border: 2px solid #009688; padding: 16px; margin-top: 20px; background: #fafafa; }
</style>

<form id="frmDatMon">
  <div style="margin-bottom: 10px;">
    <label><strong>Tên khách hàng:</strong></label>
    <input type="text" id="tenKhach" placeholder="Nhập họ tên khách..." required>
    <label style="margin-left: 20px;">
      <input type="checkbox" id="chkTheVip"> Có thẻ thành viên VIP (Giảm 10%)
    </label>
  </div>

  <!-- BẢNG THỰC ĐƠN: Tích vào món nào thì cột Loại và Số lượng của dòng đó mới hiện ra -->
  <table class="tbl-menu">
    <thead>
      <tr>
        <th>Chọn</th>
        <th>Tên món</th>
        <th>Đơn giá gốc</th>
        <th>Chọn Loại (Hiện khi tích chọn)</th>
        <th>Số lượng (Hiện khi tích chọn)</th>
      </tr>
    </thead>
    <tbody>
      <tr data-name="Cà phê Sữa" data-price="30000">
        <td style="text-align: center;"><input type="checkbox" class="chk-mon"></td>
        <td>Cà phê Sữa</td>
        <td>30.000 đ</td>
        <td>
          <select class="cbo-loai an-khi-chua-chon">
            <option value="0">Uống Nóng (+0 đ)</option>
            <option value="5000">Uống Đá - Ly lớn (+5.000 đ)</option>
          </select>
        </td>
        <td>
          <input type="number" class="txt-sl an-khi-chua-chon" value="1" min="1" style="width: 60px;">
        </td>
      </tr>
      <tr data-name="Trà Đào Cam Sả" data-price="40000">
        <td style="text-align: center;"><input type="checkbox" class="chk-mon"></td>
        <td>Trà Đào Cam Sả</td>
        <td>40.000 đ</td>
        <td>
          <select class="cbo-loai an-khi-chua-chon">
            <option value="0">Size M tiêu chuẩn (+0 đ)</option>
            <option value="10000">Size L thêm đào (+10.000 đ)</option>
          </select>
        </td>
        <td>
          <input type="number" class="txt-sl an-khi-chua-chon" value="1" min="1" style="width: 60px;">
        </td>
      </tr>
    </tbody>
  </table>

  <button type="submit">Thanh Toán & In Hóa Đơn</button>
</form>

<!-- KHUNG HÓA ĐƠN (Chỉ hiện ra sau khi bấm nút Submit) -->
<div id="khungHoaDon">
  <h3 style="margin-top: 0; color: #009688; text-align: center;">HÓA ĐƠN THANH TOÁN</h3>
  <p><strong>Khách hàng:</strong> <span id="billKhach"></span> | <strong>Ngày lập:</strong> <span id="billNgay"></span></p>
  <table class="tbl-bill">
    <thead>
      <tr>
        <th>STT</th>
        <th>Tên món & Loại</th>
        <th>Số lượng</th>
        <th>Đơn giá (gồm phụ thu)</th>
        <th>Thành tiền</th>
      </tr>
    </thead>
    <tbody id="billBody"></tbody>
  </table>
  <p style="text-align: right; margin: 4px 0;">Tạm tính: <strong id="billTamTinh">0 đ</strong></p>
  <p style="text-align: right; margin: 4px 0; color: green;">Giảm giá VIP (10%): <strong id="billGiamGia">0 đ</strong></p>
  <h4 style="text-align: right; margin: 8px 0; color: #d32f2f;">TỔNG THANH TOÁN: <span id="billTongCong">0 đ</span></h4>
</div>

<script>
  // 1. SỰ KIỆN KHI TÍCH CHỌN MÓN: Tích dòng nào thì hiện cột Loại (.cbo-loai) và Số lượng (.txt-sl) của dòng đó
  document.querySelectorAll(".chk-mon").forEach(function(chk) {
    chk.addEventListener("change", function() {
      const row     = this.closest("tr"); // Lấy đúng dòng <tr> vừa tích
      const cboLoai = row.querySelector(".cbo-loai");
      const txtSl   = row.querySelector(".txt-sl");

      if (this.checked) {
        cboLoai.style.display = "inline-block"; // Hiện ô chọn Loại
        txtSl.style.display   = "inline-block"; // Hiện ô nhập Số lượng
      } else {
        cboLoai.style.display = "none";         // Bỏ tích -> Ẩn lại
        txtSl.style.display   = "none";
        txtSl.value = 1;                        // Reset số lượng về 1
      }
    });
  });

  // 2. SỰ KIỆN KHI BẤM SUBMIT FORM: Tính toán tiền và In ra Hóa Đơn
  document.getElementById("frmDatMon").addEventListener("submit", function(e) {
    e.preventDefault(); // BẮT BUỘC: Chặn form tải lại trang

    const cacMonDaChon = document.querySelectorAll(".chk-mon:checked");
    if (cacMonDaChon.length === 0) {
      alert("Vui lòng tích chọn ít nhất 1 món trước khi in hóa đơn!");
      return;
    }

    let tamTinh = 0;
    let htmlRows = "";

    // Duyệt qua từng món đã được tích chọn
    cacMonDaChon.forEach(function(chk, index) {
      const row      = chk.closest("tr");
      const tenMon   = row.dataset.name;
      const giaGoc   = parseFloat(row.dataset.price) || 0;

      // Đọc Loại đang chọn (lấy cả tên Loại và tiền phụ thu)
      const cboLoai  = row.querySelector(".cbo-loai");
      const tenLoai  = cboLoai.options[cboLoai.selectedIndex].text;
      const phuThu   = parseFloat(cboLoai.value) || 0;

      // Đọc số lượng và tính thành tiền của dòng
      const soLuong  = parseInt(row.querySelector(".txt-sl").value) || 1;
      const donGia   = giaGoc + phuThu;
      const thanhTien = donGia * soLuong;
      tamTinh += thanhTien;

      htmlRows += `
        <tr>
          <td style="text-align: center;">${index + 1}</td>
          <td>${tenMon} <br><small style="color: #555;">(${tenLoai})</small></td>
          <td style="text-align: center;">${soLuong}</td>
          <td style="text-align: right;">${donGia.toLocaleString("vi-VN")} đ</td>
          <td style="text-align: right;">${thanhTien.toLocaleString("vi-VN")} đ</td>
        </tr>
      `;
    });

    // Tính giảm giá VIP 10% (nếu có tích chọn thẻ VIP)
    const isVip    = document.getElementById("chkTheVip").checked;
    const giamGia  = isVip ? tamTinh * 0.1 : 0;
    const tongCong = tamTinh - giamGia;

    // Đổ dữ liệu vào Khung Hóa Đơn và hiển thị lên màn hình
    document.getElementById("billKhach").textContent    = document.getElementById("tenKhach").value.trim();
    document.getElementById("billNgay").textContent     = new Date().toLocaleString("vi-VN");
    document.getElementById("billBody").innerHTML       = htmlRows;
    document.getElementById("billTamTinh").textContent  = tamTinh.toLocaleString("vi-VN") + " đ";
    document.getElementById("billGiamGia").textContent  = "-" + giamGia.toLocaleString("vi-VN") + " đ";
    document.getElementById("billTongCong").textContent = tongCong.toLocaleString("vi-VN") + " đ";

    document.getElementById("khungHoaDon").style.display = "block";
  });
</script>
```

---

## 🏆 5. CÁC MẪU BÀI TẬP THỰC HÀNH TRỌNG TÂM (VANILLA JS)

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
  <tbody id="tbodyDanhSach"></tbody>
</table>

<script>
  const frm = document.getElementById("frmDangKy");
  const tbody = document.getElementById("tbodyDanhSach");

  frm.addEventListener("submit", function(e) {
    e.preventDefault(); // 1. Chặn reload trang

    // 2. Xóa toàn bộ thông báo lỗi cũ
    document.querySelectorAll(".error").forEach(el => el.textContent = "");
    let valid = true;

    const mssv  = document.getElementById("mssv").value.trim();
    const hoten = document.getElementById("hoten").value.trim();
    const sdt   = document.getElementById("sdt").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!/^2\d{7}$/.test(mssv)) {
      document.getElementById("errMssv").textContent = "MSSV phải gồm 8 chữ số và bắt đầu bằng số 2!";
      valid = false;
    }
    if (hoten === "") {
      document.getElementById("errHoten").textContent = "Họ tên không được để trống!";
      valid = false;
    }
    if (!/^0[35789]\d{8}$/.test(sdt)) {
      document.getElementById("errSdt").textContent = "SĐT không hợp lệ (10 số, đầu 03/05/07/08/09)!";
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      document.getElementById("errEmail").textContent = "Email không đúng định dạng!";
      valid = false;
    }

    if (valid) {
      tbody.insertAdjacentHTML("beforeend", `
        <tr>
          <td>${mssv}</td>
          <td>${hoten}</td>
          <td>${sdt}</td>
          <td>${email}</td>
          <td class="text-center"><button type="button" class="btn-del">Xóa</button></td>
        </tr>
      `);
      frm.reset(); // Xóa trắng form sau khi thêm
    }
  });

  // Ủy quyền sự kiện xóa dòng
  tbody.addEventListener("click", function(e) {
    if (e.target.classList.contains("btn-del")) {
      e.target.closest("tr").remove();
    }
  });
</script>
```

#### 📖 Bảng giải thích các thuộc tính & lệnh quan trọng trong Dạng 1:
| Thuộc tính / Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `e.preventDefault()` | Bắt buộc đặt ở dòng đầu tiên của hàm `submit` để ngăn trình duyệt tự reload lại trang làm mất dữ liệu vừa thêm vào bảng. |
| `document.querySelectorAll(".error").forEach(el => el.textContent = "")` | Xóa sạch toàn bộ các dòng chữ báo lỗi màu đỏ của lần bấm trước đó trước khi kiểm tra lại từ đầu. |
| `!/^2\d{7}$/.test(mssv)` | Dấu `!` là phủ định: Nếu chuỗi `mssv` **KHÔNG** khớp với mẫu Regex (bắt đầu bằng số `2` và theo sau là `7` chữ số) thì báo lỗi và gán `valid = false`. |
| `frm.reset()` | Xóa trắng toàn bộ các ô input trong form sau khi đã thêm sinh viên vào bảng thành công. |

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
  <tbody id="tbodyHoaDon"></tbody>
  <tfoot>
    <tr>
      <th>Tổng thanh toán:</th>
      <th id="lblTongTien" class="text-right" style="color:red;">0 đ</th>
    </tr>
  </tfoot>
</table>

<script>
  document.getElementById("btnTinhTien").addEventListener("click", function() {
    const dsChon = document.querySelectorAll("input[name='mon']:checked");
    const tblHoaDon = document.getElementById("tblHoaDon");
    const tbody = document.getElementById("tbodyHoaDon");

    if (dsChon.length === 0) {
      alert("Vui lòng chọn ít nhất 1 món!");
      tblHoaDon.style.display = "none";
      return;
    }

    tbody.innerHTML = ""; // Xóa dữ liệu hóa đơn cũ
    let tong = 0;

    dsChon.forEach(function(item) {
      const ten = item.dataset.ten;
      const gia = parseFloat(item.value);
      tong += gia;
      tbody.insertAdjacentHTML("beforeend", `
        <tr>
          <td>${ten}</td>
          <td class="text-right">${gia.toLocaleString("vi-VN")} đ</td>
        </tr>
      `);
    });

    // Kiểm tra phụ thu ban đêm 10%
    const buoi = document.querySelector("input[name='buoi']:checked").value;
    if (buoi === "dem") {
      const phuThu = tong * 0.1;
      tong += phuThu;
      tbody.insertAdjacentHTML("beforeend", `
        <tr>
          <td><i>Phụ thu ban đêm (10%)</i></td>
          <td class="text-right">${phuThu.toLocaleString("vi-VN")} đ</td>
        </tr>
      `);
    }

    document.getElementById("lblTongTien").textContent = tong.toLocaleString("vi-VN") + " đ";
    tblHoaDon.style.display = "table";
  });
</script>
```

#### 📖 Bảng giải thích các thuộc tính & lệnh quan trọng trong Dạng 2:
| Thuộc tính / Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `value="20000" data-ten="Bún bò"` | Lưu đơn giá vào `value` (để lấy bằng `item.value`) và lưu tên món ăn vào thuộc tính `data-ten` (để lấy bằng `item.dataset.ten`). |
| `name="buoi"` (trên cả 2 nút Radio) | Đặt chung `name="buoi"` cho cả "Ban ngày" và "Ban đêm" để người dùng chỉ có thể tích chọn 1 trong 2 thời điểm. |
| `style="display:none;"` (trên `#tblHoaDon`) | Ẩn bảng hóa đơn đi khi mới mở trang; sau khi tính tiền xong dùng `tblHoaDon.style.display = "table"` để hiện bảng lên. |
| `document.querySelectorAll("input[name='mon']:checked")` | Lấy ra danh sách tất cả các ô `checkbox` có `name="mon"` đang được người dùng tích chọn. Nếu `.length === 0` tức là chưa chọn món nào. |
| `tbody.innerHTML = ""` | Xóa sạch các dòng hóa đơn của lần bấm "Tính Tiền" trước đó để không bị in trùng lặp. |

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
  <tbody id="tbodyGioHang">
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
  const tbodyGioHang = document.getElementById("tbodyGioHang");

  function tinhLaiGioHang() {
    let tongCong = 0;
    const rows = tbodyGioHang.querySelectorAll("tr");

    rows.forEach(function(row) {
      const qtyInput = row.querySelector(".qty");
      let sl = parseInt(qtyInput.value) || 0;
      if (sl < 1) { sl = 1; qtyInput.value = 1; }

      const gia = parseFloat(row.querySelector(".price").dataset.price) || 0;
      const thanhTien = sl * gia;

      row.querySelector(".subtotal").textContent = thanhTien.toLocaleString("vi-VN") + " đ";
      tongCong += thanhTien;
    });

    document.getElementById("grandTotal").textContent = tongCong.toLocaleString("vi-VN") + " đ";
  }

  // Lắng nghe khi gõ hoặc đổi số lượng
  tbodyGioHang.addEventListener("input", function(e) {
    if (e.target.classList.contains("qty")) {
      tinhLaiGioHang();
    }
  });

  // Lắng nghe khi bấm nút Xóa dòng
  tbodyGioHang.addEventListener("click", function(e) {
    if (e.target.classList.contains("btn-del")) {
      e.target.closest("tr").remove();
      tinhLaiGioHang();
    }
  });
</script>
```

#### 📖 Bảng giải thích các thuộc tính & lệnh quan trọng trong Dạng 3:
| Thuộc tính / Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `<input type="number" class="qty" value="2" min="1">` | Ô nhập số lượng nằm ngay trong ô bảng, giá trị mặc định là `2`, nhỏ nhất là `1` (`min="1"`). |
| `<td class="price" data-price="120000">120.000 đ</td>` | Chữ hiển thị cho đẹp là `"120.000 đ"`, còn số nguyên `120000` được cất trong `data-price` để JS lấy ra nhân trực tiếp (`row.querySelector(".price").dataset.price`) mà không cần cắt chuỗi. |
| `<th colspan="3">Tổng cộng:</th>` | Gộp 3 cột đầu tiên ở dòng chân bảng (`tfoot`) để chữ "Tổng cộng:" nằm sát ngay bên trái cột tổng tiền. |
| `tbodyGioHang.addEventListener("input", ...)` | Sự kiện `"input"` kích hoạt **ngay lập tức** mỗi khi người dùng gõ số mới hoặc bấm nút mũi tên tăng/giảm trên ô số lượng `.qty`. |

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
  <tbody id="tbodyBanAn"></tbody>
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
    const str = `${thuArr[d.getDay()]}, ${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
    document.getElementById("dongHo").textContent = str;
  }
  capNhatDongHo();

  const tbodyBanAn = document.getElementById("tbodyBanAn");

  // 2. Hàm cập nhật tổng tiền bàn
  function tinhTongBan() {
    let tong = 0;
    tbodyBanAn.querySelectorAll("tr").forEach(function(row) {
      const sl  = parseInt(row.querySelector(".sl").textContent) || 0;
      const gia = parseFloat(row.dataset.gia) || 0;
      const tt  = sl * gia;
      row.querySelector(".tt").textContent = tt.toLocaleString("vi-VN") + " đ";
      tong += tt;
    });
    document.getElementById("tongBan").textContent = tong.toLocaleString("vi-VN") + " đ";
  }

  // 3. Thêm món (Nếu món đã có trong bảng thì cộng dồn số lượng +1)
  document.getElementById("btnThemMon").addEventListener("click", function() {
    const cbo   = document.getElementById("cboMon");
    const opt   = cbo.options[cbo.selectedIndex];
    const idMon = opt.dataset.id;
    const ten   = opt.text.split("(")[0].trim();
    const gia   = parseFloat(opt.value);

    // Kiểm tra xem dòng có data-id này đã tồn tại trong bảng chưa
    const dongCu = tbodyBanAn.querySelector(`tr[data-id='${idMon}']`);
    if (dongCu) {
      const cellSl = dongCu.querySelector(".sl");
      cellSl.textContent = parseInt(cellSl.textContent) + 1;
    } else {
      tbodyBanAn.insertAdjacentHTML("beforeend", `
        <tr data-id="${idMon}" data-gia="${gia}">
          <td>${ten}</td>
          <td class="text-center sl">1</td>
          <td class="text-right">${gia.toLocaleString("vi-VN")} đ</td>
          <td class="text-right tt">${gia.toLocaleString("vi-VN")} đ</td>
          <td class="text-center"><button type="button" class="btn-del">Xóa</button></td>
        </tr>
      `);
    }
    tinhTongBan();
  });

  // 4. Xóa món khỏi bàn
  tbodyBanAn.addEventListener("click", function(e) {
    if (e.target.classList.contains("btn-del")) {
      e.target.closest("tr").remove();
      tinhTongBan();
    }
  });
</script>
```

#### 📖 Bảng giải thích các thuộc tính & lệnh quan trọng trong Dạng 4:
| Thuộc tính / Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `<option value="20000" data-id="M1">Bún bò (20.000đ)</option>` | Lưu đơn giá vào `value` và mã định danh món ăn vào `data-id="M1"` để dễ kiểm tra xem món này đã có trong bàn chưa. |
| `opt.text.split("(")[0].trim()` | Cắt chuỗi `"Bún bò (20.000đ)"` tại dấu mở ngoặc `"("`, lấy phần tử đầu tiên `[0]` là `"Bún bò"`. |
| ``tbodyBanAn.querySelector(`tr[data-id='${idMon}']`)`` | Tìm trong bảng xem đã có dòng `<tr>` nào mang thuộc tính `data-id` trùng với món vừa chọn chưa. Nếu đã có (`dongCu` khác `null`), chỉ cần tăng ô số lượng `.sl` lên `+ 1`. |

---

## 📝 6. BÀI TẬP THỰC HÀNH: FORM THÔNG TIN LIÊN HỆ NHÓM

### 6.1. Yêu cầu thiết kế "Form Thông tin liên hệ nhóm" (HTML5 + Embedded CSS)

![Form Thông tin liên hệ nhóm](./images/form_thong_tin_nhom.png)
**Mô tả yêu cầu:**
- Khai báo cấu trúc chuẩn HTML5 (`<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`), sử dụng bảng mã Unicode (`<meta charset="utf-8">`), tiêu đề trang trên tab trình duyệt: `<title>Form Thông tin liên hệ nhóm</title>`.
- Sử dụng **Internal/Embedded CSS** (thẻ `<style>` đặt trong `<head>`).
- Khung chứa form (`.container`): `width: 480px; margin: auto; border: 2px solid darkcyan; padding: 20px; font-size: 22px;`.
- Tiêu đề `THÔNG TIN LIÊN HỆ NHÓM`: dùng thẻ `<h2>`, chữ màu đỏ (`color: red`), canh giữa (`text-align: center`).
- Thẻ `<form>` gửi bằng giao thức `post` (`method="post"`), trang xử lý là `GroupInfo.php` (`action="GroupInfo.php"`).
- **Mỗi `<label>` bắt buộc phải liên kết đúng với control qua cặp thuộc tính `for="..."` và `id="..."`**.
- Các control trong form:
  1. **Tên nhóm**: `<input type="text" id="groupName" name="groupName">`, placeholder `"Nhập tên của nhóm bạn"`, bắt buộc nhập (`required`).
  2. **Nhóm trưởng**: `<input type="text" id="groupLeader" name="groupLeader">`, placeholder `"Nhập họ tên của người nhóm trưởng"`, bắt buộc nhập (`required`).
  3. Khung nhóm **`<fieldset>`** có tiêu đề **`<legend>Trang web giới thiệu đồ án của nhóm</legend>`**, bên trong gồm:
     - **Nền tảng:**: `<select id="platform" name="platform">` có 1 option mặc định `"Chọn các nền tảng trang web của nhóm"` và **5 `<option>` có `value` khác nhau**: `Wordpress`, `Google`, `Wix`, `Github`, `Khác`.
     - **Địa chỉ**: `<input type="url" id="websiteUrl" name="websiteUrl">`, placeholder `"Nhập địa chỉ trang web nhóm"`, bắt buộc nhập (`required`).
  4. **Ý kiến khác của nhóm**: `<textarea id="otherComments" name="otherComments"></textarea>`.
  5. **Hai nút bấm canh giữa**:
     - Nút **Submit** (`<button type="submit">`) và nút **Cancel** (`<button type="reset">`).
     - Định dạng nút: `width: 150px; padding: 10px; background-color: darkorange; border: none;`, chữ in đậm (`<strong>` hoặc `font-weight: bold`).

---

### 6.2. Các tiêu chí đánh giá kỹ thuật cần lưu ý
1. **Khai báo chung (2.0 điểm):**
   - Thiếu `<!DOCTYPE html>`: `-0.25đ`
   - Thiếu hoặc đặt sai chỗ `html`, `head`, `body`: `-0.25đ` đến `-0.5đ`
   - Thiếu `<meta charset="utf-8">`: `-0.25đ`
   - Thiếu `<title>Form Thông tin liên hệ nhóm</title>` (nhìn kỹ thanh tab trên hình đề thi!): `-0.25đ`
   - Không viết `<style>` (Internal CSS) trong `<head>`: `-0.5đ`
   - Thiếu `<form action="GroupInfo.php" method="post">`: `-0.25đ`
2. **HTML (5.0 điểm):**
   - Thiếu `<h2>`: `-0.25đ` | Thiếu `<div class="container">`: `-0.5đ`
   - Thiếu các thẻ `<label>` hoặc **không có `for` khớp với `id` của input/select/textarea**: `-0.25đ` đến `-1.75đ`
   - Đặt tên/kiểu input chuẩn: `type="text"` cho `groupName`, `groupLeader` (`-0.5đ`); **`type="url"`** cho `websiteUrl` (`-0.25đ`)
   - Thiếu `placeholder` hoặc `required` tại Tên nhóm, Nhóm trưởng, Địa chỉ: `-0.25đ` đến `-0.75đ`
   - Không dùng `<fieldset>` và `<legend>` cho khung "Trang web giới thiệu đồ án của nhóm": `-0.5đ`
   - Không tạo đủ 5 `<option>` với các `value` khác nhau (kèm 1 option hướng dẫn đầu tiên): `-0.25đ` đến `-0.5đ`
   - Thiếu `<textarea>`: `-0.5đ`
   - Hai nút bấm phải dùng đúng `type="submit"` (Submit) và `type="reset"` (Cancel): `-0.25đ` đến `-0.5đ`
3. **CSS (3.0 điểm):**
   - Định dạng `.container` đúng thông số đề bài: `0.75đ`
   - Định dạng `h2` màu đỏ, canh giữa: `0.25đ`
   - Định dạng chung `input[type="text"], input[type="url"], select, textarea` (`width: 100%; box-sizing: border-box;`): `0.75đ`
   - Định dạng `button` đúng thông số và canh giữa 2 nút: `0.75đ`
   - *(Lưu ý: Nhớ ghi tên nhóm/thông tin sinh viên đúng vị trí yêu cầu của đề, quên trừ 1.0đ!)*

---

### 6.3. Mã nguồn hoàn chỉnh (HTML5 + Internal CSS)

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Form Thông tin liên hệ nhóm</title>
  <style>
    /* 1. Định dạng khung chứa .container theo đúng đề bài */
    .container {
      width: 480px;
      margin: auto;
      border: 2px solid darkcyan;
      padding: 20px;
      font-size: 22px;
      font-family: Arial, sans-serif;
      box-sizing: border-box;
    }

    /* 2. Định dạng tiêu đề h2 màu đỏ, canh giữa */
    h2 {
      color: red;
      text-align: center;
      margin-top: 10px;
      margin-bottom: 20px;
      font-size: 26px;
    }

    /* 3. Định dạng label và các ô nhập liệu */
    label {
      display: block;
      margin-bottom: 6px;
    }

    input[type="text"],
    input[type="url"],
    select,
    textarea {
      width: 100%;
      padding: 8px;
      margin-bottom: 14px;
      border: 1px solid #ccc;
      box-sizing: border-box;
      font-size: 15px;
      font-family: inherit;
    }

    /* 4. Định dạng khung Fieldset & Legend */
    fieldset {
      border: 1px solid #ddd;
      padding: 12px 15px 4px 15px;
      margin-bottom: 14px;
    }

    legend {
      font-weight: bold;
      padding: 0 5px;
    }

    /* 5. Định dạng và canh giữa 2 nút bấm */
    .button-group {
      text-align: center;
      margin-top: 10px;
    }

    button {
      width: 150px;
      padding: 10px;
      background-color: darkorange;
      border: none;
      font-weight: bold;
      cursor: pointer;
      margin: 0 8px;
    }
  </style>
</head>
<body>

  <div class="container">
    <h2>THÔNG TIN LIÊN HỆ NHÓM</h2>

    <form action="GroupInfo.php" method="post">
      <!-- 1. Tên nhóm -->
      <label for="groupName">Tên nhóm</label>
      <input type="text" id="groupName" name="groupName" placeholder="Nhập tên của nhóm bạn" required>

      <!-- 2. Nhóm trưởng -->
      <label for="groupLeader">Nhóm trưởng</label>
      <input type="text" id="groupLeader" name="groupLeader" placeholder="Nhập họ tên của người nhóm trưởng" required>

      <!-- 3. Khung Fieldset: Trang web giới thiệu đồ án của nhóm -->
      <fieldset>
        <legend><strong>Trang web giới thiệu đồ án của nhóm</strong></legend>

        <label for="platform">Nền tảng:</label>
        <select id="platform" name="platform">
          <option value="">Chọn các nền tảng trang web của nhóm</option>
          <option value="wordpress">Wordpress</option>
          <option value="google">Google</option>
          <option value="wix">Wix</option>
          <option value="github">Github</option>
          <option value="other">Khác</option>
        </select>

        <label for="websiteUrl">Địa chỉ</label>
        <input type="url" id="websiteUrl" name="websiteUrl" placeholder="Nhập địa chỉ trang web nhóm" required>
      </fieldset>

      <!-- 4. Ý kiến khác của nhóm -->
      <label for="otherComments">Ý kiến khác của nhóm</label>
      <textarea id="otherComments" name="otherComments" rows="3"></textarea>

      <!-- 5. Nút Submit & Cancel (reset) canh giữa -->
      <div class="button-group">
        <button type="submit"><strong>Submit</strong></button>
        <button type="reset"><strong>Cancel</strong></button>
      </div>
    </form>
  </div>

</body>
</html>
```

#### 📖 Bảng giải thích các thuộc tính trong Bài tập Form Thông tin liên hệ nhóm:
| Thuộc tính / Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `<form action="GroupInfo.php" method="post">` | Khi bấm nút Submit, dữ liệu các ô có thuộc tính `name` sẽ được gửi ngầm bằng giao thức `POST` đến file `GroupInfo.php`. |
| `<label for="groupName">` & `<input id="groupName">` | Cặp `for` của `<label>` và `id` của `<input>` giống hệt nhau để liên kết nhãn với ô nhập (bấm vào chữ "Tên nhóm" thì con trỏ nhảy vào ô nhập). |
| `<fieldset>` & `<legend>` | Tạo khung viền bao quanh nhóm "Trang web giới thiệu đồ án của nhóm" với dòng tiêu đề nằm đè lên cạnh viền trên cùng. |
| `<input type="url" id="websiteUrl" required>` | Kiểu `type="url"` bắt buộc người dùng phải nhập đúng định dạng địa chỉ trang web (có `http://` hoặc `https://`). |
| `<button type="reset"><strong>Cancel</strong></button>` | Nút `type="reset"` giúp xóa trắng toàn bộ nội dung vừa gõ trong form khi bấm vào nút Cancel. |

---

## 🚨 7. CHECKLIST KIỂM TRA KỸ THUẬT

1. **Tiêu đề trang `<title>`**: Khai báo đúng nội dung tiêu đề hiển thị trên thanh tab trình duyệt.
2. **Liên kết `<label for="id_cua_o">`**: Phải khớp chính xác với thuộc tính `id="id_cua_o"` của thẻ `input` / `select` / `textarea`.
3. **Nhóm các trường liên quan**: Sử dụng `<fieldset>` kết hợp với `<legend>` cho khung viền có tiêu đề nằm trên cạnh trên.
4. **Kiểu `type` cho `<input>` và `<button>`**: Địa chỉ web dùng `type="url"`, email dùng `type="email"`, nút làm mới form (Cancel/Nhập lại) dùng `<button type="reset">`.
5. **Chặn tải lại trang với `e.preventDefault()`**: Đặt ở đầu hàm xử lý sự kiện `submit` bằng JS (hoặc dùng nút `type="button"`).
6. **Ép kiểu số học**: Bọc `parseInt()` / `parseFloat()` khi lấy `.value` từ input để tính toán (tránh lỗi nối chuỗi `"10000" + "20000"`).
7. **Tháng trong đối tượng `Date`**: Giá trị `new Date().getMonth()` tính từ `0` đến `11` nên cần cộng thêm `1`.
8. **Ủy quyền sự kiện (Event Delegation)**: Với các dòng bảng được thêm động, lắng nghe sự kiện trên `tbody` (`tbody.addEventListener("click", ...)`) và xóa dòng bằng `e.target.closest("tr").remove()`.
