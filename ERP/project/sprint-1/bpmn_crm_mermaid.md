# Sơ Đồ Quy Trình BPMN 2.0 Phân Hệ CRM (Bản Vẽ Đối Chiếu Bằng Mermaid)

> **Dự án:** Triển khai Odoo 18.0 ERP cho Công ty TNHH Nhựt Rạng  
> **Phân hệ:** Marketing & Quản lý Cơ hội Bán hàng B2B (CRM Pipeline)  
> **Mục đích:** Tài liệu đối chiếu trực quan 1:1 với mã nguồn XML Draw.io tại [`bpmn_crm.md`](file:///d:/KnowledgeLibrary/ERP/project/sprint-1/bpmn_crm.md)  
> **Quy chuẩn:** Tuân thủ cấu trúc Pools & Swimlanes, 6 Cục chính và 5 cấp độ tránh sai lầm từ [`rule-BPMN.md`](file:///d:/KnowledgeLibrary/ERP/project/rule-BPMN.md)  

---

## 1. Sơ Đồ Quy Trình Tổng Thể (Mermaid BPMN Diagram)

```mermaid
flowchart TD
    %% ==========================================
    %% POOL 1: KHÁCH HÀNG B2B (BLACK-BOX POOL)
    %% ==========================================
    subgraph Pool_Customer ["POOL 1: KHÁCH HÀNG B2B (Bộ phận Thu Mua & Kỹ Thuật Đối Tác)"]
        direction TB
        c_t1["Cung cấp quy cách &<br>yêu cầu kỹ thuật băng keo"]:::userTask
        c_t2["Thử nghiệm độ dính &<br>đánh giá chất lượng mẫu"]:::userTask
        c_t3["Thương lượng điều khoản &<br>Ký kết Hợp đồng Bán hàng"]:::userTask
    end

    %% ==========================================
    %% POOL 2: NỘI BỘ DOANH NGHIỆP NHỰT RẠNG (ODOO ERP)
    %% ==========================================
    subgraph Pool_NhutRang ["POOL 2: CÔNG TY TNHH NHỰT RẠNG (Hệ Thống Odoo ERP Doanh Nghiệp)"]
        direction TB

        %% LANE 1: MARKETING
        subgraph Lane_Marketing ["LANE 1: Bộ Phận Marketing"]
            direction LR
            mkt_start(["Bắt đầu: Phát hiện<br>nhu cầu thị trường"]):::startEvent
            mkt_t1["Tìm kiếm Lead tiềm năng<br>(Google / Triển lãm)"]:::userTask
            mkt_t2["Khởi tạo bản ghi Lead<br>trên Odoo CRM"]:::userTask
        end

        %% LANE 2: SALES B2B
        subgraph Lane_Sales ["LANE 2: Bộ Phận Kinh Doanh (Sales B2B)"]
            direction TB
            sales_t1["Chuyển đổi Lead thành<br>Cơ hội bán hàng (Opportunity)"]:::userTask
            sales_t2["Khảo sát quy cách &<br>Lập Phiếu xuất mẫu (0đ)"]:::userTask
            sales_t3["Ghi nhận phản hồi kết quả<br>thử nghiệm mẫu từ khách"]:::userTask
            
            gw_sample{"Mẫu đạt chuẩn?"}:::gateway
            sales_t_lost["Đóng cơ hội bán hàng<br>(Bắt buộc chọn lý do Lost)"]:::userTask
            sales_end_lost(["Kết thúc: Thất bại (Lost)"]):::endLostEvent

            sales_t4["Lập Báo giá (Quotation)<br>theo Bảng giá sỉ B2B"]:::userTask
            sales_renego["Đàm phán lại với khách về<br>Tiến độ giao hàng / Đơn giá"]:::userTask
            sales_t5["Xác nhận Đơn hàng bán<br>SALES ORDER (SO) trên Odoo"]:::userTask
        end

        %% LANE 3: KHO
        subgraph Lane_Kho ["LANE 3: Bộ Phận Kho (Inventory)"]
            direction LR
            kho_t1["Đóng gói cuộn mẫu &<br>Xuất kho bàn giao vận chuyển"]:::manualTask
        end

        %% LANE 4: SẢN XUẤT
        subgraph Lane_SX ["LANE 4: Xưởng Kỹ Thuật & Sản Xuất (Manufacturing)"]
            direction LR
            sx_t1["Thẩm định công suất máy &<br>Lịch vận hành xưởng WC1-4"]:::userTask
            gw_capacity{"Xưởng đáp ứng được?"}:::gateway
            sx_t2["Tự động khởi tạo Lệnh<br>Sản Xuất (Manufacturing MO)"]:::serviceTask
            sx_end_won(["Kết thúc: Chuyển giao SX<br>Thành công (Won)"]):::endWonEvent
        end

        %% LANE 5: BAN GIÁM ĐỐC
        subgraph Lane_GD ["LANE 5: Ban Giám Đốc"]
            direction LR
            gw_appr_check{"Cần Giám đốc duyệt?"}:::gateway
            gd_t1["Phê duyệt Báo giá / Đơn hàng<br>đặc thù vượt thẩm quyền"]:::userTask
            gw_gd_decision{"Giám đốc phê duyệt?"}:::gateway
        end
    end

    %% ==========================================
    %% SEQUENCE FLOWS (LUỒNG TUẦN TỰ NỘI BỘ NÉT LIỀN)
    %% ==========================================
    mkt_start --> mkt_t1
    mkt_t1 --> mkt_t2
    mkt_t2 --> sales_t1

    sales_t1 --> sales_t2
    sales_t2 --> kho_t1
    sales_t3 --> gw_sample

    %% Nhánh kiểm tra hàng mẫu
    gw_sample -- "Không đạt" --> sales_t_lost
    sales_t_lost --> sales_end_lost
    gw_sample -- "Đạt chuẩn" --> sales_t4

    %% Chuyển thẩm định kỹ thuật
    sales_t4 --> sx_t1
    sx_t1 --> gw_capacity

    %% Nhánh kiểm tra năng lực sản xuất
    gw_capacity -- "Quá tải xưởng" --> sales_renego
    sales_renego -- "Cập nhật Báo giá mới" --> sales_t4
    gw_capacity -- "Đủ năng lực" --> gw_appr_check

    %% Nhánh phê duyệt Giám đốc
    gw_appr_check -- "Chuẩn (Trong hạn mức Sales)" --> sales_t5
    gw_appr_check -- "Vượt hạn mức chiết khấu" --> gd_t1
    gd_t1 --> gw_gd_decision
    gw_gd_decision -- "Từ chối duyệt" --> sales_renego
    gw_gd_decision -- "Đồng ý duyệt" --> sales_t5

    %% Kích hoạt sản xuất và Kết thúc Won
    sales_t5 --> sx_t2
    sx_t2 --> sx_end_won

    %% ==========================================
    %% MESSAGE FLOWS (LUỒNG TƯƠNG TÁC LIÊN POOL NÉT ĐỨT)
    %% ==========================================
    sales_t2 -.->|"1. Khảo sát thông số & khổ băng keo"| c_t1
    kho_t1 -.->|"2. Bàn giao kiện hàng mẫu thử (0đ)"| c_t2
    c_t2 -.->|"3. Gửi kết quả kiểm tra mẫu (Đạt / Không đạt)"| sales_t3
    sales_t4 -.->|"4. Gửi Báo giá chính thức & Dự thảo Hợp đồng"| c_t3
    c_t3 -.->|"5. Gửi Hợp đồng bán hàng đã ký duyệt"| sales_t5

    %% ==========================================
    %% ĐỊNH NGHĨA PHONG CÁCH MÀU PASTEL CHUẨN
    %% ==========================================
    classDef userTask fill:#dae8fc,stroke:#6c8ebf,stroke-width:1.5px,color:#1d3557;
    classDef manualTask fill:#f1f5f9,stroke:#94a3b8,stroke-width:1.5px,color:#1e293b;
    classDef serviceTask fill:#e1d5e7,stroke:#9673a6,stroke-width:1.5px,color:#4a154b;
    classDef gateway fill:#fff2cc,stroke:#d6b656,stroke-width:1.5px,color:#7f6000;
    classDef startEvent fill:#d5e8d4,stroke:#82b366,stroke-width:1.5px,color:#274e13;
    classDef endWonEvent fill:#d5e8d4,stroke:#274e13,stroke-width:3px,color:#274e13;
    classDef endLostEvent fill:#f8cecc,stroke:#b85450,stroke-width:3px,color:#78281f;
```

---

## 2. Bảng Đối Chiếu 1:1 Giữa Bản Vẽ Mermaid Và Mã Nguồn XML Draw.io

Để bạn dễ dàng kiểm tra tính chính xác khi chuyển đổi giữa sơ đồ Mermaid và Draw.io XML tại [`bpmn_crm.md`](file:///d:/KnowledgeLibrary/ERP/project/sprint-1/bpmn_crm.md):

| Phần tử nghiệp vụ | ID trong mã XML Draw.io | ID trong mã Mermaid | Loại phần tử (BPMN Element) | Phân tầng Pool / Lane |
| :--- | :---: | :---: | :---: | :--- |
| **Bắt đầu nhu cầu thị trường** | `mkt_start` | `mkt_start` | Start Event | Lane 1: Marketing |
| **Tìm kiếm Lead tiềm năng** | `mkt_t1` | `mkt_t1` | User Task | Lane 1: Marketing |
| **Khởi tạo Lead trên Odoo** | `mkt_t2` | `mkt_t2` | User Task | Lane 1: Marketing |
| **Chuyển đổi thành Opportunity** | `sales_t1` | `sales_t1` | User Task | Lane 2: Sales B2B |
| **Lập Phiếu xuất mẫu (0đ)** | `sales_t2` | `sales_t2` | User Task | Lane 2: Sales B2B |
| **Tiếp nhận yêu cầu kỹ thuật** | `c_t1` | `c_t1` | User Task | Pool 1: Khách hàng B2B |
| **Xuất kho hàng mẫu thử** | `kho_t1` | `kho_t1` | Manual Task | Lane 3: Kho (Inventory) |
| **Thử nghiệm & Đánh giá mẫu** | `c_t2` | `c_t2` | User Task | Pool 1: Khách hàng B2B |
| **Ghi nhận phản hồi mẫu** | `sales_t3` | `sales_t3` | User Task | Lane 2: Sales B2B |
| **Cổng: Mẫu đạt chuẩn?** | `gw_sample` | `gw_sample` | Exclusive Gateway (XOR) | Lane 2: Sales B2B |
| **Đóng cơ hội (Ghi lý do Lost)** | `sales_t_lost` | `sales_t_lost` | User Task | Lane 2: Sales B2B |
| **Kết thúc: Thất bại (Lost)** | `sales_end_lost` | `sales_end_lost` | End Event (Lost) | Lane 2: Sales B2B |
| **Lập Báo giá theo Pricelist** | `sales_t4` | `sales_t4` | User Task | Lane 2: Sales B2B |
| **Thẩm định công suất xưởng** | `sx_t1` | `sx_t1` | User Task | Lane 4: Xưởng Sản Xuất |
| **Cổng: Xưởng đáp ứng được?** | `gw_capacity` | `gw_capacity` | Exclusive Gateway (XOR) | Lane 4: Xưởng Sản Xuất |
| **Đàm phán lại tiến độ / giá** | `sales_renego` | `sales_renego` | User Task (Loopback) | Lane 2: Sales B2B |
| **Cổng: Cần Giám đốc duyệt?** | `gw_appr_check` | `gw_appr_check` | Exclusive Gateway (XOR) | Lane 5: Ban Giám Đốc |
| **Phê duyệt báo giá vượt sàn** | `gd_t1` | `gd_t1` | User Task | Lane 5: Ban Giám Đốc |
| **Cổng: Giám đốc phê duyệt?** | `gw_gd_decision` | `gw_gd_decision` | Exclusive Gateway (XOR) | Lane 5: Ban Giám Đốc |
| **Ký kết hợp đồng thương mại** | `c_t3` | `c_t3` | User Task | Pool 1: Khách hàng B2B |
| **Xác nhận Sales Order (SO)** | `sales_t5` | `sales_t5` | User Task | Lane 2: Sales B2B |
| **Tự động tạo Lệnh Sản Xuất** | `sx_t2` | `sx_t2` | Service Task (Odoo) | Lane 4: Xưởng Sản Xuất |
| **Kết thúc: Thành công (Won)** | `sx_end_won` | `sx_end_won` | End Event (Won) | Lane 4: Xưởng Sản Xuất |

---

## 3. Bản Đồ Đối Chiếu 5 Luồng Thông Điệp Liên Pool (Message Flows)

Các đường nét đứt (`-.->`) kết nối giữa **Khách hàng** và **Nhựt Rạng** thể hiện chính xác các tương tác ngoài đời thực:

1. **`sales_t2` $\dashrightarrow$ `c_t1`:** Nhân viên Sales gửi phiếu khảo sát thông số băng keo (khổ màng, độ dính mic, quy cách cuộn) cho phòng Thu mua.
2. **`kho_t1` $\dashrightarrow$ `c_t2`:** Thủ kho xuất kiện hàng mẫu thử (SO-SAMPLE giá 0đ) giao cho đơn vị vận chuyển chuyển đến tận tay khách hàng.
3. **`c_t2` $\dashrightarrow$ `sales_t3`:** Bộ phận Kỹ thuật/Thu mua của khách gửi biên bản nghiệm thu chất lượng mẫu thử (Đạt / Không đạt) về cho Sales.
4. **`sales_t4` $\dashrightarrow$ `c_t3`:** Sales gửi Báo giá chính thức và Dự thảo Hợp đồng nguyên tắc sang khách đàm phán.
5. **`c_t3` $\dashrightarrow$ `sales_t5`:** Khách hàng gửi bản Hợp đồng đã ký đóng dấu về cho Sales để xác nhận chính thức đơn hàng trên Odoo ERP.

---

## 4. Ưu Điểm Khi Sử Dụng Cả 2 Định Dạng (Mermaid vs Draw.io XML)

| Tiêu chí | Sơ đồ Mermaid (`bpmn_crm_mermaid.md`) | Sơ đồ Draw.io XML (`bpmn_crm.md`) |
| :--- | :--- | :--- |
| **Khả năng xem trước (Preview)** | **Xem trực tiếp tức thì** trong giao diện Markdown / GitHub / VS Code mà không cần cài thêm phần mềm. | Cần copy dán vào Draw.io để xem và kéo chỉnh sửa chi tiết. |
| **Mục đích sử dụng** | Dùng để đối soát nhanh logic luồng, kiểm tra rẽ nhánh và báo cáo tiến độ tài liệu. | Dùng làm bản vẽ kỹ thuật chính thức, xuất file PDF/PNG độ phân giải cao nộp đồ án/khách hàng. |
| **Tính đồng nhất** | Chuẩn hóa tên Node, nhãn điều kiện và mã màu pastel 100% khớp với bản XML. | Căn chỉnh tọa độ pixel chính xác, không đè chữ, bẻ góc vuông vức. |
