# PHÂN TÍCH CÁC CHỨC NĂNG & GIẢI THÍCH CODE ỨNG DỤNG ĐẶT HÀNG COFFEE & BAKERY

Tài liệu này hệ thống hóa **toàn bộ các chức năng có trong bài Đặt Hàng Coffee & Bakery**, sau đó đi sâu vào **từng chức năng một** với đoạn code HTML/CSS/JavaScript thuần tương ứng (đã lược bỏ các thư viện ngoài như Bootstrap/Tailwind) và **bảng giải thích chi tiết từng câu lệnh**.

---

## 📋 TỔNG QUAN: CHƯƠNG TRÌNH NÀY GỒM NHỮNG CHỨC NĂNG GÌ?

Ứng dụng Đặt Hàng Coffee & Bakery bao gồm **7 chức năng cốt lõi** phối hợp với nhau:

| STT | Tên chức năng | Mô tả hoạt động chính |
| :--- | :--- | :--- |
| **Chức năng 1** | **Thiết kế bố cục 2 cột & Trạng thái CSS (`.active`, `.hidden`, Modal)** | Chia màn hình thành Cột Trái (Form chọn món) và Cột Phải (Bảng đơn hàng & Thanh toán), kèm các class điều khiển ẩn/hiện (`.hidden`) và đổi màu nút bấm khi kích hoạt (`.active`). |
| **Chức năng 2** | **Tính tổng tiền, đếm số món & Ẩn/Hiện thông báo giỏ hàng trống (`tinhTongTien`)** | Tự động quét toàn bộ các dòng `<tr>` trong bảng đơn hàng, lấy `Đơn giá × Số lượng` của từng món để cộng dồn thành **Tổng cộng**, đếm tổng số món, và tự động hiện dòng chữ *"Chưa có món nào"* nếu bảng bị xóa hết. |
| **Chức năng 3** | **Tích chọn Checkbox điều khoản để Mở khóa / Khóa nút Đặt hàng** | Mặc định nút *"Đặt hàng ngay"* bị khóa (`disabled`) và có màu xám. Khi người dùng tích vào ô *"Tôi đồng ý với điều khoản"*, nút sẽ được mở khóa và đổi sang màu nâu đậm (`.active`). |
| **Chức năng 4** | **Xóa món khỏi bảng & Tự động tính lại tiền ngay khi xóa** | Khi bấm nút *"Xóa"* ở bất kỳ dòng nào (kể cả dòng có sẵn hay dòng mới thêm), chương trình tìm đúng dòng `<tr>` đó để xóa khỏi bảng và lập tức tính lại tổng tiền. |
| **Chức năng 5** | **Thay đổi số lượng trực tiếp trong bảng & Chặn nhập số nhỏ hơn 1** | Khi người dùng gõ hoặc bấm mũi tên tăng/giảm ở ô Số lượng (`.qty`) trên từng dòng, nếu nhập số $< 1$ sẽ tự ép về `1` và tính lại Tổng cộng ngay lập tức. |
| **Chức năng 6** | **Thêm món mới vào đơn hàng (Tự động cộng dồn nếu trùng món)** | Đọc món đang chọn trong `<select>` và số lượng muốn thêm: nếu món đó **đã có sẵn** trong bảng thì chỉ cộng dồn thêm số lượng; nếu **chưa có** thì tạo một dòng `<tr>` mới gắn vào bảng. |
| **Chức năng 7** | **Bấm "Đặt hàng ngay" in Hóa Đơn vào Modal & Nút "Đóng / Tạo đơn mới"** | Tổng hợp toàn bộ các món trong bảng thành danh sách tóm tắt hóa đơn hiển thị lên hộp thoại Modal giữa màn hình. Khi bấm *"Đóng & Tạo đơn mới"*, chương trình ẩn Modal và xóa sạch bảng để làm đơn mới. |

---

## 🔍 CHI TIẾT TỪNG CHỨC NĂNG & ĐOẠN CODE TƯƠNG ỨNG

---

### 🔹 CHỨC NĂNG 1: Bố Cục Giao Diện 2 Cột & Các Class Trạng Thái CSS (`.active`, `.hidden`)

#### 1. Đoạn code CSS & Khung HTML của chức năng này:
```html
<style>
  /* Chia bố cục chính thành 2 cột: Cột trái 5 phần - Cột phải 7 phần */
  .layout-grid {
    display: grid;
    grid-template-columns: 5fr 7fr;
    gap: 24px;
    align-items: start;
  }
  /* Khi xem trên màn hình nhỏ (<= 768px) thì tự xếp thành 1 cột dọc */
  @media (max-width: 768px) {
    .layout-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Class dùng để ẩn bất kỳ phần tử nào (Thông báo trống, Modal) */
  .hidden {
    display: none !important;
  }

  /* Trạng thái nút Đặt hàng khi được mở khóa */
  .active {
    background-color: #78350f !important;
    color: #ffffff !important;
    cursor: pointer !important;
    box-shadow: 0 4px 12px rgba(120, 53, 15, 0.25);
  }
  .active:hover {
    background-color: #451a03 !important;
  }
</style>

<main class="main-container">
  <div class="layout-grid">
    <section class="card-box"><!-- Cột Trái: Form chọn món mới --></section>
    <section class="card-box"><!-- Cột Phải: Bảng danh sách món & Thanh toán --></section>
  </div>
</main>
```

#### 2. Bảng giải thích chi tiết:
| Thuộc tính / Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `display: grid; grid-template-columns: 5fr 7fr;` | Chia khung chứa `.layout-grid` thành 12 phần theo chiều ngang: **Cột trái chiếm 5 phần** (nhỏ hơn, chứa Form chọn món) và **Cột phải chiếm 7 phần** (rộng hơn, chứa Bảng danh sách món). |
| `@media (max-width: 768px)` | Khi màn hình thu nhỏ từ `768px` trở xuống (Tablet / Điện thoại), đổi `grid-template-columns: 1fr;` để 2 cột tự động rớt xuống xếp chồng dọc. |
| `.hidden { display: none !important; }` | Class công tắc dùng trong JavaScript: khi muốn **ẩn** phần tử thì gọi `el.classList.add("hidden")`, khi muốn **hiện** lại thì gọi `el.classList.remove("hidden")`. |
| `.active { ... !important; }` | Class tạo màu nâu nổi bật và đổi con trỏ chuột thành bàn tay (`cursor: pointer`) khi nút Đặt hàng được bật. Dùng `!important` để ghi đè lên màu xám mặc định của nút khi bị khóa. |

---

### 🔹 CHỨC NĂNG 2: Tính Tổng Tiền, Đếm Số Món & Ẩn/Hiện Thông Báo Trống (`tinhTongTien`)

#### 1. Đoạn code HTML (Bảng & Khu vực hiển thị tổng) và JavaScript của chức năng này:
```html
<!-- HTML phần tiêu đề đếm số món, bảng danh sách và dòng Tổng cộng -->
<h2>
  <span>Danh Sách Món</span>
  <span id="demSoLuongMon">1 món</span>
</h2>

<table>
  <tbody id="dsMon">
    <tr>
      <td class="ten-mon">Cà phê sữa</td>
      <td class="gia-mon" data-price="25000">25.000 đ</td>
      <td><input type="number" class="qty" value="2" min="1"></td>
      <td><button type="button" class="btn-xoa">Xóa</button></td>
    </tr>
  </tbody>
</table>

<!-- Thông báo hiện ra khi bảng không còn món nào -->
<div id="thongBaoTrong" class="hidden">
  <p>Chưa có món nào trong đơn hàng</p>
</div>

<div>
  <span>Tổng cộng:</span>
  <strong id="ketQuaTong">50.000 đ</strong>
</div>
```

```javascript
// Hàm định dạng số thành tiền tệ Việt Nam (VD: 50000 -> "50.000 đ")
function formatVND(amount) {
  return amount.toLocaleString('vi-VN') + ' đ';
}

// Hàm tính tổng tiền toàn bộ danh sách món
function tinhTongTien() {
  const dsMon = document.getElementById("dsMon");
  const rows = dsMon.querySelectorAll("tr");
  let tong = 0;
  let count = 0;

  rows.forEach(row => {
    const giaElement = row.querySelector(".gia-mon");
    const qtyElement = row.querySelector(".qty");

    if (giaElement && qtyElement) {
      const price = parseFloat(giaElement.dataset.price) || 0;
      const qty = parseInt(qtyElement.value) || 0;
      tong += price * qty;
      count += qty;
    }
  });

  // 1. Cập nhật giao diện Tổng tiền
  document.getElementById("ketQuaTong").textContent = formatVND(tong);

  // 2. Hiển thị / Ẩn thông báo khi danh sách trống
  const thongBaoTrong = document.getElementById("thongBaoTrong");
  if (rows.length === 0) {
    thongBaoTrong.classList.remove("hidden");
  } else {
    thongBaoTrong.classList.add("hidden");
  }

  // 3. Cập nhật nhãn đếm tổng số lượng món
  const demSoLuongMon = document.getElementById("demSoLuongMon");
  if (demSoLuongMon) {
    demSoLuongMon.textContent = count + " món";
  }
}

// Gọi chạy lần đầu ngay khi vừa mở trang
tinhTongTien();
```

#### 2. Bảng giải thích chi tiết:
| Thuộc tính / Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `<td class="gia-mon" data-price="25000">25.000 đ</td>` | **Kỹ thuật tách biệt Hiển thị và Tính toán**: Chữ `"25.000 đ"` để người dùng nhìn, còn thuộc tính `data-price="25000"` lưu số nguyên `25000` để JS lấy ra nhân tiền mà không cần cắt dấu chấm. |
| `amount.toLocaleString('vi-VN') + ' đ'` | Tự động thêm dấu chấm ngăn cách hàng nghìn theo chuẩn Việt Nam (VD: `50000` $\rightarrow$ `"50.000 đ"`). |
| `const rows = dsMon.querySelectorAll("tr");` | Lấy tất cả các dòng `<tr>` hiện đang có trong `<tbody id="dsMon">`. |
| `parseFloat(giaElement.dataset.price) \|\| 0` | Đọc giá trị `data-price` của dòng đó và đổi sang số. Nhờ `\|\| 0`, nếu dữ liệu trống hoặc lỗi sẽ tự trả về `0` thay vì gây lỗi `NaN`. |
| `tong += price * qty;` và `count += qty;` | Cộng dồn thành tiền của từng dòng vào biến `tong`, và cộng dồn số lượng ly/bánh vào biến `count`. |
| `if (rows.length === 0)` | Kiểm tra số dòng trong bảng: nếu bằng `0` (đã xóa hết món) thì gỡ class `"hidden"` để hiện thông báo *"Chưa có món nào trong đơn hàng"*; nếu còn món thì thêm `"hidden"` để ẩn thông báo đi. |

---

### 🔹 CHỨC NĂNG 3: Tích Chọn Checkbox Điều Khoản Để Mở Khóa Nút "Đặt Hàng Ngay"

#### 1. Đoạn code HTML & JavaScript của chức năng này:
```html
<!-- Ô tích chọn để bật/tắt nút đặt hàng -->
<label>
  <input type="checkbox" id="chkDongY">
  <span>Tôi đồng ý với các điều khoản đặt hàng</span>
</label>

<!-- Nút Đặt hàng (mặc định bị khóa bằng thuộc tính disabled) -->
<button type="button" id="btnDatHang" disabled class="btn-order">
  Đặt hàng ngay
</button>
```

```javascript
const chkDongY = document.getElementById("chkDongY");
const btnDatHang = document.getElementById("btnDatHang");

chkDongY.addEventListener("change", function() {
  btnDatHang.disabled = !this.checked; // Tích chọn -> mở khóa (disabled = false)
  btnDatHang.classList.toggle("active", this.checked); // Thêm/bớt class .active
});
```

#### 2. Bảng giải thích chi tiết:
| Thuộc tính / Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `disabled` (trên thẻ `<button>`) | Khóa cứng nút bấm ngay khi vừa tải trang (người dùng không thể bấm được khi chưa đồng ý điều khoản). |
| `chkDongY.addEventListener("change", ...)` | Kích hoạt hàm xử lý mỗi khi người dùng bấm tích chọn hoặc bỏ tích ô checkbox `#chkDongY`. |
| `this.checked` | Trả về `true` nếu ô checkbox đang được tích chọn, và `false` nếu bị bỏ tích. |
| `btnDatHang.disabled = !this.checked;` | Toán tử `!` đảo ngược giá trị:<br>• Khi **đã tích** (`this.checked` là `true`) $\rightarrow$ `disabled = false` (**mở khóa nút**).<br>• Khi **bỏ tích** (`this.checked` là `false`) $\rightarrow$ `disabled = true` (**khóa nút lại**). |
| `btnDatHang.classList.toggle("active", this.checked);` | Nếu `this.checked === true` thì gắn thêm class `.active` (nút chuyển sang màu nâu đậm); nếu `false` thì xóa class `.active` (nút trở về màu xám). |

---

### 🔹 CHỨC NĂNG 4: Xóa Món Khỏi Bảng & Tự Động Cập Nhật Tổng Tiền (Event Delegation)

#### 1. Đoạn code HTML & JavaScript của chức năng này:
```html
<!-- Nút xóa nằm ở cột cuối cùng của mỗi dòng <tr> -->
<td>
  <button type="button" class="btn-xoa" title="Xóa món">
    <i class="fa-solid fa-trash-can pointer-events-none"></i> Xóa
  </button>
</td>
```

```javascript
const dsMon = document.getElementById("dsMon");

dsMon.addEventListener("click", function(e) {
  if (e.target.classList.contains("btn-xoa")) {
    const row = e.target.closest("tr"); // Tìm đúng dòng <tr> chứa nút vừa bấm
    if (row) {
      row.remove();                     // Xóa dòng đó khỏi bảng
      tinhTongTien();                   // Cập nhật lại tổng tiền tự động
    }
  }
});
```

#### 2. Bảng giải thích chi tiết:
| Thuộc tính / Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `dsMon.addEventListener("click", function(e) { ... })` | **Ủy quyền sự kiện (Event Delegation)**: Gắn sự kiện `"click"` lên thẻ cha `<tbody id="dsMon">` thay vì gắn lên từng nút lẻ. Nhờ đó các dòng món ăn **mới được thêm vào sau** cũng tự động bấm xóa được! |
| `e.target.classList.contains("btn-xoa")` | Kiểm tra xem phần tử vừa bị chuột bấm trúng (`e.target`) có mang class `"btn-xoa"` hay không. |
| `pointer-events-none` (trên thẻ icon `<i>`) | Vô hiệu hóa nhận chuột trên biểu tượng thùng rác `<i>` bên trong nút, giúp khi bấm trúng biểu tượng thì `e.target` vẫn nhận diện chính xác là thẻ `<button class="btn-xoa">` ở ngoài. |
| `const row = e.target.closest("tr");` | Từ nút Xóa vừa bấm, tìm ngược lên thẻ cha/ông gần nhất là dòng `<tr>` chứa món đó. |
| `row.remove();` và `tinhTongTien();` | Xóa bỏ dòng `<tr>` đó khỏi bảng, rồi gọi ngay `tinhTongTien()` để tính lại Tổng cộng và kiểm tra xem bảng đã trống chưa. |

---

### 🔹 CHỨC NĂNG 5: Thay Đổi Số Lượng Trực Tiếp Trong Bảng & Chặn Nhập Số `< 1`

#### 1. Đoạn code HTML & JavaScript của chức năng này:
```html
<!-- Ô nhập số lượng nằm trong mỗi dòng của bảng -->
<td>
  <input type="number" class="qty" value="2" min="1">
</td>
```

```javascript
// Cập nhật tổng tiền ngay khi người dùng gõ hoặc bấm tăng/giảm số lượng trong bảng
dsMon.addEventListener("input", function(e) {
  if (e.target.classList.contains("qty")) {
    if (e.target.value < 1) e.target.value = 1;
    tinhTongTien();
  }
});
```

#### 2. Bảng giải thích chi tiết:
| Thuộc tính / Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `dsMon.addEventListener("input", ...)` | Sự kiện `"input"` kích hoạt **ngay lập tức mỗi khi giá trị trong ô thay đổi** (dù người dùng gõ bàn phím hay bấm nút mũi tên lên/xuống). |
| `if (e.target.classList.contains("qty"))` | Kiểm tra xem ô đang được sửa có phải là ô số lượng mang class `"qty"` trong bảng hay không. |
| `if (e.target.value < 1) e.target.value = 1;` | **Chặn số âm và số 0**: Nếu người dùng cố tình gõ số `0` hoặc số âm (như `-2`), chương trình lập tức ép giá trị quay về `1` rồi mới gọi `tinhTongTien()`. |

---

### 🔹 CHỨC NĂNG 6: Thêm Món Mới Vào Bảng (Cộng Dồn Nếu Trùng Món, Tạo Dòng Mới Nếu Chưa Có)

#### 1. Đoạn code HTML (Form cột trái) & JavaScript của chức năng này:
```html
<form id="formThemMon">
  <div>
    <label>Chọn thực đơn</label>
    <select id="selectMenu">
      <option value="Cà phê sữa" data-price="25000">Cà phê sữa - 25.000 đ</option>
      <option value="Cà phê đen" data-price="20000">Cà phê đen - 20.000 đ</option>
      <option value="Bạc xỉu" data-price="28000">Bạc xỉu - 28.000 đ</option>
      <option value="Trà đào cam sả" data-price="35000">Trà đào cam sả - 35.000 đ</option>
      <option value="Matcha Latte" data-price="40000">Matcha Latte - 40.000 đ</option>
      <option value="Bánh Croissant" data-price="30000">Bánh Croissant - 30.000 đ</option>
    </select>
  </div>

  <div>
    <label>Số lượng</label>
    <input type="number" id="inputSoLuong" value="1" min="1" max="99">
  </div>

  <button type="button" id="btnThemMon">+ Thêm Vào Đơn Hàng</button>
</form>
```

```javascript
const btnThemMon = document.getElementById("btnThemMon");
const selectMenu = document.getElementById("selectMenu");
const inputSoLuong = document.getElementById("inputSoLuong");

btnThemMon.addEventListener("click", function() {
  // 1. Lấy thông tin món đang chọn trong <select> và số lượng muốn thêm
  const selectedOption = selectMenu.options[selectMenu.selectedIndex];
  const tenMon = selectedOption.value;
  const price = parseFloat(selectedOption.dataset.price);
  const qty = parseInt(inputSoLuong.value) || 1;

  // 2. Kiểm tra xem món này đã có sẵn trong bảng chưa
  const existingRows = dsMon.querySelectorAll("tr");
  let monDaCo = false;

  existingRows.forEach(row => {
    const tenElement = row.querySelector(".ten-mon");
    if (tenElement && tenElement.textContent.trim() === tenMon) {
      const qtyInput = row.querySelector(".qty");
      qtyInput.value = parseInt(qtyInput.value) + qty; // Cộng dồn số lượng
      monDaCo = true;
    }
  });

  // 3. Nếu món chưa có trong bảng thì tạo dòng <tr> mới
  if (!monDaCo) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="ten-mon">${tenMon}</td>
      <td class="gia-mon" data-price="${price}">${formatVND(price)}</td>
      <td class="text-center">
        <input type="number" class="qty" value="${qty}" min="1">
      </td>
      <td class="text-right">
        <button type="button" class="btn-xoa" title="Xóa món">Xóa</button>
      </td>
    `;
    dsMon.appendChild(tr);
  }

  // 4. Reset ô số lượng chọn về 1 và tính lại tổng tiền
  inputSoLuong.value = 1;
  tinhTongTien();
});
```

#### 2. Bảng giải thích chi tiết:
| Thuộc tính / Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `<option value="Cà phê sữa" data-price="25000">` | Thiết kế thông minh trên thẻ `<option>`: giữ **Tên món** ở `value` và giữ **Đơn giá số** ở `data-price`. |
| `selectMenu.options[selectMenu.selectedIndex]` | Lấy ra đúng thẻ `<option>` mà người dùng đang chọn trong danh sách thả xuống. |
| `let monDaCo = false;` | Biến cờ (*flag*) đánh dấu xem món vừa chọn đã xuất hiện trong bảng hay chưa. |
| `if (tenElement.textContent.trim() === tenMon)` | So sánh tên món ở từng dòng trong bảng với tên món đang chọn thêm: nếu **trùng tên**, ta chỉ lấy số lượng cũ cộng thêm số lượng mới (`parseInt(qtyInput.value) + qty`) và đặt `monDaCo = true`. |
| `if (!monDaCo) { const tr = document.createElement("tr"); ... dsMon.appendChild(tr); }` | Nếu duyệt hết bảng mà `monDaCo` vẫn bằng `false`, chương trình tạo một thẻ `<tr>` mới, điền 4 ô `<td>` (nhớ gắn kèm `class="ten-mon"`, `class="gia-mon" data-price="${price}"`, `class="qty"`, `class="btn-xoa"` giống hệt dòng mẫu) rồi chèn vào cuối `dsMon`. |
| `inputSoLuong.value = 1; tinhTongTien();` | Đưa ô số lượng ở Form bên trái về lại `1` và cập nhật lại Tổng cộng. |

---

### 🔹 CHỨC NĂNG 7: Bấm "Đặt Hàng Ngay" Hiển Thị Hóa Đơn Trong Modal & Nút "Đóng / Tạo Đơn Mới"

#### 1. Đoạn code HTML (Khung Modal) & JavaScript của chức năng này:
```html
<!-- Modal Xác Nhận Đặt Hàng Thành Công (Mặc định ẩn bằng class .hidden) -->
<div id="modalXacNhan" class="modal-overlay hidden">
  <div class="modal-box" id="modalContent">
    <div class="modal-header">
      <h3>Đặt hàng thành công!</h3>
      <p>Cảm ơn bạn đã lựa chọn dịch vụ của chúng tôi.</p>
    </div>

    <!-- Nơi JavaScript sẽ đổ danh sách tóm tắt các món đã đặt vào -->
    <div class="modal-body" id="chiTietDonHang"></div>

    <button type="button" id="btnDongModal" class="btn-close-modal">
      Đóng & Tạo đơn mới
    </button>
  </div>
</div>
```

```javascript
const modalXacNhan = document.getElementById("modalXacNhan");
const modalContent = document.getElementById("modalContent");
const chiTietDonHang = document.getElementById("chiTietDonHang");
const btnDongModal = document.getElementById("btnDongModal");

// A. Khi bấm nút "Đặt hàng ngay" -> Tạo nội dung hóa đơn và mở Modal
btnDatHang.addEventListener("click", function() {
  if (this.disabled) return;

  const rows = dsMon.querySelectorAll("tr");
  if (rows.length === 0) {
    alert("Danh sách món của bạn đang trống. Vui lòng chọn món trước khi đặt!");
    return;
  }

  // Xây dựng danh sách chi tiết đơn hàng
  let htmlContent = `<h4>Tóm tắt đơn hàng:</h4><ul class="summary-list">`;
  let tongCong = 0;

  rows.forEach(row => {
    const name = row.querySelector(".ten-mon").textContent;
    const price = parseFloat(row.querySelector(".gia-mon").dataset.price);
    const qty = parseInt(row.querySelector(".qty").value);
    const subtotal = price * qty;
    tongCong += subtotal;

    htmlContent += `
      <li class="summary-item">
        <span><strong>${qty}x</strong> ${name}</span>
        <span>${formatVND(subtotal)}</span>
      </li>
    `;
  });

  htmlContent += `</ul>`;
  htmlContent += `
    <div class="summary-total">
      <span>Tổng tiền thanh toán:</span>
      <span>${formatVND(tongCong)}</span>
    </div>
  `;

  chiTietDonHang.innerHTML = htmlContent;

  // Mở Modal
  modalXacNhan.classList.remove("hidden");
  setTimeout(() => {
    modalXacNhan.classList.remove("opacity-0");
    modalContent.classList.remove("scale-95");
  }, 10);
});

// B. Khi bấm nút "Đóng & Tạo đơn mới" -> Ẩn Modal và Reset toàn bộ giỏ hàng
btnDongModal.addEventListener("click", function() {
  modalXacNhan.classList.add("opacity-0");
  modalContent.classList.add("scale-95");

  setTimeout(() => {
    modalXacNhan.classList.add("hidden");
    // Reset bảng món và checkbox về trạng thái trắng ban đầu
    dsMon.innerHTML = "";
    chkDongY.checked = false;
    btnDatHang.disabled = true;
    btnDatHang.classList.remove("active");
    tinhTongTien();
  }, 300);
});
```

#### 2. Bảng giải thích chi tiết:
| Thuộc tính / Cú pháp Code | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `if (this.disabled) return;` | Chặn không cho hàm chạy nếu nút Đặt hàng đang ở trạng thái bị khóa (`disabled`). |
| `if (rows.length === 0) { alert(...); return; }` | Kiểm tra nếu bảng đơn hàng không có món nào (`rows.length === 0`) thì báo lỗi nhắc người dùng chọn món trước khi đặt. |
| `const subtotal = price * qty;` | Tính thành tiền của từng món (`Đơn giá × Số lượng`) để in ra dòng `<li>` dạng `2x Cà phê sữa — 50.000 đ`, đồng thời cộng vào `tongCong`. |
| `chiTietDonHang.innerHTML = htmlContent;` | Chèn toàn bộ danh sách `<ul>...</ul>` và dòng `Tổng tiền thanh toán` vừa nối chuỗi xong vào trong khung `#chiTietDonHang` của Modal. |
| `modalXacNhan.classList.remove("hidden");` | Gỡ bỏ class `"hidden"` để hiện hộp thoại Modal lên màn hình. |
| `dsMon.innerHTML = "";` (khi đóng Modal) | Xóa sạch toàn bộ các thẻ `<tr>` bên trong `<tbody id="dsMon">` để làm mới đơn hàng. |
| `chkDongY.checked = false; btnDatHang.disabled = true; btnDatHang.classList.remove("active");` | Bỏ tích ô đồng ý điều khoản, khóa lại nút Đặt hàng và trả màu nút về màu xám ban đầu, sau đó gọi `tinhTongTien()` để tổng tiền về `0 đ` và hiện thông báo giỏ hàng trống. |
