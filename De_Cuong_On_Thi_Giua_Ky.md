# 🎯 ĐỀ CƯƠNG & CẨM NANG ÔN THI GIỮA KỲ MÔN WEB (IS207)

> **Môn học:** Phát triển ứng dụng Web (IS207) - UIT  
> **Trọng tâm đề thi:** Viết code trực tiếp một trang web hoàn chỉnh kết hợp **HTML + CSS + JavaScript + jQuery**  
> 🔗 **Tài liệu hướng dẫn thực chiến chi tiết kèm code mẫu:** [`doc/Huong_Dan_On_Thi_Giua_Ky_Thuc_Chien.md`](./doc/Huong_Dan_On_Thi_Giua_Ky_Thuc_Chien.md)

---

## 📌 BẢN ĐỒ LIÊN KẾT NHANH ĐẾN CÁC CHUYÊN ĐỀ ÔN THI

Tài liệu được phân chia theo 4 khối kiến thức thực chiến:

### 1. Khối Dựng Khung & Cấu Trúc HTML
- [`doc/01_HTML_Co_Ban.md`](./doc/01_HTML_Co_Ban.md): Thẻ cấu trúc trang, bảng biểu có gộp ô (`colspan`, `rowspan`), thẻ Form và các input types cơ bản.
- [`doc/02_HTML5_Nang_Cao.md`](./doc/02_HTML5_Nang_Cao.md): Thẻ ngữ nghĩa Semantic Tags, các kiểu input mới (`number`, `date`, `email`), thuộc tính validate (`required`, `pattern`).

### 2. Khối Trình Bày & Bố Cục CSS
- [`doc/03_CSS_Co_Ban_Box_Model.md`](./doc/03_CSS_Co_Ban_Box_Model.md): Căn giữa khối hộp `margin: 0 auto;`, CSS Box Model, định vị `relative` vs `absolute`.
- [`doc/04_CSS3_Nang_Cao_Effects_Animation.md`](./doc/04_CSS3_Nang_Cao_Effects_Animation.md): Bo góc `border-radius`, đổ bóng `box-shadow`, hiệu ứng hover nút bấm mượt mà với `transition`.

### 3. Khối Xử Lý Dữ Liệu & DOM JavaScript
- [`doc/07_JavaScript_Co_Ban_Cu_Phap_Kieu_Du_Lieu.md`](./doc/07_JavaScript_Co_Ban_Cu_Phap_Kieu_Du_Lieu.md): Xử lý số học, ép kiểu chuỗi sang số (`parseFloat`), đối tượng `Date` lấy ngày giờ hệ thống, `Math` làm tròn tiền.
- [`doc/08_JavaScript_DOM_Event_Handling.md`](./doc/08_JavaScript_DOM_Event_Handling.md): Truy xuất DOM, gán sự kiện `addEventListener`, **thao tác bảng động** (`insertRow`, `insertCell`, `deleteRow`).
- [`doc/09_JavaScript_Bat_Dong_Bo_ES6_Regex.md`](./doc/09_JavaScript_Bat_Dong_Bo_ES6_Regex.md): **Biểu thức chính quy (Regex)** kiểm tra tính hợp lệ dữ liệu Form (Email, SĐT, MSSV 8 chữ số).

### 4. Khối Tương Tác Nhanh Bằng Thư Viện jQuery
- [`doc/10_jQuery_Co_Ban_Selector_DOM_Effects.md`](./doc/10_jQuery_Co_Ban_Selector_DOM_Effects.md): Cú pháp `$()`, selector `:checked`, `:even`, `:odd`, đọc giá trị `.val()`, chèn HTML `.append()`, xóa thẻ `.remove()`, ủy quyền sự kiện động `.on()`, hiệu ứng `.fadeIn()`, `.slideToggle()`.

### 5. Ngân Hàng Đề Thi & Trắc Nghiệm Mẫu
- [`doc/06_Tong_Hop_Cau_Hoi_On_Thi.md`](./doc/06_Tong_Hop_Cau_Hoi_On_Thi.md): Tổng hợp câu hỏi trắc nghiệm & đề thi Chương 2.
- [`doc/11_Tong_Hop_Cau_Hoi_On_Thi_Chuong_3.md`](./doc/11_Tong_Hop_Cau_Hoi_On_Thi_Chuong_3.md): Tổng hợp câu hỏi trắc nghiệm & đề thi Chương 3.

---

## 🚀 4 DẠNG BÀI TẬP CODE KINH ĐIỂN NHẤT ĐỀ THI UIT
1. **Dạng 1: Form Đăng ký / Đặt tour có Validate Regex** (kiểm tra rỗng, đúng định dạng email, sđt 10 số, mssv 8 số, báo lỗi màu đỏ).
2. **Dạng 2: Thực đơn tính tiền món ăn / Mua vé xem phim** (chọn checkbox nhiều món, radio thời điểm ngày/đêm phụ thu 10%, bấm nút in bảng chi tiết).
3. **Dạng 3: Bảng giỏ hàng động** (sự kiện `oninput` trên ô số lượng tự cập nhật thành tiền và tổng thanh toán, nút Xóa xóa dòng).
4. **Dạng 4: Website nhà hàng chọn món theo bàn** (đồng hồ ngày giờ tự động `Date()`, dropdown thêm món vào bàn, cộng dồn số lượng).

👉 Xem chi tiết mã nguồn hoàn chỉnh của cả 4 dạng bài tại: **[`doc/Huong_Dan_On_Thi_Giua_Ky_Thuc_Chien.md`](./doc/Huong_Dan_On_Thi_Giua_Ky_Thuc_Chien.md)**
