# Sơ Đồ Quy Trình BPMN 2.0 Phân Hệ CRM (Mã Nguồn Draw.io XML v2.0)

> **Dự án:** Triển khai Odoo 18.0 ERP cho Công ty TNHH Nhựt Rạng  
> **Phân hệ:** Marketing & Quản lý Cơ hội Bán hàng B2B (CRM Pipeline)  
> **Phiên bản:** **v2.0 - Chuẩn hóa Bố cục Cột Lưới & Triệt tiêu lỗi đè chữ (No Text Collision)**  
> **Quy chuẩn thiết kế:** Tuân thủ 100% tài liệu [rule-BPMN.md (v2.0)](file:///d:/KnowledgeLibrary/ERP/project/rule-BPMN.md)  
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

## 2. Mã Nguồn Draw.io XML v2.0 (`mxGraphModel`)

```xml
<mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="2200" pageHeight="1150" math="0" shadow="0">
  <root>
    <mxCell id="0"/>
    <mxCell id="1" parent="0"/>

    <!-- ==================== POOL 1: KHÁCH HÀNG B2B ==================== -->
    <mxCell id="pool_cust" value="KHÁCH HÀNG B2B (Bộ phận Thu mua &amp;amp; Kỹ thuật đối tác)" style="swimlane;html=1;childLayout=stackLayout;resizeParent=1;resizeParentMax=0;startSize=30;horizontal=0;horizontalFlip=0;fillColor=#f8f9fa;strokeColor=#4b5563;fontColor=#111827;fontStyle=1;fontSize=13;" vertex="1" parent="1">
      <mxGeometry x="40" y="40" width="2060" height="130" as="geometry"/>
    </mxCell>
    <mxCell id="lane_cust" value="Phòng Thu Mua / Đối tác" style="swimlane;html=1;startSize=26;horizontal=0;fillColor=#ffffff;strokeColor=#cbd5e1;fontColor=#1e293b;fontStyle=1;fontSize=12;collapsible=0;" vertex="1" parent="pool_cust">
      <mxGeometry x="30" y="0" width="2030" height="130" as="geometry"/>
    </mxCell>
    <mxCell id="c_t1" value="Cung cấp quy cách &amp;amp;&#xa;yêu cầu kỹ thuật băng keo" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;spacing=4;align=center;verticalAlign=middle;" vertex="1" parent="lane_cust">
      <mxGeometry x="540" y="32" width="165" height="65" as="geometry"/>
    </mxCell>
    <mxCell id="c_t2" value="Thử nghiệm độ dính &amp;amp;&#xa;chất lượng hàng mẫu thực tế" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;spacing=4;align=center;verticalAlign=middle;" vertex="1" parent="lane_cust">
      <mxGeometry x="770" y="32" width="165" height="65" as="geometry"/>
    </mxCell>
    <mxCell id="c_t3" value="Thương lượng điều khoản &amp;amp;&#xa;Ký kết Hợp đồng Bán hàng" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;spacing=4;align=center;verticalAlign=middle;" vertex="1" parent="lane_cust">
      <mxGeometry x="1700" y="32" width="165" height="65" as="geometry"/>
    </mxCell>

    <!-- ==================== POOL 2: NỘI BỘ NHỰT RẠNG ==================== -->
    <mxCell id="pool_nr" value="CÔNG TY TNHH NHỰT RẠNG (Hệ thống Odoo ERP Doanh nghiệp)" style="swimlane;html=1;childLayout=stackLayout;resizeParent=1;resizeParentMax=0;startSize=30;horizontal=0;horizontalFlip=0;fillColor=#f8f9fa;strokeColor=#4b5563;fontColor=#111827;fontStyle=1;fontSize=13;" vertex="1" parent="1">
      <mxGeometry x="40" y="220" width="2060" height="770" as="geometry"/>
    </mxCell>

    <!-- LANE 1: MARKETING (y_offset = 0, h = 130) -->
    <mxCell id="l_mkt" value="Bộ phận Marketing" style="swimlane;html=1;startSize=26;horizontal=0;fillColor=#ffffff;strokeColor=#cbd5e1;fontColor=#1e293b;fontStyle=1;fontSize=12;collapsible=0;" vertex="1" parent="pool_nr">
      <mxGeometry x="30" y="0" width="2030" height="130" as="geometry"/>
    </mxCell>
    <mxCell id="mkt_start" value="Phát hiện nhu cầu&#xa;thị trường B2B" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#d5e8d4;strokeColor=#82b366;fontColor=#274e13;fontSize=10;strokeWidth=1.5;verticalLabelPosition=bottom;verticalAlign=top;labelBackgroundColor=#ffffff;spacingBottom=2;" vertex="1" parent="l_mkt">
      <mxGeometry x="50" y="45" width="40" height="40" as="geometry"/>
    </mxCell>
    <mxCell id="mkt_t1" value="Tìm kiếm thông tin Lead&#xa;tiềm năng (Google/Triển lãm)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;spacing=4;align=center;verticalAlign=middle;" vertex="1" parent="l_mkt">
      <mxGeometry x="130" y="32" width="165" height="65" as="geometry"/>
    </mxCell>
    <mxCell id="mkt_t2" value="Khởi tạo bản ghi Lead&#xa;trên hệ thống Odoo CRM" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;spacing=4;align=center;verticalAlign=middle;" vertex="1" parent="l_mkt">
      <mxGeometry x="330" y="32" width="165" height="65" as="geometry"/>
    </mxCell>

    <!-- LANE 2: SALES B2B (y_offset = 130, h = 190 -> Spacious for branches & loops) -->
    <mxCell id="l_sales" value="Bộ phận Kinh doanh (Sales B2B)" style="swimlane;html=1;startSize=26;horizontal=0;fillColor=#ffffff;strokeColor=#cbd5e1;fontColor=#1e293b;fontStyle=1;fontSize=12;collapsible=0;" vertex="1" parent="pool_nr">
      <mxGeometry x="30" y="130" width="2030" height="190" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t1" value="Chuyển đổi Lead thành&#xa;Cơ hội bán hàng (Opportunity)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;spacing=4;align=center;verticalAlign=middle;" vertex="1" parent="l_sales">
      <mxGeometry x="330" y="30" width="165" height="65" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t2" value="Khảo sát thông số &amp;amp;&#xa;Lập Phiếu xuất mẫu (0đ)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;spacing=4;align=center;verticalAlign=middle;" vertex="1" parent="l_sales">
      <mxGeometry x="540" y="30" width="165" height="65" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t3" value="Ghi nhận phản hồi kết quả&#xa;thử nghiệm mẫu từ khách" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;spacing=4;align=center;verticalAlign=middle;" vertex="1" parent="l_sales">
      <mxGeometry x="770" y="30" width="165" height="65" as="geometry"/>
    </mxCell>
    <mxCell id="gw_sample" value="Mẫu đạt chuẩn?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontColor=#7f6000;fontSize=11;fontStyle=1;strokeWidth=1.5;verticalLabelPosition=top;verticalAlign=bottom;labelBackgroundColor=#ffffff;spacingTop=-4;" vertex="1" parent="l_sales">
      <mxGeometry x="980" y="37" width="50" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t_lost" value="Đóng cơ hội bán hàng&#xa;(Bắt buộc chọn lý do Lost)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;spacing=4;align=center;verticalAlign=middle;" vertex="1" parent="l_sales">
      <mxGeometry x="925" y="115" width="160" height="55" as="geometry"/>
    </mxCell>
    <mxCell id="sales_end_lost" value="Thất bại (Lost)" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#f8cecc;strokeColor=#b85450;fontColor=#78281f;fontSize=10;strokeWidth=3;verticalLabelPosition=bottom;verticalAlign=top;labelBackgroundColor=#ffffff;spacingBottom=2;" vertex="1" parent="l_sales">
      <mxGeometry x="1120" y="122" width="40" height="40" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t4" value="Lập Báo giá (Quotation)&#xa;theo Bảng giá sỉ B2B" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;spacing=4;align=center;verticalAlign=middle;" vertex="1" parent="l_sales">
      <mxGeometry x="1080" y="30" width="165" height="65" as="geometry"/>
    </mxCell>
    <mxCell id="sales_renego" value="Đàm phán lại với khách về&#xa;Tiến độ giao hàng / Đơn giá" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;spacing=4;align=center;verticalAlign=middle;" vertex="1" parent="l_sales">
      <mxGeometry x="1380" y="115" width="165" height="55" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t5" value="Xác nhận Đơn hàng bán&#xa;SALES ORDER (SO) trên Odoo" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;spacing=4;align=center;verticalAlign=middle;" vertex="1" parent="l_sales">
      <mxGeometry x="1700" y="30" width="165" height="65" as="geometry"/>
    </mxCell>

    <!-- LANE 3: KHO (y_offset = 320, h = 120) -->
    <mxCell id="l_kho" value="Bộ phận Kho (Inventory)" style="swimlane;html=1;startSize=26;horizontal=0;fillColor=#ffffff;strokeColor=#cbd5e1;fontColor=#1e293b;fontStyle=1;fontSize=12;collapsible=0;" vertex="1" parent="pool_nr">
      <mxGeometry x="30" y="320" width="2030" height="120" as="geometry"/>
    </mxCell>
    <mxCell id="kho_t1" value="Đóng gói cuộn mẫu &amp;amp;&#xa;Xuất kho bàn giao vận chuyển" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#f1f5f9;strokeColor=#94a3b8;fontColor=#1e293b;fontSize=11;strokeWidth=1.5;spacing=4;align=center;verticalAlign=middle;" vertex="1" parent="l_kho">
      <mxGeometry x="540" y="28" width="165" height="65" as="geometry"/>
    </mxCell>

    <!-- LANE 4: SẢN XUẤT (y_offset = 440, h = 160) -->
    <mxCell id="l_sx" value="Xưởng Kỹ thuật &amp;amp; Sản xuất" style="swimlane;html=1;startSize=26;horizontal=0;fillColor=#ffffff;strokeColor=#cbd5e1;fontColor=#1e293b;fontStyle=1;fontSize=12;collapsible=0;" vertex="1" parent="pool_nr">
      <mxGeometry x="30" y="440" width="2030" height="160" as="geometry"/>
    </mxCell>
    <mxCell id="sx_t1" value="Thẩm định công suất máy &amp;amp;&#xa;Lịch vận hành xưởng WC1-4" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;spacing=4;align=center;verticalAlign=middle;" vertex="1" parent="l_sx">
      <mxGeometry x="1080" y="35" width="165" height="65" as="geometry"/>
    </mxCell>
    <mxCell id="gw_capacity" value="Xưởng đáp ứng được?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontColor=#7f6000;fontSize=11;fontStyle=1;strokeWidth=1.5;verticalLabelPosition=top;verticalAlign=bottom;labelBackgroundColor=#ffffff;spacingTop=-4;" vertex="1" parent="l_sx">
      <mxGeometry x="1290" y="42" width="50" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="sx_t2" value="Tự động khởi tạo Lệnh&#xa;Sản Xuất (Manufacturing MO)" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#e1d5e7;strokeColor=#9673a6;fontColor=#4a154b;fontSize=11;strokeWidth=1.5;spacing=4;align=center;verticalAlign=middle;" vertex="1" parent="l_sx">
      <mxGeometry x="1700" y="35" width="165" height="65" as="geometry"/>
    </mxCell>
    <mxCell id="sx_end_won" value="Chuyển giao SX&#xa;Thành công (Won)" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#d5e8d4;strokeColor=#274e13;fontColor=#274e13;fontSize=10;strokeWidth=3;verticalLabelPosition=bottom;verticalAlign=top;labelBackgroundColor=#ffffff;spacingBottom=2;" vertex="1" parent="l_sx">
      <mxGeometry x="1930" y="47" width="40" height="40" as="geometry"/>
    </mxCell>

    <!-- LANE 5: BAN GIÁM ĐỐC (y_offset = 600, h = 170) -->
    <mxCell id="l_gd" value="Ban Giám Đốc" style="swimlane;html=1;startSize=26;horizontal=0;fillColor=#ffffff;strokeColor=#cbd5e1;fontColor=#1e293b;fontStyle=1;fontSize=12;collapsible=0;" vertex="1" parent="pool_nr">
      <mxGeometry x="30" y="600" width="2030" height="170" as="geometry"/>
    </mxCell>
    <mxCell id="gw_appr_check" value="Cần Giám đốc duyệt?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontColor=#7f6000;fontSize=11;fontStyle=1;strokeWidth=1.5;verticalLabelPosition=top;verticalAlign=bottom;labelBackgroundColor=#ffffff;spacingTop=-4;" vertex="1" parent="l_gd">
      <mxGeometry x="1290" y="45" width="50" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="gd_t1" value="Phê duyệt Báo giá / Đơn hàng&#xa;đặc thù vượt thẩm quyền" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1d3557;fontSize=11;strokeWidth=1.5;spacing=4;align=center;verticalAlign=middle;" vertex="1" parent="l_gd">
      <mxGeometry x="1380" y="38" width="165" height="65" as="geometry"/>
    </mxCell>
    <mxCell id="gw_gd_decision" value="Giám đốc phê duyệt?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontColor=#7f6000;fontSize=11;fontStyle=1;strokeWidth=1.5;verticalLabelPosition=top;verticalAlign=bottom;labelBackgroundColor=#ffffff;spacingTop=-4;" vertex="1" parent="l_gd">
      <mxGeometry x="1590" y="45" width="50" height="50" as="geometry"/>
    </mxCell>

    <!-- ==================== FLOWS / NỐI LUỒNG CHUẨN TRỰC GIAO ==================== -->
    <!-- Marketing Sequence Flows -->
    <mxCell id="e1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#374151;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#1f2937;" edge="1" parent="pool_nr" source="mkt_start" target="mkt_t1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#374151;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#1f2937;" edge="1" parent="pool_nr" source="mkt_t1" target="mkt_t2">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#374151;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#1f2937;" edge="1" parent="pool_nr" source="mkt_t2" target="sales_t1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>

    <!-- Sales Sequence Flows -->
    <mxCell id="e4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#374151;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#1f2937;" edge="1" parent="pool_nr" source="sales_t1" target="sales_t2">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e5" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#374151;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#1f2937;" edge="1" parent="pool_nr" source="sales_t2" target="kho_t1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e6" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#374151;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#1f2937;" edge="1" parent="pool_nr" source="sales_t3" target="gw_sample">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_sample_fail" value="Không đạt" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#374151;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#1f2937;" edge="1" parent="pool_nr" source="gw_sample" target="sales_t_lost">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_lost_end" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#374151;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#1f2937;" edge="1" parent="pool_nr" source="sales_t_lost" target="sales_end_lost">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_sample_pass" value="Đạt chuẩn" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#374151;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#1f2937;" edge="1" parent="pool_nr" source="gw_sample" target="sales_t4">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e7" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#374151;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#1f2937;" edge="1" parent="pool_nr" source="sales_t4" target="sx_t1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>

    <!-- Production & Capacity Sequence Flows -->
    <mxCell id="e8" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#374151;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#1f2937;" edge="1" parent="pool_nr" source="sx_t1" target="gw_capacity">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_cap_fail" value="Quá tải xưởng" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#374151;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#1f2937;" edge="1" parent="pool_nr" source="gw_capacity" target="sales_renego">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1315" y="390"/>
          <mxPoint x="1462" y="390"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="e_cap_pass" value="Đủ năng lực" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#374151;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#1f2937;" edge="1" parent="pool_nr" source="gw_capacity" target="gw_appr_check">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_loop_renego" value="Cập nhật Báo giá mới" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#374151;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#1f2937;" edge="1" parent="pool_nr" source="sales_renego" target="sales_t4">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1462" y="140"/>
          <mxPoint x="1230" y="140"/>
        </Array>
      </mxGeometry>
    </mxCell>

    <!-- Director Approval Sequence Flows -->
    <mxCell id="e_no_appr" value="Chuẩn (Trong hạn mức Sales)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#374151;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#1f2937;" edge="1" parent="pool_nr" source="gw_appr_check" target="sales_t5">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1315" y="730"/>
          <mxPoint x="1660" y="730"/>
          <mxPoint x="1660" y="162"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="e_need_appr" value="Vượt hạn mức chiết khấu" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#374151;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#1f2937;" edge="1" parent="pool_nr" source="gw_appr_check" target="gd_t1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e9" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#374151;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#1f2937;" edge="1" parent="pool_nr" source="gd_t1" target="gw_gd_decision">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_gd_reject" value="Từ chối duyệt" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#374151;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#1f2937;" edge="1" parent="pool_nr" source="gw_gd_decision" target="sales_renego">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1615" y="580"/>
          <mxPoint x="1500" y="580"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="e_gd_accept" value="Đồng ý duyệt" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#374151;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#1f2937;" edge="1" parent="pool_nr" source="gw_gd_decision" target="sales_t5">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1615" y="670"/>
          <mxPoint x="1680" y="670"/>
          <mxPoint x="1680" y="162"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="e10" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#374151;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#1f2937;" edge="1" parent="pool_nr" source="sales_t5" target="sx_t2">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e11" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;strokeColor=#374151;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#1f2937;" edge="1" parent="pool_nr" source="sx_t2" target="sx_end_won">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>

    <!-- ==================== MESSAGE FLOWS (INTER-POOL NÉT ĐỨT) ==================== -->
    <mxCell id="mf1" value="Khảo sát thông số &amp;amp; khổ băng keo" style="edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=6 6;html=1;startArrow=oval;startFill=0;endArrow=block;endFill=0;strokeColor=#0284c7;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#0369a1;" edge="1" parent="1" source="sales_t2" target="c_t1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="mf2" value="Bàn giao kiện hàng mẫu thử (0đ)" style="edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=6 6;html=1;startArrow=oval;startFill=0;endArrow=block;endFill=0;strokeColor=#0284c7;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#0369a1;" edge="1" parent="1" source="kho_t1" target="c_t2">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="640" y="470"/>
          <mxPoint x="740" y="470"/>
          <mxPoint x="740" y="170"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="mf3" value="Gửi kết quả kiểm tra mẫu (Đạt / Không đạt)" style="edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=6 6;html=1;startArrow=oval;startFill=0;endArrow=block;endFill=0;strokeColor=#0284c7;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#0369a1;" edge="1" parent="1" source="c_t2" target="sales_t3">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="mf4" value="Gửi Báo giá chính thức &amp;amp; Dự thảo Hợp đồng" style="edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=6 6;html=1;startArrow=oval;startFill=0;endArrow=block;endFill=0;strokeColor=#0284c7;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#0369a1;" edge="1" parent="1" source="sales_t4" target="c_t3">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1162" y="180"/>
          <mxPoint x="1740" y="180"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="mf5" value="Gửi Hợp đồng bán hàng đã ký duyệt" style="edgeStyle=orthogonalEdgeStyle;dashed=1;dashPattern=6 6;html=1;startArrow=oval;startFill=0;endArrow=block;endFill=0;strokeColor=#0284c7;strokeWidth=1.5;labelBackgroundColor=#ffffff;labelBorderColor=none;fontSize=10;fontColor=#0369a1;" edge="1" parent="1" source="c_t3" target="sales_t5">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>

  </root>
</mxGraphModel>
```

---

## 3. Các Cải Tiến Đột Phá Trong Phiên Bản v2.0

1. **Triệt tiêu 100% lỗi đè chữ trên Gateway & Event:**
   * Nhãn câu hỏi điều kiện trên Gateway được đưa hoàn toàn ra ngoài đỉnh (`verticalLabelPosition=top;verticalAlign=bottom`), giúp hình thoi thông thoáng và câu hỏi hiển thị rõ nét trên nền trắng.
   * Nhãn Start/End Event đưa xuống phía dưới đáy (`verticalLabelPosition=bottom;verticalAlign=top`).
2. **Bố cục Cột Lưới (Grid Column System):**
   * Toàn bộ sơ đồ được chia thành 7 Cột mốc thời gian dọc ($X$ tăng dần đều từ $50\text{px}$ đến $1950\text{px}$).
   * Các bước trong cùng một giai đoạn nằm thẳng hàng tăm tắp theo chiều dọc, không còn tình trạng chạy ziczac lộn xộn.
3. **Quy hoạch độ cao Lane (Spacious Swimlanes):**
   * Lane **Sales B2B** được mở rộng chiều cao lên **$190\text{px}$** để chứa thoải mái cả nhánh chính (Happy Path) và nhánh ngoại lệ (Lost/Loopback) mà không bị dính sát vào nhau.
   * Lane **Ban Giám Đốc** và **Sản xuất** được mở rộng $160 - 170\text{px}$ tạo hành lang định tuyến thoáng đãng.
4. **Đường nối có nền che vạch (Anti-crossing Labels):**
   * Tất cả nhãn điều kiện (`Đạt chuẩn`, `Không đạt`, `Quá tải xưởng`, `Đồng ý duyệt`...) đều có `labelBackgroundColor=#ffffff`, triệt tiêu hoàn toàn tình trạng vạch kẻ đâm xuyên qua chữ.