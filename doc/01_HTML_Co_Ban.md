# CHUYÊN ĐỀ 01: HTML & CẤU TRÚC TRANG WEB TĨNH

> **Môn học:** Phát triển ứng dụng Web (IS207)  
> **Tài liệu tham khảo chính:** `Chương 2 Web-HTML-SV.pdf` (77 trang)

---

## 1. TỔNG QUAN VỀ HTML

### 1.1. Định nghĩa & Khái niệm
- **HTML** viết tắt của **HyperText Markup Language** (Ngôn ngữ đánh dấu siêu văn bản).
  - *HyperText (Siêu văn bản):* Văn bản chứa các liên kết cho phép điều hướng đến tài liệu hoặc trang web khác.
  - *Markup (Đánh dấu):* Sử dụng các cặp thẻ (`<tag>...</tag>`) để mô tả cấu trúc và định dạng nội dung hiển thị.
- **Lưu ý quan trọng:** HTML **không phải là ngôn ngữ lập trình** (không có biến, rẽ nhánh, vòng lặp hay xử lý logic).
- **Lịch sử:** Do Tim Berners-Lee phát minh; tổ chức **W3C (World Wide Web Consortium)** chuẩn hóa và duy trì từ năm 1994.

### 1.2. Đặc tính hiển thị của trình duyệt
- Thẻ HTML **không phân biệt hoa/thường** (tuy nhiên chuẩn W3C khuyến nghị luôn viết chữ thường `<html>`, `<body>`).
- **Khoảng trắng:** Trình duyệt sẽ gộp nhiều dấu cách, dấu tab và dấu xuống dòng liên tiếp thành **duy nhất một khoảng trắng**.
- **Cơ chế chịu lỗi:** Trình duyệt **không báo lỗi cú pháp** như trình biên dịch C++/Java; thay vào đó, nó cố gắng hiển thị tốt nhất có thể, dễ dẫn đến hiện tượng vỡ giao diện âm thầm nếu đóng thẻ sai.

### 1.3. Cấu trúc chuẩn của một tài liệu HTML
```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tiêu đề hiển thị trên thanh Tab</title>
  </head>
  <body>
    <!-- Nội dung hiển thị cho người dùng đặt tại đây -->
    <h1>Xin chào thế giới!</h1>
  </body>
</html>
```

- `<!DOCTYPE html>`: Khai báo chuẩn HTML5 giúp trình duyệt render ở chế độ tiêu chuẩn (*Standards Mode*).
- `<head>`: Chứa siêu dữ liệu (metadata), tiêu đề trang, liên kết CSS/font, thẻ cấu hình... không hiển thị trực tiếp lên vùng trang web.
- `<body>`: Chứa toàn bộ nội dung trực quan hiển thị tới người dùng.

---

## 2. THẺ ĐỊNH DẠNG VĂN BẢN & KÝ TỰ ĐẶC BIỆT

### 2.1. Tiêu đề và Khối văn bản
- Thẻ tiêu đề: `<h1>` đến `<h6>` (giảm dần từ cấp quan trọng nhất đến nhỏ nhất).
- Đoạn văn: `<p>...</p>` (tự động có lề trên và dưới).
- Ngắt dòng: `<br />` (thẻ tự đóng, ngắt xuống hàng không tạo khoảng đệm lề).
- Đường phân cách ngang: `<hr />` (Horizontal Rule).
- Thẻ trích dẫn:
  - `<blockquote>`: Khối trích dẫn dài, tự động thụt lề cả hai bên.
  - `<q>`: Trích dẫn ngắn trong dòng (trình duyệt tự thêm dấu ngoặc kép).
- Thẻ giữ nguyên định dạng: `<pre>...</pre>` (giữ nguyên từng dấu cách và ngắt dòng, font đơn khoảng cách *monospace*).

### 2.2. Định dạng ký tự (Inline Formatting)
| Thẻ trực quan | Thẻ ngữ nghĩa (Semantic) | Ý nghĩa & Ứng dụng |
| :---: | :---: | :--- |
| `<b>` | `<strong>` | In đậm văn bản (`<strong>` mang ý nghĩa nội dung quan trọng). |
| `<i>` | `<em>` | In nghiêng văn bản (`<em>` là nhấn mạnh - emphasis). |
| `<u>` | `<ins>` | Gạch chân bên dưới văn bản (`<ins>` đại diện cho phần chèn thêm). |
| `<s>`, `<strike>` | `<del>` | Gạch ngang chữ (`<del>` đại diện cho phần nội dung bị xóa). |
| `<sup>` | — | Chỉ số trên (vd: `x<sup>2</sup>` $\rightarrow$ $x^2$). |
| `<sub>` | — | Chỉ số dưới (vd: `H<sub>2</sub>O` $\rightarrow$ $H_2O$). |

### 2.3. Thực thể HTML (HTML Entities)
Dùng để hiển thị các ký tự trùng với cú pháp HTML hoặc ký tự đặc biệt:
- Khoảng trắng cứng (không bị gộp): `&nbsp;`
- Nhỏ hơn (`<`): `&lt;`
- Lớn hơn (`>`): `&gt;`
- Dấu và (`&`): `&amp;`
- Dấu nháy kép (`"`): `&quot;`
- Dấu nháy đơn (`'`): `&apos;`
- Bản quyền: `&copy;` ($\text{©}$)
- Thương hiệu đã đăng ký: `&reg;` ($\text{®}$)

---

## 3. HÌNH ẢNH & DANH SÁCH

### 3.1. Thẻ hình ảnh (`<img>`)
- Cú pháp:
  ```html
  <img src="images/logo.png" alt="Logo UIT" width="200" height="80">
  ```
- **Thuộc tính bắt buộc/quan trọng:**
  - `src`: Đường dẫn URL tương đối hoặc tuyệt đối tới file ảnh.
  - `alt`: Dòng chữ thay thế hiển thị khi ảnh tải lỗi; cực kỳ quan trọng cho SEO và công cụ đọc màn hình cho người khiếm thị.
  - `width`, `height`: Chiều rộng, chiều cao (tính bằng pixel hoặc %).
  - *Lưu ý:* `<img>` là thẻ tự đóng (*empty/void element*), có tính chất nội dòng (*inline*).

### 3.2. Danh sách (Lists)
1. **Danh sách không thứ tự (Unordered List):**
   ```html
   <ul type="disc"> <!-- type: disc (mặc định), circle, square -->
     <li>Toán rời rạc</li>
     <li>Cấu trúc dữ liệu</li>
   </ul>
   ```
2. **Danh sách có thứ tự (Ordered List):**
   ```html
   <ol type="1" start="5"> <!-- type: 1, a, A, i, I; start: số bắt đầu -->
     <li>Bước chuẩn bị</li>
     <li>Bước thực hiện</li>
   </ol>
   ```
3. **Danh sách định nghĩa (Definition List):**
   ```html
   <dl>
     <dt>HTML</dt>
     <dd>Ngôn ngữ đánh dấu siêu văn bản.</dd>
     <dt>CSS</dt>
     <dd>Ngôn ngữ định kiểu tầng cho trang web.</dd>
   </dl>
   ```

---

## 4. SIÊU LIÊN KẾT (HYPERLINKS)

Thẻ neo `<a>` dùng để tạo liên kết:
```html
<a href="https://uit.edu.vn" target="_blank" title="Website trường UIT">Đến UIT</a>
```

### 4.1. Thuộc tính `target`
- `_blank`: Mở liên kết trong một tab hoặc cửa sổ mới.
- `_self`: Mở ngay tại tab/khung hiện tại (giá trị mặc định).
- `_parent`: Mở tại khung cha bao quanh.
- `_top`: Thoát khỏi toàn bộ các khung iframe và mở toàn cửa sổ.

### 4.2. Neo nội bộ trang (Page Bookmark / Anchor)
- Bước 1: Gán `id` tại vị trí đích cần nhảy đến:
  ```html
  <h2 id="chuong-3">Nội dung Chương 3</h2>
  ```
- Bước 2: Tạo liên kết gọi neo bằng ký tự `#`:
  ```html
  <a href="#chuong-3">Nhảy nhanh đến Chương 3</a>
  <!-- Quay về đầu trang -->
  <a href="#">Lên đầu trang</a>
  ```
- Liên kết gửi email: `<a href="mailto:support@domain.com?subject=LienHe">Gửi Email</a>`

---

## 5. BẢNG BIỂU (TABLES)

Bảng biểu dùng để hiển thị dữ liệu dạng dòng và cột có cấu trúc.

### 5.1. Cấu trúc thẻ cơ bản
- `<table>`: Khung bao toàn bộ bảng.
- `<tr>` *(Table Row)*: Một hàng trong bảng.
- `<th>` *(Table Header)*: Ô tiêu đề cột (mặc định **in đậm** và **canh giữa**).
- `<td>` *(Table Data)*: Ô dữ liệu thông thường.
- `<caption>`: Tiêu đề chú thích đặt ngay trên đầu bảng.
- `<thead>`, `<tbody>`, `<tfoot>`: Phân vùng ngữ nghĩa phần đầu, thân và chân bảng.

### 5.2. Các thuộc tính bảng cổ điển
- `border="1"`: Độ dày đường viền.
- `cellpadding="8"`: Khoảng đệm từ nội dung ô đến đường viền ô.
- `cellspacing="0"`: Khoảng cách giữa các ô kề nhau.
- `width="100%"`: Độ rộng của bảng.

### 5.3. Gộp ô trong bảng (Colspan & Rowspan - Trọng tâm thi)
- `colspan="n"`: Gộp **$n$ cột liên tiếp** trên cùng một hàng (mở rộng theo chiều ngang).
- `rowspan="n"`: Gộp **$n$ hàng liên tiếp** trên cùng một cột (mở rộng theo chiều dọc).

> **Nguyên tắc vàng khi gộp ô:**  
> Khi một ô dùng `colspan="n"`, hàng hiện tại sẽ bớt đi $n-1$ thẻ `<td>`.  
> Khi một ô dùng `rowspan="n"`, ở các hàng tiếp theo bên dưới phải **bỏ bớt thẻ `<td>` tương ứng** tại vị trí bị chiếm chỗ.

#### Ví dụ minh họa gộp ô:
```html
<table border="1" cellpadding="6" cellspacing="0">
  <tr>
    <th rowspan="2">STT</th>
    <th colspan="2">Họ và Tên</th>
    <th rowspan="2">Điểm TK</th>
  </tr>
  <tr>
    <th>Họ đệm</th>
    <th>Tên</th>
  </tr>
  <tr>
    <td>1</td>
    <td>Nguyễn Văn</td>
    <td>An</td>
    <td>9.5</td>
  </tr>
</table>
```

---

## 6. BIỂU MẪU & ĐIỀU KHIỂN FORM (FORM & CONTROLS)

Form là cầu nối giúp thu thập dữ liệu nhập từ người dùng và gửi về máy chủ (Server).

### 6.1. Thẻ `<form>` và các thuộc tính quan trọng
```html
<form action="process.php" method="POST" enctype="multipart/form-data">
```
- `action`: Địa chỉ URL của tài nguyên/script trên server tiếp nhận xử lý form.
- `method`: Phương thức truyền dữ liệu:
  - **`GET`**: 
    - Dữ liệu nối thẳng vào URL sau dấu hỏi chấm (`url?user=admin&pass=123`).
    - Bị giới hạn độ dài ký tự của URL (khoảng 2048 ký tự).
    - **Không bảo mật** (lộ mật khẩu trên URL và lịch sử duyệt web).
    - Có thể lưu Bookmark hoặc Cache kết quả. Phù hợp cho tính năng tìm kiếm, lọc dữ liệu.
  - **`POST`**:
    - Dữ liệu được đóng gói trong phần thân (Body) của HTTP Request.
    - Không giới hạn độ dài dữ liệu; bảo mật hơn `GET`.
    - Thích hợp cho form đăng nhập, gửi dữ liệu nhạy cảm, thanh toán, upload file.
- `enctype`: Kiểu mã hóa dữ liệu gửi đi:
  - `application/x-www-form-urlencoded`: Mặc định, mã hóa ký tự dạng key=val&...
  - `multipart/form-data`: **Bắt buộc** khi form có chức năng tải file lên (`<input type="file">`).

### 6.2. Các phần tử điều khiển (Form Controls)
1. **Ô nhập một dòng (`<input>`)**:
   - `type="text"`: Nhập văn bản tự do.
   - `type="password"`: Nhập mật khẩu (ký tự bị che thành chấm đen/dấu sao).
   - `type="radio"`: Nút chọn 1 trong nhiều (các nút trong cùng nhóm **phải có cùng thuộc tính `name`**).
   - `type="checkbox"`: Hộp kiểm cho phép chọn nhiều lựa chọn độc lập.
   - `type="file"`: Hộp thoại tải file từ máy cục bộ.
   - `type="hidden"`: Lưu trữ dữ liệu ngầm mà người dùng không thấy nhưng vẫn gửi về server khi submit.
   - `type="submit"`: Nút gửi dữ liệu của form.
   - `type="reset"`: Nút khôi phục form về trạng thái ban đầu.
   - `type="button"`: Nút nhấn thông thường, thường dùng để gán sự kiện JavaScript (`onclick`).

2. **Văn bản nhiều dòng (`<textarea>`)**:
   ```html
   <textarea name="comment" rows="4" cols="50">Nội dung mặc định</textarea>
   ```

3. **Gán nhãn (`<label>`)**:
   - Giúp cải thiện trải nghiệm người dùng: khi bấm vào chữ label, con trỏ sẽ tự động focus vào ô input tương ứng.
   ```html
   <label for="txtUser">Tên đăng nhập:</label>
   <input type="text" id="txtUser" name="username">
   ```

4. **Hộp chọn thả xuống (`<select>` & `<option>`)**:
   ```html
   <select name="city" size="1">
     <optgroup label="Miền Nam">
       <option value="hcm" selected>TP. Hồ Chí Minh</option>
       <option value="bd">Bình Dương</option>
     </optgroup>
     <optgroup label="Miền Bắc">
       <option value="hn">Hà Nội</option>
     </optgroup>
   </select>
   ```

5. **Gom nhóm trường nhập liệu (`<fieldset>` & `<legend>`)**:
   ```html
   <fieldset>
     <legend>Thông tin cá nhân</legend>
     <!-- các input đặt ở đây -->
   </fieldset>
   ```

---

## 7. BÀI TẬP ÔN LUYỆN MẪU

### Bài 1: Tạo Form đăng ký thành viên chuẩn ngữ nghĩa
```html
<form action="register.php" method="POST" enctype="multipart/form-data">
  <fieldset>
    <legend>ĐĂNG KÝ THÀNH VIÊN</legend>
    <p>
      <label for="hoten">Họ và tên:</label><br>
      <input type="text" id="hoten" name="fullname" size="30" maxlength="50" required>
    </p>
    <p>
      <label for="matkhau">Mật khẩu:</label><br>
      <input type="password" id="matkhau" name="password" required>
    </p>
    <p>
      Giới tính: 
      <label><input type="radio" name="gender" value="male" checked> Nam</label>
      <label><input type="radio" name="gender" value="female"> Nữ</label>
    </p>
    <p>
      Sở thích:
      <label><input type="checkbox" name="hobbies" value="reading"> Đọc sách</label>
      <label><input type="checkbox" name="hobbies" value="coding"> Lập trình</label>
    </p>
    <p>
      <label for="avatar">Ảnh đại diện:</label><br>
      <input type="file" id="avatar" name="avatar">
    </p>
    <p>
      <input type="submit" value="Đăng ký">
      <input type="reset" value="Nhập lại">
    </p>
  </fieldset>
</form>
```
