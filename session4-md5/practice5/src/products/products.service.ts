import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private readonly products = [
    {
      id: 101,
      name: 'MacBook Pro 16 M3 Max',
      price: 3499,
      category: 'Laptops',
      stock: 15,
    },
    {
      id: 102,
      name: 'iPhone 16 Pro Max',
      price: 1199,
      category: 'Smartphones',
      stock: 40,
    },
  ];

  findOne(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Sản phẩm với ID ${id} không tồn tại`);
    }

    return {
      ...product,
      _links: {
        self: {
          href: `/products/${id}`,
          method: 'GET',
          description: 'Xem chi tiết sản phẩm',
        },
        update: {
          href: `/products/${id}`,
          method: 'PUT',
          description: 'Cập nhật thông tin sản phẩm',
        },
        delete: {
          href: `/products/${id}`,
          method: 'DELETE',
          description: 'Xóa sản phẩm khỏi hệ thống',
        },
        buy: {
          href: '/orders',
          method: 'POST',
          description: 'Đặt mua sản phẩm này',
        },
      },
    };
  }
}
