import { Category } from 'src/categories/entities/category.entity';
import { DetailsProduct } from 'src/details_product/entities/details_product.entity';
import { OrderProduct } from 'src/order_products/entities/order_product.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { SpecificityProduct } from 'src/specificity_product/entities/specificity_product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 100 })
  name: string;

  @Column({ name: 'quantity' })
  quantity: number;

  @Column({ name: 'price' })
  price: number;

  @Column({ name: 'image_path', length: 255 })
  imagePath: string;
  
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @OneToMany(() => SpecificityProduct, (specificityProduct) => specificityProduct.product)
  specificities: SpecificityProduct[];

  @OneToMany(() => DetailsProduct, (detailsProduct) => detailsProduct.product)
  details: DetailsProduct[];

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts: OrderProduct[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
