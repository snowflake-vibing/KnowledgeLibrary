# Quy Chuẩn & Nguyên Tắc Thiết Kế BPMN 2.0 Cho Draw.io (XML Guideline)
### *Đúc kết từ thực chiến Business Analyst & Bộ bài giảng BPMN Thinhnotes*

> **Tài liệu tham chiếu:**
> 1. *BPMN và sự lợi hại của nó* - Thinhnotes
> 2. *Giải ngố các ký hiệu BPMN (Bản đồ 6 cục chính)* - Thinhnotes
> 3. *Quẩy tới bến với BPMN (Quy trình 3 bước & 5 cấp độ sai lầm kinh điển)* - Thinhnotes
> 4. Chuẩn đặc tả quốc tế BPMN 2.0 của tổ chức **OMG (Object Management Group)**

---

## PHẦN 1: TƯ DUY & PHƯƠNG PHÁP TIẾP CẬN KHI VẼ BPMN

### 1.1. Bản chất và Mục tiêu của BPMN
* **BPMN là gì:** *Business Process Model and Notation* - tập hợp ký hiệu chuẩn hóa quốc tế để mô hình hóa quy trình nghiệp vụ của doanh nghiệp.
* **Sứ mệnh cốt lõi:** Chuyển hóa "một nùi công văn, giấy tờ lộn xộn, văn bản word 5-6 trang A4 hay các cuộc họp/ghi âm kéo dài" thành **một bức tranh trực quan, súc tích, đầy đủ và dễ hiểu**.
* **Đa tầng độc giả:** Phục vụ cả cấp quản lý (**High-level**: nắm dòng chảy tổng quan, các bên liên quan, tài liệu đầu vào/đầu ra) và đội ngũ vận hành/kỹ thuật (**Lower-level / Developers**: nắm chi tiết logic rẽ nhánh, kiểm soát ngoại lệ và tích hợp hệ thống).
* **BPMN vs UML:** UML tập trung vào thiết kế phần mềm hướng đối tượng (cho kỹ sư công nghệ); còn BPMN tập trung vào **dòng chảy giá trị và quy trình nghiệp vụ (Business Process)** cho nhà quản trị, BA và người vận hành.

### 1.2. Quy trình 3 bước thực hành mô hình hóa (Thinhnotes Methodology)
$$\textbf{Bước 1: Tóm Gọn} \quad\longrightarrow\quad \textbf{Bước 2: Phân Loại} \quad\longrightarrow\quad \textbf{Bước 3: Vẽ}$$

1. **Tóm gọn (Elicit & Summarize):** Chắt lọc thông tin cốt lõi từ khảo sát hiện trạng (As-Is); loại bỏ từ ngữ rườm rà, xác định điểm bắt đầu, điểm kết thúc và đầu ra mong muốn.
2. **Phân loại (Categorize):** Phân chia rõ ràng:
   * Ai tham gia? (Các tổ chức ngoài $\rightarrow$ Pool; các phòng ban/vai trò nội bộ $\rightarrow$ Lane).
   * Làm cái gì? (Tasks, Sub-processes, Transactions).
   * Luồng đi và điều kiện rẽ nhánh là gì? (Gateways).
   * Dữ liệu và chứng từ nào luân chuyển? (Data Objects, Data Stores).
3. **Vẽ (Modeling):** Tiến hành dựng sơ đồ trên công cụ chuẩn (Draw.io), tuân thủ nghiêm ngặt bảng ký hiệu và nguyên tắc hình học.

---

## PHẦN 2: BẢN ĐỒ "6 CỤC CHÍNH" TRONG BPMN 2.0

Theo Thinhnotes, nhìn sơ đồ BPMN có vẻ đồ sộ nhưng thực chất chỉ xoay quanh **6 khối thành phần cốt lõi**:

```
BPMN 2.0 = [1. Swimlane] + [2. Activities] + [3. Flow] + [4. Gateways] + [5. Events] + [6. Information Artifacts]
```

### 2.1. Cục 1: Swimlane (Linh hồn của BPMN)
Swimlane trả lời câu hỏi: **AI LÀ NGƯỜI LÀM?**
* **Pool (Hồ bơi):** Đại diện cho một pháp nhân độc lập, một tổ chức đối tác bên ngoài hoặc một hệ thống riêng biệt.
  * *Black-box Pool (Khách hàng B2B, Nhà cung cấp, Cơ quan thuế):* Chỉ thể hiện tương tác gửi/nhận thông điệp ở biên, **tuyệt đối không vẽ các bước nội bộ bên trong**.
  * *White-box Pool (Doanh nghiệp Nhựt Rạng):* Thể hiện chi tiết dòng chảy nghiệp vụ nội bộ.
* **Lane (Làn bơi):** Là các dải phân chia bên trong một Pool, thể hiện các phòng ban, bộ phận hoặc chức danh cụ thể (Marketing, Sales B2B, Xưởng Kỹ thuật, Kho mẫu, Giám đốc, Kế toán).

---

### 2.2. Cục 2: Activities (Tác vụ / Hành động)
Activities trả lời câu hỏi: **LÀM CÁI GÌ?**

#### A. 4 Loại hình Activity chính:
1. **Task:** Đơn vị công việc nguyên tử (atomic task), không thể chia nhỏ hơn trong ngữ cảnh hiện tại. Ký hiệu: Ô chữ nhật bo góc đơn (`rounded=1`).
2. **Sub-Process:** Quy trình con chứa một chuỗi các task bên trong. Ký hiệu: Ô chữ nhật bo góc có dấu cộng `[+]` ở đáy giữa.
3. **Transaction:** Chuỗi công việc mang tính giao dịch bắt buộc (thường liên quan thanh toán, tài chính). Có cơ chế kiểm soát cam kết hoàn tất hoặc hoàn tác (Commit / Rollback). Ký hiệu: Ô chữ nhật bo góc có **2 nét viền song song (Double-line border)**.
4. **Call Activity:** Tác vụ gọi lại (triệu hồi) một quy trình chuẩn đã được định nghĩa độc lập ở nơi khác (tái sử dụng quy trình, ví dụ: quy trình kiểm tra hạn mức tín dụng). Ký hiệu: Ô chữ nhật bo góc có **nét viền rất đậm (Bold border)**.

#### B. Activity Markers (Ký hiệu hành vi):
* **Loop Task (Mũi tên vòng tròn):** Tác vụ lặp đi lặp lại tuần tự trên cùng một đối tượng cho đến khi thỏa điều kiện dừng (ví dụ: *Soạn thảo $\rightarrow$ Chỉnh sửa bản vẽ nháp lần 1, 2, n $\rightarrow$ Hoàn thiện*).
* **Multi-Instance Task (3 vạch dọc `|||` hoặc 3 vạch ngang `≡`):** Tác vụ lặp lại đồng thời (song song) hoặc tuần tự trên **nhiều bản ghi dữ liệu khác nhau** thuộc cùng một tập hợp (Data Set). Ví dụ: Giám đốc duyệt đồng loạt 5 báo cáo tuần gửi lên từ 5 Trưởng xưởng.
* **Compensation Task (`<<`):** Tác vụ bù trừ/đền bù khi có sự cố hủy ngang.

#### C. Task Types (Biểu tượng góc trên bên trái):
* **User Task (Hình người):** Người dùng thao tác trên giao diện phần mềm Odoo.
* **Manual Task (Hình bàn tay):** Thao tác thủ công ngoài đời thực, không chạm vào hệ thống (ví dụ: bốc xếp hàng mẫu, cắt mẫu băng keo thực nghiệm).
* **Service Task (Hình 2 bánh răng):** Hệ thống Odoo chạy xử lý ngầm tự động (ví dụ: tự động tính giá theo Pricelist, tự động gửi email thông báo).
* **Send Task / Receive Task (Phong bì đen / trắng):** Gửi hoặc nhận thông điệp qua mạng/email.
* **Business Rule Task (Bảng bảng tính):** Hệ thống đánh giá dựa trên bảng quy tắc logic.

---

### 2.3. Cục 3: Flow (Dòng chảy & Kết nối)
Flow trả lời câu hỏi: **LUỒNG ĐI NHƯ THẾ NÀO?**

* **Sequence Flow (Nét liền, mũi tên tam giác đặc):**
  * Diễn tả thứ tự thực thi các bước **BÊN TRONG CÙNG MỘT POOL**.
  * Sequence Flow có thể băng qua các Swimlane khác nhau trong cùng 1 Pool.
  * **Cấm kỵ:** Tuyệt đối không bao giờ nối Sequence Flow xuyên từ Pool này sang Pool khác!
* **Message Flow (Nét đứt, gốc tròn rỗng, đầu mũi tên rỗng):**
  * Diễn tả sự trao đổi thông điệp/dữ liệu **GIỮA HAI POOL KHÁC NHAU**.
  * **Cấm kỵ:** Tuyệt đối không dùng Message Flow để nối 2 bước trong cùng 1 Pool!
* **Association (Nét chấm chấm, đầu mũi tên hở hoặc không đầu):**
  * Dùng để liên kết Data Object (chứng từ) hoặc Text Annotation (ghi chú) vào một Task.
* **Default Flow (Gạch chéo ở gốc `\`):**
  * Nhánh thoát mặc định từ Gateway khi không có điều kiện nào khác được thỏa mãn.

---

### 2.4. Cục 4: Gateways (Cổng rẽ nhánh & Hợp nhất)
Gateways trả lời câu hỏi: **ĐIỀU KIỆN ĐỔI LUỒNG LÀ GÌ?**

1. **Exclusive Gateway (XOR - Ký hiệu `X` hoặc rỗng):** Chỉ duy nhất **1 nhánh** được chọn dựa trên điều kiện (Ví dụ: Mẫu đạt chất lượng? $\rightarrow$ [Đạt] hoặc [Không đạt]).
2. **Inclusive Gateway (OR - Ký hiệu vòng tròn `O`):** Cho phép **1, 2 hoặc nhiều nhánh** cùng kích hoạt tùy thuộc điều kiện thỏa mãn. Lưu ý: Khi merge, cổng Inclusive phải đợi tất cả các nhánh đã kích hoạt hoàn tất mới được đi tiếp.
3. **Parallel Gateway (AND - Ký hiệu dấu `+`):** **Tất cả các nhánh đều chạy song song đồng thời**. Khi hợp nhất (Join), hệ thống bắt buộc đợi tất cả các nhánh song song xong hết mới mở luồng tiếp theo.
4. **Event-Driven Gateway (Ký hiệu ngũ giác lồng):** Việc rẽ nhánh phụ thuộc vào **sự kiện nào phát sinh trước** (Ví dụ: Nhận được thanh toán trước hay Hết hạn thời gian 24h trước).

---

### 2.5. Cục 5: Events (Sự kiện diễn ra)
Events trả lời câu hỏi: **SỰ VIỆC GÌ XẢY RA?** (Mang tính khách quan, kích hoạt hoặc kết thúc).

* **Theo 3 giai đoạn vòng đời:**
  * **Start Event (1 vòng tròn nét mỏng):** Điểm khởi nguồn của quy trình.
  * **Intermediate Event (2 vòng tròn lồng nhau):** Sự việc diễn ra ở giữa quy trình (chờ đợi hoặc phát tín hiệu).
  * **End Event (1 vòng tròn viền dày đậm):** Điểm kết thúc quy trình.
* **2 Loại Event thông dụng nhất:**
  * **Timer Event (Hình mặt đồng hồ):** Chờ đợi một khoảng thời gian (delay) hoặc kích hoạt theo lịch định kỳ.
  * **Message Event (Hình phong bì):** Khởi động khi nhận tin, gửi tin trung gian, hoặc kết thúc bằng việc bắn thông báo.
* **Boundary Events (Sự kiện gắn trên viền Task):**
  * **Interrupting (Viền liền):** Khi sự kiện xảy ra $\rightarrow$ Ngắt ngay lập tức tác vụ đang chạy để đi theo nhánh ngoại lệ (ví dụ: Quá hạn 48h không duyệt $\rightarrow$ Hủy đơn).
  * **Non-Interrupting (Viền đứt):** Khi sự kiện xảy ra $\rightarrow$ Tác vụ chính vẫn tiếp tục chạy bình thường, đồng thời kích hoạt một nhánh phụ song song (ví dụ: Bắn tin nhắc nhở lần 1).

---

### 2.6. Cục 6: Information Artifacts (Dữ liệu & Tài liệu đính kèm)
* **Data Object (Hình tờ giấy gấp góc):** Tài liệu/dữ liệu sinh ra hoặc nạp vào task (Ví dụ: `Báo giá nháp`, `Phiếu xuất mẫu 0đ`, `Hợp đồng ký`).
* **Data Store (Hình thùng phuy/Database):** Nơi lưu trữ bền vững (Ví dụ: `Odoo Database`, `Bảng giá sỉ B2B`).
* **Text Annotation (Dấu ngoặc vuông mở `[`):** Ghi chú, giải thích thêm thông tin nghiệp vụ.
* **Group (Hình chữ nhật nét đứt bo tròn):** Gom nhóm trực quan các tác vụ có tính chất liên quan mà không làm đổi logic luồng.

---

## PHẦN 3: BỘ 5 CẤP ĐỘ SAI LẦM KINH ĐIỂN CẦN TRÁNH TUYỆT ĐỐI (THINHNOTES)

| Cấp độ | Tên sai lầm | Hiện tượng vi phạm | Cách khắc phục chuẩn |
| :---: | :--- | :--- | :--- |
| **Cấp độ 1** | **Chuyện đặt tên** | Đặt tên Task thiếu thành phần, chỉ có động từ (ví dụ: `Kiểm tra`, `Xử lý`, `Assign`) hoặc ghi tên chức danh vào Task (`Kế toán duyệt`). | Luôn theo cấu trúc **`VERB + OBJECT`** (ví dụ: `Kiểm tra độ dính màng keo`, `Phê duyệt báo giá vượt hạn mức`). Không ghi tên người làm vì Lane đã định danh. |
| **Cấp độ 2** | **Lạm dụng Subprocess** | Bạ đâu cũng quất Subprocess khiến quy trình phân mảnh, lan man, người đọc mất phương hướng. | Chỉ tạo Subprocess khi tác vụ đó có thể phân rã thành **nhiều bước con có ý nghĩa độc lập**, có thể tái sử dụng hoặc phục vụ một phân hệ riêng. |
| **Cấp độ 3** | **Dùng sai Flow** | Dùng Sequence Flow (nét liền) nối giữa 2 Pool khác nhau; hoặc dùng Message Flow nối trong cùng 1 Pool. | **Khắc cốt ghi tâm:** Trong 1 Pool = **Sequence Flow (nét liền)**. Giữa 2 Pool = **Message Flow (nét đứt, đầu tròn rỗng)**. |
| **Cấp độ 4** | **Đặt Task sai vị trí ("Vừa ăn cơm vừa ăn phở")** | Đặt một Task nằm đè lên vạch ngăn cách giữa 2 Lane, không rõ ai chịu trách nhiệm. | Một Task **chỉ thuộc về 1 Lane duy nhất**. Nếu 2 bên cùng làm, phải tách làm 2 Task độc lập ở 2 Lane với liên kết rõ ràng. |
| **Cấp độ 5 (Cuối)** | **"Anh như biến thành người nhện" (Dăng màn nhện)** | Sơ đồ kích thước lồi lõm, dây nhợ chéo nhau chằng chịt, đường kẻ đâm xuyên qua Task, góc rẽ ziczac. | Tuân thủ kích thước đều tăm tắp, khoảng cách $\ge 60\text{px}$, bẻ góc trực giao vuông vức, luồng chính đi thẳng mượt mà. |

---

## PHẦN 4: QUY CHUẨN KỸ THUẬT DRAW.IO XML (`mxGraphModel`)

Mọi đoạn mã XML khi sinh ra cho Draw.io phải tuân thủ chính xác các tham số kỹ thuật sau để đảm bảo nạp vào là đẹp ngay:

### 4.1. Khung sườn cấu trúc XML
```xml
<mxGraphModel dx="1422" dy="798" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1654" pageHeight="1169" math="0" shadow="0">
  <root>
    <mxCell id="0"/>
    <mxCell id="1" parent="0"/>
    <!-- Cấu trúc Pool, Lane, Elements, Connectors -->
  </root>
</mxGraphModel>
```

### 4.2. Bảng quy chuẩn Kích thước & Shape Style trong Draw.io
* **Pool Ngang:** `shape=swimlane;horizontal=0;startSize=30;collapsible=0;` | Rộng: 1400 - 1800 px.
* **Lane Ngang:** `shape=swimlane;horizontal=0;startSize=25;collapsible=0;` | Cao: 120 - 160 px.
* **Task:** `rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=1.5;` | Rộng: **150 px**, Cao: **60 px**.
* **Sub-process:** `rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=1.5;` có icon `+` đáy | Rộng: **160 px**, Cao: **70 px**.
* **Gateway:** `rhombus;whiteSpace=wrap;html=1;strokeWidth=1.5;` | Rộng: **50 px**, Cao: **50 px**.
* **Start Event:** `ellipse;whiteSpace=wrap;html=1;aspect=fixed;strokeWidth=1.5;` | Đường kính: **40 px**.
* **End Event:** `ellipse;whiteSpace=wrap;html=1;aspect=fixed;strokeWidth=3;` | Đường kính: **40 px**.
* **Data Object:** `shape=note;whiteSpace=wrap;html=1;size=14;verticalAlign=top;` | Rộng: **50 px**, Cao: **60 px**.

### 4.3. Bảng mã màu Pastel Chuẩn (Không gây chói mắt)
* **Task người dùng (User Task):** `fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;`
* **Task hệ thống Odoo (Service Task):** `fillColor=#e1d5e7;strokeColor=#9673a6;fontColor=#4a154b;`
* **Cổng điều kiện (Gateway):** `fillColor=#fff2cc;strokeColor=#d6b656;fontColor=#7f6000;`
* **Start Event:** `fillColor=#d5e8d4;strokeColor=#82b366;fontColor=#274e13;`
* **End Event thành công (Won):** `fillColor=#d5e8d4;strokeColor=#274e13;fontColor=#274e13;strokeWidth=3;`
* **End Event thất bại (Lost/Hủy):** `fillColor=#f8cecc;strokeColor=#b85450;fontColor=#78281f;strokeWidth=3;`
* **Pool/Lane Header:** `fillColor=#f8f9fa;strokeColor=#b3b3b3;fontColor=#333333;`

### 4.4. Cấu hình Đường nối Orthogonal
* **Sequence Flow:**
  ```text
  edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;
  ```
* **Message Flow:**
  ```text
  edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=6 6;html=1;startArrow=oval;startFill=0;endArrow=block;endFill=0;strokeColor=#0284c7;strokeWidth=1.5;
  ```
* **Nhãn điều kiện (Edge Label):** Bắt buộc gắn thuộc tính `background=#ffffff;` để chữ có nền trắng che vạch nối, giúp chữ hiển thị sắc nét và dễ đọc.

---

## PHẦN 5: CHECKLIST TRƯỚC KHI XUẤT BẢN FILE DRAW.IO XML

Trước khi tạo hoặc bàn giao bất kỳ file XML BPMN nào, người thiết kế phải đối soát checklist 6 điểm:
- [ ] 1. Mọi Task đều được đặt tên theo chuẩn **`[Động từ] + [Đối tượng]`**.
- [ ] 2. Mọi Gateway đều kết thúc bằng dấu hỏi **`?`** và có nhãn điều kiện rõ ràng trên các nhánh ra.
- [ ] 3. Không có bất kỳ Sequence Flow (nét liền) nào chạy xuyên giữa 2 Pool khác nhau.
- [ ] 4. Không có bất kỳ Message Flow (nét đứt) nào được nối trong cùng 1 Pool.
- [ ] 5. Không có Task nào nằm đè lên đường phân cách giữa 2 Lane.
- [ ] 6. Không có hiện tượng "dăng màn nhện": các đường nối được bẻ góc 90 độ mượt mà, không đâm xuyên qua các hình khối khác.
