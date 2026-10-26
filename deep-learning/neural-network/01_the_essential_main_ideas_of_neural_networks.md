# Mạng Nơ-ron Nhân tạo (Neural Networks) - Phần 1: Bên trong "Hộp đen" (Inside the Black Box)

> 📺 **Nguồn bài giảng gốc:** [StatQuest with Josh Starmer - Neural Networks Part 1: Inside the Black Box](https://www.youtube.com/watch?v=CqOfi41LfDw&list=PLblh5JKOoLUIxGDQs4LFFD--41Vzf-ME1&index=2)  
> 🏷️ **Chủ đề:** Các khái niệm cốt lõi của Mạng Nơ-ron (The Essential Main Ideas of Neural Networks)  
> 🔗 **Mục lục:** [⬅ Quay lại Danh mục Neural Network](README.md)

---

## 1. Giới thiệu: Xóa bỏ định kiến về "Hộp đen" (Black Box)

Mạng nơ-ron nhân tạo (Artificial Neural Networks - ANN) thường bị xem là một **"hộp đen bí ẩn"** (Black Box) khó hiểu, nơi dữ liệu đi vào một đầu và kết quả kỳ diệu xuất hiện ở đầu kia. 

Tuy nhiên, như Josh Starmer nhấn mạnh trong StatQuest:
> 💡 **Bản chất của mạng nơ-ron thực ra rất đơn giản:** Chúng chỉ là tập hợp của các phép tính toán số học cơ bản (nhân trọng số, cộng độ lệch, đi qua hàm kích hoạt phi tuyến) được xếp chồng và kết hợp lại với nhau để tạo ra các **đường cong uốn lượn (Squiggles / Curved lines)** khớp với dữ liệu thực tế.

---

## 2. Bài toán đặt ra: Tại sao các mô hình tuyến tính thất bại?

Để hiểu vì sao cần mạng nơ-ron, StatQuest đưa ra một ví dụ trực quan về **Hiệu quả của liều lượng thuốc (Drug Dosage vs. Effectiveness)**:

### 2.1. Tập dữ liệu thực nghiệm

Giả sử ta thử nghiệm một loại thuốc với các mức liều lượng ($X$) và ghi nhận hiệu quả điều trị ($Y$):
- **Liều lượng thấp (Low Dose):** Không có tác dụng chữa bệnh $\rightarrow$ Hiệu quả = **0**.
- **Liều lượng vừa phải (Medium Dose):** Bệnh nhân khỏi bệnh $\rightarrow$ Hiệu quả = **1**.
- **Liều lượng cao (High Dose):** Thuốc gây độc tính cho cơ thể $\rightarrow$ Hiệu quả = **0**.

```
Hiệu quả (Effectiveness)
   1 |          ● (Medium Dose: Hiệu quả)
     |
     |
   0 |   ●                         ● (High Dose: Độc hại)
     | (Low Dose: Không tác dụng)
     +------------------------------------ Liều lượng (Dosage)
```

### 2.2. Sự bất lực của Hồi quy Tuyến tính & Hồi quy Logistic

1. **Hồi quy tuyến tính (Linear Regression):** 
   - Chỉ vẽ được một **đường thẳng** $y = ax + b$. 
   - Một đường thẳng không thể vừa đi lên ở giữa lại vừa đi xuống ở hai đầu.
2. **Hồi quy Logistic (Logistic Regression):** 
   - Tạo ra đường cong chữ S (Sigmoid curve).
   - Tuy nhiên, hàm sigmoid có tính chất **đơn điệu** (chỉ tăng dần hoặc chỉ giảm dần), do đó cũng không thể mô tả được mối quan hệ "lên rồi lại xuống" của liều lượng thuốc.

👉 **Nhu cầu cấp thiết:** Ta cần một mô hình có khả năng uốn cong linh hoạt để tạo ra một đường "gợn sóng" (Squiggle) đi qua các điểm dữ liệu. Đó chính là lý do **Mạng nơ-ron nhân tạo** ra đời!

---

## 3. Kiến trúc cơ bản của Mạng Nơ-ron trong bài giảng

Mạng nơ-ron giải quyết bài toán trên gồm 3 tầng:

```mermaid
flowchart LR
    subgraph Input_Layer ["Tầng Đầu Vào (Input)"]
        X["Liều lượng (Dosage)<br/>x"]
    end

    subgraph Hidden_Layer ["Tầng Ẩn (Hidden Layer)"]
        N1["Nơ-ron ẩn 1<br/>z₁ = w₁x + b₁<br/>a₁ = Softplus(z₁)"]
        N2["Nơ-ron ẩn 2<br/>z₂ = w₂x + b₂<br/>a₂ = Softplus(z₂)"]
    end

    subgraph Output_Layer ["Tầng Đầu Ra (Output)"]
        Y["Hiệu quả dự đoán (ŷ)<br/>ŷ = w₃·a₁ + w₄·a₂ + b_out"]
    end

    X -->|"Trọng số w₁, Bias b₁"| N1
    X -->|"Trọng số w₂, Bias b₂"| N2
    N1 -->|"Trọng số w₃"| Y
    N2 -->|"Trọng số w₄"| Y
```

- **Tầng đầu vào (Input Layer):** Nhận 1 đặc trưng duy nhất là giá trị Liều lượng ($x$).
- **Tầng ẩn (Hidden Layer):** Gồm 2 nơ-ron (nodes). Mỗi nơ-ron thực hiện phép biến đổi tuyến tính kết hợp với một hàm kích hoạt (Activation Function).
- **Tầng đầu ra (Output Layer):** Tổng hợp kết quả từ các nơ-ron ẩn, nhân với trọng số đầu ra và cộng bias để xuất ra giá trị dự đoán Hiệu quả ($\hat{y}$).

---

## 4. Cơ chế hoạt động chi tiết bên trong từng Nơ-ron

Một nơ-ron trong mạng thực hiện 2 bước tính toán tuần tự:

### 4.1. Bước 1: Biến đổi tuyến tính (Scaling & Shifting)
Đầu vào $x$ được nhân với **Trọng số ($w$ - Weight)** và cộng thêm **Độ lệch ($b$ - Bias)**:
$$z = w \cdot x + b$$

- **Trọng số ($w$):** Điều khiển **độ dốc (slope)** của đường thẳng (xoay đường thẳng).
- **Độ lệch ($b$):** Điều khiển việc **tịnh tiến (shift)** đường thẳng sang trái/phải hoặc lên/xuống.

### 4.2. Bước 2: Bẻ cong đường thẳng bằng Hàm Kích hoạt (Activation Function)
Nếu chỉ dừng lại ở phép tính $w \cdot x + b$, mạng nơ-ron dù sâu bao nhiêu lớp cũng chỉ là một tổ hợp các phép tính tuyến tính (vẫn là đường thẳng).  
Để uốn cong đường thẳng, ta đưa giá trị $z$ qua một **Hàm kích hoạt phi tuyến**.

Trong video, Josh Starmer sử dụng hàm **Softplus**:
$$\text{Softplus}(z) = \ln(1 + e^z)$$

> 🔍 **So sánh Softplus và ReLU:**
> - **ReLU (Rectified Linear Unit):** $f(z) = \max(0, z)$ — bẻ gập đường thẳng đột ngột tại điểm $0$ tạo thành góc nhọn.
> - **Softplus:** Là phiên bản làm mịn (smooth approximation) của ReLU. Thay vì gập góc nhọn, Softplus uốn cong mượt mà quanh điểm 0 và luôn có đạo hàm liên tục, tránh hiện tượng "chết nơ-ron" (dying ReLU).

```
Giá trị sau kích hoạt
      ^
      |         /  (Tiệm cận đường thẳng y = z khi z > 0)
      |        /
      |      _´
      |   _.-
   0  +--´---------> Trục z (z = wx + b)
```

---

## 5. Phép màu của Mạng Nơ-ron: Ghép các đường uốn cong thành "Squiggle"

Làm thế nào để 2 nơ-ron ẩn kết hợp lại tạo thành một đồ thị có đỉnh nhô lên ở giữa và thấp ở hai đầu?

1. **Nơ-ron ẩn số 1:**
   - Tính $z_1 = w_1 \cdot x + b_1$ và đưa qua Softplus: $a_1 = \text{Softplus}(z_1)$.
   - Đồ thị $a_1$ uốn cong đi lên khi liều lượng tăng qua mức liều thấp.
2. **Nơ-ron ẩn số 2:**
   - Tính $z_2 = w_2 \cdot x + b_2$ và đưa qua Softplus: $a_2 = \text{Softplus}(z_2)$.
   - Đồ thị $a_2$ uốn cong đi lên ở ngưỡng liều lượng cao hơn.
3. **Kết hợp tại Tầng Đầu ra (Output Layer):**
   - Tầng đầu ra gán cho $a_1$ một **trọng số dương** ($w_3 > 0$) $\rightarrow$ giữ nguyên chiều cong đi lên.
   - Tầng đầu ra gán cho $a_2$ một **trọng số âm** ($w_4 < 0$) $\rightarrow$ lật ngược đường cong thành chúc xuống dưới.
   - Cộng hai đường cong lại cùng với một độ lệch $b_{out}$:
     $$\hat{y} = w_3 \cdot a_1 + w_4 \cdot a_2 + b_{out}$$

```
   Đường cong 1 (a₁ · w₃):      Đường cong 2 (a₂ · w₄):         Tổng hợp tại Output (ŷ):
         ^                            ^                                    ^
         |      _.-´                  |                                    |       .--.
         |   _.-                      |                                    |      /    \
         +--´--------> x              +--------._                          +-----´      `-----> x
                                                 `-._                      (Thấp - Cao - Thấp)
```

🎉 **Kết quả:** Sự kết hợp của hai đường cong (một đi lên và một đi xuống bị trừ bớt) đã tạo thành một **đường vồng hình chuông mượt mà** khớp hoàn hảo với 3 điểm dữ liệu:
- Liều thấp $\rightarrow$ $\hat{y} \approx 0$
- Liều vừa $\rightarrow$ $\hat{y} \approx 1$
- Liều cao $\rightarrow$ $\hat{y} \approx 0$

---

## 6. Dự đoán trên dữ liệu mới: Lan truyền xuôi (Forward Pass)

Khi mạng đã có đầy đủ các thông số trọng số và bias tối ưu, việc đưa một điểm dữ liệu mới vào để dự đoán được gọi là quá trình **Lan truyền xuôi (Forward Propagation / Forward Pass)**:

1. Đưa giá trị liều lượng $x$ vào tầng đầu vào.
2. Tính toán giá trị tại từng nơ-ron ẩn:
   $$a_1 = \ln\left(1 + e^{w_1 x + b_1}\right)$$
   $$a_2 = \ln\left(1 + e^{w_2 x + b_2}\right)$$
3. Tổng hợp giá trị tại tầng đầu ra:
   $$\hat{y} = w_3 a_1 + w_4 a_2 + b_{out}$$
4. Kết quả $\hat{y}$ chính là mức độ hiệu quả dự báo của liều thuốc đó.

---

## 7. Các trọng số và bias được tìm ra như thế nào? (Preview Phần 2)

Trong video Phần 1, Josh Starmer giả định trước các trọng số và bias đã được tinh chỉnh sẵn để minh họa cơ chế hoạt động. Tuy nhiên trong thực tế:
- Ban đầu, các trọng số ($w$) và bias ($b$) được **khởi tạo ngẫu nhiên**.
- Mô hình sẽ đưa ra những dự đoán ban đầu rất tồi tệ.
- Mạng nơ-ron đo lường sai số bằng **Hàm mất mát (Loss Function / Cost Function)**.
- Sau đó, thuật toán **Lan truyền ngược (Backpropagation)** kết hợp cùng **Gradient Descent** sẽ tính đạo hàm của hàm mất mát theo từng tham số để cập nhật, kéo các đường cong dần khớp vào dữ liệu thật.

*(Nội dung này được trình bày chi tiết trong Phần 2 của chuỗi video).*

---

## 8. Tóm tắt các thuật ngữ cốt lõi (Key Takeaways)

| Thuật ngữ | Tiếng Anh | Ý nghĩa trong Mạng Nơ-ron |
|-----------|-----------|---------------------------|
| **Nơ-ron / Nút** | Node / Neuron | Đơn vị tính toán cơ sở thực hiện phép tính nhân trọng số, cộng bias và áp hàm kích hoạt. |
| **Trọng số** | Weight ($w$) | Quyết định độ dốc và mức độ ảnh hưởng của tín hiệu đầu vào đến nơ-ron kế tiếp. |
| **Độ lệch** | Bias ($b$) | Tịnh tiến đường biểu diễn, quyết định ngưỡng kích hoạt của nơ-ron. |
| **Hàm kích hoạt** | Activation Function | Hàm phi tuyến (ReLU, Softplus, Sigmoid,...) giúp bẻ cong các đường thẳng, tạo khả năng học các mối quan hệ phi tuyến phức tạp. |
| **Đường cong xấp xỉ** | Squiggle | Đường cong phức tạp tạo thành từ việc cộng gộp nhiều đường cong/đoạn gãy đơn giản từ các nơ-ron ẩn. |
| **Lan truyền xuôi** | Forward Pass | Luồng tính toán tuần tự từ đầu vào qua các tầng ẩn đến đầu ra để đưa ra kết quả dự đoán. |

---

## 9. Bài tập suy ngẫm & Ôn tập

1. Nếu một mạng nơ-ron có nhiều tầng ẩn nhưng **không sử dụng bất kỳ hàm kích hoạt phi tuyến nào**, đầu ra của mạng sẽ có dạng gì?  
   *(Gợi ý: Tích của các ma trận tuyến tính vẫn là một phép biến đổi tuyến tính $\rightarrow$ chỉ là một đường thẳng/mặt phẳng).*
2. Nếu bài toán có 5 đỉnh uốn lượn phức tạp thay vì chỉ 1 đỉnh như ví dụ liều lượng thuốc, ta cần thay đổi kiến trúc mạng như thế nào?  
   *(Gợi ý: Cần thêm nhiều nơ-ron ẩn hơn ở hidden layer hoặc xếp chồng thêm nhiều hidden layers để kết hợp nhiều đường cong hơn).*
