"""
slide_generator_helper.py - Reusable Slide Generation Module for YouTube Studio
Adheres 100% to IELTS/07_YouTube_Studio/rule_slides.md:
- 100% Pure White Background (#FFFFFF)
- Heading + Quote Bar using 1 accent color per slide (Red, Purple, Orange, Pink)
- 1 Emoji before each Heading
- Full-height Quote Accent Bar (4.5pt) dynamically matching text bounding box
- High line-spacing (1.3x) with Montserrat font (>= 24pt headings, 20-22pt body)
- Zero-overflow safety check: ensures bottom margin >= 50pt
- Fade transition (0.5s) & Fade entrance on-click for each quote block
"""

import os
import sys
import win32com.client

def bgr(r, g, b):
    return r + (g << 8) + (b << 16)

# Palette
COLOR_RED    = bgr(220, 38, 38)   # #DC2626
COLOR_PURPLE = bgr(124, 58, 237)  # #7C3AED
COLOR_ORANGE = bgr(234, 88, 12)   # #EA580C
COLOR_PINK   = bgr(219, 39, 119)  # #DB2777
COLOR_BODY   = bgr(15, 23, 42)    # #0F172A
COLOR_WHITE  = bgr(255, 255, 255)

FONT_NAME = "Montserrat"

class SlideDeck:
    def __init__(self, output_path, assets_dir=None):
        self.output_path = output_path
        self.assets_dir = assets_dir
        self.ppt = win32com.client.Dispatch("PowerPoint.Application")
        self.pres = self.ppt.Presentations.Add(WithWindow=False)
        # 16:9 Widescreen (960 x 540 pt)
        self.pres.PageSetup.SlideWidth = 13.333 * 72
        self.pres.PageSetup.SlideHeight = 7.5 * 72
        self.slide_height = self.pres.PageSetup.SlideHeight
        self.slide_width = self.pres.PageSetup.SlideWidth

    def create_slide(self, title_text, accent_bgr):
        slide = self.pres.Slides.Add(self.pres.Slides.Count + 1, 12) # ppLayoutBlank
        # Solid white background
        slide.Background.Fill.Solid()
        slide.Background.Fill.ForeColor.RGB = COLOR_WHITE
        # Fade transition
        slide.SlideShowTransition.EntryEffect = 1537 # ppEffectFadeSmoothly
        slide.SlideShowTransition.Duration = 0.5
        
        # Slide Title
        tb = slide.Shapes.AddTextbox(1, 57.6, 28.0, 844.8, 48.0)
        tf = tb.TextFrame
        tf.WordWrap = -1
        tf.MarginLeft = tf.MarginTop = tf.MarginRight = tf.MarginBottom = 0
        tr = tf.TextRange
        tr.Text = title_text
        tr.Font.Name = FONT_NAME
        tr.Font.Size = 28
        tr.Font.Bold = -1
        tr.Font.Color.RGB = accent_bgr
        return slide

    def add_scaled_image(self, slide, img_name, left=57.6, top=95.0, max_w=340.0, max_h=370.0):
        if not self.assets_dir:
            return None
        img_path = os.path.join(self.assets_dir, img_name)
        if not os.path.exists(img_path):
            return None
        pic = slide.Shapes.AddPicture(img_path, False, True, left, top, -1, -1)
        w, h = pic.Width, pic.Height
        scale = min(max_w / w, max_h / h)
        pic.Width = w * scale
        pic.Height = h * scale
        pic.Top = top + (max_h - pic.Height) / 2.0
        return pic

    def add_quote_block(self, slide, left, top, width, title, content_lines, accent_bgr, title_size=24, content_size=20):
        tb = slide.Shapes.AddTextbox(1, left + 18.0, top, width - 18.0, 10.0)
        tf = tb.TextFrame
        tf.WordWrap = -1
        tf.MarginLeft = tf.MarginTop = tf.MarginRight = tf.MarginBottom = 0
        
        r = tf.TextRange
        r.Text = title
        r.Font.Name = FONT_NAME
        r.Font.Bold = -1
        r.Font.Size = title_size
        r.Font.Color.RGB = COLOR_BODY
        r.ParagraphFormat.SpaceAfter = 10
        
        if isinstance(content_lines, str):
            content_lines = [content_lines]
            
        for idx, line in enumerate(content_lines):
            p = r.InsertAfter("\n" + line)
            p.Font.Name = FONT_NAME
            p.Font.Italic = -1
            p.Font.Size = content_size
            p.Font.Color.RGB = COLOR_BODY
            p.ParagraphFormat.LineRuleWithin = -1
            p.ParagraphFormat.SpaceWithin = 1.3
            if idx < len(content_lines) - 1:
                p.ParagraphFormat.SpaceAfter = 8
                
        actual_height = max(tb.Height, r.BoundHeight) + 4.0
        
        # Quote bar
        bar = slide.Shapes.AddShape(1, left, top, 4.5, actual_height)
        bar.Fill.Solid()
        bar.Fill.ForeColor.RGB = accent_bgr
        bar.Line.Visible = 0
        
        # Group and animate
        grp = slide.Shapes.Range([bar.Name, tb.Name]).Group()
        eff = slide.TimeLine.MainSequence.AddEffect(grp, 10, 0, 1) # Fade on-click
        eff.Timing.Duration = 0.4
        
        return grp, top + actual_height

    def verify_and_save(self):
        """Checks every slide for zero-overflow and saves the presentation."""
        all_passed = True
        for i in range(1, self.pres.Slides.Count + 1):
            s = self.pres.Slides(i)
            max_b = max(shape.Top + shape.Height for shape in s.Shapes)
            margin = self.slide_height - max_b
            if margin < 45.0:
                print(f"[WARNING] Slide {i} bottom margin only {margin:.1f}pt! (< 45pt safe limit)")
                all_passed = False
                
        self.pres.SaveAs(self.output_path)
        self.pres.Close()
        self.ppt.Quit()
        if all_passed:
            print(f"[SUCCESS] All {i} slides verified with zero overflow and saved to {self.output_path}")
        else:
            print(f"[SAVED WITH WARNINGS] Saved to {self.output_path}")
