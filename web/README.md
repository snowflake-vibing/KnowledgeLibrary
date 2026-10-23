# Tài Liệu Ôn Tập & Bài Tập Môn Web (IS207)

Repository lưu trữ toàn bộ tài liệu học tập, đề cương ôn thi và mã nguồn thực hành môn **Phát triển ứng dụng Web (IS207)** - Khoa Hệ thống Thông tin, Trường Đại học Công nghệ Thông tin (UIT).

---

## 🎯 ĐỀ CƯƠNG & CẨM NANG ÔN THI GIỮA KỲ (THỰC CHIẾN)
> Dành riêng cho kỳ thi **Ghi code trực tiếp trang web sử dụng HTML + CSS + JavaScript + jQuery**:

👉 **Xem ngay:** **[`take-note.md`](./take-note.md)** *(Tài liệu tốc ký mang vào phòng thi)*, **[`De_Cuong_On_Thi_Giua_Ky.md`](./De_Cuong_On_Thi_Giua_Ky.md)** và **[`doc/Huong_Dan_On_Thi_Giua_Ky_Thuc_Chien.md`](./doc/Huong_Dan_On_Thi_Giua_Ky_Thuc_Chien.md)**  
Bao gồm:
- **Khung template code mẫu** sẵn sàng vào phòng thi.
- **4 Dạng bài tập code kinh điển nhất tại UIT** (Form Validation Regex, Thực đơn tính tiền đêm +10%, Giỏ hàng động tự tính tiền khi đổi số lượng & xóa dòng, Đồng hồ hệ thống & Chọn món theo bàn).
- **Checklist 5 sai lầm phổ biến** khiến sinh viên mất điểm đáng tiếc (quên `e.preventDefault()`, lỗi cộng chuỗi thay vì số, DOM chưa load xong, nút xóa sinh động không nhận click).

---

## 📚 Cấu Trúc Toàn Bộ Chuyên Đề Ôn Tập

Hệ thống tài liệu được biên soạn và phân chia thành các chuyên đề chi tiết trong thư mục [`doc/`](./doc/):

### 🌐 Phần I: Công Nghệ Web Phía Client (Chương 2)
- [`De_Muc_On_Tap_Chuong_2.md`](./De_Muc_On_Tap_Chuong_2.md): Đề cương tổng hợp toàn diện Chương 2.
- [`doc/01_HTML_Co_Ban.md`](./doc/01_HTML_Co_Ban.md): HTML cấu trúc trang, thẻ định dạng văn bản, danh sách, liên kết, bảng biểu, Form & Controls.
- [`doc/02_HTML5_Nang_Cao.md`](./doc/02_HTML5_Nang_Cao.md): Thẻ ngữ nghĩa Semantic Tags, Form HTML5 validation, Canvas 2D vs SVG, Audio/Video, Web Storage.
- [`doc/03_CSS_Co_Ban_Box_Model.md`](./doc/03_CSS_Co_Ban_Box_Model.md): Cú pháp CSS, Độ ưu tiên Specificity, Bộ chọn, Pseudo-classes/elements, CSS Box Model, Positioning.
- [`doc/04_CSS3_Nang_Cao_Effects_Animation.md`](./doc/04_CSS3_Nang_Cao_Effects_Animation.md): Màu RGBA/HSLA, Bo góc, Đổ bóng, Gradient, Transform 2D/3D, Transition, Animation `@keyframes`, Box-sizing.
- [`doc/05_Bootstrap_Responsive_Design.md`](./doc/05_Bootstrap_Responsive_Design.md): Framework Bootstrap, So sánh Bootstrap 4 vs 5, Breakpoints, Grid 12 cột, Components, Navbar responsive.
- [`doc/06_Tong_Hop_Cau_Hoi_On_Thi.md`](./doc/06_Tong_Hop_Cau_Hoi_On_Thi.md): Ngân hàng câu hỏi trắc nghiệm có giải thích, bài tập tự luận code mẫu và mẹo tránh bẫy Chương 2.

### ⚡ Phần II: Lập Trình Phía Client - JavaScript & jQuery (Chương 3)
- [`De_Muc_On_Tap_Chuong_3.md`](./De_Muc_On_Tap_Chuong_3.md): Đề cương tổng hợp toàn diện Chương 3.
- [`doc/07_JavaScript_Co_Ban_Cu_Phap_Kieu_Du_Lieu.md`](./doc/07_JavaScript_Co_Ban_Cu_Phap_Kieu_Du_Lieu.md): Java vs JS, `var`/`let`/`const`, Hoisting, Dynamic typing, Type coercion, `null`/`undefined`/`NaN`, `??`, `??=`, `eval()`.
- [`doc/08_JavaScript_DOM_Event_Handling.md`](./doc/08_JavaScript_DOM_Event_Handling.md): BOM & Cây DOM, truy xuất phần tử, `innerHTML` vs `textContent`, Dynamic Table, Event Bubbling & Capturing, `preventDefault()`.
- [`doc/09_JavaScript_Bat_Dong_Bo_ES6_Regex.md`](./doc/09_JavaScript_Bat_Dong_Bo_ES6_Regex.md): Event Loop, Callback Hell, Promise, `async`/`await`, ES6+ (Arrow functions, Destructuring, Spread/Rest), Biểu thức chính quy (Regex) kiểm tra Form.
- [`doc/10_jQuery_Co_Ban_Selector_DOM_Effects.md`](./doc/10_jQuery_Co_Ban_Selector_DOM_Effects.md): Thư viện jQuery, `$(document).ready()` vs `window.onload`, Selectors (`:even`, `:odd`, `:eq`), Thao tác DOM, Event Delegation `.on()`, Hiệu ứng Fade & Slide, Chaining.
- [`doc/11_Tong_Hop_Cau_Hoi_On_Thi_Chuong_3.md`](./doc/11_Tong_Hop_Cau_Hoi_On_Thi_Chuong_3.md): Bảng so sánh tổng hợp, ngân hàng câu hỏi trắc nghiệm chọn lọc, bài tập Dynamic Table & Tab menu jQuery, mẹo tránh bẫy Chương 3.

👉 Xem chi tiết bản đồ lộ trình học tại: **[`doc/README.md`](./doc/README.md)**

---

## 🛠️ Công Nghệ & Tiêu Chuẩn Áp Dụng
- **HTML / HTML5**: Cấu trúc chuẩn W3C, thẻ ngữ nghĩa Semantic, Web Storage API.
- **CSS / CSS3**: Flexbox, Box Model, Responsive, CSS Animations.
- **Bootstrap 5**: Mobile-first framework, Grid system 12 cột, Vanilla JavaScript.
- **JavaScript (ES6+)**: Xử lý DOM, Bất đồng bộ Promise/Async-Await, Regular Expressions (Regex).
- **jQuery 3.x**: Tương tác DOM nhanh, xử lý sự kiện ủy quyền, hiệu ứng Animation.