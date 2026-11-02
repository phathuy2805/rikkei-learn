import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 160 })
  name: string;

  @Column({ type: 'varchar', length: 40, unique: true })
  sku: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ name: 'original_price', type: 'int', nullable: true })
  originalPrice: number | null;

  @Column({ type: 'int', default: 10 })
  stock: number;

  @Column({ name: 'image_url', type: 'varchar', length: 500 })
  imageUrl: string;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column({ type: 'float', default: 4.8 })
  rating: number;

  @Column({ name: 'category_id', type: 'int' })
  categoryId: number;

  @ManyToOne(() => Category, (c) => c.products, { onDelete: 'SET NULL', eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'is_featured', type: 'boolean', default: false })
  isFeatured: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
