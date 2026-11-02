export interface SeedCategory {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

export interface SeedProduct {
  name: string;
  sku: string;
  price: number;
  originalPrice: number | null;
  stock: number;
  imageUrl: string;
  description: string;
  rating: number;
  categoryId: number;
  isFeatured: boolean;
}

export const SEED_CATEGORIES: SeedCategory[] = [
  { id: 1, name: 'Điện thoại', slug: 'dien-thoai', icon: '📱' },
  { id: 2, name: 'Laptop & PC', slug: 'laptop-pc', icon: '💻' },
  { id: 3, name: 'Phụ kiện', slug: 'phu-kien', icon: '🎧' },
  { id: 4, name: 'Đồng hồ', slug: 'dong-ho', icon: '⌚' },
];

export const SEED_PRODUCTS: SeedProduct[] = [
  {
    name: 'iPhone 15 Pro Max 256GB Titan Tự Nhiên',
    sku: 'IP15PM-256',
    price: 29490000,
    originalPrice: 34990000,
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    description: 'Khung viền titan chuẩn hàng không vũ trụ, chip A17 Pro mạnh mẽ, camera tiềm vọng zoom quang học 5x sắc nét.',
    rating: 4.9,
    categoryId: 1,
    isFeatured: true,
  },
  {
    name: 'Samsung Galaxy S24 Ultra 512GB Xám Titan',
    sku: 'S24U-512',
    price: 27990000,
    originalPrice: 33490000,
    stock: 18,
    imageUrl: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&auto=format&fit=crop&q=80',
    description: 'Quyền năng Galaxy AI đỉnh cao, màn hình phẳng chống chói 2600 nits, bút S-Pen tích hợp.',
    rating: 4.8,
    categoryId: 1,
    isFeatured: true,
  },
  {
    name: 'MacBook Pro 14 M3 Pro 18GB / 512GB Đen Space',
    sku: 'MBP14-M3PRO',
    price: 49990000,
    originalPrice: 53990000,
    stock: 12,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80',
    description: 'Hiệu năng đồ hoạ vượt trội với chip M3 Pro, màn hình Liquid Retina XDR 120Hz siêu thực, pin 18 giờ.',
    rating: 5.0,
    categoryId: 2,
    isFeatured: true,
  },
  {
    name: 'Dell XPS 13 9340 Intel Core Ultra 7',
    sku: 'DELL-XPS13',
    price: 38500000,
    originalPrice: 42000000,
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop&q=80',
    description: 'Thiết kế nhôm nguyên khối tương lai, phím chức năng cảm ứng vô hình, thời lượng pin cả ngày.',
    rating: 4.7,
    categoryId: 2,
    isFeatured: false,
  },
  {
    name: 'Tai nghe Sony WH-1000XM5 Chống Ồn',
    sku: 'SONY-XM5',
    price: 6790000,
    originalPrice: 8490000,
    stock: 40,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    description: 'Công nghệ chống ồn chủ động hàng đầu ngành, âm thanh Hi-Res Audio, thời lượng pin lên đến 30 giờ.',
    rating: 4.9,
    categoryId: 3,
    isFeatured: true,
  },
  {
    name: 'Bàn phím cơ không dây NuPhy Air75 V2',
    sku: 'NUPHY-A75',
    price: 2850000,
    originalPrice: 3200000,
    stock: 30,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
    description: 'Thiết kế Low-profile siêu mỏng, kết nối Bluetooth 5.1 / 2.4GHz / Type-C, switch Gateron mượt mà.',
    rating: 4.8,
    categoryId: 3,
    isFeatured: false,
  },
  {
    name: 'Chuột Logitech MX Master 3S Không Dây',
    sku: 'LOGI-MX3S',
    price: 2190000,
    originalPrice: 2490000,
    stock: 50,
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80',
    description: 'Cuộn siêu tốc MagSpeed, click êm ái Quiet Clicks, cảm biến 8000 DPI trên mọi bề mặt kính.',
    rating: 4.9,
    categoryId: 3,
    isFeatured: false,
  },
  {
    name: 'Apple Watch Ultra 2 GPS + Cellular 49mm',
    sku: 'AW-ULTRA2',
    price: 20490000,
    originalPrice: 21990000,
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    description: 'Khung vỏ titan chống va đập, màn hình 3000 nits siêu sáng dưới nắng gắt, pin 72 giờ ở chế độ tiết kiệm.',
    rating: 4.9,
    categoryId: 4,
    isFeatured: true,
  },
  {
    name: 'Đồng hồ Garmin Fenix 7 Pro Sapphire Solar',
    sku: 'GARMIN-F7P',
    price: 22990000,
    originalPrice: 25490000,
    stock: 14,
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80',
    description: 'Sạc năng lượng mặt trời thông minh, bản đồ Topo đa lục địa, đèn pin LED tích hợp cho thám hiểm.',
    rating: 4.8,
    categoryId: 4,
    isFeatured: false,
  },
];
