# Quy tắc đặt tên biến và viết class Tailwind CSS

## 1. Đặt tên biến theo camelCase
- **Biến thông thường:** `let userName = 'John';`
- **Hàm:** `function getUserData() {}`
- **Đối tượng:** `const userInfo = { firstName: 'John', lastName: 'Doe' };`
- **Hằng số (viết hoa với dấu gạch dưới nếu là hằng số toàn cục):** `const API_KEY = 'abc123';`

## 2. Quy tắc viết class Tailwind theo nhóm

### Nhóm 1: **Layout**
- `flex flex-col items-center justify-between`
- `grid grid-cols-3 gap-4`
- `container mx-auto px-4`

### Nhóm 2: **Kích thước (Sizing)**
- `w-full h-screen`
- `max-w-lg min-h-[300px]`
- `p-4 m-2`

### Nhóm 3: **Màu sắc (Coloring)**
- `bg-blue-500 text-white`
- `border border-gray-300`
- `hover:bg-blue-700 focus:ring focus:ring-blue-300`

### Nhóm 4: **Typography**
- `text-lg font-bold`
- `leading-relaxed tracking-wide`
- `uppercase lowercase capitalize`

### Nhóm 5: **Hiệu ứng (Effects)**
- `shadow-md hover:shadow-lg`
- `opacity-75 hover:opacity-100`
- `transition duration-300 ease-in-out`

### Nhóm 6: **Trạng thái (States & Modifiers)**
- `hover:text-red-500 focus:ring focus:ring-red-300`
- `disabled:opacity-50`
- `dark:bg-gray-900 dark:text-white`

### Nhóm 7: **Vị trí (Positioning)**
- `absolute top-0 left-0`
- `fixed bottom-4 right-4`
- `relative z-10`

Việc viết class theo nhóm giúp mã code dễ đọc hơn, bảo trì tốt hơn và tránh bị rối loạn trong quá trình phát triển giao diện!

