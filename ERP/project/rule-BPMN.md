# Quy Chuẩn & Nguyên Tắc Thiết Kế BPMN 2.0 Cho Draw.io (XML Guideline)

> **Mục đích:** Thiết lập bộ quy chuẩn toàn diện về mặt **Nghiệp vụ (BPMN 2.0)** và **Kỹ thuật (Draw.io XML / `mxGraphModel`)** để tạo ra các sơ đồ quy trình chuẩn quốc tế, bố cục cân đối, thẩm mỹ cao và import trực tiếp vào Draw.io (diagrams.net) không bị lỗi hiển thị.

---

## PHẦN 1: QUY CHUẨN NGHIỆP VỤ BPMN 2.0 (SEMANTIC RULES)

### 1.1. Nguyên tắc Pools & Swimlanes (Vùng chứa & Làn trách nhiệm)
1. **Pool độc lập (Black-box Pool):**
   * Dùng cho các đối tác bên ngoài (Khách hàng, Nhà cung cấp, Ngân hàng, Cơ quan thuế).
   * **Quy tắc tuyệt đối:** Không vẽ chi tiết các bước nội bộ của đối tác ngoài (chỉ thể hiện nhận/gửi thông điệp).
2. **Pool nội bộ (White-box Pool):**
   * Đại diện cho tổ chức nội bộ (Công ty Nhựt Rạng).
   * Phải chia thành các **Swimlanes** rõ ràng đại diện cho từng phòng ban / vai trò (Marketing, Sales, Kho, Sản xuất, Ban Giám đốc, Kế toán).
3. **Quy tắc kết nối Sequence Flow vs Message Flow:**
   * **Sequence Flow (Mũi tên nét liền, đầu tam giác đặc):** Chỉ đi lại **bên trong cùng 1 Pool** (có thể xuyên qua các Swimlane khác nhau trong cùng 1 Pool). **Tuyệt đối KHÔNG được nối giữa 2 Pool khác nhau.**
   * **Message Flow (Mũi tên nét đứt, đầu mũi tên rỗng, gốc có vòng tròn nhỏ):** Chỉ dùng để **nối giữa 2 Pool khác nhau** (tương tác gửi/nhận thông tin). **Tuyệt đối KHÔNG dùng Message Flow bên trong cùng 1 Pool.**

### 1.2. Quy tắc đặt tên (Naming Conventions)
* **Tác vụ (Task):** Bắt buộc dùng cấu trúc **[Động từ] + [Danh từ/Đối tượng]** (Ví dụ: `Nhập Lead vào CRM`, `Xuất kho hàng mẫu`, `Thẩm định công suất xưởng`, `Ký hợp đồng bán hàng`). Tránh đặt tên mơ hồ như `Xử lý`, `CRM`.
* **Cổng rẽ nhánh (Gateway):** Bắt buộc đặt tên dưới dạng **[Câu hỏi điều kiện]** kết thúc bằng dấu hỏi `?` (Ví dụ: `Hàng mẫu đạt chuẩn?`, `Quy mô vượt công suất?`, `Cần Giám đốc duyệt?`).
* **Nhánh ra khỏi Gateway:** Ghi nhãn điều kiện rõ ràng: `[Đạt / Không đạt]`, `[Đồng ý / Từ chối]`, `[Có / Không]`, `[Vượt hạn mức / Trong hạn mức]`.
* **Sự kiện (Event):**
  * *Start Event:* Danh từ chỉ hoàn cảnh bắt đầu (Ví dụ: `Nhu cầu mới phát sinh`, `Khách gửi yêu cầu báo giá`).
  * *End Event:* Tính từ/Trạng thái hoàn thành (Ví dụ: `Đơn hàng được xác nhận (Won)`, `Cơ hội bị hủy (Lost)`).

### 1.3. Quy tắc Luồng & Cổng điều kiện (Gateways & Control Flow)
* **Bắt đầu & Kết thúc:** Mọi quy trình phải có ít nhất **1 Start Event** và kết thúc rõ ràng bằng các **End Event**. Không được để nhánh quy trình bị cụt (Dead-end).
* **Exclusive Gateway (XOR - Ký hiệu `X`):** Chỉ duy nhất **1 nhánh** được chọn tại một thời điểm.
* **Parallel Gateway (AND - Ký hiệu `+`):** Mọi nhánh song song đều được kích hoạt đồng thời (và phải hội tụ bằng một cổng Parallel tương ứng trước khi đi tiếp).
* **Inclusive Gateway (OR - Ký hiệu `O`):** Một hoặc nhiều nhánh có thể được chọn tùy theo điều kiện thỏa mãn.

---

## PHẦN 2: QUY CHUẨN KỸ THUẬT VẼ TRÊN DRAW.IO (XML / `mxGraphModel`)

Để sơ đồ hiển thị đẹp mắt, chữ không bị tràn, đường nối tự động bẻ góc vuông (orthogonal) và màu sắc chuyên nghiệp, toàn bộ cấu trúc XML phải tuân thủ nghiêm ngặt các tham số sau:

### 2.1. Cấu trúc XML chuẩn (`mxGraphModel`)
Mọi đoạn code xuất ra Draw.io phải có khung bao bọc hợp lệ:
```xml
<mxGraphModel dx="1422" dy="798" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1654" pageHeight="1169" math="0" shadow="0">
  <root>
    <mxCell id="0"/>
    <mxCell id="1" parent="0"/>
    <!-- Toàn bộ Pool, Lane, Node, Edge đặt tại đây -->
  </root>
</mxGraphModel>
```

### 2.2. Bảng quy chuẩn Kích thước (Geometry & Dimensions)
| Đối tượng BPMN | Shape trong Draw.io | Chiều rộng (Width) | Chiều cao (Height) |
| :--- | :--- | :---: | :---: |
| **Pool (Ngang)** | `swimlane;horizontal=0;` | 1300 - 1800 px | Tùy số lượng Lane |
| **Lane (Ngang)** | `swimlane;horizontal=0;` | 1300 - 1800 px | 120 - 160 px |
| **Task / Activity** | `rounded=1;arcSize=10;` | **150 px** | **60 px** |
| **Gateway** | `rhombus;` | **50 px** | **50 px** |
| **Start Event** | `ellipse;` | **40 px** | **40 px** |
| **End Event** | `ellipse;strokeWidth=3;` | **40 px** | **40 px** |
| **Data Object (Chứng từ)** | `shape=note;` | **60 px** | **70 px** |

### 2.3. Bảng quy chuẩn Màu sắc (Modern Pastel Theme)
Tuyệt đối không dùng các màu neon chói mắt. Phải dùng bộ màu chuẩn pastel sau:

| Đối tượng | `fillColor` (Màu nền) | `strokeColor` (Viền) | `fontColor` (Chữ) | Ghi chú |
| :--- | :---: | :---: | :---: | :--- |
| **Pool Header** | `#f5f5f5` | `#666666` | `#333333` | Xám thanh lịch |
| **Lane Header** | `#f8f9fa` | `#b3b3b3` | `#333333` | Xám nhạt phân cách |
| **Start Event** | `#d5e8d4` | `#82b366` | `#274e13` | Xanh lá dịu nhẹ |
| **End Event (Won)** | `#d5e8d4` | `#274e13` | `#274e13` | Xanh lá viền dày 3px |
| **End Event (Lost/Hủy)** | `#f8cecc` | `#b85450` | `#660000` | Đỏ pastel viền dày 3px |
| **User Task (Tác vụ người)** | `#dae8fc` | `#6c8ebf` | `#1d3557` | Xanh dương pastel |
| **Service Task (Hệ thống Odoo)** | `#e1d5e7` | `#9673a6` | `#4a154b` | Tím pastel công nghệ |
| **Gateway (Cổng điều kiện)** | `#fff2cc` | `#d6b656` | `#7f6000` | Vàng hổ phách pastel |
| **Data Object (Chứng từ)** | `#ffffff` | `#999999` | `#333333` | Trắng tinh tế |

### 2.4. Quy chuẩn Định dạng Đường nối (Connectors & Edges)
1. **Sequence Flow (Luồng tuần tự trong cùng Pool):**
   ```text
   edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;
   ```
   * Đường nét liền, bẻ góc mượt mà (`rounded=1`).
   * Đầu mũi tên tam giác đặc (`endArrow=block;endFill=1`).
2. **Message Flow (Luồng thông điệp giữa các Pool):**
   ```text
   edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=6 6;html=1;startArrow=oval;startFill=0;endArrow=block;endFill=0;strokeColor=#0284c7;strokeWidth=1.5;
   ```
   * Đường nét đứt (`dashed=1;dashPattern=6 6`).
   * Gốc mũi tên là vòng tròn rỗng (`startArrow=oval;startFill=0`).
   * Đầu mũi tên là tam giác rỗng (`endArrow=block;endFill=0`).
3. **Nhãn trên đường nối (Edge Labels):**
   * Luôn bật `html=1;whiteSpace=wrap;align=center;verticalAlign=middle;background=#ffffff;` để chữ nằm trên nền trắng, không bị đường kẻ xuyên qua làm mất thẩm mỹ.

---

## PHẦN 3: NGUYÊN TẮC BỐ CỤC TỌA ĐỘ (LAYOUT & COORDINATES RULES)

Khi sinh XML tự động cho Draw.io, để tránh sơ đồ bị dồn cục hoặc đường nối bị rối:
1. **Dòng chảy chính từ Trái sang Phải (Left-to-Right Flow):**
   * Tọa độ $X$ của bước sau phải luôn lớn hơn bước trước ít nhất $180\text{px}$ đến $220\text{px}$.
2. **Căn thẳng hàng tâm (Center Alignment):**
   * Các Node trong cùng một Lane phải có cùng tọa độ $Y$ (hoặc chênh lệch tối thiểu) để đường nối thẳng tắp, không bị gấp khúc ziczac.
3. **Nhánh rẽ phân luồng:**
   * Nhánh chính (Happy Path) đi thẳng.
   * Nhánh ngoại lệ (Exception/Reject) rẽ lên hoặc rẽ xuống $Y \pm 80\text{px}$ rồi mới quay vòng ngược lại (Loop back) hoặc đi về End Event.
4. **Không chồng lấn (No Overlapping):**
   * Khoảng cách an toàn tối thiểu giữa 2 Task cạnh nhau: $\Delta X \ge 60\text{px}$.
   * Khoảng cách an toàn giữa 2 Lane: $\Delta Y \ge 120\text{px}$.

---

## PHẦN 4: HƯỚNG DẪN IMPORT XML VÀO DRAW.IO

Khi có đoạn mã XML hoàn chỉnh từ AI, người dùng thực hiện 3 bước sau:
1. Truy cập [app.diagrams.net](https://app.diagrams.net/) (hoặc mở ứng dụng Draw.io trên máy).
2. Trên thanh menu trên cùng, chọn:
   👉 **Arrange $\rightarrow$ Insert $\rightarrow$ Advanced $\rightarrow$ From Text...**
3. Trong ô xổ xuống ở góc dưới bên phải, chọn định dạng **XML**, dán toàn bộ đoạn mã XML vào và nhấn **Insert**.
4. Sơ đồ sẽ xuất hiện hoàn chỉnh với đầy đủ Swimlanes, màu sắc pastel, nhãn chữ và đường nối chuẩn chỉnh.

---
*Bộ quy chuẩn này được áp dụng xuyên suốt cho tất cả các bản vẽ BPMN (CRM, Bán hàng, Mua hàng, Kho, Sản xuất, Kế toán) trong dự án ERP Nhựt Rạng.*
