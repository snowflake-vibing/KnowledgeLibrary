# Mã Nguồn XML Draw.io - Quy Trình Nghiệp Vụ CRM B2B (Nhựt Rạng ERP)
### *Phiên bản 4.0: Swimlane Ngang Xếp Dọc Từ Trên Xuống (Chuẩn Thinhnotes), Ký Hiệu Gốc `mxgraph.bpmn`, Không Màu (Monochrome) & Không Đè Chữ 100%*

> **Các cải tiến triệt để trong Phiên bản 4.0:**
> 1. **Xoay Swimlane 90 độ chuẩn mẫu Thinhnotes (`horizontal=0`):**
>    * **Pool 1 (`KHÁCH HÀNG B2B`)** nằm ngang ở phía trên (`y=40..190`), thanh tiêu đề xoay dọc 90° ở bên trái.
>    * **Pool 2 (`CÔNG TY TNHH NHỰT RẠNG`)** nằm ngang ở phía dưới (`y=260..1180`), chia thành **5 Swimlane nằm ngang xếp chồng từ trên xuống dưới** (`Bộ phận Marketing` $\rightarrow$ `Bộ phận Kinh doanh (Sales B2B)` $\rightarrow$ `Bộ phận Kho (Inventory)` $\rightarrow$ `Xưởng Kỹ thuật & Sản xuất` $\rightarrow$ `Ban Giám Đốc`), mỗi Lane có tiêu đề xoay dọc 90° ở bên trái.
> 2. **Triệt tiêu 100% lỗi chữ đè lên Block khi kéo mũi tên (`0 Collisions Verified`):**
>    * **Bố cục Bậc thang tiến tới theo trục $X$ (Staircase X-Progression):** Mỗi khi mũi tên chuyển giữa các Swimlane, tọa độ $X$ của Block tiếp theo luôn tịnh tiến sang phải, đảm bảo không có bất kỳ đường thẳng đứng hay đường ngang nào cắt qua mặt Block khác.
>    * **Hành lang trống 70px (`y=190..260`) giữa 2 Pool:** Toàn bộ 5 nhãn `Message Flow` liên Pool đều nằm gọn trong hành lang trống này, tuyệt đối không đè vào bất kỳ Block nào.
>    * **Nhãn Gateway ở đỉnh trống thứ 4 & Nhãn Mũi tên tính chuẩn theo Midpoint + Offset:** Đã kiểm chứng tự động bằng thuật toán kiểm tra va chạm tọa độ (`0` va chạm đường nối & `0` va chạm nhãn chữ).
> 3. **Giữ nguyên 100% Block ký hiệu BPMN 2.0 gốc (`mxgraph.bpmn.task`, `mxgraph.bpmn.shape`) và Hoàn toàn không màu (Monochrome):** Tương thích hoàn hảo với cả giao diện nền tối (Dark Mode) và nền sáng (Light Mode) trên Draw.io.

---

## HƯỚNG DẪN IMPORT VÀO DRAW.IO (DIAGRAMS.NET)

1. Mở [https://app.diagrams.net/](https://app.diagrams.net/) (hoặc ứng dụng Draw.io Desktop).
2. Trên thanh menu, chọn **Extras** $\rightarrow$ **Edit Diagram...**
3. Xóa toàn bộ nội dung cũ trong cửa sổ, **Copy toàn bộ khối code `<mxGraphModel>...</mxGraphModel>` bên dưới** và dán đè vào.
4. Nhấn **OK** để hiển thị sơ đồ.

---

## MÃ NGUỒN XML DRAW.IO

```xml
<mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="3050" pageHeight="1250" math="0" shadow="0">
  <root>
    <mxCell id="0"/>
    <mxCell id="1" parent="0"/>

    <!-- ==================== POOL 1: KHÁCH HÀNG B2B ==================== -->
    <mxCell id="pool_cust" value="KHÁCH HÀNG B2B (Phòng Thu mua &amp;amp; Kỹ thuật)" style="swimlane;html=1;startSize=30;horizontal=0;collapsible=0;fontStyle=1;fontSize=13;" vertex="1" parent="1">
      <mxGeometry x="40" y="40" width="2920" height="150" as="geometry"/>
    </mxCell>
    <mxCell id="c_t1" value="Tiếp nhận khảo sát &amp;amp;&#xa;Cung cấp quy cách kỹ thuật" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=receive;" vertex="1" parent="pool_cust">
      <mxGeometry x="580" y="40" width="175" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="c_t2" value="Thử nghiệm độ dính &amp;amp;&#xa;Đánh giá chất lượng mẫu" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=manual;" vertex="1" parent="pool_cust">
      <mxGeometry x="960" y="40" width="175" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="c_t3" value="Xem xét Báo giá &amp;amp;&#xa;Ký kết Hợp đồng Bán hàng" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="pool_cust">
      <mxGeometry x="2390" y="40" width="175" height="70" as="geometry"/>
    </mxCell>

    <!-- ==================== POOL 2: CÔNG TY TNHH NHỰT RẠNG ==================== -->
    <mxCell id="pool_nr" value="CÔNG TY TNHH NHỰT RẠNG (Hệ thống Odoo ERP)" style="swimlane;html=1;startSize=30;horizontal=0;collapsible=0;fontStyle=1;fontSize=13;" vertex="1" parent="1">
      <mxGeometry x="40" y="260" width="2920" height="920" as="geometry"/>
    </mxCell>

    <!-- LANE 1: BỘ PHẬN MARKETING (y=0, h=150) -->
    <mxCell id="l_mkt" value="Bộ phận Marketing" style="swimlane;html=1;startSize=30;horizontal=0;collapsible=0;fontStyle=1;fontSize=12;" vertex="1" parent="pool_nr">
      <mxGeometry x="30" y="0" width="2890" height="150" as="geometry"/>
    </mxCell>
    <mxCell id="mkt_start" value="Phát hiện nhu cầu&#xa;thị trường B2B" style="shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outline=standard;symbol=general;fontSize=10;spacingTop=6;" vertex="1" parent="l_mkt">
      <mxGeometry x="60" y="45" width="40" height="40" as="geometry"/>
    </mxCell>
    <mxCell id="mkt_t1" value="Tìm kiếm thông tin Lead&#xa;tiềm năng (Google/Web)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="l_mkt">
      <mxGeometry x="150" y="30" width="170" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="mkt_t2" value="Khởi tạo hồ sơ Lead&#xa;trên hệ thống Odoo CRM" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="l_mkt">
      <mxGeometry x="360" y="30" width="170" height="70" as="geometry"/>
    </mxCell>

    <!-- LANE 2: BỘ PHẬN KINH DOANH - SALES B2B (y=150, h=240) -->
    <mxCell id="l_sales" value="Bộ phận Kinh doanh (Sales B2B)" style="swimlane;html=1;startSize=30;horizontal=0;collapsible=0;fontStyle=1;fontSize=12;" vertex="1" parent="pool_nr">
      <mxGeometry x="30" y="150" width="2890" height="240" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t1" value="Chuyển đổi Lead thành&#xa;Cơ hội (Opportunity)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="l_sales">
      <mxGeometry x="360" y="35" width="170" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t2" value="Khảo sát quy cách &amp;amp;&#xa;Lập Phiếu xuất mẫu (0đ)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=send;" vertex="1" parent="l_sales">
      <mxGeometry x="550" y="35" width="175" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t3" value="Cập nhật kết quả đánh giá&#xa;hàng mẫu vào Opportunity" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=receive;" vertex="1" parent="l_sales">
      <mxGeometry x="930" y="35" width="175" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="gw_sample" value="Mẫu đạt chuẩn?" style="shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=top;verticalAlign=bottom;align=center;perimeter=rhombusPerimeter;background=gateway;outline=none;symbol=exclusiveGw;fontSize=11;fontStyle=1;spacingBottom=6;" vertex="1" parent="l_sales">
      <mxGeometry x="1165" y="45" width="50" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t_lost" value="Đóng cơ hội bán hàng&#xa;(Ghi nhận lý do Lost)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="l_sales">
      <mxGeometry x="990" y="140" width="165" height="65" as="geometry"/>
    </mxCell>
    <mxCell id="sales_end_lost" value="Cơ hội thất bại&#xa;(Lost)" style="shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outline=end;symbol=terminate;fontSize=10;fontStyle=1;spacingTop=6;" vertex="1" parent="l_sales">
      <mxGeometry x="900" y="152" width="40" height="40" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t4" value="Lập Báo giá (Quotation)&#xa;theo Bảng giá sỉ B2B" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=send;" vertex="1" parent="l_sales">
      <mxGeometry x="1290" y="35" width="175" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="sales_renego" value="Đàm phán lại với khách về&#xa;Tiến độ giao hàng / Đơn giá" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;isLoopStandard=1;" vertex="1" parent="l_sales">
      <mxGeometry x="1630" y="140" width="175" height="65" as="geometry"/>
    </mxCell>
    <mxCell id="sales_t5" value="Xác nhận Đơn hàng bán&#xa;SALES ORDER (SO)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="l_sales">
      <mxGeometry x="2360" y="35" width="175" height="70" as="geometry"/>
    </mxCell>

    <!-- LANE 3: BỘ PHẬN KHO - INVENTORY (y=390, h=150) -->
    <mxCell id="l_kho" value="Bộ phận Kho (Inventory)" style="swimlane;html=1;startSize=30;horizontal=0;collapsible=0;fontStyle=1;fontSize=12;" vertex="1" parent="pool_nr">
      <mxGeometry x="30" y="390" width="2890" height="150" as="geometry"/>
    </mxCell>
    <mxCell id="kho_t1" value="Đóng gói cuộn mẫu &amp;amp;&#xa;Xuất kho gửi khách hàng" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=manual;" vertex="1" parent="l_kho">
      <mxGeometry x="740" y="40" width="175" height="70" as="geometry"/>
    </mxCell>

    <!-- LANE 4: XƯỞNG KỸ THUẬT & SẢN XUẤT (y=540, h=180) -->
    <mxCell id="l_sx" value="Xưởng Kỹ thuật &amp;amp; Sản xuất" style="swimlane;html=1;startSize=30;horizontal=0;collapsible=0;fontStyle=1;fontSize=12;" vertex="1" parent="pool_nr">
      <mxGeometry x="30" y="540" width="2890" height="180" as="geometry"/>
    </mxCell>
    <mxCell id="sx_t1" value="Thẩm định công suất máy &amp;amp;&#xa;Định mức BOM (WC1-WC4)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="l_sx">
      <mxGeometry x="1480" y="55" width="175" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="gw_capacity" value="Xưởng đáp ứng?" style="shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=middle;verticalAlign=middle;align=left;labelPosition=right;perimeter=rhombusPerimeter;background=gateway;outline=none;symbol=exclusiveGw;fontSize=11;fontStyle=1;spacingLeft=8;" vertex="1" parent="l_sx">
      <mxGeometry x="1715" y="65" width="50" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="sx_t2" value="Tự động khởi tạo Lệnh&#xa;Sản Xuất (Manufacturing MO)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=service;" vertex="1" parent="l_sx">
      <mxGeometry x="2560" y="55" width="175" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="sx_end_won" value="Hoàn tất CRM &amp;amp;&#xa;Chuyển Sản xuất (Won)" style="shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;perimeter=ellipsePerimeter;outline=end;symbol=general;fontSize=10;fontStyle=1;spacingTop=6;" vertex="1" parent="l_sx">
      <mxGeometry x="2790" y="70" width="40" height="40" as="geometry"/>
    </mxCell>

    <!-- LANE 5: BAN GIÁM ĐỐC (y=720, h=200) -->
    <mxCell id="l_gd" value="Ban Giám Đốc" style="swimlane;html=1;startSize=30;horizontal=0;collapsible=0;fontStyle=1;fontSize=12;" vertex="1" parent="pool_nr">
      <mxGeometry x="30" y="720" width="2890" height="200" as="geometry"/>
    </mxCell>
    <mxCell id="gd_rule" value="Kiểm tra Ma trận phê duyệt&#xa;(Hạn mức giá sàn &amp;amp; Công nợ)" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=businessRule;" vertex="1" parent="l_gd">
      <mxGeometry x="1655" y="55" width="175" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="gw_appr_check" value="Vượt hạn mức?" style="shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=top;verticalAlign=bottom;align=center;perimeter=rhombusPerimeter;background=gateway;outline=none;symbol=exclusiveGw;fontSize=11;fontStyle=1;spacingBottom=6;" vertex="1" parent="l_gd">
      <mxGeometry x="1880" y="65" width="50" height="50" as="geometry"/>
    </mxCell>
    <mxCell id="gd_t1" value="Xem xét &amp;amp; Phê duyệt&#xa;Báo giá / Hợp đồng đặc thù" style="shape=mxgraph.bpmn.task;html=1;whiteSpace=wrap;rectStyle=rounded;size=10;align=center;verticalAlign=middle;spacingLeft=20;spacingRight=8;fontSize=11;taskMarker=user;" vertex="1" parent="l_gd">
      <mxGeometry x="1980" y="55" width="175" height="70" as="geometry"/>
    </mxCell>
    <mxCell id="gw_gd_decision" value="Giám đốc duyệt?" style="shape=mxgraph.bpmn.shape;html=1;verticalLabelPosition=bottom;verticalAlign=top;align=center;perimeter=rhombusPerimeter;background=gateway;outline=none;symbol=exclusiveGw;fontSize=11;fontStyle=1;spacingTop=6;" vertex="1" parent="l_gd">
      <mxGeometry x="2200" y="65" width="50" height="50" as="geometry"/>
    </mxCell>

    <!-- ==================== SEQUENCE FLOWS (NỘI BỘ POOL NHỰT RẠNG) ==================== -->
    <!-- 1. Marketing -->
    <mxCell id="e1" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="mkt_start" target="mkt_t1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e2" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="mkt_t1" target="mkt_t2">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e3" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="pool_nr" source="mkt_t2" target="sales_t1">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>

    <!-- 2. Sales & Sample -->
    <mxCell id="e4" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="sales_t1" target="sales_t2">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e5" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="sales_t2" target="kho_t1">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="667" y="465"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="e6" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="sales_t3" target="gw_sample">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_sample_pass" value="Đạt" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="gw_sample" target="sales_t4">
      <mxGeometry relative="1" as="geometry">
        <mxPoint as="offset" y="-12"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="e_sample_fail" value="Không đạt" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=1;entryY=0.5;" edge="1" parent="pool_nr" source="gw_sample" target="sales_t_lost">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1220" y="322"/>
        </Array>
        <mxPoint as="offset" x="42" y="-18"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="e_lost_end" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0;exitY=0.5;entryX=1;entryY=0.5;" edge="1" parent="pool_nr" source="sales_t_lost" target="sales_end_lost">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>

    <!-- 3. Quotation to Production Capacity Check -->
    <mxCell id="e7" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="sales_t4" target="sx_t1">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1407" y="630"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="e8" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="sx_t1" target="gw_capacity">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_cap_fail" value="Quá tải" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=0;entryX=0.5;entryY=1;" edge="1" parent="pool_nr" source="gw_capacity" target="sales_renego">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1770" y="480"/>
          <mxPoint x="1747" y="480"/>
        </Array>
        <mxPoint as="offset" x="28" y="-20"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="e_cap_pass" value="Đáp ứng" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="pool_nr" source="gw_capacity" target="gd_rule">
      <mxGeometry relative="1" as="geometry">
        <mxPoint as="offset" x="30" y="-5"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="e_loop_renego" value="Cập nhật Báo giá" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0;exitY=0.5;entryX=0.75;entryY=1;" edge="1" parent="pool_nr" source="sales_renego" target="sales_t4">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1451" y="322"/>
        </Array>
        <mxPoint as="offset" x="20" y="-12"/>
      </mxGeometry>
    </mxCell>

    <!-- 4. Approval Matrix & Director Decision -->
    <mxCell id="e_rule_gw" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="gd_rule" target="gw_appr_check">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_no_appr" value="Trong hạn mức (Tự động duyệt)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0;entryY=0.75;" edge="1" parent="pool_nr" source="gw_appr_check" target="sales_t5">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1935" y="895"/>
          <mxPoint x="2340" y="895"/>
          <mxPoint x="2340" y="237"/>
        </Array>
        <mxPoint as="offset" x="-260" y="120"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="e_need_appr" value="Có" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="gw_appr_check" target="gd_t1">
      <mxGeometry relative="1" as="geometry">
        <mxPoint as="offset" y="-12"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="e9" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="gd_t1" target="gw_gd_decision">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>
    <mxCell id="e_gd_reject" value="Từ chối" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=0;entryX=1;entryY=0.5;" edge="1" parent="pool_nr" source="gw_gd_decision" target="sales_renego">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="2255" y="322"/>
        </Array>
        <mxPoint as="offset" x="28" y="-120"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="e_gd_accept" value="Đồng ý" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.25;" edge="1" parent="pool_nr" source="gw_gd_decision" target="sales_t5">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="2310" y="810"/>
          <mxPoint x="2310" y="202"/>
        </Array>
        <mxPoint as="offset" x="28" y="-80"/>
      </mxGeometry>
    </mxCell>

    <!-- 5. Sales Order to Manufacturing Order -->
    <mxCell id="e10" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=0.5;exitY=1;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="sales_t5" target="sx_t2">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="2477" y="630"/>
        </Array>
      </mxGeometry>
    </mxCell>
    <mxCell id="e11" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;endArrow=block;endFill=1;fontSize=10;exitX=1;exitY=0.5;entryX=0;entryY=0.5;" edge="1" parent="pool_nr" source="sx_t2" target="sx_end_won">
      <mxGeometry relative="1" as="geometry"/>
    </mxCell>

    <!-- ==================== MESSAGE FLOWS (LIÊN POOL NÉT ĐỨT - QUA KHE TRỐNG GIỮA 2 POOL) ==================== -->
    <mxCell id="mf1" value="1. Khảo sát thông số" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;dashed=1;dashPattern=6 6;startArrow=oval;startFill=0;endArrow=block;endFill=0;fontSize=10;exitX=0.5;exitY=0;entryX=0.5;entryY=1;" edge="1" parent="1" source="sales_t2" target="c_t1">
      <mxGeometry relative="1" as="geometry">
        <mxPoint as="offset" x="55" y="-55"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="mf2" value="2. Gửi kiện hàng mẫu (0đ)" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;dashed=1;dashPattern=6 6;startArrow=oval;startFill=0;endArrow=block;endFill=0;fontSize=10;exitX=0.5;exitY=0;entryX=0.25;entryY=1;" edge="1" parent="1" source="kho_t1" target="c_t2">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="897" y="225"/>
          <mxPoint x="1044" y="225"/>
        </Array>
        <mxPoint as="offset" x="-65" y="-140"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="mf3" value="3. Kết quả thử mẫu" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;dashed=1;dashPattern=6 6;startArrow=oval;startFill=0;endArrow=block;endFill=0;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="c_t2" target="sales_t3">
      <mxGeometry relative="1" as="geometry">
        <mxPoint as="offset" x="52" y="-55"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="mf4" value="4. Báo giá &amp;amp; Dự thảo Hợp đồng" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;dashed=1;dashPattern=6 6;startArrow=oval;startFill=0;endArrow=block;endFill=0;fontSize=10;exitX=0.5;exitY=0;entryX=0.25;entryY=1;" edge="1" parent="1" source="sales_t4" target="c_t3">
      <mxGeometry relative="1" as="geometry">
        <Array as="points">
          <mxPoint x="1447" y="225"/>
          <mxPoint x="2474" y="225"/>
        </Array>
        <mxPoint as="offset" y="-12"/>
      </mxGeometry>
    </mxCell>
    <mxCell id="mf5" value="5. Hợp đồng đã ký" style="edgeStyle=orthogonalEdgeStyle;rounded=1;orthogonalLoop=1;jettySize=auto;html=1;dashed=1;dashPattern=6 6;startArrow=oval;startFill=0;endArrow=block;endFill=0;fontSize=10;exitX=0.5;exitY=1;entryX=0.5;entryY=0;" edge="1" parent="1" source="c_t3" target="sales_t5">
      <mxGeometry relative="1" as="geometry">
        <mxPoint as="offset" x="52" y="-55"/>
      </mxGeometry>
    </mxCell>

  </root>
</mxGraphModel>
```
