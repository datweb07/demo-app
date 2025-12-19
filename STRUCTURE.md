# 📁 Cấu trúc Dự án

## 🗂️ Tổng quan

```
/
├── src/
│   ├── app/
│   │   ├── components/          # Các component tái sử dụng
│   │   │   ├── figma/           # Component hệ thống
│   │   │   │   └── ImageWithFallback.tsx
│   │   │   ├── ui/              # Shadcn UI components
│   │   │   ├── Navigation.tsx   # Thanh điều hướng chính
│   │   │   ├── Tutorial.tsx     # Hướng dẫn tương tác
│   │   │   ├── SalinityCard.tsx # Thẻ hiển thị độ mặn
│   │   │   ├── RecommendationCard.tsx # Khuyến nghị
│   │   │   ├── PostCard.tsx     # Thẻ bài viết
│   │   │   ├── ProductCard.tsx  # Thẻ sản phẩm
│   │   │   ├── InvestmentProjectCard.tsx # Thẻ dự án đầu tư
│   │   │   ├── StatsCard.tsx    # Thẻ thống kê
│   │   │   ├── SalinityChart.tsx # Biểu đồ độ mặn
│   │   │   ├── ComparisonChart.tsx # Biểu đồ so sánh
│   │   │   └── AffectedAreasMap.tsx # Bản đồ vùng ảnh hưởng
│   │   ├── pages/               # Các trang chính
│   │   │   ├── DashboardPage.tsx # Trang chủ
│   │   │   ├── SalinityPage.tsx  # Trang dự đoán mặn
│   │   │   ├── PostsPage.tsx     # Trang cộng đồng
│   │   │   ├── ProductsPage.tsx  # Trang sản phẩm
│   │   │   └── InvestPage.tsx    # Trang đầu tư
│   │   └── App.tsx              # Component chính
│   ├── data/
│   │   └── mockData.ts          # Dữ liệu demo
│   └── styles/
│       ├── fonts.css            # Font imports
│       ├── index.css            # CSS chính
│       ├── tailwind.css         # Tailwind base
│       └── theme.css            # Theme tokens
├── package.json
├── vite.config.ts
├── README.md
└── STRUCTURE.md
```

## 📄 Chi tiết các file

### `/src/app/App.tsx`
**Mục đích**: Component gốc của ứng dụng
**Chức năng**:
- Quản lý state của trang hiện tại
- Điều hướng giữa các trang
- Hiển thị tutorial lần đầu
- Render navigation, pages và footer
- Nút trợ giúp floating

### `/src/app/components/Navigation.tsx`
**Mục đích**: Thanh điều hướng chính
**Chức năng**:
- Menu desktop với 5 tabs
- Menu mobile với hamburger
- Highlight trang hiện tại
- Icon + text cho mỗi menu

### `/src/app/components/Tutorial.tsx`
**Mục đích**: Hướng dẫn cho người dùng mới
**Chức năng**:
- 5 bước hướng dẫn
- Progress bar
- Navigation: Prev, Next, Skip
- Modal overlay

### `/src/app/pages/DashboardPage.tsx`
**Mục đích**: Trang chủ - Tổng quan
**Sections**:
1. Welcome banner
2. Salinity status card (hiện tại + dự báo)
3. Quick stats (4 thẻ thống kê)
4. Recommendations (khuyến nghị dựa trên độ mặn)
5. Quick actions (4 nút điều hướng nhanh)
6. Help guide (hướng dẫn cho người mới)

### `/src/app/pages/SalinityPage.tsx`
**Mục đích**: Trang dự đoán xâm nhập mặn
**Sections**:
1. Header
2. Main chart (biểu đồ 14 ngày)
3. Recommendations
4. Comparison chart (so sánh năm nay vs năm trước)
5. Affected areas map (bản đồ 13 tỉnh)
6. How to guide + Long-term solutions
7. Emergency contacts

### `/src/app/pages/PostsPage.tsx`
**Mục đích**: Trang cộng đồng
**Sections**:
1. Header
2. Top contributors (3 thành viên xuất sắc)
3. Create post button
4. Category filter
5. How to earn points
6. Posts grid
7. Community guidelines

### `/src/app/pages/ProductsPage.tsx`
**Mục đích**: Chợ nông sản & thiết bị
**Sections**:
1. Header
2. Search bar
3. Category filter (7 danh mục)
4. Seller benefits
5. Add product button
6. Products grid
7. Buyer protection tips

### `/src/app/pages/InvestPage.tsx`
**Mục đích**: Kêu gọi đầu tư & hợp tác
**Sections**:
1. Header
2. Impact stats (4 thống kê)
3. Why invest (3 lý do)
4. Investment projects (grid các dự án)
5. Partner types (3 loại đối tác)
6. Contact form
7. Direct contact info
8. Mission statement

## 🎨 Components Tái sử dụng

### SalinityCard
- Props: `currentSalinity`, `forecastSalinity`, `level`
- Màu sắc tự động theo level (safe/warning/danger)
- Hiển thị trend tăng/giảm

### RecommendationCard
- Props: `title`, `recommendations[]`, `color`
- List các khuyến nghị cụ thể
- Icon theo màu sắc

### PostCard
- Props: `post`, `onProductClick?`
- Hiển thị avatar, name, points
- Category badge
- Image, content
- Like/Comment/View stats
- Product link (nếu có)

### ProductCard
- Props: `product`
- Image với category tag
- Price, description
- Seller info + points
- Contact button

### InvestmentProjectCard
- Props: `project`
- Gradient header
- Stats grid (farmers, area)
- Funding progress bar
- Status badge
- Action button

### StatsCard
- Props: `title`, `value`, `icon`, `color`, `subtitle?`
- Gradient background theo color
- Icon floating

### Charts
- **SalinityChart**: Line chart với reference lines
- **ComparisonChart**: Bar chart so sánh 2 năm
- **AffectedAreasMap**: List view với color coding

## 📊 Mock Data Structure

### `salinityData`
Array of `{ date, salinity, forecast? }`

### `posts`
Array of Post objects với đầy đủ thông tin

### `products`
Array of Product objects theo 6 danh mục

### `investmentProjects`
Array of dự án với funding progress

### `affectedAreas`
13 tỉnh với status (safe/warning/danger)

## 🎯 User Flow

```
1. Mở app → Tutorial hiển thị
2. Có thể bỏ qua hoặc xem hết
3. Vào Dashboard → Thấy overview
4. Click "Độ mặn" → Xem chi tiết dự báo
5. Click "Cộng đồng" → Đọc/Đăng bài
6. Click "Sản phẩm" → Mua thiết bị
7. Click "Đầu tư" → Tìm vốn/Hợp tác
8. Click "Trợ giúp" → Xem lại tutorial
```

## 🔄 Navigation Flow

- Dashboard ⇄ Salinity
- Dashboard ⇄ Posts ⇄ Products (via product link)
- Dashboard ⇄ Products
- Dashboard ⇄ Invest
- Footer links → All pages

## 🎨 Design System

### Colors
- Primary: Blue (#3b82f6) - Nước
- Secondary: Green (#10b981) - Nông nghiệp
- Warning: Yellow (#f59e0b)
- Danger: Red (#ef4444)
- Info: Purple (#a855f7)

### Typography
- Base font size: 16px
- Headings: Bold
- Buttons: Bold
- Body: Regular

### Spacing
- Container: max-w-7xl
- Padding: px-4
- Gap: 4, 6, 8

### Border Radius
- Small: rounded-xl (12px)
- Large: rounded-2xl (16px)
- Full: rounded-full

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
  - 1 column layout
  - Hamburger menu
  - Stacked cards
  
- **Tablet**: 768px - 1024px
  - 2 column layout
  - Desktop menu
  - Grid 2 cols
  
- **Desktop**: > 1024px
  - 3-4 column layout
  - Full navigation
  - Grid 3-4 cols

## 🚀 Performance Tips

1. Sử dụng React state để quản lý navigation (không reload page)
2. Smooth scroll khi chuyển trang
3. Lazy load images (nếu cần mở rộng)
4. Responsive images với Unsplash

## 🔮 Khả năng mở rộng

### Backend Integration
- Connect Supabase cho database
- Real-time salinity data từ sensors
- User authentication
- File upload cho posts/products

### Additional Features
- Push notifications
- Weather integration
- Chat/Messaging
- Payment gateway
- Admin dashboard
- Analytics

### AI/ML
- Dự đoán độ mặn chính xác hơn
- Recommend giống cây phù hợp
- Chatbot hỗ trợ tự động

---

📝 **Note**: Dự án hiện tại là frontend-only với mock data. Sẵn sàng cho việc tích hợp backend.
