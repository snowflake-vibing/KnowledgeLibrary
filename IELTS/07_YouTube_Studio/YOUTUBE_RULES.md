# 🎬 YOUTUBE SCRIPTWRITING, SLIDES & PRODUCTION RULES (IELTS 7.5+ SYSTEM PROMPT)

> **Mục đích tài liệu**: Bộ quy tắc chuẩn hóa (System Prompt & Guidelines) bắt buộc mọi AI Agent phải tuân thủ khi sản xuất nội dung bài học IELTS, thiết kế slide và kịch bản video YouTube cho repository này.  
> **Áp dụng cho**: Mọi yêu cầu tạo bài học, viết script, dàn slide PPTX và Canva cho kỹ năng Writing, Reading, Listening, Speaking.

---

## 🏛️ ĐIỀU 1: BỘ TÀI LIỆU ĐẦU RA BẮT BUỘC (MANDATORY DELIVERABLES)

Mỗi khi người dùng yêu cầu soạn một video bài học mới (ví dụ: Task 1 Process, Task 2 Opinion, Reading T/F/NG...), AI **BẮT BUỘC** phải tạo trọn bộ tài nguyên:

### 1. File 1: `[Số]_Slide_Content_Canva.md` (Dàn ý nội dung & bố cục)
- **Chức năng**: Dùng để tham chiếu nội dung, copy-paste vào Canva hoặc kiểm tra logic bài giảng.
- **Quy tắc nội dung**:
  - **TUYỆT ĐỐI KHÔNG** chép văn nói hay lời thoại lên Slide.
  - Mỗi slide chỉ chứa: **Tiêu đề lớn**, **Bảng từ vựng/công thức**, **Từ khóa in đậm**, và **So sánh Before/After** (❌ Band 6.0 vs. ✅ Band 7.5+).
  - Có hướng dẫn layout: Cột trái (ảnh/sơ đồ) | Cột phải (thanh quote + text).

### 2. File 2: `[Số]_Video_Script_Voiceover.md` (Kịch bản đọc thu âm One-Take)
- **Chức năng**: Dùng để người dùng mở trên điện thoại/màn hình phụ vừa chiếu slide vừa đọc thu âm.
- **Quy tắc nội dung**:
  - Viết 100% bằng **văn nói tự nhiên**, đối thoại trực tiếp với người xem (*"Chào các bạn...", "Các bạn nhìn vào góc phải màn hình..."*).
  - Bắt buộc có đánh dấu thời điểm chuyển slide: `[Bấm chuyển Slide X]`.
  - Bắt buộc có đánh dấu click chuột xuất hiện nội dung animation: `[Click: Hiện khối 1]`, `[Click: Hiện khối 2]`.
  - Có đánh dấu nhịp thở lấy hơi: `[nghỉ 1s]`.
  - **In đậm** các từ trọng tâm cần nhấn giọng để người đọc truyền cảm hứng tự nhiên.

### 3. File 3: `[Số]_Slides_[Chủ đề].pptx` (File PowerPoint trình chiếu chuẩn)
- **Chức năng**: File slide sẵn sàng bấm F5 để quay video ngay lập tức.
- **Quy tắc thiết kế**: Bắt buộc tuân thủ 100% [**`rule_slides.md`**](rule_slides.md):
  - 100% nền trắng thuần `#FFFFFF`.
  - 1 Emoji trước mỗi Heading đề mục.
  - 1 Màu Accent duy nhất trên mỗi slide (Đỏ, Tím, Cam, Hồng) cho Heading & Thanh dọc Quote.
  - Thanh dọc Quote (`4.5pt`) kéo dài trọn vẹn đến hết dòng cuối cùng của khối nội dung.
  - Font Montserrat, độ lớn $\ge 24\text{pt}$ (body $20-22\text{pt}$), line-spacing $1.3\text{x}$.
  - Hiệu ứng chuyển slide Fade (0.5s) và hiệu ứng từng khối Fade on-click đồng bộ với Script.
  - **Zero Overflow**: Tách slide khi nhiều ý, mọi phần tử cách mép đáy màn hình $> 50\text{pt}$.

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
├── YOUTUBE_RULES.md                        # File quy tắc chuẩn này
├── rule_slides.md                          # Bộ quy ước thiết kế Slide & Python Generator
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
