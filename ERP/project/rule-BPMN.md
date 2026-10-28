# Quy Chuẩn & Nguyên Tắc Thiết Kế BPMN 2.0 Cho Draw.io (XML Guideline)
### *Phiên bản 2.0: Chuẩn hóa Bố Cục Không Gian, Chống Đè Chữ & Triệt Tiêu Lỗi Dăng Màn Nhện*

> **Tài liệu tham chiếu:**
> 1. *BPMN và sự lợi hại của nó* - Thinhnotes
> 2. *Giải ngố các ký hiệu BPMN (Bản đồ 6 cục chính)* - Thinhnotes
> 3. *Quẩy tới bến với BPMN (Quy trình 3 bước & 5 cấp độ sai lầm kinh điển)* - Thinhnotes
> 4. Đặc tả kỹ thuật mô hình đồ họa XML của Draw.io (`mxGraphModel`) & OMG BPMN 2.0

---

## PHẦN 1: NGUYÊN NHÂN CỐT LÕI CỦA LỖI "ĐÈ CHỮ" & "BỐ CỤC DỞ" TRÊN DRAW.IO

Khi vẽ BPMN trên Draw.io (đặc biệt khi sinh tự động bằng mã XML), người thiết kế rất dễ mắc phải 4 lỗi hình học nghiêm trọng khiến sơ đồ trở nên lộn xộn, chữ đè lên hình và dây nối chằng chịt:

### 1.1. Lỗi nhét chữ vào trong Gateway và Event (Nguyên nhân đè chữ số 1)
* **Hiện tượng:** Cố nhét một câu hỏi điều kiện dài (ví dụ: *"Xưởng sản xuất có đáp ứng công suất & tiến độ giao hàng?"*) vào bên trong một hình thoi Gateway kích thước $50 \times 50\text{px}$, hoặc nhét tên sự kiện vào vòng tròn Event $40 \times 40\text{px}$.
* **Hậu quả:** Chữ bị tràn ra 4 góc nhọn của hình thoi, đè nát biểu tượng cổng (`X`, `+`, `O`), đè lên các điểm kết nối mũi tên và che mất nhãn điều kiện của các nhánh rẽ.
* **Quy chuẩn khắc phục:** Nhãn của Gateway và Event **BẮT BUỘC PHẢI ĐẶT Ở NGOÀI** hình khối (dùng `verticalLabelPosition=top` hoặc `verticalLabelPosition=bottom`), giữ hình thoi và vòng tròn hoàn toàn thông thoáng.

### 1.2. Lỗi nhãn đường nối (Edge Label) không có nền che vạch
* **Hiện tượng:** Nhãn của các luồng (ví dụ: *"Gửi kiện hàng mẫu thử 0đ"*, *"Vượt hạn mức chiết khấu"*) không có nền che, hoặc đặt ngay giao điểm giao cắt giữa 2 đường nối.
* **Hậu quả:** Đường kẻ nét liền/nét đứt đâm xuyên ngang qua giữa các con chữ, hoặc nhãn của 2 đường nối song song bị đè chồng lên nhau thành một đống mực đen không đọc được.
* **Quy chuẩn khắc phục:** Toàn bộ nhãn trên đường nối bắt buộc phải có thuộc tính `labelBackgroundColor=#ffffff;labelBorderColor=none;` và được canh lệch vị trí (offset) tránh các điểm nút giao.

### 1.3. Lỗi bố cục không phân chia Cột giai đoạn (Lỗi bố cục dở)
* **Hiện tượng:** Các Task được đặt tự do theo cảm tính, bước trước và bước sau không thẳng hàng theo trục dọc lẫn trục ngang. Luồng đi lúc thì vọt lên, lúc thì đâm chéo xuống, cắt ngang qua mặt các Task khác.
* **Quy chuẩn khắc phục:** Áp dụng **Hệ thống Lưới Cột Giai đoạn (Grid Column System)**: Toàn bộ quy trình phải chia thành các Cột mốc thời gian rõ rệt từ Trái sang Phải ($X$ tăng dần đều theo từng Block). Các bước trong cùng một giai đoạn phải nằm trong cùng một Cột thẳng đứng.

### 1.4. Lỗi thứ tự Lane bất hợp lý làm dây nhợ cắt chéo
* **Hiện tượng:** Sắp xếp các Lane không theo chuỗi tương tác, ví dụ: để Khách hàng ở trên cùng, sau đó là Marketing, rồi đến Sales, rồi đến Kho. Khi Kho muốn giao hàng cho Khách, đường nối phải đâm xuyên qua cả Sales và Marketing!
* **Quy chuẩn khắc phục:** Tối ưu hóa thứ tự các Lane theo **tần suất tiếp xúc** để giảm thiểu tối đa các đường nối cắt chéo nhau (Minimize Edge Crossings).

---

## PHẦN 2: QUY CHUẨN ĐỊNH VỊ NHÃN & KÍCH THƯỚC HÌNH KHỐI (CHỐNG ĐÈ CHỮ)

Để đảm bảo không bao giờ bị đè chữ khi import vào Draw.io, toàn bộ thuộc tính `style` phải tuân thủ bảng sau:

### 2.1. Gateway (Cổng điều kiện) - Nhãn luôn nằm NGOÀI
```text
rhombus;whiteSpace=wrap;html=1;strokeWidth=1.5;verticalLabelPosition=top;verticalAlign=bottom;labelBackgroundColor=#ffffff;
```
* **Kích thước:** Chiều rộng = **$50\text{px}$**, Chiều cao = **$50\text{px}$**.
* **Vị trí nhãn:** Nằm **phía trên** đỉnh hình thoi (`verticalLabelPosition=top;verticalAlign=bottom`). Nhãn chữ nổi rõ ràng trên nền trắng, bên trong hình thoi chỉ chứa biểu tượng điều kiện (`X`, `+`, `O`).

### 2.2. Start & End Event - Nhãn luôn nằm NGOÀI
```text
ellipse;whiteSpace=wrap;html=1;aspect=fixed;strokeWidth=1.5;verticalLabelPosition=bottom;verticalAlign=top;labelBackgroundColor=#ffffff;
```
* **Kích thước:** Đường kính = **$40\text{px}$**.
* **Vị trí nhãn:** Nằm **phía dưới** đáy vòng tròn (`verticalLabelPosition=bottom;verticalAlign=top`).

### 2.3. Task / Activity - Kích thước thoải mái cho tiếng Việt
```text
rounded=1;whiteSpace=wrap;html=1;arcSize=10;strokeWidth=1.5;align=center;verticalAlign=middle;fontSize=11;spacing=4;
```
* **Kích thước chuẩn:** Chiều rộng = **$160\text{px} - 170\text{px}$**, Chiều cao = **$65\text{px} - 70\text{px}$**.
* Chiều cao tối thiểu $65\text{px}$ đảm bảo chứa trọn vẹn 3 dòng chữ tiếng Việt có dấu mà không chạm sát mép viền.

### 2.4. Data Object (Chứng từ) & Data Store
* **Data Object:** `shape=note;whiteSpace=wrap;html=1;size=14;verticalAlign=middle;align=center;` | Kích thước: **$80\text{px} \times 45\text{px}$**.
* Đặt cách mép dưới của Task tối thiểu $25\text{px}$, nối bằng đường chấm `dashed=1;dashPattern=2 4;` không mũi tên.

### 2.5. Đường nối & Nhãn điều kiện (Flow & Edge Labels)
* **Sequence Flow:**
  ```text
  edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#374151;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#1f2937;
  ```
* **Message Flow:**
  ```text
  edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=6 6;html=1;startArrow=oval;startFill=0;endArrow=block;endFill=0;strokeColor=#0284c7;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#0369a1;
  ```

---

## PHẦN 3: HỆ THỐNG LƯỚI CỘT GIAI ĐOẠN & PHÂN CHIA BỐ CỤC KHÔNG GIAN

### 3.1. Nguyên tắc Hệ thống Cột Lưới (Grid Column System)
Quy trình từ Trái sang Phải phải được chia thành các **Block Cột** với khoảng cách chuẩn $240\text{px} - 280\text{px}$ giữa các tâm tác vụ:

```
[Trục X]:  |--- Cột 1 ---|--- Cột 2 ---|--- Cột 3 ---|--- Cột 4 ---|--- Cột 5 ---|--- Cột 6 ---|
Giai đoạn: | Tiếp nhận   | Xuất Mẫu    | Đánh giá    | Báo giá     | Xét duyệt   | Đơn hàng SO |
Khoảng X:  | 100 - 300   | 400 - 650   | 750 - 1000  | 1100 - 1350 | 1450 - 1700 | 1800 - 2050 |
```

* Mọi Task thuộc cùng một bước logic phải có cùng tọa độ $X$.
* Khi rẽ nhánh Gateway:
  * **Nhánh chính (Happy Path):** Đi thẳng ngang theo trục $X$ ($Y$ giữ nguyên).
  * **Nhánh phụ/Ngoại lệ:** Đi vuông góc theo trục $Y$ lệch lên hoặc xuống $\pm 80\text{px}$, sau đó mới bẻ góc $90^\circ$.

### 3.2. Quy chuẩn Chiều cao và Thứ tự Sắp xếp Lane (Swimlane Division)
Để tránh các đường nối cắt chéo, chiều cao các Lane được phân bổ dựa trên mật độ tác vụ bên trong:

| Thứ tự Lane | Phòng ban / Vai trò | Chiều cao Lane ($H$) | Lý do phân bổ kích thước |
| :---: | :--- | :---: | :--- |
| **Pool 1 (Trên)** | **Khách hàng B2B (Thu Mua)** | **$120\text{px}$** | Black-box Pool chỉ chứa các điểm gửi/nhận thông điệp chính. |
| **Lane 1 (Nội bộ)**| **Bộ phận Kinh doanh (Sales B2B)**| **$180\text{px} - 200\text{px}$** | Lane trung tâm giao tiếp nhiều nhất, có nhiều nhánh rẽ (Lost, Loopback) nên cần trần nhà cao để dây không đè lên Task. |
| **Lane 2** | **Bộ phận Marketing** | **$130\text{px}$** | Khởi tạo Lead và chuyển giao, luồng đi thẳng đơn giản. |
| **Lane 3** | **Bộ phận Kho (Inventory)** | **$130\text{px}$** | Đóng gói và xuất kho hàng mẫu. |
| **Lane 4** | **Xưởng Kỹ thuật / Sản xuất** | **$150\text{px}$** | Thẩm định năng lực xưởng và tự động sinh Lệnh sản xuất (MO). |
| **Lane 5 (Dưới)** | **Ban Giám Đốc** | **$150\text{px}$** | Phê duyệt hạn mức cấp cao, có 2 nhánh rẽ (Duyệt / Từ chối). |

---

## PHẦN 4: NGUYÊN TẮC HÀNH LANG ĐỊNH TUYẾN (ROUTING CHANNELS - CHỐNG DĂNG MÀN NHỆN)

Để triệt tiêu lỗi cấp độ 5 *"Anh như biến thành người nhện"* trong bài giảng Thinhnotes:

1. **Nguyên tắc "Hành lang trống" cho đường quay vòng (Loopback):**
   * Khi bị từ chối đơn hàng hoặc xưởng quá tải cần quay lại đàm phán, đường nối **TUYỆT ĐỐI KHÔNG ĐƯỢC CHẠY XUYÊN NGANG QUA CÁC TASK Ở GIỮA**.
   * Đường quay vòng phải đi ra ngoài mép biên (sát vách trên hoặc sát vách dưới của Lane), chạy dọc theo hành lang trống rồi mới bẻ góc đâm vào Task đích.
2. **Quy định Điểm thoát (Exit) và Điểm vào (Entry):**
   * Luồng chính: Luôn đi ra từ cạnh Phải (`exitX=1;exitY=0.5`) $\rightarrow$ Đi vào cạnh Trái của task kế tiếp (`entryX=0;entryY=0.5`).
   * Luồng ngoại lệ/Rẽ nhánh: Đi ra từ đỉnh Trên (`exitX=0.5;exitY=0`) hoặc đáy Dưới (`exitX=0.5;exitY=1`).
3. **Khoảng cách đệm an toàn (Clearance Spacing):**
   * Khoảng cách giữa 2 Task cạnh nhau: tối thiểu $\ge 70\text{px}$.
   * Khoảng cách giữa đường nối song song với Task: tối thiểu $\ge 25\text{px}$.

---

## PHẦN 5: BẢNG MÀU PASTEL CHUẨN DOANH NGHIỆP (CORPORATE PASTEL PALETTE)

| Thành phần | Mã màu nền (`fillColor`) | Mã màu viền (`strokeColor`) | Mã màu chữ (`fontColor`) | Ý nghĩa thị giác |
| :--- | :---: | :---: | :---: | :--- |
| **Tác vụ Người dùng (User Task)** | `#dae8fc` | `#6c8ebf` | `#1d3557` | Xanh dương dịu, tượng trưng cho thao tác của nhân viên. |
| **Tác vụ Tự động Odoo (Service Task)**| `#e1d5e7` | `#9673a6` | `#4a154b` | Tím pastel, tượng trưng cho xử lý ngầm của hệ thống ERP. |
| **Tác vụ Thủ công (Manual Task)** | `#f5f5f5` | `#b3b3b3` | `#333333` | Xám nhạt, tượng trưng cho thao tác chân tay ngoài đời thực. |
| **Cổng rẽ nhánh (Gateway)** | `#fff2cc` | `#d6b656` | `#7f6000` | Vàng hổ phách, tượng trưng cho điểm kiểm tra điều kiện. |
| **Điểm bắt đầu (Start Event)** | `#d5e8d4` | `#82b366` | `#274e13` | Xanh lá cây tươi, khởi nguồn luồng nghiệp vụ. |
| **Kết thúc thành công (Won End)** | `#d5e8d4` | `#274e13` (viền 3px) | `#274e13` | Xanh lá cây đậm, đạt được thỏa thuận hợp đồng. |
| **Kết thúc thất bại (Lost End)** | `#f8cecc` | `#b85450` (viền 3px) | `#78281f` | Đỏ pastel, ghi nhận thất bại nhưng không gây gắt mắt. |
| **Pool / Lane Headers** | `#f8f9fa` | `#b3b3b3` | `#111827` | Xám sáng phân tầng cấu trúc tổ chức rõ ràng. |

---

## PHẦN 6: CHECKLIST BẮT BUỘC TRƯỚC KHI XUẤT CODE XML

Trước khi tạo bất kỳ đoạn mã XML nào cho Draw.io, người vẽ phải tự kiểm tra 8 câu hỏi sau:
1. [ ] Mọi Gateway đã có thuộc tính `verticalLabelPosition=top` hoặc `bottom` chưa? (Tuyệt đối không để chữ trong hình thoi).
2. [ ] Mọi Start/End Event đã đưa chữ ra ngoài vòng tròn chưa?
3. [ ] Kích thước Task đã đạt tối thiểu $160 \times 65\text{px}$ để chứa chữ tiếng Việt thoải mái chưa?
4. [ ] Mọi nhãn đường nối đã có `labelBackgroundColor=#ffffff;labelBorderColor=none;` chưa?
5. [ ] Các Task trong cùng một công đoạn có cùng tọa độ $X$ thẳng hàng theo cột lưới chưa?
6. [ ] Có đường Sequence Flow nào nối giữa 2 Pool khác nhau không? (Nếu có $\rightarrow$ Phải đổi ngay thành Message Flow).
7. [ ] Có Task nào nằm đè lên vạch phân cách giữa 2 Lane không?
8. [ ] Các đường Loopback (quay vòng) có chạy theo hành lang trống ở biên không, hay đang đâm xuyên qua bụng các Task khác?
