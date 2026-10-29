# Sơ Đồ Quy Trình BPMN 2.0 Phân Hệ CRM (Mã Nguồn Draw.io XML v3.0)

> **Dự án:** Triển khai Odoo 18.0 ERP cho Công ty TNHH Nhựt Rạng  
> **Phân hệ:** Marketing & Quản lý Cơ hội Bán hàng B2B (CRM Pipeline)  
> **Phiên bản:** **v3.0 - Chuẩn Stencil Ký hiệu BPMN 2.0 (`mxgraph.bpmn`), Swimlane Dọc & Không Màu (Monochrome)**  
> **Quy chuẩn thiết kế:** Tuân thủ 100% tài liệu [rule-BPMN.md (v3.0)](file:///d:/KnowledgeLibrary/ERP/project/rule-BPMN.md)  

---

## 1. Hướng Dẫn Nạp Sơ Đồ Vào Draw.io

1. Truy cập [**app.diagrams.net**](https://app.diagrams.net/) (hoặc mở ứng dụng Draw.io trên máy tính).
2. Chọn menu: **Arrange $\rightarrow$ Insert $\rightarrow$ Advanced $\rightarrow$ From Text...** *(Hoặc: **Sắp xếp $\rightarrow$ Chèn $\rightarrow$ Nâng cao $\rightarrow$ Từ văn bản...**)*.
3. Chuyển tuỳ chọn ở góc dưới bên phải sang **XML**, dán mã XML ở **Mục 2.1** (hoặc **Mục 2.2**) bên dưới vào và nhấn **Insert**.

---

## 2. Mã Nguồn Draw.io XML (`mxGraphModel`)

### 2.1. Bản A (Khuyên dùng): Swimlane Chia Theo Cột Dọc (Vertical Swimlanes - Luồng từ Trên xuống Dưới)

*(Các phòng ban được chia thành các cột dọc đứng cạnh nhau: Khách hàng | Marketing | Sales B2B | Kho | Xưởng Sản xuất | Ban Giám đốc, luồng đi từ trên xuống dưới, hoàn toàn không màu, đầy đủ icon BPMN 2.0)*

```xml
<mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1900" pageHeight="1500" math="0" shadow="0">
  <root>
    <mxCell id="0"/>
    <mxCell id="1" parent="0"/>

    <!-- ==================== POOL 1 (CỘT DỌC): KHÁCH HÀNG B2B ==================== -->
    <mxCell id="pool_cust" value="KHÁCH HÀNG B2B&#xa;(Phòng Thu mua &amp;amp; Kỹ thuật)" style="swimlane;html=1;startSize=56;horizontal=1;collapsible=0;fontStyle=1;fontSize=13;" vertex="1" parent="1">
      <mxGeometry x="40" y="40" width="260" height="1380" as="geometry"/>
    </mxCell>
    <mxCell id="c_t1" value="Tiếp nhận khảo sát &amp;amp;&#xa;Cung cấp quy cách kỹ thuật" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=receive;" vertex="1" parent="pool_cust">
      <mxGeometry x="45" y="410" width="170" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="c_t2" value="Thử nghiệm độ dính &amp;amp;&#xa;Đánh giá chất lượng mẫu" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=manual;" vertex="1" parent="pool_cust">
      <mxGeometry x="45" y="540" width="170" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="c_t3" value="Xem xét Báo giá &amp;amp;&#xa;Ký kết Hợp đồng Bán hàng" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="pool_cust">
      <mxGeometry x="45" y="1060" width="170" height="70" as="geometry"/>
    </mxCell>

    <!-- ==================== POOL 2 (CỘT DỌC): CÔNG TY TNHH NHỰT RẠNG ==================== -->
    <mxCell id="pool_nr" value="CÔNG TY TNHH NHỰT RẠNG (Hệ thống Odoo ERP Doanh nghiệp)" style="swimlane;html=1;startSize=30;horizontal=1;collapsible=0;fontStyle=1;fontSize=13;" vertex="1" parent="1">
      <mxGeometry x="340" y="40" width="1420" height="1380" as="geometry"/>
    </mxCell>

    <!-- CỘT LANE 1: BỘ PHẬN MARKETING (x=0, w=250) -->
    <mxCell id="l_mkt" value="Bộ phận Marketing" style="swimlane;html=1;startSize=26;horizontal=1;collapsible=0;fontStyle=1;fontSize=12;" vertex="1" parent="pool_nr">
      <mxGeometry x="0" y="30" width="250" height="1350" as="geometry"/>
    </mxCell>
    <mxCell id="mkt_start" value="Phát hiện nhu cầu&#xa;thị trường B2B" style="shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=top;verticalAlign=bottom;align=center;perimeter=ellipsePerimeter;outline=standard;symbol=general;fontSize=10;spacingBottom=4;" vertex="1" parent="l_mkt">
      <mxGeometry x="105" y="60" width="40" height="40" as="geometry"/>
    </mxCell>
    <mxCell id="mkt_t1" value="Tìm kiếm thông tin Lead&#xa;tiềm năng (Google/Web)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="l_mkt">
      <mxGeometry x="42" y="140" width="165" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="mkt_t2" value="Khởi tạo hồ sơ Lead&#xa;trên hệ thống Odoo CRM" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="l_mkt">
      <mxGeometry x="42" y="260" width="165" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="do_lead" value="Hồ sơ Lead&#xa;(MST, SĐT)" style="shape=mxgraph.bpmn.data_object;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;size=15;fontSize=10;spacingTop=2;" vertex="1" parent="l_mkt">
      <mxGeometry x="105" y="370" width="40" height="50" as="geometry"/>
    </mxCell>

    <!-- CỘT LANE 2: BỘ PHẬN KINH DOANH - SALES B2B (x=250, w=380) -->
    <mxCell id="l_sales" value="Bộ phận Kinh doanh (Sales B2B)" style="swimlane;html=1;startSize=26;horizontal=1;collapsible=0;fontStyle=1;fontSize=12;" vertex="1" parent="pool_nr">
      <mxGeometry x="250" y="30" width="380" height="1350" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t1" value="Chuyển đổi Lead thành&#xa;Cơ hội (Opportunity)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="l_sales">
      <mxGeometry x="35" y="260" width="165" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t2" value="Khảo sát quy cách &amp;amp;&#xa;Lập Phiếu xuất mẫu (0đ)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=send;" vertex="1" parent="l_sales">
      <mxGeometry x="35" y="380" width="165" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t3" value="Cập nhật kết quả đánh giá&#xa;hàng mẫu vào Opportunity" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=receive;" vertex="1" parent="l_sales">
      <mxGeometry x="35" y="510" width="165" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="gw_sample" value="Mẫu đạt chuẩn?" style="shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=middle;verticalAlign=middle;align=right;labelPosition=left;perimeter=rhombusPerimeter;background=gateway;outline=none;symbol=exclusiveGw;fontSize=11;fontStyle=1;spacingRight=6;" vertex="1" parent="l_sales">
      <mxGeometry x="92" y="635" width="50" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t_lost" value="Đóng cơ hội bán hàng&#xa;(Ghi nhận lý do Lost)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="l_sales">
      <mxGeometry x="205" y="627" width="155" height="65" as="geometry"/>
    </mxCell>
    <mxCell id="sales_end_lost" value="Thất bại (Lost)" style="shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outline=end;symbol=terminate;fontSize=10;fontStyle=1;spacingTop=4;" vertex="1" parent="l_sales">
      <mxGeometry x="262" y="730" width="40" height="40" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t4" value="Lập Báo giá (Quotation)&#xa;theo Bảng giá sỉ B2B" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=send;" vertex="1" parent="l_sales">
      <mxGeometry x="35" y="760" width="165" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="sales_renego" value="Đàm phán lại với khách về&#xa;Tiến độ giao hàng / Đơn giá" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;isLoopStandard=1;" vertex="1" parent="l_sales">
      <mxGeometry x="205" y="882" width="160" height="65" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t5" value="Xác nhận Đơn hàng bán&#xa;SALES ORDER (SO)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="l_sales">
      <mxGeometry x="35" y="1175" width="165" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="do_so" value="Chứng từ SO&#xa;đã xác nhận" style="shape=mxgraph.bpmn.data_object;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;size=15;fontSize=10;spacingTop=2;" vertex="1" parent="l_sales">
      <mxGeometry x="97" y="1275" width="40" height="50" as="geometry"/>
    </mxCell>

    <!-- CỘT LANE 3: BỘ PHẬN KHO - INVENTORY (x=630, w=250) -->
    <mxCell id="l_kho" value="Bộ phận Kho (Inventory)" style="swimlane;html=1;startSize=26;horizontal=1;collapsible=0;fontStyle=1;fontSize=12;" vertex="1" parent="pool_nr">
      <mxGeometry x="630" y="30" width="250" height="1350" as="geometry"/>
    </mxCell>
    <mxCell id="kho_t1" value="Đóng gói cuộn mẫu &amp;amp;&#xa;Xuất kho gửi khách hàng" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=manual;" vertex="1" parent="l_kho">
      <mxGeometry x="42" y="380" width="165" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="do_sample" value="Phiếu xuất mẫu&#xa;(SO-SAMPLE 0đ)" style="shape=mxgraph.bpmn.data_object;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;size=15;fontSize=10;spacingTop=2;" vertex="1" parent="l_kho">
      <mxGeometry x="105" y="280" width="40" height="50" as="geometry"/>
    </mxCell>

    <!-- CỘT LANE 4: XƯỞNG KỸ THUẬT & SẢN XUẤT (x=880, w=270) -->
    <mxCell id="l_sx" value="Xưởng Kỹ thuật &amp;amp; Sản xuất" style="swimlane;html=1;startSize=26;horizontal=1;collapsible=0;fontStyle=1;fontSize=12;" vertex="1" parent="pool_nr">
      <mxGeometry x="880" y="30" width="270" height="1350" as="geometry"/>
    </mxCell>
    <mxCell id="sx_t1" value="Thẩm định công suất máy &amp;amp;&#xa;Định mức BOM (WC1-WC4)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="l_sx">
      <mxGeometry x="52" y="760" width="165" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="gw_capacity" value="Xưởng đáp ứng?" style="shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;perimeter=rhombusPerimeter;background=gateway;outline=none;symbol=exclusiveGw;fontSize=11;fontStyle=1;spacingTop=4;" vertex="1" parent="l_sx">
      <mxGeometry x="110" y="890" width="50" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="sx_t2" value="Tự động khởi tạo Lệnh&#xa;Sản Xuất (Manufacturing MO)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=service;" vertex="1" parent="l_sx">
      <mxGeometry x="52" y="1175" width="165" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="ds_odoo" value="Odoo MRP&#xa;Database" style="shape=datastore;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;fontSize=10;spacingTop=2;" vertex="1" parent="l_sx">
      <mxGeometry x="110" y="1070" width="50" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="sx_end_won" value="Hoàn tất CRM &amp;amp;&#xa;Chuyển Sản xuất (Won)" style="shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outline=end;symbol=general;fontSize=10;fontStyle=1;spacingTop=4;" vertex="1" parent="l_sx">
      <mxGeometry x="115" y="1280" width="40" height="40" as="geometry"/>
    </mxCell>

    <!-- CỘT LANE 5: BAN GIÁM ĐỐC (x=1150, w=270) -->
    <mxCell id="l_gd" value="Ban Giám Đốc" style="swimlane;html=1;startSize=26;horizontal=1;collapsible=0;fontStyle=1;fontSize=12;" vertex="1" parent="pool_nr">
      <mxGeometry x="1150" y="30" width="270" height="1350" as="geometry"/>
    </mxCell>
    <mxCell id="gd_rule" value="Kiểm tra Ma trận phê duyệt&#xa;(Hạn mức giá sàn &amp;amp; Công nợ)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=businessRule;" vertex="1" parent="l_gd">
      <mxGeometry x="52" y="880" width="165" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="gw_appr_check" value="Vượt hạn mức?" style="shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=middle;verticalAlign=middle;align=left;labelPosition=right;perimeter=rhombusPerimeter;background=gateway;outline=none;symbol=exclusiveGw;fontSize=11;fontStyle=1;spacingLeft=6;" vertex="1" parent="l_gd">
      <mxGeometry x="110" y="995" width="50" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="gd_t1" value="Xem xét &amp;amp; Phê duyệt&#xa;Báo giá / Hợp đồng đặc thù" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="l_gd">
      <mxGeometry x="52" y="1090" width="165" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="gw_gd_decision" value="Giám đốc duyệt?" style="shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=middle;verticalAlign=middle;align=left;labelPosition=right;perimeter=rhombusPerimeter;background=gateway;outline=none;symbol=exclusiveGw;fontSize=11;fontStyle=1;spacingLeft=6;" vertex="1" parent="l_gd">
      <mxGeometry x="110" y="1200" width="50" height="50" as="geometry"/>
    </mxCell>

    <!-- ==================== SEQUENCE FLOWS (NỘI BỘ POOL NHỰT RẠNG) ==================== -->
    <mxCell id="ve1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="pool_nr" source="mkt_start" target="mkt_t1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="ve2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="pool_nr" source="mkt_t1" target="mkt_t2">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="ve3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="mkt_t2" target="sales_t1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="ve4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="pool_nr" source="sales_t1" target="sales_t2">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="ve5" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="sales_t2" target="kho_t1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="ve6" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="pool_nr" source="sales_t3" target="gw_sample">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="ve_sample_fail" value="Không đạt" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="gw_sample" target="sales_t_lost">
      <mxGeometry relative="1" as="geometry">
        <mxPoint as="offset" y="-12"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="ve_lost_end" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="pool_nr" source="sales_t_lost" target="sales_end_lost">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="ve_sample_pass" value="Đạt" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="pool_nr" source="gw_sample" target="sales_t4">
      <mxGeometry relative="1" as="geometry">
        <mxPoint as="offset" x="-18" y="-5"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="ve7" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="sales_t4" target="sx_t1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="ve8" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="pool_nr" source="sx_t1" target="gw_capacity">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="ve_cap_fail" value="Quá tải" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0;exitY=0.5;entryX=1;entryY=0.5;" edge="1" parent="pool_nr" source="gw_capacity" target="sales_renego">
      <mxGeometry relative="1" as="geometry">
        <mxPoint as="offset" y="-12"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="ve_cap_pass" value="Đáp ứng" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="gw_capacity" target="gd_rule">
      <mxGeometry relative="1" as="geometry">
        <mxPoint as="offset" y="-12"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="ve_loop_renego" value="Cập nhật Báo giá" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=0;entryX=1;entryY=0.75;" edge="1" parent="pool_nr" source="sales_renego" target="sales_t4">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="535" y="842"/>
        </Array>
        <mxPoint as="offset" x="35" y="-12"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="ve_rule_gw" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="pool_nr" source="gd_rule" target="gw_appr_check">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="ve_no_appr" value="Trong hạn mức (Tự động duyệt)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0;exitY=0.5;entryX=0.5;entryY=0;" edge="1" parent="pool_nr" source="gw_appr_check" target="sales_t5">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="367" y="1050"/>
        </Array>
        <mxPoint as="offset" x="-80" y="-12"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="ve_need_appr" value="Có" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="pool_nr" source="gw_appr_check" target="gd_t1">
      <mxGeometry relative="1" as="geometry">
        <mxPoint as="offset" x="-15"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="ve9" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="pool_nr" source="gd_t1" target="gw_gd_decision">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="ve_gd_reject" value="Từ chối" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0;exitY=0.5;entryX=0.5;entryY=1;" edge="1" parent="pool_nr" source="gw_gd_decision" target="sales_renego">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="850" y="1255"/>
          <mxPoint x="850" y="990"/>
          <mxPoint x="535" y="990"/>
        </Array>
        <mxPoint as="offset" x="60" y="-12"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="ve_gd_accept" value="Đồng ý" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0.75;entryY=1;" edge="1" parent="pool_nr" source="gw_gd_decision" target="sales_t5">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1285" y="1310"/>
          <mxPoint x="408" y="1310"/>
        </Array>
        <mxPoint as="offset" y="-12"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="ve10" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="sales_t5" target="sx_t2">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="ve11" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="pool_nr" source="sx_t2" target="sx_end_won">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>

    <!-- ==================== DATA ASSOCIATIONS (NÉT CHẤM) ==================== -->
    <mxCell id="vda1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;dashed=1;dashPattern=2 4;endArrow=open;endFill=0;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="pool_nr" source="mkt_t2" target="do_lead">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="vda2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;dashed=1;dashPattern=2 4;endArrow=open;endFill=0;fontSize=10;exitX=0.5;exitY=0;entryX=0.5;entryY=1;" edge="1" parent="pool_nr" source="kho_t1" target="do_sample">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="vda3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;dashed=1;dashPattern=2 4;endArrow=open;endFill=0;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="pool_nr" source="sales_t5" target="do_so">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="vda4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;dashed=1;dashPattern=2 4;endArrow=open;endFill=0;fontSize=10;exitX=0.5;exitY=0;entryX=0.5;entryY=1;" edge="1" parent="pool_nr" source="sx_t2" target="ds_odoo">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>

    <!-- ==================== MESSAGE FLOWS (LIÊN POOL NÉT ĐỨT) ==================== -->
    <mxCell id="vmf1" value="1. Khảo sát quy cách" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;dashed=1;dashPattern=6 6;startArrow=oval;startFill=0;endArrow=block;endFill=0;fontSize=10;exitX=0;exitY=0.5;entryX=1;entryY=0.5;" edge="1" parent="1" source="sales_t2" target="c_t1">
      <mxGeometry relative="1" as="geometry">
        <mxPoint as="offset" y="-12"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="vmf2" value="2. Gửi kiện hàng mẫu (0đ)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;dashed=1;dashPattern=6 6;startArrow=oval;startFill=0;endArrow=block;endFill=0;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="kho_t1" target="c_t2">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1095" y="515"/>
          <mxPoint x="170" y="515"/>
        </Array>
        <mxPoint as="offset" x="120" y="-12"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="vmf3" value="3. Kết quả thử mẫu" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;dashed=1;dashPattern=6 6;startArrow=oval;startFill=0;endArrow=block;endFill=0;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="c_t2" target="sales_t3">
      <mxGeometry relative="1" as="geometry">
        <mxPoint as="offset" y="-12"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="vmf4" value="4. Báo giá &amp;amp; Dự thảo HĐ" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;dashed=1;dashPattern=6 6;startArrow=oval;startFill=0;endArrow=block;endFill=0;fontSize=10;exitX=0;exitY=0.5;entryX=0.5;entryY=0;" edge="1" parent="1" source="sales_t4" target="c_t3">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="170" y="865"/>
        </Array>
        <mxPoint as="offset" x="-40" y="-60"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="vmf5" value="5. Hợp đồng đã ký" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;dashed=1;dashPattern=6 6;startArrow=oval;startFill=0;endArrow=block;endFill=0;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="1" source="c_t3" target="sales_t5">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="320" y="1135"/>
          <mxPoint x="320" y="1280"/>
        </Array>
        <mxPoint as="offset" x="45" y="55"/>
      </mxGeometry>
    </mxCell>

  </root>
</mxGraphModel>
```

---

### 2.2. Bản B: Swimlane Xếp Chồng Theo Hàng Dọc Từ Trên Xuống (Đã fix lỗi `stackLayout` nối ngang)

*(Các làn phòng ban xếp chồng từ trên xuống dưới thay vì bị nối đuôi theo hàng ngang như lỗi cũ, luồng đi từ trái sang phải, hoàn toàn không màu, đầy đủ icon BPMN 2.0)*

```xml
<mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="2300" pageHeight="1200" math="0" shadow="0">
  <root>
    <mxCell id="0"/>
    <mxCell id="1" parent="0"/>

    <!-- ==================== POOL 1: KHÁCH HÀNG B2B ==================== -->
    <mxCell id="pool_cust" value="KHÁCH HÀNG B2B (Bộ phận Thu mua &amp;amp; Kỹ thuật đối tác)" style="swimlane;html=1;startSize=30;horizontal=0;collapsible=0;fontStyle=1;fontSize=13;" vertex="1" parent="1">
      <mxGeometry x="40" y="40" width="2180" height="140" as="geometry"/>
    </mxCell>
    <mxCell id="c_t1" value="Tiếp nhận khảo sát &amp;amp;&#xa;Cung cấp quy cách kỹ thuật" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=receive;" vertex="1" parent="pool_cust">
      <mxGeometry x="570" y="35" width="170" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="c_t2" value="Thử nghiệm độ dính &amp;amp;&#xa;Đánh giá chất lượng mẫu" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=manual;" vertex="1" parent="pool_cust">
      <mxGeometry x="810" y="35" width="170" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="c_t3" value="Xem xét Báo giá &amp;amp;&#xa;Ký kết Hợp đồng Bán hàng" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="pool_cust">
      <mxGeometry x="1760" y="35" width="170" height="70" as="geometry"/>
    </mxCell>

    <!-- ==================== POOL 2: CÔNG TY TNHH NHỰT RẠNG ==================== -->
    <mxCell id="pool_nr" value="CÔNG TY TNHH NHỰT RẠNG (Hệ thống Odoo ERP)" style="swimlane;html=1;startSize=30;horizontal=0;collapsible=0;fontStyle=1;fontSize=13;" vertex="1" parent="1">
      <mxGeometry x="40" y="230" width="2180" height="880" as="geometry"/>
    </mxCell>

    <!-- LANE 1: BỘ PHẬN MARKETING (y=0, h=150) -->
    <mxCell id="l_mkt" value="Bộ phận Marketing" style="swimlane;html=1;startSize=30;horizontal=0;collapsible=0;fontStyle=1;fontSize=12;" vertex="1" parent="pool_nr">
      <mxGeometry x="30" y="0" width="2150" height="150" as="geometry"/>
    </mxCell>
    <mxCell id="mkt_start" value="Phát hiện nhu cầu&#xa;thị trường B2B" style="shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outline=standard;symbol=general;fontSize=10;spacingTop=4;" vertex="1" parent="l_mkt">
      <mxGeometry x="60" y="45" width="40" height="40" as="geometry"/>
    </mxCell>
    <mxCell id="mkt_t1" value="Tìm kiếm thông tin Lead&#xa;tiềm năng (Google/Web)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="l_mkt">
      <mxGeometry x="150" y="30" width="165" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="mkt_t2" value="Khởi tạo hồ sơ Lead&#xa;trên hệ thống Odoo CRM" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="l_mkt">
      <mxGeometry x="350" y="30" width="165" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="do_lead" value="Hồ sơ Lead&#xa;(MST, SĐT)" style="shape=mxgraph.bpmn.data_object;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;size=15;fontSize=10;spacingTop=2;" vertex="1" parent="l_mkt">
      <mxGeometry x="560" y="30" width="40" height="50" as="geometry"/>
    </mxCell>

    <!-- LANE 2: BỘ PHẬN KINH DOANH - SALES B2B (y=150, h=230) -->
    <mxCell id="l_sales" value="Bộ phận Kinh doanh (Sales B2B)" style="swimlane;html=1;startSize=30;horizontal=0;collapsible=0;fontStyle=1;fontSize=12;" vertex="1" parent="pool_nr">
      <mxGeometry x="30" y="150" width="2150" height="230" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t1" value="Chuyển đổi Lead thành&#xa;Cơ hội (Opportunity)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="l_sales">
      <mxGeometry x="350" y="30" width="165" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t2" value="Khảo sát quy cách &amp;amp;&#xa;Lập Phiếu xuất mẫu (0đ)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=send;" vertex="1" parent="l_sales">
      <mxGeometry x="540" y="30" width="170" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="sales_ev_fb" value="Nhận kết quả&#xa;thử mẫu" style="shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outline=boundInt;symbol=message;fontSize=10;spacingTop=4;" vertex="1" parent="l_sales">
      <mxGeometry x="755" y="45" width="40" height="40" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t3" value="Cập nhật kết quả đánh giá&#xa;hàng mẫu vào Opportunity" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=receive;" vertex="1" parent="l_sales">
      <mxGeometry x="830" y="30" width="170" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="gw_sample" value="Mẫu đạt chuẩn?" style="shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=top;verticalAlign=bottom;align=center;perimeter=rhombusPerimeter;background=gateway;outline=none;symbol=exclusiveGw;fontSize=11;fontStyle=1;spacingBottom=4;" vertex="1" parent="l_sales">
      <mxGeometry x="1040" y="40" width="50" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t_lost" value="Đóng cơ hội bán hàng&#xa;(Ghi nhận lý do Lost)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="l_sales">
      <mxGeometry x="1140" y="135" width="165" height="65" as="geometry"/>
    </mxCell>
    <mxCell id="sales_end_lost" value="Cơ hội thất bại&#xa;(Lost)" style="shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outline=end;symbol=terminate;fontSize=10;fontStyle=1;spacingTop=4;" vertex="1" parent="l_sales">
      <mxGeometry x="1350" y="147" width="40" height="40" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t4" value="Lập Báo giá (Quotation)&#xa;theo Bảng giá sỉ B2B" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=send;" vertex="1" parent="l_sales">
      <mxGeometry x="1140" y="30" width="165" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="sales_renego" value="Đàm phán lại với khách về&#xa;Tiến độ giao hàng / Đơn giá" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;isLoopStandard=1;" vertex="1" parent="l_sales">
      <mxGeometry x="1440" y="135" width="175" height="65" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t5" value="Xác nhận Đơn hàng bán&#xa;SALES ORDER (SO)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="l_sales">
      <mxGeometry x="1730" y="30" width="170" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="do_so" value="Chứng từ SO&#xa;đã xác nhận" style="shape=mxgraph.bpmn.data_object;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;size=15;fontSize=10;spacingTop=2;" vertex="1" parent="l_sales">
      <mxGeometry x="1950" y="32" width="40" height="50" as="geometry"/>
    </mxCell>

    <!-- LANE 3: BỘ PHẬN KHO - INVENTORY (y=380, h=140) -->
    <mxCell id="l_kho" value="Bộ phận Kho (Inventory)" style="swimlane;html=1;startSize=30;horizontal=0;collapsible=0;fontStyle=1;fontSize=12;" vertex="1" parent="pool_nr">
      <mxGeometry x="30" y="380" width="2150" height="140" as="geometry"/>
    </mxCell>
    <mxCell id="kho_t1" value="Đóng gói cuộn mẫu &amp;amp;&#xa;Xuất kho gửi khách hàng" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=manual;" vertex="1" parent="l_kho">
      <mxGeometry x="540" y="35" width="170" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="do_sample" value="Phiếu xuất mẫu&#xa;(SO-SAMPLE 0đ)" style="shape=mxgraph.bpmn.data_object;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;size=15;fontSize=10;spacingTop=2;" vertex="1" parent="l_kho">
      <mxGeometry x="430" y="38" width="40" height="50" as="geometry"/>
    </mxCell>

    <!-- LANE 4: XƯỞNG KỸ THUẬT & SẢN XUẤT (y=520, h=180) -->
    <mxCell id="l_sx" value="Xưởng Kỹ thuật &amp;amp; Sản xuất" style="swimlane;html=1;startSize=30;horizontal=0;collapsible=0;fontStyle=1;fontSize=12;" vertex="1" parent="pool_nr">
      <mxGeometry x="30" y="520" width="2150" height="180" as="geometry"/>
    </mxCell>
    <mxCell id="sx_t1" value="Thẩm định công suất máy &amp;amp;&#xa;Định mức BOM (WC1-WC4)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="l_sx">
      <mxGeometry x="1140" y="50" width="165" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="gw_capacity" value="Xưởng đáp ứng?" style="shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;perimeter=rhombusPerimeter;background=gateway;outline=none;symbol=exclusiveGw;fontSize=11;fontStyle=1;spacingTop=4;" vertex="1" parent="l_sx">
      <mxGeometry x="1350" y="60" width="50" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="sx_t2" value="Tự động khởi tạo Lệnh&#xa;Sản Xuất (Manufacturing MO)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=service;" vertex="1" parent="l_sx">
      <mxGeometry x="1730" y="50" width="170" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="ds_odoo" value="Odoo MRP&#xa;Database" style="shape=datastore;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;fontSize=10;spacingTop=2;" vertex="1" parent="l_sx">
      <mxGeometry x="1590" y="55" width="50" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="sx_end_won" value="Hoàn tất CRM &amp;amp;&#xa;Chuyển Sản xuất (Won)" style="shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outline=end;symbol=general;fontSize=10;fontStyle=1;spacingTop=4;" vertex="1" parent="l_sx">
      <mxGeometry x="1960" y="65" width="40" height="40" as="geometry"/>
    </mxCell>

    <!-- LANE 5: BAN GIÁM ĐỐC (y=700, h=180) -->
    <mxCell id="l_gd" value="Ban Giám Đốc" style="swimlane;html=1;startSize=30;horizontal=0;collapsible=0;fontStyle=1;fontSize=12;" vertex="1" parent="pool_nr">
      <mxGeometry x="30" y="700" width="2150" height="180" as="geometry"/>
    </mxCell>
    <mxCell id="gd_rule" value="Kiểm tra Ma trận phê duyệt&#xa;(Hạn mức giá sàn &amp;amp; Công nợ)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=businessRule;" vertex="1" parent="l_gd">
      <mxGeometry x="1140" y="50" width="165" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="gw_appr_check" value="Vượt hạn mức?" style="shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=middle;verticalAlign=middle;align=right;labelPosition=left;perimeter=rhombusPerimeter;background=gateway;outline=none;symbol=exclusiveGw;fontSize=11;fontStyle=1;spacingRight=6;" vertex="1" parent="l_gd">
      <mxGeometry x="1350" y="60" width="50" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="gd_t1" value="Xem xét &amp;amp; Phê duyệt&#xa;Báo giá / Hợp đồng đặc thù" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="l_gd">
      <mxGeometry x="1450" y="50" width="165" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="gw_gd_decision" value="Giám đốc duyệt?" style="shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;perimeter=rhombusPerimeter;background=gateway;outline=none;symbol=exclusiveGw;fontSize=11;fontStyle=1;spacingTop=4;" vertex="1" parent="l_gd">
      <mxGeometry x="1660" y="60" width="50" height="50" as="geometry"/>
    </mxCell>

    <!-- ==================== SEQUENCE FLOWS (NỘI BỘ POOL NHỰT RẠNG) ==================== -->
    <!-- Marketing -->
    <mxCell id="e1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="mkt_start" target="mkt_t1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="mkt_t1" target="mkt_t2">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="pool_nr" source="mkt_t2" target="sales_t1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>

    <!-- Sales & Sample -->
    <mxCell id="e4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="sales_t1" target="sales_t2">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e5" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="pool_nr" source="sales_t2" target="kho_t1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_ev_t3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="sales_ev_fb" target="sales_t3">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e6" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="sales_t3" target="gw_sample">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_sample_pass" value="Đạt" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="gw_sample" target="sales_t4">
      <mxGeometry relative="1" as="geometry">
        <mxPoint as="offset" y="-12"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="e_sample_fail" value="Không đạt" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="gw_sample" target="sales_t_lost">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1095" y="317"/>
        </Array>
        <mxPoint as="offset" x="15" y="-10"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="e_lost_end" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="sales_t_lost" target="sales_end_lost">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>

    <!-- Quotation to Production Capacity Check -->
    <mxCell id="e7" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="pool_nr" source="sales_t4" target="sx_t1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e8" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="sx_t1" target="gw_capacity">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_cap_fail" value="Quá tải xưởng" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=0;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="gw_capacity" target="sales_renego">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1405" y="317"/>
        </Array>
        <mxPoint as="offset" x="-35" y="-20"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="e_cap_pass" value="Đáp ứng" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0.5;entryY=0;" edge="1" parent="pool_nr" source="gw_capacity" target="gd_rule">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1435" y="605"/>
          <mxPoint x="1435" y="715"/>
          <mxPoint x="1252" y="715"/>
        </Array>
        <mxPoint as="offset" x="-40" y="-10"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="e_loop_renego" value="Cập nhật Báo giá" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=0;entryX=0.75;entryY=1;" edge="1" parent="pool_nr" source="sales_renego" target="sales_t4">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1557" y="265"/>
          <mxPoint x="1294" y="265"/>
        </Array>
        <mxPoint as="offset" y="-10"/>
      </mxGeometry>
    </mxCell>

    <!-- Approval Matrix & Director Decision -->
    <mxCell id="e_rule_gw" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="gd_rule" target="gw_appr_check">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_no_appr" value="Trong hạn mức (Tự động duyệt)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0.25;entryY=1;" edge="1" parent="pool_nr" source="gw_appr_check" target="sales_t5">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1405" y="855"/>
          <mxPoint x="1802" y="855"/>
        </Array>
        <mxPoint as="offset" y="-10"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="e_need_appr" value="Có" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="gw_appr_check" target="gd_t1">
      <mxGeometry relative="1" as="geometry">
        <mxPoint as="offset" y="-10"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="e9" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="gd_t1" target="gw_gd_decision">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_gd_reject" value="Từ chối" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=0;entryX=1;entryY=0.5;" edge="1" parent="pool_nr" source="gw_gd_decision" target="sales_renego">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1715" y="317"/>
        </Array>
        <mxPoint as="offset" x="25" y="40"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="e_gd_accept" value="Đồng ý" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="gw_gd_decision" target="sales_t5">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1740" y="785"/>
          <mxPoint x="1740" y="215"/>
        </Array>
        <mxPoint as="offset" x="25" y="-10"/>
      </mxGeometry>
    </mxCell>

    <!-- Sales Order to Manufacturing Order -->
    <mxCell id="e10" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="pool_nr" source="sales_t5" target="sx_t2">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e11" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="sx_t2" target="sx_end_won">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>

    <!-- ==================== DATA ASSOCIATIONS (NÉT CHẤM) ==================== -->
    <mxCell id="da1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;dashed=1;dashPattern=2 4;endArrow=open;endFill=0;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="mkt_t2" target="do_lead">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="da2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;dashed=1;dashPattern=2 4;endArrow=open;endFill=0;fontSize=10;exitX=0;exitY=0.5;entryX=1;entryY=0.5;" edge="1" parent="pool_nr" source="kho_t1" target="do_sample">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="da3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;dashed=1;dashPattern=2 4;endArrow=open;endFill=0;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="sales_t5" target="do_so">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="da4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;html=1;dashed=1;dashPattern=2 4;endArrow=open;endFill=0;fontSize=10;exitX=0;exitY=0.5;entryX=1;entryY=0.5;" edge="1" parent="pool_nr" source="sx_t2" target="ds_odoo">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>

    <!-- ==================== MESSAGE FLOWS (LIÊN POOL NÉT ĐỨT) ==================== -->
    <mxCell id="mf1" value="1. Khảo sát thông số kỹ thuật" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;dashed=1;dashPattern=6 6;startArrow=oval;startFill=0;endArrow=block;endFill=0;fontSize=10;exitX=0.5;exitY=0;entryX=0.5;entryY=1;" edge="1" parent="1" source="sales_t2" target="c_t1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="mf2" value="2. Gửi kiện hàng mẫu thử (0đ)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;dashed=1;dashPattern=6 6;startArrow=oval;startFill=0;endArrow=block;endFill=0;fontSize=10;exitX=1;exitY=0.5;entryX=0.25;entryY=1;" edge="1" parent="1" source="kho_t1" target="c_t2">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="780" y="680"/>
          <mxPoint x="780" y="205"/>
          <mxPoint x="892" y="205"/>
        </Array>
        <mxPoint as="offset" x="-45" y="-120"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="mf3" value="3. Phản hồi kết quả thử mẫu" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;dashed=1;dashPattern=6 6;startArrow=oval;startFill=0;endArrow=block;endFill=0;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="c_t2" target="sales_ev_fb">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="935" y="210"/>
          <mxPoint x="845" y="210"/>
        </Array>
        <mxPoint as="offset" x="40" y="-10"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="mf4" value="4. Gửi Báo giá &amp;amp; Dự thảo Hợp đồng" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;dashed=1;dashPattern=6 6;startArrow=oval;startFill=0;endArrow=block;endFill=0;fontSize=10;exitX=0.5;exitY=0;entryX=0.25;entryY=1;" edge="1" parent="1" source="sales_t4" target="c_t3">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1292" y="200"/>
          <mxPoint x="1842" y="200"/>
        </Array>
        <mxPoint as="offset" y="-10"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="mf5" value="5. Hợp đồng đã ký xác nhận" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;dashed=1;dashPattern=6 6;startArrow=oval;startFill=0;endArrow=block;endFill=0;fontSize=10;exitX=0.75;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="c_t3" target="sales_t5">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1927" y="215"/>
          <mxPoint x="1885" y="215"/>
        </Array>
        <mxPoint as="offset" x="55" y="10"/>
      </mxGeometry>
    </mxCell>

  </root>
</mxGraphModel>
```

---

## 3. Các Thay Đổi Đã Thực Hiện Theo Đúng Yêu Cầu Của Bạn

1. **Sử dụng 100% Block ký hiệu gốc của BPMN 2.0 (`mxgraph.bpmn.*`):**
   * **User Task** (`taskMarker=user` - có icon hình người ở góc trái trên).
   * **Send / Receive Task** (`taskMarker=send` / `receive` - có icon phong bì đen/trắng).
   * **Manual Task** (`taskMarker=manual` - có icon bàn tay cho tác vụ đóng gói mẫu và thử mẫu vật lý).
   * **Service Task** (`taskMarker=service` - có icon bánh răng cho tác vụ tự động tạo lệnh sản xuất MO).
   * **Business Rule Task** (`taskMarker=businessRule` - có icon bảng quy tắc cho bước kiểm tra Ma trận phê duyệt).
   * **Loop Marker** (`isLoopStandard=1` - có mũi tên vòng lặp ở đáy tác vụ Đàm phán lại báo giá).
   * **Exclusive Gateway** (`symbol=exclusiveGw` - hình thoi có chữ **`X`** chuẩn BPMN bên trong).
   * **Start / Intermediate / End / Terminate Events** (`symbol=general`, `symbol=message`, `symbol=terminate`).
   * **Data Objects & Data Store** (`shape=mxgraph.bpmn.data_object` và `shape=datastore` nối bằng đường Association nét chấm).
2. **Swimlane chia theo hàng dọc:**
   * Cung cấp cả **Bản A (Swimlane chia cột dọc - luồng từ trên xuống dưới)** và **Bản B (Các Swimlane xếp chồng theo hàng dọc từ trên xuống dưới, đã xóa bỏ `childLayout=stackLayout` từng làm các lane bị nối đuôi theo hàng ngang)**.
3. **Không để màu gì hết cho các Block (Pure Monochrome):**
   * Đã xóa toàn bộ `fillColor`, `strokeColor`, `fontColor`, `labelBackgroundColor`. Các khối sử dụng nét vẽ nguyên bản của Draw.io, tương thích tuyệt đối với giao diện **Dark Mode** của bạn.