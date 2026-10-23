# 🎬 YOUTUBE SCRIPTWRITING, SLIDES & PRODUCTION RULES (IELTS 7.5+ SYSTEM PROMPT)

> **Mục đích tài liệu**: Bộ quy tắc chuẩn hóa (System Prompt & Guidelines) bắt buộc mọi AI Agent phải tuân thủ khi sản xuất nội dung bài học IELTS, thiết kế slide và kịch bản video YouTube cho repository này.  
> **Áp dụng cho**: Mọi yêu cầu tạo bài học, viết script, dàn slide PPTX và Canva cho kỹ năng Writing, Reading, Listening, Speaking.

---

## 🧭 TRIẾT LÝ NỀN TẢNG: HỌC SÂU CHO MÌNH – CHIA SẺ CHO NGƯỜI
- **Mục tiêu số 1 là Self-Mastery (Tự học sâu để đạt Band 8.0 - 8.5+)**: Quá trình làm video là áp dụng **Kỹ thuật học sâu Feynman**. Vì vậy, nội dung không bao giờ được hời hợt hay chỉ dừng lại ở mẹo vặt cơ bản.
- **Nội dung & Slide = Học thuật chuyên sâu (Deep Academic Rigor)**: Tra cứu từ nguồn Cambridge chính thống, Band Descriptors thực tế, collocations C1-C2, ngữ pháp phức hợp, cấu trúc phân tích bản chất logic.
- **Lời thoại Script = Siêu tinh gọn (Ultra-Concise Delivery 10–25s/slide)**: Không giảng giải lại những gì slide đã có sẵn, chỉ "điểm nhãn" những ý đắt giá nhất, nói ít nhưng trúng đích, nhịp nói dứt khoát, giàu năng lượng.

---

## 🏛️ ĐIỀU 1: BỘ TÀI LIỆU ĐẦU RA BẮT BUỘC (MANDATORY DELIVERABLES)

Mỗi khi người dùng yêu cầu soạn một video bài học mới (ví dụ: Task 1 Process, Task 2 Opinion, Reading T/F/NG...), AI **BẮT BUỘC** phải tạo trọn bộ tài nguyên đóng gói theo thư mục `video_[XX]`:

### 1. File 1: `[Số]_Slide_Content_Canva.md` (Dàn ý nội dung & bố cục)
- **Chức năng**: Dùng để tham chiếu nội dung, copy-paste vào Canva hoặc kiểm tra logic bài giảng.
- **Quy tắc nội dung**:
  - **TUYỆT ĐỐI KHÔNG** chép văn nói hay lời thoại lên Slide.
  - Mỗi slide chỉ chứa: **Tiêu đề lớn**, **Bảng từ vựng/công thức**, **Từ khóa in đậm**, và **So sánh Before/After** (❌ Band 6.0 vs. ✅ Band 7.5+).
  - Có hướng dẫn layout: Cột trái (ảnh/sơ đồ) | Cột phải (thanh quote + text).

### 2. File 2: `[Số]_Video_Script_Voiceover.md` (Kịch bản đọc thu âm One-Take)
- **Chức năng**: Dùng để người dùng mở trên điện thoại/màn hình phụ vừa chiếu slide vừa đọc thu âm.
- **Quy tắc nội dung (Tuân thủ `RULE_SCRIPT.md`)**:
  - **Siêu súc tích (10–25s/slide)**: Không giải thích chi tiết dài dòng, chỉ chốt ý đắt giá và bản chất tư duy.
  - Lời dẫn và phân tích viết bằng **văn nói bình dân, thân thiện**, dùng đại từ *"mình – các bạn"*, thêm *"nè", "nha", "đúng không nào"*.
  - **CẤM TỪ SƯỢNG/HÀN LÂM**: Tuyệt đối tránh *"nguyên tắc bất di bất dịch"*, *"khóa cố định"*, *"đặc trưng sống còn"*.
  - **KHÔNG ĐỌC CẢ CÂU TIẾNG ANH DÀI**: Chỉ nói *"như trên slide các bạn thấy nè..."*, *"như 2 câu mẫu trên màn hình..."*.
  - Có vạch ngắt nhịp thở `//` sau mỗi 4–7 từ để người nói lấy hơi vi mô bằng mũi, chống hụt hơi tuyệt đối.
  - Bắt buộc có đánh dấu: `[Bấm chuyển Slide X]`, `[Click: Hiện khối 1]`, `[Click: Hiện khối 2]`.

### 3. File 3: `[Số]_Slides_[Chủ đề].pptx` (File PowerPoint trình chiếu chuẩn)
- **Chức năng**: File slide sẵn sàng bấm F5 để quay video ngay lập tức.
- **Quy tắc thiết kế (Tuân thủ `RULE_SLIDES.md`)**:
  - Slide 01: Thiết kế đẹp làm Thumbnail (Badge Band 7.5+, Title, Subtitle, Ảnh đề thi viền nét; Animations = 0).
  - 100% nền trắng thuần `#FFFFFF`.
  - Trình bày song ngữ: English chính đậm (`#0F172A`, 14-15pt) + Vietnamese phụ chú ngay bên dưới (*in nghiêng*, xám nhạt `#64748B`, 11.5-12pt).
  - 1 Emoji trước mỗi Heading đề mục (24-26pt bold).
  - 1 Màu Accent duy nhất trên mỗi slide (Đỏ, Tím, Cam, Hồng) cho Heading & Thanh dọc Quote.
  - Thanh dọc Quote (`4.0pt`) kéo dài trọn vẹn từ đầu tiêu đề đến hết dòng cuối cùng.
  - Line-spacing $1.25\text{x}$ với font Montserrat.
  - Hiệu ứng chuyển slide Fade (0.5s) và hiệu ứng từng khối Fade on-click đồng bộ với Script.
  - **Zero Overflow**: Tách slide khi nhiều ý, mọi phần tử cách mép đáy màn hình $> 50\text{pt}$.
  - Slide cuối cùng: Outro CTA (Like, Share, Subscribe, Free Resources).

---

## ⚡ ĐIỀU 2: QUY TẮC HOOK 30 GIÂY ĐẦU TIÊN (ZERO-FLUFF INTRO)

- 🚫 **NGHIÊM CẤM**:
  - Không chào hỏi lê thê: *"Chào mừng các bạn đã quay trở lại với kênh YouTube của mình, đừng quên like và subscribe..."*
  - Không giới thiệu bản thân dài dòng hoặc kể lể ngoài lề.
- ✅ **BẮT BUỘC (VÀO THẲNG VẤN ĐỀ TRONG 5–10 GIÂY ĐẦU)**:
  - Câu đầu tiên phải nêu ngay: **Chủ đề bài học** + **Nỗi đau / Lỗi sai kinh điển mà 90% người học mắc phải** + **Giải pháp thực chiến nhận được sau video**.
  - Ví dụ chuẩn: *"Chào các bạn, trong video này chúng ta đi thẳng vào toàn bộ cách xử lý dạng bài Map: từ cách chọn thì, 4 tiêu chí chấm điểm, đến cách giải 2 đề thi thật Cambridge."*

---

## ⏱️ ĐIỀU 3: QUY TẮC NHỊP ĐỘ & GIỮ CHÂN NGƯỜI XEM (RETENTION PACING)

1. **Quy tắc 30–45 Giây / Chuyển Slide**:
   - Một video giáo dục ít edit sẽ bị nhàm chán nếu màn hình đứng yên quá lâu. AI phải thiết kế nội dung sao cho cứ mỗi 30–45 giây người nói sẽ `[Bấm chuyển Slide X]` một lần để tạo chuyển động thị giác liên tục.
2. **Quy tắc On-Click Animation**:
   - Trong mỗi slide, các khối nội dung không hiện ra cùng lúc mà xuất hiện lần lượt theo từng cú click chuột `[Click: Hiện khối X]`. Điều này giữ cho mắt người xem luôn tập trung vào điểm đang giảng.
3. **Quy tắc Kéo sự chú ý (Pattern Interrupts)**:
   - Trong script đọc, cứ sau 2–3 câu phân tích phải có 1 câu kéo sự chú ý người xem vào slide:
     - *"Các bạn nhìn vào từ in đậm trên màn hình..."*
     - *"Nhìn sang cột bên phải là lỗi sai kinh điển..."*
     - *"Chỉ một chữ này thôi nhưng giám khảo sẽ phân loại band điểm ngay..."*

---

## 🎯 ĐIỀU 4: TÍNH THỰC CHIẾN & CHUẨN MỰC HỌC THUẬT (BAND 7.5+)

1. **Sử dụng Đề thi thật & Dữ liệu chuẩn xác**:
   - Các ví dụ minh họa và bài giải mẫu **bắt buộc phải lấy từ bộ đề Cambridge IELTS** (từ Cam 5 đến Cam 19) hoặc các nguồn đề thi thật uy tín (BC / IDP).
   - Không tự bịa ra các số liệu hoặc bản đồ phi thực tế.
2. **Luôn có sự so sánh nâng cấp điểm (Contrast Learning)**:
   - Mọi chuyên đề từ vựng/ngữ pháp phải trình bày theo dạng đối chiếu:
     - ❌ **Band 6.0**: Câu đơn giản, từ ngữ rời rạc, lặp từ, hoặc dịch word-by-word.
     - ✅ **Band 7.5+**: Sử dụng Collocation tự nhiên, Cụm danh từ hóa (*Nominalization*), Mệnh đề quan hệ rút gọn hoặc Đảo ngữ.
3. **Phân tích bản chất (Root Cause Analysis)**:
   - Script đọc không chỉ đọc đáp án mà phải giải thích ngắn gọn: *Tại sao câu trên bị trừ điểm TA/GRA và tư duy đằng sau để sửa lại thành câu dưới.*

---

## 🛠️ ĐIỀU 5: QUY CHUẨN ĐẶT TÊN FILE & LƯU TRỮ

Mọi sản phẩm của YouTube Studio phải được lưu vào đúng thư mục `IELTS/07_YouTube_Studio/` theo quy chuẩn:

```text
IELTS/07_YouTube_Studio/
├── YOUTUBE_RULES.md                        # Bộ quy tắc tổng quan quy trình sản xuất
├── RULE_SLIDES.md                          # Bộ quy ước thiết kế Slide song ngữ & Python Generator
├── RULE_SCRIPT.md                          # Bộ quy ước kịch bản thu âm 100% Tiếng Anh
├── README.md                               # Menu điều hướng toàn bộ studio
├── 00_Template_Script_Canva.md             # Template mẫu
├── assets/                                 # Ảnh đề thi thật chuẩn web
│   └── [topic]_video/                      # Thư mục ảnh theo từng bài
├── [Số]_[Chủ đề]_Slide_Content_Canva.md    # File 1: Text & Layout Canva
├── [Số]_[Chủ đề]_Video_Script_Voiceover.md # File 2: Lời thoại đọc thu âm
└── [Số]_Slides_[Chủ đề].pptx               # File 3: File PowerPoint tự động hóa
```

---

## 📋 CHECKLIST KIỂM DUYỆT TRƯỚC KHI BÀN GIAO CỦA AI:

- [ ] Đã tạo đủ cả 3 sản phẩm: File Slide Content, File Video Script Voiceover và File PowerPoint `.pptx`?
- [ ] File Slide có tuân thủ 100% `rule_slides.md` (nền trắng, thanh quote ôm trọn bài, 1 màu accent, zero-overflow, fade animation)?
- [ ] File Script có các mốc `[Bấm chuyển Slide X]`, `[Click: Hiện khối Y]` và nhịp thở `[nghỉ 1s]` chưa?
- [ ] Phần mở đầu có vào thẳng vấn đề ngay từ câu đầu tiên (Hook 10s) không?
- [ ] Các ví dụ và bài giải có trích xuất từ đề thi thật Cambridge không?
- [ ] Đã cập nhật liên kết vào `IELTS/07_YouTube_Studio/README.md` chưa?
