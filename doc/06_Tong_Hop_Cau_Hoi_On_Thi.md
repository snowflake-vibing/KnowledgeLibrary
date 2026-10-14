# CHUYÊN ĐỀ 06: TỔNG HỢP CÂU HỎI TRẮC NGHIỆM & ĐỀ THI MẪU

> **Môn học:** Phát triển ứng dụng Web (IS207)  
> **Tổng hợp kiến thức trọng tâm:** HTML, HTML5, CSS, CSS3, Bootstrap Framework

---

## PHẦN 1: NGÂN HÀNG CÂU HỎI TRẮC NGHIỆM TRỌNG TÂM (CÓ ĐÁP ÁN & GIẢI THÍCH)

### Câu 1 (HTML Cơ bản)
**Khi muốn gộp 3 ô liên tiếp theo chiều ngang trên cùng một hàng trong bảng HTML, ta sử dụng thuộc tính nào?**  
A. `rowspan="3"`  
B. `colspan="3"`  
C. `merge="3"`  
D. `span="3"`  

> **Đáp án:** **B**  
> **Giải thích:** `colspan` (*column span*) dùng để gộp các cột kề nhau theo chiều ngang. `rowspan` (*row span*) dùng để gộp các hàng theo chiều dọc.

---

### Câu 2 (HTML Form)
**Khi người dùng muốn tải lên máy chủ một file hình ảnh thông qua thẻ `<input type="file">`, thuộc tính `enctype` của thẻ `<form>` bắt buộc phải mang giá trị nào?**  
A. `application/x-www-form-urlencoded`  
B. `text/plain`  
C. `multipart/form-data`  
D. `application/octet-stream`  

> **Đáp án:** **C**  
> **Giải thích:** Chuẩn `multipart/form-data` phân tách dữ liệu thành các phần riêng biệt để truyền tải dữ liệu nhị phân (binary file). Nếu để mặc định `application/x-www-form-urlencoded`, file sẽ không tải lên được.

---

### Câu 3 (HTML5 Semantic)
**Thẻ ngữ nghĩa nào trong HTML5 được dùng để định nghĩa một khối nội dung độc lập, trọn vẹn và có khả năng phân phối lại hoặc tái sử dụng độc lập (ví dụ: bài viết blog, bài báo tin tức)?**  
A. `<section>`  
B. `<aside>`  
C. `<article>`  
D. `<header>`  

> **Đáp án:** **C**  
> **Giải thích:** `<article>` dùng cho khối nội dung hoàn chỉnh, có ý nghĩa độc lập khi tách riêng; `<section>` dùng để phân chia các phần chủ đề trong tài liệu; `<aside>` là nội dung phụ trợ.

---

### Câu 4 (HTML5 Graphics)
**Phát biểu nào sau đây là ĐÚNG khi so sánh giữa HTML5 Canvas và SVG?**  
A. Canvas là đồ họa vector, SVG là đồ họa raster/bitmap.  
B. Canvas không bao giờ bị vỡ hạt khi phóng to màn hình, SVG thì có.  
C. Mỗi hình vẽ trong SVG là một Node riêng trong cây DOM và có thể bắt sự kiện tương tác (`click`, `hover`).  
D. Canvas viết hoàn toàn bằng thẻ XML trực tiếp mà không cần dùng JavaScript.  

> **Đáp án:** **C**  
> **Giải thích:** SVG cấu tạo từ các thẻ DOM XML nên hỗ trợ đầy đủ Event Listener và CSS; ngược lại Canvas vẽ dạng pixel trên nền 1 thẻ DOM duy nhất thông qua JavaScript.

---

### Câu 5 (Web Storage)
**Điểm khác biệt cốt lõi nhất giữa `localStorage` và `sessionStorage` là gì?**  
A. `localStorage` lưu tối đa 4KB, `sessionStorage` lưu tối đa 5MB.  
B. `sessionStorage` bị xóa sạch khi đóng tab/cửa sổ trình duyệt, trong khi `localStorage` tồn tại vĩnh viễn cho đến khi bị xóa chủ động.  
C. `localStorage` tự động gửi dữ liệu lên server trong mỗi HTTP request.  
D. `sessionStorage` cho phép lưu trữ trực tiếp JavaScript Object mà không cần `JSON.stringify()`.  

> **Đáp án:** **B**  
> **Giải thích:** `sessionStorage` gắn liền với phiên làm việc của tab hiện tại; `localStorage` lưu trữ vĩnh viễn không có hạn sử dụng. Cả hai đều chỉ lưu String và không tự động gửi lên server.

---

### Câu 6 (CSS Specificity)
**Cho các quy tắc CSS cùng định dạng màu cho một thẻ `<p class="text" id="demo">`. Quy tắc nào sẽ được áp dụng (có độ ưu tiên cao nhất)?**  
1. `p { color: red; }`  
2. `.text { color: green; }`  
3. `#demo { color: blue; }`  
4. `p.text { color: yellow; }`  

A. Quy tắc 1  
B. Quy tắc 2  
C. Quy tắc 3  
D. Quy tắc 4  

> **Đáp án:** **C**  
> **Giải thích:** Điểm độ ưu tiên Specificity:  
> - `p`: 1 điểm  
> - `.text`: 10 điểm  
> - `p.text`: 11 điểm  
> - `#demo`: **100 điểm** (ID Selector thắng tuyệt đối).

---

### Câu 7 (CSS Positioning)
**Một phần tử có thuộc tính `position: absolute;` sẽ được canh chỉnh vị trí theo mốc tọa độ nào?**  
A. Luôn luôn theo khung nhìn màn hình trình duyệt (viewport).  
B. So với vị trí ban đầu của chính nó và bảo lưu khoảng trống.  
C. Theo phần tử tổ tiên gần nhất có giá trị `position` khác `static`.  
D. Theo phần tử con đầu tiên của nó.  

> **Đáp án:** **C**  
> **Giải thích:** `position: absolute` sẽ tìm ngược lên cây DOM phần tử cha/ông gần nhất có `position` là `relative`, `absolute`, `fixed` hoặc `sticky`. Nếu không có, nó mới neo theo thẻ gốc `<html>`.

---

### Câu 8 (CSS3 Box Model)
**Khi khai báo một thẻ `div` có `width: 300px; padding: 20px; border: 5px solid red; box-sizing: border-box;`, tổng chiều rộng hiển thị thực tế của thẻ `div` trên màn hình là bao nhiêu?**  
A. 350px  
B. 300px  
C. 325px  
D. 340px  

> **Đáp án:** **B**  
> **Giải thích:** Với `box-sizing: border-box;`, tổng chiều rộng đúng bằng giá trị `width` đã khai báo (300px). Trình duyệt tự trừ phần padding và border vào bên trong. (Nếu là `content-box` mặc định thì sẽ là $300 + 20 \times 2 + 5 \times 2 = 350\text{px}$).

---

### Câu 9 (Bootstrap 4 vs 5)
**Điểm thay đổi nào sau đây là CHÍNH XÁC khi nâng cấp từ Bootstrap 4 lên Bootstrap 5?**  
A. Bootstrap 5 bổ sung thư viện jQuery để tăng tốc độ.  
B. Bootstrap 5 đổi các class căn lề trái/phải (`ml-*`, `mr-*`) thành (`ms-*`, `me-*`).  
C. Bootstrap 5 loại bỏ mức breakpoint `xl`.  
D. Bootstrap 5 bắt buộc dùng thẻ `<div class="form-group">` cho mọi input.  

> **Đáp án:** **B**  
> **Giải thích:** Bootstrap 5 loại bỏ jQuery (dùng Vanilla JS), đổi `left/right` sang `start/end` (`ms-*`, `me-*`), bỏ `.form-group` và bổ sung thêm breakpoint `xxl`.

---

### Câu 10 (Bootstrap Grid)
**Trong hệ thống lưới của Bootstrap, thẻ nào bắt buộc phải là con trực tiếp của thẻ `.row`?**  
A. `.container`  
B. `.card`  
C. Các thẻ chứa class `.col-*`  
D. `.form-control`  

> **Đáp án:** **C**  
> **Giải thích:** Cấu trúc chuẩn của Bootstrap Grid là `.container` bao `.row`, và bên trong `.row` bắt buộc con trực tiếp phải là các cột `.col-*`.

---

## PHẦN 2: BÀI TẬP TỰ LUẬN THỰC HÀNH KINH ĐIỂN

### Bài tập 1: Viết mã HTML tạo bảng thời khóa biểu có gộp ô
**Yêu cầu:** Tạo bảng gồm 3 cột (Tiết, Thứ 2, Thứ 3).  
- Tiết 1 - 2: Thứ 2 học môn "Lập trình Web" (gộp 2 hàng của Thứ 2).  
- Tiết 3: Cả Thứ 2 và Thứ 3 đều nghỉ giải lao (gộp 2 cột của hàng Tiết 3).

```html
<table border="1" cellpadding="8" cellspacing="0">
  <thead>
    <tr>
      <th>Tiết</th>
      <th>Thứ 2</th>
      <th>Thứ 3</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <!-- Gộp 2 hàng liên tiếp cho Thứ 2 -->
      <td rowspan="2">Lập trình Web</td>
      <td>Cơ sở dữ liệu</td>
    </tr>
    <tr>
      <td>2</td>
      <!-- Hàng này ô Thứ 2 đã bị chiếm bởi rowspan ở trên nên không viết thẻ td thứ 2 -->
      <td>Mạng máy tính</td>
    </tr>
    <tr>
      <td>3</td>
      <!-- Gộp 2 cột liên tiếp cho giờ giải lao -->
      <td colspan="2" align="center"><b>GIẢI LAO</b></td>
    </tr>
  </tbody>
</table>
```

---

### Bài tập 2: Thiết kế bố cục Responsive bằng Bootstrap 5
**Yêu cầu:**  
Xây dựng một trang tin tức đơn giản:
1. Navbar trên cùng có thương hiệu và menu.
2. Vùng nội dung chính chia làm 2 phần:
   - Trên Mobile (`< 768px`): Cột bài viết và Sidebar xếp chồng nhau 100% chiều rộng.
   - Trên Tablet & PC (`>= 768px`): Cột bài viết chiếm 8 phần (`col-md-8`), Sidebar chiếm 4 phần (`col-md-4`).
3. Footer ở chân trang căn giữa.

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Bố cục Tin Tức Bootstrap 5</title>
  <!-- Nhúng Bootstrap 5 CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

  <!-- 1. Navbar -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">TinTuc24h</a>
    </div>
  </nav>

  <!-- 2. Main Content Grid -->
  <main class="container my-4">
    <div class="row g-4">
      <!-- Cột Bài viết: 12 cột trên mobile, 8 cột trên màn hình >= md -->
      <div class="col-12 col-md-8">
        <div class="card mb-3">
          <div class="card-body">
            <h2 class="card-title">Bài viết nổi bật trong ngày</h2>
            <p class="card-text text-muted">Đăng ngày 15/10/2026 bởi Ban Biên Tập</p>
            <p>Nội dung chi tiết của bài viết được hiển thị đầy đủ tại khu vực này...</p>
          </div>
        </div>
      </div>

      <!-- Cột Sidebar: 12 cột trên mobile, 4 cột trên màn hình >= md -->
      <div class="col-12 col-md-4">
        <div class="card bg-light">
          <div class="card-body">
            <h5 class="card-title">Chuyên mục quan tâm</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item bg-transparent">Công nghệ Web</li>
              <li class="list-group-item bg-transparent">Hệ thống thông tin</li>
              <li class="list-group-item bg-transparent">Trí tuệ nhân tạo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- 3. Footer -->
  <footer class="bg-dark text-white text-center py-3 mt-auto">
    <p class="mb-0">&copy; 2026 IS207 - UIT. All rights reserved.</p>
  </footer>

</body>
</html>
```

---

## PHẦN 3: MẸO TRÁNH "BẪY" PHỔ BIẾN KHI LÀM BÀI THI

1. **Bẫy `box-sizing`:** Nếu đề bài không ghi `box-sizing: border-box;`, mặc định luôn là `content-box` $\rightarrow$ Phải cộng dồn cả `width + 2*padding + 2*border` để ra kích thước thực tế.
2. **Bẫy thứ tự Pseudo-class:** Nhớ thần chú **LVHA** (`:link` $\rightarrow$ `:visited` $\rightarrow$ `:hover` $\rightarrow$ `:active`). Viết đảo lộn thứ tự thì trạng thái hover hoặc active sẽ bị mất tác dụng.
3. **Bẫy `position: absolute`:** Luôn nhớ kiểm tra xem phần tử cha có `position` khác `static` chưa. Nếu chưa có, tuyệt đối không được tính tọa độ `top`/`left` theo thẻ cha đó mà phải neo theo khung nhìn `html`.
4. **Bẫy class Bootstrap 5:** Trong Bootstrap 5 không còn `ml-*` và `mr-*` (đã đổi sang `ms-*` và `me-*`), không còn `.form-group`, và không phụ thuộc thư viện jQuery.
