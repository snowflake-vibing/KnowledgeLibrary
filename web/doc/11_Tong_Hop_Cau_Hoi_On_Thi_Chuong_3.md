# CHUYÊN ĐỀ 11: TỔNG HỢP CÂU HỎI TRẮC NGHIỆM & ĐỀ THI MẪU CHƯƠNG 3

> **Môn học:** Phát triển ứng dụng Web (IS207)  
> **Trọng tâm:** JavaScript Cơ bản & Nâng cao, DOM, Sự kiện, Bất đồng bộ, Regex, Thư viện jQuery

---

## PHẦN 1: BẢNG SO SÁNH TỔNG HỢP KIẾN THỨC SỐNG CÒN

### 1. Phân biệt `var`, `let` và `const`
| Đặc điểm | `var` | `let` | `const` |
| :--- | :---: | :---: | :---: |
| **Phạm vi (Scope)** | Function / Global | **Block `{}`** | **Block `{}`** |
| **Hoisting** | Có (khởi tạo `undefined`) | TDZ (báo lỗi ReferenceError) | TDZ (báo lỗi ReferenceError) |
| **Khai báo lại trong scope** | **Có** | Không | Không |
| **Gán lại giá trị** | Có | Có | **Không** |

### 2. Phân biệt `null`, `undefined` và `NaN`
- `undefined`: Biến chưa được gán giá trị, truy cập thuộc tính không tồn tại (`typeof === 'undefined'`).
- `null`: Giá trị rỗng được chủ động gán (`typeof === 'object'`).
- `NaN`: Kết quả của phép toán số học không hợp lệ (`typeof === 'number'`).
- *So sánh:* `null == undefined` là `true`; `null === undefined` là `false`; `NaN === NaN` là `false`.

### 3. Phân biệt `window.onload` và `$(document).ready()`
- `$(document).ready()`: Kích hoạt ngay khi **cây DOM vừa dựng xong** $\rightarrow$ nhanh, cho phép tương tác sớm.
- `window.onload`: Bắt buộc đợi **toàn bộ tài nguyên (ảnh, video, stylesheet...) tải xong 100%**.

---

## PHẦN 2: NGÂN HÀNG CÂU HỎI TRẮC NGHIỆM CHỌN LỌC (CÓ ĐÁP ÁN & GIẢI THÍCH)

### Câu 1 (Bản chất ngôn ngữ)
**Phát biểu nào sau đây về mối quan hệ giữa Java và JavaScript là CHÍNH XÁC nhất?**  
A. JavaScript là phiên bản thu nhỏ của Java dành cho trình duyệt.  
B. JavaScript được biên dịch sang bytecode còn Java được thông dịch.  
C. Java và JavaScript là hai ngôn ngữ hoàn toàn khác biệt; từ "Java" trong JavaScript được dùng như một chiến lược marketing vào năm 1995.  
D. Cả hai ngôn ngữ đều do tập đoàn Sun Microsystems tự mình phát triển độc lập từ đầu.  

> **Đáp án:** **C**  
> **Giải thích:** JavaScript ban đầu có tên là LiveScript do Brendan Eich phát triển tại Netscape. Năm 1995, Netscape đổi tên thành JavaScript để tận dụng sức hút truyền thông của Java thời điểm đó.

---

### Câu 2 (Ép kiểu ngầm định)
**Đoạn mã sau sẽ in ra kết quả gì trong cửa sổ Console?**
```javascript
console.log("10" - 2 + "5");
```
A. `"10-25"`  
B. `"85"`  
C. `13`  
D. `NaN`  

> **Đáp án:** **B**  
> **Giải thích:** Phép toán thực hiện từ trái sang phải:  
> 1. `"10" - 2`: Toán tử trừ ép chuỗi `"10"` thành số $10$, kết quả là số $8$.  
> 2. `8 + "5"`: Toán tử cộng gặp chuỗi `"5"` sẽ ép số $8$ thành chuỗi và nối lại $\rightarrow$ `"85"`.

---

### Câu 3 (Toán tử Nullish Coalescing)
**Kết quả hiển thị trên màn hình của đoạn mã sau là gì?**
```javascript
let count = 0;
let defaultVal = 100;
console.log((count || defaultVal) + " - " + (count ?? defaultVal));
```
A. `"100 - 100"`  
B. `"0 - 0"`  
C. `"100 - 0"`  
D. `"0 - 100"`  

> **Đáp án:** **C**  
> **Giải thích:**  
> - Với toán tử `||`: số `0` bị coi là Falsy $\rightarrow$ lấy vế sau là `100`.  
> - Với toán tử `??`: số `0` KHÔNG phải là `null` hay `undefined` $\rightarrow$ giữ nguyên giá trị `0`.

---

### Câu 4 (Event Bubbling)
**Khi click vào một thẻ `<button>` nằm bên trong thẻ `<div>`, nếu cả hai thẻ đều có sự kiện `click`, thứ tự thực thi mặc định theo cơ chế Event Bubbling là gì?**  
A. Sự kiện của `<div>` chạy trước, sau đó tới `<button>`.  
B. Sự kiện của `<button>` chạy trước, sau đó nổi bọt lên `<div>`.  
C. Chỉ có sự kiện của `<button>` được thực thi, sự kiện của `<div>` bị bỏ qua hoàn toàn.  
D. Trình duyệt báo lỗi xung đột sự kiện.  

> **Đáp án:** **B**  
> **Giải thích:** Cơ chế mặc định trong trình duyệt là **Event Bubbling (Nổi bọt)**: sự kiện kích hoạt tại phần tử con đích trước (`<button>`), sau đó nổi bọt ngược lên các phần tử cha bao ngoài (`<div>`, `<body>`, `<html>`, `window`). Để chặn nổi bọt, ta dùng `event.stopPropagation()`.

---

### Câu 5 (Bất đồng bộ & Event Loop)
**Thứ tự in ra màn hình Console của đoạn mã sau là gì?**
```javascript
console.log("A");
setTimeout(() => {
  console.log("B");
}, 0);
Promise.resolve().then(() => {
  console.log("C");
});
console.log("D");
```
A. A $\rightarrow$ B $\rightarrow$ C $\rightarrow$ D  
B. A $\rightarrow$ D $\rightarrow$ B $\rightarrow$ C  
C. A $\rightarrow$ D $\rightarrow$ C $\rightarrow$ B  
D. A $\rightarrow$ C $\rightarrow$ D $\rightarrow$ B  

> **Đáp án:** **C**  
> **Giải thích:**  
> 1. Mã đồng bộ trong Call Stack chạy trước: in `"A"`, sau đó in `"D"`.  
> 2. Promise là **Microtask**, có độ ưu tiên cao hơn Macrotask: sau khi Call Stack rỗng, Promise `.then()` chạy ngay lập tức $\rightarrow$ in `"C"`.  
> 3. `setTimeout` là **Macrotask** nằm trong Task Queue $\rightarrow$ chạy cuối cùng $\rightarrow$ in `"B"`.

---

### Câu 6 (Regex)
**Biểu thức chính quy nào sau đây kiểm tra một chuỗi BẮT BUỘC phải là Mã số sinh viên UIT gồm đúng 8 chữ số và bắt đầu bằng số 2 (ví dụ: 24520496)?**  
A. `/[0-9]{8}/`  
B. `/^2\d{7}$/`  
C. `/^2\d{8}$/`  
D. `/\d{8}$/`  

> **Đáp án:** **B**  
> **Giải thích:** `^` bắt đầu chuỗi, tiếp theo là số `2`, sau đó là đúng 7 chữ số `\d{7}` (tổng cộng 1 + 7 = 8 chữ số), `$` neo kết thúc chuỗi.

---

### Câu 7 (jQuery Selectors)
**Để chọn tất cả các dòng ở vị trí chỉ số chẵn (0, 2, 4...) trong một bảng bằng jQuery, ta sử dụng selector nào?**  
A. `$("tr:odd")`  
B. `$("tr:even")`  
C. `$("tr:first")`  
D. `$("tr:eq(0)")`  

> **Đáp án:** **B**  
> **Giải thích:** Trong jQuery, `:even` chọn các phần tử có chỉ số index chẵn tính từ 0 (0, 2, 4...). `:odd` chọn các phần tử có chỉ số lẻ (1, 3, 5...).

---

### Câu 8 (jQuery DOM Manipulation)
**Điểm khác biệt giữa hai phương thức `$("#box").remove()` và `$("#box").empty()` trong jQuery là gì?**  
A. `remove()` chỉ xóa style, `empty()` xóa nội dung text.  
B. `empty()` xóa toàn bộ thẻ `#box` và các con; `remove()` chỉ xóa các con.  
C. `remove()` xóa sạch bản thân thẻ `#box` cùng mọi phần tử con bên trong ra khỏi DOM; `empty()` chỉ xóa các con bên trong và giữ nguyên thẻ `#box`.  
D. Hai hàm có tác dụng hoàn toàn giống nhau.  

> **Đáp án:** **C**  
> **Giải thích:** `.remove()` xóa cả phần tử được chọn lẫn con của nó; `.empty()` chỉ "làm rỗng" nội dung bên trong phần tử được chọn.

---

## PHẦN 3: BÀI TẬP THỰC HÀNH TỰ LUẬN KINH ĐIỂN

### Bài tập 1: Xây dựng Dynamic Table Quản Lý Đơn Hàng (Tính tổng tiền tự động)
**Yêu cầu:**  
1. Form gồm: Tên hàng, Số lượng, Đơn giá và nút "Thêm vào bảng".
2. Khi bấm Thêm: tự động tính Thành tiền = Số lượng $\times$ Đơn giá; thêm hàng mới vào bảng `<table>`.
3. Có cột "Hành động" chứa nút "Xóa" để xóa dòng hiện tại.
4. Cập nhật dòng "Tổng cộng" ở chân bảng sau mỗi lần Thêm hoặc Xóa.

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Quản lý đơn hàng</title>
  <style>
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background: #f2f2f2; }
    .text-right { text-align: right; }
  </style>
</head>
<body>
  <h2>QUẢN LÝ BÁN HÀNG</h2>
  <form id="orderForm">
    <input type="text" id="itemName" placeholder="Tên sản phẩm" required>
    <input type="number" id="quantity" placeholder="Số lượng" min="1" required>
    <input type="number" id="price" placeholder="Đơn giá" min="0" required>
    <button type="submit">Thêm vào giỏ</button>
  </form>

  <table id="orderTable">
    <thead>
      <tr>
        <th>Tên hàng</th>
        <th class="text-right">Số lượng</th>
        <th class="text-right">Đơn giá</th>
        <th class="text-right">Thành tiền</th>
        <th>Hành động</th>
      </tr>
    </thead>
    <tbody id="orderBody"></tbody>
    <tfoot>
      <tr>
        <th colspan="3" class="text-right">Tổng thanh toán:</th>
        <th id="totalPrice" class="text-right">0 VNĐ</th>
        <th></th>
      </tr>
    </tfoot>
  </table>

  <script>
    const form = document.getElementById("orderForm");
    const tbody = document.getElementById("orderBody");
    const lblTotal = document.getElementById("totalPrice");

    function updateTotal() {
      let total = 0;
      const rows = tbody.querySelectorAll("tr");
      rows.forEach(row => {
        const subtotal = parseFloat(row.dataset.subtotal) || 0;
        total += subtotal;
      });
      lblTotal.textContent = total.toLocaleString("vi-VN") + " VNĐ";
    }

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const name = document.getElementById("itemName").value.trim();
      const qty = parseInt(document.getElementById("quantity").value);
      const price = parseFloat(document.getElementById("price").value);
      const subtotal = qty * price;

      const row = tbody.insertRow();
      row.dataset.subtotal = subtotal; // Lưu thành tiền vào dataset

      row.insertCell(0).textContent = name;
      row.insertCell(1).className = "text-right";
      row.cells[1].textContent = qty;
      row.insertCell(2).className = "text-right";
      row.cells[2].textContent = price.toLocaleString("vi-VN");
      row.insertCell(3).className = "text-right";
      row.cells[3].textContent = subtotal.toLocaleString("vi-VN");

      const actionCell = row.insertCell(4);
      const delBtn = document.createElement("button");
      delBtn.textContent = "Xóa";
      delBtn.onclick = function() {
        row.remove();
        updateTotal(); // Cập nhật lại tổng khi xóa
      };
      actionCell.appendChild(delBtn);

      updateTotal();
      form.reset();
    });
  </script>
</body>
</html>
```

---

### Bài tập 2: Ứng dụng Tab Chuyển Đổi Nội Dung Bằng jQuery
```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <title>Tab Menu jQuery</title>
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <style>
    .tab-nav { list-style: none; display: flex; padding: 0; margin: 0; }
    .tab-nav li { padding: 10px 20px; background: #eee; cursor: pointer; border: 1px solid #ccc; margin-right: 4px; }
    .tab-nav li.active { background: #007bff; color: white; font-weight: bold; }
    .tab-content { display: none; padding: 20px; border: 1px solid #ccc; margin-top: -1px; }
    .tab-content.active { display: block; }
  </style>
</head>
<body>

  <ul class="tab-nav">
    <li class="active" data-target="#tab1">Chương 1</li>
    <li data-target="#tab2">Chương 2</li>
    <li data-target="#tab3">Chương 3</li>
  </ul>

  <div id="tab1" class="tab-content active">Nội dung Tổng quan Mạng máy tính & Kiến trúc Web...</div>
  <div id="tab2" class="tab-content">Nội dung HTML, HTML5, CSS, CSS3 và Bootstrap...</div>
  <div id="tab3" class="tab-content">Nội dung JavaScript DOM, Bất đồng bộ và thư viện jQuery...</div>

  <script>
    $(document).ready(function() {
      $(".tab-nav li").click(function() {
        // Đổi trạng thái active cho tab
        $(".tab-nav li").removeClass("active");
        $(this).addClass("active");

        // Ẩn nội dung cũ, làm mờ hiện nội dung mới
        const targetId = $(this).data("target");
        $(".tab-content").removeClass("active").hide();
        $(targetId).fadeIn(300).addClass("active");
      });
    });
  </script>

</body>
</html>
```

---

## PHẦN 4: MẸO TRÁNH "BẪY" THI CỬ CHƯƠNG 3

1. **Bẫy `typeof null`:** Luôn nhớ `typeof null === "object"`, trong khi `typeof undefined === "undefined"`.
2. **Bẫy `NaN`:** `NaN === NaN` luôn là **`false`**. Không bao giờ được dùng `if (x === NaN)`, bắt buộc phải dùng `isNaN(x)` hoặc `Number.isNaN(x)`.
3. **Bẫy tháng trong `Date`:** `date.getMonth()` trả về giá trị từ **0 đến 11** (Tháng 1 là 0, Tháng 12 là 11). Khi in ra màn hình phải cộng thêm 1.
4. **Bẫy Event Delegation trong jQuery:** Các phần tử được sinh ra bằng `.append()` sau khi tải trang sẽ **không nhận sự kiện `.click()` thông thường**. Bắt buộc phải gắn thông qua thẻ cha: `$(cha).on("click", "con", handler)`.
5. **Bẫy Arrow Function và `this`:** Tuyệt đối không dùng Arrow Function làm phương thức của Object nếu trong phương thức đó có dùng `this.prop`, vì `this` sẽ trỏ ra ngoài `window`.
