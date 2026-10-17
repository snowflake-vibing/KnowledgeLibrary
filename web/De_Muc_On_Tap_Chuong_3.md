# ĐỀ CƯƠNG ÔN TẬP TOÀN DIỆN: CHƯƠNG 3 - JAVASCRIPT & JQUERY
*(Tổng hợp chi tiết từ 2 tài liệu bài giảng môn Phát triển ứng dụng Web - Khoa HTTT - UIT)*

---

## 📚 TỔNG QUAN TÀI LIỆU BÀI GIẢNG CHƯƠNG 3
1. **Chương 3 Javascript - SV.pdf** *(221 trang)*:
   - Tổng quan JavaScript, lịch sử ra đời, so sánh Java vs JavaScript, các cách nhúng JS vào HTML.
   - Cú pháp, khai báo biến (`var`, `let`, `const`, scope, hoisting), kiểu dữ liệu nguyên thủy & tham chiếu, Dynamic Typing, Type Coercion.
   - Phân biệt chi tiết `null`, `undefined` và `NaN`.
   - Cấu trúc rẽ nhánh (`if...else`, `switch...case`), vòng lặp (`for`, `while`, `do...while`, `for...in`).
   - Toán tử ba ngôi lồng nhau, toán tử Nullish Coalescing (`??`), toán tử Logical Nullish Assignment (`??=`), hàm `eval()`.
   - Lập trình đối tượng trong JS, từ khóa `this`, `new`, câu lệnh `with`, các đối tượng tích hợp sẵn (`String`, `Math`, `Date`, `Array`).
   - Xử lý sự kiện (Event Handling): các cách gán sự kiện, Event Object, Event Bubbling & Capturing, `preventDefault()`, `stopPropagation()`.
   - Mô hình DOM & BOM: đối tượng `window` (timer `setTimeout`, `setInterval`), đối tượng `document` (truy xuất DOM, thay đổi nội dung, thuộc tính, style, thêm/xóa node động, Dynamic Table).
   - Cơ chế Bất đồng bộ (Asynchronous JS): Event Loop, Call Stack, Callback & Callback Hell, Promise, `async` / `await`.
   - Chuẩn ES6 & Cải tiến hiện đại: Arrow Functions, Template Literals, Destructuring, Spread / Rest (`...`), Classes, Modules, Vanilla JS.
   - Biểu thức chính quy (Regular Expression - Regex): Cú pháp `/pattern/flags`, ký tự đại diện, lượng từ, các hàm kiểm tra (`test`, `exec`, `match`, `replace`), ứng dụng kiểm tra tính hợp lệ của Form.

2. **Chương 3 JQuery - SV.pdf** *(57 trang)*:
   - Giới thiệu thư viện jQuery, triết lý "Write less, do more", cách nhúng thư viện (CDN / Local file).
   - Thời điểm thực thi: so sánh `$(document).ready()` vs `window.onload`.
   - Hệ thống Selectors trong jQuery: Basic, Attribute, Form (`:input`, `:checked`...), Extensions (`:first`, `:even`, `:odd`, `:eq`).
   - Thao tác DOM với jQuery: Get/Set (`text()`, `html()`, `val()`), thuộc tính (`attr()`, `prop()`), thêm/xóa phần tử (`append()`, `prepend()`, `after()`, `before()`, `remove()`, `empty()`).
   - Quản lý CSS & Kích thước: `addClass()`, `removeClass()`, `toggleClass()`, `css()`, `width()`, `innerWidth()`, `outerWidth()`.
   - Sự kiện trong jQuery: Mouse, Keyboard, Form, cơ chế `.on()` và `.off()` (Event Delegation).
   - Hiệu ứng (Effects): Basic (`show`/`hide`/`toggle`), Fading (`fadeIn`/`fadeOut`), Sliding (`slideDown`/`slideUp`), `animate()`, `stop()`, Kỹ thuật Chaining & Callback.

---

## 🎯 BẢNG CHECKLIST TRỌNG TÂM ÔN THI CHƯƠNG 3

| Chủ đề kiến thức | Nội dung cốt lõi cần nhớ | Dạng bài thi thường gặp |
| :--- | :--- | :--- |
| **Java vs JavaScript** | Java là ngôn ngữ biên dịch, hướng đối tượng mạnh mẽ, độc lập; JavaScript là ngôn ngữ kịch bản thông dịch, kiểu động, chạy trên trình duyệt. Tên gọi "Java" chỉ là chiến lược marketing (1995). | Câu hỏi trắc nghiệm phân biệt bản chất 2 ngôn ngữ |
| **Biến & Phạm vi** | Phân biệt `var` (function scope, có hoisting), `let` & `const` (block scope, không hoisting / TDZ, `const` không gán lại được). | Trắc nghiệm dự đoán giá trị in ra màn hình khi gọi biến ngoài scope |
| **Ép kiểu & Giá trị đặc biệt** | `null == undefined` (true), `null === undefined` (false). `NaN` có kiểu dữ liệu là `Number`, `NaN == NaN` (false). Ép kiểu ngầm định khi dùng toán tử `+`. | Câu hỏi trắc nghiệm kiểm tra so sánh lỏng `==` vs nghiêm ngặt `===` |
| **Toán tử hiện đại** | Nullish Coalescing (`a ?? b` chỉ lấy `b` khi `a` là `null` hoặc `undefined`). Khác với `a || b` (lấy `b` khi `a` là falsy như `0`, `""`, `false`). | Điền kết quả của các biểu thức logic phức tạp |
| **DOM Manipulation** | `getElementById`, `querySelector`, `createElement`, `appendChild`, `remove`. Thao tác bảng động `insertRow()`, `insertCell()`. | Viết hàm JavaScript thêm dòng mới vào bảng hoặc xóa dòng khi click |
| **Event Handling** | Thứ tự nổi bọt (*Event Bubbling*) từ con lên cha. Dừng sự kiện: `event.stopPropagation()`, ngăn hành vi mặc định (như submit form, click link): `event.preventDefault()`. | Xử lý Form Submit, click menu |
| **Bất đồng bộ (Async)** | Cơ chế hoạt động của Promise (`Pending` $\rightarrow$ `Fulfilled` / `Rejected`). Cú pháp `async`/`await` kết hợp `try...catch`. | Trắc nghiệm thứ tự in ra console giữa Synchronous, `setTimeout` và Promise |
| **Regex Form Validation** | Cú pháp `/pattern/flags`, ký tự `^`, `$`, `\d`, `\w`, `+`, `*`, `{min,max}`. Phương thức `regex.test(str)`. | Viết regex kiểm tra Email, Số điện thoại Việt Nam, MSSV UIT 8 chữ số |
| **jQuery Cốt lõi** | `$(document).ready()` chạy ngay khi DOM tải xong; `window.onload` chờ toàn bộ ảnh/video. Cú pháp `$()`, chaining `.css().slideUp().slideDown()`. | So sánh thời điểm thực thi; chuyển đổi code từ JS thuần sang jQuery |
| **jQuery DOM & Effect** | `.val()` lấy dữ liệu form, `.html()` lấy mã HTML, `.append()` chèn vào cuối, `.on()` gắn sự kiện động, `.fadeIn()`, `.slideToggle()`. | Viết jQuery tạo hiệu ứng click ẩn/hiện, filter danh sách |
