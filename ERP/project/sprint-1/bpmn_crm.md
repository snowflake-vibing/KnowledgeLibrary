# Sơ Đồ Quy Trình BPMN 2.0 Phân Hệ CRM (Mã Nguồn Draw.io XML)

> **Dự án:** Triển khai Odoo 18.0 ERP cho Công ty TNHH Nhựt Rạng  
> **Phân hệ:** Marketing & Quản lý Cơ hội Bán hàng B2B (CRM Pipeline)  
> **Quy chuẩn thiết kế:** Tuân thủ 100% tài liệu [rule-BPMN.md](file:///d:/KnowledgeLibrary/ERP/project/rule-BPMN.md) và thực chiến từ bộ bài giảng BPMN Thinhnotes  
> **Công cụ hỗ trợ:** Draw.io (diagrams.net)  

---

## 1. Hướng Dẫn 3 Bước Nạp Sơ Đồ Vào Draw.io

Để xem và chỉnh sửa sơ đồ này với đầy đủ các Pools, Swimlanes, màu sắc Pastel và đường nối tự động bẻ góc vuông:

1. **Bước 1:** Mở trình duyệt và truy cập [**app.diagrams.net**](https://app.diagrams.net/) (hoặc mở ứng dụng Draw.io trên máy tính).
2. **Bước 2:** Trên thanh menu trên cùng, chọn:  
   👉 **Arrange $\rightarrow$ Insert $\rightarrow$ Advanced $\rightarrow$ From Text...**  
   *(Nếu dùng giao diện tiếng Việt: **Sắp xếp $\rightarrow$ Chèn $\rightarrow$ Nâng cao $\rightarrow$ Từ văn bản...**)*
3. **Bước 3:** Ở góc dưới bên phải hộp thoại, chuyển định dạng từ *Diagram* sang **XML**. Sau đó **Copy toàn bộ khối mã XML ở Mục 2 bên dưới**, dán vào khung văn bản và nhấn nút **Insert (Chèn)**.

---

## 2. Mã Nguồn Draw.io XML (`mxGraphModel`)

```xml
<mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="2200" pageHeight="1100" math="0" shadow="0">
  <root>
    <mxCell id="0"/>
    <mxCell id="1" parent="0"/>

    <!-- POOL 1: KHÁCH HÀNG B2B (BLACK-BOX POOL) -->
    <mxCell id="pool_customer" value="KHÁCH HÀNG B2B (Bộ phận Thu mua &amp; Kỹ thuật)" style="swimlane;html=1;childLayout=stackLayout;resizeParent=1;resizeParentMax=0;startSize=30;horizontal=0;horizontalFlip=0;fillColor=#f8f9fa;strokeColor=#666666;fontColor=#333333;fontStyle=1;fontSize=14;" vertex="1" parent="1">
      <mxGeometry x="40" y="40" width="1980" height="130" as="geometry"/>
    </mxCell>
    <mxCell id="lane_customer" value="Phòng Thu Mua / Đối tác" style="swimlane;html=1;startSize=26;horizontal=0;fillColor=#ffffff;strokeColor=#b3b3b3;fontColor=#1f2937;fontStyle=1;fontSize=12;collapsible=0;" vertex="1" parent="pool_customer">
      <mxGeometry x="30" y="0" width="1950" height="130" as="geometry"/>
    </mxCell>

    <!-- Tasks in Customer Pool -->
    <mxCell id="cust_task1" value="Tiếp nhận chào hàng &amp;amp; Cung cấp yêu cầu kỹ thuật" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;" vertex="1" parent="lane_customer">
      <mxGeometry x="480" y="35" width="160" height="60" as="geometry"/>
    </mxCell>
    <mxCell id="cust_task2" value="Thử nghiệm &amp;amp; Đánh giá chất lượng hàng mẫu" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;" vertex="1" parent="lane_customer">
      <mxGeometry x="720" y="35" width="160" height="60" as="geometry"/>
    </mxCell>
    <mxCell id="cust_task3" value="Đàm phán Báo giá &amp;amp; Ký Hợp đồng Bán hàng" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;" vertex="1" parent="lane_customer">
      <mxGeometry x="1680" y="35" width="160" height="60" as="geometry"/>
    </mxCell>

    <!-- POOL 2: CÔNG TY TNHH NHỰT RẠNG (WHITE-BOX POOL) -->
    <mxCell id="pool_nhutrang" value="CÔNG TY TNHH NHỰT RẠNG (Nội bộ Doanh nghiệp ERP)" style="swimlane;html=1;childLayout=stackLayout;resizeParent=1;resizeParentMax=0;startSize=30;horizontal=0;horizontalFlip=0;fillColor=#f8f9fa;strokeColor=#666666;fontColor=#333333;fontStyle=1;fontSize=14;" vertex="1" parent="1">
      <mxGeometry x="40" y="220" width="1980" height="740" as="geometry"/>
    </mxCell>

    <!-- LANE 1: MARKETING -->
    <mxCell id="lane_mkt" value="Bộ phận Marketing" style="swimlane;html=1;startSize=26;horizontal=0;fillColor=#ffffff;strokeColor=#b3b3b3;fontColor=#1f2937;fontStyle=1;fontSize=12;collapsible=0;" vertex="1" parent="pool_nhutrang">
      <mxGeometry x="30" y="0" width="1950" height="140" as="geometry"/>
    </mxCell>
    <mxCell id="mkt_start" value="Phát hiện nhu cầu thị trường" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#d5e8d4;strokeColor=#82b366;fontColor=#274e13;fontSize=10;strokeWidth=1.5;" vertex="1" parent="lane_mkt">
      <mxGeometry x="40" y="50" width="40" height="40" as="geometry"/>
    </mxCell>
    <mxCell id="mkt_t1" value="Tìm kiếm thông tin Lead tiềm năng (Google/Web)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;" vertex="1" parent="lane_mkt">
      <mxGeometry x="120" y="40" width="150" height="60" as="geometry"/>
    </mxCell>
    <mxCell id="mkt_t2" value="Khởi tạo Lead trên Odoo CRM" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;" vertex="1" parent="lane_mkt">
      <mxGeometry x="310" y="40" width="150" height="60" as="geometry"/>
    </mxCell>

    <!-- LANE 2: SALES B2B -->
    <mxCell id="lane_sales" value="Bộ phận Kinh doanh (Sales B2B)" style="swimlane;html=1;startSize=26;horizontal=0;fillColor=#ffffff;strokeColor=#b3b3b3;fontColor=#1f2937;fontStyle=1;fontSize=12;collapsible=0;" vertex="1" parent="pool_nhutrang">
      <mxGeometry x="30" y="140" width="1950" height="160" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t1" value="Chuyển đổi Lead thành Opportunity" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;" vertex="1" parent="lane_sales">
      <mxGeometry x="310" y="35" width="150" height="60" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t2" value="Khảo sát quy cách &amp;amp; Lập Phiếu xuất mẫu (0đ)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;" vertex="1" parent="lane_sales">
      <mxGeometry x="500" y="35" width="160" height="60" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t3" value="Ghi nhận phản hồi đánh giá hàng mẫu" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;" vertex="1" parent="lane_sales">
      <mxGeometry x="720" y="35" width="160" height="60" as="geometry"/>
    </mxCell>
    <mxCell id="gw_sample" value="Mẫu đạt chuẩn?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontColor=#7f6000;fontSize=11;fontStyle=1;strokeWidth=1.5;" vertex="1" parent="lane_sales">
      <mxGeometry x="920" y="40" width="50" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="sales_lost" value="Đóng cơ hội (Ghi nhận lý do Lost)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;" vertex="1" parent="lane_sales">
      <mxGeometry x="920" y="100" width="150" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="sales_end_lost" value="Thất bại (Lost)" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#f8cecc;strokeColor=#b85450;fontColor=#78281f;fontSize=10;strokeWidth=3;" vertex="1" parent="lane_sales">
      <mxGeometry x="1100" y="105" width="40" height="40" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t4" value="Lập Báo giá (Quotation) &amp;amp; Bảng giá sỉ B2B" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;" vertex="1" parent="lane_sales">
      <mxGeometry x="1010" y="35" width="160" height="60" as="geometry"/>
    </mxCell>
    <mxCell id="sales_renego" value="Đàm phán lại thời gian giao hàng / Đơn giá" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;" vertex="1" parent="lane_sales">
      <mxGeometry x="1330" y="95" width="160" height="55" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t5" value="Xác nhận Sales Order (SO) trên Odoo" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;" vertex="1" parent="lane_sales">
      <mxGeometry x="1680" y="35" width="160" height="60" as="geometry"/>
    </mxCell>

    <!-- LANE 3: KHO (INVENTORY) -->
    <mxCell id="lane_kho" value="Bộ phận Kho (Inventory)" style="swimlane;html=1;startSize=26;horizontal=0;fillColor=#ffffff;strokeColor=#b3b3b3;fontColor=#1f2937;fontStyle=1;fontSize=12;collapsible=0;" vertex="1" parent="pool_nhutrang">
      <mxGeometry x="30" y="300" width="1950" height="130" as="geometry"/>
    </mxCell>
    <mxCell id="kho_t1" value="Xuất kho &amp;amp; Đóng gói hàng mẫu gửi khách" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#e2e8f0;strokeColor=#94a3b8;fontColor=#1e293b;fontSize=11;strokeWidth=1.5;" vertex="1" parent="lane_kho">
      <mxGeometry x="500" y="35" width="160" height="60" as="geometry"/>
    </mxCell>

    <!-- LANE 4: SẢN XUẤT (MANUFACTURING) -->
    <mxCell id="lane_sx" value="Xưởng Kỹ thuật &amp;amp; Sản xuất" style="swimlane;html=1;startSize=26;horizontal=0;fillColor=#ffffff;strokeColor=#b3b3b3;fontColor=#1f2937;fontStyle=1;fontSize=12;collapsible=0;" vertex="1" parent="pool_nhutrang">
      <mxGeometry x="30" y="430" width="1950" height="150" as="geometry"/>
    </mxCell>
    <mxCell id="sx_t1" value="Thẩm định công suất xưởng &amp;amp; Định mức BOM" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;" vertex="1" parent="lane_sx">
      <mxGeometry x="1010" y="35" width="160" height="60" as="geometry"/>
    </mxCell>
    <mxCell id="gw_capacity" value="Xưởng đáp ứng được?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontColor=#7f6000;fontSize=11;fontStyle=1;strokeWidth=1.5;" vertex="1" parent="lane_sx">
      <mxGeometry x="1210" y="40" width="50" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="sx_t2" value="Tự động tạo Lệnh Sản Xuất (MO)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#e1d5e7;strokeColor=#9673a6;fontColor=#4a154b;fontSize=11;strokeWidth=1.5;" vertex="1" parent="lane_sx">
      <mxGeometry x="1680" y="35" width="160" height="60" as="geometry"/>
    </mxCell>
    <mxCell id="sx_end_won" value="Chuyển Lệnh SX (Won)" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#d5e8d4;strokeColor=#274e13;fontColor=#274e13;fontSize=10;strokeWidth=3;" vertex="1" parent="lane_sx">
      <mxGeometry x="1880" y="45" width="40" height="40" as="geometry"/>
    </mxCell>

    <!-- LANE 5: BAN GIÁM ĐỐC -->
    <mxCell id="lane_gd" value="Ban Giám Đốc" style="swimlane;html=1;startSize=26;horizontal=0;fillColor=#ffffff;strokeColor=#b3b3b3;fontColor=#1f2937;fontStyle=1;fontSize=12;collapsible=0;" vertex="1" parent="pool_nhutrang">
      <mxGeometry x="30" y="580" width="1950" height="160" as="geometry"/>
    </mxCell>
    <mxCell id="gw_approval_needed" value="Cần duyệt vượt hạn mức?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontColor=#7f6000;fontSize=11;fontStyle=1;strokeWidth=1.5;" vertex="1" parent="lane_gd">
      <mxGeometry x="1210" y="40" width="50" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="gd_t1" value="Phê duyệt Báo giá / Đơn hàng đặc biệt" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;" vertex="1" parent="lane_gd">
      <mxGeometry x="1330" y="35" width="160" height="60" as="geometry"/>
    </mxCell>
    <mxCell id="gw_gd_decision" value="Giám đốc phê duyệt?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontColor=#7f6000;fontSize=11;fontStyle=1;strokeWidth=1.5;" vertex="1" parent="lane_gd">
      <mxGeometry x="1530" y="40" width="50" height="50" as="geometry"/>
    </mxCell>

    <!-- DATA OBJECTS (CHỨNG TỪ NỀN TẢNG) -->
    <mxCell id="data_lead" value="Thông tin Lead&#xa;(Tên, MST, SĐT)" style="shape=note;whiteSpace=wrap;html=1;size=14;verticalAlign=top;fillColor=#ffffff;strokeColor=#999999;fontColor=#333333;fontSize=10;" vertex="1" parent="lane_mkt">
      <mxGeometry x="170" y="105" width="80" height="30" as="geometry"/>
    </mxCell>
    <mxCell id="data_sample" value="Phiếu xuất mẫu (0đ)&#xa;SO-SAMPLE" style="shape=note;whiteSpace=wrap;html=1;size=14;verticalAlign=top;fillColor=#ffffff;strokeColor=#999999;fontColor=#333333;fontSize=10;" vertex="1" parent="lane_sales">
      <mxGeometry x="540" y="100" width="90" height="35" as="geometry"/>
    </mxCell>
    <mxCell id="data_quotation" value="Báo giá nháp&#xa;SO-DRAFT" style="shape=note;whiteSpace=wrap;html=1;size=14;verticalAlign=top;fillColor=#ffffff;strokeColor=#999999;fontColor=#333333;fontSize=10;" vertex="1" parent="lane_sales">
      <mxGeometry x="1050" y="100" width="90" height="35" as="geometry"/>
    </mxCell>
    <mxCell id="data_so" value="Đơn bán hàng chính thức&#xa;SALES ORDER (SO)" style="shape=note;whiteSpace=wrap;html=1;size=14;verticalAlign=top;fillColor=#ffffff;strokeColor=#999999;fontColor=#333333;fontSize=10;" vertex="1" parent="lane_sales">
      <mxGeometry x="1710" y="100" width="110" height="35" as="geometry"/>
    </mxCell>

    <!-- ==================== FLOWS / EDGES ==================== -->
    <!-- Sequence Flows in Marketing -->
    <mxCell id="e_mkt1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;fontSize=10;" edge="1" parent="pool_nhutrang" source="mkt_start" target="mkt_t1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_mkt2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;fontSize=10;" edge="1" parent="pool_nhutrang" source="mkt_t1" target="mkt_t2">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_mkt_sales" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;fontSize=10;" edge="1" parent="pool_nhutrang" source="mkt_t2" target="sales_t1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>

    <!-- Sequence Flows in Sales -->
    <mxCell id="e_sales1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;fontSize=10;" edge="1" parent="pool_nhutrang" source="sales_t1" target="sales_t2">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_sales_kho" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;fontSize=10;" edge="1" parent="pool_nhutrang" source="sales_t2" target="kho_t1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_sales_gw_sample" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;fontSize=10;" edge="1" parent="pool_nhutrang" source="sales_t3" target="gw_sample">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_sample_fail" value="Không đạt" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;fontSize=10;" edge="1" parent="pool_nhutrang" source="gw_sample" target="sales_lost">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_sample_lost_end" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;fontSize=10;" edge="1" parent="pool_nhutrang" source="sales_lost" target="sales_end_lost">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_sample_pass" value="Đạt chuẩn" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;fontSize=10;" edge="1" parent="pool_nhutrang" source="gw_sample" target="sales_t4">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_sales_sx" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;fontSize=10;" edge="1" parent="pool_nhutrang" source="sales_t4" target="sx_t1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>

    <!-- Sequence Flows in Manufacturing & Capacity -->
    <mxCell id="e_sx1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;fontSize=10;" edge="1" parent="pool_nhutrang" source="sx_t1" target="gw_capacity">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_cap_fail" value="Quá tải xưởng" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;fontSize=10;" edge="1" parent="pool_nhutrang" source="gw_capacity" target="sales_renego">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_renego_loop" value="Thỏa thuận mới" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;fontSize=10;" edge="1" parent="pool_nhutrang" source="sales_renego" target="sales_t4">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1270" y="260"/>
          <mxPoint x="1270" y="175"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="e_cap_pass" value="Đủ năng lực" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;fontSize=10;" edge="1" parent="pool_nhutrang" source="gw_capacity" target="gw_approval_needed">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>

    <!-- Sequence Flows in Management / Approval -->
    <mxCell id="e_no_appr" value="Chuẩn (Không cần duyệt)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;fontSize=10;" edge="1" parent="pool_nhutrang" source="gw_approval_needed" target="sales_t5">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1235" y="720"/>
          <mxPoint x="1640" y="720"/>
          <mxPoint x="1640" y="175"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="e_need_appr" value="Vượt hạn mức chiết khấu" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;fontSize=10;" edge="1" parent="pool_nhutrang" source="gw_approval_needed" target="gd_t1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_gd1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;fontSize=10;" edge="1" parent="pool_nhutrang" source="gd_t1" target="gw_gd_decision">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_gd_reject" value="Từ chối" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;fontSize=10;" edge="1" parent="pool_nhutrang" source="gw_gd_decision" target="sales_renego">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1555" y="560"/>
          <mxPoint x="1410" y="560"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="e_gd_accept" value="Đồng ý duyệt" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;fontSize=10;" edge="1" parent="pool_nhutrang" source="gw_gd_decision" target="sales_t5">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1620" y="650"/>
          <mxPoint x="1620" y="175"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="e_so_mo" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;fontSize=10;" edge="1" parent="pool_nhutrang" source="sales_t5" target="sx_t2">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_mo_end" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#4a5568;strokeWidth=1.5;fontSize=10;" edge="1" parent="pool_nhutrang" source="sx_t2" target="sx_end_won">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>

    <!-- ==================== MESSAGE FLOWS (INTER-POOL) ==================== -->
    <!-- 1. Trao đổi khảo sát yêu cầu -->
    <mxCell id="mf_survey" value="Khảo sát thông số &amp;amp; mẫu yêu cầu" style="edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=6 6;html=1;startArrow=oval;startFill=0;endArrow=block;endFill=0;strokeColor=#0284c7;strokeWidth=1.5;fontSize=10;" edge="1" parent="1" source="sales_t2" target="cust_task1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <!-- 2. Giao hàng mẫu vật lý sang khách hàng -->
    <mxCell id="mf_sample" value="Gửi kiện hàng mẫu thử (0đ)" style="edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=6 6;html=1;startArrow=oval;startFill=0;endArrow=block;endFill=0;strokeColor=#0284c7;strokeWidth=1.5;fontSize=10;" edge="1" parent="1" source="kho_t1" target="cust_task2">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <!-- 3. Khách hàng gửi kết quả đánh giá mẫu về Sales -->
    <mxCell id="mf_feedback" value="Biên bản đánh giá mẫu (Đạt / Không đạt)" style="edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=6 6;html=1;startArrow=oval;startFill=0;endArrow=block;endFill=0;strokeColor=#0284c7;strokeWidth=1.5;fontSize=10;" edge="1" parent="1" source="cust_task2" target="sales_t3">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <!-- 4. Gửi báo giá & Hợp đồng chính thức sang khách ký -->
    <mxCell id="mf_quotation" value="Gửi Báo giá chính thức &amp;amp; Dự thảo Hợp đồng" style="edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=6 6;html=1;startArrow=oval;startFill=0;endArrow=block;endFill=0;strokeColor=#0284c7;strokeWidth=1.5;fontSize=10;" edge="1" parent="1" source="sales_t4" target="cust_task3">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <!-- 5. Khách gửi hợp đồng đã ký về xác nhận Sales Order -->
    <mxCell id="mf_contract_signed" value="Hợp đồng thương mại đã ký kết" style="edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=6 6;html=1;startArrow=oval;startFill=0;endArrow=block;endFill=0;strokeColor=#0284c7;strokeWidth=1.5;fontSize=10;" edge="1" parent="1" source="cust_task3" target="sales_t5">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>

  </root>
</mxGraphModel>
```

---

## 3. Bản Đồ Đối Chiếu Các Thành Phần Nghiệp Vụ Trong Sơ Đồ

### 3.1. Cấu trúc Pools & Swimlanes
* **Pool 1: Khách hàng B2B (Black-box Pool):**
  * Đại diện phòng Thu mua & Kỹ thuật đối tác.
  * Chỉ tương tác qua **Message Flow** (nét đứt) gồm: Cung cấp yêu cầu kỹ thuật $\rightarrow$ Nhận hàng mẫu thử $\rightarrow$ Gửi biên bản đánh giá mẫu $\rightarrow$ Ký hợp đồng thương mại.
* **Pool 2: Công ty TNHH Nhựt Rạng (White-box Pool):** Gồm 5 làn bơi (Lanes) chịu trách nhiệm xuyên suốt:
  1. **Bộ phận Marketing:** Tìm kiếm Lead từ Google/Web $\rightarrow$ Khởi tạo bản ghi Lead trên Odoo CRM.
  2. **Bộ phận Kinh doanh (Sales B2B):** Chuyển đổi Lead thành Opportunity $\rightarrow$ Khảo sát quy cách & lập Phiếu xuất mẫu (SO-SAMPLE giá 0đ) $\rightarrow$ Ghi nhận kết quả thử mẫu $\rightarrow$ Lập Báo giá (Quotation) $\rightarrow$ Xác nhận Sales Order (SO).
  3. **Bộ phận Kho (Inventory):** Tiếp nhận đơn xuất mẫu, đóng gói và bàn giao mẫu băng keo/màng PE thực tế đến khách.
  4. **Xưởng Kỹ thuật & Sản xuất:** Thẩm định công suất xưởng (`WC-100` đến `WC-400`) & định mức vật tư BOM $\rightarrow$ Tự động sinh Lệnh Sản Xuất (**Manufacturing Order - MO**) khi đơn hàng được chốt.
  5. **Ban Giám Đốc:** Kiểm soát ma trận phê duyệt cấp cao (Approval Matrix) khi đơn hàng vượt hạn mức chiết khấu hoặc đơn giá dưới mức sàn.

### 3.2. Hệ thống Cổng điều kiện (Gateways) & Xử lý Ngoại lệ
1. **`Mẫu đạt chuẩn?` (XOR):**
   * *Không đạt:* Kích hoạt tác vụ đóng cơ hội và ghi nhận nguyên nhân thất bại (**Lost Reason**: lỗi kỹ thuật, độ bám dính yếu, sai tone màu) $\rightarrow$ Điểm kết thúc **End Event - Thất bại (Lost)**.
   * *Đạt chuẩn:* Kích hoạt bước lập Báo giá (Quotation) và áp dụng Bảng giá sỉ B2B (`Pricelists`).
2. **`Xưởng đáp ứng được?` (XOR):**
   * *Quá tải công suất:* Kích hoạt tác vụ đàm phán lại thời gian giao hàng (Lead time) với khách hàng $\rightarrow$ Vòng lặp quay lại cập nhật báo giá.
   * *Đủ năng lực:* Chuyển tiếp sang kiểm tra hạn mức thẩm quyền.
3. **`Cần duyệt vượt hạn mức?` & `Giám đốc phê duyệt?` (XOR):**
   * *Đơn hàng chuẩn (trong thẩm quyền của Sales):* Tự động cho phép ký hợp đồng và xác nhận Sales Order.
   * *Đơn hàng đặc thù / Chiết khấu cao:* Trình Giám đốc duyệt trực tiếp. Nếu Giám đốc từ chối $\rightarrow$ Quay về vòng đàm phán lại đơn giá với phòng Thu mua của khách.

### 3.3. Dữ liệu & Chứng từ Luân chuyển (Data Objects)
* `Thông tin Lead`: Tên công ty, Mã số thuế, Thông tin liên hệ phòng Thu mua.
* `Phiếu xuất mẫu (SO-SAMPLE 0đ)`: Ghi nhận chi phí hàng mẫu vào tài khoản Marketing/R&D và trừ kho mẫu.
* `Báo giá nháp (SO-DRAFT)`: Đính kèm điều khoản thanh toán, quy cách kỹ thuật và tỷ lệ chiết khấu.
* `Đơn bán hàng chính thức (SALES ORDER)`: Chứng từ cốt lõi liên thông sang phân hệ Sản xuất để tự động sinh lệnh MO.

---

## 4. Cam Kết Tuân Thủ Bộ Quy Chuẩn `rule-BPMN.md`

| Tiêu chí | Mức độ tuân thủ | Chi tiết thực thi trong mã XML |
| :--- | :---: | :--- |
| **Quy tắc Flow** | **100% Chuẩn** | Sequence Flow (nét liền) chỉ nối trong cùng Pool; Message Flow (nét đứt đầu tròn rỗng) nối giữa 2 Pool. |
| **Quy tắc Swimlane** | **100% Chuẩn** | Tuyệt đối không có Task nào nằm đè lên vạch ngăn cách giữa 2 Lane. |
| **Quy tắc đặt tên** | **100% Chuẩn** | Toàn bộ Task có dạng `[Động từ] + [Đối tượng]`; Gateway kết thúc bằng dấu hỏi `?`. |
| **Thẩm mỹ & Bố cục** | **100% Chuẩn** | Bố cục từ Trái sang Phải, căn thẳng hàng trục $Y$, đường nối bo góc trực giao (orthogonal), không có tình trạng 'dăng màn nhện'. |
| **Màu sắc Pastel** | **100% Chuẩn** | Sử dụng bảng màu dịu mắt: Task xanh dương `#dae8fc`, Hệ thống tím `#e1d5e7`, Gateway vàng `#fff2cc`, Start xanh lá `#d5e8d4`, End đỏ `#f8cecc`. |