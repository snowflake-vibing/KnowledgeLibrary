# Quy Chuẩn & Nguyên Tắc Thiết Kế BPMN 2.0 Cho Draw.io (XML Guideline)
### *Phiên bản 3.0: Chuẩn Ký Hiệu Gốc `mxgraph.bpmn`, Không Màu (Monochrome) & Swimlane Xếp Dọc Chuẩn*

> **Tài liệu tham chiếu:**
> 1. *BPMN và sự lợi hại của nó* - Thinhnotes
> 2. *Giải ngố các ký hiệu BPMN (Bản đồ 6 cục chính)* - Thinhnotes
> 3. *Quẩy tới bến với BPMN (Quy trình 3 bước & 5 cấp độ sai lầm kinh điển)* - Thinhnotes
> 4. Thư viện Stencil gốc `mxgraph.bpmn` của Draw.io (diagrams.net) & Chuẩn OMG BPMN 2.0

---

## PHẦN 1: 3 QUY TẮC BẮT BUỘC KHI VIẾT CODE XML CHO DRAW.IO

### 1.1. Bắt buộc dùng bộ Block Ký hiệu chuẩn BPMN 2.0 (`mxgraph.bpmn.*`)
* **Tuyệt đối KHÔNG** dùng các hình cơ bản vô hồn như hình chữ nhật thường (`rounded=1`), hình thoi thường (`rhombus`), hay hình tròn thường (`ellipse`).
* **BẮT BUỘC** sử dụng bộ thư viện Stencil BPMN 2.0 gốc của Draw.io (`shape=mxgraph.bpmn.task` và `shape=mxgraph.bpmn.shape`) để hiển thị đúng các icon nghiệp vụ:
  * **Task:** Phải có icon loại tác vụ ở góc trên bên trái (`taskMarker=user` hình người, `service` bánh răng, `manual` bàn tay, `send` phong bì đen, `receive` phong bì trắng, `businessRule` bảng luật).
  * **Gateway:** Phải có ký hiệu cổng bên trong hình thoi (`symbol=exclusiveGw` chữ `X`, `symbol=parallelGw` dấu `+`, `symbol=inclusiveGw` vòng tròn `O`).
  * **Event:** Phải có viền chuẩn (đơn cho Start, kép cho Intermediate, đậm dày cho End) và biểu tượng sự kiện bên trong (`symbol=general`, `symbol=message`, `symbol=timer`, `symbol=terminate`, `symbol=error`).
  * **Data Object / Data Store:** Dùng đúng `shape=mxgraph.bpmn.data_object` (tờ giấy gấp góc) và `shape=datastore` (thùng dữ liệu).

### 1.2. Swimlane phải xếp chồng theo HÀNG DỌC (Từ trên xuống dưới)
* **Lỗi nghiêm trọng cần tránh:** Trong Draw.io, nếu gắn `childLayout=stackLayout;horizontal=0;` mà không có `horizontalStack=0`, Draw.io sẽ xếp các Swimlane nối đuôi nhau theo **hàng ngang** (`[Lane 1] -> [Lane 2] -> [Lane 3]`), làm sơ đồ bị kéo giãn ngang hàng chục ngàn pixel và làm toàn bộ dây nối bị trôi ra ngoài không gian trống.
* **Quy tắc bắt buộc:**
  * **Không dùng `childLayout=stackLayout`** trên Pool (hoặc nếu dùng phải đặt `horizontalStack=0`).
  * Định vị tọa độ các Swimlane con xếp chồng **theo hàng dọc từ trên xuống dưới** (`x="30"` cố định, `y` tăng dần theo chiều dọc: Lane 1 tại `y=0`, Lane 2 tại `y=150`, Lane 3 tại `y=340`, Lane 4 tại `y=480`, Lane 5 tại `y=640`).
  * Mỗi Swimlane có thanh tiêu đề nằm dọc bên trái (`swimlane;html=1;startSize=30;horizontal=0;`).

### 1.3. KHÔNG ĐỂ MÀU GÌ HẾT cho các Block (Pure Monochrome / Theme-Adaptive)
* **Tuyệt đối KHÔNG** gán các thuộc tính mã màu cứng như `fillColor=#...`, `strokeColor=#...`, `fontColor=#...`, hay `labelBackgroundColor=#ffffff` vào các Block và đường nối.
* **Lý do:** Khi không gắn màu cứng, Draw.io sẽ sử dụng chế độ mặc định (Monochrome), tự động tương thích hoàn hảo 100% với cả **Dark Mode (Nền tối)** lẫn **Light Mode (Nền sáng)**, không gây ra các mảng màu lòe loẹt hoặc các ô chữ nền trắng bị chói trên nền đen.

---

## PHẦN 2: BẢNG MÃ STYLE XML CHUẨN CHO CÁC BLOCK BPMN 2.0 TRÊN DRAW.IO

### 2.1. Pools & Swimlanes (Xếp theo hàng dọc từ trên xuống dưới)
* **Pool (Hồ bơi):**
  ```text
  swimlane;html=1;startSize=45;horizontal=0;collapsible=0;fontStyle=1;fontSize=12;whiteSpace=wrap;
  ```
* **Lane (Làn bơi con bên trong Pool):**
  ```text
  swimlane;html=1;startSize=45;horizontal=0;collapsible=0;fontStyle=1;fontSize=11;whiteSpace=wrap;
  ```
  *(Lưu ý quan trọng chống tràn chữ tiêu đề dọc: Đặt `startSize=45` và ngắt dòng bằng `&#xa;` cho các tên Pool/Lane dài trên 15 ký tự như `KHÁCH HÀNG B2B&#xa;(Thu mua &amp; Kỹ thuật)` để chiều dài chuỗi chữ sau khi xoay dọc 90° luôn nhỏ hơn `height` của Pool/Lane).*

### 2.2. Các loại BPMN Tasks (`shape=mxgraph.bpmn.task`)
Kích thước chuẩn: **`width="160" height="70"`** (đảm bảo icon góc trái không đè vào chữ tiếng Việt).

| Loại Task | Mã `style` chuẩn trong Draw.io XML | Ý nghĩa nghiệp vụ |
| :--- | :--- | :--- |
| **User Task** (Hình người) | `shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;taskMarker=user;align=center;verticalAlign=middle;spacingLeft=18;spacingRight=6;` | Người dùng thao tác trên phần mềm Odoo ERP. |
| **Manual Task** (Bàn tay) | `shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;taskMarker=manual;align=center;verticalAlign=middle;spacingLeft=18;spacingRight=6;` | Thao tác vật lý ngoài đời thực (đóng gói mẫu, giao hàng). |
| **Service Task** (Bánh răng) | `shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;taskMarker=service;align=center;verticalAlign=middle;spacingLeft=18;spacingRight=6;` | Hệ thống Odoo tự động xử lý ngầm (tự tạo MO, tính giá). |
| **Send Task** (Phong bì đen) | `shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;taskMarker=send;align=center;verticalAlign=middle;spacingLeft=18;spacingRight=6;` | Gửi thông điệp/báo giá/hợp đồng cho đối tác ngoài. |
| **Receive Task** (Phong bì trắng) | `shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;taskMarker=receive;align=center;verticalAlign=middle;spacingLeft=18;spacingRight=6;` | Tiếp nhận thông điệp/kết quả phản hồi từ đối tác. |
| **Business Rule Task** (Bảng) | `shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;taskMarker=businessRule;align=center;verticalAlign=middle;spacingLeft=18;spacingRight=6;` | Kiểm tra quy tắc nghiệp vụ (ma trận duyệt, hạn mức). |
| **Sub-Process** (Dấu `+` đáy) | Thêm `isLoopSub=1;` vào chuỗi style của Task | Quy trình con có thể phân rã chi tiết. |
| **Loop Task** (Mũi tên xoay) | Thêm `isLoopStandard=1;` vào chuỗi style của Task | Tác vụ lặp lại tuần tự (ví dụ: đàm phán lại báo giá). |
| **Multi-Instance** (`\|\|\|`) | Thêm `isLoopMultiParallel=1;` hoặc `isLoopMultiSeq=1;` | Lặp trên nhiều tập dữ liệu (Data Set). |

### 2.3. Các loại BPMN Gateways (`shape=mxgraph.bpmn.shape`)
Kích thước chuẩn: **`width="50" height="50"`**. Nhãn câu hỏi đặt ở ngoài (`verticalLabelPosition=top;verticalAlign=bottom;` hoặc `bottom`/`top`).

| Loại Gateway | Mã `style` chuẩn trong Draw.io XML | Ký hiệu bên trong |
| :--- | :--- | :---: |
| **Exclusive Gateway (XOR)** | `shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=top;verticalAlign=bottom;align=center;perimeter=rhombusPerimeter;background=gateway;outline=none;symbol=exclusiveGw;` | Chữ **`X`** |
| **Parallel Gateway (AND)** | `shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=top;verticalAlign=bottom;align=center;perimeter=rhombusPerimeter;background=gateway;outline=none;symbol=parallelGw;` | Dấu **`+`** |
| **Inclusive Gateway (OR)** | `shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=top;verticalAlign=bottom;align=center;perimeter=rhombusPerimeter;background=gateway;outline=none;symbol=inclusiveGw;` | Vòng tròn **`O`** |
| **Event-Based Gateway** | `shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=top;verticalAlign=bottom;align=center;perimeter=rhombusPerimeter;background=gateway;outline=boundInt;symbol=multiple;` | Ngũ giác lồng |

### 2.4. Các loại BPMN Events (`shape=mxgraph.bpmn.shape`)
Kích thước chuẩn: **`width="40" height="40"`**. Nhãn đặt ở dưới đáy (`verticalLabelPosition=bottom;verticalAlign=top;`).

| Loại Event | Mã `style` chuẩn trong Draw.io XML | Đặc điểm nhận diện |
| :--- | :--- | :--- |
| **Start Event (Chuẩn)** | `shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outline=standard;symbol=general;` | 1 vòng tròn nét mảnh. |
| **Start Message Event** | `shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outline=standard;symbol=message;` | 1 vòng tròn mảnh + Phong bì trắng. |
| **Intermediate Message (Catch)** | `shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outline=boundInt;symbol=message;` | 2 vòng tròn + Phong bì trắng. |
| **Intermediate Timer Event** | `shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outline=boundInt;symbol=timer;` | 2 vòng tròn + Đồng hồ. |
| **End Event (Chuẩn)** | `shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outline=end;symbol=general;` | 1 vòng tròn viền dày đậm. |
| **Terminate End Event** | `shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outline=end;symbol=terminate;` | Viền dày đậm + Hình tròn đặc ở tâm. |
| **Error End Event** | `shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outline=end;symbol=error;` | Viền dày đậm + Tia sét lỗi. |

### 2.5. Artifacts (Data Object & Data Store)
* **Data Object (Chứng từ):**
  ```text
  shape=mxgraph.bpmn.data_object;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;size=15;
  ```
  Kích thước: **`width="40" height="55"`**.
* **Data Store (Cơ sở dữ liệu):**
  ```text
  shape=datastore;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;
  ```
  Kích thước: **`width="50" height="50"`**.

### 2.6. Các loại Đường nối (Flows & Associations) - Không gắn màu cứng
1. **Sequence Flow (Luồng tuần tự nội bộ trong cùng Pool):**
   ```text
   edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;
   ```
2. **Message Flow (Luồng thông điệp nối giữa 2 Pool khác nhau):**
   ```text
   edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;dashed=1;dashPattern=6 6;startArrow=oval;startFill=0;endArrow=block;endFill=0;
   ```
3. **Data Association (Nối chứng từ/Data Store vào Task):**
   ```text
   edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;dashed=1;dashPattern=2 4;endArrow=open;endFill=0;
   ```

---

## PHẦN 3: NGUYÊN TẮC BỐ CỤC TỌA ĐỘ & TRÁNH SAI LẦM KINH ĐIỂN (THINHNOTES)

### 3.1. 5 Cấp độ sai lầm cần tránh tuyệt đối
1. **Cấp độ 1 - Đặt tên:** Task bắt buộc theo công thức **`VERB + OBJECT`** (Động từ + Đối tượng). Gateway bắt buộc là **Câu hỏi kết thúc bằng `?`**.
2. **Cấp độ 2 - Lạm dụng Subprocess:** Chỉ dùng khi task thực sự cần phân rã thành quy trình con độc lập.
3. **Cấp độ 3 - Dùng sai Flow:**
   * Trong cùng 1 Pool $\rightarrow$ Bắt buộc dùng **Sequence Flow (nét liền)**.
   * Giữa 2 Pool khác nhau $\rightarrow$ Bắt buộc dùng **Message Flow (nét đứt, gốc tròn rỗng, mũi tên rỗng)**.
4. **Cấp độ 4 - Đặt Task sai vị trí:** Mỗi Task chỉ nằm trọn vẹn trong **1 Swimlane duy nhất**, không bao giờ đè lên đường ranh giới giữa 2 Lane.
5. **Cấp độ 5 - "Dăng màn nhện":**
   * Không để các đường nối cắt xuyên qua mặt các Task khác.
   * Sử dụng **Hệ thống Cột Lưới (Grid Column System)**: Chia trục $X$ thành các cột thẳng hàng từ Trái sang Phải.
   * Các đường quay vòng (Loopback) hoặc rẽ nhánh phải có tọa độ `<Array as="points">` đi theo hành lang trống giữa các Lane.
   * Lưu ý quan trọng về hệ tọa độ của Edge trong Draw.io: Khi một `edge` có `parent="pool_nr"`, mọi tọa độ `<mxPoint x="..." y="..."/>` trong `<Array as="points">` phải tính theo hệ quy chiếu của `pool_nr` (tức là `x` cộng thêm `30px` của tiêu đề Pool, và `y` cộng thêm `y_offset` của Lane tương ứng).

---

## PHẦN 4: BỐ CỤC BẬC THANG & QUY TẮC CHỐNG CHỮ ĐÈ LÊN BLOCK KHI KÉO MŨI TÊN

1. **Quy tắc Bậc thang tiến tới theo trục $X$ (Staircase X-Progression):**
   * Khi các Swimlane nằm ngang xếp chồng từ trên xuống dưới (`horizontal=0`, tiêu đề xoay dọc 90° ở bên trái giống chuẩn Thinhnotes), mỗi khi luồng nghiệp vụ chuyển từ Lane trên xuống Lane dưới (hoặc ngược lại), tọa độ $X$ của Block tiếp theo phải **tịnh tiến sang bên phải** (`x_next > x_current + width`).
   * Nhờ đó, toàn bộ các đoạn dây thẳng đứng xuyên qua các Lane ở giữa luôn đi vào **cột không gian trống**, tuyệt đối không cắt ngang qua bất kỳ Block nào.
2. **Quy tắc "Đỉnh Thứ 4 Trống" cho Nhãn Câu Hỏi của Gateway:**
   * Mỗi Gateway hình thoi có 4 đỉnh (`Top`, `Bottom`, `Left`, `Right`), trong đó tối đa 3 đỉnh có mũi tên đi qua (1 luồng vào, 2 luồng rẽ nhánh ra).
   * Nhãn câu hỏi của Gateway **bắt buộc phải đặt ở đỉnh thứ 4 (đỉnh hoàn toàn KHÔNG có mũi tên nào đi qua)**:
     * Nếu đỉnh `Top` trống $\rightarrow$ dùng `verticalLabelPosition=top;verticalAlign=bottom;spacingBottom=6;`
     * Nếu đỉnh `Bottom` trống $\rightarrow$ dùng `verticalLabelPosition=bottom;verticalAlign=top;spacingTop=6;`
     * Nếu đỉnh `Right` trống $\rightarrow$ dùng `labelPosition=right;verticalLabelPosition=middle;verticalAlign=middle;align=left;spacingLeft=8;`
     * Nếu đỉnh `Left` trống $\rightarrow$ dùng `labelPosition=left;verticalLabelPosition=middle;verticalAlign=middle;align=right;spacingRight=8;`
3. **Quy tắc Trung điểm Đường gấp khúc (`Polyline Midpoint + Offset`) cho Nhãn Mũi Tên (`Edge Label`):**
   * Trong Draw.io, nhãn `value="..."` của một đường nối (`edge`) mặc định được đặt tại **trung điểm 50% tổng chiều dài toàn bộ đường gấp khúc (Polyline Midpoint)**.
   * Khi kéo một mũi tên dài xuyên qua nhiều Swimlane (như `Message Flow` từ Kho lên Khách hàng, hoặc luồng `Từ chối` / `Trong hạn mức` từ Ban Giám Đốc lên Sales), trung điểm 50% của đường nối thường rơi vào giữa Lane khác và **đè trực tiếp lên Block nằm gần đó**.
   * **Cách khắc phục triệt để:**
     * Chừa một **hành lang trống 70px** (`y = 190..260`) giữa Pool Khách hàng và Pool Nội bộ Công ty, và dùng `<mxPoint as="offset" x="..." y="..."/>` đưa toàn bộ nhãn `Message Flow` nằm gọn trong hành lang trống này.
     * Với mọi nhãn nhánh rẽ (`Đạt`, `Không đạt`, `Quá tải`, `Đáp ứng`, `Trong hạn mức`, `Từ chối`, `Đồng ý`), phải tính chính xác tọa độ `(mid_x + offset_x, mid_y + offset_y)` để nhãn luôn nằm cách xa mọi Block tối thiểu `10px`.

---

## PHẦN 5: CHECKLIST KIỂM TRA TRƯỚC KHI XUẤT MÃ XML

- [ ] 1. Đã dùng đúng `shape=mxgraph.bpmn.task` và `shape=mxgraph.bpmn.shape` (có icon người, bánh răng, phong bì, dấu `X`, vòng tròn End đậm) chưa?
- [ ] 2. Đã xóa bỏ `childLayout=stackLayout` và dùng `horizontal=0` để các Swimlane nằm ngang xếp chồng từ trên xuống dưới với tiêu đề xoay dọc 90° bên trái chưa?
- [ ] 3. Đã xóa toàn bộ `fillColor`, `strokeColor`, `fontColor`, `labelBackgroundColor` để các block hoàn toàn **không màu (Monochrome)** chưa?
- [ ] 4. Đã thêm `spacingLeft=20;` cho các BPMN Task để chữ không bị đè lên icon góc trái trên chưa?
- [ ] 5. Đã kiểm tra tự động đảm bảo **0 va chạm đường nối (Edge-to-Block)** và **0 va chạm nhãn chữ (Label-to-Block)** khi kéo mũi tên qua các Swimlane chưa?
