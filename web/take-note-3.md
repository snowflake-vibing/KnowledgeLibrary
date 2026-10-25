# BÀI GIẢI & PHÂN TÍCH CHI TIẾT ỨNG DỤNG ĐẶT HÀNG COFFEE & BAKERY (HTML5 + CSS3 THUẦN + VANILLA JS)

Tài liệu này cung cấp phiên bản mã nguồn chuẩn hóa **100% HTML5 + CSS3 thuần + JavaScript thuần (Vanilla JS)** (đã loại bỏ hoàn toàn các class của thư viện CSS/Bootstrap/Tailwind bên ngoài để bạn dễ dàng tự viết trong phòng thi mà không cần kết nối mạng), kèm theo **bảng giải thích chi tiết từng dòng lệnh, từng thuộc tính HTML, CSS và từng hàm xử lý sự kiện JavaScript**.

---

## 1. MÃ NGUỒN HOÀN CHỈNH (ĐÃ LOẠI BỎ FRAMEWORK NGOÀI, DÙNG 100% CSS THUẦN & JS THUẦN)

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Đặt Hàng Coffee & Bakery</title>

  <style>
    /* --- 1. CÀI ĐẶT CHUNG TOÀN TRANG --- */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: Arial, sans-serif;
      background-color: #f8f6f0;
      color: #332d29;
      min-height: 100vh;
      padding-bottom: 48px;
    }

    /* --- 2. PHẦN HEADER / BANNER --- */
    .header-banner {
      background-color: #78350f;
      color: #fffbeb;
      padding: 32px 16px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header-banner h1 {
      font-size: 32px;
      font-weight: bold;
      margin-bottom: 8px;
    }
    .header-banner p {
      color: #fde68a;
      font-size: 15px;
    }

    /* --- 3. BỐ CỤC CHÍNH 2 CỘT (CSS GRID) --- */
    .main-container {
      max-width: 960px;
      margin: 32px auto 0;
      padding: 0 16px;
    }
    .layout-grid {
      display: grid;
      grid-template-columns: 5fr 7fr; /* Cột trái 5 phần - Cột phải 7 phần (tổng 12 phần) */
      gap: 24px;
      align-items: start;
    }
    @media (max-width: 768px) {
      .layout-grid {
        grid-template-columns: 1fr; /* Khi xuống màn hình nhỏ thì xếp thành 1 cột dọc */
      }
    }

    /* --- 4. KHUNG THẺ TRẮNG (CARD) CHO CỘT TRÁI & CỘT PHẢI --- */
    .card-box {
      background-color: #ffffff;
      padding: 24px;
      border-radius: 16px;
      border: 1px solid #fef3c7;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    .card-title {
      font-size: 20px;
      font-weight: bold;
      color: #451a03;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid #fef3c7;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .badge-count {
      font-size: 12px;
      font-weight: normal;
      background-color: #fef3c7;
      color: #92400e;
      padding: 4px 10px;
      border-radius: 999px;
    }

    /* --- 5. ĐỊNH DẠNG FORM CHỌN MÓN (CỘT TRÁI) --- */
    .form-group {
      margin-bottom: 16px;
    }
    .form-label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #374151;
      margin-bottom: 6px;
    }
    .form-control {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      background-color: #f9fafb;
      font-size: 14px;
      outline: none;
    }
    .form-control:focus {
      border-color: #f59e0b;
      background-color: #ffffff;
    }
    .btn-add {
      width: 100%;
      background-color: #92400e;
      color: #ffffff;
      font-weight: 600;
      padding: 12px 16px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      font-size: 15px;
    }
    .btn-add:hover {
      background-color: #78350f;
    }

    /* --- 6. ĐỊNH DẠNG BẢNG DANH SÁCH MÓN (CỘT PHẢI) --- */
    .order-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    .order-table thead tr {
      background-color: #fffbeb;
      color: #6b7280;
      font-size: 12px;
      text-transform: uppercase;
      text-align: left;
    }
    .order-table th,
    .order-table td {
      padding: 12px 10px;
      border-bottom: 1px solid #f3f4f6;
    }
    .text-center { text-align: center; }
    .text-right  { text-align: right; }

    .qty {
      width: 64px;
      padding: 6px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      text-align: center;
    }
    .btn-xoa {
      background-color: transparent;
      color: #ef4444;
      border: 1px solid transparent;
      padding: 6px 10px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
    }
    .btn-xoa:hover {
      color: #b91c1c;
      background-color: #fef2f2;
    }

    /* --- 7. TRẠNG THÁI ẨN (.hidden) & NÚT ĐẶT HÀNG (.active) --- */
    .hidden {
      display: none !important;
    }
    .empty-box {
      text-align: center;
      padding: 32px 0;
      color: #9ca3af;
    }
    .summary-section {
      margin-top: 24px;
      padding-top: 16px;
      border-top: 1px solid #f3f4f6;
    }
    .total-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 16px;
    }
    .total-price {
      font-size: 24px;
      color: #78350f;
    }
    .terms-box {
      background-color: #fffbeb;
      padding: 16px;
      border-radius: 12px;
      border: 1px solid #fef3c7;
    }
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      font-size: 14px;
      margin-bottom: 12px;
      user-select: none;
    }

    /* Nút Đặt hàng khi đang bị khóa (disabled) */
    .btn-order {
      width: 100%;
      padding: 14px 16px;
      border: none;
      border-radius: 10px;
      font-weight: bold;
      font-size: 15px;
      background-color: #e5e7eb;
      color: #9ca3af;
      cursor: not-allowed;
      transition: all 0.2s ease;
    }
    /* Nút Đặt hàng khi đã tích chọn checkbox (được gắn thêm class .active) */
    .active {
      background-color: #78350f !important;
      color: #ffffff !important;
      cursor: pointer !important;
      box-shadow: 0 4px 12px rgba(120, 53, 15, 0.25);
    }
    .active:hover {
      background-color: #451a03 !important;
    }

    /* --- 8. MODAL XÁC NHẬN ĐẶT HÀNG THÀNH CÔNG --- */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      z-index: 50;
    }
    .modal-box {
      background-color: #ffffff;
      border-radius: 16px;
      max-width: 440px;
      width: 100%;
      padding: 24px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
    .modal-header {
      text-align: center;
      margin-bottom: 16px;
    }
    .modal-header h3 {
      font-size: 22px;
      color: #059669;
      margin-bottom: 4px;
    }
    .modal-body {
      background-color: #f9fafb;
      padding: 16px;
      border-radius: 12px;
      border: 1px solid #f3f4f6;
      margin-bottom: 20px;
      max-height: 240px;
      overflow-y: auto;
    }
    .summary-list {
      list-style: none;
      margin-top: 8px;
    }
    .summary-item {
      display: flex;
      justify-content: space-between;
      padding: 6px 0;
      border-bottom: 1px dashed #e5e7eb;
      font-size: 14px;
    }
    .summary-total {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #d1d5db;
      font-weight: bold;
      color: #78350f;
    }
    .btn-close-modal {
      width: 100%;
      background-color: #78350f;
      color: #ffffff;
      font-weight: 600;
      padding: 12px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
    }
  </style>
</head>
<body>

  <!-- Header / Banner -->
  <header class="header-banner">
    <h1>Artisan Coffee & Bakery</h1>
    <p>Thưởng thức hương vị cà phê nguyên bản và bánh ngọt tươi mỗi ngày</p>
  </header>

  <!-- Main Container -->
  <main class="main-container">
    <div class="layout-grid">

      <!-- Cột Trái: Chọn món mới -->
      <section class="card-box">
        <h2 class="card-title">Chọn Món Mới</h2>

        <form id="formThemMon">
          <div class="form-group">
            <label class="form-label">Chọn thực đơn</label>
            <select id="selectMenu" class="form-control">
              <option value="Cà phê sữa" data-price="25000">Cà phê sữa - 25.000 đ</option>
              <option value="Cà phê đen" data-price="20000">Cà phê đen - 20.000 đ</option>
              <option value="Bạc xỉu" data-price="28000">Bạc xỉu - 28.000 đ</option>
              <option value="Trà đào cam sả" data-price="35000">Trà đào cam sả - 35.000 đ</option>
              <option value="Matcha Latte" data-price="40000">Matcha Latte - 40.000 đ</option>
              <option value="Bánh Croissant" data-price="30000">Bánh Croissant - 30.000 đ</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Số lượng</label>
            <input type="number" id="inputSoLuong" value="1" min="1" max="99" class="form-control">
          </div>

          <button type="button" id="btnThemMon" class="btn-add">
            + Thêm Vào Đơn Hàng
          </button>
        </form>
      </section>

      <!-- Cột Phải: Danh sách đơn hàng & Thanh toán -->
      <section class="card-box">
        <div>
          <h2 class="card-title">
            <span>Danh Sách Món</span>
            <span id="demSoLuongMon" class="badge-count">1 món</span>
          </h2>

          <!-- Bảng danh sách món ban đầu -->
          <table border="1" cellpadding="6" class="order-table">
            <thead>
              <tr>
                <th>Tên món</th>
                <th>Đơn giá</th>
                <th class="text-center">Số lượng</th>
                <th class="text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody id="dsMon">
              <tr>
                <td class="ten-mon">Cà phê sữa</td>
                <td class="gia-mon" data-price="25000">25.000 đ</td>
                <td class="text-center">
                  <input type="number" class="qty" value="2" min="1">
                </td>
                <td class="text-right">
                  <button type="button" class="btn-xoa" title="Xóa món">Xóa</button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Thông báo danh sách trống -->
          <div id="thongBaoTrong" class="empty-box hidden">
            <p>Chưa có món nào trong đơn hàng</p>
          </div>
        </div>

        <!-- Phần Tổng tiền & Xác nhận -->
        <div class="summary-section">
          <div class="total-row">
            <span>Tổng cộng:</span>
            <strong id="ketQuaTong" class="total-price">50.000 đ</strong>
          </div>

          <div class="terms-box">
            <!-- Ô tích chọn để bật/tắt nút đặt hàng -->
            <label class="checkbox-label">
              <input type="checkbox" id="chkDongY">
              <span>Tôi đồng ý với các điều khoản đặt hàng</span>
            </label>

            <!-- Nút Đặt hàng -->
            <button type="button" id="btnDatHang" disabled class="btn-order">
              Đặt hàng ngay
            </button>
          </div>
        </div>
      </section>

    </div>
  </main>

  <!-- Modal Xác Nhận Đặt Hàng Thành Công -->
  <div id="modalXacNhan" class="modal-overlay hidden">
    <div class="modal-box" id="modalContent">
      <div class="modal-header">
        <h3>Đặt hàng thành công!</h3>
        <p>Cảm ơn bạn đã lựa chọn dịch vụ của chúng tôi.</p>
      </div>

      <div class="modal-body" id="chiTietDonHang">
        <!-- Nội dung đơn hàng sẽ gắn bằng JS -->
      </div>

      <button type="button" id="btnDongModal" class="btn-close-modal">
        Đóng & Tạo đơn mới
      </button>
    </div>
  </div>

  <script>
    // Hàm định dạng tiền tệ VND
    function formatVND(amount) {
      return amount.toLocaleString('vi-VN') + ' đ';
    }

    // --- Hàm tính tổng tiền toàn bộ danh sách món ---
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

      // Cập nhật giao diện Tổng tiền
      document.getElementById("ketQuaTong").textContent = formatVND(tong);

      // Hiển thị/Ẩn thông báo trống
      const thongBaoTrong = document.getElementById("thongBaoTrong");
      if (rows.length === 0) {
        thongBaoTrong.classList.remove("hidden");
      } else {
        thongBaoTrong.classList.add("hidden");
      }

      // Cập nhật đếm số lượng
      const demSoLuongMon = document.getElementById("demSoLuongMon");
      if (demSoLuongMon) {
        demSoLuongMon.textContent = count + " món";
      }
    }

    // 1. Kiểm tra checkbox (.checked) để Bật / Tắt khóa nút bấm (.disabled)
    const chkDongY = document.getElementById("chkDongY");
    const btnDatHang = document.getElementById("btnDatHang");

    chkDongY.addEventListener("change", function() {
      btnDatHang.disabled = !this.checked; // Tích chọn -> mở khóa (disabled = false)
      btnDatHang.classList.toggle("active", this.checked); // Thêm/bớt class .active
    });

    // 2. Tìm dòng <tr> gần nhất (.closest("tr")), đọc data-price (.dataset.price) và xóa dòng (.remove())
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

    // Cập nhật tổng tiền khi thay đổi số lượng trong danh sách
    dsMon.addEventListener("input", function(e) {
      if (e.target.classList.contains("qty")) {
        if (e.target.value < 1) e.target.value = 1;
        tinhTongTien();
      }
    });

    // 3. Tính năng thêm món mới vào bảng
    const btnThemMon = document.getElementById("btnThemMon");
    const selectMenu = document.getElementById("selectMenu");
    const inputSoLuong = document.getElementById("inputSoLuong");

    btnThemMon.addEventListener("click", function() {
      const selectedOption = selectMenu.options[selectMenu.selectedIndex];
      const tenMon = selectedOption.value;
      const price = parseFloat(selectedOption.dataset.price);
      const qty = parseInt(inputSoLuong.value) || 1;

      // Kiểm tra món đã tồn tại trong danh sách chưa
      const existingRows = dsMon.querySelectorAll("tr");
      let monDaCo = false;

      existingRows.forEach(row => {
        const tenElement = row.querySelector(".ten-mon");
        if (tenElement && tenElement.textContent.trim() === tenMon) {
          const qtyInput = row.querySelector(".qty");
          qtyInput.value = parseInt(qtyInput.value) + qty;
          monDaCo = true;
        }
      });

      // Nếu chưa có thì tạo dòng tr mới
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

      // Reset số lượng chọn về 1 và cập nhật lại tổng tiền
      inputSoLuong.value = 1;
      tinhTongTien();
    });

    // 4. Xử lý nút Đặt hàng ngay -> Hiển thị Modal đơn hàng
    const modalXacNhan = document.getElementById("modalXacNhan");
    const chiTietDonHang = document.getElementById("chiTietDonHang");
    const btnDongModal = document.getElementById("btnDongModal");

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
      modalXacNhan.classList.remove("hidden");
    });

    // 5. Đóng Modal và Reset đơn hàng
    btnDongModal.addEventListener("click", function() {
      modalXacNhan.classList.add("hidden");
      dsMon.innerHTML = "";
      chkDongY.checked = false;
      btnDatHang.disabled = true;
      btnDatHang.classList.remove("active");
      tinhTongTien();
    });

    // Khởi tạo tính tổng tiền lần đầu khi tải trang
    tinhTongTien();
  </script>
</body>
</html>
```

---

## 2. GIẢI THÍCH CHI TIẾT PHẦN HTML & CẤU TRÚC THUỘC TÍNH (`data-*`, Form, Bảng)

### 2.1. Bảng giải thích các thẻ và thuộc tính HTML quan trọng trong bài
| Thuộc tính / Cú pháp HTML | Giải thích chi tiết ý nghĩa & Tác dụng trong bài |
| :--- | :--- |
| `<select id="selectMenu">` | Tạo danh sách thả xuống (Dropdown) để người dùng chọn món ăn/đồ uống. |
| `<option value="Cà phê sữa" data-price="25000">` | • `value="Cà phê sữa"`: Lưu **tên món** để khi chọn xong, JS đọc `selectedOption.value` sẽ lấy được ngay chữ `"Cà phê sữa"`.<br>• `data-price="25000"`: Thuộc tính tùy chỉnh (`data-*`) dùng để **lưu ngầm đơn giá dạng số nguyên (`25000`)** ngay trên thẻ `<option>`, giúp JS đọc bằng `selectedOption.dataset.price` và nhân tiền chính xác mà không cần cắt chuỗi `"25.000 đ"`. |
| `<input type="number" id="inputSoLuong" value="1" min="1" max="99">` | • `type="number"`: Ô chỉ cho phép nhập số và có 2 nút mũi tên tăng/giảm.<br>• `value="1"`: Giá trị mặc định ban đầu là `1`.<br>• `min="1" max="99"`: Giới hạn số lượng tối thiểu là `1` và tối đa là `99`. |
| `<button type="button" id="btnThemMon">` | Đặt `type="button"` (thay vì `submit`) để khi bấm nút `"Thêm Vào Đơn Hàng"`, trình duyệt **không tự động gửi form và không làm tải lại (reload) trang web**. |
| `<tbody id="dsMon">` | Phần thân của bảng danh sách đơn hàng. Đặt `id="dsMon"` ở `<tbody>` (chứ không đặt ở `<table>`) để khi thêm món mới (`dsMon.appendChild(tr)`) hoặc khi xóa trắng đơn hàng (`dsMon.innerHTML = ""`), hàng tiêu đề `<thead>` của bảng vẫn được giữ nguyên! |
| `<td class="gia-mon" data-price="25000">25.000 đ</td>` | Kỹ thuật **tách biệt Hiển thị và Tính toán**:<br>• Nội dung chữ bên trong `<td>` là `"25.000 đ"` (có dấu chấm và chữ `đ` để hiển thị đẹp cho người dùng đọc).<br>• Thuộc tính `data-price="25000"` lưu con số thuần túy `25000` để hàm `tinhTongTien()` lấy ra tính toán. |
| `<input type="checkbox" id="chkDongY">` | Ô tích chọn `"Tôi đồng ý với các điều khoản đặt hàng"`. Trạng thái tích hay chưa tích được đọc qua thuộc tính `chkDongY.checked` (`true` hoặc `false`). |
| `<button type="button" id="btnDatHang" disabled>` | Thuộc tính `disabled` khóa cứng nút `"Đặt hàng ngay"` lúc mới vào trang (không bấm được, chuột hiện biển cấm). Nút này chỉ được mở khóa khi người dùng tích vào `chkDongY`. |

---

## 3. GIẢI THÍCH CHI TIẾT PHẦN CSS & BỐ CỤC GIAO DIỆN

### 3.1. Bảng giải thích các thuộc tính CSS cốt lõi trong bài
| Cú pháp CSS | Giải thích chi tiết ý nghĩa & Tác dụng |
| :--- | :--- |
| `grid-template-columns: 5fr 7fr;` | Chia khung chính `.layout-grid` thành 12 phần theo chiều ngang: **Cột trái (Chọn món) chiếm 5 phần** và **Cột phải (Danh sách món) chiếm 7 phần**. |
| `@media (max-width: 768px) { .layout-grid { grid-template-columns: 1fr; } }` | **Responsive theo thiết bị**: Khi xem trên màn hình nhỏ ($\le 768\text{px}$ như điện thoại/tablet), tự động chuyển từ 2 cột ngang thành **1 cột xếp chồng dọc**. |
| `.hidden { display: none !important; }` | Class tiện ích dùng để **ẩn hoàn toàn** một phần tử khỏi màn hình (dùng cho `#thongBaoTrong` khi giỏ hàng đang có món, và dùng cho `#modalXacNhan` khi chưa bấm Đặt hàng). |
| `.active { background-color: #78350f !important; color: #ffffff !important; cursor: pointer !important; }` | Class tạo hiệu ứng **nút Đặt hàng sáng lên màu nâu đậm** và đổi con trỏ chuột thành bàn tay (`cursor: pointer`) khi người dùng tích chọn đồng ý điều khoản. Từ khóa `!important` đảm bảo màu của `.active` luôn ghi đè lên màu xám mặc định của nút. |
| `.modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5); }` | Tạo lớp màn phủ mờ màu đen trong suốt 50% (`rgba(0,0,0,0.5)`) **trải kín toàn bộ màn hình trình duyệt** (`position: fixed` + 4 cạnh bằng `0`) và căn hộp thoại thông báo (`#modalContent`) nằm ngay chính giữa màn hình bằng `display: flex; align-items: center; justify-content: center;`. |

---

## 4. PHÂN TÍCH TỪNG KHỐI LOGIC JAVASCRIPT TRONG BÀI

Toàn bộ phần `<script>` của chương trình được chia thành **6 khối chức năng rõ ràng** hoạt động phối hợp với nhau:

---

### Khối 1: Hàm định dạng tiền tệ `formatVND(amount)` và Hàm `tinhTongTien()`
```javascript
// Hàm định dạng tiền tệ VND
function formatVND(amount) {
  return amount.toLocaleString('vi-VN') + ' đ';
}

// --- Hàm tính tổng tiền toàn bộ danh sách món ---
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

  // Cập nhật giao diện Tổng tiền
  document.getElementById("ketQuaTong").textContent = formatVND(tong);

  // Hiển thị/Ẩn thông báo trống
  const thongBaoTrong = document.getElementById("thongBaoTrong");
  if (rows.length === 0) {
    thongBaoTrong.classList.remove("hidden");
  } else {
    thongBaoTrong.classList.add("hidden");
  }

  // Cập nhật đếm số lượng
  const demSoLuongMon = document.getElementById("demSoLuongMon");
  if (demSoLuongMon) {
    demSoLuongMon.textContent = count + " món";
  }
}
```

#### 📖 Bảng giải thích từng dòng lệnh trong Khối 1:
| Câu lệnh JavaScript | Giải thích chi tiết cơ chế hoạt động |
| :--- | :--- |
| `amount.toLocaleString('vi-VN') + ' đ'` | Biến một con số (VD: `50000`) thành chuỗi có dấu chấm phân cách hàng nghìn theo chuẩn Việt Nam (`"50.000 đ"`). |
| `const rows = dsMon.querySelectorAll("tr");` | Lấy danh sách tất cả các dòng `<tr>` hiện đang có mặt bên trong `<tbody id="dsMon">`. |
| `rows.forEach(row => { ... })` | Duyệt lặp qua từng dòng món ăn trong bảng để cộng dồn tiền và số lượng. |
| `const giaElement = row.querySelector(".gia-mon");` | Tìm ô `<td>` chứa đơn giá nằm **bên trong dòng `row` hiện tại**. |
| `const price = parseFloat(giaElement.dataset.price) \|\| 0;` | Đọc giá trị từ thuộc tính `data-price="..."` của ô giá, ép kiểu sang số thực (`parseFloat`). Nếu bị lỗi hoặc rỗng thì nhờ `\|\| 0` sẽ tự trả về `0` (tránh lỗi `NaN`). |
| `const qty = parseInt(qtyElement.value) \|\| 0;` | Đọc số lượng đang nhập trong ô `<input class="qty">` của dòng đó và ép sang số nguyên (`parseInt`). |
| `tong += price * qty;` và `count += qty;` | • `tong`: Cộng dồn thành tiền của từng dòng (`Đơn giá × Số lượng`).<br>• `count`: Cộng dồn tổng số ly/phần bánh có trong đơn hàng. |
| `if (rows.length === 0) thongBaoTrong.classList.remove("hidden");` | Kiểm tra nếu bảng không còn dòng nào (`rows.length === 0`) thì gỡ bỏ class `"hidden"` để **hiện thông báo `"Chưa có món nào trong đơn hàng"`**; ngược lại nếu có món thì thêm class `"hidden"` để ẩn thông báo đó đi. |
| `demSoLuongMon.textContent = count + " món";` | Cập nhật nhãn đếm số lượng ở góc phải tiêu đề (VD: `"2 món"`, `"5 món"`). |

---

### Khối 2: Bật / Tắt khóa nút Đặt hàng khi tích Checkbox điều khoản
```javascript
const chkDongY = document.getElementById("chkDongY");
const btnDatHang = document.getElementById("btnDatHang");

chkDongY.addEventListener("change", function() {
  btnDatHang.disabled = !this.checked; // Tích chọn -> mở khóa (disabled = false)
  btnDatHang.classList.toggle("active", this.checked); // Thêm/bớt class .active
});
```

#### 📖 Bảng giải thích từng dòng lệnh trong Khối 2:
| Câu lệnh JavaScript | Giải thích chi tiết cơ chế hoạt động |
| :--- | :--- |
| `chkDongY.addEventListener("change", ...)` | Lắng nghe sự kiện `"change"` mỗi khi người dùng tích hoặc bỏ tích ô checkbox `#chkDongY`. |
| `this.checked` | Trong hàm sự kiện của checkbox, `this.checked` trả về `true` nếu ô đang được tích, và `false` nếu bị bỏ tích. |
| `btnDatHang.disabled = !this.checked;` | Đảo ngược giá trị bằng dấu chấm than `!`:<br>• Khi **đã tích** (`this.checked === true`) $\rightarrow$ `disabled = false` (**mở khóa nút**).<br>• Khi **bỏ tích** (`this.checked === false`) $\rightarrow$ `disabled = true` (**khóa nút lại**). |
| `btnDatHang.classList.toggle("active", this.checked);` | Nếu `this.checked` là `true` thì gắn thêm class `.active` (đổi nút sang màu nâu đậm); nếu `false` thì gỡ bỏ class `.active` (trả nút về màu xám). |

---

### Khối 3: Xóa dòng món ăn & Tự động tính lại tiền khi sửa số lượng (Event Delegation)
```javascript
const dsMon = document.getElementById("dsMon");

// Xử lý bấm nút Xóa
dsMon.addEventListener("click", function(e) {
  if (e.target.classList.contains("btn-xoa")) {
    const row = e.target.closest("tr"); // Tìm đúng dòng <tr> chứa nút vừa bấm
    if (row) {
      row.remove();                     // Xóa dòng đó khỏi bảng
      tinhTongTien();                   // Cập nhật lại tổng tiền tự động
    }
  }
});

// Cập nhật tổng tiền khi thay đổi số lượng trong danh sách
dsMon.addEventListener("input", function(e) {
  if (e.target.classList.contains("qty")) {
    if (e.target.value < 1) e.target.value = 1;
    tinhTongTien();
  }
});
```

#### 📖 Bảng giải thích từng dòng lệnh trong Khối 3:
| Câu lệnh JavaScript | Giải thích chi tiết cơ chế hoạt động |
| :--- | :--- |
| `dsMon.addEventListener("click", function(e) { ... })` | **Kỹ thuật Ủy quyền sự kiện (Event Delegation)**: Thay vì gắn sự kiện cho từng nút Xóa riêng lẻ (sẽ không chạy được với các món mới thêm vào sau), ta gắn **1 sự kiện duy nhất lên thẻ cha `<tbody id="dsMon">`**. |
| `if (e.target.classList.contains("btn-xoa"))` | Kiểm tra xem phần tử mà chuột vừa bấm trúng (`e.target`) có phải là nút mang class `"btn-xoa"` hay không. (Lưu ý trong code gốc có `pointer-events-none` trên thẻ icon `<i>` bên trong nút để đảm bảo khi bấm vào biểu tượng thùng rác thì `e.target` vẫn nhận diện đúng là thẻ `<button class="btn-xoa">`). |
| `const row = e.target.closest("tr");` | Từ nút `"Xóa"` vừa bấm, dò ngược lên thẻ cha/ông gần nhất là dòng `<tr>` đang chứa món đó. |
| `row.remove();` và `tinhTongTien();` | Xóa dòng `<tr>` khỏi bảng HTML, sau đó **gọi lại ngay hàm `tinhTongTien()`** để cập nhật lại Tổng cộng và số món. |
| `dsMon.addEventListener("input", function(e) { ... })` | Lắng nghe sự kiện `"input"` (kích hoạt ngay khi người dùng gõ số hoặc bấm mũi tên tăng/giảm) trên toàn bộ `dsMon`. |
| `if (e.target.classList.contains("qty"))` | Nếu ô đang được gõ đúng là ô số lượng `.qty`, kiểm tra chặn số âm/số 0 (`if (e.target.value < 1) e.target.value = 1;`) rồi gọi `tinhTongTien()` để tiền nhảy ngay lập tức. |

---

### Khối 4: Thêm món mới vào bảng (Cộng dồn nếu trùng món, Tạo dòng mới nếu chưa có)
```javascript
const btnThemMon = document.getElementById("btnThemMon");
const selectMenu = document.getElementById("selectMenu");
const inputSoLuong = document.getElementById("inputSoLuong");

btnThemMon.addEventListener("click", function() {
  const selectedOption = selectMenu.options[selectMenu.selectedIndex];
  const tenMon = selectedOption.value;
  const price = parseFloat(selectedOption.dataset.price);
  const qty = parseInt(inputSoLuong.value) || 1;

  // Kiểm tra món đã tồn tại trong danh sách chưa
  const existingRows = dsMon.querySelectorAll("tr");
  let monDaCo = false;

  existingRows.forEach(row => {
    const tenElement = row.querySelector(".ten-mon");
    if (tenElement && tenElement.textContent.trim() === tenMon) {
      const qtyInput = row.querySelector(".qty");
      qtyInput.value = parseInt(qtyInput.value) + qty;
      monDaCo = true;
    }
  });

  // Nếu chưa có thì tạo dòng tr mới
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

  // Reset số lượng chọn về 1 và cập nhật lại tổng tiền
  inputSoLuong.value = 1;
  tinhTongTien();
});
```

#### 📖 Bảng giải thích từng bước xử lý trong Khối 4:
| Câu lệnh JavaScript | Giải thích chi tiết cơ chế hoạt động |
| :--- | :--- |
| `const selectedOption = selectMenu.options[selectMenu.selectedIndex];` | Lấy ra đúng thẻ `<option>` đang được chọn trong `<select id="selectMenu">`. |
| `selectedOption.value` & `selectedOption.dataset.price` | Lấy **Tên món** từ `.value` (VD: `"Bạc xỉu"`) và lấy **Đơn giá** từ `data-price` (VD: `28000`). |
| `let monDaCo = false;` | Đặt biến cờ hiệu (*flag*) ban đầu là `false` (giả sử món vừa chọn chưa có trong bảng). |
| `if (tenElement && tenElement.textContent.trim() === tenMon)` | Duyệt qua tất cả các dòng đang có trong bảng: nếu phát hiện có dòng nào có tên món (`.ten-mon`) **trùng khớp với món đang thêm**, thì không tạo dòng mới mà chỉ **cộng dồn số lượng** (`qtyInput.value = parseInt(qtyInput.value) + qty`) và bật cờ `monDaCo = true`. |
| `if (!monDaCo) { const tr = document.createElement("tr"); ... dsMon.appendChild(tr); }` | Nếu duyệt hết bảng mà `monDaCo` vẫn là `false` (món hoàn toàn mới), dùng `document.createElement("tr")` tạo 1 dòng mới, gán mã HTML 4 cột `<td>` vào `tr.innerHTML`, rồi gắn vào cuối bảng bằng `dsMon.appendChild(tr)`. |
| `inputSoLuong.value = 1; tinhTongTien();` | Sau khi thêm xong, đưa ô nhập số lượng ở cột trái về lại `1` và gọi `tinhTongTien()` để cập nhật lại tổng tiền mới. |

---

### Khối 5 & 6: Bấm "Đặt hàng ngay" in Hóa Đơn vào Modal & Nút "Đóng / Reset đơn mới"
```javascript
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
  modalXacNhan.classList.remove("hidden");
});

// Đóng Modal và Reset đơn hàng
btnDongModal.addEventListener("click", function() {
  modalXacNhan.classList.add("hidden");
  dsMon.innerHTML = "";
  chkDongY.checked = false;
  btnDatHang.disabled = true;
  btnDatHang.classList.remove("active");
  tinhTongTien();
});
```

#### 📖 Bảng giải thích từng bước xử lý trong Khối 5 & 6:
| Câu lệnh JavaScript | Giải thích chi tiết cơ chế hoạt động |
| :--- | :--- |
| `if (this.disabled) return;` | Kiểm tra bảo vệ: nếu nút Đặt hàng đang bị khóa (`disabled`) thì thoát khỏi hàm ngay lập tức. |
| `if (rows.length === 0) { alert(...); return; }` | Nếu người dùng đã xóa hết sạch các món trong bảng mà bấm Đặt hàng thì bật hộp thoại `alert()` nhắc nhở và dừng lại. |
| `let htmlContent = ...` & `rows.forEach(...)` | Duyệt qua từng dòng `<tr>` trong bảng đơn hàng, lấy Tên món (`.ten-mon`), Đơn giá (`dataset.price`), Số lượng (`.qty`), tính thành tiền từng món (`subtotal = price * qty`) và nối chuỗi tạo thành danh sách `<ul><li>...</li></ul>` kèm dòng Tổng tiền thanh toán. |
| `chiTietDonHang.innerHTML = htmlContent;` | Đổ toàn bộ chuỗi HTML tóm tắt hóa đơn vừa tạo vào bên trong khung `#chiTietDonHang` của Modal. |
| `modalXacNhan.classList.remove("hidden");` | Gỡ bỏ class `"hidden"` để hiển thị hộp thoại **Đặt hàng thành công** lên giữa màn hình. (Trong code gốc có dùng thêm `setTimeout(..., 10)` gỡ `opacity-0` và `scale-95` để tạo hiệu ứng mờ dần phóng to mượt mà). |
| `dsMon.innerHTML = "";` (trong `btnDongModal`) | Khi bấm nút **"Đóng & Tạo đơn mới"**: ẩn Modal đi, xóa trắng toàn bộ các dòng trong `<tbody id="dsMon">`, bỏ tích checkbox (`chkDongY.checked = false`), khóa lại nút Đặt hàng (`btnDatHang.disabled = true`, gỡ class `"active"`), và gọi `tinhTongTien()` để tổng tiền về `0 đ` và hiện thông báo `"Chưa có món nào trong đơn hàng"`. |
