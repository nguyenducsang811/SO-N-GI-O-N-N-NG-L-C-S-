
export const NLS_COMPONENT_OPTIONS = [
  { code: "1.1", label: "1.1. Duyệt, tìm kiếm và lọc dữ liệu, thông tin và nội dung số" },
  { code: "1.2", label: "1.2. Đánh giá dữ liệu, thông tin và nội dung số" },
  { code: "1.3", label: "1.3. Quản lý dữ liệu, thông tin và nội dung số" },
  { code: "2.1", label: "2.1. Tương tác thông qua công nghệ số" },
  { code: "2.2", label: "2.2. Chia sẻ thông tin và nội dung thông qua công nghệ số" },
  { code: "2.3", label: "2.3. Sử dụng công nghệ số để thực hiện trách nhiệm công dân" },
  { code: "2.4", label: "2.4. Hợp tác thông qua công nghệ số" },
  { code: "2.5", label: "2.5. Quy tắc ứng xử trên mạng" },
  { code: "2.6", label: "2.6. Quản lý danh tính số" },
  { code: "3.1", label: "3.1. Phát triển nội dung số" },
  { code: "3.2", label: "3.2. Tích hợp và tạo lập lại nội dung số" },
  { code: "3.3", label: "3.3. Thực thi bản quyền và giấy phép" },
  { code: "3.4", label: "3.4. Lập trình" },
  { code: "4.1", label: "4.1. Bảo vệ thiết bị" },
  { code: "4.2", label: "4.2. Bảo vệ dữ liệu cá nhân và quyền riêng tư" },
  { code: "4.3", label: "4.3. Bảo vệ sức khỏe và an sinh số" },
  { code: "4.4", label: "4.4. Bảo vệ môi trường" },
  { code: "5.1", label: "5.1. Giải quyết các vấn đề kỹ thuật" },
  { code: "5.2", label: "5.2. Xác định nhu cầu và giải pháp công nghệ" },
  { code: "5.3", label: "5.3. Sử dụng sáng tạo công nghệ số" },
  { code: "5.4", label: "5.4. Xác định các vấn đề cần cải thiện về NLS" },
  { code: "6.1", label: "6.1. Hiểu biết về trí tuệ nhân tạo" },
  { code: "6.2", label: "6.2. Sử dụng trí tuệ nhân tạo" },
  { code: "6.3", label: "6.3. Đánh giá trí tuệ nhân tạo" },
];

export const NLS_LEVEL_DETAILS: Record<string, { code: string; desc: string; grade: string }[]> = {
  "1.1": [
    { code: "CB1a", desc: "Xác định được nhu cầu thông tin, tìm kiếm dữ liệu, thông tin và nội dung thông qua tìm kiếm đơn giản trong môi trường số.", grade: "Lớp 1, 2, 3" },
    { code: "CB1b", desc: "Tìm được cách truy cập những dữ liệu, thông tin và nội dung này cũng như điều hướng giữa chúng.", grade: "Lớp 1, 2, 3" },
    { code: "CB1c", desc: "Xác định được các chiến lược tìm kiếm đơn giản.", grade: "Lớp 1, 2, 3" },
    { code: "CB2a", desc: "Xác định được nhu cầu thông tin.", grade: "Lớp 4, 5" },
    { code: "CB2b", desc: "Tìm được dữ liệu, thông tin và nội dung thông qua tìm kiếm đơn giản trong môi trường số.", grade: "Lớp 4, 5" },
    { code: "CB2c", desc: "Tìm được cách truy cập những dữ liệu, thông tin và nội dung này cũng như điều hướng giữa chúng.", grade: "Lớp 4, 5" },
    { code: "CB2d", desc: "Xác định được các chiến lược tìm kiếm đơn giản.", grade: "Lớp 4, 5" },
    { code: "TC1a", desc: "Giải thích được nhu cầu thông tin.", grade: "Lớp 6, 7" },
    { code: "TC1b", desc: "Thực hiện được rõ ràng và theo quy trình các tìm kiếm để tìm dữ liệu, thông tin và nội dung trong môi trường số.", grade: "Lớp 6, 7" },
    { code: "TC1c", desc: "Giải thích được cách truy cập và điều hướng các kết quả tìm kiếm.", grade: "Lớp 6, 7" },
    { code: "TC1d", desc: "Giải thích được rõ ràng và theo quy trình chiến lược tìm kiếm.", grade: "Lớp 6, 7" },
    { code: "TC2a", desc: "Minh họa được nhu cầu thông tin.", grade: "Lớp 8, 9" },
    { code: "TC2b", desc: "Tổ chức được tìm kiếm dữ liệu, thông tin và nội dung trong môi trường số.", grade: "Lớp 8, 9" },
    { code: "TC2c", desc: "Mô tả được cách truy cập những dữ liệu, thông tin và nội dung này cũng như điều hướng giữa chúng.", grade: "Lớp 8, 9" },
    { code: "TC2d", desc: "Tổ chức được các chiến lược tìm kiếm.", grade: "Lớp 8, 9" },
    { code: "NC1a", desc: "Đáp ứng được nhu cầu thông tin.", grade: "Lớp 10, 11, 12" },
    { code: "NC1b", desc: "Áp dụng được kỹ thuật tìm kiếm để lấy được dữ liệu, thông tin và nội dung trong môi trường số.", grade: "Lớp 10, 11, 12" },
    { code: "NC1c", desc: "Chỉ cho người khác cách truy cập những dữ liệu, thông tin và nội dung này cũng như điều hướng giữa chúng.", grade: "Lớp 10, 11, 12" },
    { code: "NC1d", desc: "Tự đề xuất được chiến lược tìm kiếm.", grade: "Lớp 10, 11, 12" },
  ],
  "1.2": [
    { code: "CB1a", desc: "Phát hiện được độ tin cậy và độ chính xác của các nguồn chung của dữ liệu, thông tin và nội dung số.", grade: "Lớp 1, 2, 3" },
    { code: "CB1b", desc: "Thực hiện phân tích, diễn giải và đánh giá được dữ liệu, thông tin và nội dung số.", grade: "Lớp 1, 2, 3" },
    { code: "CB2a", desc: "Phát hiện được độ tin cậy và độ chính xác của các nguồn chung của dữ liệu, thông tin và nội dung số.", grade: "Lớp 4, 5" },
    { code: "CB2b", desc: "Thực hiện phân tích, diễn giải và đánh giá được dữ liệu, thông tin và nội dung số được xác định rõ ràng.", grade: "Lớp 4, 5" },
    { code: "TC1a", desc: "Thực hiện phân tích, so sánh, đánh giá được độ tin cậy và độ chính xác của các nguồn dữ liệu, thông tin và nội dung số đã được tổ chức rõ ràng.", grade: "Lớp 6, 7" },
    { code: "TC2a", desc: "Thực hiện phân tích, so sánh và đánh giá được các nguồn dữ liệu, thông tin và nội dung số.", grade: "Lớp 8, 9" },
    { code: "NC1a", desc: "Thực hiện đánh giá được độ tin cậy và độ tin cậy của các nguồn dữ liệu, thông tin và nội dung số.", grade: "Lớp 10, 11, 12" },
    { code: "NC1b", desc: "Tiến hành đánh giá được các dữ liệu, thông tin và nội dung số khác nhau.", grade: "Lớp 10, 11, 12" },
  ],
  "1.3": [
    { code: "CB1a", desc: "Xác định được cách tổ chức, lưu trữ và truy xuất dữ liệu, thông tin và nội dung một cách đơn giản trong môi trường số.", grade: "Lớp 1, 2, 3" },
    { code: "CB1b", desc: "Nhận biết được nơi để sắp xếp dữ liệu, thông tin và nội dung một cách đơn giản trong môi trường có cấu trúc.", grade: "Lớp 1, 2, 3" },
    { code: "CB2a", desc: "Xác định được cách tổ chức, lưu trữ và truy xuất dữ liệu, thông tin và nội dung một cách đơn giản trong môi trường số.", grade: "Lớp 4, 5" },
    { code: "CB2b", desc: "Nhận biết được nơi để sắp xếp dữ liệu, thông tin và nội dung một cách đơn giản trong môi trường có cấu trúc.", grade: "Lớp 4, 5" },
    { code: "TC1a", desc: "Lựa chọn được dữ liệu, thông tin và nội dung để tổ chức, lưu trữ và truy xuất chúng một cách thường xuyên trong môi trường số.", grade: "Lớp 6, 7" },
    { code: "TC1b", desc: "Sắp xếp chúng một cách trật tự trong một môi trường có cấu trúc.", grade: "Lớp 6, 7" },
    { code: "TC2a", desc: "Sắp xếp được thông tin, dữ liệu, nội dung để dễ dàng lưu trữ và truy xuất.", grade: "Lớp 8, 9" },
    { code: "TC2b", desc: "Tổ chức được thông tin, dữ liệu và nội dung trong một môi trường có cấu trúc.", grade: "Lớp 8, 9" },
    { code: "NC1a", desc: "Thao tác được thông tin, dữ liệu và nội dung để tổ chức, lưu trữ và truy xuất dễ dàng hơn.", grade: "Lớp 10, 11, 12" },
    { code: "NC1b", desc: "Triển khai được việc tổ chức và sắp xếp dữ liệu, thông tin và nội dung trong môi trường có cấu trúc.", grade: "Lớp 10, 11, 12" },
  ],
  "2.1": [
    { code: "CB1a", desc: "Lựa chọn được các công nghệ số đơn giản để tương tác.", grade: "Lớp 1, 2, 3" },
    { code: "CB1b", desc: "Xác định được các phương tiện giao tiếp đơn giản thích hợp cho một bối cảnh cụ thể.", grade: "Lớp 1, 2, 3" },
    { code: "CB2a", desc: "Lựa chọn được các công nghệ số đơn giản để tương tác.", grade: "Lớp 4, 5" },
    { code: "CB2b", desc: "Xác định được các phương tiện giao tiếp đơn giản thích hợp cho một bối cảnh cụ thể.", grade: "Lớp 4, 5" },
    { code: "TC1a", desc: "Thực hiện các tương tác rõ ràng và thường xuyên với công nghệ số (sử dụng công cụ trắc nghiệm, bảng tương tác).", grade: "Lớp 6, 7" },
    { code: "TC1b", desc: "Lựa chọn được các phương tiện giao tiếp số phù hợp, được xác định rõ ràng cho phù hợp với bối cảnh nhất định.", grade: "Lớp 6, 7" },
    { code: "TC2a", desc: "Lựa chọn được nhiều công nghệ số để tương tác.", grade: "Lớp 8, 9" },
    { code: "TC2b", desc: "Lựa chọn được nhiều phương tiện truyền thông số cho phù hợp với bối cảnh nhất định.", grade: "Lớp 8, 9" },
    { code: "NC1a", desc: "Sử dụng được nhiều công nghệ số để tương tác.", grade: "Lớp 10, 11, 12" },
    { code: "NC1b", desc: "Cho người khác thấy phương tiện giao tiếp số phù hợp nhất cho một bối cảnh cụ thể.", grade: "Lớp 10, 11, 12" },
  ],
  "2.2": [
    { code: "CB1a", desc: "Nhận biết được các công nghệ số đơn giản, phù hợp để chia sẻ dữ liệu, thông tin và nội dung kỹ thuật số.", grade: "Lớp 1, 2, 3" },
    { code: "CB1b", desc: "Nhận biết được phương pháp trích dẫn và ghi nguồn cơ bản.", grade: "Lớp 1, 2, 3" },
    { code: "CB2a", desc: "Nhận biết được các công nghệ số đơn giản, phù hợp để chia sẻ dữ liệu, thông tin và nội dung kỹ thuật số.", grade: "Lớp 4, 5" },
    { code: "CB2b", desc: "Xác định được phương pháp trích dẫn và ghi nguồn cơ bản.", grade: "Lớp 4, 5" },
    { code: "TC1a", desc: "Lựa chọn các công nghệ số phù hợp được xác định rõ để trao đổi dữ liệu, thông tin và nội dung số.", grade: "Lớp 6, 7" },
    { code: "TC1b", desc: "Giải thích cách thức hoạt động như một trung gian để chia sẻ thông tin và nội dung thông qua các công nghệ kỹ thuật số được xác định rõ ràng và thường xuyên.", grade: "Lớp 6, 7" },
    { code: "TC1c", desc: "Minh họa rõ ràng và thường xuyên các phương pháp tham chiếu và ghi chú nguồn.", grade: "Lớp 6, 7" },
    { code: "TC2a", desc: "Vận dụng được các công nghệ số phù hợp để chia sẻ dữ liệu, thông tin và nội dung số.", grade: "Lớp 8, 9" },
    { code: "TC2b", desc: "Giải thích được cách đóng vai trò trung gian để chia sẻ thông tin và nội dung thông qua công nghệ số.", grade: "Lớp 8, 9" },
    { code: "TC2c", desc: "Áp dụng được các phương pháp tham chiếu và ghi chú nguồn.", grade: "Lớp 8, 9" },
    { code: "NC1a", desc: "Chia sẻ dữ liệu, thông tin và nội dung số thông qua nhiều công cụ số phù hợp.", grade: "Lớp 10, 11, 12" },
    { code: "NC1b", desc: "Hướng dẫn người khác cách đóng vai trò trung gian để chia sẻ thông tin và nội dung thông qua công nghệ số.", grade: "Lớp 10, 11, 12" },
    { code: "NC1c", desc: "Áp dụng được nhiều phương pháp tham chiếu và ghi nguồn khác nhau.", grade: "Lớp 10, 11, 12" },
  ],
  "2.3": [
    { code: "CB1a", desc: "Xác định được các dịch vụ số đơn giản để có thể tham gia vào xã hội.", grade: "Lớp 1, 2, 3" },
    { code: "CB1b", desc: "Nhận biết được các công nghệ số đơn giản, phù hợp để nâng cao năng lực cho bản thân và tham gia vào xã hội với tư cách là một công dân.", grade: "Lớp 1, 2, 3" },
    { code: "CB2a", desc: "Xác định được các dịch vụ số đơn giản để có thể tham gia vào xã hội.", grade: "Lớp 4, 5" },
    { code: "CB2b", desc: "Nhận biết được các công nghệ số đơn giản, phù hợp để nâng cao năng lực cho bản thân và tham gia vào xã hội với tư cách là một công dân.", grade: "Lớp 4, 5" },
    { code: "TC1a", desc: "Lựa chọn được các dịch vụ số được xác định rõ ràng và phổ biến để tham gia vào xã hội.", grade: "Lớp 6, 7" },
    { code: "TC1b", desc: "Xác định được các công nghệ số rõ ràng và thích hợp để tự mình trang bị và tham gia vào xã hội như một công dân.", grade: "Lớp 6, 7" },
    { code: "TC2a", desc: "Lựa chọn được các dịch vụ số để tham gia vào xã hội.", grade: "Lớp 8, 9" },
    { code: "TC2b", desc: "Thảo luận về các công nghệ số phù hợp để nâng cao năng lực của bản thân và tham gia vào xã hội với tư cách là một công dân.", grade: "Lớp 8, 9" },
    { code: "NC1a", desc: "Đề xuất được các dịch vụ số khác nhau để tham gia vào xã hội.", grade: "Lớp 10, 11, 12" },
    { code: "NC1b", desc: "Sử dụng được các công nghệ số thích hợp để tự mình trang bị và tham gia vào xã hội như một công dân.", grade: "Lớp 10, 11, 12" },
  ],
  "2.4": [
    { code: "CB1a", desc: "Chọn được những công cụ và công nghệ số đơn giản cho các quá trình cộng tác.", grade: "Lớp 1, 2, 3" },
    { code: "CB2a", desc: "Lựa chọn được các công cụ và công nghệ số đơn giản cho các quá trình cộng tác.", grade: "Lớp 4, 5" },
    { code: "TC1a", desc: "Lựa chọn được các công cụ và công nghệ số được xác định rõ ràng và thường xuyên cho các quá trình hợp tác.", grade: "Lớp 6, 7" },
    { code: "TC2a", desc: "Đề xuất được các công cụ và công nghệ số cho các quá trình hợp tác.", grade: "Lớp 8, 9" },
    { code: "NC1a", desc: "Chọn được những công cụ và công nghệ số khác nhau cho các quá trình hợp tác.", grade: "Lớp 10, 11, 12" },
  ],
  "2.5": [
    { code: "CB1a", desc: "Phân biệt được các chuẩn mực hành vi đơn giản và biết cách sử dụng công nghệ số và tương tác trong môi trường số.", grade: "Lớp 1, 2, 3" },
    { code: "TC1a", desc: "Làm rõ được các chuẩn mực hành vi thường xuyên và được xác định rõ ràng.", grade: "Lớp 6, 7" },
    { code: "NC1a", desc: "Áp dụng được các chuẩn mực hành vi và bí quyết khác nhau.", grade: "Lớp 10, 11, 12" },
  ],
  "2.6": [
    { code: "CB1a", desc: "Xác định được danh tính số.", grade: "Lớp 1, 2, 3" },
    { code: "TC1a", desc: "Hiển thị được nhiều danh tính số cụ thể, được xác định rõ ràng.", grade: "Lớp 6, 7" },
    { code: "NC1a", desc: "Phân biệt được một loạt các danh tính số khác nhau.", grade: "Lớp 10, 11, 12" },
  ],
  "3.1": [
    { code: "CB1a", desc: "Tạo và chỉnh sửa nội dung đơn giản.", grade: "Lớp 1, 2, 3" },
    { code: "TC1a", desc: "Chỉ ra được cách tạo và chỉnh sửa nội dung phổ thông.", grade: "Lớp 6, 7" },
    { code: "NC1a", desc: "Áp dụng được các cách tạo và chỉnh sửa nội dung phức tạp.", grade: "Lớp 10, 11, 12" },
  ],
  "3.2": [
    { code: "CB1a", desc: "Tích hợp đơn giản nội dung và thông tin.", grade: "Lớp 1, 2, 3" },
    { code: "TC1a", desc: "Giải thích được các cách sửa đổi, tích hợp nội dung.", grade: "Lớp 6, 7" },
    { code: "NC1a", desc: "Làm việc với các mục nội dung mới khác nhau.", grade: "Lớp 10, 11, 12" },
  ],
  "3.3": [
    { code: "CB1a", desc: "Xác định được các quy tắc đơn giản về bản quyền.", grade: "Lớp 1, 2, 3" },
    { code: "TC1a", desc: "Chỉ ra được các quy tắc về bản quyền phổ biến.", grade: "Lớp 6, 7" },
    { code: "NC1a", desc: "Áp dụng được các quy tắc khác nhau về bản quyền.", grade: "Lớp 10, 11, 12" },
  ],
  "3.4": [
    { code: "CB1a", desc: "Liệt kê hướng dẫn đơn giản cho máy tính.", grade: "Lớp 1, 2, 3" },
    { code: "TC1a", desc: "Liệt kê các hướng dẫn thông thường.", grade: "Lớp 6, 7" },
    { code: "NC1a", desc: "Thao tác được bằng các hướng dẫn dành cho máy tính.", grade: "Lớp 10, 11, 12" },
  ],
  "4.1": [
    { code: "CB1a", desc: "Nhận biết được cách bảo vệ thiết bị đơn giản.", grade: "Lớp 1, 2, 3" },
    { code: "TC1a", desc: "Chỉ ra được cách bảo vệ thiết bị thường gặp.", grade: "Lớp 6, 7" },
    { code: "NC1a", desc: "Áp dụng được các cách thức bảo vệ thiết bị.", grade: "Lớp 10, 11, 12" },
  ],
  "4.2": [
    { code: "CB1a", desc: "Lựa chọn cách bảo vệ dữ liệu cá nhân đơn giản.", grade: "Lớp 1, 2, 3" },
    { code: "TC1a", desc: "Giải thích các cách thức bảo vệ dữ liệu cá nhân phổ biến.", grade: "Lớp 6, 7" },
    { code: "NC1a", desc: "Áp dụng các cách thức khác nhau để bảo vệ dữ liệu cá nhân.", grade: "Lớp 10, 11, 12" },
  ],
  "4.3": [
    { code: "CB1a", desc: "Nhận biết các rủi ro về sức khỏe khi sử dụng công nghệ.", grade: "Lớp 1, 2, 3" },
    { code: "TC1a", desc: "Áp dụng các biện pháp bảo vệ sức khỏe.", grade: "Lớp 6, 7" },
    { code: "NC1a", desc: "Cân bằng thời gian sử dụng công nghệ.", grade: "Lớp 10, 11, 12" },
  ],
  "4.4": [
    { code: "CB1a", desc: "Nhận biết tác động của công nghệ đến môi trường.", grade: "Lớp 1, 2, 3" },
    { code: "TC1a", desc: "Sử dụng thiết bị công nghệ tiết kiệm năng lượng.", grade: "Lớp 6, 7" },
    { code: "NC1a", desc: "Áp dụng các giải pháp công nghệ xanh.", grade: "Lớp 10, 11, 12" },
  ],
  "5.1": [
    { code: "CB1a", desc: "Nhận diện lỗi kỹ thuật cơ bản.", grade: "Lớp 1, 2, 3" },
    { code: "TC1a", desc: "Khắc phục sự cố thông thường.", grade: "Lớp 6, 7" },
    { code: "NC1a", desc: "Giải quyết các vấn đề kỹ thuật phức tạp.", grade: "Lớp 10, 11, 12" },
  ],
  "5.2": [
    { code: "CB1a", desc: "Xác định nhu cầu cá nhân đơn giản.", grade: "Lớp 1, 2, 3" },
    { code: "TC1a", desc: "Đánh giá nhu cầu và lựa chọn công cụ số.", grade: "Lớp 6, 7" },
    { code: "NC1a", desc: "Sử dụng công cụ số giải quyết vấn đề.", grade: "Lớp 10, 11, 12" },
  ],
  "5.3": [
    { code: "CB1a", desc: "Tạo sản phẩm đơn giản bằng công nghệ.", grade: "Lớp 1, 2, 3" },
    { code: "TC1a", desc: "Ứng dụng sáng tạo công nghệ.", grade: "Lớp 6, 7" },
    { code: "NC1a", desc: "Đổi mới quy trình bằng giải pháp công nghệ.", grade: "Lớp 10, 11, 12" },
  ],
  "5.4": [
    { code: "CB1a", desc: "Nhận biết kỹ năng số còn thiếu.", grade: "Lớp 1, 2, 3" },
    { code: "TC1a", desc: "Tìm cơ hội học tập năng lực số.", grade: "Lớp 6, 7" },
    { code: "NC1a", desc: "Tự lập kế hoạch cập nhật năng lực số.", grade: "Lớp 10, 11, 12" },
  ],
  "6.1": [
    { code: "CB1a", desc: "Nhận biết ứng dụng AI cơ bản.", grade: "Lớp 1, 2, 3" },
    { code: "TC1a", desc: "Hiểu nguyên lý hoạt động cơ bản của AI.", grade: "Lớp 6, 7" },
    { code: "NC1a", desc: "Phân tích tác động của AI đến xã hội.", grade: "Lớp 10, 11, 12" },
  ],
  "6.2": [
    { code: "CB1a", desc: "Sử dụng AI đơn giản trong học tập.", grade: "Lớp 1, 2, 3" },
    { code: "TC1a", desc: "Sử dụng AI phù hợp hỗ trợ công việc.", grade: "Lớp 6, 7" },
    { code: "NC1a", desc: "Tối ưu hóa sử dụng AI.", grade: "Lớp 10, 11, 12" },
  ],
  "6.3": [
    { code: "CB1a", desc: "Nhận biết vấn đề đạo đức AI.", grade: "Lớp 1, 2, 3" },
    { code: "TC1a", desc: "Đánh giá tính chính xác của AI.", grade: "Lớp 6, 7" },
    { code: "NC1a", desc: "Áp dụng nguyên tắc đạo đức khi dùng AI.", grade: "Lớp 10, 11, 12" },
  ]
};

export const NLS_FRAMEWORK_DATA = `
KHUNG NĂNG LỰC SỐ (DIGITAL COMPETENCE FRAMEWORK) - VIỆT NAM

CẤU TRÚC MÃ (CODE STRUCTURE):
[ID Thành phần].[Mức độ][Thứ tự]
Ví dụ: 1.2.NC1a
- 1.2: Thành phần năng lực "Đánh giá dữ liệu, thông tin và nội dung số"
- NC1: Mức độ Nâng cao 1
- a: Biểu hiện thứ nhất

6 MIỀN NĂNG LỰC & 24 THÀNH PHẦN:
1. Khai thác dữ liệu và thông tin
   1.1. Duyệt, tìm kiếm và lọc dữ liệu, thông tin và nội dung số
   1.2. Đánh giá dữ liệu, thông tin và nội dung số
   1.3. Quản lý dữ liệu, thông tin và nội dung số
2. Giao tiếp và Hợp tác
   2.1. Tương tác thông qua công nghệ số
   2.2. Chia sẻ thông tin và nội dung thông qua công nghệ số
   2.3. Sử dụng công nghệ số để thực hiện trách nhiệm công dân
   2.4. Hợp tác thông qua công nghệ số
   2.5. Quy tắc ứng xử trên mạng
   2.6. Quản lý danh tính số
3. Sáng tạo nội dung số
   3.1. Phát triển nội dung số
   3.2. Tích hợp và tạo lập lại nội dung số
   3.3. Thực thi bản quyền và giấy phép
   3.4. Lập trình
4. An toàn
   4.1. Bảo vệ thiết bị
   4.2. Bảo vệ dữ liệu cá nhân và quyền riêng tư
   4.3. Bảo vệ sức khỏe và an sinh số
   4.4. Bảo vệ môi trường
5. Giải quyết vấn đề
   5.1. Giải quyết các vấn đề kỹ thuật
   5.2. Xác định nhu cầu và giải pháp công nghệ
   5.3. Sử dụng sáng tạo công nghệ số
   5.4. Xác định các vấn đề cần cải thiện về NLS
6. Ứng dụng trí tuệ nhân tạo
   6.1. Hiểu biết về trí tuệ nhân tạo
   6.2. Sử dụng trí tuệ nhân tạo
   6.3. Đánh giá trí tuệ nhân tạo

QUY ĐỊNH VỀ MỨC ĐỘ & CẤP HỌC:
- CB1 (Cơ bản 1): Lớp 1, 2, 3
- CB2 (Cơ bản 2): Lớp 4, 5
- TC1 (Trung cấp 1): Lớp 6, 7
- TC2 (Trung cấp 2): Lớp 8, 9
- NC1 (Nâng cao 1): Lớp 10, 11, 12
`;

export const KHBD_REDESIGN_PROMPT = `Bạn là chuyên gia Sư phạm cấp cao kiêm Chuyên gia Thiết kế học tập (Learning Designer), được giao nhiệm vụ BIÊN SOẠN LẠI giáo án/Kế hoạch bài dạy (KHBD) tích hợp chuẩn Năng lực số (NLS) Quốc gia theo định hướng Chương trình GDPT 2018. 
Nhiệm vụ của bạn không phải giữ nguyên giáo án cũ rồi chỉ chèn thêm vài nội dung công nghệ hoặc năng lực số mang tính hình thức. Bạn phải phân tích toàn diện cấu trúc bài học để tái thiết kế thành một phiên bản KHBD hoàn toàn mới, hiện đại, logic, có chiều sâu sư phạm và khác biệt rõ rệt so với bản gốc. FILE GIÁO ÁN/KHBD GỐC chỉ đóng vai trò tài liệu tham khảo định hướng khoảng 30%–35%; tối thiểu 65%–70% nội dung còn lại phải được phát triển mới theo mô hình “AI REDESIGN+”. Điều này đồng nghĩa với việc bạn phải đổi mới triệt để bản chất hoạt động học tập, hệ thống câu hỏi, nhiệm vụ, sản phẩm học tập, cách tổ chức lớp học và phương thức tích hợp công nghệ số trong toàn bộ tiến trình dạy học. Tuyệt đối không được sao chép ý tưởng, cấu trúc tổ chức hay nội dung từ giáo án gốc rồi chỉ thay đổi ngôn từ.
Khi có tải lên FILE SGK, bạn phải kết hợp đồng thời nội dung chuẩn trong SGK, FILE KHBD/NLS cũ và định hướng phát triển phẩm chất, năng lực của CTGDPT 2018 để xây dựng một phiên bản giáo án mới hoàn chỉnh và có chiều sâu hơn. Đối với các hoạt động, bài tập hoặc tình huống không nằm trong SGK, cần chủ động thay đổi dữ liệu, số liệu, ngữ cảnh và tình huống thực tiễn nhằm tránh lặp lại giáo án cũ. Đồng thời, thiết kế lại nhiệm vụ học tập theo hướng vận dụng, khám phá, phát triển tư duy và tăng cường tính thực tiễn. Giáo án cần ưu tiên các hình thức tổ chức dạy học hiện đại như học tập theo trạm (station-based learning), trò chơi học tập số (game-based learning), nhiệm vụ khám phá, khảo sát trực tuyến, thảo luận – phản biện nhóm, infographic, video hoặc dự án mini nhằm tạo ra môi trường học tập số thực chất, sáng tạo và có tính ứng dụng cao. Lưu ý: AI chỉ đóng vai trò hỗ trợ giáo viên thiết kế hoạt động, xây dựng học liệu và tạo tình huống học tập; học sinh chỉ tiếp cận AI ở mức tham khảo hoặc kiểm chứng, tuyệt đối không sử dụng AI để thay thế cho quá trình tư duy và giải quyết vấn đề độc lập.
Toàn bộ giáo án phải được thiết kế theo hướng tích hợp Năng lực số (NLS) thực chất, hiện đại và mạnh mẽ với mức độ nâng cấp khoảng 70% so với FILE KHBD NLS cũ. Việc tích hợp NLS không được thực hiện theo kiểu hình thức (như chỉ nêu tên công cụ hoặc ghi “ứng dụng CNTT”), mà phải thể hiện rõ việc học sinh thực sự thao tác trên các nền tảng số như Padlet, Canva, GeoGebra, Desmos, Wayground hoặc các công cụ phù hợp khác để học tập, phân tích dữ liệu, tạo sản phẩm số, phản biện và cộng tác trực tuyến. Mọi nội dung có ứng dụng công nghệ trong bước thực hiện nhiệm vụ phải được gạch chân để làm nổi bật yếu tố tích hợp NLS. 
Khi mô tả NLS, bắt buộc sử dụng đúng định dạng sau:
* [Mã NLS]: [Tên biểu hiện năng lực] + [Mô tả hành động số cụ thể của học sinh].
Ví dụ minh họa:
* **2.1.TC1a: Thực hiện các tương tác rõ ràng và thường xuyên với công nghệ số (sử dụng công cụ trắc nghiệm, bảng tương tác). Học sinh sử dụng Padlet để trình bày kết quả thảo luận nhóm và phản hồi chéo giữa các nhóm.**
Tuyệt đối không ghi NLS theo kiểu chung chung hoặc chỉ liệt kê tên công cụ. Cần mô tả rõ học sinh thao tác gì, tương tác như thế nào, sử dụng nền tảng nào và sản phẩm số được tạo ra là gì.
Về hình thức trình bày, giáo án bắt buộc tuân thủ đúng chuẩn như sau:
Khi thực hiện nhiệm vụ, bạn phải đóng vai như một giáo viên thực thụ đang trực tiếp chuẩn bị giáo án để tổ chức dạy học trên lớp. Mọi hoạt động học tập phải phản ánh đúng quy trình tổ chức dạy học thực tế, thể hiện rõ vai trò của giáo viên và học sinh. 
Dưới đây là các nguyên tắc và chỉ thị NGHIÊM NGẶT bạn phải tuân thủ tuyệt đối:

### 1. NGUYÊN TẮC "AI REDESIGN+" VÀ MỨC ĐỘ SIÊU SIÊU CHI TIẾT
* Nhiệm vụ của bạn không phải giữ nguyên giáo án cũ rồi chỉ chèn thêm vài nội dung công nghệ mang tính hình thức. Bạn phải phân tích toàn diện cấu trúc bài học để tái thiết kế thành một phiên bản KHBD hoàn toàn mới, hiện đại, logic, có chiều sâu sư phạm và **được bóc tách SIÊU SIÊU CHI TIẾT về mọi mặt nội dung**.
* **FILE GIÁO ÁN/KHBD GỐC chỉ đóng vai trò tài liệu tham khảo định hướng khoảng 30% nội dung.** Tối thiểu 70% nội dung còn lại bắt buộc bạn phải chủ động SÁNG TẠO, nâng cấp và phát triển mới.
* **KỊCH BẢN THỰC CHIẾN SIÊU SIÊU CHI TIẾT:** Giáo án phải thể hiện tường tận như một kịch bản phim. **CẤM SỬ DỤNG CÁC TỪ CHUNG CHUNG** như "GV hướng dẫn", "GV giải thích", "HS thực hành". Bạn BẮT BUỘC phải ghi rõ:
  - GV nói chính xác câu gì để dẫn dắt?
  - GV đặt câu hỏi gợi mở cụ thể là gì? (Ghi rõ nguyên văn câu hỏi).
  - Dự kiến HS trả lời đúng/sai ra sao? Khó khăn cụ thể của HS là gì?
  - GV gỡ rối bằng câu nói/hành động nào?
* **YÊU CẦU ĐẶC BIỆT VỀ CÂU HỎI & TRÒ CHƠI:** Bất kỳ trò chơi hay hoạt động nào có câu hỏi (kể cả câu hỏi trắc nghiệm tự sáng tạo thêm), BẮT BUỘC PHẢI GHI RÕ TOÀN BỘ NỘI DUNG từng câu hỏi, từng đáp án A, B, C, D và đáp án đúng. Tuyệt đối không được viết lướt.
* **Bảo toàn "SẢN PHẨM DỰ KIẾN":** Phần sản phẩm dự kiến trong các HĐ1, HĐ2, HĐ3, HĐ4 mà tôi cung cấp đã được xác định phù hợp với mục tiêu bài học, bạn KHÔNG ĐƯỢC tự ý thay đổi, cắt giảm nội dung chuyên môn. Nhiệm vụ của bạn là thiết kế phần tổ chức hoạt động sao cho dẫn dắt học sinh tạo ra đúng sản phẩm yêu cầu đó một cách sáng tạo và thực tiễn hơn.

### 2. QUY TẮC NGHIÊM NGẶT VỀ NỘI DUNG SGK, CHÈN HÌNH ẢNH & BỐ CỤC IN ĐẬM
* **GIẢI QUYẾT TRIỆT ĐỂ 100% CÁC NỘI DUNG SGK:** Bắt buộc phải đưa vào giáo án và giải quyết triệt để 100% các nội dung/cấu phần có trong SGK (như Mở đầu, Khám phá, Tìm tòi, Đọc hiểu - Nghe hiểu, Kiến thức trọng tâm, Câu hỏi (?), Ví dụ, Luyện tập, Thực hành, Vận dụng, Tranh luận, Thử thách nhỏ...). Tuyệt đối không được bỏ sót bất kỳ thành phần nào, tất cả phải được thiết kế thành nhiệm vụ học tập và có đáp án/lời giải rõ ràng.
* **Trích nguyên văn:** Đối với toàn bộ nội dung lấy từ SGK, bắt buộc phải **trích đúng nguyên văn 100%**, đặt trong *“ngoặc kép in nghiêng”*, giữ nguyên cấu trúc và kí hiệu.
* **Chỉ thị Chèn hình ảnh:** Tại bất kỳ vị trí nào trong giáo án cần có hình ảnh minh họa (từ SGK, biểu đồ, bảng biểu, hình ảnh trò chơi...), bạn BẮT BUỘC phải ghi rõ vị trí chèn hình, nêu rõ nội dung ảnh cần chèn, và BẮT BUỘC in đậm kèm in nghiêng bằng cú pháp: ***[Chèn hình ảnh [mô tả rõ nội dung ảnh cần chèn] tại đây]*** (ví dụ: ***[Chèn hình ảnh biểu đồ hình quạt tròn bài 6.38 tại đây]***).
* **Vị trí ghi Đề bài và Lời giải (ÁP DỤNG CHO TẤT CẢ HOẠT ĐỘNG 1, 2, 3, 4):** Nguyên văn đề bài tại phần tổ chức hoạt động của GV và HS (Bước 1). Toàn bộ phần kết quả, đáp án, lời giải chi tiết tách riêng đặt tại cột "DỰ KIẾN SẢN PHẨM".
* Nội dung Toán học bắt buộc trình bày bằng định dạng LaTeX chuẩn. **LƯU Ý ĐẶC BIỆT VỀ CỘT 8CM:** Vì hai cột "HOẠT ĐỘNG CỦA GV VÀ HS" và "DỰ KIẾN SẢN PHẨM" chỉ rộng khoảng 8cm khi xuất ra Word, TUYỆT ĐỐI KHÔNG viết mã LaTeX thành một chuỗi quá dài liên tục. Bắt buộc phải ngắt quãng công thức hoặc sử dụng thẻ \`<br>\` xuống dòng hợp lý để tránh làm giãn/lỗi vỡ cột.
* **BỐ CỤC VÀ IN ĐẬM TIÊU ĐỀ:** Phân chia bố cục nội dung thật rõ ràng theo thứ tự a, b, c, d... **Bắt buộc IN ĐẬM các tiêu đề chính khi xuất hiện** (Ví dụ: **a) Kiến thức trọng tâm:**, **b) Ví dụ 2:**...).

### 3. TÍCH HỢP NĂNG LỰC SỐ (NLS) THỰC CHẤT VÀ SIÊU CHI TIẾT
* **MỖI HOẠT ĐỘNG NHỎ TỐI THIỂU 01 NLS VÀ TOÀN BÀI 05-07 NLS:** Đảm bảo tích hợp tối thiểu từ 05 đến 07 NLS khác nhau trải đều cho toàn bộ giáo án, VÀ **mỗi một hoạt động nhỏ (Khởi động, 2.1, 2.2, Bài 1, Bài 2...) BẮT BUỘC phải có TỐI THIỂU 01 hoạt động NLS đi kèm.**
* **KỊCH BẢN NLS SIÊU SIÊU CHI TIẾT:** Tuyệt đối không ghi chung chung kiểu "HS làm bài trên Wayground". Phải mô tả tường tận kịch bản thực thi số: 
  - GV gửi link/mã code qua đâu? (Zalo lớp, quét QR...).
  - HS dùng thiết bị gì để truy cập? (Điện thoại, máy tính bảng...).
  - Thao tác cụ thể của HS trên app là gì? (Nhập đáp án, vẽ đồ thị trên GeoGebra, kéo thả trên màn hình, chụp ảnh bài làm tải lên Padlet...).
  - Kết quả hiển thị tức thời trên màn hình của GV là gì? (Bảng xếp hạng realtime, lưới ảnh bài làm...).
* **Lưu ý Cập nhật Tên Công cụ:** Từ tháng 04/2026, nền tảng Quizizz đã được đổi tên thành **Wayground**. Bạn bắt buộc phải sử dụng tên “Wayground” trong toàn bộ nội dung giáo án thay cho tên cũ.
* Mọi nội dung có ứng dụng công nghệ trong bước thực hiện nhiệm vụ phải được **gạch chân** để làm nổi bật.
* **Định dạng mô tả NLS bắt buộc:**
    * [Mã NLS]: [Tên biểu hiện năng lực] + [Mô tả hành động số siêu chi tiết của học sinh].
    * *Ví dụ: **2.1.TC1a: Thực hiện các tương tác với công nghệ số. Học sinh dùng iPad truy cập link Padlet GV cung cấp, nhấn biểu tượng dấu "+" để chụp ảnh bài giải tự luận và đăng tải lên cột của nhóm mình.***

### 4. CẤU TRÚC VÀ HÌNH THỨC TRÌNH BÀY GIÁO ÁN
Kế hoạch bài dạy phải trình bày đầy đủ các phần: Thông tin chung; Mục tiêu; Thiết bị và học liệu; Tiến trình dạy học.

**PHẦN I. MỤC TIÊU VÀ PHẦN II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU:**
Bắt buộc viết theo khung sườn dưới đây. Các phẩm chất và năng lực phải có **các câu phân tích ngắn khoảng 10-15 từ** gắn liền với nội dung bài học. 
*(Ví dụ khung chuẩn)*:
**I. MỤC TIÊU**
**1. Kiến thức:** - [Gạch đầu dòng các kiến thức trọng tâm...]
**2. Năng lực:** *Năng lực chung:* - [Tên năng lực]: [Câu phân tích ngắn 10-15 từ. Ví dụ: Chủ động ôn tập kiến thức, tự giác hoàn thành các bài tập...]
*Năng lực riêng:* - [Tên năng lực]: [Câu phân tích ngắn 10-15 từ. Ví dụ: Phân tích đề bài, nhận diện dạng toán và lựa chọn phép tính phù hợp...]
*Năng lực số:*
- [Mã NLS]: [Biểu hiện năng lực] + [Mô tả hành động số cụ thể của HS]. (Ghi đủ 05-07 NLS)
**3. Phẩm chất:** - [Tên phẩm chất]: [Câu phân tích ngắn 10-15 từ. Ví dụ: Tự giác làm bài, báo cáo đúng kết quả khi tham gia trò chơi...]
**II. THIẾT BỊ DẠY HỌC VÀ HỌC LIỆU** **1. Đối với giáo viên:**
- [Liệt kê Kế hoạch bài dạy, SGK, Giáo án PPT, PBT...]
- [Liệt kê Học liệu số: Link Wayground, Padlet nộp bài, tài khoản AI...]
**2. Đối với học sinh:**
- [Liệt kê SGK, dụng cụ học tập, máy tính cầm tay, thiết bị di động/máy tính bảng...]

**PHẦN TIẾN TRÌNH DẠY HỌC:**
Toàn bộ tiến trình dạy học gồm 4 hoạt động chính (1. Khởi động, 2. Hình thành kiến thức mới, 3. Luyện tập, 4. Vận dụng). 
**LƯU Ý ĐẶC BIỆT: TẤT CẢ CÁC HOẠT ĐỘNG 1, 2, 3, 4 NÀY ĐỀU BẮT BUỘC TRÌNH BÀY DƯỚI DẠNG BẢNG 3 CỘT.** *(Tuỳ từng hoạt động sẽ chia thành các mục nhỏ như 2.1, 2.2 hoặc Bài 1, Bài 2... dựa vào file gốc. Riêng Hoạt động 2 BẮT BUỘC phải có ghi lý thuyết của mục Đọc hiểu - Nghe hiểu, Tìm tòi - Khám phá).*

**MỖI HOẠT ĐỘNG (HOẶC HOẠT ĐỘNG NHỎ/BÀI TẬP) ĐỀU BẮT BUỘC TRÌNH BÀY ĐẦY ĐỦ THEO CẤU TRÚC SAU:**
* **a. Mục tiêu**
* **b. Nội dung** *(Mô tả ngắn gọn yêu cầu hoặc nhiệm vụ chung).*
* **c. Sản phẩm** *(CHỈ ghi đáp án, lời giải, kết quả thực hiện. Tuyệt đối không chép đề bài ở đây).*
* **d. Tổ chức thực hiện** (Bắt buộc kẻ bảng 3 cột).
**LƯU Ý CỰC KỲ QUAN TRỌNG ĐỂ XUẤT FILE WORD GIỮ NGUYÊN ĐỊNH DẠNG BẢNG:** 1. Trong Markdown, để bảng không bị vỡ hoặc biến thành dạng liệt kê khi tải về file Word, bạn BẮT BUỘC phải viết liền mạch toàn bộ nội dung của một ô trên **CÙNG MỘT HÀNG** mã nguồn. TUYỆT ĐỐI KHÔNG gõ phím Enter (tạo khoảng trắng/dòng mới) bên trong ô. Phải sử dụng thẻ \`<br>\` để ngắt dòng.
2. **CHỦ ĐỘNG NGẮT DÒNG (\`<br>\`):** Cột "HOẠT ĐỘNG" và "SẢN PHẨM" chỉ rộng 8cm. Bạn phải suy nghĩ việc ngắt dòng sao cho hợp lý. Đặc biệt, đối với **các bài tập trắc nghiệm, trò chơi có đáp án (A, B, C, D) hoặc bài tự luận có nhiều ý (câu a, câu b, câu c)**, thì **BẮT BUỘC phải dùng \`<br>\` để tách từng đáp án, từng ý xuống dòng riêng biệt**. Tuyệt đối không viết liền mạch thành một đoạn khối chữ dài thò lò gây xấu và vỡ cột.
| HOẠT ĐỘNG CỦA GV VÀ HS | DỰ KIẾN SẢN PHẨM | NĂNG LỰC SỐ |
|---|---|---|
* **QUY ĐỊNH CẤM "BẢNG LỒNG BẢNG": TUYỆT ĐỐI KHÔNG SỬ DỤNG định dạng bảng Markdown (kí hiệu \`|\`) lồng bên trong các ô của bảng 3 cột này để tránh lỗi hiển thị. Nếu cần trình bày bảng biểu Toán học/dữ liệu vào cột, BẮT BUỘC phải dùng định dạng LaTeX \`\\begin{array}{|c|c|}...\\end{array}\` hoặc sử dụng chỉ thị ***[Chèn hình ảnh [mô tả rõ nội dung] tại đây]***.**
* **Cột "HOẠT ĐỘNG CỦA GV VÀ HS"** phải đủ 4 bước (Nhớ dùng \`<br>\` để cách các bước và các ý, tuyệt đối không gõ Enter): 
    * **Bước 1: Chuyển giao nhiệm vụ** *(Bắt buộc ghi rõ nguyên văn đề bài trích từ SGK hoặc nhiệm vụ cụ thể tại đây để giao cho HS).*
    * **Bước 2: Thực hiện nhiệm vụ**
    * **Bước 3: Báo cáo, thảo luận**
    * **Bước 4: Kết luận, nhận định**
*(LƯU Ý 1: Các tiêu đề Bước 1, Bước 2, Bước 3, Bước 4 phải in đậm, trình bày sát lề và TUYỆT ĐỐI KHÔNG dùng dấu gạch ngang (-) phía trước).*
*(LƯU Ý 2: Nếu trong hoạt động/bài tập này tiếp tục có các nhiệm vụ con, thì MỖI nhiệm vụ con đó đều phải chạy đủ 04 bước: Chuyển giao, Thực hiện, Báo cáo, Kết luận như trên và TẤT CẢ VẪN PHẢI NẰM GỌN TRONG Ô CỦA BẢNG).*
* **Cột "DỰ KIẾN SẢN PHẨM" (QUY ĐỊNH NỘI DUNG GHI BẢNG):** CHỈ ghi nội dung kết quả thực hiện, lời giải, đáp án. **ĐẶC BIỆT LƯU Ý:** Phần chốt kiến thức để học sinh ghi bài BẮT BUỘC phải trình bày bố cục hợp lý, khoa học, phân cấp rõ ràng theo thứ tự mục lớn đến mục nhỏ: **1, 2, 3... rồi mới tới a, b, c...** (Ví dụ: **1. Khái niệm**, sau đó dùng \`<br>\` ngắt dòng tới **a) Định nghĩa**, **b) Ví dụ**). Tuyệt đối KHÔNG ghi đề bài vào cột này.
* **Cột "NĂNG LỰC SỐ":** Ghi rõ Mã NLS; Biểu hiện; Công cụ số sử dụng; Hành động số cụ thể; Sản phẩm học tập số (BẮT BUỘC CÓ ÍT NHẤT 1 NLS TẠI CỘT NÀY CHO MỖI HOẠT ĐỘNG/BÀI TẬP).

### 5. QUY TẮC HÀNH VĂN (TIẾN TRÌNH CÔ ĐỌNG, CHẮC Ý VÀ SIÊU CHI TIẾT)
* **DIỄN ĐẠT CÔ ĐỌNG, VỮNG CHẮC NHƯNG SIÊU CHI TIẾT:** Kịch bản phải vô cùng chi tiết về hành động (GV nói gì, HS bấm nút nào), nhưng câu chữ phải chắc chắn, mạch lạc. KHÔNG viết lê thê, dài dòng.
* **KIỂM SOÁT ĐỘ DÀI Ý:** Chia nhỏ kịch bản thành nhiều gạch đầu dòng (dùng dấu "-" hoặc "+"). Để đảm bảo sự gãy gọn, trực tiếp và rõ hành động, **mỗi gạch đầu dòng chỉ được dao động trong khoảng 25 – 35 từ**. (Riêng phần trích nguyên văn đề bài hoặc ngữ liệu dài từ SGK thì không bị giới hạn này).

### 6. YÊU CẦU ĐẦU RA CUỐI CÙNG
1. Sử dụng 100% tiếng Việt chuẩn mực.
2. Không trả lời bằng lời dẫn, không có câu chào hỏi hay xác nhận nhiệm vụ. Không giải thích dài dòng.
3. Bắt tay ngay vào việc xuất nội dung KHBD hoàn chỉnh từ dòng đầu tiên.
4. Trả về định dạng Markdown chuyên nghiệp, thẩm mỹ. Chú ý các định dạng bảng (\`|\`) và lệnh \`<br>\` để tránh bị vỡ bảng khi tải file Word.
5. Mục tiêu tối thượng là tạo ra một phiên bản KHBD hiện đại, nổi bật, có tính ứng dụng thực tế cao, đủ chi tiết đến mức giáo viên mang thẳng lên bục giảng sử dụng mà gần như không cần chỉnh sửa thêm.`;

export const SYSTEM_INSTRUCTION = KHBD_REDESIGN_PROMPT;

export const PLACEHOLDER_LESSON = `TÊN BÀI HỌC: THỐNG KÊ MÔ TẢ
Môn: Toán - Lớp: 7

I. MỤC TIÊU
1. Kiến thức: Học sinh nắm được khái niệm thống kê, biết cách thu thập số liệu.
2. Kỹ năng: Biết lập bảng số liệu thống kê.

II. TIẾN TRÌNH DẠY HỌC
Hoạt động 1: Khởi động
...
`;
