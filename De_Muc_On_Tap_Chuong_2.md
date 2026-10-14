# ĐỀ CƯƠNG ÔN TẬP TOÀN DIỆN: CHƯƠNG 2 - CÔNG NGHỆ WEB PHÍA CLIENT
*(Tổng hợp chi tiết từ 5 tài liệu bài giảng môn Phát triển ứng dụng Web - Khoa HTTT)*

---

## 📚 TỔNG QUAN CÁC TÀI LIỆU ÔN TẬP
Folder `personal/` bao gồm 5 bài giảng PDF thuộc **Chương 2**:
1. **Chương 2 Web-HTML-SV.pdf** *(77 trang)*: Ngôn ngữ xây dựng web tĩnh HTML, cấu trúc trang, thẻ định dạng văn bản, danh sách, liên kết, bảng biểu, Form & controls cơ bản.
2. **Chương 2 Web-HTML5 - SV.pdf** *(102 trang)*: HTML5 và các chuẩn hiện đại, thẻ ngữ nghĩa (Semantic Elements), Form HTML5 (Input types mới, validation attributes), Đồ họa (Canvas 2D, SVG), Multimedia (Audio, Video), Web Storage (localStorage, sessionStorage).
3. **Chương 2 CSS - SV.pdf** *(58 trang)*: Giới thiệu CSS, cú pháp, 3 cách chèn CSS, độ ưu tiên (Cascade/Specificity), Bộ chọn (Selectors, Pseudo-classes, Pseudo-elements), CSS Box Model, Background, Border, Margin, Padding, Positioning, Font & Text.
4. **Chương 2 CSS3-SV.pdf** *(73 trang)*: Các module CSS3 nâng cao: Bộ chọn mở rộng (Attribute selectors), Màu sắc (RGBA, HSLA), Bo góc & Đổ bóng (border-radius, box-shadow), Background nâng cao & Gradients (Linear/Radial), Text effects, Phép biến đổi (2D/3D Transform), Hiệu ứng chuyển động (Transitions, Keyframe Animations), Bố cục nhiều cột (Multi-column), User Interface (box-sizing, resize).
5. **Chương 2 Bootstrap -SV.pdf** *(128 trang)*: Framework Bootstrap (so sánh Bootstrap 4 & 5), Layout & Containers, Hệ thống lưới 12 cột (Grid System), Typography & Colors, Bảng, Ảnh, Nút nhấn (Buttons, Button Group), Badges, Spinners, Pagination, List Groups, Cards, Dropdowns, Collapse & Accordion, Navs & Navbar, Forms trong Bootstrap, Carousel, Modals, Tooltips & Popovers.

---

## PHẦN 1: HTML CƠ BẢN (Chương 2 Web-HTML-SV.pdf)

### 1.1. Tổng quan về HTML
- **Định nghĩa**: HTML (*HyperText Markup Language*) – Ngôn ngữ đánh dấu siêu văn bản, mô tả cấu trúc và bố cục nội dung trang web.
  - *HyperText*: Văn bản chứa siêu liên kết trỏ đến văn bản/tài nguyên khác.
  - *Markup*: Dùng hệ thống thẻ (tags) để định dạng và tổ chức văn bản.
  - *Lưu ý*: HTML không phải là ngôn ngữ lập trình.
- **Lịch sử & Tiêu chuẩn**: Tim Berners-Lee phát minh; W3C (*World Wide Web Consortium*) chuẩn hóa từ năm 1994.
- **Đặc điểm**:
  - Thẻ không phân biệt hoa/thường (chuẩn khuyến nghị viết thường).
  - Trình duyệt bỏ qua nhiều dấu cách liên tiếp và ký tự xuống dòng (chỉ hiển thị 1 khoảng trắng).
  - Trình duyệt không báo lỗi cú pháp mà cố gắng dựng hình (render) tốt nhất có thể $\rightarrow$ dễ phát sinh lỗi hiển thị sai lệch nếu sai cú pháp.
- **Cấu trúc tài liệu HTML cơ bản**:
  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Tiêu đề trang</title>
    </head>
    <body>
      <!-- Nội dung hiển thị tại đây -->
    </body>
  </html>
  ```
- **Các thành phần trong thẻ `<head>`**:
  - `<!DOCTYPE>`: Khai báo phiên bản HTML để trình duyệt chọn chế độ hiển thị chuẩn.
  - `<meta>`: Khai báo bộ mã ký tự (`charset="UTF-8"`), từ khóa, mô tả website, viewport... (thẻ rỗng / self-closing).
  - `<title>`: Tiêu đề hiển thị trên thanh tab trình duyệt và kết quả tìm kiếm.

### 1.2. Thẻ định dạng văn bản & Ký tự đặc biệt
- **Tiêu đề & Đoạn văn**:
  - Thẻ tiêu đề: `<h1>` đến `<h6>` (kích thước chữ và mức độ ưu tiên giảm dần).
  - Đoạn văn: `<p>` (tự động có lề trên/dưới), ngắt dòng: `<br />`, đường kẻ ngang: `<hr />`.
  - Thẻ trích dẫn: `<blockquote>` (thụt lề khối văn bản), `<pre>` (giữ nguyên định dạng khoảng trắng và xuống dòng).
  - Địa chỉ liên hệ: `<address>` (thường đặt ở footer, chữ nghiêng).
- **Định dạng ký tự (Text Formatting)**:
  - In đậm: `<b>` (chỉ trực quan), `<strong>` (nhấn mạnh ý nghĩa quan trọng - semantic).
  - In nghiêng: `<i>` (trực quan), `<em>` (nhấn mạnh - semantic).
  - Gạch dưới: `<u>` | Gạch ngang: `<s>`, `<strike>`, `<del>` | Thêm vào: `<ins>`.
  - Chỉ số trên: `<sup>` (vd: $x^2$) | Chỉ số dưới: `<sub>` (vd: $H_2O$).
  - Thẻ phông chữ cổ điển: `<font face="..." size="1-7" color="...">` *(chú ý: lỗi thời, khuyến khích thay bằng CSS)*.
- **Ký tự đặc biệt (HTML Entities)**:
  - Khoảng trắng cứng: `&nbsp;`
  - Dấu nhỏ hơn (`<`): `&lt;` | Dấu lớn hơn (`>`): `&gt;`
  - Dấu và (`&`): `&amp;` | Dấu nháy kép (`"`): `&quot;` | Dấu nháy đơn (`'`): `&apos;`
  - Ký hiệu bản quyền: `&copy;` | Đăng ký nhãn hiệu: `&reg;`

### 1.3. Hình ảnh (Image)
- **Cú pháp**: `<img src="đường_dẫn" alt="mô_tả_khi_lỗi" width="..." height="..." align="..." />`
- **Các thuộc tính quan trọng**:
  - `src`: Đường dẫn tương đối hoặc tuyệt đối tới file ảnh.
  - `alt`: Văn bản thay thế khi ảnh không tải được, hỗ trợ SEO và người khiếm thị đọc màn hình.
  - `align`: Canh lề so với văn bản xung quanh (`left`, `right`, `top`, `middle`, `bottom`).
  - Thẻ `<img>` là thẻ tự đóng, là phần tử nội dòng (*inline element*).

### 1.4. Danh sách (Lists)
- **Danh sách không thứ tự (Unordered List)**:
  - Cặp thẻ: `<ul>` chứa các `<li>`.
  - Thuộc tính `type`: `disc` (chấm tròn đen - mặc định), `circle` (chấm tròn rỗng), `square` (hình vuông).
- **Danh sách có thứ tự (Ordered List)**:
  - Cặp thẻ: `<ol>` chứa các `<li>`.
  - Thuộc tính `type`: `1` (số 1, 2, 3), `a` / `A` (chữ cái thường/hoa), `i` / `I` (số La Mã thường/hoa).
  - Thuộc tính `start`: Số bắt đầu đếm (ví dụ `<ol type="1" start="5">`).
- **Danh sách định nghĩa (Definition List)**:
  - Cấu trúc: `<dl>` (danh sách), bên trong gồm `<dt>` (thuật ngữ/tên mục) và `<dd>` (nội dung định nghĩa, tự động thụt lề).

### 1.5. Siêu liên kết (Hyperlinks)
- **Thẻ `<a>` (Anchor)**:
  - Thuộc tính `href`: Địa chỉ URL đích, liên kết file cục bộ, hoặc gửi mail `href="mailto:abc@xyz.com"`.
  - Thuộc tính `target`:
    - `_blank`: Mở trong tab/cửa sổ mới.
    - `_self`: Mở ngay tại khung/tab hiện tại (mặc định).
    - `_parent`: Mở tại khung cha.
    - `_top`: Mở toàn bộ cửa sổ gốc (bỏ mọi khung iframe).
  - Liên kết neo nội bộ trang (*Bookmark/Anchor*):
    - Đặt điểm neo: `<h2 id="section1">Mục 1</h2>` (hoặc thẻ cổ điển `<a name="section1">`).
    - Gọi liên kết: `<a href="#section1">Nhảy đến mục 1</a>`.
    - Quay về đầu trang: `<a href="#">Lên đầu trang</a>`.

### 1.6. Bảng biểu (Tables)
- **Cấu trúc cơ bản**:
  - `<table>`: Khung bảng.
  - `<tr>` (*Table Row*): Dòng trong bảng.
  - `<th>` (*Table Header*): Ô tiêu đề (chữ tự động in đậm, canh giữa).
  - `<td>` (*Table Data*): Ô dữ liệu bình thường.
- **Thuộc tính bảng cần nhớ**:
  - `border`: Độ dày đường viền.
  - `cellspacing`: Khoảng cách giữa các ô.
  - `cellpadding`: Khoảng cách từ nội dung ô đến đường viền ô.
  - `width`, `height`, `bgcolor`, `align` (left/center/right).
- **Gộp ô**:
  - `colspan="n"`: Gộp $n$ cột liên tiếp trên cùng một dòng.
  - `rowspan="n"`: Gộp $n$ dòng liên tiếp trên cùng một cột.
  - *Quy tắc*: Khi gộp ô, phải xóa bớt các thẻ `<td>` tương ứng ở các vị trí bị gộp để bảng không bị vỡ bố cục.

### 1.7. Biểu mẫu & Các điều khiển Form cổ điển (Form & Controls)
- **Thẻ `<form>`**:
  - `action`: Địa chỉ URL của trang xử lý dữ liệu ở server.
  - `method`: Phương thức gửi dữ liệu:
    - `GET`: Đính kèm dữ liệu lên URL (Query String `?key=value`), giới hạn độ dài, không an toàn cho mật khẩu, có thể bookmark và cache.
    - `POST`: Đóng gói dữ liệu trong phần thân HTTP Request (body), không giới hạn độ dài, an toàn hơn, dùng cho dữ liệu nhạy cảm / upload file.
  - `enctype`: Kiểu mã hóa dữ liệu:
    - `application/x-www-form-urlencoded` (mặc định).
    - `multipart/form-data`: Bắt buộc dùng khi có form upload file (`<input type="file">`).
- **Các thành phần nhập liệu (`<input>`)**:
  - `type="text"`: Nhập văn bản 1 dòng (`name`, `value`, `size`, `maxlength`).
  - `type="password"`: Nhập mật khẩu (che ký tự bằng dấu chấm/sao).
  - `type="checkbox"`: Hộp kiểm chọn nhiều lựa chọn độc lập (`checked`).
  - `type="radio"`: Nút chọn 1 trong nhiều (các nút cùng nhóm bắt buộc phải có chung thuộc tính `name`).
  - `type="file"`: Hộp chọn file tải lên máy chủ.
  - `type="submit"`: Nút gửi form (nút viền đậm mặc định).
  - `type="reset"`: Nút xóa sạch dữ liệu form về mặc định.
  - `type="button"`: Nút đa năng, thường gán sự kiện JavaScript (`onclick="..."`).
  - `type="hidden"`: Trường dữ liệu ẩn người dùng không thấy nhưng vẫn gửi lên server.
- **Các thẻ điều khiển khác**:
  - `<textarea cols="..." rows="..." wrap="off|physical|virtual">`: Nhập văn bản nhiều dòng.
  - `<label for="id_control">`: Gán nhãn cho ô nhập liệu (khi click vào label sẽ tự động focus vào input có `id` tương ứng).
  - `<select name="...">` & `<option value="...">`: Danh sách thả xuống (*Combobox / Dropdown*).
    - Thuộc tính `multiple`: Cho phép chọn nhiều mục (giữ Ctrl).
    - Thuộc tính `size`: Số mục hiển thị trực tiếp.
    - Thuộc tính `selected` trong `<option>`: Chọn mặc định.
    - `<optgroup label="...">`: Phân nhóm các option.
  - `<fieldset>` & `<legend>`: Gom nhóm các trường nhập liệu trong một khung viền có tiêu đề.

---

## PHẦN 2: HTML5 NÂNG CAO (Chương 2 Web-HTML5 - SV.pdf)

### 2.1. Lịch sử & Đặc điểm HTML5
- **W3C và WHATWG**: WHATWG ra đời năm 2004 do bất đồng về hướng phát triển XML/XHTML của W3C. Năm 2007 W3C phát triển chuẩn HTML5 dựa trên dự thảo của WHATWG. Năm 2014 chuẩn HTML5 chính thức được ban hành.
- **Khai báo DOCTYPE tối giản**:
  ```html
  <!DOCTYPE html>
  ```
  *(So với cú pháp phức tạp, cồng kềnh DTD của HTML4/XHTML).*

### 2.2. Nhóm mô hình nội dung (Content Models) trong HTML5
1. **Metadata**: Dữ liệu mô tả (`<link>`, `<meta>`, `<noscript>`, `<script>`, `<style>`, `<title>`).
2. **Flow**: Mọi phần tử có thể nằm trong body (`<a>`, `<p>`, `<div>`, `<span>`, ...).
3. **Sectioning**: Xác định phạm vi tiêu đề và nội dung độc lập (`<article>`, `<aside>`, `<nav>`, `<section>`).
4. **Heading**: Các tiêu đề (`<h1>` - `<h6>`, `<hgroup>`).
5. **Phrasing**: Các phần tử mức văn bản nội dòng (`<span>`, `<strong>`, `<em>`, `<img>`, `<input>`, ...).
6. **Embedded**: Nhúng tài nguyên ngoài (`<audio>`, `<video>`, `<canvas>`, `<iframe>`, `<img>`, `<svg>`).
7. **Interactive**: Tương tác người dùng (`<a>`, `<button>`, `<details>`, `<select>`, `<textarea>`, ...).

### 2.3. Các thẻ cấu trúc ngữ nghĩa mới (Semantic Elements)
- `<header>`: Phần đầu trang hoặc đầu của một bài viết/khối (chứa logo, tiêu đề, menu sơ cấp).
- `<hgroup>`: Nhóm các thẻ tiêu đề (ví dụ `<h1>` tiêu đề chính và `<h2>` tiêu đề phụ).
- `<nav>`: Khu vực điều hướng, chứa các liên kết chính của trang.
- `<section>`: Một phần/phân đoạn độc lập mang một chủ đề nội dung cụ thể trong tài liệu.
- `<article>`: Một nội dung độc lập, hoàn chỉnh, có thể tái sử dụng hoặc phân phối độc lập (ví dụ bài báo, bài blog, bình luận).
- `<aside>`: Nội dung phụ, liên quan gián tiếp đến nội dung chính (sidebar, mục quảng cáo, tin liên quan).
- `<footer>`: Phần chân trang hoặc chân của bài viết (chứa bản quyền, thông tin liên hệ, liên kết phụ).
- `<figure>` & `<figcaption>`: Chứa hình ảnh minh họa kèm chú thích độc lập.

### 2.4. Các kiểu Input mới & Thuộc tính Form trong HTML5
- **Các `type` mới của `<input>`**:
  - `color`: Hộp thoại chọn bảng màu mã HEX.
  - `date`, `time`, `datetime-local`, `month`, `week`: Bộ chọn ngày giờ chuyên dụng.
  - `email`: Tự động kiểm tra đúng định dạng email (phải có ký tự `@` và domain).
  - `url`: Tự động kiểm tra đúng cấu trúc URL (bắt đầu bằng `http://` hoặc `https://`).
  - `number`: Ô nhập số (kết hợp `min`, `max`, `step`).
  - `range`: Thanh trượt chọn giá trị số trong khoảng `min` - `max`.
  - `search`: Hộp thoại tìm kiếm (có nút x để xóa nhanh text).
  - `tel`: Nhập số điện thoại.
- **Các thuộc tính mới của thẻ `<form>`**:
  - `autocomplete="on|off"`: Cho phép / cấm trình duyệt tự động điền gợi ý dựa trên lịch sử.
  - `novalidate`: Bỏ qua cơ chế kiểm tra tính hợp lệ dữ liệu (validation) của HTML5 khi gửi form.
- **Các thuộc tính mới của thẻ `<input>`**:
  - `placeholder`: Dòng chữ mờ gợi ý bên trong ô nhập, biến mất khi người dùng gõ phím.
  - `required`: Bắt buộc người dùng phải điền dữ liệu trước khi submit.
  - `autofocus`: Tự động trỏ con trỏ chuột vào ô này khi vừa tải xong trang.
  - `pattern="regex"`: Ràng buộc định dạng dữ liệu bằng biểu thức chính quy (Regular Expression).
  - `min`, `max`, `step`: Giới hạn giá trị nhỏ nhất, lớn nhất và bước nhảy của số/ngày.
  - `multiple`: Cho phép chọn/nhập nhiều giá trị (áp dụng cho `file`, `email`).
  - `form`: Cho phép đặt input nằm **ngoài** thẻ `<form>` nhưng vẫn thuộc về form đó thông qua `form="id_cua_form"`.
  - Các thuộc tính ghi đè thuộc tính của Form tại nút submit: `formaction`, `formmethod`, `formenctype`, `formnovalidate`, `formtarget`.
- **Các thẻ Form mới khác**:
  - `<datalist id="...">` kết hợp `<input list="id">`: Tạo ô nhập liệu có danh sách gợi ý sẵn nhưng vẫn cho phép gõ giá trị tùy ý.
  - `<output>`: Hiển thị kết quả tính toán của biểu thức / script.
  - `<keygen>`: Tạo cặp khóa mã hóa công khai và bí mật (*hiện nay ít dùng*).

### 2.5. Đồ họa Web: Canvas 2D và SVG
| Tiêu chí | HTML5 Canvas | SVG (Scalable Vector Graphics) |
| :--- | :--- | :--- |
| **Bản chất** | Vẽ dạng Raster / Bitmap (điểm ảnh pixel) | Dạng Vector (dựa trên cấu trúc XML toán học) |
| **Cơ chế dựng** | Dùng JavaScript để vẽ qua API 2D | Viết trực tiếp bằng thẻ XML hoặc chèn file `.svg` |
| **Độ nét khi zoom**| Bị mờ/vỡ hạt khi phóng to hoặc màn hình phân giải cao | Co giãn vô hạn, hình ảnh sắc nét ở mọi độ phân giải |
| **Tương tác sự kiện**| Không hỗ trợ bắt sự kiện (event handler) cho từng hình khối đã vẽ | Mỗi hình vẽ là một node DOM riêng, hỗ trợ đầy đủ sự kiện CSS/JS (`hover`, `click`) |
| **Ứng dụng tối ưu** | Đồ họa chuyển động nhanh, game 2D, render pixel phức tạp | Logo, biểu tượng, sơ đồ, bản đồ, hình ảnh phẳng cần sắc nét |

- **Các lệnh Canvas 2D quan trọng**:
  - Khởi tạo context: `var ctx = canvas.getContext('2d');`
  - Vẽ đường thẳng: `ctx.beginPath()`, `ctx.moveTo(x, y)`, `ctx.lineTo(x, y)`, `ctx.stroke()`
  - Vẽ hình chữ nhật: `ctx.fillRect(x, y, w, h)`, `ctx.strokeRect(x, y, w, h)`, `ctx.clearRect(x, y, w, h)`
  - Vẽ đường tròn / cung tròn: `ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise)`
  - Gradient: `ctx.createLinearGradient()`, `ctx.createRadialGradient()`, phương thức `addColorStop()`, gán vào `ctx.fillStyle`.
- **Các thẻ SVG quan trọng**:
  - Hình cơ bản: `<line>`, `<rect>`, `<circle>`, `<ellipse>`, `<polygon>`, `<polyline>`, `<path>`.
  - Bộ lọc & hiệu ứng: `<filter>`, `<feOffset>`, `<feGaussianBlur>`.

### 2.6. Đa phương tiện (Multimedia: Video & Audio)
- **Thẻ `<video>` & `<audio>`**:
  - Nhúng video/audio trực tiếp không cần plugin ngoài (như Adobe Flash).
  - Hỗ trợ các định dạng: MP4 (H.264), WebM, Ogg cho Video; MP3, WAV, Ogg cho Audio.
  - Cấu trúc chuẩn nhiều nguồn:
    ```html
    <video width="640" height="360" controls poster="thumb.jpg">
      <source src="movie.mp4" type="video/mp4">
      <source src="movie.ogg" type="video/ogg">
      Trình duyệt của bạn không hỗ trợ thẻ video.
    </video>
    ```
- **Các thuộc tính thông dụng**:
  - `controls`: Hiển thị thanh điều khiển phát/dừng, âm lượng, toàn màn hình.
  - `autoplay`: Tự động phát khi tải trang (trình duyệt hiện đại bắt buộc phải kèm `muted`).
  - `loop`: Tự động phát lại khi kết thúc.
  - `muted`: Tắt tiếng mặc định.
  - `poster`: Ảnh hiển thị trước khi video được phát.
- **Sự kiện Media (Media Events)**: `play`, `pause`, `ended`, `timeupdate`, `volumechange`, `canplay`, `error`.

### 2.7. Cơ chế lưu trữ Web (Web Storage)
- **So sánh Web Storage với Cookie**:
  - Dung lượng lớn: Tối thiểu 5MB mỗi domain (Cookie chỉ tối đa 4KB).
  - Hiệu năng tốt: Dữ liệu không bị tự động gửi lên server qua mỗi HTTP Request như Cookie.
  - Bảo mật: Lưu cục bộ an toàn, không truyền tải qua mạng.
- **Phân biệt `localStorage` và `sessionStorage`**:
  - `localStorage`: Lưu trữ dữ liệu vĩnh viễn, không có hạn sử dụng, tồn tại ngay cả khi đóng trình duyệt hoặc khởi động lại máy tính.
  - `sessionStorage`: Chỉ tồn tại trong một phiên làm việc (Session) của tab trình duyệt. Khi đóng tab hoặc cửa sổ, toàn bộ dữ liệu sẽ tự động bị xóa.
- **Các phương thức của Web Storage API**:
  - Lưu dữ liệu: `localStorage.setItem('key', 'value');` (hoặc `localStorage.key = 'value';`)
  - Đọc dữ liệu: `localStorage.getItem('key');`
  - Xóa 1 khóa: `localStorage.removeItem('key');`
  - Xóa sạch: `localStorage.clear();`
  - Thuộc tính `.length` và lấy tên khóa theo chỉ số `localStorage.key(index);`
  - *Lưu ý quan trọng*: Web Storage chỉ lưu chuỗi (String). Muốn lưu Object/Array, phải dùng `JSON.stringify(obj)` khi lưu và `JSON.parse(str)` khi đọc.

---

## PHẦN 3: CSS CƠ BẢN (Chương 2 CSS - SV.pdf)

### 3.1. Giới thiệu & Cú pháp CSS
- **Định nghĩa**: CSS (*Cascading Style Sheets*) – Ngôn ngữ định kiểu tầng, dùng để mô tả cách trình bày và hiển thị các phần tử HTML trên trang.
- **Lợi ích**: Tách biệt rõ ràng nội dung (HTML) và cách trình bày (CSS), dễ bảo trì, tăng tính tái sử dụng, tối ưu tốc độ tải trang.
- **Cú pháp cơ bản**:
  ```css
  Selector {
    Property: Value;
  }
  ```
- **Ghi chú**: Sử dụng cú pháp `/* Nội dung ghi chú */`.

### 3.2. 3 Cách chèn CSS & Quy tắc độ ưu tiên (Specificity)
1. **Inline Style (Nội dòng)**: Viết trực tiếp trong thuộc tính `style` của thẻ HTML (vd: `<h1 style="color: red;">`). Khó tái sử dụng, làm code rối.
2. **Internal / Embedded Style (Nội bộ)**: Viết trong cặp thẻ `<style>` đặt bên trong thẻ `<head>` của trang.
3. **External Style Sheet (Tập tin rời)**: Viết trong file riêng có phần mở rộng `.css` và nhúng vào trang bằng thẻ:
   ```html
   <link rel="stylesheet" type="text/css" href="style.css">
   ```
- **Quy tắc độ ưu tiên (Cascade Order / Specificity)**:
  $$\text{Inline Style (1000)} > \text{ID Selector (100)} > \text{Class / Pseudo-class / Attribute (10)} > \text{Tag / Pseudo-element (1)}$$
  - Khi có xung đột: Quy tắc có độ ưu tiên cao hơn sẽ thắng. Nếu cùng độ ưu tiên, quy tắc viết sau cùng sẽ ghi đè quy tắc trước.
  - Từ khóa `!important`: Ghi đè mọi quy tắc định kiểu thông thường bất kể độ ưu tiên hay vị trí đặt file.

### 3.3. Bộ chọn cơ bản (Selectors)
- **Tag / Type selector**: Chọn theo tên thẻ (vd: `p { ... }`, `h1 { ... }`).
- **Class selector**: Chọn theo thuộc tính class, bắt đầu bằng dấu chấm (vd: `.menu { ... }`). Một class có thể dùng cho nhiều phần tử, một phần tử có thể có nhiều class cách nhau bởi khoảng trắng.
- **ID selector**: Chọn theo thuộc tính id, bắt đầu bằng dấu thăng (vd: `#header { ... }`). ID là duy nhất trên mỗi trang.
- **Universal selector**: Bộ chọn toàn cục dấu sao `*` (chọn tất cả các phần tử).
- **Grouping selector**: Gom nhóm các selector dùng chung kiểu dáng bằng dấu phẩy (vd: `h1, h2, p { color: blue; }`).
- **Kết hợp**: `element.class` (vd: `p.highlight` chỉ chọn thẻ `p` có class `highlight`).

### 3.4. Bộ chọn giả: Pseudo-classes & Pseudo-elements
- **Pseudo-classes (Lớp giả - bắt đầu bằng dấu hai chấm `:`)**: Chọn phần tử dựa trên **trạng thái đặc biệt**:
  - Trạng thái liên kết của thẻ `<a>` (Quy tắc nhớ **LVHA**):
    - `:link`: Liên kết chưa được truy cập.
    - `:visited`: Liên kết đã được truy cập.
    - `:hover`: Khi con trỏ chuột rê lên phần tử.
    - `:active`: Khi phần tử đang được nhấn chuột.
  - Vị trí cấu trúc:
    - `:first-child`: Phần tử con đầu tiên của cha.
    - `:last-child`: Phần tử con cuối cùng.
    - `:focus`: Phần tử đang được nhận tiêu điểm nhập liệu.
- **Pseudo-elements (Phần tử giả - bắt đầu bằng hai dấu hai chấm `::`)**: Định kiểu cho **một phần cụ thể** của phần tử:
  - `::first-line`: Dòng đầu tiên của đoạn văn bản.
  - `::first-letter`: Ký tự đầu tiên của đoạn văn.
  - `::before`: Chèn nội dung ảo vào phía trước phần tử (kết hợp thuộc tính `content: "...";`).
  - `::after`: Chèn nội dung ảo vào phía sau phần tử (kết hợp thuộc tính `content: "...";`).
  - `::selection`: Đoạn văn bản đang được người dùng quét bôi đen chuột.

### 3.5. Mô hình hộp (CSS Box Model)
Mọi phần tử HTML đều được trình duyệt biểu diễn dưới dạng một khối hộp hình chữ nhật, gồm 4 lớp từ trong ra ngoài:
1. **Content**: Nội dung văn bản, hình ảnh của phần tử. Kích thước được xác định bởi `width` và `height`.
2. **Padding**: Khoảng đệm từ nội dung đến đường viền border (trong suốt, lấy màu của background).
3. **Border**: Đường viền bao quanh phần đệm và nội dung.
4. **Margin**: Khoảng cách lề từ đường viền ra các phần tử lân cận bên ngoài (trong suốt).

- **Thuộc tính chi tiết**:
  - **Border**: `border-width`, `border-style` (`solid`, `dashed`, `dotted`, `double`, `none`), `border-color`.
    - Shorthand: `border: 1px solid #ccc;`
  - **Margin & Padding**:
    - 4 giá trị: `margin: 10px 20px 15px 5px;` (Top - Right - Bottom - Left: theo chiều kim đồng hồ).
    - 2 giá trị: `margin: 10px 20px;` (Top/Bottom - Left/Right).
    - Căn giữa khối hộp nằm ngang: `margin: 0 auto;` (yêu cầu phần tử block phải có chiều rộng `width` cố định).
  - **Background**:
    - `background-color`: Màu nền.
    - `background-image: url('...');`: Ảnh nền.
    - `background-repeat`: `repeat` (mặc định lặp cả 2 chiều), `repeat-x`, `repeat-y`, `no-repeat`.
    - `background-position`: Vị trí (`top left`, `center`, `50% 50%`, ...).
    - `background-attachment`: `scroll` (cuộn theo trang), `fixed` (cố định nền khi trang cuộn).

### 3.6. Định vị phần tử (Positioning)
- `static`: Vị trí tĩnh theo luồng văn bản tự nhiên (mặc định), không nhận các thuộc tính `top`, `bottom`, `left`, `right`, `z-index`.
- `relative`: Vị trí tương đối so với vị trí ban đầu của chính nó; khoảng trống ban đầu vẫn được bảo lưu trong luồng trang.
- `absolute`: Vị trí tuyệt đối theo phần tử cha gần nhất có `position` khác `static` (nếu không có cha nào, sẽ neo theo khung nhìn `<html>`). Bị rút ra khỏi luồng văn bản bình thường.
- `fixed`: Vị trí cố định theo khung nhìn màn hình trình duyệt (viewport). Không di chuyển khi người dùng cuộn trang.
- `sticky`: Lai giữa `relative` và `fixed` (cố định khi cuộn đến một ngưỡng xác định).
- `z-index`: Thứ tự xếp chồng trước/sau của các phần tử có định vị (`auto` hoặc số nguyên, số càng lớn càng nằm đè lên trên).

### 3.7. Định kiểu Font và Văn bản (Font & Text)
- **Font**:
  - `font-family`: Tên phông chữ (cung cấp danh sách fallback, kết thúc bằng họ generic: `serif`, `sans-serif`, `monospace`).
  - `font-size`: Kích thước chữ (px, pt, %, em, rem).
  - `font-weight`: Độ đậm (`normal`, `bold`, `bolder`, `lighter`, `100` - `900`).
  - `font-style`: Kiểu chữ (`normal`, `italic`, `oblique`).
- **Text**:
  - `color`: Màu chữ.
  - `text-align`: Canh lề (`left`, `right`, `center`, `justify`).
  - `text-decoration`: Đường gạch (`none`, `underline`, `overline`, `line-through`).
  - `text-transform`: Chuyển đổi hoa thường (`uppercase`, `lowercase`, `capitalize`).
  - `line-height`: Chiều cao dòng (khoảng cách giữa các dòng).
  - `text-indent`: Thụt lề dòng đầu tiên của đoạn văn.

---

## PHẦN 4: CSS3 NÂNG CAO (Chương 2 CSS3-SV.pdf)

### 4.1. Bộ chọn nâng cao (Attribute Selectors & Combinators)
- **Bộ chọn thuộc tính (Attribute Selectors)**:
  - `[attr]`: Có thuộc tính `attr`.
  - `[attr=val]`: Giá trị thuộc tính bằng chính xác `val`.
  - `[attr^=val]`: Giá trị bắt đầu bằng chuỗi `val` (ví dụ `a[href^="https"]`).
  - `[attr$=val]`: Giá trị kết thúc bằng chuỗi `val` (ví dụ `a[href$=".pdf"]`).
  - `[attr*=val]`: Giá trị chứa chuỗi con `val`.
  - `[attr~=val]`: Chứa từ nguyên vẹn `val` trong danh sách cách nhau bởi dấu cách.
- **Bộ kết hợp (Combinators)**:
  - Phân cấp hậu duệ: `div p` (tất cả thẻ `p` nằm bên trong `div`).
  - Con trực tiếp: `div > p` (chỉ những thẻ `p` là con cấp 1 của `div`).
  - Liền kề: `div + p` (thẻ `p` nằm ngay sát phía sau `div`).
  - Anh em tổng quát: `div ~ p` (tất cả thẻ `p` cùng cấp nằm phía sau `div`).

### 4.2. Màu sắc, Bo góc, Đổ bóng & Gradient
- **Hệ màu mới**:
  - `rgba(r, g, b, alpha)`: Màu RGB kèm kênh độ trong suốt Alpha (giá trị từ 0.0 đến 1.0).
  - `hsla(hue, saturation, lightness, alpha)`: Màu theo độ Hue, độ bão hòa, độ sáng và alpha.
- **Bo góc (`border-radius`)**:
  - `border-radius: 10px;` (bo đều 4 góc).
  - `border-radius: 50%;` (tạo hình tròn hoặc bầu dục).
  - Bo từng góc: `border-top-left-radius`, `border-top-right-radius`...
- **Đổ bóng khối (`box-shadow`)**:
  - Cú pháp: `box-shadow: h-shadow v-shadow blur spread color inset;`
  - Ví dụ: `box-shadow: 5px 5px 10px #888888;`
- **Đường viền bằng ảnh (`border-image`)**:
  - Sử dụng hình ảnh làm đường viền (`border-image-source`, `slice`, `width`, `repeat`).
- **Gradients (Màu chuyển sắc)**:
  - Chuyển sắc tuyến tính (*Linear Gradient*):
    `background-image: linear-gradient(direction/angle, color1, color2, ...);`
    - Hướng: `to right`, `to bottom`, `to bottom right`, `45deg`.
  - Chuyển sắc hình cầu / tròn (*Radial Gradient*):
    `background-image: radial-gradient(shape size at position, color1, color2, ...);`

### 4.3. Quản lý Background nâng cao & Hiệu ứng văn bản
- **Thuộc tính Background mở rộng**:
  - `background-size`: `auto`, `cover` (phủ kín vùng chứa, có thể bị xén hình), `contain` (vừa vặn toàn bộ ảnh, không bị méo/xén), kích thước cụ thể `100% 100%`.
  - `background-origin`: Vị trí gốc bắt đầu vẽ ảnh nền (`border-box`, `padding-box`, `content-box`).
  - `background-clip`: Vùng giới hạn hiển thị màu nền (`border-box`, `padding-box`, `content-box`).
  - Đa ảnh nền (*Multiple backgrounds*): Viết nhiều ảnh cách nhau bằng dấu phẩy.
- **Hiệu ứng chữ (Text Effects)**:
  - Đổ bóng chữ: `text-shadow: h-shadow v-shadow blur color;`
  - Xử lý tràn chữ: `text-overflow: clip | ellipsis;`
    *(Kỹ thuật tạo dấu 3 chấm `...` khi text quá dài: `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`)*.
  - Ngắt từ: `word-wrap: break-word;` (bẻ từ dài khi tràn khung), `word-break: break-all;`.

### 4.4. Phép biến đổi hình học (2D & 3D Transformations)
Thuộc tính `transform`:
- `translate(x, y)`, `translateX(x)`, `translateY(y)`: Dịch chuyển phần tử theo trục X, Y.
- `rotate(angle)`: Xoay phần tử theo góc (đơn vị `deg`, vd: `rotate(45deg)`).
- `scale(x, y)`, `scaleX()`, `scaleY()`: Co giãn tỉ lệ kích thước (vd: `scale(1.5)` phóng to 150%).
- `skew(x-angle, y-angle)`, `skewX()`, `skewY()`: Làm nghiêng, xiên phần tử.
- `matrix(a, b, c, d, e, f)`: Ma trận tổng hợp 6 tham số của các phép biến đổi 2D.
- 3D Transforms: `rotateX()`, `rotateY()`, `rotateZ()`, `translate3d()`, `perspective`.

### 4.5. Chuyển đổi mượt mà (Transitions)
- **Định nghĩa**: Cho phép thay đổi giá trị thuộc tính CSS một cách mượt mà qua một khoảng thời gian xác định (thường kích hoạt khi `:hover`).
- **4 Thuộc tính cơ bản**:
  1. `transition-property`: Tên thuộc tính muốn áp dụng (vd: `width`, `background-color`, `all`).
  2. `transition-duration`: Thời lượng chuyển đổi (s hoặc ms, vd: `0.5s`).
  3. `transition-timing-function`: Đường cong gia tốc (`linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`, `cubic-bezier`).
  4. `transition-delay`: Thời gian chờ trước khi bắt đầu chuyển đổi.
- **Cú pháp viết tắt (Shorthand)**:
  `transition: property duration timing-function delay;` (vd: `transition: all 0.3s ease-in-out;`)

### 4.6. Hoạt họa chuyển động (Animations & @keyframes)
- **Quy tắc định nghĩa `@keyframes`**:
  ```css
  @keyframes myAnimation {
    from { background-color: red; left: 0px; }
    to { background-color: yellow; left: 200px; }
  }
  /* Hoặc sử dụng mốc phần trăm % */
  @keyframes complexAnim {
    0%   { top: 0px; left: 0px; }
    50%  { top: 100px; left: 50px; }
    100% { top: 0px; left: 200px; }
  }
  ```
- **Các thuộc tính animation**:
  - `animation-name`: Tên khung hình `@keyframes`.
  - `animation-duration`: Thời lượng chạy 1 chu kỳ.
  - `animation-timing-function`: Kiểu chuyển động.
  - `animation-delay`: Độ trễ bắt đầu.
  - `animation-iteration-count`: Số lần lặp lại (số cụ thể hoặc `infinite` để lặp vô hạn).
  - `animation-direction`: Hướng chạy (`normal`, `reverse`, `alternate` - đổi chiều qua lại).
  - `animation-fill-mode`: Giữ trạng thái (`forwards` giữ trạng thái ở frame cuối, `backwards`, `both`).
  - `animation-play-state`: Trạng thái (`running`, `paused`).

### 4.7. Bố cục nhiều cột & Giao diện người dùng (Multi-column & UI)
- **Multiple Columns**:
  - `column-count`: Số cột muốn chia cho đoạn văn.
  - `column-gap`: Khoảng trống giữa các cột.
  - `column-rule`: Đường kẻ phân cách giữa các cột (`column-rule: 1px solid #ddd;`).
- **User Interface**:
  - `box-sizing`:
    - `content-box` (mặc định): `width` chỉ tính Content $\rightarrow$ tổng độ rộng = width + padding + border.
    - `border-box`: `width` bao gồm cả Content + Padding + Border $\rightarrow$ phần tử không bị phình to khi thêm padding/border (chuẩn thiết kế hiện đại).
  - `resize`: Cho phép người dùng kéo giãn khung (`none`, `both`, `horizontal`, `vertical` - yêu cầu phải có `overflow` khác `visible`).
  - `outline-offset`: Tạo khoảng trống giữa đường viền ngoài `outline` và mép viền `border`.

---

## PHẦN 5: BOOTSTRAP FRAMEWORK (Chương 2 Bootstrap -SV.pdf)

### 5.1. Giới thiệu Bootstrap & So sánh Bootstrap 4 vs Bootstrap 5
- **Định nghĩa**: Bootstrap là framework Front-End mã nguồn mở chứa các định dạng CSS, HTML và JavaScript có sẵn, giúp xây dựng giao diện web Responsive (thích ứng mọi thiết bị) nhanh, đẹp và chuẩn mực.
- **Thẻ meta Viewport bắt buộc**:
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ```
- **Các điểm khác biệt cốt lõi giữa Bootstrap 4 & Bootstrap 5**:
  | Tiêu chí | Bootstrap 4 | Bootstrap 5 |
  | :--- | :--- | :--- |
  | **Thư viện phụ thuộc** | Phụ thuộc bắt buộc vào **jQuery** & Popper.js | **Bỏ hoàn toàn jQuery**, dùng Vanilla JavaScript nguyên bản |
  | **Breakpoints (Tier)** | Có 5 mức: `xs`, `sm`, `md`, `lg`, `xl` | Thêm mức thứ 6: `xxl` ($\ge 1400\text{px}$) |
  | **Khoảng cách Gutter** | Dùng `.gutter` đơn vị `px` | Dùng hệ thống `.g-*`, `.gx-*`, `.gy-*` đơn vị `rem` |
  | **Quy tắc đặt tên** | Căn lề trái/phải: `left` / `right` (vd: `ml-*`, `mr-*`, `text-left`) | Đổi sang `start` / `end` (vd: `ms-*`, `me-*`, `text-start`, `text-end`) |
  | **Điều khiển Form** | Dùng `.form-group`, `.form-row` | Bỏ `.form-group`, dùng `mb-3`; thẻ select dùng `.form-select` |
  | **Tùy biến (Utilities)** | Hạn chế chỉnh sửa tiện ích | Cung cấp **Utilities API** mạnh mẽ, CSS Custom Variables |

### 5.2. Khung chứa (Containers) & Tiện ích Lề (Spacing)
- **Các loại Container**:
  - `.container`: Khung chứa có chiều rộng tối đa (max-width) cố định thay đổi theo từng breakpoint.
  - `.container-fluid`: Khung chứa tràn viền 100% chiều rộng ở mọi kích thước màn hình.
  - `.container-{breakpoint}`: Tràn viền 100% cho đến khi đạt kích cỡ breakpoint tương ứng.
- **Bảng Breakpoints chuẩn**:
  - Siêu nhỏ (Extra small `< 576px`): `col-` (100% width)
  - Nhỏ (Small `≥ 576px`): `sm` (container max-width 540px)
  - Vừa (Medium `≥ 768px`): `md` (container max-width 720px)
  - Lớn (Large `≥ 992px`): `lg` (container max-width 960px)
  - Cực lớn (Extra large `≥ 1200px`): `xl` (container max-width 1140px)
  - Cực cực lớn (XXL `≥ 1400px` - *B5*): `xxl` (container max-width 1320px)
- **Tiện ích Margin & Padding (Spacing)**:
  - Cú pháp: `{property}{sides}-{size}`
  - Thuộc tính: `m` (margin), `p` (padding).
  - Vị trí: `t` (top), `b` (bottom), `s` (start/left), `e` (end/right), `x` (trái & phải), `y` (trên & dưới), để trống là cả 4 phía.
  - Kích cỡ: `0` (0px), `1` (0.25rem), `2` (0.5rem), `3` (1rem), `4` (1.5rem), `5` (3rem), `auto` (căn giữa).

### 5.3. Hệ thống lưới (Grid System)
- **Nguyên lý**: Chia bố cục trang thành hệ thống **12 cột**.
- **Cấu trúc bắt buộc**:
  ```html
  <div class="container">
    <div class="row">
      <div class="col-sm-4">Cột 1 (4/12)</div>
      <div class="col-sm-8">Cột 2 (8/12)</div>
    </div>
  </div>
  ```
- **Quy tắc cần nhớ**:
  - `.row` phải nằm trong `.container` hoặc `.container-fluid`.
  - `.col-*` phải là con trực tiếp của `.row`.
  - Tổng số cột trên một dòng nếu vượt quá 12 sẽ tự động bị rớt xuống dòng tiếp theo.
  - Tự động chia đều cột: Dùng class `.col` (không kèm số).
  - Dịch chuyển cột: Sử dụng `.offset-{breakpoint}-{number}` (vd: `.offset-md-3`).

### 5.4. Typography, Bảng & Hình ảnh
- **Màu sắc ngữ cảnh (Contextual Colors)**:
  - Text: `.text-primary`, `.text-secondary`, `.text-success`, `.text-danger`, `.text-warning`, `.text-info`, `.text-light`, `.text-dark`, `.text-muted`, `.text-white`.
  - Nền: `.bg-primary`, `.bg-secondary`, `.bg-success`, `.bg-danger`, `.bg-warning`, `.bg-info`, `.bg-light`, `.bg-dark`, `.bg-white`.
- **Bảng (Table)**:
  - `.table`: Bảng cơ bản có kẻ ngang.
  - `.table-striped`: Kẻ sọc so le các dòng.
  - `.table-bordered`: Có viền kẻ ô xung quanh.
  - `.table-hover`: Đổi màu khi hover chuột lên dòng.
  - `.table-dark`: Giao diện bảng nền tối.
  - `.table-sm`: Bảng thu nhỏ khoảng đệm padding.
  - `.table-responsive`: Tự động xuất hiện thanh cuộn ngang trên màn hình nhỏ.
- **Hình ảnh (Images)**:
  - `.img-fluid`: Ảnh co giãn responsive (`max-width: 100%; height: auto;`).
  - `.rounded`: Bo tròn 4 góc | `.rounded-circle`: Cắt ảnh thành hình tròn.
  - `.img-thumbnail`: Tạo viền khung thumbnail bao quanh ảnh.

### 5.5. Nút nhấn, Nhóm nút & Phù hiệu (Buttons, Badges, Spinners)
- **Nút nhấn (Buttons)**:
  - Định dạng chuẩn: `.btn .btn-{color}` (vd: `.btn .btn-primary`).
  - Nút dạng viền (Outline): `.btn-outline-{color}`.
  - Kích thước: `.btn-lg`, `.btn-sm`.
  - Trạng thái: `.active`, `.disabled` (hoặc thuộc tính HTML `disabled`).
  - Nhóm nút: `.btn-group`, `.btn-group-vertical`.
- **Badges & Spinners**:
  - Huy hiệu: `.badge`, `.bg-{color}` (B5) / `.badge-{color}` (B4), `.rounded-pill`.
  - Vòng xoay tải trang (Spinners): `.spinner-border`, `.spinner-grow`, kích cỡ `.spinner-border-sm`.

### 5.6. Thẻ (Cards), Danh sách (List Groups) & Phân trang (Pagination)
- **Cấu trúc Card**:
  - Khung bao: `.card`.
  - Các phần: `.card-header`, `.card-body`, `.card-footer`.
  - Thành phần con: `.card-title`, `.card-subtitle`, `.card-text`, `.card-link`.
  - Hình ảnh thẻ: `.card-img-top`, `.card-img-bottom`, `.card-img-overlay` (chữ đè lên ảnh).
- **List Groups**:
  - Danh sách nhóm: `.list-group` chứa các `.list-group-item`.
  - `.list-group-item-action`: Có hiệu ứng hover/click khi dùng thẻ `<a>` hoặc `<button>`.
- **Pagination**:
  - Cấu trúc: `<ul class="pagination">` chứa `<li class="page-item">` và `<a class="page-link">`.
  - Trạng thái: `.active`, `.disabled`; kích thước: `.pagination-lg`, `.pagination-sm`.

### 5.7. Điều hướng (Navs & Navbar)
- **Nav cơ bản**:
  - Thẻ `<ul>` có class `.nav`, bên trong gồm `.nav-item` và `.nav-link`.
  - Dạng tab: `.nav-tabs` | Dạng viên thuốc: `.nav-pills` | Cột dọc: `.flex-column`.
- **Navbar (Thanh điều hướng chính)**:
  - Cấu trúc chuẩn responsive:
    ```html
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Logo</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#myNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="myNavbar">
          <ul class="navbar-nav me-auto">
            <li class="nav-item"><a class="nav-link active" href="#">Trang chủ</a></li>
            <li class="nav-item"><a class="nav-link" href="#">Sản phẩm</a></li>
          </ul>
        </div>
      </div>
    </nav>
    ```

### 5.8. Form trong Bootstrap
- **Các class điều khiển Form**:
  - Ô nhập liệu: `.form-control` (tự động full-width 100%, bo góc, hiệu ứng focus đẹp mắt).
  - Checkbox & Radio: Bao trong `.form-check`, thẻ input dùng `.form-check-input`, label dùng `.form-check-label`. Đặt nằm ngang dùng `.form-check-inline`.
  - Combobox: Thẻ `<select>` dùng class `.form-select`.
  - Nhóm nhập liệu (`.input-group`): Ghép nút nhấn hoặc text/icon gắn liền với input (`.input-group-text`).

### 5.9. Các thành phần JavaScript tương tác (Components)
- **Modal (Hộp thoại Popup)**:
  - Kích hoạt qua nút nhấn: `data-bs-toggle="modal"` và `data-bs-target="#myModal"` (B4 là `data-toggle`, `data-target`).
  - Khung cấu trúc: `.modal` -> `.modal-dialog` -> `.modal-content` (gồm `.modal-header`, `.modal-body`, `.modal-footer`).
  - Nút đóng: `data-bs-dismiss="modal"`.
- **Collapse & Accordion**:
  - Đóng/mở nội dung: `data-bs-toggle="collapse"`, trỏ đến `#id` nội dung cần ẩn/hiện.
  - Accordion: Gom các khối collapse để khi mở mục này sẽ tự động đóng mục khác.
- **Carousel (Trình chiếu ảnh Slider)**:
  - Bao quanh: `.carousel .slide`, thuộc tính `data-bs-ride="carousel"`.
  - Khung chứa ảnh: `.carousel-inner` chứa các `.carousel-item` (phải có ít nhất 1 item mang class `.active`).
  - Nút điều khiển: `.carousel-control-prev`, `.carousel-control-next`, chỉ báo `.carousel-indicators`.
- **Tooltip & Popover**:
  - Gợi ý khi hover / click: `data-bs-toggle="tooltip"` / `data-bs-toggle="popover"`.
  - *Lưu ý*: Mặc định không tự chạy, **bắt buộc phải kích hoạt bằng JavaScript** khi trang tải xong.

---

## 🎯 BẢNG CHECKLIST ÔN THI TRỌNG TÂM THEO DẠNG CÂU HỎI

| Mảng kiến thức | Nội dung cần nắm chắc | Dạng bài tập / Câu hỏi thi thường gặp |
| :--- | :--- | :--- |
| **HTML Thường** | Thẻ tạo bảng (`colspan`, `rowspan`), thẻ Form (`action`, `method`, GET vs POST), phân biệt `id` vs `name` | Vẽ lại giao diện bảng biểu phức tạp; viết form đăng ký đăng nhập |
| **HTML5** | Các thẻ ngữ nghĩa (`<article>`, `<section>`, `<aside>`), input types mới, phân biệt `localStorage` vs `sessionStorage`, so sánh Canvas vs SVG | Phân tích cấu trúc layout website; so sánh cơ chế lưu trữ client-side |
| **CSS Cơ bản** | Cách tính độ ưu tiên Specificity, CSS Box Model (Content, Padding, Border, Margin), định vị `relative` vs `absolute` vs `fixed` | Tính xem thuộc tính nào áp dụng khi xung đột; căn giữa khối `margin: auto` |
| **CSS3** | Cú pháp `border-radius`, `box-shadow`, `linear-gradient`, các phép biến đổi 2D `transform`, `transition`, `@keyframes` | Viết CSS tạo nút bấm hover đổi màu mượt; hiệu ứng chuyển động animation |
| **Bootstrap** | Cơ chế 12 cột Grid (`container` $\rightarrow$ `row` $\rightarrow$ `col`), các breakpoint (`sm`, `md`, `lg`, `xl`, `xxl`), class table, navbar responsive, modal | Viết mã nguồn chia layout 3 cột trên Desktop và 1 cột trên Mobile; cấu trúc thanh menu responsive |
