<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Giáo án tích hợp năng lực số (NLS) - AI Assistant

Hệ thống hỗ trợ giáo viên soạn thảo và nâng cấp giáo án theo khung Năng lực số chuẩn. Được xây dựng trên nền tảng Full-stack (React + Express) để đảm bảo tính bảo mật và hỗ trợ đa dạng mô hình AI (Google AI & Vertex AI).

## 🚀 Tính năng nổi bật

-   **Phân tích giáo án**: Đối chiếu với khung Năng lực số.
-   **Nâng cấp tự động**: Gợi ý tích hợp các hoạt động số vào giáo án có sẵn.
-   **Đa dạng mô hình**: Hỗ trợ Google Gemini Pro/Flash qua AI Studio hoặc Vertex AI.
-   **Xử lý văn bản**: Hỗ trợ đọc và ghi file `.docx` chuyên nghiệp.

## 🛠 Công nghệ sử dụng

-   **Frontend**: React 19, Tailwind CSS, Lucide Icons, Framer Motion.
-   **Backend**: Node.js Express (Proxy API để bảo mật API Key).
-   **AI**: Google Generative AI SDK & Vertex AI REST API.
-   **Build Tool**: Vite & Esbuild.

## 💻 Hướng dẫn chạy cục bộ (Local Development)

1.  **Cài đặt**:
    ```bash
    npm install
    ```
2.  **Cấu hình**:
    - Sao chép `.env.example` thành `.env`
    - (Tùy chọn) Nhập `GEMINI_API_KEY` của bạn vào file `.env`.
3.  **Chạy ứng dụng**:
    ```bash
    npm run dev
    ```
    Ứng dụng sẽ chạy tại: `http://localhost:3000`

## 🌐 Hướng dẫn triển khai (Deployment)

Vì đây là ứng dụng **Full-stack**, bạn cần triển khai nó lên các nền tảng hỗ trợ **Node.js Server** (không dùng được GitHub Pages thuần tính).

### 1. Triển khai lên Google Cloud Run / Railway / Render
- Hệ thống sẽ tự động chạy lệnh `npm run build` để đóng gói cả Frontend và Backend.
- Backend được build ra file `dist/server.cjs`.
- Chạy lệnh `npm start` để khởi động server sản xuất.

### 2. Cấu hình Vertex AI
Để sử dụng Vertex AI khi đã triển khai lên GitHub/Cloud:
- Đảm bảo bạn đã kích hoạt **Vertex AI API** trên Google Cloud Project.
- Sử dụng **API Key** hoặc **OAuth Token** có quyền truy cập vào dự án đó.
- Nhập **Project ID** và **Location** chính xác trong giao diện ứng dụng.

## ⚠️ Lưu ý bảo mật
- Tuyệt đối không commit file `.env` chứa API Key thật lên GitHub.
- Ứng dụng đã được thiết kế để proxy mọi yêu cầu AI qua server, giúp ẩn API Key khỏi trình duyệt của người dùng cuối.

---
© 2025 AI Lesson Plan System - Developed by Google AI Studio Build.
