# CHUYÊN ĐỀ 09: JAVASCRIPT BẤT ĐỒNG BỘ, ES6+ HIỆN ĐẠI & BIỂU THỨC CHÍNH QUY (REGEX)

> **Môn học:** Phát triển ứng dụng Web (IS207)  
> **Tài liệu tham khảo chính:** `Chương 3 Javascript - SV.pdf` (Slide 166 - 220)

---

## 1. CƠ CHẾ XỬ LÝ BẤT ĐỒNG BỘ (ASYNCHRONOUS JAVASCRIPT)

### 1.1. Đồng bộ (Synchronous) vs Bất đồng bộ (Asynchronous)
- **Đồng bộ (Blocking):** Các câu lệnh được thực thi tuần tự từ trên xuống dưới. Lệnh sau phải chờ lệnh trước hoàn thành xong mới được chạy. Nếu một tác vụ tốn nhiều thời gian (như gọi API, tải dữ liệu lớn), toàn bộ giao diện trang web sẽ bị đóng băng (*treo trình duyệt*).
- **Bất đồng bộ (Non-blocking):** Các tác vụ tốn thời gian được đẩy ra nền để xử lý song song, trong khi luồng chính của JavaScript vẫn tiếp tục chạy các lệnh tiếp theo mà không bị gián đoạn.

### 1.2. Kiến trúc Event Loop của JavaScript
JavaScript là ngôn ngữ đơn luồng (*Single-threaded*). Để xử lý bất đồng bộ, nó vận hành dựa trên cơ chế **Event Loop**:
1. **Call Stack:** Ngăn xếp chứa các hàm đang được thực thi đồng bộ.
2. **Web APIs:** Môi trường trình duyệt xử lý tác vụ nền (`setTimeout`, DOM Events, Fetch API, AJAX).
3. **Callback Queue (Task Queue):** Hàng đợi chứa các hàm callback đã hoàn tất từ Web API, chờ được đưa vào Call Stack khi Call Stack rỗng.

```mermaid
sequenceDiagram
    participant CallStack as Call Stack (Luồng chính)
    participant WebAPI as Web APIs (Nền trình duyệt)
    participant Queue as Callback Queue
    participant Loop as Event Loop

    CallStack->>WebAPI: Gọi setTimeout(callback, 2000)
    CallStack->>CallStack: Tiếp tục chạy code bên dưới ngay lập tức
    Note over WebAPI: Đếm ngược 2000ms...
    WebAPI->>Queue: Đẩy callback vào hàng đợi
    Loop->>CallStack: Kiểm tra: Call Stack đã rỗng chưa?
    Loop->>CallStack: Đẩy callback từ Queue vào Call Stack để thực thi
```

---

## 2. CALLBACK HELL, PROMISE & ASYNC / AWAIT

### 2.1. Hàm Callback & Vấn đề Callback Hell
- **Callback:** Hàm được truyền vào làm đối số của một hàm khác để được gọi lại sau khi tác vụ bất đồng bộ hoàn tất.
- **Callback Hell (Pyramid of Doom):** Khi có nhiều tác vụ bất đồng bộ phụ thuộc kết quả liên tiếp nhau, các hàm callback bị lồng nhau quá sâu khiến mã nguồn trở thành hình tam giác, cực kỳ khó đọc, khó gỡ lỗi và bảo trì.

### 2.2. Đối tượng `Promise` (Giải pháp chuẩn mực của ES6)
Một `Promise` đại diện cho kết quả của một tác vụ bất đồng bộ trong tương lai, luôn ở **1 trong 3 trạng thái**:
1. **`Pending`:** Đang chờ xử lý, chưa hoàn thành.
2. **`Fulfilled` (Resolved):** Tác vụ hoàn thành thành công $\rightarrow$ trả về dữ liệu qua hàm `resolve(data)`.
3. **`Rejected`:** Tác vụ thất bại do lỗi $\rightarrow$ kích hoạt hàm `reject(error)`.

#### Cú pháp khởi tạo và tiêu thụ Promise:
```javascript
// 1. Tạo Promise
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: "Thành Công" });
      } else {
        reject("Lỗi: Mã người dùng không hợp lệ!");
      }
    }, 1000);
  });
}

// 2. Tiêu thụ Promise bằng Promise Chaining
fetchUserData(1)
  .then(user => {
    console.log("Thành công:", user);
    return user.name; // Trả tiếp cho .then() sau
  })
  .then(name => {
    console.log("Tên người dùng:", name);
  })
  .catch(err => {
    console.error("Bắt lỗi:", err);
  })
  .finally(() => {
    console.log("Tác vụ kết thúc (luôn chạy)");
  });
```

### 2.3. Cú pháp Hiện Đại: `async` / `await` (ES7+)
Giúp viết mã bất đồng bộ trông tự nhiên và tuần tự như mã đồng bộ:
- Đặt từ khóa `async` trước khai báo hàm $\rightarrow$ hàm đó sẽ luôn tự động trả về một Promise.
- Từ khóa `await` tạm dừng việc thực thi của hàm `async` cho đến khi Promise giải quyết xong (chỉ được dùng bên trong hàm `async`).
- Bắt lỗi bằng khối `try...catch` quen thuộc.

```javascript
async function loadUserData() {
  try {
    console.log("Bắt đầu tải dữ liệu...");
    let user = await fetchUserData(1); // Chờ Promise hoàn thành
    console.log("Dữ liệu nhận được:", user.name);
  } catch (error) {
    console.error("Xảy ra lỗi:", error);
  }
}
loadUserData();
```

---

## 3. CÁC TÍNH NĂNG MẠNH MẼ CỦA ES6+ (MODERN JAVASCRIPT)

### 3.1. Arrow Functions (Hàm mũi tên)
- Cú pháp ngắn gọn: `const add = (a, b) => a + b;`
- **Đặc tính then chốt:** Arrow Function **không có từ khóa `this` riêng**. Nó kế thừa giá trị `this` từ phạm vi bao quanh nó (*Lexical scoping*).

### 3.2. Template Literals (Chuỗi nội suy với backticks)
- Bao chuỗi trong cặp dấu huyền (`` ` ``).
- Cho phép nhúng trực tiếp biến/biểu thức qua cú pháp `${biểu thức}` và hỗ trợ viết chuỗi nhiều dòng mà không cần dấu nối `\n` hay `+`:
  ```javascript
  let name = "An", score = 9.5;
  let msg = `Xin chào ${name}, điểm tổng kết của bạn là ${score}!`;
  ```

### 3.3. Destructuring Assignment (Phá vỡ cấu trúc)
Trích xuất nhanh các giá trị từ Object hoặc Array vào các biến độc lập:
```javascript
// Destructuring với Object:
const student = { id: "24520496", fullname: "Nguyễn Văn An", gpa: 8.8 };
const { id, fullname } = student;
console.log(fullname); // "Nguyễn Văn An"

// Destructuring với Array:
const scores = [8.5, 9.0, 7.5];
const [math, literature] = scores; // math = 8.5, literature = 9.0
```

### 3.4. Toán tử Spread (`...`) và Tham số Rest (`...`)
- **Spread (Mở rộng):** Bung các phần tử của mảng hoặc thuộc tính của object:
  ```javascript
  const arr1 = [1, 2], arr2 = [3, 4];
  const combined = [...arr1, ...arr2]; // [1, 2, 3, 4]

  const user = { name: "An" };
  const updatedUser = { ...user, age: 20 }; // { name: "An", age: 20 }
  ```
- **Rest (Gom lại):** Gom tất cả các đối số truyền vào hàm thành một mảng:
  ```javascript
  function sumAll(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
  }
  console.log(sumAll(1, 2, 3, 4, 5)); // 15
  ```

### 3.5. Lớp (Classes) trong ES6
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  sayHello() {
    return `Tôi là ${this.name}`;
  }
}

class Student extends Person {
  constructor(name, age, mssv) {
    super(name, age); // Gọi hàm khởi tạo của lớp cha
    this.mssv = mssv;
  }
}
```

---

## 4. BIỂU THỨC CHÍNH QUY (REGULAR EXPRESSION - REGEX)

### 4.1. Khái niệm & Cú pháp khai báo
Regex là một chuỗi mẫu dùng để tìm kiếm, đối sánh hoặc kiểm tra tính hợp lệ của định dạng văn bản:
```javascript
let pattern = /chuỗi_mẫu/flags;
// hoặc: let pattern = new RegExp("chuỗi_mẫu", "flags");
```
- **Các cờ (Flags):**
  - `g`: Toàn cục (Global - tìm tất cả các vị trí khớp).
  - `i`: Không phân biệt hoa/thường (Case-insensitive).
  - `m`: Tìm kiếm trên nhiều dòng (Multiline).

### 4.2. Bảng ký hiệu Regex cốt lõi (Bắt buộc phải thuộc)

| Ký hiệu | Ý nghĩa | Ví dụ |
| :---: | :--- | :--- |
| `^` | Bắt đầu chuỗi | `^A` $\rightarrow$ Chuỗi bắt đầu bằng chữ 'A' |
| `$` | Kết thúc chuỗi | `Z$` $\rightarrow$ Chuỗi kết thúc bằng chữ 'Z' |
| `.` | Bất kỳ 1 ký tự nào (trừ ngắt dòng) | `a.c` $\rightarrow$ khớp "abc", "a1c" |
| `\d` | Một chữ số bất kỳ (`[0-9]`) | `\d\d` $\rightarrow$ 2 chữ số kề nhau |
| `\D` | Bất kỳ ký tự nào **không phải chữ số** | — |
| `\w` | Ký tự chữ, số hoặc gạch dưới (`[a-zA-Z0-9_]`) | `\w+` |
| `\W` | Ký tự đặc biệt (không phải `\w`) | — |
| `\s` | Khoảng trắng (space, tab, newline) | — |
| `[abc]` | Khớp đúng một ký tự bất kỳ trong tập hợp | `[0-9]` (chữ số), `[a-z]` (chữ thường) |
| `[^abc]` | Khớp ký tự **không nằm trong** tập hợp | `[^0-9]` (không phải số) |
| `(abc)` | Nhóm ký tự (Capturing group) | `(\d{2})-(\d{2})` |
| `a|b` | Khớp hoặc `a` hoặc `b` | `(Nam|Nữ)` |

### 4.3. Các lượng từ (Quantifiers)
- `*`: Xuất hiện **0 hoặc nhiều lần** (tùy ý).
- `+`: Xuất hiện **ít nhất 1 lần** trở lên.
- `?`: Xuất hiện **0 hoặc 1 lần** (có hoặc không).
- `{n}`: Xuất hiện **chính xác $n$ lần**.
- `{n,}`: Xuất hiện **tối thiểu $n$ lần**.
- `{n,m}`: Xuất hiện **từ $n$ đến $m$ lần**.

### 4.4. Các phương thức kiểm tra Regex
- **`regex.test(str)` (Thường dùng nhất để validate Form):** Trả về `true` nếu chuỗi khớp mẫu, ngược lại trả về `false`.
- **`str.match(regex)`:** Trích xuất mảng các chuỗi con khớp mẫu.
- **`str.replace(regex, newStr)`:** Thay thế các chuỗi khớp mẫu thành chuỗi mới.

### 4.5. Các mẫu Regex thực tế thường ra trong đề thi
1. **Kiểm tra Mã số sinh viên UIT (8 chữ số, ví dụ 24520496):**
   ```javascript
   const regexMSSV = /^2[0-9]{7}$/;
   ```
2. **Kiểm tra Số điện thoại Việt Nam (10 số, bắt đầu bằng 03, 05, 07, 08, 09):**
   ```javascript
   const regexPhone = /^0[35789][0-9]{8}$/;
   ```
3. **Kiểm tra Địa chỉ Email hợp lệ:**
   ```javascript
   const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   ```
4. **Kiểm tra Định dạng Ngày sinh `dd/mm/yyyy`:**
   ```javascript
   const regexDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
   ```

---

## 5. BÀI TẬP MẪU: FORM VALIDATION TOÀN DIỆN VỚI REGEX

```javascript
function validateRegisterForm() {
  const mssv = document.getElementById("txtMSSV").value.trim();
  const email = document.getElementById("txtEmail").value.trim();
  const phone = document.getElementById("txtPhone").value.trim();
  const errBox = document.getElementById("errorMsg");

  // Định nghĩa các biểu thức Regex
  const patternMSSV = /^2[0-9]{7}$/;
  const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const patternPhone = /^0[35789]\d{8}$/;

  if (!patternMSSV.test(mssv)) {
    errBox.textContent = "MSSV không hợp lệ! Bắt buộc phải có 8 chữ số và bắt đầu bằng số 2.";
    return false;
  }

  if (!patternEmail.test(email)) {
    errBox.textContent = "Định dạng Email không đúng!";
    return false;
  }

  if (!patternPhone.test(phone)) {
    errBox.textContent = "Số điện thoại phải gồm 10 số và thuộc đầu số mạng Việt Nam!";
    return false;
  }

  errBox.textContent = "";
  alert("Dữ liệu hợp lệ! Đang gửi thông tin...");
  return true;
}
```
