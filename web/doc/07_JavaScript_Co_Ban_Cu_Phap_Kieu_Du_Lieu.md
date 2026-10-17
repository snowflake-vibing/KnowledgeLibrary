# CHUYÊN ĐỀ 07: JAVASCRIPT CƠ BẢN, CÚ PHÁP, BIẾN & KIỂU DỮ LIỆU

> **Môn học:** Phát triển ứng dụng Web (IS207)  
> **Tài liệu tham khảo chính:** `Chương 3 Javascript - SV.pdf` (Slide 1 - 102)

---

## 1. TỔNG QUAN VỀ JAVASCRIPT & LỊCH SỬ HÌNH THÀNH

### 1.1. JavaScript là gì?
- **JavaScript** là ngôn ngữ lập trình kịch bản (*Scripting Language*), hướng đối tượng theo nguyên mẫu (*Prototype-based*), kiểu động (*Dynamic Typing*) và được thông dịch trực tiếp bởi trình duyệt (*Interpreted*).
- Đóng vai trò là "bộ não" xử lý logic, hành vi tương tác và chuyển động của trang web (kết hợp với HTML định hình cấu trúc và CSS định dạng giao diện).

### 1.2. Bảng so sánh chi tiết: Java vs JavaScript (Trọng tâm thi)

| Tiêu chí | Java | JavaScript |
| :--- | :--- | :--- |
| **Bản chất ngôn ngữ** | Ngôn ngữ lập trình hướng đối tượng độc lập, đa nền tảng. | Ngôn ngữ kịch bản nhẹ chạy tích hợp cùng HTML/CSS trong trình duyệt. |
| **Cơ chế thực thi** | Ngôn ngữ **biên dịch (Compiled)** sang Bytecode rồi chạy trên máy ảo JVM. | Ngôn ngữ **thông dịch (Interpreted)** hoặc biên dịch Just-In-Time (JIT) bởi JavaScript Engine (như V8 của Chrome). |
| **Kiểu dữ liệu (Typing)** | **Kiểu tĩnh (Static Typing)**: Bắt buộc khai báo kiểu dữ liệu cho biến khi viết code (`int x = 10;`). | **Kiểu động (Dynamic Typing)**: Biến tự động nhận kiểu dựa vào giá trị được gán và có thể đổi kiểu lúc runtime. |
| **Phụ thuộc môi trường** | Chạy độc lập trên hệ điều hành có cài JVM. | Chạy chủ yếu trên trình duyệt web Client (hoặc Node.js ở Server). |
| **Lý do có chữ "Java"** | Tên gọi xuất phát từ hạt cà phê Java. | Ban đầu có tên là **Mocha**, sau đổi thành **LiveScript**, và cuối cùng đổi thành **JavaScript** vào năm 1995 như một **chiến lược marketing** ăn theo sự nổi tiếng của Java thời điểm đó. Hai ngôn ngữ **hoàn toàn khác nhau**. |

### 1.3. Ba cách nhúng JavaScript vào trang web HTML
1. **Inline (Nội dòng trong thẻ):** Gán trực tiếp vào thuộc tính sự kiện của thẻ HTML:
   ```html
   <button onclick="alert('Xin chào!')">Bấm vào đây</button>
   ```
2. **Internal (Nội bộ trang):** Đặt code bên trong cặp thẻ `<script>` ở `<head>` hoặc cuối thẻ `<body>`:
   ```html
   <script>
     console.log("Đoạn mã chạy trong trang");
   </script>
   ```
3. **External (File riêng biệt `.js` - Chuẩn khuyến nghị):**
   ```html
   <script src="js/main.js"></script>
   ```
   - **Vị trí đặt thẻ script:** Khuyến nghị đặt trước thẻ đóng `</body>` để tránh chặn quá trình phân tích HTML (*Render-blocking*).
   - **Thuộc tính `defer` và `async`:**
     - `<script src="app.js" defer></script>`: Tải file song song với nạp HTML và chỉ thực thi khi HTML đã nạp xong (giữ đúng thứ tự file).
     - `<script src="analytics.js" async></script>`: Tải song song và thực thi ngay lập tức khi vừa tải xong (không đảm bảo thứ tự).

---

## 2. BIẾN, PHẠM VI (SCOPE) & CƠ CHẾ HOISTING

### 2.1. So sánh `var`, `let` và `const`
| Tiêu chí | `var` (Cổ điển) | `let` (ES6) | `const` (ES6) |
| :--- | :--- | :--- | :--- |
| **Phạm vi (Scope)** | **Function scope** (toàn hàm) hoặc Global. | **Block scope** (trong cặp ngoặc `{}`). | **Block scope** (trong cặp ngoặc `{}`). |
| **Hoisting** | **Có**. Khởi tạo biến với giá trị `undefined`. | Có hoisting nhưng nằm trong **Temporal Dead Zone (TDZ)** $\rightarrow$ báo lỗi `ReferenceError` nếu dùng trước khi khai báo. | Nằm trong **TDZ** $\rightarrow$ báo lỗi `ReferenceError` nếu dùng trước. |
| **Khai báo lại trong cùng scope** | **Cho phép** (dễ gây lỗi ghi đè ngoài ý muốn). | **Không cho phép** (SyntaxError). | **Không cho phép** (SyntaxError). |
| **Gán lại giá trị** | Cho phép | Cho phép | **Không cho phép** gán lại. Bắt buộc phải khởi tạo giá trị ngay khi khai báo. |

> **Lưu ý với `const` Object/Array:**  
> Không thể gán `const a = 5; a = 10;`, nhưng nếu gán `const user = { name: "An" };`, ta **hoàn toàn có thể sửa đổi thuộc tính** `user.name = "Bình"` vì địa chỉ vùng nhớ tham chiếu của object không hề thay đổi.

---

## 3. KIỂU DỮ LIỆU, DYNAMIC TYPING & TYPE COERCION

### 3.1. Các kiểu dữ liệu trong JavaScript
1. **Kiểu nguyên thủy (Primitive Types):** `Number`, `String`, `Boolean`, `Null`, `Undefined`, `Symbol`, `BigInt`.
2. **Kiểu tham chiếu (Reference Types):** `Object`, `Array`, `Function`, `Date`, `RegExp`.

### 3.2. Dynamic Typing (Kiểu dữ liệu động)
Kiểu dữ liệu của biến được quyết định lúc runtime theo giá trị nó lưu giữ:
```javascript
let data = 100;         // data là kiểu Number
data = "Trường ĐH UIT"; // data tự động chuyển thành String
```

### 3.3. Type Coercion (Ép kiểu ngầm định)
Khi thực hiện các phép toán giữa các kiểu khác nhau:
- **Phép toán `+`:** Nếu có ít nhất một toán hạng là String, JavaScript sẽ **chuyển toán hạng còn lại thành String và thực hiện phép nối chuỗi**:
  ```javascript
  console.log(1 + "2");      // "12" (String)
  console.log("Kết quả: " + 10 + 20); // "Kết quả: 1020"
  console.log(10 + 20 + " đồng");     // "30 đồng"
  ```
- **Các phép toán `-`, `*`, `/`, `%`:** JavaScript sẽ **tự động ép chuỗi sang kiểu Number** để tính:
  ```javascript
  console.log("10" - 2);     // 8 (Number)
  console.log("6" * "3");    // 18 (Number)
  console.log("abc" - 5);    // NaN (vì "abc" không ép sang số được)
  ```
- **Ép kiểu tường minh:** Dùng `parseInt()`, `parseFloat()`, `Number()`, `String()`, `Boolean()`.

### 3.4. So sánh lỏng (`==`) vs So sánh nghiêm ngặt (`===`)
- **`==` (Loose Equality):** Tự động ép kiểu hai toán hạng về cùng loại rồi mới so sánh giá trị:
  `"5" == 5` $\rightarrow$ `true`; `0 == false` $\rightarrow$ `true`.
- **`===` (Strict Equality):** So sánh cả **Kiểu dữ liệu** và **Giá trị**, không có ép kiểu:
  `"5" === 5` $\rightarrow$ `false` (vì String khác Number). **Khuyến nghị luôn dùng `===` trong lập trình**.

---

## 4. PHÂN BIỆT SÂU NULL, UNDEFINED VÀ NAN

| Giá trị | Ý nghĩa | Kiểu dữ liệu (`typeof`) | Tình huống xuất hiện |
| :--- | :--- | :---: | :--- |
| **`undefined`** | Biến đã được khai báo nhưng **chưa được gán giá trị**. | `"undefined"` | Khai báo `let x;`; truy cập thuộc tính không tồn tại; hàm không có lệnh `return`. |
| **`null`** | Đại diện cho giá trị **rỗng / không tồn tại**, do lập trình viên **chủ động gán**. | `"object"` *(lỗi thiết kế lịch sử của JS)* | `let x = null;` khi muốn xóa trắng tham chiếu. |
| **`NaN`** *(Not a Number)* | Đại diện cho kết quả của một **phép tính số học không hợp lệ**. | **`"number"`** | `0 / 0`, `Math.sqrt(-1)`, `parseInt("hello")`, `NaN + 5`. |

### Các phép so sánh đặc biệt cần nhớ khi đi thi:
```javascript
null == undefined   // true  (vì đều biểu thị tính chất rỗng)
null === undefined  // false (khác kiểu dữ liệu)

NaN == NaN          // false (NaN không bằng chính nó!)
NaN === NaN         // false
// Để kiểm tra NaN, bắt buộc dùng:
Number.isNaN(value); // hoặc isNaN(value)
```

---

## 5. TOÁN TỬ NÂNG CAO & HÀM ĐẶC BIỆT

### 5.1. Toán tử ba ngôi lồng nhau (Ternary Operator)
Cú pháp: `(điều_kiện) ? giá_trị_đúng : giá_trị_sai;`
```javascript
let score = 8.5;
let rank = score >= 9 ? "Xuất sắc" :
           score >= 8 ? "Giỏi" :
           score >= 6.5 ? "Khá" : "Trung bình";
console.log(rank); // "Giỏi"
```

### 5.2. Toán tử Nullish Coalescing (`??`)
- Cú pháp: `a ?? b`
- **Quy tắc:** Trả về `b` **CHỈ KHI `a` là `null` hoặc `undefined`**; ngược lại trả về `a`.
- **Khác biệt sống còn với toán tử `||` (OR):**
  - Toán tử `||` lấy vế phải khi vế trái là bất kỳ giá trị *Falsy* nào (`false`, `0`, `""`, `null`, `undefined`, `NaN`).
  ```javascript
  let count = 0;
  console.log(count || 10); // 10 (vì 0 bị coi là falsy)
  console.log(count ?? 10); // 0 (vì 0 KHÔNG phải null/undefined!)
  ```

### 5.3. Logical Nullish Assignment (`??=`)
Cú pháp: `a ??= b` (tương đương `a ?? (a = b)`). Nếu `a` là `null` hoặc `undefined` thì gán `a = b`.
```javascript
let config = null;
config ??= { theme: "dark" };
console.log(config); // { theme: "dark" }
```

### 5.4. Hàm `eval()` và Rủi ro bảo mật
- **Chức năng:** Thực thi một chuỗi ký tự như một đoạn mã hoặc biểu thức JavaScript:
  ```javascript
  let x = 10, y = 20;
  console.log(eval("x + y * 2")); // 50
  ```
- **Rủi ro:** `eval()` rất chậm và **cực kỳ nguy hiểm** vì kẻ tấn công có thể chèn mã độc để thực thi thông qua lỗ hổng **XSS (Cross-Site Scripting)**. Khuyến cáo không sử dụng `eval()` trong thực tế.

---

## 6. ĐỐI TƯỢNG (OBJECT), TỪ KHÓA `THIS` & ĐỐI TƯỢNG TÍCH HỢP

### 6.1. Từ khóa `this`
- Trong phương thức của đối tượng: `this` trỏ về **chính đối tượng đó**.
- Trong hàm thông thường (chế độ non-strict): `this` trỏ về **đối tượng toàn cục `window`**.
- Trong hàm khởi tạo (Constructor): `this` đại diện cho **thể hiện đối tượng mới** được sinh ra bởi `new`.

```javascript
function Student(id, name) {
  this.id = id;
  this.name = name;
  this.showInfo = function() {
    return this.id + " - " + this.name;
  };
}
let s1 = new Student("24520496", "Thành Công");
console.log(s1.showInfo());
```

### 6.2. Vòng lặp `for...in` vs `for...of`
- `for (let key in object)`: Duyệt qua các **tên thuộc tính (keys)** của đối tượng.
- `for (let value of array)`: Duyệt qua các **phần tử (values)** của mảng hoặc chuỗi.

### 6.3. Câu lệnh `with`
Cung cấp cú pháp viết tắt để truy xuất trực tiếp các thuộc tính của một đối tượng mà không cần lặp lại tên đối tượng đó:
```javascript
with (Math) {
  let r = 5;
  let area = PI * r * r; // tương đương Math.PI * r * r
}
```
*(Lưu ý: Câu lệnh `with` bị cấm trong Strict Mode vì gây khó khăn cho việc tối ưu mã nguồn).*

### 6.4. Các phương thức tích hợp sẵn cốt lõi
1. **Đối tượng `Math`:** `Math.round()` (làm tròn số), `Math.floor()` (làm tròn xuống), `Math.ceil()` (làm tròn lên), `Math.abs()`, `Math.max()`, `Math.min()`, `Math.random()` (sinh số thực ngẫu nhiên từ 0 đến < 1).
2. **Đối tượng `Date`:**
   - Lấy năm: `date.getFullYear()`
   - Lấy tháng: `date.getMonth()` (lưu ý: tháng tính từ **0 đến 11**)
   - Lấy ngày trong tháng: `date.getDate()`
   - Lấy thứ trong tuần: `date.getDay()` (0 là Chủ nhật, 1 là Thứ 2...)
3. **Đối tượng `Array`:**
   - `push()`: Thêm phần tử vào cuối mảng.
   - `pop()`: Lấy và xóa phần tử ở cuối mảng.
   - `unshift()`: Thêm phần tử vào đầu mảng.
   - `shift()`: Lấy và xóa phần tử ở đầu mảng.
   - `splice(start, deleteCount, item1...)`: Thêm/xóa phần tử linh hoạt tại vị trí bất kỳ.
   - `join(separator)`: Ghép các phần tử mảng thành chuỗi.
