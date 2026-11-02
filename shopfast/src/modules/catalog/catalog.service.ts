import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { Product } from '../../entities/product.entity';

export interface ProductQueryFilters {
  categoryId?: number;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
}

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryRepo.find({ order: { id: 'ASC' } });
  }

  async getProducts(filters: ProductQueryFilters = {}): Promise<Product[]> {
    const qb = this.productRepo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.category', 'c');

    if (filters.categoryId) {
      qb.andWhere('p.categoryId = :cid', { cid: filters.categoryId });
    }

    if (filters.search) {
      qb.andWhere('(LOWER(p.name) LIKE :s OR LOWER(p.description) LIKE :s)', {
        s: `%${filters.search.toLowerCase()}%`,
      });
    }

    if (filters.minPrice !== undefined && !isNaN(filters.minPrice)) {
      qb.andWhere('p.price >= :min', { min: filters.minPrice });
    }

    if (filters.maxPrice !== undefined && !isNaN(filters.maxPrice)) {
      qb.andWhere('p.price <= :max', { max: filters.maxPrice });
    }

    switch (filters.sort) {
      case 'price_asc':
        qb.orderBy('p.price', 'ASC');
        break;
      case 'price_desc':
        qb.orderBy('p.price', 'DESC');
        break;
      case 'rating':
        qb.orderBy('p.rating', 'DESC');
        break;
      default:
        qb.orderBy('p.isFeatured', 'DESC').addOrderBy('p.createdAt', 'DESC');
    }

    return qb.getMany();
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!product) {
      throw new NotFoundException(`Sản phẩm #${id} không tồn tại`);
    }
    return product;
  }
}
